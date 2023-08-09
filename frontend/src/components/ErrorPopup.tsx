// src/components/ErrorPopup.tsx
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ErrorContext } from '../contexts/ErrorContext';
import styles from '../styles/ErrorPopup.module.css';

const ErrorPopup = () => {
  const { isErrorVisible, errorMessage, hideError } = useContext(ErrorContext);

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
