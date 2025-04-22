import { Asset, CompanyPatient, Foot, Patient, Workbench } from '@prisma/client';

export type AssetExtended = Asset & {
  foot: Foot & {
    workbench: Workbench;
    patient: Patient & {
      companies: CompanyPatient[];
    };
  };
};
