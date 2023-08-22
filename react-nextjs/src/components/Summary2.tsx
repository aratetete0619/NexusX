import React from 'react';
import { Slide } from 'react-awesome-reveal';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import styles from '../styles/Summary2.module.css';

const Summary2 = () => {
  const { t } = useTranslation('Summary2');

  const renderWithHTML = (text: string) => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: text.replace(
            /<span className={styles.green}>/g,
            `<span class="${styles.green}">`
          ),
        }}
      />
    );
  };

  return (
    <Slide direction="left" triggerOnce>
      <div className={styles.container}>
        <div className={styles.step}>
          <div className={styles.stepContent}>
            <h2 className={styles.steps}>{renderWithHTML(t('title'))}</h2>
            <div className={styles.description}>{renderWithHTML(t('description'))}</div>
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
