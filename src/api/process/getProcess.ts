import { useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../lib/react-query';
import { ProcessDescriptor } from './types';
import { PROCESS_API_URL } from './urlKeys';
import { QUERY_KEY_PROCESSES } from './queryKeys';

export type GetProcessResponse = ProcessDescriptor;

export const getProcess = ({ processId }: { processId: string }): Promise<GetProcessResponse> => {
  return axios.get(`${PROCESS_API_URL}/${processId}`);
};

type QueryFnType = typeof getProcess;

type UseProcessOptions = {
  processId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useProcess = ({ processId, config }: UseProcessOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PROCESSES, processId],
    queryFn: async () => {
      return await getProcess({ processId });
    }
  });
};
