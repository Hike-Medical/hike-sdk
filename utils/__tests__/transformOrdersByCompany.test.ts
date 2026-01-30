import { describe, expect, it } from '@jest/globals';
import { transformOrdersByCompany, OrdersByCompanyInput } from '../src/analytics/transformOrdersByCompany';

describe('transformOrdersByCompany', () => {
  const periodStart = new Date('2025-01-01T00:00:00.000Z');
  const periodEnd = new Date('2025-01-31T23:59:59.999Z');

  it('counts INSOLE and FOOT_RENDER orders within period', () => {
    const input: OrdersByCompanyInput = {
      companyId: 'company-1',
      companyName: 'Test Company',
      periodStart,
      periodEnd,
      workbenches: [
        { submittedAt: new Date('2025-01-15'), productType: 'INSOLE' },
        { submittedAt: new Date('2025-01-16'), productType: 'FOOT_RENDER' },
        { submittedAt: new Date('2025-01-17'), productType: 'FOOT_SCAN' }, // excluded - wrong type
        { submittedAt: new Date('2025-01-18'), productType: 'REWARD' } // excluded - wrong type
      ]
    };

    const result = transformOrdersByCompany(input);

    expect(result.orderCount).toBe(2);
    expect(result.companyId).toBe('company-1');
    expect(result.companyName).toBe('Test Company');
    expect(result.periodStart).toEqual(periodStart);
    expect(result.periodEnd).toEqual(periodEnd);
  });

  it('excludes orders outside the period', () => {
    const input: OrdersByCompanyInput = {
      companyId: 'company-1',
      companyName: 'Test Company',
      periodStart,
      periodEnd,
      workbenches: [
        { submittedAt: new Date('2025-01-15'), productType: 'INSOLE' }, // in period
        { submittedAt: new Date('2024-12-15'), productType: 'INSOLE' }, // before period
        { submittedAt: new Date('2025-02-15'), productType: 'INSOLE' } // after period
      ]
    };

    const result = transformOrdersByCompany(input);

    expect(result.orderCount).toBe(1);
  });

  it('excludes workbenches with null submittedAt', () => {
    const input: OrdersByCompanyInput = {
      companyId: 'company-1',
      companyName: 'Test Company',
      periodStart,
      periodEnd,
      workbenches: [
        { submittedAt: new Date('2025-01-15'), productType: 'INSOLE' },
        { submittedAt: null, productType: 'INSOLE' } // not submitted
      ]
    };

    const result = transformOrdersByCompany(input);

    expect(result.orderCount).toBe(1);
  });

  it('excludes workbenches with null productType', () => {
    const input: OrdersByCompanyInput = {
      companyId: 'company-1',
      companyName: 'Test Company',
      periodStart,
      periodEnd,
      workbenches: [
        { submittedAt: new Date('2025-01-15'), productType: 'INSOLE' },
        { submittedAt: new Date('2025-01-16'), productType: null } // no product type
      ]
    };

    const result = transformOrdersByCompany(input);

    expect(result.orderCount).toBe(1);
  });

  it('handles empty workbenches array', () => {
    const input: OrdersByCompanyInput = {
      companyId: 'company-1',
      companyName: 'Test Company',
      periodStart,
      periodEnd,
      workbenches: []
    };

    const result = transformOrdersByCompany(input);

    expect(result.orderCount).toBe(0);
  });

  it('handles null companyName', () => {
    const input: OrdersByCompanyInput = {
      companyId: 'company-1',
      companyName: null,
      periodStart,
      periodEnd,
      workbenches: [{ submittedAt: new Date('2025-01-15'), productType: 'INSOLE' }]
    };

    const result = transformOrdersByCompany(input);

    expect(result.companyName).toBeNull();
    expect(result.orderCount).toBe(1);
  });

  it('includes orders exactly at period boundaries', () => {
    const input: OrdersByCompanyInput = {
      companyId: 'company-1',
      companyName: 'Test Company',
      periodStart,
      periodEnd,
      workbenches: [
        { submittedAt: periodStart, productType: 'INSOLE' }, // exactly at start
        { submittedAt: periodEnd, productType: 'INSOLE' } // exactly at end
      ]
    };

    const result = transformOrdersByCompany(input);

    expect(result.orderCount).toBe(2);
  });

  it('counts multiple orders correctly', () => {
    const input: OrdersByCompanyInput = {
      companyId: 'company-1',
      companyName: 'Test Company',
      periodStart,
      periodEnd,
      workbenches: Array.from({ length: 100 }, (_, index) => ({
        submittedAt: new Date(`2025-01-${String((index % 28) + 1).padStart(2, '0')}`),
        productType: index % 2 === 0 ? ('INSOLE' as const) : ('FOOT_RENDER' as const)
      }))
    };

    const result = transformOrdersByCompany(input);

    expect(result.orderCount).toBe(100);
  });
});
