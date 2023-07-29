import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from '@react-oauth/google';
import styles from '../styles/UserCreationForm.module.css';
import GreenButton from '../components/GreenButton';
import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

const UserCreationForm = () => {
  const [createUser, { error }] = useMutation(CREATE_USER);
  const [validationError, setValidationError] = useState('');

  const validateForm = (email, password, confirmPassword) => {
    // reset previous error
    setValidationError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setValidationError('Please enter a valid email address.');
      return false;
    }

    if (!password || password.length < 8) {
      setValidationError('Password should be at least 8 characters.');
      return false;
    }

    if (password !== confirmPassword) {
      setValidationError('Password and Confirm Password do not match.');
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirm_password.value;

    if (!validateForm(email, password, confirmPassword)) {
      return;
    }

    createUser({ variables: { email: email, password: password } });
  };

  return (
    <div className={styles.container}>
      <p>Sign in using your account</p>
      <div className={styles.oauthButtons}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
      <p>Or sign up with your email</p>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <input type="email" name="email" className={styles.inputField} placeholder="Email" />
        <input type="password" name="password" className={styles.inputField} placeholder="Password" />
        <input type="password" name="confirm_password" className={styles.inputField} placeholder="Confirm Password" />
        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} />
        <GreenButton text="Sign up" />
      </form>
      {validationError && <p>{validationError}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default UserCreationForm;
