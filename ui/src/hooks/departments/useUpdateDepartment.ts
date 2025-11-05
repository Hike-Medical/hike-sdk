import { updateDepartment } from '@hike/services';
import { Department, HikeError, UpdateDepartmentParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UpdateDepartmentRequest {
  departmentId: string;
  params: UpdateDepartmentParams;
}

export const useUpdateDepartment = (
  options?: Omit<UseMutationOptions<Department, HikeError<null>, UpdateDepartmentRequest>, 'mutationFn'>
) =>
  useMutation({
    mutationFn: async ({ departmentId, params }: UpdateDepartmentRequest) =>
      await updateDepartment(departmentId, params),
    ...options
  });
