import Web3 from 'web3';
import SimpleStorage from './contract/SimpleStorage.json';

const simpleStorageABI = SimpleStorage.abi;
const simpleStorageAddress = '0x2A88fFE9bFD1E6d40d157D493A10c1faeD50D297';
const web3 = new Web3('http://localhost:9545');
const simpleStorage = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress);

document.addEventListener('DOMContentLoaded', () => {
  const $setData = document.getElementById('setData');
  const $data = document.getElementById('data');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

  const getData = () => {
    simpleStorage.methods
      .get()
      .call()
      .then(result => {
        $data.innerHTML = result;
      })
  };
  getData();

  $setData.addEventListener('submit', e => {
    e.preventDefault();
    const data = e.target.elements[0].value;
    simpleStorage.methods
      .set(data)
      .send({from: accounts[0]})
      .then(getData);
  });
});