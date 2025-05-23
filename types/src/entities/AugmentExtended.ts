import type { AssetAugment, AssetAugmentMedia, Asset, Foot, Patient, CompanyPatient, Workbench } from '../../prisma';

export type AugmentExtended = AssetAugment & {
  media: AssetAugmentMedia[];
  asset: Asset & {
    foot: Foot & {
      workbench: Workbench;
      patient: Patient & { companies: CompanyPatient[] };
    };
  };
};
