'use client';
import Head from 'next/head';
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
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black bg-opacity-90 backdrop-blur-md py-3 shadow-lg' // Added shadow for style
            : 'bg-black py-8'
        } border-b-2 border-green`} 
      >
        <nav className="w-full px-6 flex justify-between items-center">
          <Link href="/">
            <span className="text-3xl text-green font-extrabold hover:text-white transition-colors flex items-center">
              Coder Collective
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/openings">
              <span className="text-lg text-white hover:text-green transition-colors">
                Openings
              </span>
            </Link>
            <Link href="/businessModel">
              <span className="text-lg text-white hover:text-green transition-colors">
                $6K Referrals
              </span>
            </Link>
            <Link href="/candidates">
              <span className="text-lg text-white hover:text-green transition-colors">
                Candidates
              </span>
            </Link>
            <Link href="/hiring-manager">
              <span className="text-lg text-white hover:text-green transition-colors">
                Hiring Managers
              </span>
            </Link>
            {isSignedIn && (
              <Link href="/dashboard">
                <span className="text-lg text-white hover:text-green transition-colors">
                  Dashboard
                </span>
              </Link>
            )}
            {!isSignedIn ? (
              <div className="space-x-4">
                <SignInButton mode="modal">
                  <button className="bg-transparent border border-green text-green px-5 py-2 rounded-full hover:bg-green hover:text-white transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-green text-white px-5 py-2 rounded-full hover:bg-black hover:text-green transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden w-full bg-black bg-opacity-95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-4">
              <Link href="/openings" onClick={toggleMenu}>
                <span className="block text-lg text-white hover:text-green transition-colors">
                  Openings
                </span>
              </Link>
              <Link href="/businessModel" onClick={toggleMenu}>
                <span className="block text-lg text-white hover:text-green transition-colors">
                  $6K Referrals
                </span>
              </Link>
              <Link href="/candidates" onClick={toggleMenu}>
                <span className="block text-lg text-white hover:text-green transition-colors">
                  Candidates
                </span>
              </Link>
              <Link href="/hiring-manager" onClick={toggleMenu}>
                <span className="block text-lg text-white hover:text-green transition-colors">
                  Hiring Managers
                </span>
              </Link>
              {isSignedIn && (
                <Link href="/dashboard" onClick={toggleMenu}>
                  <span className="block text-lg text-white hover:text-green transition-colors">
                    Dashboard
                  </span>
                </Link>
              )}
              {!isSignedIn ? (
                <div className="space-y-2">
                  <SignInButton mode="modal">
                    <button className="w-full bg-transparent border border-green text-green px-5 py-2 rounded-full hover:bg-green hover:text-white transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full bg-green text-white px-5 py-2 rounded-full hover:bg-black hover:text-green transition-colors">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              ) : (
                <div className="flex justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer to account for fixed header height */}
      <div className={`h-20 ${isScrolled ? 'md:h-16' : 'md:h-24'}`}></div>
    </>
  );
};

export default Header;
