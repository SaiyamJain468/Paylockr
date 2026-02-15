import React from 'react';
import { BarChart3 } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ChartDataPoint } from '../../types';

interface ChartProps {
  data: ChartDataPoint[];
  isDarkMode: boolean;
}

export const Chart: React.FC<ChartProps> = ({ data, isDarkMode }) => {
  return (
    <div className={`lg:col-span-2 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-2 rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Income vs Tax Trend
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mt-1`}>
            Last 6 months performance
          </p>
        </div>
        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
          <BarChart3 className={`w-6 h-6 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e5e7eb'} />
          <XAxis dataKey="name" stroke={isDarkMode ? '#94a3b8' : '#6b7280'} style={{ fontSize: '12px' }} />
          <YAxis stroke={isDarkMode ? '#94a3b8' : '#6b7280'} style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              border: `2px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
              borderRadius: '12px',
              color: isDarkMode ? '#fff' : '#111827',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Area type="monotone" dataKey="income" stroke="#3b82f6" fill="#3b82f6" fillOpacity={isDarkMode ? 0.1 : 0.2} strokeWidth={2} name="Income" />
          <Area type="monotone" dataKey="tax" stroke="#a855f7" fill="#a855f7" fillOpacity={isDarkMode ? 0.1 : 0.2} strokeWidth={2} name="Tax" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};