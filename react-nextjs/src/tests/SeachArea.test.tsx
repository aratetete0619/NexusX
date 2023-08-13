import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import SearchArea from '../components/SearchArea';
import { client } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { setFocus } from '../redux/actions';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('SearchArea', () => {
  const setShowEdges = jest.fn();
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);

  const renderWithApollo = (component: React.ReactElement) => {
    return render(
      <ApolloProvider client={client}>
        {component}
      </ApolloProvider>
    );
  };

  test('renders without crashing', () => {
    renderWithApollo(<SearchArea setShowEdges={setShowEdges} />);
  });

  test('handles circle click when in circle mode', () => {
    const { getByClassName } = render(<SearchArea setShowEdges={setShowEdges} />);
    const circleElement = getByClassName('circle'); // 適切なクラス名を使用してください
    fireEvent.click(circleElement);
    expect(dispatch).toHaveBeenCalledWith(setFocus(false));
  });

  test('handles click outside when not in circle mode', () => {
    const { container, getByRole } = render(<SearchArea setShowEdges={setShowEdges} />);
    const textAreaElement = getByRole('textbox'); // 適切なロールやセレクタを使用してください
    fireEvent.mouseDown(document.body);
    fireEvent.mouseDown(container);
    expect(dispatch).toHaveBeenCalledWith(setFocus(false));
  });
});
