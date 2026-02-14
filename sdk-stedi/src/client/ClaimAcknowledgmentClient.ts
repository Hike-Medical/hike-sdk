/**
 * Client for retrieving 277CA Claim Acknowledgments
 * API Reference: https://www.stedi.com/docs/healthcare/api-reference/get-healthcare-reports-277
 */

import { Logger } from '@hike/sdk';
import { isAxiosError, type AxiosInstance } from 'axios';
import type {
  ClaimAcknowledgment277CA,
  ClaimAcknowledgmentResult,
  ClaimStatusSummary
} from '../types/claimAcknowledgment';

const CLAIM_ACKNOWLEDGMENT_ENDPOINT = '/change/medicalnetwork/reports/v2';

export class ClaimAcknowledgmentClient {
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly logger?: Logger
  ) {}

  /**
   * Retrieve a 277CA claim acknowledgment by transaction ID
   *
   * The 277CA indicates whether a claim was accepted or rejected.
   * Use the transaction ID from the claim submission response or webhook.
   *
   * @param transactionId - The Stedi transaction ID from claim submission
   * @returns Claim acknowledgment with acceptance/rejection status
   */
  async getClaimAcknowledgment(transactionId: string): Promise<ClaimAcknowledgmentResult> {
    try {
      if (!transactionId) {
        return {
          success: false,
          error: 'Transaction ID is required'
        };
      }

      this.logger?.log('Retrieving claim acknowledgment', { transactionId });

      const response = await this.axiosInstance.get<ClaimAcknowledgment277CA>(
        `${CLAIM_ACKNOWLEDGMENT_ENDPOINT}/${transactionId}/277`
      );

      this.logger?.log('Claim acknowledgment retrieved successfully', {
        transactionId: response.data.meta.transactionId,
        transactionCount: response.data.transactions.length
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;

        this.logger?.error('Stedi API error retrieving claim acknowledgment', {
          status: error.response.status,
          data: errorData,
          transactionId
        });

        return {
          success: false,
          error: 'API_ERROR',
          errorDetails: {
            status: error.response.status,
            message: errorData.message || 'Failed to retrieve claim acknowledgment',
            code: errorData.code
          }
        };
      }

      if (error instanceof Error) {
        this.logger?.error('Failed to retrieve claim acknowledgment', { message: error.message });
        return {
          success: false,
          error: error.message
        };
      }

      this.logger?.error('Unexpected error retrieving claim acknowledgment', { error: String(error) });
      return {
        success: false,
        error: String(error)
      };
    }
  }

  /**
   * Check if a claim was accepted based on the 277CA
   *
   * @param acknowledgment - The 277CA claim acknowledgment
   * @returns Whether the claim was accepted
   */
  isClaimAccepted(acknowledgment: ClaimAcknowledgment277CA): boolean {
    try {
      for (const transaction of acknowledgment.transactions) {
        for (const payer of transaction.payers) {
          for (const claimTx of payer.claimStatusTransactions) {
            for (const detail of claimTx.claimStatusDetails) {
              for (const patientDetail of detail.patientClaimStatusDetails) {
                for (const claimInfo of patientDetail.claims) {
                  for (const infoStatus of claimInfo.claimStatus.informationClaimStatuses) {
                    for (const status of infoStatus.informationStatuses) {
                      // Check for rejection codes
                      if (status.healthCareClaimStatusCategoryCode === 'A3') {
                        return false; // Rejected
                      }
                      // Check for acceptance codes
                      if (
                        status.healthCareClaimStatusCategoryCode === 'A1' || // Acknowledged
                        status.healthCareClaimStatusCategoryCode === 'A2' || // Accepted
                        status.statusCode === '20' // Accepted for processing
                      ) {
                        return true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return false;
    } catch (error) {
      this.logger?.error('Error checking claim acceptance status', {
        error: error instanceof Error ? error.message : String(error)
      });
      return false;
    }
  }

  /**
   * Get claim status summary from 277CA
   *
   * @param acknowledgment - The 277CA claim acknowledgment
   * @returns Summary of claim status or null if the structure cannot be parsed
   */
  getClaimStatusSummary(acknowledgment: ClaimAcknowledgment277CA): ClaimStatusSummary | null {
    try {
      const transaction = acknowledgment.transactions[0];
      if (!transaction) return null;

      const payer = transaction.payers[0];
      if (!payer) return null;

      const claimTx = payer.claimStatusTransactions[0];
      if (!claimTx) return null;

      const detail = claimTx.claimStatusDetails[0];
      if (!detail) return null;

      const patientDetail = detail.patientClaimStatusDetails[0];
      if (!patientDetail) return null;

      const claimInfo = patientDetail.claims[0];
      if (!claimInfo) return null;

      const infoStatus = claimInfo.claimStatus.informationClaimStatuses[0];
      if (!infoStatus) return null;

      const status = infoStatus.informationStatuses[0];
      if (!status) return null;

      return {
        accepted: status.healthCareClaimStatusCategoryCode !== 'A3',
        statusCode: status.statusCode,
        statusMessage: status.statusCodeValue || status.healthCareClaimStatusCategoryCodeValue || 'Unknown',
        traceNumber: claimInfo.claimStatus.referencedTransactionTraceNumber
      };
    } catch (error) {
      this.logger?.error('Error getting claim status summary', {
        error: error instanceof Error ? error.message : String(error)
      });
      return null;
    }
  }
}
