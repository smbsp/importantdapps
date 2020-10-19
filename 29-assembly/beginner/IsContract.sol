// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract IsContract {
  function isContract(address addr) view external returns(bool) {
    uint256 codeLength;
    
    assembly {codeLength := extcodesize(addr)}
    return codeLength == 0 ? false : true;
  }
}