# PayLockr Setup Guide 🚀

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install the correct Google Generative AI package and all other dependencies.

---

## 2. Get Your Gemini API Key 🔑

### Step-by-Step Instructions:

1. **Go to Google AI Studio**
   - Visit: https://makersuite.google.com/app/apikey
   - Or: https://aistudio.google.com/app/apikey

2. **Sign in with your Google Account**

3. **Create API Key**
   - Click "Create API Key" button
   - Select "Create API key in new project" (or choose existing project)
   - Copy the generated API key (starts with `AIza...`)

4. **Add to .env.local file**
   - Open `.env.local` in the project root
   - Replace `your_gemini_api_key_here` with your actual API key:
   
   ```env
   VITE_GEMINI_API_KEY=AIzaSyC_your_actual_key_here
   ```
AIzaSyANUsASB91Jglh8_7wHbbXbjS2WvgCoxGc
---

## 3. Configure Supabase (Optional)

If you want to use real authentication instead of demo mode:

1. **Create Supabase Project**
   - Visit: https://supabase.com
   - Create a new project

2. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy the Project URL and anon/public key

3. **Update .env.local**
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

---

## 4. Run the Application

```bash
npm run dev
```

The app will open at: http://localhost:5173

---

## 5. Test AI Insights Feature

1. **Login** with demo account:
   - Click "Sign in with Google"
   - Choose "Saiyam Jain" or "Priya Sharma"

2. **Navigate to AI Insights**
   - Click "AI Insights" in the sidebar

3. **Generate Insights**
   - Click "Generate Insights" button
   - Wait a few seconds for AI analysis
   - View personalized tax recommendations!

---

## Troubleshooting 🔧

### Error: "API Key missing"
- Make sure you added `VITE_GEMINI_API_KEY` to `.env.local`
- Restart the dev server after adding the key: `Ctrl+C` then `npm run dev`

### Error: "Failed to fetch" or Network Error
- Check your internet connection
- Verify your API key is correct
- Check if you have API quota remaining at: https://aistudio.google.com/app/apikey

### Build Errors
- Run `npm install` again to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then run `npm install`

---

## Project Structure

```
src/
├── components/          # UI components
│   ├── auth/           # Login & SignUp
│   ├── common/         # Reusable components (Button, etc.)
│   └── layout/         # Sidebar, Header, Footer
├── pages/              # Main pages
│   ├── Dashboard.tsx
│   ├── Insights.tsx    # ← AI Insights page
│   └── ...
├── services/           # API integrations
│   ├── geminiService.ts  # ← Gemini AI integration
│   └── supabaseClient.ts
└── types/              # TypeScript types
```

---

## Features Implemented ✅

- ✅ AI-Powered Tax Insights using Google Gemini
- ✅ Real-time transaction analysis
- ✅ Personalized tax recommendations
- ✅ Tax saving opportunities detection
- ✅ Beautiful UI with loading states
- ✅ Error handling and retry logic
- ✅ Demo mode (no API key required for other features)

---

## API Key Security 🔒

**Important:** Never commit your `.env.local` file to Git!

The `.gitignore` file already includes `.env.local`, so your API key stays private.

---

## Need Help?

- **Gemini API Docs:** https://ai.google.dev/docs
- **Supabase Docs:** https://supabase.com/docs
- **GitHub Issues:** Open an issue on the repository

---

**Built with ❤️ for financial freedom**
