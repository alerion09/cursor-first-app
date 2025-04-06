import React from 'react';
import { Character } from '../types/character';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition p-4 h-full flex flex-col border border-gray-100 dark:border-gray-700"
    >
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{character.name}</h3>
        {character.race && (
          <div className="flex items-center my-1">
            <span className="font-semibold mr-2 text-gray-700 dark:text-gray-300">Race:</span>
            <span className="text-gray-800 dark:text-gray-200">{character.race}</span>
          </div>
        )}
        {character.gender && (
          <div className="flex items-center my-1">
            <span className="font-semibold mr-2 text-gray-700 dark:text-gray-300">Gender:</span>
            <span className="text-gray-800 dark:text-gray-200">{character.gender}</span>
          </div>
        )}
        {character.realm && (
          <div className="flex items-center my-1">
            <span className="font-semibold mr-2 text-gray-700 dark:text-gray-300">Realm:</span>
            <span className="text-gray-800 dark:text-gray-200">{character.realm}</span>
          </div>
        )}
        {(character.birth || character.death) && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {character.birth && <div>Birth: {character.birth}</div>}
            {character.death && <div>Death: {character.death}</div>}
          </div>
        )}
      </div>
      {character.wikiUrl && (
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <a 
            href={character.wikiUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 hover:underline text-sm"
          >
            Read more
          </a>
        </div>
      )}
    </div>
  );
}; 