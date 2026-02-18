# 🚀 Paylockr Backend

Express.js backend for SMS and Email notifications.

## 📦 Features

- 📱 **SMS Notifications** (Twilio)
  - Tax deadline alerts
  - Payment confirmations
  - 2FA OTP
  - Vault unlock alerts

- 📧 **Email Notifications** (SendGrid)
  - Monthly reports
  - Tax reminders
  - Payment receipts

## 🛠️ Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Edit `.env` file:

```env
PORT=3001

# Twilio (Get from https://console.twilio.com)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# SendGrid (Get from https://app.sendgrid.com)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@paylockr.com
```

### 3. Get API Keys

#### Twilio (FREE $15 credit):
1. Go to https://console.twilio.com
2. Sign up (free trial)
3. Get phone number
4. Copy Account SID, Auth Token

#### SendGrid (FREE 100 emails/day):
1. Go to https://app.sendgrid.com
2. Sign up
3. Settings → API Keys → Create API Key
4. Verify sender email

### 4. Start Server
```bash
npm start
```

Server runs on http://localhost:3001

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Send SMS
```
POST /api/sms/send
Body: { to, message }
```

### Tax Deadline SMS
```
POST /api/sms/tax-deadline
Body: { phone, deadline, amount }
```

### Payment Confirmation SMS
```
POST /api/sms/payment-confirmation
Body: { phone, amount, transactionId }
```

### 2FA OTP
```
POST /api/sms/otp
Body: { phone }
```

### Send Email
```
POST /api/email/send
Body: { to, subject, html, text }
```

## 🧪 Test

```bash
# Test health
curl http://localhost:3001/api/health

# Test SMS (demo mode)
curl -X POST http://localhost:3001/api/sms/tax-deadline \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210","deadline":"July 31, 2024","amount":50000}'
```

## 🚀 Deploy

### Vercel:
```bash
npm install -g vercel
vercel
```

### Heroku:
```bash
heroku create paylockr-backend
git push heroku main
```

### Railway:
```bash
railway login
railway init
railway up
```

## 📝 Notes

- Works in **demo mode** without API keys (logs to console)
- Add API keys for production use
- CORS enabled for frontend (localhost:5173)
- All endpoints return JSON

## 🔒 Security

- Never commit `.env` file
- Use environment variables in production
- Validate phone numbers
- Rate limit API calls
- Store OTPs securely with expiry

---

**Status:** ✅ Ready to use (demo mode) | Add API keys for production
