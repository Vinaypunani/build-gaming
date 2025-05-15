import React from 'react';
import Link from 'next/link';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  switchText: string;
  switchLink: string;
  switchLinkText: string;
}

const AuthCard = ({
  children,
  title,
  description,
  switchText,
  switchLink,
  switchLinkText
}: AuthCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden max-w-md w-full mx-auto">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <Link href="/">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              BUILD GAMING
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </div>
        
        {/* Form Content */}
        {children}
        
        {/* Switch link (Login/Signup) */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {switchText}{' '}
            <Link href={switchLink} className="text-primary hover:underline">
              {switchLinkText}
            </Link>
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-8 py-4 bg-background/50 border-t border-border text-center">
        <p className="text-xs text-gray-400">
          By continuing, you agree to Build Gaming's{' '}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthCard; 