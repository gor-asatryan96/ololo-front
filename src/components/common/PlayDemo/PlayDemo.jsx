import React from 'react';

import classes from './PlayDemo.module.scss';
import Welcome from '../Welcome/Welcome';
import PoweredBy from '../PoweredBy/PoweredBy';

const PlayDemo = () => (
  <div className={classes.wrapper}>
    <Welcome />
    <PoweredBy />
  </div>
);

export default PlayDemo;
