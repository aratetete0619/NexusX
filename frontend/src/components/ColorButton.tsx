import React from 'react';
import '../styles/ColorButton.css';

interface ColorButtonProps {
  color: string;
  onClick: () => void;
}

const ColorButton: React.FC<ColorButtonProps> = ({ color, onClick }) => {

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the document
    onClick();
  };

  return (
    <div className="color-button-container" onClick={handleClick}>
      <div className="color-button" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default ColorButton;
