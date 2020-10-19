const path = require('path');

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contract"),

  networks: {
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
