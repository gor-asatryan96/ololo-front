import React from 'react';
import { useLanguageData } from '../../../context/LanguageProvider';
import classes from './Popup.module.scss';

const Popup = ({ close = () => {}, children, title = '' }) => {
  const { t } = useLanguageData()
  return (
    <div onClick={close} className={classes.popup}>
    <div onClick={e => e.stopPropagation()} className={classes.popup__container}>
      <button onClick={close} type="button" className={classes.popup__buttonClose} aria-label="close error button" />
      <span className={classes.popup__title}>{t[title]}</span>
      {children}
    </div>
  </div>
  )
}

export default Popup