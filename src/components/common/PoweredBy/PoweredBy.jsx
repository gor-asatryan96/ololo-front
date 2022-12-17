import React from 'react';
import classNames from 'classnames';
import classes from './PoweredBy.module.scss';
import img from '../../../assets/images/common/nrg/nrg-logo.png';

const PoweredBy = ({ parentStyle }) => (
  <div className={classNames(classes.poweredBy, parentStyle)}>
    <img className={classes.poweredBy__logo} src={img} alt="nrg logo" />
  </div>
);

export default PoweredBy;
