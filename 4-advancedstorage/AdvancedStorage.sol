// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract AdvancedStorage{
    uint[] public ids;
    
    function add(uint id) external {
        ids.push(id);
    }
    
    function get(uint position) view external returns(uint) {
        return ids[position];
    }
    
    function getAll() view external returns(uint[] memory) {
        return ids;
    }
    
    function length() view external returns(uint) {
        return ids.length;
    }
}