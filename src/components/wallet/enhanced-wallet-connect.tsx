'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, ExternalLink, CheckCircle, AlertCircle, RefreshCw, Copy, Zap } from 'lucide-react';

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

interface WalletState {
  account: string | null;
  balance: string | null;
  hederaAccountId: string | null;
  isConnecting: boolean;
  error: string | null;
  networkCorrect: boolean;
}

export function EnhancedWalletConnect() {
  const [wallet, setWallet] = useState<WalletState>({
    account: null,
    balance: null,
    hederaAccountId: null,
    isConnecting: false,
    error: null,
    networkCorrect: false,
  });

  useEffect(() => {
    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setWallet(prev => ({ ...prev, account: accounts[0] }));
      getBalance(accounts[0]);
    }
  };

  const handleChainChanged = (chainId: string) => {
    const isHederaTestnet = chainId === HEDERA_TESTNET_CONFIG.chainId;
    setWallet(prev => ({ ...prev, networkCorrect: isHederaTestnet }));
  };

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });

        if (accounts.length > 0) {
          setWallet(prev => ({
            ...prev,
            account: accounts[0],
            networkCorrect: chainId === HEDERA_TESTNET_CONFIG.chainId
          }));
          await getBalance(accounts[0]);
          await getHederaAccountId(accounts[0]);
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
      // Convert from wei to HBAR
      const hbarBalance = parseInt(balance, 16) / Math.pow(10, 18);
      setWallet(prev => ({ ...prev, balance: hbarBalance.toFixed(4) }));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  const getHederaAccountId = async (address: string) => {
    // For demo purposes, we'll simulate the conversion from EVM address to Hedera Account ID
    // In a real implementation, you'd query the Hedera Mirror Node
    try {
      // Simulate API call to convert EVM address to Hedera Account ID
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock Hedera Account ID (in real app, this would come from Hedera Mirror Node)
      const mockAccountId = `0.0.${Math.floor(Math.random() * 1000000) + 1000000}`;
      setWallet(prev => ({ ...prev, hederaAccountId: mockAccountId }));
    } catch (error) {
      console.error('Error getting Hedera Account ID:', error);
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
      setWallet(prev => ({ ...prev, networkCorrect: true }));
    } catch (error: any) {
      if (error.code === 4902) {
        await addHederaNetwork();
        setWallet(prev => ({ ...prev, networkCorrect: true }));
      } else {
        throw error;
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setWallet(prev => ({
        ...prev,
        error: 'MetaMask is not installed. Please install MetaMask to continue.'
      }));
      return;
    }

    setWallet(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setWallet(prev => ({ ...prev, account: accounts[0] }));
        await getBalance(accounts[0]);
        await getHederaAccountId(accounts[0]);

        // Check and switch network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== HEDERA_TESTNET_CONFIG.chainId) {
          await switchToHedera();
        } else {
          setWallet(prev => ({ ...prev, networkCorrect: true }));
        }
      }
    } catch (error: any) {
      setWallet(prev => ({
        ...prev,
        error: error.message || 'Failed to connect wallet'
      }));
    } finally {
      setWallet(prev => ({ ...prev, isConnecting: false }));
    }
  };

  const disconnectWallet = () => {
    setWallet({
      account: null,
      balance: null,
      hederaAccountId: null,
      isConnecting: false,
      error: null,
      networkCorrect: false,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const refreshBalance = async () => {
    if (wallet.account) {
      await getBalance(wallet.account);
    }
  };

  if (!wallet.account) {
    return (
      <div className="mama-card p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-burgundy-800 mb-3">Connect to Hedera</h3>
        <p className="text-neutral-600 mb-6">
          Connect your MetaMask wallet to experience real blockchain transactions on Hedera Testnet
        </p>

        {wallet.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-red-700 text-sm text-left">{wallet.error}</span>
          </div>
        )}

        <button
          onClick={connectWallet}
          disabled={wallet.isConnecting}
          className="mama-button-primary w-full justify-center"
        >
          {wallet.isConnecting ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5 mr-2" />
              Connect MetaMask
            </>
          )}
        </button>

        <div className="mt-4 text-xs text-neutral-500 space-y-1">
          <div>🔗 Auto-switches to Hedera Testnet</div>
          <div>⚡ Real blockchain transactions</div>
          <div>💳 Get testnet HBAR from <a href="https://portal.hedera.com/faucet" target="_blank" className="text-blue-600 hover:underline">faucet</a></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mama-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <h3 className="text-lg font-bold text-burgundy-800">Live Wallet Connected</h3>
        </div>
        <button
          onClick={disconnectWallet}
          className="text-sm text-neutral-600 hover:text-burgundy-600 transition-colors"
        >
          Disconnect
        </button>
      </div>

      <div className="space-y-4">
        {/* Network Status */}
        <div className={`p-3 rounded-lg border ${wallet.networkCorrect
          ? 'bg-green-50 border-green-200'
          : 'bg-orange-50 border-orange-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${wallet.networkCorrect ? 'bg-green-500' : 'bg-orange-500'}`}></div>
              <span className="text-sm font-medium">
                {wallet.networkCorrect ? 'Hedera Testnet' : 'Wrong Network'}
              </span>
            </div>
            {!wallet.networkCorrect && (
              <button
                onClick={switchToHedera}
                className="text-xs bg-orange-600 text-white px-2 py-1 rounded hover:bg-orange-700"
              >
                Switch
              </button>
            )}
          </div>
        </div>

        {/* EVM Address */}
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1">
            EVM Address
          </label>
          <div className="flex items-center space-x-2">
            <code className="text-sm bg-neutral-100 px-3 py-2 rounded-lg flex-1 font-mono">
              {wallet.account.slice(0, 6)}...{wallet.account.slice(-4)}
            </code>
            <button
              onClick={() => copyToClipboard(wallet.account!)}
              className="p-2 text-neutral-600 hover:text-burgundy-600 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
            <a
              href={`https://hashscan.io/testnet/account/${wallet.account}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-600 hover:text-burgundy-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Hedera Account ID */}
        {wallet.hederaAccountId && (
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-1">
              Hedera Account ID
            </label>
            <div className="flex items-center space-x-2">
              <code className="text-sm bg-purple-100 px-3 py-2 rounded-lg flex-1 font-mono text-purple-800">
                {wallet.hederaAccountId}
              </code>
              <button
                onClick={() => copyToClipboard(wallet.hederaAccountId!)}
                className="p-2 text-neutral-600 hover:text-burgundy-600 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Balance */}
        {wallet.balance && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-neutral-600">
                HBAR Balance
              </label>
              <button
                onClick={refreshBalance}
                className="p-1 text-neutral-600 hover:text-burgundy-600 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
            <div className="text-2xl font-bold text-burgundy-800 flex items-center">
              {wallet.balance} HBAR
              <Zap className="w-5 h-5 ml-2 text-yellow-500" />
            </div>
            <div className="text-xs text-neutral-500">
              ≈ ${(parseFloat(wallet.balance) * 0.10).toFixed(2)} USD
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t border-neutral-200 space-y-3">
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            Ready for blockchain transactions
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="mama-button-secondary text-sm py-2">
              Send HBAR
            </button>
            <button className="mama-button-primary text-sm py-2">
              Test Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}