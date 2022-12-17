import ordinal from 'ordinal';
import { getRandomIntegerNineSymbol } from '../utils/utils';

const winnerUserList = new Array(35).fill(null).map((_, index) => ({
  id: getRandomIntegerNineSymbol(),
  place: ordinal(index + 1),
}));

export {
  winnerUserList,
};
