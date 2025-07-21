import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div
          className="flex h-screen flex-col items-center justify-center gap-4 p-4"
          data-testid="app-fallback"
        >
          <img
            src="/images/errorboundary.png"
            alt="Error Illustration"
            className="h-48"
          />
          <h2 className="mb-2 text-3xl font-bold text-rose-600">
            Oh, no! What you&apos;ve done?
          </h2>
          <p className="text-lg font-thin">
            Just kidding! The error was simulated successfully.
          </p>
          <button
            className="btn btn-cyan"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return children;
  }
}
