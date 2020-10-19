// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract EtherWallet{
    address payable public owner;
    
    constructor(address payable _owner) {
        owner = _owner;
    }
    
    function deposit() payable external{
    }
    
    function send(address payable to, uint amount) external {
        if(msg.sender == owner){
            to.transfer(amount);
            return;
        }
        revert('sender is not allowed');
    }
    
    function balanceOf() view external returns(uint){
        return address(this).balance;
    }
}