// components/PolarNodePopup.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPolarNode } from '../redux/actions';
import styles from '../styles/PolarNodePopup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PolarNodePopup = () => {
  const dispatch = useDispatch();
  const selectedPolarNodeId = useSelector((state) => state.selectedPolarNode);
  const searchResults = useSelector((state) => state.searchResults);

  if (selectedPolarNodeId === null) return null;

  const selectedPolarNode = searchResults.find((node, index) => index === selectedPolarNodeId);

  if (!selectedPolarNode) return null;

  const { labels, properties } = selectedPolarNode.neo4jData;
  const { name, imagePath } = properties;

  const handleClose = () => {
    dispatch(selectPolarNode(null));
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.closeButton} onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </div>
      <div className={styles.titleSection}>
        {imagePath && <img src={`/${imagePath}`} alt={name} className={styles.popupImage} />}
        <h2 className={styles.popupTitle}>{name}</h2>
      </div>
      <p className={styles.popupLabel}>
        <strong>Label</strong>
        <span className={styles.labelValue}>{labels.join(', ')}</span>
      </p>
      <div className={styles.popupDescription}>
        <h3 className={styles.h3Description}>Description</h3>
        <span className={styles.descriptionValue}>{selectedPolarNode.description}</span>
      </div>
    </div>
  );


};

export default PolarNodePopup;
