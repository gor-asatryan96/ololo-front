import React, { memo, useState } from 'react';
import classNames from 'classnames';
import classes from './AdditionalInfo.module.scss';
import Info from '../../common/Info/Info';
import PrizePool from '../../common/PrizePool/PrizePool';
import PlayersList from '../../common/PlayersList/PlayersList';
import AdditionalInfoTabs from '../AdditionalInfoTabs/AdditionalInfoTabs';
import { useLanguageData } from '../../../context/LanguageProvider';
import { TOURNAMENT_SCENES } from '../../../constants/game/ids';
import { TOURNAMENT_INFO_NAV_NAMES } from '../../../constants/game/names';
import { emitLeaveTournament } from '../../../api/socket/emitters';

const { REGISTRATION } = TOURNAMENT_SCENES;
const { INFO, PLAYERS, PRIZEPOOL } = TOURNAMENT_INFO_NAV_NAMES;

const infoTabs = Object.values(TOURNAMENT_INFO_NAV_NAMES);

const AdditionalInfo = ({
  closeAdditionalInfoMobile, toggleJoin, fromInfo,
  isActiveTournamentMy, chosenTournament, nullifyId,
}) => {
  const { t } = useLanguageData();
  const [ activeTab, setActiveTab ] = useState(INFO);
  const closeInfo = () => {
    closeAdditionalInfoMobile();
    // dispatch(toggleAdditionalInfoPopup(false));
    nullifyId();
  };

  const leaveTournament = () => {
    emitLeaveTournament({ tournamentId: chosenTournament.id });
    closeAdditionalInfoMobile();
  };

  return (
    <div className={classes.additionalInfo}>
      <h2 className={classNames('tournamentAndTournament', classes.additionalInfo__title)}>{chosenTournament.name}</h2>
      <div className={classes.additionalInfo__tabsContent}>
        <AdditionalInfoTabs infoTabs={infoTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === INFO && <Info activeTournament={chosenTournament} />}
        {activeTab === PRIZEPOOL && <PrizePool activeTournament={chosenTournament} />}
        {activeTab === PLAYERS && <PlayersList players={chosenTournament.players} />}
      </div>
      <button
        type='button'
        className={classes.additionalInfo__closeTournaments}
        onClick={closeInfo}
        aria-label='close tournaments'
      />
      <div className={classes.additionalInfo__joinButtonContainer}>
        {chosenTournament.state === REGISTRATION && !fromInfo && <button
          className={classNames(classes.additionalInfo__joinButton, {
            [classes.AdditionalInfo__unjoinButton]: isActiveTournamentMy,
          })}
          type='button'
          onClick={toggleJoin}>
          {isActiveTournamentMy ? t['Leave'] : t['Join']}
        </button>}
        {
          fromInfo && chosenTournament.state !== REGISTRATION && <button
            className={
              classNames(classes.additionalInfo__joinButton, classes.AdditionalInfo__unjoinButton)
            }
            type='button'
            onClick={leaveTournament}
          >{t['Leave']}</button>
         }
      </div>
    </div>
  );
};

export default memo(AdditionalInfo);
