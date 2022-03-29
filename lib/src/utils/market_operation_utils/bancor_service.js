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
exports.BancorService = void 0;
const sdk_1 = require("@bancor/sdk");
const types_1 = require("@bancor/sdk/dist/types");
const constants_1 = require("./constants");
const findToken = (tokenAddress, graph) => 
// If we're looking for WETH it is stored by Bancor as the 0xeee address
tokenAddress.toLowerCase() === constants_1.MAINNET_TOKENS.WETH.toLowerCase()
    ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
    : Object.keys(graph).filter(k => k.toLowerCase() === tokenAddress.toLowerCase())[0];
class BancorService {
    constructor(sdk) {
        this.sdk = sdk;
    }
    static createAsync(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const sdk = yield sdk_1.SDK.create({ ethereumNodeEndpoint: provider });
            const service = new BancorService(sdk);
            return service;
        });
    }
    getPaths(_fromToken, _toToken) {
        // HACK: We reach into the blockchain object and pull in it's cache of tokens
        // and we use it's internal non-async getPathsFunc
        try {
            const blockchain = this.sdk._core.blockchains[types_1.BlockchainType.Ethereum];
            const fromToken = findToken(_fromToken, blockchain.graph);
            const toToken = findToken(_toToken, blockchain.graph);
            return blockchain.getPathsFunc.bind(blockchain)(fromToken, toToken);
        }
        catch (e) {
            return [];
        }
    }
}
exports.BancorService = BancorService;
//# sourceMappingURL=bancor_service.js.map