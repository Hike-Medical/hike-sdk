/**
 * Parameters for printing an order label manually from the dashboard.
 */
export interface PrintOrderLabelParams {
  /** The machine ID of the label printer to print to */
  printerId: string;
}

/**
 * Response from printing an order label.
 */
export interface PrintOrderLabelResponse {
  /** Whether the label was sent successfully */
  success: boolean;
  /** Name of the printer that received the label */
  printerName: string;
}
