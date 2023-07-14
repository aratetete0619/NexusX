// src/redux/actions/colorActions.ts
import {
  SET_COLOR,
  SET_BACKGROUND_COLOR,
  SET_PRIMARY_COLORS,
  INCREMENT_COLOR_FREQUENCY,
  UPDATE_PRIMARY_COLORS,
  INCREMENT_BACKGROUND_COLOR_FREQUENCY,
  UPDATE_BACKGROUND_PRIMARY_COLORS,
  SHOW_PICKER,
  HIDE_PICKER,
  TOGGLE_PICKER,
} from './actionTypes';


// src/redux/actions/colorActions.ts
const FREQUENCY_THRESHOLD = 10;

// 新しい showPicker アクション
export const showPicker = (pickerType: 'color' | 'background') => ({
  type: SHOW_PICKER,
  payload: pickerType,
});

// 新しい hidePicker アクション
export const hidePicker = (pickerType: 'color' | 'background') => ({
  type: HIDE_PICKER,
  payload: pickerType,
});


export const setColor = (color) => {
  return (dispatch) => {
    // Dispatch the regular setColor action
    dispatch({
      type: SET_COLOR,
      payload: color,
    });

    // Dispatch the INCREMENT_COLOR_FREQUENCY action to update color frequency
    dispatch(incrementColorFrequency(color));

    // Dispatch the UPDATE_PRIMARY_COLORS action to update primary colors if necessary
    dispatch(updatePrimaryColors());
  };
};


export const incrementColorFrequency = (color) => ({
  type: INCREMENT_COLOR_FREQUENCY,
  payload: color
});

export const updatePrimaryColors = () => (dispatch, getState) => {
  const colorFrequencyMap = getState().colorFrequencyMap;

  // Convert the frequency map to an array of [color, frequency] pairs
  const colorFrequencyPairs = Object.entries(colorFrequencyMap);

  // Sort the array by frequency in descending order
  colorFrequencyPairs.sort((a, b) => b[1] - a[1]);

  // Retrieve the colors of the top N pairs
  const primaryColors = colorFrequencyPairs
    .filter(([_, frequency]) => frequency > FREQUENCY_THRESHOLD)
    .map(([color, _]) => color);

  // If there are more than 6 primary colors, remove the ones with the lowest frequency
  while (primaryColors.length > 6) {
    primaryColors.pop();
  }

  // Only update the primary colors if there are any colors that exceeded the frequency threshold
  if (primaryColors.length > 0) {
    dispatch({
      type: UPDATE_PRIMARY_COLORS,
      payload: primaryColors,
    });
  }
};


export const setBackgroundColor = (color) => {
  return (dispatch) => {
    dispatch({
      type: SET_BACKGROUND_COLOR,
      payload: color,
    });

    dispatch(incrementBackgroundColorFrequency(color));

    dispatch(updateBackgroundPrimaryColors());
  };
};

export const incrementBackgroundColorFrequency = (color) => ({
  type: INCREMENT_BACKGROUND_COLOR_FREQUENCY,
  payload: color
});

export const updateBackgroundPrimaryColors = () => (dispatch, getState) => {
  const backgroundColorFrequencyMap = getState().backgroundColorFrequencyMap;

  const backgroundColorFrequencyPairs = Object.entries(backgroundColorFrequencyMap);

  backgroundColorFrequencyPairs.sort((a, b) => b[1] - a[1]);

  const primaryBackgroundColors = backgroundColorFrequencyPairs
    .filter(([_, frequency]) => frequency > FREQUENCY_THRESHOLD)
    .map(([color, _]) => color);

  while (primaryBackgroundColors.length > 6) {
    primaryBackgroundColors.pop();
  }

  if (primaryBackgroundColors.length > 0) {
    dispatch({
      type: UPDATE_BACKGROUND_PRIMARY_COLORS,
      payload: primaryBackgroundColors,
    });
  }
};

export const setPrimaryColors = (colors) => ({
  type: SET_PRIMARY_COLORS,
  payload: colors
});

export const togglePicker = (pickerType: 'color' | 'background') => ({
  type: TOGGLE_PICKER,
  payload: pickerType,
});
