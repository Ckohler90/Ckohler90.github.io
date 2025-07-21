import { protectMacros, restoreMacros, MACRO_PATTERNS } from './macro-parser.js';
import { URL_ENCODING_CHARS } from '../utils/constants.js';

/**
 * @typedef {Object} MacroPattern
 * @property {RegExp} pattern - Regular expression to match the macro
 * @property {'curly'|'percent'|'dollar'} type - Type of macro pattern
 */

/**
 * @typedef {Object} EncodingOptions
 * @property {boolean} preserveMacros - Whether to preserve server-side macros
 * @property {MacroPattern[]} macroPatterns - Array of macro patterns to preserve
 * @property {boolean} encodeSpaces - Whether to encode spaces
 */

/**
 * Encodes URL while preserving server-side macros
 * @param {string} url - The URL to encode
 * @param {EncodingOptions} options - Encoding options
 * @returns {string} - Encoded URL with preserved macros
 */
export function encodeUrlWithMacros(url, options = {}) {
  const {
    preserveMacros = true,
    macroPatterns = MACRO_PATTERNS,
    encodeSpaces = true
  } = options;

  if (!url) return '';

  // If we're not preserving macros, just encode normally
  if (!preserveMacros) {
    return encodeStringWithChars(url, encodeSpaces);
  }

  // Protect macros before encoding
  const { processedStr, macroMap } = protectMacros(url);
  console.log("processedStr url-encoder.js line 39", processedStr);
  console.log("macroMap url-encoder.js line 40", macroMap);

  // Encode the processed string
  const encodedStr = encodeStringWithChars(processedStr, encodeSpaces);
  
  // Restore macros
  return restoreMacros(encodedStr, macroMap);
}

/**
 * Encodes a string using custom character mapping
 * @param {string} str - String to encode
 * @param {boolean} encodeSpaces - Whether to encode spaces
 * @returns {string} - Encoded string
 */
function encodeStringWithChars(str, encodeSpaces = false) {
  let encoded = '';
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    // Skip encoding spaces if not required
    if (char === ' ' && !encodeSpaces) {
      encoded += char;
      continue;
    }
    
    // Only encode reserved characters from our map
    if (URL_ENCODING_CHARS[char]) {
      encoded += URL_ENCODING_CHARS[char];
    } else {
      encoded += char;
    }
  }
  
  return encoded;
}



/**
 * Builds a query string from parameters
 * @param {Array<{name: string, value: string, isMacro: boolean}>} params - Query parameters
 * @param {EncodingOptions} options - Encoding options
 * @returns {string} - Query string
 */
export function buildQueryString(params, options = {}) {
  if (!params || params.length === 0) return '';
  
  const queryPairs = params
    .filter(param => param.name && param.value !== undefined)
    .map(param => {
      console.log("param url-encoder.js line 91", param);// $UID is preserved up to this point
      const encodedName = encodeUrlWithMacros(param.name, { 
        ...options, 
        preserveMacros: false 
      });
      
      const encodedValue = param.isMacro 
        ? param.value // Don't encode macros at all
        : encodeUrlWithMacros(param.value, { ...options, preserveMacros: false });
      console.log("encodedValue url-encoder.js line 99", encodedValue);
      return `${encodedName}=${encodedValue}`;
    });
  
  return queryPairs.join('&');
}

/**
 * Builds a complete URL with query parameters
 * @param {string} baseUrl - Base URL
 * @param {Array<{name: string, value: string, isMacro: boolean}>} params - Query parameters
 * @param {EncodingOptions} options - Encoding options
 * @returns {string} - Complete URL with query string
 */
export function buildCompleteUrl(baseUrl, params, options = {}) {
  if (!baseUrl) return '';
  
  const queryString = buildQueryString(params, options);
  
  if (!queryString) return baseUrl;
  
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${queryString}`;
}

/**
 * Validates and normalizes a URL
 * @param {string} url - URL to validate
 * @returns {{isValid: boolean, normalizedUrl: string, error?: string}} - Validation result
 */
export function validateAndNormalizeUrl(url) {
  if (!url) {
    return {
      isValid: false,
      normalizedUrl: '',
      error: 'URL is required'
    };
  }
  
  try {
    const urlObj = new URL(url);
    
    // Check for valid protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return {
        isValid: false,
        normalizedUrl: url,
        error: 'URL must use HTTP or HTTPS protocol'
      };
    }
    
    return {
      isValid: true,
      normalizedUrl: urlObj.toString()
    };
  } catch (error) {
    return {
      isValid: false,
      normalizedUrl: url,
      error: 'Invalid URL format'
    };
  }
}

/**
 * Encodes an entire URL while preserving server-side macros
 * @param {string} url - The complete URL to encode
 * @param {EncodingOptions} options - Encoding options
 * @returns {string} - Fully encoded URL with preserved macros
 */
export function encodeCompleteUrl(url, options = {}) {
  if (!url) return '';
  
  const {
    preserveMacros = true,
    macroPatterns = MACRO_PATTERNS
  } = options;

  try {
    // If we're not preserving macros, encode the entire URL
    if (!preserveMacros) {
      return encodeURIComponent(url);
    }

    // Protect macros before encoding
    const { processedStr, macroMap } = protectMacros(url);
    
    // Encode the entire processed string
    const encodedStr = encodeURIComponent(processedStr);
    
    // Restore macros
    return restoreMacros(encodedStr, macroMap);
  } catch (error) {
    // If URL parsing fails, fall back to basic encoding
    return encodeURIComponent(url);
  }
}

/**
 * Decodes a URL while preserving macros
 * @param {string} encodedUrl - Encoded URL
 * @returns {string} - Decoded URL
 */
export function decodeUrlWithMacros(encodedUrl) {
  if (!encodedUrl) return '';
  
  try {
    // First protect macros
    const { processedStr, macroMap } = protectMacros(encodedUrl);
    
    // Decode the processed string
    const decoded = decodeURIComponent(processedStr);
    
    // Restore macros
    return restoreMacros(decoded, macroMap);
  } catch (error) {
    // If decoding fails, return original string
    return encodedUrl;
  }
}
