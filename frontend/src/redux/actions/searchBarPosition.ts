// redux/actions/searchBarPosition.ts
import { UPDATE_SEARCH_BAR_POSITION } from './actionTypes';

export const updateSearchBarPosition = (position) => {
  return {
    type: UPDATE_SEARCH_BAR_POSITION,
    payload: position
  };
};
