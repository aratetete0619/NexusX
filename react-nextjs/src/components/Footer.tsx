// components/Footer.tsx
import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => (
  <div className={styles.container}>
    <div className={styles.column}>
      <p className={styles.paragraph}>Connect</p>
      <p className={styles.paragraph}>Twitter</p>
      <p className={styles.paragraph}>Instagram</p>
      <p className={styles.paragraph}>Facebook</p>
      <p className={styles.paragraph}>YouTube</p>
    </div>
    <div className={styles.column}>
      <p className={styles.paragraph}>Resources</p>
      <p className={styles.paragraph}>Return Policy</p>
      <p className={styles.paragraph}>FAQs</p>
      <p className={styles.paragraph}>Privacy Policy</p>
      <p className={styles.paragraph}>Customer Support</p>
    </div>
    <div className={styles.column}>
      <p className={styles.paragraph}>About</p>
      <p className={styles.paragraph}>Our Story</p>
      <p className={styles.paragraph}>Press</p>
      <p className={styles.paragraph}>Careers</p>
    </div>
    <p className={styles.copyRight}>2023 ©︎ nexusx</p>
  </div>
);

export default Footer;
