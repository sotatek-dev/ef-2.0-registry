"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNativeOptimizedOrder = exports.BRIDGE_ENCODERS = exports.poolEncoder = exports.getMakerTakerTokens = exports.createBridgeOrder = exports.createBridgeDataForBridgeOrder = exports.getErc20BridgeSourceToBridgeSource = exports.createOrdersFromTwoHopSample = void 0;
const protocol_utils_1 = require("@0x/protocol-utils");
const utils_1 = require("@0x/utils");
const types_1 = require("../../types");
const constants_1 = require("./constants");
const types_2 = require("./types");
function createOrdersFromTwoHopSample(sample, opts) {
    const [makerToken, takerToken] = getMakerTakerTokens(opts);
    const { firstHopSource, secondHopSource, intermediateToken } = sample.fillData;
    const firstHopFill = {
        sourcePathId: '',
        source: firstHopSource.source,
        type: protocol_utils_1.FillQuoteTransformerOrderType.Bridge,
        input: opts.side === types_1.MarketOperation.Sell ? sample.input : constants_1.ZERO_AMOUNT,
        output: opts.side === types_1.MarketOperation.Sell ? constants_1.ZERO_AMOUNT : sample.output,
        subFills: [],
        fillData: firstHopSource.fillData,
    };
    const secondHopFill = {
        sourcePathId: '',
        source: secondHopSource.source,
        type: protocol_utils_1.FillQuoteTransformerOrderType.Bridge,
        input: opts.side === types_1.MarketOperation.Sell ? constants_1.MAX_UINT256 : sample.input,
        output: opts.side === types_1.MarketOperation.Sell ? sample.output : constants_1.MAX_UINT256,
        subFills: [],
        fillData: secondHopSource.fillData,
    };
    return [
        createBridgeOrder(firstHopFill, intermediateToken, takerToken, opts.side),
        createBridgeOrder(secondHopFill, makerToken, intermediateToken, opts.side),
    ];
}
exports.createOrdersFromTwoHopSample = createOrdersFromTwoHopSample;
function getErc20BridgeSourceToBridgeSource(source) {
    switch (source) {
        case types_2.ERC20BridgeSource.Balancer:
        case types_2.ERC20BridgeSource.ABalancer:
        case types_2.ERC20BridgeSource.RBalancer:
        case types_2.ERC20BridgeSource.UBalancer:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Balancer, 'Balancer');
        case types_2.ERC20BridgeSource.BalancerV2:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.BalancerV2, 'BalancerV2');
        case types_2.ERC20BridgeSource.Bancor:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Bancor, 'Bancor');
        // case ERC20BridgeSource.CoFiX:
        //    return encodeBridgeSourceId(BridgeProtocol.CoFiX, 'CoFiX');
        case types_2.ERC20BridgeSource.Curve:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Curve, 'Curve');
        case types_2.ERC20BridgeSource.Cream:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Balancer, 'Cream');
        case types_2.ERC20BridgeSource.CryptoCom:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.CryptoCom, 'CryptoCom');
        case types_2.ERC20BridgeSource.Dodo:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Dodo, 'Dodo');
        case types_2.ERC20BridgeSource.Kyber:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Kyber, 'Kyber');
        case types_2.ERC20BridgeSource.LiquidityProvider:
            // "LiquidityProvider" is too long to encode (17 characters).
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Unknown, 'LP');
        case types_2.ERC20BridgeSource.MakerPsm:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.MakerPsm, 'MakerPsm');
        case types_2.ERC20BridgeSource.Mooniswap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Mooniswap, 'Mooniswap');
        case types_2.ERC20BridgeSource.MStable:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.MStable, 'MStable');
        case types_2.ERC20BridgeSource.Eth2Dai:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Oasis, 'Eth2Dai');
        case types_2.ERC20BridgeSource.Shell:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Shell, 'Shell');
        case types_2.ERC20BridgeSource.SnowSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Curve, 'SnowSwap');
        case types_2.ERC20BridgeSource.SushiSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'SushiSwap');
        case types_2.ERC20BridgeSource.Swerve:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Curve, 'Swerve');
        case types_2.ERC20BridgeSource.Uniswap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Uniswap, 'Uniswap');
        case types_2.ERC20BridgeSource.UniswapV2:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'UniswapV2');
        case types_2.ERC20BridgeSource.DodoV2:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.DodoV2, 'DodoV2');
        case types_2.ERC20BridgeSource.Linkswap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'Linkswap');
        case types_2.ERC20BridgeSource.PancakeSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'PancakeSwap');
        case types_2.ERC20BridgeSource.PancakeSwapV2:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'PancakeSwapV2');
        case types_2.ERC20BridgeSource.BakerySwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'BakerySwap');
        case types_2.ERC20BridgeSource.Nerve:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Nerve, 'Nerve');
        case types_2.ERC20BridgeSource.Belt:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Curve, 'Belt');
        case types_2.ERC20BridgeSource.Ellipsis:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Curve, 'Ellipsis');
        case types_2.ERC20BridgeSource.Component:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Shell, 'Component');
        case types_2.ERC20BridgeSource.Smoothy:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Curve, 'Smoothy');
        case types_2.ERC20BridgeSource.Saddle:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Nerve, 'Saddle');
        case types_2.ERC20BridgeSource.XSigma:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Curve, 'xSigma');
        case types_2.ERC20BridgeSource.ApeSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'ApeSwap');
        case types_2.ERC20BridgeSource.CafeSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'CafeSwap');
        case types_2.ERC20BridgeSource.CheeseSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'CheeseSwap');
        case types_2.ERC20BridgeSource.JulSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'JulSwap');
        case types_2.ERC20BridgeSource.UniswapV3:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV3, 'UniswapV3');
        case types_2.ERC20BridgeSource.KyberDmm:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.KyberDmm, 'KyberDmm');
        case types_2.ERC20BridgeSource.QuickSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'QuickSwap');
        case types_2.ERC20BridgeSource.ComethSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'ComethSwap');
        case types_2.ERC20BridgeSource.Dfyn:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'Dfyn');
        case types_2.ERC20BridgeSource.CurveV2:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.CurveV2, 'CurveV2');
        case types_2.ERC20BridgeSource.WaultSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'WaultSwap');
        case types_2.ERC20BridgeSource.Polydex:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'Polydex');
        case types_2.ERC20BridgeSource.FirebirdOneSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Nerve, 'FirebirdOneSwap');
        case types_2.ERC20BridgeSource.Lido:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Lido, 'Lido');
        case types_2.ERC20BridgeSource.ShibaSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'ShibaSwap');
        case types_2.ERC20BridgeSource.JetSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.UniswapV2, 'JetSwap');
        case types_2.ERC20BridgeSource.IronSwap:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Nerve, 'IronSwap');
        case types_2.ERC20BridgeSource.ACryptos:
            return protocol_utils_1.encodeBridgeSourceId(protocol_utils_1.BridgeProtocol.Curve, 'ACryptoS');
        default:
            throw new Error(types_2.AggregationError.NoBridgeForSource);
    }
}
exports.getErc20BridgeSourceToBridgeSource = getErc20BridgeSourceToBridgeSource;
function createBridgeDataForBridgeOrder(order) {
    let bridgeData;
    if (order.source === types_2.ERC20BridgeSource.MultiHop ||
        order.source === types_2.ERC20BridgeSource.MultiBridge ||
        order.source === types_2.ERC20BridgeSource.Native ||
        order.source === types_2.ERC20BridgeSource.XLM ||
        order.source === types_2.ERC20BridgeSource.FCX) {
        throw new Error('Invalid order to encode for Bridge Data');
    }
    const encoder = exports.BRIDGE_ENCODERS[order.source];
    if (!encoder) {
        throw new Error(types_2.AggregationError.NoBridgeForSource);
    }
    switch (order.source) {
        case types_2.ERC20BridgeSource.Curve:
        case types_2.ERC20BridgeSource.CurveV2:
        case types_2.ERC20BridgeSource.Swerve:
        case types_2.ERC20BridgeSource.SnowSwap:
        case types_2.ERC20BridgeSource.Nerve:
        case types_2.ERC20BridgeSource.Belt:
        case types_2.ERC20BridgeSource.Ellipsis:
        case types_2.ERC20BridgeSource.Smoothy:
        case types_2.ERC20BridgeSource.Saddle:
        case types_2.ERC20BridgeSource.XSigma:
        case types_2.ERC20BridgeSource.FirebirdOneSwap:
        case types_2.ERC20BridgeSource.IronSwap:
        case types_2.ERC20BridgeSource.ACryptos:
            const curveFillData = order.fillData;
            bridgeData = encoder.encode([
                curveFillData.pool.poolAddress,
                curveFillData.pool.exchangeFunctionSelector,
                curveFillData.fromTokenIdx,
                curveFillData.toTokenIdx,
            ]);
            break;
        case types_2.ERC20BridgeSource.Balancer:
        case types_2.ERC20BridgeSource.ABalancer:
        case types_2.ERC20BridgeSource.RBalancer:
        case types_2.ERC20BridgeSource.UBalancer:
        case types_2.ERC20BridgeSource.Cream:
            const balancerFillData = order.fillData;
            bridgeData = encoder.encode([balancerFillData.poolAddress]);
            break;
        case types_2.ERC20BridgeSource.BalancerV2:
            const balancerV2FillData = order.fillData;
            const { vault, poolId } = balancerV2FillData;
            bridgeData = encoder.encode([vault, poolId]);
            break;
        case types_2.ERC20BridgeSource.Bancor:
            const bancorFillData = order.fillData;
            bridgeData = encoder.encode([bancorFillData.networkAddress, bancorFillData.path]);
            break;
        case types_2.ERC20BridgeSource.UniswapV2:
        case types_2.ERC20BridgeSource.SushiSwap:
        case types_2.ERC20BridgeSource.CryptoCom:
        case types_2.ERC20BridgeSource.Linkswap:
        case types_2.ERC20BridgeSource.PancakeSwap:
        case types_2.ERC20BridgeSource.PancakeSwapV2:
        case types_2.ERC20BridgeSource.BakerySwap:
        case types_2.ERC20BridgeSource.ApeSwap:
        case types_2.ERC20BridgeSource.CafeSwap:
        case types_2.ERC20BridgeSource.CheeseSwap:
        case types_2.ERC20BridgeSource.JulSwap:
        case types_2.ERC20BridgeSource.QuickSwap:
        case types_2.ERC20BridgeSource.ComethSwap:
        case types_2.ERC20BridgeSource.Dfyn:
        case types_2.ERC20BridgeSource.WaultSwap:
        case types_2.ERC20BridgeSource.Polydex:
        case types_2.ERC20BridgeSource.ShibaSwap:
        case types_2.ERC20BridgeSource.JetSwap:
            const uniswapV2FillData = order.fillData;
            bridgeData = encoder.encode([uniswapV2FillData.router, uniswapV2FillData.tokenAddressPath]);
            break;
        case types_2.ERC20BridgeSource.Kyber:
            const kyberFillData = order.fillData;
            bridgeData = encoder.encode([kyberFillData.networkProxy, kyberFillData.hint]);
            break;
        case types_2.ERC20BridgeSource.Mooniswap:
            const mooniswapFillData = order.fillData;
            bridgeData = encoder.encode([mooniswapFillData.poolAddress]);
            break;
        case types_2.ERC20BridgeSource.Dodo:
            const dodoFillData = order.fillData;
            bridgeData = encoder.encode([
                dodoFillData.helperAddress,
                dodoFillData.poolAddress,
                dodoFillData.isSellBase,
            ]);
            break;
        case types_2.ERC20BridgeSource.DodoV2:
            const dodoV2FillData = order.fillData;
            bridgeData = encoder.encode([dodoV2FillData.poolAddress, dodoV2FillData.isSellBase]);
            break;
        case types_2.ERC20BridgeSource.Shell:
        case types_2.ERC20BridgeSource.Component:
            const shellFillData = order.fillData;
            bridgeData = encoder.encode([shellFillData.poolAddress]);
            break;
        case types_2.ERC20BridgeSource.LiquidityProvider:
            const lpFillData = order.fillData;
            bridgeData = encoder.encode([lpFillData.poolAddress, tokenAddressEncoder.encode([order.takerToken])]);
            break;
        case types_2.ERC20BridgeSource.Uniswap:
            const uniFillData = order.fillData;
            bridgeData = encoder.encode([uniFillData.router]);
            break;
        case types_2.ERC20BridgeSource.Eth2Dai:
            const oasisFillData = order.fillData;
            bridgeData = encoder.encode([oasisFillData.router]);
            break;
        case types_2.ERC20BridgeSource.MStable:
            const mStableFillData = order.fillData;
            bridgeData = encoder.encode([mStableFillData.router]);
            break;
        case types_2.ERC20BridgeSource.MakerPsm:
            const psmFillData = order.fillData;
            bridgeData = encoder.encode([psmFillData.psmAddress, psmFillData.gemTokenAddress]);
            break;
        case types_2.ERC20BridgeSource.UniswapV3:
            const uniswapV3FillData = order.fillData;
            bridgeData = encoder.encode([uniswapV3FillData.router, uniswapV3FillData.uniswapPath]);
            break;
        case types_2.ERC20BridgeSource.KyberDmm:
            const kyberDmmFillData = order.fillData;
            bridgeData = encoder.encode([
                kyberDmmFillData.router,
                kyberDmmFillData.poolsPath,
                kyberDmmFillData.tokenAddressPath,
            ]);
            break;
        case types_2.ERC20BridgeSource.Lido:
            const lidoFillData = order.fillData;
            bridgeData = encoder.encode([lidoFillData.stEthTokenAddress]);
            break;
        default:
            throw new Error(types_2.AggregationError.NoBridgeForSource);
    }
    return bridgeData;
}
exports.createBridgeDataForBridgeOrder = createBridgeDataForBridgeOrder;
function createBridgeOrder(fill, makerToken, takerToken, side) {
    const [makerAmount, takerAmount] = getFillTokenAmounts(fill, side);
    return {
        makerToken,
        takerToken,
        makerAmount,
        takerAmount,
        fillData: createFinalBridgeOrderFillDataFromCollapsedFill(fill),
        source: fill.source,
        sourcePathId: fill.sourcePathId,
        type: protocol_utils_1.FillQuoteTransformerOrderType.Bridge,
        fills: [fill],
    };
}
exports.createBridgeOrder = createBridgeOrder;
function createFinalBridgeOrderFillDataFromCollapsedFill(fill) {
    switch (fill.source) {
        case types_2.ERC20BridgeSource.UniswapV3: {
            const fd = fill.fillData;
            return {
                router: fd.router,
                tokenAddressPath: fd.tokenAddressPath,
                uniswapPath: getBestUniswapV3PathForInputAmount(fd, fill.input),
            };
        }
        default:
            break;
    }
    return fill.fillData;
}
function getBestUniswapV3PathForInputAmount(fillData, inputAmount) {
    if (fillData.pathAmounts.length === 0) {
        throw new Error(`No Uniswap V3 paths`);
    }
    // Find the best path that can satisfy `inputAmount`.
    // Assumes `fillData.pathAmounts` is sorted ascending.
    for (const { inputAmount: pathInputAmount, uniswapPath } of fillData.pathAmounts) {
        if (pathInputAmount.gte(inputAmount)) {
            return uniswapPath;
        }
    }
    return fillData.pathAmounts[fillData.pathAmounts.length - 1].uniswapPath;
}
function getMakerTakerTokens(opts) {
    const makerToken = opts.side === types_1.MarketOperation.Sell ? opts.outputToken : opts.inputToken;
    const takerToken = opts.side === types_1.MarketOperation.Sell ? opts.inputToken : opts.outputToken;
    return [makerToken, takerToken];
}
exports.getMakerTakerTokens = getMakerTakerTokens;
exports.poolEncoder = utils_1.AbiEncoder.create([{ name: 'poolAddress', type: 'address' }]);
const curveEncoder = utils_1.AbiEncoder.create([
    { name: 'curveAddress', type: 'address' },
    { name: 'exchangeFunctionSelector', type: 'bytes4' },
    { name: 'fromTokenIdx', type: 'int128' },
    { name: 'toTokenIdx', type: 'int128' },
]);
const makerPsmEncoder = utils_1.AbiEncoder.create([
    { name: 'psmAddress', type: 'address' },
    { name: 'gemTokenAddress', type: 'address' },
]);
const balancerV2Encoder = utils_1.AbiEncoder.create([
    { name: 'vault', type: 'address' },
    { name: 'poolId', type: 'bytes32' },
]);
const routerAddressPathEncoder = utils_1.AbiEncoder.create('(address,address[])');
const tokenAddressEncoder = utils_1.AbiEncoder.create([{ name: 'tokenAddress', type: 'address' }]);
exports.BRIDGE_ENCODERS = {
    [types_2.ERC20BridgeSource.LiquidityProvider]: utils_1.AbiEncoder.create([
        { name: 'provider', type: 'address' },
        { name: 'data', type: 'bytes' },
    ]),
    [types_2.ERC20BridgeSource.Kyber]: utils_1.AbiEncoder.create([
        { name: 'kyberNetworkProxy', type: 'address' },
        { name: 'hint', type: 'bytes' },
    ]),
    [types_2.ERC20BridgeSource.Dodo]: utils_1.AbiEncoder.create([
        { name: 'helper', type: 'address' },
        { name: 'poolAddress', type: 'address' },
        { name: 'isSellBase', type: 'bool' },
    ]),
    [types_2.ERC20BridgeSource.DodoV2]: utils_1.AbiEncoder.create([
        { name: 'poolAddress', type: 'address' },
        { name: 'isSellBase', type: 'bool' },
    ]),
    // Curve like
    [types_2.ERC20BridgeSource.Curve]: curveEncoder,
    [types_2.ERC20BridgeSource.CurveV2]: curveEncoder,
    [types_2.ERC20BridgeSource.Swerve]: curveEncoder,
    [types_2.ERC20BridgeSource.SnowSwap]: curveEncoder,
    [types_2.ERC20BridgeSource.Nerve]: curveEncoder,
    [types_2.ERC20BridgeSource.Belt]: curveEncoder,
    [types_2.ERC20BridgeSource.Ellipsis]: curveEncoder,
    [types_2.ERC20BridgeSource.Smoothy]: curveEncoder,
    [types_2.ERC20BridgeSource.Saddle]: curveEncoder,
    [types_2.ERC20BridgeSource.XSigma]: curveEncoder,
    [types_2.ERC20BridgeSource.FirebirdOneSwap]: curveEncoder,
    [types_2.ERC20BridgeSource.IronSwap]: curveEncoder,
    [types_2.ERC20BridgeSource.ACryptos]: curveEncoder,
    // UniswapV2 like, (router, address[])
    [types_2.ERC20BridgeSource.Bancor]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.UniswapV2]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.SushiSwap]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.CryptoCom]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.Linkswap]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.ShibaSwap]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.AutoRoute]: routerAddressPathEncoder,
    // BSC
    [types_2.ERC20BridgeSource.PancakeSwap]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.PancakeSwapV2]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.BakerySwap]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.ApeSwap]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.CafeSwap]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.CheeseSwap]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.JulSwap]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.WaultSwap]: routerAddressPathEncoder,
    // Polygon
    [types_2.ERC20BridgeSource.QuickSwap]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.ComethSwap]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.Dfyn]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.Polydex]: routerAddressPathEncoder,
    [types_2.ERC20BridgeSource.JetSwap]: routerAddressPathEncoder,
    // Generic pools
    [types_2.ERC20BridgeSource.Shell]: exports.poolEncoder,
    [types_2.ERC20BridgeSource.Component]: exports.poolEncoder,
    [types_2.ERC20BridgeSource.Mooniswap]: exports.poolEncoder,
    [types_2.ERC20BridgeSource.Eth2Dai]: exports.poolEncoder,
    [types_2.ERC20BridgeSource.MStable]: exports.poolEncoder,
    [types_2.ERC20BridgeSource.Balancer]: exports.poolEncoder,
    [types_2.ERC20BridgeSource.ABalancer]: exports.poolEncoder,
    [types_2.ERC20BridgeSource.RBalancer]: exports.poolEncoder,
    [types_2.ERC20BridgeSource.UBalancer]: exports.poolEncoder,
    [types_2.ERC20BridgeSource.Cream]: exports.poolEncoder,
    [types_2.ERC20BridgeSource.Uniswap]: exports.poolEncoder,
    // Custom integrations
    [types_2.ERC20BridgeSource.MakerPsm]: makerPsmEncoder,
    [types_2.ERC20BridgeSource.BalancerV2]: balancerV2Encoder,
    [types_2.ERC20BridgeSource.UniswapV3]: utils_1.AbiEncoder.create([
        { name: 'router', type: 'address' },
        { name: 'path', type: 'bytes' },
    ]),
    [types_2.ERC20BridgeSource.KyberDmm]: utils_1.AbiEncoder.create('(address,address[],address[])'),
    [types_2.ERC20BridgeSource.Lido]: utils_1.AbiEncoder.create('(address)'),
};
function getFillTokenAmounts(fill, side) {
    return [
        // Maker asset amount.
        side === types_1.MarketOperation.Sell ? fill.output.integerValue(utils_1.BigNumber.ROUND_DOWN) : fill.input,
        // Taker asset amount.
        side === types_1.MarketOperation.Sell ? fill.input : fill.output.integerValue(utils_1.BigNumber.ROUND_UP),
    ];
}
function createNativeOptimizedOrder(fill, side) {
    const fillData = fill.fillData;
    const [makerAmount, takerAmount] = getFillTokenAmounts(fill, side);
    const base = {
        type: fill.type,
        source: fill.source,
        makerToken: fillData.order.makerToken,
        takerToken: fillData.order.takerToken,
        makerAmount,
        takerAmount,
        fills: [fill],
        fillData,
    };
    return fill.type === protocol_utils_1.FillQuoteTransformerOrderType.Rfq
        ? Object.assign(Object.assign({}, base), { type: protocol_utils_1.FillQuoteTransformerOrderType.Rfq, fillData: fillData }) : Object.assign(Object.assign({}, base), { type: protocol_utils_1.FillQuoteTransformerOrderType.Limit, fillData: fillData });
}
exports.createNativeOptimizedOrder = createNativeOptimizedOrder;
//# sourceMappingURL=orders.js.map