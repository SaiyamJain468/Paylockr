import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, Filter, Download, ArrowDownLeft, ArrowUpRight, Calendar as CalendarIcon, X, Plus, DollarSign, Ban } from 'lucide-react';
import { CATEGORIES } from '../utils/multiUserUnifiedData';
import { Transaction, TransactionType, TransactionStatus } from '../types';
import { Button } from '../components/common/Button';
import { TransactionModal } from '../components/Transactions/TransactionModal';

type SortBy = 'DATE_NEW' | 'DATE_OLD' | 'AMOUNT_HIGH' | 'AMOUNT_LOW';
type FilterType = 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER';
type TimePeriod = 'TODAY' | 'THIS_WEEK' | 'THIS_MONTH' | 'LAST_3M' | 'CUSTOM';

interface TransactionsProps {
  transactions: Transaction[]; 
  onAdd: (t: Transaction) => void;
  onUpdate?: (t: Transaction) => void;
}

export const Transactions: React.FC<TransactionsProps> = ({ transactions = [], onAdd, onUpdate }) => {
  const [filterType, setFilterType] = useState<FilterType>('ALL');
  const [sortBy, setSortBy] = useState<SortBy>('DATE_NEW');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('THIS_MONTH');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 1000000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Helper to get date object safely
  const getTxnDate = (t: Transaction) => {
    return t.date instanceof Date ? t.date : new Date(t.date);
  };

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Filter by Type
    if (filterType !== 'ALL') {
      if (filterType === 'INCOME') filtered = filtered.filter(t => t.type === TransactionType.BUSINESS || t.type === TransactionType.REFUND);
      if (filterType === 'EXPENSE') filtered = filtered.filter(t => t.type === TransactionType.PERSONAL);
    }

    // Filter by Category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(t => t.category && selectedCategories.includes(t.category));
    }

    // Filter by Amount
    filtered = filtered.filter(t => t.amount >= amountRange[0] && t.amount <= amountRange[1]);

    // Filter by Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.source.toLowerCase().includes(term) ||
        (t.notes || '').toLowerCase().includes(term) ||
        (t.description || '').toLowerCase().includes(term)
      );
    }

    // Filter by Date
    const now = new Date();
    let startDate = new Date();

    switch (timePeriod) {
      case 'TODAY':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'THIS_WEEK':
        startDate.setDate(now.getDate() - now.getDay());
        break;
      case 'THIS_MONTH':
        startDate.setDate(1);
        break;
      case 'LAST_3M':
        startDate.setMonth(now.getMonth() - 3);
        break;
      default:
        startDate = new Date(0); // All time if custom isn't set
        break;
    }

    filtered = filtered.filter(t => getTxnDate(t) >= startDate);

    // Sorting
    filtered.sort((a, b) => {
      const dateA = getTxnDate(a).getTime();
      const dateB = getTxnDate(b).getTime();
      switch (sortBy) {
        case 'DATE_NEW': return dateB - dateA;
        case 'DATE_OLD': return dateA - dateB;
        case 'AMOUNT_HIGH': return b.amount - a.amount;
        case 'AMOUNT_LOW': return a.amount - b.amount;
        default: return 0;
      }
    });

    return filtered;
  }, [transactions, filterType, selectedCategories, amountRange, searchTerm, timePeriod, sortBy]);

  // Calculate summary stats
  const summary = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.type === TransactionType.BUSINESS || t.type === TransactionType.REFUND)
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = filteredTransactions
      .filter(t => t.type === TransactionType.PERSONAL)
      .reduce((sum, t) => sum + t.amount, 0);
    const taxable = filteredTransactions
      .filter(t => t.type === TransactionType.BUSINESS)
      .reduce((sum, t) => sum + (t.estimatedTax || 0), 0);
    return { income, expense, balance: income - expense, taxable };
  }, [filteredTransactions]);

  const groupedTransactions = useMemo(() => {
    const grouped: Record<string, Transaction[]> = {};

    filteredTransactions.forEach(txn => {
      const date = getTxnDate(txn);
      const dateKey = date.toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(txn);
    });

    return grouped;
  }, [filteredTransactions]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getCategoryInfo = (category: string) => {
    const catData = CATEGORIES[category] || CATEGORIES[category.toUpperCase()] || { icon: '•', color: '#666' };
    return catData;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen pb-20 animate-fade-in-up">
      {modalOpen && <TransactionModal onClose={() => setModalOpen(false)} onSave={onAdd} />}
      
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-bold uppercase text-black/70 mb-3">TOTAL BALANCE</h2>
          <p className="text-3xl sm:text-4xl font-black text-black mb-4">{formatCurrency(summary.balance)}</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded">
              <p className="text-[10px] font-bold uppercase text-black/70 mb-1">INCOME</p>
              <p className="text-lg sm:text-xl font-black text-green-700">↑ {formatCurrency(summary.income)}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded">
              <p className="text-[10px] font-bold uppercase text-black/70 mb-1">EXPENSE</p>
              <p className="text-lg sm:text-xl font-black text-red-700">↓ {formatCurrency(summary.expense)}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded">
              <p className="text-[10px] font-bold uppercase text-black/70 mb-1">TAX</p>
              <p className="text-lg sm:text-xl font-black text-orange-700">₹ {formatCurrency(summary.taxable)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-black border-b-2 border-gray-200 dark:border-gray-800 shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="SEARCH..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-yellow-400 outline-none font-bold uppercase text-xs"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-1">
              <div className="flex bg-gray-100 dark:bg-gray-900 p-0.5 flex-shrink-0">
                {(['ALL', 'INCOME', 'EXPENSE'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-2.5 py-1.5 text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
                      filterType === type
                        ? 'bg-yellow-400 text-black'
                        : 'text-black dark:text-white hover:text-yellow-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
                className="px-2 py-1.5 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 text-[10px] text-black dark:text-white focus:outline-none font-bold uppercase flex-shrink-0"
              >
                <option value="TODAY">TODAY</option>
                <option value="THIS_WEEK">WEEK</option>
                <option value="THIS_MONTH">MONTH</option>
                <option value="LAST_3M">3M</option>
                <option value="CUSTOM">ALL</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-1.5 text-xs font-bold uppercase flex items-center gap-1 transition-colors border-2 flex-shrink-0 ${
                  showFilters
                    ? 'bg-cyan-500 border-cyan-500 text-black'
                    : 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-black dark:text-white'
                }`}
              >
                <Filter size={14} />
              </button>
              
              <Button onClick={() => setModalOpen(true)} className="whitespace-nowrap bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase flex-shrink-0 text-[10px] px-2 py-1.5">
                <div className="flex items-center gap-1">
                  <Plus size={14} /> ADD
                </div>
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 pt-3 border-t-2 border-gray-200 dark:border-gray-800 space-y-3 animate-fade-in">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">CATEGORIES</h3>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(CATEGORIES).map(([key, value]: any) => (
                    <button
                      key={key}
                      onClick={() => toggleCategory(key)}
                      className={`px-2 py-1 text-[10px] font-bold uppercase border-2 transition-colors flex items-center gap-1 ${
                        selectedCategories.includes(key)
                          ? 'bg-cyan-500 border-cyan-500 text-black'
                          : 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-black dark:text-white'
                      }`}
                    >
                      <span className="text-xs">{value.icon}</span> {key}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">SORT BY</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'NEW', value: 'DATE_NEW' },
                    { label: 'OLD', value: 'DATE_OLD' },
                    { label: 'HIGH', value: 'AMOUNT_HIGH' },
                    { label: 'LOW', value: 'AMOUNT_LOW' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value as SortBy)}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase border-2 transition-colors ${
                        sortBy === opt.value
                          ? 'bg-white text-black border-white'
                          : 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-black dark:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="space-y-4">
          {Object.entries(groupedTransactions).map(([dateKey, dayTransactions]) => (
            <div key={dateKey}>
              <div className="flex items-center gap-2 mb-2 sticky top-20 z-10">
                <span className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wide">
                  {dateKey.toUpperCase()}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
              </div>

              <div className="space-y-2">
                {dayTransactions.map((txn) => {
                  const categoryInfo = getCategoryInfo(txn.category || 'OTHER');
                  const isExpense = txn.type === TransactionType.PERSONAL;

                  return (
                    <div
                      key={txn.id}
                      onClick={() => setSelectedTransaction(txn)}
                      className="bg-white dark:bg-black border-l-4 border-cyan-500 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 hover:shadow-lg transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <div
                            className="w-8 h-8 flex items-center justify-center text-sm flex-shrink-0"
                            style={{ backgroundColor: `${categoryInfo.color}20` }}
                          >
                            {categoryInfo.icon}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-sm text-black dark:text-white truncate">
                              {txn.source}
                            </h3>
                            <div className="flex flex-wrap items-center gap-1 mt-0.5">
                              <p className="text-[10px] text-gray-500 font-bold uppercase truncate">
                                {txn.category || 'UNCATEGORIZED'}
                              </p>
                              {txn.type === TransactionType.BUSINESS && (
                                <span className="text-[8px] bg-green-500 text-black px-1 py-0.5 font-black uppercase">
                                  💵
                                </span>
                              )}
                              {(txn.type === TransactionType.REFUND || (txn.type === TransactionType.PERSONAL && txn.amount > 0)) && (
                                <span className="text-[8px] bg-red-500 text-white px-1 py-0.5 font-black uppercase">
                                  🚫
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <p
                            className={`text-sm font-black ${
                              isExpense ? 'text-black dark:text-white' : 'text-green-500 dark:text-green-400'
                            }`}
                          >
                            {isExpense ? '-' : '+'} {formatCurrency(txn.amount)}
                          </p>
                          {txn.status === TransactionStatus.VAULTED && (
                            <span className="text-[8px] bg-green-500 text-black px-1 py-0.5 font-black uppercase">
                              VAULT
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4 grayscale opacity-50">📭</div>
            <h3 className="text-lg font-black uppercase text-black dark:text-white mb-2">NO TRANSACTIONS FOUND</h3>
            <p className="text-gray-500 font-bold uppercase text-xs">TRY ADJUSTING FILTERS</p>
          </div>
        )}
      </div>

      {selectedTransaction && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="bg-white dark:bg-black border-4 border-yellow-400 w-full max-w-md p-6 shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black uppercase text-black dark:text-white">TRANSACTION DETAILS</h3>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="text-gray-400 hover:text-white p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto flex items-center justify-center mb-3`}
                     style={{ backgroundColor: `${getCategoryInfo(selectedTransaction.category || 'OTHER').color}20` }}
                >
                   <span className="text-3xl">{getCategoryInfo(selectedTransaction.category || 'OTHER').icon}</span>
                </div>
                <p className="text-3xl font-black text-black dark:text-white">
                  {selectedTransaction.type === TransactionType.PERSONAL ? '-' : '+'}
                  {formatCurrency(selectedTransaction.amount)}
                </p>
                <p className="text-gray-500 mt-1 font-bold uppercase text-xs">{selectedTransaction.source}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 space-y-3 text-sm border-l-4 border-cyan-500">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase text-xs">DATE</span>
                  <span className="font-black text-black dark:text-white">{getTxnDate(selectedTransaction).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase text-xs">CATEGORY</span>
                  <span className="font-black text-black dark:text-white">{selectedTransaction.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase text-xs">STATUS</span>
                  <span className="font-black text-black dark:text-white uppercase">{selectedTransaction.status.toLowerCase()}</span>
                </div>
                
                {/* Tax Classification */}
                <div className="pt-2 border-t-2 border-gray-200 dark:border-gray-800">
                  <p className="text-gray-500 font-bold uppercase text-xs mb-2">TAX CLASSIFICATION</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const updated = {...selectedTransaction, type: TransactionType.BUSINESS, estimatedTax: selectedTransaction.amount * 0.1};
                        onUpdate && onUpdate(updated);
                        setSelectedTransaction(updated);
                      }}
                      className={`flex-1 px-3 py-2 text-xs font-bold uppercase transition flex items-center justify-center gap-2 ${
                        selectedTransaction.type === TransactionType.BUSINESS
                          ? 'bg-green-500 text-black'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-500 hover:text-black'
                      }`}
                    >
                      <DollarSign size={16} /> TAXABLE
                    </button>
                    <button
                      onClick={() => {
                        const updated = {...selectedTransaction, type: TransactionType.REFUND, estimatedTax: 0};
                        onUpdate && onUpdate(updated);
                        setSelectedTransaction(updated);
                      }}
                      className={`flex-1 px-3 py-2 text-xs font-bold uppercase transition flex items-center justify-center gap-2 ${
                        selectedTransaction.type === TransactionType.REFUND || (selectedTransaction.type === TransactionType.PERSONAL && selectedTransaction.amount > 0)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Ban size={16} /> NON-TAXABLE
                    </button>
                  </div>
                </div>
                
                {selectedTransaction.estimatedTax > 0 && (
                  <div className="flex justify-between pt-2 border-t-2 border-gray-200 dark:border-gray-800">
                    <span className="text-gray-500 font-bold uppercase text-xs">ESTIMATED TAX</span>
                    <span className="font-black text-red-500 dark:text-red-400">{formatCurrency(selectedTransaction.estimatedTax)}</span>
                  </div>
                )}
                {selectedTransaction.referenceId && (
                  <div className="flex justify-between pt-2 border-t-2 border-gray-200 dark:border-gray-800">
                    <span className="text-gray-500 font-bold uppercase text-xs">REFERENCE ID</span>
                    <span className="font-black text-gray-600 dark:text-gray-300 font-mono">{selectedTransaction.referenceId}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    if (selectedTransaction.referenceId) {
                      alert('Receipt downloaded successfully!');
                    } else {
                      alert('Receipt not available - This transaction was not linked to a receipt or invoice.');
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-yellow-400 text-black hover:bg-yellow-500 font-black uppercase transition shadow-lg"
                >
                  DOWNLOAD RECEIPT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};