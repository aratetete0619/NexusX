import React from 'react';
import styles from '../styles/ColorButton.module.css';

interface ColorButtonProps {
  color: string;
  onClick: () => void;
}

const ColorButton: React.FC<ColorButtonProps> = ({ color, onClick }) => {

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className={styles.colorButtonContainer} onClick={handleClick} data-testid="color-button-container">
      <div className={styles.colorButton} style={{ backgroundColor: color }} data-testid="color-button"></div>
    </div>
  );
};

export default ColorButton;
