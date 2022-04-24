import { BigNumber } from '@0x/utils';
import { MarketOperation } from '../../src/types';
export declare const OnlyOrderBook_Case_1: {
    ef: {
        order: {
            makerToken: string;
            takerToken: string;
            makerAmount: BigNumber;
            takerAmount: BigNumber;
            maker: string;
            taker: string;
            chainId: number;
            verifyingContract: string;
            takerTokenFeeAmount: BigNumber;
            sender: string;
            feeRecipient: string;
            pool: string;
            salt: BigNumber;
            expiry: BigNumber;
        };
        signature: {
            signatureType: number;
            v: number;
            r: string;
            s: string;
        };
        fillableMakerAmount: BigNumber;
        fillableTakerAmount: BigNumber;
        fillableTakerFeeAmount: number;
        type: number;
    }[];
    autoRoute: ({
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: {
            router: string;
        }[];
    } | {
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: ObjectConstructor[];
    })[][];
    targetAmount: BigNumber;
    side: MarketOperation;
    expertOutput: BigNumber;
};
export declare const OnlyOrderBook_Case_2: {
    ef: {
        order: {
            makerToken: string;
            takerToken: string;
            makerAmount: BigNumber;
            takerAmount: BigNumber;
            maker: string;
            taker: string;
            chainId: number;
            verifyingContract: string;
            takerTokenFeeAmount: BigNumber;
            sender: string;
            feeRecipient: string;
            pool: string;
            salt: BigNumber;
            expiry: BigNumber;
        };
        signature: {
            signatureType: number;
            v: number;
            r: string;
            s: string;
        };
        fillableMakerAmount: BigNumber;
        fillableTakerAmount: BigNumber;
        fillableTakerFeeAmount: number;
        type: number;
    }[];
    autoRoute: ({
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: {
            router: string;
        }[];
    } | {
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: ObjectConstructor[];
    })[][];
    targetAmount: BigNumber;
    side: MarketOperation;
    expertOutput: BigNumber;
};
export declare const OnlyAutoRoute_Case_1: {
    ef: {
        order: {
            makerToken: string;
            takerToken: string;
            makerAmount: BigNumber;
            takerAmount: BigNumber;
            maker: string;
            taker: string;
            chainId: number;
            verifyingContract: string;
            takerTokenFeeAmount: BigNumber;
            sender: string;
            feeRecipient: string;
            pool: string;
            salt: BigNumber;
            expiry: BigNumber;
        };
        signature: {
            signatureType: number;
            v: number;
            r: string;
            s: string;
        };
        fillableMakerAmount: BigNumber;
        fillableTakerAmount: BigNumber;
        fillableTakerFeeAmount: number;
        type: number;
    }[];
    autoRoute: ({
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: {
            router: string;
        }[];
    } | {
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: ObjectConstructor[];
    })[][];
    targetAmount: BigNumber;
    side: MarketOperation;
    expertOutput: BigNumber;
};
export declare const OnlyAutoRoute_Case_2: {
    ef: never[];
    autoRoute: ({
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: {
            router: string;
        }[];
    } | {
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: ObjectConstructor[];
    })[][];
    targetAmount: BigNumber;
    side: MarketOperation;
    expertOutput: BigNumber;
};
export declare const Both_Case_1: {
    ef: {
        order: {
            makerToken: string;
            takerToken: string;
            makerAmount: BigNumber;
            takerAmount: BigNumber;
            maker: string;
            taker: string;
            chainId: number;
            verifyingContract: string;
            takerTokenFeeAmount: BigNumber;
            sender: string;
            feeRecipient: string;
            pool: string;
            salt: BigNumber;
            expiry: BigNumber;
        };
        signature: {
            signatureType: number;
            v: number;
            r: string;
            s: string;
        };
        fillableMakerAmount: BigNumber;
        fillableTakerAmount: BigNumber;
        fillableTakerFeeAmount: number;
        type: number;
    }[];
    autoRoute: ({
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: {
            router: string;
        }[];
    } | {
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: ObjectConstructor[];
    })[][];
    targetAmount: BigNumber;
    side: MarketOperation;
    expertOutput: BigNumber;
};
export declare const Both_Case_2: {
    ef: {
        order: {
            makerToken: string;
            takerToken: string;
            makerAmount: BigNumber;
            takerAmount: BigNumber;
            maker: string;
            taker: string;
            chainId: number;
            verifyingContract: string;
            takerTokenFeeAmount: BigNumber;
            sender: string;
            feeRecipient: string;
            pool: string;
            salt: BigNumber;
            expiry: BigNumber;
        };
        signature: {
            signatureType: number;
            v: number;
            r: string;
            s: string;
        };
        fillableMakerAmount: BigNumber;
        fillableTakerAmount: BigNumber;
        fillableTakerFeeAmount: number;
        type: number;
    }[];
    autoRoute: ({
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: {
            router: string;
        }[];
    } | {
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: ObjectConstructor[];
    })[][];
    targetAmount: BigNumber;
    side: MarketOperation;
    expertOutput: BigNumber;
};
export declare const No_Enough_LP_Case_1: {
    ef: never[];
    autoRoute: ({
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: {
            router: string;
        }[];
    } | {
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: ObjectConstructor[];
    })[][];
    targetAmount: BigNumber;
    side: MarketOperation;
    expertOutput: BigNumber;
};
export declare const No_Enough_LP_Case_2: {
    ef: {
        order: {
            makerToken: string;
            takerToken: string;
            makerAmount: BigNumber;
            takerAmount: BigNumber;
            maker: string;
            taker: string;
            chainId: number;
            verifyingContract: string;
            takerTokenFeeAmount: BigNumber;
            sender: string;
            feeRecipient: string;
            pool: string;
            salt: BigNumber;
            expiry: BigNumber;
        };
        signature: {
            signatureType: number;
            v: number;
            r: string;
            s: string;
        };
        fillableMakerAmount: BigNumber;
        fillableTakerAmount: BigNumber;
        fillableTakerFeeAmount: number;
        type: number;
    }[];
    autoRoute: ({
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: {
            router: string;
        }[];
    } | {
        source: string;
        output: BigNumber;
        input: BigNumber;
        fillData: ObjectConstructor[];
    })[][];
    targetAmount: BigNumber;
    side: MarketOperation;
    expertOutput: BigNumber;
};
//# sourceMappingURL=sampler_data.d.ts.map