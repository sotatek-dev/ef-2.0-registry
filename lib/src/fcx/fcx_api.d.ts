import { ChainId } from '@0x/contract-addresses';
interface Tokens {
    [key: string]: {
        decimal: number;
        symbol: string;
    };
}
interface TokensMap {
    [key: string]: {
        type: string;
        code: string;
        issuer: string;
    };
}
interface Pairs {
    [key: string]: boolean;
}
export declare class FcxApi {
    chainId: ChainId;
    fcxApiHost: string;
    private _cache;
    constructor(chainId: ChainId, fcxApiHost: string);
    getTokens(): Promise<{
        tokens: Tokens;
        tokensMap: TokensMap;
    } | undefined>;
    getPairs(): Promise<Pairs | undefined>;
}
export {};
//# sourceMappingURL=fcx_api.d.ts.map