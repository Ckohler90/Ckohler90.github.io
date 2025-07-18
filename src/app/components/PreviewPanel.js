'use client';

import { useState } from 'react';
import { 
  Eye, 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  ExternalLink,
  Code
} from 'lucide-react';
import { formatUrlForDisplay, encodeCompleteUrlWithParams } from '../../lib/form-helpers.js';
import CopyButton from './CopyButton.js';

export default function PreviewPanel({ url, error, isBuilding }) {
  const [showRaw, setShowRaw] = useState(false);
  
  const hasUrl = url && url.trim() !== '';
  const hasError = error && error.trim() !== '';

  const decodedUrl = hasUrl ? decodeURIComponent(url) : '';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Eye className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">URL Preview</span>
        </div>
        
        {hasUrl && (
          <div className="flex items-center space-x-2">
            {/* Raw/Decoded Toggle */}
            <button
              type="button"
              onClick={() => setShowRaw(!showRaw)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                showRaw
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Code className="h-3 w-3 mr-1" />
              {showRaw ? 'Encoded' : 'Decoded'}
            </button>
          </div>
        )}
      </div>

      {/* Status Indicator */}
      <div className="flex items-center space-x-2">
        {isBuilding ? (
          <div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Building URL...</span>
          </div>
        ) : hasError ? (
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Validation Error</span>
          </div>
        ) : hasUrl ? (
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">URL Valid & {url.includes('%') && url.includes('://') ? 'Fully Encoded' : 'Reserved Chars Encoded'}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-gray-500">
            <Eye className="h-4 w-4" />
            <span className="text-sm">Enter details above to generate URL</span>
          </div>
        )}
      </div>

      {/* URL Display */}
      <div className="border border-gray-200 rounded-lg">
        {hasError ? (
          /* Error State */
          <div className="p-4 bg-red-50 border-red-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-900">Validation Error</h4>
                <p className="text-sm text-red-800 mt-1">{error}</p>
              </div>
            </div>
          </div>
        ) : hasUrl ? (
          /* URL Display */
          <div className="bg-gray-50">
            {/* URL */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between space-x-3">
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm break-all text-gray-900 leading-relaxed">
                    {showRaw ? encodeCompleteUrlWithParams(decodedUrl).url : decodedUrl}
                    {console.log("URL ", url)}
                    {console.log("Decoded URL ", decodedUrl)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* URL Statistics */}
            <div className="px-4 py-3 bg-white border-b border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {url.length}
                  </div>
                  <div className="text-xs text-gray-500">Characters</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {(url.match(/&/g) || []).length + 1}
                  </div>
                  <div className="text-xs text-gray-500">Parameters</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {(url.match(/(\$\{[^}]+\}|%%[^%]+%%|\{[^}]+\})/g) || []).length}
                  </div>
                  <div className="text-xs text-gray-500">Server Macros</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {(url.match(/%[0-9A-F]{2}/g) || []).length}
                  </div>
                  <div className="text-xs text-gray-500">Reserved Chars</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-white space-y-3">
              <div className="flex flex-wrap gap-2">
                <CopyButton 
                  text={url}
                  variant="primary"
                  label="Copy Final URL"
                />
                
                <CopyButton 
                  text={decodedUrl}
                  variant="secondary"
                  label="Copy Decoded URL"
                />
                
                <button
                  type="button"
                  onClick={() => {
                    try {
                      // Extract just the domain for testing
                      const urlObj = new URL(url);
                      const testUrl = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
                      window.open(testUrl, '_blank', 'noopener,noreferrer');
                    } catch (e) {
                      console.error('Invalid URL for testing:', e);
                    }
                  }}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Test Domain
                </button>
              </div>
              
              <p className="text-xs text-gray-500">
                Use "Copy Final URL" for production. Test the domain first to ensure it's accessible.
              </p>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="p-8 text-center bg-gray-50">
            <Eye className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">No URL Generated</h3>
            <p className="text-sm text-gray-500">
              Fill in the form above to see your redirect URL preview
            </p>
          </div>
        )}
      </div>

      {/* Help Text */}
      {hasUrl && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <h4 className="text-sm font-medium text-green-900 mb-1">Ready to Use</h4>
          <div className="text-xs text-green-800 space-y-1">
            <p>• Complete URLs are fully encoded while preserving server-side macros</p>
            <p>• Base URLs with separate parameters only encode reserved characters: ! * ' ( ) ; : @ & = + $ , / ? % # [ ]</p>
            <p>• Server-side macros are completely ignored and left unencoded</p>
            <p>• Copy the "Final URL" and use it in your user-sync pixel configuration</p>
          </div>
        </div>
      )}
    </div>
  );
}
