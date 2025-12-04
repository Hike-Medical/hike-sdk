import { printProjectMidnightHammer } from '@hike/services';
import { HikeError } from '@hike/types';
import { QueryKey, UseMutationOptions, useMutation } from '@tanstack/react-query';

interface Variables {
  workbenchId: string;
  companyIds?: string[];
}

interface UsePrintProjectMidnightHammerOptions
  extends Omit<UseMutationOptions<void, HikeError<null>, Variables>, 'mutationFn' | 'mutationKey'> {
  mutationKey?: QueryKey;
}

export const usePrintProjectMidnightHammer = ({ mutationKey = [], ...options }: UsePrintProjectMidnightHammerOptions = {}) =>
  useMutation<void, HikeError<null>, Variables>({
    mutationKey: ['printProjectMidnightHammer', ...mutationKey],
    mutationFn: async ({ workbenchId, companyIds }) => printProjectMidnightHammer(workbenchId, companyIds),
    ...options
  });

