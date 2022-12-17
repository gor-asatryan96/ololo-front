import React from 'react';
import classNames from 'classnames';
import classes from '../HistoryTab.module.scss';
import { useLanguageData } from '../../../../context/LanguageProvider';

const HistoryTabItem = ({ title, cb, activeTab }) => {
  const { t } = useLanguageData();
  return (
    <div
      onClick={() => cb(title)}
      className={classNames(
        classes.history__tab,
        { [classes.history__tab_active]: activeTab === title },
      )}
    >
      <span className={classes.history__tabText}>
        {t[title].toUpperCase()}
      </span>
    </div>
  );
};

export default HistoryTabItem;
