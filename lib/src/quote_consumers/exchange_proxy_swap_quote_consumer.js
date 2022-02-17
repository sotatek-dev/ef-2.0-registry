"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeProxySwapQuoteConsumer = void 0;
const contract_addresses_1 = require("@0x/contract-addresses");
const contract_wrappers_1 = require("@0x/contract-wrappers");
const contracts_zero_ex_1 = require("@0x/contracts-zero-ex");
const protocol_utils_1 = require("@0x/protocol-utils");
const utils_1 = require("@0x/utils");
const _ = require("lodash");
const constants_1 = require("../constants");
const types_1 = require("../types");
const assert_1 = require("../utils/assert");
const constants_2 = require("../utils/market_operation_utils/constants");
const orders_1 = require("../utils/market_operation_utils/orders");
const types_2 = require("../utils/market_operation_utils/types");
const multiplex_encoders_1 = require("./multiplex_encoders");
const quote_consumer_utils_1 = require("./quote_consumer_utils");
// tslint:disable-next-line:custom-no-magic-numbers
const MAX_UINT256 = new utils_1.BigNumber(2).pow(256).minus(1);
const { NULL_ADDRESS, NULL_BYTES, ZERO_AMOUNT } = constants_1.constants;
// use the same order in IPancakeSwapFeature.sol
const PANCAKE_SWAP_FORKS = [
    types_2.ERC20BridgeSource.PancakeSwap,
    types_2.ERC20BridgeSource.PancakeSwapV2,
    types_2.ERC20BridgeSource.BakerySwap,
    types_2.ERC20BridgeSource.SushiSwap,
    types_2.ERC20BridgeSource.ApeSwap,
    types_2.ERC20BridgeSource.CafeSwap,
    types_2.ERC20BridgeSource.CheeseSwap,
    types_2.ERC20BridgeSource.JulSwap,
];
const FAKE_PROVIDER = {
    sendAsync() {
        return;
    },
};
const DUMMY_WETH_CONTRACT = new contract_wrappers_1.WETH9Contract(NULL_ADDRESS, FAKE_PROVIDER);
class ExchangeProxySwapQuoteConsumer {
    constructor(contractAddresses, options = {}) {
        this.contractAddresses = contractAddresses;
        const { chainId } = _.merge({}, constants_1.constants.DEFAULT_SWAP_QUOTER_OPTS, options);
        assert_1.assert.isNumber('chainId', chainId);
        this.chainId = chainId;
        this.contractAddresses = contractAddresses;
        this._exchangeProxy = new contract_wrappers_1.IZeroExContract(contractAddresses.exchangeProxy, FAKE_PROVIDER);
        this._multiplex = new contracts_zero_ex_1.MultiplexFeatureContract(contractAddresses.exchangeProxy, FAKE_PROVIDER);
        this.transformerNonces = {
            wethTransformer: protocol_utils_1.findTransformerNonce(contractAddresses.transformers.wethTransformer, contractAddresses.exchangeProxyTransformerDeployer, 10000),
            payTakerTransformer: protocol_utils_1.findTransformerNonce(contractAddresses.transformers.payTakerTransformer, contractAddresses.exchangeProxyTransformerDeployer, 10000),
            fillQuoteTransformer: protocol_utils_1.findTransformerNonce(contractAddresses.transformers.fillQuoteTransformer, contractAddresses.exchangeProxyTransformerDeployer, 10000),
            affiliateFeeTransformer: protocol_utils_1.findTransformerNonce(contractAddresses.transformers.affiliateFeeTransformer, contractAddresses.exchangeProxyTransformerDeployer, 10000),
            positiveSlippageFeeTransformer: protocol_utils_1.findTransformerNonce(contractAddresses.transformers.positiveSlippageFeeTransformer, contractAddresses.exchangeProxyTransformerDeployer, 10000),
        };
    }
    getCalldataOrThrowAsync(quote, opts = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const optsWithDefaults = Object.assign(Object.assign({}, constants_1.constants.DEFAULT_EXCHANGE_PROXY_EXTENSION_CONTRACT_OPTS), opts.extensionContractOpts);
            // tslint:disable-next-line:no-object-literal-type-assertion
            const { refundReceiver, affiliateFee, isFromETH, isToETH, shouldSellEntireBalance } = optsWithDefaults;
            const sellToken = quote.takerToken;
            const buyToken = quote.makerToken;
            // Take the bounds from the worst case
            let sellAmount = utils_1.BigNumber.max(quote.bestCaseQuoteInfo.totalTakerAmount, quote.worstCaseQuoteInfo.totalTakerAmount);
            let minBuyAmount = quote.worstCaseQuoteInfo.makerAmount;
            let ethAmount = quote.worstCaseQuoteInfo.protocolFeeInWeiAmount;
            if (isFromETH) {
                ethAmount = ethAmount.plus(sellAmount);
            }
            // FCX: remove XLM, FCX from field `data`
            let fcxQuote = _.cloneDeep(quote);
            const rawSlippedOrders = slipNonNativeOrders(quote);
            const slippedOrders = [];
            for (let order of rawSlippedOrders) {
                if ([types_2.ERC20BridgeSource.XLM, types_2.ERC20BridgeSource.FCX].includes(order.source)) {
                    if (quote_consumer_utils_1.isBuyQuote(fcxQuote)) {
                        fcxQuote.makerTokenFillAmount = fcxQuote.makerTokenFillAmount.minus(order.makerAmount);
                    }
                    else {
                        fcxQuote.takerTokenFillAmount = fcxQuote.takerTokenFillAmount.minus(order.takerAmount);
                    }
                    sellAmount = sellAmount.minus(order.takerAmount);
                    minBuyAmount = minBuyAmount.minus(order.makerAmount);
                    if (minBuyAmount.lt(0)) {
                        minBuyAmount = new utils_1.BigNumber(0);
                    }
                    continue;
                }
                slippedOrders.push(order);
            }
            // VIP routes.
            if (this.chainId === contract_addresses_1.ChainId.Mainnet &&
                quote_consumer_utils_1.isDirectSwapCompatible(quote, optsWithDefaults, [types_2.ERC20BridgeSource.UniswapV2, types_2.ERC20BridgeSource.SushiSwap])) {
                const source = slippedOrders[0].source;
                const fillData = slippedOrders[0].fillData;
                return {
                    calldataHexString: this._exchangeProxy
                        .sellToUniswap(fillData.tokenAddressPath.map((a, i) => {
                        if (i === 0 && isFromETH) {
                            return protocol_utils_1.ETH_TOKEN_ADDRESS;
                        }
                        if (i === fillData.tokenAddressPath.length - 1 && isToETH) {
                            return protocol_utils_1.ETH_TOKEN_ADDRESS;
                        }
                        return a;
                    }), sellAmount, minBuyAmount, source === types_2.ERC20BridgeSource.SushiSwap)
                        .getABIEncodedTransactionData(),
                    ethAmount: isFromETH ? sellAmount : ZERO_AMOUNT,
                    toAddress: this._exchangeProxy.address,
                    allowanceTarget: this._exchangeProxy.address,
                    gasOverhead: ZERO_AMOUNT,
                };
            }
            if (this.chainId === contract_addresses_1.ChainId.Mainnet &&
                quote_consumer_utils_1.isDirectSwapCompatible(quote, optsWithDefaults, [types_2.ERC20BridgeSource.UniswapV3])) {
                const fillData = slippedOrders[0].fillData;
                let _calldataHexString;
                if (isFromETH) {
                    _calldataHexString = this._exchangeProxy
                        .sellEthForTokenToUniswapV3(fillData.uniswapPath, minBuyAmount, NULL_ADDRESS)
                        .getABIEncodedTransactionData();
                }
                else if (isToETH) {
                    _calldataHexString = this._exchangeProxy
                        .sellTokenForEthToUniswapV3(fillData.uniswapPath, sellAmount, minBuyAmount, NULL_ADDRESS)
                        .getABIEncodedTransactionData();
                }
                else {
                    _calldataHexString = this._exchangeProxy
                        .sellTokenForTokenToUniswapV3(fillData.uniswapPath, sellAmount, minBuyAmount, NULL_ADDRESS)
                        .getABIEncodedTransactionData();
                }
                return {
                    calldataHexString: _calldataHexString,
                    ethAmount: isFromETH ? sellAmount : ZERO_AMOUNT,
                    toAddress: this._exchangeProxy.address,
                    allowanceTarget: this._exchangeProxy.address,
                    gasOverhead: ZERO_AMOUNT,
                };
            }
            if ([contract_addresses_1.ChainId.BSC, contract_addresses_1.ChainId.Chapel].includes(this.chainId) &&
                quote_consumer_utils_1.isDirectSwapCompatible(quote, optsWithDefaults, [
                    types_2.ERC20BridgeSource.PancakeSwap,
                    types_2.ERC20BridgeSource.PancakeSwapV2,
                    types_2.ERC20BridgeSource.BakerySwap,
                    types_2.ERC20BridgeSource.SushiSwap,
                    types_2.ERC20BridgeSource.ApeSwap,
                    types_2.ERC20BridgeSource.CafeSwap,
                    types_2.ERC20BridgeSource.CheeseSwap,
                    types_2.ERC20BridgeSource.JulSwap,
                ])) {
                const source = slippedOrders[0].source;
                const fillData = slippedOrders[0].fillData;
                return {
                    calldataHexString: this._exchangeProxy
                        .sellToPancakeSwap(fillData.tokenAddressPath.map((a, i) => {
                        if (i === 0 && isFromETH) {
                            return protocol_utils_1.ETH_TOKEN_ADDRESS;
                        }
                        if (i === fillData.tokenAddressPath.length - 1 && isToETH) {
                            return protocol_utils_1.ETH_TOKEN_ADDRESS;
                        }
                        return a;
                    }), sellAmount, minBuyAmount, PANCAKE_SWAP_FORKS.indexOf(source))
                        .getABIEncodedTransactionData(),
                    ethAmount: isFromETH ? sellAmount : ZERO_AMOUNT,
                    toAddress: this._exchangeProxy.address,
                    allowanceTarget: this._exchangeProxy.address,
                    gasOverhead: ZERO_AMOUNT,
                };
            }
            if ([contract_addresses_1.ChainId.Mainnet, contract_addresses_1.ChainId.BSC, contract_addresses_1.ChainId.Chapel].includes(this.chainId) &&
                quote_consumer_utils_1.isDirectSwapCompatible(quote, optsWithDefaults, [types_2.ERC20BridgeSource.LiquidityProvider])) {
                const fillData = slippedOrders[0].fillData;
                const target = fillData.poolAddress;
                return {
                    calldataHexString: this._exchangeProxy
                        .sellToLiquidityProvider(isFromETH ? protocol_utils_1.ETH_TOKEN_ADDRESS : sellToken, isToETH ? protocol_utils_1.ETH_TOKEN_ADDRESS : buyToken, target, NULL_ADDRESS, sellAmount, minBuyAmount, NULL_BYTES)
                        .getABIEncodedTransactionData(),
                    ethAmount: isFromETH ? sellAmount : ZERO_AMOUNT,
                    toAddress: this._exchangeProxy.address,
                    allowanceTarget: this._exchangeProxy.address,
                    gasOverhead: ZERO_AMOUNT,
                };
            }
            if (this.chainId === contract_addresses_1.ChainId.Mainnet &&
                quote_consumer_utils_1.isDirectSwapCompatible(quote, optsWithDefaults, [types_2.ERC20BridgeSource.Curve, types_2.ERC20BridgeSource.Swerve]) &&
                // Curve VIP cannot currently support WETH buy/sell as the functionality needs to WITHDRAW or DEPOSIT
                // into WETH prior/post the trade.
                // ETH buy/sell is supported
                ![sellToken, buyToken].includes(constants_2.NATIVE_FEE_TOKEN_BY_CHAIN_ID[contract_addresses_1.ChainId.Mainnet])) {
                const fillData = slippedOrders[0].fills[0].fillData;
                return {
                    calldataHexString: this._exchangeProxy
                        .sellToLiquidityProvider(isFromETH ? protocol_utils_1.ETH_TOKEN_ADDRESS : sellToken, isToETH ? protocol_utils_1.ETH_TOKEN_ADDRESS : buyToken, constants_2.CURVE_LIQUIDITY_PROVIDER_BY_CHAIN_ID[this.chainId], NULL_ADDRESS, sellAmount, minBuyAmount, protocol_utils_1.encodeCurveLiquidityProviderData({
                        curveAddress: fillData.pool.poolAddress,
                        exchangeFunctionSelector: fillData.pool.exchangeFunctionSelector,
                        fromCoinIdx: new utils_1.BigNumber(fillData.fromTokenIdx),
                        toCoinIdx: new utils_1.BigNumber(fillData.toTokenIdx),
                    }))
                        .getABIEncodedTransactionData(),
                    ethAmount: isFromETH ? sellAmount : ZERO_AMOUNT,
                    toAddress: this._exchangeProxy.address,
                    allowanceTarget: this._exchangeProxy.address,
                    gasOverhead: ZERO_AMOUNT,
                };
            }
            if (this.chainId === contract_addresses_1.ChainId.Mainnet &&
                quote_consumer_utils_1.isDirectSwapCompatible(quote, optsWithDefaults, [types_2.ERC20BridgeSource.Mooniswap])) {
                const fillData = slippedOrders[0].fills[0].fillData;
                return {
                    calldataHexString: this._exchangeProxy
                        .sellToLiquidityProvider(isFromETH ? protocol_utils_1.ETH_TOKEN_ADDRESS : sellToken, isToETH ? protocol_utils_1.ETH_TOKEN_ADDRESS : buyToken, constants_2.MOONISWAP_LIQUIDITY_PROVIDER_BY_CHAIN_ID[this.chainId], NULL_ADDRESS, sellAmount, minBuyAmount, orders_1.poolEncoder.encode([fillData.poolAddress]))
                        .getABIEncodedTransactionData(),
                    ethAmount: isFromETH ? sellAmount : ZERO_AMOUNT,
                    toAddress: this._exchangeProxy.address,
                    allowanceTarget: this.contractAddresses.exchangeProxy,
                    gasOverhead: ZERO_AMOUNT,
                };
            }
            if (this.chainId === contract_addresses_1.ChainId.Mainnet && quote_consumer_utils_1.isMultiplexBatchFillCompatible(quote, optsWithDefaults)) {
                return {
                    calldataHexString: this._encodeMultiplexBatchFillCalldata(Object.assign(Object.assign({}, quote), { orders: slippedOrders })),
                    ethAmount,
                    toAddress: this._exchangeProxy.address,
                    allowanceTarget: this._exchangeProxy.address,
                    gasOverhead: ZERO_AMOUNT,
                };
            }
            if (this.chainId === contract_addresses_1.ChainId.Mainnet && quote_consumer_utils_1.isMultiplexMultiHopFillCompatible(quote, optsWithDefaults)) {
                return {
                    calldataHexString: this._encodeMultiplexMultiHopFillCalldata(Object.assign(Object.assign({}, quote), { orders: slippedOrders }), optsWithDefaults),
                    ethAmount,
                    toAddress: this._exchangeProxy.address,
                    allowanceTarget: this._exchangeProxy.address,
                    gasOverhead: ZERO_AMOUNT,
                };
            }
            // Build up the transforms.
            const transforms = [];
            if (isFromETH) {
                // Create a WETH wrapper if coming from ETH.
                transforms.push({
                    deploymentNonce: this.transformerNonces.wethTransformer,
                    data: protocol_utils_1.encodeWethTransformerData({
                        token: protocol_utils_1.ETH_TOKEN_ADDRESS,
                        amount: shouldSellEntireBalance ? MAX_UINT256 : sellAmount,
                    }),
                });
            }
            // If it's two hop we have an intermediate token this is needed to encode the individual FQT
            // and we also want to ensure no dust amount is left in the flash wallet
            const intermediateToken = quote.isTwoHop ? slippedOrders[0].makerToken : NULL_ADDRESS;
            // This transformer will fill the quote.
            if (quote.isTwoHop) {
                const [firstHopOrder, secondHopOrder] = slippedOrders;
                transforms.push({
                    deploymentNonce: this.transformerNonces.fillQuoteTransformer,
                    data: protocol_utils_1.encodeFillQuoteTransformerData(Object.assign(Object.assign({ side: protocol_utils_1.FillQuoteTransformerSide.Sell, sellToken, buyToken: intermediateToken }, quote_consumer_utils_1.getFQTTransformerDataFromOptimizedOrders([firstHopOrder])), { refundReceiver: refundReceiver || NULL_ADDRESS, fillAmount: shouldSellEntireBalance ? MAX_UINT256 : firstHopOrder.takerAmount })),
                });
                transforms.push({
                    deploymentNonce: this.transformerNonces.fillQuoteTransformer,
                    data: protocol_utils_1.encodeFillQuoteTransformerData(Object.assign(Object.assign({ side: protocol_utils_1.FillQuoteTransformerSide.Sell, buyToken, sellToken: intermediateToken }, quote_consumer_utils_1.getFQTTransformerDataFromOptimizedOrders([secondHopOrder])), { refundReceiver: refundReceiver || NULL_ADDRESS, fillAmount: MAX_UINT256 })),
                });
            }
            else {
                // const fillAmount = isBuyQuote(quote) ? quote.makerTokenFillAmount : quote.takerTokenFillAmount;
                const fillAmount = quote_consumer_utils_1.isBuyQuote(fcxQuote) ? fcxQuote.makerTokenFillAmount : fcxQuote.takerTokenFillAmount;
                transforms.push({
                    deploymentNonce: this.transformerNonces.fillQuoteTransformer,
                    data: protocol_utils_1.encodeFillQuoteTransformerData(Object.assign(Object.assign({ side: quote_consumer_utils_1.isBuyQuote(quote) ? protocol_utils_1.FillQuoteTransformerSide.Buy : protocol_utils_1.FillQuoteTransformerSide.Sell, sellToken,
                        buyToken }, quote_consumer_utils_1.getFQTTransformerDataFromOptimizedOrders(slippedOrders)), { refundReceiver: refundReceiver || NULL_ADDRESS, fillAmount: !quote_consumer_utils_1.isBuyQuote(quote) && shouldSellEntireBalance ? MAX_UINT256 : fillAmount })),
                });
            }
            if (isToETH) {
                // Create a WETH unwrapper if going to ETH.
                transforms.push({
                    deploymentNonce: this.transformerNonces.wethTransformer,
                    data: protocol_utils_1.encodeWethTransformerData({
                        token: constants_2.NATIVE_FEE_TOKEN_BY_CHAIN_ID[this.chainId],
                        amount: MAX_UINT256,
                    }),
                });
            }
            const { feeType, buyTokenFeeAmount, sellTokenFeeAmount, recipient: feeRecipient } = affiliateFee;
            let gasOverhead = ZERO_AMOUNT;
            if (feeType === types_1.AffiliateFeeType.PositiveSlippageFee && feeRecipient !== NULL_ADDRESS) {
                // bestCaseAmountWithSurplus is used to cover gas cost of sending positive slipapge fee to fee recipient
                // this helps avoid sending dust amounts which are not worth the gas cost to transfer
                let bestCaseAmountWithSurplus = quote.bestCaseQuoteInfo.makerAmount
                    .plus(constants_1.POSITIVE_SLIPPAGE_FEE_TRANSFORMER_GAS.multipliedBy(quote.gasPrice).multipliedBy(quote.makerAmountPerEth))
                    .integerValue();
                // In the event makerAmountPerEth is unknown, we only allow for positive slippage which is greater than
                // the best case amount
                bestCaseAmountWithSurplus = utils_1.BigNumber.max(bestCaseAmountWithSurplus, quote.bestCaseQuoteInfo.makerAmount);
                transforms.push({
                    deploymentNonce: this.transformerNonces.positiveSlippageFeeTransformer,
                    data: protocol_utils_1.encodePositiveSlippageFeeTransformerData({
                        token: isToETH ? protocol_utils_1.ETH_TOKEN_ADDRESS : buyToken,
                        bestCaseAmount: utils_1.BigNumber.max(bestCaseAmountWithSurplus, quote.bestCaseQuoteInfo.makerAmount),
                        recipient: feeRecipient,
                    }),
                });
                // This may not be visible at eth_estimateGas time, so we explicitly add overhead
                gasOverhead = constants_1.POSITIVE_SLIPPAGE_FEE_TRANSFORMER_GAS;
            }
            else if (feeType === types_1.AffiliateFeeType.PercentageFee && feeRecipient !== NULL_ADDRESS) {
                // This transformer pays affiliate fees.
                if (buyTokenFeeAmount.isGreaterThan(0)) {
                    transforms.push({
                        deploymentNonce: this.transformerNonces.affiliateFeeTransformer,
                        data: protocol_utils_1.encodeAffiliateFeeTransformerData({
                            fees: [
                                {
                                    token: isToETH ? protocol_utils_1.ETH_TOKEN_ADDRESS : buyToken,
                                    amount: buyTokenFeeAmount,
                                    recipient: feeRecipient,
                                },
                            ],
                        }),
                    });
                    // Adjust the minimum buy amount by the fee.
                    minBuyAmount = utils_1.BigNumber.max(0, minBuyAmount.minus(buyTokenFeeAmount));
                }
                if (sellTokenFeeAmount.isGreaterThan(0)) {
                    throw new Error('Affiliate fees denominated in sell token are not yet supported');
                }
            }
            // The final transformer will send all funds to the taker.
            transforms.push({
                deploymentNonce: this.transformerNonces.payTakerTransformer,
                data: protocol_utils_1.encodePayTakerTransformerData({
                    tokens: [sellToken, buyToken, protocol_utils_1.ETH_TOKEN_ADDRESS].concat(quote.isTwoHop ? intermediateToken : []),
                    amounts: [],
                }),
            });
            // there is no slippedOrders
            if (slippedOrders.length === 0) {
                return {
                    calldataHexString: '0x',
                    ethAmount,
                    toAddress: this._exchangeProxy.address,
                    allowanceTarget: this._exchangeProxy.address,
                    gasOverhead,
                };
            }
            const calldataHexString = this._exchangeProxy
                .transformERC20(isFromETH ? protocol_utils_1.ETH_TOKEN_ADDRESS : sellToken, isToETH ? protocol_utils_1.ETH_TOKEN_ADDRESS : buyToken, shouldSellEntireBalance ? MAX_UINT256 : sellAmount, minBuyAmount, transforms)
                .getABIEncodedTransactionData();
            return {
                calldataHexString,
                ethAmount,
                toAddress: this._exchangeProxy.address,
                allowanceTarget: this._exchangeProxy.address,
                gasOverhead,
            };
        });
    }
    // tslint:disable-next-line:prefer-function-over-method
    executeSwapQuoteOrThrowAsync(_quote, _opts) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Execution not supported for Exchange Proxy quotes');
        });
    }
    _encodeMultiplexBatchFillCalldata(quote) {
        const wrappedBatchCalls = [];
        for_loop: for (const [i, order] of quote.orders.entries()) {
            switch_statement: switch (order.source) {
                case types_2.ERC20BridgeSource.Native:
                    if (order.type !== protocol_utils_1.FillQuoteTransformerOrderType.Rfq) {
                        // Should never happen because we check `isMultiplexBatchFillCompatible`
                        // before calling this function.
                        throw new Error('Multiplex batch fill only supported for RFQ native orders');
                    }
                    wrappedBatchCalls.push({
                        selector: this._exchangeProxy.getSelector('_fillRfqOrder'),
                        sellAmount: order.takerAmount,
                        data: multiplex_encoders_1.multiplexRfqEncoder.encode({
                            order: order.fillData.order,
                            signature: order.fillData.signature,
                        }),
                    });
                    break switch_statement;
                case types_2.ERC20BridgeSource.UniswapV2:
                case types_2.ERC20BridgeSource.SushiSwap:
                    wrappedBatchCalls.push({
                        selector: this._multiplex.getSelector('_sellToUniswap'),
                        sellAmount: order.takerAmount,
                        data: multiplex_encoders_1.multiplexUniswapEncoder.encode({
                            tokens: order.fillData.tokenAddressPath,
                            isSushi: order.source === types_2.ERC20BridgeSource.SushiSwap,
                        }),
                    });
                    break switch_statement;
                case types_2.ERC20BridgeSource.LiquidityProvider:
                    wrappedBatchCalls.push({
                        selector: this._multiplex.getSelector('_sellToLiquidityProvider'),
                        sellAmount: order.takerAmount,
                        data: multiplex_encoders_1.multiplexPlpEncoder.encode({
                            provider: order.fillData.poolAddress,
                            auxiliaryData: NULL_BYTES,
                        }),
                    });
                    break switch_statement;
                case types_2.ERC20BridgeSource.UniswapV3:
                    const fillData = order.fillData;
                    wrappedBatchCalls.push({
                        selector: this._exchangeProxy.getSelector('sellTokenForTokenToUniswapV3'),
                        sellAmount: order.takerAmount,
                        data: fillData.uniswapPath,
                    });
                    break switch_statement;
                default:
                    const fqtData = protocol_utils_1.encodeFillQuoteTransformerData(Object.assign(Object.assign({ side: protocol_utils_1.FillQuoteTransformerSide.Sell, sellToken: quote.takerToken, buyToken: quote.makerToken }, quote_consumer_utils_1.getFQTTransformerDataFromOptimizedOrders(quote.orders.slice(i))), { refundReceiver: NULL_ADDRESS, fillAmount: MAX_UINT256 }));
                    const transformations = [
                        { deploymentNonce: this.transformerNonces.fillQuoteTransformer, data: fqtData },
                        {
                            deploymentNonce: this.transformerNonces.payTakerTransformer,
                            data: protocol_utils_1.encodePayTakerTransformerData({
                                tokens: [quote.takerToken, quote.makerToken],
                                amounts: [],
                            }),
                        },
                    ];
                    wrappedBatchCalls.push({
                        selector: this._exchangeProxy.getSelector('_transformERC20'),
                        sellAmount: utils_1.BigNumber.sum(...quote.orders.slice(i).map(o => o.takerAmount)),
                        data: multiplex_encoders_1.multiplexTransformERC20Encoder.encode({
                            transformations,
                            ethValue: constants_1.constants.ZERO_AMOUNT,
                        }),
                    });
                    break for_loop;
            }
        }
        return this._exchangeProxy
            .batchFill({
            inputToken: quote.takerToken,
            outputToken: quote.makerToken,
            sellAmount: quote.worstCaseQuoteInfo.totalTakerAmount,
            calls: wrappedBatchCalls,
        }, quote.worstCaseQuoteInfo.makerAmount)
            .getABIEncodedTransactionData();
    }
    _encodeMultiplexMultiHopFillCalldata(quote, opts) {
        const wrappedMultiHopCalls = [];
        const tokens = [];
        if (opts.isFromETH) {
            wrappedMultiHopCalls.push({
                selector: DUMMY_WETH_CONTRACT.getSelector('deposit'),
                data: NULL_BYTES,
            });
            tokens.push(protocol_utils_1.ETH_TOKEN_ADDRESS);
        }
        const [firstHopOrder, secondHopOrder] = quote.orders;
        const intermediateToken = firstHopOrder.makerToken;
        tokens.push(quote.takerToken, intermediateToken, quote.makerToken);
        for (const order of [firstHopOrder, secondHopOrder]) {
            switch (order.source) {
                case types_2.ERC20BridgeSource.UniswapV2:
                case types_2.ERC20BridgeSource.SushiSwap:
                    wrappedMultiHopCalls.push({
                        selector: this._multiplex.getSelector('_sellToUniswap'),
                        data: multiplex_encoders_1.multiplexUniswapEncoder.encode({
                            tokens: order.fillData.tokenAddressPath,
                            isSushi: order.source === types_2.ERC20BridgeSource.SushiSwap,
                        }),
                    });
                    break;
                case types_2.ERC20BridgeSource.LiquidityProvider:
                    wrappedMultiHopCalls.push({
                        selector: this._multiplex.getSelector('_sellToLiquidityProvider'),
                        data: multiplex_encoders_1.multiplexPlpEncoder.encode({
                            provider: order.fillData.poolAddress,
                            auxiliaryData: NULL_BYTES,
                        }),
                    });
                    break;
                default:
                    // Note: we'll need to redeploy TransformERC20Feature before we can
                    //       use other sources
                    // Should never happen because we check `isMultiplexMultiHopFillCompatible`
                    // before calling this function.
                    throw new Error(`Multiplex multi-hop unsupported source: ${order.source}`);
            }
        }
        if (opts.isToETH) {
            wrappedMultiHopCalls.push({
                selector: DUMMY_WETH_CONTRACT.getSelector('withdraw'),
                data: NULL_BYTES,
            });
            tokens.push(protocol_utils_1.ETH_TOKEN_ADDRESS);
        }
        return this._exchangeProxy
            .multiHopFill({
            tokens,
            sellAmount: quote.worstCaseQuoteInfo.totalTakerAmount,
            calls: wrappedMultiHopCalls,
        }, quote.worstCaseQuoteInfo.makerAmount)
            .getABIEncodedTransactionData();
    }
}
exports.ExchangeProxySwapQuoteConsumer = ExchangeProxySwapQuoteConsumer;
function slipNonNativeOrders(quote) {
    const slippage = getMaxQuoteSlippageRate(quote);
    if (!slippage) {
        return quote.orders;
    }
    return quote.orders.map(o => {
        if ([types_2.ERC20BridgeSource.Native, types_2.ERC20BridgeSource.XLM, types_2.ERC20BridgeSource.FCX].includes(o.source)) {
            return o;
        }
        return Object.assign(Object.assign({}, o), (quote.type === types_1.MarketOperation.Sell
            ? { makerAmount: o.makerAmount.times(1 - slippage).integerValue(utils_1.BigNumber.ROUND_DOWN) }
            : { takerAmount: o.takerAmount.times(1 + slippage).integerValue(utils_1.BigNumber.ROUND_UP) }));
    });
}
function getMaxQuoteSlippageRate(quote) {
    if (quote.type === types_1.MarketOperation.Buy) {
        // (worstCaseTaker - bestCaseTaker) / bestCaseTaker
        // where worstCaseTaker >= bestCaseTaker
        return quote.worstCaseQuoteInfo.takerAmount
            .minus(quote.bestCaseQuoteInfo.takerAmount)
            .div(quote.bestCaseQuoteInfo.takerAmount)
            .toNumber();
    }
    // (bestCaseMaker - worstCaseMaker) / bestCaseMaker
    // where bestCaseMaker >= worstCaseMaker
    return quote.bestCaseQuoteInfo.makerAmount
        .minus(quote.worstCaseQuoteInfo.makerAmount)
        .div(quote.bestCaseQuoteInfo.makerAmount)
        .toNumber();
}
//# sourceMappingURL=exchange_proxy_swap_quote_consumer.js.map