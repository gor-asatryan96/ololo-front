import { createAction, createReducer } from '../../helpers/redux';

// ACTION TYPES
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const REMOVE_ERROR_MESSAGE = 'REMOVE_ERROR_MESSAGE';

// ACTIONS
export const setErrorMessage = createAction(SET_ERROR_MESSAGE);
export const removeErrorMessage = createAction(REMOVE_ERROR_MESSAGE);

// REDUCER
export const errorInfo = createReducer('', (_, { value }) => ({
  [SET_ERROR_MESSAGE]: () => value,
  [REMOVE_ERROR_MESSAGE]: () => '',
}));
