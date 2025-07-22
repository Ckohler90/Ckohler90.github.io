'use client';

import { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Settings, 
  Code, 
  AlertCircle, 
  ChevronDown,
  Zap,
  Cookie
} from 'lucide-react';
import { validateQueryParamName, validateQueryParamValue } from '../../lib/form-helpers.js';

export default function QueryParamBuilder({ 
  queryParams, 
  onAdd, 
  onRemove, 
  onUpdate, 
  onAddPreset, 
  presets = [],
  cookieParamIndex,
  onCookieParamChange
}) {
  const [showPresets, setShowPresets] = useState(false);

  const handleParamChange = (index, field, value) => {
    const updates = { [field]: value };
    
    // Auto-detect if value is a macro
    if (field === 'value') {
      const macroPattern = /^(\$\{[^}]+\}|%%[^%]+%%|\{[^}]+\})$/;
      updates.isMacro = value === '$UID' ? true : macroPattern.test(value);
      console.log("updates.isMacro", updates.isMacro);
         
    }
    

    onUpdate(index, updates);
  };

  const validateParam = (param) => {
    const nameValidation = validateQueryParamName(param.name);
    const valueValidation = validateQueryParamValue(param.value, param.isMacro);
    
    return {
      name: nameValidation,
      value: valueValidation
    };
  };

  return (
    <div className="space-y-4">
      {/* Header with Add and Presets buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Settings className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Query Parameters ({queryParams.length})
            {console.log("queryParams", queryParams)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Presets Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Zap className="h-4 w-4 mr-2" />
              Presets
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            
            {showPresets && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-3 border-b border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900">Common Parameters</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Add commonly used query parameters
                  </p>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {presets.map((preset, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        onAddPreset(preset);
                        setShowPresets(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {preset.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {preset.label}
                          </div>
                        </div>
                        {preset.isMacro && (
                          <Code className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Add Parameter Button */}
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Parameter
          </button>
        </div>
      </div>



      {/* Parameter List */}
      <div className="space-y-3">
        {queryParams.map((param, index) => {
          const validation = validateParam(param);
          const isCookieParam = cookieParamIndex === index;
          
          return (
            <div key={index} className={`border rounded-lg p-4 ${
              isCookieParam 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              {isCookieParam && (
                <div className="flex items-center space-x-2 mb-3 p-2 bg-blue-100 border border-blue-200 rounded text-xs">
                  <Cookie className="h-3 w-3 text-blue-500" />
                  <span className="font-medium text-blue-900">Selected as Cookie Parameter</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Parameter Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Parameter Name
                  </label>
                  <input
                    type="text"
                    placeholder="param_name"
                    value={param.name}
                    onChange={(e) => handleParamChange(index, 'name', e.target.value)}
                    className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      !validation.name.isValid && param.name
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 bg-white'
                    }`}
                  />
                  {!validation.name.isValid && param.name && (
                    <p className="text-xs text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>{validation.name.error}</span>
                    </p>
                  )}
                </div>

                {/* Parameter Value */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Value / Macro
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="${MACRO} or static value"
                      value={param.value}
                      onChange={(e) => handleParamChange(index, 'value', e.target.value)}
                      className={`w-full px-3 py-2 pr-8 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        !validation.value.isValid && param.value
                          ? 'border-red-300 bg-red-50'
                          : param.isMacro
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-gray-300 bg-white'
                      }`}
                    />
                    {param.isMacro && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Code className="h-4 w-4 text-blue-500" />
                      </div>
                    )}
                  </div>
                  {!validation.value.isValid && param.value && (
                    <p className="text-xs text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>{validation.value.error}</span>
                    </p>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-end space-x-2">
                  {/* Macro Toggle */}
                  <label className="flex items-center space-x-2 text-xs">
                    <input
                      type="checkbox"
                      checked={param.isMacro}
                      onChange={(e) => handleParamChange(index, 'isMacro', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-600">Macro</span>
                  </label>
                  
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Remove parameter"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Macro Info */}
              {param.isMacro && (
                <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                  <div className="flex items-center space-x-1">
                    <Code className="h-3 w-3 text-blue-500" />
                    <span className="font-medium text-blue-900">Server-side macro detected</span>
                  </div>
                  <p className="text-blue-800 mt-1">
                    This value will be preserved during encoding and replaced by your ad server.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {queryParams.length === 0 && (
        <div className="text-center py-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          <Settings className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">No additional query parameters</p>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-lg text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Parameter
          </button>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <h4 className="text-sm font-medium text-amber-900 mb-1">Parameter Guidelines</h4>
        <ul className="text-xs text-amber-800 space-y-1">
          <li>• Parameter names can only contain letters, numbers, underscores, and hyphens</li>
          <li>• Use server-side macros like ${"{GDPR_APPLIES}"}, %%MACRO%%, or {"{MACRO}"}</li>
          <li>• Static values will be URL-encoded automatically</li>
          <li>• Macros are preserved during encoding for server-side replacement</li>
        </ul>
      </div>
    </div>
  );
} 