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
exports.FcxApi = void 0;
const axios_1 = require("axios");
const NodeCache = require("node-cache");
const _ = require("lodash");
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Native"] = 1] = "Native";
    TokenType[TokenType["CreditAlphanum4"] = 2] = "CreditAlphanum4";
    TokenType[TokenType["CreditAlphanum12"] = 3] = "CreditAlphanum12";
})(TokenType || (TokenType = {}));
const getTokenTypeString = (tokenType) => {
    switch (tokenType) {
        case TokenType.Native:
            return 'native';
        case TokenType.CreditAlphanum4:
            return 'credit_alphanum4';
        case TokenType.CreditAlphanum12:
            return 'credit_alphanum12';
    }
};
class FcxApi {
    constructor(chainId, fcxApiHost) {
        this.chainId = chainId;
        this.fcxApiHost = fcxApiHost;
        this._cache = new NodeCache();
    }
    getTokens() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this._cache.has('tokens')) {
                return this._cache.get('tokens');
            }
            const result = yield axios_1.default.get(`${this.fcxApiHost}/api/v1/coins/list`, {});
            const tokensList = ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data) || [];
            const tokens = {};
            const tokensMap = {};
            for (let token of tokensList) {
                if (token.type === TokenType.Native) {
                    continue;
                }
                const address = token.bsc_address.toLowerCase();
                tokens[address] = { symbol: token.symbol, decimal: Number(token.decimal) };
                tokensMap[address] = {
                    type: getTokenTypeString(token.type),
                    code: token.name,
                    issuer: token.stellar_issuer,
                };
            }
            if (!_.isEmpty(tokens) || !_.isEmpty(tokensMap)) {
                this._cache.set('tokens', { tokens, tokensMap }, 3600);
            }
            return { tokens, tokensMap };
        });
    }
    getPairs() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this._cache.has('pairs')) {
                return this._cache.get('pairs');
            }
            const result = yield axios_1.default.get(`${this.fcxApiHost}/api/v1/pair/list`, {});
            const pairsList = ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data) || [];
            const pairs = {};
            for (let pair of pairsList) {
                const key = `${pair.base_bsc_address.toLowerCase()}/${pair.quote_bsc_address.toLowerCase()}`;
                pairs[key] = true;
            }
            if (!_.isEmpty(pairs)) {
                this._cache.set('pairs', pairs, 3600);
            }
            return pairs;
        });
    }
}
exports.FcxApi = FcxApi;
//# sourceMappingURL=fcx_api.js.map