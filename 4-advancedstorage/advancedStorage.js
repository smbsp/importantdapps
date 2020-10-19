const AdvancedStorage = artifacts.require('AdvancedStorage');

contract('AdvancedStorage', () => {
    let advancedStorage;
    beforeEach(async () => {
        advancedStorage = await AdvancedStorage.new();
    });
    it('Should add a value to the array', async () => {
        await advancedStorage.add(10);
        const get = await advancedStorage.ids(0);
        assert(get.toNumber() === 10);
    });
    it('Should get a value to the array', async () => {
        await advancedStorage.add(10);
        await advancedStorage.add(20);
        const get = await advancedStorage.get(1);
        assert(get.toNumber() === 20);
    });
    it('Should get all values', async () => {
        var arr = [];
        await advancedStorage.add(10);
        await advancedStorage.add(20);
        arr = await advancedStorage.getAll();
        assert(arr[0].toNumber() === 10);
        assert(arr[1].toNumber() === 20);
    });
    it('Should get length of array', async () => {
        await advancedStorage.add(10);
        await advancedStorage.add(20);
        const length = await advancedStorage.length();
        assert(length.toNumber() === 2);
    });
});