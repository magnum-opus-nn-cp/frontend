import { useCallback, useEffect } from 'react';

export const usePreventWindowScroll = (isPrevented?: boolean) => {
  const preventScroll = useCallback((isPrevented: boolean) => {
    document.documentElement.classList.toggle('scroll-prevented', isPrevented);
  }, []);

  useEffect(() => {
    preventScroll(!!isPrevented);
  }, [isPrevented, preventScroll]);

  return preventScroll;
};
