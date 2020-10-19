// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Dai is ERC20 {
    constructor() ERC20('DAI', 'DAI Stable Coin') {}
    
    function faucet(address to, uint amount) external {
        _mint(to, amount);
    }
}