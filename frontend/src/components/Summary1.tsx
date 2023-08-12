import React from 'react';
import { Slide } from 'react-awesome-reveal';
import Image from 'next/image';
import styles from '../styles/Summary1.module.css';

const Summary1 = () => {
  return (
    <Slide direction="right" triggerOnce >
      <div className={styles.container}>
        <h2 className={styles.title}>STEPS TO DISCOVER</h2>
        <div className={styles.step}>
          <div className={styles.stepImage}>
            <Image src="/summary1.jpg" alt="summary1" className={styles.img} width="1000" height="1000" />
          </div>
          <div className={styles.stepContent}>
            <h2 className={styles.steps}>Unveil the <span className={styles.pink}>World</span> Relations</h2>
            <div className={styles.description}>
              Dive into the myriad of connections.
              <br />NexusX <span className={styles.pink}>visualizes</span> based on your search.
              <br />From relationships among movie characters, celebrity interactions,
              <br />to the ties between technologies, <span className={styles.pink}>explore</span> it all intuitively.
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Summary1;
