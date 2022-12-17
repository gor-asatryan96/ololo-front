import React from 'react';
import classes from './RotateScreen.module.scss';
import icon from '../../../assets/images/common/icons/phone.svg';

const MyComponent = () => (
  <div className={classes.rotate}>
    <img className={classes.rotate__img} src={icon} alt="rotate your phone" />
  </div>
);

export default MyComponent;
