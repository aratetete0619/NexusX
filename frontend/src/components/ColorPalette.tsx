// ColorPalette.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { setColor, setBackgroundColor } from '../redux/actions';
import '../styles/ColorPalette.css';

const ColorPalette: React.FC<{ paletteType: 'color' | 'background' }> = ({ paletteType }) => {
  const dispatch = useDispatch();
  const primaryColors = useSelector((state: RootState) => state.primaryColors);
  const primaryBackgroundColors = useSelector((state: RootState) => state.primaryBackgroundColors);

  // Use primaryColors or primaryBackgroundColors based on the paletteType
  const colors = paletteType === 'color' ? primaryColors : primaryBackgroundColors;

  const handleColorClick = (color) => {

    // Dispatch the appropriate action based on the paletteType
    if (paletteType === 'color') {
      dispatch(setColor(color));
    } else if (paletteType === 'background') {
      dispatch(setBackgroundColor(color));
    }
  };

  return (
    <div className="palette-container">
      {colors.map((color, index) => (
        <div
          key={index}
          className="palette-color"
          style={{ backgroundColor: color }}
          onClick={(event) => {
            event.stopPropagation();
            handleColorClick(color);
          }}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
