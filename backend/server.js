const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============ SERVICE INITIALIZATION ============

// Twilio
const twilio = require('twilio');
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

// SendGrid
const sgMail = require('@sendgrid/mail');
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Razorpay
const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
  : null;

// ============ HEALTH & STATUS ============

app.get('/', (req, res) => {
  res.json({
    name: 'Paylockr Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      sms: '/api/sms/*',
      email: '/api/email/*',
      payment: '/api/payment/*',
      tax: '/api/tax/*',
      user: '/api/user/*'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      twilio: !!twilioClient,
      sendgrid: !!process.env.SENDGRID_API_KEY,
      razorpay: !!razorpay
    },
    mode: (!twilioClient && !razorpay) ? 'demo' : 'production'
  });
});

// ============ SMS NOTIFICATIONS ============

app.post('/api/sms/send', async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    if (!twilioClient) {
      console.log(`📱 [DEMO] SMS to ${to}: ${message}`);
      return res.json({ success: true, demo: true, message: `Demo: SMS sent to ${to}` });
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    res.json({ success: true, sid: result.sid });
  } catch (error) {
    console.error('SMS Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/sms/tax-deadline', async (req, res) => {
  try {
    const { phone, deadline, amount } = req.body;
    const message = `🚨 Tax Deadline Alert!\n\nYour tax payment of ₹${amount.toLocaleString('en-IN')} is due on ${deadline}.\n\nDon't miss the deadline!\n- Paylockr`;

    if (!twilioClient) {
      console.log(`📱 [DEMO] Tax deadline SMS to ${phone}`);
      return res.json({ success: true, demo: true });
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    res.json({ success: true, sid: result.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/sms/payment-confirmation', async (req, res) => {
  try {
    const { phone, amount, transactionId } = req.body;
    const message = `✅ Payment Confirmed!\n\nAmount: ₹${amount.toLocaleString('en-IN')}\nTransaction ID: ${transactionId}\nDate: ${new Date().toLocaleDateString('en-IN')}\n\nThank you!\n- Paylockr`;

    if (!twilioClient) {
      console.log(`📱 [DEMO] Payment confirmation SMS to ${phone}`);
      return res.json({ success: true, demo: true });
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    res.json({ success: true, sid: result.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/sms/otp', async (req, res) => {
  try {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const message = `🔐 Your Paylockr OTP is: ${otp}\n\nValid for 5 minutes.\nDo not share with anyone.\n\n- Paylockr`;

    if (!twilioClient) {
      console.log(`📱 [DEMO] OTP ${otp} sent to ${phone}`);
      return res.json({ success: true, demo: true, otp }); // Only for demo
    }

    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    res.json({ success: true }); // Don't send OTP in production
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ EMAIL NOTIFICATIONS ============

app.post('/api/email/send', async (req, res) => {
  try {
    const { to, subject, html, text } = req.body;

    if (!to || !subject) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    if (!process.env.SENDGRID_API_KEY) {
      console.log(`📧 [DEMO] Email to ${to}: ${subject}`);
      return res.json({ success: true, demo: true });
    }

    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject,
      text,
      html
    };

    await sgMail.send(msg);
    res.json({ success: true });
  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/email/monthly-report', async (req, res) => {
  try {
    const { email, income, expenses, taxSaved, month } = req.body;

    const html = `
      <h2>Monthly Financial Report - ${month}</h2>
      <p>Total Income: ₹${income.toLocaleString('en-IN')}</p>
      <p>Total Expenses: ₹${expenses.toLocaleString('en-IN')}</p>
      <p>Tax Saved: ₹${taxSaved.toLocaleString('en-IN')}</p>
    `;

    if (!process.env.SENDGRID_API_KEY) {
      console.log(`📧 [DEMO] Monthly report sent to ${email}`);
      return res.json({ success: true, demo: true });
    }

    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Monthly Financial Report - ${month}`,
      html
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ PAYMENT GATEWAY (RAZORPAY) ============

app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, error: 'Amount is required' });
    }

    if (!razorpay) {
      console.log(`💳 [DEMO] Payment order created: ₹${amount}`);
      return res.json({
        success: true,
        demo: true,
        order: {
          id: `order_demo_${Date.now()}`,
          amount: amount,
          currency: currency,
          receipt: receipt || `receipt_${Date.now()}`,
          status: 'created'
        }
      });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay) {
      console.log(`💳 [DEMO] Payment verified: ${razorpay_payment_id}`);
      return res.json({ success: true, demo: true, verified: true });
    }

    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      res.json({ success: true, verified: true });
    } else {
      res.status(400).json({ success: false, verified: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    if (!razorpay) {
      return res.json({
        success: true,
        demo: true,
        payment: {
          id: paymentId,
          amount: 50000,
          currency: 'INR',
          status: 'captured',
          method: 'upi'
        }
      });
    }

    const payment = await razorpay.payments.fetch(paymentId);
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ TAX CALCULATIONS ============

app.post('/api/tax/calculate', (req, res) => {
  try {
    const { income, deductions = 75000, regime = 'NEW' } = req.body;

    if (!income) {
      return res.status(400).json({ success: false, error: 'Income is required' });
    }

    const taxableIncome = Math.max(0, income - deductions);
    let tax = 0;

    // New Tax Regime 2024-25
    if (taxableIncome <= 300000) {
      tax = 0;
    } else if (taxableIncome <= 700000) {
      tax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 20000 + (taxableIncome - 700000) * 0.10;
    } else if (taxableIncome <= 1200000) {
      tax = 50000 + (taxableIncome - 1000000) * 0.15;
    } else if (taxableIncome <= 1500000) {
      tax = 80000 + (taxableIncome - 1200000) * 0.20;
    } else {
      tax = 140000 + (taxableIncome - 1500000) * 0.30;
    }

    // Add 4% cess
    const cess = tax * 0.04;
    const totalTax = Math.round(tax + cess);

    res.json({
      success: true,
      calculation: {
        grossIncome: income,
        deductions: deductions,
        taxableIncome: taxableIncome,
        baseTax: Math.round(tax),
        cess: Math.round(cess),
        totalTax: totalTax,
        effectiveRate: ((totalTax / income) * 100).toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/tax/advance-tax', (req, res) => {
  try {
    const { annualTax } = req.body;

    const quarters = [
      { quarter: 'Q1', dueDate: '15-Jun', percentage: 15, amount: Math.round(annualTax * 0.15) },
      { quarter: 'Q2', dueDate: '15-Sep', percentage: 45, amount: Math.round(annualTax * 0.45) },
      { quarter: 'Q3', dueDate: '15-Dec', percentage: 75, amount: Math.round(annualTax * 0.75) },
      { quarter: 'Q4', dueDate: '15-Mar', percentage: 100, amount: annualTax }
    ];

    res.json({ success: true, quarters });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ USER DATA ============

app.post('/api/user/save-data', (req, res) => {
  try {
    const { userId, data } = req.body;
    
    // In production, save to database
    console.log(`💾 [DEMO] Saving data for user: ${userId}`);
    
    res.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/user/:userId/data', (req, res) => {
  try {
    const { userId } = req.params;
    
    // In production, fetch from database
    console.log(`📊 [DEMO] Fetching data for user: ${userId}`);
    
    res.json({
      success: true,
      data: {
        userId,
        transactions: [],
        expenses: [],
        message: 'Demo mode - no persistent storage'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ ERROR HANDLING ============

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message
  });
});

// ============ START SERVER ============

app.listen(PORT, () => {
  console.log('\n🚀 ============================================');
  console.log(`   Paylockr Backend API`);
  console.log('   ============================================');
  console.log(`   🌐 Server: http://localhost:${PORT}`);
  console.log(`   📊 Health: http://localhost:${PORT}/api/health`);
  console.log('   ============================================\n');
});
