# Paylockr 💰

A comprehensive financial management and tax compliance platform designed to help Indian freelancers and businesses manage their finances efficiently and stay tax-compliant.

## 🌟 Features

### Core Modules
- **📊 Financial Dashboard** - Real-time income, expenses, and tax overview
- **💰 Smart Tax Vault** - Automatic tax calculation based on Indian tax slabs
- **📅 Tax Calendar** - Never miss tax deadlines with SMS/Email reminders
- **💳 Transactions** - Track all income and expenses with auto-categorization
- **🧾 Invoices** - Create professional invoices with auto-transaction linking
- **📸 Expense Tracking** - OCR-powered receipt scanning with auto-categorization
- **🏦 Bank Accounts** - Multi-account management with real-time balances
- **🤖 AI Insights** - Powered by Groq/Gemini AI for tax optimization

### Advanced Features
- **Dynamic Tax Calculation** - Progressive tax slabs (0%, 5%, 10%, 15%, 20%, 30%)
- **₹75,000 Standard Deduction** - Automatic deduction application
- **4% Cess** - Included in all tax calculations
- **Interconnected Data** - Every transaction links to invoices, expenses, and vault
- **Email Reports** - Monthly financial summaries via EmailJS
- **SMS Alerts** - Tax deadline reminders (Twilio integration)
- **OCR Scanning** - Extract data from receipts automatically (Tesseract.js)
- **Payment Gateway** - Accept payments via Razorpay (UPI/Cards/Net Banking)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** CSS3 with Dark Mode
- **State Management:** React Hooks
- **Routing:** Client-side routing

### Backend
- **Server:** Express.js + Node.js
- **APIs:** RESTful architecture
- **Services:** Twilio, SendGrid, Razorpay

### AI & Services
- **AI:** Groq (Llama 3.1) / Google Gemini
- **OCR:** Tesseract.js (browser-based)
- **Email:** EmailJS (client) + SendGrid (server)
- **SMS:** Twilio
- **Payments:** Razorpay

### Deployment
- **Frontend:** Netlify / Vercel
- **Backend:** Railway / Heroku / Vercel

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/SaiyamJain468/Paylockr.git
cd Paylockr
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 3. Configure Environment

**Frontend (`.env.local`):**
```env
# AI (Choose one - both are FREE)
VITE_GROQ_API_KEY=gsk_your_key_here
VITE_GEMINI_API_KEY=your_key_here

# EmailJS (FREE - 200 emails/month)
VITE_EMAILJS_PUBLIC_KEY=your_key
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx

# Backend URL
VITE_BACKEND_URL=http://localhost:3001
```

**Backend (`backend/.env`):**
```env
PORT=3001

# Optional - Leave empty for demo mode
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### 4. Get API Keys (All FREE)

**Groq AI (Recommended - Fastest):**
1. Visit: https://console.groq.com/keys
2. Sign up (no credit card)
3. Create API key
4. Add to `.env.local`

**EmailJS:**
1. Visit: https://www.emailjs.com
2. Sign up (200 emails/month free)
3. Get Public Key, Service ID, Template ID
4. Add to `.env.local`

### 5. Run Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Server runs on http://localhost:3001

**Terminal 2 - Frontend:**
```bash
npm run dev
```
App runs on http://localhost:5173

---

## 📁 Project Structure

```
Paylockr/
├── src/                          # Frontend source
│   ├── components/               # Reusable UI components
│   │   ├── common/              # Buttons, inputs, etc.
│   │   ├── Dashboard/           # Dashboard widgets
│   │   └── Layout/              # Header, sidebar, footer
│   ├── pages/                   # Page components
│   │   ├── Dashboard.tsx        # Main dashboard
│   │   ├── SmartTaxVault.tsx   # Tax vault management
│   │   ├── Transactions.tsx    # Transaction history
│   │   ├── Expenses.tsx        # Expense tracking + OCR
│   │   ├── Invoices.tsx        # Invoice management
│   │   ├── TaxCalendar.tsx     # Tax deadlines
│   │   ├── BankAccounts.tsx    # Bank management
│   │   └── Insights.tsx        # AI-powered insights
│   ├── services/                # API integrations
│   │   ├── geminiService.ts    # AI service (Groq/Gemini)
│   │   ├── emailService.ts     # Email notifications
│   │   ├── smsService.ts       # SMS alerts
│   │   └── ocrService.ts       # Receipt scanning
│   ├── utils/                   # Utility functions
│   │   ├── multiUserUnifiedData.ts  # Data management
│   │   └── taxCalculator.ts    # Tax calculations
│   └── types/                   # TypeScript interfaces
│
├── backend/                     # Backend server
│   ├── server.js               # Express server
│   ├── .env                    # Environment config
│   └── package.json            # Dependencies
│
├── test-receipts/              # Sample receipts for OCR testing
└── README.md                   # This file
```

---

## 🎯 Key Features Explained

### 1. Smart Tax Vault
- **Auto-calculates** tax based on Indian tax slabs
- **Progressive taxation:** 0% → 5% → 10% → 15% → 20% → 30%
- **Standard deduction:** ₹75,000 automatically applied
- **4% cess** included
- **Vault history:** Track every tax amount locked

### 2. AI Insights (4 Features)
- **Tax Insights:** Analyze income patterns, identify tax-saving opportunities
- **Expense Analysis:** Optimize spending, suggest business deductions
- **Tax-Saving Tips:** Personalized strategies (80C, 80D, etc.)
- **Financial Health:** Score 0-100 with priority actions

### 3. OCR Receipt Scanning
- **Upload receipt photo** → Auto-extracts amount, date, vendor
- **Auto-categorizes** expenses (Food, Transport, Software, etc.)
- **No manual entry** needed
- **Works offline** in browser

### 4. Email & SMS Notifications
- **Monthly reports** via email
- **Tax deadline reminders** via SMS
- **Payment confirmations**
- **2FA OTP** for security

---

## 🧪 Testing

### Test OCR
1. Go to **Expenses** page
2. Click **"SCAN RECEIPT"**
3. Upload `test-receipts/sample-receipt-1.html` (screenshot it first)
4. See auto-extracted data!

### Test AI
1. Go to **Insights** page
2. Click any AI button (Tax Insights, Expense Analysis, etc.)
3. See AI-generated recommendations

### Test Email
1. Go to **Dashboard**
2. Click **"EMAIL REPORT"**
3. Enter your email
4. Check inbox!

---

## 🚀 Deployment

### Frontend (Netlify)
```bash
npm run build
netlify deploy --prod
```

### Backend (Railway)
```bash
cd backend
railway login
railway init
railway up
```

---

## 📊 Data Flow

```
User Action → Frontend → Backend API → External Service
                ↓           ↓              ↓
            Update UI   Process Data   Return Result
                ↓           ↓              ↓
            Dashboard ← Unified Data ← Service Response
```

**Example: Adding Invoice**
1. User creates invoice → Frontend
2. Invoice saved → Unified Data
3. Transaction auto-created → Linked to invoice
4. Tax calculated → Added to vault
5. Dashboard updated → Real-time
6. Email sent → Confirmation

---

## 🔒 Security

- ✅ No API keys in frontend code
- ✅ Backend handles sensitive operations
- ✅ Environment variables for secrets
- ✅ CORS enabled for security
- ✅ Input validation on all endpoints

---

## 📝 API Documentation

See `backend/API_DOCS.md` for complete API reference with 14 endpoints.

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📄 License

MIT License - see LICENSE file

---

## 👨‍💻 Author

**Saiyam Jain**
- GitHub: [@SaiyamJain468](https://github.com/SaiyamJain468)
- Email: support@paylockr.com

---

## 🙏 Acknowledgments

- **Groq** - Lightning-fast AI inference
- **Google Gemini** - Powerful AI capabilities
- **EmailJS** - Simple email service
- **Tesseract.js** - Browser-based OCR
- **Twilio** - SMS notifications
- **Razorpay** - Payment gateway

---

**Built with ❤️ for Indian freelancers and businesses**

**Status:** ✅ Production Ready | 🎯 Fully Functional | 🚀 Deployed
