import {PitchDeck} from './types';
import {DECKS_API_URL} from './urlKeys';
import {MutationConfig, queryClient} from '../../lib/react-query';
import {useMutation} from '@tanstack/react-query';
import {QUERY_KEY_DECKS} from './queryKeys';
import { axios } from '../../lib/axios';

export type CreateDeckDTO = Pick<PitchDeck, 'description'>;

export type CreateDeckResponse = PitchDeck;

export const createDeck = (data: CreateDeckDTO): Promise<CreateDeckResponse> => {
  return axios.post(DECKS_API_URL, data);
};

type UseCreateDeckOptions = {
  config?: MutationConfig<typeof createDeck>;
};

export const useCreateDeck = ({ config }: UseCreateDeckOptions = {}) => {

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries([QUERY_KEY_DECKS]);
    },
    ...config,
    mutationFn: createDeck
  });
};
