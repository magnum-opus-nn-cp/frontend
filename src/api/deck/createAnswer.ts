import { useMutation } from '@tanstack/react-query';
import { MutationConfig, queryClient } from '../../lib/react-query';
import { axios } from '../../lib/axios';
import { Answer, PitchDeck } from './types';
import { DECKS_API_URL, QUESTION_API_URL, QUESTION_PARAM_DECK_ID, QUESTION_PARAM_QUESTION_ID } from './urlKeys';
import { QUERY_KEY_ANSWER } from './queryKeys';

export type CreateAnswerDTO = {
  deckId: number;
  questionId: number;
  answer: any;
  isFile?: boolean;
  file?: File;
};

export type CreateAnswerResponse = Answer;

export const createAnswer = (data: CreateAnswerDTO): Promise<CreateAnswerResponse> => {
  const path =
    QUESTION_API_URL.replace(`:${QUESTION_PARAM_DECK_ID}`, String(data.deckId)).replace(
      `:${QUESTION_PARAM_QUESTION_ID}`,
      String(data.questionId)
    ) + '/';

  let inputData: any;
  if (data.isFile) {
    inputData = new FormData();
    if (data.answer) {
      inputData.append('answer', `${data.answer}`);
    }
    for (const key in data) {
      if (key !== 'answer' && key !== 'isFile' && key !== 'deckId' && key !== 'questionId') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inputData.append(key, data[key]);
      }
    }
  } else {
    inputData = {
      answer: data.answer
    };
  }

  return axios.post(path, inputData, {
    headers: data.isFile
      ? {
          'Content-Type': 'multipart/form-data'
        }
      : {}
  });
};

type UseCreateAnswerOptions = {
  config?: MutationConfig<typeof createAnswer>;
};

export const useCreateAnswer = ({ config }: UseCreateAnswerOptions = {}) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries([QUERY_KEY_ANSWER]);
    },
    ...config,
    mutationFn: createAnswer
  });
};
