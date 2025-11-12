import { deleteDepartment } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface DeleteDepartmentRequest {
  departmentId: string;
}

export const useDeleteDepartment = (
  options?: Omit<UseMutationOptions<void, HikeError<null>, DeleteDepartmentRequest>, 'mutationFn'>
) =>
  useMutation({
    mutationFn: async ({ departmentId }: DeleteDepartmentRequest) => await deleteDepartment(departmentId),
    ...options
  });
