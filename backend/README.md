<!-- made by ZION -->
# 🚀 Paylockr Backend API

Professional Express.js backend for Paylockr financial management platform.

## 📦 What This Does

Handles server-side operations that require security:
- 📱 **SMS Notifications** - Tax alerts, OTP, payment confirmations
- 📧 **Email Service** - Monthly reports, receipts, reminders
- 💳 **Payment Gateway** - Razorpay integration for UPI/Cards
- 🧮 **Tax Calculator** - Indian tax slab calculations
- 💾 **Data Management** - User data storage (future)

---

## ✨ Features

- ✅ **Demo Mode** - Works without API keys (logs to console)
- ✅ **14 API Endpoints** - SMS, Email, Payments, Tax, User data
- ✅ **CORS Enabled** - Works with frontend on different port
- ✅ **Error Handling** - Comprehensive error responses
- ✅ **Request Logging** - Track all API calls
- ✅ **Input Validation** - Secure data handling

---

## 🚀 Quick Start

### 1. Install
```bash
cd backend
npm install
```

### 2. Configure (Optional)
Edit `.env` - leave empty for demo mode

### 3. Run
```bash
npm start
```

Server: http://localhost:3001

---

## 📡 API Endpoints

### Health
- `GET /` - API info
- `GET /api/health` - Service status

### SMS (4 endpoints)
- `POST /api/sms/send` - Custom SMS
- `POST /api/sms/tax-deadline` - Tax reminder
- `POST /api/sms/payment-confirmation` - Payment alert
- `POST /api/sms/otp` - 2FA OTP

### Email (2 endpoints)
- `POST /api/email/send` - Custom email
- `POST /api/email/monthly-report` - Financial report

### Payments (3 endpoints)
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `GET /api/payment/:id` - Get payment details

### Tax (2 endpoints)
- `POST /api/tax/calculate` - Calculate Indian income tax
- `POST /api/tax/advance-tax` - Quarterly tax breakdown

### User (2 endpoints)
- `POST /api/user/save-data` - Save user data
- `GET /api/user/:id/data` - Get user data

**Total: 14 Endpoints**

---

## 🧪 Test

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Tax Calculator
```bash
curl -X POST http://localhost:3001/api/tax/calculate \
  -H "Content-Type: application/json" \
  -d '{"income":1200000,"deductions":75000}'
```

### SMS (Demo Mode)
```bash
curl -X POST http://localhost:3001/api/sms/tax-deadline \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210","deadline":"July 31","amount":50000}'
```

---

## 🔧 Services Setup (Optional)

### Twilio (SMS)
1. https://console.twilio.com
2. Get phone number
3. Add to `.env`

### SendGrid (Email)
1. https://app.sendgrid.com
2. Create API key
3. Add to `.env`

### Razorpay (Payments)
1. https://dashboard.razorpay.com
2. Get API keys
3. Add to `.env`

**Note:** All services work in demo mode without keys!

---

## 📝 Response Format

### Success
```json
{
  "success": true,
  "data": {}
}
```

### Error
```json
{
  "success": false,
  "error": "Error message"
}
```

### Demo Mode
```json
{
  "success": true,
  "demo": true,
  "message": "Demo: SMS sent"
}
```

---

## 🚀 Deploy

### Railway (Recommended)
```bash
railway login
railway init
railway up
```

### Vercel
```bash
vercel
```

### Heroku
```bash
heroku create paylockr-api
git push heroku main
```

---

## 📊 Status Codes

- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

---

## 🔒 Security

- ✅ Environment variables for secrets
- ✅ CORS enabled
- ✅ Input validation
- ✅ Error handling
- ✅ No sensitive data in logs

---

## 📚 Documentation

See `API_DOCS.md` for complete API reference with examples.

---

**Status:** ✅ Production Ready (Demo Mode)  
**Version:** 1.0.0  
**Port:** 3001  
**License:** MIT
