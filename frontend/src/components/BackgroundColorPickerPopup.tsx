import React, { useState } from 'react';
import { useDispatch, useSelector } from '../hooks/hooks'
import { setBackgroundColor } from '../redux/actions';
import { RootState } from '../redux/reducers';
import styles from '../styles/ColorPickerPopup.module.css';
import { fixedColors } from '../utils/fixedColors'


const BackgroundColorPickerPopup: React.FC = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('colors');
  const primaryColors = useSelector((state: RootState) => state.primaryColors);
  const colors = {
    'Recently Used': primaryColors,
    ...fixedColors
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBackgroundColor(e.target.value));
  };

  return (
    <div
      className={styles.colorPickerPopup}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.colorPickerTabs} >
        <button onClick={() => setTab('colors')}>Colors</button>
        <button onClick={() => setTab('picker')}>Picker</button>
      </div>
      {tab === 'colors' && (
        <div className={styles.colorPickerColors} onClick={(event) => event.stopPropagation()}>
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
                      dispatch(setBackgroundColor(color));
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === 'picker' && (
        <div className={styles.colorPickerPicker} onClick={(event) => event.stopPropagation()}>
          <input type="color" onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default BackgroundColorPickerPopup;
