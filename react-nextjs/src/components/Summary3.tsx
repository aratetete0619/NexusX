import React from 'react';
import { Slide } from 'react-awesome-reveal';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import styles from '../styles/Summary3.module.css';

const Summary3 = () => {
  const { t } = useTranslation('Summary3');

  const renderWithHTML = (text: string) => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: text.replace(
            /<span className={styles.blue}>/g,
            `<span class="${styles.blue}">`
          ),
        }}
      />
    );
  };

  return (
    <Slide direction="right" triggerOnce>
      <div className={styles.container}>
        <div className={styles.step}>
          <div className={styles.stepImage}>
            <Image src="/summary3.jpg" alt="summary3" className={styles.img} width="1000" height="1000" />
          </div>
          <div className={styles.stepContent}>
            <h2 className={styles.steps}>{renderWithHTML(t('title'))}</h2>
            <div className={styles.description}>{renderWithHTML(t('description'))}</div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Summary3;
