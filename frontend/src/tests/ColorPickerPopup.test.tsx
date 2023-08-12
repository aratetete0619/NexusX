import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ColorPickerPopup from '../components/ColorPickerPopup';
import rootReducer from '../redux/reducers';
import { setColor, setBackgroundColor, hidePicker } from '../redux/actions';
import styles from '../styles/ColorPickerPopup.module.css';

jest.mock('../redux/actions', () => ({
  ...jest.requireActual('../redux/actions'),
  setColor: jest.fn(() => 'setColorAction'),
  setBackgroundColor: jest.fn(() => 'setBackgroundColorAction'),
  hidePicker: jest.fn(() => 'hidePickerAction')
}));

describe('ColorPickerPopup Component', () => {
  const colorType = 'color';

  it('should switch tabs', () => {
    const store = createStore(rootReducer);
    const { getByText, container } = render(
      <Provider store={store}>
        <ColorPickerPopup colorType={colorType} />
      </Provider>
    );

    fireEvent.click(getByText('Colors'));
    expect(container.querySelector('input[type="color"]')).not.toBeInTheDocument();

    fireEvent.click(getByText('Picker'));
    expect(container.querySelector('input[type="color"]')).toBeInTheDocument();
  });

  it('should dispatch action on color input change', () => {
    const store = createStore(rootReducer);
    store.dispatch = jest.fn();
    const { getByText, container } = render(
      <Provider store={store}>
        <ColorPickerPopup colorType={colorType} />
      </Provider>
    );

    fireEvent.click(getByText('Picker'));
    const colorInput = container.querySelector('input[type="color"]');
    fireEvent.change(colorInput!, { target: { value: '#FFFFFF' } });
    if (colorType === 'color') {
      expect(store.dispatch).toHaveBeenCalledWith('setColorAction');
    } else {
      expect(store.dispatch).toHaveBeenCalledWith('setColorAction');
    }
  });

  it('should dispatch action on color click', () => {
    const store = createStore(rootReducer);
    store.dispatch = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <ColorPickerPopup colorType={colorType} />
      </Provider>
    );
    const colorElement = container.querySelector('div[style*="background-color"]');
    if (!colorElement) {
      throw new Error('Color element not found');
    }
    const colorValue = getComputedStyle(colorElement).backgroundColor;
    if (colorElement) {
      fireEvent.click(colorElement);
      if (colorType === 'color') {
        expect(store.dispatch).toHaveBeenCalledWith(setColor(colorValue));
      } else {
        expect(store.dispatch).toHaveBeenCalledWith(setBackgroundColor(colorValue));
      }
      expect(store.dispatch).toHaveBeenCalledWith(hidePicker(colorType));
    } else {
      throw new Error('Color element not found');
    }
  });
});
