'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { config } from '@/lib/wagmi';

const queryClient = new QueryClient();

interface WalletProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

// Safe wrapper that only enables RainbowKit when explicitly requested
export function WalletProvider({ children, enabled = false }: WalletProviderProps) {
  // If not enabled, just return children without any wallet providers
  if (!enabled) {
    return <>{children}</>;
  }

  // Only wrap with wallet providers when enabled
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}