const Voting = artifacts.require("Voting");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(Voting);
};