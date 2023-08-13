// src/components/ErrorPopup.tsx
import React, { useContext } from 'react';
import { ErrorContext } from '../contexts/ErrorContext';
import styles from '../styles/ErrorPopup.module.css';

const ErrorPopup = () => {

  const context = useContext(ErrorContext);

  if (!context) {
    return null;
  }

  const { isErrorVisible, errorMessage, hideError } = context;

  if (!isErrorVisible) {
    return null;
  }

  return (
    <div className={styles.errorBackground} onClick={hideError}>
      <div className={styles.errorModal} onClick={e => e.stopPropagation()}>
        <p>
          <span className={styles.errorIcon}>⛔</span>
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

export default ErrorPopup;
