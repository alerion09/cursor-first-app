import { useState, useEffect } from 'react';
import { isSystemDarkMode, applyDarkMode, setupDarkModeListener } from '../utils/theme';

/**
 * Custom hook for managing theme based on system preferences
 */
export const useTheme = () => {
  const [mounted, setMounted] = useState(false);
  const [systemDarkMode, setSystemDarkMode] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Check system preference
    const isDarkMode = isSystemDarkMode();
    setSystemDarkMode(isDarkMode);
    
    // Apply the theme to document if needed
    applyDarkMode(isDarkMode);
    
    // Add listener for system preference changes
    const cleanup = setupDarkModeListener((isDark) => {
      setSystemDarkMode(isDark);
    });
    
    return cleanup;
  }, []);

  return {
    mounted,
    systemDarkMode
  };
}; 