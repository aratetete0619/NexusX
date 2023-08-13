// components/YellowGreenButton.tsx
import React from 'react';
import styles from '../styles/YellowGreenButton.module.css';

const YellowGreenButton = ({ text }: { text: string }) => (
  <button className={styles.customButton}>
    {text}
  </button>
);

export default YellowGreenButton;
