import { combineReducers } from 'redux';
import nodes from './nodes';
import edges from './edges';
import map from './map';
import showToolbutton from './showToolbuttonReducer';
import toolbuttonPosition from './toolbuttonPositionReducer';
import nodeEditing from './nodeEditing';
import nodeName from './nodeName';
import showNodeSettings from './showNodeSettingsReducer';
import colorReducer from './colorReducer';
import primaryColorsReducer from './primaryColorsReducer';
import primaryBackgroundColorsReducer from './primaryBackgroundColorsReducer'
import colorFrequencyMapReducer from './colorFrequencyMapReducer'
import backgroundColorFrequencyMapReducer from './backgroundColorFrequencyMapReducer';
import showPickerReducer from './showPickerReducer';
import popupPositionReducer from './popupPositionReducer';
import { SET_SELECTED_NODE_ID } from '../actions/setSelectedNodeId';

const initialSelectedNodeIdState = null;

const selectedNodeId = (state = initialSelectedNodeIdState, action) => {
  switch (action.type) {
    case SET_SELECTED_NODE_ID:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  nodes,
  edges,
  map,
  selectedNodeId,
  showToolbutton,
  toolbuttonPosition,
  nodeEditing,
  nodeName,
  showNodeSettings,
  colorState: colorReducer,
  primaryColors: primaryColorsReducer,
  primaryBackgroundColors: primaryBackgroundColorsReducer,
  colorFrequencyMap: colorFrequencyMapReducer,
  backgroundColorFrequencyMap: backgroundColorFrequencyMapReducer,
  showPicker: showPickerReducer,
  popupPosition: popupPositionReducer,
});

export default rootReducer;
