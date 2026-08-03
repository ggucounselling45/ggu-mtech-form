import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-10 text-center text-white shadow-2xl backdrop-blur-lg">
            <h1 className="mb-5 text-5xl font-bold">
              ⚠️ Something went wrong
            </h1>

            <p className="mb-8 text-lg opacity-90">
              We're sorry, but something unexpected happened in the GGU
              Admission System.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="rounded-xl border-2 border-white/30 bg-white/20 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-white/30"
            >
              🔄 Reload Page
            </button>

            <div className="mt-8 text-sm opacity-70">
              <p>
                If this problem persists, please contact the system
                administrator.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && (
              <details className="mt-8 rounded-lg bg-black/30 p-5 text-left text-sm">
                <summary className="mb-3 cursor-pointer font-medium">
                  🔍 Error Details (Development)
                </summary>

                <pre className="whitespace-pre-wrap break-words">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
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

export default ErrorBoundary;