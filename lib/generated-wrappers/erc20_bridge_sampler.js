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
ERC20BridgeSamplerContract.deployedBytecode = '0x608060405234801561001057600080fd5b50600436106103425760003560e01c80638b6d7b44116101b8578063bd71ecf611610104578063ddd5aa28116100a2578063f1ed7fa41161007c578063f1ed7fa4146107ad578063f3868e9c1461048d578063f5a4994d146107c0578063fc9fe41b146107d357610342565b8063ddd5aa2814610774578063e78ac04514610787578063e8e4af091461079a57610342565b8063c8c74a37116100de578063c8c74a3714610728578063c94706d81461073b578063cc1621c91461074e578063d9bca3721461076157610342565b8063bd71ecf6146106ef578063c25c413814610702578063c83190841461071557610342565b80639ea0ff1311610171578063a75e744b1161014b578063a75e744b14610695578063ab000276146106a8578063adc636bf146106bb578063b90cd2fb146106dc57610342565b80639ea0ff131461065c578063a0295b8b1461066f578063a46984171461068257610342565b80638b6d7b44146105bf5780638e5a0e07146105d25780639209483b146105f457806398777748146106075780639bf3ee351461061a5780639e3f05c31461063a57610342565b806336052391116102925780635aae4e531161023057806368be3cf21161020a57806368be3cf214610566578063706e2f9b1461058657806374c9d255146105995780637f7f4f13146105ac57610342565b80635aae4e531461052d5780635d5b674f1461054057806366a1ac6b1461055357610342565b8063494569db1161026c578063494569db146104c65780634edfb5b2146104d95780635505000a146104f957806357494b1d1461051a57610342565b8063360523911461048d5780633c883dba146104a057806340bc03ae146104b357610342565b8063252322b3116102ff5780632aa64319116102d95780632aa64319146104325780632d753aa41461045457806330d6570d146104675780633105fec11461047a57610342565b8063252322b3146103f9578063281e34321461040c57806329fa4aa01461041f57610342565b806301cb0ef7146103475780630496d5dc146103705780631022742b14610391578063149dab0e146103a457806316279055146103c65780632339078f146103e6575b600080fd5b61035a6103553660046197f4565b6107e6565b604051610367919061a287565b60405180910390f35b61038361037e366004618fac565b61097c565b60405161036792919061a163565b61035a61039f3660046193e1565b610b22565b6103b76103b2366004619662565b610c95565b6040516103679392919061a02f565b6103d96103d4366004618c8e565b610df5565b604051610367919061a29a565b61035a6103f43660046195e3565b610dff565b61035a610407366004618eea565b611026565b61035a61041a366004619a2e565b6111fc565b61035a61042d36600461976c565b611451565b6104456104403660046197c5565b6114c0565b6040516103679392919061a2a5565b61035a610462366004618e65565b61179d565b61035a610475366004618eea565b611926565b61035a610488366004618fac565b611a9a565b61035a61049b3660046197c5565b611c1e565b61035a6104ae3660046197f4565b611cb0565b61035a6104c136600461976c565b611e3a565b6103836104d4366004618fac565b611fbb565b6104ec6104e7366004619990565b612147565b604051610367919061a2f3565b61050c61050736600461954c565b6123c4565b60405161036792919061a1aa565b61035a610528366004618eea565b61260f565b61050c61053b36600461954c565b612b86565b61035a61054e366004618eea565b612dcb565b61035a6105613660046193e1565b612e31565b6105796105743660046191b0565b612ee6565b604051610367919061a212565b61035a610594366004619287565b613047565b6103b76105a7366004619662565b613139565b61035a6105ba366004619a2e565b613148565b61035a6105cd36600461976c565b613395565b6105e56105e036600461921e565b6136f8565b6040516103679392919061a5c2565b61035a61060236600461976c565b613911565b61035a610615366004618eea565b613b11565b61062d6106283660046199ee565b61404a565b604051610367919061a2d1565b61064d6106483660046198d9565b614191565b6040516103679392919061a2da565b61062d61066a366004618f5c565b6142b7565b61035a61067d3660046195e3565b6144cd565b61035a610690366004618eea565b6146c9565b6104456106a336600461901e565b61481e565b61035a6106b6366004618eea565b61495b565b6106ce6106c9366004618eea565b614ab9565b60405161036792919061a341565b61035a6106ea366004618eea565b614c09565b61035a6106fd3660046192b9565b614c6f565b61035a610710366004618eea565b614d6b565b61035a610723366004618eea565b614dd1565b61035a610736366004618fac565b614f8e565b61035a610749366004618eea565b6150fa565b61064d61075c3660046198d9565b615258565b61044561076f36600461901e565b61543e565b6104456107823660046197c5565b61552d565b61035a6107953660046192fd565b6157c0565b61035a6107a8366004618eea565b6158b5565b61062d6107bb366004619949565b6159e8565b6106ce6107ce366004618eea565b615b87565b6105e56107e136600461921e565b615c73565b608081015151606090806001600160401b038111801561080557600080fd5b5060405190808252806020026020018201604052801561082f578160200160208202803683370190505b50915060005b818110156109755783600001516001600160a01b031663846ee14b8560800151838151811061086057fe5b60200260200101518660200151876040015188606001516040518563ffffffff1660e01b8152600401610896949392919061a6ff565b60006040518083038186803b1580156108ae57600080fd5b505afa9250505080156108e357506040513d6000823e601f3d908101601f191682016040526108e091908101906194b0565b60015b61091d573d808015610911576040519150601f19603f3d011682016040523d82523d6000602084013e610916565b606091505b5050610975565b8060008151811061092a57fe5b602002602001015184838151811061093e57fe5b60200260200101818152505083828151811061095657fe5b60200260200101516000141561096c5750610975565b50600101610835565b5050919050565b80516060908190806001600160401b038111801561099957600080fd5b506040519080825280602002602001820160405280156109c3578160200160208202803683370190505b5091506109d08686615e88565b92508251600014156109e25750610b1a565b60005b81811015610b1757866001600160a01b031663a8312b1d620249f0878481518110610a0c57fe5b6020026020010151878a6040518563ffffffff1660e01b8152600401610a349392919061a6d4565b60006040518083038187803b158015610a4c57600080fd5b5086fa93505050508015610a8257506040513d6000823e601f3d908101601f19168201604052610a7f91908101906194b0565b60015b610abc573d808015610ab0576040519150601f19603f3d011682016040523d82523d6000602084013e610ab5565b606091505b5050610b17565b80600188510381518110610acc57fe5b6020026020010151848381518110610ae057fe5b602002602001018181525050838281518110610af857fe5b602002602001015160001415610b0e5750610b17565b506001016109e5565b50505b935093915050565b606083516001600160401b0381118015610b3b57600080fd5b50604051908082528060200260200182016040528015610b65578160200160208202803683370190505b50905060005b84518114610c8d57306001600160a01b0316639bf3ee3562030d40878481518110610b9257fe5b6020026020010151878581518110610ba657fe5b6020026020010151876040518563ffffffff1660e01b8152600401610bcd9392919061a684565b60206040518083038187803b158015610be557600080fd5b5086fa93505050508015610c16575060408051601f3d908101601f19168201909252610c1391810190619502565b60015b610c6a573d808015610c44576040519150601f19603f3d011682016040523d82523d6000602084013e610c49565b606091505b506000838381518110610c5857fe5b60200260200101818152505050610c85565b80838381518110610c7757fe5b602002602001018181525050505b600101610b6b565b509392505050565b600060608086602001515160001415610cad57610deb565b610cb987878787616177565b855191945092506001600160401b0381118015610cd557600080fd5b50604051908082528060200260200182016040528015610cff578160200160208202803683370190505b50905060005b8151811015610de957836001600160a01b0316637f9c0ecd620493e085888581518110610d2e57fe5b60200260200101516040518463ffffffff1660e01b8152600401610d5392919061a188565b60206040518083038187803b158015610d6b57600080fd5b5086fa93505050508015610d9c575060408051601f3d908101601f19168201909252610d9991810190619502565b60015b610da557610de9565b80838381518110610db257fe5b602002602001018181525050828281518110610dca57fe5b602002602001015160001415610de05750610de9565b50600101610d05565b505b9450945094915050565b803b15155b919050565b6060610e0b83856163a9565b602085015160408051600280825260608281019093528160200160208202803683370190505090508581600081518110610e4157fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508481600181518110610e6f57fe5b6001600160a01b03909216602092830291909101909101528351806001600160401b0381118015610e9f57600080fd5b50604051908082528060200260200182016040528015610ec9578160200160208202803683370190505b509350610ed461851a565b610edc6163df565b905060005b82811015611019576060610f088b898481518110610efb57fe5b602002602001015161640e565b604051637c26833760e11b81529091506001600160a01b0387169063f84d066e90610f3e9060009085908a90899060040161a394565b600060405180830381600087803b158015610f5857600080fd5b505af1925050508015610f8d57506040513d6000823e601f3d908101601f19168201604052610f8a919081019061935e565b60015b610fc8573d808015610fbb576040519150601f19603f3d011682016040523d82523d6000602084013e610fc0565b606091505b505050611019565b600081600181518110610fd757fe5b602002602001015160001902905060008113610ff557505050611019565b8089858151811061100257fe5b602002602001018181525050505050600101610ee1565b5050505050949350505050565b606061103283856163a9565b8151806001600160401b038111801561104a57600080fd5b50604051908082528060200260200182016040528015611074578160200160208202803683370190505b50915060006001600160a01b038616156110975761109287876164a0565b61109a565b60005b905060006001600160a01b038616156110bc576110b788876164a0565b6110bf565b60005b905060005b838110156111f05760016001600160a01b0388166111225761110184632640f62c60e01b8985815181106110f457fe5b602002602001015161651f565b87848151811061110d57fe5b602002602001018193508281525050506111bc565b6001600160a01b03891661114857611101836359e9486260e01b8985815181106110f457fe5b6000611162846359e9486260e01b8a86815181106110f457fe5b92509050801561119f5761117e856309903d8b60e21b8361651f565b88858151811061118a57fe5b602002602001018194508281525050506111ba565b60008784815181106111ad57fe5b6020026020010181815250505b505b8015806111dc57508582815181106111d057fe5b60200260200101516000145b156111e757506111f0565b506001016110c4565b50505050949350505050565b606061120883856163a9565b6000856000015190506000816001600160a01b03166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b15801561124c57600080fd5b505afa158015611260573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112849190618caa565b8451909150806001600160401b038111801561129f57600080fd5b506040519080825280602002602001820160405280156112c9578160200160208202803683370190505b509350826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b15801561130557600080fd5b505afa158015611319573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061133d9190618caa565b6001600160a01b0316866001600160a01b0316141580156113e05750826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b15801561139257600080fd5b505afa1580156113a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113ca9190618caa565b6001600160a01b0316876001600160a01b031614155b156113ed57505050611449565b60005b818110156111f057600061141b8a898b8a868151811061140c57fe5b60200260200101518989616602565b90508061142857506111f0565b8086838151811061143557fe5b6020908102919091010152506001016113f0565b949350505050565b6040805160608181019092526114b7908061147086896080840161a473565b6040516020818303038152906040528152602001868860405160200161149792919061a473565b60405160208183030381529060405281526020016168c3815250836169f6565b95945050505050565b60008060606114cf85876163a9565b8351806001600160401b03811180156114e757600080fd5b50604051908082528060200260200182016040528015611511578160200160208202803683370190505b508851604051630939d86360e11b81529193506001600160a01b031690631273b0c690611544908a908a90600401619ecb565b60206040518083038186803b15801561155c57600080fd5b505afa158015611570573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115949190618caa565b925060006001600160a01b038416156115b257506001935086611651565b8851604051630939d86360e11b81526001600160a01b0390911690631273b0c6906115e3908a908c90600401619ecb565b60206040518083038186803b1580156115fb57600080fd5b505afa15801561160f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116339190618caa565b93506001600160a01b03841661164a575050610deb565b5060009350855b836001600160a01b031663dd58b41c6040518163ffffffff1660e01b815260040160206040518083038186803b15801561168a57600080fd5b505afa15801561169e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116c291906194e2565b6116cd575050610deb565b60005b8281101561179057600061174a8a87858e602001516040516020016116f89493929190619ee5565b6040516020818303038152906040528a88868f602001516040516020016117229493929190619ee5565b6040516020818303038152906040528a858151811061173d57fe5b6020026020010151616bf3565b90508085838151811061175957fe5b60200260200101818152505084828151811061177157fe5b6020026020010151600014156117875750611790565b506001016116d0565b5050509450945094915050565b8051606090806001600160401b03811180156117b857600080fd5b506040519080825280602002602001820160405280156117e2578160200160208202803683370190505b5091506001600160a01b0387166117f957506114b7565b60005b8181101561191b5760006060896001600160a01b031662061a80636e79e13360e01b8b8b8b8b898151811061182d57fe5b60200260200101516040516024016118489493929190619f44565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516118869190619e82565b6000604051808303818686fa925050503d80600081146118c2576040519150601f19603f3d011682016040523d82523d6000602084013e6118c7565b606091505b5091509150600082156118eb57818060200190518101906118e89190619502565b90505b806118f85750505061191b565b8086858151811061190557fe5b60209081029190910101525050506001016117fc565b505095945050505050565b606061193283856163a9565b8151806001600160401b038111801561194a57600080fd5b50604051908082528060200260200182016040528015611974578160200160208202803683370190505b50915060005b81811015611a9057866001600160a01b03166372ea9076620c350088888886815181106119a357fe5b60200260200101516040518563ffffffff1660e01b81526004016119c993929190619fc6565b60206040518083038187803b1580156119e157600080fd5b5086fa93505050508015611a12575060408051601f3d908101601f19168201909252611a0f91810190619502565b60015b611a4c573d808015611a40576040519150601f19603f3d011682016040523d82523d6000602084013e611a45565b606091505b5050611a90565b80848381518110611a5957fe5b602002602001018181525050838281518110611a7157fe5b602002602001015160001415611a875750611a90565b5060010161197a565b5050949350505050565b8051606090806001600160401b0381118015611ab557600080fd5b50604051908082528060200260200182016040528015611adf578160200160208202803683370190505b50915060005b81811015611c1557856001600160a01b031663d06ca61f620249f0868481518110611b0c57fe5b6020026020010151886040518463ffffffff1660e01b8152600401611b3292919061a6bb565b60006040518083038187803b158015611b4a57600080fd5b5086fa93505050508015611b8057506040513d6000823e601f3d908101601f19168201604052611b7d91908101906194b0565b60015b611bba573d808015611bae576040519150601f19603f3d011682016040523d82523d6000602084013e611bb3565b606091505b5050611c15565b80600187510381518110611bca57fe5b6020026020010151848381518110611bde57fe5b602002602001018181525050838281518110611bf657fe5b602002602001015160001415611c0c5750611c15565b50600101611ae5565b50509392505050565b6060611c2a83856163a9565b84602001516001600160a01b0316846001600160a01b0316141580611c5c575084516001600160a01b03848116911614155b15610c8d5781516060816001600160401b0381118015611c7b57600080fd5b50604051908082528060200260200182016040528015611ca5578160200160208202803683370190505b509250611449915050565b608081015151606090806001600160401b0381118015611ccf57600080fd5b50604051908082528060200260200182016040528015611cf9578160200160208202803683370190505b50915060005b818110156109755783600001516001600160a01b0316633bbc8a1e85608001518381518110611d2a57fe5b60200260200101518660200151876040015188606001516040518563ffffffff1660e01b8152600401611d60949392919061a6ff565b60006040518083038186803b158015611d7857600080fd5b505afa925050508015611dad57506040513d6000823e601f3d908101601f19168201604052611daa91908101906194b0565b60015b611ddb573d808015610911576040519150601f19603f3d011682016040523d82523d6000602084013e610916565b8060018660200151510381518110611def57fe5b6020026020010151848381518110611e0357fe5b602002602001018181525050838281518110611e1b57fe5b602002602001015160001415611e315750610975565b50600101611cff565b8051606090806001600160401b0381118015611e5557600080fd5b50604051908082528060200260200182016040528015611e7f578160200160208202803683370190505b50915060005b81811015611a90576000606088600001516001600160a01b0316621e84808a602001518a8a8a8881518110611eb657fe5b6020026020010151604051602401611ed09392919061a455565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051611f0e9190619e82565b6000604051808303818686fa925050503d8060008114611f4a576040519150601f19603f3d011682016040523d82523d6000602084013e611f4f565b606091505b509150915060008215611f735781806020019051810190611f709190619502565b90505b80868581518110611f8057fe5b602002602001018181525050858481518110611f9857fe5b602002602001015160001415611fb057505050611a90565b505050600101611e85565b80516060908190806001600160401b0381118015611fd857600080fd5b50604051908082528060200260200182016040528015612002578160200160208202803683370190505b50915061200f8686615e88565b92508251600014156120215750610b1a565b60005b81811015610b1757866001600160a01b0316639e269b68620249f087848151811061204b57fe5b6020026020010151878a6040518563ffffffff1660e01b81526004016120739392919061a6d4565b60006040518083038187803b15801561208b57600080fd5b5086fa935050505080156120c157506040513d6000823e601f3d908101601f191682016040526120be91908101906194b0565b60015b6120ef573d808015610ab0576040519150601f19603f3d011682016040523d82523d6000602084013e610ab5565b806000815181106120fc57fe5b602002602001015184838151811061211057fe5b60200260200101818152505083828151811061212857fe5b60200260200101516000141561213e5750610b17565b50600101612024565b6020848101516040805160018082528183019092526060938492908281019080368337019050509050858160008151811061217e57fe5b6020908102919091010152606060006040519080825280602002602001820160405280156121b6578160200160208202803683370190505b50905087606001516001600160a01b0316866001600160a01b031614156122a7576040516381efcbdd60e01b81526001600160a01b038416906381efcbdd906207a1209061220f9089906001908890889060040161a065565b60006040518083038187803b15801561222757600080fd5b5086fa9350505050801561225d57506040513d6000823e601f3d908101601f1916820160405261225a919081019061951a565b60015b612297573d80801561228b576040519150601f19603f3d011682016040523d82523d6000602084013e612290565b606091505b50506122a2565b935061144992505050565b6123b9565b87606001516001600160a01b0316856001600160a01b031614156122fd576040516361e597f960e01b81526001600160a01b038416906361e597f9906207a1209061220f908a906001908890889060040161a065565b6040516302b9a6cd60e11b81526001600160a01b038416906305734d9a906207a1209061233d908a90600190889088908d9084908490849060040161a0a8565b60006040518083038187803b15801561235557600080fd5b5086fa9350505050801561238b57506040513d6000823e601f3d908101601f19168201604052612388919081019061951a565b60015b612297573d808015611019576040519150601f19603f3d011682016040523d82523d6000602084013e611019565b505050949350505050565b6060806060612445866001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b15801561240557600080fd5b505afa158015612419573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061243d9190618caa565b866000616d2c565b905083516001600160401b038111801561245e57600080fd5b50604051908082528060200260200182016040528015612488578160200160208202803683370190505b50915083516001600160401b03811180156124a257600080fd5b506040519080825280602002602001820160405280156124d657816020015b60608152602001906001900390816124c15790505b50925060005b8451811015610b175760606000805b84518110156125c75760606125138a87848151811061250657fe5b60200260200101516171c2565b90508a6001600160a01b031663cdca1753620493e0838c898151811061253557fe5b60200260200101516040518463ffffffff1660e01b815260040161255a92919061a306565b602060405180830381600088803b15801561257457600080fd5b5087f1935050505080156125a5575060408051601f3d908101601f191682019092526125a291810190619502565b60015b6125ae576125be565b8084116125bc578093508194505b505b506001016124eb565b50806125d4575050610b17565b808584815181106125e157fe5b602002602001018181525050818684815181106125fa57fe5b602090810291909101015250506001016124dc565b80516060908590806001600160401b038111801561262c57600080fd5b50604051908082528060200260200182016040528015612656578160200160208202803683370190505b50604051630bcded8960e21b81529093506001600160a01b03831690632f37b62490612686908990600401619e9e565b60206040518083038186803b15801561269e57600080fd5b505afa1580156126b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126d691906194e2565b158061275b5750604051630bcded8960e21b81526001600160a01b03831690632f37b62490612709908890600401619e9e565b60206040518083038186803b15801561272157600080fd5b505afa158015612735573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061275991906194e2565b155b15612767575050611449565b61276f618541565b60405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f9061279b908a90600401619e9e565b60206040518083038186803b1580156127b357600080fd5b505afa1580156127c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127eb9190619502565b815260405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f90612819908990600401619e9e565b60206040518083038186803b15801561283157600080fd5b505afa158015612845573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128699190619502565b6020820152604051634a46c67360e11b81526001600160a01b0384169063948d8ce69061289a908a90600401619e9e565b60206040518083038186803b1580156128b257600080fd5b505afa1580156128c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128ea9190619502565b60408083019190915251634a46c67360e11b81526001600160a01b0384169063948d8ce69061291d908990600401619e9e565b60206040518083038186803b15801561293557600080fd5b505afa158015612949573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061296d9190619502565b816060018181525050826001600160a01b031663d4cadf686040518163ffffffff1660e01b815260040160206040518083038186803b1580156129af57600080fd5b505afa1580156129c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129e79190619502565b608082015260005b828110156111f057612a1a82602001516003670de0b6b3a764000081612a1157fe5b0460010161731d565b868281518110612a2657fe5b60200260200101511115612a39576111f0565b836001600160a01b031663f8d6aed4620493e084600001518560400151866020015187606001518c8881518110612a6c57fe5b602002602001015189608001516040518863ffffffff1660e01b8152600401612a9a9695949392919061a778565b60206040518083038187803b158015612ab257600080fd5b5086fa93505050508015612ae3575060408051601f3d908101601f19168201909252612ae091810190619502565b60015b612b1d573d808015612b11576040519150601f19603f3d011682016040523d82523d6000602084013e612b16565b606091505b50506111f0565b8251612b35906002670de0b6b3a76400005b0461731d565b811115612b4257506111f0565b80868381518110612b4f57fe5b602002602001018181525050858281518110612b6757fe5b602002602001015160001415612b7d57506111f0565b506001016129ef565b6060806060612bc7866001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b15801561240557600080fd5b90506060612bd48661737a565b905084516001600160401b0381118015612bed57600080fd5b50604051908082528060200260200182016040528015612c17578160200160208202803683370190505b50925084516001600160401b0381118015612c3157600080fd5b50604051908082528060200260200182016040528015612c6557816020015b6060815260200190600190039081612c505790505b50935060005b8551811015612dc05760606000805b8551811015612d78576060612caa86612ca5898581518110612c9857fe5b6020026020010151617412565b6171c2565b90508b6001600160a01b0316632f80bb1d620493e0838d8981518110612ccc57fe5b60200260200101516040518463ffffffff1660e01b8152600401612cf192919061a306565b602060405180830381600088803b158015612d0b57600080fd5b5087f193505050508015612d3c575060408051601f3d908101601f19168201909252612d3991810190619502565b60015b612d4557612d6f565b831580612d525750808410155b15612d6d57809350612d6a8c89858151811061250657fe5b94505b505b50600101612c7a565b5080612d85575050612dc0565b80868481518110612d9257fe5b60200260200101818152505081878481518110612dab57fe5b60209081029190910101525050600101612c6b565b505050935093915050565b6040805160608181019092526114b79080612dea868960808401619ecb565b60405160208183030381529060405281526020018688604051602001612e11929190619ecb565b60405160208183030381529060405281526020016174aa815250836169f6565b6060612e3e848484610b22565b905060005b8451811015610c8d57818181518110612e5857fe5b6020026020010151600014612ede57612ec5828281518110612e7657fe5b6020026020010151868381518110612e8a57fe5b6020026020010151606001516001600160801b0316878481518110612eab57fe5b6020026020010151604001516001600160801b03166175be565b828281518110612ed157fe5b6020026020010181815250505b600101612e43565b6060816001600160401b0381118015612efe57600080fd5b50604051908082528060200260200182016040528015612f3857816020015b612f25618570565b815260200190600190039081612f1d5790505b50905060005b808314613040576001828281518110612f5357fe5b602090810291909101810151911515910152838382818110612f7157fe5b9050602002810190612f83919061a7a0565b15159050612f9057613038565b30848483818110612f9d57fe5b9050602002810190612faf919061a7a0565b604051612fbd929190619e72565b6000604051808303816000865af19150503d8060008114612ffa576040519150601f19603f3d011682016040523d82523d6000602084013e612fff565b606091505b5083838151811061300c57fe5b602002602001015160200184848151811061302357fe5b60209081029190910101519190915290151590525b600101612f3e565b5092915050565b606081516001600160401b038111801561306057600080fd5b5060405190808252806020026020018201604052801561308a578160200160208202803683370190505b50905060005b82518114613133577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168382815181106130ce57fe5b60200260200101516001600160a01b03161461310e576131098382815181106130f357fe5b60200260200101516001600160a01b03166175e2565b613111565b60125b60ff1682828151811061312057fe5b6020908102919091010152600101613090565b50919050565b60006060809450945094915050565b606061315483856163a9565b6000856000015190506000816001600160a01b03166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b15801561319857600080fd5b505afa1580156131ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131d09190618caa565b8451909150806001600160401b03811180156131eb57600080fd5b50604051908082528060200260200182016040528015613215578160200160208202803683370190505b509350826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b15801561325157600080fd5b505afa158015613265573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906132899190618caa565b6001600160a01b0316866001600160a01b03161415801561332c5750826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b1580156132de57600080fd5b505afa1580156132f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906133169190618caa565b6001600160a01b0316876001600160a01b031614155b1561333957505050611449565b60005b818110156111f05760006133678a898b8a868151811061335857fe5b60200260200101518989617684565b90508061337457506111f0565b8086838151811061338157fe5b60209081029190910101525060010161333c565b6060600085600001516001600160a01b031663bbd7f25585600f0b6040518263ffffffff1660e01b81526004016133cc919061a2d1565b60206040518083038186803b1580156133e457600080fd5b505afa1580156133f8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061341c9190619502565b8651604051631e01043960e01b81526001600160a01b0390911690631e0104399061344f90600f89900b9060040161a2d1565b60206040518083038186803b15801561346757600080fd5b505afa15801561347b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061349f9190619502565b039050600086600001516001600160a01b031663c582951486600f0b6040518263ffffffff1660e01b81526004016134d7919061a2d1565b60806040518083038186803b1580156134ef57600080fd5b505afa158015613503573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906135279190619b66565b935050505080601203600a0a828161353b57fe5b85519190049250806001600160401b038111801561355857600080fd5b50604051908082528060200260200182016040528015613582578160200160208202803683370190505b50935060005b818110156111f057600060608a600001516001600160a01b0316620927c08c602001518c8c8c88815181106135b957fe5b60200260200101516040516024016135d39392919061a455565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516136119190619e82565b6000604051808303818686fa925050503d806000811461364d576040519150601f19603f3d011682016040523d82523d6000602084013e613652565b606091505b50915091506000821561367657818060200190518101906136739190619502565b90505b8681106136b057835b858110156136a7578789828151811061369457fe5b602090810291909101015260010161367f565b505050506111f0565b808885815181106136bd57fe5b6020026020010181815250508784815181106136d557fe5b6020026020010151600014156136ed575050506111f0565b505050600101613588565b613700618588565b613708618588565b600080805b8751811461380d57613754602089838151811061372657fe5b60200260200101515103878a848151811061373d57fe5b60200260200101516179169092919063ffffffff16565b60006060306001600160a01b03168a848151811061376e57fe5b60200260200101516040516137839190619e82565b6000604051808303816000865af19150503d80600081146137c0576040519150601f19603f3d011682016040523d82523d6000602084013e6137c5565b606091505b509150915081156138035760006137e960208351038361792690919063ffffffff16565b90508481111561380157838852602088018290529350835b505b505060010161370d565b50806138195750613908565b60005b865181146139055761384c602088838151811061383557fe5b602002602001015151038389848151811061373d57fe5b60006060306001600160a01b031689848151811061386657fe5b602002602001015160405161387b9190619e82565b6000604051808303816000865af19150503d80600081146138b8576040519150601f19603f3d011682016040523d82523d6000602084013e6138bd565b606091505b509150915081156138fb5760006138e160208351038361792690919063ffffffff16565b9050858111156138f957838752602087018290529450845b505b505060010161381c565b50505b93509350939050565b60408401516060906001600160e01b03191661399357604080516060810190915261398c908061394586896080840161a473565b6040516020818303038152906040528152602001868860405160200161396c92919061a473565b6040516020818303038152906040528152602001617932815250836169f6565b9050611449565b8151806001600160401b03811180156139ab57600080fd5b506040519080825280602002602001820160405280156139d5578160200160208202803683370190505b50915060005b81811015611a90576000606088600001516001600160a01b0316621e84808a604001518a8a8a8881518110613a0c57fe5b6020026020010151604051602401613a269392919061a455565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613a649190619e82565b6000604051808303818686fa925050503d8060008114613aa0576040519150601f19603f3d011682016040523d82523d6000602084013e613aa5565b606091505b509150915060008215613ac95781806020019051810190613ac69190619502565b90505b80868581518110613ad657fe5b602002602001018181525050858481518110613aee57fe5b602002602001015160001415613b0657505050611a90565b5050506001016139db565b80516060908590806001600160401b0381118015613b2e57600080fd5b50604051908082528060200260200182016040528015613b58578160200160208202803683370190505b50604051630bcded8960e21b81529093506001600160a01b03831690632f37b62490613b88908990600401619e9e565b60206040518083038186803b158015613ba057600080fd5b505afa158015613bb4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613bd891906194e2565b1580613c5d5750604051630bcded8960e21b81526001600160a01b03831690632f37b62490613c0b908890600401619e9e565b60206040518083038186803b158015613c2357600080fd5b505afa158015613c37573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613c5b91906194e2565b155b15613c69575050611449565b613c71618541565b60405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f90613c9d908a90600401619e9e565b60206040518083038186803b158015613cb557600080fd5b505afa158015613cc9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613ced9190619502565b815260405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f90613d1b908990600401619e9e565b60206040518083038186803b158015613d3357600080fd5b505afa158015613d47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613d6b9190619502565b6020820152604051634a46c67360e11b81526001600160a01b0384169063948d8ce690613d9c908a90600401619e9e565b60206040518083038186803b158015613db457600080fd5b505afa158015613dc8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613dec9190619502565b60408083019190915251634a46c67360e11b81526001600160a01b0384169063948d8ce690613e1f908990600401619e9e565b60206040518083038186803b158015613e3757600080fd5b505afa158015613e4b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613e6f9190619502565b816060018181525050826001600160a01b031663d4cadf686040518163ffffffff1660e01b815260040160206040518083038186803b158015613eb157600080fd5b505afa158015613ec5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613ee99190619502565b608082015260005b828110156111f0578151613f0f906002670de0b6b3a7640000612b2f565b868281518110613f1b57fe5b60200260200101511115613f2e576111f0565b836001600160a01b031663ba9530a6620493e084600001518560400151866020015187606001518c8881518110613f6157fe5b602002602001015189608001516040518863ffffffff1660e01b8152600401613f8f9695949392919061a778565b60206040518083038187803b158015613fa757600080fd5b5086fa93505050508015613fd8575060408051601f3d908101601f19168201909252613fd591810190619502565b60015b614006573d808015612b11576040519150601f19603f3d011682016040523d82523d6000602084013e612b16565b8086838151811061401357fe5b60200260200101818152505085828151811061402b57fe5b60200260200101516000141561404157506111f0565b50600101613ef1565b6000808351600381111561405a57fe5b1480614072575060018351600381111561407057fe5b145b80614088575060408401516001600160801b0316155b8061409e575060608401516001600160801b0316155b156140ab5750600061418a565b6140b36185a2565b600080846001600160a01b0316631fb0979588886040518363ffffffff1660e01b81526004016140e492919061a667565b60a06040518083038186803b1580156140fc57600080fd5b505afa158015614110573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906141349190619aa6565b9194509250905060018360200151600481111561414d57fe5b141580614158575080155b8061416b575086516001600160a01b0316155b1561417c576000935050505061418a565b506001600160801b03169150505b9392505050565b60006060806141a085876163a9565b6141ab878787617986565b9250826141b757610deb565b60405163276fdad960e11b81523090634edfb5b2906141e0908a9087908b908b9060040161a62e565b60006040518083038186803b1580156141f857600080fd5b505afa15801561420c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052614234919081019061951a565b8760800181905250866080015191506142ab6040518060600160405280878a60405160200161426492919061a13f565b6040516020818303038152906040528152602001888a60405160200161428b92919061a13f565b6040516020818303038152906040528152602001617aed815250856169f6565b90509450945094915050565b600080856001600160a01b031663901754d786866040518363ffffffff1660e01b81526004016142e8929190619ecb565b60206040518083038186803b15801561430057600080fd5b505afa158015614314573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906143389190618caa565b90506001600160a01b038116614352576000915050611449565b60006001600160a01b038616156143e4576040516370a0823160e01b81526001600160a01b038716906370a082319061438f908590600401619e9e565b60206040518083038186803b1580156143a757600080fd5b505afa1580156143bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906143df9190619502565b6143f0565b816001600160a01b0316315b90508381101561440557600092505050611449565b6040516303c2803f60e31b81526001600160a01b03831690631e1401f890620249f09061443a908a908a908a90600401619fc6565b60206040518083038187803b15801561445257600080fd5b5086fa93505050508015614483575060408051601f3d908101601f1916820190925261448091810190619502565b60015b6144c3573d8080156144b1576040519150601f19603f3d011682016040523d82523d6000602084013e6144b6565b606091505b5060009350505050611449565b9250611449915050565b60606144d983856163a9565b60208501516040805160028082526060828101909352816020016020820280368337019050509050858160008151811061450f57fe5b60200260200101906001600160a01b031690816001600160a01b031681525050848160018151811061453d57fe5b6001600160a01b03909216602092830291909101909101528351806001600160401b038111801561456d57600080fd5b50604051908082528060200260200182016040528015614597578160200160208202803683370190505b5093506145a261851a565b6145aa6163df565b905060005b828110156110195760606145c98b898481518110610efb57fe5b604051637c26833760e11b81529091506001600160a01b0387169063f84d066e906145ff9060019085908a90899060040161a394565b600060405180830381600087803b15801561461957600080fd5b505af192505050801561464e57506040513d6000823e601f3d908101601f1916820160405261464b919081019061935e565b60015b61467c573d808015610fbb576040519150601f19603f3d011682016040523d82523d6000602084013e610fc0565b60008160008151811061468b57fe5b60200260200101519050600081136146a557505050611019565b808985815181106146b257fe5b6020026020010181815250505050506001016145af565b8051606090806001600160401b03811180156146e457600080fd5b5060405190808252806020026020018201604052801561470e578160200160208202803683370190505b50915060005b81811015611a9057866001600160a01b031663343fbcdd62061a80888888868151811061473d57fe5b60200260200101516040518563ffffffff1660e01b815260040161476393929190619fc6565b60206040518083038187803b15801561477b57600080fd5b5086fa935050505080156147ac575060408051601f3d908101601f191682019092526147a991810190619502565b60015b6147da573d808015611a40576040519150601f19603f3d011682016040523d82523d6000602084013e611a45565b808483815181106147e757fe5b6020026020010181815250508382815181106147ff57fe5b6020026020010151600014156148155750611a90565b50600101614714565b600080606061482d85876163a9565b8351806001600160401b038111801561484557600080fd5b5060405190808252806020026020018201604052801561486f578160200160208202803683370190505b50915061487e89898989617bd4565b945092506001600160a01b0383166148965750614950565b60005b8181101561494d5760006149078986886040516020016148bb93929190619f6e565b6040516020818303038152906040528987896040516020016148df93929190619f6e565b6040516020818303038152906040528985815181106148fa57fe5b6020026020010151617d29565b90508084838151811061491657fe5b60200260200101818152505083828151811061492e57fe5b602002602001015160001415614944575061494d565b50600101614899565b50505b955095509592505050565b606061496783856163a9565b8151806001600160401b038111801561497f57600080fd5b506040519080825280602002602001820160405280156149a9578160200160208202803683370190505b50915060005b81811015611a9057866001600160a01b031663144a2752620f424087898886815181106149d857fe5b60200260200101516040518563ffffffff1660e01b81526004016149fe93929190619fc6565b60206040518083038187803b158015614a1657600080fd5b5086fa93505050508015614a47575060408051601f3d908101601f19168201909252614a4491810190619502565b60015b614a75573d808015611a40576040519150601f19603f3d011682016040523d82523d6000602084013e611a45565b80848381518110614a8257fe5b602002602001018181525050838281518110614a9a57fe5b602002602001015160001415614ab05750611a90565b506001016149af565b60006060614ac784866163a9565b8251806001600160401b0381118015614adf57600080fd5b50604051908082528060200260200182016040528015614b09578160200160208202803683370190505b50915060005b81811015614b7e576000614b38898989898681518110614b2b57fe5b60200260200101516142b7565b905080848381518110614b4757fe5b602002602001018181525050838281518110614b5f57fe5b602002602001015160001415614b755750614b7e565b50600101614b0f565b5060405163901754d760e01b81526001600160a01b0388169063901754d790614bad9089908990600401619ecb565b60206040518083038186803b158015614bc557600080fd5b505afa158015614bd9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614bfd9190618caa565b92505094509492505050565b6040805160608181019092526114b79080614c28868960808401619ecb565b60405160208183030381529060405281526020018688604051602001614c4f929190619ecb565b6040516020818303038152906040528152602001617e1b815250836169f6565b606082516001600160401b0381118015614c8857600080fd5b50604051908082528060200260200182016040528015614cb2578160200160208202803683370190505b50905060005b83518114613040577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316848281518110614cf657fe5b60200260200101516001600160a01b031614614d4057614d3b83858381518110614d1c57fe5b60200260200101516001600160a01b0316617e6290919063ffffffff16565b614d4c565b826001600160a01b0316315b828281518110614d5857fe5b6020908102919091010152600101614cb8565b6040805160608181019092526114b79080614d8a868960808401619ecb565b60405160208183030381529060405281526020018688604051602001614db1929190619ecb565b6040516020818303038152906040528152602001617f2c815250836169f6565b6060614ddd83856163a9565b8151806001600160401b0381118015614df557600080fd5b50604051908082528060200260200182016040528015614e1f578160200160208202803683370190505b50915060006001600160a01b03861615614e4257614e3d87876164a0565b614e45565b60005b905060006001600160a01b03861615614e6757614e6288876164a0565b614e6a565b60005b905060005b838110156111f05760016001600160a01b038816614ec057614e9f846395b68fe760e01b8985815181106110f457fe5b878481518110614eab57fe5b60200260200101819350828152505050614f5a565b6001600160a01b038916614ee657614e9f8363cd7724c360e01b8985815181106110f457fe5b6000614f00856395b68fe760e01b8a86815181106110f457fe5b925090508015614f3d57614f1c8463cd7724c360e01b8361651f565b888581518110614f2857fe5b60200260200101819450828152505050614f58565b6000878481518110614f4b57fe5b6020026020010181815250505b505b801580614f7a5750858281518110614f6e57fe5b60200260200101516000145b15614f8557506111f0565b50600101614e6f565b8051606090806001600160401b0381118015614fa957600080fd5b50604051908082528060200260200182016040528015614fd3578160200160208202803683370190505b50915060005b81811015611c1557856001600160a01b0316631f00ca74620249f086848151811061500057fe5b6020026020010151886040518463ffffffff1660e01b815260040161502692919061a6bb565b60006040518083038187803b15801561503e57600080fd5b5086fa9350505050801561507457506040513d6000823e601f3d908101601f1916820160405261507191908101906194b0565b60015b6150a2573d808015611bae576040519150601f19603f3d011682016040523d82523d6000602084013e611bb3565b806000815181106150af57fe5b60200260200101518483815181106150c357fe5b6020026020010181815250508382815181106150db57fe5b6020026020010151600014156150f15750611c15565b50600101614fd9565b606061510683856163a9565b8151806001600160401b038111801561511e57600080fd5b50604051908082528060200260200182016040528015615148578160200160208202803683370190505b50915060005b81811015611a9057866001600160a01b031663ff1fd974620f4240888888868151811061517757fe5b60200260200101516040518563ffffffff1660e01b815260040161519d93929190619fc6565b60206040518083038187803b1580156151b557600080fd5b5086fa935050505080156151e6575060408051601f3d908101601f191682019092526151e391810190619502565b60015b615214573d808015611a40576040519150601f19603f3d011682016040523d82523d6000602084013e611a45565b8084838151811061522157fe5b60200260200101818152505083828151811061523957fe5b60200260200101516000141561524f5750611a90565b5060010161514e565b600060608061526785876163a9565b615272878787617986565b92508261527e57610deb565b60405163276fdad960e11b81523090634edfb5b2906152a7908a9087908b908b9060040161a62e565b60006040518083038186803b1580156152bf57600080fd5b505afa1580156152d3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526152fb919081019061951a565b608088018190528451909250806001600160401b038111801561531d57600080fd5b50604051908082528060200260200182016040528015615347578160200160208202803683370190505b50915060005b81811015615432576000306001600160a01b031663f1ed7fa48b8b8b8b878151811061537557fe5b60200260200101516040518563ffffffff1660e01b815260040161539c949392919061a5f8565b60206040518083038186803b1580156153b457600080fd5b505afa1580156153c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906153ec9190619502565b9050808483815181106153fb57fe5b60200260200101818152505083828151811061541357fe5b6020026020010151600014156154295750615432565b5060010161534d565b50509450945094915050565b600080606061544d85876163a9565b61545988888888617bd4565b935091506001600160a01b03821661547057614950565b8351806001600160401b038111801561548857600080fd5b506040519080825280602002602001820160405280156154b2578160200160208202803683370190505b50604080516060810190915290925061551f90806154d68987891560808501619f6e565b60405160208183030381529060405281526020018986886040516020016154ff93929190619f6e565b6040516020818303038152906040528152602001617d29815250866169f6565b915050955095509592505050565b600080606061553c85876163a9565b8351806001600160401b038111801561555457600080fd5b5060405190808252806020026020018201604052801561557e578160200160208202803683370190505b508851604051630939d86360e11b81529193506001600160a01b031690631273b0c6906155b1908a908a90600401619ecb565b60206040518083038186803b1580156155c957600080fd5b505afa1580156155dd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906156019190618caa565b925060006001600160a01b0384161561561f575060019350866156be565b8851604051630939d86360e11b81526001600160a01b0390911690631273b0c690615650908a908c90600401619ecb565b60206040518083038186803b15801561566857600080fd5b505afa15801561567c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906156a09190618caa565b93506001600160a01b0384166156b7575050610deb565b5060009350855b836001600160a01b031663dd58b41c6040518163ffffffff1660e01b815260040160206040518083038186803b1580156156f757600080fd5b505afa15801561570b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061572f91906194e2565b61573a575050610deb565b6157b260405180606001604052808987858e602001516040516020016157639493929190619ee5565b60405160208183030381529060405281526020018a87858e602001516040516020016157929493929190619ee5565b6040516020818303038152906040528152602001616bf3815250876169f6565b925050509450945094915050565b606083516001600160401b03811180156157d957600080fd5b50604051908082528060200260200182016040528015615803578160200160208202803683370190505b50905060005b84518114610c8d577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031685828151811061584757fe5b60200260200101516001600160a01b0316146158935761588e848487848151811061586e57fe5b60200260200101516001600160a01b0316617fe19092919063ffffffff16565b615896565b60005b8282815181106158a257fe5b6020908102919091010152600101615809565b8051606090806001600160401b03811180156158d057600080fd5b506040519080825280602002602001820160405280156158fa578160200160208202803683370190505b50915060005b81811015611a9057866001600160a01b031663838e6a22620493e0888888868151811061592957fe5b60200260200101516040518563ffffffff1660e01b815260040161594f93929190619fc6565b60206040518083038187803b15801561596757600080fd5b5086fa93505050508015615998575060408051601f3d908101601f1916820190925261599591810190619502565b60015b6159c6573d808015611a40576040519150601f19603f3d011682016040523d82523d6000602084013e611a45565b808483815181106159d357fe5b60200260200101818152505050600101615900565b600084608001515160001415615a0057506000611449565b84604001516001600160a01b031663418436bc6207a12087606001516001600160a01b0316876001600160a01b031614615a3a5786615a50565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b88606001516001600160a01b0316876001600160a01b031614615a735786615a89565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b8660008b608001516040518763ffffffff1660e01b8152600401615ab1959493929190619fea565b60206040518083038187803b158015615ac957600080fd5b5086fa93505050508015615afa575060408051601f3d908101601f19168201909252615af791810190619502565b60015b615b38573d808015615b28576040519150601f19603f3d011682016040523d82523d6000602084013e615b2d565b606091505b506000915050611449565b6000615b43856180ad565b60ff1690506000615b53876180ad565b60ff169050670de0b6b3a764000081600a0a83600a0a8786020281615b7457fe5b0481615b7c57fe5b049350505050611449565b60006060615b9584866163a9565b8251806001600160401b0381118015615bad57600080fd5b50604051908082528060200260200182016040528015615bd7578160200160208202803683370190505b509150615c4260405180606001604052808988604051602001615bfb929190619ecb565b60405160208183030381529060405281526020018989604051602001615c22929190619ecb565b60405160208183030381529060405281526020016180b8815250856169f6565b60405163901754d760e01b81529092506001600160a01b0388169063901754d790614bad9089908990600401619ecb565b615c7b618588565b615c83618588565b6000198060005b86518114615d7f57615cba6020888381518110615ca357fe5b602002602001015151038789848151811061373d57fe5b60006060306001600160a01b0316898481518110615cd457fe5b6020026020010151604051615ce99190619e82565b6000604051808303816000865af19150503d8060008114615d26576040519150601f19603f3d011682016040523d82523d6000602084013e615d2b565b606091505b50915091508115615d75576000615d4f60208351038361792690919063ffffffff16565b9050600081118015615d6057508481105b15615d7357838752602087018290529350835b505b5050600101615c8a565b50600019811415615d905750613908565b60005b8751811461390557615dc36020898381518110615dac57fe5b60200260200101515103838a848151811061373d57fe5b60006060306001600160a01b03168a8481518110615ddd57fe5b6020026020010151604051615df29190619e82565b6000604051808303816000865af19150503d8060008114615e2f576040519150601f19603f3d011682016040523d82523d6000602084013e615e34565b606091505b50915091508115615e7e576000615e5860208351038361792690919063ffffffff16565b9050600081118015615e6957508581105b15615e7c57838852602088018290529450845b505b5050600101615d93565b60606000836001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b158015615ec557600080fd5b505afa158015615ed9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190615efd9190618caa565b905060018351036001600160401b0381118015615f1957600080fd5b50604051908082528060200260200182016040528015615f43578160200160208202803683370190505b50915060005b825181101561616e576060826001600160a01b0316635b1dc86f620249f0878581518110615f7357fe5b6020026020010151888660010181518110615f8a57fe5b60200260200101516040518463ffffffff1660e01b8152600401615faf929190619ecb565b60006040518083038187803b158015615fc757600080fd5b5086fa93505050508015615ffd57506040513d6000823e601f3d908101601f19168201604052615ffa9190810190619057565b60015b61604c573d80801561602b576040519150601f19603f3d011682016040523d82523d6000602084013e616030565b606091505b5050604080516000815260208101909152935061617192505050565b60006001825110156160795760405162461bcd60e51b81526004016160709061a559565b60405180910390fd5b60005b825181101561616257600083828151811061609357fe5b60200260200101516001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156160d357600080fd5b505afa1580156160e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061610b9190619502565b9050828111156161595780925083828151811061612457fe5b602002602001015188878151811061613857fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b5060010161607c565b50505050600101615f49565b50505b92915050565b6000606085600001516001600160a01b03166321f8a72187600001516001600160a01b0316639232494e6040518163ffffffff1660e01b815260040160206040518083038186803b1580156161cb57600080fd5b505afa1580156161df573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906162039190619502565b6040518263ffffffff1660e01b815260040161621f919061a2d1565b60206040518083038186803b15801561623757600080fd5b505afa15801561624b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061626f9190618caa565b915085602001515160001415616284576163a0565b6000805b87602001515181101561639d576002886020015182815181106162a757fe5b60200260200101515110156162bb57616395565b836001600160a01b0316637f9c0ecd620493e08a6020015184815181106162de57fe5b60200260200101518860018a5103815181106162f657fe5b60200260200101516040518463ffffffff1660e01b815260040161631b92919061a188565b60206040518083038187803b15801561633357600080fd5b5086fa93505050508015616364575060408051601f3d908101601f1916820190925261636191810190619502565b60015b61636d57616395565b82811115616393578092508860200151828151811061638857fe5b602002602001015193505b505b600101616288565b50505b94509492505050565b806001600160a01b0316826001600160a01b031614156163db5760405162461bcd60e51b81526004016160709061a4cf565b5050565b6163e761851a565b50604080516080810182523080825260006020830181905292820152606081019190915290565b604080516001808252818301909252606091829190816020015b6164306185c4565b8152602001906001900390816164285790505090506040518060a00160405280856000015181526020016000815260200160018152602001848152602001604051806020016040528060008152508152508160008151811061648e57fe5b60209081029190910101529392505050565b6040516303795fb160e11b81526000906001600160a01b038416906306f2bf62906164cf908590600401619e9e565b60206040518083038186803b1580156164e757600080fd5b505afa1580156164fb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061418a9190618caa565b6000806001600160a01b03851661653557610b1a565b6060856001600160a01b0316620249f08686604051602401616557919061a2d1565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516165959190619e82565b6000604051808303818686fa925050503d80600081146165d1576040519150601f19603f3d011682016040523d82523d6000602084013e6165d6565b606091505b50909250905081156165f957808060200190518101906165f69190619502565b92505b50935093915050565b600080600080846001600160a01b031663d9638d368b602001516040518263ffffffff1660e01b8152600401616638919061a2d1565b60a06040518083038186803b15801561665057600080fd5b505afa158015616664573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906166889190619b9b565b94509450505092506000620f424090508a604001516001600160a01b0316896001600160a01b031614156167b05760006166c78964e8d4a51000618108565b905060006166eb6b033b2e3c9fd0803ce80000006166e5888561813e565b90618108565b905084811061670357600096505050505050506168b9565b6000616792670de0b6b3a764000061678c8c6001600160a01b031663568d4b6f6040518163ffffffff1660e01b815260040160206040518083038186803b15801561674d57600080fd5b505afa158015616761573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906167859190619502565b8690618108565b9061815a565b905060006167a08483618184565b98506168b9975050505050505050565b8a604001516001600160a01b03168a6001600160a01b031614156168b05787848111156167e5576000955050505050506168b9565b60006168016b033b2e3c9fd0803ce80000006166e58885618184565b905083811161681957600096505050505050506168b9565b600061689e8a6001600160a01b031663fae036d56040518163ffffffff1660e01b815260040160206040518083038186803b15801561685757600080fd5b505afa15801561686b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061688f9190619502565b670de0b6b3a76400009061813e565b905060006167a08261678c8688618108565b60009450505050505b9695505050505050565b6000806168ce6185f6565b858060200190518101906168e291906195ae565b915091506000858060200190518101906168fc9190619592565b905060006060306322db5ed160e21b8587866169178c6181a3565b60405160240161692a949392919061a590565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516169689190619e82565b600060405180830381855afa9150503d80600081146169a3576040519150601f19603f3d011682016040523d82523d6000602084013e6169a8565b606091505b5091509150816169c05760009550505050505061418a565b808060200190518101906169d491906194b0565b6000815181106169e057fe5b6020026020010151955050505050509392505050565b606081516001600160401b0381118015616a0f57600080fd5b50604051908082528060200260200182016040528015616a39578160200160208202803683370190505b509050815160001415616a4b57616171565b6000616a7c8460000151856020015185600081518110616a6757fe5b6020026020010151876040015163ffffffff16565b905080616a895750616171565b6000616aa68560200151866000015184886040015163ffffffff16565b905080616ab4575050616171565b60005b8451811015616bea5760005b6005811015616bac57616aea868381518110616adb57fe5b602002602001015184866181e4565b935083616af657616bac565b616b05612715612710866181e4565b935083616b1157616bac565b6000616b2e88602001518960000151878b6040015163ffffffff16565b905080616b3b5750616bac565b809350868381518110616b4a57fe5b60200260200101518410616ba3576000878481518110616b6657fe5b6020026020010151612710898681518110616b7d57fe5b602002602001015187030281616b8f57fe5b04905060058111616ba1575050616bac565b505b50600101616ac3565b50616bcb858281518110616bbc57fe5b602002602001015183856181e4565b848281518110616bd757fe5b6020908102919091010152600101616ab7565b50505092915050565b600080600080600087806020019051810190616c0f9190618cff565b9350935093509350816001600160a01b0316846001600160a01b03161415616cf9576040516351400f0b60e11b81526001600160a01b0384169063a2801e1690620493e090616c62908a9060040161a2d1565b60206040518083038187803b158015616c7a57600080fd5b5086fa93505050508015616cab575060408051601f3d908101601f19168201909252616ca891810190619502565b60015b616ced573d808015616cd9576040519150601f19603f3d011682016040523d82523d6000602084013e616cde565b606091505b5060009550505050505061418a565b945061418a9350505050565b60405163ca19ebd960e01b81526001600160a01b0382169063ca19ebd990620493e090616c629087908b90600401619eb2565b60606002828451031015616d525760405162461bcd60e51b81526004016160709061a48b565b616d5a618616565b5060408051606080820183526101f48252610bb860208301526127108284015282516003808252608082019094529192909190816020016020820280368337019050509050600080868681518110616dae57fe5b602002602001015190506000878760010181518110616dc957fe5b6020026020010151905060005b6003811015616ebe5760008a6001600160a01b0316631698ee8285858a8660038110616dfe57fe5b60200201516040518463ffffffff1660e01b8152600401616e219392919061a319565b60206040518083038186803b158015616e3957600080fd5b505afa158015616e4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190616e719190618caa565b9050616e7c8161823c565b15616eb55780868680600101975081518110616e9457fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b50600101616dd6565b50505080616ece5750505061418a565b8551856002011415616fc457806001600160401b0381118015616ef057600080fd5b50604051908082528060200260200182016040528015616f2457816020015b6060815260200190600190039081616f0f5790505b50935060005b81811015616fbb57604080516001808252818301909252906020808301908036833701905050858281518110616f5c57fe5b6020026020010181905250828181518110616f7357fe5b6020026020010151858281518110616f8757fe5b6020026020010151600081518110616f9b57fe5b6001600160a01b0390921660209283029190910190910152600101616f2a565b5050505061418a565b6060616fd4888888600101616d2c565b9050805160001415616fe9575050505061418a565b805182026001600160401b038111801561700257600080fd5b5060405190808252806020026020018201604052801561703657816020015b60608152602001906001900390816170215790505b50945060005b828110156171b65760005b82518110156171ad57825182810282019084908390811061706457fe5b6020026020010151516001016001600160401b038111801561708557600080fd5b506040519080825280602002602001820160405280156170af578160200160208202803683370190505b508882815181106170bc57fe5b60200260200101819052508583815181106170d357fe5b60200260200101518882815181106170e757fe5b60200260200101516000815181106170fb57fe5b60200260200101906001600160a01b031690816001600160a01b03168152505060005b84838151811061712a57fe5b6020026020010151518110156171a35784838151811061714657fe5b6020026020010151818151811061715957fe5b602002602001015189838151811061716d57fe5b6020026020010151826001018151811061718357fe5b6001600160a01b039092166020928302919091019091015260010161711e565b5050600101617047565b5060010161703c565b50505050509392505050565b606060028351101580156171da575081516001018351145b6171f65760405162461bcd60e51b81526004016160709061a514565b81516003028351601402016001600160401b038111801561721657600080fd5b506040519080825280601f01601f191660200182016040528015617241576020820181803683370190505b5090506020810160005b845181101561616e5780156172f057600084600183038151811061726b57fe5b60200260200101516001600160a01b031663ddca3f436040518163ffffffff1660e01b815260040160206040518083038186803b1580156172ab57600080fd5b505afa1580156172bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906172e39190619b20565b60e81b8352506003909101905b60008582815181106172fe57fe5b602090810291909101015160601b83525060149091019060010161724b565b6000828202831580159061733a57508284828161733657fe5b0414155b15617349576000915050616171565b6706f05b59d3b2000081018181101561736757600092505050616171565b670de0b6b3a76400009004949350505050565b606081516001600160401b038111801561739357600080fd5b506040519080825280602002602001820160405280156173bd578160200160208202803683370190505b50905060005b8251811015613133578260018285510303815181106173de57fe5b60200260200101518282815181106173f257fe5b6001600160a01b03909216602092830291909101909101526001016173c3565b606081516001600160401b038111801561742b57600080fd5b50604051908082528060200260200182016040528015617455578160200160208202803683370190505b50905060005b82518110156131335782600182855103038151811061747657fe5b602002602001015182828151811061748a57fe5b6001600160a01b039092166020928302919091019091015260010161745b565b6000806000858060200190518101906174c39190618cc6565b915091506000858060200190518101906174dd9190618caa565b90503063e8e4af098385846174f18a6181a3565b6040518563ffffffff1660e01b81526004016175109493929190619f10565b60006040518083038186803b15801561752857600080fd5b505afa92505050801561755d57506040513d6000823e601f3d908101601f1916820160405261755a91908101906194b0565b60015b61759e573d80801561758b576040519150601f19603f3d011682016040523d82523d6000602084013e617590565b606091505b50600094505050505061418a565b806000815181106175ab57fe5b602002602001015194505050505061418a565b60006114498361678c6175d2826001618184565b6175dc8887618108565b9061813e565b60006012905060006060836001600160a01b031660405180604001604052806004815260200163313ce56760e01b8152506040516176209190619e82565b600060405180830381855afa9150503d806000811461765b576040519150601f19603f3d011682016040523d82523d6000602084013e617660565b606091505b509150915081801561767457506020815110155b1561097557611449816000617926565b600080600080846001600160a01b031663d9638d368b602001516040518263ffffffff1660e01b81526004016176ba919061a2d1565b60a06040518083038186803b1580156176d257600080fd5b505afa1580156176e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061770a9190619b9b565b945094505050925089604001516001600160a01b0316886001600160a01b0316141561782157600087905060006177ba886001600160a01b031663568d4b6f6040518163ffffffff1660e01b815260040160206040518083038186803b15801561777357600080fd5b505afa158015617787573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906177ab9190619502565b670de0b6b3a764000090618184565b905060006177d48261678c85670de0b6b3a7640000618108565b905060006177f26b033b2e3c9fd0803ce80000006166e5898561813e565b905085811061780b5760009750505050505050506168b9565b60006167a060016175dc8564e8d4a5100061815a565b89604001516001600160a01b0316896001600160a01b031614156179065760006178508864e8d4a51000618108565b90506000617890886001600160a01b031663fae036d56040518163ffffffff1660e01b815260040160206040518083038186803b15801561685757600080fd5b905060006178aa670de0b6b3a764000061678c8585618108565b9050858111156178c357600096505050505050506168b9565b60006178df6b033b2e3c9fd0803ce80000006166e58985618184565b90508481116178f85760009750505050505050506168b9565b5095506168b9945050505050565b5060009998505050505050505050565b617921838383618448565b505050565b600061418a838361846f565b60008061793d6185f6565b8580602001905181019061795191906195ae565b9150915060008580602001905181019061796b9190619592565b9050600060603063205e01d760e11b8587866169178c6181a3565b600080846020015190506060816001600160a01b031663910ffc7187606001516001600160a01b0316876001600160a01b0316146179c457866179da565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b88606001516001600160a01b0316876001600160a01b0316146179fd5786617a13565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b604080516000815260208101918290526001600160e01b031960e086901b16909152617a4792919060019060248101619f92565b60006040518083038186803b158015617a5f57600080fd5b505afa158015617a73573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052617a9b91908101906190ef565b505090508051866000015110617ab757506000915061418a9050565b80866000015181518110617ac757fe5b6020026020010151925060f883901c60001c60bb1415611c1557506000915061418a9050565b600080617af8618634565b84806020019051810190617b0c9190618da5565b91509150600086806020019051810190617b269190618da5565b50604051633c7b5fe960e21b8152909150309063f1ed7fa490617b53908590859088908b9060040161a5f8565b60206040518083038186803b158015617b6b57600080fd5b505afa925050508015617b9b575060408051601f3d908101601f19168201909252617b9891810190619502565b60015b617bc9573d80801561758b576040519150601f19603f3d011682016040523d82523d6000602084013e617590565b935061418a92505050565b6000806060866001600160a01b03166357a281dc86866040518363ffffffff1660e01b8152600401617c07929190619ecb565b60006040518083038186803b158015617c1f57600080fd5b505afa158015617c33573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052617c5b9190810190619057565b905060019150805160001415617cf4576040516315e8a07760e21b81526001600160a01b038816906357a281dc90617c999087908990600401619ecb565b60006040518083038186803b158015617cb157600080fd5b505afa158015617cc5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052617ced9190810190619057565b9050600091505b80518610617d095760008092509250506163a0565b808681518110617d1557fe5b602002602001015192505094509492505050565b60008060008086806020019051810190617d439190618d5d565b9250925092508015617de757604051633cd0243b60e11b81526001600160a01b038316906379a0487690620493e090617d83906000908a90600401619eb2565b604080518083038187803b158015617d9a57600080fd5b5086fa93505050508015617dcb575060408051601f3d908101601f19168201909252617dc891810190619b43565b60015b617ddb576000935050505061418a565b50935061418a92505050565b6040516366410a2160e01b81526001600160a01b038316906366410a2190620493e090617d83906000908a90600401619eb2565b600080600085806020019051810190617e349190618cc6565b91509150600085806020019051810190617e4e9190618caa565b9050306330d6570d8385846174f18a6181a3565b6000806060846001600160a01b03166370a0823160e01b85604051602401617e8a9190619e9e565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051617ec89190619e82565b600060405180830381855afa9150503d8060008114617f03576040519150601f19603f3d011682016040523d82523d6000602084013e617f08565b606091505b5091509150818015617f1c57506020815110155b1561616e576114b7816000617926565b600080600085806020019051810190617f459190618cc6565b91509150600085806020019051810190617f5f9190618caa565b90503063a469841762061a80848685617f778b6181a3565b6040518663ffffffff1660e01b8152600401617f969493929190619f10565b60006040518083038187803b158015617fae57600080fd5b5086fa9350505050801561755d57506040513d6000823e601f3d908101601f1916820160405261755a91908101906194b0565b6000806060856001600160a01b031663dd62ed3e60e01b868660405160240161800b929190619ecb565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516180499190619e82565b600060405180830381855afa9150503d8060008114618084576040519150601f19603f3d011682016040523d82523d6000602084013e618089565b606091505b509150915081801561809d57506020815110155b15611c15576168b9816000617926565b6000616171826175e2565b6000806000858060200190518101906180d19190618cc6565b91509150600080868060200190518101906180ec9190618cc6565b915091506180fc848483896142b7565b98975050505050505050565b60008261811757506000616171565b8282028284828161812457fe5b041461418a5761418a61813960018686618499565b6184f3565b60008282018381101561418a5761418a61813960008686618499565b6000816181705761817061813960038585618499565b600082848161817b57fe5b04949350505050565b60008282111561819d5761819d61813960028585618499565b50900390565b6040805160018082528183019092526060916020808301908036833701905050905081816000815181106181d357fe5b602002602001018181525050919050565b60008315806181f1575081155b806181fa575082155b156182075750600061418a565b8382028285828161821457fe5b041461822457600091505061418a565b836001850382018161823257fe5b0495945050505050565b6000813b8061824f576000915050610dfa565b50816001600160a01b0316630dfe16816040518163ffffffff1660e01b815260040160206040518083038186803b15801561828957600080fd5b505afa15801561829d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906182c19190618caa565b6001600160a01b03166370a08231836040518263ffffffff1660e01b81526004016182ec9190619e9e565b60206040518083038186803b15801561830457600080fd5b505afa158015618318573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061833c9190619502565b61834857506000610dfa565b816001600160a01b031663d21220a76040518163ffffffff1660e01b815260040160206040518083038186803b15801561838157600080fd5b505afa158015618395573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906183b99190618caa565b6001600160a01b03166370a08231836040518263ffffffff1660e01b81526004016183e49190619e9e565b60206040518083038186803b1580156183fc57600080fd5b505afa158015618410573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906184349190619502565b61844057506000610dfa565b506001919050565b81602001835110156184675761846761813960058551856020016184fb565b910160200152565b600081602001835110156184905761849061813960058551856020016184fb565b50016020015190565b606063e946c1bb60e01b8484846040516024016184b89392919061a365565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915290509392505050565b805160208201fd5b6060632800659560e01b8484846040516024016184b89392919061a386565b60408051608081018252600080825260208201819052918101829052606081019190915290565b6040518060a0016040528060008152602001600081526020016000815260200160008152602001600081525090565b60408051808201909152606081526000602082015290565b604051806040016040528060008152602001606081525090565b6040805160608101909152600080825260208201908152600060209091015290565b6040518060a0016040528060008019168152602001600081526020016000815260200160008152602001606081525090565b604080516060810182526000808252602082018190529181019190915290565b60405180606001604052806003906020820280368337509192915050565b6040518060a001604052806000815260200160006001600160a01b0316815260200160006001600160a01b0316815260200160006001600160a01b03168152602001606081525090565b80356161718161a89a565b80516161718161a89a565b600082601f8301126186a4578081fd5b81356186b76186b28261a811565b61a7eb565b8181529150602080830190848101818402860182018710156186d857600080fd5b60005b848110156187005781356186ee8161a89a565b845292820192908201906001016186db565b505050505092915050565b600082601f83011261871b578081fd5b81356187296186b28261a811565b818152915060208083019084810160005b8481101561870057618751888484358a010161890a565b8452928201929082019060010161873a565b600082601f830112618773578081fd5b81356187816186b28261a811565b8181529150602080830190848101818402860182018710156187a257600080fd5b60005b848110156187005781356187b88161a89a565b845292820192908201906001016187a5565b600082601f8301126187da578081fd5b81356187e86186b28261a811565b818152915060208083019084810160808085028701830188101561880b57600080fd5b60005b85811015618832576188208984618c09565b8552938301939181019160010161880e565b50505050505092915050565b600082601f83011261884e578081fd5b813561885c6186b28261a811565b81815291506020808301908481018184028601820187101561887d57600080fd5b60005b8481101561870057813584529282019290820190600101618880565b600082601f8301126188ac578081fd5b81516188ba6186b28261a811565b8181529150602080830190848101818402860182018710156188db57600080fd5b60005b84811015618700578151845292820192908201906001016188de565b8051801515811461617157600080fd5b600082601f83011261891a578081fd5b81356189286186b28261a830565b915080825283602082850101111561893f57600080fd5b8060208401602084013760009082016020015292915050565b600082601f830112618968578081fd5b81516189766186b28261a830565b915080825283602082850101111561898d57600080fd5b61304081602084016020860161a853565b80516002811061617157600080fd5b6000606082840312156189be578081fd5b6189c8606061a7eb565b905081356189d58161a89a565b815260208201356189e58161a8af565b602082015260408201356189f88161a8af565b604082015292915050565b600060608284031215618a14578081fd5b618a1e606061a7eb565b90508151618a2b8161a89a565b81526020820151618a3b8161a8af565b602082015260408201516189f88161a8af565b600060408284031215618a5f578081fd5b618a69604061a7eb565b90508135618a768161a89a565b81526020820135618a868161a89a565b602082015292915050565b600060a08284031215618aa2578081fd5b618aac60a061a7eb565b9050813581526020820135618ac08161a89a565b60208201526040820135618ad38161a89a565b60408201526060820135618ae68161a89a565b606082015260808201356001600160401b03811115618b0457600080fd5b618b108482850161890a565b60808301525092915050565b6000610180808385031215618b2f578182fd5b618b388161a7eb565b915050618b45838361867e565b8152618b54836020840161867e565b6020820152618b668360408401618c6c565b6040820152618b788360608401618c6c565b6060820152618b8a8360808401618c6c565b6080820152618b9c8360a0840161867e565b60a0820152618bae8360c0840161867e565b60c0820152618bc08360e0840161867e565b60e0820152610100618bd48482850161867e565b908201526101208281013590820152610140618bf284828501618c77565b818301525061016080830135818301525092915050565b600060808284031215618c1a578081fd5b618c24608061a7eb565b9050813560048110618c3557600080fd5b8152602082013560ff81168114618c4b57600080fd5b80602083015250604082013560408201526060820135606082015292915050565b80356161718161a8d4565b80356001600160401b038116811461617157600080fd5b600060208284031215618c9f578081fd5b813561418a8161a89a565b600060208284031215618cbb578081fd5b815161418a8161a89a565b60008060408385031215618cd8578081fd5b8251618ce38161a89a565b6020840151909250618cf48161a89a565b809150509250929050565b60008060008060808587031215618d14578182fd5b8451618d1f8161a89a565b6020860151909450618d308161a89a565b6040860151909350618d418161a89a565b6060860151909250618d528161a89a565b939692955090935050565b600080600060608486031215618d71578081fd5b8351618d7c8161a89a565b6020850151909350618d8d8161a89a565b9150618d9c85604086016188fa565b90509250925092565b60008060408385031215618db7578182fd5b8251618dc28161a89a565b60208401519092506001600160401b0380821115618dde578283fd5b9084019060a08287031215618df1578283fd5b618dfb60a061a7eb565b82518152618e0c8760208501618689565b6020820152618e1e8760408501618689565b6040820152618e308760608501618689565b6060820152608083015182811115618e46578485fd5b618e5288828601618958565b6080830152508093505050509250929050565b600080600080600060a08688031215618e7c578283fd5b8535618e878161a89a565b94506020860135618e978161a89a565b93506040860135618ea78161a89a565b92506060860135618eb78161a89a565b915060808601356001600160401b03811115618ed1578182fd5b618edd8882890161883e565b9150509295509295909350565b60008060008060808587031215618eff578182fd5b8435618f0a8161a89a565b93506020850135618f1a8161a89a565b92506040850135618f2a8161a89a565b915060608501356001600160401b03811115618f44578182fd5b618f508782880161883e565b91505092959194509250565b60008060008060808587031215618f71578182fd5b8435618f7c8161a89a565b93506020850135618f8c8161a89a565b92506040850135618f9c8161a89a565b9396929550929360600135925050565b600080600060608486031215618fc0578081fd5b8335618fcb8161a89a565b925060208401356001600160401b0380821115618fe6578283fd5b618ff287838801618694565b93506040860135915080821115619007578283fd5b506190148682870161883e565b9150509250925092565b600080600080600060a08688031215619035578283fd5b85356190408161a89a565b9450602086013593506040860135618ea78161a89a565b60006020808385031215619069578182fd5b82516001600160401b0381111561907e578283fd5b8301601f8101851361908e578283fd5b805161909c6186b28261a811565b81815283810190838501858402850186018910156190b8578687fd5b8694505b838510156190e35780516190cf8161a89a565b8352600194909401939185019185016190bc565b50979650505050505050565b600080600060608486031215619103578081fd5b83516001600160401b0380821115619119578283fd5b818601915086601f83011261912c578283fd5b815161913a6186b28261a811565b80828252602080830192508086018b82838702890101111561915a578788fd5b8796505b8487101561917c57805184526001969096019592810192810161915e565b508901519097509350505080821115619193578283fd5b506191a08682870161889c565b925050618d9c856040860161899e565b600080602083850312156191c2578182fd5b82356001600160401b03808211156191d8578384fd5b818501915085601f8301126191eb578384fd5b8135818111156191f9578485fd5b866020808302850101111561920c578485fd5b60209290920196919550909350505050565b600080600060608486031215619232578081fd5b83356001600160401b0380821115619248578283fd5b6192548783880161870b565b94506020860135915080821115619269578283fd5b506192768682870161870b565b925050604084013590509250925092565b600060208284031215619298578081fd5b81356001600160401b038111156192ad578182fd5b61144984828501618763565b600080604083850312156192cb578182fd5b82356001600160401b038111156192e0578283fd5b6192ec85828601618763565b9250506020830135618cf48161a89a565b600080600060608486031215619311578081fd5b83356001600160401b03811115619326578182fd5b61933286828701618763565b93505060208401356193438161a89a565b915060408401356193538161a89a565b809150509250925092565b60006020808385031215619370578182fd5b82516001600160401b03811115619385578283fd5b8301601f81018513619395578283fd5b80516193a36186b28261a811565b81815283810190838501858402850186018910156193bf578687fd5b8694505b838510156190e35780518352600194909401939185019185016193c3565b6000806000606084860312156193f5578081fd5b83356001600160401b038082111561940b578283fd5b818601915086601f83011261941e578283fd5b813561942c6186b28261a811565b80828252602080830192508086016101808c838288028a0101111561944f578889fd5b8897505b8588101561947b576194658d83618b1c565b8552600197909701969382019390810190619453565b50919850890135945050505080821115619493578283fd5b506194a0868287016187ca565b925050618d9c856040860161867e565b6000602082840312156194c1578081fd5b81516001600160401b038111156194d6578182fd5b6114498482850161889c565b6000602082840312156194f3578081fd5b8151801515811461418a578182fd5b600060208284031215619513578081fd5b5051919050565b60006020828403121561952b578081fd5b81516001600160401b03811115619540578182fd5b61144984828501618958565b600080600060608486031215619560578081fd5b833561956b8161a89a565b925060208401356001600160401b0380821115619586578283fd5b618ff287838801618763565b6000602082840312156195a3578081fd5b815161418a8161a8c5565b600080608083850312156195c0578182fd5b82516195cb8161a8c5565b91506195da8460208501618a03565b90509250929050565b60008060008084860360a08112156195f9578283fd5b6040811215619606578283fd5b50619611604061a7eb565b8535815260208601356196238161a89a565b6020820152935060408501356196388161a89a565b925060608501356196488161a89a565b915060808501356001600160401b03811115618f44578182fd5b60008060008060808587031215619677578182fd5b84356001600160401b038082111561968d578384fd5b90860190604082890312156196a0578384fd5b6196aa604061a7eb565b82356196b58161a89a565b8152602083810135838111156196c9578687fd5b80850194505089601f8501126196dd578586fd5b83356196eb6186b28261a811565b81815282810190868401895b848110156197205761970e8f8784358c0101618694565b845292850192908501906001016196f7565b505080848601525050508197506197398a828b0161867e565b9650505061974a886040890161867e565b9350606087013591508082111561975f578283fd5b50618f508782880161883e565b60008060008060c08587031215619781578182fd5b61978b86866189ad565b9350606085013561979b8161a8c5565b925060808501356197ab8161a8c5565b915060a08501356001600160401b03811115618f44578182fd5b60008060008060a085870312156197da578182fd5b6197e48686618a4e565b935060408501356196388161a89a565b600060208284031215619805578081fd5b81356001600160401b038082111561981b578283fd5b9083019060a0828603121561982e578283fd5b61983860a061a7eb565b619842868461867e565b8152602083013582811115619855578485fd5b61986187828601618694565b602083015250604083013582811115619878578485fd5b6198848782860161870b565b60408301525060608301358281111561989b578485fd5b6198a787828601618694565b6060830152506080830135828111156198be578485fd5b6198ca8782860161883e565b60808301525095945050505050565b600080600080608085870312156198ee578182fd5b84356001600160401b0380821115619904578384fd5b61991088838901618a91565b9550602087013591506199228261a89a565b9093506040860135906199348261a89a565b9092506060860135908082111561975f578283fd5b6000806000806080858703121561995e578182fd5b84356001600160401b03811115619973578283fd5b61997f87828801618a91565b9450506020850135618f8c8161a89a565b600080600080608085870312156199a5578182fd5b84356001600160401b038111156199ba578283fd5b6199c687828801618a91565b9450506020850135925060408501356199de8161a89a565b91506060850135618d528161a89a565b60008060006102208486031215619a03578081fd5b619a0d8585618b1c565b9250619a1d856101808601618c09565b91506102008401356193538161a89a565b60008060008084860360c0811215619a44578283fd5b6060811215619a51578283fd5b50619a5c606061a7eb565b8535619a678161a89a565b8152602086810135908201526040860135619a818161a89a565b604082015293506060850135619a968161a89a565b925060808501356197ab8161a89a565b600080600083850360a0811215619abb578182fd5b6060811215619ac8578182fd5b50619ad3606061a7eb565b84518152602085015160058110619ae8578283fd5b60208201526040850151619afb8161a8d4565b60408201526060850151909350619b118161a8d4565b9150618d9c85608086016188fa565b600060208284031215619b31578081fd5b815162ffffff8116811461418a578182fd5b60008060408385031215619b55578182fd5b505080516020909101519092909150565b60008060008060808587031215619b7b578182fd5b505082516020840151604085015160609095015191969095509092509050565b600080600080600060a08688031215619bb2578283fd5b5050835160208501516040860151606087015160809097015192989197509594509092509050565b6001600160a01b03169052565b6000815180845260208085019450808401835b83811015619c1f5781516001600160a01b031687529582019590820190600101619bfa565b509495945050505050565b6000815180845260208085019450808401835b83811015619c1f57815187529582019590820190600101619c3d565b60008151808452619c7181602086016020860161a853565b601f01601f19169290920160200192915050565b80516001600160a01b031682526020808201516001600160e01b03199081169184019190915260409182015116910152565b80516001600160a01b039081168352602080830151151590840152604080830151909116908301526060908101511515910152565b6000815183526020820151604060208501526114496040850182619c59565b600081518352602082015160018060a01b0380821660208601528060408501511660408601528060608501511660608601525050608082015160a0608085015261144960a0850182619c59565b619d63828251619bda565b6020810151619d756020840182619bda565b506040810151619d886040840182619e58565b506060810151619d9b6060840182619e58565b506080810151619dae6080840182619e58565b5060a0810151619dc160a0840182619bda565b5060c0810151619dd460c0840182619bda565b5060e0810151619de760e0840182619bda565b5061010080820151619dfb82850182619bda565b5050610120818101519083015261014080820151619e1b82850182619e65565b505061016090810151910152565b8051619e348161a883565b825260208181015160ff169083015260408082015190830152606090810151910152565b6001600160801b03169052565b6001600160401b03169052565b6000828483379101908152919050565b60008251619e9481846020870161a853565b9190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0392831681529116602082015260400190565b6001600160a01b03948516815292841660208401529083166040830152909116606082015260800190565b6001600160a01b0385811682528481166020830152831660408201526080606082018190526000906168b990830184619c2a565b6001600160a01b039485168152928416602084015292166040820152606081019190915260800190565b6001600160a01b039384168152919092166020820152901515604082015260600190565b6001600160a01b0385811682528416602082015282151560408201526080606082018190526000906168b990830184619c59565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061a02490830184619c59565b979650505050505050565b6001600160a01b038416815260606020820181905260009061a05390830185619be7565b82810360408401526168b98185619c2a565b6001600160a01b0385168152600061a07c8561a883565b8460208301526080604083015261a0966080830185619c2a565b828103606084015261a0248185619c2a565b6001600160a01b0389811682526000906101009061a0c58b61a883565b8a602085015281604085015261a0dd8285018b619c2a565b9150838203606085015261a0f1828a619c2a565b9088166080850152905061a1048661a883565b8560a084015282810360c084015261a11c8186619c2a565b905082810360e084015261a1308185619c2a565b9b9a5050505050505050505050565b6001600160a01b038316815260406020820181905260009061144990830184619d0b565b60006040825261a1766040830185619be7565b82810360208401526114b78185619c2a565b60006040825261a19b6040830185619be7565b90508260208301529392505050565b60006040820160408352808551808352606085019150602092506060838202860101838801855b8381101561a1ff57605f1988840301855261a1ed838351619c59565b9486019492509085019060010161a1d1565b5050858103848701526180fc8188619c2a565b60208082528251828201819052600091906040908185019080840286018301878501865b8381101561a27957888303603f190185528151805187855261a25a88860182619c59565b918901511515948901949094529487019492509086019060010161a236565b509098975050505050505050565b60006020825261418a6020830184619c2a565b901515815260200190565b83151581526001600160a01b03831660208201526060604082018190526000906114b790830184619c2a565b90815260200190565b60008482526060602083015261a0536060830185619c59565b60006020825261418a6020830184619c59565b60006040825261a19b6040830185619c59565b6001600160a01b03938416815291909216602082015262ffffff909116604082015260600190565b6001600160a01b038316815260406020820181905260009061144990830184619c2a565b6060810161a3728561a883565b938152602081019290925260409091015290565b606081016008851061a37257fe5b600060e0820161a3a38761a890565b868352602060e08185015281875180845261010093508386019150838382028701019350828901855b8281101561a42e5787860360ff190184528151805187528581015186880152604080820151908801526060808201519088015260809081015160a09188018290529061a41a81890183619c59565b97505050928401929084019060010161a3cc565b5050505050828103604084015261a4458186619be7565b9150506114b76060830184619cb7565b600f93840b81529190920b6020820152604081019190915260600190565b600f83900b81526080810161418a6020830184619c85565b60208082526024908201527f556e6973776170563353616d706c65722f746f6b656e5061746820746f6f20736040820152631a1bdc9d60e21b606082015260800190565b60208082526025908201527f455243323042726964676553616d706c65722f494e56414c49445f544f4b454e6040820152642fa820a4a960d91b606082015260800190565b60208082526025908201527f556e6973776170563353616d706c65722f696e76616c69642070617468206c656040820152646e6774687360d81b606082015260800190565b6020808252601e908201527f4b79626572444d4d53616d706c65722f4e4f5f504f4f4c535f464f554e440000604082015260600190565b600061a59c8287619c85565b84600f0b606083015283600f0b608083015260c060a08301526168b960c0830184619c2a565b60006060825261a5d56060830186619cec565b828103602084015261a5e78186619cec565b915050826040830152949350505050565b60006080825261a60b6080830187619d0b565b6001600160a01b0395861660208401529390941660408201526060015292915050565b60006080825261a6416080830187619d0b565b6020830195909552506001600160a01b0392831660408201529116606090910152919050565b610200810161a6768285619d58565b61418a610180830184619e29565b610220810161a6938286619d58565b61a6a1610180830185619e29565b6001600160a01b0392909216610200919091015292915050565b6000838252604060208301526114496040830184619be7565b60008482526060602083015261a6ed6060830185619be7565b82810360408401526168b98185619be7565b6000858252602060808184015261a7196080840187619be7565b838103604085015285518082528282019083810283018401848901865b8381101561a76457601f1986840301855261a752838351619c59565b9487019492509086019060010161a736565b5050868103606088015261a1308189619be7565b958652602086019490945260408501929092526060840152608083015260a082015260c00190565b6000808335601e1984360301811261a7b6578283fd5b8301803591506001600160401b0382111561a7cf578283fd5b60200191503681900382131561a7e457600080fd5b9250929050565b6040518181016001600160401b038111828210171561a80957600080fd5b604052919050565b60006001600160401b0382111561a826578081fd5b5060209081020190565b60006001600160401b0382111561a845578081fd5b50601f01601f191660200190565b60005b8381101561a86e57818101518382015260200161a856565b8381111561a87d576000848401525b50505050565b6004811061a88d57fe5b50565b6002811061a88d57fe5b6001600160a01b038116811461a88d57600080fd5b6001600160e01b03198116811461a88d57600080fd5b80600f0b811461a88d57600080fd5b6001600160801b038116811461a88d57600080fdfea26469706673582212206014bccea5486ac87f239bb6d04a82f70e47b30aaa0d5cd46fd94898718adbda64736f6c634300060c0033';
ERC20BridgeSamplerContract.contractName = 'ERC20BridgeSampler';
// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
//# sourceMappingURL=erc20_bridge_sampler.js.map