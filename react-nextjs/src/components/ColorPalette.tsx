import React from 'react';
import { useDispatch, useSelector } from '../hooks/hooks';
import { RootState } from '../redux/reducers';
import { setColor, setBackgroundColor } from '../redux/actions';
import styles from '../styles/colorPalette.module.css';

const ColorPalette: React.FC<{ paletteType: 'color' | 'background' }> = ({ paletteType }) => {
  const dispatch = useDispatch();
  const primaryColors = useSelector((state: RootState) => state.primaryColors);
  const primaryBackgroundColors = useSelector((state: RootState) => state.primaryBackgroundColors);
  const colors = paletteType === 'color' ? primaryColors : primaryBackgroundColors;


  const handleColorClick = (color: string) => {
    if (paletteType === 'color') {
      dispatch(setColor(color));
    } else if (paletteType === 'background') {
      dispatch(setBackgroundColor(color));
    }
  };


  return (
    <div className={styles.paletteContainer}>
      {colors.map((color: string, index: number) => (
        <div
          key={index}
          className={styles.paletteColor}
          style={{ backgroundColor: color }}
          onClick={(event) => {
            event.stopPropagation();
            handleColorClick(color);
          }}
          data-testid="palette-color"
        />
      ))}
    </div>
  );
};

export default ColorPalette;
