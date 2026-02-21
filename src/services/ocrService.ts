/**
 * ocrService.ts
 *
 * Previously used Tesseract.js for OCR. Now delegates to Gemini Vision API
 * via extractTransactionsFromImage() in geminiService.ts for much higher accuracy.
 *
 * The original Tesseract-based implementation is preserved below as comments.
 */

import { extractTransactionsFromImage, ParsedStatement } from './geminiService';

// ─────────────────────────────────────────────────────────────────────────────
// Primary API — re-export Gemini Vision extraction
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scan a bank statement or invoice image and return structured transactions.
 * Uses Gemini Vision API — no Python backend needed.
 *
 * @example
 * const result = await scanStatement(file);
 * result.transactions.forEach(t => console.log(t.date, t.amount, t.type));
 */
export const scanStatement = async (imageFile: File): Promise<ParsedStatement> => {
  return extractTransactionsFromImage(imageFile);
};

// ─────────────────────────────────────────────────────────────────────────────
// Legacy helpers — kept for backward compatibility, now powered by Gemini
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @deprecated Use scanStatement() for bank statements.
 * Kept for backward compatibility. Returns first transaction data in the old shape.
 */
export const scanInvoice = async (imageFile: File): Promise<{
  text: string;
  amount?: number;
  date?: string;
  vendor?: string;
}> => {
  try {
    const result = await extractTransactionsFromImage(imageFile);
    const first = result.transactions[0];
    return {
      text: result.transactions.map(t => `${t.date} ${t.description} ${t.amount}`).join('\n'),
      amount: first?.amount,
      date: first?.date,
      vendor: first?.description,
    };
  } catch (error) {
    console.error('[ocrService] scanInvoice via Gemini failed:', error);
    throw new Error('Failed to scan document with Gemini Vision');
  }
};

export const scanReceipt = async (imageFile: File) => {
  return scanInvoice(imageFile);
};

export const extractExpenseData = async (imageFile: File): Promise<{
  category: string;
  amount: number;
  date: string;
  description: string;
}> => {
  const scanned = await scanInvoice(imageFile);

  // Auto-categorize based on keywords in description
  const text = (scanned.vendor || '').toLowerCase();
  let category = 'Other';

  if (text.includes('food') || text.includes('restaurant') || text.includes('cafe') || text.includes('swiggy') || text.includes('zomato')) {
    category = 'Food & Dining';
  } else if (text.includes('uber') || text.includes('ola') || text.includes('transport') || text.includes('rapido')) {
    category = 'Transportation';
  } else if (text.includes('software') || text.includes('subscription') || text.includes('saas')) {
    category = 'Software & Tools';
  } else if (text.includes('office') || text.includes('supplies')) {
    category = 'Office Supplies';
  }

  return {
    category,
    amount: scanned.amount || 0,
    date: scanned.date || new Date().toLocaleDateString('en-IN'),
    description: scanned.vendor || 'Scanned expense',
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// ORIGINAL Tesseract.js implementation — preserved, not deleted
// ─────────────────────────────────────────────────────────────────────────────
//
// import Tesseract from 'tesseract.js';
//
// export const scanInvoice_TESSERACT = async (imageFile: File) => {
//   const result = await Tesseract.recognize(imageFile, 'eng', {
//     logger: (m) => console.log(m)
//   });
//   const text = result.data.text;
//   let amount: number | undefined;
//   const totalMatch = text.match(/(?:TOTAL|Total|total|Grand Total|Net Amount)[:\s]*(?:₹|Rs\.?)\s*(\d+(?:,\d+)*(?:\.\d{1,2})?)/i);
//   if (totalMatch) {
//     amount = parseFloat(totalMatch[1].replace(/,/g, ''));
//   } else {
//     const allAmounts = text.match(/(?:₹|Rs\.?)\s*(\d+(?:,\d+)*(?:\.\d{1,2})?)/gi);
//     if (allAmounts && allAmounts.length > 0) {
//       const lastAmount = allAmounts[allAmounts.length - 1];
//       const amountValue = lastAmount.match(/\d+(?:,\d+)*(?:\.\d{1,2})?/);
//       if (amountValue) amount = parseFloat(amountValue[0].replace(/,/g, ''));
//     }
//   }
//   const dateMatch = text.match(/(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/);
//   const date = dateMatch ? dateMatch[1] : undefined;
//   const lines = text.split('\n').filter(l => l.trim());
//   const vendor = lines[0]?.trim();
//   return { text, amount, date, vendor };
// };
