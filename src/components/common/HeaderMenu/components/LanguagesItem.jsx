import React from 'react';
import classNames from 'classnames';
import classes from '../HeaderMenu.module.scss';

const LanguagesItem = ({
  lang,
  active,
  changeLanguage,
}) => (
  <li
    className={classNames(
      classes.languages__item,
      classes[`languages__item_${lang}`],
    )}
    onClick={() => changeLanguage(lang)}
  >
    <div
      className={
        classNames(classes.languages__itemLink, active && classes.languages__itemLink_active)
      }>
      <span className={classes.languages__itemLinkFlag} />
    </div>
  </li>
);

export default LanguagesItem;
