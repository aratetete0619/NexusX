import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import styles from '../styles/Background.module.css';

const Background = () => {
  const { t } = useTranslation('Background');

  const renderWithBreaks = (text: string) => {
    return text.split('<br />').map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < text.split('<br />').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.slogan}>
        <h1>{t('title')}</h1>
        <h2>{renderWithBreaks(t('subtitle'))}</h2>
        <Link href="/explore">
          <button className={styles.customButton}>{t('button')}</button>
        </Link>
      </div>
    </div>
  );
};

export default Background;
