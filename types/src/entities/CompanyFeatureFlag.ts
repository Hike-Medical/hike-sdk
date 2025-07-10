export interface CompanyFeatureFlag {
  id: string;
  companyId: string;
  featureFlagId: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
