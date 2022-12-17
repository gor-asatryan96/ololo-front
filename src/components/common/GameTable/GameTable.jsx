import React, { useRef } from 'react';
import classNames from 'classnames';
import MediaQuery from 'react-responsive/src';
import mediaQuery from '../../../constants/style/mediaQueries';
import classes from './GameTable.module.scss';
import GameCards from '../GameCards/GameCards';
import SliderButton from '../SliderButton/SliderButton';
import { useLanguageData } from '../../../context/LanguageProvider';
import { TABLES_TAB_NAMES } from '../../../constants/game/names';

const { EMPTY } = TABLES_TAB_NAMES;

const GameTable = ({ tables, status }) => {
  const isEmpty = status === EMPTY;

  const { t } = useLanguageData();

  const scrollRef = useRef(null);

  return (
    <div className={classes.gameTable}>
      <div className={classes.gameTable__container}>
        <div className={classNames(
          classes.gameTable__title,
          {
            [classes.gameTable__title_empty]: isEmpty,
            [classes.gameTable__title_waiting]: !isEmpty,
          },
        )}>{t[status]}</div>
        <div className={classes.gameTable__tableContainer}>
          {tables.length !== 0 && (
          <MediaQuery minWidth={mediaQuery.noTablet}>
            <SliderButton scrollRef={scrollRef} />
          </MediaQuery>)}
          <GameCards
            tables={tables}
            scrollRef={scrollRef}
            isWaiting={!isEmpty} />
        </div>
      </div>
    </div>
  );
};

export default GameTable;
