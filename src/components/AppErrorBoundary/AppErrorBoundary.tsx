import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

export interface AppErrorBoundaryProps {
  children?: ReactNode;
}

export interface AppErrorBoundaryState {
  hasError: boolean;
}

export default class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleRefreshPage() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center gap-4 p-4">
          <img
            src="/images/error-boundary-bb8.webp"
            alt="Error Illustration"
            className="h-48"
          />
          <h2 className="mb-2 text-3xl font-bold text-red-600">
            Oh, no! Our shields are down.
          </h2>
          <p className="text-lg">Something went wrong.</p>
          <button className="btn btn-gray" onClick={this.handleRefreshPage}>
            Refresh Page
          </button>
        </div>
      );
    }

    return children;
  }
}
