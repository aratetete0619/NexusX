import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from '@react-oauth/google';
import styles from '../styles/LoginForm.module.css';
import GreenButton from '../components/GreenButton';
import { useMutation } from '@apollo/client';
import { ErrorContext } from '../contexts/ErrorContext';
import { AuthContext } from '../contexts/AuthContext';
import { setCookie } from 'nookies';
import { LOGIN_USER } from '../graphql/mutations'



const LoginForm = () => {
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const errorContext = useContext(ErrorContext);
  if (!errorContext) {
    throw new Error('ErrorContext not provided');
  }
  const { showError } = errorContext;
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaKey) {
    throw new Error('RECAPTCHA_SITE_KEY is not defined in environment variables');
  }


  const validateForm = (email: string, password: string) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;


    if (!validateForm(email, password)) {
      return;
    }

    try {
      const response = await loginUser({ variables: { email: email, password: password } });
      const token = response.data.loginUser.token;


      setCookie(null, 'token', response.data.loginUser.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      setCookie(null, 'email', response.data.loginUser.email, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      login(token);
      router.push('/explore');
    } catch (error: any) {
      if (error instanceof Error) {
        showError(`Login Failed: ${error.message}`);
      } else {
        showError(`Login Failed`);
      }
    }
  }





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
        <ReCAPTCHA sitekey={recaptchaKey} />
        <GreenButton
          text="Log in"
          onClick={() => { }}
          onMouseDown={() => { }}
        />
      </form>
    </div>
  );
};

export default LoginForm;
