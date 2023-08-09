import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from '@react-oauth/google';
import styles from '../styles/LoginForm.module.css';
import GreenButton from '../components/GreenButton';
import { gql, useMutation } from '@apollo/client';
import { ErrorContext } from '../contexts/ErrorContext';
import { AuthContext } from '../contexts/AuthContext';
import { setCookie } from 'nookies';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;

const LoginForm = () => {
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const { showError } = useContext(ErrorContext);
  const router = useRouter();
  const { login } = useContext(AuthContext);

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
      const response = await loginUser({ variables: { email: email, password: password } });


      setCookie(null, 'token', response.data.loginUser.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      setCookie(null, 'email', response.data.loginUser.email, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      login();
      router.push('/explore');
    } catch (error) {
      // ログインが失敗したときのエラーメッセージを表示
      showError(`Login Failed: ${error.message}`);
      // ユーザーをログインページにリダイレクトせず、エラーメッセージを表示したままにします
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
