import React from 'react';
import { HEADER_SETTINGS_TABS } from '../../../../constants/game/names';

const HeaderMenuTab = ({
  tabName, activeTab, setTab,
}) => (
  <li className='navList__item'>
    <button
      onClick={() => setTab(tabName)}
      type='button'
      className={`navLink__itemLink ${tabName === activeTab && 'navLink__itemLink_active'}`}
      aria-label={`${HEADER_SETTINGS_TABS[tabName].toLowerCase()}`}>{HEADER_SETTINGS_TABS[tabName]}
    </button>
  </li>
);
export default HeaderMenuTab;
