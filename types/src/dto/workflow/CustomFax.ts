export interface FaxTemplateFieldDto {
  key: string;
  label: string;
  editable: boolean;
  value: string;
}

export interface FaxFieldOverride {
  key: string;
  value: string;
}

export interface GetAvailableFaxTemplatesResponse {
  templates: Record<string, FaxTemplateFieldDto[]>;
}

export interface RenderFaxTemplateParams {
  templateType: string;
  fieldOverrides?: FaxFieldOverride[];
}

export interface RenderFaxTemplateResponse {
  html: string;
}

export interface SendCustomFaxParams {
  templateType: string;
  fieldOverrides?: FaxFieldOverride[];
  outboundFaxNumber: string;
}

export interface SendCustomFaxResponse {
  historyId: string;
}
