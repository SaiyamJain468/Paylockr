// Expense Forecasting using historical patterns
import { Expense } from '../types';

export interface ForecastResult {
  nextMonth: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  breakdown: Record<string, number>;
  recommendations: string[];
}

export const forecastExpenses = (expenses: Expense[]): ForecastResult => {
  if (expenses.length < 3) {
    return {
      nextMonth: 0,
      confidence: 0,
      trend: 'stable',
      breakdown: {},
      recommendations: ['Add more expense data for accurate forecasting']
    };
  }

  // Group by month
  const monthlyTotals: number[] = [];
  const categoryTotals: Record<string, number[]> = {};
  
  const now = new Date();
  for (let i = 2; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    
    const monthExpenses = expenses.filter(e => {
      const date = new Date(e.date);
      return date >= monthStart && date <= monthEnd;
    });
    
    const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
    monthlyTotals.push(total);
    
    monthExpenses.forEach(e => {
      if (!categoryTotals[e.category]) categoryTotals[e.category] = [];
      categoryTotals[e.category].push(e.amount);
    });
  }

  // Calculate trend
  const avg = monthlyTotals.reduce((a, b) => a + b, 0) / monthlyTotals.length;
  const lastMonth = monthlyTotals[monthlyTotals.length - 1];
  const trend = lastMonth > avg * 1.1 ? 'increasing' : lastMonth < avg * 0.9 ? 'decreasing' : 'stable';

  // Forecast next month (weighted average)
  const forecast = Math.round(
    (monthlyTotals[0] * 0.2 + monthlyTotals[1] * 0.3 + monthlyTotals[2] * 0.5)
  );

  // Category breakdown
  const breakdown: Record<string, number> = {};
  Object.keys(categoryTotals).forEach(cat => {
    const catAvg = categoryTotals[cat].reduce((a, b) => a + b, 0) / categoryTotals[cat].length;
    breakdown[cat] = Math.round(catAvg);
  });

  // Recommendations
  const recommendations: string[] = [];
  if (trend === 'increasing') {
    recommendations.push('Expenses trending up - Review discretionary spending');
  }
  Object.entries(breakdown).forEach(([cat, amount]) => {
    if (amount > avg * 0.3) {
      recommendations.push(`${cat} is ${Math.round(amount/avg*100)}% of budget - Consider optimization`);
    }
  });

  return {
    nextMonth: forecast,
    confidence: monthlyTotals.length >= 3 ? 85 : 60,
    trend,
    breakdown,
    recommendations: recommendations.length ? recommendations : ['Spending patterns look healthy']
  };
};
