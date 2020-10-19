const DeedMultiPayout = artifacts.require('DeedMultiPayout');

contract('DeedMultiPayout', (accounts) => {
  let deedMultiPayout = null;
  before(async () => {
    deedMultiPayout = await DeedMultiPayout.deployed();
  });

  it('should withdraw for all payouts (1)', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    for(let i = 0; i < 10; i++) {
      const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      await new Promise(resolve => setTimeout(resolve, 10000));
      await deedMultiPayout.withdraw({from: accounts[0]});
      const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      assert(finalBalance.sub(initialBalance).toNumber() === 10);
    }
  });

  it('should withdraw for all payouts (2)', async () => {
    const deedMultiPayout = await DeedMultiPayout.new(
      accounts[0], 
      accounts[1], 
      1, 
      {value: 100}
    );
    await new Promise(resolve => setTimeout(resolve, 1000));
    for(let i = 0; i < 5; i++) {
        const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        await new Promise(resolve => setTimeout(resolve, 20000));
        await deedMultiPayout.withdraw({from: accounts[0]});
        const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        assert(finalBalance.sub(initialBalance).toNumber() === 20);
      }
  });

  it('should NOT withdraw if no payout left', async () => {
    const deedMultiPayout = await DeedMultiPayout.new(
        accounts[0], 
        accounts[1], 
        1, 
        {value: 100}
      );
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
        for(let i = 0; i < 6; i++) {
            const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
            await new Promise(resolve => setTimeout(resolve, 20000));
            await deedMultiPayout.withdraw({from: accounts[0]});
            const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
            assert(finalBalance.sub(initialBalance).toNumber() === 20);
          }
    } catch (e) {
      assert(e.message.includes('no payout left'));
      return;
    }
    assert(false);
  });

  it('should NOT withdraw if too early', async () => {
    const deedMultiPayout = await DeedMultiPayout.new(
      accounts[0], 
      accounts[1], 
      5, 
      {value: 100}
    );
    try {
      await deedMultiPayout.withdraw({from: accounts[0]});
    } catch(e) {
      assert(e.message.includes('too early'));
      return;
    }
    assert(false);
  });

  it('should NOT withdraw if caller is not lawyer', async () => {
    const deedMultiPayout = await DeedMultiPayout.new(
      accounts[0], 
      accounts[1], 
      5, 
      {value: 100}
    );
    try {
      await deedMultiPayout.withdraw({from: accounts[1]});
    } catch(e) {
      assert(e.message.includes('lawyer only'));
      return;
    }
    assert(false);
  });
});