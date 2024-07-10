import { SubmitRenderParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { uploadFootRender } from '../../api/scan.service';
import { ResponseError } from '../../errors/ResponseError';

interface UploadFootRenderContext {
  file: File;
  body: SubmitRenderParams;
  companyIds: string[];
}

export const useUploadFootRender = (
  options?: UseMutationOptions<void, ResponseError<null>, UploadFootRenderContext>
) => {
  return useMutation({
    mutationKey: ['uploadFootRender'],
    mutationFn: async ({ file, body, companyIds }: UploadFootRenderContext) =>
      await uploadFootRender(file, body, companyIds),
    ...options
  });
};
