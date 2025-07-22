'use client';

import { useState } from 'react';
import { 
  Link, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight,
  Info,
  Zap,
  Cookie,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { parseUrlQueryParams } from '../../lib/form-helpers.js';
import { validateAndNormalizeUrl } from '../../lib/url-encoder.js';

export default function UrlParser({ onParseUrl, onParseParams, onParseCookieParam }) {
  const [inputUrl, setInputUrl] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [selectedCookieParamIndex, setSelectedCookieParamIndex] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState('');
  const [showInfoBanner, setShowInfoBanner] = useState(false);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setInputUrl(url);
    setParsedData(null);
    setSelectedCookieParamIndex(null);
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
      if(result.params.length === 0){
        setError('No query parameters found. Add at least one query parameter to hold the Sovrn cookie.');
        setIsParsing(false);
        return;
      }
      setSelectedCookieParamIndex(null); // Reset cookie param selection
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

  const handleCookieParamChange = (index) => {
    setSelectedCookieParamIndex(index);
    
    // Update the parameter value to $UID if it's not already
    if (index !== null && parsedData?.params[index]) {
      const updatedParams = [...parsedData.params];
      if (updatedParams[index].value !== '$UID') {
        updatedParams[index] = {
          ...updatedParams[index],
          value: '$UID',
          isMacro: true
        };
      } else {
        updatedParams[index] = {
          ...updatedParams[index],
          isMacro: true
        };
      }
      setParsedData(prev => ({
        ...prev,
        params: updatedParams
      }));
    }
  };

  const handleApplyAll = () => {
    if (parsedData) {
      onParseUrl(parsedData.baseUrl);
      onParseParams(parsedData.params);
      if (onParseCookieParam && selectedCookieParamIndex !== null) {
        onParseCookieParam(selectedCookieParamIndex);
      }
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
        <button
          type="button"
          onClick={() => setShowInfoBanner(!showInfoBanner)}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          aria-label={showInfoBanner ? 'Hide parsing features info' : 'Show parsing features info'}
        >
          <Info className="h-4 w-4 mr-1" />
          <span className="text-sm">Info</span>
          {showInfoBanner ? (
            <ChevronUp className="h-4 w-4 ml-1" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-1" />
          )}
        </button>
      </div>

      {showInfoBanner && (
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
                  <li>• Select cookie parameter and apply everything at once</li>
                  <li>• Preserves parameter order and values exactly as provided</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

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

            {/* Cookie Parameter Selection */}
            {parsedData.params.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Cookie className="h-4 w-4 text-blue-500" />
                  <h4 className="text-sm font-medium text-green-800">Cookie Parameter Selection</h4>
                </div>
                <p className="text-sm text-green-700">
                  Select which query parameter should be used to pass the Sovrn third-party cookie value:
                </p>
                <div className="bg-white border border-green-200 rounded p-3 space-y-2">
                  {parsedData.params.map((param, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded">
                      <input
                        type="radio"
                        name="cookieParam"
                        value={index}
                        checked={selectedCookieParamIndex === index}
                        onChange={(e) => handleCookieParamChange(parseInt(e.target.value))}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2 flex-1">
                        <span className="text-sm font-medium text-gray-900">{param.name}</span>
                        <ArrowRight className="h-3 w-3 text-gray-600" />
                        <span className={`text-sm font-mono ${
                          selectedCookieParamIndex === index && param.value === '$UID'
                            ? 'text-blue-600 font-semibold' 
                            : param.isMacro 
                              ? 'text-blue-600' 
                              : 'text-gray-900'
                        }`}>
                          {selectedCookieParamIndex === index && param.value !== '$UID' ? '$UID' : param.value}
                        </span>
                        {(param.isMacro || selectedCookieParamIndex === index) && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Macro
                          </span>
                        )}
                        {selectedCookieParamIndex === index && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            <Cookie className="h-3 w-3 mr-1" />
                            Cookie Param
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                {selectedCookieParamIndex === null && (
                  <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded p-2">
                    Please select a parameter to use for the cookie value before applying to form.
                  </p>
                )}
              </div>
            )}

            {parsedData.params.length === 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-800">Query Parameters:</label>
                <div className="bg-white border border-green-200 rounded px-3 py-2 text-sm text-gray-500">
                  No query parameters found
                </div>
              </div>
            )}

            {/* Apply All Button */}
            <div className="pt-2 border-t border-green-200">
              <button
                type="button"
                onClick={handleApplyAll}
                disabled={parsedData.params.length > 0 && selectedCookieParamIndex === null}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Apply All to Form
                {parsedData.params.length > 0 && selectedCookieParamIndex !== null && (
                  <span className="ml-2 text-xs bg-green-500 px-2 py-0.5 rounded">
                    + Cookie Selection
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 