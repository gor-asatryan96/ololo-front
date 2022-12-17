import { centrifuge } from '../api/socket';
import { getDateFromIso } from './general';

const eventNames = {
  0: 'AUTH',
  1: 'ROOM SHOW',
  2: 'ROOM HIDE',
  3: 'TOURNAMENT SHOW',
  4: 'TOURNAMENT EDIT',
  5: 'TOURNAMENT HIDE',
  6: 'GAME STARTED',
  7: 'BALANCE',
  8: 'TOURNAMENT UPDATE STATE',
  9: 'TOURNAMENT UPDATE USERS',
  10: 'PLAYERS COUNT',
  11: 'ADD ACTIVE ROOM',
  12: 'REMOVE ACTIVE ROOM',
  13: 'WAITING TIMER',
  14: 'LEADERBOARD',
  15: 'HISTORY',
  16: 'CHANGE AVATAR',
  17: 'TOURNAMENT STATE',
  18: 'TOURNAMENT WINNERS',
  20: 'GAME START',
  21: 'BET ACCEPTED',
  24: 'GAME OVER',
  28: 'AUTO GAME',
  29: 'GAME STATE',
  30: 'ROUND OVER',
  41: 'GET_TOURNAMENT_HISTORY',
  99: 'ERROR',
};

function debugLog(eventName, data) {
  const separator = '---------------------------------';
  const event = `Event:: ${eventName} --- ${eventNames[data.event]} `;
  const { time, seconds } = getDateFromIso(Date.now());
  // eslint-disable-next-line no-console
  console.log(
    ` ${separator}\n| %c${event}`,
    'background: #222; color: #0fb72b',
    '\n| Time:: ',
    `${time}:${seconds}`,
    '\n| Data:: ',
    data.data,
  );
}

export function createSubscriber(eventName) {
  // eslint-disable-next-line func-names
  return function (listener) {
    return centrifuge?.subscribe(eventName, (res) => {
      if (res.data) {
        // if (process.env.NODE_ENV === 'development') {
        debugLog(eventName, res.data);
        // }
        !!listener && listener(res.data);
      }
    });
  };
}

export function createEmitter(eventName) {
  return (data) => {
    centrifuge?.namedRPC(eventName, data);
  };
}
