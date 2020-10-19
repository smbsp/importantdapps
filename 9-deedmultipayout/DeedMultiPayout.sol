// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract DeedMultiPayout {
    address public lawyer;
    address payable public beneficiary;
    uint public earliest;
    uint public amount;
    uint public constant PAYOUTS = 10;
    uint public constant INTERVAL = 10;
    uint public paidPayouts;
    
    constructor (address _lawyer, address payable _beneficiary, uint fromNow) payable {
        lawyer = _lawyer;
        beneficiary = _beneficiary;
        earliest = block.timestamp + fromNow;
        amount = msg.value / PAYOUTS;
    }
    
    function withdraw() external {
        require(msg.sender == lawyer, 'lawyer only');
        require(block.timestamp >= earliest,'too early');
        require(paidPayouts < PAYOUTS, 'no payout left');
        uint eligiblePayouts = (block.timestamp - earliest) / PAYOUTS;
        uint duePayouts = eligiblePayouts - paidPayouts;
        duePayouts = duePayouts + paidPayouts > PAYOUTS ? PAYOUTS - paidPayouts : duePayouts;  
        paidPayouts += duePayouts;
        beneficiary.transfer(duePayouts * amount);
    }
}