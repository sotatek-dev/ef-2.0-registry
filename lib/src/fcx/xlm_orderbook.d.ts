import { ChainId } from '@0x/contract-addresses';
import { SignedNativeOrder, SwapQuoteRequestOpts } from '../types';
export declare class XlmOrderBook {
    chainId: ChainId;
    envFcxApiHost: string | undefined;
    envHorizonHost: string | undefined;
    private readonly _fcxHost;
    private readonly _horizonUrl;
    private _tokens;
    private _tokensMap;
    private _fcxApi;
    constructor(chainId: ChainId, envFcxApiHost: string | undefined, envHorizonHost: string | undefined, _fcxHost?: string, _horizonUrl?: string, _tokens?: {
        [key: string]: {
            decimal: number;
            symbol: string;
        };
    }, _tokensMap?: {
        [key: string]: {
            type: string;
            code: string;
            issuer: string;
        };
    });
    getOrdersAsync(makerToken: string, takerToken: string, options: Partial<SwapQuoteRequestOpts>): Promise<SignedNativeOrder[]>;
    private _refreshTokens;
}
//# sourceMappingURL=xlm_orderbook.d.ts.map