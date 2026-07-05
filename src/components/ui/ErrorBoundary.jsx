import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-white text-3xl md:text-5xl font-serif mb-4">Something went wrong.</h1>
          <p className="text-white/60 mb-8 max-w-md">We apologize for the inconvenience. An unexpected error occurred while rendering the page.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="border border-[#c8a96b]/40 text-[#c8a96b] px-8 py-3 tracking-[0.2em] uppercase text-xs transition-all duration-500 rounded-full hover:bg-[#c8a96b] hover:text-black"
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
