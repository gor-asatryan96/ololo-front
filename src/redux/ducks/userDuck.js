import { createAction, createReducer } from '../../helpers/redux';

// ACTION TYPES
const SET_USER_ID = 'SET_USER_ID';
const SET_REMOTE_ID = 'SET_REMOTE_ID';
const SET_BALANCE = 'SET_BALANCE';
const SET_AVATAR = 'SET_AVATAR';

// ACTIONS
export const setUserId = createAction(SET_USER_ID);
export const setRemoteId = createAction(SET_REMOTE_ID);
export const setBalance = createAction(SET_BALANCE);
export const setAvatar = createAction(SET_AVATAR);

// REDUCER
const initialState = {
  userId: null,
  remoteId: null,
  balance: 0,
  avatarId: 1,
};

export const userInfo = createReducer(initialState, (state, { value }) => ({
  [SET_USER_ID]: () => ({ ...state, userId: value }),
  [SET_BALANCE]: () => ({ ...state, balance: value }),
  [SET_AVATAR]: () => ({ ...state, avatarId: value }),
  [SET_REMOTE_ID]: () => ({ ...state, remoteId: value }),
}));
