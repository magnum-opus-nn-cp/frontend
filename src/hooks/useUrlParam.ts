import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export interface UseUrlParamOptions<T> {
  parser?: (value: string) => T;
}

export const useUrlParam = <T = string | null>(key: string, options: UseUrlParamOptions<T> = {}) => {
  const { [key]: param } = useParams();

  const value = useMemo(() => {
    if (param === undefined) {
      return null;
    }

    if (options.parser) {
      return options.parser(param);
    }

    return param;
  }, [param, options]);

  return value as T | null;
};
