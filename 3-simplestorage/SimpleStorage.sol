// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract SimpleStorage{
    string public data;
    
    function set(string memory _data) external {
        data = _data;
    }
    
    function get() view external returns(string memory) {
        return data;
    }
}