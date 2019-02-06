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

    //Store account that votes
    mapping(address => bool) public voters;

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

    function vote(uint _candidateId) public {
        //Check if voter has already voted
        require(!voters[msg.sender]);

        //Check if the candidate is valid
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        //Get the voter that voted
        voters[msg.sender] = true;
        //Update candidate vote
        candidates[_candidateId].voteCount++;
    }
}
