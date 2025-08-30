import { Component } from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleRefresh = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="card-modern p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                <FaExclamationTriangle className="text-3xl text-red-500" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Something went wrong
            </h2>
            
            <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
              We encountered an unexpected error. This might be a temporary issue.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleRefresh}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <FaRedo />
                Try Again
              </button>
              
              <button
                onClick={this.handleReload}
                className="w-full px-4 py-2 border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-secondary)",
                }}
              >
                Reload Page
              </button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                  Error Details (Development)
                </summary>
                <pre className="text-xs p-3 bg-gray-100 dark:bg-gray-800 rounded overflow-auto max-h-40">
                  {this.state.error && this.state.error.toString()}
                  <br />
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

export default ErrorBoundary;