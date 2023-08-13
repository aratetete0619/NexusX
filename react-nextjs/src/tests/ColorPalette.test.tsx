import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ColorPalette from '../components/ColorPalette';



const mockStore = configureStore([]);

describe('ColorPalette Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      primaryColors: ['red', 'blue', 'green'],
      primaryBackgroundColors: ['yellow', 'purple'],
    });
    store.dispatch = jest.fn();
  });

  it('should render the correct number of colors for paletteType "color"', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <ColorPalette paletteType="color" />
      </Provider>
    );
    const colors = getAllByTestId('palette-color');
    expect(colors.length).toBe(store.getState().primaryColors.length);
  });

  it('should render the correct number of colors for paletteType "background"', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <ColorPalette paletteType="background" />
      </Provider>
    );
    const colors = getAllByTestId('palette-color');
    expect(colors.length).toBe(store.getState().primaryBackgroundColors.length);
  });
})
