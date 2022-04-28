"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducePaths = exports.fillsToSortedPaths = exports.findOptimalPathAsync = void 0;
const utils_1 = require("@0x/utils");
const _ = require("lodash");
const types_1 = require("../../types");
const constants_1 = require("./constants");
const path_1 = require("./path");
const types_2 = require("./types");
// tslint:disable: prefer-for-of custom-no-magic-numbers completed-docs no-bitwise
const RUN_LIMIT_DECAY_FACTOR = 0.5;
/**
 * Find the optimal mixture of fills that maximizes (for sells) or minimizes
 * (for buys) output, while meeting the input requirement.
 */
function findOptimalPathAsync(side, fills, targetInput, runLimit = Math.pow(2, 8), opts = path_1.DEFAULT_PATH_PENALTY_OPTS) {
    return __awaiter(this, void 0, void 0, function* () {
        // Sort fill arrays by descending adjusted completed rate.
        // Remove any paths which cannot impact the optimal path
        const sortedPaths = reducePaths(fillsToSortedPaths(fills, side, targetInput, opts), side);
        if (sortedPaths.length === 0) {
            return undefined;
        }
        const rates = rateBySourcePathId(sortedPaths);
        let optimalPath = sortedPaths[0];
        for (const [i, path] of sortedPaths.slice(1).entries()) {
            optimalPath = mixPaths(side, optimalPath, path, targetInput, runLimit * Math.pow(RUN_LIMIT_DECAY_FACTOR, i), rates, opts.bscSellTokenBalance);
            // Yield to event loop.
            yield Promise.resolve();
        }
        // FCX: IoC order book
        // if (!optimalPath.isComplete()) {
        //     let { input } = optimalPath.size();
        //     let iocInput = targetInput.minus(input);
        //     const fcxFills = optimalPath.fills.filter(fill => fill.source === ERC20BridgeSource.FCX);
        //     if (fcxFills.length > 0 && iocInput.gt(0)) {
        //         // add fill to match targetInput
        //         const lastFcxFill = fcxFills[fcxFills.length - 1];
        //         const newFill = _.cloneDeep(lastFcxFill);
        //         const iocOutput = lastFcxFill.output
        //             .div(lastFcxFill.input)
        //             .times(iocInput)
        //             .integerValue(BigNumber.ROUND_DOWN);
        //         newFill.input = iocInput;
        //         newFill.output = iocOutput;
        //         const fillData = newFill.fillData as NativeOrderWithFillableAmounts;
        //         fillData.fillableMakerAmount = side === MarketOperation.Sell ? newFill.output : newFill.input;
        //         fillData.order.makerAmount = side === MarketOperation.Sell ? newFill.output : newFill.input;
        //         fillData.fillableTakerAmount = side === MarketOperation.Sell ? newFill.input : newFill.output;
        //         fillData.order.takerAmount = side === MarketOperation.Sell ? newFill.input : newFill.output;
        //         fillData.order.salt = new BigNumber(1); // mark as IoC
        //         newFill.fillData = fillData;
        //         // bscSellTokenBalance logic
        //         const bscFilledBalance = optimalPath.fills.reduce((prev: BigNumber, cur: Fill<FillData>) => {
        //             if (cur.source === ERC20BridgeSource.XLM) {
        //                 return prev;
        //             }
        //             return side === MarketOperation.Sell ? prev.plus(cur.input) : prev.plus(cur.output);
        //         }, new BigNumber(0));
        //         const bscSellTokenBalance = opts.bscSellTokenBalance || POSITIVE_INF;
        //         const remainBscBalance = bscSellTokenBalance.minus(bscFilledBalance);
        //         if (side === MarketOperation.Sell) {
        //             const oldInput = newFill.input;
        //             newFill.input = BigNumber.min(newFill.input, remainBscBalance);
        //             newFill.output = newFill.input
        //                 .div(oldInput)
        //                 .times(newFill.output)
        //                 .integerValue(BigNumber.ROUND_DOWN);
        //         } else if (side === MarketOperation.Buy) {
        //             const oldOutput = newFill.output;
        //             newFill.output = BigNumber.min(newFill.output, remainBscBalance);
        //             newFill.input = newFill.output
        //                 .div(oldOutput)
        //                 .times(newFill.input)
        //                 .integerValue(BigNumber.ROUND_DOWN);
        //         }
        //         optimalPath = optimalPath.append(newFill);
        //     }
        //     input = optimalPath.size().input;
        //     iocInput = targetInput.minus(input);
        //     const xlmFills = optimalPath.fills.filter(fill => fill.source === ERC20BridgeSource.XLM);
        //     if (xlmFills.length > 0 && iocInput.gt(0)) {
        //         const lastXlmFill = xlmFills[xlmFills.length - 1];
        //         const newFill = _.cloneDeep(lastXlmFill);
        //         const iocOutput = lastXlmFill.output
        //             .div(lastXlmFill.input)
        //             .times(iocInput)
        //             .integerValue(BigNumber.ROUND_DOWN);
        //         newFill.input = iocInput;
        //         newFill.output = iocOutput;
        //         const fillData = newFill.fillData as NativeOrderWithFillableAmounts;
        //         fillData.fillableMakerAmount = side === MarketOperation.Sell ? newFill.output : newFill.input;
        //         fillData.order.makerAmount = side === MarketOperation.Sell ? newFill.output : newFill.input;
        //         fillData.fillableTakerAmount = side === MarketOperation.Sell ? newFill.input : newFill.output;
        //         fillData.order.takerAmount = side === MarketOperation.Sell ? newFill.input : newFill.output;
        //         fillData.order.salt = new BigNumber(1); // mark as IoC
        //         newFill.fillData = fillData;
        //         // xlmSellTokenBalance logic
        //         const xlmFilledBalance = optimalPath.fills.reduce((prev: BigNumber, cur: Fill<FillData>) => {
        //             if (cur.source !== ERC20BridgeSource.XLM) {
        //                 return prev;
        //             }
        //             return side === MarketOperation.Sell ? prev.plus(cur.input) : prev.plus(cur.output);
        //         }, new BigNumber(0));
        //         const xlmSellTokenBalance = opts.xlmSellTokenBalance || POSITIVE_INF;
        //         const remainXlmBalance = xlmSellTokenBalance.minus(xlmFilledBalance);
        //         if (side === MarketOperation.Sell) {
        //             const oldInput = newFill.input;
        //             newFill.input = BigNumber.min(newFill.input, remainXlmBalance);
        //             newFill.output = newFill.input
        //                 .div(oldInput)
        //                 .times(newFill.output)
        //                 .integerValue(BigNumber.ROUND_DOWN);
        //         } else if (side === MarketOperation.Buy) {
        //             const oldOutput = newFill.output;
        //             newFill.output = BigNumber.min(newFill.output, remainXlmBalance);
        //             newFill.input = newFill.output
        //                 .div(oldOutput)
        //                 .times(newFill.input)
        //                 .integerValue(BigNumber.ROUND_DOWN);
        //         }
        //         optimalPath = optimalPath.append(newFill);
        //     }
        // }
        return optimalPath.isComplete() ? optimalPath : undefined;
    });
}
exports.findOptimalPathAsync = findOptimalPathAsync;
// Sort fill arrays by descending adjusted completed rate.
function fillsToSortedPaths(fills, side, targetInput, opts) {
    const paths = fills.map(singleSourceFills => path_1.Path.create(side, singleSourceFills, targetInput, opts));
    const sortedPaths = paths.sort((a, b) => {
        const aRate = a.adjustedCompleteRate();
        const bRate = b.adjustedCompleteRate();
        // There is a case where the adjusted completed rate isn't sufficient for the desired amount
        // resulting in a NaN div by 0 (output)
        if (bRate.isNaN()) {
            return -1;
        }
        if (aRate.isNaN()) {
            return 1;
        }
        return bRate.comparedTo(aRate);
    });
    return sortedPaths;
}
exports.fillsToSortedPaths = fillsToSortedPaths;
// Remove paths which have no impact on the optimal path
function reducePaths(sortedPaths, side) {
    // Any path which has a min rate that is less than the best adjusted completed rate has no chance of improving
    // the overall route.
    const bestNonNativeCompletePath = sortedPaths.filter(p => p.isComplete() &&
        ![types_2.ERC20BridgeSource.Native, types_2.ERC20BridgeSource.XLM, types_2.ERC20BridgeSource.FCX].includes(p.fills[0].source))[0];
    // If there is no complete path then just go ahead with the sorted paths
    // I.e if the token only exists on sources which cannot sell to infinity
    // or buys where X is greater than all the tokens available in the pools
    if (!bestNonNativeCompletePath) {
        return sortedPaths;
    }
    const bestNonNativeCompletePathAdjustedRate = bestNonNativeCompletePath.adjustedCompleteRate();
    if (!bestNonNativeCompletePathAdjustedRate.isGreaterThan(0)) {
        return sortedPaths;
    }
    const filteredPaths = sortedPaths.filter(p => p.bestRate().isGreaterThanOrEqualTo(bestNonNativeCompletePathAdjustedRate));
    return filteredPaths;
}
exports.reducePaths = reducePaths;
function mixPaths(side, pathA, pathB, targetInput, maxSteps, rates, bscSellTokenBalance = constants_1.POSITIVE_INF) {
    const _maxSteps = Math.max(maxSteps, 32);
    let steps = 0;
    // We assume pathA is the better of the two initially.
    let bestPath = pathA;
    const _walk = (path, remainingFills) => {
        steps += 1;
        if (path.isBetterThan(bestPath)) {
            bestPath = path;
        }
        const remainingInput = targetInput.minus(path.size().input);
        if (remainingInput.isGreaterThan(0)) {
            for (let i = 0; i < remainingFills.length && steps < _maxSteps; ++i) {
                const fill = remainingFills[i];
                // Only walk valid paths.
                if (!path.isValidNextFill(fill)) {
                    continue;
                }
                // FCX: stop if already enough bsc balance
                const bscFilledBalance = path.fills.reduce((prev, cur) => {
                    if (cur.source === types_2.ERC20BridgeSource.XLM) {
                        return prev;
                    }
                    return side === types_1.MarketOperation.Sell ? prev.plus(cur.input) : prev.plus(cur.output);
                }, new utils_1.BigNumber(0));
                let futureBSCBalance = bscFilledBalance;
                if (fill.source !== types_2.ERC20BridgeSource.XLM) {
                    futureBSCBalance = futureBSCBalance.plus(side === types_1.MarketOperation.Sell ? fill.input : fill.output);
                }
                if (futureBSCBalance.gt(bscSellTokenBalance)) {
                    continue;
                }
                // Remove this fill from the next list of candidate fills.
                const nextRemainingFills = remainingFills.slice();
                nextRemainingFills.splice(i, 1);
                // Recurse.
                _walk(path_1.Path.clone(path).append(fill), nextRemainingFills);
            }
        }
    };
    const allFills = [...pathA.fills, ...pathB.fills];
    // Sort subpaths by rate and keep fills contiguous to improve our
    // chances of walking ideal, valid paths first.
    const sortedFills = allFills.sort((a, b) => {
        if (a.sourcePathId !== b.sourcePathId) {
            return rates[b.sourcePathId].comparedTo(rates[a.sourcePathId]);
        }
        return a.index - b.index;
    });
    _walk(path_1.Path.create(side, [], targetInput, pathA.pathPenaltyOpts), sortedFills);
    if (!bestPath.isValid()) {
        throw new Error('nooope');
    }
    return bestPath;
}
function rateBySourcePathId(paths) {
    return _.fromPairs(paths.map(p => [p.fills[0].sourcePathId, p.adjustedRate()]));
}
//# sourceMappingURL=path_optimizer.js.map