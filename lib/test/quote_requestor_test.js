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
const dev_utils_1 = require("@0x/dev-utils");
const protocol_utils_1 = require("@0x/protocol-utils");
const types_1 = require("@0x/types");
const utils_1 = require("@0x/utils");
const axios_1 = require("axios");
const chai = require("chai");
const http_1 = require("http");
const https_1 = require("https");
const _ = require("lodash");
require("mocha");
const constants_1 = require("../src/constants");
const types_2 = require("../src/types");
const constants_2 = require("../src/utils/market_operation_utils/constants");
const quote_requestor_1 = require("../src/utils/quote_requestor");
const chai_setup_1 = require("./utils/chai_setup");
const test_helpers_1 = require("./utils/test_helpers");
const quoteRequestorHttpClient = axios_1.default.create({
    httpAgent: new http_1.Agent({ keepAlive: true, timeout: constants_1.KEEP_ALIVE_TTL }),
    httpsAgent: new https_1.Agent({ keepAlive: true, timeout: constants_1.KEEP_ALIVE_TTL }),
});
chai_setup_1.chaiSetup.configure();
const expect = chai.expect;
const ALT_MM_API_KEY = 'averysecurekey';
const ALT_PROFILE = 'acoolprofile';
const ALT_RFQ_CREDS = {
    altRfqApiKey: ALT_MM_API_KEY,
    altRfqProfile: ALT_PROFILE,
};
const CREATED_STATUS_CODE = 201;
function makeThreeMinuteExpiry() {
    const expiry = new Date(Date.now());
    expiry.setMinutes(expiry.getMinutes() + 3);
    return new utils_1.BigNumber(Math.round(expiry.valueOf() / constants_1.constants.ONE_SECOND_MS));
}
describe('QuoteRequestor', () => __awaiter(void 0, void 0, void 0, function* () {
    const [makerToken, takerToken, otherToken1] = dev_utils_1.tokenUtils.getDummyERC20TokenAddresses();
    const validSignature = { v: 28, r: '0x', s: '0x', signatureType: protocol_utils_1.SignatureType.EthSign };
    const altRfqAssetOfferings = {
        'https://132.0.0.1': [
            {
                id: 'XYZ-123',
                baseAsset: makerToken,
                quoteAsset: takerToken,
                baseAssetDecimals: 2,
                quoteAssetDecimals: 3,
            },
        ],
    };
    describe('requestRfqmFirmQuotesAsync for firm quotes', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return successful RFQM requests', () => __awaiter(void 0, void 0, void 0, function* () {
            const takerAddress = '0xd209925defc99488e3afff1174e48b4fa628302a';
            const txOrigin = takerAddress;
            const apiKey = 'my-ko0l-api-key';
            // Set up RFQM responses
            // tslint:disable-next-line:array-type
            const mockedRequests = [];
            const altMockedRequests = [];
            const expectedParams = {
                sellTokenAddress: takerToken,
                buyTokenAddress: makerToken,
                sellAmountBaseUnits: '10000',
                comparisonPrice: undefined,
                takerAddress,
                txOrigin,
                isLastLook: 'true',
                protocolVersion: '4',
                feeAmount: '1000000000',
                feeToken: protocol_utils_1.ETH_TOKEN_ADDRESS,
                feeType: 'fixed',
            };
            const mockedDefaults = {
                requestApiKey: apiKey,
                requestParams: expectedParams,
                responseCode: types_1.StatusCodes.Success,
            };
            const validSignedOrder = {
                makerToken,
                takerToken,
                makerAmount: new utils_1.BigNumber('1000'),
                takerAmount: new utils_1.BigNumber('1000'),
                maker: takerAddress,
                taker: takerAddress,
                pool: '0x',
                salt: '0',
                chainId: 1,
                verifyingContract: takerAddress,
                txOrigin,
                expiry: makeThreeMinuteExpiry(),
                signature: validSignature,
            };
            // request is to sell 10000 units of the base token
            // 10 units at 3 decimals
            const altFirmRequestData = {
                market: 'XYZ-123',
                model: types_2.AltQuoteModel.Firm,
                profile: ALT_PROFILE,
                side: types_2.AltQuoteSide.Sell,
                meta: {
                    txOrigin,
                    taker: takerAddress,
                    client: apiKey,
                },
                value: '10',
            };
            const altFirmResponse = Object.assign(Object.assign({}, altFirmRequestData), { id: 'random_id', 
                // tslint:disable-next-line:custom-no-magic-numbers
                price: new utils_1.BigNumber(10 / 100).toString(), status: 'active', data: {
                    '0xv4order': validSignedOrder,
                } });
            // [GOOD] Successful response
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://1337.0.0.1', responseData: {
                    signedOrder: validSignedOrder,
                } }));
            // [GOOD] Another Successful response
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://37.0.0.1', responseData: { signedOrder: validSignedOrder } }));
            // [BAD] Test out a bad response code, ensure it doesnt cause throw
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://420.0.0.1', responseData: { error: 'bad request' }, responseCode: types_1.StatusCodes.InternalError }));
            // [BAD] Test out a successful response code but a partial order
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://421.0.0.1', responseData: { signedOrder: { makerToken: '123' } } }));
            // [BAD] A successful response code and invalid response data (encoding)
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://421.1.0.1', responseData: 'this is not JSON!' }));
            // [BAD] A successful response code and valid order, but for wrong maker asset data
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://422.0.0.1', responseData: { signedOrder: Object.assign(Object.assign({}, validSignedOrder), { makerToken: '0x1234' }) } }));
            // [BAD] A successful response code and valid order, but for wrong taker asset data
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://423.0.0.1', responseData: { signedOrder: Object.assign(Object.assign({}, validSignedOrder), { takerToken: '0x1234' }) } }));
            // [BAD] A successful response code and good order but its unsigned
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://424.0.0.1', responseData: { signedOrder: _.omit(validSignedOrder, ['signature']) } }));
            // [BAD] A successful response code and good order but for the wrong txOrigin
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://425.0.0.1', responseData: { signedOrder: Object.assign(Object.assign({}, validSignedOrder), { txOrigin: constants_2.NULL_ADDRESS }) } }));
            // [GOOD] A successful response code and order from an alt RFQ implementation
            altMockedRequests.push({
                endpoint: 'https://132.0.0.1',
                mmApiKey: ALT_MM_API_KEY,
                responseCode: CREATED_STATUS_CODE,
                requestData: altFirmRequestData,
                responseData: altFirmResponse,
            });
            const normalizedSuccessfulOrder = {
                order: Object.assign(Object.assign({}, _.omit(validSignedOrder, ['signature'])), { makerAmount: new utils_1.BigNumber(validSignedOrder.makerAmount), takerAmount: new utils_1.BigNumber(validSignedOrder.takerAmount), expiry: new utils_1.BigNumber(validSignedOrder.expiry), salt: new utils_1.BigNumber(validSignedOrder.salt) }),
                signature: validSignedOrder.signature,
                type: protocol_utils_1.FillQuoteTransformerOrderType.Rfq,
            };
            return test_helpers_1.testHelpers.withMockedRfqQuotes(mockedRequests, altMockedRequests, test_helpers_1.RfqQuoteEndpoint.Firm, () => __awaiter(void 0, void 0, void 0, function* () {
                const qr = new quote_requestor_1.QuoteRequestor({}, // No RFQ-T asset offerings
                {
                    'https://1337.0.0.1': [[makerToken, takerToken]],
                    'https://420.0.0.1': [[makerToken, takerToken]],
                    'https://421.0.0.1': [[makerToken, takerToken]],
                    'https://421.1.0.1': [[makerToken, takerToken]],
                    'https://422.0.0.1': [[makerToken, takerToken]],
                    'https://423.0.0.1': [[makerToken, takerToken]],
                    'https://424.0.0.1': [[makerToken, takerToken]],
                    'https://425.0.0.1': [[makerToken, takerToken]],
                    'https://426.0.0.1': [] /* Shouldn't ping an RFQ provider when they don't support the requested asset pair. */,
                    'https://37.0.0.1': [[makerToken, takerToken]],
                }, quoteRequestorHttpClient, ALT_RFQ_CREDS);
                const resp = yield qr.requestRfqmFirmQuotesAsync(makerToken, takerToken, new utils_1.BigNumber(10000), types_2.MarketOperation.Sell, undefined, {
                    apiKey,
                    takerAddress,
                    txOrigin: takerAddress,
                    intentOnFilling: true,
                    altRfqAssetOfferings,
                    isLastLook: true,
                    fee: {
                        amount: new utils_1.BigNumber('1000000000'),
                        token: protocol_utils_1.ETH_TOKEN_ADDRESS,
                        type: 'fixed',
                    },
                });
                expect(resp).to.deep.eq([
                    normalizedSuccessfulOrder,
                    normalizedSuccessfulOrder,
                    normalizedSuccessfulOrder,
                ]);
            }), quoteRequestorHttpClient);
        }));
    }));
    describe('requestRfqtFirmQuotesAsync for firm quotes', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return successful RFQT requests', () => __awaiter(void 0, void 0, void 0, function* () {
            const takerAddress = '0xd209925defc99488e3afff1174e48b4fa628302a';
            const txOrigin = takerAddress;
            const apiKey = 'my-ko0l-api-key';
            // Set up RFQT responses
            // tslint:disable-next-line:array-type
            const mockedRequests = [];
            const altMockedRequests = [];
            const expectedParams = {
                sellTokenAddress: takerToken,
                buyTokenAddress: makerToken,
                sellAmountBaseUnits: '10000',
                comparisonPrice: undefined,
                takerAddress,
                txOrigin,
                protocolVersion: '4',
            };
            const mockedDefaults = {
                requestApiKey: apiKey,
                requestParams: expectedParams,
                responseCode: types_1.StatusCodes.Success,
            };
            const validSignedOrder = {
                makerToken,
                takerToken,
                makerAmount: new utils_1.BigNumber('1000'),
                takerAmount: new utils_1.BigNumber('1000'),
                maker: takerAddress,
                taker: takerAddress,
                pool: '0x',
                salt: '0',
                chainId: 1,
                verifyingContract: takerAddress,
                txOrigin,
                expiry: makeThreeMinuteExpiry(),
                signature: validSignature,
            };
            // request is to sell 10000 units of the base token
            // 10 units at 3 decimals
            const altFirmRequestData = {
                market: 'XYZ-123',
                model: types_2.AltQuoteModel.Firm,
                profile: ALT_PROFILE,
                side: types_2.AltQuoteSide.Sell,
                meta: {
                    txOrigin,
                    taker: takerAddress,
                    client: apiKey,
                },
                value: '10',
            };
            const altFirmResponse = Object.assign(Object.assign({}, altFirmRequestData), { id: 'random_id', 
                // tslint:disable-next-line:custom-no-magic-numbers
                price: new utils_1.BigNumber(10 / 100).toString(), status: 'active', data: {
                    '0xv4order': validSignedOrder,
                } });
            // Successful response
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://1337.0.0.1', responseData: {
                    signedOrder: validSignedOrder,
                } }));
            // Another Successful response
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://37.0.0.1', responseData: { signedOrder: validSignedOrder } }));
            // Test out a bad response code, ensure it doesnt cause throw
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://420.0.0.1', responseData: { error: 'bad request' }, responseCode: types_1.StatusCodes.InternalError }));
            // Test out a successful response code but a partial order
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://421.0.0.1', responseData: { signedOrder: { makerToken: '123' } } }));
            // A successful response code and invalid response data (encoding)
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://421.1.0.1', responseData: 'this is not JSON!' }));
            // A successful response code and valid order, but for wrong maker asset data
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://422.0.0.1', responseData: { signedOrder: Object.assign(Object.assign({}, validSignedOrder), { makerToken: '0x1234' }) } }));
            // A successful response code and valid order, but for wrong taker asset data
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://423.0.0.1', responseData: { signedOrder: Object.assign(Object.assign({}, validSignedOrder), { takerToken: '0x1234' }) } }));
            // A successful response code and good order but its unsigned
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://424.0.0.1', responseData: { signedOrder: _.omit(validSignedOrder, ['signature']) } }));
            // A successful response code and good order but for the wrong txOrigin
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://425.0.0.1', responseData: { signedOrder: Object.assign(Object.assign({}, validSignedOrder), { txOrigin: constants_2.NULL_ADDRESS }) } }));
            // A successful response code and order from an alt RFQ implementation
            altMockedRequests.push({
                endpoint: 'https://132.0.0.1',
                mmApiKey: ALT_MM_API_KEY,
                responseCode: CREATED_STATUS_CODE,
                requestData: altFirmRequestData,
                responseData: altFirmResponse,
            });
            const normalizedSuccessfulOrder = {
                order: Object.assign(Object.assign({}, _.omit(validSignedOrder, ['signature'])), { makerAmount: new utils_1.BigNumber(validSignedOrder.makerAmount), takerAmount: new utils_1.BigNumber(validSignedOrder.takerAmount), expiry: new utils_1.BigNumber(validSignedOrder.expiry), salt: new utils_1.BigNumber(validSignedOrder.salt) }),
                signature: validSignedOrder.signature,
                type: protocol_utils_1.FillQuoteTransformerOrderType.Rfq,
            };
            return test_helpers_1.testHelpers.withMockedRfqQuotes(mockedRequests, altMockedRequests, test_helpers_1.RfqQuoteEndpoint.Firm, () => __awaiter(void 0, void 0, void 0, function* () {
                const qr = new quote_requestor_1.QuoteRequestor({
                    'https://1337.0.0.1': [[makerToken, takerToken]],
                    'https://420.0.0.1': [[makerToken, takerToken]],
                    'https://421.0.0.1': [[makerToken, takerToken]],
                    'https://421.1.0.1': [[makerToken, takerToken]],
                    'https://422.0.0.1': [[makerToken, takerToken]],
                    'https://423.0.0.1': [[makerToken, takerToken]],
                    'https://424.0.0.1': [[makerToken, takerToken]],
                    'https://425.0.0.1': [[makerToken, takerToken]],
                    'https://426.0.0.1': [] /* Shouldn't ping an RFQ-T provider when they don't support the requested asset pair. */,
                    'https://37.0.0.1': [[makerToken, takerToken]],
                }, {}, quoteRequestorHttpClient, ALT_RFQ_CREDS);
                const resp = yield qr.requestRfqtFirmQuotesAsync(makerToken, takerToken, new utils_1.BigNumber(10000), types_2.MarketOperation.Sell, undefined, {
                    apiKey,
                    takerAddress,
                    txOrigin: takerAddress,
                    intentOnFilling: true,
                    altRfqAssetOfferings,
                });
                expect(resp).to.deep.eq([
                    normalizedSuccessfulOrder,
                    normalizedSuccessfulOrder,
                    normalizedSuccessfulOrder,
                ]);
            }), quoteRequestorHttpClient);
        }));
    }));
    describe('requestRfqmIndicativeQuotesAsync for Indicative quotes', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return successful RFQM requests', () => __awaiter(void 0, void 0, void 0, function* () {
            const takerAddress = '0xd209925defc99488e3afff1174e48b4fa628302a';
            const apiKey = 'my-ko0l-api-key';
            // Set up RFQ responses
            // tslint:disable-next-line:array-type
            const mockedRequests = [];
            const expectedParams = {
                sellTokenAddress: takerToken,
                buyTokenAddress: makerToken,
                sellAmountBaseUnits: '10000',
                comparisonPrice: undefined,
                takerAddress,
                txOrigin: takerAddress,
                isLastLook: 'true',
                protocolVersion: '4',
                feeAmount: '1000000000',
                feeToken: protocol_utils_1.ETH_TOKEN_ADDRESS,
                feeType: 'fixed',
            };
            const mockedDefaults = {
                requestApiKey: apiKey,
                requestParams: expectedParams,
                responseCode: types_1.StatusCodes.Success,
            };
            // [GOOD] Successful response
            const successfulQuote1 = {
                makerToken,
                takerToken,
                makerAmount: new utils_1.BigNumber(expectedParams.sellAmountBaseUnits),
                takerAmount: new utils_1.BigNumber(expectedParams.sellAmountBaseUnits),
                expiry: makeThreeMinuteExpiry(),
            };
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://1337.0.0.1', responseData: successfulQuote1 }));
            // [GOOD] Another Successful response
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://37.0.0.1', responseData: successfulQuote1 }));
            // [BAD] Test out a bad response code, ensure it doesnt cause throw
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://420.0.0.1', responseData: { error: 'bad request' }, responseCode: types_1.StatusCodes.InternalError }));
            // [BAD] Test out a successful response code but an invalid order
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://421.0.0.1', responseData: { makerToken: '123' } }));
            // [BAD] A successful response code and valid response data, but for wrong maker asset data
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://422.0.0.1', responseData: Object.assign(Object.assign({}, successfulQuote1), { makerToken: otherToken1 }) }));
            // [BAD] A successful response code and valid response data, but for wrong taker asset data
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://423.0.0.1', responseData: Object.assign(Object.assign({}, successfulQuote1), { takerToken: otherToken1 }) }));
            return test_helpers_1.testHelpers.withMockedRfqQuotes(mockedRequests, [], test_helpers_1.RfqQuoteEndpoint.Indicative, () => __awaiter(void 0, void 0, void 0, function* () {
                const qr = new quote_requestor_1.QuoteRequestor({}, // No RFQ-T asset offerings
                {
                    'https://1337.0.0.1': [[makerToken, takerToken]],
                    'https://37.0.0.1': [[makerToken, takerToken]],
                    'https://420.0.0.1': [[makerToken, takerToken]],
                    'https://421.0.0.1': [[makerToken, takerToken]],
                    'https://422.0.0.1': [[makerToken, takerToken]],
                    'https://423.0.0.1': [[makerToken, takerToken]],
                    'https://424.0.0.1': [[makerToken, takerToken]],
                }, quoteRequestorHttpClient);
                const resp = yield qr.requestRfqmIndicativeQuotesAsync(makerToken, takerToken, new utils_1.BigNumber(10000), types_2.MarketOperation.Sell, undefined, {
                    apiKey,
                    takerAddress,
                    txOrigin: takerAddress,
                    intentOnFilling: true,
                    isLastLook: true,
                    fee: {
                        type: 'fixed',
                        token: protocol_utils_1.ETH_TOKEN_ADDRESS,
                        amount: new utils_1.BigNumber('1000000000'),
                    },
                });
                expect(resp.sort()).to.eql([successfulQuote1, successfulQuote1].sort());
            }), quoteRequestorHttpClient);
        }));
    }));
    describe('requestRfqtIndicativeQuotesAsync for Indicative quotes', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should optionally accept a "comparisonPrice" parameter', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = quote_requestor_1.QuoteRequestor.makeQueryParameters(otherToken1, // tx origin
            otherToken1, // taker
            types_2.MarketOperation.Sell, makerToken, takerToken, new utils_1.BigNumber(1000), new utils_1.BigNumber(300.2));
            expect(response.comparisonPrice).to.eql('300.2');
        }));
        it('should return successful RFQT requests', () => __awaiter(void 0, void 0, void 0, function* () {
            const takerAddress = '0xd209925defc99488e3afff1174e48b4fa628302a';
            const apiKey = 'my-ko0l-api-key';
            // Set up RFQT responses
            // tslint:disable-next-line:array-type
            const mockedRequests = [];
            const expectedParams = {
                sellTokenAddress: takerToken,
                buyTokenAddress: makerToken,
                sellAmountBaseUnits: '10000',
                comparisonPrice: undefined,
                takerAddress,
                txOrigin: takerAddress,
                protocolVersion: '4',
            };
            const mockedDefaults = {
                requestApiKey: apiKey,
                requestParams: expectedParams,
                responseCode: types_1.StatusCodes.Success,
            };
            // Successful response
            const successfulQuote1 = {
                makerToken,
                takerToken,
                makerAmount: new utils_1.BigNumber(expectedParams.sellAmountBaseUnits),
                takerAmount: new utils_1.BigNumber(expectedParams.sellAmountBaseUnits),
                expiry: makeThreeMinuteExpiry(),
            };
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://1337.0.0.1', responseData: successfulQuote1 }));
            // Test out a bad response code, ensure it doesnt cause throw
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://420.0.0.1', responseData: { error: 'bad request' }, responseCode: types_1.StatusCodes.InternalError }));
            // Test out a successful response code but an invalid order
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://421.0.0.1', responseData: { makerToken: '123' } }));
            // A successful response code and valid response data, but for wrong maker asset data
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://422.0.0.1', responseData: Object.assign(Object.assign({}, successfulQuote1), { makerToken: otherToken1 }) }));
            // A successful response code and valid response data, but for wrong taker asset data
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://423.0.0.1', responseData: Object.assign(Object.assign({}, successfulQuote1), { takerToken: otherToken1 }) }));
            // Another Successful response
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://37.0.0.1', responseData: successfulQuote1 }));
            return test_helpers_1.testHelpers.withMockedRfqQuotes(mockedRequests, [], test_helpers_1.RfqQuoteEndpoint.Indicative, () => __awaiter(void 0, void 0, void 0, function* () {
                const qr = new quote_requestor_1.QuoteRequestor({
                    'https://1337.0.0.1': [[makerToken, takerToken]],
                    'https://420.0.0.1': [[makerToken, takerToken]],
                    'https://421.0.0.1': [[makerToken, takerToken]],
                    'https://422.0.0.1': [[makerToken, takerToken]],
                    'https://423.0.0.1': [[makerToken, takerToken]],
                    'https://424.0.0.1': [[makerToken, takerToken]],
                    'https://37.0.0.1': [[makerToken, takerToken]],
                }, {}, quoteRequestorHttpClient);
                const resp = yield qr.requestRfqtIndicativeQuotesAsync(makerToken, takerToken, new utils_1.BigNumber(10000), types_2.MarketOperation.Sell, undefined, {
                    apiKey,
                    takerAddress,
                    txOrigin: takerAddress,
                    intentOnFilling: true,
                });
                expect(resp.sort()).to.eql([successfulQuote1, successfulQuote1].sort());
            }), quoteRequestorHttpClient);
        }));
        it('should only return RFQT requests that meet the timeout', () => __awaiter(void 0, void 0, void 0, function* () {
            const takerAddress = '0xd209925defc99488e3afff1174e48b4fa628302a';
            const apiKey = 'my-ko0l-api-key';
            const maxTimeoutMs = 10;
            // tslint:disable-next-line:custom-no-magic-numbers
            const exceedTimeoutMs = maxTimeoutMs + 50;
            // Set up RFQT responses
            // tslint:disable-next-line:array-type
            const mockedRequests = [];
            const expectedParams = {
                sellTokenAddress: takerToken,
                buyTokenAddress: makerToken,
                sellAmountBaseUnits: '10000',
                comparisonPrice: undefined,
                takerAddress,
                txOrigin: takerAddress,
                protocolVersion: '4',
            };
            const mockedDefaults = {
                requestApiKey: apiKey,
                requestParams: expectedParams,
                responseCode: types_1.StatusCodes.Success,
            };
            // Successful response
            const successfulQuote1 = {
                makerToken,
                takerToken,
                makerAmount: new utils_1.BigNumber(expectedParams.sellAmountBaseUnits),
                takerAmount: new utils_1.BigNumber(expectedParams.sellAmountBaseUnits),
                expiry: makeThreeMinuteExpiry(),
            };
            // One good request
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://1337.0.0.1', responseData: successfulQuote1 }));
            // One request that will timeout
            mockedRequests.push(Object.assign(Object.assign({}, mockedDefaults), { endpoint: 'https://420.0.0.1', responseData: successfulQuote1, callback: () => __awaiter(void 0, void 0, void 0, function* () {
                    // tslint:disable-next-line:no-inferred-empty-object-type
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve([types_1.StatusCodes.Success, successfulQuote1]);
                        }, exceedTimeoutMs);
                    });
                }) }));
            return test_helpers_1.testHelpers.withMockedRfqQuotes(mockedRequests, [], test_helpers_1.RfqQuoteEndpoint.Indicative, () => __awaiter(void 0, void 0, void 0, function* () {
                const qr = new quote_requestor_1.QuoteRequestor({
                    'https://1337.0.0.1': [[makerToken, takerToken]],
                    'https://420.0.0.1': [[makerToken, takerToken]],
                }, {}, quoteRequestorHttpClient);
                const resp = yield qr.requestRfqtIndicativeQuotesAsync(makerToken, takerToken, new utils_1.BigNumber(10000), types_2.MarketOperation.Sell, undefined, {
                    apiKey,
                    takerAddress,
                    txOrigin: takerAddress,
                    intentOnFilling: true,
                    makerEndpointMaxResponseTimeMs: maxTimeoutMs,
                });
                expect(resp.sort()).to.eql([successfulQuote1].sort()); // notice only one result, despite two requests made
            }), quoteRequestorHttpClient);
        }));
        it('should return successful RFQT indicative quote requests (Buy)', () => __awaiter(void 0, void 0, void 0, function* () {
            const takerAddress = '0xd209925defc99488e3afff1174e48b4fa628302a';
            const apiKey = 'my-ko0l-api-key';
            // Set up RFQT responses
            // tslint:disable-next-line:array-type
            const mockedRequests = [];
            const expectedParams = {
                sellTokenAddress: takerToken,
                buyTokenAddress: makerToken,
                buyAmountBaseUnits: '10000',
                comparisonPrice: undefined,
                takerAddress,
                txOrigin: takerAddress,
                protocolVersion: '4',
            };
            // Successful response
            const successfulQuote1 = {
                makerToken,
                takerToken,
                makerAmount: new utils_1.BigNumber(expectedParams.buyAmountBaseUnits),
                takerAmount: new utils_1.BigNumber(expectedParams.buyAmountBaseUnits),
                expiry: makeThreeMinuteExpiry(),
            };
            mockedRequests.push({
                endpoint: 'https://1337.0.0.1',
                requestApiKey: apiKey,
                requestParams: expectedParams,
                responseData: successfulQuote1,
                responseCode: types_1.StatusCodes.Success,
            });
            return test_helpers_1.testHelpers.withMockedRfqQuotes(mockedRequests, [], test_helpers_1.RfqQuoteEndpoint.Indicative, () => __awaiter(void 0, void 0, void 0, function* () {
                const qr = new quote_requestor_1.QuoteRequestor({ 'https://1337.0.0.1': [[makerToken, takerToken]] }, {}, quoteRequestorHttpClient);
                const resp = yield qr.requestRfqtIndicativeQuotesAsync(makerToken, takerToken, new utils_1.BigNumber(10000), types_2.MarketOperation.Buy, undefined, {
                    apiKey,
                    takerAddress,
                    txOrigin: takerAddress,
                    intentOnFilling: true,
                });
                expect(resp.sort()).to.eql([successfulQuote1].sort());
            }), quoteRequestorHttpClient);
        }));
        it('should return successful alt indicative quotes', () => __awaiter(void 0, void 0, void 0, function* () {
            const takerAddress = '0xd209925defc99488e3afff1174e48b4fa628302a';
            const txOrigin = '0xf209925defc99488e3afff1174e48b4fa628302a';
            const apiKey = 'my-ko0l-api-key';
            // base token has 2 decimals
            // quote token has 3 decimals
            const baseToken = makerToken;
            const quoteToken = takerToken;
            // Set up RFQT responses
            const altMockedRequests = [];
            const altScenarios = [];
            // SCENARIO 1
            // buy, base asset specified
            // requesting to buy 100 units (10000 base units) of the base token
            // returning a price of 0.01, which should mean 10000 maker, 1000 taker amount
            const buyAmountAltRequest = {
                market: 'XYZ-123',
                model: types_2.AltQuoteModel.Indicative,
                profile: ALT_PROFILE,
                side: types_2.AltQuoteSide.Sell,
                meta: {
                    txOrigin,
                    taker: takerAddress,
                    client: apiKey,
                },
                amount: '100',
            };
            // Successful response
            const buyAmountAltResponse = Object.assign(Object.assign({}, buyAmountAltRequest), { id: 'random_id', 
                // tslint:disable-next-line:custom-no-magic-numbers
                price: new utils_1.BigNumber(0.01).toString(), status: 'live' });
            const successfulBuyAmountQuote = {
                makerToken: baseToken,
                takerToken: quoteToken,
                makerAmount: new utils_1.BigNumber(10000),
                takerAmount: new utils_1.BigNumber(1000),
                expiry: new utils_1.BigNumber(0),
            };
            altMockedRequests.push({
                endpoint: 'https://132.0.0.1',
                mmApiKey: ALT_MM_API_KEY,
                responseCode: CREATED_STATUS_CODE,
                requestData: buyAmountAltRequest,
                responseData: buyAmountAltResponse,
            });
            altScenarios.push({
                successfulQuote: successfulBuyAmountQuote,
                requestedMakerToken: baseToken,
                requestedTakerToken: quoteToken,
                requestedAmount: new utils_1.BigNumber(10000),
                requestedOperation: types_2.MarketOperation.Buy,
            });
            // SCENARIO 2
            // alt buy, quote asset specified
            // user is requesting to sell 1 unit of the quote token, or 1000 base units
            // returning a price of 0.01, which should mean 10000 maker amount, 1000 taker amount
            const buyValueAltRequest = {
                market: 'XYZ-123',
                model: types_2.AltQuoteModel.Indicative,
                profile: ALT_PROFILE,
                side: types_2.AltQuoteSide.Sell,
                meta: {
                    txOrigin,
                    taker: takerAddress,
                    client: apiKey,
                },
                value: '1',
            };
            // Successful response
            const buyValueAltResponse = Object.assign(Object.assign({}, buyValueAltRequest), { id: 'random_id', 
                // tslint:disable-next-line:custom-no-magic-numbers
                price: new utils_1.BigNumber(0.01).toString(), status: 'live' });
            const successfulBuyValueQuote = {
                makerToken: baseToken,
                takerToken: quoteToken,
                makerAmount: new utils_1.BigNumber(10000),
                takerAmount: new utils_1.BigNumber(1000),
                expiry: new utils_1.BigNumber(0),
            };
            altMockedRequests.push({
                endpoint: 'https://132.0.0.1',
                mmApiKey: ALT_MM_API_KEY,
                responseCode: CREATED_STATUS_CODE,
                requestData: buyValueAltRequest,
                responseData: buyValueAltResponse,
            });
            altScenarios.push({
                successfulQuote: successfulBuyValueQuote,
                requestedMakerToken: baseToken,
                requestedTakerToken: quoteToken,
                requestedAmount: new utils_1.BigNumber(1000),
                requestedOperation: types_2.MarketOperation.Sell,
            });
            // SCENARIO 3
            // alt sell, base asset specified
            // user is requesting to sell 100 units (10000 base units) of the base token
            // returning a price of 0.01, which should mean 10000 taker amount, 1000 maker amount
            const sellAmountAltRequest = {
                market: 'XYZ-123',
                model: types_2.AltQuoteModel.Indicative,
                profile: ALT_PROFILE,
                side: types_2.AltQuoteSide.Buy,
                meta: {
                    txOrigin,
                    taker: takerAddress,
                    client: apiKey,
                },
                amount: '100',
            };
            // Successful response
            const sellAmountAltResponse = Object.assign(Object.assign({}, sellAmountAltRequest), { id: 'random_id', 
                // tslint:disable-next-line:custom-no-magic-numbers
                price: new utils_1.BigNumber(0.01).toString(), status: 'live' });
            const successfulSellAmountQuote = {
                makerToken: quoteToken,
                takerToken: baseToken,
                makerAmount: new utils_1.BigNumber(1000),
                takerAmount: new utils_1.BigNumber(10000),
                expiry: new utils_1.BigNumber(0),
            };
            altMockedRequests.push({
                endpoint: 'https://132.0.0.1',
                mmApiKey: ALT_MM_API_KEY,
                responseCode: CREATED_STATUS_CODE,
                requestData: sellAmountAltRequest,
                responseData: sellAmountAltResponse,
            });
            altScenarios.push({
                successfulQuote: successfulSellAmountQuote,
                requestedMakerToken: quoteToken,
                requestedTakerToken: baseToken,
                requestedAmount: new utils_1.BigNumber(10000),
                requestedOperation: types_2.MarketOperation.Sell,
            });
            // SCENARIO 4
            // alt sell, quote asset specified
            // user is requesting to buy 1 unit (1000 base units) of the quote token
            // returning a price of 0.01, which should mean 10000 taker amount, 1000 maker amount
            const sellValueAltRequest = {
                market: 'XYZ-123',
                model: types_2.AltQuoteModel.Indicative,
                profile: ALT_PROFILE,
                side: types_2.AltQuoteSide.Buy,
                meta: {
                    txOrigin,
                    taker: takerAddress,
                    client: apiKey,
                },
                value: '1',
            };
            // Successful response
            const sellValueAltResponse = Object.assign(Object.assign({}, sellValueAltRequest), { id: 'random_id', 
                // tslint:disable-next-line:custom-no-magic-numbers
                price: new utils_1.BigNumber(0.01).toString(), status: 'live' });
            const successfulSellValueQuote = {
                makerToken: quoteToken,
                takerToken: baseToken,
                makerAmount: new utils_1.BigNumber(1000),
                takerAmount: new utils_1.BigNumber(10000),
                expiry: new utils_1.BigNumber(0),
            };
            altMockedRequests.push({
                endpoint: 'https://132.0.0.1',
                mmApiKey: ALT_MM_API_KEY,
                responseCode: CREATED_STATUS_CODE,
                requestData: sellValueAltRequest,
                responseData: sellValueAltResponse,
            });
            altScenarios.push({
                successfulQuote: successfulSellValueQuote,
                requestedMakerToken: quoteToken,
                requestedTakerToken: baseToken,
                requestedAmount: new utils_1.BigNumber(1000),
                requestedOperation: types_2.MarketOperation.Buy,
            });
            let scenarioCounter = 1;
            for (const altScenario of altScenarios) {
                utils_1.logUtils.log(`Alt MM indicative scenario ${scenarioCounter}`);
                scenarioCounter += 1;
                yield test_helpers_1.testHelpers.withMockedRfqQuotes([], altMockedRequests, test_helpers_1.RfqQuoteEndpoint.Indicative, () => __awaiter(void 0, void 0, void 0, function* () {
                    const qr = new quote_requestor_1.QuoteRequestor({}, {}, quoteRequestorHttpClient, ALT_RFQ_CREDS);
                    const resp = yield qr.requestRfqtIndicativeQuotesAsync(altScenario.requestedMakerToken, altScenario.requestedTakerToken, altScenario.requestedAmount, altScenario.requestedOperation, undefined, {
                        apiKey,
                        takerAddress,
                        txOrigin,
                        intentOnFilling: true,
                        altRfqAssetOfferings,
                    });
                    // hack to get the expiry right, since it's dependent on the current timestamp
                    const expected = Object.assign(Object.assign({}, altScenario.successfulQuote), { expiry: resp[0].expiry });
                    expect(resp.sort()).to.eql([expected].sort());
                }), quoteRequestorHttpClient);
            }
        }));
    }));
}));
//# sourceMappingURL=quote_requestor_test.js.map