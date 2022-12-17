import { EMITTERS_IDS } from '../../constants/socket';
import { createEmitter } from '../../helpers/socket';

const {
  AUTH,
  CLOSE_ROOM,
  CREATE_ROOM,
  JOIN_ROOM,
  JOIN_TOURNAMENT,
  LEAVE_TOURNAMENT,
  PLACE_BET,
  GAME_STATE,
  AUTO_BET,
  WAITING_TIMER,
  GET_LEADERBOARD,
  GET_HISTORY,
  CHANGE_AVATAR,
  GET_TOURNAMENT_HISTORY,
} = EMITTERS_IDS;

export const emitAuth = createEmitter(AUTH);
export const emitCreateRoom = createEmitter(CREATE_ROOM);
export const emitJoinRoom = createEmitter(JOIN_ROOM);
export const emitCloseRoom = createEmitter(CLOSE_ROOM);
export const emitPlaceBet = createEmitter(PLACE_BET);
export const emitJoinTournament = createEmitter(JOIN_TOURNAMENT);
export const emitLeaveTournament = createEmitter(LEAVE_TOURNAMENT);
export const emitGameState = createEmitter(GAME_STATE);
export const emitAutoBet = createEmitter(AUTO_BET);
export const emitWaitingTimer = createEmitter(WAITING_TIMER);
export const emitGetLeaderboard = createEmitter(GET_LEADERBOARD);
export const emitGetHistory = createEmitter(GET_HISTORY);
export const emitChangeAvatar = createEmitter(CHANGE_AVATAR);
export const emitGetTournamentHistory = createEmitter(GET_TOURNAMENT_HISTORY);
