import {axios} from '../../lib/axios';
import {CONVERT_API_URL} from './urlKeys';
import {MutationConfig} from '../../lib/react-query';
import {useMutation} from '@tanstack/react-query';

export type ConvertDTO = {
  pdf: File;
};

export type ConvertResponse = {
  pdf: string;
  pptx: string;
};

export const convert = (data: ConvertDTO): Promise<ConvertResponse> => {
  const inputData = new FormData();
  inputData.append('pdf', data.pdf);

  return axios.post(CONVERT_API_URL, inputData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

type UseConvertOptions = {
  config?: MutationConfig<typeof convert>;
};

export const useConvert = ({ config }: UseConvertOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: convert
  });
};