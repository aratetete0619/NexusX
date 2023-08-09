import React, { useContext, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from '@react-oauth/google';
import styles from '../styles/UserCreationForm.module.css';
import GreenButton from '../components/GreenButton';
import { gql, useMutation } from '@apollo/client';
import { ErrorContext } from '../contexts/ErrorContext';
import SuccessPopup from '../components/SuccessPopup';
import { useRouter } from 'next/router';
import { SuccessContext } from '../contexts/SuccessContext';
import Loader from './Loader';
import { CREATE_USER } from '../graphql/mutations';


const UserCreationForm = ({ onLoading }) => {
  const [createUser, { error, loading }] = useMutation(CREATE_USER);
  const { showError } = useContext(ErrorContext);
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { showSuccess } = useContext(SuccessContext);

  const validateForm = (email, password, confirmPassword) => {
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


  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirm_password.value;

    if (!validateForm(email, password, confirmPassword)) {
      return;
    }

    try {
      onLoading(true);
      const response = await createUser({ variables: { email: email, password: password } });
      if (response.errors) {
        showError(response.errors[0].message);
      } else if (!response.data || !response.data.createUser) {
        showError("Failed to receive response from server. Please try again.");
      } else if (response.data.createUser.message) {
        showSuccess(response.data.createUser.message);
        // Display the success popup when user creation is successful
        setSuccessMessage(response.data.createUser.message);
        setShowSuccessPopup(true);
      }

    } catch (error) {
      // リクエストレベルのエラーをハンドリングします
      showError(error.message);
    } finally {
      onLoading(false);
    }
  };







  return (
    <div className={styles.container}>
      <p>Sign up using your account</p>
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
      <p>Or sign up with your email</p>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <input type="email" name="email" className={styles.inputField} placeholder="Email" disabled={onLoading} />
        <input type="password" name="password" className={styles.inputField} placeholder="Password" disabled={onLoading} />
        <input type="password" name="confirm_password" className={styles.inputField} placeholder="Confirm Password" disabled={onLoading} />
        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} disabled={onLoading} />
        <GreenButton text="Sign up" disabled={onLoading} />
      </form>
      {loading && <Loader />}
      {showSuccessPopup && <SuccessPopup message={successMessage} />}
    </div>
  );
};

export default UserCreationForm;
