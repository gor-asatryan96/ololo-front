import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import MediaQuery from 'react-responsive/src';
import classes from './HeaderMenu.module.scss';
import PoweredBy from '../PoweredBy/PoweredBy';
import mediaQuery from '../../../constants/style/mediaQueries';
import HeaderMenuTab from './components/HeaderMenuTab';
import { HEADER_SETTINGS_TABS } from '../../../constants/game/names';
import Settings from './components/Settings';
import HowToPlay from '../HowToPlay/HowToPlay';
import { useMobileMode } from '../../../hooks/general/useMobileMode';

const { HOW_TO_PLAY, SETTINGS } = HEADER_SETTINGS_TABS

const MenuComponents = {
  [SETTINGS]: Settings,
  [HOW_TO_PLAY]: HowToPlay
}

const HeaderMenu = ({ menuToggle }) => {
  const [ activeTab, setActiveTab ] = useState(SETTINGS);
  const isMobile = useMobileMode()

  const ActiveComponent = MenuComponents[activeTab]

  useEffect(() => {
    if(!isMobile) {
      setActiveTab(SETTINGS)
    }
  }, [isMobile])

  return (
    <div className={classNames(
      classes.headerMenu,
      { [classes.headerMenu_active]: !menuToggle },
    )}>
      <div className={classes.headerMenu__container}>
        <MediaQuery maxWidth={mediaQuery.tablet}>
          <ul className={classNames('navList', classes.headerMenu__tabs)}>
            {Object.values(HEADER_SETTINGS_TABS)
              .map(tabName => (
                <HeaderMenuTab
                  key={tabName}
                  tabName={tabName}
                  activeTab={activeTab}
                  setTab={setActiveTab}
                />
              ))}
          </ul>
        </MediaQuery>
        <ActiveComponent />
      </div>
      <MediaQuery maxWidth={mediaQuery.tablet}>
        <PoweredBy />
      </MediaQuery>
    </div>
  );
};

export default HeaderMenu;
