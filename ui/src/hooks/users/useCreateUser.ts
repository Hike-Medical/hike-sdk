import { createUser } from '@hike/services';
import { CreateUserParams, HikeError, SafeUserExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateUser = (options?: UseMutationOptions<SafeUserExtended, HikeError<null>, CreateUserParams>) =>
  useMutation({
    mutationKey: ['createUser'],
    mutationFn: async (params) => await createUser(params),
    ...options
  });

