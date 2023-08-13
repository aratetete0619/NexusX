// components/Features.tsx
import React from 'react';
import { Slide } from 'react-awesome-reveal';
import styles from '../styles/Features.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faNetworkWired, faUserCheck, faCloudArrowUp, faHeart, faCoins } from '@fortawesome/free-solid-svg-icons';

const features = [
  { title: 'Explore', description: 'Uncover intricate connections in a network, visualized from your search, in an instant.', icon: faGlobe },
  { title: 'Optimization', description: 'Enhance your exploration with AI-powered tools, refining and clarifying complex relationship diagrams.', icon: faNetworkWired },
  { title: 'Registration', description: 'Sign up to create and save your unique relationship diagrams, personalizing your exploration experience.', icon: faUserCheck },
  { title: 'Uploads', description: 'Import your own data to generate custom relationship diagrams, expanding your exploration possibilities.', icon: faCloudArrowUp },
  { title: 'Favorites', description: 'Save and revisit your favorite relationship diagrams, keeping your most intriguing discoveries at your fingertips.', icon: faHeart },
  { title: 'Earning', description: "Your uploaded search algorithms and popular nodes can also earn you rewards. Make your exploration profitable", icon: faCoins },
];

const Features = () => {
  return (
    <Slide direction="up" triggerOnce>
      <div className={styles.container}>
        {features.map((feature, index) => (
          <div className={styles.feature} key={index}>
            <h2 className={styles.title}><FontAwesomeIcon icon={feature.icon} className={styles.icon} /> {feature.title}</h2>
            <p className={styles.description}>{feature.description}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
};

export default Features;
