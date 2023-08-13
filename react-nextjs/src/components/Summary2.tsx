import React from 'react';
import { Slide } from 'react-awesome-reveal';
import Image from 'next/image';
import styles from '../styles/Summary2.module.css';

const Summary2 = () => {

  return (
    <Slide direction="left" triggerOnce>
      <div className={styles.container}>
        <div className={styles.step}>
          <div className={styles.stepContent}>
            <h2 className={styles.steps}><span className={styles.green}>Algorithm</span> Visualization</h2>
            <div className={styles.description}>
              Not just results,
              <br />we make <span className={styles.green}>processes</span> transparent too.
              <br />NexusX allows you to visualize <span className={styles.green}>algorithms</span> working behind the scenes, enhancing your trust and understanding.
            </div>
          </div>
          <div className={styles.stepImage}>
            <Image src="/summary2-3.jpg" alt="summary1" className={styles.img} width="1000" height="1000" />
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Summary2;
