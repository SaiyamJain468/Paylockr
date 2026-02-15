import { TaxSettings } from '../types';

/**
 * Tax Service
 * Handles tax calculations based on Indian tax regimes.
 */

export const taxService = {
  /**
   * Calculate provisional tax based on income and regime
   */
  calculateTax: (annualIncome: number, settings: TaxSettings): number => {
    let taxableIncome = annualIncome;

    if (settings.regime === 'Old') {
      // Apply Standard Deduction
      taxableIncome -= 50000;

      // Apply 80C
      if (settings.deductions80C) {
        taxableIncome -= Math.min(150000, settings.annualDeductionAmount); // Cap at 1.5L
      }
      
      // Apply 80D (Health Insurance) - Simplified max cap
      if (settings.deductions80D) {
        taxableIncome -= 25000; 
      }
    } else {
      // New Regime (FY 2023-24 onwards)
      // Standard deduction allowed in new regime now
      taxableIncome -= 75000;
    }

    if (taxableIncome <= 0) return 0;

    let tax = 0;

    if (settings.regime === 'New') {
      // New Regime Slabs (FY 2024-25)
      // 0-3L: Nil
      // 3-7L: 5%
      // 7-10L: 10%
      // 10-12L: 15%
      // 12-15L: 20%
      // >15L: 30%
      
      if (taxableIncome <= 300000) {
        // Rebate u/s 87A applies if income <= 3L, tax is effectively 0
        tax = 0;
      } else if (taxableIncome <= 700000) {
        tax = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax = 20000 + (taxableIncome - 700000) * 0.10;
      } else if (taxableIncome <= 1200000) {
        tax = 50000 + (taxableIncome - 1000000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        tax = 80000 + (taxableIncome - 1200000) * 0.20;
      } else {
        tax = 140000 + (taxableIncome - 1500000) * 0.30;
      }
    } else {
      // Old Regime Slabs
      // 0-2.5L: Nil
      // 2.5-5L: 5%
      // 5-10L: 20%
      // >10L: 30%
      if (taxableIncome <= 250000) {
        tax = 0;
      } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax = 12500 + (taxableIncome - 500000) * 0.20;
      } else {
        tax = 112500 + (taxableIncome - 1000000) * 0.30;
      }
    }

    // Add Cess (4%)
    tax = tax * 1.04;

    return Math.round(tax);
  },

  /**
   * Get Standard Deduction
   */
  getStandardDeduction: (regime: 'Old' | 'New'): number => {
    return regime === 'New' ? 75000 : 50000;
  }
};
