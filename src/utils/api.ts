import { Character } from '../types/character';

/**
 * Masks an API key for display
 */
export const maskApiKey = (key: string | undefined): string => {
  if (!key) return "Not found";
  if (key.length <= 8) return "***";
  return key.substring(0, 4) + "..." + key.substring(key.length - 4);
};

/**
 * Searches for LOTR characters by name
 */
export const searchLOTRCharacters = async (query: string): Promise<{
  characters: Character[];
  error?: string;
  status: number;
}> => {
  if (!query.trim()) {
    return { characters: [], status: 200 };
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = `https://the-one-api.dev/v2/character?name=/${encodeURIComponent(query)}/i`;
    
    console.log(`Searching with URL: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    console.log(`API response status: ${response.status}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return { characters: [], status: 404, error: "No characters found" };
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    
    const data = await response.json();
    console.log(`Found ${data.docs?.length || 0} characters`);
    
    return { 
      characters: data.docs || [], 
      status: response.status 
    };
  } catch (err) {
    console.error("Error searching characters:", err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return { 
      characters: [], 
      error: `An error occurred while searching: ${errorMessage}`,
      status: 500
    };
  }
}; 