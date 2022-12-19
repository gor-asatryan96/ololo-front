import React from 'react';
import classNames from 'classnames';
import classes from '../PlayGame.module.scss';
import { useLanguageData } from '../../../../context/LanguageProvider';

const TabItem = ({
  title, index, currentTab, switchTab,
}) => {
  const { t } = useLanguageData();
  return (
    <li className={classes.playGame__tab}>
      <button
        onClick={() => switchTab(index)}
        type='button'
        className={classNames(classes.playGame__tabButton, {
          [classes.playGame__tabButton_active]: currentTab === index,
        })}>
        <span
          className={
          classNames(classes.playGame__tabButtonText, {
            [classes.playGame__tabButtonText_waitingTable]: title === t['Waiting'],
            [classes.playGame__tabButtonText_emptyTables]: title === t['Choose the table'],
          })}>
          {t[title]}
        </span>
      </button>
    </li>
  );
};

export default TabItem;
