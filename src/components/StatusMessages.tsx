import React from 'react';

export const LoadingIndicator: React.FC = () => (
  <div className="text-center my-8">
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
    <p className="mt-2 text-gray-700 dark:text-gray-300">Searching characters...</p>
  </div>
);

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-center my-8 text-red-500 dark:text-red-400">
    {message}
  </div>
);

export const NoResults: React.FC = () => (
  <div className="text-center my-8">
    <p className="text-gray-500 dark:text-gray-400">
      No characters found. Try a different search term.
    </p>
  </div>
); 