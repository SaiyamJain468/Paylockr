# PayLockr - Project Structure

```
paylockr/
├── backend/                    # Express.js API Server
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   └── README.md              # Backend documentation
│
├── document-service/          # Python FastAPI Service
│   ├── app/                   # Application code
│   ├── requirements.txt       # Python dependencies
│   └── README.md              # Service documentation
│
├── public/                    # Static assets
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
│
├── scripts/                   # Development scripts
│   ├── start-paylockr.bat    # Start all services
│   ├── start-frontend.bat    # Start frontend only
│   └── start-backend.bat     # Start backend only
│
├── src/                       # Frontend source code
│   ├── components/           # React components
│   ├── pages/                # Page components
│   ├── services/             # API services
│   ├── utils/                # Utility functions
│   ├── types/                # TypeScript types
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Entry point
│
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── CHANGELOG.md              # Version history
├── CONTRIBUTING.md           # Contribution guidelines
├── Dockerfile                # Docker configuration
├── LICENSE                   # MIT License
├── netlify.toml              # Netlify deployment
├── package.json              # Frontend dependencies
├── README.md                 # Main documentation
├── SECURITY.md               # Security policy
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite configuration
└── vercel.json               # Vercel deployment
```

## Key Directories

### `/src`
Main frontend application code. All React components, pages, and utilities.

### `/backend`
Express.js API server for SMS, email, and payment processing.

### `/document-service`
Python FastAPI service for AI-powered document processing.

### `/scripts`
Development and deployment scripts for easy project management.

## Configuration Files

- **package.json** - Frontend dependencies and scripts
- **tsconfig.json** - TypeScript compiler options
- **vite.config.ts** - Vite build configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **netlify.toml** - Netlify deployment settings
- **vercel.json** - Vercel deployment settings
- **Dockerfile** - Docker container configuration

## Documentation

- **README.md** - Main project documentation
- **CONTRIBUTING.md** - How to contribute
- **CHANGELOG.md** - Version history
- **SECURITY.md** - Security policies
- **LICENSE** - MIT License terms
