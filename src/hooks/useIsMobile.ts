import {mediaQuery, useMediaQueryResult} from './useMediaQueryResult';

export const useIsMobile = () => useMediaQueryResult(mediaQuery.tabletSmallDown);
