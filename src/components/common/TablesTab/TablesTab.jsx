import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classes from '../Home/Home.module.scss';
import PlayGame from '../PlayGame/PlayGame';
import { filterbetween } from '../../../helpers/general';
import BeforePlayGameLobby from './components/BeforePlayGameLobby';
import Range from '../Range/Range';

const TablesTab = () => {
  const {
    waitingTables,
    emptyTables,
    rangeFilter: { range1, range2 },
  } = useSelector(state => state.lobbyInfo);
  const activeTables = useSelector(state => state.activeTables);
  const classicActiveTables = useMemo(() => (
    Object.values(activeTables).filter(item => !item.tournamentId)
  ), [ activeTables ]);

  const filteredWaitingTables = useMemo(
    () => filterbetween(waitingTables, range1, range2),
    [ range1, range2, waitingTables ],
  );

  const filteredEmptyTables = useMemo(
    () => filterbetween(emptyTables, range1, range2),
    [ range1, range2, emptyTables ],
  );
  return (
    <>
      {!classicActiveTables.length ? (
        <>
          <BeforePlayGameLobby
            waitingTables={filteredWaitingTables}
            emptyTables={filteredEmptyTables} />
        </>
      ) : (
        <div className={classes.gameTables__container}>
          <PlayGame
            waitingTables={filteredWaitingTables}
            emptyTables={filteredEmptyTables}
            classicActiveTables={classicActiveTables}
          />
        </div>
      )}
      {
        classicActiveTables.length < 2 && (
          <Range />
        )}
    </>
  );
};

export default TablesTab;
