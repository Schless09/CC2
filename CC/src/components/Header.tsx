'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUser, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/50 backdrop-blur-md py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="w-full px-8 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/">
          <span className="text-2xl text-white font-bold hover:text-green transition-colors flex items-center">
            Coder Collective
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* <Link href="/openings">
            <span className="text-sm text-white/80 hover:text-green transition-colors">
              Openings
            </span>
          </Link> */}
          <Link href="/businessModel">
            <span className="text-sm text-white/80 hover:text-green transition-colors">
              $6K Referrals
            </span>
          </Link>
          <Link href="/candidates">
            <span className="text-sm text-white/80 hover:text-green transition-colors">
              Candidates
            </span>
          </Link>
          <Link href="/hiring-manager">
            <span className="text-sm text-white/80 hover:text-green transition-colors">
              Hiring Managers
            </span>
          </Link>
          {isSignedIn && (
            <Link href="/dashboard">
              <span className="text-sm text-white/80 hover:text-green transition-colors">
                Dashboard
              </span>
            </Link>
          )}
          {!isSignedIn ? (
            <div className="space-x-3">
              <SignInButton mode="modal">
                <button className="bg-transparent text-sm text-white/80 hover:text-green transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-green/90 hover:bg-green text-white text-sm px-4 py-2 rounded-full transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white/80 hover:text-green transition-colors" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-black/95 backdrop-blur-md">
          <div className="px-8 py-6 space-y-4 flex flex-col items-center">
            {/* <Link href="/openings" onClick={toggleMenu}>
              <span className="text-sm text-white/80 hover:text-green transition-colors">
                Openings
              </span>
            </Link> */}
            <Link href="/businessModel" onClick={toggleMenu}>
              <span className="text-sm text-white/80 hover:text-green transition-colors">
                $6K Referrals
              </span>
            </Link>
            <Link href="/candidates" onClick={toggleMenu}>
              <span className="text-sm text-white/80 hover:text-green transition-colors">
                Candidates
              </span>
            </Link>
            <Link href="/hiring-manager" onClick={toggleMenu}>
              <span className="text-sm text-white/80 hover:text-green transition-colors">
                Hiring Managers
              </span>
            </Link>
            {isSignedIn && (
              <Link href="/dashboard" onClick={toggleMenu}>
                <span className="text-sm text-white/80 hover:text-green transition-colors">
                  Dashboard
                </span>
              </Link>
            )}
            {!isSignedIn ? (
              <div className="space-y-3 w-full max-w-xs">
                <SignInButton mode="modal">
                  <button className="w-full bg-transparent text-white/80 hover:text-green transition-colors py-2">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full bg-green/90 hover:bg-green text-white px-4 py-2 rounded-full transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            ) : (
              <div className="pt-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;