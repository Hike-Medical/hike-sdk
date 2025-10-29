import { getConsolidationPreview } from '@hike/services';
import { ConsolidationPreview } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

export const useConsolidationPreview = (patientId: string | undefined) => {
  return useQuery<ConsolidationPreview | null>({
    queryKey: ['consolidation-preview', patientId],
    queryFn: () => (patientId ? getConsolidationPreview(patientId) : Promise.resolve(null)),
    enabled: !!patientId
  });
};

