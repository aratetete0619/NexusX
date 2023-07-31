import React, { useContext } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from '@react-oauth/google';
import styles from '../styles/LoginForm.module.css';
import GreenButton from '../components/GreenButton';
import { gql, useMutation } from '@apollo/client';
import { ErrorContext } from '../contexts/ErrorContext';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

const LoginForm = () => {
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const { showError } = useContext(ErrorContext);

  const validateForm = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      showError('Please enter a valid email address');
      return false;
    }

    if (!password || password.length < 8) {
      showError('Password should be at least 8 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    if (!validateForm(email, password)) {
      return;
    }

    try {
      await loginUser({ variables: { email: email, password: password } });
    } catch (error) {
      showError(error.message);
    }
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
            showError('Login Failed');
          }}
        />
      </div>
      <p>Or Sign in with your email</p>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <input type="email" name="email" className={styles.inputField} placeholder="Email" />
        <input type="password" name="password" className={styles.inputField} placeholder="Password" />
        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} />
        <GreenButton text="Log in" />
      </form>
    </div>
  );
};

export default LoginForm;
