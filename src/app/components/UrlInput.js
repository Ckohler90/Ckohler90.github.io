'use client';

import { useState } from 'react';
import { Globe, AlertCircle, CheckCircle } from 'lucide-react';
import { validateAndNormalizeUrl } from '../../lib/url-encoder.js';

export default function UrlInput({ register, error, placeholder = "https://example.com/sync" }) {
  const [validationState, setValidationState] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Real-time validation
    if (value.trim()) {
      const validation = validateAndNormalizeUrl(value);
      setValidationState(validation);
    } else {
      setValidationState(null);
    }
  };

  const getInputClasses = () => {
    let baseClasses = "w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
    
    if (error) {
      return `${baseClasses} border-red-300 bg-red-50`;
    }
    
    if (validationState?.isValid) {
      return `${baseClasses} border-green-300 bg-green-50`;
    }
    
    if (validationState && !validationState.isValid) {
      return `${baseClasses} border-red-300 bg-red-50`;
    }
    
    return `${baseClasses} border-gray-300`;
  };

  const getIconColor = () => {
    if (error || (validationState && !validationState.isValid)) {
      return "text-red-400";
    }
    
    if (validationState?.isValid) {
      return "text-green-400";
    }
    
    return "text-gray-400";
  };

  return (
    <div className="space-y-2">
      <label htmlFor="redirectUrl" className="block text-sm font-medium text-gray-700">
        Redirect URL *
      </label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Globe className={`h-5 w-5 ${getIconColor()}`} />
        </div>
        
        <input
          id="redirectUrl"
          type="url"
          placeholder={placeholder}
          className={getInputClasses()}
          {...register('redirectUrl', {
            onChange: handleInputChange
          })}
        />
        
        {/* Validation indicator */}
        {(validationState || error) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {error || (validationState && !validationState.isValid) ? (
              <AlertCircle className="h-5 w-5 text-red-400" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-400" />
            )}
          </div>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error.message}</span>
        </p>
      )}
      
      {/* Validation message */}
      {validationState && !validationState.isValid && !error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <AlertCircle className="h-4 w-4" />
          <span>{validationState.error}</span>
        </p>
      )}
      
      {/* Success message */}
      {validationState?.isValid && !error && (
        <p className="text-sm text-green-600 flex items-center space-x-1">
          <CheckCircle className="h-4 w-4" />
          <span>Valid URL format</span>
        </p>
      )}
      
      {/* Help text */}
      <p className="text-sm text-gray-500">
        Enter the base URL where users will be redirected for cookie synchronization.
        Must use HTTP or HTTPS protocol.
      </p>
    </div>
  );
}
