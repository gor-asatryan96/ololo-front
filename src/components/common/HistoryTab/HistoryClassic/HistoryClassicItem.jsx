import React from 'react';
import classNames from 'classnames';
import classes from './HistoryClassic.module.scss';
import { getDateFromIso } from '../../../../helpers/general';
import { useLanguageData } from '../../../../context/LanguageProvider';
import { useSelector } from 'react-redux';
import { selectCurrency } from '../../../../redux/ducks/globalDuck';

const HistoryClassicItem = ({ item, currentRef }) => {
  const { t } = useLanguageData();
  const currency = useSelector(selectCurrency)
  const {
    started_at: startedAt, bet, finished_at: finishedAt, won, total_bet
  } = item;

  const {
    day, monthNum, year, time: startTime,
  } = getDateFromIso(startedAt);

  const { time: endTime } = getDateFromIso(finishedAt);
  const date = `${day}.${monthNum}.${year.toString().slice(-2)}`;
  const duration = `${startTime} - ${endTime}`;

  return (
    <div
      ref={currentRef}
      className={classNames(
        classes.history__column, { [classes.history__column_loss]: won < 0 },
      )}>
      <div className={classNames(classes.history__cell, classes.history__cell_date)}>
        {date}
      </div>
      <div className={classNames(classes.history__cell, classes.history__cell_duration)}>
        {duration}
      </div>
      <div className={classNames(classes.history__cell, classes.history__cell_bet)}>
        {`${bet} ${currency}`}
      </div>
      <div className={classNames(classes.history__cell, classes.history__cell_totalBet)}>
        {`${total_bet} ${currency}`}
      </div>
      <div className={classNames(classes.history__cell, classes.history__cell_status)}>
        {won < 0 && t['Lost']}
        {won > 0 && t['Won']}
        {won === 0 && t['Draw']}
        {won > 0 && <span className={classes.greenText}>
          {`${won} ${currency}`}
        </span>}
      </div>
    </div>
  );
};

export default HistoryClassicItem;
