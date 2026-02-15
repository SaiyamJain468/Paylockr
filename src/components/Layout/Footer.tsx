import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center text-sm text-gray-600 dark:text-slate-400 border-t border-gray-200 dark:border-slate-800 mt-8 bg-white dark:bg-slate-900">
      <p>© {new Date().getFullYear()} PayLockr. All rights reserved.</p>
    </footer>
  );
};