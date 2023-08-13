import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorButton from '../components/ColorButton';

describe('ColorButton Component', () => {
  it('should render the color passed as prop', () => {
    const { getByTestId } = render(<ColorButton color="#ff0000" onClick={() => { }} />);
    const colorDiv = getByTestId('color-button');
    expect(colorDiv.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('should call the onClick prop when clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<ColorButton color="#ff0000" onClick={onClick} />);
    const containerDiv = getByTestId('color-button-container');
    fireEvent.click(containerDiv);
    expect(onClick).toHaveBeenCalled();
  });
});
