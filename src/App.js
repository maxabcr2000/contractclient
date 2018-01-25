import React, { Component } from 'react';
import './App.css';
import BankContractClient from './BankContractClient';
import TokenContractClient from './TokenContractClient';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BankContractClient />
        <TokenContractClient />
      </div>
    );
  }
}

export default App;
