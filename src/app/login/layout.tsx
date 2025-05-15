import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Build Gaming',
  description: 'Sign in to your Build Gaming account',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 