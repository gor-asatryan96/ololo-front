import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { isDevelopmentStage } from '../helpers/general';
import { reducers } from './reducers';

const compose = isDevelopmentStage() ? composeWithDevTools : param => param;

const store = createStore(
  enableBatching(combineReducers(reducers)),
  compose(applyMiddleware(thunkMiddleware)),
);

window.getState = isDevelopmentStage() && store.getState;

export const getStoreState = store.getState;
export const { dispatch } = store;
export const getUserId = () => store.getState().userInfo.userId;
export const isSocketChanging = () => store.getState().globalInfo.isSocketChanging;
export default store;
