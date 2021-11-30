const BlockChain = require('./index');
const assert = require('assert').strict;

describe("integration test", function() {
    beforeEach(function () {
        this.blockchain = new BlockChain();
    });

    it("should be able to create blockchain and account zero must have 105 as balance", function() {
        this.blockchain.init([100, 100], [[0, 1, 5], [1, 0, 10]], 2);

        assert(this.blockchain.getAccountBalance(0), 105);
    });

    it("should raise an error when transaction point to an invalid account", function() {
        const expectedError = new Error("Invalid account index");

        assert.throws(() => {
            this.blockchain.init([100, 100], [[0, 1, 5], [1, 2, 10]], 2);
        }, expectedError);
    });
});