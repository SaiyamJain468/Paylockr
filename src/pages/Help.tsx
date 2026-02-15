import React from 'react';
import { HelpCircle, Mail, MessageCircle, FileQuestion } from 'lucide-react';

export const Help: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How can we help you?</h1>
        <div className="max-w-xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Search for help..." 
            className="w-full px-6 py-4 rounded-full border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white shadow-sm placeholder:text-gray-400"
          />
          <button className="absolute right-2 top-2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition">
            <HelpCircle size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border-2 border-gray-200 dark:border-slate-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition text-center cursor-pointer group">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
            <FileQuestion size={24} />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">FAQs</h3>
          <p className="text-sm text-gray-600 dark:text-slate-400">Browse common questions about PayLockr features.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border-2 border-gray-200 dark:border-slate-800 hover:shadow-lg hover:border-green-300 dark:hover:border-green-700 transition text-center cursor-pointer group">
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600 dark:text-slate-400">Chat with our support team in real-time.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border-2 border-gray-200 dark:border-slate-800 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700 transition text-center cursor-pointer group">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email Support</h3>
          <p className="text-sm text-gray-600 dark:text-slate-400">Get a response within 24 hours.</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:bg-blue-900/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Popular Articles</h3>
        <ul className="space-y-3">
          {['How to link your bank account', 'Understanding Tax Vault logic', 'Exporting financial reports', 'Resetting your password'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition font-medium">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};