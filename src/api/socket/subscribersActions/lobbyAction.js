/* eslint-disable no-console */
import { SUBSCRIBERS_IDS } from '../../../constants/socket';
import { dispatch, getStoreState, getUserId } from '../../../redux/store';
import { removeWaitingTable, setPlayersCount, setWaitingTable } from '../../../redux/ducks/lobbyDuck';
import { resetActiveTable } from '../../../redux/ducks/activeTablesDuck';
import { GAME_SCENES } from '../../../constants/game/ids';
import {
  updateTournamentState, tournamentShow,
  updateTournamentUsers, tournamentHide, setTournamentWinners,
} from '../../../redux/ducks/tournamentsDuck';

const { WAITING } = GAME_SCENES;

const {
  ROOM_HIDE, ROOM_SHOW, TOURNAMENT_EDIT, TOURNAMENT_HIDE, TOURNAMENT_SHOW, TOURNAMENT_UPDATE_STATE,
  TOURNAMENT_UPDATE_USERS, PLAYERS_COUNT, TOURNAMENT_STATE, TOURNAMENT_WINNERS,
} = SUBSCRIBERS_IDS.LOBBY;

const userHandlers = {
  [ROOM_HIDE]: (data) => { dispatch(removeWaitingTable(data)); },
  [ROOM_SHOW]: (data) => {
    if (getUserId() === data.user.id) {
      const { activeTables } = getStoreState();
      const ourToSetWaiting = Object.keys(activeTables).find(table => table === String(data.id));

      if (ourToSetWaiting && activeTables[ourToSetWaiting].gameScene !== WAITING) {
        const { waitingDuration } = getStoreState().globalInfo;
        dispatch(resetActiveTable({ roomId: data.id, timer: waitingDuration }));
      }
    } else {
      dispatch(setWaitingTable(data));
    }
  },
  [TOURNAMENT_EDIT]: (data) => { console.log('TOURNAMENT EDIT', data); },
  [TOURNAMENT_HIDE]: (data) => { dispatch(tournamentHide(data)); },
  [TOURNAMENT_SHOW]: (data) => { dispatch(tournamentShow(data)); },
  [TOURNAMENT_UPDATE_STATE]: (data) => { dispatch(updateTournamentState(data)); },
  [TOURNAMENT_UPDATE_USERS]: (data) => {
    const userId = getUserId();
    dispatch(updateTournamentUsers({ ...data, userId }));
  },
  [TOURNAMENT_STATE]: (data) => { console.log('tournament state', data); },
  [TOURNAMENT_WINNERS]: (data) => { dispatch(setTournamentWinners(data)); },
  [PLAYERS_COUNT]: (data) => { dispatch(setPlayersCount(data)); },
};

export const lobbyAction = (data) => {
  userHandlers[data.event] && userHandlers[data.event](data.data);
};
