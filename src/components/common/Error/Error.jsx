import React from 'react';
import { useDispatch } from 'react-redux';
import classes from './Error.module.scss';
import errorMobile from '../../../assets/images/common/icons/errorMobile.svg';
import errorDesktop from '../../../assets/images/common/icons/errorDesktop.svg';
import mediaQuery from '../../../constants/style/mediaQueries';
import { removeErrorMessage } from '../../../redux/ducks/errorDuck';
import { useLanguageData } from '../../../context/LanguageProvider';

const Error = ({ errorMessage }) => {
  console.log(errorMessage);
  const { t } = useLanguageData();
  const dispatch = useDispatch();

  const close = () => {
    dispatch(removeErrorMessage());
  };
  return (
    <div onClick={close} className={classes.error}>
      <div onClick={e => e.stopPropagation()} className={classes.error__container}>
        <div className={classes.error__description}>
          <picture className={classes.error__image}>
            <source srcSet={errorDesktop} media={`(min-width: ${mediaQuery.noTablet}px)`} />
            <img className={classes.error__img} src={errorMobile} alt="error decoration" />
          </picture>
          {t[errorMessage]}
        </div>
        <button onClick={close} type="button" className={classes.error__buttonClose} aria-label="close error button" />
      </div>
    </div>
  );
};

export default Error;
