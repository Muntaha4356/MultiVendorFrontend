import React from 'react';
import { RxCross1 } from 'react-icons/rx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
          <div className="w-full 800px:w-[50%] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer absolute top-3 right-3"
                onClick={this.handleReset}
              />
            </div>

            <div className="text-center">
              <h2 className="text-[24px] font-[600] text-red-500 mb-4">
                Oops! Something went wrong
              </h2>
              
              <p className="text-[16px] text-[#000000a7] mb-6">
                We encountered an unexpected error. Please try again or contact support if the problem persists.
              </p>

              {process.env.NODE_ENV === 'development' && (
                <div className="bg-red-50 p-4 rounded-[5px] mb-6 text-left">
                  <p className="text-[12px] font-[600] text-red-600 mb-2">
                    Error Details (Development Only):
                  </p>
                  <p className="text-[12px] text-red-500 break-words overflow-auto max-h-[150px]">
                    {this.state.error && this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <p className="text-[12px] text-red-500 break-words overflow-auto max-h-[150px] mt-2">
                      {this.state.errorInfo.componentStack}
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="px-6 py-2 bg-[#f63b60] text-white rounded-[5px] font-[600] cursor-pointer hover:bg-[#e02850]"
                >
                  Try Again
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-2 bg-gray-300 text-[#000] rounded-[5px] font-[600] cursor-pointer hover:bg-gray-400"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
