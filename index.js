const sha1 = require('sha1');

class Block {
    constructor(transactions) {
        this.transactions = transactions;
        this.previousHash = "";
        this.hash = null;
    }

    createHash() {
        let nonce = 1;
        let startFourChar = null;
        let hash = null;
        while(startFourChar != '1234') {
            let strBlock = `${this.previousHash}, ${nonce}, ${JSON.stringify(this.transactions)}`
            hash = sha1(strBlock);
            startFourChar = hash.substring(0, 4);
            nonce += 1;
        }

        return hash;
    }
}

class BlockChain {
    constructor() {
        this.blockchain = []
        this.accountsBalances = [];
        this.transactions = [];
        this.blockSize = null;
    }
    init(initialBalances, transactions, blockSize) {
        this.accountsBalances = initialBalances;
        this.blockSize = blockSize;
        let transactionsBlock = [];
        while (transactions.length > 0) {
            let transaction = transactions.shift();

            let accountFrom = transaction[0];
            let accountTo = transaction[1];
            let amount = transaction[2];

            if (accountFrom >= this.accountsBalances.length || accountTo >= this.accountsBalances.length) {
                throw new Error("Invalid account index");
            }

            if (this.validateTransaction(accountFrom, accountTo, amount)) {
                transactionsBlock.push(transaction);
            }

            if (transactionsBlock.length == this.blockSize) {
                let block = new Block(transactionsBlock);
                this.addNewBlock(block);

                transactionsBlock = [];
            } else if (transactions.length == 0) {
                let block = new Block(transactionsBlock);
                this.addNewBlock(block);
            }
        }
    }
    validateTransaction(accountFrom, accountTo, amount) {
        if (this.accountsBalances[accountFrom] < amount) {
            return false;
        }

        this.accountsBalances[accountFrom] = this.accountsBalances[accountFrom] - amount;
        this.accountsBalances[accountTo] = this.accountsBalances[accountTo] + amount;

        return true;
    }
    obtainLatestBlockHash() {
        let lastHash = this.blockchain.length > 0 ? this.blockchain[this.blockchain.length - 1].hash : "0";
        return lastHash
    }
    addNewBlock(newBlock) {
        newBlock.previousHash = this.obtainLatestBlockHash()
        newBlock.hash = newBlock.createHash()
        this.blockchain.push(newBlock)
    }
    getAccountBalance(accountIndex) {
        return this.accountsBalances[accountIndex]
    }
}

module.exports = BlockChain;