import React from 'react';
import { Slide } from 'react-awesome-reveal';
import Image from 'next/image';
import styles from '../styles/Summary3.module.css';

const Summary3 = () => {
  return (
    <Slide direction="right" triggerOnce>
      <div className={styles.container}>
        <div className={styles.step}>
          <div className={styles.stepImage}>
            <Image src="/summary3.jpg" alt="summary3" className={styles.img} width="1000" height="1000" />
          </div>
          <div className={styles.stepContent}>
            <h2 className={styles.steps}>Your <span className={styles.blue}>Personal</span> Relationship Map</h2>
            <div className={styles.description}>
              The power to create is in your hands. NexusX enables you to build your very own <span className={styles.blue}>relationship map</span>, tailored to your unique interests and questions, giving you a <span className={styles.blue}>personalized</span> exploration experience.
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Summary3;
