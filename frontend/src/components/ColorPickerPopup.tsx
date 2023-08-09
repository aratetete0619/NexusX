// ColorPickerPopup.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor, setBackgroundColor, hidePicker } from '../redux/actions';
import { RootState } from '../redux/reducers';
import '../styles/ColorPickerPopup.css';


const ColorPickerPopup = ({ colorType }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('colors');
  const primaryColors = useSelector((state: RootState) => state.primaryColors);
  const showPickerState = useSelector(
    (state: RootState) => state.showPicker[colorType]
  );

  const colors = {
    'Recently Used': primaryColors,
    'Plus': ['#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'],
    'Project Colors': ['#795548', '#9E9E9E', '#607D8B', '#000000', '#FFFFFF', '#E0E0E0', '#9E9E9E', '#795548'],
    'Monochrome Colors': ['#000000', '#424242', '#616161', '#757575', '#9E9E9E', '#BDBDBD', '#E0E0E0', '#FFFFFF'],
    'Vibrant Colors': ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'],
    'Pastel Colors': ['#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'],
    'Darker Colors': ['#795548', '#9E9E9E', '#607D8B', '#000000', '#FFFFFF', '#E0E0E0', '#9E9E9E', '#795548'],
  };

  const handleColorChange = (e) => {
    if (colorType === 'color') {
      dispatch(setColor(e.target.value));
    } else if (colorType === 'background') {
      dispatch(setBackgroundColor(e.target.value));
    }
  };


  return (
    <div
      className="color-picker-popup"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="color-picker-tabs">
        <button onClick={() => setTab('colors')}>Colors</button>
        <button onClick={() => setTab('picker')}>Picker</button>
      </div>

      {tab === 'colors' && (
        <div className="color-picker-colors">
          {Object.entries(colors).map(([category, colorList]) => (
            <div key={category}>
              <h3>{category}</h3>
              <div className="color-picker-row">
                {colorList.map((color, index) => (
                  <div
                    key={index}
                    className="color-picker-color"
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
        <div className="color-picker-picker">
          <input type="color" onChange={handleColorChange} />
        </div>
      )}


    </div>
  );
};

export default ColorPickerPopup;
