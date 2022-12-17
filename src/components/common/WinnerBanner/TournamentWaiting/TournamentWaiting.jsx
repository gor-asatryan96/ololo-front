import React from 'react';
import classes from '../WinnerBanner.module.scss';
import avatars from '../../../../assets/images/common/avatars';
import { useLanguageData } from '../../../../context/LanguageProvider';
import Loader from '../../Loader/Loader';
import { getOrdinalPostfix } from '../../../../helpers/general';

const TournamentWaiting = ({ avatar, playerPosition }) => {
  const { t } = useLanguageData();
  return (
    <div className={classes.winnerBanner__tournamentContainer}>
      <img src={avatars[avatar]} alt='avatar' className={classes.winnerBanner__tournamentContainerImg} />
      <div className={classes.winnerBanner__tournamentContainerTitle}>
        You won this game
      </div>
      {<>
        <div className={classes.winnerBanner__tournamentContainerRow}>
          <div className={classes.winnerBanner__tournamentContainerCell}>
            {t['Current Position']}
          </div>
          <div className={classes.winnerBanner__tournamentContainerCell}>&nbsp;{`${playerPosition}${getOrdinalPostfix(playerPosition)}`}&nbsp;{t['Place']}</div>
        </div>
        <div className={classes.winnerBanner__tournamentContainerRow}>
          <div className={classes.winnerBanner__tournamentContainerCell}>{t['Next Game']}</div>
          <div className={classes.winnerBanner__tournamentContainerCell}>
            <div className={classes.winnerBanner__opponent}>
              <div className={classes.winnerBanner__opponentInfo}>
                <div className={classes.winnerBanner__opponentInfoRow}><Loader /></div>
              </div>
            </div>
          </div>
        </div>
      </>}
    </div>
  );
};

export default TournamentWaiting;
