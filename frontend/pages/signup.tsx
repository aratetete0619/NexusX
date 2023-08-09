// pages/signup.tsx

import React, { useState } from 'react';
import UserCreationForm from '../src/components/UserCreationForm';
import PlanFeatures from '../src/components/PlanFeatures';
import Loader from '../src/components/Loader';
import styles from '../src/styles/Signup.module.css';

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      <div className={styles.leftSection}>
        <PlanFeatures />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.header}>
          <h1>Sign Up</h1>
          <img src="nexusxLogo.png" alt="nexusx logo" className={styles.logo} />
        </div>
        <UserCreationForm onLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default SignUpPage;
