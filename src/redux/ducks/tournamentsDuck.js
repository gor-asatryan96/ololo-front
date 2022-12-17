import { createAction, createReducer } from '../../helpers/redux';
import { TOURNAMENT_ACTIONS } from '../../constants/game/ids';

const { JOIN, UNJOIN, LEAVE } = TOURNAMENT_ACTIONS;

// ACTION TYPES
const SET_TOURNAMENTS = 'SET_TOURNAMENTS';
const SET_TOURNAMENT_WINNERS = 'SET_TOURNAMENT_WINNERS';
const SET_MY_TOURNAMENTS = 'SET_MY_TOURNAMENTS';
const UPDATE_TOURNAMENT_USERS = 'UPDATE_TOURNAMENT_USERS';
const UPDATE_TOURNAMENT_STATE = 'UPDATE_TOURNAMENT_STATE';
const TOURNAMENT_SHOW = 'TOURNAMENT_SHOW';
const TOURNAMENT_HIDE = 'TOURNAMENT_HIDE';
const SET_NOTIFICATION = 'SET_NOTIFICATION';

// ACTIONS
export const setTournaments = createAction(SET_TOURNAMENTS);
export const setTournamentWinners = createAction(SET_TOURNAMENT_WINNERS);
export const setMyTournaments = createAction(SET_MY_TOURNAMENTS);
export const updateTournamentUsers = createAction(UPDATE_TOURNAMENT_USERS);
export const updateTournamentState = createAction(UPDATE_TOURNAMENT_STATE);
export const tournamentShow = createAction(TOURNAMENT_SHOW);
export const tournamentHide = createAction(TOURNAMENT_HIDE);
export const setNotification = createAction(SET_NOTIFICATION);

// REDUCER
const initialState = {
  tournaments: [],
  myTournaments: {},
  tournamentWinners: [],
  notification: 0,
};

export const tournamentsInfo = createReducer(initialState, (state, { value }) => ({
  [SET_NOTIFICATION]: () => ({
    ...state,
    notification: value ? state.notification + 1 : 0,
  }),
  [SET_TOURNAMENTS]: () => ({ ...state, tournaments: value }),
  [SET_TOURNAMENT_WINNERS]: () => ({ ...state, tournamentWinners: [ ...value ]}),
  [SET_MY_TOURNAMENTS]: () => ({
    ...state,
    myTournaments: { ...state.myTournaments, ...value },
  }),
  [TOURNAMENT_SHOW]: () => ({
    ...state,
    tournaments: [ ...state.tournaments, value ],
  }),
  [TOURNAMENT_HIDE]: () => {
    const currentTournamentIndex = state.tournaments.findIndex(
      item => item.id === value.tournamentId,
    );
    if (currentTournamentIndex === -1) return state;
    const copyTournaments = [ ...state.tournaments ];
    const copyMyTournaments = { ...state.myTournaments };
    copyTournaments.splice(currentTournamentIndex, 1);

    if (state.myTournaments[value.tournamentId]) {
      delete copyMyTournaments[value.tournamentId];
    }

    return {
      ...state,
      tournaments: copyTournaments,
      myTournaments: copyMyTournaments,
    };
  },
  [UPDATE_TOURNAMENT_STATE]: () => {
    const currentTournamentIndex = state.tournaments.findIndex(
      item => item.id === value.tournamentId,
    );
    if (currentTournamentIndex === -1) return state;
    const copyTournaments = [ ...state.tournaments ];
    copyTournaments[currentTournamentIndex].state = value.state;
    return {
      ...state,
      tournaments: copyTournaments,
    };
  },
  [UPDATE_TOURNAMENT_USERS]: () => {
    const playerId = value.player.id;
    const copyTournaments = [ ...state.tournaments ];
    const copyMyTournaments = { ...state.myTournaments };
    const currentTournamentIndex = state.tournaments.findIndex(
      item => item.id === value.tournamentId,
    );

    if (currentTournamentIndex !== -1) {
      if (value.action === JOIN) {
        copyTournaments[currentTournamentIndex] = {
          ...state.tournaments[currentTournamentIndex],
          players: [ ...state.tournaments[currentTournamentIndex].players, value.player ],
        };

        if (playerId === value.userId) {
          copyMyTournaments[value.tournamentId] = {
            ...copyTournaments[currentTournamentIndex],
          };
        } else if (Object.keys(copyMyTournaments).map(id => +id).includes(value.tournamentId)) {
          copyMyTournaments[value.tournamentId] = {
            ...copyMyTournaments[value.tournamentId],
            players: [
              ...state.tournaments[currentTournamentIndex].players,
              value.player,
            ],
          };
        }
      } else if (value.action === UNJOIN) {
        if (playerId === value.userId) {
          delete copyMyTournaments[value.tournamentId];
        }
        const filtered = copyTournaments[currentTournamentIndex]
          .players.filter(item => item.id !== playerId);
        copyTournaments[currentTournamentIndex] = {
          ...state.tournaments[currentTournamentIndex],
          players: filtered,
        };
      } else if (value.action === LEAVE) {
        if (playerId === value.userId) {
          delete copyMyTournaments[value.tournamentId];
        }

        const otherPlayers = state.tournaments[currentTournamentIndex].players.filter(
          player => player.id !== value.player.id,
        );

        copyTournaments[currentTournamentIndex] = {
          ...state.tournaments[currentTournamentIndex],
          players: [
            ...otherPlayers,
            value.player,
          ],
        };
        if (playerId !== value.userId && copyMyTournaments[value.tournamentId]) {
          copyMyTournaments[value.tournamentId] = {
            ...copyMyTournaments[value.tournamentId],
            players: [
              ...otherPlayers,
              value.player,
            ],
          };
        }
      }
    } else {
      return state;
    }

    return {
      ...state,
      tournaments: copyTournaments,
      myTournaments: copyMyTournaments,
    };
  },
}));
