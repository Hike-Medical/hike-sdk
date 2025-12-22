import { deleteTagForEntity } from '@hike/services';
import { HikeError, Tag } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface DeleteTagForEntityParams {
  name: string;
  entityId: string;
}

export const useDeleteTagForEntity = (
  options?: UseMutationOptions<Tag, HikeError<null>, DeleteTagForEntityParams>
) =>
  useMutation({
    mutationKey: ['deleteTagForEntity'],
    mutationFn: async ({ name, entityId }) => await deleteTagForEntity(name, entityId),
    ...options
  });
