import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface SuggestionInputCardProps {
  onSubmit: (text: string) => void;
  isDisabled: boolean;
  onClose: () => void;
}

/**
 * Suggestion Input Card Component
 * Design: Modern Minimalist - Floating card with smooth animations
 * Features:
 * - Dynamic Submit button (appears only when text is present)
 * - Smooth fade-in/fade-out animations
 * - Focus state with subtle scale-up and shadow enhancement
 */
export function SuggestionInputCard({
  onSubmit,
  isDisabled,
  onClose,
}: SuggestionInputCardProps) {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSubmit(inputText);
      setInputText('');
    }
  };

  const hasText = inputText.trim().length > 0;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40 p-4">
      <div
        className={`bg-card text-card-foreground rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 ${
          isFocused ? 'scale-102 shadow-2xl' : 'scale-100'
        }`}
      >
        <h3 className="text-xl font-display mb-4 text-card-foreground">
          Share Your Suggestion
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Tell us what you think..."
            className="w-full h-32 p-3 border border-border rounded-lg bg-input text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            disabled={isDisabled}
          />

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="bg-card text-card-foreground border-border hover:bg-secondary"
            >
              Cancel
            </Button>

            {/* Dynamic Submit Button */}
            {hasText && (
              <Button
                type="submit"
                disabled={isDisabled}
                className="gap-2 animate-in fade-in duration-150 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send size={18} />
                Submit
              </Button>
            )}
          </div>
        </form>

        {isDisabled && (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            You have already submitted a suggestion. Thank you for your feedback!
          </p>
        )}
      </div>
    </div>
  );
}
