import React from 'react';

interface DebugPanelProps {
  visible: boolean;
  debugInfo: {
    apiKeyMasked: string;
    lastQuery: string;
    apiStatus: string;
  };
  systemDarkMode: boolean;
  mounted: boolean;
  onToggle: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ 
  visible, 
  debugInfo, 
  systemDarkMode, 
  mounted, 
  onToggle 
}) => {
  return (
    <>
      {/* Debug toggle button */}
      <div className="flex justify-center mt-2">
        <button 
          onClick={onToggle}
          className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
        >
          {visible ? "Hide Debug Info" : "Show Debug Info"}
        </button>
      </div>
      
      {/* Debug information */}
      {visible && (
        <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md max-w-md mx-auto">
          <h3 className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Debug Information</h3>
          <div className="text-xs space-y-1">
            <p className="text-gray-600 dark:text-gray-400">API Key: {debugInfo.apiKeyMasked}</p>
            <p className="text-gray-600 dark:text-gray-400">Last Query: {debugInfo.lastQuery}</p>
            <p className="text-gray-600 dark:text-gray-400">API Status: {debugInfo.apiStatus}</p>
            <div className="pt-1 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 font-medium">Theme State:</p>
              
              {/* Only render client-side specific values when mounted */}
              {mounted && (
                <>
                  <p className="text-gray-600 dark:text-gray-400">Document Class: <span className={document.documentElement.classList.contains('dark') ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}>{document.documentElement.classList.contains('dark') ? 'dark' : 'light'}</span></p>
                  <p className="text-gray-600 dark:text-gray-400">System Preference: <span className={systemDarkMode ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}>{systemDarkMode ? 'dark' : 'light'}</span></p>
                </>
              )}
              
              {/* Placeholder for server rendering */}
              {!mounted && (
                <p className="text-gray-600 dark:text-gray-400">Client-side values loading...</p>
              )}
            </div>
            {mounted && (
              <button 
                onClick={() => console.log('Current state:', { 
                  systemDarkMode, 
                  documentClass: document.documentElement.classList.contains('dark'),
                  systemPreference: window.matchMedia('(prefers-color-scheme: dark)').matches
                })}
                className="mt-1 text-xs text-blue-500 dark:text-blue-400 hover:underline"
              >
                Log State to Console
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}; 