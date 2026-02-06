/**
 * Production-Ready Logger
 * Wraps console methods to disable in production builds
 */

// Set to false for production builds
const __DEV__ = process.env.NODE_ENV !== 'production';

export const logger = {
  log: (...args) => {
    if (__DEV__) {
      console.log('[WW1]', ...args);
    }
  },

  warn: (...args) => {
    if (__DEV__) {
      console.warn('[WW1]', ...args);
    }
  },

  error: (...args) => {
    // Always log errors, even in production
    console.error('[WW1 Error]', ...args);
  },

  info: (...args) => {
    if (__DEV__) {
      console.info('[WW1]', ...args);
    }
  },

  debug: (...args) => {
    if (__DEV__) {
      console.log('[WW1 Debug]', ...args);
    }
  },

  // Group logging for complex operations
  group: (label, fn) => {
    if (__DEV__) {
      console.group(label);
      fn();
      console.groupEnd();
    }
  },

  // Performance timing
  time: (label) => {
    if (__DEV__) {
      console.time(label);
    }
  },

  timeEnd: (label) => {
    if (__DEV__) {
      console.timeEnd(label);
    }
  },
};

// Disable all console in production (optional - more aggressive)
export const disableConsoleInProduction = () => {
  if (!__DEV__) {
    console.log = () => {};
    console.warn = () => {};
    console.info = () => {};
    console.debug = () => {};
    // Keep console.error for crash reporting
  }
};

export default logger;
