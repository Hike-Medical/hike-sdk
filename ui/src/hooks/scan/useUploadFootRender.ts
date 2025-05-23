import { uploadFootRender } from '@hike/services';
import { HikeError, SubmitRenderParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UploadFootRenderContext {
  file: File;
  body: SubmitRenderParams;
  companyIds: string[];
}

export const useUploadFootRender = (options?: UseMutationOptions<void, HikeError<null>, UploadFootRenderContext>) =>
  useMutation({
    mutationKey: ['uploadFootRender'],
    mutationFn: async ({ file, body, companyIds }) => await uploadFootRender(file, body, companyIds),
    ...options
  });
