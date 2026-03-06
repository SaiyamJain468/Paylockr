// Made by Saiyam Jain - https://github.com/saiyamjain468
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('paylockr_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('paylockr_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('paylockr_cookie_consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
          <p>
            🍪 We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
            <a 
              href="/PRIVACY_POLICY.md" 
              target="_blank"
              className="text-cyan-500 hover:text-cyan-600 underline"
            >
              Learn more
            </a>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Accept
          </button>
          <button
            onClick={declineCookies}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
