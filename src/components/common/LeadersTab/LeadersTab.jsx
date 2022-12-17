import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classes from './LeadersTab.module.scss';
import Pedestal from '../Pedestal/Pedestal';
import Leaders from '../Leaders/Leaders';

const LeadersTab = () => {
  const { leaderboard } = useSelector(state => state.lobbyInfo.leaders);
  const correctData = useMemo(() => (
    leaderboard.length > 3 ? leaderboard.slice(0, 3) : []
  ), [ leaderboard ]);
  return (
    <div className={classes.leaders}>
      <Pedestal userList={correctData} />
      <Leaders />
    </div>
  );
};

export default LeadersTab;
