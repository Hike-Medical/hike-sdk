export interface UpdateConfigurationParams {
  configurationId: string;
  name?: string;
  description?: string;
  attributes?: Record<string, unknown>;
}
