import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { submitWorkbench } from '../api/workbench-service';

interface SubmitOrderParams {
  workbenchId: string;
}

export const useSubmiWorkbench = (mutationOptions?: UseMutationOptions<void, Error, SubmitOrderParams>) => {
  return useMutation({
    mutationKey: ['submitWorkbencb'],
    mutationFn: async (body: SubmitOrderParams) => await submitWorkbench(body.workbenchId),
    ...mutationOptions
  });
};
