// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Crud {
    struct User {
        uint id;
        string name;
    }
    
    User[] public users;
    uint public nextId = 1;
    
    function create(string memory name) external {
        users.push(User(nextId, name));
        nextId++;
    }
    
    function read(uint id) view external returns(uint, string memory) {
        uint i = find(id);
        return(users[i].id, users[i].name);
    }
    
    function update(uint id, string memory name) external {
        uint i = find(id);
        users[i].name = name;
    }
    
    function destroy(uint id) external {
        uint i = find(id);
        delete users[i];
    }
    
    function find(uint id) view internal returns(uint) {
        for (uint i=0; i < users.length; i++) {
            if(users[i].id == id) {
                return i;
            }
        }
        revert('User does not exist');
    }
}