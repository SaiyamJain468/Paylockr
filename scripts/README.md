# Scripts

Quick start scripts for PayLockr development.

## Available Scripts

### `start-paylockr.bat`
Start both frontend and backend services together.

```bash
scripts\start-paylockr.bat
```

### `start-frontend.bat`
Start only the frontend React application.

```bash
scripts\start-frontend.bat
```

### `start-backend.bat`
Start only the backend Express.js API server.

```bash
scripts\start-backend.bat
```

## Requirements

- Node.js 18+
- Python 3.11+ (for document-service)
- Git

## First Time Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   copy .env.example .env.local
   ```

3. Run the application:
   ```bash
   scripts\start-paylockr.bat
   ```
