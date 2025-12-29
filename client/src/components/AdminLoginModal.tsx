import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AdminLoginModalProps {
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
  isLoading?: boolean;
  error?: string;
}

/**
 * Admin Login Modal Component
 * Design: Modern Minimalist - Clean form with clear visual hierarchy
 * Security Note: This component handles credential input. Actual authentication
 * must be performed server-side with proper hashing and validation.
 */
export function AdminLoginModal({
  onClose,
  onLogin,
  isLoading = false,
  error,
}: AdminLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-card text-card-foreground rounded-xl shadow-2xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display">Admin Login</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              disabled={isLoading}
              className="bg-card text-card-foreground border-border hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !username || !password}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
