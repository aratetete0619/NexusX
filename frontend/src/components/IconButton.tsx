import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles//IconButton.module.css';

const IconButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={styles.circleButton} onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} size="lg" />
    </button>
  );
};

export default IconButton;
