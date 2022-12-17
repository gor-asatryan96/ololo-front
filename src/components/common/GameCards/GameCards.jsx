import React from 'react';
import classNames from 'classnames';
import classes from './GameCards.module.scss';
import GameCard from '../GameCard/GameCard';
import { useLanguageData } from '../../../context/LanguageProvider';

const GameCards = ({
  tables, isWaiting, scrollRef, isPlay,
}) => {
  const { t } = useLanguageData();
  return (
    <>
      {tables.length
        ? <ul ref={scrollRef} className={classes.gameCardList}>
          <div className={classes.gameCardListWrapper} >
            {tables.map(item => (
              <GameCard key={item.id} isWaiting={isWaiting} tableData={item} />
            ))}
          </div>
        </ul>
        : <div className={classNames(classes.gameTable__emptyTable, {
          [classes.gameTable__emptyTablePlay]: isPlay,
        })}>
          {isPlay ? t['Choose from Empty tables!'] : t['Please join a new table!']}
        </div>}
    </>
  );
};
export default GameCards;
