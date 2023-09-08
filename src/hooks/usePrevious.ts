import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T, overwriteWhenUndefined = true): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    if (!overwriteWhenUndefined && value === undefined) {
      return;
    }

    ref.current = value;
  }, [value, overwriteWhenUndefined]);

  return ref.current;
};
