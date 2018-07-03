## A Simple Ethereum Client Based on ReactJS & web3JS

## Test on Truffle Develop Blockchain
Launch truffle develop blockchain and run unittest
```bash
truffle develop

#Run test under truffle develop console
truffle(develop)> test
```

## Deploy your contracts to Rinkeby Testnet through Truffle

### Requirements
- Truffle
- MetaMask Wallet
- Go Ethereum (Geth)

Import your Metamask private key to geth
```bash
geth --rinkeby account import ./key.txt
```

Connect to Rinkeby Testnet blockchain through geth
```bash
geth --rinkeby --rpc --rpcapi db,eth,net,web3,personal --unlock="your Account Address"
#And make sure you key-in your account pass phrase here to unlock your account

geth --rinkeby --ws --wsorigins="Allowed Origins here" --rpc --rpcapi db,eth,net,web3,personal --unlock="your Account Address"
#For enabling web socket interface, default port: 8546
```

Deploy your Contract to Rinkeby Testnet through Truffle (Warning! It will cost gas fee from your Metamask wallet!)
```bash
truffle migrate --network rinkeby
```

For re-run all the migration steps:
```bash
truffle migrate --network rinkeby --reset
```
