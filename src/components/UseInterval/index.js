import { useEffect, useRef } from 'react';

function useInterval(callback, delay, status) {
  const savedCallback = useRef();
  const timerId = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (status === 'off' && timerId.current) {
      clearInterval(timerId.current)
      return
    }
    if (delay !== null && status === 'on') {
      timerId.current = setInterval(tick, delay);
      return () => clearInterval(timerId.current);
    }
  }, [delay, status]);

}

export default useInterval
