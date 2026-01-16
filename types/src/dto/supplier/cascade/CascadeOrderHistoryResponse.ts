export interface CascadeOrderHistoryResponse {
  status: string;
  message: string | null;
  data: {
    customerId: number;
    orderDate: string;
    orderNo: string;
    poNo: string;
    rma: string;
    webReferenceNo: string;
    quote: string;
    status: string;
    orderTotal: number;
    shipToId: string;
    shipToName: string;
    shipToAdd1: string;
    shipToAdd2: string;
    shipToCity: string;
    shipToState: string;
    shipToZip: string;
    shipToCountry: string;
    shipToPhone: string;
    shipToEmail: string;
    contactId: string;
    contactName: string;
    packingBasis: string;
    contactEmailAddress: string;
    sourceLocationId: number;
    orderNotes: {
      note: string;
      topic: string;
      activationDate: string;
      expirationDate: string;
    }[];
    lines: {
      lineNo: number;
      invMastUid: number;
      itemId: string;
      oeLineUid: number;
      patientId: string;
      pixFamilyName: string;
      itemDescription: string;
      supplierName: string;
      unitPrice: number;
      pricingUnit: string;
      extendedPrice: number;
      lineNotes: {
        note: string;
        topic: string;
        activationDate: string;
        expirationDate: string;
      }[];
      shippingInfo: {
        trackingNo: string;
        carrier: string;
        shipDate: string;
        invoiceNo: string;
        directShipment: string;
        shipsFrom: string;
        shipQty: number;
      }[];
      qtyOrdered: number;
      qtyInvoiced: number;
      qtyCanceled: number;
      qtyBackOrdered: number;
      qtyDropShipped: number;
      qtyInProgress: number;
      deleteFlag: string;
      completed: string;
      sourceLocationId: number;
    }[];
  };
}
