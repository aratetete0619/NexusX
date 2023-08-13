// hooks.ts
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../redux/reducers/';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';


export const useDispatch = () => useReduxDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
