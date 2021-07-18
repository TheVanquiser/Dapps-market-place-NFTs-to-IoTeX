// index.js

const Web3 = require('web3');
const Big = require('big.js');

// Initialize web3.js using the IoTeX Babel endpoint
const web3 = new Web3(new Web3.providers.HttpProvider("https://babel-api.iotex.io"));

// Create a brand new account
const account = web3.eth.accounts.create();
console.log("Account created: %s", account.address);

// Query the balance of the IoTeX address io1qz02qneamgdseprun3eswcudg2runs4kwpv842
// You can use "ioctl account ethaddr <address>" to convert to Eth address format:
let address = "0x009EA04f3dda1b0C847c9C7307638d4287c9C2B6"
web3.eth.getBalance(address).then(
    function (balance) {
        let iotxBalance = Big(balance).div(10**18);
        console.log("Balance of %s is %s IOTX",address,iotxBalance.toFixed(18))
    });  

    const Web3 = require('web3');
    const HDWalletProvider = require('truffle-hdwallet-provider');
    
    // Web3 - Accounts private keys
    const privateKeys = [
        "<set a private key here>",
        "<set a private key here>",
        "<set a private key here>"
      ];
    
    // Interact with the IoTeX testnet
    const ENDPOINT= "https://babel-api.testnet.iotex.io";
    // Uncomment the line below to interact with the IoTeX mainnet
    // const ENDPOINT= "https://babel-api.mainnet.iotex.io";
    
    // Instantiate the accounts provider
    const provider = new HDWalletProvider(privateKeys, ENDPOINT, 0, 3);
    
    // Instantiate the Web3 object
    const web3 = new Web3(provider);
    
    (async () => {
    
      // Check that Web3 is connected
      await web3.eth.net.isListening();
      console.log('Web3 is connected.');
      // Get the ChainId (IoTeX will return 4689 for mainnet and 4690 
      // for testnet). See below.
      const chainId = await web3.eth.net.getId();
      
      // Get the accounts
      let accounts = await web3.eth.getAccounts();
      console.log(`accounts: ${JSON.stringify(accounts)}`);
      
      // Configure the transfer settings
      let txConfig = {
        from: accounts[2],
        to: accounts[1],
        // notice we use a slightly higher gas limit than Ethereum default 
        // so we set it explicitely.
        gasPrice: "1000000000000",
        gas: "85000",
        value: "10000000000000000",  // Sending 0.01 IOTX
        // IoTeX also has a different Chain Id than the Etehreum networks
        // that's why queried it above
        chainId
      };
    
      // Sign the tx
      let signedTx = await web3.eth.signTransaction(txConfig, accounts[2]);
      console.log("Raw signed Tx: ", signedTx.raw);
    
      // Calculate the expected Hash
      const txHash = await web3.utils.sha3(signedTx.raw);
      console.log("Tx Hash (calculated): ",txHash);
    
      // Send the transaction
      web3.eth.sendSignedTransaction(signedTx.raw)
      .on("receipt", function(receipt) {
        console.log("Tx Hash (Receipt): ", receipt.transactionHash);
      })
      .on("error", function(e) { console.log(e); });
    
    })();