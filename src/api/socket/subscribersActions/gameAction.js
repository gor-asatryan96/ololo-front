/* eslint-disable no-console */
import { batchActions } from 'redux-batched-actions';
import { SUBSCRIBERS_IDS } from '../../../constants/socket';
import { dispatch, getStoreState, getUserId } from '../../../redux/store';
import {
  changeOpponentAvatar,
  setGameScene,
  setIsDrawing,
  setIsYouWinBannerShow,
  setOpponentCurrentHand,
  setResult, setScore,
  setWinAmount,
  toggleInfiniteHand,
} from '../../../redux/ducks/activeTablesDuck';
import { GAME_SCENES } from '../../../constants/game/ids';
import { subscribers } from './userAction';

const { GAME_OVER, ROUND_OVER, CHANGE_AVATAR } = SUBSCRIBERS_IDS.GAME;
const { COMPARISON } = GAME_SCENES;

const gameHandlers = {
  [GAME_OVER]: (data) => {
    subscribers[data.gameId].unsubscribe();
    delete subscribers[data.gameId];
  },
  [ROUND_OVER]: ({
    roomId, result, winAmount, score,
  }) => {
    const userId = getUserId();
    const opponentId = getStoreState().activeTables[roomId].opponent.id;

    dispatch(batchActions([
      setGameScene({ roomId, scene: COMPARISON }),
      setOpponentCurrentHand({ roomId, currentHand: result[opponentId].choice }),
      setResult({ roomId, result: result[userId].result }),
      toggleInfiniteHand({ roomId, isInfiniteHand: false }),
      setIsDrawing({ roomId, isDrawing: true }),
      setWinAmount({ roomId, winAmount }),
    ]));
    setTimeout(() => {
      dispatch(setIsDrawing({ roomId, isDrawing: false }));
      dispatch(setScore({ roomId, score }));
    }, 1100);
    setTimeout(() => {
      dispatch(setIsYouWinBannerShow({ isYouWinBannerShow: true, roomId }));
    }, 3000);
    setTimeout(() => {
      if (getStoreState().activeTables[roomId]) {
        dispatch(batchActions([
          setIsYouWinBannerShow({ isYouWinBannerShow: false, roomId }),
          setResult({ roomId, result: '' }),
        ]));
      }
    }, 7000);
  },
  [CHANGE_AVATAR]: (data) => {
    const userId = getUserId();
    console.log(userId !== data.userId);
    userId !== data.userId && dispatch(changeOpponentAvatar(data));
  },
};

export const gameAction = (data) => {
  console.log('game data', data);
  gameHandlers[data.event] && gameHandlers[data.event](data.data);
};
