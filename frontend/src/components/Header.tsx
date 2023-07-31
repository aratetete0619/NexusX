import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.nav}>
      <img src="nexusxMainWithSloganLogo.png" alt="logo" className={styles.logo} />
      <nav className={styles.navLinks}>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#feedback">Feedback</a>
      </nav>
    </div>
    <div className={styles.buttonGroup}>
      <button className={`${styles.customButton} ${styles.login}`}>Login</button>
      <button className={styles.customButton}>Try NexusX BETA</button>
    </div>
  </header>
);

export default Header;
