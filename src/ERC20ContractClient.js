import React, { Component } from 'react';
// import { Formik, Field } from 'formik';
import ERC20Contract from './contracts/ERC20Contract';


class ERC20ContractClient extends Component {
    constructor(props) {
        super(props);

        console.log("ERC20ContractClient.constructor");

        const { web3js } = props;
        let contract = web3js.eth.contract(ERC20Contract.ABI).at(ERC20Contract.address);

        // contract.allEvents({
        //     fromBlock: 0,
        //     toBlock: 'latest'
        // }).get(this.onEvent);

        contract.totalSupply(function (err, result) {
            if (err) {
                console.log("Get error when calling totalSupply:", err);
                return;
            }

            console.log("totalSupply:", result.toNumber());
        });

        contract.balanceOf(ERC20Contract.address, function (err, result) {
            if (err) {
                console.log("Get error when calling balanceOf:", err);
                return;
            }

            console.log("balanceOf:", result.toNumber());
        });

        let transferEvent = contract.Transfer({}, { toBlock: 'latest' });
        transferEvent.watch(this.onEvent);

        let approvalEvent = contract.Approval({}, { toBlock: 'latest' });
        approvalEvent.watch(this.onEvent);

        this.state = {
            message: '',
            contract: contract,
            transferEvent: transferEvent,
            approvalEvent: approvalEvent
        };
    }

    componentWillUnmount = () => {
        console.log("ERC20ContractClient.componentWillUnmount()");
        this.state.transferEvent.stopWatching();
        this.state.approvalEvent.stopWatching();
    }

    onEvent = (err, result) => {
        if (err) {
            console.log("ERC20ContractClient.error watching onEvent:", err);
            return;
        }
        console.log("ERC20ContractClient.onEvent: ", result);
        // this.setState({
        //     message: result
        // })
    }

    render() {
        return (
            <div>
                ERC20Contract
                {this.state.message}
            </div>
        );
    }
}



export default ERC20ContractClient;