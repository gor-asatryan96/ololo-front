import React from 'react';
import { useLanguageData } from '../../../../context/LanguageProvider';

const HeaderMenuTab = ({
  tabName, activeTab, setTab,
}) => {
  const { t } = useLanguageData()
  return(
  <li className='navList__item'>
    <button
      onClick={() => setTab(tabName)}
      type='button'
      className={`navLink__itemLink ${tabName === activeTab && 'navLink__itemLink_active'}`}
      aria-label={tabName.toLowerCase()}>
        {t[tabName]}
    </button>
  </li>
)};
export default HeaderMenuTab;
