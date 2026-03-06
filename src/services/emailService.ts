// made by ZION
import emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '');

export const sendTaxDeadlineReminder = async (userEmail: string, deadline: string, amount: number) => {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      {
        to_email: userEmail,
        subject: '🚨 Tax Deadline Reminder',
        deadline: deadline,
        amount: `₹${amount.toLocaleString('en-IN')}`,
        message: `Your tax payment of ₹${amount.toLocaleString('en-IN')} is due on ${deadline}. Don't miss the deadline!`
      }
    );
    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error };
  }
};

export const sendMonthlyReport = async (userEmail: string, data: {
  income: number;
  expenses: number;
  taxSaved: number;
  month: string;
}) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      {
        to_email: userEmail,
        from_name: 'Paylockr',
        subject: 'Monthly Financial Report',
        message: `Your financial summary for ${data.month}:\n\nIncome: ₹${data.income.toLocaleString('en-IN')}\nExpenses: ₹${data.expenses.toLocaleString('en-IN')}\nTax Saved: ₹${data.taxSaved.toLocaleString('en-IN')}`,
        month: data.month,
        income: `₹${data.income.toLocaleString('en-IN')}`,
        expenses: `₹${data.expenses.toLocaleString('en-IN')}`,
        tax_saved: `₹${data.taxSaved.toLocaleString('en-IN')}`
      }
    );
    console.log('Email sent successfully:', response);
    return { success: true };
  } catch (error: any) {
    console.error('Email send failed:', error);
    return { success: false, error: error.text || error.message };
  }
};

export const sendPaymentReceipt = async (userEmail: string, data: {
  amount: number;
  date: string;
  transactionId: string;
}) => {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      {
        to_email: userEmail,
        subject: '✅ Payment Receipt',
        amount: `₹${data.amount.toLocaleString('en-IN')}`,
        date: data.date,
        transaction_id: data.transactionId,
        message: `Payment of ₹${data.amount.toLocaleString('en-IN')} received successfully`
      }
    );
    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error };
  }
};
