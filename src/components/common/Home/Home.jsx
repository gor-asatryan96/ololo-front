import React, { useMemo } from 'react';
import MediaQuery from 'react-responsive/src';
import { useSelector } from 'react-redux';
import classes from './Home.module.scss';
import PoweredBy from '../PoweredBy/PoweredBy';
import mediaQuery from '../../../constants/style/mediaQueries';
import Nav from '../Nav/Nav';
import TablesTab from '../TablesTab/TablesTab';
import { HEADER_NAV_NAMES } from '../../../constants/game/names';
import TournamentsTab from '../TournamentsTab/TournamentsTab';
import LeadersTab from '../LeadersTab/LeadersTab';
import HistoryTab from '../HistoryTab/HistoryTab';
import Slider from '../Slider/Slider';
import { useMobileMode } from '../../../hooks/general/useMobileMode';

const {
  TABLES, TOURNAMENTS, LEADERS, HISTORY,
} = HEADER_NAV_NAMES;

const tabsComponents = {
  [TABLES]: <TablesTab />,
  [TOURNAMENTS]: <TournamentsTab />,
  [LEADERS]: <LeadersTab />,
  [HISTORY]: <HistoryTab />,
};

const Home = () => {
  const activeTab = useSelector(state => state.globalInfo.activeTab);
  const currentTab = useMemo(() => tabsComponents[activeTab], [ activeTab ]);
  const isMobile = useMobileMode();

  const slider = (!isMobile || activeTab === TABLES) && (
    <Slider />
  );

  return (
    <div className={classes.wrapper}>
      <main className={classes.main}>
        <div className={classes.main__inner}>
          {slider}
          {currentTab}
        </div>
        <MediaQuery maxWidth={mediaQuery.tablet}>
          <Nav />
        </MediaQuery>
      </main>
      <PoweredBy parentStyle={classes.poweredBy} />
    </div>
  );
};

export default Home;
