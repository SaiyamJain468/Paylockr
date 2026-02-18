const twilio = require('twilio');
require('dotenv').config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function testTwilio() {
  console.log('🧪 Testing Twilio SMS...\n');
  
  console.log('Account SID:', process.env.TWILIO_ACCOUNT_SID);
  console.log('Phone Number:', process.env.TWILIO_PHONE_NUMBER);
  console.log('');

  // Get your verified phone number
  const toNumber = process.argv[2];
  
  if (!toNumber) {
    console.log('❌ Please provide your verified phone number:');
    console.log('   node test-twilio.js +919876543210');
    console.log('');
    console.log('⚠️  Note: In trial mode, you can only send to verified numbers.');
    console.log('   Verify at: https://console.twilio.com/us1/develop/phone-numbers/manage/verified');
    process.exit(1);
  }

  try {
    console.log(`📱 Sending test SMS to ${toNumber}...`);
    
    const message = await client.messages.create({
      body: '🎉 Twilio Test Successful!\n\nYour Paylockr backend is working!\n\n- Paylockr Team',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: toNumber
    });

    console.log('✅ SMS Sent Successfully!');
    console.log('Message SID:', message.sid);
    console.log('Status:', message.status);
    console.log('');
    console.log('📱 Check your phone for the SMS!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 21608) {
      console.log('');
      console.log('⚠️  This number is not verified for trial account.');
      console.log('   Verify at: https://console.twilio.com/us1/develop/phone-numbers/manage/verified');
    }
  }
}

testTwilio();
