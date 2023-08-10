import React from 'react';
import { Slide } from 'react-awesome-reveal';
import styles from '../styles/Recruitment.module.css';
import Image from 'next/image';

const Recruitment = () => {
  return (
    <Slide direction="right" triggerOnce>
      <div className={styles.container}>
        <h2 className={styles.title}>Looking for Collaborators</h2>

        <div className={styles.section1}>
          <div className={styles.imageContainer}>
            <Image src="/recruitment1.png" alt="recruitment1" width={100} height={100} layout="responsive" className={styles.image1} />
          </div>
          <div className={styles.textContainer}>
            <p className={styles.text}>Seeking passionate individuals skilled for this project.
              <br />
              <br />
              Help me revolutionize web exploration. Let&apos;s create something amazing together.</p>
          </div>
        </div>

        <div className={styles.section2}>
          <div className={styles.imageContainer}>
            <Image src="/recruitment2.png" alt="Image 2" width={100} height={100} layout="responsive" className={styles.image2} />
          </div>
          <div className={styles.imageContainer}>
            <Image src="/recruitment3.png" alt="Image 3" width={100} height={100} layout="responsive" className={styles.image3} />
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Recruitment;
