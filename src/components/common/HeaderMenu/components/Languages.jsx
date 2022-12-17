import React from 'react';
import classNames from 'classnames';
import classes from '../HeaderMenu.module.scss';
import { useLanguageData } from '../../../../context/LanguageProvider';
import LanguagesItem from './LanguagesItem';
import { FDLanguages } from '../../../../fakeData';

const Languages = () => {
  const {
    t,
    changeLanguage,
  } = useLanguageData();
  return (
    <div className={classes.languages}>
      <div className={classNames('headerMenuTitle', classes.languagesTitle)}>{t['Languages']}</div>
      <ul className={classes.languages__list}>
        {FDLanguages.map(lang => (
          <LanguagesItem
            key={lang}
            lang={lang}
            changeLanguage={changeLanguage}
            active={t.lang === lang} />
        ))}
      </ul>
    </div>
  );
};

export default Languages;
