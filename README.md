# Collection

This project contains some very important dapps. The dapps are built using Truffle framework and references OpenZeppelin stadards. The front end is built using React.js and Drizzle. The repo is bootstrapped using `Truffle` and [Create React App](https://github.com/facebook/create-react-app).

## Description

The main purpose of this repo is to quickly reference various dapps such as Deed, Escrow, Voting, DAO, Wallet, ERC20, ICO, ERC 721 - NFT, Cryptokitties, Oracle etc. All the smart contracts are written in Solidity 0.7.0.

## File Placement

Smart Contract - It goes into the 'contracts' folder e.g. HelloWorld.sol<br>
Test Script - It goes into the 'test' folder(Javascript file that has the same name of Smart Contract) e.g. helloworld.js<br>
HTML File - Goes to the client -> public folder e.g. index.html<br>
Javascript & CSS - Goes to the client -> src folder(all other .js files) e.g. index.js

## Prerequisite

Install truffle and bootstrap drizzle and create-react-app.

## Installation and running the In-Memory Blockchain

Clone the repository and run the following commands:

```bash
npm install
truffle develop
migrate --reset
```

Front End

Run the following commands within the 'client' directory:

```bash
npm install
npm run start
```
