import { errorInfo } from './ducks/errorDuck';
import { globalInfo } from './ducks/globalDuck';
import { userInfo } from './ducks/userDuck';
import { lobbyInfo } from './ducks/lobbyDuck';
import { activeTables } from './ducks/activeTablesDuck';
import { tournamentsInfo } from './ducks/tournamentsDuck';

export const reducers = {
  globalInfo,
  errorInfo,
  userInfo,
  lobbyInfo,
  tournamentsInfo,
  activeTables,
};
