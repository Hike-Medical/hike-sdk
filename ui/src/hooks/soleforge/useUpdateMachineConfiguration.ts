import { updateMachineConfiguration } from '@hike/services';
import { HikeError, Machine, UpdateMachineConfigurationParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpdateMachineConfiguration = (
  options?: UseMutationOptions<Machine, HikeError<null>, UpdateMachineConfigurationParams>
) =>
  useMutation({
    mutationKey: ['updateMachineConfiguration'],
    mutationFn: async (params) => await updateMachineConfiguration(params),
    ...options
  });

