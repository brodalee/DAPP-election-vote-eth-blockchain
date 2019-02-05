pragma solidity ^0.5.0;

contract Election {

    //Model a candiate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //Store *
    //Fetch *
    mapping(uint => Candidate) public candidates;


    //Store candidate count
    uint public candidatesCount;


    constructor() public {
        addCandidate("Trump");
        addCandidate("Obama");
        addCandidate("Holland");
        addCandidate("Macron");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}
