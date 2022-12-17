import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { HEADER_NAV_NAMES } from '../../../constants/game/names';
import { setActiveTab } from '../../../redux/ducks/globalDuck';
import { useLanguageData } from '../../../context/LanguageProvider';
import TournamentNotification from '../TournamentNotification/TournamentNotification';

const navsArr = Object.values(HEADER_NAV_NAMES);

const Nav = () => {
  const { t } = useLanguageData();
  const { activeTab, isLeaderboardActive } = useSelector(({ globalInfo }) => globalInfo);
  const dispatch = useDispatch();
  const filteredNavsArr = isLeaderboardActive
    ? navsArr
    : navsArr.filter(name => name !== HEADER_NAV_NAMES.LEADERS);

  return (
    <ul className="navList">
      {filteredNavsArr.map(item => (
        <li key={item} className="navList__item">
          <div
            onClick={() => {
              sessionStorage.setItem('activeTab', item);
              dispatch(setActiveTab(item));
            }}
            className={classNames('navLink__itemLink', {
              navLink__itemLink_active: activeTab === item,
            })}
            >
            <span>{t[item]}</span>
          </div>
          {item === HEADER_NAV_NAMES.TOURNAMENTS
          && <TournamentNotification activeTab={activeTab} />}
        </li>
      ))}
    </ul>
  );
};

export default Nav;
