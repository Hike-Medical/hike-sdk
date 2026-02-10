import { EntityType } from '../../../prisma';

export const EntityTypeEnum = {
  COMPANY: 'COMPANY',
  DEPARTMENT: 'DEPARTMENT',
  FACILITY: 'FACILITY',
  CLINICIAN: 'CLINICIAN',
  PATIENT: 'PATIENT',
  USER: 'USER',
  WORKFLOW: 'WORKFLOW',
  ORDER: 'ORDER'
} as const satisfies Record<EntityType, EntityType> & {
  [K in EntityType]: K;
};

export const EntityTypeList = Object.values(EntityTypeEnum);
