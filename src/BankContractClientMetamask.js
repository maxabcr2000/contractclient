import React from 'react';
import { Formik, Field } from 'formik';
import BankContract from './BankContract.js';

var web3js, contract, depositEvent, withdrawEvent;
var Web3 = require('web3');

window.addEventListener('load', function () {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {

        // Use Mist/MetaMask's provider
        web3js = new Web3(window.web3.currentProvider);
        contract = web3js.eth.contract(BankContract.ABI).at(BankContract.address);

        web3js.version.getNetwork((err, netId) => {
            switch (netId) {
                case "1":
                    console.log('This is mainnet')
                    break
                case "2":
                    console.log('This is the deprecated Morden test network.')
                    break
                case "3":
                    console.log('This is the ropsten test network.')
                    break
                case "4":
                    console.log('This is the Rinkeby test network.')
                    break
                case "42":
                    console.log('This is the Kovan test network.')
                    break
                default:
                    console.log('This is an unknown network.')
            }
        })

        if (depositEvent !== undefined) {
            depositEvent = contract.DepositEvent();
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

                var coinbase = web3js.eth.coinbase;
                var balanceWei = web3js.eth.getBalance(coinbase, function (error, result) {
                    if (!error)
                        console.log(result)
                    else
                        console.error(error);
                })
                // var balance = web3js.fromWei(balanceWei, 'ether');
                // console.log("balance(ETH):", balance);
            });
        }

        if (withdrawEvent !== undefined) {
            withdrawEvent = contract.WithDrawEvent();
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

                var coinbase = web3js.eth.coinbase;
                var balanceWei = web3js.eth.getBalance(coinbase, function (error, result) {
                    if (!error)
                        console.log(result)
                    else
                        console.error(error);
                });
                // var balance = web3js.fromWei(balanceWei, 'ether');
                // console.log("balance(ETH):", balance);
            });
        }
    }
});




const BankContractClientMetamask = () => (
    <div>
        <h1>Bank Contract(Metamask)</h1>
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

export default BankContractClientMetamask;