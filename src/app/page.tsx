'use client';

import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { useCharacterSearch } from "../hooks/useCharacterSearch";
import { maskApiKey } from "../utils/api";
import { SearchBar } from "../components/SearchBar";
import { QuickSearch } from "../components/QuickSearch";
import { DebugPanel } from "../components/DebugPanel";
import { CharacterCard } from "../components/CharacterCard";
import { LoadingIndicator, ErrorMessage, NoResults } from "../components/StatusMessages";

export default function Home() {
  // Get theme state from custom hook
  const { mounted, systemDarkMode } = useTheme();
  
  // Get character search functionality from custom hook
  const { 
    searchQuery, 
    setSearchQuery, 
    characters, 
    loading, 
    error, 
    debugInfo, 
    setDebugInfo,
    searchCharacters,
    searchDirectly
  } = useCharacterSearch();
  
  // State for showing debug info
  const [showDebug, setShowDebug] = useState(false);

  // Update masked API key on component mount
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    setDebugInfo(prev => ({
      ...prev,
      apiKeyMasked: maskApiKey(apiKey)
    }));
  }, [setDebugInfo]);

  // Update debug info when system preference changes
  useEffect(() => {
    if (mounted) {
      setDebugInfo(prev => ({
        ...prev,
        apiStatus: `Mode: ${systemDarkMode ? 'Dark' : 'Light'} (system preference)`
      }));
    }
  }, [systemDarkMode, mounted, setDebugInfo]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Toggle debug info visibility
  const toggleDebugInfo = () => {
    setShowDebug(!showDebug);
  };

  // Add specific characters search function
  const searchSpecificCharacter = (characterName: string) => {
    searchDirectly(characterName);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <main className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Lord of the Rings Character Search</h1>
          
          {/* Display system color scheme preference (optional) */}
          {mounted && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Using {systemDarkMode ? 'dark' : 'light'} mode (system preference)
            </div>
          )}
        </div>
        
        <div className="mb-8">
          {/* Search bar component */}
          <SearchBar 
            searchQuery={searchQuery} 
            onQueryChange={handleSearchChange}
            onSearch={() => searchCharacters(searchQuery)}
          />
          
          {/* Quick search component */}
          <QuickSearch onSearch={searchSpecificCharacter} />
          
          {/* Debug panel component */}
          <DebugPanel 
            visible={showDebug} 
            debugInfo={debugInfo}
            systemDarkMode={systemDarkMode}
            mounted={mounted}
            onToggle={toggleDebugInfo}
          />
        </div>
        
        {/* Status components */}
        {loading && <LoadingIndicator />}
        {error && <ErrorMessage message={error} />}
        {!loading && searchQuery && characters.length === 0 && !error && <NoResults />}
        
        {/* Character grid */}
        {!loading && characters.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character._id} character={character} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
