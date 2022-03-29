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
exports.ERC20BridgeSamplerContract = void 0;
// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma enum-naming
// tslint:disable:whitespace no-unbound-method no-trailing-whitespace
// tslint:disable:no-unused-variable
const base_contract_1 = require("@0x/base-contract");
const json_schemas_1 = require("@0x/json-schemas");
const utils_1 = require("@0x/utils");
const web3_wrapper_1 = require("@0x/web3-wrapper");
const assert_1 = require("@0x/assert");
const ethers = require("ethers");
// tslint:enable:no-unused-variable
/* istanbul ignore next */
// tslint:disable:array-type
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
class ERC20BridgeSamplerContract extends base_contract_1.BaseContract {
    constructor(address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode = ERC20BridgeSamplerContract.deployedBytecode, encoderOverrides) {
        super('ERC20BridgeSampler', ERC20BridgeSamplerContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode, encoderOverrides);
        this._methodABIIndex = {};
        utils_1.classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
        ERC20BridgeSamplerContract.ABI().forEach((item, index) => {
            if (item.type === 'function') {
                const methodAbi = item;
                this._methodABIIndex[methodAbi.name] = index;
            }
        });
    }
    static deployFrom0xArtifactAsync(artifact, supportedProvider, txDefaults, logDecodeDependencies) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.assert.doesConformToSchema('txDefaults', txDefaults, json_schemas_1.schemas.txDataSchema);
            if (artifact.compilerOutput === undefined) {
                throw new Error('Compiler output not found in the artifact file');
            }
            const provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
            const bytecode = artifact.compilerOutput.evm.bytecode.object;
            const abi = artifact.compilerOutput.abi;
            const logDecodeDependenciesAbiOnly = {};
            if (Object.keys(logDecodeDependencies) !== undefined) {
                for (const key of Object.keys(logDecodeDependencies)) {
                    logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
                }
            }
            return ERC20BridgeSamplerContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly);
        });
    }
    static deployWithLibrariesFrom0xArtifactAsync(artifact, libraryArtifacts, supportedProvider, txDefaults, logDecodeDependencies) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.assert.doesConformToSchema('txDefaults', txDefaults, json_schemas_1.schemas.txDataSchema);
            if (artifact.compilerOutput === undefined) {
                throw new Error('Compiler output not found in the artifact file');
            }
            const provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
            const abi = artifact.compilerOutput.abi;
            const logDecodeDependenciesAbiOnly = {};
            if (Object.keys(logDecodeDependencies) !== undefined) {
                for (const key of Object.keys(logDecodeDependencies)) {
                    logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
                }
            }
            const libraryAddresses = yield ERC20BridgeSamplerContract._deployLibrariesAsync(artifact, libraryArtifacts, new web3_wrapper_1.Web3Wrapper(provider), txDefaults);
            const bytecode = base_contract_1.linkLibrariesInBytecode(artifact, libraryAddresses);
            return ERC20BridgeSamplerContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly);
        });
    }
    static deployAsync(bytecode, abi, supportedProvider, txDefaults, logDecodeDependencies) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.assert.isHexString('bytecode', bytecode);
            assert_1.assert.doesConformToSchema('txDefaults', txDefaults, json_schemas_1.schemas.txDataSchema);
            const provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
            const constructorAbi = base_contract_1.BaseContract._lookupConstructorAbi(abi);
            [] = base_contract_1.BaseContract._formatABIDataItemList(constructorAbi.inputs, [], base_contract_1.BaseContract._bigNumberToString);
            const iface = new ethers.utils.Interface(abi);
            const deployInfo = iface.deployFunction;
            const txData = deployInfo.encode(bytecode, []);
            const web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
            const txDataWithDefaults = yield base_contract_1.BaseContract._applyDefaultsToContractTxDataAsync(Object.assign({ data: txData }, txDefaults), web3Wrapper.estimateGasAsync.bind(web3Wrapper));
            const txHash = yield web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            utils_1.logUtils.log(`transactionHash: ${txHash}`);
            const txReceipt = yield web3Wrapper.awaitTransactionSuccessAsync(txHash);
            utils_1.logUtils.log(`ERC20BridgeSampler successfully deployed at ${txReceipt.contractAddress}`);
            const contractInstance = new ERC20BridgeSamplerContract(txReceipt.contractAddress, provider, txDefaults, logDecodeDependencies);
            contractInstance.constructorArgs = [];
            return contractInstance;
        });
    }
    /**
     * @returns      The contract ABI
     */
    static ABI() {
        const abi = [
            {
                inputs: [
                    {
                        name: 'callDatas',
                        type: 'bytes[]',
                    },
                ],
                name: 'batchCall',
                outputs: [
                    {
                        name: 'callResults',
                        type: 'tuple[]',
                        components: [
                            {
                                name: 'data',
                                type: 'bytes',
                            },
                            {
                                name: 'success',
                                type: 'bool',
                            },
                        ]
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'opts',
                        type: 'tuple',
                        components: [
                            {
                                name: 'reserveOffset',
                                type: 'uint256',
                            },
                            {
                                name: 'hintHandler',
                                type: 'address',
                            },
                            {
                                name: 'networkProxy',
                                type: 'address',
                            },
                            {
                                name: 'weth',
                                type: 'address',
                            },
                            {
                                name: 'hint',
                                type: 'bytes',
                            },
                        ]
                    },
                    {
                        name: 'reserveId',
                        type: 'bytes32',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                ],
                name: 'encodeKyberHint',
                outputs: [
                    {
                        name: 'hint',
                        type: 'bytes',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'tokens',
                        type: 'address[]',
                    },
                    {
                        name: 'account',
                        type: 'address',
                    },
                    {
                        name: 'spender',
                        type: 'address',
                    },
                ],
                name: 'getAllowanceOf',
                outputs: [
                    {
                        name: 'allowances',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'tokens',
                        type: 'address[]',
                    },
                    {
                        name: 'account',
                        type: 'address',
                    },
                ],
                name: 'getBalanceOf',
                outputs: [
                    {
                        name: 'balances',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'orders',
                        type: 'tuple[]',
                        components: [
                            {
                                name: 'makerToken',
                                type: 'address',
                            },
                            {
                                name: 'takerToken',
                                type: 'address',
                            },
                            {
                                name: 'makerAmount',
                                type: 'uint128',
                            },
                            {
                                name: 'takerAmount',
                                type: 'uint128',
                            },
                            {
                                name: 'takerTokenFeeAmount',
                                type: 'uint128',
                            },
                            {
                                name: 'maker',
                                type: 'address',
                            },
                            {
                                name: 'taker',
                                type: 'address',
                            },
                            {
                                name: 'sender',
                                type: 'address',
                            },
                            {
                                name: 'feeRecipient',
                                type: 'address',
                            },
                            {
                                name: 'pool',
                                type: 'bytes32',
                            },
                            {
                                name: 'expiry',
                                type: 'uint64',
                            },
                            {
                                name: 'salt',
                                type: 'uint256',
                            },
                        ]
                    },
                    {
                        name: 'orderSignatures',
                        type: 'tuple[]',
                        components: [
                            {
                                name: 'signatureType',
                                type: 'uint8',
                            },
                            {
                                name: 'v',
                                type: 'uint8',
                            },
                            {
                                name: 'r',
                                type: 'bytes32',
                            },
                            {
                                name: 's',
                                type: 'bytes32',
                            },
                        ]
                    },
                    {
                        name: 'exchange',
                        type: 'address',
                    },
                ],
                name: 'getLimitOrderFillableMakerAssetAmounts',
                outputs: [
                    {
                        name: 'orderFillableMakerAssetAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'order',
                        type: 'tuple',
                        components: [
                            {
                                name: 'makerToken',
                                type: 'address',
                            },
                            {
                                name: 'takerToken',
                                type: 'address',
                            },
                            {
                                name: 'makerAmount',
                                type: 'uint128',
                            },
                            {
                                name: 'takerAmount',
                                type: 'uint128',
                            },
                            {
                                name: 'takerTokenFeeAmount',
                                type: 'uint128',
                            },
                            {
                                name: 'maker',
                                type: 'address',
                            },
                            {
                                name: 'taker',
                                type: 'address',
                            },
                            {
                                name: 'sender',
                                type: 'address',
                            },
                            {
                                name: 'feeRecipient',
                                type: 'address',
                            },
                            {
                                name: 'pool',
                                type: 'bytes32',
                            },
                            {
                                name: 'expiry',
                                type: 'uint64',
                            },
                            {
                                name: 'salt',
                                type: 'uint256',
                            },
                        ]
                    },
                    {
                        name: 'signature',
                        type: 'tuple',
                        components: [
                            {
                                name: 'signatureType',
                                type: 'uint8',
                            },
                            {
                                name: 'v',
                                type: 'uint8',
                            },
                            {
                                name: 'r',
                                type: 'bytes32',
                            },
                            {
                                name: 's',
                                type: 'bytes32',
                            },
                        ]
                    },
                    {
                        name: 'exchange',
                        type: 'address',
                    },
                ],
                name: 'getLimitOrderFillableTakerAmount',
                outputs: [
                    {
                        name: 'fillableTakerAmount',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'orders',
                        type: 'tuple[]',
                        components: [
                            {
                                name: 'makerToken',
                                type: 'address',
                            },
                            {
                                name: 'takerToken',
                                type: 'address',
                            },
                            {
                                name: 'makerAmount',
                                type: 'uint128',
                            },
                            {
                                name: 'takerAmount',
                                type: 'uint128',
                            },
                            {
                                name: 'takerTokenFeeAmount',
                                type: 'uint128',
                            },
                            {
                                name: 'maker',
                                type: 'address',
                            },
                            {
                                name: 'taker',
                                type: 'address',
                            },
                            {
                                name: 'sender',
                                type: 'address',
                            },
                            {
                                name: 'feeRecipient',
                                type: 'address',
                            },
                            {
                                name: 'pool',
                                type: 'bytes32',
                            },
                            {
                                name: 'expiry',
                                type: 'uint64',
                            },
                            {
                                name: 'salt',
                                type: 'uint256',
                            },
                        ]
                    },
                    {
                        name: 'orderSignatures',
                        type: 'tuple[]',
                        components: [
                            {
                                name: 'signatureType',
                                type: 'uint8',
                            },
                            {
                                name: 'v',
                                type: 'uint8',
                            },
                            {
                                name: 'r',
                                type: 'bytes32',
                            },
                            {
                                name: 's',
                                type: 'bytes32',
                            },
                        ]
                    },
                    {
                        name: 'exchange',
                        type: 'address',
                    },
                ],
                name: 'getLimitOrderFillableTakerAssetAmounts',
                outputs: [
                    {
                        name: 'orderFillableTakerAssetAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'tokens',
                        type: 'address[]',
                    },
                ],
                name: 'getTokenDecimals',
                outputs: [
                    {
                        name: 'decimals',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'account',
                        type: 'address',
                    },
                ],
                name: 'isContract',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'params',
                        type: 'tuple',
                        components: [
                            {
                                name: 'router',
                                type: 'address',
                            },
                            {
                                name: 'path',
                                type: 'address[]',
                            },
                            {
                                name: 'poolType',
                                type: 'string[]',
                            },
                            {
                                name: 'dmmPoolAddresses',
                                type: 'address[]',
                            },
                            {
                                name: 'amountTokens',
                                type: 'uint256[]',
                            },
                        ]
                    },
                ],
                name: 'sampleBuysFromAutoRoute',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'poolAddress',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromBalancer',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'poolInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'poolId',
                                type: 'bytes32',
                            },
                            {
                                name: 'vault',
                                type: 'address',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromBalancerV2',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'opts',
                        type: 'tuple',
                        components: [
                            {
                                name: 'registry',
                                type: 'address',
                            },
                            {
                                name: 'paths',
                                type: 'address[][]',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromBancor',
                outputs: [
                    {
                        name: 'bancorNetwork',
                        type: 'address',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'curveInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'poolAddress',
                                type: 'address',
                            },
                            {
                                name: 'sellQuoteFunctionSelector',
                                type: 'bytes4',
                            },
                            {
                                name: 'buyQuoteFunctionSelector',
                                type: 'bytes4',
                            },
                        ]
                    },
                    {
                        name: 'fromTokenIdx',
                        type: 'int128',
                    },
                    {
                        name: 'toTokenIdx',
                        type: 'int128',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromCurve',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'opts',
                        type: 'tuple',
                        components: [
                            {
                                name: 'registry',
                                type: 'address',
                            },
                            {
                                name: 'helper',
                                type: 'address',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromDODO',
                outputs: [
                    {
                        name: 'sellBase',
                        type: 'bool',
                    },
                    {
                        name: 'pool',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'registry',
                        type: 'address',
                    },
                    {
                        name: 'offset',
                        type: 'uint256',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromDODOV2',
                outputs: [
                    {
                        name: 'sellBase',
                        type: 'bool',
                    },
                    {
                        name: 'pool',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'router',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromEth2Dai',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'router',
                        type: 'address',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromKyberDmm',
                outputs: [
                    {
                        name: 'pools',
                        type: 'address[]',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'opts',
                        type: 'tuple',
                        components: [
                            {
                                name: 'reserveOffset',
                                type: 'uint256',
                            },
                            {
                                name: 'hintHandler',
                                type: 'address',
                            },
                            {
                                name: 'networkProxy',
                                type: 'address',
                            },
                            {
                                name: 'weth',
                                type: 'address',
                            },
                            {
                                name: 'hint',
                                type: 'bytes',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromKyberNetwork',
                outputs: [
                    {
                        name: 'reserveId',
                        type: 'bytes32',
                    },
                    {
                        name: 'hint',
                        type: 'bytes',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'lidoInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'stEthToken',
                                type: 'address',
                            },
                            {
                                name: 'wethToken',
                                type: 'address',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromLido',
                outputs: [
                    {
                        name: '',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'pure',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'providerAddress',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromLiquidityProvider',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'router',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromMStable',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'psmInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'psmAddress',
                                type: 'address',
                            },
                            {
                                name: 'ilkIdentifier',
                                type: 'bytes32',
                            },
                            {
                                name: 'gemTokenAddress',
                                type: 'address',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromMakerPsm',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'registry',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromMooniswap',
                outputs: [
                    {
                        name: 'pool',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'pool',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromShell',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'smoothyInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'poolAddress',
                                type: 'address',
                            },
                            {
                                name: 'sellQuoteFunctionSelector',
                                type: 'bytes4',
                            },
                            {
                                name: 'buyQuoteFunctionSelector',
                                type: 'bytes4',
                            },
                        ]
                    },
                    {
                        name: 'fromTokenIdx',
                        type: 'int128',
                    },
                    {
                        name: 'toTokenIdx',
                        type: 'int128',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromSmoothy',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'router',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromUniswap',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'router',
                        type: 'address',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromUniswapV2',
                outputs: [
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'quoter',
                        type: 'address',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleBuysFromUniswapV3',
                outputs: [
                    {
                        name: 'uniswapPaths',
                        type: 'bytes[]',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'opts',
                        type: 'tuple',
                        components: [
                            {
                                name: 'reserveOffset',
                                type: 'uint256',
                            },
                            {
                                name: 'hintHandler',
                                type: 'address',
                            },
                            {
                                name: 'networkProxy',
                                type: 'address',
                            },
                            {
                                name: 'weth',
                                type: 'address',
                            },
                            {
                                name: 'hint',
                                type: 'bytes',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmount',
                        type: 'uint256',
                    },
                ],
                name: 'sampleSellFromKyberNetwork',
                outputs: [
                    {
                        name: 'makerTokenAmount',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'params',
                        type: 'tuple',
                        components: [
                            {
                                name: 'router',
                                type: 'address',
                            },
                            {
                                name: 'path',
                                type: 'address[]',
                            },
                            {
                                name: 'poolType',
                                type: 'string[]',
                            },
                            {
                                name: 'dmmPoolAddresses',
                                type: 'address[]',
                            },
                            {
                                name: 'amountTokens',
                                type: 'uint256[]',
                            },
                        ]
                    },
                ],
                name: 'sampleSellsFromAutoRoute',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'poolAddress',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromBalancer',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'poolInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'poolId',
                                type: 'bytes32',
                            },
                            {
                                name: 'vault',
                                type: 'address',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromBalancerV2',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'opts',
                        type: 'tuple',
                        components: [
                            {
                                name: 'registry',
                                type: 'address',
                            },
                            {
                                name: 'paths',
                                type: 'address[][]',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromBancor',
                outputs: [
                    {
                        name: 'bancorNetwork',
                        type: 'address',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'curveInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'poolAddress',
                                type: 'address',
                            },
                            {
                                name: 'sellQuoteFunctionSelector',
                                type: 'bytes4',
                            },
                            {
                                name: 'buyQuoteFunctionSelector',
                                type: 'bytes4',
                            },
                        ]
                    },
                    {
                        name: 'fromTokenIdx',
                        type: 'int128',
                    },
                    {
                        name: 'toTokenIdx',
                        type: 'int128',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromCurve',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'opts',
                        type: 'tuple',
                        components: [
                            {
                                name: 'registry',
                                type: 'address',
                            },
                            {
                                name: 'helper',
                                type: 'address',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromDODO',
                outputs: [
                    {
                        name: 'sellBase',
                        type: 'bool',
                    },
                    {
                        name: 'pool',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'registry',
                        type: 'address',
                    },
                    {
                        name: 'offset',
                        type: 'uint256',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromDODOV2',
                outputs: [
                    {
                        name: 'sellBase',
                        type: 'bool',
                    },
                    {
                        name: 'pool',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'router',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromEth2Dai',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'router',
                        type: 'address',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromKyberDmm',
                outputs: [
                    {
                        name: 'pools',
                        type: 'address[]',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'opts',
                        type: 'tuple',
                        components: [
                            {
                                name: 'reserveOffset',
                                type: 'uint256',
                            },
                            {
                                name: 'hintHandler',
                                type: 'address',
                            },
                            {
                                name: 'networkProxy',
                                type: 'address',
                            },
                            {
                                name: 'weth',
                                type: 'address',
                            },
                            {
                                name: 'hint',
                                type: 'bytes',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromKyberNetwork',
                outputs: [
                    {
                        name: 'reserveId',
                        type: 'bytes32',
                    },
                    {
                        name: 'hint',
                        type: 'bytes',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'lidoInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'stEthToken',
                                type: 'address',
                            },
                            {
                                name: 'wethToken',
                                type: 'address',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromLido',
                outputs: [
                    {
                        name: '',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'pure',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'providerAddress',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromLiquidityProvider',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'router',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromMStable',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'psmInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'psmAddress',
                                type: 'address',
                            },
                            {
                                name: 'ilkIdentifier',
                                type: 'bytes32',
                            },
                            {
                                name: 'gemTokenAddress',
                                type: 'address',
                            },
                        ]
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromMakerPsm',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'registry',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromMooniswap',
                outputs: [
                    {
                        name: 'pool',
                        type: 'address',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'multibridge',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'intermediateToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromMultiBridge',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'pool',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromShell',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'smoothyInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'poolAddress',
                                type: 'address',
                            },
                            {
                                name: 'sellQuoteFunctionSelector',
                                type: 'bytes4',
                            },
                            {
                                name: 'buyQuoteFunctionSelector',
                                type: 'bytes4',
                            },
                        ]
                    },
                    {
                        name: 'fromTokenIdx',
                        type: 'int128',
                    },
                    {
                        name: 'toTokenIdx',
                        type: 'int128',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromSmoothy',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'router',
                        type: 'address',
                    },
                    {
                        name: 'takerToken',
                        type: 'address',
                    },
                    {
                        name: 'makerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromUniswap',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'router',
                        type: 'address',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromUniswapV2',
                outputs: [
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'quoter',
                        type: 'address',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'takerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                name: 'sampleSellsFromUniswapV3',
                outputs: [
                    {
                        name: 'uniswapPaths',
                        type: 'bytes[]',
                    },
                    {
                        name: 'makerTokenAmounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'registry',
                        type: 'address',
                    },
                    {
                        name: 'mooniswapTakerToken',
                        type: 'address',
                    },
                    {
                        name: 'mooniswapMakerToken',
                        type: 'address',
                    },
                    {
                        name: 'takerTokenAmount',
                        type: 'uint256',
                    },
                ],
                name: 'sampleSingleSellFromMooniswapPool',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'firstHopCalls',
                        type: 'bytes[]',
                    },
                    {
                        name: 'secondHopCalls',
                        type: 'bytes[]',
                    },
                    {
                        name: 'buyAmount',
                        type: 'uint256',
                    },
                ],
                name: 'sampleTwoHopBuy',
                outputs: [
                    {
                        name: 'firstHop',
                        type: 'tuple',
                        components: [
                            {
                                name: 'sourceIndex',
                                type: 'uint256',
                            },
                            {
                                name: 'returnData',
                                type: 'bytes',
                            },
                        ]
                    },
                    {
                        name: 'secondHop',
                        type: 'tuple',
                        components: [
                            {
                                name: 'sourceIndex',
                                type: 'uint256',
                            },
                            {
                                name: 'returnData',
                                type: 'bytes',
                            },
                        ]
                    },
                    {
                        name: 'sellAmount',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'firstHopCalls',
                        type: 'bytes[]',
                    },
                    {
                        name: 'secondHopCalls',
                        type: 'bytes[]',
                    },
                    {
                        name: 'sellAmount',
                        type: 'uint256',
                    },
                ],
                name: 'sampleTwoHopSell',
                outputs: [
                    {
                        name: 'firstHop',
                        type: 'tuple',
                        components: [
                            {
                                name: 'sourceIndex',
                                type: 'uint256',
                            },
                            {
                                name: 'returnData',
                                type: 'bytes',
                            },
                        ]
                    },
                    {
                        name: 'secondHop',
                        type: 'tuple',
                        components: [
                            {
                                name: 'sourceIndex',
                                type: 'uint256',
                            },
                            {
                                name: 'returnData',
                                type: 'bytes',
                            },
                        ]
                    },
                    {
                        name: 'buyAmount',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ];
        return abi;
    }
    static _deployLibrariesAsync(artifact, libraryArtifacts, web3Wrapper, txDefaults, libraryAddresses = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = artifact.compilerOutput.evm.bytecode.linkReferences;
            // Go through all linked libraries, recursively deploying them if necessary.
            for (const link of Object.values(links)) {
                for (const libraryName of Object.keys(link)) {
                    if (!libraryAddresses[libraryName]) {
                        // Library not yet deployed.
                        const libraryArtifact = libraryArtifacts[libraryName];
                        if (!libraryArtifact) {
                            throw new Error(`Missing artifact for linked library "${libraryName}"`);
                        }
                        // Deploy any dependent libraries used by this library.
                        yield ERC20BridgeSamplerContract._deployLibrariesAsync(libraryArtifact, libraryArtifacts, web3Wrapper, txDefaults, libraryAddresses);
                        // Deploy this library.
                        const linkedLibraryBytecode = base_contract_1.linkLibrariesInBytecode(libraryArtifact, libraryAddresses);
                        const txDataWithDefaults = yield base_contract_1.BaseContract._applyDefaultsToContractTxDataAsync(Object.assign({ data: linkedLibraryBytecode }, txDefaults), web3Wrapper.estimateGasAsync.bind(web3Wrapper));
                        const txHash = yield web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                        utils_1.logUtils.log(`transactionHash: ${txHash}`);
                        const { contractAddress } = yield web3Wrapper.awaitTransactionSuccessAsync(txHash);
                        utils_1.logUtils.log(`${libraryArtifact.contractName} successfully deployed at ${contractAddress}`);
                        libraryAddresses[libraryArtifact.contractName] = contractAddress;
                    }
                }
            }
            return libraryAddresses;
        });
    }
    getFunctionSignature(methodName) {
        const index = this._methodABIIndex[methodName];
        const methodAbi = ERC20BridgeSamplerContract.ABI()[index]; // tslint:disable-line:no-unnecessary-type-assertion
        const functionSignature = base_contract_1.methodAbiToFunctionSignature(methodAbi);
        return functionSignature;
    }
    getABIDecodedTransactionData(methodName, callData) {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = this;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecode(callData);
        return abiDecodedCallData;
    }
    getABIDecodedReturnData(methodName, callData) {
        if (this._encoderOverrides.decodeOutput) {
            return this._encoderOverrides.decodeOutput(methodName, callData);
        }
        const functionSignature = this.getFunctionSignature(methodName);
        const self = this;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecodeReturnValue(callData);
        return abiDecodedCallData;
    }
    getSelector(methodName) {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = this;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        return abiEncoder.getSelector();
    }
    /**
     * Call multiple public functions on this contract in a single transaction.
      * @param callDatas ABI-encoded call data for each function call.
     */
    batchCall(callDatas) {
        const self = this;
        assert_1.assert.isArray('callDatas', callDatas);
        const functionSignature = 'batchCall(bytes[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [callDatas
                ]);
            },
        };
    }
    ;
    encodeKyberHint(opts, reserveId, takerToken, makerToken) {
        const self = this;
        assert_1.assert.isString('reserveId', reserveId);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        const functionSignature = 'encodeKyberHint((uint256,address,address,address,bytes),bytes32,address,address)';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [opts,
                    reserveId,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase()
                ]);
            },
        };
    }
    ;
    getAllowanceOf(tokens, account, spender) {
        const self = this;
        assert_1.assert.isArray('tokens', tokens);
        assert_1.assert.isString('account', account);
        assert_1.assert.isString('spender', spender);
        const functionSignature = 'getAllowanceOf(address[],address,address)';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [tokens,
                    account.toLowerCase(),
                    spender.toLowerCase()
                ]);
            },
        };
    }
    ;
    getBalanceOf(tokens, account) {
        const self = this;
        assert_1.assert.isArray('tokens', tokens);
        assert_1.assert.isString('account', account);
        const functionSignature = 'getBalanceOf(address[],address)';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [tokens,
                    account.toLowerCase()
                ]);
            },
        };
    }
    ;
    /**
     * Queries the fillable taker asset amounts of native orders.
 * Effectively ignores orders that have empty signatures or
      * @param orders Native orders to query.
      * @param orderSignatures Signatures for each respective order in `orders`.
      * @param exchange The V4 exchange.
     */
    getLimitOrderFillableMakerAssetAmounts(orders, orderSignatures, exchange) {
        const self = this;
        assert_1.assert.isArray('orders', orders);
        assert_1.assert.isArray('orderSignatures', orderSignatures);
        assert_1.assert.isString('exchange', exchange);
        const functionSignature = 'getLimitOrderFillableMakerAssetAmounts((address,address,uint128,uint128,uint128,address,address,address,address,bytes32,uint64,uint256)[],(uint8,uint8,bytes32,bytes32)[],address)';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [orders,
                    orderSignatures,
                    exchange.toLowerCase()
                ]);
            },
        };
    }
    ;
    /**
     * Get the fillable taker amount of an order, taking into account
 * order state, maker fees, and maker balances.
     */
    getLimitOrderFillableTakerAmount(order, signature, exchange) {
        const self = this;
        assert_1.assert.isString('exchange', exchange);
        const functionSignature = 'getLimitOrderFillableTakerAmount((address,address,uint128,uint128,uint128,address,address,address,address,bytes32,uint64,uint256),(uint8,uint8,bytes32,bytes32),address)';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [order,
                    signature,
                    exchange.toLowerCase()
                ]);
            },
        };
    }
    ;
    /**
     * Queries the fillable taker asset amounts of native orders.
 * Effectively ignores orders that have empty signatures or
 * maker/taker asset amounts (returning 0).
      * @param orders Native limit orders to query.
      * @param orderSignatures Signatures for each respective order in `orders`.
      * @param exchange The V4 exchange.
     */
    getLimitOrderFillableTakerAssetAmounts(orders, orderSignatures, exchange) {
        const self = this;
        assert_1.assert.isArray('orders', orders);
        assert_1.assert.isArray('orderSignatures', orderSignatures);
        assert_1.assert.isString('exchange', exchange);
        const functionSignature = 'getLimitOrderFillableTakerAssetAmounts((address,address,uint128,uint128,uint128,address,address,address,address,bytes32,uint64,uint256)[],(uint8,uint8,bytes32,bytes32)[],address)';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [orders,
                    orderSignatures,
                    exchange.toLowerCase()
                ]);
            },
        };
    }
    ;
    getTokenDecimals(tokens) {
        const self = this;
        assert_1.assert.isArray('tokens', tokens);
        const functionSignature = 'getTokenDecimals(address[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [tokens
                ]);
            },
        };
    }
    ;
    isContract(account) {
        const self = this;
        assert_1.assert.isString('account', account);
        const functionSignature = 'isContract(address)';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [account.toLowerCase()
                ]);
            },
        };
    }
    ;
    sampleBuysFromAutoRoute(params) {
        const self = this;
        const functionSignature = 'sampleBuysFromAutoRoute((address,address[],string[],address[],uint256[]))';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [params
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from Balancer.
      * @param poolAddress Address of the Balancer pool to query.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromBalancer(poolAddress, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('poolAddress', poolAddress);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromBalancer(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [poolAddress.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from Balancer V2.
      * @param poolInfo Struct with pool related data
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromBalancerV2(poolInfo, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromBalancerV2((bytes32,address),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [poolInfo,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from Bancor. Unimplemented
      * @param opts BancorSamplerOpts The Bancor registry contract address and paths
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromBancor(opts, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromBancor((address,address[][]),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [opts,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from Curve.
      * @param curveInfo Curve information specific to this token pair.
      * @param fromTokenIdx Index of the taker token (what to sell).
      * @param toTokenIdx Index of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromCurve(curveInfo, fromTokenIdx, toTokenIdx, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isBigNumber('fromTokenIdx', fromTokenIdx);
        assert_1.assert.isBigNumber('toTokenIdx', toTokenIdx);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromCurve((address,bytes4,bytes4),int128,int128,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [curveInfo,
                    fromTokenIdx,
                    toTokenIdx,
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from DODO.
      * @param opts DODOSamplerOpts DODO Registry and helper addresses
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token sell amount for each sample.
     */
    sampleBuysFromDODO(opts, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromDODO((address,address),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [opts,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from DODO.
      * @param registry Address of the registry to look up.
      * @param offset offset index for the pool in the registry.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token sell amount for each sample.
     */
    sampleBuysFromDODOV2(registry, offset, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('registry', registry);
        assert_1.assert.isBigNumber('offset', offset);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromDODOV2(address,uint256,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [registry.toLowerCase(),
                    offset,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from Eth2Dai/Oasis.
      * @param router Address of the Eth2Dai/Oasis contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
     */
    sampleBuysFromEth2Dai(router, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('router', router);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromEth2Dai(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [router.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from KyberDmm.
      * @param router Router to look up tokens and amounts
      * @param path Token route. Should be takerToken -> makerToken.
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromKyberDmm(router, path, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('router', router);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromKyberDmm(address,address[],uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [router.toLowerCase(),
                    path,
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from Kyber.
      * @param opts KyberSamplerOpts The nth reserve
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromKyberNetwork(opts, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromKyberNetwork((uint256,address,address,address,bytes),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [opts,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from Lido.
      * @param lidoInfo Info regarding a specific Lido deployment
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromLido(lidoInfo, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromLido((address,address),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    let rawCallResult;
                    if (self._deployedBytecodeIfExists) {
                        rawCallResult = yield self._evmExecAsync(this.getABIEncodedTransactionData());
                    }
                    else {
                        rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    }
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [lidoInfo,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from an arbitrary on-chain liquidity provider.
      * @param providerAddress Address of the liquidity provider.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromLiquidityProvider(providerAddress, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('providerAddress', providerAddress);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromLiquidityProvider(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [providerAddress.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from MStable contract
      * @param router Address of the mStable contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromMStable(router, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('router', router);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromMStable(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [router.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    sampleBuysFromMakerPsm(psmInfo, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromMakerPsm((address,bytes32,address),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [psmInfo,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from Mooniswap.
      * @param registry Address of the Mooniswap Registry.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token sell amount for each sample.
     */
    sampleBuysFromMooniswap(registry, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('registry', registry);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromMooniswap(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [registry.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from Shell pool contract
      * @param pool Address of the Shell pool contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromShell(pool, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('pool', pool);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromShell(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [pool.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from Smoothy.
      * @param smoothyInfo Smoothy information specific to this token pair.
      * @param fromTokenIdx Index of the taker token (what to sell).
      * @param toTokenIdx Index of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromSmoothy(smoothyInfo, fromTokenIdx, toTokenIdx, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isBigNumber('fromTokenIdx', fromTokenIdx);
        assert_1.assert.isBigNumber('toTokenIdx', toTokenIdx);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromSmoothy((address,bytes4,bytes4),int128,int128,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [smoothyInfo,
                    fromTokenIdx,
                    toTokenIdx,
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from Uniswap.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token sell amount for each sample.
     */
    sampleBuysFromUniswap(router, takerToken, makerToken, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('router', router);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromUniswap(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [router.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from UniswapV2.
      * @param router Router to look up tokens and amounts
      * @param path Token route. Should be takerToken -> makerToken.
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromUniswapV2(router, path, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('router', router);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromUniswapV2(address,address[],uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [router.toLowerCase(),
                    path,
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample buy quotes from UniswapV3.
      * @param quoter UniswapV3 Quoter contract.
      * @param path Token route. Should be takerToken -> makerToken.
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromUniswapV3(quoter, path, makerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('quoter', quoter);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isArray('makerTokenAmounts', makerTokenAmounts);
        const functionSignature = 'sampleBuysFromUniswapV3(address,address[],uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [quoter.toLowerCase(),
                    path,
                    makerTokenAmounts
                ]);
            },
        };
    }
    ;
    sampleSellFromKyberNetwork(opts, takerToken, makerToken, takerTokenAmount) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isBigNumber('takerTokenAmount', takerTokenAmount);
        const functionSignature = 'sampleSellFromKyberNetwork((uint256,address,address,address,bytes),address,address,uint256)';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [opts,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmount
                ]);
            },
        };
    }
    ;
    sampleSellsFromAutoRoute(params) {
        const self = this;
        const functionSignature = 'sampleSellsFromAutoRoute((address,address[],string[],address[],uint256[]))';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [params
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from Balancer.
      * @param poolAddress Address of the Balancer pool to query.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromBalancer(poolAddress, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('poolAddress', poolAddress);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromBalancer(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [poolAddress.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from Balancer V2.
      * @param poolInfo Struct with pool related data
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromBalancerV2(poolInfo, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromBalancerV2((bytes32,address),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [poolInfo,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from Bancor.
      * @param opts BancorSamplerOpts The Bancor registry contract address and paths
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromBancor(opts, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromBancor((address,address[][]),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [opts,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from Curve.
      * @param curveInfo Curve information specific to this token pair.
      * @param fromTokenIdx Index of the taker token (what to sell).
      * @param toTokenIdx Index of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromCurve(curveInfo, fromTokenIdx, toTokenIdx, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isBigNumber('fromTokenIdx', fromTokenIdx);
        assert_1.assert.isBigNumber('toTokenIdx', toTokenIdx);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromCurve((address,bytes4,bytes4),int128,int128,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [curveInfo,
                    fromTokenIdx,
                    toTokenIdx,
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from DODO.
      * @param opts DODOSamplerOpts DODO Registry and helper addresses
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromDODO(opts, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromDODO((address,address),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [opts,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from DODO V2.
      * @param registry Address of the registry to look up.
      * @param offset offset index for the pool in the registry.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromDODOV2(registry, offset, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('registry', registry);
        assert_1.assert.isBigNumber('offset', offset);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromDODOV2(address,uint256,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [registry.toLowerCase(),
                    offset,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from Eth2Dai/Oasis.
      * @param router Address of the Eth2Dai/Oasis contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromEth2Dai(router, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('router', router);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromEth2Dai(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [router.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from KyberDmm.
      * @param router Router to look up tokens and amounts
      * @param path Token route. Should be takerToken -> makerToken
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromKyberDmm(router, path, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('router', router);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromKyberDmm(address,address[],uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [router.toLowerCase(),
                    path,
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from Kyber.
      * @param opts KyberSamplerOpts The nth reserve
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromKyberNetwork(opts, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromKyberNetwork((uint256,address,address,address,bytes),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [opts,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from Lido
      * @param lidoInfo Info regarding a specific Lido deployment
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromLido(lidoInfo, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromLido((address,address),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    let rawCallResult;
                    if (self._deployedBytecodeIfExists) {
                        rawCallResult = yield self._evmExecAsync(this.getABIEncodedTransactionData());
                    }
                    else {
                        rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    }
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [lidoInfo,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from an arbitrary on-chain liquidity provider.
      * @param providerAddress Address of the liquidity provider.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromLiquidityProvider(providerAddress, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('providerAddress', providerAddress);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromLiquidityProvider(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [providerAddress.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from the mStable contract
      * @param router Address of the mStable contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromMStable(router, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('router', router);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromMStable(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [router.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from Maker PSM
     */
    sampleSellsFromMakerPsm(psmInfo, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromMakerPsm((address,bytes32,address),address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [psmInfo,
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from Mooniswap.
      * @param registry Address of the Mooniswap Registry.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromMooniswap(registry, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('registry', registry);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromMooniswap(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [registry.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from MultiBridge.
      * @param multibridge Address of the MultiBridge contract.
      * @param takerToken Address of the taker token (what to sell).
      * @param intermediateToken The address of the intermediate token to        use
     *     in an indirect route.
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromMultiBridge(multibridge, takerToken, intermediateToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('multibridge', multibridge);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('intermediateToken', intermediateToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromMultiBridge(address,address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [multibridge.toLowerCase(),
                    takerToken.toLowerCase(),
                    intermediateToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from the Shell pool contract
      * @param pool Address of the Shell pool contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromShell(pool, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('pool', pool);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromShell(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [pool.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from Smoothy.
      * @param smoothyInfo Smoothy information specific to this token pair.
      * @param fromTokenIdx Index of the taker token (what to sell).
      * @param toTokenIdx Index of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromSmoothy(smoothyInfo, fromTokenIdx, toTokenIdx, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isBigNumber('fromTokenIdx', fromTokenIdx);
        assert_1.assert.isBigNumber('toTokenIdx', toTokenIdx);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromSmoothy((address,bytes4,bytes4),int128,int128,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [smoothyInfo,
                    fromTokenIdx,
                    toTokenIdx,
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from Uniswap.
      * @param router Address of the Uniswap Router
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromUniswap(router, takerToken, makerToken, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('router', router);
        assert_1.assert.isString('takerToken', takerToken);
        assert_1.assert.isString('makerToken', makerToken);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromUniswap(address,address,address,uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [router.toLowerCase(),
                    takerToken.toLowerCase(),
                    makerToken.toLowerCase(),
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from UniswapV2.
      * @param router Router to look up tokens and amounts
      * @param path Token route. Should be takerToken -> makerToken
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromUniswapV2(router, path, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('router', router);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromUniswapV2(address,address[],uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [router.toLowerCase(),
                    path,
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    /**
     * Sample sell quotes from UniswapV3.
      * @param quoter UniswapV3 Quoter contract.
      * @param path Token route. Should be takerToken -> makerToken
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromUniswapV3(quoter, path, takerTokenAmounts) {
        const self = this;
        assert_1.assert.isString('quoter', quoter);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isArray('takerTokenAmounts', takerTokenAmounts);
        const functionSignature = 'sampleSellsFromUniswapV3(address,address[],uint256[])';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [quoter.toLowerCase(),
                    path,
                    takerTokenAmounts
                ]);
            },
        };
    }
    ;
    sampleSingleSellFromMooniswapPool(registry, mooniswapTakerToken, mooniswapMakerToken, takerTokenAmount) {
        const self = this;
        assert_1.assert.isString('registry', registry);
        assert_1.assert.isString('mooniswapTakerToken', mooniswapTakerToken);
        assert_1.assert.isString('mooniswapMakerToken', mooniswapMakerToken);
        assert_1.assert.isBigNumber('takerTokenAmount', takerTokenAmount);
        const functionSignature = 'sampleSingleSellFromMooniswapPool(address,address,address,uint256)';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [registry.toLowerCase(),
                    mooniswapTakerToken.toLowerCase(),
                    mooniswapMakerToken.toLowerCase(),
                    takerTokenAmount
                ]);
            },
        };
    }
    ;
    sampleTwoHopBuy(firstHopCalls, secondHopCalls, buyAmount) {
        const self = this;
        assert_1.assert.isArray('firstHopCalls', firstHopCalls);
        assert_1.assert.isArray('secondHopCalls', secondHopCalls);
        assert_1.assert.isBigNumber('buyAmount', buyAmount);
        const functionSignature = 'sampleTwoHopBuy(bytes[],bytes[],uint256)';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [firstHopCalls,
                    secondHopCalls,
                    buyAmount
                ]);
            },
        };
    }
    ;
    sampleTwoHopSell(firstHopCalls, secondHopCalls, sellAmount) {
        const self = this;
        assert_1.assert.isArray('firstHopCalls', firstHopCalls);
        assert_1.assert.isArray('secondHopCalls', secondHopCalls);
        assert_1.assert.isBigNumber('sellAmount', sellAmount);
        const functionSignature = 'sampleTwoHopSell(bytes[],bytes[],uint256)';
        return {
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [firstHopCalls,
                    secondHopCalls,
                    sellAmount
                ]);
            },
        };
    }
    ;
}
exports.ERC20BridgeSamplerContract = ERC20BridgeSamplerContract;
/**
 * @ignore
 */
ERC20BridgeSamplerContract.deployedBytecode = '0x608060405234801561001057600080fd5b50600436106103425760003560e01c80638b6d7b44116101b8578063bd71ecf611610104578063ddd5aa28116100a2578063f1ed7fa41161007c578063f1ed7fa4146107ad578063f3868e9c1461048d578063f5a4994d146107c0578063fc9fe41b146107d357610342565b8063ddd5aa2814610774578063e78ac04514610787578063e8e4af091461079a57610342565b8063c8c74a37116100de578063c8c74a3714610728578063c94706d81461073b578063cc1621c91461074e578063d9bca3721461076157610342565b8063bd71ecf6146106ef578063c25c413814610702578063c83190841461071557610342565b80639ea0ff1311610171578063a75e744b1161014b578063a75e744b14610695578063ab000276146106a8578063adc636bf146106bb578063b90cd2fb146106dc57610342565b80639ea0ff131461065c578063a0295b8b1461066f578063a46984171461068257610342565b80638b6d7b44146105bf5780638e5a0e07146105d25780639209483b146105f457806398777748146106075780639bf3ee351461061a5780639e3f05c31461063a57610342565b806336052391116102925780635aae4e531161023057806368be3cf21161020a57806368be3cf214610566578063706e2f9b1461058657806374c9d255146105995780637f7f4f13146105ac57610342565b80635aae4e531461052d5780635d5b674f1461054057806366a1ac6b1461055357610342565b8063494569db1161026c578063494569db146104c65780634edfb5b2146104d95780635505000a146104f957806357494b1d1461051a57610342565b8063360523911461048d5780633c883dba146104a057806340bc03ae146104b357610342565b8063252322b3116102ff5780632aa64319116102d95780632aa64319146104325780632d753aa41461045457806330d6570d146104675780633105fec11461047a57610342565b8063252322b3146103f9578063281e34321461040c57806329fa4aa01461041f57610342565b806301cb0ef7146103475780630496d5dc146103705780631022742b14610391578063149dab0e146103a457806316279055146103c65780632339078f146103e6575b600080fd5b61035a6103553660046197e3565b6107e6565b604051610367919061a2b4565b60405180910390f35b61038361037e366004618fa1565b610981565b60405161036792919061a190565b61035a61039f3660046193d4565b610b27565b6103b76103b2366004619651565b610c9a565b6040516103679392919061a05f565b6103d96103d4366004618c78565b610dfa565b604051610367919061a2c7565b61035a6103f43660046195d2565b610e04565b61035a610407366004618edf565b61102b565b61035a61041a366004619a1d565b611201565b61035a61042d36600461975b565b611456565b6104456104403660046197b4565b6114c5565b6040516103679392919061a2d2565b61035a610462366004618e5a565b6117a2565b61035a610475366004618edf565b61192b565b61035a610488366004618fa1565b611a9f565b61035a61049b3660046197b4565b611c23565b61035a6104ae3660046197e3565b611cb5565b61035a6104c136600461975b565b611e3f565b6103836104d4366004618fa1565b611fc0565b6104ec6104e736600461997f565b61214c565b604051610367919061a320565b61050c61050736600461953b565b6123c9565b60405161036792919061a1d7565b61035a610528366004618edf565b612614565b61050c61053b36600461953b565b612b8b565b61035a61054e366004618edf565b612dd0565b61035a6105613660046193d4565b612e36565b6105796105743660046191ae565b612eeb565b604051610367919061a23f565b61035a610594366004619285565b61304c565b6103b76105a7366004619651565b61313e565b61035a6105ba366004619a1d565b61314d565b61035a6105cd36600461975b565b61339a565b6105e56105e036600461921c565b6136fd565b6040516103679392919061a5cf565b61035a61060236600461975b565b613916565b61035a610615366004618edf565b613b16565b61062d6106283660046199dd565b61404f565b604051610367919061a2fe565b61064d6106483660046198c8565b614196565b6040516103679392919061a307565b61062d61066a366004618f51565b6142bc565b61035a61067d3660046195d2565b6144d2565b61035a610690366004618edf565b6146ce565b6104456106a3366004619013565b614823565b61035a6106b6366004618edf565b614960565b6106ce6106c9366004618edf565b614abe565b60405161036792919061a36e565b61035a6106ea366004618edf565b614c0e565b61035a6106fd3660046192b7565b614c74565b61035a610710366004618edf565b614d70565b61035a610723366004618edf565b614dd6565b61035a610736366004618fa1565b614f93565b61035a610749366004618edf565b6150ff565b61064d61075c3660046198c8565b61525d565b61044561076f366004619013565b615443565b6104456107823660046197b4565b615532565b61035a6107953660046192fb565b6157c5565b61035a6107a8366004618edf565b6158ba565b61062d6107bb366004619938565b6159ed565b6106ce6107ce366004618edf565b615b8c565b6105e56107e136600461921c565b615c78565b608081015151606090806001600160401b038111801561080557600080fd5b5060405190808252806020026020018201604052801561082f578160200160208202803683370190505b50915060005b8181101561097a5783600001516001600160a01b031663846ee14b620249f08660800151848151811061086457fe5b60200260200101518760200151886040015189606001516040518663ffffffff1660e01b815260040161089a949392919061a70c565b60006040518083038187803b1580156108b257600080fd5b5086fa935050505080156108e857506040513d6000823e601f3d908101601f191682016040526108e591908101906194a3565b60015b610922573d808015610916576040519150601f19603f3d011682016040523d82523d6000602084013e61091b565b606091505b505061097a565b8060008151811061092f57fe5b602002602001015184838151811061094357fe5b60200260200101818152505083828151811061095b57fe5b602002602001015160001415610971575061097a565b50600101610835565b5050919050565b80516060908190806001600160401b038111801561099e57600080fd5b506040519080825280602002602001820160405280156109c8578160200160208202803683370190505b5091506109d58686615e8d565b92508251600014156109e75750610b1f565b60005b81811015610b1c57866001600160a01b031663a8312b1d620249f0878481518110610a1157fe5b6020026020010151878a6040518563ffffffff1660e01b8152600401610a399392919061a6e1565b60006040518083038187803b158015610a5157600080fd5b5086fa93505050508015610a8757506040513d6000823e601f3d908101601f19168201604052610a8491908101906194a3565b60015b610ac1573d808015610ab5576040519150601f19603f3d011682016040523d82523d6000602084013e610aba565b606091505b5050610b1c565b80600188510381518110610ad157fe5b6020026020010151848381518110610ae557fe5b602002602001018181525050838281518110610afd57fe5b602002602001015160001415610b135750610b1c565b506001016109ea565b50505b935093915050565b606083516001600160401b0381118015610b4057600080fd5b50604051908082528060200260200182016040528015610b6a578160200160208202803683370190505b50905060005b84518114610c9257306001600160a01b0316639bf3ee3562030d40878481518110610b9757fe5b6020026020010151878581518110610bab57fe5b6020026020010151876040518563ffffffff1660e01b8152600401610bd29392919061a691565b60206040518083038187803b158015610bea57600080fd5b5086fa93505050508015610c1b575060408051601f3d908101601f19168201909252610c18918101906194f1565b60015b610c6f573d808015610c49576040519150601f19603f3d011682016040523d82523d6000602084013e610c4e565b606091505b506000838381518110610c5d57fe5b60200260200101818152505050610c8a565b80838381518110610c7c57fe5b602002602001018181525050505b600101610b70565b509392505050565b600060608086602001515160001415610cb257610df0565b610cbe8787878761617c565b855191945092506001600160401b0381118015610cda57600080fd5b50604051908082528060200260200182016040528015610d04578160200160208202803683370190505b50905060005b8151811015610dee57836001600160a01b0316637f9c0ecd620493e085888581518110610d3357fe5b60200260200101516040518463ffffffff1660e01b8152600401610d5892919061a1b5565b60206040518083038187803b158015610d7057600080fd5b5086fa93505050508015610da1575060408051601f3d908101601f19168201909252610d9e918101906194f1565b60015b610daa57610dee565b80838381518110610db757fe5b602002602001018181525050828281518110610dcf57fe5b602002602001015160001415610de55750610dee565b50600101610d0a565b505b9450945094915050565b803b15155b919050565b6060610e1083856163ae565b602085015160408051600280825260608281019093528160200160208202803683370190505090508581600081518110610e4657fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508481600181518110610e7457fe5b6001600160a01b03909216602092830291909101909101528351806001600160401b0381118015610ea457600080fd5b50604051908082528060200260200182016040528015610ece578160200160208202803683370190505b509350610ed961851f565b610ee16163e4565b905060005b8281101561101e576060610f0d8b898481518110610f0057fe5b6020026020010151616413565b604051637c26833760e11b81529091506001600160a01b0387169063f84d066e90610f439060009085908a90899060040161a3d4565b600060405180830381600087803b158015610f5d57600080fd5b505af1925050508015610f9257506040513d6000823e601f3d908101601f19168201604052610f8f9190810190619351565b60015b610fcd573d808015610fc0576040519150601f19603f3d011682016040523d82523d6000602084013e610fc5565b606091505b50505061101e565b600081600181518110610fdc57fe5b602002602001015160001902905060008113610ffa5750505061101e565b8089858151811061100757fe5b602002602001018181525050505050600101610ee6565b5050505050949350505050565b606061103783856163ae565b8151806001600160401b038111801561104f57600080fd5b50604051908082528060200260200182016040528015611079578160200160208202803683370190505b50915060006001600160a01b0386161561109c5761109787876164a5565b61109f565b60005b905060006001600160a01b038616156110c1576110bc88876164a5565b6110c4565b60005b905060005b838110156111f55760016001600160a01b0388166111275761110684632640f62c60e01b8985815181106110f957fe5b6020026020010151616524565b87848151811061111257fe5b602002602001018193508281525050506111c1565b6001600160a01b03891661114d57611106836359e9486260e01b8985815181106110f957fe5b6000611167846359e9486260e01b8a86815181106110f957fe5b9250905080156111a457611183856309903d8b60e21b83616524565b88858151811061118f57fe5b602002602001018194508281525050506111bf565b60008784815181106111b257fe5b6020026020010181815250505b505b8015806111e157508582815181106111d557fe5b60200260200101516000145b156111ec57506111f5565b506001016110c9565b50505050949350505050565b606061120d83856163ae565b6000856000015190506000816001600160a01b03166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b15801561125157600080fd5b505afa158015611265573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112899190618c94565b8451909150806001600160401b03811180156112a457600080fd5b506040519080825280602002602001820160405280156112ce578160200160208202803683370190505b509350826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b15801561130a57600080fd5b505afa15801561131e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113429190618c94565b6001600160a01b0316866001600160a01b0316141580156113e55750826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b15801561139757600080fd5b505afa1580156113ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113cf9190618c94565b6001600160a01b0316876001600160a01b031614155b156113f25750505061144e565b60005b818110156111f55760006114208a898b8a868151811061141157fe5b60200260200101518989616607565b90508061142d57506111f5565b8086838151811061143a57fe5b6020908102919091010152506001016113f5565b949350505050565b6040805160608181019092526114bc908061147586896080840161a480565b6040516020818303038152906040528152602001868860405160200161149c92919061a480565b60405160208183030381529060405281526020016168c8815250836169fb565b95945050505050565b60008060606114d485876163ae565b8351806001600160401b03811180156114ec57600080fd5b50604051908082528060200260200182016040528015611516578160200160208202803683370190505b508851604051630939d86360e11b81529193506001600160a01b031690631273b0c690611549908a908a90600401619efb565b60206040518083038186803b15801561156157600080fd5b505afa158015611575573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115999190618c94565b925060006001600160a01b038416156115b757506001935086611656565b8851604051630939d86360e11b81526001600160a01b0390911690631273b0c6906115e8908a908c90600401619efb565b60206040518083038186803b15801561160057600080fd5b505afa158015611614573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116389190618c94565b93506001600160a01b03841661164f575050610df0565b5060009350855b836001600160a01b031663dd58b41c6040518163ffffffff1660e01b815260040160206040518083038186803b15801561168f57600080fd5b505afa1580156116a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116c791906194d5565b6116d2575050610df0565b60005b8281101561179557600061174f8a87858e602001516040516020016116fd9493929190619f15565b6040516020818303038152906040528a88868f602001516040516020016117279493929190619f15565b6040516020818303038152906040528a858151811061174257fe5b6020026020010151616bf8565b90508085838151811061175e57fe5b60200260200101818152505084828151811061177657fe5b60200260200101516000141561178c5750611795565b506001016116d5565b5050509450945094915050565b8051606090806001600160401b03811180156117bd57600080fd5b506040519080825280602002602001820160405280156117e7578160200160208202803683370190505b5091506001600160a01b0387166117fe57506114bc565b60005b818110156119205760006060896001600160a01b031662061a80636e79e13360e01b8b8b8b8b898151811061183257fe5b602002602001015160405160240161184d9493929190619f74565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161188b9190619eb2565b6000604051808303818686fa925050503d80600081146118c7576040519150601f19603f3d011682016040523d82523d6000602084013e6118cc565b606091505b5091509150600082156118f057818060200190518101906118ed91906194f1565b90505b806118fd57505050611920565b8086858151811061190a57fe5b6020908102919091010152505050600101611801565b505095945050505050565b606061193783856163ae565b8151806001600160401b038111801561194f57600080fd5b50604051908082528060200260200182016040528015611979578160200160208202803683370190505b50915060005b81811015611a9557866001600160a01b03166372ea9076620c350088888886815181106119a857fe5b60200260200101516040518563ffffffff1660e01b81526004016119ce93929190619ff6565b60206040518083038187803b1580156119e657600080fd5b5086fa93505050508015611a17575060408051601f3d908101601f19168201909252611a14918101906194f1565b60015b611a51573d808015611a45576040519150601f19603f3d011682016040523d82523d6000602084013e611a4a565b606091505b5050611a95565b80848381518110611a5e57fe5b602002602001018181525050838281518110611a7657fe5b602002602001015160001415611a8c5750611a95565b5060010161197f565b5050949350505050565b8051606090806001600160401b0381118015611aba57600080fd5b50604051908082528060200260200182016040528015611ae4578160200160208202803683370190505b50915060005b81811015611c1a57856001600160a01b031663d06ca61f620249f0868481518110611b1157fe5b6020026020010151886040518463ffffffff1660e01b8152600401611b3792919061a6c8565b60006040518083038187803b158015611b4f57600080fd5b5086fa93505050508015611b8557506040513d6000823e601f3d908101601f19168201604052611b8291908101906194a3565b60015b611bbf573d808015611bb3576040519150601f19603f3d011682016040523d82523d6000602084013e611bb8565b606091505b5050611c1a565b80600187510381518110611bcf57fe5b6020026020010151848381518110611be357fe5b602002602001018181525050838281518110611bfb57fe5b602002602001015160001415611c115750611c1a565b50600101611aea565b50509392505050565b6060611c2f83856163ae565b84602001516001600160a01b0316846001600160a01b0316141580611c61575084516001600160a01b03848116911614155b15610c925781516060816001600160401b0381118015611c8057600080fd5b50604051908082528060200260200182016040528015611caa578160200160208202803683370190505b50925061144e915050565b608081015151606090806001600160401b0381118015611cd457600080fd5b50604051908082528060200260200182016040528015611cfe578160200160208202803683370190505b50915060005b8181101561097a5783600001516001600160a01b0316633bbc8a1e85608001518381518110611d2f57fe5b60200260200101518660200151876040015188606001516040518563ffffffff1660e01b8152600401611d65949392919061a70c565b60006040518083038186803b158015611d7d57600080fd5b505afa925050508015611db257506040513d6000823e601f3d908101601f19168201604052611daf91908101906194a3565b60015b611de0573d808015610916576040519150601f19603f3d011682016040523d82523d6000602084013e61091b565b8060018660200151510381518110611df457fe5b6020026020010151848381518110611e0857fe5b602002602001018181525050838281518110611e2057fe5b602002602001015160001415611e36575061097a565b50600101611d04565b8051606090806001600160401b0381118015611e5a57600080fd5b50604051908082528060200260200182016040528015611e84578160200160208202803683370190505b50915060005b81811015611a95576000606088600001516001600160a01b0316621e84808a602001518a8a8a8881518110611ebb57fe5b6020026020010151604051602401611ed59392919061a462565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051611f139190619eb2565b6000604051808303818686fa925050503d8060008114611f4f576040519150601f19603f3d011682016040523d82523d6000602084013e611f54565b606091505b509150915060008215611f785781806020019051810190611f7591906194f1565b90505b80868581518110611f8557fe5b602002602001018181525050858481518110611f9d57fe5b602002602001015160001415611fb557505050611a95565b505050600101611e8a565b80516060908190806001600160401b0381118015611fdd57600080fd5b50604051908082528060200260200182016040528015612007578160200160208202803683370190505b5091506120148686615e8d565b92508251600014156120265750610b1f565b60005b81811015610b1c57866001600160a01b0316639e269b68620249f087848151811061205057fe5b6020026020010151878a6040518563ffffffff1660e01b81526004016120789392919061a6e1565b60006040518083038187803b15801561209057600080fd5b5086fa935050505080156120c657506040513d6000823e601f3d908101601f191682016040526120c391908101906194a3565b60015b6120f4573d808015610ab5576040519150601f19603f3d011682016040523d82523d6000602084013e610aba565b8060008151811061210157fe5b602002602001015184838151811061211557fe5b60200260200101818152505083828151811061212d57fe5b6020026020010151600014156121435750610b1c565b50600101612029565b6020848101516040805160018082528183019092526060938492908281019080368337019050509050858160008151811061218357fe5b6020908102919091010152606060006040519080825280602002602001820160405280156121bb578160200160208202803683370190505b50905087606001516001600160a01b0316866001600160a01b031614156122ac576040516381efcbdd60e01b81526001600160a01b038416906381efcbdd906207a120906122149089906001908890889060040161a095565b60006040518083038187803b15801561222c57600080fd5b5086fa9350505050801561226257506040513d6000823e601f3d908101601f1916820160405261225f9190810190619509565b60015b61229c573d808015612290576040519150601f19603f3d011682016040523d82523d6000602084013e612295565b606091505b50506122a7565b935061144e92505050565b6123be565b87606001516001600160a01b0316856001600160a01b03161415612302576040516361e597f960e01b81526001600160a01b038416906361e597f9906207a12090612214908a906001908890889060040161a095565b6040516302b9a6cd60e11b81526001600160a01b038416906305734d9a906207a12090612342908a90600190889088908d9084908490849060040161a0d7565b60006040518083038187803b15801561235a57600080fd5b5086fa9350505050801561239057506040513d6000823e601f3d908101601f1916820160405261238d9190810190619509565b60015b61229c573d80801561101e576040519150601f19603f3d011682016040523d82523d6000602084013e61101e565b505050949350505050565b606080606061244a866001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b15801561240a57600080fd5b505afa15801561241e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124429190618c94565b866000616d31565b905083516001600160401b038111801561246357600080fd5b5060405190808252806020026020018201604052801561248d578160200160208202803683370190505b50915083516001600160401b03811180156124a757600080fd5b506040519080825280602002602001820160405280156124db57816020015b60608152602001906001900390816124c65790505b50925060005b8451811015610b1c5760606000805b84518110156125cc5760606125188a87848151811061250b57fe5b60200260200101516171c7565b90508a6001600160a01b031663cdca1753620493e0838c898151811061253a57fe5b60200260200101516040518463ffffffff1660e01b815260040161255f92919061a333565b602060405180830381600088803b15801561257957600080fd5b5087f1935050505080156125aa575060408051601f3d908101601f191682019092526125a7918101906194f1565b60015b6125b3576125c3565b8084116125c1578093508194505b505b506001016124f0565b50806125d9575050610b1c565b808584815181106125e657fe5b602002602001018181525050818684815181106125ff57fe5b602090810291909101015250506001016124e1565b80516060908590806001600160401b038111801561263157600080fd5b5060405190808252806020026020018201604052801561265b578160200160208202803683370190505b50604051630bcded8960e21b81529093506001600160a01b03831690632f37b6249061268b908990600401619ece565b60206040518083038186803b1580156126a357600080fd5b505afa1580156126b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126db91906194d5565b15806127605750604051630bcded8960e21b81526001600160a01b03831690632f37b6249061270e908890600401619ece565b60206040518083038186803b15801561272657600080fd5b505afa15801561273a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061275e91906194d5565b155b1561276c57505061144e565b612774618546565b60405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f906127a0908a90600401619ece565b60206040518083038186803b1580156127b857600080fd5b505afa1580156127cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127f091906194f1565b815260405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f9061281e908990600401619ece565b60206040518083038186803b15801561283657600080fd5b505afa15801561284a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061286e91906194f1565b6020820152604051634a46c67360e11b81526001600160a01b0384169063948d8ce69061289f908a90600401619ece565b60206040518083038186803b1580156128b757600080fd5b505afa1580156128cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128ef91906194f1565b60408083019190915251634a46c67360e11b81526001600160a01b0384169063948d8ce690612922908990600401619ece565b60206040518083038186803b15801561293a57600080fd5b505afa15801561294e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061297291906194f1565b816060018181525050826001600160a01b031663d4cadf686040518163ffffffff1660e01b815260040160206040518083038186803b1580156129b457600080fd5b505afa1580156129c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129ec91906194f1565b608082015260005b828110156111f557612a1f82602001516003670de0b6b3a764000081612a1657fe5b04600101617322565b868281518110612a2b57fe5b60200260200101511115612a3e576111f5565b836001600160a01b031663f8d6aed4620493e084600001518560400151866020015187606001518c8881518110612a7157fe5b602002602001015189608001516040518863ffffffff1660e01b8152600401612a9f9695949392919061a785565b60206040518083038187803b158015612ab757600080fd5b5086fa93505050508015612ae8575060408051601f3d908101601f19168201909252612ae5918101906194f1565b60015b612b22573d808015612b16576040519150601f19603f3d011682016040523d82523d6000602084013e612b1b565b606091505b50506111f5565b8251612b3a906002670de0b6b3a76400005b04617322565b811115612b4757506111f5565b80868381518110612b5457fe5b602002602001018181525050858281518110612b6c57fe5b602002602001015160001415612b8257506111f5565b506001016129f4565b6060806060612bcc866001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b15801561240a57600080fd5b90506060612bd98661737f565b905084516001600160401b0381118015612bf257600080fd5b50604051908082528060200260200182016040528015612c1c578160200160208202803683370190505b50925084516001600160401b0381118015612c3657600080fd5b50604051908082528060200260200182016040528015612c6a57816020015b6060815260200190600190039081612c555790505b50935060005b8551811015612dc55760606000805b8551811015612d7d576060612caf86612caa898581518110612c9d57fe5b6020026020010151617417565b6171c7565b90508b6001600160a01b0316632f80bb1d620493e0838d8981518110612cd157fe5b60200260200101516040518463ffffffff1660e01b8152600401612cf692919061a333565b602060405180830381600088803b158015612d1057600080fd5b5087f193505050508015612d41575060408051601f3d908101601f19168201909252612d3e918101906194f1565b60015b612d4a57612d74565b831580612d575750808410155b15612d7257809350612d6f8c89858151811061250b57fe5b94505b505b50600101612c7f565b5080612d8a575050612dc5565b80868481518110612d9757fe5b60200260200101818152505081878481518110612db057fe5b60209081029190910101525050600101612c70565b505050935093915050565b6040805160608181019092526114bc9080612def868960808401619efb565b60405160208183030381529060405281526020018688604051602001612e16929190619efb565b60405160208183030381529060405281526020016174af815250836169fb565b6060612e43848484610b27565b905060005b8451811015610c9257818181518110612e5d57fe5b6020026020010151600014612ee357612eca828281518110612e7b57fe5b6020026020010151868381518110612e8f57fe5b6020026020010151606001516001600160801b0316878481518110612eb057fe5b6020026020010151604001516001600160801b03166175c3565b828281518110612ed657fe5b6020026020010181815250505b600101612e48565b6060816001600160401b0381118015612f0357600080fd5b50604051908082528060200260200182016040528015612f3d57816020015b612f2a618575565b815260200190600190039081612f225790505b50905060005b808314613045576001828281518110612f5857fe5b602090810291909101810151911515910152838382818110612f7657fe5b9050602002810190612f88919061a7ad565b15159050612f955761303d565b30848483818110612fa257fe5b9050602002810190612fb4919061a7ad565b604051612fc2929190619ea2565b6000604051808303816000865af19150503d8060008114612fff576040519150601f19603f3d011682016040523d82523d6000602084013e613004565b606091505b5083838151811061301157fe5b602002602001015160200184848151811061302857fe5b60209081029190910101519190915290151590525b600101612f43565b5092915050565b606081516001600160401b038111801561306557600080fd5b5060405190808252806020026020018201604052801561308f578160200160208202803683370190505b50905060005b82518114613138577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168382815181106130d357fe5b60200260200101516001600160a01b0316146131135761310e8382815181106130f857fe5b60200260200101516001600160a01b03166175e7565b613116565b60125b60ff1682828151811061312557fe5b6020908102919091010152600101613095565b50919050565b60006060809450945094915050565b606061315983856163ae565b6000856000015190506000816001600160a01b03166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b15801561319d57600080fd5b505afa1580156131b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131d59190618c94565b8451909150806001600160401b03811180156131f057600080fd5b5060405190808252806020026020018201604052801561321a578160200160208202803683370190505b509350826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b15801561325657600080fd5b505afa15801561326a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061328e9190618c94565b6001600160a01b0316866001600160a01b0316141580156133315750826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b1580156132e357600080fd5b505afa1580156132f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061331b9190618c94565b6001600160a01b0316876001600160a01b031614155b1561333e5750505061144e565b60005b818110156111f557600061336c8a898b8a868151811061335d57fe5b60200260200101518989617689565b90508061337957506111f5565b8086838151811061338657fe5b602090810291909101015250600101613341565b6060600085600001516001600160a01b031663bbd7f25585600f0b6040518263ffffffff1660e01b81526004016133d1919061a2fe565b60206040518083038186803b1580156133e957600080fd5b505afa1580156133fd573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061342191906194f1565b8651604051631e01043960e01b81526001600160a01b0390911690631e0104399061345490600f89900b9060040161a2fe565b60206040518083038186803b15801561346c57600080fd5b505afa158015613480573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906134a491906194f1565b039050600086600001516001600160a01b031663c582951486600f0b6040518263ffffffff1660e01b81526004016134dc919061a2fe565b60806040518083038186803b1580156134f457600080fd5b505afa158015613508573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061352c9190619b57565b935050505080601203600a0a828161354057fe5b85519190049250806001600160401b038111801561355d57600080fd5b50604051908082528060200260200182016040528015613587578160200160208202803683370190505b50935060005b818110156111f557600060608a600001516001600160a01b0316620927c08c602001518c8c8c88815181106135be57fe5b60200260200101516040516024016135d89392919061a462565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516136169190619eb2565b6000604051808303818686fa925050503d8060008114613652576040519150601f19603f3d011682016040523d82523d6000602084013e613657565b606091505b50915091506000821561367b578180602001905181019061367891906194f1565b90505b8681106136b557835b858110156136ac578789828151811061369957fe5b6020908102919091010152600101613684565b505050506111f5565b808885815181106136c257fe5b6020026020010181815250508784815181106136da57fe5b6020026020010151600014156136f2575050506111f5565b50505060010161358d565b61370561858d565b61370d61858d565b600080805b8751811461381257613759602089838151811061372b57fe5b60200260200101515103878a848151811061374257fe5b602002602001015161791b9092919063ffffffff16565b60006060306001600160a01b03168a848151811061377357fe5b60200260200101516040516137889190619eb2565b6000604051808303816000865af19150503d80600081146137c5576040519150601f19603f3d011682016040523d82523d6000602084013e6137ca565b606091505b509150915081156138085760006137ee60208351038361792b90919063ffffffff16565b90508481111561380657838852602088018290529350835b505b5050600101613712565b508061381e575061390d565b60005b8651811461390a57613851602088838151811061383a57fe5b602002602001015151038389848151811061374257fe5b60006060306001600160a01b031689848151811061386b57fe5b60200260200101516040516138809190619eb2565b6000604051808303816000865af19150503d80600081146138bd576040519150601f19603f3d011682016040523d82523d6000602084013e6138c2565b606091505b509150915081156139005760006138e660208351038361792b90919063ffffffff16565b9050858111156138fe57838752602087018290529450845b505b5050600101613821565b50505b93509350939050565b60408401516060906001600160e01b031916613998576040805160608101909152613991908061394a86896080840161a480565b6040516020818303038152906040528152602001868860405160200161397192919061a480565b6040516020818303038152906040528152602001617937815250836169fb565b905061144e565b8151806001600160401b03811180156139b057600080fd5b506040519080825280602002602001820160405280156139da578160200160208202803683370190505b50915060005b81811015611a95576000606088600001516001600160a01b0316621e84808a604001518a8a8a8881518110613a1157fe5b6020026020010151604051602401613a2b9392919061a462565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613a699190619eb2565b6000604051808303818686fa925050503d8060008114613aa5576040519150601f19603f3d011682016040523d82523d6000602084013e613aaa565b606091505b509150915060008215613ace5781806020019051810190613acb91906194f1565b90505b80868581518110613adb57fe5b602002602001018181525050858481518110613af357fe5b602002602001015160001415613b0b57505050611a95565b5050506001016139e0565b80516060908590806001600160401b0381118015613b3357600080fd5b50604051908082528060200260200182016040528015613b5d578160200160208202803683370190505b50604051630bcded8960e21b81529093506001600160a01b03831690632f37b62490613b8d908990600401619ece565b60206040518083038186803b158015613ba557600080fd5b505afa158015613bb9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613bdd91906194d5565b1580613c625750604051630bcded8960e21b81526001600160a01b03831690632f37b62490613c10908890600401619ece565b60206040518083038186803b158015613c2857600080fd5b505afa158015613c3c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613c6091906194d5565b155b15613c6e57505061144e565b613c76618546565b60405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f90613ca2908a90600401619ece565b60206040518083038186803b158015613cba57600080fd5b505afa158015613cce573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613cf291906194f1565b815260405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f90613d20908990600401619ece565b60206040518083038186803b158015613d3857600080fd5b505afa158015613d4c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613d7091906194f1565b6020820152604051634a46c67360e11b81526001600160a01b0384169063948d8ce690613da1908a90600401619ece565b60206040518083038186803b158015613db957600080fd5b505afa158015613dcd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613df191906194f1565b60408083019190915251634a46c67360e11b81526001600160a01b0384169063948d8ce690613e24908990600401619ece565b60206040518083038186803b158015613e3c57600080fd5b505afa158015613e50573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613e7491906194f1565b816060018181525050826001600160a01b031663d4cadf686040518163ffffffff1660e01b815260040160206040518083038186803b158015613eb657600080fd5b505afa158015613eca573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613eee91906194f1565b608082015260005b828110156111f5578151613f14906002670de0b6b3a7640000612b34565b868281518110613f2057fe5b60200260200101511115613f33576111f5565b836001600160a01b031663ba9530a6620493e084600001518560400151866020015187606001518c8881518110613f6657fe5b602002602001015189608001516040518863ffffffff1660e01b8152600401613f949695949392919061a785565b60206040518083038187803b158015613fac57600080fd5b5086fa93505050508015613fdd575060408051601f3d908101601f19168201909252613fda918101906194f1565b60015b61400b573d808015612b16576040519150601f19603f3d011682016040523d82523d6000602084013e612b1b565b8086838151811061401857fe5b60200260200101818152505085828151811061403057fe5b60200260200101516000141561404657506111f5565b50600101613ef6565b6000808351600381111561405f57fe5b1480614077575060018351600381111561407557fe5b145b8061408d575060408401516001600160801b0316155b806140a3575060608401516001600160801b0316155b156140b05750600061418f565b6140b86185a7565b600080846001600160a01b0316631fb0979588886040518363ffffffff1660e01b81526004016140e992919061a674565b60a06040518083038186803b15801561410157600080fd5b505afa158015614115573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906141399190619a95565b9194509250905060018360200151600481111561415257fe5b14158061415d575080155b80614170575086516001600160a01b0316155b15614181576000935050505061418f565b506001600160801b03169150505b9392505050565b60006060806141a585876163ae565b6141b087878761798b565b9250826141bc57610df0565b60405163276fdad960e11b81523090634edfb5b2906141e5908a9087908b908b9060040161a63b565b60006040518083038186803b1580156141fd57600080fd5b505afa158015614211573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526142399190810190619509565b8760800181905250866080015191506142b06040518060600160405280878a60405160200161426992919061a16c565b6040516020818303038152906040528152602001888a60405160200161429092919061a16c565b6040516020818303038152906040528152602001617af2815250856169fb565b90509450945094915050565b600080856001600160a01b031663901754d786866040518363ffffffff1660e01b81526004016142ed929190619efb565b60206040518083038186803b15801561430557600080fd5b505afa158015614319573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061433d9190618c94565b90506001600160a01b03811661435757600091505061144e565b60006001600160a01b038616156143e9576040516370a0823160e01b81526001600160a01b038716906370a0823190614394908590600401619ece565b60206040518083038186803b1580156143ac57600080fd5b505afa1580156143c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906143e491906194f1565b6143f5565b816001600160a01b0316315b90508381101561440a5760009250505061144e565b6040516303c2803f60e31b81526001600160a01b03831690631e1401f890620249f09061443f908a908a908a90600401619ff6565b60206040518083038187803b15801561445757600080fd5b5086fa93505050508015614488575060408051601f3d908101601f19168201909252614485918101906194f1565b60015b6144c8573d8080156144b6576040519150601f19603f3d011682016040523d82523d6000602084013e6144bb565b606091505b506000935050505061144e565b925061144e915050565b60606144de83856163ae565b60208501516040805160028082526060828101909352816020016020820280368337019050509050858160008151811061451457fe5b60200260200101906001600160a01b031690816001600160a01b031681525050848160018151811061454257fe5b6001600160a01b03909216602092830291909101909101528351806001600160401b038111801561457257600080fd5b5060405190808252806020026020018201604052801561459c578160200160208202803683370190505b5093506145a761851f565b6145af6163e4565b905060005b8281101561101e5760606145ce8b898481518110610f0057fe5b604051637c26833760e11b81529091506001600160a01b0387169063f84d066e906146049060019085908a90899060040161a3d4565b600060405180830381600087803b15801561461e57600080fd5b505af192505050801561465357506040513d6000823e601f3d908101601f191682016040526146509190810190619351565b60015b614681573d808015610fc0576040519150601f19603f3d011682016040523d82523d6000602084013e610fc5565b60008160008151811061469057fe5b60200260200101519050600081136146aa5750505061101e565b808985815181106146b757fe5b6020026020010181815250505050506001016145b4565b8051606090806001600160401b03811180156146e957600080fd5b50604051908082528060200260200182016040528015614713578160200160208202803683370190505b50915060005b81811015611a9557866001600160a01b031663343fbcdd62061a80888888868151811061474257fe5b60200260200101516040518563ffffffff1660e01b815260040161476893929190619ff6565b60206040518083038187803b15801561478057600080fd5b5086fa935050505080156147b1575060408051601f3d908101601f191682019092526147ae918101906194f1565b60015b6147df573d808015611a45576040519150601f19603f3d011682016040523d82523d6000602084013e611a4a565b808483815181106147ec57fe5b60200260200101818152505083828151811061480457fe5b60200260200101516000141561481a5750611a95565b50600101614719565b600080606061483285876163ae565b8351806001600160401b038111801561484a57600080fd5b50604051908082528060200260200182016040528015614874578160200160208202803683370190505b50915061488389898989617bd9565b945092506001600160a01b03831661489b5750614955565b60005b8181101561495257600061490c8986886040516020016148c093929190619f9e565b6040516020818303038152906040528987896040516020016148e493929190619f9e565b6040516020818303038152906040528985815181106148ff57fe5b6020026020010151617d2e565b90508084838151811061491b57fe5b60200260200101818152505083828151811061493357fe5b6020026020010151600014156149495750614952565b5060010161489e565b50505b955095509592505050565b606061496c83856163ae565b8151806001600160401b038111801561498457600080fd5b506040519080825280602002602001820160405280156149ae578160200160208202803683370190505b50915060005b81811015611a9557866001600160a01b031663144a2752620f424087898886815181106149dd57fe5b60200260200101516040518563ffffffff1660e01b8152600401614a0393929190619ff6565b60206040518083038187803b158015614a1b57600080fd5b5086fa93505050508015614a4c575060408051601f3d908101601f19168201909252614a49918101906194f1565b60015b614a7a573d808015611a45576040519150601f19603f3d011682016040523d82523d6000602084013e611a4a565b80848381518110614a8757fe5b602002602001018181525050838281518110614a9f57fe5b602002602001015160001415614ab55750611a95565b506001016149b4565b60006060614acc84866163ae565b8251806001600160401b0381118015614ae457600080fd5b50604051908082528060200260200182016040528015614b0e578160200160208202803683370190505b50915060005b81811015614b83576000614b3d898989898681518110614b3057fe5b60200260200101516142bc565b905080848381518110614b4c57fe5b602002602001018181525050838281518110614b6457fe5b602002602001015160001415614b7a5750614b83565b50600101614b14565b5060405163901754d760e01b81526001600160a01b0388169063901754d790614bb29089908990600401619efb565b60206040518083038186803b158015614bca57600080fd5b505afa158015614bde573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614c029190618c94565b92505094509492505050565b6040805160608181019092526114bc9080614c2d868960808401619efb565b60405160208183030381529060405281526020018688604051602001614c54929190619efb565b6040516020818303038152906040528152602001617e20815250836169fb565b606082516001600160401b0381118015614c8d57600080fd5b50604051908082528060200260200182016040528015614cb7578160200160208202803683370190505b50905060005b83518114613045577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316848281518110614cfb57fe5b60200260200101516001600160a01b031614614d4557614d4083858381518110614d2157fe5b60200260200101516001600160a01b0316617e6790919063ffffffff16565b614d51565b826001600160a01b0316315b828281518110614d5d57fe5b6020908102919091010152600101614cbd565b6040805160608181019092526114bc9080614d8f868960808401619efb565b60405160208183030381529060405281526020018688604051602001614db6929190619efb565b6040516020818303038152906040528152602001617f31815250836169fb565b6060614de283856163ae565b8151806001600160401b0381118015614dfa57600080fd5b50604051908082528060200260200182016040528015614e24578160200160208202803683370190505b50915060006001600160a01b03861615614e4757614e4287876164a5565b614e4a565b60005b905060006001600160a01b03861615614e6c57614e6788876164a5565b614e6f565b60005b905060005b838110156111f55760016001600160a01b038816614ec557614ea4846395b68fe760e01b8985815181106110f957fe5b878481518110614eb057fe5b60200260200101819350828152505050614f5f565b6001600160a01b038916614eeb57614ea48363cd7724c360e01b8985815181106110f957fe5b6000614f05856395b68fe760e01b8a86815181106110f957fe5b925090508015614f4257614f218463cd7724c360e01b83616524565b888581518110614f2d57fe5b60200260200101819450828152505050614f5d565b6000878481518110614f5057fe5b6020026020010181815250505b505b801580614f7f5750858281518110614f7357fe5b60200260200101516000145b15614f8a57506111f5565b50600101614e74565b8051606090806001600160401b0381118015614fae57600080fd5b50604051908082528060200260200182016040528015614fd8578160200160208202803683370190505b50915060005b81811015611c1a57856001600160a01b0316631f00ca74620249f086848151811061500557fe5b6020026020010151886040518463ffffffff1660e01b815260040161502b92919061a6c8565b60006040518083038187803b15801561504357600080fd5b5086fa9350505050801561507957506040513d6000823e601f3d908101601f1916820160405261507691908101906194a3565b60015b6150a7573d808015611bb3576040519150601f19603f3d011682016040523d82523d6000602084013e611bb8565b806000815181106150b457fe5b60200260200101518483815181106150c857fe5b6020026020010181815250508382815181106150e057fe5b6020026020010151600014156150f65750611c1a565b50600101614fde565b606061510b83856163ae565b8151806001600160401b038111801561512357600080fd5b5060405190808252806020026020018201604052801561514d578160200160208202803683370190505b50915060005b81811015611a9557866001600160a01b031663ff1fd974620f4240888888868151811061517c57fe5b60200260200101516040518563ffffffff1660e01b81526004016151a293929190619ff6565b60206040518083038187803b1580156151ba57600080fd5b5086fa935050505080156151eb575060408051601f3d908101601f191682019092526151e8918101906194f1565b60015b615219573d808015611a45576040519150601f19603f3d011682016040523d82523d6000602084013e611a4a565b8084838151811061522657fe5b60200260200101818152505083828151811061523e57fe5b6020026020010151600014156152545750611a95565b50600101615153565b600060608061526c85876163ae565b61527787878761798b565b92508261528357610df0565b60405163276fdad960e11b81523090634edfb5b2906152ac908a9087908b908b9060040161a63b565b60006040518083038186803b1580156152c457600080fd5b505afa1580156152d8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526153009190810190619509565b608088018190528451909250806001600160401b038111801561532257600080fd5b5060405190808252806020026020018201604052801561534c578160200160208202803683370190505b50915060005b81811015615437576000306001600160a01b031663f1ed7fa48b8b8b8b878151811061537a57fe5b60200260200101516040518563ffffffff1660e01b81526004016153a1949392919061a605565b60206040518083038186803b1580156153b957600080fd5b505afa1580156153cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906153f191906194f1565b90508084838151811061540057fe5b60200260200101818152505083828151811061541857fe5b60200260200101516000141561542e5750615437565b50600101615352565b50509450945094915050565b600080606061545285876163ae565b61545e88888888617bd9565b935091506001600160a01b03821661547557614955565b8351806001600160401b038111801561548d57600080fd5b506040519080825280602002602001820160405280156154b7578160200160208202803683370190505b50604080516060810190915290925061552490806154db8987891560808501619f9e565b604051602081830303815290604052815260200189868860405160200161550493929190619f9e565b6040516020818303038152906040528152602001617d2e815250866169fb565b915050955095509592505050565b600080606061554185876163ae565b8351806001600160401b038111801561555957600080fd5b50604051908082528060200260200182016040528015615583578160200160208202803683370190505b508851604051630939d86360e11b81529193506001600160a01b031690631273b0c6906155b6908a908a90600401619efb565b60206040518083038186803b1580156155ce57600080fd5b505afa1580156155e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906156069190618c94565b925060006001600160a01b03841615615624575060019350866156c3565b8851604051630939d86360e11b81526001600160a01b0390911690631273b0c690615655908a908c90600401619efb565b60206040518083038186803b15801561566d57600080fd5b505afa158015615681573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906156a59190618c94565b93506001600160a01b0384166156bc575050610df0565b5060009350855b836001600160a01b031663dd58b41c6040518163ffffffff1660e01b815260040160206040518083038186803b1580156156fc57600080fd5b505afa158015615710573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061573491906194d5565b61573f575050610df0565b6157b760405180606001604052808987858e602001516040516020016157689493929190619f15565b60405160208183030381529060405281526020018a87858e602001516040516020016157979493929190619f15565b6040516020818303038152906040528152602001616bf8815250876169fb565b925050509450945094915050565b606083516001600160401b03811180156157de57600080fd5b50604051908082528060200260200182016040528015615808578160200160208202803683370190505b50905060005b84518114610c92577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031685828151811061584c57fe5b60200260200101516001600160a01b03161461589857615893848487848151811061587357fe5b60200260200101516001600160a01b0316617fe69092919063ffffffff16565b61589b565b60005b8282815181106158a757fe5b602090810291909101015260010161580e565b8051606090806001600160401b03811180156158d557600080fd5b506040519080825280602002602001820160405280156158ff578160200160208202803683370190505b50915060005b81811015611a9557866001600160a01b031663838e6a22620493e0888888868151811061592e57fe5b60200260200101516040518563ffffffff1660e01b815260040161595493929190619ff6565b60206040518083038187803b15801561596c57600080fd5b5086fa9350505050801561599d575060408051601f3d908101601f1916820190925261599a918101906194f1565b60015b6159cb573d808015611a45576040519150601f19603f3d011682016040523d82523d6000602084013e611a4a565b808483815181106159d857fe5b60200260200101818152505050600101615905565b600084608001515160001415615a055750600061144e565b84604001516001600160a01b031663418436bc6207a12087606001516001600160a01b0316876001600160a01b031614615a3f5786615a55565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b88606001516001600160a01b0316876001600160a01b031614615a785786615a8e565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b8660008b608001516040518763ffffffff1660e01b8152600401615ab695949392919061a01a565b60206040518083038187803b158015615ace57600080fd5b5086fa93505050508015615aff575060408051601f3d908101601f19168201909252615afc918101906194f1565b60015b615b3d573d808015615b2d576040519150601f19603f3d011682016040523d82523d6000602084013e615b32565b606091505b50600091505061144e565b6000615b48856180b2565b60ff1690506000615b58876180b2565b60ff169050670de0b6b3a764000081600a0a83600a0a8786020281615b7957fe5b0481615b8157fe5b04935050505061144e565b60006060615b9a84866163ae565b8251806001600160401b0381118015615bb257600080fd5b50604051908082528060200260200182016040528015615bdc578160200160208202803683370190505b509150615c4760405180606001604052808988604051602001615c00929190619efb565b60405160208183030381529060405281526020018989604051602001615c27929190619efb565b60405160208183030381529060405281526020016180bd815250856169fb565b60405163901754d760e01b81529092506001600160a01b0388169063901754d790614bb29089908990600401619efb565b615c8061858d565b615c8861858d565b6000198060005b86518114615d8457615cbf6020888381518110615ca857fe5b602002602001015151038789848151811061374257fe5b60006060306001600160a01b0316898481518110615cd957fe5b6020026020010151604051615cee9190619eb2565b6000604051808303816000865af19150503d8060008114615d2b576040519150601f19603f3d011682016040523d82523d6000602084013e615d30565b606091505b50915091508115615d7a576000615d5460208351038361792b90919063ffffffff16565b9050600081118015615d6557508481105b15615d7857838752602087018290529350835b505b5050600101615c8f565b50600019811415615d95575061390d565b60005b8751811461390a57615dc86020898381518110615db157fe5b60200260200101515103838a848151811061374257fe5b60006060306001600160a01b03168a8481518110615de257fe5b6020026020010151604051615df79190619eb2565b6000604051808303816000865af19150503d8060008114615e34576040519150601f19603f3d011682016040523d82523d6000602084013e615e39565b606091505b50915091508115615e83576000615e5d60208351038361792b90919063ffffffff16565b9050600081118015615e6e57508581105b15615e8157838852602088018290529450845b505b5050600101615d98565b60606000836001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b158015615eca57600080fd5b505afa158015615ede573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190615f029190618c94565b905060018351036001600160401b0381118015615f1e57600080fd5b50604051908082528060200260200182016040528015615f48578160200160208202803683370190505b50915060005b8251811015616173576060826001600160a01b0316635b1dc86f620249f0878581518110615f7857fe5b6020026020010151888660010181518110615f8f57fe5b60200260200101516040518463ffffffff1660e01b8152600401615fb4929190619efb565b60006040518083038187803b158015615fcc57600080fd5b5086fa9350505050801561600257506040513d6000823e601f3d908101601f19168201604052615fff919081019061904c565b60015b616051573d808015616030576040519150601f19603f3d011682016040523d82523d6000602084013e616035565b606091505b5050604080516000815260208101909152935061617692505050565b600060018251101561607e5760405162461bcd60e51b81526004016160759061a566565b60405180910390fd5b60005b825181101561616757600083828151811061609857fe5b60200260200101516001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156160d857600080fd5b505afa1580156160ec573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061611091906194f1565b90508281111561615e5780925083828151811061612957fe5b602002602001015188878151811061613d57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b50600101616081565b50505050600101615f4e565b50505b92915050565b6000606085600001516001600160a01b03166321f8a72187600001516001600160a01b0316639232494e6040518163ffffffff1660e01b815260040160206040518083038186803b1580156161d057600080fd5b505afa1580156161e4573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061620891906194f1565b6040518263ffffffff1660e01b8152600401616224919061a2fe565b60206040518083038186803b15801561623c57600080fd5b505afa158015616250573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906162749190618c94565b915085602001515160001415616289576163a5565b6000805b8760200151518110156163a2576002886020015182815181106162ac57fe5b60200260200101515110156162c05761639a565b836001600160a01b0316637f9c0ecd620493e08a6020015184815181106162e357fe5b60200260200101518860018a5103815181106162fb57fe5b60200260200101516040518463ffffffff1660e01b815260040161632092919061a1b5565b60206040518083038187803b15801561633857600080fd5b5086fa93505050508015616369575060408051601f3d908101601f19168201909252616366918101906194f1565b60015b6163725761639a565b82811115616398578092508860200151828151811061638d57fe5b602002602001015193505b505b60010161628d565b50505b94509492505050565b806001600160a01b0316826001600160a01b031614156163e05760405162461bcd60e51b81526004016160759061a4dc565b5050565b6163ec61851f565b50604080516080810182523080825260006020830181905292820152606081019190915290565b604080516001808252818301909252606091829190816020015b6164356185c9565b81526020019060019003908161642d5790505090506040518060a00160405280856000015181526020016000815260200160018152602001848152602001604051806020016040528060008152508152508160008151811061649357fe5b60209081029190910101529392505050565b6040516303795fb160e11b81526000906001600160a01b038416906306f2bf62906164d4908590600401619ece565b60206040518083038186803b1580156164ec57600080fd5b505afa158015616500573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061418f9190618c94565b6000806001600160a01b03851661653a57610b1f565b6060856001600160a01b0316620249f0868660405160240161655c919061a2fe565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161659a9190619eb2565b6000604051808303818686fa925050503d80600081146165d6576040519150601f19603f3d011682016040523d82523d6000602084013e6165db565b606091505b50909250905081156165fe57808060200190518101906165fb91906194f1565b92505b50935093915050565b600080600080846001600160a01b031663d9638d368b602001516040518263ffffffff1660e01b815260040161663d919061a2fe565b60a06040518083038186803b15801561665557600080fd5b505afa158015616669573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061668d9190619b8c565b94509450505092506000620f424090508a604001516001600160a01b0316896001600160a01b031614156167b55760006166cc8964e8d4a5100061810d565b905060006166f06b033b2e3c9fd0803ce80000006166ea8885618143565b9061810d565b905084811061670857600096505050505050506168be565b6000616797670de0b6b3a76400006167918c6001600160a01b031663568d4b6f6040518163ffffffff1660e01b815260040160206040518083038186803b15801561675257600080fd5b505afa158015616766573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061678a91906194f1565b869061810d565b9061815f565b905060006167a58483618189565b98506168be975050505050505050565b8a604001516001600160a01b03168a6001600160a01b031614156168b55787848111156167ea576000955050505050506168be565b60006168066b033b2e3c9fd0803ce80000006166ea8885618189565b905083811161681e57600096505050505050506168be565b60006168a38a6001600160a01b031663fae036d56040518163ffffffff1660e01b815260040160206040518083038186803b15801561685c57600080fd5b505afa158015616870573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061689491906194f1565b670de0b6b3a764000090618143565b905060006167a582616791868861810d565b60009450505050505b9695505050505050565b6000806168d36185fb565b858060200190518101906168e7919061959d565b915091506000858060200190518101906169019190619581565b905060006060306322db5ed160e21b85878661691c8c6181a8565b60405160240161692f949392919061a59d565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161696d9190619eb2565b600060405180830381855afa9150503d80600081146169a8576040519150601f19603f3d011682016040523d82523d6000602084013e6169ad565b606091505b5091509150816169c55760009550505050505061418f565b808060200190518101906169d991906194a3565b6000815181106169e557fe5b6020026020010151955050505050509392505050565b606081516001600160401b0381118015616a1457600080fd5b50604051908082528060200260200182016040528015616a3e578160200160208202803683370190505b509050815160001415616a5057616176565b6000616a818460000151856020015185600081518110616a6c57fe5b6020026020010151876040015163ffffffff16565b905080616a8e5750616176565b6000616aab8560200151866000015184886040015163ffffffff16565b905080616ab9575050616176565b60005b8451811015616bef5760005b6005811015616bb157616aef868381518110616ae057fe5b602002602001015184866181e9565b935083616afb57616bb1565b616b0a612715612710866181e9565b935083616b1657616bb1565b6000616b3388602001518960000151878b6040015163ffffffff16565b905080616b405750616bb1565b809350868381518110616b4f57fe5b60200260200101518410616ba8576000878481518110616b6b57fe5b6020026020010151612710898681518110616b8257fe5b602002602001015187030281616b9457fe5b04905060058111616ba6575050616bb1565b505b50600101616ac8565b50616bd0858281518110616bc157fe5b602002602001015183856181e9565b848281518110616bdc57fe5b6020908102919091010152600101616abc565b50505092915050565b600080600080600087806020019051810190616c149190618ce9565b9350935093509350816001600160a01b0316846001600160a01b03161415616cfe576040516351400f0b60e11b81526001600160a01b0384169063a2801e1690620493e090616c67908a9060040161a2fe565b60206040518083038187803b158015616c7f57600080fd5b5086fa93505050508015616cb0575060408051601f3d908101601f19168201909252616cad918101906194f1565b60015b616cf2573d808015616cde576040519150601f19603f3d011682016040523d82523d6000602084013e616ce3565b606091505b5060009550505050505061418f565b945061418f9350505050565b60405163ca19ebd960e01b81526001600160a01b0382169063ca19ebd990620493e090616c679087908b90600401619ee2565b60606002828451031015616d575760405162461bcd60e51b81526004016160759061a498565b616d5f61861b565b5060408051606080820183526101f48252610bb860208301526127108284015282516003808252608082019094529192909190816020016020820280368337019050509050600080868681518110616db357fe5b602002602001015190506000878760010181518110616dce57fe5b6020026020010151905060005b6003811015616ec35760008a6001600160a01b0316631698ee8285858a8660038110616e0357fe5b60200201516040518463ffffffff1660e01b8152600401616e269392919061a346565b60206040518083038186803b158015616e3e57600080fd5b505afa158015616e52573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190616e769190618c94565b9050616e8181618241565b15616eba5780868680600101975081518110616e9957fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b50600101616ddb565b50505080616ed35750505061418f565b8551856002011415616fc957806001600160401b0381118015616ef557600080fd5b50604051908082528060200260200182016040528015616f2957816020015b6060815260200190600190039081616f145790505b50935060005b81811015616fc057604080516001808252818301909252906020808301908036833701905050858281518110616f6157fe5b6020026020010181905250828181518110616f7857fe5b6020026020010151858281518110616f8c57fe5b6020026020010151600081518110616fa057fe5b6001600160a01b0390921660209283029190910190910152600101616f2f565b5050505061418f565b6060616fd9888888600101616d31565b9050805160001415616fee575050505061418f565b805182026001600160401b038111801561700757600080fd5b5060405190808252806020026020018201604052801561703b57816020015b60608152602001906001900390816170265790505b50945060005b828110156171bb5760005b82518110156171b257825182810282019084908390811061706957fe5b6020026020010151516001016001600160401b038111801561708a57600080fd5b506040519080825280602002602001820160405280156170b4578160200160208202803683370190505b508882815181106170c157fe5b60200260200101819052508583815181106170d857fe5b60200260200101518882815181106170ec57fe5b602002602001015160008151811061710057fe5b60200260200101906001600160a01b031690816001600160a01b03168152505060005b84838151811061712f57fe5b6020026020010151518110156171a85784838151811061714b57fe5b6020026020010151818151811061715e57fe5b602002602001015189838151811061717257fe5b6020026020010151826001018151811061718857fe5b6001600160a01b0390921660209283029190910190910152600101617123565b505060010161704c565b50600101617041565b50505050509392505050565b606060028351101580156171df575081516001018351145b6171fb5760405162461bcd60e51b81526004016160759061a521565b81516003028351601402016001600160401b038111801561721b57600080fd5b506040519080825280601f01601f191660200182016040528015617246576020820181803683370190505b5090506020810160005b84518110156161735780156172f557600084600183038151811061727057fe5b60200260200101516001600160a01b031663ddca3f436040518163ffffffff1660e01b815260040160206040518083038186803b1580156172b057600080fd5b505afa1580156172c4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906172e89190619b11565b60e81b8352506003909101905b600085828151811061730357fe5b602090810291909101015160601b835250601490910190600101617250565b6000828202831580159061733f57508284828161733b57fe5b0414155b1561734e576000915050616176565b6706f05b59d3b2000081018181101561736c57600092505050616176565b670de0b6b3a76400009004949350505050565b606081516001600160401b038111801561739857600080fd5b506040519080825280602002602001820160405280156173c2578160200160208202803683370190505b50905060005b8251811015613138578260018285510303815181106173e357fe5b60200260200101518282815181106173f757fe5b6001600160a01b03909216602092830291909101909101526001016173c8565b606081516001600160401b038111801561743057600080fd5b5060405190808252806020026020018201604052801561745a578160200160208202803683370190505b50905060005b82518110156131385782600182855103038151811061747b57fe5b602002602001015182828151811061748f57fe5b6001600160a01b0390921660209283029190910190910152600101617460565b6000806000858060200190518101906174c89190618cb0565b915091506000858060200190518101906174e29190618c94565b90503063e8e4af098385846174f68a6181a8565b6040518563ffffffff1660e01b81526004016175159493929190619f40565b60006040518083038186803b15801561752d57600080fd5b505afa92505050801561756257506040513d6000823e601f3d908101601f1916820160405261755f91908101906194a3565b60015b6175a3573d808015617590576040519150601f19603f3d011682016040523d82523d6000602084013e617595565b606091505b50600094505050505061418f565b806000815181106175b057fe5b602002602001015194505050505061418f565b600061144e836167916175d7826001618189565b6175e1888761810d565b90618143565b60006012905060006060836001600160a01b031660405180604001604052806004815260200163313ce56760e01b8152506040516176259190619eb2565b600060405180830381855afa9150503d8060008114617660576040519150601f19603f3d011682016040523d82523d6000602084013e617665565b606091505b509150915081801561767957506020815110155b1561097a5761144e81600061792b565b600080600080846001600160a01b031663d9638d368b602001516040518263ffffffff1660e01b81526004016176bf919061a2fe565b60a06040518083038186803b1580156176d757600080fd5b505afa1580156176eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061770f9190619b8c565b945094505050925089604001516001600160a01b0316886001600160a01b0316141561782657600087905060006177bf886001600160a01b031663568d4b6f6040518163ffffffff1660e01b815260040160206040518083038186803b15801561777857600080fd5b505afa15801561778c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906177b091906194f1565b670de0b6b3a764000090618189565b905060006177d98261679185670de0b6b3a764000061810d565b905060006177f76b033b2e3c9fd0803ce80000006166ea8985618143565b90508581106178105760009750505050505050506168be565b60006167a560016175e18564e8d4a5100061815f565b89604001516001600160a01b0316896001600160a01b0316141561790b5760006178558864e8d4a5100061810d565b90506000617895886001600160a01b031663fae036d56040518163ffffffff1660e01b815260040160206040518083038186803b15801561685c57600080fd5b905060006178af670de0b6b3a7640000616791858561810d565b9050858111156178c857600096505050505050506168be565b60006178e46b033b2e3c9fd0803ce80000006166ea8985618189565b90508481116178fd5760009750505050505050506168be565b5095506168be945050505050565b5060009998505050505050505050565b61792683838361844d565b505050565b600061418f8383618474565b6000806179426185fb565b85806020019051810190617956919061959d565b915091506000858060200190518101906179709190619581565b9050600060603063205e01d760e11b85878661691c8c6181a8565b600080846020015190506060816001600160a01b031663910ffc7187606001516001600160a01b0316876001600160a01b0316146179c957866179df565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b88606001516001600160a01b0316876001600160a01b031614617a025786617a18565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b604080516000815260208101918290526001600160e01b031960e086901b16909152617a4c92919060019060248101619fc2565b60006040518083038186803b158015617a6457600080fd5b505afa158015617a78573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052617aa091908101906190e4565b505090508051866000015110617abc57506000915061418f9050565b80866000015181518110617acc57fe5b6020026020010151925060f883901c60001c60bb1415611c1a57506000915061418f9050565b600080617afd618639565b84806020019051810190617b119190618d97565b91509150600086806020019051810190617b2b9190618d97565b50604051633c7b5fe960e21b8152909150309063f1ed7fa490617b58908590859088908b9060040161a605565b60206040518083038186803b158015617b7057600080fd5b505afa925050508015617ba0575060408051601f3d908101601f19168201909252617b9d918101906194f1565b60015b617bce573d808015617590576040519150601f19603f3d011682016040523d82523d6000602084013e617595565b935061418f92505050565b6000806060866001600160a01b03166357a281dc86866040518363ffffffff1660e01b8152600401617c0c929190619efb565b60006040518083038186803b158015617c2457600080fd5b505afa158015617c38573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052617c60919081019061904c565b905060019150805160001415617cf9576040516315e8a07760e21b81526001600160a01b038816906357a281dc90617c9e9087908990600401619efb565b60006040518083038186803b158015617cb657600080fd5b505afa158015617cca573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052617cf2919081019061904c565b9050600091505b80518610617d0e5760008092509250506163a5565b808681518110617d1a57fe5b602002602001015192505094509492505050565b60008060008086806020019051810190617d489190618d47565b9250925092508015617dec57604051633cd0243b60e11b81526001600160a01b038316906379a0487690620493e090617d88906000908a90600401619ee2565b604080518083038187803b158015617d9f57600080fd5b5086fa93505050508015617dd0575060408051601f3d908101601f19168201909252617dcd91810190619b34565b60015b617de0576000935050505061418f565b50935061418f92505050565b6040516366410a2160e01b81526001600160a01b038316906366410a2190620493e090617d88906000908a90600401619ee2565b600080600085806020019051810190617e399190618cb0565b91509150600085806020019051810190617e539190618c94565b9050306330d6570d8385846174f68a6181a8565b6000806060846001600160a01b03166370a0823160e01b85604051602401617e8f9190619ece565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051617ecd9190619eb2565b600060405180830381855afa9150503d8060008114617f08576040519150601f19603f3d011682016040523d82523d6000602084013e617f0d565b606091505b5091509150818015617f2157506020815110155b15616173576114bc81600061792b565b600080600085806020019051810190617f4a9190618cb0565b91509150600085806020019051810190617f649190618c94565b90503063a469841762061a80848685617f7c8b6181a8565b6040518663ffffffff1660e01b8152600401617f9b9493929190619f40565b60006040518083038187803b158015617fb357600080fd5b5086fa9350505050801561756257506040513d6000823e601f3d908101601f1916820160405261755f91908101906194a3565b6000806060856001600160a01b031663dd62ed3e60e01b8686604051602401618010929190619efb565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161804e9190619eb2565b600060405180830381855afa9150503d8060008114618089576040519150601f19603f3d011682016040523d82523d6000602084013e61808e565b606091505b50915091508180156180a257506020815110155b15611c1a576168be81600061792b565b6000616176826175e7565b6000806000858060200190518101906180d69190618cb0565b91509150600080868060200190518101906180f19190618cb0565b91509150618101848483896142bc565b98975050505050505050565b60008261811c57506000616176565b8282028284828161812957fe5b041461418f5761418f61813e6001868661849e565b6184f8565b60008282018381101561418f5761418f61813e6000868661849e565b6000816181755761817561813e6003858561849e565b600082848161818057fe5b04949350505050565b6000828211156181a2576181a261813e6002858561849e565b50900390565b6040805160018082528183019092526060916020808301908036833701905050905081816000815181106181d857fe5b602002602001018181525050919050565b60008315806181f6575081155b806181ff575082155b1561820c5750600061418f565b8382028285828161821957fe5b041461822957600091505061418f565b836001850382018161823757fe5b0495945050505050565b6000813b80618254576000915050610dff565b50816001600160a01b0316630dfe16816040518163ffffffff1660e01b815260040160206040518083038186803b15801561828e57600080fd5b505afa1580156182a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906182c69190618c94565b6001600160a01b03166370a08231836040518263ffffffff1660e01b81526004016182f19190619ece565b60206040518083038186803b15801561830957600080fd5b505afa15801561831d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061834191906194f1565b61834d57506000610dff565b816001600160a01b031663d21220a76040518163ffffffff1660e01b815260040160206040518083038186803b15801561838657600080fd5b505afa15801561839a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906183be9190618c94565b6001600160a01b03166370a08231836040518263ffffffff1660e01b81526004016183e99190619ece565b60206040518083038186803b15801561840157600080fd5b505afa158015618415573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061843991906194f1565b61844557506000610dff565b506001919050565b816020018351101561846c5761846c61813e6005855185602001618500565b910160200152565b600081602001835110156184955761849561813e6005855185602001618500565b50016020015190565b606063e946c1bb60e01b8484846040516024016184bd9392919061a392565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915290509392505050565b805160208201fd5b6060632800659560e01b8484846040516024016184bd9392919061a3b2565b60408051608081018252600080825260208201819052918101829052606081019190915290565b6040518060a0016040528060008152602001600081526020016000815260200160008152602001600081525090565b60408051808201909152606081526000602082015290565b604051806040016040528060008152602001606081525090565b6040805160608101909152600080825260208201908152600060209091015290565b6040518060a0016040528060008019168152602001600081526020016000815260200160008152602001606081525090565b604080516060810182526000808252602082018190529181019190915290565b60405180606001604052806003906020820280368337509192915050565b6040518060a001604052806000815260200160006001600160a01b0316815260200160006001600160a01b0316815260200160006001600160a01b03168152602001606081525090565b80356161768161a89b565b600082601f83011261869e578081fd5b81356186b16186ac8261a81e565b61a7f8565b8181529150602080830190848101818402860182018710156186d257600080fd5b60005b848110156186fa5781356186e88161a89b565b845292820192908201906001016186d5565b505050505092915050565b600082601f830112618715578081fd5b81356187236186ac8261a81e565b818152915060208083019084810160005b848110156186fa5761874b888484358a01016188f4565b84529282019290820190600101618734565b600082601f83011261876d578081fd5b813561877b6186ac8261a81e565b81815291506020808301908481018184028601820187101561879c57600080fd5b60005b848110156186fa5781356187b28161a89b565b8452928201929082019060010161879f565b600082601f8301126187d4578081fd5b81356187e26186ac8261a81e565b818152915060208083019084810160808085028701830188101561880557600080fd5b60005b8581101561882c5761881a8984618bf3565b85529383019391810191600101618808565b50505050505092915050565b600082601f830112618848578081fd5b81356188566186ac8261a81e565b81815291506020808301908481018184028601820187101561887757600080fd5b60005b848110156186fa5781358452928201929082019060010161887a565b600082601f8301126188a6578081fd5b81516188b46186ac8261a81e565b8181529150602080830190848101818402860182018710156188d557600080fd5b60005b848110156186fa578151845292820192908201906001016188d8565b600082601f830112618904578081fd5b81356189126186ac8261a83d565b915080825283602082850101111561892957600080fd5b8060208401602084013760009082016020015292915050565b600082601f830112618952578081fd5b81516189606186ac8261a83d565b915080825283602082850101111561897757600080fd5b61304581602084016020860161a86b565b80516002811061617657600080fd5b6000606082840312156189a8578081fd5b6189b2606061a7f8565b905081356189bf8161a89b565b815260208201356189cf8161a8c1565b602082015260408201356189e28161a8c1565b604082015292915050565b6000606082840312156189fe578081fd5b618a08606061a7f8565b90508151618a158161a89b565b81526020820151618a258161a8c1565b602082015260408201516189e28161a8c1565b600060408284031215618a49578081fd5b618a53604061a7f8565b90508135618a608161a89b565b81526020820135618a708161a89b565b602082015292915050565b600060a08284031215618a8c578081fd5b618a9660a061a7f8565b9050813581526020820135618aaa8161a89b565b60208201526040820135618abd8161a89b565b60408201526060820135618ad08161a89b565b606082015260808201356001600160401b03811115618aee57600080fd5b618afa848285016188f4565b60808301525092915050565b6000610180808385031215618b19578182fd5b618b228161a7f8565b915050618b2f8383618683565b8152618b3e8360208401618683565b6020820152618b508360408401618c56565b6040820152618b628360608401618c56565b6060820152618b748360808401618c56565b6080820152618b868360a08401618683565b60a0820152618b988360c08401618683565b60c0820152618baa8360e08401618683565b60e0820152610100618bbe84828501618683565b908201526101208281013590820152610140618bdc84828501618c61565b818301525061016080830135818301525092915050565b600060808284031215618c04578081fd5b618c0e608061a7f8565b9050813560048110618c1f57600080fd5b8152602082013560ff81168114618c3557600080fd5b80602083015250604082013560408201526060820135606082015292915050565b80356161768161a8e6565b80356001600160401b038116811461617657600080fd5b600060208284031215618c89578081fd5b813561418f8161a89b565b600060208284031215618ca5578081fd5b815161418f8161a89b565b60008060408385031215618cc2578081fd5b8251618ccd8161a89b565b6020840151909250618cde8161a89b565b809150509250929050565b60008060008060808587031215618cfe578182fd5b8451618d098161a89b565b6020860151909450618d1a8161a89b565b6040860151909350618d2b8161a89b565b6060860151909250618d3c8161a89b565b939692955090935050565b600080600060608486031215618d5b578081fd5b8351618d668161a89b565b6020850151909350618d778161a89b565b60408501519092508015158114618d8c578182fd5b809150509250925092565b60008060408385031215618da9578182fd5b8251618db48161a89b565b60208401519092506001600160401b0380821115618dd0578283fd5b9084019060a08287031215618de3578283fd5b618ded60a061a7f8565b825181526020830151618dff8161a89b565b60208201526040830151618e128161a89b565b60408201526060830151618e258161a89b565b6060820152608083015182811115618e3b578485fd5b618e4788828601618942565b6080830152508093505050509250929050565b600080600080600060a08688031215618e71578283fd5b8535618e7c8161a89b565b94506020860135618e8c8161a89b565b93506040860135618e9c8161a89b565b92506060860135618eac8161a89b565b915060808601356001600160401b03811115618ec6578182fd5b618ed288828901618838565b9150509295509295909350565b60008060008060808587031215618ef4578182fd5b8435618eff8161a89b565b93506020850135618f0f8161a89b565b92506040850135618f1f8161a89b565b915060608501356001600160401b03811115618f39578182fd5b618f4587828801618838565b91505092959194509250565b60008060008060808587031215618f66578182fd5b8435618f718161a89b565b93506020850135618f818161a89b565b92506040850135618f918161a89b565b9396929550929360600135925050565b600080600060608486031215618fb5578081fd5b8335618fc08161a89b565b925060208401356001600160401b0380821115618fdb578283fd5b618fe78783880161868e565b93506040860135915080821115618ffc578283fd5b5061900986828701618838565b9150509250925092565b600080600080600060a0868803121561902a578283fd5b85356190358161a89b565b9450602086013593506040860135618e9c8161a89b565b6000602080838503121561905e578182fd5b82516001600160401b03811115619073578283fd5b8301601f81018513619083578283fd5b80516190916186ac8261a81e565b81815283810190838501858402850186018910156190ad578687fd5b8694505b838510156190d85780516190c48161a89b565b8352600194909401939185019185016190b1565b50979650505050505050565b6000806000606084860312156190f8578081fd5b83516001600160401b038082111561910e578283fd5b818601915086601f830112619121578283fd5b815161912f6186ac8261a81e565b80828252602080830192508086018b82838702890101111561914f578788fd5b8796505b84871015619171578051845260019690960195928101928101619153565b508901519097509350505080821115619188578283fd5b5061919586828701618896565b9250506191a58560408601618988565b90509250925092565b600080602083850312156191c0578182fd5b82356001600160401b03808211156191d6578384fd5b818501915085601f8301126191e9578384fd5b8135818111156191f7578485fd5b866020808302850101111561920a578485fd5b60209290920196919550909350505050565b600080600060608486031215619230578081fd5b83356001600160401b0380821115619246578283fd5b61925287838801618705565b94506020860135915080821115619267578283fd5b5061927486828701618705565b925050604084013590509250925092565b600060208284031215619296578081fd5b81356001600160401b038111156192ab578182fd5b61144e8482850161875d565b600080604083850312156192c9578182fd5b82356001600160401b038111156192de578283fd5b6192ea8582860161875d565b9250506020830135618cde8161a89b565b60008060006060848603121561930f578081fd5b83356001600160401b03811115619324578182fd5b6193308682870161875d565b93505060208401356193418161a89b565b91506040840135618d8c8161a89b565b60006020808385031215619363578182fd5b82516001600160401b03811115619378578283fd5b8301601f81018513619388578283fd5b80516193966186ac8261a81e565b81815283810190838501858402850186018910156193b2578687fd5b8694505b838510156190d85780518352600194909401939185019185016193b6565b6000806000606084860312156193e8578081fd5b83356001600160401b03808211156193fe578283fd5b818601915086601f830112619411578283fd5b813561941f6186ac8261a81e565b80828252602080830192508086016101808c838288028a01011115619442578889fd5b8897505b8588101561946e576194588d83618b06565b8552600197909701969382019390810190619446565b50919850890135945050505080821115619486578283fd5b50619493868287016187c4565b9250506191a58560408601618683565b6000602082840312156194b4578081fd5b81516001600160401b038111156194c9578182fd5b61144e84828501618896565b6000602082840312156194e6578081fd5b815161418f8161a8b3565b600060208284031215619502578081fd5b5051919050565b60006020828403121561951a578081fd5b81516001600160401b0381111561952f578182fd5b61144e84828501618942565b60008060006060848603121561954f578081fd5b833561955a8161a89b565b925060208401356001600160401b0380821115619575578283fd5b618fe78783880161875d565b600060208284031215619592578081fd5b815161418f8161a8d7565b600080608083850312156195af578182fd5b82516195ba8161a8d7565b91506195c984602085016189ed565b90509250929050565b60008060008084860360a08112156195e8578283fd5b60408112156195f5578283fd5b50619600604061a7f8565b8535815260208601356196128161a89b565b6020820152935060408501356196278161a89b565b925060608501356196378161a89b565b915060808501356001600160401b03811115618f39578182fd5b60008060008060808587031215619666578182fd5b84356001600160401b038082111561967c578384fd5b908601906040828903121561968f578384fd5b619699604061a7f8565b82356196a48161a89b565b8152602083810135838111156196b8578687fd5b80850194505089601f8501126196cc578586fd5b83356196da6186ac8261a81e565b81815282810190868401895b8481101561970f576196fd8f8784358c010161868e565b845292850192908501906001016196e6565b505080848601525050508197506197288a828b01618683565b965050506197398860408901618683565b9350606087013591508082111561974e578283fd5b50618f4587828801618838565b60008060008060c08587031215619770578182fd5b61977a8686618997565b9350606085013561978a8161a8d7565b9250608085013561979a8161a8d7565b915060a08501356001600160401b03811115618f39578182fd5b60008060008060a085870312156197c9578182fd5b6197d38686618a38565b935060408501356196278161a89b565b6000602082840312156197f4578081fd5b81356001600160401b038082111561980a578283fd5b9083019060a0828603121561981d578283fd5b61982760a061a7f8565b6198318684618683565b8152602083013582811115619844578485fd5b6198508782860161868e565b602083015250604083013582811115619867578485fd5b61987387828601618705565b60408301525060608301358281111561988a578485fd5b6198968782860161868e565b6060830152506080830135828111156198ad578485fd5b6198b987828601618838565b60808301525095945050505050565b600080600080608085870312156198dd578182fd5b84356001600160401b03808211156198f3578384fd5b6198ff88838901618a7b565b9550602087013591506199118261a89b565b9093506040860135906199238261a89b565b9092506060860135908082111561974e578283fd5b6000806000806080858703121561994d578182fd5b84356001600160401b03811115619962578283fd5b61996e87828801618a7b565b9450506020850135618f818161a89b565b60008060008060808587031215619994578182fd5b84356001600160401b038111156199a9578283fd5b6199b587828801618a7b565b9450506020850135925060408501356199cd8161a89b565b91506060850135618d3c8161a89b565b600080600061022084860312156199f2578081fd5b6199fc8585618b06565b9250619a0c856101808601618bf3565b9150610200840135618d8c8161a89b565b60008060008084860360c0811215619a33578283fd5b6060811215619a40578283fd5b50619a4b606061a7f8565b8535619a568161a89b565b8152602086810135908201526040860135619a708161a89b565b604082015293506060850135619a858161a89b565b9250608085013561979a8161a89b565b600080600083850360a0811215619aaa578182fd5b6060811215619ab7578182fd5b50619ac2606061a7f8565b84518152602085015160058110619ad7578283fd5b60208201526040850151619aea8161a8e6565b60408201526060850151909350619b008161a8e6565b6080850151909250618d8c8161a8b3565b600060208284031215619b22578081fd5b815162ffffff8116811461418f578182fd5b60008060408385031215619b46578182fd5b505080516020909101519092909150565b60008060008060808587031215619b6c578182fd5b505082516020840151604085015160609095015191969095509092509050565b600080600080600060a08688031215619ba3578283fd5b5050835160208501516040860151606087015160809097015192989197509594509092509050565b6001600160a01b03169052565b6000815180845260208085019450808401835b83811015619c105781516001600160a01b031687529582019590820190600101619beb565b509495945050505050565b6000815180845260208085019450808401835b83811015619c1057815187529582019590820190600101619c2e565b60008151808452619c6281602086016020860161a86b565b601f01601f19169290920160200192915050565b600081518352602082015160208401526040820151604084015260608201516060840152608082015160a0608085015261144e60a0850182619c4a565b80516001600160a01b031682526020808201516001600160e01b03199081169184019190915260409182015116910152565b80516001600160a01b039081168352602080830151151590840152604080830151909116908301526060908101511515910152565b60008151835260208201516040602085015261144e6040850182619c4a565b600081518352602082015160018060a01b0380821660208601528060408501511660408601528060608501511660608601525050608082015160a0608085015261144e60a0850182619c4a565b619d91828251619bcb565b6020810151619da36020840182619bcb565b506040810151619db66040840182619e88565b506060810151619dc96060840182619e88565b506080810151619ddc6080840182619e88565b5060a0810151619def60a0840182619bcb565b5060c0810151619e0260c0840182619bcb565b5060e0810151619e1560e0840182619bcb565b5061010080820151619e2982850182619bcb565b5050610120818101519083015261014080820151619e4982850182619e95565b505061016090810151910152565b619e61815161a860565b825260ff602082015116602083015260408101516040830152606081015160608301525050565b6001600160801b03169052565b6001600160401b03169052565b6000828483379101908152919050565b60008251619ec481846020870161a86b565b9190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0392831681529116602082015260400190565b6001600160a01b03948516815292841660208401529083166040830152909116606082015260800190565b6001600160a01b0385811682528481166020830152831660408201526080606082018190526000906168be90830184619c1b565b6001600160a01b039485168152928416602084015292166040820152606081019190915260800190565b6001600160a01b039384168152919092166020820152901515604082015260600190565b6001600160a01b0385811682528416602082015282151560408201526080606082018190526000906168be90830184619c4a565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061a05490830184619c4a565b979650505050505050565b6001600160a01b038416815260606020820181905260009061a08390830185619bd8565b82810360408401526168be8185619c1b565b6001600160a01b0385168152600061a0ac8561a860565b60208301526080604083015261a0c56080830185619c1b565b828103606084015261a0548185619c1b565b6001600160a01b0389811682526000906101009061a0f48b61a860565b602085015281604085015261a10b8285018b619c1b565b9150838203606085015261a11f828a619c1b565b9088166080850152905061a1328661a860565b60a084015282810360c084015261a1498186619c1b565b905082810360e084015261a15d8185619c1b565b9b9a5050505050505050505050565b6001600160a01b038316815260406020820181905260009061144e90830184619d39565b60006040825261a1a36040830185619bd8565b82810360208401526114bc8185619c1b565b60006040825261a1c86040830185619bd8565b90508260208301529392505050565b60006040820160408352808551808352606085019150602092506060838202860101838801855b8381101561a22c57605f1988840301855261a21a838351619c4a565b9486019492509085019060010161a1fe565b5050858103848701526181018188619c1b565b60208082528251828201819052600091906040908185019080840286018301878501865b8381101561a2a657888303603f190185528151805187855261a28788860182619c4a565b918901511515948901949094529487019492509086019060010161a263565b509098975050505050505050565b60006020825261418f6020830184619c1b565b901515815260200190565b83151581526001600160a01b03831660208201526060604082018190526000906114bc90830184619c1b565b90815260200190565b60008482526060602083015261a0836060830185619c4a565b60006020825261418f6020830184619c4a565b60006040825261a1c86040830185619c4a565b6001600160a01b03938416815291909216602082015262ffffff909116604082015260600190565b6001600160a01b038316815260406020820181905260009061144e90830184619c1b565b6060810161a39f8561a860565b8252602082019390935260400152919050565b606081016008851061a3c057fe5b938152602081019290925260409091015290565b600060e082016002871061a3e457fe5b868352602060e08185015281875180845261010093508386019150838382028701019350828901855b8281101561a43b5760ff1988870301845261a429868351619c76565b9550928401929084019060010161a40d565b5050505050828103604084015261a4528186619bd8565b9150506114bc6060830184619ce5565b600f93840b81529190920b6020820152604081019190915260600190565b600f83900b81526080810161418f6020830184619cb3565b60208082526024908201527f556e6973776170563353616d706c65722f746f6b656e5061746820746f6f20736040820152631a1bdc9d60e21b606082015260800190565b60208082526025908201527f455243323042726964676553616d706c65722f494e56414c49445f544f4b454e6040820152642fa820a4a960d91b606082015260800190565b60208082526025908201527f556e6973776170563353616d706c65722f696e76616c69642070617468206c656040820152646e6774687360d81b606082015260800190565b6020808252601e908201527f4b79626572444d4d53616d706c65722f4e4f5f504f4f4c535f464f554e440000604082015260600190565b600061a5a98287619cb3565b84600f0b606083015283600f0b608083015260c060a08301526168be60c0830184619c1b565b60006060825261a5e26060830186619d1a565b828103602084015261a5f48186619d1a565b915050826040830152949350505050565b60006080825261a6186080830187619d39565b6001600160a01b0395861660208401529390941660408201526060015292915050565b60006080825261a64e6080830187619d39565b6020830195909552506001600160a01b0392831660408201529116606090910152919050565b610200810161a6838285619d86565b61418f610180830184619e57565b610220810161a6a08286619d86565b61a6ae610180830185619e57565b6001600160a01b0392909216610200919091015292915050565b60008382526040602083015261144e6040830184619bd8565b60008482526060602083015261a6fa6060830185619bd8565b82810360408401526168be8185619bd8565b6000858252602060808184015261a7266080840187619bd8565b838103604085015285518082528282019083810283018401848901865b8381101561a77157601f1986840301855261a75f838351619c4a565b9487019492509086019060010161a743565b5050868103606088015261a15d8189619bd8565b958652602086019490945260408501929092526060840152608083015260a082015260c00190565b6000808335601e1984360301811261a7c3578283fd5b8301803591506001600160401b0382111561a7dc578283fd5b60200191503681900382131561a7f157600080fd5b9250929050565b6040518181016001600160401b038111828210171561a81657600080fd5b604052919050565b60006001600160401b0382111561a833578081fd5b5060209081020190565b60006001600160401b0382111561a852578081fd5b50601f01601f191660200190565b8060048110610dff57fe5b60005b8381101561a88657818101518382015260200161a86e565b8381111561a895576000848401525b50505050565b6001600160a01b038116811461a8b057600080fd5b50565b801515811461a8b057600080fd5b6001600160e01b03198116811461a8b057600080fd5b80600f0b811461a8b057600080fd5b6001600160801b038116811461a8b057600080fdfea264697066735822122078892e17feac3ea4a75d763aba88da2e5e9baaa8097b35d3c5533fa2c9d3dd8464736f6c634300060c0033';
ERC20BridgeSamplerContract.contractName = 'ERC20BridgeSampler';
// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
//# sourceMappingURL=erc20_bridge_sampler.js.map