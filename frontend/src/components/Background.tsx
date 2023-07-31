import React from 'react';
import styles from '../styles/Background.module.css';

const Background = () => (
  <div className={styles.container}>
    <div className={styles.slogan}>
      <h1>New Way to Explore Web</h1>
      <h2>AI-powered tool for visualizing complex relationships
        <br />
        And Simplifying web exploration</h2>
      <button className={styles.customButton}>Try NexusX BETA</button>
    </div>
  </div>
);

export default Background;
