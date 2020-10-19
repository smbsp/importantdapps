// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract If {
  function ifSolidity(uint _data) pure external returns(uint) {
    if(_data == 1) {
      return 10;
    } else if(_data == 2) {
      return 20;
    } else {
      return 100;
    }
  }

  function ifAssembly(uint _data) pure external returns(uint ret) {
    assembly {
      switch _data
      case 1 {
        ret :=10
      }
      case 2 {
        ret :=20
      }
      default {
        ret :=100
      }
    }
  }
}