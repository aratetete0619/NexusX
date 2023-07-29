// src/components/PlanFeatures.tsx

import React from 'react';
import styles from '../styles/PlanFeatures.module.css';

const PlanFeatures = () => {
  return (
    <div className={styles.container}>
      <h2>Plan includes</h2>
      <h3>Unlimited time travel</h3>
      <ul>
        <li><img src="/iconCheck.gif" alt="Checkmark" className={styles.icon} />Personalized Search Engine</li>
        <li><img src="/iconCheck.gif" alt="Checkmark" className={styles.icon} />Transparent Algorithm Insights</li>
        <li><img src="/iconCheck.gif" alt="Checkmark" className={styles.icon} />Unlock Visual Knowledge</li>
      </ul>
    </div>
  );
};

export default PlanFeatures;
