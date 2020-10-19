// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract HelloWorld{
    function hello() pure external returns(string memory) {
        return 'Hello World';
    }
}