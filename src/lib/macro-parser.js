/**
 * Common server-side macro patterns
 */
export const MACRO_PATTERNS = [
  {
    pattern: /\$\{[^}]+\}/g, // ${MACRO_NAME}
    type: 'dollar'
  },
  {
    pattern: /%%[^%]+%%/g, // %%MACRO_NAME%%
    type: 'percent'
  },
  {
    pattern: /\{[^}]+\}/g, // {MACRO_NAME}
    type: 'curly'
  }
];

/**
 * Extracts macros from a string
 * @param {string} str - String to parse
 * @returns {Array<{match: string, type: string, index: number}>} - Found macros
 */
export function extractMacros(str) {
  const macros = [];
  
  MACRO_PATTERNS.forEach(({ pattern, type }) => {
    const matches = [...str.matchAll(pattern)];
    matches.forEach(match => {
      macros.push({
        match: match[0],
        type,
        index: match.index
      });
    });
  });
  
  return macros.sort((a, b) => a.index - b.index);
}

/**
 * Replaces macros with placeholders for encoding
 * @param {string} str - Original string
 * @returns {Object} - Object with processed string and macro map
 */
export function protectMacros(str) {
  const macros = extractMacros(str);
  const macroMap = new Map();
  let processedStr = str;
  
  macros.forEach((macro, index) => {
    const placeholder = `__MACRO_${index}__`;
    macroMap.set(placeholder, macro.match);
    processedStr = processedStr.replace(macro.match, placeholder);
  });
  
  return { processedStr, macroMap };
}

/**
 * Restores macros from placeholders
 * @param {string} str - String with placeholders
 * @param {Map} macroMap - Map of placeholders to macros
 * @returns {string} - String with restored macros
 */
export function restoreMacros(str, macroMap) {
  let restoredStr = str;
  macroMap.forEach((macro, placeholder) => {
    restoredStr = restoredStr.replace(placeholder, macro);
  });
  return restoredStr;
}
