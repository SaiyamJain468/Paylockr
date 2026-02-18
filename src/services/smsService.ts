// SMS Service - Calls backend API
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export const sendTaxDeadlineSMS = async (phoneNumber: string, deadline: string, amount: number) => {
  try {
    const response = await fetch(`${API_URL}/api/sms/tax-deadline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phoneNumber, deadline, amount })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('SMS send failed:', error);
    return { success: false, error };
  }
};

export const sendPaymentConfirmationSMS = async (phoneNumber: string, amount: number, transactionId: string) => {
  try {
    const response = await fetch(`${API_URL}/api/sms/payment-confirmation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phoneNumber, amount, transactionId })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('SMS send failed:', error);
    return { success: false, error };
  }
};

export const send2FAOTP = async (phoneNumber: string) => {
  try {
    const response = await fetch(`${API_URL}/api/sms/otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phoneNumber })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('OTP send failed:', error);
    return { success: false, error };
  }
};

export const sendVaultUnlockAlert = async (phoneNumber: string, amount: number) => {
  try {
    const message = `⚠️ Vault Unlock Alert!\n\nAmount withdrawn: ₹${amount.toLocaleString('en-IN')}\nTime: ${new Date().toLocaleTimeString('en-IN')}\n\nIf this wasn't you, contact support immediately.\n- Paylockr`;
    
    const response = await fetch(`${API_URL}/api/sms/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: phoneNumber, message })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('SMS send failed:', error);
    return { success: false, error };
  }
};

// Server-side implementation example (for reference)
/*
// backend/smsService.js
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendSMS(to, message) {
  return await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to
  });
}
*/
