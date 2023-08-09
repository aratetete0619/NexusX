import React from 'react';
import Link from 'next/link';
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
      <Link href="/login">
        <button className={`${styles.customButton} ${styles.login}`}>Login</button>
      </Link>
      <Link href="/explore">
        <button className={styles.customButton}>Try NexusX BETA</button>
      </Link>
    </div>
  </header>
);

export default Header;
