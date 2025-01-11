import { Asset, CompanyPatient, Foot, Patient, Workbench } from '../../prisma';

export type AssetExtended = Asset & {
  foot: Foot & {
    workbench: Workbench;
    patient: Patient & {
      companies: CompanyPatient[];
    };
  };
};
