const { expectRevert } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const Dai = artifacts.require('mocks/Dai.sol');
const Bat = artifacts.require('mocks/Bat.sol');
const Rep = artifacts.require('mocks/Rep.sol');
const Zrx = artifacts.require('mocks/Zrx.sol');
const Dex = artifacts.require('Dex.sol');
const SIDE = {BUY:0, SELL:1}

contract('Dex', (accounts) => {
    let dai, bat, rep, zrx, dex;
    const [trader1, trader2, trader3, trader4, trader5, trader6] = [accounts[1],accounts[2],accounts[3],accounts[4], accounts[5], accounts[6]];
    const [DAI, BAT, REP, ZRX] = ['DAI', 'BAT', 'REP', 'ZRX']
        .map(ticker => web3.utils.fromAscii(ticker));

    beforeEach(async() => {
        ([dai, bat, rep, zrx] = await Promise.all([
            Dai.new(),
            Bat.new(),
            Rep.new(),
            Zrx.new()
        ]));
        dex = await Dex.new();
        await Promise.all([
            dex.addToken(DAI, dai.address),
            dex.addToken(BAT, bat.address),
            dex.addToken(REP, rep.address),
            dex.addToken(ZRX, zrx.address),
        ])

        const amount = web3.utils.toWei('1000');
        const seedTokenBalance = async (token, trader) => {
            await token.faucet(trader, amount);
            await token.approve(dex.address, amount, {from:trader});
        };

        await Promise.all(
            [dai, bat, rep, zrx].map(token => seedTokenBalance(token, trader1))
        );

        await Promise.all(
            [dai, bat, rep, zrx].map(token => seedTokenBalance(token, trader2))
        );

        await Promise.all(
            [dai, bat, rep, zrx].map(token => seedTokenBalance(token, trader3))
        );

        await Promise.all(
            [dai, bat, rep, zrx].map(token => seedTokenBalance(token, trader4))
        );

        await Promise.all(
            [dai, bat, rep, zrx].map(token => seedTokenBalance(token, trader5))
        );

        await Promise.all(
            [dai, bat, rep, zrx].map(token => seedTokenBalance(token, trader6))
        );
    });
    it('Should prune filled market orders', async () => {
        await dex.deposit(web3.utils.toWei('100'), DAI, {from:trader1});
        await dex.createLimitOrder(REP, web3.utils.toWei('3'), 4, SIDE.BUY, {from:trader1});
        await dex.deposit(web3.utils.toWei('100'), DAI, {from:trader2});
        await dex.createLimitOrder(REP, web3.utils.toWei('3'), 3, SIDE.BUY, {from:trader2});
        await dex.deposit(web3.utils.toWei('100'), DAI, {from:trader3});
        await dex.createLimitOrder(REP, web3.utils.toWei('2'), 2, SIDE.BUY, {from:trader3});
        await dex.deposit(web3.utils.toWei('100'), DAI, {from:trader4});
        await dex.createLimitOrder(REP, web3.utils.toWei('1'), 1, SIDE.BUY, {from:trader4});
        await dex.deposit(web3.utils.toWei('100'), DAI, {from:trader5});
        await dex.createLimitOrder(REP, web3.utils.toWei('1'), 1, SIDE.BUY, {from:trader5});
        await dex.deposit(web3.utils.toWei('100'), REP, {from:trader6});
        await dex.createMarketOrder(REP, web3.utils.toWei('8'), SIDE.SELL, {from:trader6});

        const balances = await Promise.all([
            dex.traderBalances(trader1, DAI),
            dex.traderBalances(trader1, REP),
            dex.traderBalances(trader2, DAI),
            dex.traderBalances(trader2, REP),
            dex.traderBalances(trader3, DAI),
            dex.traderBalances(trader3, REP),
            dex.traderBalances(trader4, DAI),
            dex.traderBalances(trader4, REP),
            dex.traderBalances(trader5, DAI),
            dex.traderBalances(trader5, REP),
            dex.traderBalances(trader6, DAI),
            dex.traderBalances(trader6, REP),
        ]);
        const buyOrders = await dex.getOrders(REP,SIDE.BUY);
        const sellOrders = await dex.getOrders(REP,SIDE.SELL);
        assert(buyOrders.length === 2);
        assert(sellOrders.length === 0);
        assert(buyOrders[0].filled === web3.utils.toWei('0'));
        assert(buyOrders[0].amount === web3.utils.toWei('1'));
        assert(balances[0].toString() === web3.utils.toWei('88'));
        assert(balances[1].toString() === web3.utils.toWei('3'));
        assert(balances[2].toString() === web3.utils.toWei('91'));
        assert(balances[3].toString() === web3.utils.toWei('3'));
        assert(balances[4].toString() === web3.utils.toWei('96'));
        assert(balances[5].toString() === web3.utils.toWei('2'));
        assert(balances[6].toString() === web3.utils.toWei('100'));
        assert(balances[7].toString() === web3.utils.toWei('0'));
        assert(balances[8].toString() === web3.utils.toWei('100'));
        assert(balances[9].toString() === web3.utils.toWei('0'));
        assert(balances[10].toString() === web3.utils.toWei('25'));
        assert(balances[11].toString() === web3.utils.toWei('92'));
    });
});