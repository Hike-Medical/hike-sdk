import { upsertTag } from '@hike/services';
import { HikeError, Tag, UpsertTagParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpsertTag = (options?: UseMutationOptions<Tag, HikeError<null>, UpsertTagParams>) =>
  useMutation({
    mutationKey: ['upsertTag'],
    mutationFn: async (params) => await upsertTag(params),
    ...options
  });
