import { Pool } from '@balancer-labs/sor/dist/types';
import { ChainId } from '@0x/contract-addresses';
import { CacheValue, PoolsCache } from './pools_cache';
import { ERC20BridgeSource } from '../types';
interface BalancerPoolResponse {
    id: string;
    swapFee: string;
    tokens: Array<{
        address: string;
        decimals: number;
        balance: string;
    }>;
    tokensList: string[];
    totalWeight: string;
}
export declare class BalancerPoolsCache extends PoolsCache {
    envSubgraph?: string | undefined;
    private readonly source?;
    private readonly _subgraphUrl;
    private readonly maxPoolsFetched;
    private readonly _topPoolsFetched;
    constructor(chainId: ChainId, envSubgraph?: string | undefined, source?: ERC20BridgeSource | undefined, _subgraphUrl?: string, cache?: {
        [key: string]: CacheValue;
    }, maxPoolsFetched?: number, _topPoolsFetched?: number);
    protected _fetchPoolsForPairAsync(takerToken: string, makerToken: string): Promise<Pool[]>;
    protected _loadTopPoolsAsync(): Promise<void>;
    protected _fetchTopPoolsAsync(): Promise<BalancerPoolResponse[]>;
}
export {};
//# sourceMappingURL=balancer_utils.d.ts.map