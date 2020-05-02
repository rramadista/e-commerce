import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
    googleSignInStart,
    emailSignInStart,
} from '../../services/redux/user/user.actions';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
    });

    const { email, password } = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();
        emailSignInStart(email, password);
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    handleChange={handleChange}
                    label='email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    handleChange={handleChange}
                    label='password'
                    required
                />
                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton
                        type='button'
                        onClick={googleSignInStart}
                        isGoogleSignIn
                    >
                        Sign In with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
