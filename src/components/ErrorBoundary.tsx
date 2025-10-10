// components/ErrorBoundary.tsx
import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ error }: { error?: Error }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mb-4 text-gray-600">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          {error && (
            <details className="p-3 mb-4 text-left rounded-lg bg-red-50">
              <summary className="text-sm font-medium text-red-800 cursor-pointer">
                Error Details
              </summary>
              <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap">
                {error.message}
              </pre>
            </details>
          )}
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center w-full btn btn-primary"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Page
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center w-full btn btn-ghost"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorBoundary;