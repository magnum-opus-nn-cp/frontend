import { useRef } from 'react';

export function usePropsRef<T extends object>(props: T) {
  const ref = useRef<T>(props);
  Object.assign(ref.current, props);
  return ref.current;
}
