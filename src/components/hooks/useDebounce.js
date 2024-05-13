// hooks/useDebounce.js
import { useState, useEffect } from 'react';

const useDebounce = (callback, delay = 1000) => {
  const [debouncedCallback, setDebouncedCallback] = useState(callback);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(callback);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);

  return debouncedCallback;
};

export default useDebounce;
