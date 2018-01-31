module.exports = {
    ABI: [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "amountInWei",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "balance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "initBalance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "target",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "amountInWei",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "name": "DepositEvent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "target",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "amountInWei",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "name": "WithDrawEvent",
            "type": "event"
        }
    ],
    address: '0xc198dc9f236a7b286e9753ff404d1dfc20f7762c'
};