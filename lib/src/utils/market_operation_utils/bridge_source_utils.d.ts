import { ChainId } from '@0x/contract-addresses';
import { BigNumber } from '@0x/utils';
import { CurveInfo, ERC20BridgeSource } from './types';
/**
 * Filter Kyber reserves which should not be used (0xbb bridged reserves)
 * @param reserveId Kyber reserveId
 */
export declare function isAllowedKyberReserveId(reserveId: string): boolean;
export declare function isValidAddress(address: string | String): address is string;
/**
 * Returns the offsets to be used to discover Kyber reserves
 */
export declare function getKyberOffsets(): BigNumber[];
export declare function getDodoV2Offsets(): BigNumber[];
export declare function getShellsForPair(chainId: ChainId, takerToken: string, makerToken: string): string[];
export declare function getComponentForPair(chainId: ChainId, takerToken: string, makerToken: string): string[];
export declare function getMStableForPair(chainId: ChainId, takerToken: string, makerToken: string): string[];
export declare function getCurveInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getCurveV2InfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getSwerveInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getSnowSwapInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getNerveInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getFirebirdOneSwapInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getBeltInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getEllipsisInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getSmoothyInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getSaddleInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getIronSwapInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getXSigmaInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getAcryptosInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[];
export declare function getShellLikeInfosForPair(chainId: ChainId, takerToken: string, makerToken: string, source: ERC20BridgeSource.Shell | ERC20BridgeSource.Component | ERC20BridgeSource.MStable): string[];
export interface CurveDetailedInfo extends CurveInfo {
    makerTokenIdx: number;
    takerTokenIdx: number;
}
export declare function getCurveLikeInfosForPair(chainId: ChainId, takerToken: string, makerToken: string, source: ERC20BridgeSource.Curve | ERC20BridgeSource.CurveV2 | ERC20BridgeSource.Swerve | ERC20BridgeSource.SnowSwap | ERC20BridgeSource.Nerve | ERC20BridgeSource.Belt | ERC20BridgeSource.Ellipsis | ERC20BridgeSource.Smoothy | ERC20BridgeSource.Saddle | ERC20BridgeSource.IronSwap | ERC20BridgeSource.XSigma | ERC20BridgeSource.FirebirdOneSwap | ERC20BridgeSource.ACryptos): CurveDetailedInfo[];
export declare function uniswapV2LikeRouterAddress(chainId: ChainId, source: ERC20BridgeSource.UniswapV2 | ERC20BridgeSource.SushiSwap | ERC20BridgeSource.CryptoCom | ERC20BridgeSource.PancakeSwap | ERC20BridgeSource.PancakeSwapV2 | ERC20BridgeSource.BakerySwap | ERC20BridgeSource.ApeSwap | ERC20BridgeSource.CafeSwap | ERC20BridgeSource.CheeseSwap | ERC20BridgeSource.JulSwap | ERC20BridgeSource.QuickSwap | ERC20BridgeSource.ComethSwap | ERC20BridgeSource.Dfyn | ERC20BridgeSource.WaultSwap | ERC20BridgeSource.Polydex | ERC20BridgeSource.ShibaSwap | ERC20BridgeSource.JetSwap): string;
export declare function getAutoRouteAddress(chainId: ChainId): string;
export declare function isBadTokenForSource(token: string, source: ERC20BridgeSource): boolean;
//# sourceMappingURL=bridge_source_utils.d.ts.map