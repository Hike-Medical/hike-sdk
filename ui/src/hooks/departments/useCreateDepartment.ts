import { createDepartment } from '@hike/services';
import { CreateDepartmentParams, Department, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateDepartment = (
  options?: Omit<UseMutationOptions<Department, HikeError<null>, CreateDepartmentParams>, 'mutationFn'>
) =>
  useMutation({
    mutationFn: async (params: CreateDepartmentParams) => await createDepartment(params),
    ...options
  });
