import sanitize from 'sanitize-html';

// cleanXSS - Sanitizes the input string to remove any HTML tags and attributes.
export const cleanXSS = (dirty: string): string => {
  return sanitize(dirty, {
    allowedTags: [],
    allowedAttributes: {},
  });
};