import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#030305] text-[#f8fafc] font-sans">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#0c0d12] border border-[#1e202d] text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold">Application Encountered an Error</h2>
            <p className="text-xs text-neutral-400 font-mono">
              {this.state.error?.message || "Unknown rendering exception"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-neutral-950 hover:bg-emerald-400 transition-colors"
            >
              Reload Interface
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
