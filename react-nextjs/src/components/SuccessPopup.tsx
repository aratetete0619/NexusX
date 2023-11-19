import React, { useContext } from 'react';
import { SuccessContext } from '../contexts/SuccessContext';
import styles from '../styles/SuccessPopup.module.css';

const SuccessPopup: React.FC = () => {
  const context = useContext(SuccessContext);

  if (context === undefined) {
    return null;
  }

  const { successMessage } = context;

  return (
    successMessage && (
      <div className={styles.successMessage}>
        {successMessage}
      </div>
    )
  );
};

export default SuccessPopup;
