// Comprehensive API Key Checker and Tester
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface APITestResult {
  service: string;
  status: 'success' | 'error' | 'missing';
  message: string;
  key?: string;
  error?: string;
}

export const testAllAPIs = async (): Promise<APITestResult[]> => {
  const results: APITestResult[] = [];

  // 1. Test Gemini API
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!geminiKey) {
    results.push({
      service: 'Gemini AI',
      status: 'missing',
      message: 'API key not found in .env.local',
    });
  } else {
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent('test');
      const response = await result.response;
      
      results.push({
        service: 'Gemini AI',
        status: 'success',
        message: '✅ Working - AI features enabled',
        key: `${geminiKey.slice(0, 8)}...${geminiKey.slice(-4)}`,
      });
    } catch (error: any) {
      results.push({
        service: 'Gemini AI',
        status: 'error',
        message: '❌ Invalid or expired key',
        key: `${geminiKey.slice(0, 8)}...${geminiKey.slice(-4)}`,
        error: error.message,
      });
    }
  }

  // 2. Test Groq API
  const groqKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!groqKey) {
    results.push({
      service: 'Groq AI',
      status: 'missing',
      message: 'Optional - Using Gemini only',
    });
  } else {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { Authorization: `Bearer ${groqKey}` },
      });
      
      if (response.ok) {
        results.push({
          service: 'Groq AI',
          status: 'success',
          message: '✅ Working - Fast AI enabled',
          key: `${groqKey.slice(0, 8)}...${groqKey.slice(-4)}`,
        });
      } else {
        throw new Error('Invalid API key');
      }
    } catch (error: any) {
      results.push({
        service: 'Groq AI',
        status: 'error',
        message: '❌ Invalid key - Using Gemini fallback',
        key: `${groqKey.slice(0, 8)}...${groqKey.slice(-4)}`,
        error: error.message,
      });
    }
  }

  // 3. Test Firebase
  const firebaseKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const firebaseProject = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  
  if (!firebaseKey || !firebaseProject) {
    results.push({
      service: 'Firebase',
      status: 'missing',
      message: 'Optional - Using local storage',
    });
  } else {
    results.push({
      service: 'Firebase',
      status: 'success',
      message: '✅ Configured - Auth & Database ready',
      key: `Project: ${firebaseProject}`,
    });
  }

  // 4. Test EmailJS
  const emailKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const emailService = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  
  if (!emailKey || !emailService) {
    results.push({
      service: 'EmailJS',
      status: 'missing',
      message: 'Optional - Email notifications disabled',
    });
  } else {
    results.push({
      service: 'EmailJS',
      status: 'success',
      message: '✅ Configured - Email notifications ready',
      key: `Service: ${emailService}`,
    });
  }

  // 5. Test Backend Service
  const backendUrl = import.meta.env.VITE_DOCUMENT_SERVICE_URL || 'http://localhost:3001';
  try {
    const response = await fetch(`${backendUrl}/health`, { 
      method: 'GET',
      signal: AbortSignal.timeout(3000)
    });
    
    if (response.ok) {
      results.push({
        service: 'Backend Service',
        status: 'success',
        message: '✅ Running - Document processing available',
        key: backendUrl,
      });
    } else {
      throw new Error('Service not responding');
    }
  } catch (error: any) {
    results.push({
      service: 'Backend Service',
      status: 'error',
      message: '⚠️ Not running - Start with: npm run backend',
      key: backendUrl,
      error: 'Connection failed',
    });
  }

  return results;
};

export const getAPIKeyRecommendations = (results: APITestResult[]): string[] => {
  const recommendations: string[] = [];
  
  const gemini = results.find(r => r.service === 'Gemini AI');
  if (gemini?.status !== 'success') {
    recommendations.push('🔴 CRITICAL: Add Gemini API key for AI features - Get free key at https://makersuite.google.com/app/apikey');
  }
  
  const groq = results.find(r => r.service === 'Groq AI');
  if (groq?.status === 'missing') {
    recommendations.push('🟡 OPTIONAL: Add Groq API key for faster AI responses - Get free key at https://console.groq.com/keys');
  }
  
  const firebase = results.find(r => r.service === 'Firebase');
  if (firebase?.status === 'missing') {
    recommendations.push('🟡 OPTIONAL: Setup Firebase for user authentication and cloud database');
  }
  
  const email = results.find(r => r.service === 'EmailJS');
  if (email?.status === 'missing') {
    recommendations.push('🟢 OPTIONAL: Setup EmailJS for email notifications');
  }
  
  const backend = results.find(r => r.service === 'Backend Service');
  if (backend?.status === 'error') {
    recommendations.push('🟡 OPTIONAL: Start backend service for advanced document processing');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('✅ All services configured correctly!');
  }
  
  return recommendations;
};
