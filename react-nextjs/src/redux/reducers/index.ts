import { combineReducers } from 'redux';
import nodes from './nodes';
import edges from './edges';
import map from './map';
import showToolbutton from './showToolbuttonReducer';
import toolbuttonPosition from './toolbuttonPositionReducer';
import nodeEditing from './nodeEditing';
import nodeName from './nodeName';
import showNodeSettings from './showNodeSettingsReducer';
import lastDeselectedNodeId from './lastDeselectedNodeId';
import colorReducer from './colorReducer';
import primaryColorsReducer from './primaryColorsReducer';
import primaryBackgroundColorsReducer from './primaryBackgroundColorsReducer'
import colorFrequencyMapReducer from './colorFrequencyMapReducer'
import backgroundColorFrequencyMapReducer from './backgroundColorFrequencyMapReducer';
import showPickerReducer from './showPickerReducer';
import popupPositionReducer from './popupPositionReducer';

import edgeCreation from './edgeCreation';

import setHandlePosition from './handles';
import handlePositions from './handlePositionsReducer'
import searchQueryReducer from './searchQuery';
import searchBarPositionReducer from './searchBarPositionReducer';
import searchBarFocus from './searchBarFocus'
import searchResults from './searchResults';
import selectedPolarNode from './selectedPolarNode'
import draggedPositions from './draggedPositions';
import nodeDragDifference from './nodeDragDifference';
import centerPolarNode from './centerPolarNode'
import searchBarReducer from './searchBarReducer'
import polarEdgesReducer from './polarEdges';
import { favoritesReducer } from "./favoritesReducer";
import { SET_SELECTED_NODE_ID } from '../actions/setSelectedNodeId';


interface SetSelectedNodeIdAction {
  type: typeof SET_SELECTED_NODE_ID;
  payload: string | null;
}

type SelectedNodeIdActionTypes = SetSelectedNodeIdAction;
const initialSelectedNodeIdState: string | null = null;

const selectedNodeId = (state = initialSelectedNodeIdState, action: SelectedNodeIdActionTypes) => {
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
  edgeCreation,
  setHandlePosition,
  handlePositions,
  searchBarFocus,
  searchResults,
  selectedPolarNode,
  draggedPositions,
  nodeDragDifference,
  searchBarReducer,
  centerPolarNode,
  lastDeselectedNodeId,
  popupPosition: popupPositionReducer,
  colorState: colorReducer,
  primaryColors: primaryColorsReducer,
  primaryBackgroundColors: primaryBackgroundColorsReducer,
  colorFrequencyMap: colorFrequencyMapReducer,
  backgroundColorFrequencyMap: backgroundColorFrequencyMapReducer,
  showPicker: showPickerReducer,
  searchQuery: searchQueryReducer,
  searchBarPosition: searchBarPositionReducer,
  polarEdges: polarEdgesReducer,
  favorites: favoritesReducer,
});


export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
