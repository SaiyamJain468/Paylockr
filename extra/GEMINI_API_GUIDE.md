# How to Get Your Gemini API Key - Visual Guide

## Step 1: Visit Google AI Studio
```
🌐 URL: https://aistudio.google.com/app/apikey
```

## Step 2: Sign In
```
👤 Sign in with your Google Account
   (Any Gmail account works - it's FREE!)
```

## Step 3: Create API Key
```
┌─────────────────────────────────────────┐
│  Google AI Studio                       │
├─────────────────────────────────────────┤
│                                         │
│  API Keys                               │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  + Create API Key               │ ← Click this!
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

## Step 4: Choose Project
```
┌─────────────────────────────────────────┐
│  Create API key                         │
├─────────────────────────────────────────┤
│                                         │
│  ○ Create API key in new project   ← Choose this
│  ○ Create API key in existing project  │
│                                         │
│         [Create]  [Cancel]              │
└─────────────────────────────────────────┘
```

## Step 5: Copy Your Key
```
┌─────────────────────────────────────────┐
│  API key created                        │
├─────────────────────────────────────────┤
│                                         │
│  AIzaSyC_example_key_1234567890abcd    │
│                                         │
│  [📋 Copy]                              │ ← Click to copy
│                                         │
│  ⚠️  Keep this key secure!              │
└─────────────────────────────────────────┘
```

## Step 6: Add to .env.local
```
📁 Open: .env.local (in project root folder)

📝 Find this line:
   VITE_GEMINI_API_KEY=your_gemini_api_key_here

✏️  Replace with:
   VITE_GEMINI_API_KEY=AIzaSyC_example_key_1234567890abcd
                       ↑
                       Paste your actual key here!
```

## Step 7: Save & Restart
```
💾 Save the .env.local file

🔄 Restart your dev server:
   1. Press Ctrl+C in terminal
   2. Run: npm run dev
   3. Open: http://localhost:5173
```

## Step 8: Test It!
```
✅ Login to PayLockr
✅ Click "AI Insights" in sidebar
✅ Click "Generate Insights" button
✅ Wait a few seconds...
✅ See your personalized tax recommendations! 🎉
```

---

## Troubleshooting

### ❌ Error: "API Key missing"
```
Solution:
1. Check .env.local has: VITE_GEMINI_API_KEY=AIza...
2. Make sure there's no space before/after the =
3. Restart dev server (Ctrl+C, then npm run dev)
```

### ❌ Error: "Failed to fetch"
```
Solution:
1. Check internet connection
2. Verify API key is correct (no extra spaces)
3. Check API quota at: https://aistudio.google.com
```

### ❌ Still not working?
```
Solution:
1. Delete node_modules folder
2. Run: npm install
3. Add API key to .env.local again
4. Run: npm run dev
```

---

## Example .env.local File

```env
# Supabase Configuration (Optional)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google Gemini AI API Key (Required for AI Insights)
VITE_GEMINI_API_KEY=AIzaSyC_your_actual_key_here_1234567890

# Vercel (Optional - for deployment)
VERCEL_OIDC_TOKEN="..."
```

---

## Important Notes

🔒 **Security:**
- Never share your API key publicly
- Never commit .env.local to Git
- The file is already in .gitignore

💰 **Cost:**
- Gemini API has a FREE tier
- Generous quota for testing
- Perfect for this project!

📊 **Usage:**
- Check usage at: https://aistudio.google.com
- Monitor your quota
- Upgrade if needed (optional)

---

## Quick Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Need more help?** Check SETUP_GUIDE.md for detailed instructions!

**Ready to go?** Follow the steps above and enjoy AI-powered tax insights! 🚀
