import React from 'react';

interface QuickSearchProps {
  onSearch: (character: string) => void;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({ onSearch }) => {
  return (
    <div className="flex justify-center gap-2 mt-3">
      <p className="text-sm text-gray-600 dark:text-gray-400 self-center">Quick search:</p>
      <button 
        onClick={() => onSearch("Frodo")}
        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Frodo
      </button>
      <button 
        onClick={() => onSearch("Gandalf")}
        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Gandalf
      </button>
      <button 
        onClick={() => onSearch("Aragorn")}
        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Aragorn
      </button>
    </div>
  );
}; 