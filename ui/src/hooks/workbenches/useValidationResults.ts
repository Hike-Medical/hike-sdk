import { getValidationResults } from '@hike/services';
import { WorkbenchValidationResultsMap } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

interface UseValidationResultsProps {
  workbenchIds: string[];
  enabled?: boolean;
}

export const useValidationResults = ({ workbenchIds, enabled = true }: UseValidationResultsProps) => {
  return useQuery<WorkbenchValidationResultsMap>({
    queryKey: ['validation-results', workbenchIds],
    queryFn: () => getValidationResults(workbenchIds),
    enabled: enabled && workbenchIds.length > 0,
    staleTime: 1000 * 60 * 5 // Cache for 5 minutes
  });
};
