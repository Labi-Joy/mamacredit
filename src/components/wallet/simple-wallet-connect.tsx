'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const HEDERA_TESTNET_CONFIG = {
  chainId: '0x128', // 296 in hex (Hedera Testnet)
  chainName: 'Hedera Testnet',
  nativeCurrency: {
    name: 'HBAR',
    symbol: 'HBAR',
    decimals: 18,
  },
  rpcUrls: ['https://testnet.hashio.io/api'],
  blockExplorerUrls: ['https://hashscan.io/testnet'],
};

export function SimpleWalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await getBalance(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const getBalance = async (address: string) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });
      // Convert from wei to HBAR (assuming 18 decimals)
      const hbarBalance = parseInt(balance, 16) / Math.pow(10, 18);
      setBalance(hbarBalance.toFixed(4));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  const addHederaNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [HEDERA_TESTNET_CONFIG],
      });
    } catch (error) {
      console.error('Error adding network:', error);
      throw error;
    }
  };

  const switchToHedera = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: HEDERA_TESTNET_CONFIG.chainId }],
      });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        await addHederaNetwork();
      } else {
        throw error;
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // First, add/switch to Hedera Testnet
      await switchToHedera();

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await getBalance(accounts[0]);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setError(null);
  };

  if (!account) {
    return (
      <div className="mama-card p-6 text-center">
        <Wallet className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-burgundy-800 mb-3">Connect MetaMask Wallet</h3>
        <p className="text-neutral-600 mb-6">
          Connect your MetaMask wallet to Hedera Testnet for live demo
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="mama-button-primary w-full justify-center"
        >
          <Wallet className="w-5 h-5 mr-2" />
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </button>

        <div className="mt-4 text-xs text-neutral-500">
          🔗 Will automatically switch to Hedera Testnet
        </div>
      </div>
    );
  }

  return (
    <div className="mama-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <h3 className="text-lg font-bold text-burgundy-800">Wallet Connected</h3>
        </div>
        <button
          onClick={disconnectWallet}
          className="text-sm text-neutral-600 hover:text-burgundy-600"
        >
          Disconnect
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1">
            Connected Account
          </label>
          <div className="flex items-center space-x-2">
            <code className="text-sm bg-neutral-100 px-3 py-2 rounded-lg flex-1 font-mono">
              {account.slice(0, 6)}...{account.slice(-4)}
            </code>
            <a
              href={`https://hashscan.io/testnet/account/${account}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-600 hover:text-burgundy-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {balance && (
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-1">
              HBAR Balance
            </label>
            <div className="text-lg font-semibold text-burgundy-800">
              {balance} HBAR
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-neutral-200">
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            Connected to Hedera Testnet
          </div>
        </div>
      </div>
    </div>
  );
}