// API Key Validation and Security
export const validateAPIKeys = () => {
  const keys = {
    gemini: import.meta.env.VITE_GEMINI_API_KEY,
    groq: import.meta.env.VITE_GROQ_API_KEY,
    supabase: import.meta.env.VITE_SUPABASE_URL,
    emailjs: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  };

  const validation = {
    gemini: {
      valid: keys.gemini?.startsWith('AIza') || false,
      required: true,
      message: keys.gemini ? 'Valid' : 'Missing - AI features disabled'
    },
    groq: {
      valid: keys.groq?.startsWith('gsk_') || false,
      required: false,
      message: keys.groq ? 'Valid' : 'Optional - Using Gemini only'
    },
    supabase: {
      valid: keys.supabase?.includes('supabase.co') || false,
      required: false,
      message: keys.supabase ? 'Valid' : 'Optional - Using local storage'
    },
    emailjs: {
      valid: keys.emailjs?.length > 10 || false,
      required: false,
      message: keys.emailjs ? 'Valid' : 'Optional - Email notifications disabled'
    }
  };

  return validation;
};

export const getAPIKeyStatus = () => {
  const validation = validateAPIKeys();
  const critical = validation.gemini.valid;
  const optional = Object.values(validation).filter(v => !v.required && v.valid).length;
  
  return {
    critical,
    optional,
    total: Object.keys(validation).length,
    message: critical 
      ? `✅ Core features active (${optional} optional features enabled)` 
      : '⚠️ Add Gemini API key for AI features'
  };
};

// Sanitize API keys for logging (show only first/last chars)
export const sanitizeKey = (key: string): string => {
  if (!key || key.length < 8) return '***';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
};
