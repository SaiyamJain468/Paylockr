import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundaryWithDiagnostics extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Check if it's an API-related error
    if (error.message.includes('API') || error.message.includes('fetch')) {
      console.error('🔴 API Error Detected - Check your API keys in .env.local');
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const isAPIError = this.state.error?.message.includes('API') || 
                        this.state.error?.message.includes('fetch') ||
                        this.state.error?.message.includes('key');

      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-900 border-4 border-red-500 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-red-500 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase text-black dark:text-white">
                  SOMETHING WENT WRONG
                </h1>
                <p className="text-xs font-bold uppercase text-gray-500 mt-1">
                  {isAPIError ? 'API CONFIGURATION ERROR' : 'APPLICATION ERROR'}
                </p>
              </div>
            </div>

            {isAPIError && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-sm font-bold text-yellow-800 dark:text-yellow-300 mb-2">
                  🔑 API KEY ISSUE DETECTED
                </p>
                <ul className="text-xs font-bold text-yellow-700 dark:text-yellow-400 space-y-1">
                  <li>• Check if VITE_GEMINI_API_KEY exists in .env.local</li>
                  <li>• Verify API key starts with "AIza"</li>
                  <li>• Restart dev server after adding keys</li>
                  <li>• Get free key: https://makersuite.google.com/app/apikey</li>
                </ul>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-800 p-4 mb-6 border-l-4 border-red-500">
              <p className="text-xs font-bold uppercase text-gray-500 mb-2">ERROR DETAILS</p>
              <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
                {this.state.error?.message}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold uppercase transition flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                RELOAD APP
              </button>
              <button
                onClick={() => window.location.href = '/help'}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white font-bold uppercase transition flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                GET HELP
              </button>
            </div>

            {import.meta.env.DEV && this.state.errorInfo && (
              <details className="mt-6">
                <summary className="text-xs font-bold uppercase text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                  STACK TRACE (DEV ONLY)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-4 overflow-auto max-h-64 font-mono">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
