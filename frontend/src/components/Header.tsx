import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.nav}>
      <Image src="/nexusxMainWithSloganLogo.png" alt="logo" className={styles.logo} width="100" height="60" />
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
