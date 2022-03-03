import { BigNumber } from '@0x/utils';
import { MarketOperation } from '../../types';
import { Path, PathPenaltyOpts } from './path';
import { Fill } from './types';
/**
 * Find the optimal mixture of fills that maximizes (for sells) or minimizes
 * (for buys) output, while meeting the input requirement.
 */
export declare function findOptimalPathAsync(side: MarketOperation, fills: Fill[][], targetInput: BigNumber, runLimit?: number, opts?: PathPenaltyOpts): Promise<Path | undefined>;
export declare function fillsToSortedPaths(fills: Fill[][], side: MarketOperation, targetInput: BigNumber, opts: PathPenaltyOpts): Path[];
export declare function reducePaths(sortedPaths: Path[], side: MarketOperation): Path[];
//# sourceMappingURL=path_optimizer.d.ts.map