# 🚀 Paylockr Backend API Documentation

Professional Express.js backend for Paylockr financial management platform.

## 📋 Table of Contents
- [Features](#features)
- [Quick Start](#quick-start)
- [API Endpoints](#api-endpoints)
- [Services](#services)
- [Deployment](#deployment)

---

## ✨ Features

### Core Services:
- 📱 **SMS Notifications** (Twilio) - Tax alerts, OTP, confirmations
- 📧 **Email Service** (SendGrid) - Reports, receipts, reminders
- 💳 **Payment Gateway** (Razorpay) - UPI, Cards, Net Banking
- 🧮 **Tax Calculator** - Indian tax slab calculations
- 💾 **Data Management** - User data storage

### Built-in:
- ✅ Demo mode (works without API keys)
- ✅ CORS enabled
- ✅ Error handling
- ✅ Request logging
- ✅ Input validation

---

## 🚀 Quick Start

### 1. Install
```bash
cd backend
npm install
```

### 2. Configure (Optional)
Edit `.env` file - leave empty for demo mode

### 3. Run
```bash
npm start
```

Server: http://localhost:3001

---

## 📡 API Endpoints

### Health & Status

#### GET `/`
Root endpoint with API info
```json
{
  "name": "Paylockr Backend API",
  "version": "1.0.0",
  "status": "running"
}
```

#### GET `/api/health`
Service health check
```json
{
  "status": "ok",
  "services": {
    "twilio": false,
    "sendgrid": false,
    "razorpay": false
  },
  "mode": "demo"
}
```

---

### 📱 SMS Endpoints

#### POST `/api/sms/send`
Send custom SMS
```json
{
  "to": "+919876543210",
  "message": "Your message here"
}
```

#### POST `/api/sms/tax-deadline`
Send tax deadline reminder
```json
{
  "phone": "+919876543210",
  "deadline": "July 31, 2024",
  "amount": 50000
}
```

#### POST `/api/sms/payment-confirmation`
Send payment confirmation
```json
{
  "phone": "+919876543210",
  "amount": 50000,
  "transactionId": "TXN123456"
}
```

#### POST `/api/sms/otp`
Send 2FA OTP
```json
{
  "phone": "+919876543210"
}
```

---

### 📧 Email Endpoints

#### POST `/api/email/send`
Send custom email
```json
{
  "to": "user@example.com",
  "subject": "Subject",
  "html": "<h1>HTML content</h1>",
  "text": "Plain text"
}
```

#### POST `/api/email/monthly-report`
Send monthly financial report
```json
{
  "email": "user@example.com",
  "income": 250000,
  "expenses": 80000,
  "taxSaved": 45000,
  "month": "June 2024"
}
```

---

### 💳 Payment Endpoints

#### POST `/api/payment/create-order`
Create Razorpay order
```json
{
  "amount": 50000,
  "currency": "INR",
  "receipt": "receipt_123",
  "notes": {}
}
```

Response:
```json
{
  "success": true,
  "order": {
    "id": "order_xxx",
    "amount": 50000,
    "currency": "INR",
    "status": "created"
  }
}
```

#### POST `/api/payment/verify`
Verify payment signature
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx"
}
```

#### GET `/api/payment/:paymentId`
Get payment details
```
GET /api/payment/pay_xxx
```

---

### 🧮 Tax Endpoints

#### POST `/api/tax/calculate`
Calculate Indian income tax
```json
{
  "income": 1200000,
  "deductions": 75000,
  "regime": "NEW"
}
```

Response:
```json
{
  "success": true,
  "calculation": {
    "grossIncome": 1200000,
    "deductions": 75000,
    "taxableIncome": 1125000,
    "baseTax": 80000,
    "cess": 3200,
    "totalTax": 83200,
    "effectiveRate": "6.93"
  }
}
```

#### POST `/api/tax/advance-tax`
Calculate quarterly advance tax
```json
{
  "annualTax": 100000
}
```

Response:
```json
{
  "success": true,
  "quarters": [
    { "quarter": "Q1", "dueDate": "15-Jun", "amount": 15000 },
    { "quarter": "Q2", "dueDate": "15-Sep", "amount": 45000 },
    { "quarter": "Q3", "dueDate": "15-Dec", "amount": 75000 },
    { "quarter": "Q4", "dueDate": "15-Mar", "amount": 100000 }
  ]
}
```

---

### 💾 User Data Endpoints

#### POST `/api/user/save-data`
Save user data
```json
{
  "userId": "user123",
  "data": {}
}
```

#### GET `/api/user/:userId/data`
Get user data
```
GET /api/user/user123/data
```

---

## 🔧 Services Setup

### Twilio (SMS)
1. Sign up: https://console.twilio.com
2. Get phone number
3. Add to `.env`:
```env
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

### SendGrid (Email)
1. Sign up: https://app.sendgrid.com
2. Create API key
3. Verify sender email
4. Add to `.env`:
```env
SENDGRID_API_KEY=SG.xxxxx
SENDGRID_FROM_EMAIL=noreply@paylockr.com
```

### Razorpay (Payments)
1. Sign up: https://dashboard.razorpay.com
2. Get API keys
3. Add to `.env`:
```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

---

## 🧪 Testing

### Test Health
```bash
curl http://localhost:3001/api/health
```

### Test Tax Calculator
```bash
curl -X POST http://localhost:3001/api/tax/calculate \
  -H "Content-Type: application/json" \
  -d '{"income":1200000,"deductions":75000}'
```

### Test SMS (Demo)
```bash
curl -X POST http://localhost:3001/api/sms/tax-deadline \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210","deadline":"July 31","amount":50000}'
```

---

## 🚀 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Heroku
```bash
heroku create paylockr-api
git push heroku main
```

### Railway
```bash
railway login
railway init
railway up
```

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
  "message": "Demo mode response"
}
```

---

## 🔒 Security

- ✅ CORS enabled
- ✅ Input validation
- ✅ Error handling
- ✅ Environment variables
- ✅ No sensitive data in logs

---

## 📊 Status Codes

- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

---

**Status:** ✅ Production Ready (Demo Mode)  
**Version:** 1.0.0  
**License:** MIT
