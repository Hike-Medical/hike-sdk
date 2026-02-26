import { updateConfiguration } from '@hike/services';
import { Configuration, HikeError, UpdateConfigurationParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpdateConfiguration = (
  options?: UseMutationOptions<Configuration, HikeError<null>, UpdateConfigurationParams>
) =>
  useMutation({
    mutationKey: ['updateConfiguration'],
    mutationFn: async (params) => await updateConfiguration(params),
    ...options
  });
