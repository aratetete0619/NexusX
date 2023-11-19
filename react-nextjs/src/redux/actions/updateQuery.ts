import { UPDATE_QUERY } from '../actions/actionTypes'

export const updateQuery = (query: string) => ({
  type: UPDATE_QUERY,
  payload: query,
});
