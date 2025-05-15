"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, User, LogIn, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BUILD GAMING
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/pc-builder" className="text-foreground hover:text-primary transition-colors">
              PC Builder
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-card transition-colors">
              <Search size={20} />
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile" className="p-2 rounded-full hover:bg-card transition-colors">
                  <User size={20} />
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center text-sm hover:text-primary transition-colors"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="text-sm hover:text-primary transition-colors flex items-center">
                  <LogIn size={18} className="mr-1" />
                  Sign In
                </Link>
                <Button href="/signup" size="sm" variant="outline">
                  Sign Up
                </Button>
              </div>
            )}
            
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-card transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-card transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/pc-builder" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                PC Builder
              </Link>
              <Link 
                href="/about" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Auth Links */}
              {isAuthenticated ? (
                <div className="border-t border-border pt-4 mt-2 flex flex-col space-y-3">
                  <Link 
                    href="/profile" 
                    className="text-foreground hover:text-primary transition-colors py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="mr-2" />
                    My Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-foreground hover:text-primary transition-colors py-2 flex items-center"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-border pt-4 mt-2 flex flex-col space-y-3">
                  <Link 
                    href="/login" 
                    className="text-foreground hover:text-primary transition-colors py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={18} className="mr-2" />
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </nav>
            
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-border">
              <button className="p-2 rounded-full hover:bg-background transition-colors">
                <Search size={20} />
              </button>
              {isAuthenticated && (
                <Link 
                  href="/profile" 
                  className="p-2 rounded-full hover:bg-background transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                </Link>
              )}
              <Link 
                href="/cart" 
                className="relative p-2 rounded-full hover:bg-background transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 