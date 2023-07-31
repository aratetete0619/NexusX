import LoginForm from '../src/components/LoginForm';
import RandomTitle from '../src/components/RandomTitle';
import styles from '../src/styles/login.module.css';

const LoginPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftSection}>
        <RandomTitle />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.header}>
          <h1>Sign in</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
