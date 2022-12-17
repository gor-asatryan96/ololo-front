import React, { useMemo } from 'react';
import classNames from 'classnames';
import classes from './WinnerBanner.module.scss';
import { GAME_RESULTS, tournamentPlaces } from '../../../constants/game/ids';
import { useLanguageData } from '../../../context/LanguageProvider';
import avatars from '../../../assets/images/common/avatars';
import { getUserId } from '../../../redux/store';
import { getOrdinalPostfix } from '../../../helpers/general';

const { WIN, LOSE, DRAW } = GAME_RESULTS;

const WinnerBanner = ({
  result, isYouWinBannerShow, isTournament, currentRound, score,
  bet, winAmount, userAvatar, opponentAvatar, playerPosition, activeTournament,
}) => {
  const { t } = useLanguageData();
  const resultText = useMemo(() => getResultText(result), [ result ]);
  const userId = getUserId();
  const getAvatar = () => {
    if (result === '1') {
      return avatars[userAvatar];
    }
    if (result === '2') {
      return avatars[opponentAvatar];
    }
    return null;
  };

  const prizePozition = number => `${activeTournament.prizeRules[Math.log(number) / Math.log(2) + 1]} $`;
  const scores = isTournament
    && score
    && Object.values(score).find(player => player.score === 3);
  const loserPosition = tournamentPlaces[playerPosition];
  return (
    <div
      className={classNames(classes.winnerBanner, {
        [classes.winnerBanner_active]: isYouWinBannerShow,
      })}
    >
      <div className={classes.winnerBanner__top}>
        <div className={classes.winnerBanner__gameInfo}>
          <div className={classes.winnerBanner__betAmount}>
            {!isTournament && `${bet}$`}
            {isTournament && currentRound}
          </div>
          <div className={classes.winnerBanner__time}>00:00</div>
        </div>
      </div>
      <div className={classes.winnerBanner__container}>
        <div
          className={classNames(classes.winnerBanner__content, {
            [classes.winnerBanner__content_win]:
              result === '1' && !isTournament,
          })}
        >
          {!isTournament && result && result !== '3' && (
            <img
              src={getAvatar()}
              alt="avatar"
              className={classNames(classes.winnerBanner__img, {
                [classes.winnerBanner__img_win]: result === '1',
                [classes.winnerBanner__img_lost]: result === '2',
              })}
            />
          )}
          <div
            className={classNames(classes.winnerBanner__text, {
              [classes.winnerBanner__text_lost]: result === '2',
            })}
          >
            {scores ? null : resultText}
          </div>
          {(!isTournament || !result) && (
            <div
              className={classes.winnerBanner__amount}
            >{`$${winAmount}`}</div>
          )}
          {isTournament && result && (
            <div className={classes.winnerBanner__tournamentContainer}>
              <img
                src={avatars[userAvatar]}
                alt="avatar"
                className={classes.winnerBanner__tournamentContainerImg}
              />
              <div className={classes.winnerBanner__tournamentContainerTitle}>
                {playerPosition !== 1
                  && scores?.userId === userId
                  && 'You won this game!'}
                {scores?.userId && scores?.userId !== userId && 'You lost game'}
                {playerPosition === 1 && scores?.userId === userId && (
                  <>
                    {t['Congratulations']}
                    <br /> {t['YOU WIN']}
                  </>
                )}
              </div>
              {scores && (
                <div className={classes.winnerBanner__tournamentContainerRow}>
                  <div
                    className={classes.winnerBanner__tournamentContainerCell}
                  >
                    {t['Current Place']}
                  </div>
                  {/* winnerPlace  */}
                  {scores.userId === userId && playerPosition === 1 && (
                    <>
                      <div
                        className={classNames(
                          'tournamentAndTournament',
                          classes.winnerBanner__tournamentTitle,
                        )}
                      >
                        {t['Tournament and Tournament']}
                      </div>
                      <div className={classes.winnerBanner__tournamentPrize}>
                        <span
                          className={classes.winnerBanner__tournamentPrizeText}
                        >
                          {`${t['Your Prize']}  ${activeTournament.prizeRules[0]}$`}
                        </span>
                      </div>
                    </>
                  )}
                  {scores.userId !== userId && (
                    <>
                      <div
                        className={
                            classes.winnerBanner__tournamentContainerCell
                          }
                        >
                        <span>
                          {`${loserPosition} -
                          ${getOrdinalPostfix(loserPosition[loserPosition.length - 1])} ${' '}
                          ${t['Place']}
                          `}</span>
                      </div>
                      {prizePozition(playerPosition) ? (
                        <div
                          className={
                          classes.winnerBanner__tournamentContainerCell
                        }
                      >
                          <span>{t['YOU WON']}</span>
                          <span className={classes.notFinalWinnerPrize}>
                            {prizePozition(playerPosition)}
                          </span>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function getResultText(value) {
    let text;
    if (value === WIN) {
      text = t['YOU WIN'];
    } else if (value === LOSE) {
      text = t['Opponent Wins'];
    } else if (value === DRAW) {
      text = t['Draw'];
    }
    return text;
  }
};

export default WinnerBanner;
