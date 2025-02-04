export interface OrdersStuck {
  id: string;
  patientFirstName: string;
  patientLastName: string;
  numberOfDaysInStatus: number;
  poNumber: string;
  companyName: string;
}

export type OrderStuckResponse = OrdersStuck[];
