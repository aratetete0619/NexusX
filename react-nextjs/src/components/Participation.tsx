import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { useTranslation } from 'next-i18next';
import styles from '../styles/Participation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons';

const Participation = () => {
  const { t } = useTranslation('Participation');

  return (
    <Slide direction="up" triggerOnce>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('title')}</h2>

        <div className={styles.icons}>
          <FontAwesomeIcon icon={faYoutube} size="8x" className={styles.icon} />
          <FontAwesomeIcon icon={faDiscord} size="8x" className={styles.icon} />
        </div>
      </div>
    </Slide>
  );
};

export default Participation;
