import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { testAllAPIs, getAPIKeyRecommendations, APITestResult } from '../../utils/apiTester';

export const APIStatusDashboard: React.FC = () => {
  const [results, setResults] = useState<APITestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const runTests = async () => {
    setLoading(true);
    try {
      const testResults = await testAllAPIs();
      setResults(testResults);
      setRecommendations(getAPIKeyRecommendations(testResults));
    } catch (error) {
      console.error('API test failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'missing':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'missing':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-black border-l-8 border-cyan-500 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-black uppercase text-black dark:text-white">API STATUS</h3>
          <p className="text-xs font-bold uppercase text-gray-500 mt-1">REAL-TIME SERVICE HEALTH CHECK</p>
        </div>
        <button
          onClick={runTests}
          disabled={loading}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold uppercase text-xs transition flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'TESTING...' : 'REFRESH'}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
          <span className="ml-3 text-sm font-bold uppercase text-gray-500">Testing all APIs...</span>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={`border-l-4 p-4 ${getStatusColor(result.status)}`}
              >
                <div className="flex items-start gap-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <h4 className="font-black uppercase text-black dark:text-white text-sm mb-1">
                      {result.service}
                    </h4>
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">
                      {result.message}
                    </p>
                    {result.key && (
                      <p className="text-xs font-mono text-gray-500 dark:text-gray-500">
                        {result.key}
                      </p>
                    )}
                    {result.error && (
                      <p className="text-xs font-bold text-red-600 dark:text-red-400 mt-1">
                        Error: {result.error}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-cyan-500 p-4">
            <h4 className="font-black uppercase text-black dark:text-white text-sm mb-3">
              📋 RECOMMENDATIONS
            </h4>
            <ul className="space-y-2">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="text-xs font-bold text-gray-600 dark:text-gray-400">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
