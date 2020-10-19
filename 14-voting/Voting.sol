// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract Voting {
    mapping (address => bool) public voters;
    struct Choice {
        uint id;
        string name;
        uint votes;
    }
    struct Ballot {
        uint id;
        string name;
        Choice[] choices;
        uint end;
    }
    mapping(uint => Ballot) public ballots;
    uint public nextBallotId;
    address public admin;
    mapping(address => mapping(uint => bool)) public votes;
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin,'only admin');
        _;
    }
    
    function addVoters(address[] calldata _voters) external onlyAdmin() {
        for (uint i = 0; i < _voters.length; i++){
          voters[_voters[i]] = true;  
        }
    }
    
    function createBallot(string memory name, string[] memory _choices, uint offset) public onlyAdmin() {
        ballots[nextBallotId].id = nextBallotId;
        ballots[nextBallotId].name = name;
        ballots[nextBallotId].end = block.timestamp + offset;
        for(uint i=0; i < _choices.length; i++) {
            ballots[nextBallotId].choices.push(Choice(i, _choices[i], 0));
        }
        nextBallotId++;
    }

    function getBallot(uint id) external view returns(Ballot memory) {
        return ballots[id];
    }
    
    function vote(uint ballotId, uint choiceId) external {
        require(voters[msg.sender] == true, 'only voters can vote');
        require(votes[msg.sender][ballotId] == false, 'voter can only vote once for a ballot');
        require(block.timestamp < ballots[ballotId].end, 'can only vote until ballot end date');
        votes[msg.sender][ballotId] = true;
        ballots[ballotId].choices[choiceId].votes++;
    }
    
    function result(uint ballotId) view external returns (Choice[] memory) {
        require(block.timestamp >= ballots[ballotId].end, 'cannot see the ballot result before ballot end');
        return ballots[ballotId].choices;
    }
}