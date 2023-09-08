import { useEffect, useRef } from 'react';
import {SingleTimeoutManager} from '../utils/SingleTimeoutManager';

/**
 * Создает таймаут менеджер, который автоматически очищает активный
 * таймаут при анмаунте компонента. Активен может быть только один
 * таймаут. При создании нового предыдущий отключается.
 *
 * @example
 * function MyComponent() {
 *   const [loading, setLoading] = useState(false);
 *   const timeoutRef = useTimeoutRef();
 *   const handleClick = () => {
 *     setLoading(true);
 *     timeoutRef.set(() => {
 *       setLoading(false);
 *     }, 2000);
 *   };
 *
 *   return <button type="button" onClick={handleClick}>
 *     {loading ? 'Loading' : 'Click'}
 *   </button>;
 * }
 */
export function useTimeoutRef() {
  const ref = useRef<SingleTimeoutManager | null>(null);

  if (!ref.current) {
    ref.current = new SingleTimeoutManager();
  }

  useEffect(() => {
    return () => {
      if (ref.current) ref.current.clear();
    };
  }, []);

  return ref.current;
}
