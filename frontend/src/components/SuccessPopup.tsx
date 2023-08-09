import React, { useContext } from 'react';
import { SuccessContext } from '../contexts/SuccessContext';
import styles from '../styles/SuccessPopup.module.css';

const SuccessPopup = () => {
  const context = useContext(SuccessContext);

  if (context === undefined) {
    return null;
  }

  const { successMessage } = context;

  console.log('Rendering SuccessMessage with:', successMessage);
  return (
    successMessage && (
      <div className={styles.successMessage}>
        {successMessage}
      </div>
    )
  );
};



export default SuccessPopup;
