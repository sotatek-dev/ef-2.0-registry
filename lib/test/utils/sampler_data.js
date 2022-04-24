"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.No_Enough_LP_Case_2 = exports.No_Enough_LP_Case_1 = exports.Both_Case_2 = exports.Both_Case_1 = exports.OnlyAutoRoute_Case_2 = exports.OnlyAutoRoute_Case_1 = exports.OnlyOrderBook_Case_2 = exports.OnlyOrderBook_Case_1 = void 0;
const utils_1 = require("@0x/utils");
const src_1 = require("../../src");
const types_1 = require("../../src/types");
exports.OnlyOrderBook_Case_1 = {
    ef: [
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('3000000000000000000'),
                takerAmount: new utils_1.BigNumber('2000000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937774'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('3000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('2000000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        },
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('3000000000000000000'),
                takerAmount: new utils_1.BigNumber('5000000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937774'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('3000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('5000000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        }
    ],
    autoRoute: [
        [
            {
                source: src_1.ERC20BridgeSource.AutoRoute,
                output: new utils_1.BigNumber('111090954798277371'),
                input: new utils_1.BigNumber('112911530335455317'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('227709682705851137'),
                input: new utils_1.BigNumber('231468637187683398'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('350129838397047946'),
                input: new utils_1.BigNumber('355953599382522884'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('478638480683241104'),
                input: new utils_1.BigNumber('486662809687104345'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('613536714420231678'),
                input: new utils_1.BigNumber('623907480506914878'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('755140361650495088'),
                input: new utils_1.BigNumber('768014384867715938'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('903780663155112698'),
                input: new utils_1.BigNumber('919326634446557051'),
                fillData: [Object]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1059805011620516500'),
                input: new utils_1.BigNumber('1078204496504340219'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1223577717654235986'),
                input: new utils_1.BigNumber('1245026251665012546'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1395480809911327687'),
                input: new utils_1.BigNumber('1420189094583718490'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1575914870618727948'),
                input: new utils_1.BigNumber('1604110079648359730'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1765299907807993994'),
                input: new utils_1.BigNumber('1797227113966233033'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1964076265587335627'),
                input: new utils_1.BigNumber('2000000000000000000'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            }
        ]
    ],
    targetAmount: new utils_1.BigNumber("2000000000000000000"),
    side: types_1.MarketOperation.Sell,
    expertOutput: new utils_1.BigNumber('3000000000000000000')
};
exports.OnlyOrderBook_Case_2 = {
    ef: [
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('3000000000000000000'),
                takerAmount: new utils_1.BigNumber('500000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937774'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('3000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('500000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        },
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('3000000000000000000'),
                takerAmount: new utils_1.BigNumber('1500000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937774'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('3000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('1500000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        }
    ],
    autoRoute: [
        [
            {
                source: src_1.ERC20BridgeSource.AutoRoute,
                output: new utils_1.BigNumber('111090954798277371'),
                input: new utils_1.BigNumber('112911530335455317'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('227709682705851137'),
                input: new utils_1.BigNumber('231468637187683398'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('350129838397047946'),
                input: new utils_1.BigNumber('355953599382522884'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('478638480683241104'),
                input: new utils_1.BigNumber('486662809687104345'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('613536714420231678'),
                input: new utils_1.BigNumber('623907480506914878'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('755140361650495088'),
                input: new utils_1.BigNumber('768014384867715938'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('903780663155112698'),
                input: new utils_1.BigNumber('919326634446557051'),
                fillData: [Object]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1059805011620516500'),
                input: new utils_1.BigNumber('1078204496504340219'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1223577717654235986'),
                input: new utils_1.BigNumber('1245026251665012546'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1395480809911327687'),
                input: new utils_1.BigNumber('1420189094583718490'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1575914870618727948'),
                input: new utils_1.BigNumber('1604110079648359730'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1765299907807993994'),
                input: new utils_1.BigNumber('1797227113966233033'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1964076265587335627'),
                input: new utils_1.BigNumber('2000000000000000000'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            }
        ]
    ],
    targetAmount: new utils_1.BigNumber("2000000000000000000"),
    side: types_1.MarketOperation.Sell,
    expertOutput: new utils_1.BigNumber('6000000000000000000')
};
exports.OnlyAutoRoute_Case_1 = {
    ef: [
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('1000000000000000000'),
                takerAmount: new utils_1.BigNumber('2000000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937774'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('1000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('2000000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        },
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('3000000000000000000'),
                takerAmount: new utils_1.BigNumber('5000000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937774'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('3000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('5000000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        }
    ],
    autoRoute: [
        [
            {
                source: src_1.ERC20BridgeSource.AutoRoute,
                output: new utils_1.BigNumber('111090954798277371'),
                input: new utils_1.BigNumber('112911530335455317'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('227709682705851137'),
                input: new utils_1.BigNumber('231468637187683398'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('350129838397047946'),
                input: new utils_1.BigNumber('355953599382522884'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('478638480683241104'),
                input: new utils_1.BigNumber('486662809687104345'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('613536714420231678'),
                input: new utils_1.BigNumber('623907480506914878'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('755140361650495088'),
                input: new utils_1.BigNumber('768014384867715938'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('903780663155112698'),
                input: new utils_1.BigNumber('919326634446557051'),
                fillData: [Object]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1059805011620516500'),
                input: new utils_1.BigNumber('1078204496504340219'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1223577717654235986'),
                input: new utils_1.BigNumber('1245026251665012546'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1395480809911327687'),
                input: new utils_1.BigNumber('1420189094583718490'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1575914870618727948'),
                input: new utils_1.BigNumber('1604110079648359730'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1765299907807993994'),
                input: new utils_1.BigNumber('1797227113966233033'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1964076265587335627'),
                input: new utils_1.BigNumber('2000000000000000000'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            }
        ]
    ],
    targetAmount: new utils_1.BigNumber("2000000000000000000"),
    side: types_1.MarketOperation.Sell,
    expertOutput: new utils_1.BigNumber('1964076265587335627')
};
exports.OnlyAutoRoute_Case_2 = {
    ef: [],
    autoRoute: [
        [
            {
                source: src_1.ERC20BridgeSource.AutoRoute,
                output: new utils_1.BigNumber('111090954798277371'),
                input: new utils_1.BigNumber('112911530335455317'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('227709682705851137'),
                input: new utils_1.BigNumber('231468637187683398'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('350129838397047946'),
                input: new utils_1.BigNumber('355953599382522884'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('478638480683241104'),
                input: new utils_1.BigNumber('486662809687104345'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('613536714420231678'),
                input: new utils_1.BigNumber('623907480506914878'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('755140361650495088'),
                input: new utils_1.BigNumber('768014384867715938'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('903780663155112698'),
                input: new utils_1.BigNumber('919326634446557051'),
                fillData: [Object]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1059805011620516500'),
                input: new utils_1.BigNumber('1078204496504340219'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1223577717654235986'),
                input: new utils_1.BigNumber('1245026251665012546'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1395480809911327687'),
                input: new utils_1.BigNumber('1420189094583718490'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1575914870618727948'),
                input: new utils_1.BigNumber('1604110079648359730'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1765299907807993994'),
                input: new utils_1.BigNumber('1797227113966233033'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1964076265587335627'),
                input: new utils_1.BigNumber('2000000000000000000'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            }
        ]
    ],
    targetAmount: new utils_1.BigNumber("2000000000000000000"),
    side: types_1.MarketOperation.Sell,
    expertOutput: new utils_1.BigNumber('1964076265587335627')
};
exports.Both_Case_1 = {
    ef: [
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('2000000000000000000'),
                takerAmount: new utils_1.BigNumber('500000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937775'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('2000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('500000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        },
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('3000000000000000000'),
                takerAmount: new utils_1.BigNumber('5000000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937774'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('3000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('5000000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        }
    ],
    autoRoute: [
        [
            {
                source: src_1.ERC20BridgeSource.AutoRoute,
                output: new utils_1.BigNumber('111090954798277371'),
                input: new utils_1.BigNumber('112911530335455317'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('227709682705851137'),
                input: new utils_1.BigNumber('231468637187683398'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('350129838397047946'),
                input: new utils_1.BigNumber('355953599382522884'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('478638480683241104'),
                input: new utils_1.BigNumber('486662809687104345'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('613536714420231678'),
                input: new utils_1.BigNumber('623907480506914878'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('755140361650495088'),
                input: new utils_1.BigNumber('768014384867715938'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('903780663155112698'),
                input: new utils_1.BigNumber('919326634446557051'),
                fillData: [Object]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1059805011620516500'),
                input: new utils_1.BigNumber('1078204496504340219'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1223577717654235986'),
                input: new utils_1.BigNumber('1245026251665012546'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1395480809911327687'),
                input: new utils_1.BigNumber('1420189094583718490'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1575914870618727948'),
                input: new utils_1.BigNumber('1604110079648359730'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1765299907807993994'),
                input: new utils_1.BigNumber('1797227113966233033'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1964076265587335627'),
                input: new utils_1.BigNumber('2000000000000000000'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            }
        ]
    ],
    targetAmount: new utils_1.BigNumber("2000000000000000000"),
    side: types_1.MarketOperation.Sell,
    expertOutput: new utils_1.BigNumber('1964076265587335627')
};
exports.Both_Case_2 = {
    ef: [
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('2000000000000000000'),
                takerAmount: new utils_1.BigNumber('1000000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937775'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('2000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('1000000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        },
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('2000000000000000000'),
                takerAmount: new utils_1.BigNumber('500000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937774'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('2000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('500000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        }
    ],
    autoRoute: [
        [
            {
                source: src_1.ERC20BridgeSource.AutoRoute,
                output: new utils_1.BigNumber('111090954798277371'),
                input: new utils_1.BigNumber('112911530335455317'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('227709682705851137'),
                input: new utils_1.BigNumber('231468637187683398'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('350129838397047946'),
                input: new utils_1.BigNumber('355953599382522884'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('478638480683241104'),
                input: new utils_1.BigNumber('486662809687104345'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('613536714420231678'),
                input: new utils_1.BigNumber('623907480506914878'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('755140361650495088'),
                input: new utils_1.BigNumber('768014384867715938'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('903780663155112698'),
                input: new utils_1.BigNumber('919326634446557051'),
                fillData: [Object]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1059805011620516500'),
                input: new utils_1.BigNumber('1078204496504340219'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1223577717654235986'),
                input: new utils_1.BigNumber('1245026251665012546'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1395480809911327687'),
                input: new utils_1.BigNumber('1420189094583718490'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1575914870618727948'),
                input: new utils_1.BigNumber('1604110079648359730'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1765299907807993994'),
                input: new utils_1.BigNumber('1797227113966233033'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('1964076265587335627'),
                input: new utils_1.BigNumber('2000000000000000000'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            }
        ]
    ],
    targetAmount: new utils_1.BigNumber("2000000000000000000"),
    side: types_1.MarketOperation.Sell,
    expertOutput: new utils_1.BigNumber('1964076265587335627')
};
exports.No_Enough_LP_Case_1 = {
    ef: [],
    autoRoute: [
        [
            {
                source: src_1.ERC20BridgeSource.AutoRoute,
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('112911530335455317'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('231468637187683398'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('355953599382522884'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('486662809687104345'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('623907480506914878'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('768014384867715938'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('919326634446557051'),
                fillData: [Object]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('1078204496504340219'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('1245026251665012546'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('1420189094583718490'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('1604110079648359730'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('1797227113966233033'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('2000000000000000000'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            }
        ]
    ],
    targetAmount: new utils_1.BigNumber("2000000000000000000"),
    side: types_1.MarketOperation.Sell,
    expertOutput: new utils_1.BigNumber('0')
};
exports.No_Enough_LP_Case_2 = {
    ef: [
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('2000000000000000000'),
                takerAmount: new utils_1.BigNumber('500000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937775'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('2000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('500000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        },
        {
            order: {
                makerToken: '0x3518eacc1b14ff50256b1d619ab650d98f2f2895',
                takerToken: '0x600369787dbc6ba4ddccb242c2c0fb7a3ee4daa9',
                makerAmount: new utils_1.BigNumber('3000000000000000000'),
                takerAmount: new utils_1.BigNumber('5000000000000000000'),
                maker: '0x0000000000000000000000000000000000000000',
                taker: '0x0000000000000000000000000000000000000000',
                chainId: 97,
                verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
                takerTokenFeeAmount: new utils_1.BigNumber(0),
                sender: '0x0000000000000000000000000000000000000000',
                feeRecipient: '0x0000000000000000000000000000000000000000',
                pool: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: new utils_1.BigNumber('57365542741118506394557431120921581358536271282427923234698422276744989937774'),
                expiry: new utils_1.BigNumber(0)
            },
            signature: {
                signatureType: 1,
                v: 1,
                r: '0x0000000000000000000000000000000000000000000000000000000000000000',
                s: '0x0000000000000000000000000000000000000000000000000000000000000000'
            },
            fillableMakerAmount: new utils_1.BigNumber('3000000000000000000'),
            fillableTakerAmount: new utils_1.BigNumber('5000000000000000000'),
            fillableTakerFeeAmount: 0,
            type: 1
        }
    ],
    autoRoute: [
        [
            {
                source: src_1.ERC20BridgeSource.AutoRoute,
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('112911530335455317'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('231468637187683398'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('355953599382522884'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('486662809687104345'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('623907480506914878'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('768014384867715938'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('919326634446557051'),
                fillData: [Object]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('1078204496504340219'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('1245026251665012546'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('1420189094583718490'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('1604110079648359730'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('1797227113966233033'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            },
            {
                source: 'AutoRoute',
                output: new utils_1.BigNumber('0'),
                input: new utils_1.BigNumber('2000000000000000000'),
                fillData: [{
                        router: '0xb93631007881b75FdE775e8FaA43a5186eA2665c'
                    }]
            }
        ]
    ],
    targetAmount: new utils_1.BigNumber("2000000000000000000000"),
    side: types_1.MarketOperation.Sell,
    expertOutput: new utils_1.BigNumber('0')
};
//# sourceMappingURL=sampler_data.js.map