import { Asset, Foot, Patient, Workbench } from '../../prisma';

export type AssetExtended = Asset & {
  foot: Foot & {
    workbench: Workbench;
    patient: Patient;
  };
};
