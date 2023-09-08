import {mediaQuery, useMediaQueryResult} from './useMediaQueryResult';

export const useIsDesktop = () => useMediaQueryResult(mediaQuery.tabletSmallDown);
