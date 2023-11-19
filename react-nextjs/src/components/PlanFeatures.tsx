import React from 'react';
import Image from 'next/image';
import styles from '../styles/PlanFeatures.module.css';

const PlanFeatures = () => {
  return (
    <div className={styles.container}>
      <h2>Plan includes</h2>
      <h3>Unlimited time travel</h3>
      <ul>
        <li><Image src="/iconCheck.gif" alt="Checkmark" className={styles.icon} width="20" height="20" />Personalized Search Engine</li>
        <li><Image src="/iconCheck.gif" alt="Checkmark" className={styles.icon} width="20" height="20" />Transparent Algorithm Insights</li>
        <li><Image src="/iconCheck.gif" alt="Checkmark" className={styles.icon} width="20" height="20" />Unlock Visual Knowledge</li>
      </ul>
    </div>
  );
};

export default PlanFeatures;
