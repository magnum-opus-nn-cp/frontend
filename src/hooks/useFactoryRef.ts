import { useRef } from 'react';

/**
 * Единожды вызывает функцию и сохраняет ее значение в реф
 * @param factory - функция, создающая значение рефа
 */
export function useFactoryRef<T>(factory: () => T): T {
  const ref = useRef<T | null>(null);
  if (!ref.current) {
    ref.current = factory();
  }
  return ref.current;
}
