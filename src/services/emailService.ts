// Made by Saiyam Jain - https://github.com/saiyamjain468

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

let emailjs: any = null;

if (PUBLIC_KEY && typeof window !== 'undefined') {
  import('@emailjs/browser').then(module => {
    emailjs = module.default;
    emailjs.init(PUBLIC_KEY);
  });
}

export const sendTaxDeadlineReminder = async (userEmail: string, deadline: string, amount: number) => {
  if (!emailjs || !PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
    return { success: false, error: 'EmailJS not configured' };
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: userEmail,
      subject: 'Tax Deadline Reminder',
      deadline,
      amount: `₹${amount.toLocaleString('en-IN')}`,
      message: `Your tax payment of ₹${amount.toLocaleString('en-IN')} is due on ${deadline}.`
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.text || 'Failed to send email' };
  }
};

export const sendMonthlyReport = async (userEmail: string, data: {
  income: number;
  expenses: number;
  taxSaved: number;
  month: string;
}) => {
  if (!emailjs || !PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
    return { success: false, error: 'EmailJS not configured' };
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: userEmail,
      subject: `PayLockr Monthly Report - ${data.month}`,
      month: data.month,
      income: `₹${data.income.toLocaleString('en-IN')}`,
      expenses: `₹${data.expenses.toLocaleString('en-IN')}`,
      tax_saved: `₹${data.taxSaved.toLocaleString('en-IN')}`,
      message: `Your monthly financial report for ${data.month} is ready.`
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.text || 'Failed to send email' };
  }
};

export const sendPaymentReceipt = async (userEmail: string, data: {
  amount: number;
  date: string;
  transactionId: string;
}) => {
  if (!emailjs || !PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
    return { success: false, error: 'EmailJS not configured' };
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: userEmail,
      subject: 'Payment Receipt',
      amount: `₹${data.amount.toLocaleString('en-IN')}`,
      date: data.date,
      transaction_id: data.transactionId,
      message: `Payment of ₹${data.amount.toLocaleString('en-IN')} received on ${data.date}.`
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.text || 'Failed to send email' };
  }
};
