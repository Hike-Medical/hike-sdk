import { activateDepartment, deactivateDepartment } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface ToggleDepartmentParams {
  departmentId: string;
  active: boolean;
}

export const useToggleDepartment = (
  options?: Omit<UseMutationOptions<void, HikeError<null>, ToggleDepartmentParams>, 'mutationFn'>
) =>
  useMutation({
    mutationFn: async ({ departmentId, active }: ToggleDepartmentParams) =>
      active ? await activateDepartment(departmentId) : await deactivateDepartment(departmentId),
    ...options
  });
