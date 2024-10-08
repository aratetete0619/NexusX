import { UPDATE_SEARCH_QUERY } from "./actionTypes";

export const updateSearchQuery = (query: string) => {
  return {
    type: UPDATE_SEARCH_QUERY,
    payload: query,
  };
};
