import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Lock, Bell, Download, LogOut, User, Wallet, FileText, Moon, Sun, TrendingUp, Calculator, Info, CheckCircle, Target, ArrowRight, Shield, PiggyBank, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { TaxSettings } from '../types';

interface SettingsProps {
  settings: TaxSettings;
  setSettings: (settings: TaxSettings) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onLogout?: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, setSettings, isDark, toggleTheme, onLogout }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [simulatedIncome, setSimulatedIncome] = useState(1200000);
  const [notificationPrefs, setNotificationPrefs] = useState({
    taxDeadlines: true,
    invoiceReminders: true,
    paymentReceived: true,
    weeklySummary: true
  });
  
  // Simulation States
  const [simulated80C, setSimulated80C] = useState(settings.deductions80C);
  const [simulated80D, setSimulated80D] = useState(settings.deductions80D);
  const [simulatedNPS, setSimulatedNPS] = useState(false);

  // Update simulation defaults when settings change
  useEffect(() => {
    setSimulated80C(settings.deductions80C);
    setSimulated80D(settings.deductions80D);
  }, [settings]);

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'financial', label: 'Financial', icon: Wallet },
    { id: 'planning', label: 'Tax Planning', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data & Privacy', icon: FileText },
  ];

  // Simplified tax calculator for the chart simulation
  const getTaxLiability = (income: number, deductions: number, regime: 'Old' | 'New') => {
    let taxable = income;
    let tax = 0;

    if (regime === 'New') {
        taxable = Math.max(0, taxable - 75000); // Standard Deduction
        
        // New Regime Slabs (FY 24-25 Proposed)
        if (taxable <= 300000) return 0;
        
        // Rebate 87A check
        if (taxable <= 700000) return 0;

        // Simplified calculation for simulation
        if (taxable > 1500000) tax = (taxable - 1500000) * 0.30 + 150000;
        else if (taxable > 1200000) tax = (taxable - 1200000) * 0.20 + 90000;
        else if (taxable > 1000000) tax = (taxable - 1000000) * 0.15 + 60000;
        else if (taxable > 700000) tax = (taxable - 700000) * 0.10 + 30000;
        else if (taxable > 300000) tax = (taxable - 300000) * 0.05;
        
    } else {
        taxable = Math.max(0, taxable - 50000); // Standard Deduction
        taxable = Math.max(0, taxable - deductions);

        // Old Regime Slabs
        if (taxable <= 250000) return 0;
        
        // Rebate 87A check
        if (taxable <= 500000) return 0;

        if (taxable > 1000000) tax = 112500 + (taxable - 1000000) * 0.30;
        else if (taxable > 500000) tax = 12500 + (taxable - 500000) * 0.20;
        else tax = (taxable - 250000) * 0.05;
    }
    
    return Math.round(tax * 1.04); // 4% Cess
  };

  const simulatedDeductions = (simulated80C ? 150000 : 0) + (simulated80D ? 25000 : 0) + (simulatedNPS ? 50000 : 0);
  const potentialMaxDeductions = 150000 + 25000 + 50000; 

  const taxNoSavings = getTaxLiability(simulatedIncome, 0, settings.regime);
  const taxSimulated = getTaxLiability(simulatedIncome, simulatedDeductions, settings.regime);
  const taxOptimized = getTaxLiability(simulatedIncome, potentialMaxDeductions, settings.regime);

  const savingsSimulated = taxNoSavings - taxSimulated;
  const savingsOptimized = taxNoSavings - taxOptimized;

  const chartData = [
    {
      name: 'No Planning',
      'Tax Liability': taxNoSavings,
      'Savings': 0,
    },
    {
      name: 'Your Plan',
      'Tax Liability': taxSimulated,
      'Savings': savingsSimulated,
    },
    {
      name: 'Max Potential',
      'Tax Liability': taxOptimized,
      'Savings': savingsOptimized,
    }
  ];

  const formatCurrency = (val: number) => `₹${(val/1000).toFixed(0)}k`;

  return (
    <div className="min-h-screen pb-20 animate-fade-in-up">
      <div className="bg-white dark:bg-black border-b-2 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
            <h1 className="text-3xl font-black uppercase text-black dark:text-white">SETTINGS</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 p-4 shadow-lg">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 mb-2 font-bold uppercase text-xs transition flex items-center gap-3 ${
                    activeTab === tab.id
                      ? 'bg-yellow-400 text-black'
                      : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
              
              <div className="my-4 border-t-2 border-gray-200 dark:border-gray-800" />
              
              <button onClick={onLogout} className="w-full text-left px-4 py-3 font-bold uppercase text-xs text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition flex items-center gap-3">
                <LogOut size={18} />
                SIGN OUT
              </button>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white dark:bg-black border-l-8 border-cyan-500 p-6 shadow-lg">
              {activeTab === 'account' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-black uppercase text-black dark:text-white mb-6">ACCOUNT SETTINGS</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-500 mb-2">FULL NAME</label>
                      <input type="text" defaultValue="Saiyam Jain" className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white font-bold focus:border-cyan-500 outline-none" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-500 mb-2">EMAIL ADDRESS</label>
                      <input type="email" defaultValue="saiyam@paylockr.app" className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white font-bold focus:border-cyan-500 outline-none" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-500 mb-2">PHONE NUMBER</label>
                      <input type="tel" defaultValue="+91-9876543210" className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white font-bold focus:border-cyan-500 outline-none" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-500 mb-2">PAN NUMBER</label>
                      <input type="text" defaultValue="ABCDE1234F" className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white font-mono font-bold uppercase focus:border-cyan-500 outline-none" />
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-black uppercase text-black dark:text-white mb-4">APPEARANCE</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        {isDark ? <Moon className="text-cyan-500 dark:text-cyan-400" size={20} /> : <Sun className="text-yellow-500 dark:text-yellow-400" size={20} />}
                        <span className="font-bold uppercase text-black dark:text-white text-xs">DARK MODE</span>
                      </div>
                      <button 
                        onClick={toggleTheme}
                        className={`px-4 py-2 font-bold uppercase text-xs ${isDark ? 'bg-cyan-500 text-black' : 'bg-gray-300 dark:bg-gray-800 text-black dark:text-white'}`}
                      >
                        {isDark ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase transition">
                      SAVE CHANGES
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-black uppercase text-black dark:text-white mb-6">SECURITY SETTINGS</h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      <h3 className="text-lg font-black uppercase text-black dark:text-white mb-4">CHANGE PASSWORD</h3>
                      <div className="space-y-4">
                        <input type="password" placeholder="CURRENT PASSWORD" className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white font-bold uppercase placeholder-gray-500 focus:border-cyan-500 outline-none" />
                        <input type="password" placeholder="NEW PASSWORD" className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white font-bold uppercase placeholder-gray-500 focus:border-cyan-500 outline-none" />
                        <input type="password" placeholder="CONFIRM NEW PASSWORD" className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white font-bold uppercase placeholder-gray-500 focus:border-cyan-500 outline-none" />
                        <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase transition">UPDATE PASSWORD</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-6 border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      <div>
                        <h4 className="font-black uppercase text-black dark:text-white text-sm">TWO-FACTOR AUTHENTICATION</h4>
                        <p className="text-xs font-bold uppercase text-gray-600 dark:text-gray-500 mt-1">EXTRA SECURITY LAYER</p>
                      </div>
                      <button className="px-4 py-2 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-black uppercase text-xs hover:bg-cyan-500 hover:text-black transition">ENABLE</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'financial' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-black uppercase text-black dark:text-white mb-6">FINANCIAL PREFERENCES</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-500 mb-2">FINANCIAL YEAR</label>
                      <select className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white font-bold uppercase focus:border-cyan-500 outline-none">
                        <option>FY 2025-26</option>
                        <option>FY 2024-25</option>
                        <option>FY 2023-24</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-500 mb-2">TAX REGIME</label>
                      <select 
                        value={settings.regime}
                        onChange={(e) => setSettings({...settings, regime: e.target.value as any})}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white font-bold uppercase focus:border-cyan-500 outline-none"
                      >
                        <option value="New">NEW REGIME (DEFAULT)</option>
                        <option value="Old">OLD REGIME (WITH EXEMPTIONS)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-500 mb-2">CURRENCY</label>
                      <select className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white font-bold uppercase focus:border-cyan-500 outline-none" disabled>
                        <option>INDIAN RUPEE (₹)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-500 mb-2">BUSINESS TYPE</label>
                      <select className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white font-bold uppercase focus:border-cyan-500 outline-none">
                        <option>FREELANCER / INDIVIDUAL</option>
                        <option>SOLE PROPRIETORSHIP</option>
                        <option>PRIVATE LIMITED</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 dark:bg-gray-900 border-l-4 border-cyan-500">
                    <div className="flex items-center gap-3 mb-4">
                      <Wallet className="text-cyan-600 dark:text-cyan-400" size={24} />
                      <div>
                        <h4 className="font-black uppercase text-black dark:text-white text-sm">TARGET VAULT AMOUNT</h4>
                        <p className="text-xs font-bold uppercase text-gray-600 dark:text-gray-500">YOUR TAX SAVINGS GOAL</p>
                      </div>
                    </div>
                    <input 
                      type="number" 
                      value={settings.targetVaultAmount}
                      onChange={(e) => setSettings({...settings, targetVaultAmount: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white font-black text-lg focus:border-cyan-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'planning' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-black uppercase text-black dark:text-white mb-2">TAX PLANNING SIMULATOR</h2>
                      <p className="text-sm font-bold uppercase text-gray-600 dark:text-gray-500">Visualize your tax liability and maximize savings</p>
                    </div>
                    <div className="px-4 py-2 bg-yellow-400 text-black font-black uppercase text-sm">
                      {settings.regime} REGIME
                    </div>
                  </div>

                  {/* Simulator Controls */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 border-l-8 border-cyan-500">
                    <label className="block text-sm font-black uppercase text-black dark:text-white mb-4 flex items-center gap-2">
                      <Calculator size={20} /> PROJECTED ANNUAL INCOME
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                      <div className="flex-1 w-full">
                        <input 
                          type="range" 
                          min="500000" 
                          max="5000000" 
                          step="50000"
                          value={simulatedIncome}
                          onChange={(e) => setSimulatedIncome(Number(e.target.value))}
                          className="w-full h-3 bg-gray-300 dark:bg-gray-700 appearance-none cursor-pointer accent-cyan-500"
                          style={{
                            background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((simulatedIncome - 500000) / 4500000) * 100}%, #d1d5db ${((simulatedIncome - 500000) / 4500000) * 100}%, #d1d5db 100%)`
                          }}
                        />
                        <div className="flex justify-between text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mt-2">
                          <span>₹5L</span>
                          <span>₹25L</span>
                          <span>₹50L</span>
                        </div>
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 font-black text-lg">₹</span>
                        <input 
                          type="number" 
                          value={simulatedIncome}
                          onChange={(e) => setSimulatedIncome(Number(e.target.value))}
                          className="w-40 pl-8 pr-4 py-3 border-4 border-cyan-500 bg-white dark:bg-black text-right font-black text-xl text-black dark:text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="border-t-4 border-white dark:border-gray-800 pt-6">
                      <label className="block text-sm font-black uppercase text-black dark:text-white mb-4">INVESTMENTS & DEDUCTIONS</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div 
                          className={`p-5 border-4 cursor-pointer transition-all ${
                            simulated80C 
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/30 shadow-lg' 
                              : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-green-500'
                          }`}
                          onClick={() => setSimulated80C(!simulated80C)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <PiggyBank size={28} className={simulated80C ? 'text-green-600 dark:text-green-400' : 'text-gray-400'} />
                            <div className={`w-6 h-6 border-4 flex items-center justify-center ${
                              simulated80C ? 'border-green-600 bg-green-600' : 'border-gray-400'
                            }`}>
                              {simulated80C && <CheckCircle size={16} className="text-white" />}
                            </div>
                          </div>
                          <p className="font-black text-black dark:text-white text-base mb-1">SECTION 80C</p>
                          <p className="text-xs font-bold uppercase text-gray-600 dark:text-gray-400">ELSS, PF, LIC</p>
                          <p className="text-lg font-black text-green-600 dark:text-green-400 mt-2">₹1,50,000</p>
                        </div>

                        <div 
                          className={`p-5 border-4 cursor-pointer transition-all ${
                            simulated80D 
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-lg' 
                              : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-purple-500'
                          }`}
                          onClick={() => setSimulated80D(!simulated80D)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <Shield size={28} className={simulated80D ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'} />
                            <div className={`w-6 h-6 border-4 flex items-center justify-center ${
                              simulated80D ? 'border-purple-600 bg-purple-600' : 'border-gray-400'
                            }`}>
                              {simulated80D && <CheckCircle size={16} className="text-white" />}
                            </div>
                          </div>
                          <p className="font-black text-black dark:text-white text-base mb-1">SECTION 80D</p>
                          <p className="text-xs font-bold uppercase text-gray-600 dark:text-gray-400">HEALTH INSURANCE</p>
                          <p className="text-lg font-black text-purple-600 dark:text-purple-400 mt-2">₹25,000</p>
                        </div>

                        <div 
                          className={`p-5 border-4 cursor-pointer transition-all ${
                            simulatedNPS 
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 shadow-lg' 
                              : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-orange-500'
                          }`}
                          onClick={() => setSimulatedNPS(!simulatedNPS)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <BookOpen size={28} className={simulatedNPS ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400'} />
                            <div className={`w-6 h-6 border-4 flex items-center justify-center ${
                              simulatedNPS ? 'border-orange-600 bg-orange-600' : 'border-gray-400'
                            }`}>
                              {simulatedNPS && <CheckCircle size={16} className="text-white" />}
                            </div>
                          </div>
                          <p className="font-black text-black dark:text-white text-base mb-1">NPS (80CCD)</p>
                          <p className="text-xs font-bold uppercase text-gray-600 dark:text-gray-400">NATIONAL PENSION</p>
                          <p className="text-lg font-black text-orange-600 dark:text-orange-400 mt-2">₹50,000</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chart Section */}
                  <div className="bg-white dark:bg-black border-l-8 border-yellow-400 p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black uppercase text-black dark:text-white">TAX LIABILITY COMPARISON</h3>
                      <div className="flex gap-4 text-xs font-bold uppercase">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 bg-red-500"></span>
                          <span className="text-gray-600 dark:text-gray-400">TAX PAYABLE</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 bg-green-500"></span>
                          <span className="text-gray-600 dark:text-gray-400">SAVINGS</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          barSize={60}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e5e7eb'} />
                          <XAxis 
                            dataKey="name" 
                            stroke={isDark ? '#94a3b8' : '#6b7280'} 
                            tick={{ fill: isDark ? '#94a3b8' : '#6b7280', fontWeight: 'bold' }}
                            tickLine={false}
                          />
                          <YAxis 
                            stroke={isDark ? '#94a3b8' : '#6b7280'} 
                            tickFormatter={formatCurrency}
                            tick={{ fill: isDark ? '#94a3b8' : '#6b7280', fontWeight: 'bold' }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: isDark ? '#1e293b' : '#ffffff',
                              borderColor: isDark ? '#334155' : '#e5e7eb',
                              color: isDark ? '#ffffff' : '#000000',
                              borderRadius: '0px',
                              border: '4px solid',
                              fontWeight: 'bold'
                            }}
                            cursor={{ fill: 'transparent' }}
                            formatter={(value: number, name: string) => [`₹${value.toLocaleString('en-IN')}`, name]}
                          />
                          <Bar dataKey="Tax Liability" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="Savings" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                       <div className="p-5 border-l-8 border-red-500 bg-red-50 dark:bg-red-900/20">
                          <p className="text-xs font-black text-red-600 dark:text-red-400 uppercase mb-2">BASE LIABILITY</p>
                          <p className="text-3xl font-black text-black dark:text-white">₹{taxNoSavings.toLocaleString('en-IN')}</p>
                          <p className="text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mt-1">Without deductions</p>
                       </div>

                       <div className="p-5 border-l-8 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                          <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase mb-2">YOUR PLAN SAVINGS</p>
                          <div className="flex items-center gap-2">
                            <p className="text-3xl font-black text-black dark:text-white">₹{savingsSimulated.toLocaleString('en-IN')}</p>
                            <span className="text-xs font-black text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1">
                              {taxNoSavings > 0 ? ((savingsSimulated / taxNoSavings) * 100).toFixed(0) : 0}%
                            </span>
                          </div>
                          <p className="text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mt-1">Based on selections</p>
                       </div>

                       <div className="p-5 border-l-8 border-green-500 bg-green-50 dark:bg-green-900/20">
                          <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase mb-2">MAX POTENTIAL</p>
                          <p className="text-3xl font-black text-black dark:text-white">₹{savingsOptimized.toLocaleString('en-IN')}</p>
                          <p className="text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mt-1">With all deductions</p>
                       </div>
                    </div>

                    <div className="mt-6 p-5 bg-yellow-50 dark:bg-yellow-900/20 border-l-8 border-yellow-400 flex gap-3">
                      <Info className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
                      <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        <p className="font-black text-black dark:text-white mb-2 uppercase">💡 PRO TIP</p>
                        <p>Under the {settings.regime} Regime, you can save up to ₹{savingsOptimized.toLocaleString('en-IN')} by maximizing your deductions. Start investing in tax-saving instruments today!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-black uppercase text-black dark:text-white mb-6">NOTIFICATION PREFERENCES</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'taxDeadlines', title: 'TAX DEADLINES', desc: 'ALERTS 7 DAYS BEFORE DUE DATES' },
                      { key: 'invoiceReminders', title: 'INVOICE REMINDERS', desc: 'WHEN INVOICES ARE OVERDUE' },
                      { key: 'paymentReceived', title: 'PAYMENT RECEIVED', desc: 'INSTANT ALERTS FOR INCOMING PAYMENTS' },
                      { key: 'weeklySummary', title: 'WEEKLY SUMMARY', desc: 'WEEKLY EMAIL REPORT OF FINANCES' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-black transition">
                        <div>
                          <h4 className="font-black uppercase text-black dark:text-white text-sm">{item.title}</h4>
                          <p className="text-xs font-bold uppercase text-gray-600 dark:text-gray-500 mt-1">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => setNotificationPrefs({...notificationPrefs, [item.key]: !notificationPrefs[item.key as keyof typeof notificationPrefs]})}
                          className={`px-4 py-2 font-black uppercase text-xs transition ${notificationPrefs[item.key as keyof typeof notificationPrefs] ? 'bg-green-500 text-black' : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'}`}
                        >
                          {notificationPrefs[item.key as keyof typeof notificationPrefs] ? 'ON' : 'OFF'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'data' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-black uppercase text-black dark:text-white mb-6">DATA & PRIVACY</h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      <div className="flex items-center gap-4 mb-4">
                        <Download className="text-cyan-600 dark:text-cyan-400" size={24} />
                        <div>
                          <h4 className="font-black uppercase text-black dark:text-white text-sm">EXPORT FINANCIAL DATA</h4>
                          <p className="text-xs font-bold uppercase text-gray-600 dark:text-gray-500 mt-1">DOWNLOAD ALL TRANSACTIONS & REPORTS</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => alert('CSV file downloaded successfully!')} className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white font-black uppercase text-xs transition">CSV FORMAT</button>
                        <button onClick={() => alert('PDF report downloaded successfully!')} className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white font-black uppercase text-xs transition">PDF REPORT</button>
                      </div>
                    </div>

                    <div className="p-6 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
                      <h4 className="font-black uppercase text-red-600 dark:text-red-400 text-sm mb-2">DELETE ACCOUNT</h4>
                      <p className="text-xs font-bold uppercase text-red-500 dark:text-red-300 mb-4">PERMANENTLY REMOVE YOUR ACCOUNT. THIS ACTION CANNOT BE UNDONE.</p>
                      <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-black font-black uppercase transition">DELETE MY ACCOUNT</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};