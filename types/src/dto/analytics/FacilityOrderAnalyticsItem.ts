export interface FacilityOrderAnalyticsItem {
  orderId: string;
  evaluationId: string;
  facilityId: string | null;
  facilityName: string;
  patientId: string | null;
  patientFirstName: string | null;
  patientLastName: string | null;
  orderStatus: string | null;
  orderCreatedAt: string;
  submittedAt: string | null;
}
