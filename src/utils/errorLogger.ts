// Made by Saiyam Jain - https://github.com/saiyamjain468

interface ErrorLog {
  message: string;
  stack?: string;
  context?: any;
  timestamp: string;
  userId?: string;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];

  log(error: Error | string, context?: any, userId?: string) {
    const errorLog: ErrorLog = {
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      context,
      timestamp: new Date().toISOString(),
      userId
    };

    this.logs.push(errorLog);
    console.error('[ERROR]', errorLog);

    // Send to backend if available
    if (import.meta.env.VITE_DOCUMENT_SERVICE_URL) {
      fetch(`${import.meta.env.VITE_DOCUMENT_SERVICE_URL}/log-error`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorLog)
      }).catch(() => {});
    }
  }

  getLogs() {
    return this.logs;
  }

  clear() {
    this.logs = [];
  }
}

export const errorLogger = new ErrorLogger();
