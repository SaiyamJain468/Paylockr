// Made by Saiyam Jain - https://github.com/saiyamjain468

export interface GSTCalculation {
  revenue: number;
  gstRate: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalGST: number;
  netAmount: number;
}

export const GST_RATES = {
  EXEMPT: 0,
  RATE_5: 5,
  RATE_12: 12,
  RATE_18: 18,
  RATE_28: 28
};

export const calculateGST = (
  amount: number,
  gstRate: number = 18,
  isInterstate: boolean = false
): GSTCalculation => {
  const gstAmount = (amount * gstRate) / (100 + gstRate);
  const netAmount = amount - gstAmount;

  if (isInterstate) {
    return {
      revenue: amount,
      gstRate,
      cgst: 0,
      sgst: 0,
      igst: gstAmount,
      totalGST: gstAmount,
      netAmount
    };
  }

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  return {
    revenue: amount,
    gstRate,
    cgst,
    sgst,
    igst: 0,
    totalGST: gstAmount,
    netAmount
  };
};

export const addGST = (amount: number, gstRate: number = 18): number => {
  return amount + (amount * gstRate) / 100;
};

export const isGSTRegistrationRequired = (annualTurnover: number): boolean => {
  return annualTurnover > 2000000; // 20 lakhs threshold
};
