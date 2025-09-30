'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// Define Hedera networks for wagmi
const hederaMainnet = {
  id: 295,
  name: 'Hedera Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'HBAR',
    symbol: 'HBAR',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.hashio.io/api'],
      webSocket: ['wss://mainnet.hashio.io/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'HashScan',
      url: 'https://hashscan.io/mainnet',
    },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
  },
} as const;

const hederaTestnetCustom = {
  id: 296,
  name: 'Hedera Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'HBAR',
    symbol: 'HBAR',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.hashio.io/api'],
      webSocket: ['wss://testnet.hashio.io/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'HashScan',
      url: 'https://hashscan.io/testnet',
    },
  },
  testnet: true,
} as const;

export const config = getDefaultConfig({
  appName: 'MamaCredit',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id',
  chains: [hederaTestnetCustom], // TESTNET ONLY for demo safety
  ssr: true,
});

export { hederaMainnet, hederaTestnetCustom };