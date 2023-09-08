import { SingleTimeoutManager } from '../utils/SingleTimeoutManager';
import { useFactoryRef } from './useFactoryRef';

export const useSingleTimeout = () => {
  return useFactoryRef(() => new SingleTimeoutManager());
};
