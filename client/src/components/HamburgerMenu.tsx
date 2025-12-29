import { useState } from 'react';
import { X, Menu, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HamburgerMenuProps {
  onAdminClick: () => void;
}

/**
 * Hamburger Menu Component
 * Design: Modern Minimalist - Smooth hamburger icon transformation with slide-in menu
 * Animation: 300ms ease-in-out rotation; 250ms slide-in from left
 */
export function HamburgerMenu({ onAdminClick }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAdminClick = () => {
    onAdminClick();
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 z-50">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-4 text-foreground hover:text-primary transition-colors duration-200"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={28} className="transition-transform duration-300" />
        ) : (
          <Menu size={28} className="transition-transform duration-300" />
        )}
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground shadow-lg z-40 transform transition-transform duration-250 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20">
          <nav className="space-y-4">
            <h2 className="text-lg font-display text-sidebar-foreground mb-6">
              Menu
            </h2>

            {/* Admin Login Option */}
            <Button
              onClick={handleAdminClick}
              variant="outline"
              className="w-full justify-start gap-2 bg-sidebar text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LogIn size={18} />
              Admin Login
            </Button>

            {/* Additional Navigation Items */}
            <div className="pt-4 border-t border-sidebar-border">
              <p className="text-sm text-sidebar-foreground/60">
                Share your suggestions to help us improve
              </p>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
