import { getValidationResults } from '@hike/services';
import { WorkbenchValidationResultsMap } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

interface UseValidationResultsProps {
  workbenchIds: string[];
  companyIds?: string[];
  enabled?: boolean;
}

export const useValidationResults = ({ workbenchIds, companyIds, enabled = true }: UseValidationResultsProps) => {
  return useQuery<WorkbenchValidationResultsMap>({
    queryKey: ['validation-results', workbenchIds, companyIds],
    queryFn: () => getValidationResults(workbenchIds, companyIds),
    enabled: enabled && workbenchIds.length > 0,
    staleTime: 1000 * 60 * 5 // Cache for 5 minutes
  });
};
