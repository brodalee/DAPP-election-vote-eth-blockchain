var Election = artifacts.require('./Election.sol');

contract("Election", (accounts) => {

    let electionInstance;

    it("Should initializes with 4 candidates", () => {
        return Election.deployed().then(
            (instances) => {
                return instances.candidatesCount();
            }).then((count) => {
            assert.equal(count, 4);
        })
    })


    it("Should initializes candidates with goods values", () => {
        return Election.deployed().then( (instance) => {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then( (candidate) => {
            assert.equal(candidate[0], 1, "Contain the correct ID");
            assert.equal(candidate[1], 'Trump', "Contain the correct name");
            assert.equal(candidate[2], 0, 'Contain the correct number of vote');
            return electionInstance.candidates(2);
        }).then( (candidate) => {
            assert.equal(candidate[0], 2, "Contain the correct ID");
            assert.equal(candidate[1], 'Obama', "Contain the correct name");
            assert.equal(candidate[2], 0, 'Contain the correct number of vote');
            return electionInstance.candidates(3);
        }).then( (candidate) => {
            assert.equal(candidate[0], 3, "Contain the correct ID");
            assert.equal(candidate[1], 'Holland', "Contain the correct name");
            assert.equal(candidate[2], 0, 'Contain the correct number of vote');
            return electionInstance.candidates(4);
        }).then( (candidate) => {
            assert.equal(candidate[0], 4, "Contain the correct ID");
            assert.equal(candidate[1], 'Macron', "Contain the correct name");
            assert.equal(candidate[2], 0, 'Contain the correct number of vote');
        })
    })

    it("Should allow a voter to cast a vote", () => {
        return Election.deployed().then( (instance) => {
            electionInstance = instance
            candidateId = 1
            return electionInstance.vote(candidateId)
        }).then( (receipt) => {
            return electionInstance.voters(accounts[0])
        }).then( (voted) => {
            assert(voted, "Voter has voted")
            return electionInstance.candidates(candidateId)
        }).then( (candidate) => {
            let voteCount = candidate[2]
            assert.equal(voteCount, 1, "Increment the candidate's vote count")
        })
    })

    it("Should throw exception when voting for an invalid candidate", () => {
        return Election.deployed().then( (instance) => {
            electionInstance = instance
            return electionInstance.vote(99)
        }).then(assert.fail).catch((err) => {
            assert(err.message.indexOf("revert") >= 0, "error message must contain revert")
            return electionInstance.candidates(1)
        }).then( (candidate) => {
            let voteCount = candidate[2]
            assert.equal(voteCount, 1, "Candidate One did not receive the vote")
            return electionInstance.candidates(2)
        }).then((candidate) => {
            let voteCount = candidate[2]
            assert.equal(voteCount, 0, "Candidate Two did not receive the vote")
            return electionInstance.candidates(3)
        }).then((candidate) => {
            let voteCount = candidate[2]
            assert.equal(voteCount, 0, "Candidate Three did not receive the vote")
            return electionInstance.candidates(4)
        }).then((candidate) => {
            let voteCount = candidate[2]
            assert.equal(voteCount, 0, "Candidate Foor did not receive the vote")
        })
    })


    it("Should throw exception when voter has already voted (double voting)", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            candidateId = 2;
            electionInstance.vote(candidateId, { from: accounts[1] });
            return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
            var voteCount = candidate[2];
            assert.equal(voteCount, 1, "accepts first vote");
            // Try to vote again
            return electionInstance.vote(candidateId, { from: accounts[1] });
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
            return electionInstance.candidates(1);
        }).then(function(candidate1) {
            var voteCount = candidate1[2];
            assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
            return electionInstance.candidates(2);
        }).then(function(candidate2) {
            var voteCount = candidate2[2];
            assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
            return electionInstance.candidates(3);
        }).then(function(candidate3) {
            let voteCount = candidate3[2];
            assert.equal(voteCount, 0, "candidate 3 did not receive any votes");
            return electionInstance.candidates(4)
        }).then(function(candidate4) {
            let voteCount = candidate4[2];
            assert.equal(voteCount, 0, "candidate 4 did not receive any votes");
        })
    });
});
