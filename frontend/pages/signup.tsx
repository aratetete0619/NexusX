// pages/signup.tsx

import UserCreationForm from '../src/components/UserCreationForm';
import PlanFeatures from '../src/components/PlanFeatures';
import styles from '../src/styles/Signup.module.css';

const SignUpPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <PlanFeatures />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.header}>
          <h1>Sign Up</h1>
          <img src="nexusxLogo.png" alt="nexusx logo" className={styles.logo} />
        </div>
        <UserCreationForm />
      </div>
    </div>
  );
};

export default SignUpPage;
