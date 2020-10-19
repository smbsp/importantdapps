const Cryptokitty = artifacts.require("Cryptokitty.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Cryptokitty, "https://robohash.org");
  const game = await Cryptokitty.deployed();
  await Promise.all([ 
    game.mint(),
    game.mint(),
    game.mint(),
    game.mint()
  ]);
};