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
});
