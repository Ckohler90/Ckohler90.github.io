export const COMMON_QUERY_PARAMS = [
  {
    name: 'gdpr',
    label: 'GDPR Applies',
    defaultValue: '${GDPR_APPLIES}',
    isMacro: true
  },
  {
    name: 'gdpr_consent',
    label: 'GDPR Consent String',
    defaultValue: '${GDPR_CONSENT_STRING}',
    isMacro: true
  },
  {
    name: 'us_privacy',
    label: 'US Privacy String',
    defaultValue: '${US_PRIVACY_STRING}',
    isMacro: true
  },
  {
    name: 'coppa',
    label: 'COPPA',
    defaultValue: '${COPPA}',
    isMacro: true
  }
];

export const URL_ENCODING_CHARS = {
  '!': '%21',
  '*': '%2A',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  ';': '%3B',
  ':': '%3A',
  '@': '%40',
  '&': '%26',
  '=': '%3D',
  '+': '%2B',
  '$': '%24',
  ',': '%2C',
  '/': '%2F',
  '?': '%3F',
  '%': '%25',
  '#': '%23',
  '[': '%5B',
  ']': '%5D'
};
