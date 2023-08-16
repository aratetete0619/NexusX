import React, { useContext, useState } from 'react';
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from '@react-oauth/google';
import styles from '../styles/UserCreationForm.module.css';
import GreenButton from '../components/GreenButton';
import { useMutation } from '@apollo/client';
import { ErrorContext } from '../contexts/ErrorContext';
import SuccessPopup from '../components/SuccessPopup';
import { useRouter } from 'next/router';
import { SuccessContext } from '../contexts/SuccessContext';
import Loader from './Loader';
import { CREATE_USER, AUTHENTICATE_WITH_GOOGLE } from '../graphql/mutations';
import { setCookie } from 'nookies';
import { AuthContext } from '../contexts/AuthContext';


const UserCreationForm = ({ onLoading }: { onLoading: (isLoading: boolean) => void }) => {
  const [createUser, { error, loading }] = useMutation(CREATE_USER);
  const [googleLogin, { error: googleLoginError, loading: googleLoginLoading }] = useMutation(AUTHENTICATE_WITH_GOOGLE);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { login } = useContext(AuthContext);
  const errorContext = useContext(ErrorContext);
  if (!errorContext) {
    throw new Error('ErrorContext not provided');
  }
  const { showError } = errorContext;
  const successContext = useContext(SuccessContext);
  if (!successContext) {
    throw new Error('ErrorContext not provided');
  }
  const { showSuccess } = successContext;



  const validateForm = (email: string, password: string, confirmPassword: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      showError('Please enter a valid email address');
      return false;
    }

    if (!password || password.length < 8) {
      showError('Password should be at least 8 characters');
      return false;
    }

    if (password !== confirmPassword) {
      showError('Password and Confirm Password do not match');
      return false;
    }

    return true;
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const emailElement = form.elements.namedItem('email') as HTMLInputElement;
    const passwordElement = form.elements.namedItem('password') as HTMLInputElement;
    const confirmPasswordElement = form.elements.namedItem('confirm_password') as HTMLInputElement;

    const email = emailElement.value;
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;

    if (!validateForm(email, password, confirmPassword)) {
      return;
    }

    try {
      setIsLoading(true);
      onLoading(true);
      const response = await createUser({ variables: { email: email, password: password } });
      if (response.errors) {
        showError(response.errors[0].message);
      } else if (!response.data || !response.data.createUser) {
        showError("Failed to receive response from server. Please try again.");
      } else if (response.data.createUser.message) {
        showSuccess(response.data.createUser.message);
        setSuccessMessage(response.data.createUser.message);
        setShowSuccessPopup(true);
      }

    } catch (error) {
      console.error(error);
      const errorMessage = (error as { message?: string }).message;
      showError(errorMessage || 'An error occurred');
    } finally {
      setIsLoading(false);
      onLoading(false);
    }
  };


  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const tokenId = credentialResponse.credential;


      const response = await googleLogin({ variables: { tokenId } });

      if (response.data && response.data.authenticateWithGoogle) {
        const { token, email } = response.data.authenticateWithGoogle;

        setCookie(null, 'token', token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        setCookie(null, 'email', email, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        login(token);

        router.push('/explore');

      } else {
        showError('Failed to authenticate with Google.');
      }
    } catch (error: any) {
      if (error instanceof Error) {
        showError(`Google Login Failed: ${error.message}`);
      } else {
        showError(`Google Login Failed`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <p>Sign up using your account</p>
      <div className={styles.oauthButtons}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            showError('Login Failed');
          }}
        />
      </div>
      <p>Or sign up with your email</p>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <input type="email" name="email" className={styles.inputField} placeholder="Email" disabled={isLoading} />
        <input type="password" name="password" className={styles.inputField} placeholder="Password" disabled={isLoading} />
        <input type="password" name="confirm_password" className={styles.inputField} placeholder="Confirm Password" disabled={isLoading} />
        {!isLoading && <ReCAPTCHA sitekey={siteKey} />}
        {!isLoading && <GreenButton text="Sign up" />}
      </form>
      {loading && <Loader />}
      {showSuccessPopup && <SuccessPopup />}

      <div className={styles.redirectLink}>
        <p>Already a user? <Link href="/login">Sign in here</Link></p>
      </div>
    </div>
  );
};

export default UserCreationForm;
