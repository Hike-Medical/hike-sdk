import { AgreementStatus, AgreementType, AuthUser, CompanyPermission, CompanyRole, UserExtended } from '@hike/types';

export const toAuthUser = (user: UserExtended): AuthUser => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
  companies: user.companies
    .filter((item) => item.company.active)
    .sort((a, b) => a.company.createdAt.getTime() - b.company.createdAt.getTime())
    .reduce(
      (acc, obj) => {
        acc[obj.companyId] = obj.role;
        return acc;
      },
      {} as Record<string, CompanyRole | null>
    ),
  patients: user.patients?.reduce(
    (acc, obj) => {
      acc[obj.companyId] = obj.patientId;
      return acc;
    },
    {} as Record<string, string>
  ),
  permissions: user.permissions.reduce(
    (acc, obj) => {
      if (!acc[obj.companyId]) {
        acc[obj.companyId] = {} as Record<string, CompanyRole>;
      }
      acc[obj.companyId]![obj.permission] = obj.role;
      return acc;
    },
    {} as Record<string, Record<CompanyPermission, CompanyRole>>
  ),
  slugs: user.companies
    .flatMap((item) => item.company)
    .reduce(
      (acc, obj) => {
        acc[obj.id] = obj.slug;
        return acc;
      },
      {} as Record<string, string>
    ),
  agreements: user.agreements.reduce(
    (acc, obj) => {
      acc[obj.agreement.type] = obj.status;
      return acc;
    },
    {} as Record<AgreementType, AgreementStatus>
  ),
  clinician: user.clinician,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});
