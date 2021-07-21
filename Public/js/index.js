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
