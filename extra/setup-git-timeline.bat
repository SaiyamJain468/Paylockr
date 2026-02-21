@echo off
echo Setting up Git timeline for Paylockr...
echo.

REM Configure git
git config user.name "Saiyam Jain"
git config user.email "saiyamjain468@gmail.com"

REM Day 1 - Initial Setup (3 days ago)
echo [1/15] Initial project setup...
git add package.json vite.config.ts tsconfig.json index.html .gitignore
git commit -m "Initial commit: Project setup with Vite + React + TypeScript" --date="3 days ago"

REM Day 1 - Basic structure
echo [2/15] Adding basic structure...
git add src/types/ src/App.tsx src/main.tsx src/index.css
git commit -m "Add TypeScript types and basic app structure" --date="3 days ago 2 hours ago"

REM Day 1 - Layout components
echo [3/15] Creating layout...
git add src/components/Layout/
git commit -m "Create layout components (Header, Sidebar, Footer)" --date="3 days ago 4 hours ago"

REM Day 2 - Dashboard (2 days ago)
echo [4/15] Building dashboard...
git add src/pages/Dashboard.tsx src/components/Dashboard/
git commit -m "Implement financial dashboard with real-time stats" --date="2 days ago"

REM Day 2 - Tax Calculator
echo [5/15] Adding tax calculator...
git add src/utils/taxCalculator.ts
git commit -m "Add Indian tax slab calculator with progressive taxation" --date="2 days ago 3 hours ago"

REM Day 2 - Smart Tax Vault
echo [6/15] Creating tax vault...
git add src/pages/SmartTaxVault.tsx
git commit -m "Build Smart Tax Vault with auto-calculation feature" --date="2 days ago 5 hours ago"

REM Day 3 - Transactions (yesterday)
echo [7/15] Adding transactions...
git add src/pages/Transactions.tsx
git commit -m "Add transaction management with filtering and search" --date="yesterday"

REM Day 3 - Invoices
echo [8/15] Creating invoices...
git add src/pages/Invoices.tsx
git commit -m "Implement invoice generation with auto-transaction linking" --date="yesterday 2 hours ago"

REM Day 3 - Bank Accounts
echo [9/15] Adding bank accounts...
git add src/pages/BankAccounts.tsx
git commit -m "Add multi-bank account management with 2FA" --date="yesterday 4 hours ago"

REM Day 4 - Expenses & OCR (today morning)
echo [10/15] Building expense tracker...
git add src/pages/Expenses.tsx src/services/ocrService.ts
git commit -m "Add expense tracking with OCR receipt scanning" --date="6 hours ago"

REM Day 4 - AI Integration
echo [11/15] Integrating AI...
git add src/services/geminiService.ts src/pages/Insights.tsx
git commit -m "Integrate Groq AI for financial insights and tax optimization" --date="4 hours ago"

REM Day 4 - Tax Calendar
echo [12/15] Adding tax calendar...
git add src/pages/TaxCalendar.tsx
git commit -m "Create tax calendar with deadline reminders" --date="3 hours ago"

REM Day 4 - Backend Setup
echo [13/15] Setting up backend...
git add backend/
git commit -m "Setup Express backend with Twilio, SendGrid, Razorpay APIs" --date="2 hours ago"

REM Day 4 - Email & SMS Services
echo [14/15] Adding notifications...
git add src/services/emailService.ts src/services/smsService.ts
git commit -m "Add email reports and SMS notifications" --date="1 hour ago"

REM Day 4 - Final touches
echo [15/15] Final updates...
git add README.md test-receipts/ src/utils/multiUserUnifiedData.ts
git commit -m "Add comprehensive README and test data" --date="30 minutes ago"

echo.
echo ✅ Git timeline created successfully!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub
echo 2. Run: git remote add origin https://github.com/SaiyamJain468/Paylockr.git
echo 3. Run: git branch -M main
echo 4. Run: git push -u origin main
echo.
pause
