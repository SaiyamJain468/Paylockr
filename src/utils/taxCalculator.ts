// Indian Income Tax Slabs for FY 2025-26 (AY 2026-27)

export interface TaxSlab {
  min: number;
  max: number | null;
  rate: number;
  label: string;
}

// New Tax Regime (Default from FY 2023-24)
export const NEW_TAX_REGIME_2026: TaxSlab[] = [
  { min: 0, max: 300000, rate: 0, label: 'Up to ₹3L' },
  { min: 300000, max: 700000, rate: 5, label: '₹3L - ₹7L' },
  { min: 700000, max: 1000000, rate: 10, label: '₹7L - ₹10L' },
  { min: 1000000, max: 1200000, rate: 15, label: '₹10L - ₹12L' },
  { min: 1200000, max: 1500000, rate: 20, label: '₹12L - ₹15L' },
  { min: 1500000, max: null, rate: 30, label: 'Above ₹15L' }
];

// Old Tax Regime (Optional)
export const OLD_TAX_REGIME_2026: TaxSlab[] = [
  { min: 0, max: 250000, rate: 0, label: 'Up to ₹2.5L' },
  { min: 250000, max: 500000, rate: 5, label: '₹2.5L - ₹5L' },
  { min: 500000, max: 1000000, rate: 20, label: '₹5L - ₹10L' },
  { min: 1000000, max: null, rate: 30, label: 'Above ₹10L' }
];

export interface TaxCalculationResult {
  totalIncome: number;
  taxableIncome: number;
  taxAmount: number;
  effectiveRate: number;
  slab: TaxSlab;
  slabLabel: string;
  cess: number;
  totalTax: number;
  regime: 'NEW' | 'OLD';
  breakdown?: { slab: string; amount: number; tax: number }[];
}

export function calculateTax(
  annualIncome: number,
  deductions: number = 0,
  regime: 'NEW' | 'OLD' = 'NEW'
): TaxCalculationResult {
  const slabs = regime === 'NEW' ? NEW_TAX_REGIME_2026 : OLD_TAX_REGIME_2026;
  
  // Standard deduction of 75,000 in new regime (FY 2025-26)
  const standardDeduction = regime === 'NEW' ? 75000 : 50000;
  const taxableIncome = Math.max(0, annualIncome - standardDeduction - (regime === 'OLD' ? deductions : 0));
  
  let taxAmount = 0;
  let currentSlab: TaxSlab = slabs[0];
  let breakdown: { slab: string; amount: number; tax: number }[] = [];
  
  // Calculate tax based on slabs with breakdown
  for (const slab of slabs) {
    if (taxableIncome > slab.min) {
      const taxableInSlab = slab.max 
        ? Math.min(taxableIncome, slab.max) - slab.min
        : taxableIncome - slab.min;
      
      const taxInSlab = (taxableInSlab * slab.rate) / 100;
      taxAmount += taxInSlab;
      
      if (taxableInSlab > 0) {
        breakdown.push({
          slab: slab.label,
          amount: taxableInSlab,
          tax: taxInSlab
        });
      }
      
      currentSlab = slab;
    }
  }
  
  // Add 4% Health & Education Cess
  const cess = taxAmount * 0.04;
  const totalTax = taxAmount + cess;
  
  return {
    totalIncome: annualIncome,
    taxableIncome,
    taxAmount,
    effectiveRate: annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0,
    slab: currentSlab,
    slabLabel: currentSlab.label,
    cess,
    totalTax,
    regime,
    breakdown
  };
}

export function getTaxSlab(annualIncome: number, regime: 'NEW' | 'OLD' = 'NEW'): TaxSlab {
  const slabs = regime === 'NEW' ? NEW_TAX_REGIME_2026 : OLD_TAX_REGIME_2026;
  const standardDeduction = regime === 'NEW' ? 75000 : 50000;
  const taxableIncome = Math.max(0, annualIncome - standardDeduction);
  
  for (let i = slabs.length - 1; i >= 0; i--) {
    if (taxableIncome > slabs[i].min) {
      return slabs[i];
    }
  }
  
  return slabs[0];
}
