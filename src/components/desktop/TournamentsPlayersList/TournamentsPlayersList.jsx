import React, { memo } from 'react';
import classNames from 'classnames';
import classes from './TournamentsPlayersList.module.scss';
import PlayersList from '../../common/PlayersList/PlayersList';

const TournamentsPlayersList = ({ closePlayerList, players, name }) => (
  <div className={classes.tournamentsPlayers}>
    <h2 className={classNames(
      'tournamentAndTournament',
      classes.tournamentsPlayers__title,
    )}>{name}</h2>
    <button type='button' className={classes.tournamentsPlayers__close} onClick={closePlayerList} aria-label='close players list' />
    <PlayersList players={players} />
  </div>
);

export default memo(TournamentsPlayersList);
