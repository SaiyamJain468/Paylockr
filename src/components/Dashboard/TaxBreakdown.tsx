import React from 'react';
import { Calculator, Info } from 'lucide-react';
import { TaxCalculationResult } from '../../utils/taxCalculator';

interface TaxBreakdownProps {
  taxCalc: TaxCalculationResult;
  vaultBalance: number;
  isDarkMode: boolean;
}

export const TaxBreakdown: React.FC<TaxBreakdownProps> = ({ taxCalc, vaultBalance, isDarkMode }) => {
  const monthlyTax = Math.round(taxCalc.totalTax / 12);
  const vaultCoverage = vaultBalance > 0 ? ((vaultBalance / taxCalc.totalTax) * 100) : 0;

  return (
    <div className={`${isDarkMode ? 'bg-black border-l-8 border-cyan-500' : 'bg-white border-l-8 border-cyan-500'} p-6 shadow-lg`}>
      <div className="flex items-center gap-3 mb-6">
        <Calculator className={`w-8 h-8 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-500'}`} />
        <div>
          <h2 className={`text-xl font-black uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>
            TAX CALCULATION BREAKDOWN
          </h2>
          <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            FY 2025-26 (NEW REGIME)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Gross Income */}
        <div className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded`}>
          <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
            GROSS ANNUAL INCOME
          </p>
          <p className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>
            ₹{taxCalc.totalIncome.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Deductions */}
        <div className={`p-4 border-2 ${isDarkMode ? 'border-green-500/30 bg-green-500/10' : 'border-green-200 bg-green-50'}`}>
          <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-green-400' : 'text-green-600'} mb-2`}>
            DEDUCTIONS APPLIED
          </p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Standard Deduction</span>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>₹75,000</span>
            </div>
          </div>
        </div>

        {/* Taxable Income */}
        <div className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded`}>
          <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
            TAXABLE INCOME
          </p>
          <p className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>
            ₹{taxCalc.taxableIncome.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Tax Slab Breakdown */}
        <div className={`p-4 border-2 ${isDarkMode ? 'border-yellow-500/30' : 'border-yellow-200'}`}>
          <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-3`}>
            TAX SLAB: {taxCalc.slab.label} @ {taxCalc.slab.rate}%
          </p>
          {taxCalc.breakdown && taxCalc.breakdown.length > 0 && (
            <div className="space-y-2">
              {taxCalc.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.slab}
                  </span>
                  <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    ₹{item.tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              ))}
              <div className={`pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <div className="flex justify-between">
                  <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Base Tax
                  </span>
                  <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    ₹{taxCalc.taxAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    + 4% Cess
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    ₹{taxCalc.cess.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Total Tax */}
        <div className={`p-4 ${isDarkMode ? 'bg-red-500/20 border-2 border-red-500' : 'bg-red-50 border-2 border-red-200'}`}>
          <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-red-400' : 'text-red-600'} mb-2`}>
            TOTAL TAX LIABILITY
          </p>
          <div className="flex items-baseline gap-2">
            <p className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>
              ₹{taxCalc.totalTax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              /year
            </span>
          </div>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Monthly: ₹{monthlyTax.toLocaleString('en-IN')} | Effective Rate: {taxCalc.effectiveRate.toFixed(1)}%
          </p>
        </div>

        {/* Vault Status */}
        <div className={`p-4 ${isDarkMode ? 'bg-green-500/20 border-2 border-green-500' : 'bg-green-50 border-2 border-green-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              🔒 SMART TAX VAULT
            </p>
            <span className={`text-xs font-bold px-2 py-1 ${vaultCoverage >= 100 ? 'bg-green-500 text-black' : vaultCoverage >= 50 ? 'bg-yellow-400 text-black' : 'bg-red-500 text-white'}`}>
              {vaultCoverage >= 100 ? '✓ FULLY COVERED' : `${vaultCoverage.toFixed(0)}% SAVED`}
            </span>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Amount Locked (10% Auto-Save)</p>
              <p className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>
                ₹{vaultBalance.toLocaleString('en-IN')}
              </p>
            </div>
            
            <div className={`p-3 ${isDarkMode ? 'bg-black/50' : 'bg-white'} rounded`}>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Annual Tax Needed</p>
              <p className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>
                ₹{taxCalc.totalTax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
            </div>
            
            <div className={`p-3 ${isDarkMode ? 'bg-black/50' : 'bg-white'} rounded`}>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {vaultBalance >= taxCalc.totalTax ? 'Surplus' : 'Still Need to Save'}
              </p>
              <p className={`text-xl font-black ${vaultBalance >= taxCalc.totalTax ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-red-400' : 'text-red-600')}`}>
                ₹{Math.abs(vaultBalance - taxCalc.totalTax).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
          
          <div className={`mt-4 h-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div 
              className={`h-full transition-all ${vaultCoverage >= 100 ? 'bg-green-500' : vaultCoverage >= 50 ? 'bg-yellow-400' : 'bg-red-500'}`}
              style={{ width: `${Math.min(vaultCoverage, 100)}%` }}
            />
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2 text-center`}>
            {vaultCoverage >= 100 ? '🎉 You have enough saved for taxes!' : `Keep saving! ${(100 - vaultCoverage).toFixed(0)}% more to go`}
          </p>
        </div>

        {/* Info */}
        <div className={`p-3 ${isDarkMode ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'} rounded flex gap-2`}>
          <Info className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <strong>How it works:</strong> PayLockr automatically saves 10% of every income to your vault. Based on your projected annual income of ₹{taxCalc.totalIncome.toLocaleString('en-IN')}, your tax liability is ₹{taxCalc.totalTax.toLocaleString('en-IN', { maximumFractionDigits: 0 })} ({taxCalc.effectiveRate.toFixed(1)}% effective rate).
          </p>
        </div>
      </div>
    </div>
  );
};
