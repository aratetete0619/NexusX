import React, { useContext } from 'react';
import styles from '../styles/NoResultPopup.module.css';
import { NoResultContext } from '../contexts/NoResultContext';

const NoResultPopup = () => {
  const { hideNoResult, noResultMessage, isNoResultVisible } = useContext(NoResultContext);

  const handleContainerClick = () => {
    hideNoResult();
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  if (!isNoResultVisible) {
    return null;
  }

  return (
    <div className={styles.popupContainer} onClick={handleContainerClick}>
      <div className={styles.popupContent} onClick={handleContentClick}>
        <p className={styles.popupMessage}>{noResultMessage}</p>
      </div>
    </div>
  );
};


export default NoResultPopup;
