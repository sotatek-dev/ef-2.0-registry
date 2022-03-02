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
exports.FcxOrderBook = void 0;
const contract_addresses_1 = require("@0x/contract-addresses");
const protocol_utils_1 = require("@0x/protocol-utils");
const utils_1 = require("@0x/utils");
const axios_1 = require("axios");
const order_utils_1 = require("@0x/order-utils");
const _ = require("lodash");
const constants_1 = require("../constants");
const constants_2 = require("../utils/market_operation_utils/constants");
const fcx_api_1 = require("./fcx_api");
const VALID_PAIR_BY_CHAIN = {
    [contract_addresses_1.ChainId.BSC]: {},
    [contract_addresses_1.ChainId.Chapel]: {},
};
class FcxOrderBook {
    constructor(chainId, envFcxApiHost, _fcxHost = constants_2.FCX_HOST_BY_CHAIN[chainId], _tokens = constants_2.TOKENS_BY_CHAIN[chainId], _validPair = VALID_PAIR_BY_CHAIN[chainId]) {
        this.chainId = chainId;
        this.envFcxApiHost = envFcxApiHost;
        this._fcxHost = _fcxHost;
        this._tokens = _tokens;
        this._validPair = _validPair;
        // override it if it is set in .env
        if (this.envFcxApiHost) {
            this._fcxHost = this.envFcxApiHost;
        }
        this._fcxApi = new fcx_api_1.FcxApi(this.chainId, this._fcxHost);
    }
    getOrdersAsync(makerToken, takerToken, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._refreshPairs();
            if (!this._tokens[makerToken] || !this._tokens[takerToken]) {
                return [];
            }
            if (!this._validPair[`${makerToken}/${takerToken}`] && !this._validPair[`${takerToken}/${makerToken}`]) {
                return [];
            }
            // usingAsks = true if maker/taker = base/quote
            const usingAsks = this._validPair[`${makerToken}/${takerToken}`];
            const base = usingAsks ? makerToken : takerToken;
            const quote = makerToken === base ? takerToken : makerToken;
            const makerTokenInfo = this._tokens[makerToken];
            const takerTokenInfo = this._tokens[takerToken];
            const result = yield axios_1.default.get(`${this._fcxHost}/api/v1/orderbook`, {
                params: {
                    base,
                    quote,
                },
            });
            const { code, data } = result.data;
            // TODO: check return code
            // if (!code) {
            //     return [];
            // }
            const rows = usingAsks ? data.asks : data.bids;
            const feeRate = options.fcxFeeRate || new utils_1.BigNumber(0);
            const ratio = new utils_1.BigNumber(1).minus(feeRate);
            // tuanha - add bnb fee in orderbook
            const amountFeeRes = yield axios_1.default.get(`${this._fcxHost}/api/v1/fee-to-taker-amount`, {
                params: {
                    takerToken
                },
            });
            const { codeRes, dataRes } = amountFeeRes.data;
            const feeAmount = dataRes.amount;
            const fcxOrders = [];
            for (let row of rows) {
                if (new utils_1.BigNumber(row.amount).lte(0)) {
                    continue;
                }
                const makerFCXAmount = usingAsks
                    ? new utils_1.BigNumber(row.amount)
                    : new utils_1.BigNumber(row.amount).multipliedBy(row.price);
                const takerFCXAmount = usingAsks
                    ? new utils_1.BigNumber(row.amount).multipliedBy(row.price)
                    : new utils_1.BigNumber(row.amount);
                let makerAmount = new utils_1.BigNumber(makerFCXAmount).multipliedBy(new utils_1.BigNumber(10).pow(makerTokenInfo.decimal));
                let takerAmount = new utils_1.BigNumber(takerFCXAmount).multipliedBy(new utils_1.BigNumber(10).pow(takerTokenInfo.decimal));
                if (ratio.gt(0)) {
                    takerAmount = takerAmount.div(ratio);
                    makerAmount = makerAmount.div(ratio);
                }
                takerAmount = takerAmount.minus(feeAmount);
                fcxOrders.push({
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
            if (options.bscSellTokenBalance) {
                const remainingFcxOrders = [];
                let remainingTakerAmount = new utils_1.BigNumber(options.bscSellTokenBalance);
                for (let fcxOrder of fcxOrders) {
                    if (remainingTakerAmount.lte(0)) {
                        break;
                    }
                    if (fcxOrder.order.takerAmount.lte(remainingTakerAmount)) {
                        remainingFcxOrders.push(fcxOrder);
                        remainingTakerAmount = remainingTakerAmount.minus(fcxOrder.order.takerAmount);
                    }
                    else {
                        const remainingOrder = _.cloneDeep(fcxOrder);
                        // (remainingTakerAmount / takerAmount) * makerAmount
                        remainingOrder.order.makerAmount = remainingTakerAmount
                            .div(fcxOrder.order.takerAmount)
                            .multipliedBy(fcxOrder.order.makerAmount)
                            .integerValue(utils_1.BigNumber.ROUND_DOWN);
                        remainingOrder.order.takerAmount = remainingTakerAmount;
                        remainingFcxOrders.push(remainingOrder);
                        remainingTakerAmount = new utils_1.BigNumber(0);
                    }
                }
                return remainingFcxOrders;
            }
            return fcxOrders;
        });
    }
    isValidPair(makerToken, takerToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._refreshPairs();
            return this._validPair[`${makerToken}/${takerToken}`];
        });
    }
    _refreshPairs() {
        return __awaiter(this, void 0, void 0, function* () {
            const [tokensResult, pairs] = yield Promise.all([this._fcxApi.getTokens(), this._fcxApi.getPairs()]);
            if (!tokensResult || !pairs) {
                return;
            }
            const { tokens } = tokensResult;
            this._tokens = tokens;
            this._validPair = pairs;
        });
    }
}
exports.FcxOrderBook = FcxOrderBook;
//# sourceMappingURL=fcx_orderbook.js.map