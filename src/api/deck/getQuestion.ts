import {Question} from './types';
import {axios} from '../../lib/axios';
import {
  QUESTION_API_URL,
  QUESTION_PARAM_DECK_ID,
  QUESTION_PARAM_QUESTION_ID,
} from './urlKeys';
import {ExtractFnReturnType, QueryConfig} from '../../lib/react-query';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_QUESTION} from './queryKeys';

export type GetQuestionResponse = Question;

export const getQuestion = ({ deckId, questionId }: { deckId: number; questionId: number; }): Promise<GetQuestionResponse> => {
  return axios.get(
    QUESTION_API_URL
      .replace(`:${QUESTION_PARAM_DECK_ID}`, String(deckId))
      .replace(`:${QUESTION_PARAM_QUESTION_ID}`, String(questionId))
  );
};

type QueryFnType = typeof getQuestion;

type UseQuestionOptions = {
  deckId: number;
  questionId: number;
  config?: QueryConfig<QueryFnType>;
};

export const useQuestion = ({ deckId, questionId, config }: UseQuestionOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_QUESTION, deckId, questionId],
    queryFn: async () => {
      return await getQuestion({ deckId, questionId });
    },
  });
};
