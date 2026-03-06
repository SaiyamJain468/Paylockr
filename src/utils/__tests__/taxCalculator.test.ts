// Made by Saiyam Jain - https://github.com/saiyamjain468
/**
 * Unit tests for tax calculator
 * Run with: npm test
 */

import { describe, it, expect } from 'vitest';
import { calculateTax, getTaxSlab, calculateAdvanceTax } from '../taxCalculator';

describe('Tax Calculator - New Regime FY 2025-26', () => {
  it('should calculate zero tax for income below ₹4L', () => {
    const result = calculateTax(300000, 0, 'NEW');
    expect(result.totalTax).toBe(0);
    expect(result.taxableIncome).toBe(225000);
  });

  it('should apply ₹75,000 standard deduction', () => {
    const result = calculateTax(500000, 0, 'NEW');
    expect(result.standardDeduction).toBe(75000);
    expect(result.taxableIncome).toBe(425000);
  });

  it('should apply Section 87A rebate for income ≤ ₹12L', () => {
    const result = calculateTax(1200000, 0, 'NEW');
    expect(result.rebate87A).toBeGreaterThan(0);
    expect(result.rebate87A).toBeLessThanOrEqual(60000);
  });

  it('should add 4% cess on tax amount', () => {
    const result = calculateTax(2000000, 0, 'NEW');
    expect(result.cess).toBe(Math.round(result.taxAmount * 0.04));
  });

  it('should handle TDS deduction', () => {
    const result = calculateTax(1500000, 0, 'NEW', 50000);
    expect(result.tdsDeducted).toBe(50000);
    expect(result.netTaxPayable).toBe(Math.max(0, result.totalTax - 50000));
  });
});

describe('getTaxSlab', () => {
  it('should return correct slab for ₹5L income', () => {
    const slab = getTaxSlab(500000, 'NEW');
    expect(slab.rate).toBe(5);
  });

  it('should return highest slab for ₹30L+ income', () => {
    const slab = getTaxSlab(3000000, 'NEW');
    expect(slab.rate).toBe(30);
    expect(slab.max).toBeNull();
  });
});

describe('calculateAdvanceTax', () => {
  it('should split tax into quarterly payments', () => {
    const advance = calculateAdvanceTax(100000);
    expect(advance.q1).toBe(15000);
    expect(advance.q2).toBe(30000);
    expect(advance.q3).toBe(60000);
    expect(advance.q4).toBe(100000);
  });
});
