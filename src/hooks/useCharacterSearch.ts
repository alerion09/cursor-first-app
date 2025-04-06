import { useState, useEffect, useRef } from 'react';
import { Character } from '../types/character';
import { searchLOTRCharacters } from '../utils/api';

interface DebugInfo {
  apiKeyMasked: string;
  lastQuery: string;
  apiStatus: string;
}

/**
 * Custom hook for searching LOTR characters
 */
export const useCharacterSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    apiKeyMasked: "",
    lastQuery: "",
    apiStatus: ""
  });
  
  // Ref to track if a direct search was triggered to avoid duplicate searches
  const skipDebounceRef = useRef(false);

  // Search characters function
  const searchCharacters = async (query: string) => {
    if (!query.trim()) {
      setCharacters([]);
      return;
    }

    setLoading(true);
    setError("");
    setDebugInfo(prev => ({
      ...prev,
      lastQuery: query,
      apiStatus: "Searching API for: " + query
    }));

    const result = await searchLOTRCharacters(query);
    
    setCharacters(result.characters);
    
    if (result.error) {
      setError(result.error);
    }
    
    setDebugInfo(prev => ({
      ...prev,
      apiStatus: result.error 
        ? `Error: ${result.error}` 
        : `Found ${result.characters.length} results`
    }));
    
    setLoading(false);
  };

  // Debounce search to avoid too many API calls
  useEffect(() => {
    // Skip debounce if we just did a direct search
    if (skipDebounceRef.current) {
      console.log('Skipping debounce search for:', searchQuery);
      skipDebounceRef.current = false;
      return;
    }
    
    console.log('Setting up debounced search for:', searchQuery);
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        console.log('Executing debounced search for:', searchQuery);
        searchCharacters(searchQuery);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Function to search directly and skip the debounce effect
  const searchDirectly = (query: string) => {
    console.log('Performing direct search for:', query);
    skipDebounceRef.current = true;
    setSearchQuery(query);
    searchCharacters(query);
  };

  return {
    searchQuery,
    setSearchQuery,
    characters,
    loading,
    error,
    debugInfo,
    setDebugInfo,
    searchCharacters,
    searchDirectly
  };
}; 