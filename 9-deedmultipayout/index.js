import Web3 from 'web3';
import DeedMultiPayout from './contract/DeedMultiPayout.json';

let web3;
let deedMultiPayout;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = async () => {
  const networkId = await web3.eth.net.getId();
  return new web3.eth.Contract(
    DeedMultiPayout.abi, 
    DeedMultiPayout
      .networks[networkId]
      .address
  );
};

const initApp = () => {
  const $withdraw = document.getElementById('withdraw');
  const $widthdrawResult = document.getElementById('withdraw-result');
  const $balance = document.getElementById('balance');
  const $paidPayouts = document.getElementById('paid-payouts');
  const $earliest = document.getElementById('earliest');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

  const refreshBalance = () => {
    web3.eth.getBalance(deedMultiPayout.options.address)
    .then(balance => {
      $balance.innerHTML = balance;
    });
  }

  const refreshPaidPayouts = () => {
    deedMultiPayout.methods
    .paidPayouts()
    .call()
    .then(paidPayouts => {
      $paidPayouts.innerHTML = `${paidPayouts}/10`;
    })
    .catch(_e => {
      $paidPayouts.innerHTML = `Ooops... there was an error while reading paidPayouts...`;
    });
  }

  const refreshEarliest = () => {
    deedMultiPayout.methods
    .earliest()
    .call()
    .then(earliest => {
      //Returned timestamp is in second.. but Javascript timestamp are in milliseconds...
      $earliest.innerHTML = `${(new Date(parseInt(earliest) * 1000)).toLocaleString()}/10`;
    })
    .catch(_e => {
      $earliest.innerHTML = `Ooops... there was an error while reading earliest...`;
    });
  }

  $withdraw.addEventListener('submit', (e) => {
    e.preventDefault();
    deedMultiPayout.methods
      .withdraw()
      .send({from: accounts[0]})
      .then(result => {
        $widthdrawResult.innerHTML = `Withdrawal succesful!`;
        refreshBalance();
        refreshPaidPayouts();
        refreshEarliest();
      })
      .catch(_e => {
        $widthdrawResult.innerHTML = `Ooops... there was an error while trying to widthdraw...`;
      });
  });

  refreshBalance();
  refreshPaidPayouts();
  refreshEarliest();
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      return initContract();
    })
    .then(_deedMultiPayout => {
      deedMultiPayout = _deedMultiPayout;
      initApp(); 
    })
    .catch(e => console.log(e.message));
});