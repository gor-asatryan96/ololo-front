import React from 'react';
import classes from '../../Home/Home.module.scss';
import GameTable from '../../GameTable/GameTable';
import { TABLES_TAB_NAMES } from '../../../../constants/game/names';

const { WAITING, EMPTY } = TABLES_TAB_NAMES;

const BeforePlayGameLobby = ({ waitingTables, emptyTables }) => (
  <div className={classes.gameTables}>
    <div className={classes.gameTables__row}>
      <div>
        <GameTable tables={waitingTables} status={WAITING} />
      </div>
    </div>
    <div className={classes.gameTables__row}>
      <div>
        <GameTable tables={emptyTables} status={EMPTY} />
      </div>
    </div>
  </div>
);

export default BeforePlayGameLobby;
