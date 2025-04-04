import { CompanyExtended, UpdateCompanyParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateCompany } from '../../api/company.service';
import { HikeError } from '../../errors/HikeError';

interface UpdateCompanyContext {
  companyId: string;
  body: UpdateCompanyParams;
}

export const useUpdateCompany = (
  options?: UseMutationOptions<CompanyExtended, HikeError<null>, UpdateCompanyContext>
) =>
  useMutation({
    mutationKey: ['updateCompany'],
    mutationFn: async ({ companyId, body }) => await updateCompany(companyId, body),
    ...options
  });
