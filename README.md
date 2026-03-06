<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=200&section=header&text=PayLockr&fontSize=80&fontAlignY=35&desc=AI-Powered%20Tax%20Management%20for%20Indian%20Freelancers&descAlignY=60&descSize=20&fontColor=ffffff&animation=fadeIn" width="100%"/>

<br/>

[![React](https://img.shields.io/badge/React_19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python_3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-22d3ee.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Made for India](https://img.shields.io/badge/Made%20for-🇮🇳%20Indian%20Freelancers-FF9933?style=flat-square)](https://github.com/saiyamjain468/paylockr)
[![FY 2025-26](https://img.shields.io/badge/FY_2025--26-New%20Tax%20Regime-6366f1?style=flat-square)](https://github.com/saiyamjain468/paylockr)

<br/>

> **Stop guessing. Start vaulting.**
> PayLockr automatically calculates your taxes, locks away savings, and imports your bank statements using AI — so you never miss a deadline or overpay again.

<br/>

![PayLockr Dashboard Preview](https://via.placeholder.com/900x480/0a0a14/22d3ee?text=📊+PayLockr+Dashboard+—+Real-Time+Tax+Intelligence)

<br/>

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Quick Start](#-quick-start)
- [Architecture](#️-architecture)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🌟 Overview

**PayLockr** is a purpose-built financial intelligence platform for Indian freelancers navigating the complexities of the **FY 2025-26 New Tax Regime**. It eliminates manual tax math by combining a real-time tax engine with AI-powered bank statement parsing — giving you a complete, accurate picture of what you owe, what you've saved, and what you can do better.

Whether you earn via UPI, NEFT, or international wire transfers, PayLockr ingests, classifies, and analyzes every transaction — so your tax season is never a surprise.

<br/>

<div align="center">

| Problem | PayLockr Solution |
|---|---|
| 😰 Surprise tax bills at year-end | ✅ Real-time tax estimation all year |
| 📑 Manual bank statement parsing | ✅ AI extracts every transaction automatically |
| 💸 Forgetting to save for taxes | ✅ Automatic 10% vault on every income |
| 📅 Missing advance tax deadlines | ✅ Built-in quarterly calendar & reminders |
| 🤷 No idea what expenses are deductible | ✅ AI-powered recommendations & categorization |

</div>

---

## ✨ Features

<br/>

### 🧮 Smart Tax Calculator
- Real-time estimation following **FY 2025-26 New Tax Regime** slabs
- Progressive brackets: **0% → 5% → 10% → 15% → 20% → 25% → 30%**
- Automatic **₹75,000 standard deduction** applied
- **Section 87A rebate** (up to ₹60,000 for income ≤ ₹12L) factored in
- Accurate **monthly projections** computed from actual transaction dates

<br/>

### 🔒 Automatic Tax Vault
- **10% auto-save** triggered on every income credit
- Dedicated vault with real-time balance tracking
- **Tax coverage meter** — visualize your readiness before deadlines
- Quarterly advance tax **reminders built-in**

<br/>

### 📥 AI-Powered Bank Statement Import

![Bank Import Flow](https://via.placeholder.com/800x200/0a0a14/22d3ee?text=Upload+PDF+→+Gemini+Vision+Extracts+→+Auto-Categorized+Transactions)

- **Gemini Vision AI** extracts transactions from any format, any layout
- Universal support for **all Indian banks**: HDFC, ICICI, SBI, Axis, Kotak, PNB, BOB, and more
- Handles **multi-page PDFs** and **screenshot images**
- Auto-classification: `UPI` `NEFT` `IMPS` `RTGS` `ATM`
- Smart labeling: Credits → Business Income · Debits → Expense categories

<br/>

### 📊 Financial Insights & Analytics
- AI-generated **tax-saving recommendations** tailored to your income
- Monthly income vs. expense breakdown with **interactive charts**
- Cashflow trend analysis and **income growth tracking**
- Deductible expense identification for **ITR preparation**

<br/>

### 🎨 Modern, Responsive Interface
- **Dark / Light mode** with smooth animated transitions
- Fully **responsive** across mobile, tablet, and desktop
- Real-time data updates — no page refresh required
- **Advanced filtering** by date range, category, and amount

---

## 🛠️ Tech Stack

<div align="center">

### Frontend

| Technology | Version | Role |
|---|---|---|
| ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat-square) | 19.2 | UI Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square) | 5.8 | Type Safety |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square) | Latest | Styling |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square) | Latest | Build Tool |
| ![Recharts](https://img.shields.io/badge/Recharts-22c55e?style=flat-square) | Latest | Data Visualization |
| ![Lucide](https://img.shields.io/badge/Lucide_Icons-f59e0b?style=flat-square) | Latest | Icon Library |

### Backend

| Technology | Version | Role |
|---|---|---|
| ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=flat-square) | 3.11+ | Runtime |
| ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white&style=flat-square) | Latest | Web Framework |
| ![Gemini](https://img.shields.io/badge/Gemini_Vision-4285F4?logo=google&logoColor=white&style=flat-square) | Latest | AI Extraction |
| ![Tesseract](https://img.shields.io/badge/Tesseract_OCR-333333?style=flat-square) | Latest | Fallback OCR |

### Services & Infrastructure

| Service | Purpose |
|---|---|
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white&style=flat-square) | Auth & Database *(optional)* |
| ![Gemini AI](https://img.shields.io/badge/Google_Gemini-4285F4?logo=google&logoColor=white&style=flat-square) | Vision & Text Generation |
| ![Groq](https://img.shields.io/badge/Groq-f97316?style=flat-square) | Fast LLM Inference |

</div>

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

```
Node.js 18+    →  https://nodejs.org
Python 3.11+   →  https://python.org
Git            →  https://git-scm.com
```

<br/>

### 1. Clone the Repository

```bash
git clone https://github.com/saiyamjain468/paylockr.git
cd paylockr
```

### 2. Run PayLockr

```bash
# Windows
scripts\start-paylockr.bat

# macOS / Linux
npm run dev
```

### 3. Open in Browser

| Service | URL |
|---|---|
| 🖥️ Frontend Dashboard | http://localhost:5173 |
| ⚡ Backend API | http://localhost:8000 |
| 📖 API Documentation | http://localhost:8000/docs |

<br/>

### 🔑 Demo Credentials

| Account | Email | Password | Purpose |
|---|---|---|---|
| **Saiyam** (Freelancer) | `saiyam@paylockr.app` | `Demo@123` | Pre-loaded sample data |
| **Admin** | `admin@paylockr.app` | `Admin@123` | Clean account for testing imports |

---

## ⚙️ Manual Setup

<details>
<summary><strong>Frontend Setup</strong></summary>

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your API keys (see Environment Variables below)
npm run dev
```

</details>

<details>
<summary><strong>Backend (Document Service) Setup</strong></summary>

```bash
cd document-service
python -m venv .venv

# Activate virtual environment
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # macOS / Linux

pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Gemini API key

uvicorn app.main:app --reload --port 8000
```

</details>

---

## 🔐 Environment Variables

**Frontend — `.env.local`**

```env
# Required
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_DOCUMENT_SERVICE_URL=http://localhost:8000

# Optional (enables auth & cloud database)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_key
```

**Backend — `document-service/.env`**

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8000
```

<details>
<summary><strong>🔗 Where to get API Keys (all free)</strong></summary>

| Service | Link |
|---|---|
| Gemini AI | https://makersuite.google.com/app/apikey |
| Groq | https://console.groq.com/keys |
| Supabase *(optional)* | https://supabase.com |

</details>

---

## 🏗️ Architecture

```
PayLockr/
│
├── 🖥️  Frontend  (React + TypeScript + Vite)
│   ├── Dashboard          → Real-time stats, charts, tax summary
│   ├── Transactions       → Import, filter, categorize
│   ├── Smart Tax Vault    → Auto-save tracking & readiness meter
│   ├── Tax Calendar       → Quarterly advance tax deadlines
│   └── Insights           → AI-powered savings recommendations
│
└── ⚡  Document Service  (Python + FastAPI)
    ├── Gemini Vision API  → Extract transactions from PDFs & images
    ├── Universal Parser   → Handles all Indian bank statement formats
    └── Smart Categorizer  → Auto-classify debits & credits
```

**Data Flow:**

```
Bank PDF / Screenshot
        ↓
  Gemini Vision API  →  Transaction Extraction
        ↓
  Smart Categorizer  →  Income / Expense Classification
        ↓
  Tax Engine         →  Real-time Tax Calculation
        ↓
  Vault Manager      →  Auto-save 10% to Tax Vault
        ↓
  Dashboard          →  Visual Insights & Alerts
```

---

## 📱 Usage Guide

<br/>

**1. Import Your Bank Statement**
1. Navigate to **Transactions** page
2. Click **"IMPORT"** and upload your PDF or screenshot
3. Gemini AI extracts all transactions automatically
4. Review & confirm — done in under 60 seconds

**2. View Your Tax Breakdown**
1. Open the **Dashboard**
2. See your real-time income, tax liability, and vault balance
3. Check quarterly payment schedule — never miss advance tax again

**3. Track & Optimize Expenses**
1. All debits are auto-categorized (Food, Travel, Software, etc.)
2. Filter by category, date, or amount
3. Identify deductible business expenses instantly
4. Export a clean summary for your CA or ITR filing

---

## 🚢 Deployment

<details>
<summary><strong>Deploy Frontend → Vercel</strong></summary>

```bash
npm run build
vercel
```

</details>

<details>
<summary><strong>Deploy Backend → Render</strong></summary>

1. Push `document-service/` to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your repository
4. Set **Build Command**: `pip install -r requirements.txt`
5. Set **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variable: `GEMINI_API_KEY=your_key`
7. Deploy and copy the service URL
8. Update frontend `.env.local`: `VITE_DOCUMENT_SERVICE_URL=https://your-service.onrender.com`

</details>

---

## 🔮 Roadmap

| Status | Feature |
|---|---|
| ✅ | Smart Tax Calculator (FY 2025-26 New Regime) |
| ✅ | AI Bank Statement Import (All Indian Banks) |
| ✅ | Automatic Tax Vault with Coverage Meter |
| ✅ | Quarterly Tax Calendar & Reminders |
| ✅ | AI Financial Insights & Recommendations |
| 🔜 | Multi-user support with Supabase |
| 🔜 | GST calculation for registered businesses |
| 🔜 | ITR form pre-filling |
| 🔜 | Expense receipt scanning |
| 🔜 | Investment tracking (80C, 80D) |
| 🔜 | Mobile app (React Native) |
| 🔜 | WhatsApp deadline notifications |
| 🔜 | CA consultation integration |

---

## 🤝 Contributing

Contributions are welcome and appreciated. To get started:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature description"

# 4. Push to your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting. All PRs are reviewed within 48 hours.

---

## 📖 Documentation

| Document | Description |
|---|---|
| [QUICKSTART.md](QUICKSTART.md) | Get running in under 3 minutes |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Full codebase walkthrough |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [CHANGELOG.md](CHANGELOG.md) | Version history |
| [scripts/README.md](scripts/README.md) | Dev scripts reference |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** — Vision & language model powering statement parsing
- **Indian Tax Authority** — FY 2025-26 New Tax Regime structure & slabs
- **Open Source Community** — For the incredible libraries that made this possible

---

## 📬 Support & Contact

| Channel | Link |
|---|---|
| 🐛 Bug Reports | [GitHub Issues](https://github.com/saiyamjain468/paylockr/issues) |
| 📧 Email | saiyamjain468@gmail.com |
| 🔧 Troubleshooting | Check logs in `scripts\start-paylockr.bat` |

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/saiyamjain468.png" width="100" style="border-radius: 50%;" alt="Saiyam Jain"/>

### Saiyam Jain

[![GitHub](https://img.shields.io/badge/GitHub-@saiyamjain468-181717?style=for-the-badge&logo=github)](https://github.com/saiyamjain468)
[![Email](https://img.shields.io/badge/Email-saiyamjain468@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:saiyamjain468@gmail.com)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=120&section=footer&animation=fadeIn" width="100%"/>

**Built with ❤️ for India's 15 million+ freelancers**

⭐ **If PayLockr saves you time or money, star this repo!** ⭐

![Visitor Count](https://komarev.com/ghpvc/?username=saiyamjain468&label=Profile+Views&color=22d3ee&style=flat-square)

</div>
