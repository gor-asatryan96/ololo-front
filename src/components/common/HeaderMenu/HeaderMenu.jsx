import React, { useState } from 'react';
import classNames from 'classnames';
import MediaQuery from 'react-responsive/src';
import classes from './HeaderMenu.module.scss';
import PoweredBy from '../PoweredBy/PoweredBy';
import mediaQuery from '../../../constants/style/mediaQueries';
import HeaderMenuTab from './components/HeaderMenuTab';
import { HEADER_SETTINGS_TABS } from '../../../constants/game/names';
import Avatars from './components/Avatars';
import Languages from './components/Languages';

const HeaderMenu = ({ menuToggle }) => {
  const [ activeTab, setActiveTab ] = useState('SETTINGS');

  return (
    <div className={classNames(
      classes.headerMenu,
      { [classes.headerMenu_active]: !menuToggle },
    )}>
      <div className={classes.headerMenu__container}>
        <MediaQuery maxWidth={mediaQuery.tablet}>
          <ul className={classNames('navList', classes.headerMenu__tabs)}>
            {Object.keys(HEADER_SETTINGS_TABS)
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
        <Languages />
        <Avatars />
      </div>
      <MediaQuery maxWidth={mediaQuery.tablet}>
        <PoweredBy />
      </MediaQuery>
    </div>
  );
};

export default HeaderMenu;
