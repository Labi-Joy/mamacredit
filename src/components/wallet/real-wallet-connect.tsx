'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { Wallet, ExternalLink } from 'lucide-react';

export function RealWalletConnect() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!isConnected) {
    return (
      <div className="mama-card p-6 text-center">
        <Wallet className="w-16 h-16 text-orange-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-burgundy-800 mb-3">Connect Your Real Wallet</h3>
        <p className="text-neutral-600 mb-6">
          Connect your MetaMask or other wallet to interact with the Hedera network directly
        </p>
        <ConnectButton.Custom>
          {({ openConnectModal, connectModalOpen }) => (
            <button
              onClick={openConnectModal}
              disabled={connectModalOpen}
              className="mama-button-primary w-full justify-center"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Real Wallet
            </button>
          )}
        </ConnectButton.Custom>
      </div>
    );
  }

  return (
    <div className="mama-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-burgundy-800">Real Wallet Connected</h3>
        <ConnectButton showBalance={false} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1">
            Wallet Address
          </label>
          <div className="flex items-center space-x-2">
            <code className="text-sm bg-neutral-100 px-3 py-2 rounded-lg flex-1">
              {address?.slice(0, 8)}...{address?.slice(-6)}
            </code>
            <a
              href={`https://hashscan.io/testnet/account/${address}`}
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
              Balance
            </label>
            <div className="text-lg font-semibold text-burgundy-800">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-neutral-200">
          <p className="text-sm text-neutral-600">
            🔗 Connected to real blockchain network
          </p>
        </div>
      </div>
    </div>
  );
}