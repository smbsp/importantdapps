const StateMachine = artifacts.require("StateMachine");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(StateMachine, 1000, 100, 100, accounts[1] ,accounts[2]);
};