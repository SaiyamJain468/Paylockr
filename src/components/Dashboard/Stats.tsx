import React from 'react';
import { TrendingUp, Calculator, Lock, Wallet } from 'lucide-react';

interface StatsProps {
  totalIncome: number;
  estimatedTax: number;
  vaultBalance: number;
  spendable: number;
  isDarkMode: boolean;
}

export const Stats: React.FC<StatsProps> = ({ totalIncome, estimatedTax, vaultBalance, spendable, isDarkMode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'} border-2 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow`}>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'} flex items-center justify-center`}>
            <TrendingUp className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded ${isDarkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-700'}`}>
            +12.5%
          </span>
        </div>
        <p className={`text-xs md:text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Total Income</p>
        <p className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{totalIncome.toLocaleString('en-IN')}</p>
      </div>

      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} border-2 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow`}>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-100'} flex items-center justify-center`}>
            <Calculator className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-purple-100 text-purple-700'}`}>
            ~10%
          </span>
        </div>
        <p className={`text-xs md:text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-700'} mb-1`}>Estimated Tax</p>
        <p className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{estimatedTax.toLocaleString('en-IN')}</p>
      </div>

      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'} border-2 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow`}>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${isDarkMode ? 'bg-green-500/10' : 'bg-green-100'} flex items-center justify-center`}>
            <Lock className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded ${isDarkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-700'}`}>
            Secured
          </span>
        </div>
        <p className={`text-xs md:text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-700'} mb-1`}>Vault Balance</p>
        <p className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{vaultBalance.toLocaleString('en-IN')}</p>
      </div>

      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'} border-2 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow`}>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${isDarkMode ? 'bg-amber-500/10' : 'bg-amber-100'} flex items-center justify-center`}>
            <Wallet className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-100 text-amber-700'}`}>
            Available
          </span>
        </div>
        <p className={`text-xs md:text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-700'} mb-1`}>Spendable</p>
        <p className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{spendable.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
};