const { MNEMONIC } = process.env;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    dev: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: MNEMONIC,
          },
          providerOrUrl: "https://babel-api.testnet.iotex.io",
          shareNonce: true
        }),
      network_id: 4690,    // IOTEX mainnet chain id 4689, testnet is 4690
      gas: 8500000,
      gasPrice: 1000000000000,
      skipDryRun: true
    }
  }
}