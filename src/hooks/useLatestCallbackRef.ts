import { useRef } from "react";
import { useFactoryRef } from './useFactoryRef';

/**
 * Позволяет обернуть меняющийся колбек в неменяющйеся с помощью рефа
 * @param callback - колбек
 * @returns постоянная функция, которая вызывает последний переданный колбек
 * @example
 *  const t = new Date();
 *  const onClick = useLatestCallbackRef(() => console.log(t));
 *  onClick -> постоянная функция, которая вызывает последний переданный колбек
 */
export function useLatestCallbackRef<Args extends any[], Result>(
  callback: (...args: Args) => Result
): (...args: Args) => Result {
  const callbackRef = useRef<(...args: Args) => Result>(callback);
  callbackRef.current = callback;
  return useFactoryRef(() => (...args: Args) => callbackRef.current(...args));
}
