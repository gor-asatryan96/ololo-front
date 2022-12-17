import { createSubscriber } from '../../helpers/socket';
import { lobbyAction } from './subscribersActions/lobbyAction';
import { gameAction } from './subscribersActions/gameAction';
import { userAction } from './subscribersActions/userAction';

export const userSubscriber = userId => createSubscriber(`user#${userId}`)(userAction);
export const lobbySubscriber = () => createSubscriber('lobby')(lobbyAction);
export const gameSubscriber = gameId => createSubscriber(`game-${gameId}`)(gameAction);
