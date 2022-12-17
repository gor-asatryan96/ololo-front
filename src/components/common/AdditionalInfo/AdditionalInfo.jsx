import React, { memo } from 'react';
import classNames from 'classnames';
import classes from './AdditionalInfo.module.scss';
import TableTournaments from '../TableTournaments/TableTournaments';
import TournamentsAndTournament from '../TournamentsAndTournament/TournamentsAndTournament';
import { useLanguageData } from '../../../context/LanguageProvider';
import Loader from '../Loader/Loader';

const AdditionalInfo = memo(({
  isAdditionalInfo, closeAdditionalInfo, specialAdditionalInfo,
  activeTournament, fromHistory,
}) => {
  const { t } = useLanguageData();
  const players = activeTournament?.players;

  return (
    <div className={classNames(
      classes.additionalInfo,
      { [classes.additionalInfo_active]: isAdditionalInfo },
      specialAdditionalInfo,
    )}>
      <div className={classes.additionalInfo__container}>
        {!players && <Loader />}
        {players && <div className={classes.additionalInfo__main}>
          <TournamentsAndTournament activeTournament={activeTournament} />
          <div className={classes.additionalInfo__gridRow}>
            <div className={classes.additionalInfo__playerCount}>{`${t['Players']} ${players.length}`}</div>
            <TableTournaments
              details={[ 'Number', 'ID', 'Status' ]}
              users={players}
              fromHistory={fromHistory}
              tournamentId={activeTournament.id} />
          </div>
        </div>}
        <button
          onClick={
            () => closeAdditionalInfo()
            // () => dispatch(toggleAdditionalInfoPopup(false))
          }
          type='button'
          className={classNames('button', classes.additionalInfo__closeButton)}
          aria-label='close additional information' />
      </div>
    </div>
  );
});

export default AdditionalInfo;
