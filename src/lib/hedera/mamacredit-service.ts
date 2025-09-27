// src/lib/hedera/mamacredit-service.ts
// Main MamaCredit service that orchestrates all platform operations

import { consensusService } from "./consensus";
import { tokenService } from "./tokens";
import { transactionService } from "./transactions";
import { hederaClient } from "./client";
import { AccountId } from "@hashgraph/sdk";

// ===== MAIN SERVICE INTERFACES =====
export interface UserRegistrationData {
  accountId: string;
  name: string;
  phoneNumber: string;
  guarantor1?: string;
  guarantor2?: string;
}

export interface CircleCreationData {
  name: string;
  monthlyContribution: number; // in tinybars
  maxMembers: number;
  description?: string;
  creator: string;
}

export interface ContributionData {
  circleId: string;
  memberAccountId: string;
  amount: number; // in tinybars
  round: number;
}

export interface EmergencyLoanData {
  circleId: string;
  borrowerAccountId: string;
  amount: number; // in tinybars
  reason: string;
  urgencyLevel: "low" | "medium" | "high";
}

export interface LoanVoteData {
  loanId: string;
  voterAccountId: string;
  vote: boolean;
  voterName: string;
}

// ===== MAIN MAMACREDIT SERVICE =====
export class MamaCreditService {
  
  constructor() {
    console.log("🌟 MamaCredit service initialized");
  }

  // ===== USER MANAGEMENT =====

  /**
   * Register a new woman user with sister guarantee system
   */
  async registerUser(userData: UserRegistrationData): Promise<string> {
    try {
      console.log(`👩 Registering user: ${userData.name}`);
      
      // Step 1: Submit user registration to HCS
      const txId = await consensusService.submitUserRegistration(userData);
      
      // Step 2: If guarantors provided, create sister guarantee
      if (userData.guarantor1 && userData.guarantor2) {
        await consensusService.submitSisterGuarantee({
          newMember: userData.accountId,
          guarantor1: userData.guarantor1,
          guarantor2: userData.guarantor2
        });
      }
      
      console.log(`✅ User registration submitted: ${txId}`);
      return txId;
    } catch (error) {
      console.error("Failed to register user:", error);
      throw error;
    }
  }

  /**
   * Verify a user (admin function)
   */
  async verifyUser(accountId: string): Promise<string> {
    try {
      console.log(`✓ Verifying user: ${accountId}`);
      
      // Step 1: Associate MAMA token with user
      await tokenService.associateTokenWithAccount(accountId);
      
      // Step 2: Submit verification to HCS
      const txId = await consensusService.submitUserVerification(accountId);
      
      console.log(`✅ User verified: ${txId}`);
      return txId;
    } catch (error) {
      console.error("Failed to verify user:", error);
      throw error;
    }
  }

  // ===== CIRCLE MANAGEMENT =====

  /**
   * Create a new savings circle
   */
  async createCircle(circleData: CircleCreationData): Promise<string> {
    try {
      console.log(`🔵 Creating circle: ${circleData.name}`);
      
      const circleId = `circle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const txId = await consensusService.submitCircleCreation({
        circleId,
        name: circleData.name,
        creator: circleData.creator,
        monthlyContribution: circleData.monthlyContribution,
        maxMembers: circleData.maxMembers,
        description: circleData.description
      });
      
      console.log(`✅ Circle created: ${circleId}`);
      return circleId;
    } catch (error) {
      console.error("Failed to create circle:", error);
      throw error;
    }
  }

  /**
   * Join an existing circle
   */
  async joinCircle(circleId: string, memberAccountId: string, memberName: string): Promise<string> {
    try {
      console.log(`👥 ${memberName} joining circle: ${circleId}`);
      
      const txId = await consensusService.submitMemberJoin({
        circleId,
        memberAccountId,
        memberName
      });
      
      console.log(`✅ Member joined circle: ${txId}`);
      return txId;
    } catch (error) {
      console.error("Failed to join circle:", error);
      throw error;
    }
  }

  // ===== SAVINGS & CONTRIBUTIONS =====

  /**
   * Make a monthly contribution to circle
   */
  async makeContribution(contributionData: ContributionData): Promise<{
    transactionId: string;
    consensusId: string;
    tokenTransferId: string;
  }> {
    try {
      console.log(`💰 Processing contribution: ${contributionData.amount} tinybars`);
      
      // Step 1: Process HBAR transfer (member to treasury)
      const hbarTransfer = await transactionService.processContribution(
        contributionData.memberAccountId,
        contributionData.amount,
        contributionData.circleId
      );
      
      // Step 2: Award MAMA tokens to member
      const tokenTransfer = await tokenService.transferTokensToUser(
        contributionData.memberAccountId,
        tokenService.hbarToMamaTokens(transactionService.tinybarsToHbar(contributionData.amount))
      );
      
      // Step 3: Record contribution in HCS
      const consensusId = await consensusService.submitContribution({
        ...contributionData,
        transactionId: hbarTransfer.transactionId
      });
      
      console.log(`✅ Contribution processed successfully`);
      
      return {
        transactionId: hbarTransfer.transactionId,
        consensusId,
        tokenTransferId: tokenTransfer
      };
    } catch (error) {
      console.error("Failed to process contribution:", error);
      throw error;
    }
  }

  /**
   * Distribute payout to circle member
   */
  async distributePayout(
    recipientAccountId: string,
    amount: number,
    circleId: string,
    round: number
  ): Promise<string> {
    try {
      console.log(`💸 Distributing payout: ${amount} tinybars to ${recipientAccountId}`);
      
      // Step 1: Process HBAR transfer (treasury to recipient)
      const hbarTransfer = await transactionService.processPayout(
        recipientAccountId,
        amount,
        circleId,
        round
      );
      
      // Step 2: Record payout in HCS
      const consensusId = await consensusService.submitMessage({
        type: "PAYOUT_DISTRIBUTION",
        timestamp: Date.now(),
        version: "1.0.0",
        data: {
          circleId,
          recipientAccountId,
          amount,
          round,
          transactionId: hbarTransfer.transactionId
        }
      });
      
      console.log(`✅ Payout distributed successfully: ${consensusId}`);
      return consensusId;
    } catch (error) {
      console.error("Failed to distribute payout:", error);
      throw error;
    }
  }

  // ===== EMERGENCY LOANS =====

  /**
   * Request emergency loan from circle
   */
  async requestEmergencyLoan(loanData: EmergencyLoanData): Promise<string> {
    try {
      console.log(`🆘 Emergency loan requested: ${loanData.amount} tinybars`);
      
      const loanId = `loan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const txId = await consensusService.submitEmergencyLoanRequest({
        loanId,
        ...loanData
      });
      
      console.log(`✅ Emergency loan request submitted: ${loanId}`);
      return loanId;
    } catch (error) {
      console.error("Failed to request emergency loan:", error);
      throw error;
    }
  }

  /**
   * Vote on emergency loan request
   */
  async voteOnEmergencyLoan(voteData: LoanVoteData): Promise<string> {
    try {
      console.log(`🗳️ Voting on loan ${voteData.loanId}: ${voteData.vote ? 'APPROVE' : 'REJECT'}`);
      
      const txId = await consensusService.submitEmergencyLoanVote(voteData);
      
      console.log(`✅ Vote submitted: ${txId}`);
      return txId;
    } catch (error) {
      console.error("Failed to vote on emergency loan:", error);
      throw error;
    }
  }

  /**
   * Approve and disburse emergency loan
   */
  async approveEmergencyLoan(
    loanId: string,
    borrowerAccountId: string,
    amount: number
  ): Promise<string> {
    try {
      console.log(`✅ Approving emergency loan: ${loanId}`);
      
      // Step 1: Process loan disbursement
      const hbarTransfer = await transactionService.processEmergencyLoan(
        borrowerAccountId,
        amount,
        loanId
      );
      
      // Step 2: Record approval in HCS
      const consensusId = await consensusService.submitMessage({
        type: "EMERGENCY_LOAN_APPROVAL",
        timestamp: Date.now(),
        version: "1.0.0",
        data: {
          loanId,
          borrowerAccountId,
          amount,
          approvedBy: "community_vote",
          dueDate: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
          transactionId: hbarTransfer.transactionId
        }
      });
      
      console.log(`✅ Emergency loan approved and disbursed: ${consensusId}`);
      return consensusId;
    } catch (error) {
      console.error("Failed to approve emergency loan:", error);
      throw error;
    }
  }

  /**
   * Repay emergency loan
   */
  async repayEmergencyLoan(
    loanId: string,
    borrowerAccountId: string,
    amount: number
  ): Promise<string> {
    try {
      console.log(`💰 Processing loan repayment: ${loanId}`);
      
      // Step 1: Process repayment transfer
      const hbarTransfer = await transactionService.processLoanRepayment(
        borrowerAccountId,
        amount,
        loanId
      );
      
      // Step 2: Record repayment in HCS
      const consensusId = await consensusService.submitMessage({
        type: "EMERGENCY_LOAN_REPAYMENT",
        timestamp: Date.now(),
        version: "1.0.0",
        data: {
          loanId,
          borrowerAccountId,
          amount,
          status: "repaid",
          transactionId: hbarTransfer.transactionId
        }
      });
      
      console.log(`✅ Loan repayment processed: ${consensusId}`);
      return consensusId;
    } catch (error) {
      console.error("Failed to process loan repayment:", error);
      throw error;
    }
  }

  // ===== UTILITY FUNCTIONS =====

  /**
   * Get account balance (HBAR + MAMA tokens)
   */
  async getAccountBalance(accountId: string) {
    try {
      const balance = await transactionService.getAccountBalance(accountId);
      return {
        ...balance,
        hbarFormatted: transactionService.formatHbarAmount(balance.hbarBalance),
        mamaTokensFormatted: tokenService.formatTokenAmount(balance.mamaTokenBalance)
      };
    } catch (error) {
      console.error("Failed to get account balance:", error);
      throw error;
    }
  }

  /**
   * Get treasury balance (platform funds)
   */
  async getTreasuryBalance() {
    try {
      return await transactionService.getTreasuryBalance();
    } catch (error) {
      console.error("Failed to get treasury balance:", error);
      throw error;
    }
  }

  /**
   * Check if user has sufficient balance for operation
   */
  async checkSufficientBalance(accountId: string, requiredAmount: number): Promise<boolean> {
    try {
      return await transactionService.hassufficient Balance(accountId, requiredAmount);
    } catch (error) {
      console.error("Failed to check sufficient balance:", error);
      return false;
    }
  }

  /**
   * Convert currency amounts
   */
  currencyHelpers = {
    hbarToTinybars: (hbar: number) => transactionService.hbarToTinybars(hbar),
    tinybarsToHbar: (tinybars: number) => transactionService.tinybarsToHbar(tinybars),
    hbarToMamaTokens: (hbar: number) => tokenService.hbarToMamaTokens(hbar),
    mamaTokensToHbar: (tokens: number) => tokenService.mamaTokensToHbar(tokens),
    formatHbar: (tinybars: number) => transactionService.formatHbarAmount(tinybars),
    formatTokens: (tokens: number) => tokenService.formatTokenAmount(tokens)
  };
}

// Export singleton instance
export const mamaCreditService = new MamaCreditService();