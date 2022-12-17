import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './HistoryTournament.module.scss';
import AdditionalInfo from '../../AdditionalInfo/AdditionalInfo';
import { emitGetHistory, emitGetTournamentHistory } from '../../../../api/socket/emitters';
import HistoryTournamentItem from './HistoryTournamentItem';
import { resetTournamentInfo } from '../../../../redux/ducks/lobbyDuck';

const HistoryTournament = ({ isActive, historyData }) => {
  const dispatch = useDispatch();
  const [ isAdditionalInfo, setIsAdditionalInfo ] = useState(false);
  const currentTournamentInfo = useSelector(({ lobbyInfo }) => lobbyInfo.activeTournamentInfo);
  const openAdditionalInfo = useCallback((id) => {
    emitGetTournamentHistory({ id });
    setIsAdditionalInfo(true);
  }, []);
  const closeAdditionalInfo = useCallback(() => {
    setIsAdditionalInfo(false);
    dispatch(resetTournamentInfo());
  }, []);

  const [ offset ] = useState(0);

  useEffect(() => {
    emitGetHistory({ offset, limit: 20, type: 1 });
  }, [ offset ]);

  return (
    <div className={classes.historyTournaments} style={{ display: isActive ? 'flex' : 'none' }}>
      <div className={classes.historyTournaments__columns}>
        {historyData.items.map(item => (
          <HistoryTournamentItem
            key={item.id}
            item={item}
            openAdditionalInfo={openAdditionalInfo}
          />
        ))}
      </div>
      {
        isAdditionalInfo && <AdditionalInfo
          fromHistory
          isAdditionalInfo={isAdditionalInfo}
          closeAdditionalInfo={closeAdditionalInfo}
          specialAdditionalInfo={''}
          activeTournament={currentTournamentInfo}
        />
       }
    </div>
  );
};

export default HistoryTournament;
