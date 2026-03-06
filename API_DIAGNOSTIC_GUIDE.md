# 🔍 API Diagnostic & Error Checking System

## ✅ What's Been Added

### 1. **Startup Diagnostic** (`src/utils/startupDiagnostic.ts`)
- Auto-runs on app start in development mode
- Checks all API keys in console
- Shows critical vs optional keys
- Provides direct links to get missing keys

### 2. **API Tester** (`src/utils/apiTester.ts`)
- Tests actual API connectivity (not just key presence)
- Makes real API calls to verify keys work
- Tests: Gemini AI, Groq AI, Firebase, EmailJS, Backend Service
- Returns detailed status for each service

### 3. **API Status Dashboard** (`src/components/common/APIStatusDashboard.tsx`)
- Visual dashboard showing all API statuses
- Real-time testing with refresh button
- Color-coded status indicators (green/yellow/red)
- Actionable recommendations for each service

### 4. **Enhanced Error Boundary** (`src/components/common/ErrorBoundaryWithDiagnostics.tsx`)
- Catches all React errors
- Detects API-related errors specifically
- Shows helpful troubleshooting steps
- Links to help page for solutions

### 5. **API Key Validator** (`src/utils/apiKeyValidator.ts`)
- Validates API key formats
- Sanitizes keys for safe logging
- Provides status summaries

## 🎯 How to Use

### Check API Status
1. Go to **Help** page
2. Click **"API Keys"** category
3. See real-time status of all APIs
4. Click **"REFRESH"** to re-test

### Console Diagnostics
- Open browser console on app start
- See automatic API check results
- Follow provided links to fix issues

### Error Handling
- If API error occurs, enhanced error screen shows:
  - Specific error message
  - Troubleshooting steps
  - Quick links to help

## 📊 Current API Status

Based on your `.env.local`:

✅ **Gemini AI** - `AIzaSyCKl***************`
✅ **Groq AI** - `gsk_Ckbi***************`
✅ **Firebase** - Project: `paylockr-d4d8e`
✅ **EmailJS** - Service: `service_nbhu3ew`
⚠️  **Backend** - `http://localhost:3001` (needs to be running)

## 🔧 Testing Each API

### Gemini AI
```bash
# Test in browser console
const genAI = new GoogleGenerativeAI('YOUR_KEY');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
const result = await model.generateContent('test');
```

### Groq AI
```bash
# Test with curl
curl https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer YOUR_KEY"
```

### Backend Service
```bash
# Start backend
cd document-service
npm install
npm start

# Test health endpoint
curl http://localhost:3001/health
```

## 🚨 Common Issues & Fixes

### Issue: "Gemini API key not working"
**Fix:**
1. Verify key starts with `AIza`
2. Check no extra spaces in `.env.local`
3. Restart dev server: `npm run dev`
4. Get new key: https://makersuite.google.com/app/apikey

### Issue: "Backend service not running"
**Fix:**
```bash
cd document-service
npm install
npm start
```

### Issue: "Firebase auth not working"
**Fix:**
1. Check Firebase console: https://console.firebase.google.com
2. Enable Authentication methods
3. Add authorized domains

### Issue: "EmailJS not sending"
**Fix:**
1. Verify template ID matches in EmailJS dashboard
2. Check service ID is correct
3. Test in EmailJS dashboard first

## 📝 Environment Variables Checklist

Copy this to your `.env.local`:

```env
# ✅ REQUIRED - AI Features
VITE_GEMINI_API_KEY=AIzaSyCKl***************

# ⚠️ OPTIONAL - Faster AI
VITE_GROQ_API_KEY=gsk_Ckbi***************

# ⚠️ OPTIONAL - User Auth
VITE_FIREBASE_API_KEY=AIzaSyBN1xwTPU4AXNlkIcsLWfUwW3MFOzi1dx0
VITE_FIREBASE_PROJECT_ID=paylockr-d4d8e

# ⚠️ OPTIONAL - Email Notifications
VITE_EMAILJS_PUBLIC_KEY=3vh6PIUyS21q-FBvK
VITE_EMAILJS_SERVICE_ID=service_nbhu3ew

# ⚠️ OPTIONAL - Document Processing
VITE_DOCUMENT_SERVICE_URL=http://localhost:3001
```

## 🎉 Success Indicators

When everything works:
- ✅ Console shows all green checkmarks
- ✅ API Status Dashboard all green
- ✅ No errors in browser console
- ✅ AI Insights generate successfully
- ✅ Bank statement import works
- ✅ Email notifications send

---

**Made with 💙 by Saiyam Jain**
