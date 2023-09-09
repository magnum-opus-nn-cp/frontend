import { useMutation } from '@tanstack/react-query';
import { MutationConfig, queryClient } from '../../lib/react-query';
import { axios } from '../../lib/axios';
import { TextDescriptor } from './types';
import { PROCESS_API_URL } from './urlKeys';
import { QUERY_KEY_PROCESSES } from './queryKeys';

export type CreateProcessDTO = Partial<Pick<TextDescriptor, 'text'>> & {
  files?: File[];
};

export type CreateProcessResponse = {
  id: string;
};

export const createProcess = (data: CreateProcessDTO): Promise<CreateProcessResponse> => {
  const isForm = data.files?.length !== 0;

  let inputData: any;
  if (isForm) {
    inputData = new FormData();

    if (data.text) {
      inputData.append('text', `${data.text}`);
    }

    data.files?.forEach((file, index) => {
      inputData.append(`file_${index + 1}`, file);
    });
  } else {
    inputData = {
      text: data.text
    };
  }

  return axios.post(`${PROCESS_API_URL}/`, inputData, {
    headers: isForm
      ? {
          'Content-Type': 'multipart/form-data'
        }
      : {}
  });
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
