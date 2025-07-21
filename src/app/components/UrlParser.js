'use client';

import { useState } from 'react';
import { 
  Link, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight,
  Info,
  Zap
} from 'lucide-react';
import { parseUrlQueryParams } from '../../lib/form-helpers.js';
import { validateAndNormalizeUrl } from '../../lib/url-encoder.js';

export default function UrlParser({ onParseUrl, onParseParams }) {
  const [inputUrl, setInputUrl] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState('');

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setInputUrl(url);
    setParsedData(null);
    setError('');
  };

  const handleParse = () => {
    if (!inputUrl.trim()) {
      setError('Please enter a URL to parse');
      return;
    }

    setIsParsing(true);
    setError('');

    try {
      // Validate and normalize the URL
      const urlValidation = validateAndNormalizeUrl(inputUrl);
      if (!urlValidation.isValid) {
        setError(urlValidation.error);
        setIsParsing(false);
        return;
      }

      // Parse query parameters
      const params = parseUrlQueryParams(urlValidation.normalizedUrl);
      
      // Extract base URL (without query parameters)
      const urlObj = new URL(urlValidation.normalizedUrl);
      const baseUrl = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;

      const result = {
        baseUrl,
        params,
        originalUrl: urlValidation.normalizedUrl
      };

      setParsedData(result);
    } catch (error) {
      setError('Failed to parse URL. Please check the format.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleApplyBaseUrl = () => {
    if (parsedData?.baseUrl) {
      onParseUrl(parsedData.baseUrl);
    }
  };

  const handleApplyParams = () => {
    if (parsedData?.params) {
      onParseParams(parsedData.params);
    }
  };

  const handleApplyAll = () => {
    console.log('Parsed Data', parsedData);
    if (parsedData) {
      onParseUrl(parsedData.baseUrl);
      onParseParams(parsedData.params);
    }
  };

  const getInputClasses = () => {
    let baseClasses = "w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
    
    if (error) {
      return `${baseClasses} border-red-300 bg-red-50`;
    }
    
    if (parsedData) {
      return `${baseClasses} border-green-300 bg-green-50`;
    }
    
    return `${baseClasses} border-gray-300`;
  };

  const getIconColor = () => {
    if (error) {
      return "text-red-400";
    }
    
    if (parsedData) {
      return "text-green-400";
    }
    
    return "text-gray-400";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <Link className="h-5 w-5 text-blue-500 mt-1" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">Parse Existing URL</h3>
          <p className="text-sm text-gray-600">
            Paste a complete URL to extract the base URL and query parameters automatically.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {/* URL Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className={`h-5 w-5 ${getIconColor()}`} />
          </div>
          
          <input
            type="url"
            placeholder="https://example.com/sync?param1=value1&param2=${MACRO}"
            value={inputUrl}
            onChange={handleUrlChange}
            className={getInputClasses()}
          />
          
          {/* Parse Button */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={handleParse}
              disabled={isParsing || !inputUrl.trim()}
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isParsing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Parsing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Parse
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600 flex items-center space-x-1">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </p>
        )}

        {/* Parsed Results */}
        {parsedData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h4 className="text-sm font-medium text-green-900">URL Parsed Successfully</h4>
            </div>

            {/* Base URL */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-green-800">Base URL:</label>
              </div>
              <div className="bg-white border border-green-200 rounded px-3 py-2 text-sm font-mono text-green-900 break-all">
                {parsedData.baseUrl}
              </div>
            </div>

            {/* Query Parameters */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-green-800">
                  Query Parameters ({parsedData.params.length}):
                </label>
                <button
                  type="button"
                  onClick={handleApplyParams}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Apply to Query Parameters Form
                </button>
              </div>
              
              {parsedData.params.length > 0 ? (
                <div className="bg-white border border-green-200 rounded p-3 space-y-2">
                  {parsedData.params.map((param, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-green-900">{param.name}</span>
                        <ArrowRight className="h-3 w-3 text-green-600" />
                        <span className={`font-mono ${param.isMacro ? 'text-blue-600' : 'text-green-900'}`}>
                          {param.value}
                        </span>
                        {param.isMacro && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Macro
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-green-200 rounded px-3 py-2 text-sm text-gray-500">
                  No query parameters found
                </div>
              )}
            </div>

            {/* Apply All Button */}
            <div className="pt-2 border-t border-green-200">
              <button
                type="button"
                onClick={handleApplyAll}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Apply All to Form
              </button>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">URL Parsing Features</h4>
              <div className="mt-2 text-sm text-blue-800">
                <ul className="space-y-1">
                  <li>• Automatically detects and validates URL format</li>
                  <li>• Extracts base URL and separates query parameters</li>
                  <li>• Identifies server-side macros (${"{MACRO}"}, %%MACRO%%, {"{MACRO}"})</li>
                  <li>• Preserves parameter order and values exactly as provided</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 