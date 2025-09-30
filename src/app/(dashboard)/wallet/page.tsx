'use client';

import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  Send,
  Download,
  Copy,
  ExternalLink,
  Shield,
  Crown,
  Star,
  Clock,
  CheckCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Activity,
  Award,
  Zap,
  Info,
  Code,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useHedera } from '@/lib/hooks/use-hedera';
import { SimpleWalletConnect } from '@/components/wallet/simple-wallet-connect';
import { EnhancedWalletConnect } from '@/components/wallet/enhanced-wallet-connect';

export default function WalletPage() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showRealIntegration, setShowRealIntegration] = useState(false);
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);

  // Real Hedera integration hook
  const hedera = useHedera(isDeveloperMode);

  // Mock wallet data - in production, this comes from Hedera SDK
  const walletData = {
    isConnected: true,
    accountId: '0.0.123456',
    network: 'testnet',
    balances: {
      hbar: 125.5634, // HBAR balance
      mama: 2500, // MAMA token balance
      usd: 12.55 // USD equivalent (1 HBAR ≈ $0.10 for demo)
    },
    transactions: [
      {
        id: 'txn_1',
        type: 'contribution',
        amount: -50000, // in tinybars (50000 tinybars = 0.0005 HBAR)
        amountHbar: 0.5,
        tokenAmount: 100, // MAMA tokens earned
        description: 'Monthly contribution to Lagos Market Queens',
        status: 'success',
        timestamp: '2025-04-02T14:30:00Z',
        transactionId: '0.0.123456@1709389800.123456789',
        circle: 'Lagos Market Queens',
        consensusTimestamp: '2025-04-02T14:30:15.123456789Z'
      },
      {
        id: 'txn_2',
        type: 'reward',
        amount: 50, // MAMA tokens
        amountHbar: 0,
        tokenAmount: 50,
        description: 'Badge reward: Faithful Gardener achievement',
        status: 'success',
        timestamp: '2025-04-01T10:15:00Z',
        transactionId: '0.0.123456@1709303700.987654321',
        circle: null,
        consensusTimestamp: '2025-04-01T10:15:12.987654321Z'
      },
      {
        id: 'txn_3',
        type: 'emergency_vote',
        amount: 0,
        amountHbar: 0,
        tokenAmount: 50,
        description: 'Emergency loan support vote - Grace Okafor',
        status: 'success',
        timestamp: '2025-03-30T16:45:00Z',
        transactionId: '0.0.123456@1709145900.456789123',
        circle: 'Lagos Market Queens',
        consensusTimestamp: '2025-03-30T16:45:18.456789123Z'
      },
      {
        id: 'txn_4',
        type: 'payout',
        amount: 450000,
        amountHbar: 4.5,
        tokenAmount: 0,
        description: 'Monthly payout received - Round 2',
        status: 'success',
        timestamp: '2025-03-15T09:00:00Z',
        transactionId: '0.0.123456@1708876800.789123456',
        circle: 'Young Professionals United',
        consensusTimestamp: '2025-03-15T09:00:23.789123456Z'
      },
      {
        id: 'txn_5',
        type: 'marketplace',
        amount: -3500,
        amountHbar: 0.035,
        tokenAmount: -35,
        description: 'Purchased: Premium Shea Butter Hair Cream',
        status: 'success',
        timestamp: '2025-03-10T14:20:00Z',
        transactionId: '0.0.123456@1708441200.321654987',
        circle: null,
        consensusTimestamp: '2025-03-10T14:20:11.321654987Z'
      }
    ],
    achievements: [
      {
        id: 'badge_1',
        name: 'Faithful Gardener',
        description: 'Made contributions for 6 consecutive months',
        icon: '🌱',
        rarity: 'common',
        earnedDate: '2025-04-01',
        mamaTokens: 300,
        nftId: 'NFT-0.0.789012-1'
      },
      {
        id: 'badge_2',
        name: 'Circle Leader',
        description: 'Created and successfully led a savings circle',
        icon: '👑',
        rarity: 'rare',
        earnedDate: '2025-02-15',
        mamaTokens: 500,
        nftId: 'NFT-0.0.789012-2'
      },
      {
        id: 'badge_3',
        name: 'Sister Supporter',
        description: 'Voted to support 10 emergency loan requests',
        icon: '🤝',
        rarity: 'common',
        earnedDate: '2025-03-20',
        mamaTokens: 200,
        nftId: 'NFT-0.0.789012-3'
      }
    ],
    stats: {
      totalContributions: 9,
      totalSaved: 450000,
      emergencyLoansSupported: 7,
      circlesJoined: 2,
      mamaTokensEarned: 2500,
      transactionCount: 45
    }
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    // In production: integrate with HashPack wallet
    setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
  };

  const handleRefreshBalance = async () => {
    console.log('Refreshing balance from Hedera network...');
    // In production: fetch latest balance from Hedera Mirror Node
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatHbar = (amount: number) => {
    return amount.toFixed(4) + ' ℏ';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-NG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'contribution':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />;
      case 'payout':
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />;
      case 'reward':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'emergency_vote':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'marketplace':
        return <Coins className="w-5 h-5 text-purple-500" />;
      default:
        return <Activity className="w-5 h-5 text-neutral-500" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-pink-500';
      case 'uncommon': return 'from-blue-400 to-indigo-500';
      default: return 'from-green-400 to-emerald-500';
    }
  };

  return (
    <div className="p-6 pb-20 lg:pb-6">
      {/* Wallet Connection Card */}
      {!walletData.isConnected ? (
        <div className="mama-card p-8 text-center mb-8">
          <Wallet className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-burgundy-800 mb-3">Connect Your Wallet</h2>
          <p className="text-neutral-600 mb-6 max-w-md mx-auto">
            Connect your Hedera wallet to access your HBAR balance, MAMA tokens, and transaction history.
          </p>
          <button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="mama-button-primary inline-flex items-center"
          >
            {isConnecting ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5 mr-2" />
                Connect HashPack Wallet
              </>
            )}
          </button>
        </div>
      ) : (
        <>
          {/* Balance Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* HBAR Balance */}
            <div className="mama-card p-6 bg-gradient-to-br from-burgundy-600 to-red-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-red-200 text-sm">HBAR Balance</div>
                    <div className="text-xs text-red-300">{walletData.network}</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isBalanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              <div className="mb-2">
                {isBalanceVisible ? (
                  <div className="text-3xl font-bold">{formatHbar(walletData.balances.hbar)}</div>
                ) : (
                  <div className="text-3xl font-bold">••••••</div>
                )}
                {isBalanceVisible && (
                  <div className="text-red-200 text-sm">≈ ${walletData.balances.usd.toFixed(2)} USD</div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                  <Send className="w-4 h-4 mr-1" />
                  Send
                </button>
                <button className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                  <Download className="w-4 h-4 mr-1" />
                  Receive
                </button>
              </div>
            </div>

            {/* MAMA Tokens */}
            <div className="mama-card p-6 bg-gradient-to-br from-orange-400 to-red-500 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-red-200 text-sm">MAMA Tokens</div>
                    <div className="text-xs text-red-300">Reward Points</div>
                  </div>
                </div>
                <button
                  onClick={handleRefreshBalance}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-2">
                <div className="text-3xl font-bold">{walletData.balances.mama.toLocaleString()}</div>
                <div className="text-red-200 text-sm">MAMA</div>
              </div>

              <div className="flex items-center text-sm text-red-200 mt-4">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+150 this month</span>
              </div>
            </div>

            {/* Account Info */}
            <div className="mama-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-neutral-600">Account ID</div>
                  <div className="text-xs text-neutral-500">Hedera {walletData.network}</div>
                </div>
              </div>

              <div className="bg-neutral-100 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-burgundy-800">{walletData.accountId}</code>
                  <button
                    onClick={() => copyToClipboard(walletData.accountId)}
                    className="p-1 hover:bg-neutral-200 rounded transition-colors"
                  >
                    <Copy className="w-4 h-4 text-neutral-600" />
                  </button>
                </div>
              </div>

              <a
                href={`https://hashscan.io/${walletData.network}/account/${walletData.accountId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-burgundy-600 hover:text-burgundy-800 font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View on HashScan
              </a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="mama-card p-4 text-center">
              <Activity className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-burgundy-800">{walletData.stats.transactionCount}</div>
              <div className="text-xs text-neutral-600">Transactions</div>
            </div>

            <div className="mama-card p-4 text-center">
              <Coins className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-burgundy-800">{walletData.stats.totalContributions}</div>
              <div className="text-xs text-neutral-600">Contributions</div>
            </div>

            <div className="mama-card p-4 text-center">
              <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-burgundy-800">{formatCurrency(walletData.stats.totalSaved)}</div>
              <div className="text-xs text-neutral-600">Total Saved</div>
            </div>

            <div className="mama-card p-4 text-center">
              <Shield className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-burgundy-800">{walletData.stats.emergencyLoansSupported}</div>
              <div className="text-xs text-neutral-600">Sisters Helped</div>
            </div>

            <div className="mama-card p-4 text-center">
              <Crown className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-burgundy-800">{walletData.stats.mamaTokensEarned}</div>
              <div className="text-xs text-neutral-600">MAMA Earned</div>
            </div>

            <div className="mama-card p-4 text-center">
              <Star className="w-6 h-6 text-pink-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-burgundy-800">{walletData.achievements.length}</div>
              <div className="text-xs text-neutral-600">Badges</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mama-card p-6 mb-8">
            <div className="flex border-b border-neutral-200 mb-6">
              {[
                { id: 'overview', label: 'Transactions', icon: <Activity className="w-4 h-4" /> },
                { id: 'achievements', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
                { id: 'tokens', label: 'My Tokens', icon: <Coins className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center px-4 py-3 font-medium transition-all ${
                    selectedTab === tab.id
                      ? 'text-burgundy-800 border-b-2 border-burgundy-600'
                      : 'text-neutral-600 hover:text-burgundy-600'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Transactions Tab */}
            {selectedTab === 'overview' && (
              <div className="space-y-4">
                {walletData.transactions.map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        {getTransactionIcon(txn.type)}
                      </div>

                      <div className="flex-1">
                        <div className="font-semibold text-burgundy-800">{txn.description}</div>
                        <div className="flex items-center gap-3 text-sm text-neutral-600">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(txn.timestamp)}
                          </span>
                          {txn.circle && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                              {txn.circle}
                            </span>
                          )}
                          <span className={`flex items-center ${
                            txn.status === 'success' ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {txn.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`font-bold ${
                        txn.amount >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {txn.amountHbar > 0 ? (
                          <>{txn.amount >= 0 ? '+' : ''}{formatHbar(txn.amountHbar)}</>
                        ) : (
                          <>{txn.tokenAmount >= 0 ? '+' : ''}{txn.tokenAmount} MAMA</>
                        )}
                      </div>
                      <a
                        href={`https://hashscan.io/${walletData.network}/transaction/${txn.transactionId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-neutral-500 hover:text-burgundy-600 flex items-center justify-end"
                      >
                        View <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements Tab */}
            {selectedTab === 'achievements' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {walletData.achievements.map((achievement) => (
                  <div key={achievement.id} className="mama-card p-6 hover:scale-105 transition-transform">
                    <div className={`w-16 h-16 bg-gradient-to-br ${getRarityColor(achievement.rarity)} rounded-xl flex items-center justify-center text-3xl mb-4 mx-auto`}>
                      {achievement.icon}
                    </div>

                    <h4 className="font-semibold text-burgundy-800 text-center mb-2">{achievement.name}</h4>
                    <p className="text-sm text-neutral-600 text-center mb-3">{achievement.description}</p>

                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-1 rounded-full capitalize ${
                        achievement.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-700' :
                        achievement.rarity === 'rare' ? 'bg-purple-100 text-purple-700' :
                        achievement.rarity === 'uncommon' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {achievement.rarity}
                      </span>
                      <span className="text-neutral-600">+{achievement.mamaTokens} MAMA</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-200">
                      <div className="flex items-center justify-between text-xs text-neutral-600">
                        <span>NFT ID:</span>
                        <code className="text-xs">{achievement.nftId}</code>
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">
                        Earned: {formatDate(achievement.earnedDate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tokens Tab */}
            {selectedTab === 'tokens' && (
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-r from-burgundy-50 to-red-50 rounded-xl border border-burgundy-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-burgundy-600 to-red-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold">ℏ</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-burgundy-800">HBAR</h4>
                        <p className="text-sm text-neutral-600">Native Hedera Token</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-burgundy-800">{formatHbar(walletData.balances.hbar)}</div>
                      <div className="text-sm text-neutral-600">${walletData.balances.usd.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-600">
                    Token ID: 0.0.0 (Native)
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-3">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-burgundy-800">MAMA Token</h4>
                        <p className="text-sm text-neutral-600">MamaCredit Rewards</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-burgundy-800">{walletData.balances.mama.toLocaleString()}</div>
                      <div className="text-sm text-neutral-600">MAMA</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span>Token ID:</span>
                      <code>{process.env.NEXT_PUBLIC_SAVINGS_TOKEN_ID || '0.0.XXXXXX'}</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Exchange Rate:</span>
                      <span>1 MAMA = ₦10</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <div className="flex items-center mb-3">
                    <Info className="w-5 h-5 text-purple-600 mr-2" />
                    <h4 className="font-semibold text-burgundy-800">About MAMA Tokens</h4>
                  </div>
                  <p className="text-sm text-neutral-700 mb-3">
                    MAMA tokens are reward points earned through platform participation. Use them for:
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Marketplace discounts and purchases</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Circle fee reductions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Premium features access</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Future redemption for cash value</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Hedera Network Info */}
          <div className="mama-card p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Powered by Hedera 🚀</h3>
                <p className="text-indigo-100 mb-4">
                  Your wallet runs on the Hedera network - fast, secure, and eco-friendly blockchain technology.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold">~3-5s</div>
                    <div className="text-xs text-indigo-200">Transaction Speed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">$0.0001</div>
                    <div className="text-xs text-indigo-200">Average Fee</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Carbon-</div>
                    <div className="text-xs text-indigo-200">Negative Network</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">aBFT</div>
                    <div className="text-xs text-indigo-200">Consensus Security</div>
                  </div>
                </div>
              </div>
              <Zap className="w-16 h-16 opacity-50" />
            </div>
          </div>

          {/* Real Wallet Demo */}
          <div className="mama-card mt-5  p-6 border-2 border-dashed border-blue-200 bg-blue-50/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Wallet className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-bold text-burgundy-800">Real Wallet Demo</h3>
                  <p className="text-sm text-neutral-600">Connect MetaMask & other wallets</p>
                </div>
              </div>
              <button
                onClick={() => setShowRealIntegration(!showRealIntegration)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                  showRealIntegration
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                <Wallet className="w-4 h-4 mr-2" />
                {showRealIntegration ? 'Live' : 'Demo'}
              </button>
            </div>

            {showRealIntegration ? (
              <EnhancedWalletConnect />
            ) : (
              <div className="text-center py-6">
                <div className="text-neutral-600 mb-2">
                  👆 Toggle Real Wallet Demo to connect your actual MetaMask wallet
                </div>
                <div className="text-xs text-neutral-500">
                  (Works with Hedera Testnet)
                </div>
              </div>
            )}
          </div>

          {/* Developer Mode Integration Demo */}
          <div className="mama-card mt-3 p-6 border-2 border-dashed border-orange-200 bg-orange-50/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Code className="w-6 h-6 text-orange-600 mr-3" />
                <div>
                  <h3 className="font-bold text-burgundy-800">Developer Mode</h3>
                  <p className="text-sm text-neutral-600">Hedera demo contract integration</p>
                </div>
              </div>
              <button
                onClick={() => setIsDeveloperMode(!isDeveloperMode)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                  isDeveloperMode
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-orange-600 border border-orange-200 hover:bg-orange-50'
                }`}
              >
                {isDeveloperMode ? <Wifi className="w-4 h-4 mr-2" /> : <WifiOff className="w-4 h-4 mr-2" />}
                {isDeveloperMode ? 'Live' : 'Demo'}
              </button>
            </div>

            {isDeveloperMode ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-burgundy-800">Real Hedera Connection</span>
                    <div className="flex items-center text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      {hedera.walletState.isConnected ? 'Connected' : 'Disconnected'}
                    </div>
                  </div>

                  {hedera.walletState.isConnected ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Account:</span>
                        <code className="text-burgundy-800">{hedera.walletState.accountId}</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Real HBAR:</span>
                        <span className="text-burgundy-800">{hedera.walletState.balance.hbar.toFixed(4)} ℏ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Real MAMA:</span>
                        <span className="text-burgundy-800">{hedera.walletState.balance.mama} MAMA</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <button
                        onClick={() => hedera.connectWallet()}
                        className="mama-button-secondary text-sm"
                        disabled={hedera.walletState.isLoading}
                      >
                        {hedera.walletState.isLoading ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <Wallet className="w-4 h-4 mr-2" />
                            Connect Real Wallet
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Safe Integration Demo:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Uses your existing Hedera testnet configuration</li>
                        <li>• Connects to real contracts but with minimal test amounts</li>
                        <li>• This is just for demonstration purposes</li>
                        <li>• No mainnet exposure - completely safe for demos</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-neutral-600 mb-2">
                  👆 Toggle Developer Mode to see real Hedera contract integration in action
                </div>
                <div className="text-xs text-neutral-500">
                  (Safe testnet demo mode)
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}