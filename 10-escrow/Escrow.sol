// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Escrow {
    address public lawyer;
    address public payer;
    address payable public payee;
    uint public amount;
    
    constructor (address _payer, address payable _payee, uint _amount) {
        payer = _payer;
        payee = _payee;
        amount = _amount;
        lawyer = msg.sender;
    }
    
    function deposit() payable external {
        require(address(this).balance <= amount, 'Cant send more than escrow amount');
        require(msg.sender == payer, 'Sender must be payer');
    }
    
    function release() external {
        require(address(this).balance == amount, 'cannot release funds before full amount is sent');
        require(msg.sender == lawyer, 'only lawyer can release funds');
        payee.transfer(amount);
    }
    
    function balanceOf() view external returns(uint) {
        return address(this).balance;
    }
}