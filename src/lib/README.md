# Core Logic Components

This directory contains the core logic components for the Redirect Query Parameter Builder & Validator app.

## Components Overview

### 1. URL Encoder (`url-encoder.js`)
**Purpose**: Handles URL encoding while preserving server-side macros.

**Key Functions**:
- `encodeUrlWithMacros(url, options)` - Encodes URLs while preserving macros
- `buildQueryString(params, options)` - Builds query strings from parameter arrays
- `buildCompleteUrl(baseUrl, params, options)` - Combines base URL with query parameters
- `validateAndNormalizeUrl(url)` - Validates and normalizes URLs
- `decodeUrlWithMacros(encodedUrl)` - Decodes URLs while preserving macros

**Features**:
- Preserves server-side macros in formats: `${MACRO}`, `%%MACRO%%`, `{MACRO}`
- Properly encodes reserved characters and special symbols
- Handles both static values and dynamic macros
- Validates URL format and protocol

### 2. Macro Parser (`macro-parser.js`)
**Purpose**: Identifies, protects, and restores server-side macros during encoding.

**Key Functions**:
- `extractMacros(str)` - Finds all macros in a string
- `protectMacros(str)` - Replaces macros with placeholders
- `restoreMacros(str, macroMap)` - Restores macros from placeholders

**Supported Macro Formats**:
- Dollar format: `${MACRO_NAME}`
- Percent format: `%%MACRO_NAME%%`
- Curly format: `{MACRO_NAME}`

### 3. Form Helpers (`form-helpers.js`)
**Purpose**: Provides utilities for form management and validation.

**Key Functions**:
- `createEmptyQueryParam()` - Creates new empty parameter objects
- `createQueryParamFromPreset(preset)` - Creates parameters from presets
- `validateFormData(formData)` - Validates entire form data
- `buildFinalUrl(formData)` - Builds final URL from form data
- `parseUrlQueryParams(url)` - Parses existing URLs to extract parameters
- `formatUrlForDisplay(url, maxLength)` - Formats URLs for display

### 4. Validators (`validators.js`)
**Purpose**: Zod schemas and validation functions for form data.

**Key Features**:
- Zod schema validation for form data
- URL format validation
- Parameter name validation
- Type-safe validation with detailed error messages

### 5. Constants (`../utils/constants.js`)
**Purpose**: Common constants and presets.

**Contents**:
- `COMMON_QUERY_PARAMS` - Preset query parameters (GDPR, US Privacy, etc.)
- `URL_ENCODING_CHARS` - Character encoding mappings

## Usage Examples

### Basic URL Building
```javascript
import { buildCompleteUrl } from './url-encoder.js';

const params = [
  { name: 'gdpr', value: '${GDPR_APPLIES}', isMacro: true },
  { name: 'custom', value: 'static value', isMacro: false }
];

const url = buildCompleteUrl('https://example.com/sync', params);
// Result: https://example.com/sync?gdpr=${GDPR_APPLIES}&custom=static%20value
```

### Form Validation
```javascript
import { validateFormData } from './form-helpers.js';

const formData = {
  redirectUrl: 'https://example.com/sync',
  cookieParam: { name: 'uid', value: '' },
  queryParams: [
    { name: 'gdpr', value: '${GDPR_APPLIES}', isMacro: true }
  ]
};

const validation = validateFormData(formData);
if (validation.isValid) {
  // Form is valid
} else {
  console.log(validation.errors);
}
```

### Complete Workflow
```javascript
import { buildFinalUrl } from './form-helpers.js';

const result = buildFinalUrl(formData);
if (result.isValid) {
  console.log('Final URL:', result.url);
} else {
  console.log('Error:', result.error);
}
```

## Key Features

1. **Macro Preservation**: Automatically detects and preserves server-side macros during URL encoding
2. **Flexible Validation**: Comprehensive validation with detailed error messages
3. **Multiple Formats**: Supports various macro formats used by different ad tech platforms
4. **Type Safety**: Full TypeScript/JSDoc type definitions for all functions
5. **Error Handling**: Graceful error handling with meaningful error messages
6. **Preset Support**: Pre-defined query parameters for common use cases

## Testing

Run the test suite to verify functionality:
```bash
cd src/lib/__tests__
node core-logic.test.js
```

The test suite demonstrates:
- URL encoding with macro preservation
- Query string building
- Form validation
- Complete workflow examples
- Real-world usage scenarios

## Next Steps

These core logic components provide the foundation for:
1. React form components
2. Real-time URL preview
3. Validation feedback
4. Copy-to-clipboard functionality
5. API endpoints for URL validation 