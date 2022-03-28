import { AxiosInstance } from 'axios';
import { MockedRfqQuoteResponse } from '../types';
export declare enum RfqtQuoteEndpoint {
    Indicative = "price",
    Firm = "quote"
}
/**
 * A helper utility for testing which mocks out
 * requests to RFQ-t providers
 */
export declare const rfqtMocker: {
    /**
     * A helper utility for testing which mocks out
     * requests to RFQ-t providers
     */
    withMockedRfqtQuotes: (mockedResponses: MockedRfqQuoteResponse[], quoteType: RfqtQuoteEndpoint, afterResponseCallback: () => Promise<void>, axiosClient?: AxiosInstance) => Promise<void>;
};
//# sourceMappingURL=rfqt_mocker.d.ts.map