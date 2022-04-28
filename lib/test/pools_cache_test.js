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
const chai = require("chai");
require("mocha");
const src_1 = require("../src");
const types_1 = require("../src/types");
const constants_1 = require("../src/utils/market_operation_utils/constants");
const fills_1 = require("../src/utils/market_operation_utils/fills");
const path_optimizer_1 = require("../src/utils/market_operation_utils/path_optimizer");
const chai_setup_1 = require("./utils/chai_setup");
const sampler_data_1 = require("./utils/sampler_data");
const utils_1 = require("./utils/utils");
chai_setup_1.chaiSetup.configure();
const expect = chai.expect;
const timeoutMs = 5000;
const poolKeys = ['id', 'balanceIn', 'balanceOut', 'weightIn', 'weightOut', 'swapFee'];
describe('Test SOR from sample', () => {
    it('100% orderbook - 1 order', () => __awaiter(void 0, void 0, void 0, function* () {
        const fcxQuotes = (sampler_data_1.OnlyOrderBook_Case_1.ef || []).map(q => ({
            order: Object.assign({}, new src_1.LimitOrder(Object.assign({}, q.order))),
            signature: q.signature,
            fillableMakerAmount: q.order.makerAmount,
            fillableTakerAmount: q.order.takerAmount,
            fillableTakerFeeAmount: constants_1.ZERO_AMOUNT,
            type: q.type,
        }));
        const fills = fills_1.createFills({
            side: sampler_data_1.OnlyOrderBook_Case_1.side,
            orders: [],
            xlmOrders: [],
            fcxOrders: [...fcxQuotes],
            dexQuotes: sampler_data_1.OnlyOrderBook_Case_1.autoRoute,
            targetInput: sampler_data_1.OnlyOrderBook_Case_1.targetAmount,
            outputAmountPerEth: new src_1.BigNumber(0),
            inputAmountPerEth: new src_1.BigNumber(0),
            excludedSources: [src_1.ERC20BridgeSource.LiquidityProvider, src_1.ERC20BridgeSource.MultiBridge],
            feeSchedule: {},
            bscSellTokenBalance: new src_1.BigNumber(Infinity),
        });
        const path = yield path_optimizer_1.findOptimalPathAsync(types_1.MarketOperation.Sell, fills, sampler_data_1.OnlyOrderBook_Case_1.targetAmount);
        const total = utils_1.getTotalOut(path === null || path === void 0 ? void 0 : path.fills);
        expect(total.toString()).to.eq(sampler_data_1.OnlyOrderBook_Case_1.expertOutput.toString());
    }));
    it('100% orderbook - 2 order', () => __awaiter(void 0, void 0, void 0, function* () {
        const fcxQuotes = (sampler_data_1.OnlyOrderBook_Case_2.ef || []).map(q => ({
            order: Object.assign({}, new src_1.LimitOrder(Object.assign({}, q.order))),
            signature: q.signature,
            fillableMakerAmount: q.order.makerAmount,
            fillableTakerAmount: q.order.takerAmount,
            fillableTakerFeeAmount: constants_1.ZERO_AMOUNT,
            type: q.type,
        }));
        const fills = fills_1.createFills({
            side: sampler_data_1.OnlyOrderBook_Case_2.side,
            orders: [],
            xlmOrders: [],
            fcxOrders: [...fcxQuotes],
            dexQuotes: sampler_data_1.OnlyOrderBook_Case_2.autoRoute,
            targetInput: sampler_data_1.OnlyOrderBook_Case_2.targetAmount,
            outputAmountPerEth: new src_1.BigNumber(0),
            inputAmountPerEth: new src_1.BigNumber(0),
            excludedSources: [src_1.ERC20BridgeSource.LiquidityProvider, src_1.ERC20BridgeSource.MultiBridge],
            feeSchedule: {},
            bscSellTokenBalance: new src_1.BigNumber(Infinity),
        });
        const path = yield path_optimizer_1.findOptimalPathAsync(types_1.MarketOperation.Sell, fills, sampler_data_1.OnlyOrderBook_Case_2.targetAmount);
        const total = utils_1.getTotalOut(path === null || path === void 0 ? void 0 : path.fills);
        expect(total.toString()).to.eq(sampler_data_1.OnlyOrderBook_Case_2.expertOutput.toString());
    }));
    it('100% auto route - EF some orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const fcxQuotes = (sampler_data_1.OnlyAutoRoute_Case_1.ef || []).map(q => ({
            order: Object.assign({}, new src_1.LimitOrder(Object.assign({}, q.order))),
            signature: q.signature,
            fillableMakerAmount: q.order.makerAmount,
            fillableTakerAmount: q.order.takerAmount,
            fillableTakerFeeAmount: constants_1.ZERO_AMOUNT,
            type: q.type,
        }));
        const fills = fills_1.createFills({
            side: sampler_data_1.OnlyAutoRoute_Case_1.side,
            orders: [],
            xlmOrders: [],
            fcxOrders: [...fcxQuotes],
            dexQuotes: sampler_data_1.OnlyAutoRoute_Case_1.autoRoute,
            targetInput: sampler_data_1.OnlyAutoRoute_Case_1.targetAmount,
            outputAmountPerEth: new src_1.BigNumber(0),
            inputAmountPerEth: new src_1.BigNumber(0),
            excludedSources: [src_1.ERC20BridgeSource.LiquidityProvider, src_1.ERC20BridgeSource.MultiBridge],
            feeSchedule: {},
            bscSellTokenBalance: new src_1.BigNumber(Infinity),
        });
        const path = yield path_optimizer_1.findOptimalPathAsync(types_1.MarketOperation.Sell, fills, sampler_data_1.OnlyAutoRoute_Case_1.targetAmount);
        const total = utils_1.getTotalOut(path === null || path === void 0 ? void 0 : path.fills);
        const totalIn = utils_1.getTotalIn(path === null || path === void 0 ? void 0 : path.fills);
        expect(total.toString()).to.eq(sampler_data_1.OnlyAutoRoute_Case_1.expertOutput.toString());
        expect(totalIn.toString()).to.eq(sampler_data_1.OnlyAutoRoute_Case_1.targetAmount.toString());
    }));
    it('100% auto route - EF have no order', () => __awaiter(void 0, void 0, void 0, function* () {
        const fills = fills_1.createFills({
            side: sampler_data_1.OnlyAutoRoute_Case_2.side,
            orders: [],
            xlmOrders: [],
            fcxOrders: [...[]],
            dexQuotes: sampler_data_1.OnlyAutoRoute_Case_2.autoRoute,
            targetInput: sampler_data_1.OnlyAutoRoute_Case_2.targetAmount,
            outputAmountPerEth: new src_1.BigNumber(0),
            inputAmountPerEth: new src_1.BigNumber(0),
            excludedSources: [src_1.ERC20BridgeSource.LiquidityProvider, src_1.ERC20BridgeSource.MultiBridge],
            feeSchedule: {},
            bscSellTokenBalance: new src_1.BigNumber(Infinity),
        });
        const path = yield path_optimizer_1.findOptimalPathAsync(types_1.MarketOperation.Sell, fills, sampler_data_1.OnlyAutoRoute_Case_2.targetAmount);
        const total = utils_1.getTotalOut(path === null || path === void 0 ? void 0 : path.fills);
        const totalIn = utils_1.getTotalIn(path === null || path === void 0 ? void 0 : path.fills);
        expect(total.toString()).to.eq(sampler_data_1.OnlyAutoRoute_Case_2.expertOutput.toString());
        expect(totalIn.toString()).to.eq(sampler_data_1.OnlyAutoRoute_Case_2.targetAmount.toString());
    }));
    it('both orderbook and autoroute - case 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const fcxQuotes = (sampler_data_1.Both_Case_1.ef || []).map(q => ({
            order: Object.assign({}, new src_1.LimitOrder(Object.assign({}, q.order))),
            signature: q.signature,
            fillableMakerAmount: q.order.makerAmount,
            fillableTakerAmount: q.order.takerAmount,
            fillableTakerFeeAmount: constants_1.ZERO_AMOUNT,
            type: q.type,
        }));
        const fills = fills_1.createFills({
            side: sampler_data_1.Both_Case_1.side,
            orders: [],
            xlmOrders: [],
            fcxOrders: [...fcxQuotes],
            dexQuotes: sampler_data_1.Both_Case_1.autoRoute,
            targetInput: sampler_data_1.Both_Case_1.targetAmount,
            outputAmountPerEth: new src_1.BigNumber(0),
            inputAmountPerEth: new src_1.BigNumber(0),
            excludedSources: [src_1.ERC20BridgeSource.LiquidityProvider, src_1.ERC20BridgeSource.MultiBridge],
            feeSchedule: {},
            bscSellTokenBalance: new src_1.BigNumber(Infinity),
        });
        const path = yield path_optimizer_1.findOptimalPathAsync(types_1.MarketOperation.Sell, fills, sampler_data_1.Both_Case_1.targetAmount);
        const firstPath = path === null || path === void 0 ? void 0 : path.fills[0].fillData;
        const secondPath = path === null || path === void 0 ? void 0 : path.fills[1].source;
        expect(firstPath === null || firstPath === void 0 ? void 0 : firstPath.order.salt).to.eq(sampler_data_1.Both_Case_1.ef[0].order.salt);
        expect(secondPath).to.eq('AutoRoute');
    }));
    it('both orderbook and autoroute - case 2', () => __awaiter(void 0, void 0, void 0, function* () {
        const fcxQuotes = (sampler_data_1.Both_Case_2.ef || []).map(q => ({
            order: Object.assign({}, new src_1.LimitOrder(Object.assign({}, q.order))),
            signature: q.signature,
            fillableMakerAmount: q.order.makerAmount,
            fillableTakerAmount: q.order.takerAmount,
            fillableTakerFeeAmount: constants_1.ZERO_AMOUNT,
            type: q.type,
        }));
        const fills = fills_1.createFills({
            side: sampler_data_1.Both_Case_2.side,
            orders: [],
            xlmOrders: [],
            fcxOrders: [...fcxQuotes],
            dexQuotes: sampler_data_1.Both_Case_2.autoRoute,
            targetInput: sampler_data_1.Both_Case_2.targetAmount,
            outputAmountPerEth: new src_1.BigNumber(0),
            inputAmountPerEth: new src_1.BigNumber(0),
            excludedSources: [src_1.ERC20BridgeSource.LiquidityProvider, src_1.ERC20BridgeSource.MultiBridge],
            feeSchedule: {},
            bscSellTokenBalance: new src_1.BigNumber(Infinity),
        });
        const path = yield path_optimizer_1.findOptimalPathAsync(types_1.MarketOperation.Sell, fills, sampler_data_1.Both_Case_2.targetAmount);
        const firstPath = path === null || path === void 0 ? void 0 : path.fills[0].fillData;
        const secondPath = path === null || path === void 0 ? void 0 : path.fills[1].fillData;
        expect(firstPath === null || firstPath === void 0 ? void 0 : firstPath.order.salt).to.eq(sampler_data_1.Both_Case_2.ef[1].order.salt);
        expect(secondPath === null || secondPath === void 0 ? void 0 : secondPath.order.salt).to.eq(sampler_data_1.Both_Case_2.ef[0].order.salt);
        expect(path === null || path === void 0 ? void 0 : path.fills[2].source).to.eq('AutoRoute');
    }));
    it('not enough lp - case 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const fills = fills_1.createFills({
            side: sampler_data_1.No_Enough_LP_Case_1.side,
            orders: [],
            xlmOrders: [],
            fcxOrders: [...[]],
            dexQuotes: sampler_data_1.No_Enough_LP_Case_1.autoRoute,
            targetInput: sampler_data_1.No_Enough_LP_Case_1.targetAmount,
            outputAmountPerEth: new src_1.BigNumber(0),
            inputAmountPerEth: new src_1.BigNumber(0),
            excludedSources: [src_1.ERC20BridgeSource.LiquidityProvider, src_1.ERC20BridgeSource.MultiBridge],
            feeSchedule: {},
            bscSellTokenBalance: new src_1.BigNumber(Infinity),
        });
        const path = yield path_optimizer_1.findOptimalPathAsync(types_1.MarketOperation.Sell, fills, sampler_data_1.No_Enough_LP_Case_1.targetAmount);
        expect(path).to.eq(undefined);
    }));
    it('not enough lp - case 2', () => __awaiter(void 0, void 0, void 0, function* () {
        const fcxQuotes = (sampler_data_1.No_Enough_LP_Case_2.ef || []).map(q => ({
            order: Object.assign({}, new src_1.LimitOrder(Object.assign({}, q.order))),
            signature: q.signature,
            fillableMakerAmount: q.order.makerAmount,
            fillableTakerAmount: q.order.takerAmount,
            fillableTakerFeeAmount: constants_1.ZERO_AMOUNT,
            type: q.type,
        }));
        const fills = fills_1.createFills({
            side: sampler_data_1.No_Enough_LP_Case_2.side,
            orders: [],
            xlmOrders: [],
            fcxOrders: [...fcxQuotes],
            dexQuotes: sampler_data_1.No_Enough_LP_Case_2.autoRoute,
            targetInput: sampler_data_1.No_Enough_LP_Case_2.targetAmount,
            outputAmountPerEth: new src_1.BigNumber(0),
            inputAmountPerEth: new src_1.BigNumber(0),
            excludedSources: [src_1.ERC20BridgeSource.LiquidityProvider, src_1.ERC20BridgeSource.MultiBridge],
            feeSchedule: {},
            bscSellTokenBalance: new src_1.BigNumber(Infinity),
        });
        const path = yield path_optimizer_1.findOptimalPathAsync(types_1.MarketOperation.Sell, fills, sampler_data_1.No_Enough_LP_Case_2.targetAmount);
        expect(path).to.eq(undefined);
    }));
});
//# sourceMappingURL=pools_cache_test.js.map