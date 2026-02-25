import { updateMachineExternalId } from '@hike/services';
import { HikeError, Machine, UpdateMachineExternalIdParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpdateMachineExternalId = (
  options?: UseMutationOptions<Machine, HikeError<null>, UpdateMachineExternalIdParams>
) =>
  useMutation({
    mutationKey: ['updateMachineExternalId'],
    mutationFn: async (params) => await updateMachineExternalId(params),
    ...options
  });
