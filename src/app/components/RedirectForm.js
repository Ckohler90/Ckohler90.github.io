'use client';

import {CircleCheckBig, Settings, Eye} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirectUrlSchema } from '../../lib/validators.js';
import { 
  createEmptyQueryParam, 
  getQueryParamPresets, 
  buildFinalUrl,
  validateFormData,
  encodeCompleteUrlWithParams
} from '../../lib/form-helpers.js';
import UrlInput from './UrlInput.js';
import UrlParser from './UrlParser.js';
import QueryParamBuilder from './QueryParamBuilder.js';
import PreviewPanel from './PreviewPanel.js';

/**
 * @typedef {Object} QueryParam
 * @property {string} name - Parameter name
 * @property {string} value - Parameter value or macro
 * @property {boolean} isMacro - Whether the value is a server-side macro
 */

/**
 * @typedef {Object} FormData
 * @property {string} redirectUrl - Base redirect URL
 * @property {QueryParam[]} queryParams - Additional query parameters
 * @property {number|null} cookieParamIndex - Index of the parameter to use for cookie value
 */

export default function RedirectForm() {
  const [queryParams, setQueryParams] = useState([createEmptyQueryParam()]);
  const [cookieParamIndex, setCookieParamIndex] = useState(null);
  const [builtUrl, setBuiltUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues
  } = useForm({
    resolver: zodResolver(redirectUrlSchema),
    defaultValues: {
      redirectUrl: '',
      queryParams: []
    },
    mode: 'onChange'
  });

  // Watch form values for real-time URL building
  const watchedValues = watch();

  // Build URL in real-time as user types
  useEffect(() => {
    const buildUrl = async () => {
      setIsBuilding(true);
      
      try {
        const redirectUrl = watchedValues.redirectUrl || '';
        // Check if the URL contains query parameters (indicates a complete URL)
        const hasQueryParams = redirectUrl.includes('?') && redirectUrl.includes('=');

        if (hasQueryParams) {
          // Handle complete URL with query parameters
          const result = encodeCompleteUrlWithParams(redirectUrl, true);
          
          if (result.isValid) {
            setBuiltUrl(result.url);
            setUrlError('');
          } else {
            setBuiltUrl('');
            setUrlError(result.error || 'Invalid URL format');
          }
        } else {
          // Handle base URL with separate query parameters
          const formData = {
            redirectUrl: redirectUrl,
            queryParams: queryParams.filter(param => param.name.trim() !== ''),
            cookieParamIndex: cookieParamIndex
          };

          const result = buildFinalUrl(formData);
          if (result.isValid) {
            setBuiltUrl(result.url);
            setUrlError('');
          } else {
            setBuiltUrl('');
            setUrlError(result.error || 'Invalid form data');
          }
        }
      } catch (error) {
        setBuiltUrl('');
        setUrlError(error.message);
      } finally {
        setIsBuilding(false);
      }
    };

    // Debounce URL building
    const timeoutId = setTimeout(buildUrl, 300);
    return () => clearTimeout(timeoutId);
  }, [watchedValues, queryParams, cookieParamIndex]);

  const handleAddQueryParam = () => {
    setQueryParams(prev => [...prev, createEmptyQueryParam()]);
  };

  const handleRemoveQueryParam = (index) => {
    setQueryParams(prev => prev.filter((_, i) => i !== index));
    
    // Update cookie parameter index if the removed parameter was selected
    if (cookieParamIndex === index) {
      setCookieParamIndex(null);
    } else if (cookieParamIndex !== null && cookieParamIndex > index) {
      // Adjust index if we removed a parameter before the selected one
      setCookieParamIndex(cookieParamIndex - 1);
    }
  };

  const handleUpdateQueryParam = (index, updates) => {
    setQueryParams(prev => 
      prev.map((param, i) => 
        i === index ? { ...param, ...updates } : param
      )
    );
  };

  const handleAddPreset = (preset) => {
    const newParam = {
      name: preset.name,
      value: preset.defaultValue,
      isMacro: preset.isMacro
    };
    setQueryParams(prev => [...prev, newParam]);
  };

  const handleCookieParamChange = (index) => {
    setCookieParamIndex(index);
    
    // Check if the selected parameter's value is already $UID, and if not, set it to $UID
    if (index !== null && queryParams[index]) {
      const currentParam = queryParams[index];
      if (currentParam.value !== '$UID') {
        handleUpdateQueryParam(index, {
          value: '$UID',
          isMacro: true
        });
      } else if (currentParam.value === '$UID') {
        handleUpdateQueryParam(index, {
          isMacro: true
        });
      }
    }
  };

  const handleParseUrl = (baseUrl) => {
    setValue('redirectUrl', baseUrl);
  };

  const handleParseParams = (params) => {
    // Clear existing parameters and add the parsed ones
    setQueryParams(params.map(param => ({
      name: param.name,
      value: param.value,
      isMacro: param.isMacro
    })));
    // Reset cookie parameter selection when parsing new parameters
    setCookieParamIndex(null);
  };


  const onSubmit = (data) => {
    const formData = {
      ...data,
      queryParams: queryParams.filter(param => param.name.trim() !== ''),
      cookieParamIndex: cookieParamIndex
    };
    
    const validation = validateFormData(formData);
    if (validation.isValid) {
      // Form is valid, user can copy the URL
      console.log('Form submitted successfully:', formData);
      console.log('Built URL:', builtUrl);
    } else {
      console.log('Form validation errors:', validation.errors);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Redirect Query Parameter Builder
        </h1>
        <p className="text-gray-600">
          Build and validate redirect URLs with proper query parameter encoding for user-sync pixels
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 0: URL Parser (Optional) */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Eye className="w-8 h-8 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-900">Parse URL & Select Cookie Parameter</h2>
          </div>
          
          <UrlParser
            onParseUrl={handleParseUrl}
            onParseParams={handleParseParams}
            onParseCookieParam={handleCookieParamChange}
          />
        </div>

        {/* Step 3: Preview & Validation */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <CircleCheckBig className="w-8 h-8 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900">Preview & Validation</h2>
          </div>  
          <PreviewPanel
            url={builtUrl}
            error={urlError}
            isBuilding={isBuilding}
          />
        </div>

        {/* Step 2: Advanced Settings (Query Parameters & Cookie Selection) */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="w-8 h-8 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Advanced Settings</h2>
              <span className="text-sm text-gray-500 font-normal">(Optional)</span>
            </div>
            <button
              type="button"
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>{showAdvancedSettings ? 'Hide' : 'Show'} Additional Parameters</span>
              <svg 
                className={`w-4 h-4 transition-transform ${showAdvancedSettings ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {showAdvancedSettings && (
            <div className="pt-4 border-t border-gray-100">
              <QueryParamBuilder
                queryParams={queryParams}
                onAdd={handleAddQueryParam}
                onRemove={handleRemoveQueryParam}
                onUpdate={handleUpdateQueryParam}
                onAddPreset={handleAddPreset}
                presets={getQueryParamPresets()}
              />
            </div>
          )}
        </div>

        
      </form>
    </div>
  );
}
