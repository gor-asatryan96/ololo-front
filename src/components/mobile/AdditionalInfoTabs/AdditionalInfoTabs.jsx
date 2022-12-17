import React from 'react';
import classNames from 'classnames';
import classes from './AdditionalInfoTabs.module.scss';

const AdditionalInfoTabs = ({ infoTabs, setActiveTab, activeTab }) => (
  <div>
    <ul className={classes.additionalTabList}>
      {
          infoTabs.map(tab => (
            <li key={tab} className={classes.additionalTabItem}>
              <button
                type="button"
                className={classNames(
                  classes.additionalTabItemButton,
                  { [classes.additionalTabItemButton_active]: activeTab === tab },
                )}
                onClick={() => setActiveTab(tab)}
              >
                <span className={classes.additionalTabItemButton__span}>
                  {tab}
                </span>
              </button>
            </li>
          ))
        }
    </ul>
  </div>
);

export default AdditionalInfoTabs;
