import { assignMachineToLane } from '@hike/services';
import { AssignMachineToLaneParams, HikeError, Machine } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAssignMachineToLane = (
  options?: UseMutationOptions<Machine, HikeError<null>, AssignMachineToLaneParams>
) =>
  useMutation({
    mutationKey: ['assignMachineToLane'],
    mutationFn: async (params) => await assignMachineToLane(params),
    ...options
  });

