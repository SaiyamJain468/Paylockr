import { Transaction, Expense, Invoice, VaultEntry, BankAccount, VaultDocument, TransactionType, TransactionStatus } from '../types';

// Fixed realistic transaction data
export const FIXED_TRANSACTIONS: Transaction[] = [
  // Recent transactions (Last 7 days)
  { id: 'TXN-001', userId: 'saiyam', date: new Date('2024-12-06'), source: 'TechFlow Systems', amount: 85000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 8500, category: 'FREELANCE', description: 'Website Development - Phase 2', merchant: 'TechFlow Systems', paymentMethod: 'NEFT', referenceId: 'REF-TF-2024-456' },
  { id: 'TXN-002', userId: 'saiyam', date: new Date('2024-12-05'), source: 'Designify Studio', amount: 65000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 6500, category: 'FREELANCE', description: 'UI/UX Design for Mobile App', merchant: 'Designify Studio', paymentMethod: 'IMPS', referenceId: 'REF-DS-2024-789' },
  { id: 'TXN-003', userId: 'saiyam', date: new Date('2024-12-04'), source: 'Adobe Creative Cloud', amount: 3299, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'SUBSCRIPTIONS', description: 'Monthly subscription', merchant: 'Adobe', paymentMethod: 'Credit Card' },
  { id: 'TXN-004', userId: 'saiyam', date: new Date('2024-12-03'), source: 'Growth Hackers Inc', amount: 120000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 12000, category: 'FREELANCE', description: 'Digital Marketing Consulting', merchant: 'Growth Hackers Inc', paymentMethod: 'Wire Transfer', referenceId: 'REF-GH-2024-321' },
  { id: 'TXN-005', userId: 'saiyam', date: new Date('2024-12-02'), source: 'Swiggy', amount: 850, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'FOOD', description: 'Food delivery', merchant: 'Swiggy', paymentMethod: 'UPI' },
  
  // Last 30 days
  { id: 'TXN-006', userId: 'saiyam', date: new Date('2024-11-28'), source: 'Pixel Perfect', amount: 95000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 9500, category: 'FREELANCE', description: 'Brand Identity Design', merchant: 'Pixel Perfect', paymentMethod: 'NEFT', referenceId: 'REF-PP-2024-654' },
  { id: 'TXN-007', userId: 'saiyam', date: new Date('2024-11-25'), source: 'Figma Professional', amount: 1200, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'SUBSCRIPTIONS', description: 'Annual subscription', merchant: 'Figma', paymentMethod: 'Credit Card' },
  { id: 'TXN-008', userId: 'saiyam', date: new Date('2024-11-22'), source: 'Streamline Ops', amount: 75000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 7500, category: 'FREELANCE', description: 'Backend API Development', merchant: 'Streamline Ops', paymentMethod: 'NEFT', referenceId: 'REF-SO-2024-987' },
  { id: 'TXN-009', userId: 'saiyam', date: new Date('2024-11-20'), source: 'Amazon India', amount: 4500, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'SHOPPING', description: 'Office supplies', merchant: 'Amazon', paymentMethod: 'UPI' },
  { id: 'TXN-010', userId: 'saiyam', date: new Date('2024-11-18'), source: 'TechFlow Systems', amount: 55000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 5500, category: 'FREELANCE', description: 'Website Maintenance - Q4', merchant: 'TechFlow Systems', paymentMethod: 'NEFT', referenceId: 'REF-TF-2024-111' },
  { id: 'TXN-011', userId: 'saiyam', date: new Date('2024-11-15'), source: 'Jio Fiber', amount: 1499, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'UTILITIES', description: 'Internet bill', merchant: 'Jio', paymentMethod: 'Auto-debit' },
  { id: 'TXN-012', userId: 'saiyam', date: new Date('2024-11-12'), source: 'Designify Studio', amount: 48000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 4800, category: 'FREELANCE', description: 'Logo Design Package', merchant: 'Designify Studio', paymentMethod: 'IMPS', referenceId: 'REF-DS-2024-222' },
  { id: 'TXN-013', userId: 'saiyam', date: new Date('2024-11-10'), source: 'Uber', amount: 650, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'TRAVEL', description: 'Ride to client meeting', merchant: 'Uber', paymentMethod: 'UPI' },
  { id: 'TXN-014', userId: 'saiyam', date: new Date('2024-11-08'), source: 'Growth Hackers Inc', amount: 90000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 9000, category: 'FREELANCE', description: 'SEO Optimization Project', merchant: 'Growth Hackers Inc', paymentMethod: 'Wire Transfer', referenceId: 'REF-GH-2024-333' },
  { id: 'TXN-015', userId: 'saiyam', date: new Date('2024-11-05'), source: 'Netflix', amount: 649, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'ENTERTAINMENT', description: 'Monthly subscription', merchant: 'Netflix', paymentMethod: 'Credit Card' },
  
  // October 2024
  { id: 'TXN-016', userId: 'saiyam', date: new Date('2024-10-28'), source: 'Pixel Perfect', amount: 110000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 11000, category: 'FREELANCE', description: 'E-commerce Website Design', merchant: 'Pixel Perfect', paymentMethod: 'NEFT', referenceId: 'REF-PP-2024-444' },
  { id: 'TXN-017', userId: 'saiyam', date: new Date('2024-10-25'), source: 'GitHub Copilot', amount: 1000, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'SUBSCRIPTIONS', description: 'Monthly subscription', merchant: 'GitHub', paymentMethod: 'Credit Card' },
  { id: 'TXN-018', userId: 'saiyam', date: new Date('2024-10-22'), source: 'Streamline Ops', amount: 82000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 8200, category: 'FREELANCE', description: 'Database Optimization', merchant: 'Streamline Ops', paymentMethod: 'NEFT', referenceId: 'REF-SO-2024-555' },
  { id: 'TXN-019', userId: 'saiyam', date: new Date('2024-10-20'), source: 'Flipkart', amount: 3200, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'SHOPPING', description: 'Electronics', merchant: 'Flipkart', paymentMethod: 'UPI' },
  { id: 'TXN-020', userId: 'saiyam', date: new Date('2024-10-18'), source: 'TechFlow Systems', amount: 72000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 7200, category: 'FREELANCE', description: 'Mobile App Development', merchant: 'TechFlow Systems', paymentMethod: 'NEFT', referenceId: 'REF-TF-2024-666' },
  { id: 'TXN-021', userId: 'saiyam', date: new Date('2024-10-15'), source: 'Airtel Postpaid', amount: 899, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'UTILITIES', description: 'Mobile bill', merchant: 'Airtel', paymentMethod: 'Auto-debit' },
  { id: 'TXN-022', userId: 'saiyam', date: new Date('2024-10-12'), source: 'Designify Studio', amount: 58000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 5800, category: 'FREELANCE', description: 'Social Media Graphics', merchant: 'Designify Studio', paymentMethod: 'IMPS', referenceId: 'REF-DS-2024-777' },
  { id: 'TXN-023', userId: 'saiyam', date: new Date('2024-10-10'), source: 'Zomato', amount: 1200, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'FOOD', description: 'Food delivery', merchant: 'Zomato', paymentMethod: 'UPI' },
  { id: 'TXN-024', userId: 'saiyam', date: new Date('2024-10-08'), source: 'Growth Hackers Inc', amount: 105000, type: TransactionType.BUSINESS, status: TransactionStatus.VAULTED, estimatedTax: 10500, category: 'FREELANCE', description: 'Content Marketing Strategy', merchant: 'Growth Hackers Inc', paymentMethod: 'Wire Transfer', referenceId: 'REF-GH-2024-888' },
  { id: 'TXN-025', userId: 'saiyam', date: new Date('2024-10-05'), source: 'Spotify Premium', amount: 119, type: TransactionType.PERSONAL, status: TransactionStatus.COMPLETED, estimatedTax: 0, category: 'ENTERTAINMENT', description: 'Monthly subscription', merchant: 'Spotify', paymentMethod: 'UPI' },
];

export const FIXED_EXPENSES: Expense[] = [
  { id: 'EXP-001', userId: 'saiyam', transactionId: 'TXN-003', date: new Date('2024-12-04'), category: 'SUBSCRIPTIONS', amount: 3299, description: 'Adobe Creative Cloud', merchant: 'Adobe', paymentMethod: 'Credit Card', tags: ['software', 'design'], deductible: true },
  { id: 'EXP-002', userId: 'saiyam', transactionId: 'TXN-005', date: new Date('2024-12-02'), category: 'FOOD', amount: 850, description: 'Food delivery', merchant: 'Swiggy', paymentMethod: 'UPI', tags: ['food'], deductible: false },
  { id: 'EXP-003', userId: 'saiyam', transactionId: 'TXN-007', date: new Date('2024-11-25'), category: 'SUBSCRIPTIONS', amount: 1200, description: 'Figma Professional', merchant: 'Figma', paymentMethod: 'Credit Card', tags: ['software', 'design'], deductible: true },
  { id: 'EXP-004', userId: 'saiyam', transactionId: 'TXN-009', date: new Date('2024-11-20'), category: 'SHOPPING', amount: 4500, description: 'Office supplies', merchant: 'Amazon', paymentMethod: 'UPI', tags: ['office'], deductible: true },
  { id: 'EXP-005', userId: 'saiyam', transactionId: 'TXN-011', date: new Date('2024-11-15'), category: 'UTILITIES', amount: 1499, description: 'Internet bill', merchant: 'Jio', paymentMethod: 'Auto-debit', tags: ['utilities'], deductible: true },
];

export const FIXED_INVOICES: Invoice[] = [
  { id: 'INV-001', userId: 'saiyam', invoiceNumber: 'INV-2024-001', date: new Date('2024-11-20'), dueDate: new Date('2024-12-06'), amount: 85000, status: 'PAID', clientName: 'TechFlow Systems', clientEmail: 'accounts@techflow.io', items: [{ id: '1', description: 'Website Development - Phase 2', quantity: 1, rate: 85000, amount: 85000 }], subtotal: 85000, total: 85000, currency: 'INR', paidTransactionId: 'TXN-001' },
  { id: 'INV-002', userId: 'saiyam', invoiceNumber: 'INV-2024-002', date: new Date('2024-11-18'), dueDate: new Date('2024-12-05'), amount: 65000, status: 'PAID', clientName: 'Designify Studio', clientEmail: 'billing@designify.com', items: [{ id: '1', description: 'UI/UX Design for Mobile App', quantity: 1, rate: 65000, amount: 65000 }], subtotal: 65000, total: 65000, currency: 'INR', paidTransactionId: 'TXN-002' },
  { id: 'INV-003', userId: 'saiyam', invoiceNumber: 'INV-2024-003', date: new Date('2024-11-15'), dueDate: new Date('2024-12-03'), amount: 120000, status: 'PAID', clientName: 'Growth Hackers Inc', clientEmail: 'finance@growthhackers.com', items: [{ id: '1', description: 'Digital Marketing Consulting', quantity: 1, rate: 120000, amount: 120000 }], subtotal: 120000, total: 120000, currency: 'INR', paidTransactionId: 'TXN-004' },
  { id: 'INV-004', userId: 'saiyam', invoiceNumber: 'INV-2024-004', date: new Date('2024-12-01'), dueDate: new Date('2024-12-31'), amount: 95000, status: 'SENT', clientName: 'Pixel Perfect', clientEmail: 'pay@pixelperfect.co', items: [{ id: '1', description: 'Landing Page Design', quantity: 1, rate: 95000, amount: 95000 }], subtotal: 95000, total: 95000, currency: 'INR' },
  { id: 'INV-005', userId: 'saiyam', invoiceNumber: 'INV-2024-005', date: new Date('2024-11-10'), dueDate: new Date('2024-11-25'), amount: 45000, status: 'OVERDUE', clientName: 'Streamline Ops', clientEmail: 'invoices@streamline.com', items: [{ id: '1', description: 'API Integration', quantity: 1, rate: 45000, amount: 45000 }], subtotal: 45000, total: 45000, currency: 'INR' },
];

export const FIXED_VAULT_ENTRIES: VaultEntry[] = FIXED_TRANSACTIONS
  .filter(t => t.type === TransactionType.BUSINESS && t.status === TransactionStatus.VAULTED)
  .map(t => ({
    id: `VAULT-${t.id}`,
    userId: t.userId!,
    transactionId: t.id,
    incomeAmount: t.amount,
    taxAmount: t.estimatedTax,
    lockedDate: t.date,
    status: 'LOCKED' as const
  }));

export const FIXED_BANK_ACCOUNTS: BankAccount[] = [
  { id: 'BANK-001', userId: 'saiyam', bankName: 'HDFC Bank', accountNumber: 'XXXX8901', accountHolder: 'Saiyam Jain', accountType: 'SAVINGS', balance: 245000, ifscCode: 'HDFC0000240', lastUpdated: new Date(), isPrimary: true },
  { id: 'BANK-002', userId: 'saiyam', bankName: 'ICICI Bank', accountNumber: 'XXXX4321', accountHolder: 'Saiyam Jain', accountType: 'CURRENT', balance: 98500, ifscCode: 'ICIC0001540', lastUpdated: new Date(), isPrimary: false, color: 'bg-blue-100' },
];

export const FIXED_VAULT_DOCUMENTS: VaultDocument[] = [
  { id: 'DOC-001', userId: 'saiyam', title: 'PAN Card', category: 'GOVERNMENT', fileName: 'pan_card.pdf', uploadedDate: new Date('2024-01-15'), size: 450000, type: 'PDF' },
  { id: 'DOC-002', userId: 'saiyam', title: 'Aadhaar Card', category: 'GOVERNMENT', fileName: 'aadhaar.pdf', uploadedDate: new Date('2024-01-15'), size: 380000, type: 'PDF' },
  { id: 'DOC-003', userId: 'saiyam', title: 'ITR FY 2023-24', category: 'GOVERNMENT', fileName: 'itr_2024.pdf', uploadedDate: new Date('2024-07-31'), size: 1200000, type: 'PDF' },
  { id: 'DOC-004', userId: 'saiyam', title: 'Bank Statement', category: 'BANK', fileName: 'hdfc_statement.pdf', uploadedDate: new Date('2024-11-01'), size: 850000, type: 'PDF' },
];

// Calculate totals
const totalIncome = FIXED_TRANSACTIONS.filter(t => t.type === TransactionType.BUSINESS).reduce((sum, t) => sum + t.amount, 0);
const totalExpense = FIXED_TRANSACTIONS.filter(t => t.type === TransactionType.PERSONAL).reduce((sum, t) => sum + t.amount, 0);
const vaultBalance = FIXED_VAULT_ENTRIES.reduce((sum, v) => sum + v.taxAmount, 0);

export const FIXED_STATS = {
  totalIncome,
  totalExpense,
  vaultBalance,
  availableBalance: 245000,
  transactionCount: FIXED_TRANSACTIONS.length,
  expenseCount: FIXED_EXPENSES.length,
  invoiceCount: FIXED_INVOICES.length,
  paidInvoices: FIXED_INVOICES.filter(i => i.status === 'PAID').length,
  monthlyBreakdown: [
    { name: 'Jul', income: 0, tax: 0 },
    { name: 'Aug', income: 0, tax: 0 },
    { name: 'Sep', income: 0, tax: 0 },
    { name: 'Oct', income: 399000, tax: 39900 },
    { name: 'Nov', income: 433000, tax: 43300 },
    { name: 'Dec', income: 270000, tax: 27000 },
  ]
};
