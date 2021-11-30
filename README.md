# konfidio

### Instructions
- run node ```node```
- on REPL type the following code
```
const BlockChain = require('./index');
b = new BlockChain()
```
- You can initialize the blockchain as this example
```
b.init([100, 100, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450]], 2)
```
- Than you can get the balance of a specific user
```
b.getAccountBalance(1)
```