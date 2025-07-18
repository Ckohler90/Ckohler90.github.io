import { z } from 'zod';

export const redirectUrlSchema = z.object({
  redirectUrl: z.string().url('Please enter a valid URL'),
  cookieParamIndex: z.number().nullable(),
  queryParams: z.array(z.object({
    name: z.string().min(1, 'Parameter name is required'),
    value: z.string().min(1, 'Parameter value is required'),
    isMacro: z.boolean(),
  })),
});

/**
 * Validates a URL string
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates query parameter name
 * @param {string} paramName - Parameter name to validate
 * @returns {boolean} - Whether the parameter name is valid
 */
export function isValidParamName(paramName) {
  return /^[a-zA-Z0-9_-]+$/.test(paramName);
}
