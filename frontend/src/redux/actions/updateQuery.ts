import { UPDATE_QUERY } from '../actions/actionTypes'

export const updateQuery = (query) => ({
  type: UPDATE_QUERY,
  payload: query,
});
