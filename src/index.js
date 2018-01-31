import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    var Web3 = require('web3');
    var web3js;

    if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        //web3js = new Web3(window.web3.currentProvider);
        web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        web3js = null;
    }

    // Now you can start your app & access web3 freely:
    ReactDOM.render(<App web3js={web3js} />, document.getElementById('root'));
})

registerServiceWorker();
