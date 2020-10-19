//Kovan Contract Address: 0x346Df502C202c1A83b277e2303242A2479E9Ff9f
const path = require('path');
const provider = require('@truffle/hdwallet-provider')
const fs = require('fs');
const secrets = JSON.parse(
  fs.readFileSync('./secrets.json').toString().trim()
);

module.exports = {

  contracts_build_directory: path.join(__dirname, "client/src/contract"),

  networks: {
    kovan: {
      provider: () =>
        new provider(
          secrets.seed, 
          'https://kovan.infura.io/v3/c6d19bd663784f608c0fdaaa94129247'
        ),
      network_id: 42,
      gas: 5000000
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.7.0",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
}
