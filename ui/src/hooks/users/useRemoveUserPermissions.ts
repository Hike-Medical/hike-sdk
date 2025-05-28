import { removeUserPermissions } from '@hike/services';
import { CompanyPermission, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseRemoveUserPermissionsOptions {
  userId: string;
  permissions: CompanyPermission[];
}

export const useRemoveUserPermissions = (
  options?: UseMutationOptions<void, HikeError<null>, UseRemoveUserPermissionsOptions>
) =>
  useMutation({
    mutationKey: ['removeUserPermissions'],
    mutationFn: async ({ userId, permissions }) => await removeUserPermissions(userId, permissions),
    ...options
  });
