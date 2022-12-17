export const GAME_CHOICES = {
  PAPER: '1',
  SCISSORS: '2',
  ROCK: '3',
};

export const GAME_RESULTS = {
  WIN: '1',
  LOSE: '2',
  DRAW: '3',
};

export const GAME_SCENES = {
  WAITING: 1,
  CHOOSE: 2,
  COMPARISON: 3,
  RESULT: 4,
  WIN_BANNER: 5,
};

export const TOURNAMENT_ACTIONS = {
  JOIN: 0,
  UNJOIN: 1,
  LEAVE: 2,
};

export const TOURNAMENT_SCENES = {
  ANNOUNCED: 1,
  REGISTRATION: 2,
  STARTED: 3,
  FINISHED: 4,
};

export const winnerPlaces = [ '1', '2', '3-4', '5-8', '9-16', '17-32' ];

export const tournamentPlaces = {
  1: '2',
  2: '3-4',
  4: '5-8',
  8: '9-16',
  16: '17-32',
  32: '33-64',
};
