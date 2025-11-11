import type { Department } from '../../prisma';

export type DepartmentExtended = Department & {
  _count?: {
    patients: number;
  };
};
