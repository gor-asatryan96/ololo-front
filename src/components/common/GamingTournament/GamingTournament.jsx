import React from 'react';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive/src';
import { useSelector } from 'react-redux';
import classes from './GamingTournament.module.scss';
import GamingCard from '../GamingCard/GamingCard';
import mediaQuery from '../../../constants/style/mediaQueries';
import { useLanguageData } from '../../../context/LanguageProvider';
import { numWithCommas } from '../../../helpers/general';
import { GAME_SCENES } from '../../../constants/game/ids';

const { COMPARISON } = GAME_SCENES;

const GamingTournaments = ({
  openAdditionalInfoPopup, roomData, activeTournament, showInfo, sendId,
}) => {
  const { t } = useLanguageData();
  const isTablet = useMediaQuery({ query: `(max-width: ${mediaQuery.tablet}px)` });

  const { buyIn, prizePool, name } = activeTournament;

  const activeTables = useSelector(state => state.activeTables);

  const activeTablesArray = Object.entries(activeTables);

  const gameScenesArray = activeTablesArray.map(item => item[1].gameScene);

  return (
    <div className={classes.gamingTournament}>
      <div className={classes.gamingTournament__top}>
        <h2 className={classNames('tournamentAndTournament', classes.gamingTournamentTitle)}>{name}</h2>
        {!isTablet && <button
          type='button'
          disabled={gameScenesArray.map(item => item === COMPARISON).includes(true)}
          className={classes.gamingTournament__moreInfo}
          onClick={() => {
            openAdditionalInfoPopup();
          }}>
          {t['More info']}</button>}
      </div>
      {
        !isTablet && showInfo
        && <div className={classes.gamingTournament__info}>
          <div className={classes.gamingTournament__row}>
            <span className={classes.gamingTournament__cell}>
              {t['Buy – in']}
            </span>
            <span className={classNames(
              classes.gamingTournament__cell,
              classes.gamingTournament__cell_betAmount,
            )}>
              ${numWithCommas(buyIn)}
            </span>
          </div>
          <div className={classes.gamingTournament__row}>
            <span className={classes.gamingTournament__cell}>
              {t['Prize']}
            </span>
            <span className={classNames(
              classes.gamingTournament__cell,
              classes.gamingTournament__cell_winAmount,
            )}>
              ${numWithCommas(prizePool)}
            </span>
          </div>
        </div>
      }
      <GamingCard
        theme={'green'}
        roomData={roomData}
        activeTournament={activeTournament}
        sendId={sendId}
        openAdditionalInfoPopup={openAdditionalInfoPopup.bind(this)}
        isTournament
        roomId={roomData.roomId}
      />
    </div>
  );
};

export default GamingTournaments;
