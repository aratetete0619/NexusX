// src/redux/reducers/showNodeSettingsReducer.ts
import { SHOW_NODE_SETTINGS, HIDE_NODE_SETTINGS } from '../actions/actionTypes';

const showNodeSettingsReducer = (state = false, action) => {
  switch (action.type) {
    case SHOW_NODE_SETTINGS:
      return true;
    case HIDE_NODE_SETTINGS:
      return false;
    default:
      return state;
  }
};

export default showNodeSettingsReducer;
