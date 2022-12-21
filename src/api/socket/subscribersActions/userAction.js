/* eslint-disable no-console */
import { batchActions } from 'redux-batched-actions';
import { SUBSCRIBERS_IDS } from '../../../constants/socket';
import { setErrorMessage } from '../../../redux/ducks/errorDuck';
import { setAvatar, setBalance } from '../../../redux/ducks/userDuck';
import {
  setHistoryInfo, setLeaders, setTablesData, setTournamentInfo,
} from '../../../redux/ducks/lobbyDuck';
import {
  removeActiveTable, initialActiveTableState,
  setActiveTables, addActiveTable, setActiveTableData,
  setAcceptedChoose, setActiveChoose, setGameTimer, setIsAutoGame, resetAutoGameCount, setJoinRequest, removeJoinRequest, declineJoinRequest,
} from '../../../redux/ducks/activeTablesDuck';
import { dispatch, getStoreState, getUserId } from '../../../redux/store';
import { errorHandler } from '../errorHandler';
import { gameSubscriber } from '../subscribers';
import { emitGameState } from '../emitters';
import {
  setMyTournaments,
  setNotification,
  setTournaments,
  setTournamentWinners,
} from '../../../redux/ducks/tournamentsDuck';
import { setIsLeaderboardActive } from '../../../redux/ducks/globalDuck';

const {
  AUTH, BALANCE, BET_ACCEPTED, ERROR, GAME_START, AUTO_GAME,
  ADD_ACTIVE_ROOM, REMOVE_ACTIVE_ROOM, GAME_STATE, WAITING_TIMER,
  LEADERBOARD, HISTORY, TOURNAMENT_INFO, JOIN_REQUEST, MY_JOIN_RESPONSE,
  JOIN_REQUEST_APPROVED, JOIN_REQUEST_DECLINED

} = SUBSCRIBERS_IDS.USER;

export const subscribers = {};

const subscribeToRoom = (data, notification) => {
  dispatch(setActiveTableData({ roomId: data.roomId, data }));
  if (data.tournamentId && notification) {
    dispatch(setNotification(true));
  }
  if (!subscribers[data.gameId]) {
    const roomSub = gameSubscriber(data.gameId);
    subscribers[data.gameId] = roomSub;
    roomSub.on('subscribe', response => console.log('room subscribe', response));
    roomSub.on('unsubscribe', response => console.log('room unsubscribe', response));
  }
};

const userHandlers = {
  [AUTH]: (data) => {
    const {
      avatarId, activeTables, yourPendingJoinRequests = [], isLeaderboardActive, tournaments, tournamentWinners, ...rest
    } = data;

    const userId = getUserId();

    if (activeTables.length || yourPendingJoinRequests.length) {
      const formattedActiveTables = activeTables.filter(table => !table.tournamentId)
        ?.reduce((obj, { id, bet, timer, pendingJoinRequest }) => {
          obj[id] = {
            ...initialActiveTableState, 
            bet, 
            timer, 
            roomId: id,
            joinRequest: pendingJoinRequest ? {
              ...pendingJoinRequest,
              roomId: id,
              requestedUserAvatarId: pendingJoinRequest.avatarId,
              requestedUser: pendingJoinRequest.remoteId,
            } 
            : null
          };
          return obj;
        }, {});
      const formattedTournamentActiveTables = activeTables.filter(table => table.tournamentId)
        ?.reduce((obj, {
          id, bet, timer, tournamentId, currentRound,
        }) => {
          obj[id] = {
            ...initialActiveTableState, bet, timer, roomId: id, tournamentId, currentRound,
          };
          return obj;
        }, {});

      const requestedTables = yourPendingJoinRequests.reduce((obj, table) => {
        obj[table.roomId] = {
          ...initialActiveTableState, ...table, isRequested: true
        };
        return obj;
      }, {});

      dispatch(setActiveTables({ ...formattedActiveTables, ...formattedTournamentActiveTables, ...requestedTables }));

      activeTables.forEach((table) => {
        if (!table.time) {
          emitGameState({ roomId: table.id });
        }
      });
    }

    if (tournaments.length) {
      const activeTournaments = {};
      tournaments.forEach((tournament) => {
        if (tournament.state === 2 || tournament.state === 3) {
          const activeIndex = tournament.players.findIndex(player => player.id === userId);
          if (activeIndex !== -1) {
            activeTournaments[tournament.id] = {
              ...tournament,
              bet: tournament.buyIn,
            };
          }
        }
      });

      Object.keys(activeTournaments).length && dispatch(setMyTournaments(activeTournaments));
    }

    dispatch(batchActions([
      setIsLeaderboardActive(isLeaderboardActive),
      setTablesData(rest),
      setAvatar(avatarId),
      setTournaments(tournaments),
      setTournamentWinners(tournamentWinners),
    ]));
  },
  [BALANCE]: (data) => { dispatch(setBalance(data)); },
  [BET_ACCEPTED]: ({ choice, roomId }) => {
    dispatch(setAcceptedChoose({ acceptedChoose: choice, roomId }));
  },
  [GAME_START]: (data) => {
    subscribeToRoom(data, true);
  },
  [GAME_STATE]: (data) => {
    const { activeTables } = getStoreState();
    const { autoGame, roomId, choice } = data;
    console.log(activeTables[roomId].gameScene);
    subscribeToRoom(data);
    if (data.autoGame.isActive) {
      dispatch(setActiveChoose({
        roomId: +roomId,
        activeChoose: autoGame.choice,
      }));
    } else if (data.choice.choice) {
      dispatch(setActiveChoose({ roomId: data.roomId, activeChoose: data.choice.choice }));
    } else if (+activeTables[roomId].gameScene === 3) {
      // ancyal yntrutyuny animaciaic heto korely
      dispatch(setActiveChoose({ roomId: data.roomId, activeChoose: '' }));
    }
    data.choice.choice && dispatch(setAcceptedChoose({
      roomId: +roomId, acceptedChoose: choice.choice,
    }));
  },
  [ERROR]: (data) => { dispatch(setErrorMessage(errorHandler.getErrorText(data.code))); },
  [REMOVE_ACTIVE_ROOM]: (data) => { dispatch(removeActiveTable(data.roomId)); },
  [ADD_ACTIVE_ROOM]: (data) => {
    const { waitingDuration } = getStoreState().globalInfo;
    dispatch(addActiveTable({ ...data, timer: waitingDuration }));
  },
  [REMOVE_ACTIVE_ROOM]: (data) => {
    dispatch(removeActiveTable(data.roomId));
  },
  [AUTO_GAME]: ({ roomId, autoGame: { isActive, count, choice }}) => {
    dispatch(batchActions([
      setIsAutoGame({ roomId, isActive }),
      resetAutoGameCount({ roomId, count }),
      setActiveChoose({ activeChoose: choice, roomId }),
    ]));
  },
  [WAITING_TIMER]: (data) => { data.timer && dispatch(setGameTimer(data)); },
  [LEADERBOARD]: (data) => { dispatch(setLeaders(data)); },
  [HISTORY]: (data) => { dispatch(setHistoryInfo(data)); },
  [TOURNAMENT_INFO]: (data) => { dispatch(setTournamentInfo(data)); },
  [MY_JOIN_RESPONSE]: (data) => { 
    dispatch(addActiveTable({...data, isRequested: true}))
  },
  [JOIN_REQUEST]: (data) => { 
    dispatch(setJoinRequest(data))
  },
  [JOIN_REQUEST_APPROVED]: (data) => { 
    dispatch(removeJoinRequest(data))
  },
  [JOIN_REQUEST_DECLINED]: (data) => { 
    dispatch(declineJoinRequest(data))
  },
};

export const userAction = (data) => {
  userHandlers[data.event] && userHandlers[data.event](data.data);
};
