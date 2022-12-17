import React from 'react';
import classes from './Loader.module.scss';

const Loader = () => (
  <div className={classes.loaderUser}>
    {new Array(20).fill(null).map((_, index) => (
      <span
        key={index}
        className={classes.loaderUser_item}
        style={{
          transform: `rotate(${(index + 1) * 18}deg)`,
        }} />
    ))}
  </div>
);

export default React.memo(Loader);
