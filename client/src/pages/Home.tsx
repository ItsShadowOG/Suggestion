import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { SuggestionInputCard } from '@/components/SuggestionInputCard';
import { AdminLoginModal } from '@/components/AdminLoginModal';
import { useSuggestionState } from '@/hooks/useSuggestionState';
import { mockAdminLogin } from '@/lib/mockApi';
import { MessageSquare, CheckCircle } from 'lucide-react';

/**
 * Home Page Component
 * Design: Modern Minimalist with Warm Accents
 * - Asymmetric hero section with prominent CTA
 * - Floating input card for suggestion submission
 * - Hamburger menu for navigation and admin access
 * - One suggestion per visitor enforcement via localStorage
 */
export default function Home() {
  const { hasSubmitted, submitSuggestion } = useSuggestionState();
  const [showInputCard, setShowInputCard] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleSuggestionSubmit = (text: string) => {
    const suggestion = submitSuggestion(text);
    if (suggestion) {
      setShowInputCard(false);
      console.log('Suggestion submitted:', suggestion);
    }
  };

  const handleAdminLogin = async (username: string, password: string) => {
    setIsLoginLoading(true);
    setLoginError('');

    try {
      const result = await mockAdminLogin(username, password);

      if (result.success && result.token) {
        localStorage.setItem('admin_token', result.token);
        window.location.href = '/admin';
      } else {
        setLoginError(result.error || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred. Please try again.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HamburgerMenu onAdminClick={() => setShowAdminLogin(true)} />

      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-display text-foreground leading-tight">
                We Want Your{' '}
                <span className="text-primary">Suggestion</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-body">
                Send us your suggestions. Every voice matters.
              </p>
            </div>

            {hasSubmitted ? (
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <CheckCircle className="text-primary flex-shrink-0" size={24} />
                <div>
                  <p className="font-medium text-foreground">Thank you!</p>
                  <p className="text-sm text-muted-foreground">
                    Your suggestion has been recorded. We appreciate your input.
                  </p>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowInputCard(true)}
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-lg font-display"
              >
                <MessageSquare size={24} />
                Admit Suggestion
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-border">
            <div className="space-y-2">
              <h3 className="font-display text-foreground">One Per Person</h3>
              <p className="text-sm text-muted-foreground">
                Each visitor can submit one suggestion to keep feedback focused.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-foreground">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">
                Your feedback is stored securely and reviewed by our team.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-foreground">Make an Impact</h3>
              <p className="text-sm text-muted-foreground">
                Your suggestions help shape the future of our service.
              </p>
            </div>
          </div>
        </div>
      </main>

      {showInputCard && (
        <SuggestionInputCard
          onSubmit={handleSuggestionSubmit}
          isDisabled={hasSubmitted}
          onClose={() => setShowInputCard(false)}
        />
      )}

      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => {
            setShowAdminLogin(false);
            setLoginError('');
          }}
          onLogin={handleAdminLogin}
          isLoading={isLoginLoading}
          error={loginError}
        />
      )}
    </div>
  );
}
