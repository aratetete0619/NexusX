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
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';



const FREQUENCY_THRESHOLD = 10;

export const showPicker = (pickerType: 'color' | 'background') => ({
  type: SHOW_PICKER,
  payload: pickerType,
});

export const hidePicker = (pickerType: 'color' | 'background') => ({
  type: HIDE_PICKER,
  payload: pickerType,
});


export const setColor = (color: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_COLOR,
      payload: color,
    });

    dispatch(incrementColorFrequency(color));

    dispatch(updatePrimaryColors());
  };
};


export const incrementColorFrequency = (color: string) => ({
  type: INCREMENT_COLOR_FREQUENCY,
  payload: color
});

export const updatePrimaryColors = (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState) => {
    const colorFrequencyMap = getState().colorFrequencyMap;

    const colorFrequencyPairs = Object.entries(colorFrequencyMap) as [string, number][];

    colorFrequencyPairs.sort((a, b) => b[1] - a[1]);

    const primaryColors = colorFrequencyPairs
      .filter(([_, frequency]) => frequency > FREQUENCY_THRESHOLD)
      .map(([color, _]) => color);

    while (primaryColors.length > 6) {
      primaryColors.pop();
    }

    if (primaryColors.length > 0) {
      dispatch({
        type: UPDATE_PRIMARY_COLORS,
        payload: primaryColors,
      });
    }
  };


export const setBackgroundColor = (color: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_BACKGROUND_COLOR,
      payload: color,
    });

    dispatch(incrementBackgroundColorFrequency(color));

    dispatch(updateBackgroundPrimaryColors());
  };
};

export const incrementBackgroundColorFrequency = (color: string) => ({
  type: INCREMENT_BACKGROUND_COLOR_FREQUENCY,
  payload: color
});

export const updateBackgroundPrimaryColors = (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  const backgroundColorFrequencyMap = getState().backgroundColorFrequencyMap;

  const backgroundColorFrequencyPairs: [string, number][] = Object.entries(backgroundColorFrequencyMap) as [string, number][];


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

export const setPrimaryColors = (colors: string[]) => ({
  type: SET_PRIMARY_COLORS,
  payload: colors
});

export const togglePicker = (pickerType: 'color' | 'background') => ({
  type: TOGGLE_PICKER,
  payload: pickerType,
});
