import { HikeError, updateCompany } from '@hike/services';
import { CompanyExtended, UpdateCompanyParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UpdateCompanyOptions {
  companyId: string;
  body: UpdateCompanyParams;
}

export const useUpdateCompany = (
  options?: UseMutationOptions<CompanyExtended, HikeError<null>, UpdateCompanyOptions>
) =>
  useMutation({
    mutationKey: ['updateCompany'],
    mutationFn: async ({ companyId, body }) => await updateCompany(companyId, body),
    ...options
  });
