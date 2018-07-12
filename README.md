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

## Import your account to geth keystore

### Requirements
- Go Ethereum (Geth)

Save your ethereum private key into a file
```bash
vim private.txt
```

Import your private key into geth keystore and use passphrase to encrypt it
```bash
geth account import private.txt

INFO [07-11|22:28:12] Maximum peer count                       ETH=25 LES=0 total=25
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: 
Repeat passphrase: 
Address: {<Your ethereum account address(public key)>}
```

Check the location and info of keystore files
```bash
geth account list

INFO [07-11|22:39:53] Maximum peer count                       ETH=25 LES=0 total=25
Account #0: {XXXXXXXX} keystore:///home/osboxes/.ethereum/keystore/UTC--2017-04-28T08-46-27.XXXXXXXXXXXXXX
Account #1: {XXXXXXXX} keystore:///home/osboxes/.ethereum/keystore/UTC--2017-04-28T08-46-52.XXXXXXXXXXXXXX
```

### Reference
- [What is an Ethereum keystore file?](https://medium.com/@julien.maffre/what-is-an-ethereum-keystore-file-86c8c5917b97)
