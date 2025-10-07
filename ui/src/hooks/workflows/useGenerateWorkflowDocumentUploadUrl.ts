import { generateWorkflowDocumentUploadUrl } from '@hike/services';
import { useMutation } from '@tanstack/react-query';

interface UseGenerateWorkflowDocumentUploadUrlParams {
  workflowId: string;
}

export const useGenerateWorkflowDocumentUploadUrl = ({ workflowId }: UseGenerateWorkflowDocumentUploadUrlParams) => {
  return useMutation({
    mutationFn: ({ fileName, contentType }: { fileName: string; contentType?: string }) =>
      generateWorkflowDocumentUploadUrl(workflowId, fileName, contentType)
  });
};
