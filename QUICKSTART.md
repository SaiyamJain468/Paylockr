# 🚀 Quick Start Guide

Get PayLockr running in 3 minutes.

## Prerequisites

- [Node.js 18+](https://nodejs.org)
- [Python 3.11+](https://python.org)
- [Git](https://git-scm.com)

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/saiyamjain468/paylockr.git
cd paylockr
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
# Copy environment template
copy .env.example .env.local

# Edit .env.local and add your API keys:
# - VITE_GEMINI_API_KEY (required)
# - VITE_GROQ_API_KEY (optional)
```

Get free API keys:
- **Gemini**: https://makersuite.google.com/app/apikey
- **Groq**: https://console.groq.com/keys

### 4. Start Application
```bash
# Windows
scripts\start-paylockr.bat

# Mac/Linux
npm run dev
```

## Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Document Service**: http://localhost:8000

## Demo Accounts

### Saiyam (Sample Data)
- Email: `saiyam@paylockr.app`
- Password: `Demo@123`

### Admin (Empty Account)
- Email: `admin@paylockr.app`
- Password: `Admin@123`

## Development Scripts

```bash
# Start all services
scripts\start-paylockr.bat

# Start frontend only
scripts\start-frontend.bat

# Start backend only
scripts\start-backend.bat
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173 (frontend)
npx kill-port 5173

# Kill process on port 3001 (backend)
npx kill-port 3001
```

### Dependencies Error
```bash
# Clear cache and reinstall
rmdir /s /q node_modules
del package-lock.json
npm install
```

### API Key Issues
- Ensure `.env.local` exists in root directory
- Verify keys start with `VITE_` prefix
- Restart development server after changes

## Next Steps

1. ✅ Import bank statement (Transactions page)
2. ✅ View tax calculations (Dashboard)
3. ✅ Check Smart Tax Vault
4. ✅ Explore AI insights

## Documentation

- [README.md](README.md) - Full documentation
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Project layout
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide
- [CHANGELOG.md](CHANGELOG.md) - Version history

## Support

- **Issues**: https://github.com/saiyamjain468/paylockr/issues
- **Email**: saiyamjain468@gmail.com
