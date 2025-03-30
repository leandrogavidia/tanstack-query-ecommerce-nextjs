'use client';

import { ReactNode } from 'react';

import { CartProvider } from '@/components/providers/cart-provider';
import { FavoritesProvider } from '@/components/providers/favorites-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AuthProvider } from '@/components/providers/use-auth';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <QueryProvider>
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}