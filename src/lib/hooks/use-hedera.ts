'use client';

import { useState, useCallback } from 'react';

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
export function useHedera() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    accountId: null,
    balance: { hbar: 0, mama: 0, usd: 0 },
    isLoading: false,
    error: null
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userCircles, setUserCircles] = useState<CircleData[]>([]);

  // ===== WALLET OPERATIONS =====

  const connectWallet = useCallback(async (accountId?: string) => {
    setWalletState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Mock connection
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

    } catch (error) {
      setWalletState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet'
      }));
    }
  }, []);

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
    // Mock refresh
    console.log('Refreshing balance...');
  }, []);

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

  return {
    // State
    walletState,
    userProfile,
    userCircles,

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

    // Utilities
    currencyHelpers: {
      hbarToTinybars: (hbar: number) => hbar * 100000000,
      tinybarsToHbar: (tinybars: number) => tinybars / 100000000,
      hbarToMamaTokens: (hbar: number) => hbar * 1000
    }
  };
}