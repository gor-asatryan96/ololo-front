import React from 'react';
import classNames from 'classnames';
import classes from './PrizePool.module.scss';
import { useLanguageData } from '../../../context/LanguageProvider';
import { winnerPlaces } from '../../../constants/game/ids';
import { numWithCommas } from '../../../helpers/general';

const PrizePool = ({ activeTournament }) => {
  const { t } = useLanguageData();
  const { prizeRules, prizePool } = activeTournament;
  return (
    <div className={classes.prizePool}>
      <h2 className={classes.prizePool__title}>{t['Winning Places']}</h2>
      <ul className={classes.prizePool__list}>
        {prizeRules.map((item, index) => (
          <li key={index} className={classes.prizePool__item}>
            <div className={
              classNames(classes.prizePool__cell, classes.prizePool__cell_position)}>
              {winnerPlaces[index]}
            </div>
            <div className={
              classNames(classes.prizePool__cell, classes.prizePool__cell_percent)}>
              {item / prizePool * 100}%
            </div>
            <div className={
              classNames(classes.prizePool__cell, classes.prizePool__cell_winnerAmount)}>
              ${numWithCommas(item)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrizePool;
