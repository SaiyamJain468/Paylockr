// Indian Income Tax Slabs for FY 2025-26 (AY 2026-27) - New Tax Regime

export interface TaxSlab {
  min: number;
  max: number | null;
  rate: number;
  label: string;
}

// New Tax Regime FY 2025-26
export const NEW_TAX_REGIME_2026: TaxSlab[] = [
  { min: 0, max: 400000, rate: 0, label: 'Up to ₹4L' },
  { min: 400000, max: 800000, rate: 5, label: '₹4L - ₹8L' },
  { min: 800000, max: 1200000, rate: 10, label: '₹8L - ₹12L' },
  { min: 1200000, max: 1600000, rate: 15, label: '₹12L - ₹16L' },
  { min: 1600000, max: 2000000, rate: 20, label: '₹16L - ₹20L' },
  { min: 2000000, max: 2400000, rate: 25, label: '₹20L - ₹24L' },
  { min: 2400000, max: null, rate: 30, label: 'Above ₹24L' }
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
  standardDeduction: number;
  taxBeforeRebate: number;
  rebate87A: number;
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
  
  // Standard deduction: ₹75,000 for salaried/pensioners in New Regime
  const standardDeduction = regime === 'NEW' ? 75000 : 50000;
  
  // Taxable income after standard deduction (no other deductions in new regime)
  const taxableIncome = Math.max(0, annualIncome - standardDeduction - (regime === 'OLD' ? deductions : 0));
  
  // If taxable income is below ₹4 lakh, no tax
  if (taxableIncome <= 400000) {
    return {
      totalIncome: annualIncome,
      taxableIncome,
      standardDeduction,
      taxBeforeRebate: 0,
      rebate87A: 0,
      taxAmount: 0,
      effectiveRate: 0,
      slab: slabs[0],
      slabLabel: slabs[0].label,
      cess: 0,
      totalTax: 0,
      regime,
      breakdown: []
    };
  }
  
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
  
  // Section 87A Rebate: Up to ₹60,000 if taxable income ≤ ₹12 lakh
  // This makes income up to ~₹12.75L effectively tax-free for salaried (with ₹75k standard deduction)
  const rebate87A = (taxableIncome <= 1200000 && regime === 'NEW') ? Math.min(taxAmount, 60000) : 0;
  const taxAfterRebate = Math.max(0, taxAmount - rebate87A);
  
  // Add 4% Health & Education Cess (only if tax > 0 after rebate)
  const cess = taxAfterRebate * 0.04;
  const totalTax = taxAfterRebate + cess;
  
  return {
    totalIncome: annualIncome,
    taxableIncome,
    standardDeduction,
    taxBeforeRebate: taxAmount,
    rebate87A,
    taxAmount: taxAfterRebate,
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
