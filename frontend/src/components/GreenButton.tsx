// components/GreenButton.tsx
import React from 'react';
import styles from '../styles/GreenButton.module.css';

const GreenButton = ({
  text,
  onClick,
  onMouseDown,
  className,
}: {
  text: string;
  onClick: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  className?: string;
}) => (
  <button className={`${styles.customButton} ${className}`} onClick={onClick} onMouseDown={onMouseDown}>
    {text}
  </button>
);

export default GreenButton;
