import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import UserInfo from './UserInfo';
import styles from '../styles/LoginHeader.module.css';

const LoginHeader = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      {isLoggedIn && <UserInfo />}
    </header>
  );
};

export default LoginHeader;
