import React, { Component } from 'react';
import './App.css';
import BankContractClientGeth from './BankContractClientGeth';
import BankContractClientMetamask from './BankContractClientMetamask'
import TokenContractClient from './TokenContractClient';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <BankContractClientGeth /> */}
        <TokenContractClient />
        <BankContractClientMetamask />
      </div>
    );
  }
}

export default App;
