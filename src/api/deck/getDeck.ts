import {Question} from './types';
import {axios} from '../../lib/axios';
import {
  DECK_API_URL,
  QUESTION_API_URL,
  QUESTION_PARAM_DECK_ID,
  QUESTION_PARAM_QUESTION_ID,
} from './urlKeys';
import {ExtractFnReturnType, QueryConfig} from '../../lib/react-query';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_DECKS, QUERY_KEY_QUESTION} from './queryKeys';

export type GetDeckResponse = {
  deck: {
    name: string;
    description: string;
  },
  slides: {
    slide: number;
    data: {
      slug: string;
      answer: any;
      photos?: string[]
    }[];
  }[];
};

export const getDeck = ({ deckId }: { deckId: number }): Promise<GetDeckResponse> => {
  return axios.get(
    DECK_API_URL
      .replace(`:${QUESTION_PARAM_DECK_ID}`, String(deckId))
  );
};

type QueryFnType = typeof getDeck;

type UseDeckOptions = {
  deckId: number;
  config?: QueryConfig<QueryFnType>;
};

export const useDeck = ({ deckId, config }: UseDeckOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_DECKS, deckId],
    queryFn: async () => {
      return await getDeck({ deckId });
    },
  });
};
