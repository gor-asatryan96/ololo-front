import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRangeFilter } from '../../redux/ducks/lobbyDuck';

export const useRange = (range, steps) => {
  const {
    rangeFilter:
    { range1: rangeOne, range2: rangeTwo },
  } = useSelector(state => state.lobbyInfo);
  const dispatch = useDispatch();
  const step = 100 / (steps.length - 1);

  const currentRange1 = rangeOne && steps.indexOf(rangeOne) * step;
  const currentRange2 = rangeTwo && steps.indexOf(rangeTwo) * step;

  const [ isMouseDown, setIsMouseDown ] = useState(false);
  const [ isMouseDown2, setIsMouseDown2 ] = useState(false);

  const [ isTouchStart, setIsTouchStart ] = useState(false);
  const [ isTouchStart2, setIsTouchStart2 ] = useState(false);

  const [ moveRange, setMoveRange ] = useState(currentRange2 || 100);
  const [ moveRange2, setMoveRange2 ] = useState(currentRange1 || 0);

  const range1 = steps[Math.round(moveRange2 / step)];
  const range2 = steps[Math.round(moveRange / step)];

  function setRange(evt, isFirst, set, isTouch) {
    const { x, width } = range.current.getBoundingClientRect();
    const result = isTouch
      ? ((evt.targetTouches[0].clientX - x) / width * 100)
      : ((evt.clientX - x) / width * 100);
    if (result < 0 && !isFirst) {
      set(0);
    } else
    if (result > 100 && isFirst) {
      set(100);
    } else {
      set((prev) => {
        if (result - prev > step / 2 && (isFirst || prev + step < moveRange)) {
          if (prev + step > 100 && isFirst) return 100;
          return prev + step;
        } if (prev - result > step / 2 && (!isFirst || prev - step > moveRange2)) {
          if (prev - step < 0 && !isFirst) return 0;
          return prev - step;
        }
        return prev;
      });
    }
  }

  const onMouseMove = (evt) => {
    setRange(evt, true, setMoveRange);
  };

  const onMouseMove2 = (evt) => {
    setRange(evt, false, setMoveRange2);
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
  };

  const onMouseUp2 = () => {
    setIsMouseDown2(false);
  };

  const onTouchEnd = () => {
    setIsTouchStart(false);
  };

  const onTouchEnd2 = () => {
    setIsTouchStart2(false);
  };

  const onTouchMove = (evt) => {
    setRange(evt, true, setMoveRange, true);
  };

  const onTouchMove2 = (evt) => {
    setRange(evt, false, setMoveRange2, true);
  };

  useEffect(() => {
    if (isMouseDown || isMouseDown2) {
      document.addEventListener('mouseup', isMouseDown ? onMouseUp : onMouseUp2);
      document.addEventListener('mousemove', isMouseDown ? onMouseMove : onMouseMove2);
      document.body.style.cursor = 'grabbing';
    }

    if (isTouchStart || isTouchStart2) {
      document.addEventListener('touchend', isTouchStart ? onTouchEnd : onTouchEnd2);
      document.addEventListener('touchmove', isTouchStart ? onTouchMove : onTouchMove2);
    }

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'default';

      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchmove', onTouchMove);

      document.removeEventListener('mouseup', onMouseUp2);
      document.removeEventListener('mousemove', onMouseMove2);

      document.removeEventListener('touchend', onTouchEnd2);
      document.removeEventListener('touchmove', onTouchMove2);
    };
  }, [ isMouseDown, isTouchStart, isMouseDown2, isTouchStart2 ]);

  useEffect(() => {
    dispatch(setRangeFilter({ range2, range1 }));
  }, [ range2, range1 ]);

  return {
    moveRange,
    moveRange2,
    setIsMouseDown,
    setIsMouseDown2,
    setIsTouchStart,
    setIsTouchStart2,
  };
};
