// ColorPickerPopup.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor, setBackgroundColor, hidePicker } from '../redux/actions';
import { RootState } from '../redux/reducers';
import styles from '../styles/ColorPickerPopup.module.css';
import { fixedColors } from '../utils/fixedColors'
interface ColorPickerPopupProps {
  colorType: 'color' | 'background';
}

const ColorPickerPopup: React.FC<ColorPickerPopupProps> = ({ colorType }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('colors');
  const primaryColors = useSelector((state: RootState) => state.primaryColors);
  const colors = {
    'Recently Used': primaryColors,
    ...fixedColors
  };


  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (colorType === 'color') {
      dispatch(setColor(e.target.value));
    } else if (colorType === 'background') {
      dispatch(setBackgroundColor(e.target.value));
    }
  };


  return (
    <div
      className={styles.colorPickerPopup}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.colorPickerTabs}>
        <button onClick={() => setTab('colors')}>Colors</button>
        <button onClick={() => setTab('picker')}>Picker</button>
      </div>
      {tab === 'colors' && (
        <div className={styles.colorPickerColors}>
          {Object.entries(colors).map(([category, colorList]) => (
            <div key={category}>
              <h3>{category}</h3>
              <div className={styles.colorPickerRow}>
                {colorList.map((color: string, index: number) => (
                  <div
                    key={index}
                    className={styles.colorPickerColor}
                    style={{ backgroundColor: color }}
                    onClick={(event) => {
                      if (colorType === 'color') {
                        dispatch(setColor(color));
                      } else if (colorType === 'background') {
                        dispatch(setBackgroundColor(color));
                      }
                      dispatch(hidePicker(colorType));
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === 'picker' && (
        <div className={styles.colorPickerPicker}>
          <input type="color" onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPickerPopup;
