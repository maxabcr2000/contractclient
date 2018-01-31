import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import BankContract from './contracts/BankContract.js';

class BankContractClientMetamask extends Component {
    constructor(props) {
        super(props);

        const { web3js } = props;
        let bankcontractInst = web3js.eth.contract(BankContract.ABI).at(BankContract.address);

        let depositEvent = bankcontractInst.DepositEvent();
        depositEvent.watch(this.onDepositEvent);


        let withdrawEvent = bankcontractInst.WithDrawEvent();
        withdrawEvent.watch(this.onWithdrawEvent);

        this.state = {
            contract: bankcontractInst,
            depositEvent: depositEvent,
            withdrawEvent: withdrawEvent,
        };

    }

    onDepositEvent = (err, result) => {
        const { web3js } = this.props;

        if (err) {
            console.log(err)
            return;
        }
        console.log("result: ", result);
        console.log("result.args.balance: ", result.args.balance.toNumber());
        console.log("result.args.amountInWei: ", result.args.amountInWei.toNumber());
        console.log("result.args.target: ", result.args.target);
        //depositEvent.stopWatching();

        var coinbase = web3js.eth.coinbase;
        var balanceWei = web3js.eth.getBalance(coinbase, function (error, result) {
            if (!error)
                console.log(result.toNumber());
            else
                console.error(error);
        })
    }

    onWithdrawEvent = (err, result) => {
        const { web3js } = this.props;

        if (err) {
            console.log(err)
            return;
        }
        console.log("result: ", result);
        console.log("result.args.balance: ", result.args.balance.toNumber());
        console.log("result.args.amountInWei: ", result.args.amountInWei.toNumber());
        console.log("result.args.target: ", result.args.target);
        //withdrawEvent.stopWatching();

        var coinbase = web3js.eth.coinbase;
        var balanceWei = web3js.eth.getBalance(coinbase, function (error, result) {
            if (!error)
                console.log(result.toNumber());
            else
                console.error(error);
        });
        // var balance = web3js.fromWei(balanceWei, 'ether');
        // console.log("balance(ETH):", balance);
    }

    componentWillUnmount = () => {
        this.state.depositEvent.stopWatching();
        this.state.withdrawEvent.stopWatching();
    }

    render() {
        const { web3js } = this.props;
        const { contract } = this.state;

        return (
            <div>
                <h2>Bank Contract(Metamask)</h2>
                <Formik
                    initialValues={{
                        amountInWei: '',
                        action: 'deposit',
                    }}
                    validate={values => {
                        // same as above, but feel free to move this into a class method now.
                        let errors = {};

                        return errors;
                    }}
                    onSubmit={async (
                        values,
                        { setSubmitting, setErrors /* setValues and other goodies */ }
                    ) => {

                        console.log('values.amountInWei:', values.amountInWei);

                        switch (values.action) {
                            case 'deposit':
                                contract.deposit.sendTransaction({ from: web3js.eth.coinbase, value: values.amountInWei, gas: 6000000 }, function (error, result) {
                                    if (!error)
                                        console.log(result)
                                    else
                                        console.error(error);
                                });
                                break;

                            case 'withdraw':
                                contract.withdraw.sendTransaction(values.amountInWei, { from: web3js.eth.coinbase, gas: 6000000 }, function (error, result) {
                                    if (!error)
                                        console.log(result)
                                    else
                                        console.error(error);
                                });
                                break;
                            default:
                        };

                    }}
                    render={({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                             }) => (
                            <form onSubmit={handleSubmit}>
                                <Field component="select" name="action">
                                    <option value="deposit">Deposit</option>
                                    <option value="withdraw">Withdraw</option>
                                    <option value="token">TokenValue</option>
                                </Field>
                                <br />
                                <input
                                    name="amountInWei"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.amountInWei}
                                    placeholder='Type-in amount in wei...'
                                />
                                {touched.amountInWei && errors.amountInWei && <div>{errors.amountInWei}</div>}
                                <button type="submit" >
                                    Submit
                                </button>
                            </form>
                        )}
                />
            </div>
        )
    }
}

export default BankContractClientMetamask;