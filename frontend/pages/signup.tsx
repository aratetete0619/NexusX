
import React, { useState } from 'react';
import UserCreationForm from '../src/components/UserCreationForm';
import PlanFeatures from '../src/components/PlanFeatures';
import Loader from '../src/components/Loader';
import Image from 'next/image';
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
          <Image src="/nexusxLogo.png" alt="nexusx logo" className={styles.logo} width="100" height="90" />
        </div>
        <UserCreationForm onLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default SignUpPage;
