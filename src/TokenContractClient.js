import React from 'react';
import { Formik } from 'formik';
import TokenContract from './contracts/TokenContract.js';



const TokenContractClient = (props) => {
    const { web3js } = props;

    return (
        <div>
            <h2>Token Contract</h2>
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

                    var contract = web3js.eth.contract(TokenContract.ABI).at(TokenContract.address);

                    const balance = await contract.balanceOf.call(web3js.eth.coinbase);
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
    );
}

export default TokenContractClient;