export interface AcknowledgePackingScanBody {
  orderId: string;
  event: 'SCAN_ACKNOWLEDGED_MISSING' | 'SCAN_ACKNOWLEDGED_WRONG_STATUS' | 'SCAN_ACKNOWLEDGED_WRONG_JOB';
  facilityId: string;
  facilityName: string;
  scannedPoNumber: string;
  destinationFacilityName?: string | null;
  orderStatus?: string;
}
