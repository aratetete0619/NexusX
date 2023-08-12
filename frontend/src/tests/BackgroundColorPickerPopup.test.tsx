import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import BackgroundColorPickerPopup from '../components/BackgroundColorPickerPopup';
import rootReducer from '../redux/reducers';
import { setBackgroundColor } from '../redux/actions';


jest.mock('../redux/actions', () => ({
  ...jest.requireActual('../redux/actions'),
  setBackgroundColor: jest.fn(() => 'setBackgroundColorAction')
}));


describe('BackgroundColorPickerPopup Component', () => {
  it('should switch tabs', () => {
    const store = createStore(rootReducer);
    const { getByText, container } = render(
      <Provider store={store}>
        <BackgroundColorPickerPopup />
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
        <BackgroundColorPickerPopup />
      </Provider>
    );

    fireEvent.click(getByText('Picker'));
    const colorInput = container.querySelector('input[type="color"]');
    fireEvent.change(colorInput!, { target: { value: '#FFFFFF' } });
    expect(store.dispatch).toHaveBeenCalledWith(setBackgroundColor('#FFFFFF'));
  });


  it('should dispatch action on color click', () => {
    const store = createStore(rootReducer);
    store.dispatch = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <BackgroundColorPickerPopup />
      </Provider>
    );

    const colorElement = container.querySelector('div[style^="background-color"]');
    if (colorElement) {
      fireEvent.click(colorElement);
      expect(store.dispatch).toHaveBeenCalledWith('setBackgroundColorAction');
    } else {
      throw new Error('Color element not found');
    }
  });
});
