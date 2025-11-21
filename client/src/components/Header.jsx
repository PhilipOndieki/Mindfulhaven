import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/for-universities', label: 'For Universities' },
    { path: '/community', label: 'Community' },
    { path: '/resources', label: 'Resources' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Mindful Haven" className="h-10 w-10" />
            <Link 
              to="/" 
              className="text-xl font-semibold text-gray-900 tracking-tight hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Mindful Haven
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium p-3 transition-colors ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-gray-600 hover:text-primary p-3 transition-colors">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-primary text-white text-sm font-medium rounded-full px-6 py-2.5 hover:bg-primary-dark transition-all shadow-sm hover:shadow-md">
                  Join Free
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link
                to="/profile"
                className={`text-sm font-medium p-3 transition-colors ${
                  isActive('/profile')
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Profile
              </Link>
              <Link
                to="/resources/create"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary p-3 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Share Your Story
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9"
                  }
                }}
              />
            </SignedIn>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col py-4 space-y-1 border-t border-gray-200">
            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                className={`text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-secondary text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <SignedOut>
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-3 px-4">
                <SignInButton mode="modal">
                  <button 
                    onClick={handleLinkClick}
                    className="w-full text-left text-sm font-medium text-gray-600 hover:text-primary py-3 transition-colors"
                  >
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    onClick={handleLinkClick}
                    className="w-full bg-primary text-white text-sm font-medium rounded-full px-6 py-3 hover:bg-primary-dark transition-all shadow-sm hover:shadow-md"
                  >
                    Join Free
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="pt-4 mt-4 border-t border-gray-200 px-4">
                <Link
                  to="/resources/create"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark py-3 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Share Your Story
                </Link>
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden -z-10"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;