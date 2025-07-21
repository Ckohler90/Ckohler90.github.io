'use client';

import { useState } from 'react';
import { Copy, CheckCircle, AlertCircle } from 'lucide-react';

export default function CopyButton({ 
  text, 
  variant = 'default', 
  label = 'Copy',
  className = '' 
}) {
  const [copyState, setCopyState] = useState('idle'); // 'idle', 'success', 'error'

  const handleCopy = async () => {
    if (!text) return;
    console.log("text", text);
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('success');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (error) {
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 2000);
      
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopyState('success');
        setTimeout(() => setCopyState('idle'), 2000);
      } catch (fallbackError) {
        console.error('Copy failed:', fallbackError);
      }
    }
  };

  const getButtonClasses = () => {
    const baseClasses = "inline-flex items-center px-3 py-2 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 transition-colors";
    
    if (variant === 'primary') {
      return `${baseClasses} border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 ${className}`;
    }
    
    if (variant === 'secondary') {
      return `${baseClasses} border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500 ${className}`;
    }
    
    // Default variant
    return `${baseClasses} border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500 ${className}`;
  };

  const getIcon = () => {
    switch (copyState) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Copy className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (copyState) {
      case 'success':
        return 'Copied!';
      case 'error':
        return 'Failed';
      default:
        return label;
    }
  };

  const getTextColor = () => {
    if (variant === 'primary') {
      switch (copyState) {
        case 'success':
          return 'text-green-100';
        case 'error':
          return 'text-red-100';
        default:
          return 'text-white';
      }
    }
    
    // For secondary and default variants
    switch (copyState) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text || copyState === 'success'}
      className={`${getButtonClasses()} ${getTextColor()} ${
        !text ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      title={`Copy ${label.toLowerCase()} to clipboard`}
    >
      {getIcon()}
      <span className="ml-2">{getLabel()}</span>
    </button>
  );
}
