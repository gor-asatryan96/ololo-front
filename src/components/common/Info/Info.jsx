import React from 'react';
import classNames from 'classnames';
import classes from './Info.module.scss';
import { useLanguageData } from '../../../context/LanguageProvider';
import { getDateFromIso, numWithCommas } from '../../../helpers/general';

const Info = ({ activeTournament }) => {
  const { t } = useLanguageData();
  const {
    maxPlayers, buyIn, prizePool, startedAt, players,
  } = activeTournament;
  const { day, time, monthText } = getDateFromIso(startedAt);

  return (
    <div className={classes.info}>
      <div className={classes.info__row}>
        <div className={classes.info__cell}>{t['Status']}</div>
        <div className={classes.info__cell}>-</div>
      </div>
      <div className={classes.info__row}>
        <div className={classes.info__cell}>{t['Buy – in']}</div>
        <div className={classNames(classes.info__cell, classes.info__cell_gold)}>
          {numWithCommas(buyIn)}
        </div>
      </div>
      <div className={classes.info__row}>
        <div className={classes.info__cell}>{t['Prize']}</div>
        <div className={classNames(classes.info__cell, classes.info__cell_green)}>
          {numWithCommas(prizePool)}
        </div>
      </div>
      <div className={classes.info__row}>
        <div className={classes.info__cell}>{t['Start Day']}</div>
        <div className={
          classNames(classes.info__cell, classes.info__cell_white)
        }>{`${time} | ${day} ${monthText}`}</div>
      </div>
      <div className={classes.info__row}>
        <div className={classes.info__cell}>{t['Players']}</div>
        <div className={classNames(classes.info__cell, classes.info__cell_white)}>
          {`${players.length} `} / {maxPlayers}
        </div>
      </div>
    </div>
  );
};

export default Info;
