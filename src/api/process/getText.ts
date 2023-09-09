import { useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../lib/react-query';
import { ScoreType, TextDescriptor } from './types';
import { TEXT_API_URL, TEXT_PARAM } from './urlKeys';
import { QUERY_KEY_TEXTS } from './queryKeys';

export type GetTextResponse = TextDescriptor;

export const getText = ({ textId, type = 'bert' }: { textId: number; type: ScoreType }): Promise<GetTextResponse> => {
  return axios.get(TEXT_API_URL.replace(`:${TEXT_PARAM}`, String(textId)), {
    params: {
      type
    }
  });
};

type QueryFnType = typeof getText;

type UseTextOptions = {
  textId: number;
  type: ScoreType;
  config?: QueryConfig<QueryFnType>;
};

export const useText = ({ textId, type, config }: UseTextOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_TEXTS, textId, type],
    queryFn: async () => {
      return await getText({ textId, type });
    }
  });
};
