// SPDX-License-Identifier: Apache-2.0
/*

  Copyright 2020 ZeroEx Intl.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

*/

pragma solidity ^0.6;
pragma experimental ABIEncoderV2;

interface IAutoRoute{

    function getAmountsIn(
        uint256 amountOut,
        address[] memory paths,
        string[] memory poolType, 
        address[] memory dmmPoolAddresses
    )
        external
        view
        returns (uint256[] memory amounts);

    function getAmountsOut(
        uint256 amountIn, 
        address[] memory paths, 
        string[] memory poolType, 
        address[] memory dmmPoolAddresses
    )
        external
        view
        returns (uint256[] memory amounts);
}



contract AutoRouteSampler
{
    /// @dev Gas limit for auto route calls.
    uint256 constant private AUTO_ROUTE_CALL_GAS = 150e3; // 150k

    struct ExtraParams {
        address router;
        address[] path;
        string[] poolType;
        address[] dmmPoolAddresses;
        uint256[] amountTokens;
    }

    function sampleSellsFromAutoRoute(
        ExtraParams memory params
    )
        public
        view
        returns (address[] memory pools, uint256[] memory takerTokenAmounts)
    {
        uint256 numSamples = params.amountTokens.length;
        takerTokenAmounts = new uint256[](numSamples);
        {
            for (uint256 i = 0; i < numSamples; i++) {
                try
                    IAutoRoute(params.router).getAmountsOut
                        {gas: AUTO_ROUTE_CALL_GAS}
                        (params.amountTokens[i], params.path, params.poolType, params.dmmPoolAddresses)
                    returns (uint256[] memory amounts)
                {
                    takerTokenAmounts[i] = amounts[params.path.length - 1];
                    // Break early if there are 0 amounts
                    if (takerTokenAmounts[i] == 0) {
                        break;
                    }
                } catch (bytes memory) {
                    // Swallow failures, leaving all results as zero.
                    break;
                }
            }
        }
    }

    function sampleBuysFromAutoRoute(
        ExtraParams memory params
    )
        public
        view
        returns (address[] memory pools, uint256[] memory makerTokenAmounts)
    {
        uint256 numSamples = params.amountTokens.length;
        makerTokenAmounts = new uint256[](numSamples);
        {
            for (uint256 i = 0; i < numSamples; i++) {
                try
                    IAutoRoute(params.router).getAmountsIn
                        {gas: AUTO_ROUTE_CALL_GAS}
                        (params.amountTokens[i], params.path, params.poolType, params.dmmPoolAddresses)
                    returns (uint256[] memory amounts)
                {
                    makerTokenAmounts[i] = amounts[0];
                    // Break early if there are 0 amounts
                    if (makerTokenAmounts[i] == 0) {
                        break;
                    }
                } catch (bytes memory) {
                    // Swallow failures, leaving all results as zero.
                    break;
                }
            }
        }
    }
}
