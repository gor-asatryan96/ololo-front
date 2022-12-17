import React, { memo } from 'react';
import classNames from 'classnames';
import classes from './HistoryTournament.module.scss';
import { useLanguageData } from '../../../../context/LanguageProvider';
import { getDateFromIso } from '../../../../helpers/general';

const HistoryTournamentItem = memo(({ item, openAdditionalInfo }) => {
  const { t } = useLanguageData();

  const {
    day, monthNum, year,
  } = getDateFromIso(item.startedAt);
  const date = `${day}.${monthNum}.${year.toString().slice(-2)}`;

  return (
    <div
      className={classNames(classes.historyTournaments__column)}>
      <div className={
        classNames(classes.historyTournaments__row, classes.historyTournaments__row_1)}>
        <div
          className={classes.historyTournaments__pseudoRow}>
          <div className={
            classNames(classes.historyTournaments__cell, classes.historyTournaments__cell_1)}>
            <span className={classes.historyTournaments__gameType}>
              {item.name}
            </span>
          </div>
          <div className={
            classNames(classes.historyTournaments__cell, classes.historyTournaments__cell_2)}>
            <span className={classes.historyTournaments__betAmount}>
              {t['Bet']} <span className={classes.historyTournaments__betAmountSize}>{item.buyin}</span>
            </span>
          </div>
        </div>
        <div className={classes.historyTournaments__pseudoRow}>
          <div
            className={
              classNames(classes.historyTournaments__cell, classes.historyTournaments__cell_1,
                classes.historyTournaments__cell_datePlayers)}>
            <span className={classes.historyTournaments__date}>
              {date} &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            </span>
            {t['Place']} {item.position}
            <span className={classes.historyTournaments__playerPosition}> / {t['Player']} {item.maxPlayers}</span>
          </div>
          <div className={
            classNames(classes.historyTournaments__cell, classes.historyTournaments__cell_2)}>
            {
              item.winAmount ? <span className={classes.historyTournaments__winAmount}>
                {t['Win']} <span className={classes.historyTournaments__winAmountSize}>${item.winAmount}</span>
              </span> : <span style={{ color: 'grey' }}>{t['Loss']}</span>
            }
          </div>
        </div>
      </div>
      <div className={
        classNames(classes.historyTournaments__row, classes.historyTournaments__row_2)}>
        <button
          onClick={() => openAdditionalInfo(item.id)}
          type="button"
          className={classes.historyTournaments__button}
          aria-label="info button"
        />
      </div>
    </div>
  );
});

export default HistoryTournamentItem;
