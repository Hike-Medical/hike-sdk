import { createConfiguration } from '@hike/services';
import { Configuration, CreateConfigurationParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateConfiguration = (
  options?: UseMutationOptions<Configuration, HikeError<null>, CreateConfigurationParams>
) =>
  useMutation({
    mutationKey: ['createConfiguration'],
    mutationFn: async (params) => await createConfiguration(params),
    ...options
  });

