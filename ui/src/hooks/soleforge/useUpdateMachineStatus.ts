import { updateMachineStatus } from '@hike/services';
import { HikeError, Machine, UpdateMachineStatusParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpdateMachineStatus = (
  options?: UseMutationOptions<Machine, HikeError<null>, UpdateMachineStatusParams>
) =>
  useMutation({
    mutationKey: ['updateMachineStatus'],
    mutationFn: async (params) => await updateMachineStatus(params),
    ...options
  });

