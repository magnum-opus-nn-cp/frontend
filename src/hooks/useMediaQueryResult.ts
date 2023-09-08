import { useMemo, useState, useEffect } from 'react';

export const breakpointMobileSmall = 320;
export const breakpointMobileLarge = 375;
export const breakpointTabletSmall = 768;
export const breakpointTabletLarge = 1024;
export const breakpointDesktopSmall = 1280;
export const breakpointDesktopMedium = 1440;
export const breakpointDesktopLarge = 1920;

export const mediaQuery = {
  mobileLargeDown: `(max-width: ${breakpointMobileLarge - 1}px)`, // 374
  tabletSmallDown: `(max-width: ${breakpointTabletSmall - 1}px)`, // 767
  tabletSmallUp: `(min-width: ${breakpointTabletSmall}px)`, // 767
  tabletLargeDown: `(max-width: ${breakpointTabletLarge - 1}px)`, // 1023
  tabletLargeUp: `(min-width: ${breakpointTabletLarge}px)`, // 1024
  desktopSmallDown: `(max-width: ${breakpointDesktopSmall - 1}px)`, // 1279
  desktopSmallUp: `(min-width: ${breakpointDesktopSmall}px)`, // 1280
  desktopMediumDown: `(max-width: ${breakpointDesktopMedium - 1}px)`, // 1439
  desktopMediumUp: `(min-width: ${breakpointDesktopMedium}px)`, // 1440
  desktopLarge: `(min-width: ${breakpointDesktopLarge}px)` // 1919
};

export function useMediaQueryResult(mediaQueryString: string) {
  const mediaQueryList = useMemo(() => {
    return window.matchMedia(mediaQueryString);
  }, [mediaQueryString]);

  const [queryResult, setQueryResult] = useState(mediaQueryList.matches);

  useEffect(() => {
    const handleMediaQueryListChange = (e: MediaQueryListEvent) => setQueryResult(e.matches);

    mediaQueryList.addEventListener('change', handleMediaQueryListChange);
    return () => mediaQueryList.removeEventListener('change', handleMediaQueryListChange);
  }, [mediaQueryList]);

  return queryResult;
}
