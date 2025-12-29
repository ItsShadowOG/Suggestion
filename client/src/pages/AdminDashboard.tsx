import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { Suggestion } from '@/hooks/useSuggestionState';

/**
 * Admin Dashboard Page Component
 * Design: Modern Minimalist - Structured comment view with Show More/Show Less toggle
 * Features:
 * - Display all submitted suggestions
 * - Expandable/collapsible suggestion cards
 * - Logout functionality
 * - Responsive grid layout
 */
export default function AdminDashboard() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Load suggestions from localStorage on mount
  useEffect(() => {
    const storedSuggestions = localStorage.getItem('suggestion_collection_suggestions');
    if (storedSuggestions) {
      try {
        setSuggestions(JSON.parse(storedSuggestions));
      } catch (error) {
        console.error('Failed to parse suggestions:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/';
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-display">Admin Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 bg-card text-card-foreground border-border hover:bg-secondary"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="mb-8 p-6 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-display mb-2">Suggestions Overview</h2>
          <p className="text-3xl font-display text-primary">
            {suggestions.length}
          </p>
          <p className="text-sm text-muted-foreground">
            Total suggestions received
          </p>
        </div>

        {/* Suggestions List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading suggestions...</p>
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground">
              No suggestions yet. Check back later!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion) => {
              const isExpanded = expandedIds.has(suggestion.id);
              const isLongText = suggestion.text.length > 150;

              return (
                <div
                  key={suggestion.id}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Suggestion Header */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-2">
                        {formatDate(suggestion.timestamp)}
                      </p>
                      <p className="text-card-foreground leading-relaxed">
                        {isExpanded ? suggestion.text : truncateText(suggestion.text)}
                      </p>
                    </div>

                    {/* Expand/Collapse Button */}
                    {isLongText && (
                      <button
                        onClick={() => toggleExpanded(suggestion.id)}
                        className="flex-shrink-0 p-2 text-primary hover:bg-secondary rounded-lg transition-colors duration-200"
                        aria-label={isExpanded ? 'Show less' : 'Show more'}
                      >
                        {isExpanded ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Suggestion Footer */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      ID: {suggestion.id}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
