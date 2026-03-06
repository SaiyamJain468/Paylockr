// Startup Diagnostic - Run on app initialization
export const runStartupDiagnostic = () => {
  console.log('🚀 PayLockr Startup Diagnostic');
  console.log('================================');
  
  const checks = {
    gemini: import.meta.env.VITE_GEMINI_API_KEY,
    groq: import.meta.env.VITE_GROQ_API_KEY,
    firebase: import.meta.env.VITE_FIREBASE_API_KEY,
    emailjs: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    backend: import.meta.env.VITE_DOCUMENT_SERVICE_URL,
  };

  // Critical checks
  if (!checks.gemini) {
    console.error('❌ CRITICAL: Gemini API key missing');
    console.log('   → Add VITE_GEMINI_API_KEY to .env.local');
    console.log('   → Get free key: https://makersuite.google.com/app/apikey');
  } else if (!checks.gemini.startsWith('AIza')) {
    console.error('❌ CRITICAL: Invalid Gemini API key format');
  } else {
    console.log('✅ Gemini API key configured');
  }

  // Optional checks
  if (!checks.groq) {
    console.warn('⚠️  OPTIONAL: Groq API key missing (using Gemini only)');
  } else if (!checks.groq.startsWith('gsk_')) {
    console.warn('⚠️  WARNING: Invalid Groq API key format');
  } else {
    console.log('✅ Groq API key configured');
  }

  if (!checks.firebase) {
    console.warn('⚠️  OPTIONAL: Firebase not configured (using local storage)');
  } else {
    console.log('✅ Firebase configured');
  }

  if (!checks.emailjs) {
    console.warn('⚠️  OPTIONAL: EmailJS not configured (email disabled)');
  } else {
    console.log('✅ EmailJS configured');
  }

  console.log('================================');
  console.log('💡 Visit /help and click "API Keys" for detailed status');
  console.log('================================\n');
};

// Auto-run on import in development
if (import.meta.env.DEV) {
  runStartupDiagnostic();
}
