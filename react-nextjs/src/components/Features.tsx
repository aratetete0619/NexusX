import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { useTranslation } from 'next-i18next';
import styles from '../styles/Features.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faNetworkWired, faUserCheck, faCloudArrowUp, faHeart, faCoins } from '@fortawesome/free-solid-svg-icons';

type Feature = {
  title: string;
  description: string;
};

const Features = () => {
  const { t } = useTranslation('Features');
  const featuresData: Feature[] = t('features', { returnObjects: true }) as Feature[];

  const icons = [faGlobe, faNetworkWired, faUserCheck, faCloudArrowUp, faHeart, faCoins];

  return (
    <Slide direction="up" triggerOnce>
      <div className={styles.container}>
        {featuresData.map((feature: any, index: number) => (
          <div className={styles.feature} key={index}>
            <h2 className={styles.title}>
              <FontAwesomeIcon icon={icons[index]} className={styles.icon} /> {feature.title}
            </h2>
            <p className={styles.description}>{feature.description}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
};

export default Features;
