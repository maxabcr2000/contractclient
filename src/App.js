import React, { Component } from 'react';
import './App.css';
import BankContract from './contracts/BankContract';
import BankContractClientMetamask from './BankContractClientMetamask'
import TokenContractClient from './TokenContractClient';
import ERC20ContractClient from './ERC20ContractClient';

var web3js, bankcontractInst, depositEvent, withdrawEvent;
var Web3 = require('web3');

class App extends Component {
  componentDidMount = () => {
    console.log("componentDidMount");
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    const { web3js } = this.props;
    web3js.version.getNetwork((err, netId) => {
      switch (netId) {
        case "1":
          this.setState({
            network: 'This is mainnet'
          });
          break;

        case "2":
          this.setState({
            network: 'This is the deprecated Morden test network.'
          });
          break;

        case "3":
          this.setState({
            network: 'This is the ropsten test network.'
          });
          break;

        case "4":
          this.setState({
            network: 'This is the Rinkeby test network.'
          });
          break;

        case "42":
          this.setState({
            network: 'This is the Kovan test network.'
          });
          break;

        default:
          this.setState({
            network: 'This is an unknown network.'
          });
      }
    })
  }

  componentDidUpdate = () => {

  }

  render() {
    const { web3js } = this.props;

    return (
      <div className="App">
        <h1>{(this.state) ? this.state.network : null}</h1>
        {/* <BankContractClientGeth /> */}
        <TokenContractClient web3js={web3js} />
        <BankContractClientMetamask web3js={web3js} />
        <ERC20ContractClient web3js={web3js} />
      </div>
    );
  }
}

export default App;
