import React, { memo } from 'react';
import classNames from 'classnames';
import classes from './AdditionalInfo.module.scss';
import TournamentsAndTournament from '../../common/TournamentsAndTournament/TournamentsAndTournament';
import { useLanguageData } from '../../../context/LanguageProvider';
import { TOURNAMENT_SCENES } from '../../../constants/game/ids';

const { REGISTRATION } = TOURNAMENT_SCENES;

const AdditionalInfo = ({
  openPlayerList, toggleJoin, isActiveTournamentMy, chosenTournament, tournamentsLimit, closeInfo,
}) => {
  const { t } = useLanguageData();

  return (
    <div className={classes.AdditionalInfo}>
      <button className={classes.close__btn} onClick={closeInfo} />
      <TournamentsAndTournament
        activeTournament={chosenTournament}
        playersButton
        openPlayerList={openPlayerList}
        classesRow={classes.innerTournament}
        classesRows={classes.innerRows}
      />
      {chosenTournament.state === REGISTRATION && <button
        type='button'
        className={classNames(classes.AdditionalInfo__joinButton, {
          [classes.AdditionalInfo__unjoinButton]: isActiveTournamentMy,
        })}
        aria-label='join button'
        onClick={toggleJoin}
        disabled={tournamentsLimit}
      >
        {isActiveTournamentMy ? t['Leave'] : t['Join']}
      </button>}
    </div>
  );
};

export default memo(AdditionalInfo);
