import { BigNumber } from '@0x/utils';
import { AssetSwapperContractAddresses, MarketOperation, NativeOrderWithFillableAmounts, SignedNativeOrder } from '../../types';
import { Path } from './path';
import { DexOrderSampler } from './sampler';
import { DexSample, ERC20BridgeSource, GenerateOptimizedOrdersOpts, GetMarketOrdersOpts, MarketSideLiquidity, OptimizerResult, OptimizerResultWithReport, OrderDomain, FeeSchedule, Fill } from './types';
export declare class MarketOperationUtils {
    private readonly _sampler;
    private readonly contractAddresses;
    private readonly _orderDomain;
    private readonly _sellSources;
    private readonly _buySources;
    private readonly _feeSources;
    private readonly _nativeFeeToken;
    private readonly _nativeFeeTokenAmount;
    private static _computeQuoteReport;
    private static _computePriceComparisonsReport;
    constructor(_sampler: DexOrderSampler, contractAddresses: AssetSwapperContractAddresses, _orderDomain: OrderDomain);
    /**
     * Gets the liquidity available for a market sell operation
     * @param nativeOrders Native orders. Assumes LimitOrders not RfqOrders
     * @param takerAmount Amount of taker asset to sell.
     * @param opts Options object.
     * @return MarketSideLiquidity.
     */
    getMarketSellLiquidityAsync(nativeOrders: SignedNativeOrder[], xlmOrders: SignedNativeOrder[], fcxOrders: SignedNativeOrder[], takerAmount: BigNumber, opts?: Partial<GetMarketOrdersOpts>): Promise<MarketSideLiquidity>;
    /**
     * Gets the liquidity available for a market buy operation
     * @param nativeOrders Native orders. Assumes LimitOrders not RfqOrders
     * @param makerAmount Amount of maker asset to buy.
     * @param opts Options object.
     * @return MarketSideLiquidity.
     */
    getMarketBuyLiquidityAsync(nativeOrders: SignedNativeOrder[], xlmOrders: SignedNativeOrder[], fcxOrders: SignedNativeOrder[], makerAmount: BigNumber, opts?: Partial<GetMarketOrdersOpts>): Promise<MarketSideLiquidity>;
    /**
     * gets the orders required for a batch of market buy operations by (potentially) merging native orders with
     * generated bridge orders.
     *
     * NOTE: Currently `getBatchMarketBuyOrdersAsync()` does not support external liquidity providers.
     *
     * @param batchNativeOrders Batch of Native orders. Assumes LimitOrders not RfqOrders
     * @param makerAmounts Array amount of maker asset to buy for each batch.
     * @param opts Options object.
     * @return orders.
     */
    getBatchMarketBuyOrdersAsync(batchNativeOrders: SignedNativeOrder[][], makerAmounts: BigNumber[], opts?: Partial<GetMarketOrdersOpts>): Promise<Array<OptimizerResult | undefined>>;
    createFillTest(opts: {
        side: MarketOperation;
        orders?: NativeOrderWithFillableAmounts[];
        xlmOrders?: NativeOrderWithFillableAmounts[];
        fcxOrders?: NativeOrderWithFillableAmounts[];
        dexQuotes?: DexSample[][];
        targetInput?: BigNumber;
        outputAmountPerEth?: BigNumber;
        inputAmountPerEth?: BigNumber;
        excludedSources?: ERC20BridgeSource[];
        feeSchedule?: FeeSchedule;
        bscSellTokenBalance?: BigNumber;
    }): Fill[][];
    findOptimalPathAsyncTest(side: MarketOperation, fills: Fill[][], targetInput: BigNumber): Promise<Path | undefined>;
    _generateOptimizedOrdersAsync(marketSideLiquidity: MarketSideLiquidity, opts: GenerateOptimizedOrdersOpts): Promise<OptimizerResult>;
    /**
     * @param nativeOrders: Assumes LimitOrders not RfqOrders
     */
    getOptimizerResultAsync(nativeOrders: SignedNativeOrder[], xlmOrders: SignedNativeOrder[], fcxOrders: SignedNativeOrder[], amount: BigNumber, side: MarketOperation, opts?: Partial<GetMarketOrdersOpts>): Promise<OptimizerResultWithReport>;
    private _refreshPoolCacheIfRequiredAsync;
}
//# sourceMappingURL=index.d.ts.map