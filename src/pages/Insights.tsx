import React from 'react';
import { Transaction } from '../types';

interface InsightsProps {
  transactions: Transaction[];
}

export const Insights: React.FC<InsightsProps> = ({ transactions }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl text-white shadow-xl">
        <h2 className="text-2xl font-bold">AI Tax Assistant</h2>
        <p className="text-indigo-100">Analyze your transactions for tax insights</p>
      </div>
    </div>
  );
};

export default Insights;