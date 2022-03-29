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
exports.TestERC20BridgeSamplerContract = void 0;
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
class TestERC20BridgeSamplerContract extends base_contract_1.BaseContract {
    constructor(address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode = TestERC20BridgeSamplerContract.deployedBytecode, encoderOverrides) {
        super('TestERC20BridgeSampler', TestERC20BridgeSamplerContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode, encoderOverrides);
        this._methodABIIndex = {};
        utils_1.classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
        TestERC20BridgeSamplerContract.ABI().forEach((item, index) => {
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
            return TestERC20BridgeSamplerContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly);
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
            const libraryAddresses = yield TestERC20BridgeSamplerContract._deployLibrariesAsync(artifact, libraryArtifacts, new web3_wrapper_1.Web3Wrapper(provider), txDefaults);
            const bytecode = base_contract_1.linkLibrariesInBytecode(artifact, libraryAddresses);
            return TestERC20BridgeSamplerContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly);
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
            utils_1.logUtils.log(`TestERC20BridgeSampler successfully deployed at ${txReceipt.contractAddress}`);
            const contractInstance = new TestERC20BridgeSamplerContract(txReceipt.contractAddress, provider, txDefaults, logDecodeDependencies);
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
                inputs: [],
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            {
                inputs: [],
                name: 'FAILURE_ADDRESS',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
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
                        name: 'tokenAddresses',
                        type: 'address[]',
                    },
                ],
                name: 'createTokenExchanges',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'enableFailTrigger',
                outputs: [],
                stateMutability: 'payable',
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
                inputs: [],
                name: 'eth2Dai',
                outputs: [
                    {
                        name: '',
                        type: 'address',
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
                        name: 'index_1',
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
                        name: 'index_2',
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
                inputs: [],
                name: 'kyber',
                outputs: [
                    {
                        name: '',
                        type: 'address',
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
            {
                inputs: [],
                name: 'uniswap',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'uniswapV2Router',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
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
                        yield TestERC20BridgeSamplerContract._deployLibrariesAsync(libraryArtifact, libraryArtifacts, web3Wrapper, txDefaults, libraryAddresses);
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
        const methodAbi = TestERC20BridgeSamplerContract.ABI()[index]; // tslint:disable-line:no-unnecessary-type-assertion
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
    FAILURE_ADDRESS() {
        const self = this;
        const functionSignature = 'FAILURE_ADDRESS()';
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
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    ;
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
    createTokenExchanges(tokenAddresses) {
        const self = this;
        assert_1.assert.isArray('tokenAddresses', tokenAddresses);
        const functionSignature = 'createTokenExchanges(address[])';
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
                return self._strictEncodeArguments(functionSignature, [tokenAddresses
                ]);
            },
        };
    }
    ;
    enableFailTrigger() {
        const self = this;
        const functionSignature = 'enableFailTrigger()';
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
                return self._strictEncodeArguments(functionSignature, []);
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
    eth2Dai() {
        const self = this;
        const functionSignature = 'eth2Dai()';
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
                return self._strictEncodeArguments(functionSignature, []);
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
    getLimitOrderFillableTakerAmount(order, index_1, index_2) {
        const self = this;
        assert_1.assert.isString('index_2', index_2);
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
                    index_1,
                    index_2.toLowerCase()
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
    kyber() {
        const self = this;
        const functionSignature = 'kyber()';
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
                return self._strictEncodeArguments(functionSignature, []);
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
    uniswap() {
        const self = this;
        const functionSignature = 'uniswap()';
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
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    ;
    uniswapV2Router() {
        const self = this;
        const functionSignature = 'uniswapV2Router()';
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
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    ;
}
exports.TestERC20BridgeSamplerContract = TestERC20BridgeSamplerContract;
/**
 * @ignore
 */
TestERC20BridgeSamplerContract.deployedBytecode = '0x6080604052600436106103a25760003560e01c80637f7f4f13116101e7578063bd71ecf61161010d578063ddd5aa28116100a0578063f3868e9c1161006f578063f3868e9c146105f7578063f5a4994d14610b42578063fc9fe41b14610b62578063fea12a0314610b82576103a2565b8063ddd5aa2814610ac2578063e78ac04514610ae2578063e8e4af0914610b02578063f1ed7fa414610b22576103a2565b8063c94706d8116100dc578063c94706d814610a4d578063cc1621c914610a6d578063cd72d78914610a8d578063d9bca37214610aa2576103a2565b8063bd71ecf6146109cd578063c25c4138146109ed578063c831908414610a0d578063c8c74a3714610a2d576103a2565b80639ea0ff1311610185578063a75e744b11610154578063a75e744b1461093f578063ab0002761461095f578063adc636bf1461097f578063b90cd2fb146109ad576103a2565b80639ea0ff13146108ca578063a0295b8b146108ea578063a2d10ba51461090a578063a46984171461091f576103a2565b80639209483b116101c15780639209483b1461082e578063987777481461084e5780639bf3ee351461086e5780639e3f05c31461089b576103a2565b80637f7f4f13146107bf5780638b6d7b44146107df5780638e5a0e07146107ff576103a2565b80633105fec1116102cc5780635505000a1161026a57806366a1ac6b1161023957806366a1ac6b1461073257806368be3cf214610752578063706e2f9b1461077f57806374c9d2551461079f576103a2565b80635505000a146106a457806357494b1d146106d25780635aae4e53146106f25780635d5b674f14610712576103a2565b80633c883dba116102a65780633c883dba1461061757806340bc03ae14610637578063494569db146106575780634edfb5b214610677576103a2565b80633105fec1146105b757806331268657146105d757806336052391146105f7576103a2565b80632339078f1161034457806329fa4aa01161031357806329fa4aa0146105285780632aa64319146105485780632d753aa41461057757806330d6570d14610597576103a2565b80632339078f146104b3578063252322b3146104d35780632681f7e4146104f3578063281e343214610508576103a2565b806311f2928b1161038057806311f2928b1461042b578063149dab0e1461043557806316279055146104645780631694505e14610491576103a2565b806301cb0ef7146103a75780630496d5dc146103dd5780631022742b1461040b575b600080fd5b3480156103b357600080fd5b506103c76103c2366004619c0b565b610b97565b6040516103d4919061a5fa565b60405180910390f35b3480156103e957600080fd5b506103fd6103f83660046193f4565b610d32565b6040516103d492919061a4d6565b34801561041757600080fd5b506103c76104263660046197f8565b610ed8565b61043361104b565b005b34801561044157600080fd5b50610455610450366004619a79565b61108e565b6040516103d49392919061a357565b34801561047057600080fd5b5061048461047f3660046190cb565b6111ee565b6040516103d4919061a60d565b34801561049d57600080fd5b506104a66111f8565b6040516103d4919061a1c6565b3480156104bf57600080fd5b506103c76104ce3660046199fa565b611207565b3480156104df57600080fd5b506103c76104ee366004619332565b61142e565b3480156104ff57600080fd5b506104a6611604565b34801561051457600080fd5b506103c7610523366004619e45565b611613565b34801561053457600080fd5b506103c7610543366004619b83565b611868565b34801561055457600080fd5b50610568610563366004619bdc565b6118d7565b6040516103d49392919061a618565b34801561058357600080fd5b506103c76105923660046192ad565b611bb4565b3480156105a357600080fd5b506103c76105b2366004619332565b611d3d565b3480156105c357600080fd5b506103c76105d23660046193f4565b611eb1565b3480156105e357600080fd5b506104336105f236600461949f565b612035565b34801561060357600080fd5b506103c7610612366004619bdc565b61209d565b34801561062357600080fd5b506103c7610632366004619c0b565b61212f565b34801561064357600080fd5b506103c7610652366004619b83565b6122b9565b34801561066357600080fd5b506103fd6106723660046193f4565b61243a565b34801561068357600080fd5b50610697610692366004619da7565b6125c6565b6040516103d4919061a666565b3480156106b057600080fd5b506106c46106bf366004619963565b612843565b6040516103d492919061a51d565b3480156106de57600080fd5b506103c76106ed366004619332565b612a8e565b3480156106fe57600080fd5b506106c461070d366004619963565b613005565b34801561071e57600080fd5b506103c761072d366004619332565b61324a565b34801561073e57600080fd5b506103c761074d3660046197f8565b6132b0565b34801561075e57600080fd5b5061077261076d36600461949f565b613365565b6040516103d4919061a585565b34801561078b57600080fd5b506103c761079a3660046196a9565b6134c6565b3480156107ab57600080fd5b506104556107ba366004619a79565b6135b8565b3480156107cb57600080fd5b506103c76107da366004619e45565b6135c7565b3480156107eb57600080fd5b506103c76107fa366004619b83565b613814565b34801561080b57600080fd5b5061081f61081a366004619640565b613b77565b6040516103d49392919061a915565b34801561083a57600080fd5b506103c7610849366004619b83565b613d90565b34801561085a57600080fd5b506103c7610869366004619332565b613f90565b34801561087a57600080fd5b5061088e610889366004619e05565b6144c9565b6040516103d4919061a644565b3480156108a757600080fd5b506108bb6108b6366004619cf0565b61451a565b6040516103d49392919061a64d565b3480156108d657600080fd5b5061088e6108e53660046193a4565b614640565b3480156108f657600080fd5b506103c76109053660046199fa565b614856565b34801561091657600080fd5b506104a6614a52565b34801561092b57600080fd5b506103c761093a366004619332565b614a61565b34801561094b57600080fd5b5061056861095a366004619466565b614bb6565b34801561096b57600080fd5b506103c761097a366004619332565b614cf3565b34801561098b57600080fd5b5061099f61099a366004619332565b614e51565b6040516103d492919061a6b4565b3480156109b957600080fd5b506103c76109c8366004619332565b614fa1565b3480156109d957600080fd5b506103c76109e83660046196db565b615007565b3480156109f957600080fd5b506103c7610a08366004619332565b615103565b348015610a1957600080fd5b506103c7610a28366004619332565b615169565b348015610a3957600080fd5b506103c7610a483660046193f4565b615326565b348015610a5957600080fd5b506103c7610a68366004619332565b615492565b348015610a7957600080fd5b506108bb610a88366004619cf0565b6155f0565b348015610a9957600080fd5b506104a66157d6565b348015610aae57600080fd5b50610568610abd366004619466565b6157ee565b348015610ace57600080fd5b50610568610add366004619bdc565b6158dd565b348015610aee57600080fd5b506103c7610afd36600461971f565b615b70565b348015610b0e57600080fd5b506103c7610b1d366004619332565b615c65565b348015610b2e57600080fd5b5061088e610b3d366004619d60565b615d98565b348015610b4e57600080fd5b5061099f610b5d366004619332565b615f37565b348015610b6e57600080fd5b5061081f610b7d366004619640565b616023565b348015610b8e57600080fd5b506104a6616238565b608081015151606090806001600160401b0381118015610bb657600080fd5b50604051908082528060200260200182016040528015610be0578160200160208202803683370190505b50915060005b81811015610d2b5783600001516001600160a01b031663846ee14b620249f086608001518481518110610c1557fe5b60200260200101518760200151886040015189606001516040518663ffffffff1660e01b8152600401610c4b949392919061aaf3565b60006040518083038187803b158015610c6357600080fd5b5086fa93505050508015610c9957506040513d6000823e601f3d908101601f19168201604052610c9691908101906198c7565b60015b610cd3573d808015610cc7576040519150601f19603f3d011682016040523d82523d6000602084013e610ccc565b606091505b5050610d2b565b80600081518110610ce057fe5b6020026020010151848381518110610cf457fe5b602002602001018181525050838281518110610d0c57fe5b602002602001015160001415610d225750610d2b565b50600101610be6565b5050919050565b80516060908190806001600160401b0381118015610d4f57600080fd5b50604051908082528060200260200182016040528015610d79578160200160208202803683370190505b509150610d868686616247565b9250825160001415610d985750610ed0565b60005b81811015610ecd57866001600160a01b031663a8312b1d620249f0878481518110610dc257fe5b6020026020010151878a6040518563ffffffff1660e01b8152600401610dea9392919061aac8565b60006040518083038187803b158015610e0257600080fd5b5086fa93505050508015610e3857506040513d6000823e601f3d908101601f19168201604052610e3591908101906198c7565b60015b610e72573d808015610e66576040519150601f19603f3d011682016040523d82523d6000602084013e610e6b565b606091505b5050610ecd565b80600188510381518110610e8257fe5b6020026020010151848381518110610e9657fe5b602002602001018181525050838281518110610eae57fe5b602002602001015160001415610ec45750610ecd565b50600101610d9b565b50505b935093915050565b606083516001600160401b0381118015610ef157600080fd5b50604051908082528060200260200182016040528015610f1b578160200160208202803683370190505b50905060005b8451811461104357306001600160a01b0316639bf3ee3562030d40878481518110610f4857fe5b6020026020010151878581518110610f5c57fe5b6020026020010151876040518563ffffffff1660e01b8152600401610f839392919061a9ba565b60206040518083038187803b158015610f9b57600080fd5b5086fa93505050508015610fcc575060408051601f3d908101601f19168201909252610fc991810190619919565b60015b611020573d808015610ffa576040519150601f19603f3d011682016040523d82523d6000602084013e610fff565b606091505b50600083838151811061100e57fe5b6020026020010181815250505061103b565b8083838151811061102d57fe5b602002602001018181525050505b600101610f21565b509392505050565b60405173e9db8717bc5dfb20aaf538b4a5a02b7791ff430c903480156108fc02916000818181858888f1935050505015801561108b573d6000803e3d6000fd5b50565b6000606080866020015151600014156110a6576111e4565b6110b287878787616536565b855191945092506001600160401b03811180156110ce57600080fd5b506040519080825280602002602001820160405280156110f8578160200160208202803683370190505b50905060005b81518110156111e257836001600160a01b0316637f9c0ecd620493e08588858151811061112757fe5b60200260200101516040518463ffffffff1660e01b815260040161114c92919061a4fb565b60206040518083038187803b15801561116457600080fd5b5086fa93505050508015611195575060408051601f3d908101601f1916820190925261119291810190619919565b60015b61119e576111e2565b808383815181106111ab57fe5b6020026020010181815250508282815181106111c357fe5b6020026020010151600014156111d957506111e2565b506001016110fe565b505b9450945094915050565b803b15155b919050565b6001546001600160a01b031681565b60606112138385616768565b60208501516040805160028082526060828101909352816020016020820280368337019050509050858160008151811061124957fe5b60200260200101906001600160a01b031690816001600160a01b031681525050848160018151811061127757fe5b6001600160a01b03909216602092830291909101909101528351806001600160401b03811180156112a757600080fd5b506040519080825280602002602001820160405280156112d1578160200160208202803683370190505b5093506112dc618940565b6112e461679e565b905060005b828110156114215760606113108b89848151811061130357fe5b60200260200101516167cd565b604051637c26833760e11b81529091506001600160a01b0387169063f84d066e906113469060009085908a90899060040161a71a565b600060405180830381600087803b15801561136057600080fd5b505af192505050801561139557506040513d6000823e601f3d908101601f191682016040526113929190810190619775565b60015b6113d0573d8080156113c3576040519150601f19603f3d011682016040523d82523d6000602084013e6113c8565b606091505b505050611421565b6000816001815181106113df57fe5b6020026020010151600019029050600081136113fd57505050611421565b8089858151811061140a57fe5b6020026020010181815250505050506001016112e9565b5050505050949350505050565b606061143a8385616768565b8151806001600160401b038111801561145257600080fd5b5060405190808252806020026020018201604052801561147c578160200160208202803683370190505b50915060006001600160a01b0386161561149f5761149a878761685f565b6114a2565b60005b905060006001600160a01b038616156114c4576114bf888761685f565b6114c7565b60005b905060005b838110156115f85760016001600160a01b03881661152a5761150984632640f62c60e01b8985815181106114fc57fe5b60200260200101516168de565b87848151811061151557fe5b602002602001018193508281525050506115c4565b6001600160a01b03891661155057611509836359e9486260e01b8985815181106114fc57fe5b600061156a846359e9486260e01b8a86815181106114fc57fe5b9250905080156115a757611586856309903d8b60e21b836168de565b88858151811061159257fe5b602002602001018194508281525050506115c2565b60008784815181106115b557fe5b6020026020010181815250505b505b8015806115e457508582815181106115d857fe5b60200260200101516000145b156115ef57506115f8565b506001016114cc565b50505050949350505050565b6000546001600160a01b031681565b606061161f8385616768565b6000856000015190506000816001600160a01b03166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b15801561166357600080fd5b505afa158015611677573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061169b91906190e7565b8451909150806001600160401b03811180156116b657600080fd5b506040519080825280602002602001820160405280156116e0578160200160208202803683370190505b509350826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b15801561171c57600080fd5b505afa158015611730573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061175491906190e7565b6001600160a01b0316866001600160a01b0316141580156117f75750826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b1580156117a957600080fd5b505afa1580156117bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117e191906190e7565b6001600160a01b0316876001600160a01b031614155b1561180457505050611860565b60005b818110156115f85760006118328a898b8a868151811061182357fe5b602002602001015189896169c1565b90508061183f57506115f8565b8086838151811061184c57fe5b602090810291909101015250600101611807565b949350505050565b6040805160608181019092526118ce908061188786896080840161a7c6565b604051602081830303815290604052815260200186886040516020016118ae92919061a7c6565b6040516020818303038152906040528152602001616c8281525083616db5565b95945050505050565b60008060606118e68587616768565b8351806001600160401b03811180156118fe57600080fd5b50604051908082528060200260200182016040528015611928578160200160208202803683370190505b508851604051630939d86360e11b81529193506001600160a01b031690631273b0c69061195b908a908a9060040161a1f3565b60206040518083038186803b15801561197357600080fd5b505afa158015611987573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119ab91906190e7565b925060006001600160a01b038416156119c957506001935086611a68565b8851604051630939d86360e11b81526001600160a01b0390911690631273b0c6906119fa908a908c9060040161a1f3565b60206040518083038186803b158015611a1257600080fd5b505afa158015611a26573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a4a91906190e7565b93506001600160a01b038416611a615750506111e4565b5060009350855b836001600160a01b031663dd58b41c6040518163ffffffff1660e01b815260040160206040518083038186803b158015611aa157600080fd5b505afa158015611ab5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ad991906198f9565b611ae45750506111e4565b60005b82811015611ba7576000611b618a87858e60200151604051602001611b0f949392919061a20d565b6040516020818303038152906040528a88868f60200151604051602001611b39949392919061a20d565b6040516020818303038152906040528a8581518110611b5457fe5b6020026020010151616fb2565b905080858381518110611b7057fe5b602002602001018181525050848281518110611b8857fe5b602002602001015160001415611b9e5750611ba7565b50600101611ae7565b5050509450945094915050565b8051606090806001600160401b0381118015611bcf57600080fd5b50604051908082528060200260200182016040528015611bf9578160200160208202803683370190505b5091506001600160a01b038716611c1057506118ce565b60005b81811015611d325760006060896001600160a01b031662061a80636e79e13360e01b8b8b8b8b8981518110611c4457fe5b6020026020010151604051602401611c5f949392919061a26c565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051611c9d919061a1aa565b6000604051808303818686fa925050503d8060008114611cd9576040519150601f19603f3d011682016040523d82523d6000602084013e611cde565b606091505b509150915060008215611d025781806020019051810190611cff9190619919565b90505b80611d0f57505050611d32565b80868581518110611d1c57fe5b6020908102919091010152505050600101611c13565b505095945050505050565b6060611d498385616768565b8151806001600160401b0381118015611d6157600080fd5b50604051908082528060200260200182016040528015611d8b578160200160208202803683370190505b50915060005b81811015611ea757866001600160a01b03166372ea9076620c35008888888681518110611dba57fe5b60200260200101516040518563ffffffff1660e01b8152600401611de09392919061a2ee565b60206040518083038187803b158015611df857600080fd5b5086fa93505050508015611e29575060408051601f3d908101601f19168201909252611e2691810190619919565b60015b611e63573d808015611e57576040519150601f19603f3d011682016040523d82523d6000602084013e611e5c565b606091505b5050611ea7565b80848381518110611e7057fe5b602002602001018181525050838281518110611e8857fe5b602002602001015160001415611e9e5750611ea7565b50600101611d91565b5050949350505050565b8051606090806001600160401b0381118015611ecc57600080fd5b50604051908082528060200260200182016040528015611ef6578160200160208202803683370190505b50915060005b8181101561202c57856001600160a01b031663d06ca61f620249f0868481518110611f2357fe5b6020026020010151886040518463ffffffff1660e01b8152600401611f4992919061aaaf565b60006040518083038187803b158015611f6157600080fd5b5086fa93505050508015611f9757506040513d6000823e601f3d908101601f19168201604052611f9491908101906198c7565b60015b611fd1573d808015611fc5576040519150601f19603f3d011682016040523d82523d6000602084013e611fca565b606091505b505061202c565b80600187510381518110611fe157fe5b6020026020010151848381518110611ff557fe5b60200260200101818152505083828151811061200d57fe5b602002602001015160001415612023575061202c565b50600101611efc565b50509392505050565b600054604051633126865760e01b81526001600160a01b0390911690633126865790612067908590859060040161a488565b600060405180830381600087803b15801561208157600080fd5b505af1158015612095573d6000803e3d6000fd5b505050505050565b60606120a98385616768565b84602001516001600160a01b0316846001600160a01b03161415806120db575084516001600160a01b03848116911614155b156110435781516060816001600160401b03811180156120fa57600080fd5b50604051908082528060200260200182016040528015612124578160200160208202803683370190505b509250611860915050565b608081015151606090806001600160401b038111801561214e57600080fd5b50604051908082528060200260200182016040528015612178578160200160208202803683370190505b50915060005b81811015610d2b5783600001516001600160a01b0316633bbc8a1e856080015183815181106121a957fe5b60200260200101518660200151876040015188606001516040518563ffffffff1660e01b81526004016121df949392919061aaf3565b60006040518083038186803b1580156121f757600080fd5b505afa92505050801561222c57506040513d6000823e601f3d908101601f1916820160405261222991908101906198c7565b60015b61225a573d808015610cc7576040519150601f19603f3d011682016040523d82523d6000602084013e610ccc565b806001866020015151038151811061226e57fe5b602002602001015184838151811061228257fe5b60200260200101818152505083828151811061229a57fe5b6020026020010151600014156122b05750610d2b565b5060010161217e565b8051606090806001600160401b03811180156122d457600080fd5b506040519080825280602002602001820160405280156122fe578160200160208202803683370190505b50915060005b81811015611ea7576000606088600001516001600160a01b0316621e84808a602001518a8a8a888151811061233557fe5b602002602001015160405160240161234f9392919061a7a8565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161238d919061a1aa565b6000604051808303818686fa925050503d80600081146123c9576040519150601f19603f3d011682016040523d82523d6000602084013e6123ce565b606091505b5091509150600082156123f257818060200190518101906123ef9190619919565b90505b808685815181106123ff57fe5b60200260200101818152505085848151811061241757fe5b60200260200101516000141561242f57505050611ea7565b505050600101612304565b80516060908190806001600160401b038111801561245757600080fd5b50604051908082528060200260200182016040528015612481578160200160208202803683370190505b50915061248e8686616247565b92508251600014156124a05750610ed0565b60005b81811015610ecd57866001600160a01b0316639e269b68620249f08784815181106124ca57fe5b6020026020010151878a6040518563ffffffff1660e01b81526004016124f29392919061aac8565b60006040518083038187803b15801561250a57600080fd5b5086fa9350505050801561254057506040513d6000823e601f3d908101601f1916820160405261253d91908101906198c7565b60015b61256e573d808015610e66576040519150601f19603f3d011682016040523d82523d6000602084013e610e6b565b8060008151811061257b57fe5b602002602001015184838151811061258f57fe5b6020026020010181815250508382815181106125a757fe5b6020026020010151600014156125bd5750610ecd565b506001016124a3565b602084810151604080516001808252818301909252606093849290828101908036833701905050905085816000815181106125fd57fe5b602090810291909101015260606000604051908082528060200260200182016040528015612635578160200160208202803683370190505b50905087606001516001600160a01b0316866001600160a01b03161415612726576040516381efcbdd60e01b81526001600160a01b038416906381efcbdd906207a1209061268e9089906001908890889060040161a38d565b60006040518083038187803b1580156126a657600080fd5b5086fa935050505080156126dc57506040513d6000823e601f3d908101601f191682016040526126d99190810190619931565b60015b612716573d80801561270a576040519150601f19603f3d011682016040523d82523d6000602084013e61270f565b606091505b5050612721565b935061186092505050565b612838565b87606001516001600160a01b0316856001600160a01b0316141561277c576040516361e597f960e01b81526001600160a01b038416906361e597f9906207a1209061268e908a906001908890889060040161a38d565b6040516302b9a6cd60e11b81526001600160a01b038416906305734d9a906207a120906127bc908a90600190889088908d9084908490849060040161a3cf565b60006040518083038187803b1580156127d457600080fd5b5086fa9350505050801561280a57506040513d6000823e601f3d908101601f191682016040526128079190810190619931565b60015b612716573d808015611421576040519150601f19603f3d011682016040523d82523d6000602084013e611421565b505050949350505050565b60608060606128c4866001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b15801561288457600080fd5b505afa158015612898573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128bc91906190e7565b8660006170eb565b905083516001600160401b03811180156128dd57600080fd5b50604051908082528060200260200182016040528015612907578160200160208202803683370190505b50915083516001600160401b038111801561292157600080fd5b5060405190808252806020026020018201604052801561295557816020015b60608152602001906001900390816129405790505b50925060005b8451811015610ecd5760606000805b8451811015612a465760606129928a87848151811061298557fe5b6020026020010151617581565b90508a6001600160a01b031663cdca1753620493e0838c89815181106129b457fe5b60200260200101516040518463ffffffff1660e01b81526004016129d992919061a679565b602060405180830381600088803b1580156129f357600080fd5b5087f193505050508015612a24575060408051601f3d908101601f19168201909252612a2191810190619919565b60015b612a2d57612a3d565b808411612a3b578093508194505b505b5060010161296a565b5080612a53575050610ecd565b80858481518110612a6057fe5b60200260200101818152505081868481518110612a7957fe5b6020908102919091010152505060010161295b565b80516060908590806001600160401b0381118015612aab57600080fd5b50604051908082528060200260200182016040528015612ad5578160200160208202803683370190505b50604051630bcded8960e21b81529093506001600160a01b03831690632f37b62490612b0590899060040161a1c6565b60206040518083038186803b158015612b1d57600080fd5b505afa158015612b31573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b5591906198f9565b1580612bda5750604051630bcded8960e21b81526001600160a01b03831690632f37b62490612b8890889060040161a1c6565b60206040518083038186803b158015612ba057600080fd5b505afa158015612bb4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612bd891906198f9565b155b15612be6575050611860565b612bee618967565b60405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f90612c1a908a9060040161a1c6565b60206040518083038186803b158015612c3257600080fd5b505afa158015612c46573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612c6a9190619919565b815260405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f90612c9890899060040161a1c6565b60206040518083038186803b158015612cb057600080fd5b505afa158015612cc4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ce89190619919565b6020820152604051634a46c67360e11b81526001600160a01b0384169063948d8ce690612d19908a9060040161a1c6565b60206040518083038186803b158015612d3157600080fd5b505afa158015612d45573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612d699190619919565b60408083019190915251634a46c67360e11b81526001600160a01b0384169063948d8ce690612d9c90899060040161a1c6565b60206040518083038186803b158015612db457600080fd5b505afa158015612dc8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612dec9190619919565b816060018181525050826001600160a01b031663d4cadf686040518163ffffffff1660e01b815260040160206040518083038186803b158015612e2e57600080fd5b505afa158015612e42573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612e669190619919565b608082015260005b828110156115f857612e9982602001516003670de0b6b3a764000081612e9057fe5b046001016176dc565b868281518110612ea557fe5b60200260200101511115612eb8576115f8565b836001600160a01b031663f8d6aed4620493e084600001518560400151866020015187606001518c8881518110612eeb57fe5b602002602001015189608001516040518863ffffffff1660e01b8152600401612f199695949392919061ab6c565b60206040518083038187803b158015612f3157600080fd5b5086fa93505050508015612f62575060408051601f3d908101601f19168201909252612f5f91810190619919565b60015b612f9c573d808015612f90576040519150601f19603f3d011682016040523d82523d6000602084013e612f95565b606091505b50506115f8565b8251612fb4906002670de0b6b3a76400005b046176dc565b811115612fc157506115f8565b80868381518110612fce57fe5b602002602001018181525050858281518110612fe657fe5b602002602001015160001415612ffc57506115f8565b50600101612e6e565b6060806060613046866001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b15801561288457600080fd5b9050606061305386617739565b905084516001600160401b038111801561306c57600080fd5b50604051908082528060200260200182016040528015613096578160200160208202803683370190505b50925084516001600160401b03811180156130b057600080fd5b506040519080825280602002602001820160405280156130e457816020015b60608152602001906001900390816130cf5790505b50935060005b855181101561323f5760606000805b85518110156131f75760606131298661312489858151811061311757fe5b60200260200101516177d1565b617581565b90508b6001600160a01b0316632f80bb1d620493e0838d898151811061314b57fe5b60200260200101516040518463ffffffff1660e01b815260040161317092919061a679565b602060405180830381600088803b15801561318a57600080fd5b5087f1935050505080156131bb575060408051601f3d908101601f191682019092526131b891810190619919565b60015b6131c4576131ee565b8315806131d15750808410155b156131ec578093506131e98c89858151811061298557fe5b94505b505b506001016130f9565b508061320457505061323f565b8086848151811061321157fe5b6020026020010181815250508187848151811061322a57fe5b602090810291909101015250506001016130ea565b505050935093915050565b6040805160608181019092526118ce908061326986896080840161a1f3565b6040516020818303038152906040528152602001868860405160200161329092919061a1f3565b604051602081830303815290604052815260200161786981525083616db5565b60606132bd848484610ed8565b905060005b8451811015611043578181815181106132d757fe5b602002602001015160001461335d576133448282815181106132f557fe5b602002602001015186838151811061330957fe5b6020026020010151606001516001600160801b031687848151811061332a57fe5b6020026020010151604001516001600160801b031661797d565b82828151811061335057fe5b6020026020010181815250505b6001016132c2565b6060816001600160401b038111801561337d57600080fd5b506040519080825280602002602001820160405280156133b757816020015b6133a4618996565b81526020019060019003908161339c5790505b50905060005b8083146134bf5760018282815181106133d257fe5b6020908102919091018101519115159101528383828181106133f057fe5b9050602002810190613402919061ab94565b1515905061340f576134b7565b3084848381811061341c57fe5b905060200281019061342e919061ab94565b60405161343c92919061a19a565b6000604051808303816000865af19150503d8060008114613479576040519150601f19603f3d011682016040523d82523d6000602084013e61347e565b606091505b5083838151811061348b57fe5b60200260200101516020018484815181106134a257fe5b60209081029190910101519190915290151590525b6001016133bd565b5092915050565b606081516001600160401b03811180156134df57600080fd5b50604051908082528060200260200182016040528015613509578160200160208202803683370190505b50905060005b825181146135b2577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031683828151811061354d57fe5b60200260200101516001600160a01b03161461358d5761358883828151811061357257fe5b60200260200101516001600160a01b03166179a1565b613590565b60125b60ff1682828151811061359f57fe5b602090810291909101015260010161350f565b50919050565b60006060809450945094915050565b60606135d38385616768565b6000856000015190506000816001600160a01b03166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b15801561361757600080fd5b505afa15801561362b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061364f91906190e7565b8451909150806001600160401b038111801561366a57600080fd5b50604051908082528060200260200182016040528015613694578160200160208202803683370190505b509350826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b1580156136d057600080fd5b505afa1580156136e4573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061370891906190e7565b6001600160a01b0316866001600160a01b0316141580156137ab5750826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b15801561375d57600080fd5b505afa158015613771573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061379591906190e7565b6001600160a01b0316876001600160a01b031614155b156137b857505050611860565b60005b818110156115f85760006137e68a898b8a86815181106137d757fe5b60200260200101518989617a43565b9050806137f357506115f8565b8086838151811061380057fe5b6020908102919091010152506001016137bb565b6060600085600001516001600160a01b031663bbd7f25585600f0b6040518263ffffffff1660e01b815260040161384b919061a644565b60206040518083038186803b15801561386357600080fd5b505afa158015613877573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061389b9190619919565b8651604051631e01043960e01b81526001600160a01b0390911690631e010439906138ce90600f89900b9060040161a644565b60206040518083038186803b1580156138e657600080fd5b505afa1580156138fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061391e9190619919565b039050600086600001516001600160a01b031663c582951486600f0b6040518263ffffffff1660e01b8152600401613956919061a644565b60806040518083038186803b15801561396e57600080fd5b505afa158015613982573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906139a69190619f03565b935050505080601203600a0a82816139ba57fe5b85519190049250806001600160401b03811180156139d757600080fd5b50604051908082528060200260200182016040528015613a01578160200160208202803683370190505b50935060005b818110156115f857600060608a600001516001600160a01b0316620927c08c602001518c8c8c8881518110613a3857fe5b6020026020010151604051602401613a529392919061a7a8565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613a90919061a1aa565b6000604051808303818686fa925050503d8060008114613acc576040519150601f19603f3d011682016040523d82523d6000602084013e613ad1565b606091505b509150915060008215613af55781806020019051810190613af29190619919565b90505b868110613b2f57835b85811015613b265787898281518110613b1357fe5b6020908102919091010152600101613afe565b505050506115f8565b80888581518110613b3c57fe5b602002602001018181525050878481518110613b5457fe5b602002602001015160001415613b6c575050506115f8565b505050600101613a07565b613b7f6189ae565b613b876189ae565b600080805b87518114613c8c57613bd36020898381518110613ba557fe5b60200260200101515103878a8481518110613bbc57fe5b6020026020010151617cd59092919063ffffffff16565b60006060306001600160a01b03168a8481518110613bed57fe5b6020026020010151604051613c02919061a1aa565b6000604051808303816000865af19150503d8060008114613c3f576040519150601f19603f3d011682016040523d82523d6000602084013e613c44565b606091505b50915091508115613c82576000613c68602083510383617ce590919063ffffffff16565b905084811115613c8057838852602088018290529350835b505b5050600101613b8c565b5080613c985750613d87565b60005b86518114613d8457613ccb6020888381518110613cb457fe5b6020026020010151510383898481518110613bbc57fe5b60006060306001600160a01b0316898481518110613ce557fe5b6020026020010151604051613cfa919061a1aa565b6000604051808303816000865af19150503d8060008114613d37576040519150601f19603f3d011682016040523d82523d6000602084013e613d3c565b606091505b50915091508115613d7a576000613d60602083510383617ce590919063ffffffff16565b905085811115613d7857838752602087018290529450845b505b5050600101613c9b565b50505b93509350939050565b60408401516060906001600160e01b031916613e12576040805160608101909152613e0b9080613dc486896080840161a7c6565b60405160208183030381529060405281526020018688604051602001613deb92919061a7c6565b6040516020818303038152906040528152602001617cf181525083616db5565b9050611860565b8151806001600160401b0381118015613e2a57600080fd5b50604051908082528060200260200182016040528015613e54578160200160208202803683370190505b50915060005b81811015611ea7576000606088600001516001600160a01b0316621e84808a604001518a8a8a8881518110613e8b57fe5b6020026020010151604051602401613ea59392919061a7a8565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613ee3919061a1aa565b6000604051808303818686fa925050503d8060008114613f1f576040519150601f19603f3d011682016040523d82523d6000602084013e613f24565b606091505b509150915060008215613f485781806020019051810190613f459190619919565b90505b80868581518110613f5557fe5b602002602001018181525050858481518110613f6d57fe5b602002602001015160001415613f8557505050611ea7565b505050600101613e5a565b80516060908590806001600160401b0381118015613fad57600080fd5b50604051908082528060200260200182016040528015613fd7578160200160208202803683370190505b50604051630bcded8960e21b81529093506001600160a01b03831690632f37b6249061400790899060040161a1c6565b60206040518083038186803b15801561401f57600080fd5b505afa158015614033573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061405791906198f9565b15806140dc5750604051630bcded8960e21b81526001600160a01b03831690632f37b6249061408a90889060040161a1c6565b60206040518083038186803b1580156140a257600080fd5b505afa1580156140b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906140da91906198f9565b155b156140e8575050611860565b6140f0618967565b60405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f9061411c908a9060040161a1c6565b60206040518083038186803b15801561413457600080fd5b505afa158015614148573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061416c9190619919565b815260405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f9061419a90899060040161a1c6565b60206040518083038186803b1580156141b257600080fd5b505afa1580156141c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906141ea9190619919565b6020820152604051634a46c67360e11b81526001600160a01b0384169063948d8ce69061421b908a9060040161a1c6565b60206040518083038186803b15801561423357600080fd5b505afa158015614247573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061426b9190619919565b60408083019190915251634a46c67360e11b81526001600160a01b0384169063948d8ce69061429e90899060040161a1c6565b60206040518083038186803b1580156142b657600080fd5b505afa1580156142ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906142ee9190619919565b816060018181525050826001600160a01b031663d4cadf686040518163ffffffff1660e01b815260040160206040518083038186803b15801561433057600080fd5b505afa158015614344573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906143689190619919565b608082015260005b828110156115f857815161438e906002670de0b6b3a7640000612fae565b86828151811061439a57fe5b602002602001015111156143ad576115f8565b836001600160a01b031663ba9530a6620493e084600001518560400151866020015187606001518c88815181106143e057fe5b602002602001015189608001516040518863ffffffff1660e01b815260040161440e9695949392919061ab6c565b60206040518083038187803b15801561442657600080fd5b5086fa93505050508015614457575060408051601f3d908101601f1916820190925261445491810190619919565b60015b614485573d808015612f90576040519150601f19603f3d011682016040523d82523d6000602084013e612f95565b8086838151811061449257fe5b6020026020010181815250508582815181106144aa57fe5b6020026020010151600014156144c057506115f8565b50600101614370565b600083606001516001600160801b03168461016001516040516020016144ef919061a644565b6040516020818303038152906040528051906020012060001c8161450f57fe5b0690505b9392505050565b60006060806145298587616768565b614534878787617d45565b925082614540576111e4565b60405163276fdad960e11b81523090634edfb5b290614569908a9087908b908b9060040161a981565b60006040518083038186803b15801561458157600080fd5b505afa158015614595573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526145bd9190810190619931565b8760800181905250866080015191506146346040518060600160405280878a6040516020016145ed92919061a464565b6040516020818303038152906040528152602001888a60405160200161461492919061a464565b6040516020818303038152906040528152602001617eac81525085616db5565b90509450945094915050565b600080856001600160a01b031663901754d786866040518363ffffffff1660e01b815260040161467192919061a1f3565b60206040518083038186803b15801561468957600080fd5b505afa15801561469d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906146c191906190e7565b90506001600160a01b0381166146db576000915050611860565b60006001600160a01b0386161561476d576040516370a0823160e01b81526001600160a01b038716906370a082319061471890859060040161a1c6565b60206040518083038186803b15801561473057600080fd5b505afa158015614744573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906147689190619919565b614779565b816001600160a01b0316315b90508381101561478e57600092505050611860565b6040516303c2803f60e31b81526001600160a01b03831690631e1401f890620249f0906147c3908a908a908a9060040161a2ee565b60206040518083038187803b1580156147db57600080fd5b5086fa9350505050801561480c575060408051601f3d908101601f1916820190925261480991810190619919565b60015b61484c573d80801561483a576040519150601f19603f3d011682016040523d82523d6000602084013e61483f565b606091505b5060009350505050611860565b9250611860915050565b60606148628385616768565b60208501516040805160028082526060828101909352816020016020820280368337019050509050858160008151811061489857fe5b60200260200101906001600160a01b031690816001600160a01b03168152505084816001815181106148c657fe5b6001600160a01b03909216602092830291909101909101528351806001600160401b03811180156148f657600080fd5b50604051908082528060200260200182016040528015614920578160200160208202803683370190505b50935061492b618940565b61493361679e565b905060005b828110156114215760606149528b89848151811061130357fe5b604051637c26833760e11b81529091506001600160a01b0387169063f84d066e906149889060019085908a90899060040161a71a565b600060405180830381600087803b1580156149a257600080fd5b505af19250505080156149d757506040513d6000823e601f3d908101601f191682016040526149d49190810190619775565b60015b614a05573d8080156113c3576040519150601f19603f3d011682016040523d82523d6000602084013e6113c8565b600081600081518110614a1457fe5b6020026020010151905060008113614a2e57505050611421565b80898581518110614a3b57fe5b602002602001018181525050505050600101614938565b6003546001600160a01b031681565b8051606090806001600160401b0381118015614a7c57600080fd5b50604051908082528060200260200182016040528015614aa6578160200160208202803683370190505b50915060005b81811015611ea757866001600160a01b031663343fbcdd62061a808888888681518110614ad557fe5b60200260200101516040518563ffffffff1660e01b8152600401614afb9392919061a2ee565b60206040518083038187803b158015614b1357600080fd5b5086fa93505050508015614b44575060408051601f3d908101601f19168201909252614b4191810190619919565b60015b614b72573d808015611e57576040519150601f19603f3d011682016040523d82523d6000602084013e611e5c565b80848381518110614b7f57fe5b602002602001018181525050838281518110614b9757fe5b602002602001015160001415614bad5750611ea7565b50600101614aac565b6000806060614bc58587616768565b8351806001600160401b0381118015614bdd57600080fd5b50604051908082528060200260200182016040528015614c07578160200160208202803683370190505b509150614c1689898989617f93565b945092506001600160a01b038316614c2e5750614ce8565b60005b81811015614ce5576000614c9f898688604051602001614c539392919061a296565b604051602081830303815290604052898789604051602001614c779392919061a296565b604051602081830303815290604052898581518110614c9257fe5b60200260200101516180e8565b905080848381518110614cae57fe5b602002602001018181525050838281518110614cc657fe5b602002602001015160001415614cdc5750614ce5565b50600101614c31565b50505b955095509592505050565b6060614cff8385616768565b8151806001600160401b0381118015614d1757600080fd5b50604051908082528060200260200182016040528015614d41578160200160208202803683370190505b50915060005b81811015611ea757866001600160a01b031663144a2752620f42408789888681518110614d7057fe5b60200260200101516040518563ffffffff1660e01b8152600401614d969392919061a2ee565b60206040518083038187803b158015614dae57600080fd5b5086fa93505050508015614ddf575060408051601f3d908101601f19168201909252614ddc91810190619919565b60015b614e0d573d808015611e57576040519150601f19603f3d011682016040523d82523d6000602084013e611e5c565b80848381518110614e1a57fe5b602002602001018181525050838281518110614e3257fe5b602002602001015160001415614e485750611ea7565b50600101614d47565b60006060614e5f8486616768565b8251806001600160401b0381118015614e7757600080fd5b50604051908082528060200260200182016040528015614ea1578160200160208202803683370190505b50915060005b81811015614f16576000614ed0898989898681518110614ec357fe5b6020026020010151614640565b905080848381518110614edf57fe5b602002602001018181525050838281518110614ef757fe5b602002602001015160001415614f0d5750614f16565b50600101614ea7565b5060405163901754d760e01b81526001600160a01b0388169063901754d790614f45908990899060040161a1f3565b60206040518083038186803b158015614f5d57600080fd5b505afa158015614f71573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614f9591906190e7565b92505094509492505050565b6040805160608181019092526118ce9080614fc086896080840161a1f3565b60405160208183030381529060405281526020018688604051602001614fe792919061a1f3565b60405160208183030381529060405281526020016181da81525083616db5565b606082516001600160401b038111801561502057600080fd5b5060405190808252806020026020018201604052801561504a578160200160208202803683370190505b50905060005b835181146134bf577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031684828151811061508e57fe5b60200260200101516001600160a01b0316146150d8576150d3838583815181106150b457fe5b60200260200101516001600160a01b031661822190919063ffffffff16565b6150e4565b826001600160a01b0316315b8282815181106150f057fe5b6020908102919091010152600101615050565b6040805160608181019092526118ce908061512286896080840161a1f3565b6040516020818303038152906040528152602001868860405160200161514992919061a1f3565b60405160208183030381529060405281526020016182eb81525083616db5565b60606151758385616768565b8151806001600160401b038111801561518d57600080fd5b506040519080825280602002602001820160405280156151b7578160200160208202803683370190505b50915060006001600160a01b038616156151da576151d5878761685f565b6151dd565b60005b905060006001600160a01b038616156151ff576151fa888761685f565b615202565b60005b905060005b838110156115f85760016001600160a01b03881661525857615237846395b68fe760e01b8985815181106114fc57fe5b87848151811061524357fe5b602002602001018193508281525050506152f2565b6001600160a01b03891661527e576152378363cd7724c360e01b8985815181106114fc57fe5b6000615298856395b68fe760e01b8a86815181106114fc57fe5b9250905080156152d5576152b48463cd7724c360e01b836168de565b8885815181106152c057fe5b602002602001018194508281525050506152f0565b60008784815181106152e357fe5b6020026020010181815250505b505b801580615312575085828151811061530657fe5b60200260200101516000145b1561531d57506115f8565b50600101615207565b8051606090806001600160401b038111801561534157600080fd5b5060405190808252806020026020018201604052801561536b578160200160208202803683370190505b50915060005b8181101561202c57856001600160a01b0316631f00ca74620249f086848151811061539857fe5b6020026020010151886040518463ffffffff1660e01b81526004016153be92919061aaaf565b60006040518083038187803b1580156153d657600080fd5b5086fa9350505050801561540c57506040513d6000823e601f3d908101601f1916820160405261540991908101906198c7565b60015b61543a573d808015611fc5576040519150601f19603f3d011682016040523d82523d6000602084013e611fca565b8060008151811061544757fe5b602002602001015184838151811061545b57fe5b60200260200101818152505083828151811061547357fe5b602002602001015160001415615489575061202c565b50600101615371565b606061549e8385616768565b8151806001600160401b03811180156154b657600080fd5b506040519080825280602002602001820160405280156154e0578160200160208202803683370190505b50915060005b81811015611ea757866001600160a01b031663ff1fd974620f4240888888868151811061550f57fe5b60200260200101516040518563ffffffff1660e01b81526004016155359392919061a2ee565b60206040518083038187803b15801561554d57600080fd5b5086fa9350505050801561557e575060408051601f3d908101601f1916820190925261557b91810190619919565b60015b6155ac573d808015611e57576040519150601f19603f3d011682016040523d82523d6000602084013e611e5c565b808483815181106155b957fe5b6020026020010181815250508382815181106155d157fe5b6020026020010151600014156155e75750611ea7565b506001016154e6565b60006060806155ff8587616768565b61560a878787617d45565b925082615616576111e4565b60405163276fdad960e11b81523090634edfb5b29061563f908a9087908b908b9060040161a981565b60006040518083038186803b15801561565757600080fd5b505afa15801561566b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526156939190810190619931565b608088018190528451909250806001600160401b03811180156156b557600080fd5b506040519080825280602002602001820160405280156156df578160200160208202803683370190505b50915060005b818110156157ca576000306001600160a01b031663f1ed7fa48b8b8b8b878151811061570d57fe5b60200260200101516040518563ffffffff1660e01b8152600401615734949392919061a94b565b60206040518083038186803b15801561574c57600080fd5b505afa158015615760573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906157849190619919565b90508084838151811061579357fe5b6020026020010181815250508382815181106157ab57fe5b6020026020010151600014156157c157506157ca565b506001016156e5565b50509450945094915050565b73e9db8717bc5dfb20aaf538b4a5a02b7791ff430c81565b60008060606157fd8587616768565b61580988888888617f93565b935091506001600160a01b03821661582057614ce8565b8351806001600160401b038111801561583857600080fd5b50604051908082528060200260200182016040528015615862578160200160208202803683370190505b5060408051606081019091529092506158cf9080615886898789156080850161a296565b60405160208183030381529060405281526020018986886040516020016158af9392919061a296565b60405160208183030381529060405281526020016180e881525086616db5565b915050955095509592505050565b60008060606158ec8587616768565b8351806001600160401b038111801561590457600080fd5b5060405190808252806020026020018201604052801561592e578160200160208202803683370190505b508851604051630939d86360e11b81529193506001600160a01b031690631273b0c690615961908a908a9060040161a1f3565b60206040518083038186803b15801561597957600080fd5b505afa15801561598d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906159b191906190e7565b925060006001600160a01b038416156159cf57506001935086615a6e565b8851604051630939d86360e11b81526001600160a01b0390911690631273b0c690615a00908a908c9060040161a1f3565b60206040518083038186803b158015615a1857600080fd5b505afa158015615a2c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190615a5091906190e7565b93506001600160a01b038416615a675750506111e4565b5060009350855b836001600160a01b031663dd58b41c6040518163ffffffff1660e01b815260040160206040518083038186803b158015615aa757600080fd5b505afa158015615abb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190615adf91906198f9565b615aea5750506111e4565b615b6260405180606001604052808987858e60200151604051602001615b13949392919061a20d565b60405160208183030381529060405281526020018a87858e60200151604051602001615b42949392919061a20d565b6040516020818303038152906040528152602001616fb281525087616db5565b925050509450945094915050565b606083516001600160401b0381118015615b8957600080fd5b50604051908082528060200260200182016040528015615bb3578160200160208202803683370190505b50905060005b84518114611043577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316858281518110615bf757fe5b60200260200101516001600160a01b031614615c4357615c3e8484878481518110615c1e57fe5b60200260200101516001600160a01b03166183a09092919063ffffffff16565b615c46565b60005b828281518110615c5257fe5b6020908102919091010152600101615bb9565b8051606090806001600160401b0381118015615c8057600080fd5b50604051908082528060200260200182016040528015615caa578160200160208202803683370190505b50915060005b81811015611ea757866001600160a01b031663838e6a22620493e08888888681518110615cd957fe5b60200260200101516040518563ffffffff1660e01b8152600401615cff9392919061a2ee565b60206040518083038187803b158015615d1757600080fd5b5086fa93505050508015615d48575060408051601f3d908101601f19168201909252615d4591810190619919565b60015b615d76573d808015611e57576040519150601f19603f3d011682016040523d82523d6000602084013e611e5c565b80848381518110615d8357fe5b60200260200101818152505050600101615cb0565b600084608001515160001415615db057506000611860565b84604001516001600160a01b031663418436bc6207a12087606001516001600160a01b0316876001600160a01b031614615dea5786615e00565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b88606001516001600160a01b0316876001600160a01b031614615e235786615e39565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b8660008b608001516040518763ffffffff1660e01b8152600401615e6195949392919061a312565b60206040518083038187803b158015615e7957600080fd5b5086fa93505050508015615eaa575060408051601f3d908101601f19168201909252615ea791810190619919565b60015b615ee8573d808015615ed8576040519150601f19603f3d011682016040523d82523d6000602084013e615edd565b606091505b506000915050611860565b6000615ef38561846c565b60ff1690506000615f038761846c565b60ff169050670de0b6b3a764000081600a0a83600a0a8786020281615f2457fe5b0481615f2c57fe5b049350505050611860565b60006060615f458486616768565b8251806001600160401b0381118015615f5d57600080fd5b50604051908082528060200260200182016040528015615f87578160200160208202803683370190505b509150615ff260405180606001604052808988604051602001615fab92919061a1f3565b60405160208183030381529060405281526020018989604051602001615fd292919061a1f3565b604051602081830303815290604052815260200161847781525085616db5565b60405163901754d760e01b81529092506001600160a01b0388169063901754d790614f45908990899060040161a1f3565b61602b6189ae565b6160336189ae565b6000198060005b8651811461612f5761606a602088838151811061605357fe5b6020026020010151510387898481518110613bbc57fe5b60006060306001600160a01b031689848151811061608457fe5b6020026020010151604051616099919061a1aa565b6000604051808303816000865af19150503d80600081146160d6576040519150601f19603f3d011682016040523d82523d6000602084013e6160db565b606091505b509150915081156161255760006160ff602083510383617ce590919063ffffffff16565b905060008111801561611057508481105b1561612357838752602087018290529350835b505b505060010161603a565b506000198114156161405750613d87565b60005b87518114613d8457616173602089838151811061615c57fe5b60200260200101515103838a8481518110613bbc57fe5b60006060306001600160a01b03168a848151811061618d57fe5b60200260200101516040516161a2919061a1aa565b6000604051808303816000865af19150503d80600081146161df576040519150601f19603f3d011682016040523d82523d6000602084013e6161e4565b606091505b5091509150811561622e576000616208602083510383617ce590919063ffffffff16565b905060008111801561621957508581105b1561622c57838852602088018290529450845b505b5050600101616143565b6002546001600160a01b031681565b60606000836001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b15801561628457600080fd5b505afa158015616298573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906162bc91906190e7565b905060018351036001600160401b03811180156162d857600080fd5b50604051908082528060200260200182016040528015616302578160200160208202803683370190505b50915060005b825181101561652d576060826001600160a01b0316635b1dc86f620249f087858151811061633257fe5b602002602001015188866001018151811061634957fe5b60200260200101516040518463ffffffff1660e01b815260040161636e92919061a1f3565b60006040518083038187803b15801561638657600080fd5b5086fa935050505080156163bc57506040513d6000823e601f3d908101601f191682016040526163b991908101906194de565b60015b61640b573d8080156163ea576040519150601f19603f3d011682016040523d82523d6000602084013e6163ef565b606091505b5050604080516000815260208101909152935061653092505050565b60006001825110156164385760405162461bcd60e51b815260040161642f9061a8ac565b60405180910390fd5b60005b825181101561652157600083828151811061645257fe5b60200260200101516001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561649257600080fd5b505afa1580156164a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906164ca9190619919565b905082811115616518578092508382815181106164e357fe5b60200260200101518887815181106164f757fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b5060010161643b565b50505050600101616308565b50505b92915050565b6000606085600001516001600160a01b03166321f8a72187600001516001600160a01b0316639232494e6040518163ffffffff1660e01b815260040160206040518083038186803b15801561658a57600080fd5b505afa15801561659e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906165c29190619919565b6040518263ffffffff1660e01b81526004016165de919061a644565b60206040518083038186803b1580156165f657600080fd5b505afa15801561660a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061662e91906190e7565b9150856020015151600014156166435761675f565b6000805b87602001515181101561675c5760028860200151828151811061666657fe5b602002602001015151101561667a57616754565b836001600160a01b0316637f9c0ecd620493e08a60200151848151811061669d57fe5b60200260200101518860018a5103815181106166b557fe5b60200260200101516040518463ffffffff1660e01b81526004016166da92919061a4fb565b60206040518083038187803b1580156166f257600080fd5b5086fa93505050508015616723575060408051601f3d908101601f1916820190925261672091810190619919565b60015b61672c57616754565b82811115616752578092508860200151828151811061674757fe5b602002602001015193505b505b600101616647565b50505b94509492505050565b806001600160a01b0316826001600160a01b0316141561679a5760405162461bcd60e51b815260040161642f9061a822565b5050565b6167a6618940565b50604080516080810182523080825260006020830181905292820152606081019190915290565b604080516001808252818301909252606091829190816020015b6167ef6189c8565b8152602001906001900390816167e75790505090506040518060a00160405280856000015181526020016000815260200160018152602001848152602001604051806020016040528060008152508152508160008151811061684d57fe5b60209081029190910101529392505050565b6040516303795fb160e11b81526000906001600160a01b038416906306f2bf629061688e90859060040161a1c6565b60206040518083038186803b1580156168a657600080fd5b505afa1580156168ba573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061451391906190e7565b6000806001600160a01b0385166168f457610ed0565b6060856001600160a01b0316620249f08686604051602401616916919061a644565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051616954919061a1aa565b6000604051808303818686fa925050503d8060008114616990576040519150601f19603f3d011682016040523d82523d6000602084013e616995565b606091505b50909250905081156169b857808060200190518101906169b59190619919565b92505b50935093915050565b600080600080846001600160a01b031663d9638d368b602001516040518263ffffffff1660e01b81526004016169f7919061a644565b60a06040518083038186803b158015616a0f57600080fd5b505afa158015616a23573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190616a479190619f38565b94509450505092506000620f424090508a604001516001600160a01b0316896001600160a01b03161415616b6f576000616a868964e8d4a510006184c7565b90506000616aaa6b033b2e3c9fd0803ce8000000616aa488856184fd565b906184c7565b9050848110616ac25760009650505050505050616c78565b6000616b51670de0b6b3a7640000616b4b8c6001600160a01b031663568d4b6f6040518163ffffffff1660e01b815260040160206040518083038186803b158015616b0c57600080fd5b505afa158015616b20573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190616b449190619919565b86906184c7565b90618519565b90506000616b5f8483618543565b9850616c78975050505050505050565b8a604001516001600160a01b03168a6001600160a01b03161415616c6f578784811115616ba457600095505050505050616c78565b6000616bc06b033b2e3c9fd0803ce8000000616aa48885618543565b9050838111616bd85760009650505050505050616c78565b6000616c5d8a6001600160a01b031663fae036d56040518163ffffffff1660e01b815260040160206040518083038186803b158015616c1657600080fd5b505afa158015616c2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190616c4e9190619919565b670de0b6b3a7640000906184fd565b90506000616b5f82616b4b86886184c7565b60009450505050505b9695505050505050565b600080616c8d6189fa565b85806020019051810190616ca191906199c5565b91509150600085806020019051810190616cbb91906199a9565b905060006060306322db5ed160e21b858786616cd68c618562565b604051602401616ce9949392919061a8e3565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051616d27919061a1aa565b600060405180830381855afa9150503d8060008114616d62576040519150601f19603f3d011682016040523d82523d6000602084013e616d67565b606091505b509150915081616d7f57600095505050505050614513565b80806020019051810190616d9391906198c7565b600081518110616d9f57fe5b6020026020010151955050505050509392505050565b606081516001600160401b0381118015616dce57600080fd5b50604051908082528060200260200182016040528015616df8578160200160208202803683370190505b509050815160001415616e0a57616530565b6000616e3b8460000151856020015185600081518110616e2657fe5b6020026020010151876040015163ffffffff16565b905080616e485750616530565b6000616e658560200151866000015184886040015163ffffffff16565b905080616e73575050616530565b60005b8451811015616fa95760005b6005811015616f6b57616ea9868381518110616e9a57fe5b602002602001015184866185a3565b935083616eb557616f6b565b616ec4612715612710866185a3565b935083616ed057616f6b565b6000616eed88602001518960000151878b6040015163ffffffff16565b905080616efa5750616f6b565b809350868381518110616f0957fe5b60200260200101518410616f62576000878481518110616f2557fe5b6020026020010151612710898681518110616f3c57fe5b602002602001015187030281616f4e57fe5b04905060058111616f60575050616f6b565b505b50600101616e82565b50616f8a858281518110616f7b57fe5b602002602001015183856185a3565b848281518110616f9657fe5b6020908102919091010152600101616e76565b50505092915050565b600080600080600087806020019051810190616fce919061913c565b9350935093509350816001600160a01b0316846001600160a01b031614156170b8576040516351400f0b60e11b81526001600160a01b0384169063a2801e1690620493e090617021908a9060040161a644565b60206040518083038187803b15801561703957600080fd5b5086fa9350505050801561706a575060408051601f3d908101601f1916820190925261706791810190619919565b60015b6170ac573d808015617098576040519150601f19603f3d011682016040523d82523d6000602084013e61709d565b606091505b50600095505050505050614513565b94506145139350505050565b60405163ca19ebd960e01b81526001600160a01b0382169063ca19ebd990620493e0906170219087908b9060040161a1da565b606060028284510310156171115760405162461bcd60e51b815260040161642f9061a7de565b617119618a1a565b5060408051606080820183526101f48252610bb86020830152612710828401528251600380825260808201909452919290919081602001602082028036833701905050905060008086868151811061716d57fe5b60200260200101519050600087876001018151811061718857fe5b6020026020010151905060005b600381101561727d5760008a6001600160a01b0316631698ee8285858a86600381106171bd57fe5b60200201516040518463ffffffff1660e01b81526004016171e09392919061a68c565b60206040518083038186803b1580156171f857600080fd5b505afa15801561720c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061723091906190e7565b905061723b816185fb565b15617274578086868060010197508151811061725357fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b50600101617195565b5050508061728d57505050614513565b855185600201141561738357806001600160401b03811180156172af57600080fd5b506040519080825280602002602001820160405280156172e357816020015b60608152602001906001900390816172ce5790505b50935060005b8181101561737a5760408051600180825281830190925290602080830190803683370190505085828151811061731b57fe5b602002602001018190525082818151811061733257fe5b602002602001015185828151811061734657fe5b602002602001015160008151811061735a57fe5b6001600160a01b03909216602092830291909101909101526001016172e9565b50505050614513565b60606173938888886001016170eb565b90508051600014156173a85750505050614513565b805182026001600160401b03811180156173c157600080fd5b506040519080825280602002602001820160405280156173f557816020015b60608152602001906001900390816173e05790505b50945060005b828110156175755760005b825181101561756c57825182810282019084908390811061742357fe5b6020026020010151516001016001600160401b038111801561744457600080fd5b5060405190808252806020026020018201604052801561746e578160200160208202803683370190505b5088828151811061747b57fe5b602002602001018190525085838151811061749257fe5b60200260200101518882815181106174a657fe5b60200260200101516000815181106174ba57fe5b60200260200101906001600160a01b031690816001600160a01b03168152505060005b8483815181106174e957fe5b6020026020010151518110156175625784838151811061750557fe5b6020026020010151818151811061751857fe5b602002602001015189838151811061752c57fe5b6020026020010151826001018151811061754257fe5b6001600160a01b03909216602092830291909101909101526001016174dd565b5050600101617406565b506001016173fb565b50505050509392505050565b60606002835110158015617599575081516001018351145b6175b55760405162461bcd60e51b815260040161642f9061a867565b81516003028351601402016001600160401b03811180156175d557600080fd5b506040519080825280601f01601f191660200182016040528015617600576020820181803683370190505b5090506020810160005b845181101561652d5780156176af57600084600183038151811061762a57fe5b60200260200101516001600160a01b031663ddca3f436040518163ffffffff1660e01b815260040160206040518083038186803b15801561766a57600080fd5b505afa15801561767e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906176a29190619ebd565b60e81b8352506003909101905b60008582815181106176bd57fe5b602090810291909101015160601b83525060149091019060010161760a565b600082820283158015906176f95750828482816176f557fe5b0414155b15617708576000915050616530565b6706f05b59d3b2000081018181101561772657600092505050616530565b670de0b6b3a76400009004949350505050565b606081516001600160401b038111801561775257600080fd5b5060405190808252806020026020018201604052801561777c578160200160208202803683370190505b50905060005b82518110156135b25782600182855103038151811061779d57fe5b60200260200101518282815181106177b157fe5b6001600160a01b0390921660209283029190910190910152600101617782565b606081516001600160401b03811180156177ea57600080fd5b50604051908082528060200260200182016040528015617814578160200160208202803683370190505b50905060005b82518110156135b25782600182855103038151811061783557fe5b602002602001015182828151811061784957fe5b6001600160a01b039092166020928302919091019091015260010161781a565b6000806000858060200190518101906178829190619103565b9150915060008580602001905181019061789c91906190e7565b90503063e8e4af098385846178b08a618562565b6040518563ffffffff1660e01b81526004016178cf949392919061a238565b60006040518083038186803b1580156178e757600080fd5b505afa92505050801561791c57506040513d6000823e601f3d908101601f1916820160405261791991908101906198c7565b60015b61795d573d80801561794a576040519150601f19603f3d011682016040523d82523d6000602084013e61794f565b606091505b506000945050505050614513565b8060008151811061796a57fe5b6020026020010151945050505050614513565b600061186083616b4b617991826001618543565b61799b88876184c7565b906184fd565b60006012905060006060836001600160a01b031660405180604001604052806004815260200163313ce56760e01b8152506040516179df919061a1aa565b600060405180830381855afa9150503d8060008114617a1a576040519150601f19603f3d011682016040523d82523d6000602084013e617a1f565b606091505b5091509150818015617a3357506020815110155b15610d2b57611860816000617ce5565b600080600080846001600160a01b031663d9638d368b602001516040518263ffffffff1660e01b8152600401617a79919061a644565b60a06040518083038186803b158015617a9157600080fd5b505afa158015617aa5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190617ac99190619f38565b945094505050925089604001516001600160a01b0316886001600160a01b03161415617be05760008790506000617b79886001600160a01b031663568d4b6f6040518163ffffffff1660e01b815260040160206040518083038186803b158015617b3257600080fd5b505afa158015617b46573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190617b6a9190619919565b670de0b6b3a764000090618543565b90506000617b9382616b4b85670de0b6b3a76400006184c7565b90506000617bb16b033b2e3c9fd0803ce8000000616aa489856184fd565b9050858110617bca576000975050505050505050616c78565b6000616b5f600161799b8564e8d4a51000618519565b89604001516001600160a01b0316896001600160a01b03161415617cc5576000617c0f8864e8d4a510006184c7565b90506000617c4f886001600160a01b031663fae036d56040518163ffffffff1660e01b815260040160206040518083038186803b158015616c1657600080fd5b90506000617c69670de0b6b3a7640000616b4b85856184c7565b905085811115617c825760009650505050505050616c78565b6000617c9e6b033b2e3c9fd0803ce8000000616aa48985618543565b9050848111617cb7576000975050505050505050616c78565b509550616c78945050505050565b5060009998505050505050505050565b617ce0838383618807565b505050565b6000614513838361882e565b600080617cfc6189fa565b85806020019051810190617d1091906199c5565b91509150600085806020019051810190617d2a91906199a9565b9050600060603063205e01d760e11b858786616cd68c618562565b600080846020015190506060816001600160a01b031663910ffc7187606001516001600160a01b0316876001600160a01b031614617d835786617d99565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b88606001516001600160a01b0316876001600160a01b031614617dbc5786617dd2565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b604080516000815260208101918290526001600160e01b031960e086901b16909152617e069291906001906024810161a2ba565b60006040518083038186803b158015617e1e57600080fd5b505afa158015617e32573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052617e5a9190810190619576565b505090508051866000015110617e765750600091506145139050565b80866000015181518110617e8657fe5b6020026020010151925060f883901c60001c60bb141561202c5750600091506145139050565b600080617eb7618a38565b84806020019051810190617ecb91906191ea565b91509150600086806020019051810190617ee591906191ea565b50604051633c7b5fe960e21b8152909150309063f1ed7fa490617f12908590859088908b9060040161a94b565b60206040518083038186803b158015617f2a57600080fd5b505afa925050508015617f5a575060408051601f3d908101601f19168201909252617f5791810190619919565b60015b617f88573d80801561794a576040519150601f19603f3d011682016040523d82523d6000602084013e61794f565b935061451392505050565b6000806060866001600160a01b03166357a281dc86866040518363ffffffff1660e01b8152600401617fc692919061a1f3565b60006040518083038186803b158015617fde57600080fd5b505afa158015617ff2573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261801a91908101906194de565b9050600191508051600014156180b3576040516315e8a07760e21b81526001600160a01b038816906357a281dc90618058908790899060040161a1f3565b60006040518083038186803b15801561807057600080fd5b505afa158015618084573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526180ac91908101906194de565b9050600091505b805186106180c857600080925092505061675f565b8086815181106180d457fe5b602002602001015192505094509492505050565b60008060008086806020019051810190618102919061919a565b92509250925080156181a657604051633cd0243b60e11b81526001600160a01b038316906379a0487690620493e090618142906000908a9060040161a1da565b604080518083038187803b15801561815957600080fd5b5086fa9350505050801561818a575060408051601f3d908101601f1916820190925261818791810190619ee0565b60015b61819a5760009350505050614513565b50935061451392505050565b6040516366410a2160e01b81526001600160a01b038316906366410a2190620493e090618142906000908a9060040161a1da565b6000806000858060200190518101906181f39190619103565b9150915060008580602001905181019061820d91906190e7565b9050306330d6570d8385846178b08a618562565b6000806060846001600160a01b03166370a0823160e01b85604051602401618249919061a1c6565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051618287919061a1aa565b600060405180830381855afa9150503d80600081146182c2576040519150601f19603f3d011682016040523d82523d6000602084013e6182c7565b606091505b50915091508180156182db57506020815110155b1561652d576118ce816000617ce5565b6000806000858060200190518101906183049190619103565b9150915060008580602001905181019061831e91906190e7565b90503063a469841762061a808486856183368b618562565b6040518663ffffffff1660e01b8152600401618355949392919061a238565b60006040518083038187803b15801561836d57600080fd5b5086fa9350505050801561791c57506040513d6000823e601f3d908101601f1916820160405261791991908101906198c7565b6000806060856001600160a01b031663dd62ed3e60e01b86866040516024016183ca92919061a1f3565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051618408919061a1aa565b600060405180830381855afa9150503d8060008114618443576040519150601f19603f3d011682016040523d82523d6000602084013e618448565b606091505b509150915081801561845c57506020815110155b1561202c57616c78816000617ce5565b600061653082618858565b6000806000858060200190518101906184909190619103565b91509150600080868060200190518101906184ab9190619103565b915091506184bb84848389614640565b98975050505050505050565b6000826184d657506000616530565b828202828482816184e357fe5b0414614513576145136184f8600186866188bf565b618919565b600082820183811015614513576145136184f8600086866188bf565b60008161852f5761852f6184f8600385856188bf565b600082848161853a57fe5b04949350505050565b60008282111561855c5761855c6184f8600285856188bf565b50900390565b60408051600180825281830190925260609160208083019080368337019050509050818160008151811061859257fe5b602002602001018181525050919050565b60008315806185b0575081155b806185b9575082155b156185c657506000614513565b838202828582816185d357fe5b04146185e3576000915050614513565b83600185038201816185f157fe5b0495945050505050565b6000813b8061860e5760009150506111f3565b50816001600160a01b0316630dfe16816040518163ffffffff1660e01b815260040160206040518083038186803b15801561864857600080fd5b505afa15801561865c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061868091906190e7565b6001600160a01b03166370a08231836040518263ffffffff1660e01b81526004016186ab919061a1c6565b60206040518083038186803b1580156186c357600080fd5b505afa1580156186d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906186fb9190619919565b618707575060006111f3565b816001600160a01b031663d21220a76040518163ffffffff1660e01b815260040160206040518083038186803b15801561874057600080fd5b505afa158015618754573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061877891906190e7565b6001600160a01b03166370a08231836040518263ffffffff1660e01b81526004016187a3919061a1c6565b60206040518083038186803b1580156187bb57600080fd5b505afa1580156187cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906187f39190619919565b6187ff575060006111f3565b506001919050565b8160200183511015618826576188266184f86005855185602001618921565b910160200152565b6000816020018351101561884f5761884f6184f86005855185602001618921565b50016020015190565b60006001600160a01b03821673c02aaa39b223fe8d0a0e5c4f27ead9083c756cc21415618887575060126111f3565b60008260405160200161889a919061a17d565b60408051808303601f190181529190528051602090910120600f166004019392505050565b606063e946c1bb60e01b8484846040516024016188de9392919061a6d8565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915290509392505050565b805160208201fd5b6060632800659560e01b8484846040516024016188de9392919061a6f8565b60408051608081018252600080825260208201819052918101829052606081019190915290565b6040518060a0016040528060008152602001600081526020016000815260200160008152602001600081525090565b60408051808201909152606081526000602082015290565b604051806040016040528060008152602001606081525090565b6040518060a0016040528060008019168152602001600081526020016000815260200160008152602001606081525090565b604080516060810182526000808252602082018190529181019190915290565b60405180606001604052806003906020820280368337509192915050565b6040518060a001604052806000815260200160006001600160a01b0316815260200160006001600160a01b0316815260200160006001600160a01b03168152602001606081525090565b80356165308161ac7b565b60008083601f840112618a9e578182fd5b5081356001600160401b03811115618ab4578182fd5b6020830191508360208083028501011115618ace57600080fd5b9250929050565b600082601f830112618ae5578081fd5b8135618af8618af38261abfe565b61abd8565b818152915060208083019084810181840286018201871015618b1957600080fd5b60005b84811015618b41578135618b2f8161ac7b565b84529282019290820190600101618b1c565b505050505092915050565b600082601f830112618b5c578081fd5b8135618b6a618af38261abfe565b818152915060208083019084810160005b84811015618b4157618b92888484358a0101618d3b565b84529282019290820190600101618b7b565b600082601f830112618bb4578081fd5b8135618bc2618af38261abfe565b818152915060208083019084810181840286018201871015618be357600080fd5b60005b84811015618b41578135618bf98161ac7b565b84529282019290820190600101618be6565b600082601f830112618c1b578081fd5b8135618c29618af38261abfe565b8181529150602080830190848101608080850287018301881015618c4c57600080fd5b60005b85811015618c7357618c61898461903a565b85529383019391810191600101618c4f565b50505050505092915050565b600082601f830112618c8f578081fd5b8135618c9d618af38261abfe565b818152915060208083019084810181840286018201871015618cbe57600080fd5b60005b84811015618b4157813584529282019290820190600101618cc1565b600082601f830112618ced578081fd5b8151618cfb618af38261abfe565b818152915060208083019084810181840286018201871015618d1c57600080fd5b60005b84811015618b4157815184529282019290820190600101618d1f565b600082601f830112618d4b578081fd5b8135618d59618af38261ac1d565b9150808252836020828501011115618d7057600080fd5b8060208401602084013760009082016020015292915050565b600082601f830112618d99578081fd5b8151618da7618af38261ac1d565b9150808252836020828501011115618dbe57600080fd5b6134bf81602084016020860161ac4b565b80516002811061653057600080fd5b600060608284031215618def578081fd5b618df9606061abd8565b90508135618e068161ac7b565b81526020820135618e168161ac90565b60208201526040820135618e298161ac90565b604082015292915050565b600060608284031215618e45578081fd5b618e4f606061abd8565b90508151618e5c8161ac7b565b81526020820151618e6c8161ac90565b60208201526040820151618e298161ac90565b600060408284031215618e90578081fd5b618e9a604061abd8565b90508135618ea78161ac7b565b81526020820135618eb78161ac7b565b602082015292915050565b600060a08284031215618ed3578081fd5b618edd60a061abd8565b9050813581526020820135618ef18161ac7b565b60208201526040820135618f048161ac7b565b60408201526060820135618f178161ac7b565b606082015260808201356001600160401b03811115618f3557600080fd5b618f4184828501618d3b565b60808301525092915050565b6000610180808385031215618f60578182fd5b618f698161abd8565b915050618f768383618a82565b8152618f858360208401618a82565b6020820152618f97836040840161909d565b6040820152618fa9836060840161909d565b6060820152618fbb836080840161909d565b6080820152618fcd8360a08401618a82565b60a0820152618fdf8360c08401618a82565b60c0820152618ff18360e08401618a82565b60e082015261010061900584828501618a82565b908201526101208281013590820152610140619023848285016190b4565b818301525061016080830135818301525092915050565b60006080828403121561904b578081fd5b619055608061abd8565b905081356004811061906657600080fd5b8152602082013560ff8116811461907c57600080fd5b80602083015250604082013560408201526060820135606082015292915050565b80356001600160801b038116811461653057600080fd5b80356001600160401b038116811461653057600080fd5b6000602082840312156190dc578081fd5b81356145138161ac7b565b6000602082840312156190f8578081fd5b81516145138161ac7b565b60008060408385031215619115578081fd5b82516191208161ac7b565b60208401519092506191318161ac7b565b809150509250929050565b60008060008060808587031215619151578182fd5b845161915c8161ac7b565b602086015190945061916d8161ac7b565b604086015190935061917e8161ac7b565b606086015190925061918f8161ac7b565b939692955090935050565b6000806000606084860312156191ae578081fd5b83516191b98161ac7b565b60208501519093506191ca8161ac7b565b604085015190925080151581146191df578182fd5b809150509250925092565b600080604083850312156191fc578182fd5b82516192078161ac7b565b60208401519092506001600160401b0380821115619223578283fd5b9084019060a08287031215619236578283fd5b61924060a061abd8565b8251815260208301516192528161ac7b565b602082015260408301516192658161ac7b565b604082015260608301516192788161ac7b565b606082015260808301518281111561928e578485fd5b61929a88828601618d89565b6080830152508093505050509250929050565b600080600080600060a086880312156192c4578283fd5b85356192cf8161ac7b565b945060208601356192df8161ac7b565b935060408601356192ef8161ac7b565b925060608601356192ff8161ac7b565b915060808601356001600160401b03811115619319578182fd5b61932588828901618c7f565b9150509295509295909350565b60008060008060808587031215619347578182fd5b84356193528161ac7b565b935060208501356193628161ac7b565b925060408501356193728161ac7b565b915060608501356001600160401b0381111561938c578182fd5b61939887828801618c7f565b91505092959194509250565b600080600080608085870312156193b9578182fd5b84356193c48161ac7b565b935060208501356193d48161ac7b565b925060408501356193e48161ac7b565b9396929550929360600135925050565b600080600060608486031215619408578081fd5b83356194138161ac7b565b925060208401356001600160401b038082111561942e578283fd5b61943a87838801618ad5565b9350604086013591508082111561944f578283fd5b5061945c86828701618c7f565b9150509250925092565b600080600080600060a0868803121561947d578283fd5b85356194888161ac7b565b94506020860135935060408601356192ef8161ac7b565b600080602083850312156194b1578182fd5b82356001600160401b038111156194c6578283fd5b6194d285828601618a8d565b90969095509350505050565b600060208083850312156194f0578182fd5b82516001600160401b03811115619505578283fd5b8301601f81018513619515578283fd5b8051619523618af38261abfe565b818152838101908385018584028501860189101561953f578687fd5b8694505b8385101561956a5780516195568161ac7b565b835260019490940193918501918501619543565b50979650505050505050565b60008060006060848603121561958a578081fd5b83516001600160401b03808211156195a0578283fd5b818601915086601f8301126195b3578283fd5b81516195c1618af38261abfe565b80828252602080830192508086018b8283870289010111156195e1578788fd5b8796505b848710156196035780518452600196909601959281019281016195e5565b50890151909750935050508082111561961a578283fd5b5061962786828701618cdd565b9250506196378560408601618dcf565b90509250925092565b600080600060608486031215619654578081fd5b83356001600160401b038082111561966a578283fd5b61967687838801618b4c565b9450602086013591508082111561968b578283fd5b5061969886828701618b4c565b925050604084013590509250925092565b6000602082840312156196ba578081fd5b81356001600160401b038111156196cf578182fd5b61186084828501618ba4565b600080604083850312156196ed578182fd5b82356001600160401b03811115619702578283fd5b61970e85828601618ba4565b92505060208301356191318161ac7b565b600080600060608486031215619733578081fd5b83356001600160401b03811115619748578182fd5b61975486828701618ba4565b93505060208401356197658161ac7b565b915060408401356191df8161ac7b565b60006020808385031215619787578182fd5b82516001600160401b0381111561979c578283fd5b8301601f810185136197ac578283fd5b80516197ba618af38261abfe565b81815283810190838501858402850186018910156197d6578687fd5b8694505b8385101561956a5780518352600194909401939185019185016197da565b60008060006060848603121561980c578081fd5b83356001600160401b0380821115619822578283fd5b818601915086601f830112619835578283fd5b8135619843618af38261abfe565b80828252602080830192508086016101808c838288028a01011115619866578889fd5b8897505b858810156198925761987c8d83618f4d565b855260019790970196938201939081019061986a565b509198508901359450505050808211156198aa578283fd5b506198b786828701618c0b565b9250506196378560408601618a82565b6000602082840312156198d8578081fd5b81516001600160401b038111156198ed578182fd5b61186084828501618cdd565b60006020828403121561990a578081fd5b81518015158114614513578182fd5b60006020828403121561992a578081fd5b5051919050565b600060208284031215619942578081fd5b81516001600160401b03811115619957578182fd5b61186084828501618d89565b600080600060608486031215619977578081fd5b83356199828161ac7b565b925060208401356001600160401b038082111561999d578283fd5b61943a87838801618ba4565b6000602082840312156199ba578081fd5b81516145138161aca6565b600080608083850312156199d7578182fd5b82516199e28161aca6565b91506199f18460208501618e34565b90509250929050565b60008060008084860360a0811215619a10578283fd5b6040811215619a1d578283fd5b50619a28604061abd8565b853581526020860135619a3a8161ac7b565b602082015293506040850135619a4f8161ac7b565b92506060850135619a5f8161ac7b565b915060808501356001600160401b0381111561938c578182fd5b60008060008060808587031215619a8e578182fd5b84356001600160401b0380821115619aa4578384fd5b9086019060408289031215619ab7578384fd5b619ac1604061abd8565b8235619acc8161ac7b565b815260208381013583811115619ae0578687fd5b80850194505089601f850112619af4578586fd5b8335619b02618af38261abfe565b81815282810190868401895b84811015619b3757619b258f8784358c0101618ad5565b84529285019290850190600101619b0e565b50508084860152505050819750619b508a828b01618a82565b96505050619b618860408901618a82565b93506060870135915080821115619b76578283fd5b5061939887828801618c7f565b60008060008060c08587031215619b98578182fd5b619ba28686618dde565b93506060850135619bb28161aca6565b92506080850135619bc28161aca6565b915060a08501356001600160401b0381111561938c578182fd5b60008060008060a08587031215619bf1578182fd5b619bfb8686618e7f565b93506040850135619a4f8161ac7b565b600060208284031215619c1c578081fd5b81356001600160401b0380821115619c32578283fd5b9083019060a08286031215619c45578283fd5b619c4f60a061abd8565b619c598684618a82565b8152602083013582811115619c6c578485fd5b619c7887828601618ad5565b602083015250604083013582811115619c8f578485fd5b619c9b87828601618b4c565b604083015250606083013582811115619cb2578485fd5b619cbe87828601618ad5565b606083015250608083013582811115619cd5578485fd5b619ce187828601618c7f565b60808301525095945050505050565b60008060008060808587031215619d05578182fd5b84356001600160401b0380821115619d1b578384fd5b619d2788838901618ec2565b955060208701359150619d398261ac7b565b909350604086013590619d4b8261ac7b565b90925060608601359080821115619b76578283fd5b60008060008060808587031215619d75578182fd5b84356001600160401b03811115619d8a578283fd5b619d9687828801618ec2565b94505060208501356193d48161ac7b565b60008060008060808587031215619dbc578182fd5b84356001600160401b03811115619dd1578283fd5b619ddd87828801618ec2565b945050602085013592506040850135619df58161ac7b565b9150606085013561918f8161ac7b565b60008060006102208486031215619e1a578081fd5b619e248585618f4d565b9250619e3485610180860161903a565b91506102008401356191df8161ac7b565b60008060008084860360c0811215619e5b578283fd5b6060811215619e68578283fd5b50619e73606061abd8565b8535619e7e8161ac7b565b8152602086810135908201526040860135619e988161ac7b565b604082015293506060850135619ead8161ac7b565b92506080850135619bc28161ac7b565b600060208284031215619ece578081fd5b815162ffffff81168114614513578182fd5b60008060408385031215619ef2578182fd5b505080516020909101519092909150565b60008060008060808587031215619f18578182fd5b505082516020840151604085015160609095015191969095509092509050565b600080600080600060a08688031215619f4f578283fd5b5050835160208501516040860151606087015160809097015192989197509594509092509050565b6001600160a01b03169052565b6000815180845260208085019450808401835b83811015619fbc5781516001600160a01b031687529582019590820190600101619f97565b509495945050505050565b6000815180845260208085019450808401835b83811015619fbc57815187529582019590820190600101619fda565b6000815180845261a00e81602086016020860161ac4b565b601f01601f19169290920160200192915050565b600081518352602082015160208401526040820151604084015260608201516060840152608082015160a0608085015261186060a0850182619ff6565b80516001600160a01b031682526020808201516001600160e01b03199081169184019190915260409182015116910152565b80516001600160a01b039081168352602080830151151590840152604080830151909116908301526060908101511515910152565b6000815183526020820151604060208501526118606040850182619ff6565b600081518352602082015160018060a01b0380821660208601528060408501511660408601528060608501511660608601525050608082015160a0608085015261186060a0850182619ff6565b61a13c815161ac40565b825260ff602082015116602083015260408101516040830152606081015160608301525050565b6001600160801b03169052565b6001600160401b03169052565b60609190911b6bffffffffffffffffffffffff1916815260140190565b6000828483379101908152919050565b6000825161a1bc81846020870161ac4b565b9190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0392831681529116602082015260400190565b6001600160a01b03948516815292841660208401529083166040830152909116606082015260800190565b6001600160a01b038581168252848116602083015283166040820152608060608201819052600090616c7890830184619fc7565b6001600160a01b039485168152928416602084015292166040820152606081019190915260800190565b6001600160a01b039384168152919092166020820152901515604082015260600190565b6001600160a01b038581168252841660208201528215156040820152608060608201819052600090616c7890830184619ff6565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061a34c90830184619ff6565b979650505050505050565b6001600160a01b038416815260606020820181905260009061a37b90830185619f84565b8281036040840152616c788185619fc7565b6001600160a01b0385168152600061a3a48561ac40565b60208301526080604083015261a3bd6080830185619fc7565b828103606084015261a34c8185619fc7565b6001600160a01b0389811682526000906101009061a3ec8b61ac40565b602085015281604085015261a4038285018b619fc7565b9150838203606085015261a417828a619fc7565b9088166080850152905061a42a8661ac40565b60a084015282810360c084015261a4418186619fc7565b905082810360e084015261a4558185619fc7565b9b9a5050505050505050505050565b6001600160a01b03831681526040602082018190526000906118609083018461a0e5565b60208082528181018390526000908460408401835b8681101561a4cb57823561a4b08161ac7b565b6001600160a01b03168252918301919083019060010161a49d565b509695505050505050565b60006040825261a4e96040830185619f84565b82810360208401526118ce8185619fc7565b60006040825261a50e6040830185619f84565b90508260208301529392505050565b60006040820160408352808551808352606085019150602092506060838202860101838801855b8381101561a57257605f1988840301855261a560838351619ff6565b9486019492509085019060010161a544565b5050858103848701526184bb8188619fc7565b60208082528251828201819052600091906040908185019080840286018301878501865b8381101561a5ec57888303603f190185528151805187855261a5cd88860182619ff6565b918901511515948901949094529487019492509086019060010161a5a9565b509098975050505050505050565b6000602082526145136020830184619fc7565b901515815260200190565b83151581526001600160a01b03831660208201526060604082018190526000906118ce90830184619fc7565b90815260200190565b60008482526060602083015261a37b6060830185619ff6565b6000602082526145136020830184619ff6565b60006040825261a50e6040830185619ff6565b6001600160a01b03938416815291909216602082015262ffffff909116604082015260600190565b6001600160a01b038316815260406020820181905260009061186090830184619fc7565b6060810161a6e58561ac40565b8252602082019390935260400152919050565b606081016008851061a70657fe5b938152602081019290925260409091015290565b600060e082016002871061a72a57fe5b868352602060e08185015281875180845261010093508386019150838382028701019350828901855b8281101561a7815760ff1988870301845261a76f86835161a022565b9550928401929084019060010161a753565b5050505050828103604084015261a7988186619f84565b9150506118ce606083018461a091565b600f93840b81529190920b6020820152604081019190915260600190565b600f83900b815260808101614513602083018461a05f565b60208082526024908201527f556e6973776170563353616d706c65722f746f6b656e5061746820746f6f20736040820152631a1bdc9d60e21b606082015260800190565b60208082526025908201527f455243323042726964676553616d706c65722f494e56414c49445f544f4b454e6040820152642fa820a4a960d91b606082015260800190565b60208082526025908201527f556e6973776170563353616d706c65722f696e76616c69642070617468206c656040820152646e6774687360d81b606082015260800190565b6020808252601e908201527f4b79626572444d4d53616d706c65722f4e4f5f504f4f4c535f464f554e440000604082015260600190565b600061a8ef828761a05f565b84600f0b606083015283600f0b608083015260c060a0830152616c7860c0830184619fc7565b60006060825261a928606083018661a0c6565b828103602084015261a93a818661a0c6565b915050826040830152949350505050565b60006080825261a95e608083018761a0e5565b6001600160a01b0395861660208401529390941660408201526060015292915050565b60006080825261a994608083018761a0e5565b6020830195909552506001600160a01b0392831660408201529116606090910152919050565b60006102208201905061a9ce828651619f77565b602085015161a9e06020840182619f77565b50604085015161a9f3604084018261a163565b50606085015161aa06606084018261a163565b50608085015161aa19608084018261a163565b5060a085015161aa2c60a0840182619f77565b5060c085015161aa3f60c0840182619f77565b5060e085015161aa5260e0840182619f77565b506101008086015161aa6682850182619f77565b505061012085810151908301526101408086015161aa868285018261a170565b5050610160858101519083015261aaa161018083018561a132565b611860610200830184619f77565b6000838252604060208301526118606040830184619f84565b60008482526060602083015261aae16060830185619f84565b8281036040840152616c788185619f84565b6000858252602060808184015261ab0d6080840187619f84565b838103604085015285518082528282019083810283018401848901865b8381101561ab5857601f1986840301855261ab46838351619ff6565b9487019492509086019060010161ab2a565b5050868103606088015261a4558189619f84565b958652602086019490945260408501929092526060840152608083015260a082015260c00190565b6000808335601e1984360301811261abaa578283fd5b8301803591506001600160401b0382111561abc3578283fd5b602001915036819003821315618ace57600080fd5b6040518181016001600160401b038111828210171561abf657600080fd5b604052919050565b60006001600160401b0382111561ac13578081fd5b5060209081020190565b60006001600160401b0382111561ac32578081fd5b50601f01601f191660200190565b80600481106111f357fe5b60005b8381101561ac6657818101518382015260200161ac4e565b8381111561ac75576000848401525b50505050565b6001600160a01b038116811461108b57600080fd5b6001600160e01b03198116811461108b57600080fd5b80600f0b811461108b57600080fdfea264697066735822122028b9b66dd2b484da13a2a68f09d246f8a4586438c6a9501ad27e5f94a5fb896864736f6c634300060c0033';
TestERC20BridgeSamplerContract.contractName = 'TestERC20BridgeSampler';
// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
//# sourceMappingURL=test_erc20_bridge_sampler.js.map