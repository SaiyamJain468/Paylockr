# PayLockr Setup Checklist ✅

## Before You Start
- [ ] Node.js installed (v16 or higher)
- [ ] npm or yarn installed
- [ ] Code editor (VS Code recommended)
- [ ] Internet connection

---

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```
- [ ] Command completed successfully
- [ ] No error messages
- [ ] node_modules folder created

### 2. Get Gemini API Key
- [ ] Visited https://aistudio.google.com/app/apikey
- [ ] Signed in with Google account
- [ ] Clicked "Create API Key"
- [ ] Copied the API key (starts with AIza...)

### 3. Configure Environment
- [ ] Opened .env.local file
- [ ] Found VITE_GEMINI_API_KEY line
- [ ] Pasted API key (no spaces!)
- [ ] Saved the file

Example:
```env
VITE_GEMINI_API_KEY=AIzaSyC_your_actual_key_here
```

### 4. Start Development Server
```bash
npm run dev
```
- [ ] Server started successfully
- [ ] No error messages
- [ ] URL shown: http://localhost:5173

### 5. Test the Application
- [ ] Opened http://localhost:5173 in browser
- [ ] Login page loads correctly
- [ ] Clicked "Sign in with Google"
- [ ] Selected demo user (Saiyam or Priya)
- [ ] Dashboard loads successfully

### 6. Test AI Insights Feature
- [ ] Clicked "AI Insights" in sidebar
- [ ] Page loads with stats cards
- [ ] Clicked "Generate Insights" button
- [ ] Loading spinner appears
- [ ] AI insights display successfully
- [ ] No error messages

---

## Verification Checklist

### Visual Checks
- [ ] Dark mode works (toggle in Settings)
- [ ] Sidebar navigation works
- [ ] All pages load without errors
- [ ] Responsive on mobile (resize browser)

### Feature Checks
- [ ] Dashboard shows transactions
- [ ] Smart Tax Vault displays data
- [ ] Transactions page works
- [ ] Invoices page loads
- [ ] Expenses page loads
- [ ] Bank Accounts page loads
- [ ] Tax Calendar displays
- [ ] AI Insights generates recommendations ⭐
- [ ] Settings page works
- [ ] Logout works

---

## Common Issues & Solutions

### ❌ "API Key missing" error
**Solution:**
- [ ] Check .env.local has VITE_GEMINI_API_KEY
- [ ] No spaces before/after the = sign
- [ ] Restart dev server (Ctrl+C, then npm run dev)

### ❌ Build errors
**Solution:**
- [ ] Run: npm install
- [ ] Delete node_modules and package-lock.json
- [ ] Run: npm install again
- [ ] Run: npm run dev

### ❌ AI Insights not working
**Solution:**
- [ ] API key is correct in .env.local
- [ ] Internet connection is active
- [ ] Dev server was restarted after adding key
- [ ] Check browser console for errors (F12)

### ❌ Port already in use
**Solution:**
- [ ] Close other dev servers
- [ ] Or change port in vite.config.ts
- [ ] Or kill process using port 5173

---

## Optional: Supabase Setup

Only if you want real authentication (not required for demo):

- [ ] Created Supabase account at https://supabase.com
- [ ] Created new project
- [ ] Got Project URL from Settings → API
- [ ] Got anon key from Settings → API
- [ ] Added to .env.local:
  ```env
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your_anon_key_here
  ```
- [ ] Restarted dev server

---

## Production Build

When ready to deploy:

```bash
npm run build
```

- [ ] Build completes successfully
- [ ] dist/ folder created
- [ ] No errors in build output

---

## Documentation Reference

- [ ] Read SETUP_GUIDE.md for detailed instructions
- [ ] Read GEMINI_API_GUIDE.md for API key help
- [ ] Read API_KEY_SETUP.txt for quick reference
- [ ] Read BUGS_FIXED.md to see what was fixed
- [ ] Read README.md for project overview

---

## Final Verification

### All Features Working?
- [ ] ✅ Authentication (demo mode)
- [ ] ✅ Dashboard with stats
- [ ] ✅ Transaction management
- [ ] ✅ Smart Tax Vault
- [ ] ✅ AI Insights with Gemini ⭐
- [ ] ✅ Tax Calendar
- [ ] ✅ Invoices & Expenses
- [ ] ✅ Bank Accounts
- [ ] ✅ Settings & Theme toggle
- [ ] ✅ Responsive design

### Ready to Use?
- [ ] All checkboxes above are checked
- [ ] No error messages
- [ ] AI Insights working perfectly
- [ ] Happy with the setup!

---

## 🎉 Success!

If all items are checked, you're ready to go!

**Enjoy using PayLockr with AI-powered tax insights!**

---

## Need Help?

📧 Check documentation files in project root
🐛 Open GitHub issue if you find bugs
💡 Read inline code comments for understanding

**Built with ❤️ for financial freedom**
