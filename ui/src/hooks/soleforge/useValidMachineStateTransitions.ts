import { getValidMachineStateTransitions } from '@hike/services';
import { GetValidMachineStateTransitionsParams, HikeError, ValidMachineStateTransitions } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseValidMachineStateTransitionsOptions
  extends Omit<UseQueryOptions<ValidMachineStateTransitions, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useValidMachineStateTransitions = (
  params: GetValidMachineStateTransitionsParams,
  options?: UseValidMachineStateTransitionsOptions
) =>
  useQuery({
    queryKey: options?.queryKey ?? ['validMachineStateTransitions', params.machineId, params.testMode],
    queryFn: async () => await getValidMachineStateTransitions(params),
    ...options
  });
