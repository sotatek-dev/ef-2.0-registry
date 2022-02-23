import { BigNumber } from '@0x/utils';
import { MarketOperation } from '../types';
import { FeeSchedule, OptimizedMarketOrder } from './market_operation_utils/types';
export interface QuoteFillResult {
    makerAssetAmount: BigNumber;
    takerAssetAmount: BigNumber;
    takerFeeMakerAssetAmount: BigNumber;
    takerFeeTakerAssetAmount: BigNumber;
    totalMakerAssetAmount: BigNumber;
    totalTakerAssetAmount: BigNumber;
    protocolFeeAmount: BigNumber;
    gas: number;
    fillAmountBySource: {
        [source: string]: BigNumber;
    };
}
interface IntermediateQuoteFillResult {
    input: BigNumber;
    output: BigNumber;
    inputFee: BigNumber;
    outputFee: BigNumber;
    protocolFee: BigNumber;
    gas: number;
    inputBySource: {
        [source: string]: BigNumber;
    };
}
export interface QuoteFillInfo {
    orders: OptimizedMarketOrder[];
    fillAmount: BigNumber;
    gasPrice: BigNumber;
    side: MarketOperation;
    opts: Partial<QuoteFillInfoOpts>;
}
export interface QuoteFillInfoOpts {
    gasSchedule: FeeSchedule;
    protocolFeeMultiplier: BigNumber;
    slippage: number;
}
export interface QuoteFillOrderCall {
    order: OptimizedMarketOrder;
    totalOrderInput: BigNumber;
    totalOrderOutput: BigNumber;
    totalOrderInputFee: BigNumber;
    totalOrderOutputFee: BigNumber;
}
export declare function simulateBestCaseFill(quoteInfo: QuoteFillInfo): QuoteFillResult;
export declare function simulateWorstCaseFill(quoteInfo: QuoteFillInfo): QuoteFillResult;
export declare function fillQuoteOrders(fillOrders: QuoteFillOrderCall[], inputAmount: BigNumber, protocolFeePerFillOrder: BigNumber, gasSchedule: FeeSchedule): IntermediateQuoteFillResult;
export {};
//# sourceMappingURL=quote_simulation.d.ts.map