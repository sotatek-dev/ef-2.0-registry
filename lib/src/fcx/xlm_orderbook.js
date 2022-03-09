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
exports.XlmOrderBook = void 0;
const contract_addresses_1 = require("@0x/contract-addresses");
const protocol_utils_1 = require("@0x/protocol-utils");
const utils_1 = require("@0x/utils");
const axios_1 = require("axios");
const order_utils_1 = require("@0x/order-utils");
const _ = require("lodash");
const constants_1 = require("../constants");
const constants_2 = require("../utils/market_operation_utils/constants");
const fcx_api_1 = require("./fcx_api");
const TOKENS_MAP_BY_CHAIN = {
    [contract_addresses_1.ChainId.BSC]: {},
    [contract_addresses_1.ChainId.Chapel]: {
        '0x3972aebcec8fae45e2bdc06fd30167eafa5bce38': {
            type: 'credit_alphanum4',
            code: 'DAI',
            issuer: 'GACM5KGLAJPGPI76JYYEAYCQA2LKYFD77IMODYYP6QEQPICIGJP3PO6D',
        },
        '0x03e67a6469c25bdcc3af37a4c4676c2ac6047aed': {
            type: 'credit_alphanum4',
            code: 'USDT',
            issuer: 'GAXXMQMTDUQ4YEPXJMKFBGN3GETPJNEXEUHFCQJKGJDVI3XQCNBU3OZI',
        },
        '0x08a4cde6152cd0f48a456e8db22b3c13a126ef78': {
            type: 'credit_alphanum4',
            code: 'BUSD',
            issuer: 'GAXXMQMTDUQ4YEPXJMKFBGN3GETPJNEXEUHFCQJKGJDVI3XQCNBU3OZI',
        },
        '0xaa4988ef2505068e7f4fba05e88ec19bc5629734': {
            type: 'credit_alphanum4',
            code: 'EVRY',
            issuer: 'GAXXMQMTDUQ4YEPXJMKFBGN3GETPJNEXEUHFCQJKGJDVI3XQCNBU3OZI',
        },
        '0x7b47880b3b14ec45023e2240c1f5358b0165ffd7': {
            type: 'credit_alphanum4',
            code: 'vEUR',
            issuer: 'GAXXMQMTDUQ4YEPXJMKFBGN3GETPJNEXEUHFCQJKGJDVI3XQCNBU3OZI',
        },
        '0x6deeeebcf2b03a1078d1fc624bdc57a667bf31d0': {
            type: 'credit_alphanum4',
            code: 'vUSD',
            issuer: 'GAXXMQMTDUQ4YEPXJMKFBGN3GETPJNEXEUHFCQJKGJDVI3XQCNBU3OZI',
        },
        '0x332a96a808cfe9e3560e0d261d8b047bb6b85b4d': {
            type: 'credit_alphanum4',
            code: 'vSGD',
            issuer: 'GAXXMQMTDUQ4YEPXJMKFBGN3GETPJNEXEUHFCQJKGJDVI3XQCNBU3OZI',
        },
        '0x1fdee622a8c058923e4d006c3edee14a0634e9d2': {
            type: 'credit_alphanum4',
            code: 'vCHF',
            issuer: 'GAXXMQMTDUQ4YEPXJMKFBGN3GETPJNEXEUHFCQJKGJDVI3XQCNBU3OZI',
        },
        '0xdba79a8049f52565de7bc190d5b56a21a5959459': {
            type: 'credit_alphanum4',
            code: 'vTHB',
            issuer: 'GAXXMQMTDUQ4YEPXJMKFBGN3GETPJNEXEUHFCQJKGJDVI3XQCNBU3OZI',
        },
    },
};
class XlmOrderBook {
    constructor(chainId, envFcxApiHost, envHorizonHost, _fcxHost = constants_2.FCX_HOST_BY_CHAIN[chainId], _horizonUrl = constants_2.HORIZON_HOST_BY_CHAIN[chainId], _tokens = constants_2.TOKENS_BY_CHAIN[chainId], _tokensMap = TOKENS_MAP_BY_CHAIN[chainId]) {
        this.chainId = chainId;
        this.envFcxApiHost = envFcxApiHost;
        this.envHorizonHost = envHorizonHost;
        this._fcxHost = _fcxHost;
        this._horizonUrl = _horizonUrl;
        this._tokens = _tokens;
        this._tokensMap = _tokensMap;
        // override it if it is set in .env
        if (this.envFcxApiHost) {
            this._fcxHost = this.envFcxApiHost;
        }
        if (this.envHorizonHost) {
            this._horizonUrl = this.envHorizonHost;
        }
        this._fcxApi = new fcx_api_1.FcxApi(this.chainId, this._fcxHost);
    }
    getOrdersAsync(makerToken, takerToken, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._refreshTokens();
            if (!this._tokens[makerToken] || !this._tokens[takerToken]) {
                return [];
            }
            const buying = this._tokensMap[makerToken];
            const selling = this._tokensMap[takerToken];
            const makerTokenInfo = this._tokens[makerToken];
            const takerTokenInfo = this._tokens[takerToken];
            const result = yield axios_1.default.get(`${this._horizonUrl}/order_book`, {
                params: {
                    buying_asset_type: buying.type,
                    buying_asset_code: buying.code,
                    buying_asset_issuer: buying.issuer,
                    selling_asset_type: selling.type,
                    selling_asset_code: selling.code,
                    selling_asset_issuer: selling.issuer,
                    limit: 30,
                },
            });
            const { bids } = result.data;
            const feeRate = options.xlmFeeRate || new utils_1.BigNumber(0);
            const ratio = new utils_1.BigNumber(1).minus(feeRate);
            const xlmOrders = [];
            for (let bid of bids) {
                const makerXLMAmount = bid.amount;
                const { n, d } = bid.price_r;
                const takerXLMAmount = new utils_1.BigNumber(bid.amount).div(n).times(d);
                let makerAmount = new utils_1.BigNumber(makerXLMAmount).multipliedBy(new utils_1.BigNumber(10).pow(makerTokenInfo.decimal));
                let takerAmount = new utils_1.BigNumber(takerXLMAmount).multipliedBy(new utils_1.BigNumber(10).pow(takerTokenInfo.decimal));
                if (ratio.gt(0)) {
                    takerAmount = takerAmount.div(ratio);
                    makerAmount = makerAmount.div(ratio);
                }
                xlmOrders.push({
                    type: protocol_utils_1.FillQuoteTransformerOrderType.Limit,
                    order: Object.assign({}, new protocol_utils_1.LimitOrder({
                        makerToken,
                        takerToken,
                        makerAmount: makerAmount.integerValue(utils_1.BigNumber.ROUND_DOWN),
                        takerAmount: takerAmount.integerValue(utils_1.BigNumber.ROUND_UP),
                        takerTokenFeeAmount: constants_2.ZERO_AMOUNT,
                        salt: order_utils_1.generatePseudoRandomSalt(),
                        chainId: this.chainId,
                    })),
                    signature: constants_1.INVALID_SIGNATURE,
                });
            }
            // FCX: xlm orders base on user's sell token balance
            if (options.xlmSellTokenBalance) {
                const remainingXlmOrders = [];
                let remainingTakerAmount = new utils_1.BigNumber(options.xlmSellTokenBalance);
                for (let xlmOrder of xlmOrders) {
                    if (remainingTakerAmount.lte(0)) {
                        break;
                    }
                    if (xlmOrder.order.takerAmount.lte(remainingTakerAmount)) {
                        remainingXlmOrders.push(xlmOrder);
                        remainingTakerAmount = remainingTakerAmount.minus(xlmOrder.order.takerAmount);
                    }
                    else {
                        const remainingOrder = _.cloneDeep(xlmOrder);
                        // (remainingTakerAmount / takerAmount) * makerAmount
                        remainingOrder.order.makerAmount = remainingTakerAmount
                            .div(xlmOrder.order.takerAmount)
                            .multipliedBy(xlmOrder.order.makerAmount)
                            .integerValue(utils_1.BigNumber.ROUND_DOWN);
                        remainingOrder.order.takerAmount = remainingTakerAmount;
                        remainingXlmOrders.push(remainingOrder);
                        remainingTakerAmount = new utils_1.BigNumber(0);
                    }
                }
                return remainingXlmOrders;
            }
            return xlmOrders;
        });
    }
    _refreshTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._fcxApi.getTokens();
            if (!result) {
                return;
            }
            const { tokens, tokensMap } = result;
            this._tokens = tokens;
            this._tokensMap = tokensMap;
        });
    }
}
exports.XlmOrderBook = XlmOrderBook;
//# sourceMappingURL=xlm_orderbook.js.map