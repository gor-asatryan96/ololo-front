import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './HistoryTab.module.scss';
import HistoryClassic from './HistoryClassic/HistoryClassic';
import HistoryTournament from './HistoryTournament/HistoryTournament';
import { HISTORY_TAB_NAMES } from '../../../constants/game/names';
import HistoryTabItem from './components/HistoryTabItem';
import { resetHistoryInfo } from '../../../redux/ducks/lobbyDuck';

const historyTabNames = Object.values(HISTORY_TAB_NAMES);
const { CLASSIC, TOURNAMENTS } = HISTORY_TAB_NAMES;

const HistoryTab = () => {
  const dispatch = useDispatch();
  const [ activeTab, setActiveTab ] = useState(CLASSIC);
  const historyInfo = useSelector(state => state.lobbyInfo.historyInfo);

  useEffect(() => () => dispatch(resetHistoryInfo()), []);

  return (
    <div className={classes.history}>
      <div className={classes.history__tabs}>
        {historyTabNames.map(tab => (
          <HistoryTabItem key={tab} title={tab} activeTab={activeTab} cb={setActiveTab} />
        ))}
      </div>
      <HistoryClassic
        isActive={activeTab === CLASSIC}
        historyData={historyInfo.classicHistory} />
      <HistoryTournament
        isActive={activeTab === TOURNAMENTS}
        historyData={historyInfo.tournamentHistory} />
    </div>
  );
};

export default HistoryTab;
