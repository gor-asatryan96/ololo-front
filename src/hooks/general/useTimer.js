import {
  useState, useEffect, useRef, useCallback,
} from 'react';

export function useTimer(initialValue, ms, isReversed) {
  const [ count, setCount ] = useState(Math.round((initialValue - Date.now()) / 1000));
  const intervalRef = useRef(0);

  const start = useCallback((init) => {
    if (intervalRef.current !== 0) {
      return;
    }

    if (isReversed) {
      intervalRef.current = setInterval(() => {
        if (Math.round((init - Date.now()) / 1000) < 0) {
          setCount(0);
          document.location.reload(true);
        } else {
          setCount(Math.round((init - Date.now()) / 1000));
        }
      }, ms);
    } else {
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, ms);
    }
  }, [ isReversed, ms ]);

  useEffect(() => {
    if (isReversed) {
      if (count <= 0) {
        stop();
      }
    }
  });

  const stop = useCallback(() => {
    if (intervalRef.current === 0) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
  }, []);

  const reset = useCallback((init) => {
    setCount(Math.round((init - Date.now()) / 1000));
  }, [ initialValue ]);

  return [ count, start, stop, reset ];
}
