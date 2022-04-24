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
exports.testHelpers = exports.RfqQuoteEndpoint = void 0;
const axios_1 = require("axios");
const axios_mock_adapter_1 = require("axios-mock-adapter");
const _ = require("lodash");
const errors_1 = require("../../src/errors");
var RfqQuoteEndpoint;
(function (RfqQuoteEndpoint) {
    RfqQuoteEndpoint["Indicative"] = "price";
    RfqQuoteEndpoint["Firm"] = "quote";
})(RfqQuoteEndpoint = exports.RfqQuoteEndpoint || (exports.RfqQuoteEndpoint = {}));
exports.testHelpers = {
    expectInsufficientLiquidityErrorAsync: (expect, functionWhichTriggersErrorAsync, expectedAmountAvailableToFill) => __awaiter(void 0, void 0, void 0, function* () {
        let wasErrorThrown = false;
        try {
            yield functionWhichTriggersErrorAsync();
        }
        catch (e) {
            wasErrorThrown = true;
            expect(e).to.be.instanceOf(errors_1.InsufficientAssetLiquidityError);
            if (expectedAmountAvailableToFill) {
                expect(e.amountAvailableToFill).to.be.bignumber.equal(expectedAmountAvailableToFill);
            }
            else {
                expect(e.amountAvailableToFill).to.be.undefined();
            }
        }
        expect(wasErrorThrown).to.be.true();
    }),
    /**
     * A helper utility for testing which mocks out
     * requests to RFQ-T/M providers
     */
    withMockedRfqQuotes: (standardMockedResponses, altMockedResponses, quoteType, afterResponseCallback, axiosClient = axios_1.default) => __awaiter(void 0, void 0, void 0, function* () {
        const mockedAxios = new axios_mock_adapter_1.default(axiosClient, { onNoMatch: 'throwException' });
        try {
            // Mock out Standard RFQ-T/M responses
            for (const mockedResponse of standardMockedResponses) {
                const { endpoint, requestApiKey, requestParams, responseData, responseCode } = mockedResponse;
                const requestHeaders = { Accept: 'application/json, text/plain, */*', '0x-api-key': requestApiKey };
                if (mockedResponse.callback !== undefined) {
                    mockedAxios
                        .onGet(`${endpoint}/${quoteType}`, { params: requestParams }, requestHeaders)
                        .reply(mockedResponse.callback);
                }
                else {
                    mockedAxios
                        .onGet(`${endpoint}/${quoteType}`, { params: requestParams }, requestHeaders)
                        .replyOnce(responseCode, responseData);
                }
            }
            // Mock out Alt RFQ-T/M responses
            for (const mockedResponse of altMockedResponses) {
                const { endpoint, mmApiKey, requestData, responseData, responseCode } = mockedResponse;
                const requestHeaders = {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${mmApiKey}`,
                };
                mockedAxios
                    .onPost(`${endpoint}/quotes`, 
                // hack to get AxiosMockAdapter to recognize the match
                // b/t the mock data and the request data
                {
                    asymmetricMatch: (x) => {
                        return _.isEqual(requestData, x);
                    },
                }, requestHeaders)
                    .replyOnce(responseCode, responseData);
            }
            // Perform the callback function, e.g. a test validation
            yield afterResponseCallback();
        }
        finally {
            // Ensure we always restore axios afterwards
            mockedAxios.restore();
        }
    }),
};
//# sourceMappingURL=test_helpers.js.map