import { EncoderOverrides, ContractTxFunctionObj, BaseContract } from '@0x/base-contract';
import { ContractAbi, ContractArtifact, TxData, SupportedProvider } from 'ethereum-types';
import { BigNumber } from '@0x/utils';
import { SimpleContractArtifact } from '@0x/types';
import { Web3Wrapper } from '@0x/web3-wrapper';
export declare class TestERC20BridgeSamplerContract extends BaseContract {
    /**
     * @ignore
     */
    static deployedBytecode: string;
    static contractName: string;
    private readonly _methodABIIndex;
    static deployFrom0xArtifactAsync(artifact: ContractArtifact | SimpleContractArtifact, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: (ContractArtifact | SimpleContractArtifact);
    }): Promise<TestERC20BridgeSamplerContract>;
    static deployWithLibrariesFrom0xArtifactAsync(artifact: ContractArtifact, libraryArtifacts: {
        [libraryName: string]: ContractArtifact;
    }, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: (ContractArtifact | SimpleContractArtifact);
    }): Promise<TestERC20BridgeSamplerContract>;
    static deployAsync(bytecode: string, abi: ContractAbi, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: ContractAbi;
    }): Promise<TestERC20BridgeSamplerContract>;
    /**
     * @returns      The contract ABI
     */
    static ABI(): ContractAbi;
    protected static _deployLibrariesAsync(artifact: ContractArtifact, libraryArtifacts: {
        [libraryName: string]: ContractArtifact;
    }, web3Wrapper: Web3Wrapper, txDefaults: Partial<TxData>, libraryAddresses?: {
        [libraryName: string]: string;
    }): Promise<{
        [libraryName: string]: string;
    }>;
    getFunctionSignature(methodName: string): string;
    getABIDecodedTransactionData<T>(methodName: string, callData: string): T;
    getABIDecodedReturnData<T>(methodName: string, callData: string): T;
    getSelector(methodName: string): string;
    FAILURE_ADDRESS(): ContractTxFunctionObj<string>;
    /**
     * Call multiple public functions on this contract in a single transaction.
      * @param callDatas ABI-encoded call data for each function call.
     */
    batchCall(callDatas: string[]): ContractTxFunctionObj<Array<{
        data: string;
        success: boolean;
    }>>;
    createTokenExchanges(tokenAddresses: string[]): ContractTxFunctionObj<void>;
    enableFailTrigger(): ContractTxFunctionObj<void>;
    encodeKyberHint(opts: {
        reserveOffset: BigNumber;
        hintHandler: string;
        networkProxy: string;
        weth: string;
        hint: string;
    }, reserveId: string, takerToken: string, makerToken: string): ContractTxFunctionObj<string>;
    eth2Dai(): ContractTxFunctionObj<string>;
    getAllowanceOf(tokens: string[], account: string, spender: string): ContractTxFunctionObj<BigNumber[]>;
    getBalanceOf(tokens: string[], account: string): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Queries the fillable taker asset amounts of native orders.
 * Effectively ignores orders that have empty signatures or
      * @param orders Native orders to query.
      * @param orderSignatures Signatures for each respective order in `orders`.
      * @param exchange The V4 exchange.
     */
    getLimitOrderFillableMakerAssetAmounts(orders: Array<{
        makerToken: string;
        takerToken: string;
        makerAmount: BigNumber;
        takerAmount: BigNumber;
        takerTokenFeeAmount: BigNumber;
        maker: string;
        taker: string;
        sender: string;
        feeRecipient: string;
        pool: string;
        expiry: BigNumber;
        salt: BigNumber;
    }>, orderSignatures: Array<{
        signatureType: number | BigNumber;
        v: number | BigNumber;
        r: string;
        s: string;
    }>, exchange: string): ContractTxFunctionObj<BigNumber[]>;
    getLimitOrderFillableTakerAmount(order: {
        makerToken: string;
        takerToken: string;
        makerAmount: BigNumber;
        takerAmount: BigNumber;
        takerTokenFeeAmount: BigNumber;
        maker: string;
        taker: string;
        sender: string;
        feeRecipient: string;
        pool: string;
        expiry: BigNumber;
        salt: BigNumber;
    }, index_1: {
        signatureType: number | BigNumber;
        v: number | BigNumber;
        r: string;
        s: string;
    }, index_2: string): ContractTxFunctionObj<BigNumber>;
    /**
     * Queries the fillable taker asset amounts of native orders.
 * Effectively ignores orders that have empty signatures or
 * maker/taker asset amounts (returning 0).
      * @param orders Native limit orders to query.
      * @param orderSignatures Signatures for each respective order in `orders`.
      * @param exchange The V4 exchange.
     */
    getLimitOrderFillableTakerAssetAmounts(orders: Array<{
        makerToken: string;
        takerToken: string;
        makerAmount: BigNumber;
        takerAmount: BigNumber;
        takerTokenFeeAmount: BigNumber;
        maker: string;
        taker: string;
        sender: string;
        feeRecipient: string;
        pool: string;
        expiry: BigNumber;
        salt: BigNumber;
    }>, orderSignatures: Array<{
        signatureType: number | BigNumber;
        v: number | BigNumber;
        r: string;
        s: string;
    }>, exchange: string): ContractTxFunctionObj<BigNumber[]>;
    getTokenDecimals(tokens: string[]): ContractTxFunctionObj<BigNumber[]>;
    isContract(account: string): ContractTxFunctionObj<boolean>;
    kyber(): ContractTxFunctionObj<string>;
    sampleBuysFromAutoRoute(params: {
        router: string;
        path: string[];
        poolType: string[];
        dmmPoolAddresses: string[];
        amountTokens: BigNumber[];
    }): ContractTxFunctionObj<[string[], BigNumber[]]>;
    /**
     * Sample buy quotes from Balancer.
      * @param poolAddress Address of the Balancer pool to query.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromBalancer(poolAddress: string, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample buy quotes from Balancer V2.
      * @param poolInfo Struct with pool related data
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromBalancerV2(poolInfo: {
        poolId: string;
        vault: string;
    }, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample buy quotes from Bancor. Unimplemented
      * @param opts BancorSamplerOpts The Bancor registry contract address and paths
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromBancor(opts: {
        registry: string;
        paths: string[][];
    }, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[string, string[], BigNumber[]]>;
    /**
     * Sample buy quotes from Curve.
      * @param curveInfo Curve information specific to this token pair.
      * @param fromTokenIdx Index of the taker token (what to sell).
      * @param toTokenIdx Index of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromCurve(curveInfo: {
        poolAddress: string;
        sellQuoteFunctionSelector: string;
        buyQuoteFunctionSelector: string;
    }, fromTokenIdx: BigNumber, toTokenIdx: BigNumber, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample buy quotes from DODO.
      * @param opts DODOSamplerOpts DODO Registry and helper addresses
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token sell amount for each sample.
     */
    sampleBuysFromDODO(opts: {
        registry: string;
        helper: string;
    }, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[boolean, string, BigNumber[]]>;
    /**
     * Sample buy quotes from DODO.
      * @param registry Address of the registry to look up.
      * @param offset offset index for the pool in the registry.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token sell amount for each sample.
     */
    sampleBuysFromDODOV2(registry: string, offset: BigNumber, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[boolean, string, BigNumber[]]>;
    /**
     * Sample buy quotes from Eth2Dai/Oasis.
      * @param router Address of the Eth2Dai/Oasis contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
     */
    sampleBuysFromEth2Dai(router: string, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample buy quotes from KyberDmm.
      * @param router Router to look up tokens and amounts
      * @param path Token route. Should be takerToken -> makerToken.
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromKyberDmm(router: string, path: string[], makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[string[], BigNumber[]]>;
    /**
     * Sample buy quotes from Kyber.
      * @param opts KyberSamplerOpts The nth reserve
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromKyberNetwork(opts: {
        reserveOffset: BigNumber;
        hintHandler: string;
        networkProxy: string;
        weth: string;
        hint: string;
    }, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[string, string, BigNumber[]]>;
    /**
     * Sample buy quotes from Lido.
      * @param lidoInfo Info regarding a specific Lido deployment
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromLido(lidoInfo: {
        stEthToken: string;
        wethToken: string;
    }, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample buy quotes from an arbitrary on-chain liquidity provider.
      * @param providerAddress Address of the liquidity provider.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromLiquidityProvider(providerAddress: string, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample buy quotes from MStable contract
      * @param router Address of the mStable contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromMStable(router: string, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    sampleBuysFromMakerPsm(psmInfo: {
        psmAddress: string;
        ilkIdentifier: string;
        gemTokenAddress: string;
    }, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample buy quotes from Mooniswap.
      * @param registry Address of the Mooniswap Registry.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token sell amount for each sample.
     */
    sampleBuysFromMooniswap(registry: string, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[string, BigNumber[]]>;
    /**
     * Sample buy quotes from Shell pool contract
      * @param pool Address of the Shell pool contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromShell(pool: string, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample buy quotes from Smoothy.
      * @param smoothyInfo Smoothy information specific to this token pair.
      * @param fromTokenIdx Index of the taker token (what to sell).
      * @param toTokenIdx Index of the maker token (what to buy).
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromSmoothy(smoothyInfo: {
        poolAddress: string;
        sellQuoteFunctionSelector: string;
        buyQuoteFunctionSelector: string;
    }, fromTokenIdx: BigNumber, toTokenIdx: BigNumber, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample buy quotes from Uniswap.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param makerTokenAmounts Maker token sell amount for each sample.
     */
    sampleBuysFromUniswap(router: string, takerToken: string, makerToken: string, makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample buy quotes from UniswapV2.
      * @param router Router to look up tokens and amounts
      * @param path Token route. Should be takerToken -> makerToken.
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromUniswapV2(router: string, path: string[], makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample buy quotes from UniswapV3.
      * @param quoter UniswapV3 Quoter contract.
      * @param path Token route. Should be takerToken -> makerToken.
      * @param makerTokenAmounts Maker token buy amount for each sample.
     */
    sampleBuysFromUniswapV3(quoter: string, path: string[], makerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[string[], BigNumber[]]>;
    sampleSellFromKyberNetwork(opts: {
        reserveOffset: BigNumber;
        hintHandler: string;
        networkProxy: string;
        weth: string;
        hint: string;
    }, takerToken: string, makerToken: string, takerTokenAmount: BigNumber): ContractTxFunctionObj<BigNumber>;
    sampleSellsFromAutoRoute(params: {
        router: string;
        path: string[];
        poolType: string[];
        dmmPoolAddresses: string[];
        amountTokens: BigNumber[];
    }): ContractTxFunctionObj<[string[], BigNumber[]]>;
    /**
     * Sample sell quotes from Balancer.
      * @param poolAddress Address of the Balancer pool to query.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromBalancer(poolAddress: string, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from Balancer V2.
      * @param poolInfo Struct with pool related data
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromBalancerV2(poolInfo: {
        poolId: string;
        vault: string;
    }, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from Bancor.
      * @param opts BancorSamplerOpts The Bancor registry contract address and paths
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromBancor(opts: {
        registry: string;
        paths: string[][];
    }, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[string, string[], BigNumber[]]>;
    /**
     * Sample sell quotes from Curve.
      * @param curveInfo Curve information specific to this token pair.
      * @param fromTokenIdx Index of the taker token (what to sell).
      * @param toTokenIdx Index of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromCurve(curveInfo: {
        poolAddress: string;
        sellQuoteFunctionSelector: string;
        buyQuoteFunctionSelector: string;
    }, fromTokenIdx: BigNumber, toTokenIdx: BigNumber, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from DODO.
      * @param opts DODOSamplerOpts DODO Registry and helper addresses
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromDODO(opts: {
        registry: string;
        helper: string;
    }, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[boolean, string, BigNumber[]]>;
    /**
     * Sample sell quotes from DODO V2.
      * @param registry Address of the registry to look up.
      * @param offset offset index for the pool in the registry.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromDODOV2(registry: string, offset: BigNumber, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[boolean, string, BigNumber[]]>;
    /**
     * Sample sell quotes from Eth2Dai/Oasis.
      * @param router Address of the Eth2Dai/Oasis contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromEth2Dai(router: string, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from KyberDmm.
      * @param router Router to look up tokens and amounts
      * @param path Token route. Should be takerToken -> makerToken
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromKyberDmm(router: string, path: string[], takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[string[], BigNumber[]]>;
    /**
     * Sample sell quotes from Kyber.
      * @param opts KyberSamplerOpts The nth reserve
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromKyberNetwork(opts: {
        reserveOffset: BigNumber;
        hintHandler: string;
        networkProxy: string;
        weth: string;
        hint: string;
    }, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[string, string, BigNumber[]]>;
    /**
     * Sample sell quotes from Lido
      * @param lidoInfo Info regarding a specific Lido deployment
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromLido(lidoInfo: {
        stEthToken: string;
        wethToken: string;
    }, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from an arbitrary on-chain liquidity provider.
      * @param providerAddress Address of the liquidity provider.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromLiquidityProvider(providerAddress: string, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from the mStable contract
      * @param router Address of the mStable contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromMStable(router: string, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from Maker PSM
     */
    sampleSellsFromMakerPsm(psmInfo: {
        psmAddress: string;
        ilkIdentifier: string;
        gemTokenAddress: string;
    }, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from Mooniswap.
      * @param registry Address of the Mooniswap Registry.
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromMooniswap(registry: string, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[string, BigNumber[]]>;
    /**
     * Sample sell quotes from MultiBridge.
      * @param multibridge Address of the MultiBridge contract.
      * @param takerToken Address of the taker token (what to sell).
      * @param intermediateToken The address of the intermediate token to        use
     *     in an indirect route.
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromMultiBridge(multibridge: string, takerToken: string, intermediateToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from the Shell pool contract
      * @param pool Address of the Shell pool contract
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromShell(pool: string, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from Smoothy.
      * @param smoothyInfo Smoothy information specific to this token pair.
      * @param fromTokenIdx Index of the taker token (what to sell).
      * @param toTokenIdx Index of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromSmoothy(smoothyInfo: {
        poolAddress: string;
        sellQuoteFunctionSelector: string;
        buyQuoteFunctionSelector: string;
    }, fromTokenIdx: BigNumber, toTokenIdx: BigNumber, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from Uniswap.
      * @param router Address of the Uniswap Router
      * @param takerToken Address of the taker token (what to sell).
      * @param makerToken Address of the maker token (what to buy).
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromUniswap(router: string, takerToken: string, makerToken: string, takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from UniswapV2.
      * @param router Router to look up tokens and amounts
      * @param path Token route. Should be takerToken -> makerToken
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromUniswapV2(router: string, path: string[], takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<BigNumber[]>;
    /**
     * Sample sell quotes from UniswapV3.
      * @param quoter UniswapV3 Quoter contract.
      * @param path Token route. Should be takerToken -> makerToken
      * @param takerTokenAmounts Taker token sell amount for each sample.
     */
    sampleSellsFromUniswapV3(quoter: string, path: string[], takerTokenAmounts: BigNumber[]): ContractTxFunctionObj<[string[], BigNumber[]]>;
    sampleSingleSellFromMooniswapPool(registry: string, mooniswapTakerToken: string, mooniswapMakerToken: string, takerTokenAmount: BigNumber): ContractTxFunctionObj<BigNumber>;
    sampleTwoHopBuy(firstHopCalls: string[], secondHopCalls: string[], buyAmount: BigNumber): ContractTxFunctionObj<[{
        sourceIndex: BigNumber;
        returnData: string;
    }, {
        sourceIndex: BigNumber;
        returnData: string;
    }, BigNumber]>;
    sampleTwoHopSell(firstHopCalls: string[], secondHopCalls: string[], sellAmount: BigNumber): ContractTxFunctionObj<[{
        sourceIndex: BigNumber;
        returnData: string;
    }, {
        sourceIndex: BigNumber;
        returnData: string;
    }, BigNumber]>;
    uniswap(): ContractTxFunctionObj<string>;
    uniswapV2Router(): ContractTxFunctionObj<string>;
    constructor(address: string, supportedProvider: SupportedProvider, txDefaults?: Partial<TxData>, logDecodeDependencies?: {
        [contractName: string]: ContractAbi;
    }, deployedBytecode?: string | undefined, encoderOverrides?: Partial<EncoderOverrides>);
}
//# sourceMappingURL=test_erc20_bridge_sampler.d.ts.map