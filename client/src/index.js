import Web3 from 'web3';
import HelloWorld from './contract/HelloWorld.json';

var helloWorldABI = HelloWorld.abi;
var helloWorldAddress = '0x2A88fFE9bFD1E6d40d157D493A10c1faeD50D297';
var web3 = new Web3('http://localhost:9545');
var helloWorld = new web3.eth.Contract(helloWorldABI, helloWorldAddress);

document.addEventListener('DOMContentLoaded', () => {
  helloWorld.methods.hello().call()
  .then(result => {
    document.getElementById('hello').innerHTML = result;
  });
});