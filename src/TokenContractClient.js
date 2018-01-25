import React from 'react';
import { Formik } from 'formik';
import TokenContract from './TokenContract.js';



const TokenContractClient = () => (
    <div>
        <h1>Token Contract</h1>
        <Formik
            initialValues={{
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

                var Web3 = require('web3');
                var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
                var contract = web3.eth.contract(TokenContract.ABI).at(TokenContract.address);

                const balance = await contract.balanceOf.call(web3.eth.coinbase);
                console.log("balance:", balance.toNumber());
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
                        <button type="submit" >
                            Submit
                        </button>
                    </form>
                )}
        />
    </div>
)

export default TokenContractClient;