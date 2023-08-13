// redux/actions/searchBarPosition.ts
import { UPDATE_SEARCH_BAR_POSITION } from './actionTypes';

export const updateSearchBarPosition = ({ x, y }: { x: number, y: number }) => {
  return {
    type: UPDATE_SEARCH_BAR_POSITION,
    payload: { x, y }
  };
};
