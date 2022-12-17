import React, { useState, useRef } from 'react';
import MediaQuery from 'react-responsive/src';
import classes from './PlayGame.module.scss';
import GameCards from '../GameCards/GameCards';
import GamingCard from '../GamingCard/GamingCard';
import SliderButton from '../SliderButton/SliderButton';
import mediaQuery from '../../../constants/style/mediaQueries';
import { TABLES_TAB_NAMES } from '../../../constants/game/names';
import TabItem from './components/TabItem';

const tabNames = Object.values(TABLES_TAB_NAMES);

const PlayGame = ({ waitingTables, emptyTables, classicActiveTables }) => {
  const [ currentTab, setCurrentTab ] = useState(0);
  const scrollRef = useRef(null);
  return (
    <div className={classes.playGame}>
      { classicActiveTables.length < 2 && (
        <>
          <ul className={classes.playGame__tabs}>
            {
              tabNames.map((item, i) => <TabItem
                key={item}
                index={i}
                currentTab={currentTab}
                title={item}
                switchTab={setCurrentTab}
              />)
            }
          </ul>
          <div className={classes.playGame__cards}>
            {(currentTab || (waitingTables.length !== 0))
            && <MediaQuery minWidth={mediaQuery.noTablet}>
              <SliderButton scrollRef={scrollRef} />
            </MediaQuery>}
            <GameCards
              tables={currentTab ? emptyTables : waitingTables}
              isWaiting={!currentTab}
              scrollRef={scrollRef}
              isPlay
            />
          </div>
        </>
      )}

      {
        classicActiveTables.map(item => (
          <div key={item.roomId} className={classes.playGame__gamingCard}>
            <GamingCard
              roomData={item}
              roomId={item.roomId} />
          </div>
        ))
      }
    </div>
  );
};

export default PlayGame;
