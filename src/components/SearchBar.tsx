import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  onQueryChange, 
  onSearch 
}) => {
  return (
    <div className="flex w-full max-w-md mx-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={onQueryChange}
        placeholder="Search for LOTR characters..."
        className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      />
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}; 