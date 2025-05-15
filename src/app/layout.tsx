import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Build Gaming - Custom PC Builder & Parts",
  description: "Premium PC parts, custom builds, and pre-built gaming systems for enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
          <Toaster 
            position="top-right" 
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1E1E2A',
                color: '#fff',
                border: '1px solid #2D2D3A'
              },
              success: {
                iconTheme: {
                  primary: '#65E873',
                  secondary: '#1E1E2A',
                },
              },
              error: {
                iconTheme: {
                  primary: '#FF5A5A',
                  secondary: '#1E1E2A',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
