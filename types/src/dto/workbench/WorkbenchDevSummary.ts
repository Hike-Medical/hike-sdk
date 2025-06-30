export interface WorkbenchDevSummary {
  workbenchId: string;
  patientId: string;
  evaluationId: string;
  patientFirstName: string;
  patientLastName: string;
  submittedAt: Date | null;
  workbenchStatus: string;
  renderScore: number | null;
  companySlug: string | null;
  poNumber: string | null;
  taikaDevId: string | null;
  taikaId: string | null;
  authorizationUpdatedAt: Date | null;
  clinicianName: string | null;
  orderPdfUrlExists: boolean;
  evaluationPdfUrlExists: boolean;
  createdReason: string | null;
  orderShoeWidth: string | null;
  orderShoeSize: string | null;
  orderGender: string | null;
  orderSide: number | null;
}
