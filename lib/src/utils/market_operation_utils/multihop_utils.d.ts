import { BigNumber } from '@0x/utils';
import { Omit } from '../../types';
import { DexSample, ExchangeProxyOverhead, FeeSchedule, MarketSideLiquidity, MultiHopFillData, TokenAdjacencyGraph } from './types';
/**
 * Given a token pair, returns the intermediate tokens to consider for two-hop routes.
 */
export declare function getIntermediateTokens(makerToken: string, takerToken: string, tokenAdjacencyGraph: TokenAdjacencyGraph): string[];
/**
 * Returns the best two-hop quote and the fee-adjusted rate of that quote.
 */
export declare function getBestTwoHopQuote(marketSideLiquidity: Omit<MarketSideLiquidity, 'makerTokenDecimals' | 'takerTokenDecimals'>, feeSchedule?: FeeSchedule, exchangeProxyOverhead?: ExchangeProxyOverhead): {
    quote: DexSample<MultiHopFillData> | undefined;
    adjustedRate: BigNumber;
};
//# sourceMappingURL=multihop_utils.d.ts.map