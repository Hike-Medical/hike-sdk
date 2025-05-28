import { findEvaluationByWorkbenchId } from '@hike/services';
import type { EvaluationExtended } from '@hike/types';
import { HikeError } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

interface UseEvaluationByWorkbenchOptions {
  key?: string[];
  enabled?: boolean;
  workbenchId: string;
}

export const useEvaluationByWorkbench = ({ key = [], enabled = true, workbenchId }: UseEvaluationByWorkbenchOptions) =>
  useQuery<EvaluationExtended, HikeError<null>>({
    queryKey: ['evaluationByWorkbench', ...key, workbenchId],
    queryFn: async () => await findEvaluationByWorkbenchId(workbenchId),
    enabled
  });
