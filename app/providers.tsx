'use client';

import { ReactNode } from 'react';

import { CartProvider } from '@/components/providers/cart-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <QueryProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}