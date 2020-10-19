// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Proxy {
  address admin;
  address implementation;

  constructor() {
    admin = msg.sender;
  }

  function update(address _implementation) external {
    implementation = _implementation;
  }

  /**
  * This function will return whatever the implementation call returns
  */
  fallback () payable external {
    _fallback();
  }
  
  receive () payable external {
    _fallback();
  }
  
  function _fallback() internal {
    require(implementation != address(0));
    address impl = implementation;

    assembly {
      let ptr := mload(0x40)
      calldatacopy(ptr, 0, calldatasize())
      let result := delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)
      let size := returndatasize()
      returndatacopy(ptr, 0, returndatasize())

      switch result
      case 0 { revert(ptr, returndatasize()) }
      default { return(ptr, returndatasize()) }
    }
 }
}