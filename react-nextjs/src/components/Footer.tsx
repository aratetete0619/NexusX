import React from 'react';
import { useTranslation } from 'next-i18next';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const { t } = useTranslation('Footer');

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <p className={styles.paragraph}>{t('connect')}</p>
        <p className={styles.paragraph}>{t('twitter')}</p>
        <p className={styles.paragraph}>{t('instagram')}</p>
        <p className={styles.paragraph}>{t('facebook')}</p>
        <p className={styles.paragraph}>{t('youtube')}</p>
      </div>
      <div className={styles.column}>
        <p className={styles.paragraph}>{t('resources')}</p>
        <p className={styles.paragraph}>{t('returnPolicy')}</p>
        <p className={styles.paragraph}>{t('faqs')}</p>
        <p className={styles.paragraph}>{t('privacyPolicy')}</p>
        <p className={styles.paragraph}>{t('customerSupport')}</p>
      </div>
      <div className={styles.column}>
        <p className={styles.paragraph}>{t('about')}</p>
        <p className={styles.paragraph}>{t('ourStory')}</p>
        <p className={styles.paragraph}>{t('press')}</p>
        <p className={styles.paragraph}>{t('careers')}</p>
      </div>
      <p className={styles.copyRight}>2023 ©︎ nexusx</p>
    </div>
  );
};

export default Footer;
