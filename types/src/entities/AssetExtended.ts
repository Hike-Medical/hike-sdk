import { Asset, CompanyPatient, Foot, Patient, Workbench } from '../../prisma/index';

export type AssetExtended = Asset & {
  foot: Foot & {
    workbench: Workbench;
    patient: Patient & {
      companies: CompanyPatient[];
    };
  };
};
