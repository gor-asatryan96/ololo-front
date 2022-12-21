import { createAction, createReducer } from '../../helpers/redux';
import { MAIN_SCENE_NAMES, HEADER_NAV_NAMES } from '../../constants/game/names';

const { START } = MAIN_SCENE_NAMES;
const { TABLES } = HEADER_NAV_NAMES;

// ACTION TYPES
const SET_MAIN_SCENE = 'SET_MAIN_SCENE';
const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
const SET_IS_LEADERBOARD_ACTIVE = 'SET_IS_LEADERBOARD_ACTIVE';
const SET_SOCKET_CHANGE = 'SET_SOCKET_CHANGE';
const SET_CURRENCY = 'SET_CURRENCY';

// ACTIONS
export const setMainScene = createAction(SET_MAIN_SCENE);
export const setActiveTab = createAction(SET_ACTIVE_TAB);
export const setIsLeaderboardActive = createAction(SET_IS_LEADERBOARD_ACTIVE);
export const setSocketChange = createAction(SET_SOCKET_CHANGE);
export const setCurrency = createAction(SET_CURRENCY);

// REDUCER
const initialState = {
  currentScene: START,
  isSocketChanging: false,
  activeTab: sessionStorage.getItem('activeTab') || TABLES,
  roundDuration: 30000,
  waitingDuration: 300000,
  isLeaderboardActive: 1,
  currency: '',
};

export const globalInfo = createReducer(initialState, (state, { value }) => ({
  [SET_MAIN_SCENE]: () => ({ ...state, currentScene: value }),
  [SET_ACTIVE_TAB]: () => ({ ...state, activeTab: value }),
  [SET_IS_LEADERBOARD_ACTIVE]: () => ({ ...state, isLeaderboardActive: value }),
  [SET_SOCKET_CHANGE]: () => ({ ...state, isSocketChanging: value }),
  [SET_CURRENCY]: () => ({ ...state, currency: value }),
}));

export const selectCurrency = state => state.globalInfo.currency