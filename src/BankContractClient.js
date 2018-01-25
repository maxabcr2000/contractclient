import React from 'react';
import { Formik, Field } from 'formik';
import BankContract from './BankContract.js';

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var contract = web3.eth.contract(BankContract.ABI).at(BankContract.address);

var depositEvent = contract.DepositEvent();
depositEvent.watch(function (err, result) {
    if (err) {
        console.log(err)
        return;
    }
    console.log("result: ", result);
    console.log("result.args.balance: ", result.args.balance.toNumber());
    console.log("result.args.amountInWei: ", result.args.amountInWei.toNumber());
    console.log("result.args.target: ", result.args.target);
    //depositEvent.stopWatching();

    var coinbase = web3.eth.coinbase;
    var balanceWei = web3.eth.getBalance(coinbase).toNumber();
    var balance = web3.fromWei(balanceWei, 'ether');
    console.log("balance(ETH):", balance);
});

var withdrawEvent = contract.WithDrawEvent();
withdrawEvent.watch(function (err, result) {
    if (err) {
        console.log(err)
        return;
    }
    console.log("result: ", result);
    console.log("result.args.balance: ", result.args.balance.toNumber());
    console.log("result.args.amountInWei: ", result.args.amountInWei.toNumber());
    console.log("result.args.target: ", result.args.target);
    //withdrawEvent.stopWatching();

    var coinbase = web3.eth.coinbase;
    var balanceWei = web3.eth.getBalance(coinbase).toNumber();
    var balance = web3.fromWei(balanceWei, 'ether');
    console.log("balance(ETH):", balance);
});

const BankContractClient = () => (
    <div>
        <h1>Bank Contract</h1>
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
            onSubmit={(
                values,
                { setSubmitting, setErrors /* setValues and other goodies */ }
            ) => {

                switch (values.action) {
                    case 'deposit':
                        contract.deposit.sendTransaction({ from: web3.eth.coinbase, value: values.amountInWei, gas: 6000000 });
                        break;

                    case 'withdraw':
                        contract.withdraw.sendTransaction(values.amountInWei, { from: web3.eth.coinbase, gas: 6000000 });
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

export default BankContractClient;