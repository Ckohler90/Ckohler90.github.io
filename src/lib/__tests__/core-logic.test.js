/**
 * Core Logic Test Examples
 * This file demonstrates the functionality of our core logic components
 */

import {
  encodeUrlWithMacros,
  buildQueryString,
  buildCompleteUrl,
  validateAndNormalizeUrl,
  decodeUrlWithMacros
} from '../url-encoder.js';

import {
  createEmptyQueryParam,
  createQueryParamFromPreset,
  validateFormData,
  buildFinalUrl,
  getQueryParamPresets,
  parseUrlQueryParams,
  formatUrlForDisplay
} from '../form-helpers.js';

import { extractMacros, protectMacros, restoreMacros } from '../macro-parser.js';

/**
 * Test data for demonstrations
 */
const testData = {
  baseUrl: 'https://example.com/sync',
  cookieParam: {
    name: 'third_party_cookie',
    value: ''
  },
  queryParams: [
    {
      name: 'gdpr',
      value: '${GDPR_APPLIES}',
      isMacro: true
    },
    {
      name: 'gdpr_consent',
      value: '${GDPR_CONSENT_STRING}',
      isMacro: true
    },
    {
      name: 'custom_param',
      value: 'static value with reserved chars: ! * \' ( ) ; : @ & = + $ , / ? % # [ ]',
      isMacro: false
    },
    {
      name: 'us_privacy',
      value: '%%US_PRIVACY_STRING%%',
      isMacro: true
    }
  ]
};

/**
 * Run all test demonstrations
 */
export function runCoreLogicTests() {
  console.log('🚀 Core Logic Component Tests\n');
  
  testUrlEncoding();
  testMacroHandling();
  testQueryStringBuilding();
  testFormHelpers();
  testUrlValidation();
  testCompleteWorkflow();
  
  console.log('✅ All tests completed successfully!');
}

/**
 * Test URL encoding functionality
 */
function testUrlEncoding() {
  console.log('📝 Testing URL Encoding...');
  
  const testStrings = [
    'simple text',
    'text with spaces & reserved chars: ! * \' ( ) ; : @ & = + $ , / ? % # [ ]',
    '${MACRO_VALUE}',
    'mixed ${MACRO} and regular text',
    '%%PERCENT_MACRO%% with {CURLY_MACRO}',
    'reserved chars only: !*\'();:@&=+$,/?%#[]'
  ];
  
  testStrings.forEach(str => {
    const encoded = encodeUrlWithMacros(str);
    console.log(`  "${str}" → "${encoded}"`);
  });
  
  console.log();
}

/**
 * Test macro handling functionality
 */
function testMacroHandling() {
  console.log('🔧 Testing Macro Handling...');
  
  const testString = 'url?param1=${MACRO1}&param2=%%MACRO2%%&param3={MACRO3}&param4=regular value';
  
  console.log(`  Original: ${testString}`);
  
  const macros = extractMacros(testString);
  console.log(`  Found macros: ${JSON.stringify(macros.map(m => m.match))}`);
  
  const { processedStr, macroMap } = protectMacros(testString);
  console.log(`  Protected: ${processedStr}`);
  
  const encoded = encodeURIComponent(processedStr);
  console.log(`  Encoded: ${encoded}`);
  
  const restored = restoreMacros(encoded, macroMap);
  console.log(`  Restored: ${restored}`);
  
  console.log();
}

/**
 * Test query string building
 */
function testQueryStringBuilding() {
  console.log('🔗 Testing Query String Building...');
  
  const queryString = buildQueryString(testData.queryParams);
  console.log(`  Query String: ${queryString}`);
  
  const completeUrl = buildCompleteUrl(testData.baseUrl, testData.queryParams);
  console.log(`  Complete URL: ${completeUrl}`);
  
  console.log();
}

/**
 * Test form helper functions
 */
function testFormHelpers() {
  console.log('📋 Testing Form Helpers...');
  
  // Test presets
  const presets = getQueryParamPresets();
  console.log(`  Available presets: ${presets.map(p => p.name).join(', ')}`);
  
  // Test empty param creation
  const emptyParam = createEmptyQueryParam();
  console.log(`  Empty param: ${JSON.stringify(emptyParam)}`);
  
  // Test preset param creation
  const presetParam = createQueryParamFromPreset(presets[0]);
  console.log(`  Preset param: ${JSON.stringify(presetParam)}`);
  
  // Test URL parsing
  const sampleUrl = 'https://example.com/test?param1=value1&param2=${MACRO}&param3=%%MACRO2%%';
  const parsedParams = parseUrlQueryParams(sampleUrl);
  console.log(`  Parsed from URL: ${JSON.stringify(parsedParams)}`);
  
  // Test URL formatting
  const longUrl = 'https://very-long-domain-name.example.com/very/long/path/with/many/segments?very_long_param_name=very_long_param_value&another_param=another_value';
  const formatted = formatUrlForDisplay(longUrl, 60);
  console.log(`  Formatted URL: ${formatted}`);
  
  console.log();
}

/**
 * Test URL validation
 */
function testUrlValidation() {
  console.log('✅ Testing URL Validation...');
  
  const testUrls = [
    'https://example.com',
    'http://test.com/path',
    'invalid-url',
    'ftp://example.com',
    'https://example.com/path?param=value',
    ''
  ];
  
  testUrls.forEach(url => {
    const validation = validateAndNormalizeUrl(url);
    console.log(`  "${url}" → Valid: ${validation.isValid}, Error: ${validation.error || 'None'}`);
  });
  
  console.log();
}

/**
 * Test complete workflow
 */
function testCompleteWorkflow() {
  console.log('🏁 Testing Complete Workflow...');
  
  const formData = {
    redirectUrl: testData.baseUrl,
    cookieParam: testData.cookieParam,
    queryParams: testData.queryParams
  };
  
  // Validate form data
  const validation = validateFormData(formData);
  console.log(`  Form validation: ${validation.isValid ? 'Valid' : 'Invalid'}`);
  if (!validation.isValid) {
    console.log(`  Errors: ${JSON.stringify(validation.errors)}`);
  }
  
  // Build final URL
  const result = buildFinalUrl(formData);
  console.log(`  Final URL valid: ${result.isValid}`);
  if (result.isValid) {
    console.log(`  Final URL: ${result.url}`);
    
    // Test decoding
    const decoded = decodeUrlWithMacros(result.url);
    console.log(`  Decoded URL: ${decoded}`);
  } else {
    console.log(`  Error: ${result.error}`);
  }
  
  console.log();
}

/**
 * Example usage scenarios
 */
export const exampleScenarios = {
  /**
   * Scenario 1: Basic redirect with GDPR macros
   */
  basicGdprRedirect: {
    redirectUrl: 'https://sync.example.com/redirect',
    cookieParam: {
      name: 'uid',
      value: ''
    },
    queryParams: [
      {
        name: 'gdpr',
        value: '${GDPR_APPLIES}',
        isMacro: true
      },
      {
        name: 'gdpr_consent',
        value: '${GDPR_CONSENT_STRING}',
        isMacro: true
      }
    ]
  },

  /**
   * Scenario 2: Complex redirect with multiple macro types and static values
   */
  complexRedirect: {
    redirectUrl: 'https://pixel.adtech.com/sync',
    cookieParam: {
      name: 'third_party_id',
      value: 'default_value'
    },
    queryParams: [
      {
        name: 'gdpr',
        value: '${GDPR_APPLIES}',
        isMacro: true
      },
      {
        name: 'gdpr_consent',
        value: '${GDPR_CONSENT_STRING}',
        isMacro: true
      },
      {
        name: 'us_privacy',
        value: '%%US_PRIVACY_STRING%%',
        isMacro: true
      },
      {
        name: 'coppa',
        value: '{COPPA}',
        isMacro: true
      },
      {
        name: 'static_param',
        value: 'some static value with reserved chars: ! * \' ( ) ; : @ & = + $ , / ? % # [ ]',
        isMacro: false
      },
      {
        name: 'encoded_param',
        value: 'value with reserved chars: & = ? # [ ]',
        isMacro: false
      }
    ]
  },

  /**
   * Scenario 3: Minimal redirect
   */
  minimalRedirect: {
    redirectUrl: 'https://simple.com/sync',
    cookieParam: {
      name: 'uid',
      value: ''
    },
    queryParams: []
  }
};

// Run demonstrations if this file is executed directly
if (typeof window === 'undefined' && process.argv[1]?.includes('core-logic.test.js')) {
  runCoreLogicTests();
  
  console.log('\n📋 Example Scenarios:');
  Object.entries(exampleScenarios).forEach(([name, scenario]) => {
    console.log(`\n${name}:`);
    const result = buildFinalUrl(scenario);
    if (result.isValid) {
      console.log(`  ✅ ${result.url}`);
    } else {
      console.log(`  ❌ ${result.error}`);
    }
  });
} 