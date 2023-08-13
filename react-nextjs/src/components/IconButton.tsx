import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles//IconButton.module.css';

interface IconButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, children }) => {
  return (
    <button className={styles.circleButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
