"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../src/utils/market_operation_utils/types");
const fills_1 = require("../src/utils/market_operation_utils/fills");
const sampler_data_1 = require("./utils/sampler_data");
const utils_1 = require("@0x/utils");
const protocol_utils_1 = require("@0x/protocol-utils");
const constants_1 = require("../src/utils/market_operation_utils/constants");
const CHAIN_ID = 1;
const EMPTY_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
// tslint:disable: custom-no-magic-numbers
describe('DexSampler tests========================================================================================>', () => {
    console.log("====================================================================================================> SOR");
    describe('getSampleAmounts()', () => {
        const fcxQuotes = (sampler_data_1.OnlyOrderBook_Case_1.ef || []).map(q => ({
            order: Object.assign({}, new protocol_utils_1.LimitOrder(Object.assign({}, q.order))),
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
            outputAmountPerEth: new utils_1.BigNumber(0),
            inputAmountPerEth: new utils_1.BigNumber(0),
            excludedSources: [types_1.ERC20BridgeSource.LiquidityProvider, types_1.ERC20BridgeSource.MultiBridge],
            feeSchedule: {},
            bscSellTokenBalance: new utils_1.BigNumber(Infinity),
        });
        console.log(fills);
    });
});
// tslint:disable-next-line: max-file-line-count
//# sourceMappingURL=a_sor.js.map