// Made by Saiyam Jain - https://github.com/saiyamjain468

export interface Investment {
  id: string;
  type: '80C' | '80D' | '80G' | 'NPS';
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface InvestmentSummary {
  section80C: number;
  section80CLimit: number;
  section80D: number;
  section80DLimit: number;
  totalDeductions: number;
  taxSaved: number;
}

const LIMITS = {
  '80C': 150000,
  '80D': 25000,
  '80D_SENIOR': 50000,
  'NPS_ADDITIONAL': 50000
};

export const calculateInvestmentDeductions = (
  investments: Investment[],
  isSeniorCitizen: boolean = false
): InvestmentSummary => {
  const section80C = Math.min(
    investments.filter(i => i.type === '80C').reduce((sum, i) => sum + i.amount, 0),
    LIMITS['80C']
  );

  const section80DLimit = isSeniorCitizen ? LIMITS['80D_SENIOR'] : LIMITS['80D'];
  const section80D = Math.min(
    investments.filter(i => i.type === '80D').reduce((sum, i) => sum + i.amount, 0),
    section80DLimit
  );

  const totalDeductions = section80C + section80D;
  const taxSaved = totalDeductions * 0.3; // Assuming 30% tax bracket

  return {
    section80C,
    section80CLimit: LIMITS['80C'],
    section80D,
    section80DLimit,
    totalDeductions,
    taxSaved
  };
};

export const getInvestmentRecommendations = (
  currentInvestments: Investment[],
  annualIncome: number
): string[] => {
  const summary = calculateInvestmentDeductions(currentInvestments);
  const recommendations: string[] = [];

  if (summary.section80C < LIMITS['80C']) {
    const remaining = LIMITS['80C'] - summary.section80C;
    recommendations.push(
      `Invest ₹${remaining.toLocaleString('en-IN')} more in 80C to maximize deductions (PPF, ELSS, NSC)`
    );
  }

  if (summary.section80D < summary.section80DLimit) {
    const remaining = summary.section80DLimit - summary.section80D;
    recommendations.push(
      `Invest ₹${remaining.toLocaleString('en-IN')} more in health insurance (80D)`
    );
  }

  if (annualIncome > 1000000) {
    recommendations.push(
      `Consider NPS Tier-I for additional ₹50,000 deduction under 80CCD(1B)`
    );
  }

  return recommendations;
};
