import {Question} from './types';
import {axios} from '../../lib/axios';
import {FIRST_QUESTION_API_URL, FIRST_QUESTION_PARAM} from './urlKeys';
import {ExtractFnReturnType, QueryConfig} from '../../lib/react-query';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_FIRST_QUESTION} from './queryKeys';

export type GetFirstQuestionResponse = Question;

export const getFirstQuestion = ({ deckId }: { deckId: number; }): Promise<GetFirstQuestionResponse> => {
  return axios.get(FIRST_QUESTION_API_URL.replace(`:${FIRST_QUESTION_PARAM}`, String(deckId)));
};

type QueryFnType = typeof getFirstQuestion;

type UseFirstQuestionOptions = {
  deckId: number;
  config?: QueryConfig<QueryFnType>;
};

export const useFirstQuestion = ({ deckId, config }: UseFirstQuestionOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_FIRST_QUESTION, deckId],
    queryFn: async () => {
      const process = await getFirstQuestion({ deckId });

      return process;
    },
  });
};
