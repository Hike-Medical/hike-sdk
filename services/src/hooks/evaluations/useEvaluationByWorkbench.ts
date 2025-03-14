import type { EvaluationExtended } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findEvaluationByWorkbenchId } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

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
