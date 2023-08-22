import React from 'react';
import { Slide } from 'react-awesome-reveal';
import Image from 'next/image';
import styles from '../styles/Summary1.module.css';
import { useTranslation } from 'next-i18next';

const Summary1 = () => {
  const { t } = useTranslation('Summary1');

  const renderWithTags = (text: string) => {
    const parts = text.split(/(<span className={styles.pink}>|<\/span>|<br \/>)/g);
    let isPink = false;
    return parts.map((part, index) => {
      if (part === '<span className={styles.pink}>') {
        isPink = true;
        return null;
      }
      if (part === '</span>') {
        isPink = false;
        return null;
      }
      if (part === '<br />') {
        return <br key={index} />;
      }
      if (isPink) {
        return <span className={styles.pink} key={index}>{part}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };


  return (
    <Slide direction="right" triggerOnce >
      <div className={styles.container}>
        <h2 className={styles.title}>{t('title')}</h2>
        <div className={styles.step}>
          <div className={styles.stepImage}>
            <Image src="/summary1.jpg" alt="summary1" className={styles.img} width="1000" height="1000" />
          </div>
          <div className={styles.stepContent}>
            <h2 className={styles.steps}>{renderWithTags(t('steps'))}</h2>
            <div className={styles.description}>{renderWithTags(t('description'))}</div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Summary1;
