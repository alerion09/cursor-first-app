// Utility functions for theme management

/**
 * Checks if the system prefers dark mode
 */
export const isSystemDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Applies dark mode class to the document element
 */
export const applyDarkMode = (isDark: boolean): void => {
  if (typeof document === 'undefined') return;
  
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

/**
 * Sets up a listener for system dark mode preference changes
 */
export const setupDarkModeListener = (callback: (isDark: boolean) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches);
    applyDarkMode(e.matches);
  };
  
  darkModeMediaQuery.addEventListener('change', handleChange);
  
  // Return cleanup function
  return () => {
    darkModeMediaQuery.removeEventListener('change', handleChange);
  };
}; 