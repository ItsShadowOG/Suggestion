import { useState, useEffect } from 'react';

export interface Suggestion {
  id: string;
  text: string;
  timestamp: number;
  visitorId: string;
}

const STORAGE_KEY = 'suggestion_collection_visitor';
const SUGGESTIONS_KEY = 'suggestion_collection_suggestions';

/**
 * Custom hook for managing suggestion submission state and local storage.
 * Enforces one suggestion per visitor using localStorage.
 */
export function useSuggestionState() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // Initialize visitor ID and check if they've already submitted
  useEffect(() => {
    const storedVisitorId = localStorage.getItem(STORAGE_KEY);
    if (storedVisitorId) {
      setVisitorId(storedVisitorId);
      setHasSubmitted(true);
    } else {
      // Generate a unique visitor ID
      const newVisitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(STORAGE_KEY, newVisitorId);
      setVisitorId(newVisitorId);
    }

    // Load suggestions from localStorage
    const storedSuggestions = localStorage.getItem(SUGGESTIONS_KEY);
    if (storedSuggestions) {
      try {
        setSuggestions(JSON.parse(storedSuggestions));
      } catch (error) {
        console.error('Failed to parse suggestions from localStorage:', error);
      }
    }
  }, []);

  const submitSuggestion = (text: string): Suggestion | null => {
    if (!visitorId || hasSubmitted) {
      return null;
    }

    const newSuggestion: Suggestion = {
      id: `suggestion_${Date.now()}`,
      text,
      timestamp: Date.now(),
      visitorId,
    };

    const updatedSuggestions = [...suggestions, newSuggestion];
    setSuggestions(updatedSuggestions);
    localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(updatedSuggestions));
    setHasSubmitted(true);

    return newSuggestion;
  };

  return {
    visitorId,
    hasSubmitted,
    suggestions,
    submitSuggestion,
  };
}
