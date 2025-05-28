import { upsertUserPermissions } from '@hike/services';
import { HikeError, UpsertPermissionsParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseUpsertUserPermissionsOptions {
  userId: string;
  params: UpsertPermissionsParams;
}

export const useUpsertUserPermissions = (
  options?: UseMutationOptions<void, HikeError<null>, UseUpsertUserPermissionsOptions>
) =>
  useMutation({
    mutationKey: ['upsertUserPermissions'],
    mutationFn: async ({ userId, params }) => await upsertUserPermissions(userId, params),
    ...options
  });
