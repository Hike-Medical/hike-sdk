import { ProductType } from '@hike/types';

/**
 * Input data for transforming orders by company.
 * This data comes from the DMS-replicated tables on the analytics database.
 */
export interface OrdersByCompanyInput {
  companyId: string;
  companyName: string | null;
  workbenches: {
    submittedAt: Date | null;
    productType: ProductType | null;
  }[];
  periodStart: Date;
  periodEnd: Date;
}

/**
 * Output data matching the MetricsOrdersByCompany Prisma model.
 */
export interface OrdersByCompanyOutput {
  companyId: string;
  companyName: string | null;
  periodStart: Date;
  periodEnd: Date;
  orderCount: number;
}

/**
 * Product types that count as "orders" for analytics purposes.
 * Matches the filter in the original getOrders() implementation.
 */
const ELIGIBLE_PRODUCT_TYPES: ProductType[] = ['INSOLE', 'FOOT_RENDER'];

/**
 * Transforms raw workbench data into pre-computed order metrics.
 *
 * This is a pure function that can be easily unit tested.
 * It replicates the logic from POST /analytics/orders but in a testable, reusable form.
 *
 * @param input - Raw data from replicated tables
 * @returns Aggregated order count for the company within the specified period
 */
export function transformOrdersByCompany(input: OrdersByCompanyInput): OrdersByCompanyOutput {
  const orderCount = input.workbenches.filter(
    (workbench) =>
      workbench.submittedAt !== null &&
      workbench.submittedAt >= input.periodStart &&
      workbench.submittedAt <= input.periodEnd &&
      workbench.productType !== null &&
      ELIGIBLE_PRODUCT_TYPES.includes(workbench.productType)
  ).length;

  return {
    companyId: input.companyId,
    companyName: input.companyName,
    periodStart: input.periodStart,
    periodEnd: input.periodEnd,
    orderCount
  };
}
