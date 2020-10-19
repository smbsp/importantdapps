const SimpleStorage = artifacts.require('SimpleStorage');

contract('SimpleStorage', () => {
    it('Should set a value', async () => {
        simpleStorage = await SimpleStorage.new();
        await simpleStorage.set('Sourav');
        const get = await simpleStorage.get();
        assert(get === 'Sourav');
    });
});