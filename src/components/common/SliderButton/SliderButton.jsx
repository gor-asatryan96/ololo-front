import React from 'react';
import classNames from 'classnames';
import classes from './SliderButton.module.scss';

const SliderButton = ({ scrollRef }) => {
  let interval;
  const scroller = (isRight) => {
    const current = scrollRef.current.scrollLeft;
    scrollRef.current.scrollLeft = isRight ? current + 1000 : current - 1000;
  };

  const scrollButton = (isRight) => {
    scroller(isRight);
  };

  const scrollHover = (isRight) => {
    scroller(isRight);
    interval = setInterval(() => {
      scroller(isRight);
    }, 500);
  };

  const clearScrollInterval = () => {
    clearInterval(interval);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => scrollButton(false)}
        onMouseEnter={() => scrollHover(false)}
        onMouseLeave={clearScrollInterval}
        className={classNames(
          classes.gameTable__button,
          classes.gameTable__button_prev,
        )}
        aria-label="prev game list" />
      <button
        type="button"
        onClick={() => scrollButton(true)}
        onMouseEnter={() => scrollHover(true)}
        onMouseLeave={clearScrollInterval}
        className={classNames(
          classes.gameTable__button,
          classes.gameTable__button_next,
        )}
        aria-label="next game list" />
    </>
  );
};

export default SliderButton;
