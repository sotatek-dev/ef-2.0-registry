import { AbiEncoder } from '@0x/utils';
import { AssetSwapperContractAddresses, MarketOperation } from '../../types';
import { CollapsedFill, DexSample, ERC20BridgeSource, MultiHopFillData, NativeCollapsedFill, NativeLimitOrderFillData, NativeRfqOrderFillData, OptimizedMarketBridgeOrder, OptimizedMarketOrder, OptimizedMarketOrderBase, OrderDomain } from './types';
export interface CreateOrderFromPathOpts {
    side: MarketOperation;
    inputToken: string;
    outputToken: string;
    orderDomain: OrderDomain;
    contractAddresses: AssetSwapperContractAddresses;
    bridgeSlippage: number;
}
export declare function createOrdersFromTwoHopSample(sample: DexSample<MultiHopFillData>, opts: CreateOrderFromPathOpts): OptimizedMarketOrder[];
export declare function getErc20BridgeSourceToBridgeSource(source: ERC20BridgeSource): string;
export declare function createBridgeDataForBridgeOrder(order: OptimizedMarketBridgeOrder): string;
export declare function createBridgeOrder(fill: CollapsedFill, makerToken: string, takerToken: string, side: MarketOperation): OptimizedMarketBridgeOrder;
export declare function getMakerTakerTokens(opts: CreateOrderFromPathOpts): [string, string];
export declare const poolEncoder: AbiEncoder.DataType;
export declare const BRIDGE_ENCODERS: {
    [key in Exclude<ERC20BridgeSource, ERC20BridgeSource.Native | ERC20BridgeSource.MultiHop | ERC20BridgeSource.MultiBridge | ERC20BridgeSource.XLM | ERC20BridgeSource.FCX>]: AbiEncoder.DataType;
};
export declare function createNativeOptimizedOrder(fill: NativeCollapsedFill, side: MarketOperation): OptimizedMarketOrderBase<NativeLimitOrderFillData> | OptimizedMarketOrderBase<NativeRfqOrderFillData>;
//# sourceMappingURL=orders.d.ts.map