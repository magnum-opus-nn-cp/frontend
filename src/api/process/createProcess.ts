import { useMutation } from '@tanstack/react-query';
import { MutationConfig, queryClient } from '../../lib/react-query';
import { axios } from '../../lib/axios';
import { TextDescriptor } from './types';
import { PROCESS_API_URL } from './urlKeys';
import { QUERY_KEY_PROCESSES } from './queryKeys';

export type CreateProcessDTO = Partial<Pick<TextDescriptor, 'text'>> & {
  files?: [];
};

export type CreateProcessResponse = {
  id: string;
};

export const createProcess = (data: CreateProcessDTO): Promise<CreateProcessResponse> => {
  return axios.post(`${PROCESS_API_URL}/`, data);
};

type UseCreateProcessOptions = {
  config?: MutationConfig<typeof createProcess>;
};

export const useCreateProcess = ({ config }: UseCreateProcessOptions = {}) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries([QUERY_KEY_PROCESSES]);
    },
    ...config,
    mutationFn: createProcess
  });
};
