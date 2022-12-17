import React, { memo } from 'react';
import classNames from 'classnames';
import classes from '../AdditionalInfo/AdditionalInfo.module.scss';
import { useLanguageData } from '../../../context/LanguageProvider';
import { getDateFromIso, getOrdinalPostfix, numWithCommas } from '../../../helpers/general';
import { winnerPlaces } from '../../../constants/game/ids';
import { getUserId } from '../../../redux/store';

const TournamentsAndTournament = ({
  playersButton, openPlayerList, classesRow, classesRows, activeTournament,
}) => {
  const { t } = useLanguageData();
  const {
    maxPlayers, buyIn, prizePool, startedAt, players, prizeRules,
  } = activeTournament;

  const userPosition = players.find(user => user.id === getUserId())?.position;

  const { day, time, monthText } = getDateFromIso(startedAt);

  return (
    <>
      <div className={classes.additionalInfo__title}>{activeTournament.name}</div>
      <div className={classNames(classes.additionalInfo__grid, classesRow)}>
        <div className={classNames(classes.additionalInfo__gridRow, classesRows)}>
          <div className={classes.additionalInfo__gridColumn}>
            <div
              className={
                classNames(classes.additionalInfo__gridColumnTitle,
                  classes.additionalInfo__gridColumnTitle_info)}>
              {t['Info']}
            </div>
            <div
              className={
                classNames(classes.additionalInfo__pseudoRow,
                  classes.additionalInfo__pseudoRow_status)}>
              <div className={classes.additionalInfo__pseudoCell}>
                {t['Status']}
              </div>
              <div className={classes.additionalInfo__pseudoCell}>
                <span className={classes.additionalInfo__statusPlace}>
                  {userPosition ? `${userPosition}${getOrdinalPostfix(userPosition)} Place` : '-'}
                </span>
              </div>
            </div>

            <div className={
              classNames(classes.additionalInfo__pseudoRow,
                classes.additionalInfo__pseudoRow_buyIn)}>
              <div className={classes.additionalInfo__pseudoCell}>
                {t['Buy – in']}
              </div>
              <div className={classes.additionalInfo__pseudoCell}>
                {numWithCommas(buyIn)}
              </div>
            </div>

            <div className={
              classNames(classes.additionalInfo__pseudoRow,
                classes.additionalInfo__pseudoRow_prize)}>
              <div className={classes.additionalInfo__pseudoCell}>
                {t['Prize']}
              </div>
              <div className={classes.additionalInfo__pseudoCell}>
                {numWithCommas(prizePool)}
              </div>
            </div>

            <div
              className={
                classNames(classes.additionalInfo__pseudoRow,
                  classes.additionalInfo__pseudoRow_startDay)}>
              <div className={classes.additionalInfo__pseudoCell}>
                {t['Start Day']}
              </div>
              <div className={classes.additionalInfo__pseudoCell}>
                {`${time} | ${day} ${monthText}`}
              </div>
            </div>

            {
              playersButton
              && <div
                className={
                  classNames(classes.additionalInfo__pseudoRow,
                    classes.additionalInfo__pseudoRow_startDay)}>
                <div className={classes.additionalInfo__pseudoCell}>
                  {t['Players']}
                </div>
                <div className={
                  classNames(classes.additionalInfo__pseudoCell,
                    classes.additionalInfo__pseudoCell_isPlayerConnect)}>
                  <span className={classes.additionalInfo__isPlayerConnect}>
                    <span className={classes.additionalInfo__playersConnected}>
                      {`${players.length} `}
                    </span>
                    / {maxPlayers}
                  </span>
                  <button
                    onClick={openPlayerList}
                    className={classes.additionalInfo__seePlayersButton}
                    type='button'
                    aria-label='open the list of participants' />
                </div>
              </div>
            }
          </div>
          <div className={classes.additionalInfo__gridColumn}>

            <div
              className={
                classNames(classes.additionalInfo__gridColumnTitle,
                  classes.additionalInfo__gridColumnTitle_winningPlace)}>
              {t['Winning Places']}
            </div>
            {prizeRules.map((item, index) => (
              <div
                key={item}
                className={
                            classNames(classes.additionalInfo__pseudoRow,
                              classes.additionalInfo__pseudoRow_winningPlaces)}>
                <div className={classes.additionalInfo__pseudoCell}>{winnerPlaces[index]}</div>
                <div className={classes.additionalInfo__pseudoCell}>
                  {Math.round(item / prizePool * 100)}%
                </div>
                <div className={classes.additionalInfo__pseudoCell}>${numWithCommas(item)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(TournamentsAndTournament);
