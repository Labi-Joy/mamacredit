'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  Client,
  AccountId,
  PrivateKey,
  AccountBalanceQuery,
  TransferTransaction,
  Hbar,
  AccountInfoQuery
} from '@hashgraph/sdk';

// ===== CONFIGURATION =====
const HEDERA_NETWORK = process.env.NEXT_PUBLIC_HEDERA_NETWORK || 'testnet';
const OPERATOR_ID = process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID;
const OPERATOR_KEY = process.env.HEDERA_PRIVATE_KEY;

// ===== TYPES =====
export interface WalletState {
  isConnected: boolean;
  accountId: string | null;
  balance: {
    hbar: number;
    mama: number;
    usd: number;
  };
  isLoading: boolean;
  error: string | null;
}

export interface UserProfile {
  accountId: string;
  name: string;
  phoneNumber: string;
  isVerified: boolean;
  registrationDate: Date;
  mamaTokensEarned: number;
  circlesJoined: number;
  emergencyLoansGiven: number;
}

export interface CircleData {
  circleId: string;
  name: string;
  creator: string;
  monthlyContribution: number;
  maxMembers: number;
  currentMembers: number;
  description?: string;
  status: 'active' | 'completed' | 'pending';
  members: string[];
  totalSaved: number;
  currentRound: number;
}

// ===== CUSTOM HOOK =====
export function useHedera(enableRealMode: boolean = false) {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    accountId: null,
    balance: { hbar: 0, mama: 0, usd: 0 },
    isLoading: false,
    error: null
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userCircles, setUserCircles] = useState<CircleData[]>([]);
  const [client, setClient] = useState<Client | null>(null);

  // Initialize Hedera client
  useEffect(() => {
    if (enableRealMode && OPERATOR_ID && OPERATOR_KEY) {
      try {
        const hederaClient = HEDERA_NETWORK === 'testnet'
          ? Client.forTestnet()
          : Client.forMainnet();

        hederaClient.setOperator(
          AccountId.fromString(OPERATOR_ID),
          PrivateKey.fromString(OPERATOR_KEY)
        );

        setClient(hederaClient);
        console.log('✅ Hedera client initialized for', HEDERA_NETWORK);
      } catch (error) {
        console.error('❌ Failed to initialize Hedera client:', error);
        setWalletState(prev => ({
          ...prev,
          error: 'Failed to initialize Hedera connection'
        }));
      }
    }
  }, [enableRealMode]);

  // ===== WALLET OPERATIONS =====

  const connectWallet = useCallback(async (accountId?: string) => {
    setWalletState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      if (enableRealMode && client && OPERATOR_ID) {
        // Real Hedera connection
        const targetAccountId = accountId || OPERATOR_ID;

        // Get real account balance
        const accountBalance = await new AccountBalanceQuery()
          .setAccountId(targetAccountId)
          .execute(client);

        const hbarBalance = accountBalance.hbars.toTinybars().toNumber() / 100_000_000;
        const usdBalance = hbarBalance * 0.10; // Mock USD conversion

        setWalletState({
          isConnected: true,
          accountId: targetAccountId,
          balance: {
            hbar: parseFloat(hbarBalance.toFixed(6)),
            mama: 0, // Will be fetched from HTS token when implemented
            usd: parseFloat(usdBalance.toFixed(2))
          },
          isLoading: false,
          error: null
        });

        console.log('✅ Connected to Hedera account:', targetAccountId);
        console.log('💰 Balance:', hbarBalance.toFixed(6), 'HBAR');

      } else {
        // Mock connection for demo mode
        await new Promise(resolve => setTimeout(resolve, 1000));

        setWalletState({
          isConnected: true,
          accountId: accountId || '0.0.123456',
          balance: {
            hbar: 125.5634,
            mama: 2500,
            usd: 12.55
          },
          isLoading: false,
          error: null
        });
      }

    } catch (error) {
      console.error('Error connecting wallet:', error);
      setWalletState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet'
      }));
    }
  }, [enableRealMode, client]);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      isConnected: false,
      accountId: null,
      balance: { hbar: 0, mama: 0, usd: 0 },
      isLoading: false,
      error: null
    });
    setUserProfile(null);
    setUserCircles([]);
  }, []);

  const refreshBalance = useCallback(async () => {
    if (enableRealMode && client && walletState.accountId) {
      try {
        const accountBalance = await new AccountBalanceQuery()
          .setAccountId(walletState.accountId)
          .execute(client);

        const hbarBalance = accountBalance.hbars.toTinybars().toNumber() / 100_000_000;
        const usdBalance = hbarBalance * 0.10;

        setWalletState(prev => ({
          ...prev,
          balance: {
            hbar: parseFloat(hbarBalance.toFixed(6)),
            mama: prev.balance.mama, // Keep existing MAMA balance
            usd: parseFloat(usdBalance.toFixed(2))
          }
        }));

        console.log('✅ Balance refreshed:', hbarBalance.toFixed(6), 'HBAR');
      } catch (error) {
        console.error('❌ Error refreshing balance:', error);
      }
    } else {
      console.log('🔄 Refreshing balance (demo mode)...');
    }
  }, [enableRealMode, client, walletState.accountId]);

  // ===== USER OPERATIONS =====

  const registerUser = useCallback(async (userData: {
    name: string;
    phoneNumber: string;
    guarantor1?: string;
    guarantor2?: string;
  }) => {
    // Mock registration
    return 'mock_transaction_id';
  }, []);

  // ===== CIRCLE OPERATIONS =====

  const createCircle = useCallback(async (circleData: {
    name: string;
    monthlyContribution: number;
    maxMembers: number;
    description?: string;
  }) => {
    // Mock circle creation
    return 'mock_circle_id';
  }, []);

  const joinCircle = useCallback(async (circleId: string) => {
    // Mock join circle
    return 'mock_transaction_id';
  }, []);

  const makeContribution = useCallback(async (circleId: string, amount: number, round: number) => {
    // Mock contribution
    return {
      transactionId: 'mock_transaction_id',
      consensusId: 'mock_consensus_id',
      tokenTransferId: 'mock_token_transfer_id'
    };
  }, []);

  // ===== EMERGENCY LOANS =====

  const requestEmergencyLoan = useCallback(async (loanData: {
    circleId: string;
    amount: number;
    reason: string;
    urgencyLevel: 'low' | 'medium' | 'high';
  }) => {
    // Mock loan request
    return 'mock_loan_id';
  }, []);

  const voteOnLoan = useCallback(async (loanId: string, vote: boolean) => {
    // Mock vote
    return 'mock_transaction_id';
  }, []);

  // ===== REAL HEDERA TRANSACTIONS =====

  const sendHbar = useCallback(async (toAccountId: string, amount: number) => {
    if (!enableRealMode || !client || !OPERATOR_ID) {
      console.log('🎭 Demo mode: Would send', amount, 'HBAR to', toAccountId);
      return 'demo_transaction_id';
    }

    try {
      const transferTransaction = new TransferTransaction()
        .addHbarTransfer(AccountId.fromString(OPERATOR_ID), Hbar.fromTinybars(-amount * 100_000_000))
        .addHbarTransfer(toAccountId, Hbar.fromTinybars(amount * 100_000_000))
        .setTransactionMemo(`MamaCredit demo: ${amount} HBAR`);

      const response = await transferTransaction.execute(client);
      const receipt = await response.getReceipt(client);

      console.log('✅ HBAR transfer successful!');
      console.log('📄 Transaction ID:', response.transactionId.toString());
      console.log('✔️ Status:', receipt.status.toString());

      // Refresh balance after transaction
      await refreshBalance();

      return response.transactionId.toString();

    } catch (error) {
      console.error('❌ Error sending HBAR:', error);
      throw error;
    }
  }, [enableRealMode, client, refreshBalance]);

  const testConnection = useCallback(async () => {
    if (!enableRealMode || !client || !OPERATOR_ID) {
      return { success: false, message: 'Demo mode - no real connection' };
    }

    try {
      await new AccountInfoQuery()
        .setAccountId(OPERATOR_ID)
        .execute(client);

      return { success: true, message: 'Hedera connection successful!' };
    } catch (error) {
      return { success: false, message: 'Hedera connection failed: ' + error };
    }
  }, [enableRealMode, client]);

  return {
    // State
    walletState,
    userProfile,
    userCircles,

    // Mode information
    isRealMode: enableRealMode,
    isClientReady: !!client,
    operatorAccountId: OPERATOR_ID,

    // Wallet operations
    connectWallet,
    disconnectWallet,
    refreshBalance,

    // User operations
    registerUser,

    // Circle operations
    createCircle,
    joinCircle,
    makeContribution,

    // Emergency loans
    requestEmergencyLoan,
    voteOnLoan,

    // Real Hedera transactions
    sendHbar,
    testConnection,

    // Utilities
    currencyHelpers: {
      hbarToTinybars: (hbar: number) => hbar * 100000000,
      tinybarsToHbar: (tinybars: number) => tinybars / 100000000,
      hbarToMamaTokens: (hbar: number) => hbar * 1000
    }
  };
}