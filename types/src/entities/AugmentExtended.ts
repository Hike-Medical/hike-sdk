import type { AssetAugment, AssetAugmentMedia, Asset, Foot, Patient, CompanyPatient, Workbench } from '../../prisma';

export type AugmentExtended = AssetAugment & {
  /**
   * The user identifier associated with the augment's patient.
   */
  userId?: string | null;
  media: AssetAugmentMedia[];
  asset: Asset & {
    foot: Foot & {
      workbench: Workbench;
      patient: Patient & { companies: CompanyPatient[] };
    };
  };
};
