import { ChainId } from '@0x/contract-addresses';
import { SignedNativeOrder, SwapQuoteRequestOpts } from '../types';
export declare class FcxOrderBook {
    chainId: ChainId;
    envFcxApiHost: string | undefined;
    private readonly _fcxHost;
    private _tokens;
    private _validPair;
    private _fcxApi;
    constructor(chainId: ChainId, envFcxApiHost: string | undefined, _fcxHost?: string, _tokens?: {
        [key: string]: {
            decimal: number;
            symbol: string;
        };
    }, _validPair?: {
        [key: string]: boolean;
    });
    getOrdersAsync(makerToken: string, takerToken: string, options: Partial<SwapQuoteRequestOpts>): Promise<SignedNativeOrder[]>;
    isValidPair(makerToken: string, takerToken: string): Promise<boolean>;
    private _refreshPairs;
}
//# sourceMappingURL=fcx_orderbook.d.ts.map