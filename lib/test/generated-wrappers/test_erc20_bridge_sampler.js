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
TestERC20BridgeSamplerContract.deployedBytecode = '0x6080604052600436106103a25760003560e01c80637f7f4f13116101e7578063bd71ecf61161010d578063ddd5aa28116100a0578063f3868e9c1161006f578063f3868e9c146105f7578063f5a4994d14610b42578063fc9fe41b14610b62578063fea12a0314610b82576103a2565b8063ddd5aa2814610ac2578063e78ac04514610ae2578063e8e4af0914610b02578063f1ed7fa414610b22576103a2565b8063c94706d8116100dc578063c94706d814610a4d578063cc1621c914610a6d578063cd72d78914610a8d578063d9bca37214610aa2576103a2565b8063bd71ecf6146109cd578063c25c4138146109ed578063c831908414610a0d578063c8c74a3714610a2d576103a2565b80639ea0ff1311610185578063a75e744b11610154578063a75e744b1461093f578063ab0002761461095f578063adc636bf1461097f578063b90cd2fb146109ad576103a2565b80639ea0ff13146108ca578063a0295b8b146108ea578063a2d10ba51461090a578063a46984171461091f576103a2565b80639209483b116101c15780639209483b1461082e578063987777481461084e5780639bf3ee351461086e5780639e3f05c31461089b576103a2565b80637f7f4f13146107bf5780638b6d7b44146107df5780638e5a0e07146107ff576103a2565b80633105fec1116102cc5780635505000a1161026a57806366a1ac6b1161023957806366a1ac6b1461073257806368be3cf214610752578063706e2f9b1461077f57806374c9d2551461079f576103a2565b80635505000a146106a457806357494b1d146106d25780635aae4e53146106f25780635d5b674f14610712576103a2565b80633c883dba116102a65780633c883dba1461061757806340bc03ae14610637578063494569db146106575780634edfb5b214610677576103a2565b80633105fec1146105b757806331268657146105d757806336052391146105f7576103a2565b80632339078f1161034457806329fa4aa01161031357806329fa4aa0146105285780632aa64319146105485780632d753aa41461057757806330d6570d14610597576103a2565b80632339078f146104b3578063252322b3146104d35780632681f7e4146104f3578063281e343214610508576103a2565b806311f2928b1161038057806311f2928b1461042b578063149dab0e1461043557806316279055146104645780631694505e14610491576103a2565b806301cb0ef7146103a75780630496d5dc146103dd5780631022742b1461040b575b600080fd5b3480156103b357600080fd5b506103c76103c2366004619c0e565b610b97565b6040516103d4919061a5c1565b60405180910390f35b3480156103e957600080fd5b506103fd6103f83660046193f7565b610d2d565b6040516103d492919061a49d565b34801561041757600080fd5b506103c76104263660046197fb565b610ed3565b610433611046565b005b34801561044157600080fd5b50610455610450366004619a7c565b611089565b6040516103d49392919061a31b565b34801561047057600080fd5b5061048461047f3660046190d1565b6111e9565b6040516103d4919061a5d4565b34801561049d57600080fd5b506104a66111f3565b6040516103d4919061a18a565b3480156104bf57600080fd5b506103c76104ce3660046199fd565b611202565b3480156104df57600080fd5b506103c76104ee366004619335565b611429565b3480156104ff57600080fd5b506104a66115ff565b34801561051457600080fd5b506103c7610523366004619e48565b61160e565b34801561053457600080fd5b506103c7610543366004619b86565b611863565b34801561055457600080fd5b50610568610563366004619bdf565b6118d2565b6040516103d49392919061a5df565b34801561058357600080fd5b506103c76105923660046192b0565b611baf565b3480156105a357600080fd5b506103c76105b2366004619335565b611d38565b3480156105c357600080fd5b506103c76105d23660046193f7565b611eac565b3480156105e357600080fd5b506104336105f23660046194a2565b612030565b34801561060357600080fd5b506103c7610612366004619bdf565b612098565b34801561062357600080fd5b506103c7610632366004619c0e565b61212a565b34801561064357600080fd5b506103c7610652366004619b86565b6122b4565b34801561066357600080fd5b506103fd6106723660046193f7565b612435565b34801561068357600080fd5b50610697610692366004619daa565b6125c1565b6040516103d4919061a62d565b3480156106b057600080fd5b506106c46106bf366004619966565b61283e565b6040516103d492919061a4e4565b3480156106de57600080fd5b506103c76106ed366004619335565b612a89565b3480156106fe57600080fd5b506106c461070d366004619966565b613000565b34801561071e57600080fd5b506103c761072d366004619335565b613245565b34801561073e57600080fd5b506103c761074d3660046197fb565b6132ab565b34801561075e57600080fd5b5061077261076d3660046194a2565b613360565b6040516103d4919061a54c565b34801561078b57600080fd5b506103c761079a3660046196ac565b6134c1565b3480156107ab57600080fd5b506104556107ba366004619a7c565b6135b3565b3480156107cb57600080fd5b506103c76107da366004619e48565b6135c2565b3480156107eb57600080fd5b506103c76107fa366004619b86565b61380f565b34801561080b57600080fd5b5061081f61081a366004619643565b613b72565b6040516103d49392919061a8fc565b34801561083a57600080fd5b506103c7610849366004619b86565b613d8b565b34801561085a57600080fd5b506103c7610869366004619335565b613f8b565b34801561087a57600080fd5b5061088e610889366004619e08565b6144c4565b6040516103d4919061a60b565b3480156108a757600080fd5b506108bb6108b6366004619cf3565b614515565b6040516103d49392919061a614565b3480156108d657600080fd5b5061088e6108e53660046193a7565b61463b565b3480156108f657600080fd5b506103c76109053660046199fd565b614851565b34801561091657600080fd5b506104a6614a4d565b34801561092b57600080fd5b506103c761093a366004619335565b614a5c565b34801561094b57600080fd5b5061056861095a366004619469565b614bb1565b34801561096b57600080fd5b506103c761097a366004619335565b614cee565b34801561098b57600080fd5b5061099f61099a366004619335565b614e4c565b6040516103d492919061a67b565b3480156109b957600080fd5b506103c76109c8366004619335565b614f9c565b3480156109d957600080fd5b506103c76109e83660046196de565b615002565b3480156109f957600080fd5b506103c7610a08366004619335565b6150fe565b348015610a1957600080fd5b506103c7610a28366004619335565b615164565b348015610a3957600080fd5b506103c7610a483660046193f7565b615321565b348015610a5957600080fd5b506103c7610a68366004619335565b61548d565b348015610a7957600080fd5b506108bb610a88366004619cf3565b6155eb565b348015610a9957600080fd5b506104a66157d1565b348015610aae57600080fd5b50610568610abd366004619469565b6157e9565b348015610ace57600080fd5b50610568610add366004619bdf565b6158d8565b348015610aee57600080fd5b506103c7610afd366004619722565b615b6b565b348015610b0e57600080fd5b506103c7610b1d366004619335565b615c60565b348015610b2e57600080fd5b5061088e610b3d366004619d63565b615d93565b348015610b4e57600080fd5b5061099f610b5d366004619335565b615f32565b348015610b6e57600080fd5b5061081f610b7d366004619643565b61601e565b348015610b8e57600080fd5b506104a6616233565b608081015151606090806001600160401b0381118015610bb657600080fd5b50604051908082528060200260200182016040528015610be0578160200160208202803683370190505b50915060005b81811015610d265783600001516001600160a01b031663846ee14b85608001518381518110610c1157fe5b60200260200101518660200151876040015188606001516040518563ffffffff1660e01b8152600401610c47949392919061aada565b60006040518083038186803b158015610c5f57600080fd5b505afa925050508015610c9457506040513d6000823e601f3d908101601f19168201604052610c9191908101906198ca565b60015b610cce573d808015610cc2576040519150601f19603f3d011682016040523d82523d6000602084013e610cc7565b606091505b5050610d26565b80600081518110610cdb57fe5b6020026020010151848381518110610cef57fe5b602002602001018181525050838281518110610d0757fe5b602002602001015160001415610d1d5750610d26565b50600101610be6565b5050919050565b80516060908190806001600160401b0381118015610d4a57600080fd5b50604051908082528060200260200182016040528015610d74578160200160208202803683370190505b509150610d818686616242565b9250825160001415610d935750610ecb565b60005b81811015610ec857866001600160a01b031663a8312b1d620249f0878481518110610dbd57fe5b6020026020010151878a6040518563ffffffff1660e01b8152600401610de59392919061aaaf565b60006040518083038187803b158015610dfd57600080fd5b5086fa93505050508015610e3357506040513d6000823e601f3d908101601f19168201604052610e3091908101906198ca565b60015b610e6d573d808015610e61576040519150601f19603f3d011682016040523d82523d6000602084013e610e66565b606091505b5050610ec8565b80600188510381518110610e7d57fe5b6020026020010151848381518110610e9157fe5b602002602001018181525050838281518110610ea957fe5b602002602001015160001415610ebf5750610ec8565b50600101610d96565b50505b935093915050565b606083516001600160401b0381118015610eec57600080fd5b50604051908082528060200260200182016040528015610f16578160200160208202803683370190505b50905060005b8451811461103e57306001600160a01b0316639bf3ee3562030d40878481518110610f4357fe5b6020026020010151878581518110610f5757fe5b6020026020010151876040518563ffffffff1660e01b8152600401610f7e9392919061a9a1565b60206040518083038187803b158015610f9657600080fd5b5086fa93505050508015610fc7575060408051601f3d908101601f19168201909252610fc49181019061991c565b60015b61101b573d808015610ff5576040519150601f19603f3d011682016040523d82523d6000602084013e610ffa565b606091505b50600083838151811061100957fe5b60200260200101818152505050611036565b8083838151811061102857fe5b602002602001018181525050505b600101610f1c565b509392505050565b60405173e9db8717bc5dfb20aaf538b4a5a02b7791ff430c903480156108fc02916000818181858888f19350505050158015611086573d6000803e3d6000fd5b50565b6000606080866020015151600014156110a1576111df565b6110ad87878787616531565b855191945092506001600160401b03811180156110c957600080fd5b506040519080825280602002602001820160405280156110f3578160200160208202803683370190505b50905060005b81518110156111dd57836001600160a01b0316637f9c0ecd620493e08588858151811061112257fe5b60200260200101516040518463ffffffff1660e01b815260040161114792919061a4c2565b60206040518083038187803b15801561115f57600080fd5b5086fa93505050508015611190575060408051601f3d908101601f1916820190925261118d9181019061991c565b60015b611199576111dd565b808383815181106111a657fe5b6020026020010181815250508282815181106111be57fe5b6020026020010151600014156111d457506111dd565b506001016110f9565b505b9450945094915050565b803b15155b919050565b6001546001600160a01b031681565b606061120e8385616763565b60208501516040805160028082526060828101909352816020016020820280368337019050509050858160008151811061124457fe5b60200260200101906001600160a01b031690816001600160a01b031681525050848160018151811061127257fe5b6001600160a01b03909216602092830291909101909101528351806001600160401b03811180156112a257600080fd5b506040519080825280602002602001820160405280156112cc578160200160208202803683370190505b5093506112d761893b565b6112df616799565b905060005b8281101561141c57606061130b8b8984815181106112fe57fe5b60200260200101516167c8565b604051637c26833760e11b81529091506001600160a01b0387169063f84d066e906113419060009085908a90899060040161a6ce565b600060405180830381600087803b15801561135b57600080fd5b505af192505050801561139057506040513d6000823e601f3d908101601f1916820160405261138d9190810190619778565b60015b6113cb573d8080156113be576040519150601f19603f3d011682016040523d82523d6000602084013e6113c3565b606091505b50505061141c565b6000816001815181106113da57fe5b6020026020010151600019029050600081136113f85750505061141c565b8089858151811061140557fe5b6020026020010181815250505050506001016112e4565b5050505050949350505050565b60606114358385616763565b8151806001600160401b038111801561144d57600080fd5b50604051908082528060200260200182016040528015611477578160200160208202803683370190505b50915060006001600160a01b0386161561149a57611495878761685a565b61149d565b60005b905060006001600160a01b038616156114bf576114ba888761685a565b6114c2565b60005b905060005b838110156115f35760016001600160a01b0388166115255761150484632640f62c60e01b8985815181106114f757fe5b60200260200101516168d9565b87848151811061151057fe5b602002602001018193508281525050506115bf565b6001600160a01b03891661154b57611504836359e9486260e01b8985815181106114f757fe5b6000611565846359e9486260e01b8a86815181106114f757fe5b9250905080156115a257611581856309903d8b60e21b836168d9565b88858151811061158d57fe5b602002602001018194508281525050506115bd565b60008784815181106115b057fe5b6020026020010181815250505b505b8015806115df57508582815181106115d357fe5b60200260200101516000145b156115ea57506115f3565b506001016114c7565b50505050949350505050565b6000546001600160a01b031681565b606061161a8385616763565b6000856000015190506000816001600160a01b03166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b15801561165e57600080fd5b505afa158015611672573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061169691906190ed565b8451909150806001600160401b03811180156116b157600080fd5b506040519080825280602002602001820160405280156116db578160200160208202803683370190505b509350826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b15801561171757600080fd5b505afa15801561172b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061174f91906190ed565b6001600160a01b0316866001600160a01b0316141580156117f25750826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b1580156117a457600080fd5b505afa1580156117b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117dc91906190ed565b6001600160a01b0316876001600160a01b031614155b156117ff5750505061185b565b60005b818110156115f357600061182d8a898b8a868151811061181e57fe5b602002602001015189896169bc565b90508061183a57506115f3565b8086838151811061184757fe5b602090810291909101015250600101611802565b949350505050565b6040805160608181019092526118c9908061188286896080840161a7ad565b604051602081830303815290604052815260200186886040516020016118a992919061a7ad565b6040516020818303038152906040528152602001616c7d81525083616db0565b95945050505050565b60008060606118e18587616763565b8351806001600160401b03811180156118f957600080fd5b50604051908082528060200260200182016040528015611923578160200160208202803683370190505b508851604051630939d86360e11b81529193506001600160a01b031690631273b0c690611956908a908a9060040161a1b7565b60206040518083038186803b15801561196e57600080fd5b505afa158015611982573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119a691906190ed565b925060006001600160a01b038416156119c457506001935086611a63565b8851604051630939d86360e11b81526001600160a01b0390911690631273b0c6906119f5908a908c9060040161a1b7565b60206040518083038186803b158015611a0d57600080fd5b505afa158015611a21573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a4591906190ed565b93506001600160a01b038416611a5c5750506111df565b5060009350855b836001600160a01b031663dd58b41c6040518163ffffffff1660e01b815260040160206040518083038186803b158015611a9c57600080fd5b505afa158015611ab0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ad491906198fc565b611adf5750506111df565b60005b82811015611ba2576000611b5c8a87858e60200151604051602001611b0a949392919061a1d1565b6040516020818303038152906040528a88868f60200151604051602001611b34949392919061a1d1565b6040516020818303038152906040528a8581518110611b4f57fe5b6020026020010151616fad565b905080858381518110611b6b57fe5b602002602001018181525050848281518110611b8357fe5b602002602001015160001415611b995750611ba2565b50600101611ae2565b5050509450945094915050565b8051606090806001600160401b0381118015611bca57600080fd5b50604051908082528060200260200182016040528015611bf4578160200160208202803683370190505b5091506001600160a01b038716611c0b57506118c9565b60005b81811015611d2d5760006060896001600160a01b031662061a80636e79e13360e01b8b8b8b8b8981518110611c3f57fe5b6020026020010151604051602401611c5a949392919061a230565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051611c98919061a16e565b6000604051808303818686fa925050503d8060008114611cd4576040519150601f19603f3d011682016040523d82523d6000602084013e611cd9565b606091505b509150915060008215611cfd5781806020019051810190611cfa919061991c565b90505b80611d0a57505050611d2d565b80868581518110611d1757fe5b6020908102919091010152505050600101611c0e565b505095945050505050565b6060611d448385616763565b8151806001600160401b0381118015611d5c57600080fd5b50604051908082528060200260200182016040528015611d86578160200160208202803683370190505b50915060005b81811015611ea257866001600160a01b03166372ea9076620c35008888888681518110611db557fe5b60200260200101516040518563ffffffff1660e01b8152600401611ddb9392919061a2b2565b60206040518083038187803b158015611df357600080fd5b5086fa93505050508015611e24575060408051601f3d908101601f19168201909252611e219181019061991c565b60015b611e5e573d808015611e52576040519150601f19603f3d011682016040523d82523d6000602084013e611e57565b606091505b5050611ea2565b80848381518110611e6b57fe5b602002602001018181525050838281518110611e8357fe5b602002602001015160001415611e995750611ea2565b50600101611d8c565b5050949350505050565b8051606090806001600160401b0381118015611ec757600080fd5b50604051908082528060200260200182016040528015611ef1578160200160208202803683370190505b50915060005b8181101561202757856001600160a01b031663d06ca61f620249f0868481518110611f1e57fe5b6020026020010151886040518463ffffffff1660e01b8152600401611f4492919061aa96565b60006040518083038187803b158015611f5c57600080fd5b5086fa93505050508015611f9257506040513d6000823e601f3d908101601f19168201604052611f8f91908101906198ca565b60015b611fcc573d808015611fc0576040519150601f19603f3d011682016040523d82523d6000602084013e611fc5565b606091505b5050612027565b80600187510381518110611fdc57fe5b6020026020010151848381518110611ff057fe5b60200260200101818152505083828151811061200857fe5b60200260200101516000141561201e5750612027565b50600101611ef7565b50509392505050565b600054604051633126865760e01b81526001600160a01b0390911690633126865790612062908590859060040161a44f565b600060405180830381600087803b15801561207c57600080fd5b505af1158015612090573d6000803e3d6000fd5b505050505050565b60606120a48385616763565b84602001516001600160a01b0316846001600160a01b03161415806120d6575084516001600160a01b03848116911614155b1561103e5781516060816001600160401b03811180156120f557600080fd5b5060405190808252806020026020018201604052801561211f578160200160208202803683370190505b50925061185b915050565b608081015151606090806001600160401b038111801561214957600080fd5b50604051908082528060200260200182016040528015612173578160200160208202803683370190505b50915060005b81811015610d265783600001516001600160a01b0316633bbc8a1e856080015183815181106121a457fe5b60200260200101518660200151876040015188606001516040518563ffffffff1660e01b81526004016121da949392919061aada565b60006040518083038186803b1580156121f257600080fd5b505afa92505050801561222757506040513d6000823e601f3d908101601f1916820160405261222491908101906198ca565b60015b612255573d808015610cc2576040519150601f19603f3d011682016040523d82523d6000602084013e610cc7565b806001866020015151038151811061226957fe5b602002602001015184838151811061227d57fe5b60200260200101818152505083828151811061229557fe5b6020026020010151600014156122ab5750610d26565b50600101612179565b8051606090806001600160401b03811180156122cf57600080fd5b506040519080825280602002602001820160405280156122f9578160200160208202803683370190505b50915060005b81811015611ea2576000606088600001516001600160a01b0316621e84808a602001518a8a8a888151811061233057fe5b602002602001015160405160240161234a9392919061a78f565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051612388919061a16e565b6000604051808303818686fa925050503d80600081146123c4576040519150601f19603f3d011682016040523d82523d6000602084013e6123c9565b606091505b5091509150600082156123ed57818060200190518101906123ea919061991c565b90505b808685815181106123fa57fe5b60200260200101818152505085848151811061241257fe5b60200260200101516000141561242a57505050611ea2565b5050506001016122ff565b80516060908190806001600160401b038111801561245257600080fd5b5060405190808252806020026020018201604052801561247c578160200160208202803683370190505b5091506124898686616242565b925082516000141561249b5750610ecb565b60005b81811015610ec857866001600160a01b0316639e269b68620249f08784815181106124c557fe5b6020026020010151878a6040518563ffffffff1660e01b81526004016124ed9392919061aaaf565b60006040518083038187803b15801561250557600080fd5b5086fa9350505050801561253b57506040513d6000823e601f3d908101601f1916820160405261253891908101906198ca565b60015b612569573d808015610e61576040519150601f19603f3d011682016040523d82523d6000602084013e610e66565b8060008151811061257657fe5b602002602001015184838151811061258a57fe5b6020026020010181815250508382815181106125a257fe5b6020026020010151600014156125b85750610ec8565b5060010161249e565b602084810151604080516001808252818301909252606093849290828101908036833701905050905085816000815181106125f857fe5b602090810291909101015260606000604051908082528060200260200182016040528015612630578160200160208202803683370190505b50905087606001516001600160a01b0316866001600160a01b03161415612721576040516381efcbdd60e01b81526001600160a01b038416906381efcbdd906207a120906126899089906001908890889060040161a351565b60006040518083038187803b1580156126a157600080fd5b5086fa935050505080156126d757506040513d6000823e601f3d908101601f191682016040526126d49190810190619934565b60015b612711573d808015612705576040519150601f19603f3d011682016040523d82523d6000602084013e61270a565b606091505b505061271c565b935061185b92505050565b612833565b87606001516001600160a01b0316856001600160a01b03161415612777576040516361e597f960e01b81526001600160a01b038416906361e597f9906207a12090612689908a906001908890889060040161a351565b6040516302b9a6cd60e11b81526001600160a01b038416906305734d9a906207a120906127b7908a90600190889088908d9084908490849060040161a394565b60006040518083038187803b1580156127cf57600080fd5b5086fa9350505050801561280557506040513d6000823e601f3d908101601f191682016040526128029190810190619934565b60015b612711573d80801561141c576040519150601f19603f3d011682016040523d82523d6000602084013e61141c565b505050949350505050565b60608060606128bf866001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b15801561287f57600080fd5b505afa158015612893573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128b791906190ed565b8660006170e6565b905083516001600160401b03811180156128d857600080fd5b50604051908082528060200260200182016040528015612902578160200160208202803683370190505b50915083516001600160401b038111801561291c57600080fd5b5060405190808252806020026020018201604052801561295057816020015b606081526020019060019003908161293b5790505b50925060005b8451811015610ec85760606000805b8451811015612a4157606061298d8a87848151811061298057fe5b602002602001015161757c565b90508a6001600160a01b031663cdca1753620493e0838c89815181106129af57fe5b60200260200101516040518463ffffffff1660e01b81526004016129d492919061a640565b602060405180830381600088803b1580156129ee57600080fd5b5087f193505050508015612a1f575060408051601f3d908101601f19168201909252612a1c9181019061991c565b60015b612a2857612a38565b808411612a36578093508194505b505b50600101612965565b5080612a4e575050610ec8565b80858481518110612a5b57fe5b60200260200101818152505081868481518110612a7457fe5b60209081029190910101525050600101612956565b80516060908590806001600160401b0381118015612aa657600080fd5b50604051908082528060200260200182016040528015612ad0578160200160208202803683370190505b50604051630bcded8960e21b81529093506001600160a01b03831690632f37b62490612b0090899060040161a18a565b60206040518083038186803b158015612b1857600080fd5b505afa158015612b2c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b5091906198fc565b1580612bd55750604051630bcded8960e21b81526001600160a01b03831690632f37b62490612b8390889060040161a18a565b60206040518083038186803b158015612b9b57600080fd5b505afa158015612baf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612bd391906198fc565b155b15612be157505061185b565b612be9618962565b60405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f90612c15908a9060040161a18a565b60206040518083038186803b158015612c2d57600080fd5b505afa158015612c41573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612c65919061991c565b815260405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f90612c9390899060040161a18a565b60206040518083038186803b158015612cab57600080fd5b505afa158015612cbf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ce3919061991c565b6020820152604051634a46c67360e11b81526001600160a01b0384169063948d8ce690612d14908a9060040161a18a565b60206040518083038186803b158015612d2c57600080fd5b505afa158015612d40573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612d64919061991c565b60408083019190915251634a46c67360e11b81526001600160a01b0384169063948d8ce690612d9790899060040161a18a565b60206040518083038186803b158015612daf57600080fd5b505afa158015612dc3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612de7919061991c565b816060018181525050826001600160a01b031663d4cadf686040518163ffffffff1660e01b815260040160206040518083038186803b158015612e2957600080fd5b505afa158015612e3d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612e61919061991c565b608082015260005b828110156115f357612e9482602001516003670de0b6b3a764000081612e8b57fe5b046001016176d7565b868281518110612ea057fe5b60200260200101511115612eb3576115f3565b836001600160a01b031663f8d6aed4620493e084600001518560400151866020015187606001518c8881518110612ee657fe5b602002602001015189608001516040518863ffffffff1660e01b8152600401612f149695949392919061ab53565b60206040518083038187803b158015612f2c57600080fd5b5086fa93505050508015612f5d575060408051601f3d908101601f19168201909252612f5a9181019061991c565b60015b612f97573d808015612f8b576040519150601f19603f3d011682016040523d82523d6000602084013e612f90565b606091505b50506115f3565b8251612faf906002670de0b6b3a76400005b046176d7565b811115612fbc57506115f3565b80868381518110612fc957fe5b602002602001018181525050858281518110612fe157fe5b602002602001015160001415612ff757506115f3565b50600101612e69565b6060806060613041866001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b15801561287f57600080fd5b9050606061304e86617734565b905084516001600160401b038111801561306757600080fd5b50604051908082528060200260200182016040528015613091578160200160208202803683370190505b50925084516001600160401b03811180156130ab57600080fd5b506040519080825280602002602001820160405280156130df57816020015b60608152602001906001900390816130ca5790505b50935060005b855181101561323a5760606000805b85518110156131f25760606131248661311f89858151811061311257fe5b60200260200101516177cc565b61757c565b90508b6001600160a01b0316632f80bb1d620493e0838d898151811061314657fe5b60200260200101516040518463ffffffff1660e01b815260040161316b92919061a640565b602060405180830381600088803b15801561318557600080fd5b5087f1935050505080156131b6575060408051601f3d908101601f191682019092526131b39181019061991c565b60015b6131bf576131e9565b8315806131cc5750808410155b156131e7578093506131e48c89858151811061298057fe5b94505b505b506001016130f4565b50806131ff57505061323a565b8086848151811061320c57fe5b6020026020010181815250508187848151811061322557fe5b602090810291909101015250506001016130e5565b505050935093915050565b6040805160608181019092526118c9908061326486896080840161a1b7565b6040516020818303038152906040528152602001868860405160200161328b92919061a1b7565b604051602081830303815290604052815260200161786481525083616db0565b60606132b8848484610ed3565b905060005b845181101561103e578181815181106132d257fe5b60200260200101516000146133585761333f8282815181106132f057fe5b602002602001015186838151811061330457fe5b6020026020010151606001516001600160801b031687848151811061332557fe5b6020026020010151604001516001600160801b0316617978565b82828151811061334b57fe5b6020026020010181815250505b6001016132bd565b6060816001600160401b038111801561337857600080fd5b506040519080825280602002602001820160405280156133b257816020015b61339f618991565b8152602001906001900390816133975790505b50905060005b8083146134ba5760018282815181106133cd57fe5b6020908102919091018101519115159101528383828181106133eb57fe5b90506020028101906133fd919061ab7b565b1515905061340a576134b2565b3084848381811061341757fe5b9050602002810190613429919061ab7b565b60405161343792919061a15e565b6000604051808303816000865af19150503d8060008114613474576040519150601f19603f3d011682016040523d82523d6000602084013e613479565b606091505b5083838151811061348657fe5b602002602001015160200184848151811061349d57fe5b60209081029190910101519190915290151590525b6001016133b8565b5092915050565b606081516001600160401b03811180156134da57600080fd5b50604051908082528060200260200182016040528015613504578160200160208202803683370190505b50905060005b825181146135ad577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031683828151811061354857fe5b60200260200101516001600160a01b0316146135885761358383828151811061356d57fe5b60200260200101516001600160a01b031661799c565b61358b565b60125b60ff1682828151811061359a57fe5b602090810291909101015260010161350a565b50919050565b60006060809450945094915050565b60606135ce8385616763565b6000856000015190506000816001600160a01b03166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b15801561361257600080fd5b505afa158015613626573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061364a91906190ed565b8451909150806001600160401b038111801561366557600080fd5b5060405190808252806020026020018201604052801561368f578160200160208202803683370190505b509350826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b1580156136cb57600080fd5b505afa1580156136df573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061370391906190ed565b6001600160a01b0316866001600160a01b0316141580156137a65750826001600160a01b031663f4b9fa756040518163ffffffff1660e01b815260040160206040518083038186803b15801561375857600080fd5b505afa15801561376c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061379091906190ed565b6001600160a01b0316876001600160a01b031614155b156137b35750505061185b565b60005b818110156115f35760006137e18a898b8a86815181106137d257fe5b60200260200101518989617a3e565b9050806137ee57506115f3565b808683815181106137fb57fe5b6020908102919091010152506001016137b6565b6060600085600001516001600160a01b031663bbd7f25585600f0b6040518263ffffffff1660e01b8152600401613846919061a60b565b60206040518083038186803b15801561385e57600080fd5b505afa158015613872573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613896919061991c565b8651604051631e01043960e01b81526001600160a01b0390911690631e010439906138c990600f89900b9060040161a60b565b60206040518083038186803b1580156138e157600080fd5b505afa1580156138f5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613919919061991c565b039050600086600001516001600160a01b031663c582951486600f0b6040518263ffffffff1660e01b8152600401613951919061a60b565b60806040518083038186803b15801561396957600080fd5b505afa15801561397d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906139a19190619f06565b935050505080601203600a0a82816139b557fe5b85519190049250806001600160401b03811180156139d257600080fd5b506040519080825280602002602001820160405280156139fc578160200160208202803683370190505b50935060005b818110156115f357600060608a600001516001600160a01b0316620927c08c602001518c8c8c8881518110613a3357fe5b6020026020010151604051602401613a4d9392919061a78f565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613a8b919061a16e565b6000604051808303818686fa925050503d8060008114613ac7576040519150601f19603f3d011682016040523d82523d6000602084013e613acc565b606091505b509150915060008215613af05781806020019051810190613aed919061991c565b90505b868110613b2a57835b85811015613b215787898281518110613b0e57fe5b6020908102919091010152600101613af9565b505050506115f3565b80888581518110613b3757fe5b602002602001018181525050878481518110613b4f57fe5b602002602001015160001415613b67575050506115f3565b505050600101613a02565b613b7a6189a9565b613b826189a9565b600080805b87518114613c8757613bce6020898381518110613ba057fe5b60200260200101515103878a8481518110613bb757fe5b6020026020010151617cd09092919063ffffffff16565b60006060306001600160a01b03168a8481518110613be857fe5b6020026020010151604051613bfd919061a16e565b6000604051808303816000865af19150503d8060008114613c3a576040519150601f19603f3d011682016040523d82523d6000602084013e613c3f565b606091505b50915091508115613c7d576000613c63602083510383617ce090919063ffffffff16565b905084811115613c7b57838852602088018290529350835b505b5050600101613b87565b5080613c935750613d82565b60005b86518114613d7f57613cc66020888381518110613caf57fe5b6020026020010151510383898481518110613bb757fe5b60006060306001600160a01b0316898481518110613ce057fe5b6020026020010151604051613cf5919061a16e565b6000604051808303816000865af19150503d8060008114613d32576040519150601f19603f3d011682016040523d82523d6000602084013e613d37565b606091505b50915091508115613d75576000613d5b602083510383617ce090919063ffffffff16565b905085811115613d7357838752602087018290529450845b505b5050600101613c96565b50505b93509350939050565b60408401516060906001600160e01b031916613e0d576040805160608101909152613e069080613dbf86896080840161a7ad565b60405160208183030381529060405281526020018688604051602001613de692919061a7ad565b6040516020818303038152906040528152602001617cec81525083616db0565b905061185b565b8151806001600160401b0381118015613e2557600080fd5b50604051908082528060200260200182016040528015613e4f578160200160208202803683370190505b50915060005b81811015611ea2576000606088600001516001600160a01b0316621e84808a604001518a8a8a8881518110613e8657fe5b6020026020010151604051602401613ea09392919061a78f565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613ede919061a16e565b6000604051808303818686fa925050503d8060008114613f1a576040519150601f19603f3d011682016040523d82523d6000602084013e613f1f565b606091505b509150915060008215613f435781806020019051810190613f40919061991c565b90505b80868581518110613f5057fe5b602002602001018181525050858481518110613f6857fe5b602002602001015160001415613f8057505050611ea2565b505050600101613e55565b80516060908590806001600160401b0381118015613fa857600080fd5b50604051908082528060200260200182016040528015613fd2578160200160208202803683370190505b50604051630bcded8960e21b81529093506001600160a01b03831690632f37b6249061400290899060040161a18a565b60206040518083038186803b15801561401a57600080fd5b505afa15801561402e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061405291906198fc565b15806140d75750604051630bcded8960e21b81526001600160a01b03831690632f37b6249061408590889060040161a18a565b60206040518083038186803b15801561409d57600080fd5b505afa1580156140b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906140d591906198fc565b155b156140e357505061185b565b6140eb618962565b60405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f90614117908a9060040161a18a565b60206040518083038186803b15801561412f57600080fd5b505afa158015614143573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614167919061991c565b815260405163f8b2cb4f60e01b81526001600160a01b0384169063f8b2cb4f9061419590899060040161a18a565b60206040518083038186803b1580156141ad57600080fd5b505afa1580156141c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906141e5919061991c565b6020820152604051634a46c67360e11b81526001600160a01b0384169063948d8ce690614216908a9060040161a18a565b60206040518083038186803b15801561422e57600080fd5b505afa158015614242573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614266919061991c565b60408083019190915251634a46c67360e11b81526001600160a01b0384169063948d8ce69061429990899060040161a18a565b60206040518083038186803b1580156142b157600080fd5b505afa1580156142c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906142e9919061991c565b816060018181525050826001600160a01b031663d4cadf686040518163ffffffff1660e01b815260040160206040518083038186803b15801561432b57600080fd5b505afa15801561433f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614363919061991c565b608082015260005b828110156115f3578151614389906002670de0b6b3a7640000612fa9565b86828151811061439557fe5b602002602001015111156143a8576115f3565b836001600160a01b031663ba9530a6620493e084600001518560400151866020015187606001518c88815181106143db57fe5b602002602001015189608001516040518863ffffffff1660e01b81526004016144099695949392919061ab53565b60206040518083038187803b15801561442157600080fd5b5086fa93505050508015614452575060408051601f3d908101601f1916820190925261444f9181019061991c565b60015b614480573d808015612f8b576040519150601f19603f3d011682016040523d82523d6000602084013e612f90565b8086838151811061448d57fe5b6020026020010181815250508582815181106144a557fe5b6020026020010151600014156144bb57506115f3565b5060010161436b565b600083606001516001600160801b03168461016001516040516020016144ea919061a60b565b6040516020818303038152906040528051906020012060001c8161450a57fe5b0690505b9392505050565b60006060806145248587616763565b61452f878787617d40565b92508261453b576111df565b60405163276fdad960e11b81523090634edfb5b290614564908a9087908b908b9060040161a968565b60006040518083038186803b15801561457c57600080fd5b505afa158015614590573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526145b89190810190619934565b87608001819052508660800151915061462f6040518060600160405280878a6040516020016145e892919061a42b565b6040516020818303038152906040528152602001888a60405160200161460f92919061a42b565b6040516020818303038152906040528152602001617ea781525085616db0565b90509450945094915050565b600080856001600160a01b031663901754d786866040518363ffffffff1660e01b815260040161466c92919061a1b7565b60206040518083038186803b15801561468457600080fd5b505afa158015614698573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906146bc91906190ed565b90506001600160a01b0381166146d657600091505061185b565b60006001600160a01b03861615614768576040516370a0823160e01b81526001600160a01b038716906370a082319061471390859060040161a18a565b60206040518083038186803b15801561472b57600080fd5b505afa15801561473f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614763919061991c565b614774565b816001600160a01b0316315b9050838110156147895760009250505061185b565b6040516303c2803f60e31b81526001600160a01b03831690631e1401f890620249f0906147be908a908a908a9060040161a2b2565b60206040518083038187803b1580156147d657600080fd5b5086fa93505050508015614807575060408051601f3d908101601f191682019092526148049181019061991c565b60015b614847573d808015614835576040519150601f19603f3d011682016040523d82523d6000602084013e61483a565b606091505b506000935050505061185b565b925061185b915050565b606061485d8385616763565b60208501516040805160028082526060828101909352816020016020820280368337019050509050858160008151811061489357fe5b60200260200101906001600160a01b031690816001600160a01b03168152505084816001815181106148c157fe5b6001600160a01b03909216602092830291909101909101528351806001600160401b03811180156148f157600080fd5b5060405190808252806020026020018201604052801561491b578160200160208202803683370190505b50935061492661893b565b61492e616799565b905060005b8281101561141c57606061494d8b8984815181106112fe57fe5b604051637c26833760e11b81529091506001600160a01b0387169063f84d066e906149839060019085908a90899060040161a6ce565b600060405180830381600087803b15801561499d57600080fd5b505af19250505080156149d257506040513d6000823e601f3d908101601f191682016040526149cf9190810190619778565b60015b614a00573d8080156113be576040519150601f19603f3d011682016040523d82523d6000602084013e6113c3565b600081600081518110614a0f57fe5b6020026020010151905060008113614a295750505061141c565b80898581518110614a3657fe5b602002602001018181525050505050600101614933565b6003546001600160a01b031681565b8051606090806001600160401b0381118015614a7757600080fd5b50604051908082528060200260200182016040528015614aa1578160200160208202803683370190505b50915060005b81811015611ea257866001600160a01b031663343fbcdd62061a808888888681518110614ad057fe5b60200260200101516040518563ffffffff1660e01b8152600401614af69392919061a2b2565b60206040518083038187803b158015614b0e57600080fd5b5086fa93505050508015614b3f575060408051601f3d908101601f19168201909252614b3c9181019061991c565b60015b614b6d573d808015611e52576040519150601f19603f3d011682016040523d82523d6000602084013e611e57565b80848381518110614b7a57fe5b602002602001018181525050838281518110614b9257fe5b602002602001015160001415614ba85750611ea2565b50600101614aa7565b6000806060614bc08587616763565b8351806001600160401b0381118015614bd857600080fd5b50604051908082528060200260200182016040528015614c02578160200160208202803683370190505b509150614c1189898989617f8e565b945092506001600160a01b038316614c295750614ce3565b60005b81811015614ce0576000614c9a898688604051602001614c4e9392919061a25a565b604051602081830303815290604052898789604051602001614c729392919061a25a565b604051602081830303815290604052898581518110614c8d57fe5b60200260200101516180e3565b905080848381518110614ca957fe5b602002602001018181525050838281518110614cc157fe5b602002602001015160001415614cd75750614ce0565b50600101614c2c565b50505b955095509592505050565b6060614cfa8385616763565b8151806001600160401b0381118015614d1257600080fd5b50604051908082528060200260200182016040528015614d3c578160200160208202803683370190505b50915060005b81811015611ea257866001600160a01b031663144a2752620f42408789888681518110614d6b57fe5b60200260200101516040518563ffffffff1660e01b8152600401614d919392919061a2b2565b60206040518083038187803b158015614da957600080fd5b5086fa93505050508015614dda575060408051601f3d908101601f19168201909252614dd79181019061991c565b60015b614e08573d808015611e52576040519150601f19603f3d011682016040523d82523d6000602084013e611e57565b80848381518110614e1557fe5b602002602001018181525050838281518110614e2d57fe5b602002602001015160001415614e435750611ea2565b50600101614d42565b60006060614e5a8486616763565b8251806001600160401b0381118015614e7257600080fd5b50604051908082528060200260200182016040528015614e9c578160200160208202803683370190505b50915060005b81811015614f11576000614ecb898989898681518110614ebe57fe5b602002602001015161463b565b905080848381518110614eda57fe5b602002602001018181525050838281518110614ef257fe5b602002602001015160001415614f085750614f11565b50600101614ea2565b5060405163901754d760e01b81526001600160a01b0388169063901754d790614f40908990899060040161a1b7565b60206040518083038186803b158015614f5857600080fd5b505afa158015614f6c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614f9091906190ed565b92505094509492505050565b6040805160608181019092526118c99080614fbb86896080840161a1b7565b60405160208183030381529060405281526020018688604051602001614fe292919061a1b7565b60405160208183030381529060405281526020016181d581525083616db0565b606082516001600160401b038111801561501b57600080fd5b50604051908082528060200260200182016040528015615045578160200160208202803683370190505b50905060005b835181146134ba577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031684828151811061508957fe5b60200260200101516001600160a01b0316146150d3576150ce838583815181106150af57fe5b60200260200101516001600160a01b031661821c90919063ffffffff16565b6150df565b826001600160a01b0316315b8282815181106150eb57fe5b602090810291909101015260010161504b565b6040805160608181019092526118c9908061511d86896080840161a1b7565b6040516020818303038152906040528152602001868860405160200161514492919061a1b7565b60405160208183030381529060405281526020016182e681525083616db0565b60606151708385616763565b8151806001600160401b038111801561518857600080fd5b506040519080825280602002602001820160405280156151b2578160200160208202803683370190505b50915060006001600160a01b038616156151d5576151d0878761685a565b6151d8565b60005b905060006001600160a01b038616156151fa576151f5888761685a565b6151fd565b60005b905060005b838110156115f35760016001600160a01b03881661525357615232846395b68fe760e01b8985815181106114f757fe5b87848151811061523e57fe5b602002602001018193508281525050506152ed565b6001600160a01b038916615279576152328363cd7724c360e01b8985815181106114f757fe5b6000615293856395b68fe760e01b8a86815181106114f757fe5b9250905080156152d0576152af8463cd7724c360e01b836168d9565b8885815181106152bb57fe5b602002602001018194508281525050506152eb565b60008784815181106152de57fe5b6020026020010181815250505b505b80158061530d575085828151811061530157fe5b60200260200101516000145b1561531857506115f3565b50600101615202565b8051606090806001600160401b038111801561533c57600080fd5b50604051908082528060200260200182016040528015615366578160200160208202803683370190505b50915060005b8181101561202757856001600160a01b0316631f00ca74620249f086848151811061539357fe5b6020026020010151886040518463ffffffff1660e01b81526004016153b992919061aa96565b60006040518083038187803b1580156153d157600080fd5b5086fa9350505050801561540757506040513d6000823e601f3d908101601f1916820160405261540491908101906198ca565b60015b615435573d808015611fc0576040519150601f19603f3d011682016040523d82523d6000602084013e611fc5565b8060008151811061544257fe5b602002602001015184838151811061545657fe5b60200260200101818152505083828151811061546e57fe5b6020026020010151600014156154845750612027565b5060010161536c565b60606154998385616763565b8151806001600160401b03811180156154b157600080fd5b506040519080825280602002602001820160405280156154db578160200160208202803683370190505b50915060005b81811015611ea257866001600160a01b031663ff1fd974620f4240888888868151811061550a57fe5b60200260200101516040518563ffffffff1660e01b81526004016155309392919061a2b2565b60206040518083038187803b15801561554857600080fd5b5086fa93505050508015615579575060408051601f3d908101601f191682019092526155769181019061991c565b60015b6155a7573d808015611e52576040519150601f19603f3d011682016040523d82523d6000602084013e611e57565b808483815181106155b457fe5b6020026020010181815250508382815181106155cc57fe5b6020026020010151600014156155e25750611ea2565b506001016154e1565b60006060806155fa8587616763565b615605878787617d40565b925082615611576111df565b60405163276fdad960e11b81523090634edfb5b29061563a908a9087908b908b9060040161a968565b60006040518083038186803b15801561565257600080fd5b505afa158015615666573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261568e9190810190619934565b608088018190528451909250806001600160401b03811180156156b057600080fd5b506040519080825280602002602001820160405280156156da578160200160208202803683370190505b50915060005b818110156157c5576000306001600160a01b031663f1ed7fa48b8b8b8b878151811061570857fe5b60200260200101516040518563ffffffff1660e01b815260040161572f949392919061a932565b60206040518083038186803b15801561574757600080fd5b505afa15801561575b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061577f919061991c565b90508084838151811061578e57fe5b6020026020010181815250508382815181106157a657fe5b6020026020010151600014156157bc57506157c5565b506001016156e0565b50509450945094915050565b73e9db8717bc5dfb20aaf538b4a5a02b7791ff430c81565b60008060606157f88587616763565b61580488888888617f8e565b935091506001600160a01b03821661581b57614ce3565b8351806001600160401b038111801561583357600080fd5b5060405190808252806020026020018201604052801561585d578160200160208202803683370190505b5060408051606081019091529092506158ca9080615881898789156080850161a25a565b60405160208183030381529060405281526020018986886040516020016158aa9392919061a25a565b60405160208183030381529060405281526020016180e381525086616db0565b915050955095509592505050565b60008060606158e78587616763565b8351806001600160401b03811180156158ff57600080fd5b50604051908082528060200260200182016040528015615929578160200160208202803683370190505b508851604051630939d86360e11b81529193506001600160a01b031690631273b0c69061595c908a908a9060040161a1b7565b60206040518083038186803b15801561597457600080fd5b505afa158015615988573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906159ac91906190ed565b925060006001600160a01b038416156159ca57506001935086615a69565b8851604051630939d86360e11b81526001600160a01b0390911690631273b0c6906159fb908a908c9060040161a1b7565b60206040518083038186803b158015615a1357600080fd5b505afa158015615a27573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190615a4b91906190ed565b93506001600160a01b038416615a625750506111df565b5060009350855b836001600160a01b031663dd58b41c6040518163ffffffff1660e01b815260040160206040518083038186803b158015615aa257600080fd5b505afa158015615ab6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190615ada91906198fc565b615ae55750506111df565b615b5d60405180606001604052808987858e60200151604051602001615b0e949392919061a1d1565b60405160208183030381529060405281526020018a87858e60200151604051602001615b3d949392919061a1d1565b6040516020818303038152906040528152602001616fad81525087616db0565b925050509450945094915050565b606083516001600160401b0381118015615b8457600080fd5b50604051908082528060200260200182016040528015615bae578160200160208202803683370190505b50905060005b8451811461103e577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316858281518110615bf257fe5b60200260200101516001600160a01b031614615c3e57615c398484878481518110615c1957fe5b60200260200101516001600160a01b031661839b9092919063ffffffff16565b615c41565b60005b828281518110615c4d57fe5b6020908102919091010152600101615bb4565b8051606090806001600160401b0381118015615c7b57600080fd5b50604051908082528060200260200182016040528015615ca5578160200160208202803683370190505b50915060005b81811015611ea257866001600160a01b031663838e6a22620493e08888888681518110615cd457fe5b60200260200101516040518563ffffffff1660e01b8152600401615cfa9392919061a2b2565b60206040518083038187803b158015615d1257600080fd5b5086fa93505050508015615d43575060408051601f3d908101601f19168201909252615d409181019061991c565b60015b615d71573d808015611e52576040519150601f19603f3d011682016040523d82523d6000602084013e611e57565b80848381518110615d7e57fe5b60200260200101818152505050600101615cab565b600084608001515160001415615dab5750600061185b565b84604001516001600160a01b031663418436bc6207a12087606001516001600160a01b0316876001600160a01b031614615de55786615dfb565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b88606001516001600160a01b0316876001600160a01b031614615e1e5786615e34565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b8660008b608001516040518763ffffffff1660e01b8152600401615e5c95949392919061a2d6565b60206040518083038187803b158015615e7457600080fd5b5086fa93505050508015615ea5575060408051601f3d908101601f19168201909252615ea29181019061991c565b60015b615ee3573d808015615ed3576040519150601f19603f3d011682016040523d82523d6000602084013e615ed8565b606091505b50600091505061185b565b6000615eee85618467565b60ff1690506000615efe87618467565b60ff169050670de0b6b3a764000081600a0a83600a0a8786020281615f1f57fe5b0481615f2757fe5b04935050505061185b565b60006060615f408486616763565b8251806001600160401b0381118015615f5857600080fd5b50604051908082528060200260200182016040528015615f82578160200160208202803683370190505b509150615fed60405180606001604052808988604051602001615fa692919061a1b7565b60405160208183030381529060405281526020018989604051602001615fcd92919061a1b7565b604051602081830303815290604052815260200161847281525085616db0565b60405163901754d760e01b81529092506001600160a01b0388169063901754d790614f40908990899060040161a1b7565b6160266189a9565b61602e6189a9565b6000198060005b8651811461612a57616065602088838151811061604e57fe5b6020026020010151510387898481518110613bb757fe5b60006060306001600160a01b031689848151811061607f57fe5b6020026020010151604051616094919061a16e565b6000604051808303816000865af19150503d80600081146160d1576040519150601f19603f3d011682016040523d82523d6000602084013e6160d6565b606091505b509150915081156161205760006160fa602083510383617ce090919063ffffffff16565b905060008111801561610b57508481105b1561611e57838752602087018290529350835b505b5050600101616035565b5060001981141561613b5750613d82565b60005b87518114613d7f5761616e602089838151811061615757fe5b60200260200101515103838a8481518110613bb757fe5b60006060306001600160a01b03168a848151811061618857fe5b602002602001015160405161619d919061a16e565b6000604051808303816000865af19150503d80600081146161da576040519150601f19603f3d011682016040523d82523d6000602084013e6161df565b606091505b50915091508115616229576000616203602083510383617ce090919063ffffffff16565b905060008111801561621457508581105b1561622757838852602088018290529450845b505b505060010161613e565b6002546001600160a01b031681565b60606000836001600160a01b031663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b15801561627f57600080fd5b505afa158015616293573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906162b791906190ed565b905060018351036001600160401b03811180156162d357600080fd5b506040519080825280602002602001820160405280156162fd578160200160208202803683370190505b50915060005b8251811015616528576060826001600160a01b0316635b1dc86f620249f087858151811061632d57fe5b602002602001015188866001018151811061634457fe5b60200260200101516040518463ffffffff1660e01b815260040161636992919061a1b7565b60006040518083038187803b15801561638157600080fd5b5086fa935050505080156163b757506040513d6000823e601f3d908101601f191682016040526163b491908101906194e1565b60015b616406573d8080156163e5576040519150601f19603f3d011682016040523d82523d6000602084013e6163ea565b606091505b5050604080516000815260208101909152935061652b92505050565b60006001825110156164335760405162461bcd60e51b815260040161642a9061a893565b60405180910390fd5b60005b825181101561651c57600083828151811061644d57fe5b60200260200101516001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561648d57600080fd5b505afa1580156164a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906164c5919061991c565b905082811115616513578092508382815181106164de57fe5b60200260200101518887815181106164f257fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b50600101616436565b50505050600101616303565b50505b92915050565b6000606085600001516001600160a01b03166321f8a72187600001516001600160a01b0316639232494e6040518163ffffffff1660e01b815260040160206040518083038186803b15801561658557600080fd5b505afa158015616599573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906165bd919061991c565b6040518263ffffffff1660e01b81526004016165d9919061a60b565b60206040518083038186803b1580156165f157600080fd5b505afa158015616605573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061662991906190ed565b91508560200151516000141561663e5761675a565b6000805b8760200151518110156167575760028860200151828151811061666157fe5b60200260200101515110156166755761674f565b836001600160a01b0316637f9c0ecd620493e08a60200151848151811061669857fe5b60200260200101518860018a5103815181106166b057fe5b60200260200101516040518463ffffffff1660e01b81526004016166d592919061a4c2565b60206040518083038187803b1580156166ed57600080fd5b5086fa9350505050801561671e575060408051601f3d908101601f1916820190925261671b9181019061991c565b60015b6167275761674f565b8281111561674d578092508860200151828151811061674257fe5b602002602001015193505b505b600101616642565b50505b94509492505050565b806001600160a01b0316826001600160a01b031614156167955760405162461bcd60e51b815260040161642a9061a809565b5050565b6167a161893b565b50604080516080810182523080825260006020830181905292820152606081019190915290565b604080516001808252818301909252606091829190816020015b6167ea6189c3565b8152602001906001900390816167e25790505090506040518060a00160405280856000015181526020016000815260200160018152602001848152602001604051806020016040528060008152508152508160008151811061684857fe5b60209081029190910101529392505050565b6040516303795fb160e11b81526000906001600160a01b038416906306f2bf629061688990859060040161a18a565b60206040518083038186803b1580156168a157600080fd5b505afa1580156168b5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061450e91906190ed565b6000806001600160a01b0385166168ef57610ecb565b6060856001600160a01b0316620249f08686604051602401616911919061a60b565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161694f919061a16e565b6000604051808303818686fa925050503d806000811461698b576040519150601f19603f3d011682016040523d82523d6000602084013e616990565b606091505b50909250905081156169b357808060200190518101906169b0919061991c565b92505b50935093915050565b600080600080846001600160a01b031663d9638d368b602001516040518263ffffffff1660e01b81526004016169f2919061a60b565b60a06040518083038186803b158015616a0a57600080fd5b505afa158015616a1e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190616a429190619f3b565b94509450505092506000620f424090508a604001516001600160a01b0316896001600160a01b03161415616b6a576000616a818964e8d4a510006184c2565b90506000616aa56b033b2e3c9fd0803ce8000000616a9f88856184f8565b906184c2565b9050848110616abd5760009650505050505050616c73565b6000616b4c670de0b6b3a7640000616b468c6001600160a01b031663568d4b6f6040518163ffffffff1660e01b815260040160206040518083038186803b158015616b0757600080fd5b505afa158015616b1b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190616b3f919061991c565b86906184c2565b90618514565b90506000616b5a848361853e565b9850616c73975050505050505050565b8a604001516001600160a01b03168a6001600160a01b03161415616c6a578784811115616b9f57600095505050505050616c73565b6000616bbb6b033b2e3c9fd0803ce8000000616a9f888561853e565b9050838111616bd35760009650505050505050616c73565b6000616c588a6001600160a01b031663fae036d56040518163ffffffff1660e01b815260040160206040518083038186803b158015616c1157600080fd5b505afa158015616c25573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190616c49919061991c565b670de0b6b3a7640000906184f8565b90506000616b5a82616b4686886184c2565b60009450505050505b9695505050505050565b600080616c886189f5565b85806020019051810190616c9c91906199c8565b91509150600085806020019051810190616cb691906199ac565b905060006060306322db5ed160e21b858786616cd18c61855d565b604051602401616ce4949392919061a8ca565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051616d22919061a16e565b600060405180830381855afa9150503d8060008114616d5d576040519150601f19603f3d011682016040523d82523d6000602084013e616d62565b606091505b509150915081616d7a5760009550505050505061450e565b80806020019051810190616d8e91906198ca565b600081518110616d9a57fe5b6020026020010151955050505050509392505050565b606081516001600160401b0381118015616dc957600080fd5b50604051908082528060200260200182016040528015616df3578160200160208202803683370190505b509050815160001415616e055761652b565b6000616e368460000151856020015185600081518110616e2157fe5b6020026020010151876040015163ffffffff16565b905080616e43575061652b565b6000616e608560200151866000015184886040015163ffffffff16565b905080616e6e57505061652b565b60005b8451811015616fa45760005b6005811015616f6657616ea4868381518110616e9557fe5b6020026020010151848661859e565b935083616eb057616f66565b616ebf6127156127108661859e565b935083616ecb57616f66565b6000616ee888602001518960000151878b6040015163ffffffff16565b905080616ef55750616f66565b809350868381518110616f0457fe5b60200260200101518410616f5d576000878481518110616f2057fe5b6020026020010151612710898681518110616f3757fe5b602002602001015187030281616f4957fe5b04905060058111616f5b575050616f66565b505b50600101616e7d565b50616f85858281518110616f7657fe5b6020026020010151838561859e565b848281518110616f9157fe5b6020908102919091010152600101616e71565b50505092915050565b600080600080600087806020019051810190616fc99190619142565b9350935093509350816001600160a01b0316846001600160a01b031614156170b3576040516351400f0b60e11b81526001600160a01b0384169063a2801e1690620493e09061701c908a9060040161a60b565b60206040518083038187803b15801561703457600080fd5b5086fa93505050508015617065575060408051601f3d908101601f191682019092526170629181019061991c565b60015b6170a7573d808015617093576040519150601f19603f3d011682016040523d82523d6000602084013e617098565b606091505b5060009550505050505061450e565b945061450e9350505050565b60405163ca19ebd960e01b81526001600160a01b0382169063ca19ebd990620493e09061701c9087908b9060040161a19e565b6060600282845103101561710c5760405162461bcd60e51b815260040161642a9061a7c5565b617114618a15565b5060408051606080820183526101f48252610bb86020830152612710828401528251600380825260808201909452919290919081602001602082028036833701905050905060008086868151811061716857fe5b60200260200101519050600087876001018151811061718357fe5b6020026020010151905060005b60038110156172785760008a6001600160a01b0316631698ee8285858a86600381106171b857fe5b60200201516040518463ffffffff1660e01b81526004016171db9392919061a653565b60206040518083038186803b1580156171f357600080fd5b505afa158015617207573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061722b91906190ed565b9050617236816185f6565b1561726f578086868060010197508151811061724e57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b50600101617190565b505050806172885750505061450e565b855185600201141561737e57806001600160401b03811180156172aa57600080fd5b506040519080825280602002602001820160405280156172de57816020015b60608152602001906001900390816172c95790505b50935060005b818110156173755760408051600180825281830190925290602080830190803683370190505085828151811061731657fe5b602002602001018190525082818151811061732d57fe5b602002602001015185828151811061734157fe5b602002602001015160008151811061735557fe5b6001600160a01b03909216602092830291909101909101526001016172e4565b5050505061450e565b606061738e8888886001016170e6565b90508051600014156173a3575050505061450e565b805182026001600160401b03811180156173bc57600080fd5b506040519080825280602002602001820160405280156173f057816020015b60608152602001906001900390816173db5790505b50945060005b828110156175705760005b825181101561756757825182810282019084908390811061741e57fe5b6020026020010151516001016001600160401b038111801561743f57600080fd5b50604051908082528060200260200182016040528015617469578160200160208202803683370190505b5088828151811061747657fe5b602002602001018190525085838151811061748d57fe5b60200260200101518882815181106174a157fe5b60200260200101516000815181106174b557fe5b60200260200101906001600160a01b031690816001600160a01b03168152505060005b8483815181106174e457fe5b60200260200101515181101561755d5784838151811061750057fe5b6020026020010151818151811061751357fe5b602002602001015189838151811061752757fe5b6020026020010151826001018151811061753d57fe5b6001600160a01b03909216602092830291909101909101526001016174d8565b5050600101617401565b506001016173f6565b50505050509392505050565b60606002835110158015617594575081516001018351145b6175b05760405162461bcd60e51b815260040161642a9061a84e565b81516003028351601402016001600160401b03811180156175d057600080fd5b506040519080825280601f01601f1916602001820160405280156175fb576020820181803683370190505b5090506020810160005b84518110156165285780156176aa57600084600183038151811061762557fe5b60200260200101516001600160a01b031663ddca3f436040518163ffffffff1660e01b815260040160206040518083038186803b15801561766557600080fd5b505afa158015617679573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061769d9190619ec0565b60e81b8352506003909101905b60008582815181106176b857fe5b602090810291909101015160601b835250601490910190600101617605565b600082820283158015906176f45750828482816176f057fe5b0414155b1561770357600091505061652b565b6706f05b59d3b200008101818110156177215760009250505061652b565b670de0b6b3a76400009004949350505050565b606081516001600160401b038111801561774d57600080fd5b50604051908082528060200260200182016040528015617777578160200160208202803683370190505b50905060005b82518110156135ad5782600182855103038151811061779857fe5b60200260200101518282815181106177ac57fe5b6001600160a01b039092166020928302919091019091015260010161777d565b606081516001600160401b03811180156177e557600080fd5b5060405190808252806020026020018201604052801561780f578160200160208202803683370190505b50905060005b82518110156135ad5782600182855103038151811061783057fe5b602002602001015182828151811061784457fe5b6001600160a01b0390921660209283029190910190910152600101617815565b60008060008580602001905181019061787d9190619109565b9150915060008580602001905181019061789791906190ed565b90503063e8e4af098385846178ab8a61855d565b6040518563ffffffff1660e01b81526004016178ca949392919061a1fc565b60006040518083038186803b1580156178e257600080fd5b505afa92505050801561791757506040513d6000823e601f3d908101601f1916820160405261791491908101906198ca565b60015b617958573d808015617945576040519150601f19603f3d011682016040523d82523d6000602084013e61794a565b606091505b50600094505050505061450e565b8060008151811061796557fe5b602002602001015194505050505061450e565b600061185b83616b4661798c82600161853e565b61799688876184c2565b906184f8565b60006012905060006060836001600160a01b031660405180604001604052806004815260200163313ce56760e01b8152506040516179da919061a16e565b600060405180830381855afa9150503d8060008114617a15576040519150601f19603f3d011682016040523d82523d6000602084013e617a1a565b606091505b5091509150818015617a2e57506020815110155b15610d265761185b816000617ce0565b600080600080846001600160a01b031663d9638d368b602001516040518263ffffffff1660e01b8152600401617a74919061a60b565b60a06040518083038186803b158015617a8c57600080fd5b505afa158015617aa0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190617ac49190619f3b565b945094505050925089604001516001600160a01b0316886001600160a01b03161415617bdb5760008790506000617b74886001600160a01b031663568d4b6f6040518163ffffffff1660e01b815260040160206040518083038186803b158015617b2d57600080fd5b505afa158015617b41573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190617b65919061991c565b670de0b6b3a76400009061853e565b90506000617b8e82616b4685670de0b6b3a76400006184c2565b90506000617bac6b033b2e3c9fd0803ce8000000616a9f89856184f8565b9050858110617bc5576000975050505050505050616c73565b6000616b5a60016179968564e8d4a51000618514565b89604001516001600160a01b0316896001600160a01b03161415617cc0576000617c0a8864e8d4a510006184c2565b90506000617c4a886001600160a01b031663fae036d56040518163ffffffff1660e01b815260040160206040518083038186803b158015616c1157600080fd5b90506000617c64670de0b6b3a7640000616b4685856184c2565b905085811115617c7d5760009650505050505050616c73565b6000617c996b033b2e3c9fd0803ce8000000616a9f898561853e565b9050848111617cb2576000975050505050505050616c73565b509550616c73945050505050565b5060009998505050505050505050565b617cdb838383618802565b505050565b600061450e8383618829565b600080617cf76189f5565b85806020019051810190617d0b91906199c8565b91509150600085806020019051810190617d2591906199ac565b9050600060603063205e01d760e11b858786616cd18c61855d565b600080846020015190506060816001600160a01b031663910ffc7187606001516001600160a01b0316876001600160a01b031614617d7e5786617d94565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b88606001516001600160a01b0316876001600160a01b031614617db75786617dcd565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b604080516000815260208101918290526001600160e01b031960e086901b16909152617e019291906001906024810161a27e565b60006040518083038186803b158015617e1957600080fd5b505afa158015617e2d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052617e559190810190619579565b505090508051866000015110617e7157506000915061450e9050565b80866000015181518110617e8157fe5b6020026020010151925060f883901c60001c60bb141561202757506000915061450e9050565b600080617eb2618a33565b84806020019051810190617ec691906191f0565b91509150600086806020019051810190617ee091906191f0565b50604051633c7b5fe960e21b8152909150309063f1ed7fa490617f0d908590859088908b9060040161a932565b60206040518083038186803b158015617f2557600080fd5b505afa925050508015617f55575060408051601f3d908101601f19168201909252617f529181019061991c565b60015b617f83573d808015617945576040519150601f19603f3d011682016040523d82523d6000602084013e61794a565b935061450e92505050565b6000806060866001600160a01b03166357a281dc86866040518363ffffffff1660e01b8152600401617fc192919061a1b7565b60006040518083038186803b158015617fd957600080fd5b505afa158015617fed573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261801591908101906194e1565b9050600191508051600014156180ae576040516315e8a07760e21b81526001600160a01b038816906357a281dc90618053908790899060040161a1b7565b60006040518083038186803b15801561806b57600080fd5b505afa15801561807f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526180a791908101906194e1565b9050600091505b805186106180c357600080925092505061675a565b8086815181106180cf57fe5b602002602001015192505094509492505050565b600080600080868060200190518101906180fd91906191a0565b92509250925080156181a157604051633cd0243b60e11b81526001600160a01b038316906379a0487690620493e09061813d906000908a9060040161a19e565b604080518083038187803b15801561815457600080fd5b5086fa93505050508015618185575060408051601f3d908101601f1916820190925261818291810190619ee3565b60015b618195576000935050505061450e565b50935061450e92505050565b6040516366410a2160e01b81526001600160a01b038316906366410a2190620493e09061813d906000908a9060040161a19e565b6000806000858060200190518101906181ee9190619109565b9150915060008580602001905181019061820891906190ed565b9050306330d6570d8385846178ab8a61855d565b6000806060846001600160a01b03166370a0823160e01b85604051602401618244919061a18a565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051618282919061a16e565b600060405180830381855afa9150503d80600081146182bd576040519150601f19603f3d011682016040523d82523d6000602084013e6182c2565b606091505b50915091508180156182d657506020815110155b15616528576118c9816000617ce0565b6000806000858060200190518101906182ff9190619109565b9150915060008580602001905181019061831991906190ed565b90503063a469841762061a808486856183318b61855d565b6040518663ffffffff1660e01b8152600401618350949392919061a1fc565b60006040518083038187803b15801561836857600080fd5b5086fa9350505050801561791757506040513d6000823e601f3d908101601f1916820160405261791491908101906198ca565b6000806060856001600160a01b031663dd62ed3e60e01b86866040516024016183c592919061a1b7565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051618403919061a16e565b600060405180830381855afa9150503d806000811461843e576040519150601f19603f3d011682016040523d82523d6000602084013e618443565b606091505b509150915081801561845757506020815110155b1561202757616c73816000617ce0565b600061652b82618853565b60008060008580602001905181019061848b9190619109565b91509150600080868060200190518101906184a69190619109565b915091506184b68484838961463b565b98975050505050505050565b6000826184d15750600061652b565b828202828482816184de57fe5b041461450e5761450e6184f3600186866188ba565b618914565b60008282018381101561450e5761450e6184f3600086866188ba565b60008161852a5761852a6184f3600385856188ba565b600082848161853557fe5b04949350505050565b600082821115618557576185576184f3600285856188ba565b50900390565b60408051600180825281830190925260609160208083019080368337019050509050818160008151811061858d57fe5b602002602001018181525050919050565b60008315806185ab575081155b806185b4575082155b156185c15750600061450e565b838202828582816185ce57fe5b04146185de57600091505061450e565b83600185038201816185ec57fe5b0495945050505050565b6000813b806186095760009150506111ee565b50816001600160a01b0316630dfe16816040518163ffffffff1660e01b815260040160206040518083038186803b15801561864357600080fd5b505afa158015618657573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061867b91906190ed565b6001600160a01b03166370a08231836040518263ffffffff1660e01b81526004016186a6919061a18a565b60206040518083038186803b1580156186be57600080fd5b505afa1580156186d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906186f6919061991c565b618702575060006111ee565b816001600160a01b031663d21220a76040518163ffffffff1660e01b815260040160206040518083038186803b15801561873b57600080fd5b505afa15801561874f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061877391906190ed565b6001600160a01b03166370a08231836040518263ffffffff1660e01b815260040161879e919061a18a565b60206040518083038186803b1580156187b657600080fd5b505afa1580156187ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906187ee919061991c565b6187fa575060006111ee565b506001919050565b8160200183511015618821576188216184f3600585518560200161891c565b910160200152565b6000816020018351101561884a5761884a6184f3600585518560200161891c565b50016020015190565b60006001600160a01b03821673c02aaa39b223fe8d0a0e5c4f27ead9083c756cc21415618882575060126111ee565b600082604051602001618895919061a141565b60408051808303601f190181529190528051602090910120600f166004019392505050565b606063e946c1bb60e01b8484846040516024016188d99392919061a69f565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915290509392505050565b805160208201fd5b6060632800659560e01b8484846040516024016188d99392919061a6c0565b60408051608081018252600080825260208201819052918101829052606081019190915290565b6040518060a0016040528060008152602001600081526020016000815260200160008152602001600081525090565b60408051808201909152606081526000602082015290565b604051806040016040528060008152602001606081525090565b6040518060a0016040528060008019168152602001600081526020016000815260200160008152602001606081525090565b604080516060810182526000808252602082018190529181019190915290565b60405180606001604052806003906020820280368337509192915050565b6040518060a001604052806000815260200160006001600160a01b0316815260200160006001600160a01b0316815260200160006001600160a01b03168152602001606081525090565b803561652b8161ac6b565b805161652b8161ac6b565b60008083601f840112618aa4578182fd5b5081356001600160401b03811115618aba578182fd5b6020830191508360208083028501011115618ad457600080fd5b9250929050565b600082601f830112618aeb578081fd5b8135618afe618af98261abe5565b61abbf565b818152915060208083019084810181840286018201871015618b1f57600080fd5b60005b84811015618b47578135618b358161ac6b565b84529282019290820190600101618b22565b505050505092915050565b600082601f830112618b62578081fd5b8135618b70618af98261abe5565b818152915060208083019084810160005b84811015618b4757618b98888484358a0101618d41565b84529282019290820190600101618b81565b600082601f830112618bba578081fd5b8135618bc8618af98261abe5565b818152915060208083019084810181840286018201871015618be957600080fd5b60005b84811015618b47578135618bff8161ac6b565b84529282019290820190600101618bec565b600082601f830112618c21578081fd5b8135618c2f618af98261abe5565b8181529150602080830190848101608080850287018301881015618c5257600080fd5b60005b85811015618c7957618c678984619040565b85529383019391810191600101618c55565b50505050505092915050565b600082601f830112618c95578081fd5b8135618ca3618af98261abe5565b818152915060208083019084810181840286018201871015618cc457600080fd5b60005b84811015618b4757813584529282019290820190600101618cc7565b600082601f830112618cf3578081fd5b8151618d01618af98261abe5565b818152915060208083019084810181840286018201871015618d2257600080fd5b60005b84811015618b4757815184529282019290820190600101618d25565b600082601f830112618d51578081fd5b8135618d5f618af98261ac04565b9150808252836020828501011115618d7657600080fd5b8060208401602084013760009082016020015292915050565b600082601f830112618d9f578081fd5b8151618dad618af98261ac04565b9150808252836020828501011115618dc457600080fd5b6134ba81602084016020860161ac27565b80516002811061652b57600080fd5b600060608284031215618df5578081fd5b618dff606061abbf565b90508135618e0c8161ac6b565b81526020820135618e1c8161ac80565b60208201526040820135618e2f8161ac80565b604082015292915050565b600060608284031215618e4b578081fd5b618e55606061abbf565b90508151618e628161ac6b565b81526020820151618e728161ac80565b60208201526040820151618e2f8161ac80565b600060408284031215618e96578081fd5b618ea0604061abbf565b90508135618ead8161ac6b565b81526020820135618ebd8161ac6b565b602082015292915050565b600060a08284031215618ed9578081fd5b618ee360a061abbf565b9050813581526020820135618ef78161ac6b565b60208201526040820135618f0a8161ac6b565b60408201526060820135618f1d8161ac6b565b606082015260808201356001600160401b03811115618f3b57600080fd5b618f4784828501618d41565b60808301525092915050565b6000610180808385031215618f66578182fd5b618f6f8161abbf565b915050618f7c8383618a7d565b8152618f8b8360208401618a7d565b6020820152618f9d83604084016190a3565b6040820152618faf83606084016190a3565b6060820152618fc183608084016190a3565b6080820152618fd38360a08401618a7d565b60a0820152618fe58360c08401618a7d565b60c0820152618ff78360e08401618a7d565b60e082015261010061900b84828501618a7d565b908201526101208281013590820152610140619029848285016190ba565b818301525061016080830135818301525092915050565b600060808284031215619051578081fd5b61905b608061abbf565b905081356004811061906c57600080fd5b8152602082013560ff8116811461908257600080fd5b80602083015250604082013560408201526060820135606082015292915050565b80356001600160801b038116811461652b57600080fd5b80356001600160401b038116811461652b57600080fd5b6000602082840312156190e2578081fd5b813561450e8161ac6b565b6000602082840312156190fe578081fd5b815161450e8161ac6b565b6000806040838503121561911b578081fd5b82516191268161ac6b565b60208401519092506191378161ac6b565b809150509250929050565b60008060008060808587031215619157578182fd5b84516191628161ac6b565b60208601519094506191738161ac6b565b60408601519093506191848161ac6b565b60608601519092506191958161ac6b565b939692955090935050565b6000806000606084860312156191b4578081fd5b83516191bf8161ac6b565b60208501519093506191d08161ac6b565b604085015190925080151581146191e5578182fd5b809150509250925092565b60008060408385031215619202578182fd5b825161920d8161ac6b565b60208401519092506001600160401b0380821115619229578283fd5b9084019060a0828703121561923c578283fd5b61924660a061abbf565b825181526192578760208501618a88565b60208201526192698760408501618a88565b604082015261927b8760608501618a88565b6060820152608083015182811115619291578485fd5b61929d88828601618d8f565b6080830152508093505050509250929050565b600080600080600060a086880312156192c7578283fd5b85356192d28161ac6b565b945060208601356192e28161ac6b565b935060408601356192f28161ac6b565b925060608601356193028161ac6b565b915060808601356001600160401b0381111561931c578182fd5b61932888828901618c85565b9150509295509295909350565b6000806000806080858703121561934a578182fd5b84356193558161ac6b565b935060208501356193658161ac6b565b925060408501356193758161ac6b565b915060608501356001600160401b0381111561938f578182fd5b61939b87828801618c85565b91505092959194509250565b600080600080608085870312156193bc578182fd5b84356193c78161ac6b565b935060208501356193d78161ac6b565b925060408501356193e78161ac6b565b9396929550929360600135925050565b60008060006060848603121561940b578081fd5b83356194168161ac6b565b925060208401356001600160401b0380821115619431578283fd5b61943d87838801618adb565b93506040860135915080821115619452578283fd5b5061945f86828701618c85565b9150509250925092565b600080600080600060a08688031215619480578283fd5b853561948b8161ac6b565b94506020860135935060408601356192f28161ac6b565b600080602083850312156194b4578182fd5b82356001600160401b038111156194c9578283fd5b6194d585828601618a93565b90969095509350505050565b600060208083850312156194f3578182fd5b82516001600160401b03811115619508578283fd5b8301601f81018513619518578283fd5b8051619526618af98261abe5565b8181528381019083850185840285018601891015619542578687fd5b8694505b8385101561956d5780516195598161ac6b565b835260019490940193918501918501619546565b50979650505050505050565b60008060006060848603121561958d578081fd5b83516001600160401b03808211156195a3578283fd5b818601915086601f8301126195b6578283fd5b81516195c4618af98261abe5565b80828252602080830192508086018b8283870289010111156195e4578788fd5b8796505b848710156196065780518452600196909601959281019281016195e8565b50890151909750935050508082111561961d578283fd5b5061962a86828701618ce3565b92505061963a8560408601618dd5565b90509250925092565b600080600060608486031215619657578081fd5b83356001600160401b038082111561966d578283fd5b61967987838801618b52565b9450602086013591508082111561968e578283fd5b5061969b86828701618b52565b925050604084013590509250925092565b6000602082840312156196bd578081fd5b81356001600160401b038111156196d2578182fd5b61185b84828501618baa565b600080604083850312156196f0578182fd5b82356001600160401b03811115619705578283fd5b61971185828601618baa565b92505060208301356191378161ac6b565b600080600060608486031215619736578081fd5b83356001600160401b0381111561974b578182fd5b61975786828701618baa565b93505060208401356197688161ac6b565b915060408401356191e58161ac6b565b6000602080838503121561978a578182fd5b82516001600160401b0381111561979f578283fd5b8301601f810185136197af578283fd5b80516197bd618af98261abe5565b81815283810190838501858402850186018910156197d9578687fd5b8694505b8385101561956d5780518352600194909401939185019185016197dd565b60008060006060848603121561980f578081fd5b83356001600160401b0380821115619825578283fd5b818601915086601f830112619838578283fd5b8135619846618af98261abe5565b80828252602080830192508086016101808c838288028a01011115619869578889fd5b8897505b858810156198955761987f8d83618f53565b855260019790970196938201939081019061986d565b509198508901359450505050808211156198ad578283fd5b506198ba86828701618c11565b92505061963a8560408601618a7d565b6000602082840312156198db578081fd5b81516001600160401b038111156198f0578182fd5b61185b84828501618ce3565b60006020828403121561990d578081fd5b8151801515811461450e578182fd5b60006020828403121561992d578081fd5b5051919050565b600060208284031215619945578081fd5b81516001600160401b0381111561995a578182fd5b61185b84828501618d8f565b60008060006060848603121561997a578081fd5b83356199858161ac6b565b925060208401356001600160401b03808211156199a0578283fd5b61943d87838801618baa565b6000602082840312156199bd578081fd5b815161450e8161ac96565b600080608083850312156199da578182fd5b82516199e58161ac96565b91506199f48460208501618e3a565b90509250929050565b60008060008084860360a0811215619a13578283fd5b6040811215619a20578283fd5b50619a2b604061abbf565b853581526020860135619a3d8161ac6b565b602082015293506040850135619a528161ac6b565b92506060850135619a628161ac6b565b915060808501356001600160401b0381111561938f578182fd5b60008060008060808587031215619a91578182fd5b84356001600160401b0380821115619aa7578384fd5b9086019060408289031215619aba578384fd5b619ac4604061abbf565b8235619acf8161ac6b565b815260208381013583811115619ae3578687fd5b80850194505089601f850112619af7578586fd5b8335619b05618af98261abe5565b81815282810190868401895b84811015619b3a57619b288f8784358c0101618adb565b84529285019290850190600101619b11565b50508084860152505050819750619b538a828b01618a7d565b96505050619b648860408901618a7d565b93506060870135915080821115619b79578283fd5b5061939b87828801618c85565b60008060008060c08587031215619b9b578182fd5b619ba58686618de4565b93506060850135619bb58161ac96565b92506080850135619bc58161ac96565b915060a08501356001600160401b0381111561938f578182fd5b60008060008060a08587031215619bf4578182fd5b619bfe8686618e85565b93506040850135619a528161ac6b565b600060208284031215619c1f578081fd5b81356001600160401b0380821115619c35578283fd5b9083019060a08286031215619c48578283fd5b619c5260a061abbf565b619c5c8684618a7d565b8152602083013582811115619c6f578485fd5b619c7b87828601618adb565b602083015250604083013582811115619c92578485fd5b619c9e87828601618b52565b604083015250606083013582811115619cb5578485fd5b619cc187828601618adb565b606083015250608083013582811115619cd8578485fd5b619ce487828601618c85565b60808301525095945050505050565b60008060008060808587031215619d08578182fd5b84356001600160401b0380821115619d1e578384fd5b619d2a88838901618ec8565b955060208701359150619d3c8261ac6b565b909350604086013590619d4e8261ac6b565b90925060608601359080821115619b79578283fd5b60008060008060808587031215619d78578182fd5b84356001600160401b03811115619d8d578283fd5b619d9987828801618ec8565b94505060208501356193d78161ac6b565b60008060008060808587031215619dbf578182fd5b84356001600160401b03811115619dd4578283fd5b619de087828801618ec8565b945050602085013592506040850135619df88161ac6b565b915060608501356191958161ac6b565b60008060006102208486031215619e1d578081fd5b619e278585618f53565b9250619e37856101808601619040565b91506102008401356191e58161ac6b565b60008060008084860360c0811215619e5e578283fd5b6060811215619e6b578283fd5b50619e76606061abbf565b8535619e818161ac6b565b8152602086810135908201526040860135619e9b8161ac6b565b604082015293506060850135619eb08161ac6b565b92506080850135619bc58161ac6b565b600060208284031215619ed1578081fd5b815162ffffff8116811461450e578182fd5b60008060408385031215619ef5578182fd5b505080516020909101519092909150565b60008060008060808587031215619f1b578182fd5b505082516020840151604085015160609095015191969095509092509050565b600080600080600060a08688031215619f52578283fd5b5050835160208501516040860151606087015160809097015192989197509594509092509050565b6001600160a01b03169052565b6000815180845260208085019450808401835b83811015619fbf5781516001600160a01b031687529582019590820190600101619f9a565b509495945050505050565b6000815180845260208085019450808401835b83811015619fbf57815187529582019590820190600101619fdd565b6000815180845261a01181602086016020860161ac27565b601f01601f19169290920160200192915050565b80516001600160a01b031682526020808201516001600160e01b03199081169184019190915260409182015116910152565b80516001600160a01b039081168352602080830151151590840152604080830151909116908301526060908101511515910152565b60008151835260208201516040602085015261185b6040850182619ff9565b600081518352602082015160018060a01b0380821660208601528060408501511660408601528060608501511660608601525050608082015160a0608085015261185b60a0850182619ff9565b805161a1038161ac57565b825260208181015160ff169083015260408082015190830152606090810151910152565b6001600160801b03169052565b6001600160401b03169052565b60609190911b6bffffffffffffffffffffffff1916815260140190565b6000828483379101908152919050565b6000825161a18081846020870161ac27565b9190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0392831681529116602082015260400190565b6001600160a01b03948516815292841660208401529083166040830152909116606082015260800190565b6001600160a01b038581168252848116602083015283166040820152608060608201819052600090616c7390830184619fca565b6001600160a01b039485168152928416602084015292166040820152606081019190915260800190565b6001600160a01b039384168152919092166020820152901515604082015260600190565b6001600160a01b038581168252841660208201528215156040820152608060608201819052600090616c7390830184619ff9565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061a31090830184619ff9565b979650505050505050565b6001600160a01b038416815260606020820181905260009061a33f90830185619f87565b8281036040840152616c738185619fca565b6001600160a01b0385168152600061a3688561ac57565b8460208301526080604083015261a3826080830185619fca565b828103606084015261a3108185619fca565b6001600160a01b0389811682526000906101009061a3b18b61ac57565b8a602085015281604085015261a3c98285018b619fca565b9150838203606085015261a3dd828a619fca565b9088166080850152905061a3f08661ac57565b8560a084015282810360c084015261a4088186619fca565b905082810360e084015261a41c8185619fca565b9b9a5050505050505050505050565b6001600160a01b038316815260406020820181905260009061185b9083018461a0ab565b60208082528181018390526000908460408401835b8681101561a49257823561a4778161ac6b565b6001600160a01b03168252918301919083019060010161a464565b509695505050505050565b60006040825261a4b06040830185619f87565b82810360208401526118c98185619fca565b60006040825261a4d56040830185619f87565b90508260208301529392505050565b60006040820160408352808551808352606085019150602092506060838202860101838801855b8381101561a53957605f1988840301855261a527838351619ff9565b9486019492509085019060010161a50b565b5050858103848701526184b68188619fca565b60208082528251828201819052600091906040908185019080840286018301878501865b8381101561a5b357888303603f190185528151805187855261a59488860182619ff9565b918901511515948901949094529487019492509086019060010161a570565b509098975050505050505050565b60006020825261450e6020830184619fca565b901515815260200190565b83151581526001600160a01b03831660208201526060604082018190526000906118c990830184619fca565b90815260200190565b60008482526060602083015261a33f6060830185619ff9565b60006020825261450e6020830184619ff9565b60006040825261a4d56040830185619ff9565b6001600160a01b03938416815291909216602082015262ffffff909116604082015260600190565b6001600160a01b038316815260406020820181905260009061185b90830184619fca565b6060810161a6ac8561ac57565b938152602081019290925260409091015290565b606081016008851061a6ac57fe5b600060e0820161a6dd8761ac61565b868352602060e08185015281875180845261010093508386019150838382028701019350828901855b8281101561a7685787860360ff190184528151805187528581015186880152604080820151908801526060808201519088015260809081015160a09188018290529061a75481890183619ff9565b97505050928401929084019060010161a706565b5050505050828103604084015261a77f8186619f87565b9150506118c9606083018461a057565b600f93840b81529190920b6020820152604081019190915260600190565b600f83900b81526080810161450e602083018461a025565b60208082526024908201527f556e6973776170563353616d706c65722f746f6b656e5061746820746f6f20736040820152631a1bdc9d60e21b606082015260800190565b60208082526025908201527f455243323042726964676553616d706c65722f494e56414c49445f544f4b454e6040820152642fa820a4a960d91b606082015260800190565b60208082526025908201527f556e6973776170563353616d706c65722f696e76616c69642070617468206c656040820152646e6774687360d81b606082015260800190565b6020808252601e908201527f4b79626572444d4d53616d706c65722f4e4f5f504f4f4c535f464f554e440000604082015260600190565b600061a8d6828761a025565b84600f0b606083015283600f0b608083015260c060a0830152616c7360c0830184619fca565b60006060825261a90f606083018661a08c565b828103602084015261a921818661a08c565b915050826040830152949350505050565b60006080825261a945608083018761a0ab565b6001600160a01b0395861660208401529390941660408201526060015292915050565b60006080825261a97b608083018761a0ab565b6020830195909552506001600160a01b0392831660408201529116606090910152919050565b60006102208201905061a9b5828651619f7a565b602085015161a9c76020840182619f7a565b50604085015161a9da604084018261a127565b50606085015161a9ed606084018261a127565b50608085015161aa00608084018261a127565b5060a085015161aa1360a0840182619f7a565b5060c085015161aa2660c0840182619f7a565b5060e085015161aa3960e0840182619f7a565b506101008086015161aa4d82850182619f7a565b505061012085810151908301526101408086015161aa6d8285018261a134565b5050610160858101519083015261aa8861018083018561a0f8565b61185b610200830184619f7a565b60008382526040602083015261185b6040830184619f87565b60008482526060602083015261aac86060830185619f87565b8281036040840152616c738185619f87565b6000858252602060808184015261aaf46080840187619f87565b838103604085015285518082528282019083810283018401848901865b8381101561ab3f57601f1986840301855261ab2d838351619ff9565b9487019492509086019060010161ab11565b5050868103606088015261a41c8189619f87565b958652602086019490945260408501929092526060840152608083015260a082015260c00190565b6000808335601e1984360301811261ab91578283fd5b8301803591506001600160401b0382111561abaa578283fd5b602001915036819003821315618ad457600080fd5b6040518181016001600160401b038111828210171561abdd57600080fd5b604052919050565b60006001600160401b0382111561abfa578081fd5b5060209081020190565b60006001600160401b0382111561ac19578081fd5b50601f01601f191660200190565b60005b8381101561ac4257818101518382015260200161ac2a565b8381111561ac51576000848401525b50505050565b6004811061108657fe5b6002811061108657fe5b6001600160a01b038116811461108657600080fd5b6001600160e01b03198116811461108657600080fd5b80600f0b811461108657600080fdfea2646970667358221220b862ffce3d37a31ff718f243fb74c43f72369e9f8f4ca805b1399b8f3db6bcc664736f6c634300060c0033';
TestERC20BridgeSamplerContract.contractName = 'TestERC20BridgeSampler';
// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
//# sourceMappingURL=test_erc20_bridge_sampler.js.map