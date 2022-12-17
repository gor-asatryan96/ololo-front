import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './TournamentNotification.module.scss';
import { HEADER_NAV_NAMES, MAIN_SCENE_NAMES } from '../../../constants/game/names';
import { setNotification } from '../../../redux/ducks/tournamentsDuck';

const { START } = MAIN_SCENE_NAMES;
const { TOURNAMENTS } = HEADER_NAV_NAMES;

const TournamentNotification = ({ activeTab }) => {
  const dispatch = useDispatch();
  const { currentScene } = useSelector(state => state.globalInfo);
  const { notification } = useSelector(({ tournamentsInfo }) => tournamentsInfo);
  const [ unseenTournamentsCount, setUnseenTournamentsCount ] = useState(notification);

  useEffect(() => {
    setUnseenTournamentsCount(notification);
    if (activeTab === TOURNAMENTS && currentScene !== START) {
      setUnseenTournamentsCount(0);
      dispatch(setNotification(false));
    }
  }, [ activeTab, currentScene, notification ]);

  return <>
    { !!notification && <div className={classes.round}>
      <div style={{ position: 'relative' }}>
        <span className={classes.round__notification}>{unseenTournamentsCount < 10 ? unseenTournamentsCount : '9+'}</span>
      </div>
    </div> }
  </>;
};

export default TournamentNotification;
