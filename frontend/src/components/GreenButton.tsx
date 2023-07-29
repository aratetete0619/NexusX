// components/GreenButton.tsx
import React from 'react';
import styles from '../styles/GreenButton.module.css';

const GreenButton = ({ text }: { text: string }) => (
  <button className={styles.customButton}>
    {text}
  </button>
);

export default GreenButton;
