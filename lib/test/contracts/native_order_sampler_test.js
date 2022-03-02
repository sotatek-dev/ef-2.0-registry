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
const contracts_erc20_1 = require("@0x/contracts-erc20");
const contracts_test_utils_1 = require("@0x/contracts-test-utils");
const dev_utils_1 = require("@0x/dev-utils");
const protocol_utils_1 = require("@0x/protocol-utils");
const utils_1 = require("@0x/utils");
const constants_1 = require("../../src/utils/market_operation_utils/constants");
const artifacts_1 = require("../artifacts");
const wrappers_1 = require("../wrappers");
const { NULL_BYTES, ZERO_AMOUNT } = contracts_test_utils_1.constants;
// tslint:disable: custom-no-magic-numbers
contracts_test_utils_1.blockchainTests.resets('NativeOrderSampler contract', env => {
    let testContract;
    let makerToken;
    let takerToken;
    let makerAddress;
    const VALID_SIGNATURE = { v: 1, r: '0x01', s: '0x01', signatureType: protocol_utils_1.SignatureType.EthSign };
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        testContract = yield wrappers_1.TestNativeOrderSamplerContract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestNativeOrderSampler, env.provider, env.txDefaults, {});
        const NUM_TOKENS = new utils_1.BigNumber(3);
        [makerToken, takerToken] = yield testContract.createTokens(NUM_TOKENS).callAsync();
        [makerAddress] = yield new dev_utils_1.Web3Wrapper(env.provider).getAvailableAddressesAsync();
        yield testContract.createTokens(NUM_TOKENS).awaitTransactionSuccessAsync();
    }));
    function getPackedHash(...args) {
        return utils_1.hexUtils.hash(utils_1.hexUtils.concat(...args.map(a => utils_1.hexUtils.toHex(a))));
    }
    function getOrderInfo(order) {
        const hash = getPackedHash(utils_1.hexUtils.leftPad(order.salt));
        const orderStatus = order.salt.mod(255).eq(0) ? 3 : 5;
        const filledAmount = order.expiry;
        return {
            orderStatus,
            orderHash: hash,
            orderTakerAssetFilledAmount: filledAmount,
        };
    }
    function createFillableOrderSalt() {
        return new utils_1.BigNumber(utils_1.hexUtils.concat(utils_1.hexUtils.slice(utils_1.hexUtils.random(), 0, -1), '0x01'));
    }
    function createUnfillableOrderSalt() {
        return new utils_1.BigNumber(utils_1.hexUtils.concat(utils_1.hexUtils.slice(utils_1.hexUtils.random(), 0, -1), '0xff'));
    }
    function getLimitOrderFillableTakerAmount(order) {
        return order.takerAmount.minus(getOrderInfo(order).orderTakerAssetFilledAmount);
    }
    function createOrder(fields = {}, filledTakerAssetAmount = ZERO_AMOUNT) {
        return Object.assign({ chainId: 1337, verifyingContract: contracts_test_utils_1.randomAddress(), maker: makerAddress, taker: constants_1.NULL_ADDRESS, pool: NULL_BYTES, sender: constants_1.NULL_ADDRESS, feeRecipient: contracts_test_utils_1.randomAddress(), makerAmount: contracts_test_utils_1.getRandomInteger(1, 1e18), takerAmount: contracts_test_utils_1.getRandomInteger(1, 1e18), takerTokenFeeAmount: contracts_test_utils_1.getRandomInteger(1, 1e18), makerToken,
            takerToken, salt: createFillableOrderSalt(), expiry: filledTakerAssetAmount }, fields);
    }
    function fundMakerAsync(order, balanceScaling = 1, allowanceScaling = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = makerToken;
            let amount = order.makerAmount;
            amount = amount.times(getLimitOrderFillableTakerAmount(order).div(utils_1.BigNumber.max(1, order.takerAmount)));
            yield testContract
                .setTokenBalanceAndAllowance(token, order.maker, testContract.address, amount.times(balanceScaling).integerValue(), amount.times(allowanceScaling).integerValue())
                .awaitTransactionSuccessAsync();
        });
    }
    describe('getTokenDecimals()', () => {
        it('correctly returns the token decimals', () => __awaiter(void 0, void 0, void 0, function* () {
            const newMakerToken = yield contracts_erc20_1.DummyERC20TokenContract.deployFrom0xArtifactAsync(contracts_erc20_1.artifacts.DummyERC20Token, env.provider, env.txDefaults, artifacts_1.artifacts, contracts_test_utils_1.constants.DUMMY_TOKEN_NAME, contracts_test_utils_1.constants.DUMMY_TOKEN_SYMBOL, new utils_1.BigNumber(18), contracts_test_utils_1.constants.DUMMY_TOKEN_TOTAL_SUPPLY);
            const newTakerToken = yield contracts_erc20_1.DummyERC20TokenContract.deployFrom0xArtifactAsync(contracts_erc20_1.artifacts.DummyERC20Token, env.provider, env.txDefaults, artifacts_1.artifacts, contracts_test_utils_1.constants.DUMMY_TOKEN_NAME, contracts_test_utils_1.constants.DUMMY_TOKEN_SYMBOL, new utils_1.BigNumber(6), contracts_test_utils_1.constants.DUMMY_TOKEN_TOTAL_SUPPLY);
            const [makerDecimals, takerDecimals] = yield testContract
                .getTokenDecimals([newMakerToken.address, newTakerToken.address])
                .callAsync();
            contracts_test_utils_1.expect(makerDecimals.toString()).to.eql('18');
            contracts_test_utils_1.expect(takerDecimals.toString()).to.eql('6');
        }));
    });
    describe('getLimitOrderFillableTakerAmount()', () => {
        it('returns the full amount for a fully funded order', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = createOrder();
            yield fundMakerAsync(order);
            const expected = getLimitOrderFillableTakerAmount(order);
            const actual = yield testContract
                .getLimitOrderFillableTakerAmount(order, VALID_SIGNATURE, testContract.address)
                .callAsync();
            contracts_test_utils_1.expect(actual).to.bignumber.eq(expected);
        }));
        it('returns partial amount with insufficient maker asset balance', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = createOrder();
            const expected = getLimitOrderFillableTakerAmount(order)
                .times(0.5)
                .integerValue(utils_1.BigNumber.ROUND_DOWN);
            yield fundMakerAsync(order, 0.5);
            const actual = yield testContract
                .getLimitOrderFillableTakerAmount(order, VALID_SIGNATURE, testContract.address)
                .callAsync();
            contracts_test_utils_1.assertIntegerRoughlyEquals(actual, expected, 100);
        }));
        it('returns partial amount with insufficient maker asset allowance', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = createOrder();
            const expected = getLimitOrderFillableTakerAmount(order)
                .times(0.5)
                .integerValue(utils_1.BigNumber.ROUND_DOWN);
            yield fundMakerAsync(order, 1, 0.5);
            const actual = yield testContract
                .getLimitOrderFillableTakerAmount(order, VALID_SIGNATURE, testContract.address)
                .callAsync();
            contracts_test_utils_1.assertIntegerRoughlyEquals(actual, expected, 100);
        }));
        it('returns zero for an that is not fillable', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = Object.assign(Object.assign({}, createOrder()), { salt: createUnfillableOrderSalt() });
            yield fundMakerAsync(order);
            const fillableTakerAmount = yield testContract
                .getLimitOrderFillableTakerAmount(order, VALID_SIGNATURE, testContract.address)
                .callAsync();
            contracts_test_utils_1.expect(fillableTakerAmount).to.bignumber.eq(ZERO_AMOUNT);
        }));
        it('returns zero for an order with zero maker asset amount', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = Object.assign(Object.assign({}, createOrder()), { makerAmount: ZERO_AMOUNT });
            yield fundMakerAsync(order);
            const fillableTakerAmount = yield testContract
                .getLimitOrderFillableTakerAmount(order, VALID_SIGNATURE, testContract.address)
                .callAsync();
            contracts_test_utils_1.expect(fillableTakerAmount).to.bignumber.eq(ZERO_AMOUNT);
        }));
        it('returns zero for an order with zero taker asset amount', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = Object.assign(Object.assign({}, createOrder()), { takerAmount: ZERO_AMOUNT });
            yield fundMakerAsync(order);
            const fillableTakerAmount = yield testContract
                .getLimitOrderFillableTakerAmount(order, VALID_SIGNATURE, testContract.address)
                .callAsync();
            contracts_test_utils_1.expect(fillableTakerAmount).to.bignumber.eq(ZERO_AMOUNT);
        }));
        it('returns zero for an order with an empty signature', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = createOrder();
            yield fundMakerAsync(order);
            const fillableTakerAmount = yield testContract
                .getLimitOrderFillableTakerAmount(order, Object.assign(Object.assign({}, VALID_SIGNATURE), { r: NULL_BYTES, s: NULL_BYTES }), testContract.address)
                .callAsync();
            contracts_test_utils_1.expect(fillableTakerAmount).to.bignumber.eq(ZERO_AMOUNT);
        }));
    });
});
//# sourceMappingURL=native_order_sampler_test.js.map