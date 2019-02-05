var Election = artifacts.require('./Election.sol');

contract("Election", (accounts) => {

    it("Should initializes with 4 candidates", () => {
        return Election.deployed().then(
            (instances) => {
                return instances.candidatesCount();
            }).then((count) => {
            assert.equals(count, 4);
        })
    })

});
