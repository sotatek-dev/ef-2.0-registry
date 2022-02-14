"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWERVE_MAINNET_INFOS = exports.CURVE_V2_POLYGON_INFOS = exports.CURVE_POLYGON_INFOS = exports.CURVE_V2_MAINNET_INFOS = exports.CURVE_MAINNET_INFOS = exports.NATIVE_FEE_TOKEN_AMOUNT_BY_CHAIN_ID = exports.NATIVE_FEE_TOKEN_BY_CHAIN_ID = exports.DEFAULT_TOKEN_ADJACENCY_GRAPH_BY_CHAIN_ID = exports.DEFAULT_INTERMEDIATE_TOKENS_BY_CHAIN_ID = exports.ACRYPTOS_POOLS = exports.FIREBIRDONESWAP_POLYGON_POOLS = exports.FIREBIRDONESWAP_BSC_POOLS = exports.XSIGMA_POOLS = exports.ELLIPSIS_POOLS = exports.BELT_POOLS = exports.NERVE_POOLS = exports.IRONSWAP_POOLS = exports.SADDLE_POOLS = exports.SMOOTHY_POOLS = exports.SNOWSWAP_POOLS = exports.SWERVE_POOLS = exports.CURVE_V2_POLYGON_POOLS = exports.CURVE_POLYGON_POOLS = exports.CURVE_V2_POOLS = exports.CURVE_POOLS = exports.POLYGON_TOKENS = exports.CHAPEL_TOKENS = exports.BSC_TOKENS = exports.MAINNET_TOKENS = exports.SOURCE_FLAGS = exports.FEE_QUOTE_SOURCES_BY_CHAIN_ID = exports.PROTOCOL_FEE_MULTIPLIER = exports.BUY_SOURCE_FILTER_BY_CHAIN_ID = exports.SELL_SOURCE_FILTER_BY_CHAIN_ID = exports.TOKENS_BY_CHAIN = exports.FCX_HOST_BY_CHAIN = exports.HORIZON_HOST_BY_CHAIN = exports.COMPARISON_PRICE_DECIMALS = exports.SAMPLER_ADDRESS = exports.NULL_ADDRESS = exports.NULL_BYTES = exports.ONE_SECOND_MS = exports.ONE_HOUR_IN_SECONDS = exports.MAX_UINT256 = exports.ZERO_AMOUNT = exports.POSITIVE_INF = exports.NEGATIVE_INF = exports.ONE_ETHER = exports.WALLET_SIGNATURE = exports.ERC20_PROXY_ID = void 0;
exports.CAFESWAP_ROUTER_BY_CHAIN_ID = exports.APESWAP_ROUTER_BY_CHAIN_ID = exports.BAKERYSWAP_ROUTER_BY_CHAIN_ID = exports.AUTOROUTE_ROUTER_BY_CHAIN_ID = exports.PANCAKESWAPV2_ROUTER_BY_CHAIN_ID = exports.PANCAKESWAP_ROUTER_BY_CHAIN_ID = exports.UNISWAPV3_CONFIG_BY_CHAIN_ID = exports.BALANCER_V2_SUBGRAPH_URL_BY_CHAIN = exports.BALANCER_SUBGRAPH_URL_BY_CHAIN = exports.BALANCER_MAX_POOLS_FETCHED = exports.BALANCER_TOP_POOLS_FETCHED = exports.BALANCER_SUBGRAPH_URL = exports.LIDO_INFO_BY_CHAIN = exports.BALANCER_V2_VAULT_ADDRESS_BY_CHAIN = exports.COMPONENT_POOLS_BY_CHAIN_ID = exports.SHELL_POOLS_BY_CHAIN_ID = exports.BANCOR_REGISTRY_BY_CHAIN_ID = exports.MOONISWAP_LIQUIDITY_PROVIDER_BY_CHAIN_ID = exports.MAKER_PSM_INFO_BY_CHAIN_ID = exports.CURVE_LIQUIDITY_PROVIDER_BY_CHAIN_ID = exports.MAX_DODOV2_POOLS_QUERIED = exports.DODOV2_FACTORIES_BY_CHAIN_ID = exports.DODOV1_CONFIG_BY_CHAIN_ID = exports.MOONISWAP_REGISTRIES_BY_CHAIN_ID = exports.KYBER_DMM_ROUTER_BY_CHAIN_ID = exports.OASIS_ROUTER_BY_CHAIN_ID = exports.MSTABLE_POOLS_BY_CHAIN_ID = exports.SHIBASWAP_ROUTER_BY_CHAIN_ID = exports.LINKSWAP_ROUTER_BY_CHAIN_ID = exports.CRYPTO_COM_ROUTER_BY_CHAIN_ID = exports.SUSHISWAP_ROUTER_BY_CHAIN_ID = exports.UNISWAPV2_ROUTER_BY_CHAIN_ID = exports.UNISWAPV1_ROUTER_BY_CHAIN_ID = exports.LIQUIDITY_PROVIDER_REGISTRY_BY_CHAIN_ID = exports.KYBER_CONFIG_BY_CHAIN_ID = exports.MAX_KYBER_RESERVES_QUERIED = exports.KYBER_BANNED_RESERVES = exports.KYBER_BRIDGED_LIQUIDITY_PREFIX = exports.ACRYPTOS_BSC_INFOS = exports.FIREBIRDONESWAP_POLYGON_INFOS = exports.FIREBIRDONESWAP_BSC_INFOS = exports.NERVE_BSC_INFOS = exports.SMOOTHY_BSC_INFOS = exports.SMOOTHY_MAINNET_INFOS = exports.IRONSWAP_POLYGON_INFOS = exports.SADDLE_MAINNET_INFOS = exports.XSIGMA_MAINNET_INFOS = exports.ELLIPSIS_BSC_INFOS = exports.BELT_BSC_INFOS = exports.SNOWSWAP_MAINNET_INFOS = void 0;
exports.DEFAULT_GET_MARKET_ORDERS_OPTS = exports.POSITIVE_SLIPPAGE_FEE_TRANSFORMER_GAS = exports.DEFAULT_FEE_SCHEDULE = exports.DEFAULT_GAS_SCHEDULE = exports.JETSWAP_ROUTER_BY_CHAIN_ID = exports.POLYDEX_ROUTER_BY_CHAIN_ID = exports.WAULTSWAP_ROUTER_BY_CHAIN_ID = exports.DFYN_ROUTER_BY_CHAIN_ID = exports.COMETHSWAP_ROUTER_BY_CHAIN_ID = exports.QUICKSWAP_ROUTER_BY_CHAIN_ID = exports.JULSWAP_ROUTER_BY_CHAIN_ID = exports.CHEESESWAP_ROUTER_BY_CHAIN_ID = void 0;
const contract_addresses_1 = require("@0x/contract-addresses");
const protocol_utils_1 = require("@0x/protocol-utils");
const utils_1 = require("@0x/utils");
const strings_1 = require("@ethersproject/strings");
const token_adjacency_graph_builder_1 = require("../token_adjacency_graph_builder");
const source_filters_1 = require("./source_filters");
const types_1 = require("./types");
// tslint:disable: custom-no-magic-numbers no-bitwise
exports.ERC20_PROXY_ID = '0xf47261b0';
exports.WALLET_SIGNATURE = '0x04';
exports.ONE_ETHER = new utils_1.BigNumber(1e18);
exports.NEGATIVE_INF = new utils_1.BigNumber('-Infinity');
exports.POSITIVE_INF = new utils_1.BigNumber('Infinity');
exports.ZERO_AMOUNT = new utils_1.BigNumber(0);
exports.MAX_UINT256 = new utils_1.BigNumber(2).pow(256).minus(1);
exports.ONE_HOUR_IN_SECONDS = 60 * 60;
exports.ONE_SECOND_MS = 1000;
exports.NULL_BYTES = '0x';
exports.NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.SAMPLER_ADDRESS = '0x5555555555555555555555555555555555555555';
exports.COMPARISON_PRICE_DECIMALS = 10;
// TODO(kimpers): Consolidate this implementation with the one in @0x/token-metadata
function valueByChainId(rest, defaultValue) {
    // TODO I don't like this but iterating through enums is weird
    return Object.assign({ [contract_addresses_1.ChainId.Mainnet]: defaultValue, [contract_addresses_1.ChainId.Ropsten]: defaultValue, [contract_addresses_1.ChainId.Rinkeby]: defaultValue, [contract_addresses_1.ChainId.Kovan]: defaultValue, [contract_addresses_1.ChainId.Ganache]: defaultValue, [contract_addresses_1.ChainId.BSC]: defaultValue, [contract_addresses_1.ChainId.Chapel]: defaultValue, [contract_addresses_1.ChainId.Polygon]: defaultValue, [contract_addresses_1.ChainId.PolygonMumbai]: defaultValue }, (rest || {}));
}
exports.HORIZON_HOST_BY_CHAIN = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: 'https://horizon.stellar.org',
    [contract_addresses_1.ChainId.Chapel]: 'https://horizon-testnet.stellar.org',
}, 'https://horizon.stellar.org');
exports.FCX_HOST_BY_CHAIN = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: 'https://evry-finance-api.sotatek.works',
    [contract_addresses_1.ChainId.Chapel]: 'https://evry-finance-api.sotatek.works',
}, 'https://evry-finance-api.sotatek.works');
exports.TOKENS_BY_CHAIN = {
    [contract_addresses_1.ChainId.BSC]: {},
    [contract_addresses_1.ChainId.Chapel]: {
        '0x3972aebcec8fae45e2bdc06fd30167eafa5bce38': { decimal: 18, symbol: 'DAI' },
        '0x84544b0815279361676fd147dad60a912d8caac0': { decimal: 18, symbol: 'USDT' },
        '0x7b47880b3b14ec45023e2240c1f5358b0165ffd7': { decimal: 18, symbol: 'vEUR' },
        '0x6deeeebcf2b03a1078d1fc624bdc57a667bf31d0': { decimal: 18, symbol: 'vUSD' },
        '0x332a96a808cfe9e3560e0d261d8b047bb6b85b4d': { decimal: 18, symbol: 'vSGD' },
        '0x1fdee622a8c058923e4d006c3edee14a0634e9d2': { decimal: 18, symbol: 'vCHF' },
        '0xdba79a8049f52565de7bc190d5b56a21a5959459': { decimal: 18, symbol: 'vTHB' },
        '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9': { decimal: 18, symbol: 'BUSD' },
        '0x119a2d7ce8846847c02ab16c34dc4b4bfd8a0d68': { decimal: 18, symbol: 'XLM' },
        '0x0000000000000000000000000000000000000000': { decimal: 18, symbol: 'BNB' },
        '0xaa4988ef2505068e7f4fba05e88ec19bc5629734': { decimal: 18, symbol: 'EVRY' },
        '0x3518eacc1b14ff50256b1d619ab650d98f2f2895': { decimal: 18, symbol: 'USDT' },
    },
};
/**
 * Valid sources for market sell.
 */
exports.SELL_SOURCE_FILTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: new source_filters_1.SourceFilters([
        types_1.ERC20BridgeSource.Native,
        types_1.ERC20BridgeSource.Uniswap,
        types_1.ERC20BridgeSource.UniswapV2,
        types_1.ERC20BridgeSource.Eth2Dai,
        types_1.ERC20BridgeSource.Kyber,
        types_1.ERC20BridgeSource.Curve,
        types_1.ERC20BridgeSource.Balancer,
        types_1.ERC20BridgeSource.BalancerV2,
        types_1.ERC20BridgeSource.Bancor,
        types_1.ERC20BridgeSource.MStable,
        types_1.ERC20BridgeSource.Mooniswap,
        types_1.ERC20BridgeSource.Swerve,
        types_1.ERC20BridgeSource.SnowSwap,
        types_1.ERC20BridgeSource.SushiSwap,
        types_1.ERC20BridgeSource.Shell,
        types_1.ERC20BridgeSource.MultiHop,
        types_1.ERC20BridgeSource.Dodo,
        types_1.ERC20BridgeSource.DodoV2,
        types_1.ERC20BridgeSource.Cream,
        types_1.ERC20BridgeSource.LiquidityProvider,
        types_1.ERC20BridgeSource.CryptoCom,
        types_1.ERC20BridgeSource.Linkswap,
        types_1.ERC20BridgeSource.Lido,
        types_1.ERC20BridgeSource.MakerPsm,
        types_1.ERC20BridgeSource.KyberDmm,
        types_1.ERC20BridgeSource.Smoothy,
        types_1.ERC20BridgeSource.Component,
        types_1.ERC20BridgeSource.Saddle,
        types_1.ERC20BridgeSource.XSigma,
        types_1.ERC20BridgeSource.UniswapV3,
        types_1.ERC20BridgeSource.CurveV2,
        types_1.ERC20BridgeSource.ShibaSwap,
    ]),
    [contract_addresses_1.ChainId.Ropsten]: new source_filters_1.SourceFilters([
        types_1.ERC20BridgeSource.Kyber,
        types_1.ERC20BridgeSource.Native,
        types_1.ERC20BridgeSource.SushiSwap,
        types_1.ERC20BridgeSource.Uniswap,
        types_1.ERC20BridgeSource.UniswapV2,
        types_1.ERC20BridgeSource.UniswapV3,
        types_1.ERC20BridgeSource.Curve,
        types_1.ERC20BridgeSource.Mooniswap,
    ]),
    [contract_addresses_1.ChainId.Rinkeby]: new source_filters_1.SourceFilters([types_1.ERC20BridgeSource.Native]),
    [contract_addresses_1.ChainId.Kovan]: new source_filters_1.SourceFilters([types_1.ERC20BridgeSource.Native]),
    [contract_addresses_1.ChainId.Ganache]: new source_filters_1.SourceFilters([types_1.ERC20BridgeSource.Native]),
    [contract_addresses_1.ChainId.BSC]: new source_filters_1.SourceFilters([
        types_1.ERC20BridgeSource.PancakeSwapV2,
        types_1.ERC20BridgeSource.Balancer,
        types_1.ERC20BridgeSource.Native,
        types_1.ERC20BridgeSource.XLM,
        types_1.ERC20BridgeSource.FCX,
        types_1.ERC20BridgeSource.ABalancer,
        types_1.ERC20BridgeSource.RBalancer,
        types_1.ERC20BridgeSource.UBalancer,
        types_1.ERC20BridgeSource.MultiHop,
        types_1.ERC20BridgeSource.AutoRoute,
    ]),
    [contract_addresses_1.ChainId.Chapel]: new source_filters_1.SourceFilters([
        types_1.ERC20BridgeSource.PancakeSwapV2,
        types_1.ERC20BridgeSource.Balancer,
        types_1.ERC20BridgeSource.Native,
        types_1.ERC20BridgeSource.XLM,
        types_1.ERC20BridgeSource.FCX,
        types_1.ERC20BridgeSource.ABalancer,
        types_1.ERC20BridgeSource.RBalancer,
        types_1.ERC20BridgeSource.UBalancer,
        types_1.ERC20BridgeSource.MultiHop,
        types_1.ERC20BridgeSource.AutoRoute,
    ]),
    [contract_addresses_1.ChainId.Polygon]: new source_filters_1.SourceFilters([
        types_1.ERC20BridgeSource.SushiSwap,
        types_1.ERC20BridgeSource.QuickSwap,
        types_1.ERC20BridgeSource.ComethSwap,
        types_1.ERC20BridgeSource.Dfyn,
        types_1.ERC20BridgeSource.MStable,
        types_1.ERC20BridgeSource.Curve,
        types_1.ERC20BridgeSource.DodoV2,
        types_1.ERC20BridgeSource.Dodo,
        types_1.ERC20BridgeSource.CurveV2,
        types_1.ERC20BridgeSource.WaultSwap,
        types_1.ERC20BridgeSource.Polydex,
        types_1.ERC20BridgeSource.ApeSwap,
        types_1.ERC20BridgeSource.FirebirdOneSwap,
        types_1.ERC20BridgeSource.BalancerV2,
        types_1.ERC20BridgeSource.KyberDmm,
        types_1.ERC20BridgeSource.LiquidityProvider,
        types_1.ERC20BridgeSource.MultiHop,
        types_1.ERC20BridgeSource.JetSwap,
        types_1.ERC20BridgeSource.IronSwap,
    ]),
}, new source_filters_1.SourceFilters([]));
/**
 * Valid sources for market buy.
 */
exports.BUY_SOURCE_FILTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: new source_filters_1.SourceFilters([
        types_1.ERC20BridgeSource.Native,
        types_1.ERC20BridgeSource.Uniswap,
        types_1.ERC20BridgeSource.UniswapV2,
        types_1.ERC20BridgeSource.Eth2Dai,
        types_1.ERC20BridgeSource.Kyber,
        types_1.ERC20BridgeSource.Curve,
        types_1.ERC20BridgeSource.Balancer,
        types_1.ERC20BridgeSource.BalancerV2,
        // ERC20BridgeSource.Bancor, // FIXME: Bancor Buys not implemented in Sampler
        types_1.ERC20BridgeSource.MStable,
        types_1.ERC20BridgeSource.Mooniswap,
        types_1.ERC20BridgeSource.Shell,
        types_1.ERC20BridgeSource.Swerve,
        types_1.ERC20BridgeSource.SnowSwap,
        types_1.ERC20BridgeSource.SushiSwap,
        types_1.ERC20BridgeSource.MultiHop,
        types_1.ERC20BridgeSource.Dodo,
        types_1.ERC20BridgeSource.DodoV2,
        types_1.ERC20BridgeSource.Cream,
        types_1.ERC20BridgeSource.Lido,
        types_1.ERC20BridgeSource.LiquidityProvider,
        types_1.ERC20BridgeSource.CryptoCom,
        types_1.ERC20BridgeSource.Linkswap,
        types_1.ERC20BridgeSource.MakerPsm,
        types_1.ERC20BridgeSource.KyberDmm,
        types_1.ERC20BridgeSource.Smoothy,
        types_1.ERC20BridgeSource.Component,
        types_1.ERC20BridgeSource.Saddle,
        types_1.ERC20BridgeSource.XSigma,
        types_1.ERC20BridgeSource.UniswapV3,
        types_1.ERC20BridgeSource.CurveV2,
        types_1.ERC20BridgeSource.ShibaSwap,
    ]),
    [contract_addresses_1.ChainId.Ropsten]: new source_filters_1.SourceFilters([
        types_1.ERC20BridgeSource.Kyber,
        types_1.ERC20BridgeSource.Native,
        types_1.ERC20BridgeSource.SushiSwap,
        types_1.ERC20BridgeSource.Uniswap,
        types_1.ERC20BridgeSource.UniswapV2,
        types_1.ERC20BridgeSource.UniswapV3,
        types_1.ERC20BridgeSource.Curve,
        types_1.ERC20BridgeSource.Mooniswap,
    ]),
    [contract_addresses_1.ChainId.Rinkeby]: new source_filters_1.SourceFilters([types_1.ERC20BridgeSource.Native]),
    [contract_addresses_1.ChainId.Kovan]: new source_filters_1.SourceFilters([types_1.ERC20BridgeSource.Native]),
    [contract_addresses_1.ChainId.Ganache]: new source_filters_1.SourceFilters([types_1.ERC20BridgeSource.Native]),
    [contract_addresses_1.ChainId.BSC]: new source_filters_1.SourceFilters([
        types_1.ERC20BridgeSource.PancakeSwapV2,
        types_1.ERC20BridgeSource.Balancer,
        types_1.ERC20BridgeSource.Native,
        types_1.ERC20BridgeSource.XLM,
        types_1.ERC20BridgeSource.FCX,
        types_1.ERC20BridgeSource.ABalancer,
        types_1.ERC20BridgeSource.RBalancer,
        types_1.ERC20BridgeSource.UBalancer,
        types_1.ERC20BridgeSource.MultiHop,
        types_1.ERC20BridgeSource.AutoRoute,
    ]),
    [contract_addresses_1.ChainId.Chapel]: new source_filters_1.SourceFilters([
        types_1.ERC20BridgeSource.PancakeSwapV2,
        types_1.ERC20BridgeSource.Balancer,
        types_1.ERC20BridgeSource.Native,
        types_1.ERC20BridgeSource.XLM,
        types_1.ERC20BridgeSource.FCX,
        types_1.ERC20BridgeSource.ABalancer,
        types_1.ERC20BridgeSource.RBalancer,
        types_1.ERC20BridgeSource.UBalancer,
        types_1.ERC20BridgeSource.MultiHop,
        types_1.ERC20BridgeSource.AutoRoute,
    ]),
    [contract_addresses_1.ChainId.Polygon]: new source_filters_1.SourceFilters([
        types_1.ERC20BridgeSource.SushiSwap,
        types_1.ERC20BridgeSource.QuickSwap,
        types_1.ERC20BridgeSource.ComethSwap,
        types_1.ERC20BridgeSource.Dfyn,
        types_1.ERC20BridgeSource.MStable,
        types_1.ERC20BridgeSource.Curve,
        types_1.ERC20BridgeSource.DodoV2,
        types_1.ERC20BridgeSource.Dodo,
        types_1.ERC20BridgeSource.CurveV2,
        types_1.ERC20BridgeSource.WaultSwap,
        types_1.ERC20BridgeSource.Polydex,
        types_1.ERC20BridgeSource.ApeSwap,
        types_1.ERC20BridgeSource.FirebirdOneSwap,
        types_1.ERC20BridgeSource.BalancerV2,
        types_1.ERC20BridgeSource.KyberDmm,
        types_1.ERC20BridgeSource.LiquidityProvider,
        types_1.ERC20BridgeSource.MultiHop,
        types_1.ERC20BridgeSource.JetSwap,
        types_1.ERC20BridgeSource.IronSwap,
    ]),
}, new source_filters_1.SourceFilters([]));
/**
 *  0x Protocol Fee Multiplier
 */
exports.PROTOCOL_FEE_MULTIPLIER = new utils_1.BigNumber(70000);
/**
 * Sources to poll for ETH fee price estimates.
 */
exports.FEE_QUOTE_SOURCES_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: [types_1.ERC20BridgeSource.UniswapV2, types_1.ERC20BridgeSource.SushiSwap, types_1.ERC20BridgeSource.UniswapV3],
    [contract_addresses_1.ChainId.BSC]: [types_1.ERC20BridgeSource.PancakeSwap, types_1.ERC20BridgeSource.Mooniswap, types_1.ERC20BridgeSource.SushiSwap],
    [contract_addresses_1.ChainId.Chapel]: [types_1.ERC20BridgeSource.PancakeSwap, types_1.ERC20BridgeSource.Mooniswap, types_1.ERC20BridgeSource.SushiSwap],
    [contract_addresses_1.ChainId.Ropsten]: [types_1.ERC20BridgeSource.UniswapV2, types_1.ERC20BridgeSource.SushiSwap],
    [contract_addresses_1.ChainId.Polygon]: [types_1.ERC20BridgeSource.QuickSwap, types_1.ERC20BridgeSource.SushiSwap],
}, []);
// HACK(mzhu25): Limit and RFQ orders need to be treated as different sources
//               when computing the exchange proxy gas overhead.
exports.SOURCE_FLAGS = Object.assign({}, ...['RfqOrder', 'LimitOrder', ...Object.values(types_1.ERC20BridgeSource)].map((source, index) => ({
    [source]: [types_1.ERC20BridgeSource.Native, types_1.ERC20BridgeSource.XLM, types_1.ERC20BridgeSource.FCX].includes(source)
        ? BigInt(0)
        : BigInt(1) << BigInt(index),
})));
const MIRROR_WRAPPED_TOKENS = {
    mAAPL: '0xd36932143f6ebdedd872d5fb0651f4b72fd15a84',
    mSLV: '0x9d1555d8cb3c846bb4f7d5b1b1080872c3166676',
    mIAU: '0x1d350417d9787e000cc1b95d70e9536dcd91f373',
    mAMZN: '0x0cae9e4d663793c2a2a0b211c1cf4bbca2b9caa7',
    mGOOGL: '0x4b70ccd1cf9905be1faed025eadbd3ab124efe9a',
    mTSLA: '0x21ca39943e91d704678f5d00b6616650f066fd63',
    mQQQ: '0x13b02c8de71680e71f0820c996e4be43c2f57d15',
    mTWTR: '0xedb0414627e6f1e3f082de65cd4f9c693d78cca9',
    mMSFT: '0x41bbedd7286daab5910a1f15d12cbda839852bd7',
    mNFLX: '0xc8d674114bac90148d11d3c1d33c61835a0f9dcd',
    mBABA: '0x676ce85f66adb8d7b8323aeefe17087a3b8cb363',
    mUSO: '0x31c63146a635eb7465e5853020b39713ac356991',
    mVIXY: '0xf72fcd9dcf0190923fadd44811e240ef4533fc86',
    mLUNA: '0xd2877702675e6ceb975b4a1dff9fb7baf4c91ea9',
};
// Mainnet tokens
// Not an exhaustive list, just enough so we don't repeat ourselves
exports.MAINNET_TOKENS = Object.assign(Object.assign({ WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', 
    // Stable Coins
    DAI: '0x6b175474e89094c44da98b954eedeac495271d0f', USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7', sUSD: '0x57ab1ec28d129707052df4df418d58a2d46d5f51', BUSD: '0x4fabb145d64652a948d72533023f6e7a623c7c53', TUSD: '0x0000000000085d4780b73119b644ae5ecd22b376', PAX: '0x8e870d67f660d95d5be530380d0ec0bd388289e1', GUSD: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd', HUSD: '0xdf574c24545e5ffecb9a659c229253d4111d87e1', mUSD: '0xe2f2a5c287993345a840db3b0845fbc70f5935a5', USDN: '0x674c6ad92fd080e4004b2312b45f796a192d27a0', dUSD: '0x5bc25f649fc4e26069ddf4cf4010f9f706c23831', USDP: '0x1456688345527be1f37e9e627da0837d6f08c925', 
    // Bitcoins
    WBTC: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', RenBTC: '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d', sBTC: '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6', tBTC: '0x8daebade922df735c38c80c7ebd708af50815faa', hBTC: '0x0316eb71485b0ab14103307bf65a021042c6d380', pBTC: '0x5228a22e72ccc52d415ecfd199f99d0665e7733b', bBTC: '0x9be89d2a4cd102d8fecc6bf9da793be995c22541', oBTC: '0x8064d9ae6cdf087b1bcd5bdf3531bd5d8c537a68', 
    // aTokens (Aave)
    aDAI: '0x028171bca77440897b824ca71d1c56cac55b68a3', aUSDC: '0xbcca60bb61934080951369a648fb03df4f96263c', aUSDT: '0x3ed3b47dd13ec9a98b44e6204a523e766b225811', aSUSD: '0x6c5024cd4f8a59110119c56f8933403a539555eb', 
    // Other
    MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2', EURS: '0xdb25f211ab05b1c97d595516f45794528a807ad8', sEUR: '0xd71ecff9342a5ced620049e616c5035f1db98620', sETH: '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb', stETH: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', LINK: '0x514910771af9ca656af840dff83e8264ecf986ca', MANA: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942', KNC: '0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202', AAVE: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9', sLINK: '0xbbc455cb4f1b9e4bfc4b73970d360c8f032efee6', yUSD: '0x5dbcf33d8c2e976c6b560249878e6f1491bca25c', ybCRV: '0x2994529c0652d127b7842094103715ec5299bbed', yCRV: '0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', bCRV: '0x3b3ac5386837dc563660fb6a0937dfaa5924333b', yDAI: '0xacd43e627e64355f1861cec6d3a6688b31a6f952', yUSDC: '0x597ad1e0c13bfe8025993d9e79c69e1c0233522e', yUSDT: '0x2f08119c6f07c006695e079aafc638b8789faf18', yTUSD: '0x37d19d1c4e1fa9dc47bd1ea12f742a0887eda74a', crETH: '0xcbc1065255cbc3ab41a6868c22d1f1c573ab89fd', ankrETH: '0xe95a203b1a91a908f9b9ce46459d101078c2c3cb', vETH: '0x898bad2774eb97cf6b94605677f43b41871410b1', alETH: '0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6', HT: '0x6f259637dcD74C767781E37Bc6133cd6A68aa161', 
    // Mirror Protocol
    UST: '0xa47c8bf37f92abed4a126bda807a7b7498661acd', MIR: '0x09a3ecafa817268f77be1283176b946c4ff2e608' }, MIRROR_WRAPPED_TOKENS), { 
    // StableSwap "open pools" (crv.finance)
    STABLEx: '0xcd91538b91b4ba7797d39a2f66e63810b50a33d0', alUSD: '0xbc6da0fe9ad5f3b0d58160288917aa56653660e9', FRAX: '0x853d955acef822db058eb8505911ed77f175b99e', LUSD: '0x5f98805a4e8be255a32880fdec7f6728c6568ba0', FEI: '0x956f47f50a910163d8bf957cf5846d573e7f87ca' });
exports.BSC_TOKENS = {
    WBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    USDT: '0x55d398326f99059ff775485246999027b3197955',
    USDC: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    DAI: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    PAX: '0xb7f8cd00c5a06c0537e2abff0b58033d02e5e094',
    UST: '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
    VAI: '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7',
    WEX: '0xa9c41a46a6b3531d28d5c32f6633dd2ff05dfb90',
    WETH: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    BTCB: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    renBTC: '0xfce146bf3146100cfe5db4129cf6c82b0ef4ad8c',
    pBTC: '0xed28a457a5a76596ac48d87c0f577020f6ea1c4c',
    vUSD: '0xb365AB13bC6Bd2826a0217A5d3C26C4da9C739CA',
    vEUR: '0xce610182e55b8fabbfbe990811fc546ffb26b5c9',
    vTHB: '0x0586a2240013dAAA41Ec91C4447a0E9e30c4BECc',
    vSGD: '0x4bfDe56E7eB7ED22CD5fb7C7595D1D11B1414581',
    vCHF: '0x805a6d33250c9129b17245b39f4aa9bdac3231c9',
    XLM: '0x119a2d7ce8846847c02ab16c34dc4b4bfd8a0d68',
    BNB: '0x0000000000000000000000000000000000000000',
    EVRY: '0xaa4988ef2505068e7f4fba05e88ec19bc5629734',
};
exports.CHAPEL_TOKENS = {
    WBNB: '0x4fac0386c4045b52756b206db3148201e42b3f62',
    vUSD: '0x5108c124a162221a11181d82889cb4b85251b99e',
    USDT: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
    BUSD: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
    vEUR: '0x927098c1f03f4f624c2b30f5cc956f0edc175e61',
    vTHB: '0x7950d937be6ad204d73345609a3c91259236b139',
    vSGD: '0x4149c3b3807cdc4cb2249f9c4579391a77a93043',
    vCHF: '0xf313ca0e69ebd1c5230bf939c46b0e097463fe49',
    XLM: '0x119a2d7ce8846847c02ab16c34dc4b4bfd8a0d68',
    BNB: '0x0000000000000000000000000000000000000000',
    EVRY: '0xaa4988ef2505068e7f4fba05e88ec19bc5629734',
};
exports.POLYGON_TOKENS = {
    DAI: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    USDC: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    amDAI: '0x27f8d03b3a2196956ed754badc28d73be8830a6e',
    amUSDC: '0x1a13f4ca1d028320a707d99520abfefca3998b7f',
    amUSDT: '0x60d55f02a771d515e077c9c2403a1ef324885cec',
    WBTC: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
    WMATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    WETH: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    renBTC: '0xdbf31df14b66535af65aac99c32e9ea844e14501',
    QUICK: '0x831753dd7087cac61ab5644b308642cc1c33dc13',
    DFYN: '0xc168e40227e4ebd8c1cae80f7a55a4f0e6d66c97',
    BANANA: '0x5d47baba0d66083c52009271faf3f50dcc01023c',
    WEXPOLY: '0x4c4bf319237d98a30a929a96112effa8da3510eb',
};
exports.CURVE_POOLS = {
    compound: '0xa2b47e3d5c44877cca798226b7b8118f9bfb7a56',
    // 1.USDT is dead
    PAX: '0x06364f10b501e868329afbc005b3492902d6c763',
    // 3.y is dead
    // 3.bUSD is dead
    sUSD: '0xa5407eae9ba41422680e2e00537571bcc53efbfd',
    renBTC: '0x93054188d876f558f4a66b2ef1d97d16edf0895b',
    sBTC: '0x7fc77b5c7614e1533320ea6ddc2eb61fa00a9714',
    HBTC: '0x4ca9b3063ec5866a4b82e437059d2c43d1be596f',
    TRI: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
    GUSD: '0x4f062658eaaf2c1ccf8c8e36d6824cdf41167956',
    HUSD: '0x3ef6a01a0f81d6046290f3e2a8c5b843e738e604',
    // 12.usdk is dead
    USDN: '0x0f9cb53ebe405d49a0bbdbd291a65ff571bc83e1',
    // 14.linkusd is dead
    mUSD: '0x8474ddbe98f5aa3179b3b3f5942d724afcdec9f6',
    // 16.rsv is dead
    dUSD: '0x8038c01a0390a8c547446a0b2c18fc9aefecc10c',
    tBTC: '0xc25099792e9349c7dd09759744ea681c7de2cb66',
    pBTC: '0x7f55dde206dbad629c080068923b36fe9d6bdbef',
    bBTC: '0x071c661b4deefb59e2a3ddb20db036821eee8f4b',
    oBTC: '0xd81da8d904b52208541bade1bd6595d8a251f8dd',
    UST: '0x890f4e345b1daed0367a877a1612f86a1f86985f',
    eurs: '0x0ce6a5ff5217e38315f87032cf90686c96627caa',
    seth: '0xc5424b857f758e906013f3555dad202e4bdb4567',
    aave: '0xdebf20617708857ebe4f679508e7b7863a8a8eee',
    steth: '0xdc24316b9ae028f1497c275eb9192a3ea0f67022',
    saave: '0xeb16ae0052ed37f479f7fe63849198df1765a733',
    ankreth: '0xa96a65c051bf88b4095ee1f2451c2a9d43f53ae2',
    USDP: '0x42d7025938bec20b69cbae5a77421082407f053a',
    ib: '0x2dded6da1bf5dbdf597c45fcfaa3194e53ecfeaf',
    link: '0xf178c0b5bb7e7abf4e12a4838c7b7c5ba2c623c0',
    // StableSwap "open pools" (crv.finance)
    TUSD: '0xecd5e75afb02efa118af914515d6521aabd189f1',
    STABLEx: '0x3252efd4ea2d6c78091a1f43982ee2c3659cc3d1',
    alUSD: '0x43b4fdfd4ff969587185cdb6f0bd875c5fc83f8c',
    FRAX: '0xd632f22692fac7611d2aa1c0d552930d43caed3b',
    LUSD: '0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca',
    BUSD: '0x4807862aa8b2bf68830e4c8dc86d0e9a998e085a',
};
exports.CURVE_V2_POOLS = {
    tricrypto: '0x80466c64868e1ab14a1ddf27a676c3fcbe638fe5',
};
exports.CURVE_POLYGON_POOLS = {
    aave: '0x445fe580ef8d70ff569ab36e80c647af338db351',
    ren: '0xc2d95eef97ec6c17551d45e77b590dc1f9117c67',
};
exports.CURVE_V2_POLYGON_POOLS = {
    atricrypto: '0x3fcd5de6a9fc8a99995c406c77dda3ed7e406f81',
};
exports.SWERVE_POOLS = {
    y: '0x329239599afb305da0a2ec69c58f8a6697f9f88d',
};
exports.SNOWSWAP_POOLS = {
    yUSD: '0xbf7ccd6c446acfcc5df023043f2167b62e81899b',
    yVault: '0x4571753311e37ddb44faa8fb78a6df9a6e3c6c0b',
    // POOL Disabled as it uses WETH over ETH
    // There is a conflict with Curve and SnowSwap
    // where Curve uses ETH and SnowSwap uses WETH
    // To re-enable this we need to flag an WETH
    // unwrap or not
    // eth: '0x16bea2e63adade5984298d53a4d4d9c09e278192',
};
exports.SMOOTHY_POOLS = {
    syUSD: '0xe5859f4efc09027a9b718781dcb2c6910cac6e91',
};
exports.SADDLE_POOLS = {
    stables: '0x3911f80530595fbd01ab1516ab61255d75aeb066',
    bitcoins: '0x4f6a43ad7cba042606decaca730d4ce0a57ac62e',
    alETH: '0xa6018520eaacc06c30ff2e1b3ee2c7c22e64196a',
    d4: '0xc69ddcd4dfef25d8a793241834d4cc4b3668ead6',
};
exports.IRONSWAP_POOLS = {
    is3usd: '0x837503e8a8753ae17fb8c8151b8e6f586defcb57',
};
exports.NERVE_POOLS = {
    threePool: '0x1b3771a66ee31180906972580ade9b81afc5fcdc',
};
exports.BELT_POOLS = {
    vPool: '0xf16d312d119c13dd27fd0dc814b0bcdcaaa62dfd',
};
exports.ELLIPSIS_POOLS = {
    threePool: '0x160caed03795365f3a589f10c379ffa7d75d4e76',
};
exports.XSIGMA_POOLS = {
    stable: '0x3333333ACdEdBbC9Ad7bda0876e60714195681c5',
};
exports.FIREBIRDONESWAP_BSC_POOLS = {
    oneswap: '0x01c9475dbd36e46d1961572c8de24b74616bae9e',
};
exports.FIREBIRDONESWAP_POLYGON_POOLS = {
    oneswap: '0x01c9475dbd36e46d1961572c8de24b74616bae9e',
};
exports.ACRYPTOS_POOLS = {
    acs4usd: '0xb3f0c9ea1f05e312093fdb031e789a756659b0ac',
    acs4vai: '0x191409d5a4effe25b0f4240557ba2192d18a191e',
    acs4ust: '0x99c92765efc472a9709ced86310d64c4573c4b77',
    acs3btc: '0xbe7caa236544d1b9a0e7f91e94b9f5bfd3b5ca81',
};
exports.DEFAULT_INTERMEDIATE_TOKENS_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: [
        exports.MAINNET_TOKENS.WETH,
        exports.MAINNET_TOKENS.USDT,
        exports.MAINNET_TOKENS.DAI,
        exports.MAINNET_TOKENS.USDC,
        exports.MAINNET_TOKENS.WBTC,
    ],
    [contract_addresses_1.ChainId.BSC]: [
        exports.BSC_TOKENS.WBNB,
        exports.BSC_TOKENS.USDT,
        exports.BSC_TOKENS.vUSD,
        exports.BSC_TOKENS.vEUR,
        exports.BSC_TOKENS.vCHF,
        exports.BSC_TOKENS.vSGD,
        exports.BSC_TOKENS.vTHB,
        exports.BSC_TOKENS.BNB,
        exports.BSC_TOKENS.EVRY,
        exports.BSC_TOKENS.BUSD,
        exports.BSC_TOKENS.XLM,
    ],
    [contract_addresses_1.ChainId.Chapel]: [
        exports.CHAPEL_TOKENS.WBNB,
        exports.CHAPEL_TOKENS.USDT,
        exports.CHAPEL_TOKENS.vUSD,
        exports.CHAPEL_TOKENS.vEUR,
        exports.CHAPEL_TOKENS.vCHF,
        exports.CHAPEL_TOKENS.vSGD,
        exports.CHAPEL_TOKENS.vTHB,
        exports.CHAPEL_TOKENS.BNB,
        exports.CHAPEL_TOKENS.EVRY,
        exports.CHAPEL_TOKENS.BUSD,
        exports.CHAPEL_TOKENS.XLM,
    ],
    [contract_addresses_1.ChainId.Ropsten]: [
        contract_addresses_1.getContractAddressesForChainOrThrow(contract_addresses_1.ChainId.Ropsten).etherToken,
        '0xad6d458402f60fd3bd25163575031acdce07538d',
        '0x07865c6e87b9f70255377e024ace6630c1eaa37f', // USDC
    ],
    [contract_addresses_1.ChainId.Polygon]: [
        exports.POLYGON_TOKENS.WMATIC,
        exports.POLYGON_TOKENS.WETH,
        exports.POLYGON_TOKENS.USDC,
        exports.POLYGON_TOKENS.DAI,
        exports.POLYGON_TOKENS.USDT,
        exports.POLYGON_TOKENS.WBTC,
    ],
}, []);
exports.DEFAULT_TOKEN_ADJACENCY_GRAPH_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: new token_adjacency_graph_builder_1.TokenAdjacencyGraphBuilder({
        default: exports.DEFAULT_INTERMEDIATE_TOKENS_BY_CHAIN_ID[contract_addresses_1.ChainId.Mainnet],
    })
        // Mirror Protocol
        .tap(builder => {
        builder
            .add(exports.MAINNET_TOKENS.MIR, exports.MAINNET_TOKENS.UST)
            .add(exports.MAINNET_TOKENS.UST, [exports.MAINNET_TOKENS.MIR, ...Object.values(MIRROR_WRAPPED_TOKENS)])
            .add(exports.MAINNET_TOKENS.USDT, exports.MAINNET_TOKENS.UST);
        Object.values(MIRROR_WRAPPED_TOKENS).forEach(t => builder.add(t, exports.MAINNET_TOKENS.UST));
    })
        // Build
        .build(),
    [contract_addresses_1.ChainId.BSC]: new token_adjacency_graph_builder_1.TokenAdjacencyGraphBuilder({
        default: exports.DEFAULT_INTERMEDIATE_TOKENS_BY_CHAIN_ID[contract_addresses_1.ChainId.BSC],
    }).build(),
    [contract_addresses_1.ChainId.Chapel]: new token_adjacency_graph_builder_1.TokenAdjacencyGraphBuilder({
        default: exports.DEFAULT_INTERMEDIATE_TOKENS_BY_CHAIN_ID[contract_addresses_1.ChainId.Chapel],
    }).build(),
    [contract_addresses_1.ChainId.Polygon]: new token_adjacency_graph_builder_1.TokenAdjacencyGraphBuilder({
        default: exports.DEFAULT_INTERMEDIATE_TOKENS_BY_CHAIN_ID[contract_addresses_1.ChainId.Polygon],
    }).build(),
}, new token_adjacency_graph_builder_1.TokenAdjacencyGraphBuilder({ default: [] }).build());
exports.NATIVE_FEE_TOKEN_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: contract_addresses_1.getContractAddressesForChainOrThrow(contract_addresses_1.ChainId.Mainnet).etherToken,
    [contract_addresses_1.ChainId.BSC]: contract_addresses_1.getContractAddressesForChainOrThrow(contract_addresses_1.ChainId.BSC).etherToken,
    [contract_addresses_1.ChainId.Chapel]: contract_addresses_1.getContractAddressesForChainOrThrow(contract_addresses_1.ChainId.Chapel).etherToken,
    [contract_addresses_1.ChainId.Ganache]: contract_addresses_1.getContractAddressesForChainOrThrow(contract_addresses_1.ChainId.Ganache).etherToken,
    [contract_addresses_1.ChainId.Ropsten]: contract_addresses_1.getContractAddressesForChainOrThrow(contract_addresses_1.ChainId.Ropsten).etherToken,
    [contract_addresses_1.ChainId.Rinkeby]: contract_addresses_1.getContractAddressesForChainOrThrow(contract_addresses_1.ChainId.Rinkeby).etherToken,
    [contract_addresses_1.ChainId.Kovan]: contract_addresses_1.getContractAddressesForChainOrThrow(contract_addresses_1.ChainId.Kovan).etherToken,
    [contract_addresses_1.ChainId.Polygon]: contract_addresses_1.getContractAddressesForChainOrThrow(contract_addresses_1.ChainId.Polygon).etherToken,
}, exports.NULL_ADDRESS);
exports.NATIVE_FEE_TOKEN_AMOUNT_BY_CHAIN_ID = valueByChainId({ [contract_addresses_1.ChainId.Mainnet]: exports.ONE_ETHER.times(0.1) }, exports.ONE_ETHER);
// Order dependent
const CURVE_TRI_POOL_MAINNET_TOKENS = [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT];
const CURVE_TRI_BTC_POOL_TOKEN = [exports.MAINNET_TOKENS.RenBTC, exports.MAINNET_TOKENS.WBTC, exports.MAINNET_TOKENS.sBTC];
const CURVE_POLYGON_ATRICRYPTO_UNDERLYING_TOKENS = [exports.POLYGON_TOKENS.DAI, exports.POLYGON_TOKENS.USDC, exports.POLYGON_TOKENS.USDT];
const CURVE_POLYGON_ATRICRYPTO_TOKENS = [exports.POLYGON_TOKENS.amDAI, exports.POLYGON_TOKENS.amUSDC, exports.POLYGON_TOKENS.amUSDT];
const createCurveExchangePool = (info) => ({
    exchangeFunctionSelector: types_1.CurveFunctionSelectors.exchange,
    sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.get_dy,
    buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
    tokens: info.tokens,
    metaTokens: undefined,
    poolAddress: info.pool,
    gasSchedule: info.gasSchedule,
});
const createCurveExchangeUnderlyingPool = (info) => ({
    exchangeFunctionSelector: types_1.CurveFunctionSelectors.exchange_underlying,
    sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.get_dy_underlying,
    buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
    tokens: info.tokens,
    metaTokens: undefined,
    poolAddress: info.pool,
    gasSchedule: info.gasSchedule,
});
const createCurveMetaTriPool = (info) => ({
    exchangeFunctionSelector: types_1.CurveFunctionSelectors.exchange_underlying,
    sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.get_dy_underlying,
    buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
    tokens: [...info.tokens, ...CURVE_TRI_POOL_MAINNET_TOKENS],
    metaTokens: info.tokens,
    poolAddress: info.pool,
    gasSchedule: info.gasSchedule,
});
const createCurveMetaTriBtcPool = (info) => ({
    exchangeFunctionSelector: types_1.CurveFunctionSelectors.exchange_underlying,
    sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.get_dy_underlying,
    buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
    tokens: [...info.tokens, ...CURVE_TRI_BTC_POOL_TOKEN],
    metaTokens: info.tokens,
    poolAddress: info.pool,
    gasSchedule: info.gasSchedule,
});
const createCurveExchangeV2Pool = (info) => ({
    exchangeFunctionSelector: types_1.CurveFunctionSelectors.exchange_v2,
    sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.get_dy_v2,
    buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
    tokens: info.tokens,
    metaTokens: undefined,
    poolAddress: info.pool,
    gasSchedule: info.gasSchedule,
});
const createCurveV2MetaTriPool = (info) => ({
    exchangeFunctionSelector: types_1.CurveFunctionSelectors.exchange_underlying_v2,
    sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.get_dy_underlying_v2,
    buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
    tokens: [...CURVE_POLYGON_ATRICRYPTO_UNDERLYING_TOKENS, ...info.tokens],
    metaTokens: info.tokens,
    poolAddress: info.pool,
    gasSchedule: info.gasSchedule,
});
/**
 * Mainnet Curve configuration
 * The tokens are in order of their index, which each curve defines
 * I.e DaiUsdc curve has DAI as index 0 and USDC as index 1
 */
exports.CURVE_MAINNET_INFOS = {
    [exports.CURVE_POOLS.compound]: createCurveExchangeUnderlyingPool({
        tokens: [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.USDC],
        pool: exports.CURVE_POOLS.compound,
        gasSchedule: 587e3,
    }),
    [exports.CURVE_POOLS.PAX]: createCurveExchangeUnderlyingPool({
        tokens: [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT, exports.MAINNET_TOKENS.PAX],
        pool: exports.CURVE_POOLS.PAX,
        gasSchedule: 742e3,
    }),
    [exports.CURVE_POOLS.sUSD]: createCurveExchangeUnderlyingPool({
        tokens: [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT, exports.MAINNET_TOKENS.sUSD],
        pool: exports.CURVE_POOLS.sUSD,
        gasSchedule: 302e3,
    }),
    [exports.CURVE_POOLS.renBTC]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.RenBTC, exports.MAINNET_TOKENS.WBTC],
        pool: exports.CURVE_POOLS.renBTC,
        gasSchedule: 171e3,
    }),
    [exports.CURVE_POOLS.sBTC]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.RenBTC, exports.MAINNET_TOKENS.WBTC, exports.MAINNET_TOKENS.sBTC],
        pool: exports.CURVE_POOLS.sBTC,
        gasSchedule: 327e3,
    }),
    [exports.CURVE_POOLS.HBTC]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.hBTC, exports.MAINNET_TOKENS.WBTC],
        pool: exports.CURVE_POOLS.HBTC,
        gasSchedule: 210e3,
    }),
    [exports.CURVE_POOLS.TRI]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT],
        pool: exports.CURVE_POOLS.TRI,
        gasSchedule: 176e3,
    }),
    [exports.CURVE_POOLS.GUSD]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.GUSD],
        pool: exports.CURVE_POOLS.GUSD,
        gasSchedule: 411e3,
    }),
    [exports.CURVE_POOLS.HUSD]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.HUSD],
        pool: exports.CURVE_POOLS.HUSD,
        gasSchedule: 396e3,
    }),
    [exports.CURVE_POOLS.USDN]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.USDN],
        pool: exports.CURVE_POOLS.USDN,
        gasSchedule: 398e3,
    }),
    [exports.CURVE_POOLS.mUSD]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.mUSD],
        pool: exports.CURVE_POOLS.mUSD,
        gasSchedule: 385e3,
    }),
    [exports.CURVE_POOLS.dUSD]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.dUSD],
        pool: exports.CURVE_POOLS.dUSD,
        gasSchedule: 371e3,
    }),
    [exports.CURVE_POOLS.tBTC]: createCurveMetaTriBtcPool({
        tokens: [exports.MAINNET_TOKENS.tBTC],
        pool: exports.CURVE_POOLS.tBTC,
        gasSchedule: 482e3,
    }),
    [exports.CURVE_POOLS.pBTC]: createCurveMetaTriBtcPool({
        tokens: [exports.MAINNET_TOKENS.pBTC],
        pool: exports.CURVE_POOLS.pBTC,
        gasSchedule: 503e3,
    }),
    [exports.CURVE_POOLS.bBTC]: createCurveMetaTriBtcPool({
        tokens: [exports.MAINNET_TOKENS.bBTC],
        pool: exports.CURVE_POOLS.bBTC,
        gasSchedule: 497e3,
    }),
    [exports.CURVE_POOLS.oBTC]: createCurveMetaTriBtcPool({
        tokens: [exports.MAINNET_TOKENS.oBTC],
        pool: exports.CURVE_POOLS.oBTC,
        gasSchedule: 488e3,
    }),
    [exports.CURVE_POOLS.UST]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.UST],
        pool: exports.CURVE_POOLS.UST,
        gasSchedule: 340e3,
    }),
    [exports.CURVE_POOLS.eurs]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.EURS, exports.MAINNET_TOKENS.sEUR],
        pool: exports.CURVE_POOLS.eurs,
        gasSchedule: 320e3,
    }),
    [exports.CURVE_POOLS.aave]: createCurveExchangeUnderlyingPool({
        tokens: [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT],
        pool: exports.CURVE_POOLS.aave,
        gasSchedule: 580e3,
    }),
    [exports.CURVE_POOLS.aave]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.aDAI, exports.MAINNET_TOKENS.aUSDC, exports.MAINNET_TOKENS.aUSDT],
        pool: exports.CURVE_POOLS.aave,
        gasSchedule: 580e3,
    }),
    [exports.CURVE_POOLS.saave]: createCurveExchangeUnderlyingPool({
        tokens: [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.sUSD],
        pool: exports.CURVE_POOLS.saave,
        gasSchedule: 580e3,
    }),
    [exports.CURVE_POOLS.saave]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.aDAI, exports.MAINNET_TOKENS.aSUSD],
        pool: exports.CURVE_POOLS.saave,
        gasSchedule: 580e3,
    }),
    [exports.CURVE_POOLS.USDP]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.USDP],
        pool: exports.CURVE_POOLS.USDP,
        gasSchedule: 374e3,
    }),
    [exports.CURVE_POOLS.ib]: createCurveExchangeUnderlyingPool({
        tokens: [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT],
        pool: exports.CURVE_POOLS.ib,
        gasSchedule: 646e3,
    }),
    [exports.CURVE_POOLS.link]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.LINK, exports.MAINNET_TOKENS.sLINK],
        pool: exports.CURVE_POOLS.link,
        gasSchedule: 319e3,
    }),
    [exports.CURVE_POOLS.TUSD]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.TUSD],
        pool: exports.CURVE_POOLS.TUSD,
        gasSchedule: 404e3,
    }),
    [exports.CURVE_POOLS.STABLEx]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.STABLEx],
        pool: exports.CURVE_POOLS.STABLEx,
        gasSchedule: 397e3,
    }),
    [exports.CURVE_POOLS.alUSD]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.alUSD],
        pool: exports.CURVE_POOLS.alUSD,
        gasSchedule: 387e3,
    }),
    [exports.CURVE_POOLS.FRAX]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.FRAX],
        pool: exports.CURVE_POOLS.FRAX,
        gasSchedule: 387e3,
    }),
    [exports.CURVE_POOLS.LUSD]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.LUSD],
        pool: exports.CURVE_POOLS.LUSD,
        gasSchedule: 387e3,
    }),
    [exports.CURVE_POOLS.BUSD]: createCurveMetaTriPool({
        tokens: [exports.MAINNET_TOKENS.BUSD],
        pool: exports.CURVE_POOLS.BUSD,
        gasSchedule: 387e3,
    }),
    [exports.CURVE_POOLS.steth]: createCurveExchangePool({
        // This pool uses ETH
        tokens: [exports.MAINNET_TOKENS.WETH, exports.MAINNET_TOKENS.stETH],
        pool: exports.CURVE_POOLS.steth,
        gasSchedule: 151e3,
    }),
    [exports.CURVE_POOLS.seth]: createCurveExchangePool({
        // This pool uses ETH
        tokens: [exports.MAINNET_TOKENS.WETH, exports.MAINNET_TOKENS.sETH],
        pool: exports.CURVE_POOLS.seth,
        gasSchedule: 187e3,
    }),
    [exports.CURVE_POOLS.ankreth]: createCurveExchangePool({
        // This pool uses ETH
        tokens: [exports.MAINNET_TOKENS.WETH, exports.MAINNET_TOKENS.ankrETH],
        pool: exports.CURVE_POOLS.ankreth,
        gasSchedule: 125e3,
    }),
};
exports.CURVE_V2_MAINNET_INFOS = {
    [exports.CURVE_V2_POOLS.tricrypto]: createCurveExchangeV2Pool({
        tokens: [exports.MAINNET_TOKENS.USDT, exports.MAINNET_TOKENS.WBTC, exports.MAINNET_TOKENS.WETH],
        pool: exports.CURVE_V2_POOLS.tricrypto,
        gasSchedule: 300e3,
    }),
};
exports.CURVE_POLYGON_INFOS = {
    ['aave_exchangeunderlying']: createCurveExchangeUnderlyingPool({
        tokens: CURVE_POLYGON_ATRICRYPTO_UNDERLYING_TOKENS,
        pool: exports.CURVE_POLYGON_POOLS.aave,
        gasSchedule: 300e3,
    }),
    ['aave_exchange']: createCurveExchangePool({
        tokens: CURVE_POLYGON_ATRICRYPTO_TOKENS,
        pool: exports.CURVE_POLYGON_POOLS.aave,
        gasSchedule: 150e3,
    }),
    [exports.CURVE_POLYGON_POOLS.ren]: createCurveExchangeUnderlyingPool({
        tokens: [exports.POLYGON_TOKENS.WBTC, exports.POLYGON_TOKENS.renBTC],
        pool: exports.CURVE_POLYGON_POOLS.ren,
        gasSchedule: 350e3,
    }),
};
exports.CURVE_V2_POLYGON_INFOS = {
    [exports.CURVE_V2_POLYGON_POOLS.atricrypto]: createCurveV2MetaTriPool({
        tokens: [exports.POLYGON_TOKENS.WBTC, exports.POLYGON_TOKENS.WETH],
        pool: exports.CURVE_V2_POLYGON_POOLS.atricrypto,
        gasSchedule: 300e3,
    }),
};
exports.SWERVE_MAINNET_INFOS = {
    [exports.SWERVE_POOLS.y]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT, exports.MAINNET_TOKENS.TUSD],
        pool: exports.SWERVE_POOLS.y,
        gasSchedule: 140e3,
    }),
};
exports.SNOWSWAP_MAINNET_INFOS = {
    [exports.SNOWSWAP_POOLS.yUSD]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.yUSD, exports.MAINNET_TOKENS.ybCRV],
        pool: exports.SNOWSWAP_POOLS.yUSD,
        gasSchedule: 990e3,
    }),
    [exports.SNOWSWAP_POOLS.yUSD]: createCurveExchangeUnderlyingPool({
        tokens: [exports.MAINNET_TOKENS.yCRV, exports.MAINNET_TOKENS.bCRV],
        pool: exports.SNOWSWAP_POOLS.yUSD,
        gasSchedule: 990e3,
    }),
    [exports.SNOWSWAP_POOLS.yVault]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.yDAI, exports.MAINNET_TOKENS.yUSDC, exports.MAINNET_TOKENS.yUSDT, exports.MAINNET_TOKENS.yTUSD],
        pool: exports.SNOWSWAP_POOLS.yVault,
        gasSchedule: 1490e3,
    }),
    // Unsupported due to collision with WETH and ETH with execution using MixinCurve
    // [SNOWSWAP_POOLS.eth]: createCurveExchangePool({
    //     tokens: [MAINNET_TOKENS.WETH, MAINNET_TOKENS.vETH, MAINNET_TOKENS.ankrETH, MAINNET_TOKENS.crETH],
    //     pool: SNOWSWAP_POOLS.eth,
    //     gasSchedule: 990e3,
    // }),
};
exports.BELT_BSC_INFOS = {
    [exports.BELT_POOLS.vPool]: createCurveExchangeUnderlyingPool({
        tokens: [exports.BSC_TOKENS.DAI, exports.BSC_TOKENS.USDC, exports.BSC_TOKENS.USDT, exports.BSC_TOKENS.BUSD],
        pool: exports.BELT_POOLS.vPool,
        gasSchedule: 4490e3,
    }),
};
exports.ELLIPSIS_BSC_INFOS = {
    [exports.ELLIPSIS_POOLS.threePool]: createCurveExchangePool({
        tokens: [exports.BSC_TOKENS.BUSD, exports.BSC_TOKENS.USDC, exports.BSC_TOKENS.USDT],
        pool: exports.ELLIPSIS_POOLS.threePool,
        gasSchedule: 140e3,
    }),
};
exports.XSIGMA_MAINNET_INFOS = {
    [exports.XSIGMA_POOLS.stable]: createCurveExchangePool({
        tokens: [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT],
        pool: exports.XSIGMA_POOLS.stable,
        gasSchedule: 150e3,
    }),
};
// Curve-like sources using custom selectors
exports.SADDLE_MAINNET_INFOS = {
    [exports.SADDLE_POOLS.stables]: {
        exchangeFunctionSelector: types_1.CurveFunctionSelectors.swap,
        sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.calculateSwap,
        buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
        poolAddress: exports.SADDLE_POOLS.stables,
        tokens: [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT],
        metaTokens: undefined,
        gasSchedule: 150e3,
    },
    [exports.SADDLE_POOLS.bitcoins]: {
        exchangeFunctionSelector: types_1.CurveFunctionSelectors.swap,
        sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.calculateSwap,
        buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
        poolAddress: exports.SADDLE_POOLS.bitcoins,
        tokens: [exports.MAINNET_TOKENS.tBTC, exports.MAINNET_TOKENS.WBTC, exports.MAINNET_TOKENS.RenBTC, exports.MAINNET_TOKENS.sBTC],
        metaTokens: undefined,
        gasSchedule: 150e3,
    },
    [exports.SADDLE_POOLS.alETH]: {
        exchangeFunctionSelector: types_1.CurveFunctionSelectors.swap,
        sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.calculateSwap,
        buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
        poolAddress: exports.SADDLE_POOLS.alETH,
        tokens: [exports.MAINNET_TOKENS.WETH, exports.MAINNET_TOKENS.alETH, exports.MAINNET_TOKENS.sETH],
        metaTokens: undefined,
        gasSchedule: 200e3,
    },
    [exports.SADDLE_POOLS.d4]: {
        exchangeFunctionSelector: types_1.CurveFunctionSelectors.swap,
        sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.calculateSwap,
        buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
        poolAddress: exports.SADDLE_POOLS.d4,
        tokens: [exports.MAINNET_TOKENS.alUSD, exports.MAINNET_TOKENS.FEI, exports.MAINNET_TOKENS.FRAX, exports.MAINNET_TOKENS.LUSD],
        metaTokens: undefined,
        gasSchedule: 150e3,
    },
};
exports.IRONSWAP_POLYGON_INFOS = {
    [exports.IRONSWAP_POOLS.is3usd]: {
        exchangeFunctionSelector: types_1.CurveFunctionSelectors.swap,
        sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.calculateSwap,
        buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
        poolAddress: exports.IRONSWAP_POOLS.is3usd,
        tokens: [exports.POLYGON_TOKENS.USDC, exports.POLYGON_TOKENS.USDT, exports.POLYGON_TOKENS.DAI],
        metaTokens: undefined,
        gasSchedule: 150e3,
    },
};
exports.SMOOTHY_MAINNET_INFOS = {
    [exports.SMOOTHY_POOLS.syUSD]: {
        exchangeFunctionSelector: types_1.CurveFunctionSelectors.swap_uint256,
        sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.get_swap_amount,
        buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
        poolAddress: exports.SMOOTHY_POOLS.syUSD,
        tokens: [
            exports.MAINNET_TOKENS.USDT,
            exports.MAINNET_TOKENS.USDC,
            exports.MAINNET_TOKENS.DAI,
            exports.MAINNET_TOKENS.TUSD,
            exports.MAINNET_TOKENS.sUSD,
            exports.MAINNET_TOKENS.BUSD,
            exports.MAINNET_TOKENS.PAX,
            exports.MAINNET_TOKENS.GUSD,
        ],
        metaTokens: undefined,
        gasSchedule: 190e3,
    },
};
exports.SMOOTHY_BSC_INFOS = {
    [exports.SMOOTHY_POOLS.syUSD]: {
        exchangeFunctionSelector: types_1.CurveFunctionSelectors.swap_uint256,
        sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.get_swap_amount,
        buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
        poolAddress: exports.SMOOTHY_POOLS.syUSD,
        tokens: [exports.BSC_TOKENS.BUSD, exports.BSC_TOKENS.USDT, exports.BSC_TOKENS.USDC, exports.BSC_TOKENS.DAI, exports.BSC_TOKENS.PAX, exports.BSC_TOKENS.UST],
        metaTokens: undefined,
        gasSchedule: 90e3,
    },
};
exports.NERVE_BSC_INFOS = {
    [exports.NERVE_POOLS.threePool]: {
        exchangeFunctionSelector: types_1.CurveFunctionSelectors.swap,
        sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.calculateSwap,
        buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
        poolAddress: exports.NERVE_POOLS.threePool,
        tokens: [exports.BSC_TOKENS.BUSD, exports.BSC_TOKENS.USDT, exports.BSC_TOKENS.USDC],
        metaTokens: undefined,
        gasSchedule: 140e3,
    },
};
exports.FIREBIRDONESWAP_BSC_INFOS = {
    [exports.FIREBIRDONESWAP_BSC_POOLS.oneswap]: {
        exchangeFunctionSelector: types_1.CurveFunctionSelectors.swap,
        sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.calculateSwap,
        buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
        poolAddress: exports.FIREBIRDONESWAP_BSC_POOLS.oneswap,
        tokens: [exports.BSC_TOKENS.BUSD, exports.BSC_TOKENS.USDT, exports.BSC_TOKENS.DAI, exports.BSC_TOKENS.USDC],
        metaTokens: undefined,
        gasSchedule: 100e3,
    },
};
exports.FIREBIRDONESWAP_POLYGON_INFOS = {
    [exports.FIREBIRDONESWAP_POLYGON_POOLS.oneswap]: {
        exchangeFunctionSelector: types_1.CurveFunctionSelectors.swap,
        sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.calculateSwap,
        buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
        poolAddress: exports.FIREBIRDONESWAP_POLYGON_POOLS.oneswap,
        tokens: [exports.POLYGON_TOKENS.DAI, exports.POLYGON_TOKENS.USDC, exports.POLYGON_TOKENS.USDT],
        metaTokens: undefined,
        gasSchedule: 100e3,
    },
};
const ACRYPTOS_ACS4USD_POOL_BSC_TOKENS = [exports.BSC_TOKENS.BUSD, exports.BSC_TOKENS.USDT, exports.BSC_TOKENS.DAI, exports.BSC_TOKENS.USDC];
const createAcryptosMetaUsdPool = (info) => ({
    exchangeFunctionSelector: types_1.CurveFunctionSelectors.exchange_underlying,
    sellQuoteFunctionSelector: types_1.CurveFunctionSelectors.get_dy_underlying,
    buyQuoteFunctionSelector: types_1.CurveFunctionSelectors.None,
    tokens: [...info.tokens, ...ACRYPTOS_ACS4USD_POOL_BSC_TOKENS],
    metaTokens: info.tokens,
    poolAddress: info.pool,
    gasSchedule: info.gasSchedule,
});
exports.ACRYPTOS_BSC_INFOS = {
    [exports.ACRYPTOS_POOLS.acs4usd]: createCurveExchangePool({
        tokens: ACRYPTOS_ACS4USD_POOL_BSC_TOKENS,
        pool: exports.ACRYPTOS_POOLS.acs4usd,
        gasSchedule: 145e3,
    }),
    [exports.ACRYPTOS_POOLS.acs4vai]: createAcryptosMetaUsdPool({
        tokens: [exports.BSC_TOKENS.VAI],
        pool: exports.ACRYPTOS_POOLS.acs4vai,
        gasSchedule: 300e3,
    }),
    [exports.ACRYPTOS_POOLS.acs4ust]: createAcryptosMetaUsdPool({
        tokens: [exports.BSC_TOKENS.UST],
        pool: exports.ACRYPTOS_POOLS.acs4ust,
        gasSchedule: 300e3,
    }),
    [exports.ACRYPTOS_POOLS.acs3btc]: createCurveExchangePool({
        tokens: [exports.BSC_TOKENS.BTCB, exports.BSC_TOKENS.renBTC, exports.BSC_TOKENS.pBTC],
        pool: exports.ACRYPTOS_POOLS.acs3btc,
        gasSchedule: 145e3,
    }),
};
/**
 * Kyber reserve prefixes
 * 0xff Fed price reserve
 * 0xaa Automated price reserve
 * 0xbb Bridged price reserve (i.e Uniswap/Curve)
 */
exports.KYBER_BRIDGED_LIQUIDITY_PREFIX = '0xbb';
exports.KYBER_BANNED_RESERVES = ['0xff4f6e65426974205175616e7400000000000000000000000000000000000000'];
exports.MAX_KYBER_RESERVES_QUERIED = 5;
exports.KYBER_CONFIG_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: {
        networkProxy: '0x9aab3f75489902f3a48495025729a0af77d4b11e',
        hintHandler: '0xa1C0Fa73c39CFBcC11ec9Eb1Afc665aba9996E2C',
        weth: exports.MAINNET_TOKENS.WETH,
    },
    [contract_addresses_1.ChainId.Ropsten]: {
        networkProxy: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
        hintHandler: '0x63f773c026093eef988e803bdd5772dd235a8e71',
        weth: contract_addresses_1.getContractAddressesForChainOrThrow(contract_addresses_1.ChainId.Ropsten).etherToken,
    },
}, {
    networkProxy: exports.NULL_ADDRESS,
    hintHandler: exports.NULL_ADDRESS,
    weth: exports.NULL_ADDRESS,
});
exports.LIQUIDITY_PROVIDER_REGISTRY_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: {
        ['0x1d0d407c5af8c86f0a6494de86e56ae21e46a951']: {
            tokens: [
                exports.MAINNET_TOKENS.WETH,
                exports.MAINNET_TOKENS.USDC,
                exports.MAINNET_TOKENS.USDT,
                exports.MAINNET_TOKENS.WBTC,
                exports.MAINNET_TOKENS.PAX,
                exports.MAINNET_TOKENS.LINK,
                exports.MAINNET_TOKENS.KNC,
                exports.MAINNET_TOKENS.MANA,
                exports.MAINNET_TOKENS.DAI,
                exports.MAINNET_TOKENS.BUSD,
                exports.MAINNET_TOKENS.AAVE,
                exports.MAINNET_TOKENS.HT,
            ],
            gasCost: (takerToken, makerToken) => [takerToken, makerToken].includes(exports.MAINNET_TOKENS.WETH) ? 160e3 : 280e3,
        },
    },
}, {});
exports.UNISWAPV1_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: '0xc0a47dfe034b400b47bdad5fecda2621de6c4d95',
    [contract_addresses_1.ChainId.Ropsten]: '0x9c83dce8ca20e9aaf9d3efc003b2ea62abc08351',
}, exports.NULL_ADDRESS);
exports.UNISWAPV2_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: '0xf164fc0ec4e93095b804a4795bbe1e041497b92a',
    [contract_addresses_1.ChainId.Ropsten]: '0xf164fc0ec4e93095b804a4795bbe1e041497b92a',
}, exports.NULL_ADDRESS);
exports.SUSHISWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
    [contract_addresses_1.ChainId.BSC]: '0x1b02da8cb0d097eb8d57a175b88c7d8b47997506',
    [contract_addresses_1.ChainId.Ropsten]: '0x1b02da8cb0d097eb8d57a175b88c7d8b47997506',
    [contract_addresses_1.ChainId.Polygon]: '0x1b02da8cb0d097eb8d57a175b88c7d8b47997506',
}, exports.NULL_ADDRESS);
exports.CRYPTO_COM_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: '0xceb90e4c17d626be0facd78b79c9c87d7ca181b3',
}, exports.NULL_ADDRESS);
exports.LINKSWAP_ROUTER_BY_CHAIN_ID = valueByChainId({ [contract_addresses_1.ChainId.Mainnet]: '0xa7ece0911fe8c60bff9e99f8fafcdbe56e07aff1' }, exports.NULL_ADDRESS);
exports.SHIBASWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: '0x03f7724180aa6b939894b5ca4314783b0b36b329',
}, exports.NULL_ADDRESS);
exports.MSTABLE_POOLS_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: {
        mUSD: {
            poolAddress: '0xe2f2a5c287993345a840db3b0845fbc70f5935a5',
            tokens: [exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT],
        },
        mBTC: {
            poolAddress: '0x945facb997494cc2570096c74b5f66a3507330a1',
            tokens: [exports.MAINNET_TOKENS.WBTC, exports.MAINNET_TOKENS.RenBTC, exports.MAINNET_TOKENS.sBTC],
        },
    },
    [contract_addresses_1.ChainId.Polygon]: {
        mUSD: {
            poolAddress: '0xe840b73e5287865eec17d250bfb1536704b43b21',
            tokens: [exports.POLYGON_TOKENS.DAI, exports.POLYGON_TOKENS.USDC, exports.POLYGON_TOKENS.USDT],
        },
        mBTC: {
            poolAddress: exports.NULL_ADDRESS,
            tokens: [],
        },
    },
}, {
    mUSD: {
        poolAddress: exports.NULL_ADDRESS,
        tokens: [],
    },
    mBTC: {
        poolAddress: exports.NULL_ADDRESS,
        tokens: [],
    },
});
exports.OASIS_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: '0x5e3e0548935a83ad29fb2a9153d331dc6d49020f',
}, exports.NULL_ADDRESS);
exports.KYBER_DMM_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: '0x1c87257f5e8609940bc751a07bb085bb7f8cdbe6',
    [contract_addresses_1.ChainId.Polygon]: '0x546c79662e028b661dfb4767664d0273184e4dd1',
}, exports.NULL_ADDRESS);
exports.MOONISWAP_REGISTRIES_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: [
        '0x71CD6666064C3A1354a3B4dca5fA1E2D3ee7D303',
        '0xc4a8b7e29e3c8ec560cd4945c1cf3461a85a148d',
        '0xbaf9a5d4b0052359326a6cdab54babaa3a3a9643',
    ],
    [contract_addresses_1.ChainId.BSC]: ['0xd41b24bba51fac0e4827b6f94c0d6ddeb183cd64'],
}, []);
exports.DODOV1_CONFIG_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: {
        helper: '0x533da777aedce766ceae696bf90f8541a4ba80eb',
        registry: '0x3A97247DF274a17C59A3bd12735ea3FcDFb49950',
    },
    [contract_addresses_1.ChainId.BSC]: {
        helper: '0x0f859706aee7fcf61d5a8939e8cb9dbb6c1eda33',
        registry: '0xca459456a45e300aa7ef447dbb60f87cccb42828',
    },
    [contract_addresses_1.ChainId.Polygon]: {
        helper: '0xdfaf9584f5d229a9dbe5978523317820a8897c5a',
        registry: '0x357c5e9cfa8b834edcef7c7aabd8f9db09119d11',
    },
}, { helper: exports.NULL_ADDRESS, registry: exports.NULL_ADDRESS });
exports.DODOV2_FACTORIES_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: [
        '0x6b4fa0bc61eddc928e0df9c7f01e407bfcd3e5ef',
        '0x72d220ce168c4f361dd4dee5d826a01ad8598f6c',
        '0x6fddb76c93299d985f4d3fc7ac468f9a168577a4', // Stability Pool
    ],
    [contract_addresses_1.ChainId.BSC]: [
        '0xafe0a75dffb395eaabd0a7e1bbbd0b11f8609eef',
        '0x790b4a80fb1094589a3c0efc8740aa9b0c1733fb',
        '0x0fb9815938ad069bf90e14fe6c596c514bede767', // Stability Pool
    ],
    [contract_addresses_1.ChainId.Polygon]: [
        '0x95e887adf9eaa22cc1c6e3cb7f07adc95b4b25a8',
        '0x79887f65f83bdf15bcc8736b5e5bcdb48fb8fe13',
        '0x43c49f8dd240e1545f147211ec9f917376ac1e87', // Stability Pool
    ],
}, []);
exports.MAX_DODOV2_POOLS_QUERIED = 3;
exports.CURVE_LIQUIDITY_PROVIDER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: '0x561b94454b65614ae3db0897b74303f4acf7cc75',
    [contract_addresses_1.ChainId.Ropsten]: '0xae241c6fc7f28f6dc0cb58b4112ba7f63fcaf5e2',
}, exports.NULL_ADDRESS);
exports.MAKER_PSM_INFO_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: {
        // Currently only USDC is supported
        gemTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        ilkIdentifier: strings_1.formatBytes32String('PSM-USDC-A'),
        psmAddress: '0x89b78cfa322f6c5de0abceecab66aee45393cc5a',
    },
}, {
    gemTokenAddress: exports.NULL_ADDRESS,
    ilkIdentifier: exports.NULL_BYTES,
    psmAddress: exports.NULL_ADDRESS,
});
exports.MOONISWAP_LIQUIDITY_PROVIDER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: '0xa2033d6ba88756ce6a87584d69dc87bda9a4f889',
    [contract_addresses_1.ChainId.Ropsten]: '0x87e0393aee0fb8c10b8653c6507c182264fe5a34',
}, exports.NULL_ADDRESS);
exports.BANCOR_REGISTRY_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: '0x52Ae12ABe5D8BD778BD5397F99cA900624CfADD4',
}, exports.NULL_ADDRESS);
exports.SHELL_POOLS_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: {
        StableCoins: {
            poolAddress: '0x8f26d7bab7a73309141a291525c965ecdea7bf42',
            tokens: [exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT, exports.MAINNET_TOKENS.sUSD, exports.MAINNET_TOKENS.DAI],
        },
        Bitcoin: {
            poolAddress: '0xc2d019b901f8d4fdb2b9a65b5d226ad88c66ee8d',
            tokens: [exports.MAINNET_TOKENS.RenBTC, exports.MAINNET_TOKENS.WBTC, exports.MAINNET_TOKENS.sBTC],
        },
    },
}, {
    StableCoins: {
        poolAddress: exports.NULL_ADDRESS,
        tokens: [],
    },
    Bitcoin: {
        poolAddress: exports.NULL_ADDRESS,
        tokens: [],
    },
});
exports.COMPONENT_POOLS_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: {
        USDP_USDC_USDT: {
            poolAddress: '0x49519631b404e06ca79c9c7b0dc91648d86f08db',
            tokens: [exports.MAINNET_TOKENS.USDP, exports.MAINNET_TOKENS.USDC, exports.MAINNET_TOKENS.USDT],
        },
        USDP_DAI_SUSD: {
            poolAddress: '0x6477960dd932d29518d7e8087d5ea3d11e606068',
            tokens: [exports.MAINNET_TOKENS.USDP, exports.MAINNET_TOKENS.DAI, exports.MAINNET_TOKENS.sUSD],
        },
    },
}, {
    USDP_USDC_USDT: {
        poolAddress: exports.NULL_ADDRESS,
        tokens: [],
    },
    USDP_DAI_SUSD: {
        poolAddress: exports.NULL_ADDRESS,
        tokens: [],
    },
});
exports.BALANCER_V2_VAULT_ADDRESS_BY_CHAIN = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: '0xba12222222228d8ba445958a75a0704d566bf2c8',
    [contract_addresses_1.ChainId.Polygon]: '0xba12222222228d8ba445958a75a0704d566bf2c8',
}, exports.NULL_ADDRESS);
exports.LIDO_INFO_BY_CHAIN = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: {
        stEthToken: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
        wethToken: exports.MAINNET_TOKENS.WETH,
    },
}, {
    stEthToken: exports.NULL_ADDRESS,
    wethToken: exports.NULL_ADDRESS,
});
exports.BALANCER_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer';
// export const BALANCER_TOP_POOLS_FETCHED = 250;
exports.BALANCER_TOP_POOLS_FETCHED = 350;
exports.BALANCER_MAX_POOLS_FETCHED = 4;
exports.BALANCER_SUBGRAPH_URL_BY_CHAIN = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: 'http://fcx-subgraph.sotatek.works/subgraphs/name/balancer-labs/balancer-chapel-v4',
    [contract_addresses_1.ChainId.Chapel]: 'http://fcx-subgraph.sotatek.works/subgraphs/name/balancer-labs/balancer-chapel-v4',
}, 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer');
exports.BALANCER_V2_SUBGRAPH_URL_BY_CHAIN = valueByChainId({
    [contract_addresses_1.ChainId.Polygon]: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2',
}, 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2');
exports.UNISWAPV3_CONFIG_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Mainnet]: {
        quoter: '0xb27308f9f90d607463bb33ea1bebb41c27ce5ab6',
        router: '0xe592427a0aece92de3edee1f18e0157c05861564',
    },
    [contract_addresses_1.ChainId.Ropsten]: {
        quoter: '0x2f9e608fd881861b8916257b76613cb22ee0652c',
        router: '0x03782388516e94fcd4c18666303601a12aa729ea',
    },
}, { quoter: exports.NULL_ADDRESS, router: exports.NULL_ADDRESS });
//
// BSC
//
exports.PANCAKESWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: '0x05ff2b0db69458a0750badebc4f9e13add608c7f',
}, exports.NULL_ADDRESS);
exports.PANCAKESWAPV2_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    [contract_addresses_1.ChainId.Chapel]: '0x9ac64cc6e4415144c455bd8e4837fea55603e5c3',
}, exports.NULL_ADDRESS);
exports.AUTOROUTE_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: '0x582909580cc9461805F40370e2BB8d8981EFabE3',
    [contract_addresses_1.ChainId.Chapel]: '0x582909580cc9461805F40370e2BB8d8981EFabE3',
}, exports.NULL_ADDRESS);
exports.BAKERYSWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: '0xcde540d7eafe93ac5fe6233bee57e1270d3e330f',
}, exports.NULL_ADDRESS);
exports.APESWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: '0xc0788a3ad43d79aa53b09c2eacc313a787d1d607',
    [contract_addresses_1.ChainId.Polygon]: '0xc0788a3ad43d79aa53b09c2eacc313a787d1d607',
}, exports.NULL_ADDRESS);
exports.CAFESWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: '0x933daea3a5995fb94b14a7696a5f3ffd7b1e385a',
}, exports.NULL_ADDRESS);
exports.CHEESESWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: '0x3047799262d8d2ef41ed2a222205968bc9b0d895',
}, exports.NULL_ADDRESS);
exports.JULSWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: '0xbd67d157502a23309db761c41965600c2ec788b2',
}, exports.NULL_ADDRESS);
//
// Polygon
//
exports.QUICKSWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Polygon]: '0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff',
}, exports.NULL_ADDRESS);
exports.COMETHSWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Polygon]: '0x93bcdc45f7e62f89a8e901dc4a0e2c6c427d9f25',
}, exports.NULL_ADDRESS);
exports.DFYN_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Polygon]: '0xa102072a4c07f06ec3b4900fdc4c7b80b6c57429',
}, exports.NULL_ADDRESS);
exports.WAULTSWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: '0xd48745e39bbed146eec15b79cbf964884f9877c2',
    [contract_addresses_1.ChainId.Polygon]: '0x3a1d87f206d12415f5b0a33e786967680aab4f6d',
}, exports.NULL_ADDRESS);
exports.POLYDEX_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.Polygon]: '0xe5c67ba380fb2f70a47b489e94bced486bb8fb74',
}, exports.NULL_ADDRESS);
exports.JETSWAP_ROUTER_BY_CHAIN_ID = valueByChainId({
    [contract_addresses_1.ChainId.BSC]: '0xbe65b8f75b9f20f4c522e0067a3887fada714800',
    [contract_addresses_1.ChainId.Polygon]: '0x5c6ec38fb0e2609672bdf628b1fd605a523e5923',
}, exports.NULL_ADDRESS);
const uniswapV2CloneGasSchedule = (fillData) => {
    // TODO: Different base cost if to/from ETH.
    let gas = 90e3;
    const path = fillData.tokenAddressPath;
    if (path.length > 2) {
        gas += (path.length - 2) * 60e3; // +60k for each hop.
    }
    return gas;
};
/**
 * Calculated gross gas cost of the underlying exchange.
 * The cost of switching from one source to another, assuming
 * we are in the middle of a transaction.
 * I.e remove the overhead cost of ExchangeProxy (130k) and
 * the ethereum transaction cost (21k)
 */
// tslint:disable:custom-no-magic-numbers
exports.DEFAULT_GAS_SCHEDULE = {
    [types_1.ERC20BridgeSource.Native]: fillData => {
        // TODO jacob re-order imports so there is no circular rependency with SignedNativeOrder
        const nativeFillData = fillData;
        return nativeFillData && nativeFillData.type === protocol_utils_1.FillQuoteTransformerOrderType.Limit
            ? exports.PROTOCOL_FEE_MULTIPLIER.plus(100e3).toNumber()
            : // TODO jacob revisit wth v4 LimitOrders
                100e3;
    },
    [types_1.ERC20BridgeSource.Uniswap]: () => 90e3,
    [types_1.ERC20BridgeSource.LiquidityProvider]: fillData => {
        return fillData.gasCost || 100e3;
    },
    [types_1.ERC20BridgeSource.Eth2Dai]: () => 400e3,
    [types_1.ERC20BridgeSource.Kyber]: () => 450e3,
    [types_1.ERC20BridgeSource.AutoRoute]: () => 450e3,
    [types_1.ERC20BridgeSource.Curve]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.CurveV2]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.Swerve]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.SnowSwap]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.Nerve]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.Belt]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.Ellipsis]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.Smoothy]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.Saddle]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.IronSwap]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.XSigma]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.FirebirdOneSwap]: fillData => fillData.pool.gasSchedule,
    [types_1.ERC20BridgeSource.MultiBridge]: () => 350e3,
    [types_1.ERC20BridgeSource.UniswapV2]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.SushiSwap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.CryptoCom]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.Linkswap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.ShibaSwap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.Balancer]: () => 180e3,
    [types_1.ERC20BridgeSource.BalancerV2]: () => 100e3,
    [types_1.ERC20BridgeSource.Cream]: () => 120e3,
    [types_1.ERC20BridgeSource.MStable]: () => 200e3,
    [types_1.ERC20BridgeSource.MakerPsm]: (fillData) => {
        const psmFillData = fillData;
        return psmFillData.takerToken === psmFillData.gemTokenAddress ? 210e3 : 290e3;
    },
    [types_1.ERC20BridgeSource.Mooniswap]: () => 130e3,
    [types_1.ERC20BridgeSource.Shell]: () => 170e3,
    [types_1.ERC20BridgeSource.Component]: () => 188e3,
    [types_1.ERC20BridgeSource.MultiHop]: (fillData) => {
        const firstHop = fillData.firstHopSource;
        const secondHop = fillData.secondHopSource;
        const firstHopGas = exports.DEFAULT_GAS_SCHEDULE[firstHop.source](firstHop.fillData);
        const secondHopGas = exports.DEFAULT_GAS_SCHEDULE[secondHop.source](secondHop.fillData);
        return new utils_1.BigNumber(firstHopGas)
            .plus(secondHopGas)
            .plus(30e3)
            .toNumber();
    },
    [types_1.ERC20BridgeSource.Dodo]: (fillData) => {
        const isSellBase = fillData.isSellBase;
        // Sell base is cheaper as it is natively supported
        // sell quote requires additional calculation and overhead
        return isSellBase ? 180e3 : 300e3;
    },
    [types_1.ERC20BridgeSource.DodoV2]: (_fillData) => 100e3,
    [types_1.ERC20BridgeSource.Bancor]: (fillData) => {
        let gas = 200e3;
        const path = fillData.path;
        if (path.length > 2) {
            gas += (path.length - 2) * 60e3; // +60k for each hop.
        }
        return gas;
    },
    [types_1.ERC20BridgeSource.KyberDmm]: (fillData) => {
        // TODO: Different base cost if to/from ETH.
        let gas = 95e3;
        const path = fillData.tokenAddressPath;
        if (path.length > 2) {
            gas += (path.length - 2) * 65e3; // +65k for each hop.
        }
        return gas;
    },
    [types_1.ERC20BridgeSource.UniswapV3]: (fillData) => {
        let gas = 100e3;
        const path = fillData.tokenAddressPath;
        if (path.length > 2) {
            gas += (path.length - 2) * 32e3; // +32k for each hop.
        }
        return gas;
    },
    [types_1.ERC20BridgeSource.Lido]: () => 226e3,
    //
    // BSC
    //
    [types_1.ERC20BridgeSource.PancakeSwap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.PancakeSwapV2]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.BakerySwap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.ApeSwap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.CafeSwap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.CheeseSwap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.JulSwap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.WaultSwap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.ACryptos]: fillData => fillData.pool.gasSchedule,
    //
    // Polygon
    //
    [types_1.ERC20BridgeSource.QuickSwap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.ComethSwap]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.Dfyn]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.Polydex]: uniswapV2CloneGasSchedule,
    [types_1.ERC20BridgeSource.JetSwap]: uniswapV2CloneGasSchedule,
    //
    // FCX
    //
    [types_1.ERC20BridgeSource.ABalancer]: () => 180e3,
    [types_1.ERC20BridgeSource.RBalancer]: () => 180e3,
    [types_1.ERC20BridgeSource.UBalancer]: () => 180e3,
    [types_1.ERC20BridgeSource.XLM]: () => 0,
    [types_1.ERC20BridgeSource.FCX]: () => 0,
};
exports.DEFAULT_FEE_SCHEDULE = Object.assign({}, exports.DEFAULT_GAS_SCHEDULE);
exports.POSITIVE_SLIPPAGE_FEE_TRANSFORMER_GAS = new utils_1.BigNumber(20000);
// tslint:enable:custom-no-magic-numbers
exports.DEFAULT_GET_MARKET_ORDERS_OPTS = {
    // tslint:disable-next-line: custom-no-magic-numbers
    runLimit: Math.pow(2, 15),
    excludedSources: [],
    excludedFeeSources: [],
    includedSources: [],
    bridgeSlippage: 0.005,
    maxFallbackSlippage: 0.05,
    numSamples: 13,
    sampleDistributionBase: 1.05,
    feeSchedule: exports.DEFAULT_FEE_SCHEDULE,
    gasSchedule: exports.DEFAULT_GAS_SCHEDULE,
    exchangeProxyOverhead: () => exports.ZERO_AMOUNT,
    allowFallback: true,
    shouldGenerateQuoteReport: true,
    shouldIncludePriceComparisonsReport: false,
    tokenAdjacencyGraph: { default: [] },
};
//# sourceMappingURL=constants.js.map