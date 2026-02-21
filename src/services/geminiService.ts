import { GoogleGenerativeAI } from "@google/generative-ai";
import { Transaction, Expense } from "../types";

const callGroqAPI = async (prompt: string) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
};

const getAiInstance = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey || apiKey.trim() === '') {
    throw new Error("API Key missing. Please add VITE_GEMINI_API_KEY to your .env.local file in the project root.");
  }
  return new GoogleGenerativeAI(apiKey);
};

export const generateTaxInsights = async (transactions: Transaction[], annualIncome: number) => {
  try {
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!groqKey && !geminiKey) {
      return `📊 Tax Analysis (Demo Mode):\n\n✅ Your annual income of ₹${annualIncome.toLocaleString('en-IN')} puts you in a moderate tax bracket.\n\n💡 Recommendations:\n• Set aside 20-25% for taxes\n• Maximize Section 80C deductions (₹1.5L)\n• Consider health insurance under 80D\n• Pay advance tax quarterly to avoid penalties\n\n⚠️ Add VITE_GROQ_API_KEY to .env.local for AI-powered insights.`;
    }

    const transactionSummary = transactions
      .slice(0, 10)
      .map(t => {
        const dateStr = t.date instanceof Date ? t.date.toISOString().split('T')[0] : t.date;
        return `${dateStr}: ${t.source} - ₹${t.amount} (${t.type})`;
      })
      .join('\n');

    const prompt = `As a tax expert for Indian freelancers, analyze this recent transaction data and annual income context.
      
Annual Estimated Income: ₹${annualIncome}
Recent Transactions:
${transactionSummary}

Provide a concise summary of:
1. Potential tax saving opportunities based on sources.
2. Risk of jumping to a higher tax slab.
3. A recommendation for estimated tax percentage to set aside.

Keep it professional, fintech style, and under 150 words total.`;

    if (groqKey) {
      return await callGroqAPI(prompt);
    } else {
      const genAI = getAiInstance();
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text() || "No insights could be generated.";
    }
  } catch (error: any) {
    console.error("❌ Tax Insights Error:", error);
    return `📊 Tax Analysis:\n\n✅ Your annual income of ₹${annualIncome.toLocaleString('en-IN')} puts you in a moderate tax bracket.\n\n💡 Recommendations:\n• Set aside 20-25% for taxes\n• Maximize Section 80C deductions (₹1.5L)\n• Consider health insurance under 80D\n• Pay advance tax quarterly to avoid penalties`;
  }
};

// NEW: Expense Analysis
export const analyzeExpenses = async (expenses: Expense[], totalIncome: number) => {
  try {
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!groqKey && !geminiKey) {
      const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
      return `📈 Expense Analysis (Demo Mode):\n\n💰 Total Expenses: ₹${totalExpense.toLocaleString('en-IN')}\n\n🎯 Optimization Tips:\n• Review recurring subscriptions\n• Track business vs personal expenses\n• Claim eligible business deductions\n• Maintain proper receipts for tax filing\n\n⚠️ Add VITE_GROQ_API_KEY to .env.local for AI analysis.`;
    }

    const expenseByCategory = expenses.reduce((acc: any, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    const categorySummary = Object.entries(expenseByCategory)
      .map(([cat, amt]) => `${cat}: ₹${amt}`)
      .join(', ');

    const prompt = `Analyze these monthly expenses for an Indian freelancer:
Total Income: ₹${totalIncome}
Expenses by Category: ${categorySummary}

Provide:
1. Top 2 categories to optimize
2. Potential business deductions
3. One actionable tip to reduce expenses

Keep it under 100 words, actionable and specific.`;

    if (groqKey) {
      return await callGroqAPI(prompt);
    } else {
      const genAI = getAiInstance();
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    }
  } catch (error: any) {
    console.error("Expense Analysis Error:", error);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    return `📈 Expense Analysis:\n\n💰 Total Expenses: ₹${totalExpense.toLocaleString('en-IN')}\n\n🎯 Optimization Tips:\n• Review recurring subscriptions\n• Track business vs personal expenses\n• Claim eligible business deductions\n• Maintain proper receipts for tax filing`;
  }
};

// NEW: Tax Saving Recommendations
export const getTaxSavingTips = async (income: number, currentTaxSlab: number) => {
  try {
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!groqKey && !geminiKey) {
      return `💡 Tax-Saving Strategies (Demo Mode):\n\n1️⃣ Section 80C (₹1.5L limit):\n   • PPF, ELSS, Life Insurance\n   • Estimated savings: ₹46,800\n\n2️⃣ Section 80D (₹25K-50K):\n   • Health insurance premiums\n   • Estimated savings: ₹7,800\n\n3️⃣ Business Expenses:\n   • Internet, phone, software\n   • Home office deduction\n\n⚠️ Add VITE_GROQ_API_KEY to .env.local for personalized strategies.`;
    }

    const prompt = `For an Indian freelancer with:
- Annual Income: ₹${income}
- Current Tax Slab: ${currentTaxSlab}%

Suggest 3 specific tax-saving strategies under Indian tax law (80C, 80D, etc.).
Include estimated savings amount for each.
Keep it under 120 words, practical and legal.`;

    if (groqKey) {
      return await callGroqAPI(prompt);
    } else {
      const genAI = getAiInstance();
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    }
  } catch (error: any) {
    console.error("Tax Tips Error:", error);
    return `💡 Tax-Saving Strategies:\n\n1️⃣ Section 80C (₹1.5L limit):\n   • PPF, ELSS, Life Insurance\n   • Estimated savings: ₹46,800\n\n2️⃣ Section 80D (₹25K-50K):\n   • Health insurance premiums\n   • Estimated savings: ₹7,800\n\n3️⃣ Business Expenses:\n   • Internet, phone, software\n   • Home office deduction`;
  }
};

// NEW: Financial Health Score
export const calculateFinancialHealth = async (data: {
  income: number;
  expenses: number;
  vaultBalance: number;
  taxLiability: number;
}) => {
  try {
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!groqKey && !geminiKey) {
      const savingsRate = ((data.income - data.expenses) / data.income * 100).toFixed(0);
      const vaultCoverage = ((data.vaultBalance / data.taxLiability) * 100).toFixed(0);
      const score = Math.min(100, Math.round((parseFloat(savingsRate) + parseFloat(vaultCoverage)) / 2));
      return `🛡️ Financial Health (Demo Mode):\n\nScore: ${score}/100\nStatus: ${score > 70 ? 'Good' : score > 40 ? 'Fair' : 'Needs Attention'}\n\n📊 Metrics:\n• Savings Rate: ${savingsRate}%\n• Tax Coverage: ${vaultCoverage}%\n\n🎯 Priority: ${score < 50 ? 'Increase tax vault contributions' : 'Maintain current savings'}\n\n⚠️ Add VITE_GROQ_API_KEY to .env.local for detailed analysis.`;
    }

    const prompt = `Calculate financial health score (0-100) for:
- Monthly Income: ₹${data.income}
- Monthly Expenses: ₹${data.expenses}
- Tax Vault: ₹${data.vaultBalance}
- Tax Liability: ₹${data.taxLiability}

Provide:
1. Score out of 100
2. One-line assessment
3. Top priority action

Format: "Score: X/100 | Status | Action"
Keep under 80 words.`;

    if (groqKey) {
      return await callGroqAPI(prompt);
    } else {
      const genAI = getAiInstance();
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    }
  } catch (error: any) {
    console.error("Health Check Error:", error);
    const savingsRate = ((data.income - data.expenses) / data.income * 100).toFixed(0);
    const vaultCoverage = ((data.vaultBalance / data.taxLiability) * 100).toFixed(0);
    const score = Math.min(100, Math.round((parseFloat(savingsRate) + parseFloat(vaultCoverage)) / 2));
    return `🛡️ Financial Health:\n\nScore: ${score}/100\nStatus: ${score > 70 ? 'Good' : score > 40 ? 'Fair' : 'Needs Attention'}\n\n📊 Metrics:\n• Savings Rate: ${savingsRate}%\n• Tax Coverage: ${vaultCoverage}%\n\n🎯 Priority: ${score < 50 ? 'Increase tax vault contributions' : 'Maintain current savings'}`;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Bank Statement / Invoice Vision Extraction via Gemini Vision API
// Replaces Python OCR pipeline — no backend call needed.
// ─────────────────────────────────────────────────────────────────────────────

export interface ParsedTransaction {
  date: string;           // YYYY-MM-DD preferred
  description: string;    // FULL narration verbatim (e.g. UPI/DR/978584154770/INDSTOCKS/HDFC0000240/...)
  upi_ref: string | null; // Numeric UPI reference ID (e.g. "978584154770"), null for non-UPI
  source: string | null;  // Counterparty name extracted by Gemini (e.g. "INDSTOCKS", "PhonePe")
  amount: number;
  type: 'debit' | 'credit';
  balance: number | null;
}

export interface ParsedStatement {
  transactions: ParsedTransaction[];
  confidence: number;   // 0.0 – 1.0 as estimated by Gemini
  source: 'gemini-vision';
}

const STATEMENT_EXTRACTION_PROMPT = `You are a universal financial data extraction engine for ALL Indian bank statements.

Analyze this bank statement image (ANY bank: HDFC, ICICI, SBI, Axis, Kotak, PNB, BOB, Canara, etc.) and extract ALL transactions.

Return ONLY valid JSON (no markdown, no explanation):

{
  "transactions": [
    {
      "date": "YYYY-MM-DD",
      "description": "full narration",
      "upi_ref": "numeric reference or null",
      "source": "counterparty name or null",
      "amount": 0.00,
      "type": "debit | credit",
      "balance": 0.00
    }
  ],
  "confidence": 0.95
}

UNIVERSAL RULES FOR ALL BANKS:
1. DATE: Handle DD-MM-YY, DD/MM/YYYY, DD-MMM-YY formats. Convert to YYYY-MM-DD. 2-digit year = 20XX.
2. DESCRIPTION: Copy FULL narration verbatim. Include UPI/NEFT/IMPS references completely.
3. UPI_REF: Extract 10-15 digit reference from UPI/NEFT/IMPS strings. Null if none.
4. SOURCE: Extract merchant/person name (e.g., INDSTOCKS, PhonePe, Swiggy). Null if unclear.
5. AMOUNT: Always positive. Read from non-zero Debit/Credit/Withdrawal/Deposit column. Never use 0.00 placeholders.
6. TYPE: "debit" if money OUT (UPI/DR, Withdrawal, Debit column). "credit" if money IN (UPI/CR, Deposit, Credit column).
7. BALANCE: Running balance after transaction. Null only if column absent.
8. SKIP: Headers, opening/closing balance, totals, empty rows.
9. EXTRACT: ALL transaction rows. Do not sample or limit.
10. CONFIDENCE: 0.95+ clear, 0.80-0.94 good, 0.60-0.79 readable, <0.60 poor quality.

ADAPT to any bank format. Extract accurately regardless of layout.`;


/**
 * Extract structured transactions from a bank statement (PDF or image).
 *
 * Sends the file to the Python document-service at localhost:8000/extract-transactions,
 * which handles PDF-to-image conversion and calls Gemini Vision API server-side.
 * Supports: PDF (multi-page), PNG, JPG, JPEG, WEBP
 */
export const extractTransactionsFromImage = async (
  file: File
): Promise<ParsedStatement> => {
  const backendUrl = import.meta.env.VITE_DOCUMENT_SERVICE_URL || 'http://localhost:8000';

  console.log(`[GeminiVision] Sending "${file.name}" (${file.type}) to ${backendUrl}/extract-transactions`);

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${backendUrl}/extract-transactions`, {
    method: 'POST',
    body: formData,
    // No Content-Type header — browser sets it automatically with boundary for multipart
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Backend error ${response.status}: ${errText}`);
  }

  const data = await response.json();

  console.log(`[GeminiVision] Received ${data.transactions?.length ?? 0} transactions (confidence=${data.confidence})`);

  const transactions: ParsedTransaction[] = (data.transactions || []).map((t: any) => ({
    date: t.date ?? '',
    description: t.description ?? 'Transaction',
    upi_ref: t.upi_ref ?? null,                       // full numeric UPI reference (e.g. 978584154770)
    source: t.source ?? null,                          // counterparty name from Gemini (e.g. INDSTOCKS)
    amount: Number(t.amount) || 0,
    type: t.type === 'credit' ? 'credit' : 'debit',
    balance: t.balance !== undefined && t.balance !== null ? Number(t.balance) : null,
  }));

  return {
    transactions,
    confidence: Number(data.confidence ?? 0.9),
    source: 'gemini-vision',
  };
};