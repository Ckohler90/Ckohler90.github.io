import { COMMON_QUERY_PARAMS } from '../utils/constants.js';
import { buildCompleteUrl, validateAndNormalizeUrl, encodeCompleteUrl } from './url-encoder.js';

/**
 * Creates a new empty query parameter object
 * @returns {{name: string, value: string, isMacro: boolean}} - Empty query parameter
 */
export function createEmptyQueryParam() {
  return {
    name: '',
    value: '',
    isMacro: false
  };
}

/**
 * Creates a query parameter from a preset
 * @param {Object} preset - Preset parameter configuration
 * @returns {{name: string, value: string, isMacro: boolean}} - Query parameter
 */
export function createQueryParamFromPreset(preset) {
  return {
    name: preset.name,
    value: preset.defaultValue,
    isMacro: preset.isMacro
  };
}

/**
 * Validates query parameter name
 * @param {string} name - Parameter name to validate
 * @returns {{isValid: boolean, error?: string}} - Validation result
 */
export function validateQueryParamName(name) {
  if (!name || name.trim() === '') {
    return {
      isValid: false,
      error: 'Parameter name is required'
    };
  }
  
  // Check for valid parameter name characters
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    return {
      isValid: false,
      error: 'Parameter name can only contain letters, numbers, underscores, and hyphens'
    };
  }
  
  return { isValid: true };
}

/**
 * Validates query parameter value
 * @param {string} value - Parameter value to validate
 * @param {boolean} isMacro - Whether the value is a macro
 * @returns {{isValid: boolean, error?: string}} - Validation result
 */
export function validateQueryParamValue(value, isMacro = false) {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      error: 'Parameter value is required'
    };
  }
  
  // If it's a macro, validate macro format
  if (isMacro) {
    const macroPattern = /^(\$\{[^}]+\}|%%[^%]+%%|\{[^}]+\})$/;
    const sovrnMacro = '$UID';
    if (!macroPattern.test(value) && value !== sovrnMacro) {
      return {
        isValid: false,
        error: 'Invalid macro format. Use ${MACRO}, %%MACRO%%, or {MACRO}'
      };
    }
  }
  
  return { isValid: true };
}

/**
 * Removes duplicate query parameters by name
 * @param {Array<{name: string, value: string, isMacro: boolean}>} params - Query parameters
 * @returns {Array<{name: string, value: string, isMacro: boolean}>} - Deduplicated parameters
 */
export function deduplicateQueryParams(params) {
  const seen = new Set();
  return params.filter(param => {
    if (seen.has(param.name)) {
      return false;
    }
    seen.add(param.name);
    return true;
  });
}

/**
 * Validates the entire form data
 * @param {{redirectUrl: string, queryParams: Array, cookieParamIndex: number|null}} formData - Form data to validate
 * @returns {{isValid: boolean, errors: Object}} - Validation result with detailed errors
 */
export function validateFormData(formData) {
  const errors = {};
  let isValid = true;
  
  // Validate redirect URL
  const urlValidation = validateAndNormalizeUrl(formData.redirectUrl);
  if (!urlValidation.isValid) {
    errors.redirectUrl = urlValidation.error;
    isValid = false;
  }
  
  // Validate cookie parameter selection
  if (formData.cookieParamIndex === null || formData.cookieParamIndex === undefined) {
    errors.cookieParamIndex = 'Please select a parameter to use for the cookie value';
    isValid = false;
  } else if (formData.cookieParamIndex < 0 || formData.cookieParamIndex >= formData.queryParams.length) {
    errors.cookieParamIndex = 'Invalid cookie parameter selection';
    isValid = false;
  }
  
  // Validate query parameters
  const queryParamErrors = [];
  formData.queryParams?.forEach((param, index) => {
    const paramErrors = {};
    
    const nameValidation = validateQueryParamName(param.name);
    if (!nameValidation.isValid) {
      paramErrors.name = nameValidation.error;
    }
    
    const valueValidation = validateQueryParamValue(param.value, param.isMacro);
    if (!valueValidation.isValid) {
      paramErrors.value = valueValidation.error;
    }
    
    if (Object.keys(paramErrors).length > 0) {
      queryParamErrors[index] = paramErrors;
      isValid = false;
    }
  });
  
  if (queryParamErrors.length > 0) {
    errors.queryParams = queryParamErrors;
  }
  
  return { isValid, errors };
}

/**
 * Builds the final URL from form data
 * @param {{redirectUrl: string, queryParams: Array, cookieParamIndex: number|null}} formData - Form data
 * @returns {{url: string, isValid: boolean, error?: string}} - Built URL result
 */
export function buildFinalUrl(formData) {
  // Validate form data first
  const validation = validateFormData(formData);
  if (!validation.isValid) {
    return {
      url: '',
      isValid: false,
      error: 'Please fix form validation errors'
    };
  }
  
  try {
    // Prepare all query parameters
    const allParams = [];
    
    // Add all query parameters (the cookie parameter is already included in the list)
    if (formData.queryParams) {
      allParams.push(...formData.queryParams);
    }
    
    // Remove duplicates and filter out empty ones
    const filteredParams = deduplicateQueryParams(
      allParams.filter(param => param.name && param.name.trim() !== '')
    );
    
    // Build the complete URL
    const finalUrl = buildCompleteUrl(formData.redirectUrl, filteredParams);
    return {
      url: finalUrl,
      isValid: true
    };
  } catch (error) {
    return {
      url: '',
      isValid: false,
      error: error.message
    };
  }
}

/**
 * Gets available query parameter presets
 * @returns {Array<{name: string, label: string, defaultValue: string, isMacro: boolean}>} - Available presets
 */
export function getQueryParamPresets() {
  return COMMON_QUERY_PARAMS;
}

/**
 * Parses a URL to extract query parameters
 * @param {string} url - URL to parse
 * @returns {Array<{name: string, value: string, isMacro: boolean}>} - Extracted query parameters
 */
export function parseUrlQueryParams(url) {
  try {
    const urlObj = new URL(url);
    const params = [];
    
    for (const [name, value] of urlObj.searchParams.entries()) {
      // Check if value looks like a macro
      const macroPattern = /^(\$\{[^}]+\}|%%[^%]+%%|\{[^}]+\})$/;
      const isMacro = macroPattern.test(value);
      
      params.push({
        name,
        value,
        isMacro
      });
    }
    
    return params;
  } catch (error) {
    return [];
  }
}

/**
 * Encodes a complete URL with query parameters
 * @param {string} completeUrl - Complete URL to encode
 * @param {boolean} preserveMacros - Whether to preserve server-side macros
 * @returns {{url: string, isValid: boolean, error?: string}} - Encoded URL result
 */
export function encodeCompleteUrlWithParams(completeUrl, preserveMacros = true) {
  if (!completeUrl || completeUrl.trim() === '') {
    return {
      url: '',
      isValid: false,
      error: 'URL is required'
    };
  }
  
  try {
    // Validate the URL format
    const urlValidation = validateAndNormalizeUrl(completeUrl);
    if (!urlValidation.isValid) {
      return {
        url: '',
        isValid: false,
        error: urlValidation.error
      };
    }
    
    // Encode the complete URL
    const encodedUrl = encodeCompleteUrl(completeUrl, { preserveMacros });
    
    return {
      url: encodedUrl,
      isValid: true
    };
  } catch (error) {
    return {
      url: '',
      isValid: false,
      error: error.message
    };
  }
}

/**
 * Formats a URL for display (truncates if too long)
 * @param {string} url - URL to format
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Formatted URL
 */
export function formatUrlForDisplay(url, maxLength = 80) {
  if (!url) return '';
  
  if (url.length <= maxLength) {
    return url;
  }
  
  const start = url.substring(0, maxLength / 2);
  const end = url.substring(url.length - maxLength / 2);
  
  return `${start}...${end}`;
} 