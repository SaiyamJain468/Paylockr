import React from 'react';
import { Info } from 'lucide-react';
import { NEW_TAX_REGIME_2026 } from '../../utils/taxCalculator';

interface TaxSlabExplainerProps {
  annualIncome: number;
  isDarkMode: boolean;
}

export const TaxSlabExplainer: React.FC<TaxSlabExplainerProps> = ({ annualIncome, isDarkMode }) => {
  const taxableIncome = Math.max(0, annualIncome - 75000); // Standard deduction
  
  // Calculate tax breakdown by slab
  const breakdown: { slab: string; income: number; rate: number; tax: number }[] = [];
  let totalTax = 0;
  
  for (const slab of NEW_TAX_REGIME_2026) {
    if (taxableIncome > slab.min) {
      const incomeInSlab = slab.max 
        ? Math.min(taxableIncome, slab.max) - slab.min
        : taxableIncome - slab.min;
      
      const taxInSlab = (incomeInSlab * slab.rate) / 100;
      totalTax += taxInSlab;
      
      if (incomeInSlab > 0) {
        breakdown.push({
          slab: slab.label,
          income: incomeInSlab,
          rate: slab.rate,
          tax: taxInSlab
        });
      }
    }
  }

  return (
    <div className={`${isDarkMode ? 'bg-black border-l-8 border-yellow-500' : 'bg-white border-l-8 border-yellow-500'} p-6 shadow-lg`}>
      <h2 className={`text-xl font-black uppercase ${isDarkMode ? 'text-white' : 'text-black'} mb-4`}>
        YOUR TAX SLAB EXPLAINED
      </h2>
      
      <div className="space-y-4">
        <div className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Your Annual Income</p>
          <p className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>
            ₹{annualIncome.toLocaleString('en-IN')}
          </p>
        </div>

        <div className={`p-4 border-2 ${isDarkMode ? 'border-green-500/30' : 'border-green-200'}`}>
          <p className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'} mb-1`}>Less: Standard Deduction</p>
          <p className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>₹75,000</p>
        </div>

        <div className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Taxable Income</p>
          <p className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>
            ₹{taxableIncome.toLocaleString('en-IN')}
          </p>
        </div>

        <div className={`p-4 border-2 ${isDarkMode ? 'border-yellow-500/30' : 'border-yellow-200'}`}>
          <p className={`text-sm font-bold uppercase ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-3`}>
            Progressive Tax Calculation:
          </p>
          <div className="space-y-3">
            {breakdown.map((item, idx) => (
              <div key={idx} className={`p-3 ${isDarkMode ? 'bg-black/50' : 'bg-white'} rounded`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.slab}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      ₹{item.income.toLocaleString('en-IN')} @ {item.rate}%
                    </p>
                  </div>
                  <p className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    ₹{item.tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className={`h-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div 
                    className={`h-full ${
                      item.rate === 0 ? 'bg-green-500' :
                      item.rate <= 10 ? 'bg-yellow-400' :
                      item.rate <= 20 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(item.income / taxableIncome) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-4 ${isDarkMode ? 'bg-red-500/20 border-2 border-red-500' : 'bg-red-50 border-2 border-red-200'}`}>
          <p className={`text-sm font-bold uppercase ${isDarkMode ? 'text-red-400' : 'text-red-600'} mb-2`}>
            Total Tax (+ 4% Cess)
          </p>
          <p className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>
            ₹{(totalTax * 1.04).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>

        <div className={`p-3 ${isDarkMode ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'} rounded flex gap-2`}>
          <Info className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            India uses a progressive tax system. You don't pay {breakdown[breakdown.length - 1]?.rate}% on your entire income - only on the portion that falls in each slab!
          </p>
        </div>
      </div>
    </div>
  );
};
