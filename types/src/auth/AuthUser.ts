import type { AgreementStatus, AgreementType, Clinician, CompanyPermission, CompanyRole } from '../../prisma';
import { UserExtended } from '../entities/UserExtended';

export interface AuthUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  companies: Record<string, CompanyRole | null>;
  patients?: Record<string, string>;
  permissions: Record<string, Record<CompanyPermission, CompanyRole>>;
  clinician?: Clinician | null;
  slugs: Record<string, string>;
  agreements: Record<AgreementType, AgreementStatus>;
  active: Record<string, boolean>;
  emailVerifiedAt: Date | null;
  phoneVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Converts a user object to an `AuthUser` object.
 */
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
  active: user.companies.reduce(
    (acc, obj) => {
      acc[obj.company.slug] = obj.active;
      return acc;
    },
    {} as Record<string, boolean>
  ),
  clinician: user.clinician,
  emailVerifiedAt: user.emailVerifiedAt,
  phoneVerifiedAt: user.phoneVerifiedAt,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

/**
 * Type guard for determining whether a value is an authenticated user.
 */
export const isAuthUser = (value: unknown): value is AuthUser =>
  typeof value === 'object' &&
  value !== null &&
  'id' in value &&
  typeof value.id === 'string' &&
  'companies' in value &&
  typeof value.companies === 'object' &&
  value.companies !== null &&
  Object.values(value.companies).every((role) => typeof role === 'string' || role == null);
