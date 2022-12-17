import { createAction, createReducer } from '../../helpers/redux';
import { GAME_SCENES } from '../../constants/game/ids';

const { WAITING, CHOOSE } = GAME_SCENES;

// ACTION TYPES
const SET_ACTIVE_TABLES = 'SET_ACTIVE_TABLES';
const ADD_ACTIVE_TABLE = 'ADD_ACTIVE_TABLE';
const REMOVE_ACTIVE_TABLE = 'REMOVE_ACTIVE_TABLE';
const SET_ACTIVE_TABLE_DATA = 'SET_ACTIVE_TABLE_DATA';
const SET_GAME_SCENE = 'SET_GAME_SCENE';
const SET_ACTIVE_CHOOSE = 'SET_ACTIVE_CHOOSE';
const SET_AUTO_GAME_MODE = 'SET_AUTO_GAME_MODE';
const SET_ACCEPTED_CHOOSE = 'SET_ACCEPTED_CHOOSE';
const RESET_AUTO_GAME_COUNT = 'RESET_AUTO_GAME_COUNT';
const RESET_ACTIVE_TABLE = 'RESET_ACTIVE_TABLE';
const SET_OPPONENT_CURRENT_HAND = 'SET_OPPONENT_CURRENT_HAND';
const SET_RESULT = 'SET_RESULT';
const SET_IS_YOU_WIN_BANNER_SHOW = 'SET_IS_YOU_WIN_BANNER_SHOW';
const RESET_GAME = 'RESET_GAME';
const SET_BET = 'SET_BET';
const SET_IS_DRAWING = 'SET_IS_DRAWING';
const START_NEW_ROUND = 'START_NEW_ROUND';
const TOGGLE_INFINITE_HAND = 'TOGGLE_INFINITE_HAND';
const SET_WIN_AMOUNT = 'SET_WIN_AMOUNT';
const SET_GAME_TIMER = 'SET_GAME_TIMER';
const CHANGE_OPPONENT_AVATAR = 'CHANGE_OPPONENT_AVATAR';
const SET_SCORE = 'SET_SCORE';

// ACTIONS
export const setActiveTables = createAction(SET_ACTIVE_TABLES);
export const addActiveTable = createAction(ADD_ACTIVE_TABLE);
export const removeActiveTable = createAction(REMOVE_ACTIVE_TABLE);
export const setActiveTableData = createAction(SET_ACTIVE_TABLE_DATA);
export const setGameScene = createAction(SET_GAME_SCENE);
export const setActiveChoose = createAction(SET_ACTIVE_CHOOSE);
export const setIsAutoGame = createAction(SET_AUTO_GAME_MODE);
export const setAcceptedChoose = createAction(SET_ACCEPTED_CHOOSE);
export const resetAutoGameCount = createAction(RESET_AUTO_GAME_COUNT);
export const resetActiveTable = createAction(RESET_ACTIVE_TABLE);
export const setOpponentCurrentHand = createAction(SET_OPPONENT_CURRENT_HAND);
export const setBet = createAction(SET_BET);
export const setResult = createAction(SET_RESULT);
export const setIsYouWinBannerShow = createAction(SET_IS_YOU_WIN_BANNER_SHOW);
export const resetGame = createAction(RESET_GAME);
export const setIsDrawing = createAction(SET_IS_DRAWING);
export const startNewRound = createAction(START_NEW_ROUND);
export const toggleInfiniteHand = createAction(TOGGLE_INFINITE_HAND);
export const setWinAmount = createAction(SET_WIN_AMOUNT);
export const setGameTimer = createAction(SET_GAME_TIMER);
export const changeOpponentAvatar = createAction(CHANGE_OPPONENT_AVATAR);
export const setScore = createAction(SET_SCORE);

// REDUCER

export const initialActiveTableState = {
  autoGame: {
    count: 15,
    isActive: false,
  },
  gameScene: WAITING,
  bet: null,
  timer: null,
  gameId: null,
  history: [],
  opponent: {
    id: null,
    remoteId: null,
    avatarId: null,
    history: [],
    currentHand: null,
  },
  isInfiniteHand: true,
  isDrawing: false,
  result: null,
  isYouWinBannerShow: false,
  activeChoose: null,
  acceptedChoose: null,
  winAmount: null,
};

export const activeTables = createReducer({}, (state, { value }) => ({
  [SET_ACTIVE_TABLES]: () => value,
  [ADD_ACTIVE_TABLE]: () => ({
    ...state, [value.roomId]: { ...initialActiveTableState, ...value },
  }),
  [REMOVE_ACTIVE_TABLE]: () => {
    const { [value]: removed, ...remainingTables } = state;

    return remainingTables;
  },
  [SET_ACTIVE_TABLE_DATA]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      ...value.data,
      gameScene: CHOOSE,
      acceptedChoose: null,
    },
  }),
  [SET_GAME_SCENE]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      gameScene: value.scene,
    },
  }),

  [SET_AUTO_GAME_MODE]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      autoGame: {
        ...state[value.roomId].autoGame,
        isActive: value.isActive,
      },
    },
  }),

  [RESET_AUTO_GAME_COUNT]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      autoGame: {
        ...state[value.roomId].autoGame,
        count: value.count,
      },
    },
  }),

  [SET_ACTIVE_CHOOSE]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      activeChoose: value.activeChoose,
    },
  }),

  [SET_ACCEPTED_CHOOSE]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      acceptedChoose: value.acceptedChoose,
    },
  }),

  [SET_RESULT]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      result: value.result,
    },
  }),

  [SET_IS_YOU_WIN_BANNER_SHOW]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      isYouWinBannerShow: value.isYouWinBannerShow,
    },
  }),

  [SET_BET]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      bet: value.bet,
    },
  }),

  [RESET_ACTIVE_TABLE]: () => {
    const { bet } = state[value.roomId];
    return {
      ...state,
      [value.roomId]: {
        ...initialActiveTableState,
        bet,
        timer: value.timer,
        roomId: value.roomId,
      },
    };
  },

  [SET_OPPONENT_CURRENT_HAND]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      opponent: {
        ...state[value.roomId].opponent,
        currentHand: value.currentHand,
      },
    },
  }),

  [SET_IS_DRAWING]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      isDrawing: value.isDrawing,
    },
  }),

  [TOGGLE_INFINITE_HAND]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      isInfiniteHand: value.isInfiniteHand,
    },
  }),

  [START_NEW_ROUND]: () => {
    const {
      bet, opponent, gameId, roomId, history, autoGame, autoGameCount, result, winAmount,
    } = state[value];
    return {
      ...state,
      [value]: {
        ...initialActiveTableState,
        bet,
        opponent,
        gameId,
        roomId,
        history,
        autoGame,
        autoGameCount,
        result,
        winAmount,
        isYouWinBannerShow: true,
        gameScene: CHOOSE,
      },
    };
  },

  [SET_WIN_AMOUNT]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      winAmount: value.winAmount,
    },
  }),

  [SET_GAME_TIMER]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      timer: value.timer,
    },
  }),

  [CHANGE_OPPONENT_AVATAR]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      opponent: {
        ...state[value.roomId].opponent,
        avatarId: value.avatarId,
      },
    },
  }),
  [SET_SCORE]: () => ({
    ...state,
    [value.roomId]: {
      ...state[value.roomId],
      score: value.score,
    },
  }),
}));
