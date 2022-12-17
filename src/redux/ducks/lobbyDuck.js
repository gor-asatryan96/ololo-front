import { createAction, createReducer } from '../../helpers/redux';

// ACTION TYPES
const SET_TABLES_DATA = 'SET_TABLES_DATA';
const SET_WAITING_TABLE = 'SET_WAITING_TABLE';
const REMOVE_WAITING_TABLE = 'REMOVE_WAITING_TABLE';
const SET_RANGE_FILTER = 'SET_RANGE_FILTER';
const SET_PLAYERS_COUNT = 'SET_PLAYERS_COUNT';
const SET_LEADERS = 'SET_LEADERS';
const RESET_LEADERS = 'RESET_LEADERS';
const SET_HISTORY_INFO = 'SET_HISTORY_INFO';
const RESET_HISTORY_INFO = 'RESET_HISTORY_INFO';
const SET_TOURNAMENT_INFO = 'SET_TOURNAMENT_INFO';
const RESET_TOURNAMENT_INFO = 'RESET_TOURNAMENT_INFO';
const TOGGLE_ADDITIONAL_INFO_POPUP = 'TOGGLE_ADDITIONAL_INFO_POPUP';

// ACTIONS
export const setTablesData = createAction(SET_TABLES_DATA);
export const setWaitingTable = createAction(SET_WAITING_TABLE);
export const removeWaitingTable = createAction(REMOVE_WAITING_TABLE);
export const setRangeFilter = createAction(SET_RANGE_FILTER);
export const setPlayersCount = createAction(SET_PLAYERS_COUNT);
export const setLeaders = createAction(SET_LEADERS);
export const resetLeaders = createAction(RESET_LEADERS);
export const setHistoryInfo = createAction(SET_HISTORY_INFO);
export const resetHistoryInfo = createAction(RESET_HISTORY_INFO);
export const setTournamentInfo = createAction(SET_TOURNAMENT_INFO);
export const resetTournamentInfo = createAction(RESET_TOURNAMENT_INFO);
export const toggleAdditionalInfoPopup = createAction(TOGGLE_ADDITIONAL_INFO_POPUP);

// REDUCER
const initialHistoryInfo = {
  classicHistory: { items: [], count: null },
  tournamentHistory: { items: [], count: null },
};

const initialLeaders = {
  leaderboard: [],
  me: {},
};

const initialState = {
  waitingTables: [],
  emptyTables: [],
  betRange: [],
  rangeFilter: { range1: null, range2: null },
  leaders: initialLeaders,
  historyInfo: initialHistoryInfo,
  activeTournamentInfo: {},
  additionalInfoPopup: false,
};

export const lobbyInfo = createReducer(initialState, (state, { value }) => ({
  [SET_TABLES_DATA]: () => ({ ...state, ...value }),
  [SET_WAITING_TABLE]: () => ({ ...state, waitingTables: [ ...state.waitingTables, value ]}),
  [TOGGLE_ADDITIONAL_INFO_POPUP]: () => ({
    ...state,
    additionalInfoPopup: value,
  }),
  [REMOVE_WAITING_TABLE]: () => {
    const remainingTables = state.waitingTables.filter(table => value.roomId !== table.id);

    return ({ ...state, waitingTables: remainingTables });
  },
  [SET_RANGE_FILTER]: () => ({ ...state, rangeFilter: value }),
  [SET_PLAYERS_COUNT]: () => {
    const currentTableIndex = state.emptyTables.findIndex(item => item.id === value.id);
    if (currentTableIndex !== -1) {
      const currentEmptyTables = [ ...state.emptyTables ];
      currentEmptyTables[currentTableIndex].playing = value.playing;
      return {
        ...state,
        emptyTables: currentEmptyTables,
      };
    }
    return state;
  },
  [SET_LEADERS]: () => ({
    ...state,
    leaders: value,
  }),
  [RESET_LEADERS]: () => ({ ...state, leaders: initialLeaders }),
  [SET_HISTORY_INFO]: () => {
    const currentValue = value.type ? 'tournamentHistory' : 'classicHistory';
    return {
      ...state,
      historyInfo:
        {
          ...state.historyInfo,
          [currentValue]: {
            count: value.count,
            items: [ ...state.historyInfo[currentValue].items, ...value.history ],
          },
        },
    };
  },
  [RESET_HISTORY_INFO]: () => ({
    ...state,
    historyInfo: initialHistoryInfo,
  }),
  [SET_TOURNAMENT_INFO]: () => ({
    ...state,
    activeTournamentInfo: {
      ...value,
    },
  }),
  [RESET_TOURNAMENT_INFO]: () => ({
    ...state,
    activeTournamentInfo: {},
  }),
}));
