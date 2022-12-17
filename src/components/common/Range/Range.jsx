import React from 'react';
import { useSelector } from 'react-redux';
import { useRange } from '../../../hooks/game/useRange';
import classes from './Range.module.scss';

const Range = () => {
  const range = React.useRef(null);
  const { betRange } = useSelector(state => state.lobbyInfo);
  const {
    moveRange,
    moveRange2,
    setIsMouseDown,
    setIsMouseDown2,
    setIsTouchStart,
    setIsTouchStart2,
  } = useRange(range, betRange);

  return (
    <div className={classes.range}>
      <div className={classes.range__container}>
        <div ref={range} className={classes.range__line} />
        <button
          className={classes.range__button}
          aria-label="range button"
          onMouseDown={() => setIsMouseDown(true)}
          onTouchStart={() => setIsTouchStart(true)}
          style={{
            left: `${moveRange}%`,
            transform: `translate(-${moveRange}%, -50%)`,
          }}
        />
        <button
          className={classes.range__button}
          aria-label="range button"
          onMouseDown={() => setIsMouseDown2(true)}
          onTouchStart={() => setIsTouchStart2(true)}
          style={{
            left: `${moveRange2}%`,
            transform: `translate(-${moveRange2}%, -50%)`,
          }}
        />
      </div>
      <div className={classes.range__numberLine}>
        {
          betRange.map(number => (<div key={number} className={classes.range__numberLineValue}>
            {number}
          </div>))
        }
      </div>
    </div>
  );
};

export default Range;
