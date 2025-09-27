// src/lib/hedera/transactions.ts
// HBAR transfer and transaction management

import { 
    TransferTransaction,
    AccountBalanceQuery,
    TransactionReceiptQuery,
    TransactionRecordQuery,
    AccountId,
    Hbar,
    TransactionId
  } from "@hashgraph/sdk";
  import { hederaClient } from "./client";
  
  // ===== TRANSACTION INTERFACES =====
  export interface TransactionResult {
    transactionId: string;
    status: string;
    amount: number;
    fromAccount: string;
    toAccount: string;
    timestamp: Date;
  }
  
  export interface AccountBalance {
    accountId: string;
    hbarBalance: number;
    mamaTokenBalance: number;
  }
  
  // ===== TRANSACTION SERVICE CLASS =====
  export class TransactionService {
    private client = hederaClient.getClient();
    private operatorId = hederaClient.getOperatorId();
    private treasuryId = hederaClient.getTreasuryAccountId();
  
    /**
     * Transfer HBAR between accounts
     */
    async transferHbar(
      fromAccountId: AccountId | string,
      toAccountId: AccountId | string,
      amount: number // Amount in tinybars
    ): Promise<TransactionResult> {
      try {
        const fromId = typeof fromAccountId === "string" 
          ? AccountId.fromString(fromAccountId) 
          : fromAccountId;
        
        const toId = typeof toAccountId === "string" 
          ? AccountId.fromString(toAccountId) 
          : toAccountId;
  
        const transaction = new TransferTransaction()
          .addHbarTransfer(fromId, Hbar.fromTinybars(-amount))
          .addHbarTransfer(toId, Hbar.fromTinybars(amount))
          .setTransactionMemo(`MamaCredit transfer: ${amount} tinybars`);
  
        const response = await transaction.execute(this.client);
        const receipt = await response.getReceipt(this.client);
        
        const result: TransactionResult = {
          transactionId: response.transactionId.toString(),
          status: receipt.status.toString(),
          amount: repaymentAmount,
          fromAccount: borrowerId.toString(),
          toAccount: this.treasuryId.toString(),
          timestamp: new Date()
        };
  
        console.log(`Loan repayment processed: ${result.transactionId}`);
        return result;
      } catch (error) {
        console.error("Loan repayment processing failed:", error);
        throw error;
      }
    }
  
    /**
     * Get account balance (HBAR only)
     */
    async getAccountBalance(accountId: AccountId | string): Promise<AccountBalance> {
      try {
        const accountIdObj = typeof accountId === "string" 
          ? AccountId.fromString(accountId) 
          : accountId;
  
        const query = new AccountBalanceQuery()
          .setAccountId(accountIdObj);
  
        const balance = await query.execute(this.client);
        
        // Get MAMA token balance if available
        const tokenId = hederaClient.getSavingsTokenId();
        const mamaTokenBalance = tokenId ? (balance.tokens?.get(tokenId) || 0) : 0;
  
        return {
          accountId: accountIdObj.toString(),
          hbarBalance: balance.hbars.toTinybars().toNumber(),
          mamaTokenBalance: Number(mamaTokenBalance)
        };
      } catch (error) {
        console.error("Failed to get account balance:", error);
        throw error;
      }
    }
  
    /**
     * Get transaction details
     */
    async getTransactionDetails(transactionId: string): Promise<any> {
      try {
        const txId = TransactionId.fromString(transactionId);
        
        const query = new TransactionRecordQuery()
          .setTransactionId(txId);
  
        const record = await query.execute(this.client);
        
        return {
          transactionId: record.transactionId.toString(),
          consensusTimestamp: record.consensusTimestamp?.toDate(),
          transactionFee: record.transactionFee.toTinybars().toNumber(),
          memo: record.transactionMemo,
          transfers: record.transferList?.map(transfer => ({
            accountId: transfer.accountId?.toString(),
            amount: transfer.amount.toTinybars().toNumber()
          })) || []
        };
      } catch (error) {
        console.error("Failed to get transaction details:", error);
        throw error;
      }
    }
  
    /**
     * Check if account has sufficient balance
     */
    async hassufficient Balance(
      accountId: AccountId | string, 
      requiredAmount: number
    ): Promise<boolean> {
      try {
        const balance = await this.getAccountBalance(accountId);
        return balance.hbarBalance >= requiredAmount;
      } catch (error) {
        console.error("Failed to check balance:", error);
        return false;
      }
    }
  
    /**
     * Convert HBAR to tinybars
     */
    hbarToTinybars(hbarAmount: number): number {
      return Math.round(hbarAmount * 100000000); // 1 HBAR = 100,000,000 tinybars
    }
  
    /**
     * Convert tinybars to HBAR
     */
    tinybarsToHbar(tinybars: number): number {
      return tinybars / 100000000;
    }
  
    /**
     * Format HBAR amount for display
     */
    formatHbarAmount(tinybars: number): string {
      return this.tinybarsToHbar(tinybars).toFixed(8);
    }
  
    /**
     * Get treasury balance (platform funds)
     */
    async getTreasuryBalance(): Promise<AccountBalance> {
      return await this.getAccountBalance(this.treasuryId);
    }
  
    /**
     * Estimate transaction fee
     */
    async estimateTransferFee(): Promise<number> {
      // Typical HBAR transfer fee is around 0.0001 HBAR
      return this.hbarToTinybars(0.0001);
    }
  }
  
  // Export singleton instance
  export const transactionService = new TransactionService();pt(this.client);
        
        const result: TransactionResult = {
          transactionId: response.transactionId.toString(),
          status: receipt.status.toString(),
          amount: amount,
          fromAccount: fromId.toString(),
          toAccount: toId.toString(),
          timestamp: new Date()
        };
  
        console.log(`HBAR transfer completed: ${result.transactionId}`);
        return result;
      } catch (error) {
        console.error("HBAR transfer failed:", error);
        throw error;
      }
    }
  
    /**
     * Process savings contribution (user pays to treasury)
     */
    async processContribution(
      memberAccountId: AccountId | string,
      contributionAmount: number, // Amount in tinybars
      circleId: string
    ): Promise<TransactionResult> {
      try {
        const memberId = typeof memberAccountId === "string" 
          ? AccountId.fromString(memberAccountId) 
          : memberAccountId;
  
        const memo = `MamaCredit contribution: Circle ${circleId}`;
        
        const transaction = new TransferTransaction()
          .addHbarTransfer(memberId, Hbar.fromTinybars(-contributionAmount))
          .addHbarTransfer(this.treasuryId, Hbar.fromTinybars(contributionAmount))
          .setTransactionMemo(memo);
  
        const response = await transaction.execute(this.client);
        const receipt = await response.getReceipt(this.client);
        
        const result: TransactionResult = {
          transactionId: response.transactionId.toString(),
          status: receipt.status.toString(),
          amount: contributionAmount,
          fromAccount: memberId.toString(),
          toAccount: this.treasuryId.toString(),
          timestamp: new Date()
        };
  
        console.log(`Contribution processed: ${result.transactionId}`);
        return result;
      } catch (error) {
        console.error("Contribution processing failed:", error);
        throw error;
      }
    }
  
    /**
     * Process payout distribution (treasury pays to member)
     */
    async processPayout(
      recipientAccountId: AccountId | string,
      payoutAmount: number, // Amount in tinybars
      circleId: string,
      round: number
    ): Promise<TransactionResult> {
      try {
        const recipientId = typeof recipientAccountId === "string" 
          ? AccountId.fromString(recipientAccountId) 
          : recipientAccountId;
  
        const memo = `MamaCredit payout: Circle ${circleId}, Round ${round}`;
        
        const transaction = new TransferTransaction()
          .addHbarTransfer(this.treasuryId, Hbar.fromTinybars(-payoutAmount))
          .addHbarTransfer(recipientId, Hbar.fromTinybars(payoutAmount))
          .setTransactionMemo(memo);
  
        const response = await transaction.execute(this.client);
        const receipt = await response.getReceipt(this.client);
        
        const result: TransactionResult = {
          transactionId: response.transactionId.toString(),
          status: receipt.status.toString(),
          amount: payoutAmount,
          fromAccount: this.treasuryId.toString(),
          toAccount: recipientId.toString(),
          timestamp: new Date()
        };
  
        console.log(`Payout processed: ${result.transactionId}`);
        return result;
      } catch (error) {
        console.error("Payout processing failed:", error);
        throw error;
      }
    }
  
    /**
     * Process emergency loan disbursement
     */
    async processEmergencyLoan(
      borrowerAccountId: AccountId | string,
      loanAmount: number, // Amount in tinybars
      loanId: string
    ): Promise<TransactionResult> {
      try {
        const borrowerId = typeof borrowerAccountId === "string" 
          ? AccountId.fromString(borrowerAccountId) 
          : borrowerAccountId;
  
        const memo = `MamaCredit emergency loan: ${loanId}`;
        
        const transaction = new TransferTransaction()
          .addHbarTransfer(this.treasuryId, Hbar.fromTinybars(-loanAmount))
          .addHbarTransfer(borrowerId, Hbar.fromTinybars(loanAmount))
          .setTransactionMemo(memo);
  
        const response = await transaction.execute(this.client);
        const receipt = await response.getReceipt(this.client);
        
        const result: TransactionResult = {
          transactionId: response.transactionId.toString(),
          status: receipt.status.toString(),
          amount: loanAmount,
          fromAccount: this.treasuryId.toString(),
          toAccount: borrowerId.toString(),
          timestamp: new Date()
        };
  
        console.log(`Emergency loan disbursed: ${result.transactionId}`);
        return result;
      } catch (error) {
        console.error("Emergency loan disbursement failed:", error);
        throw error;
      }
    }
  
    /**
     * Process loan repayment
     */
    async processLoanRepayment(
      borrowerAccountId: AccountId | string,
      repaymentAmount: number, // Amount in tinybars
      loanId: string
    ): Promise<TransactionResult> {
      try {
        const borrowerId = typeof borrowerAccountId === "string" 
          ? AccountId.fromString(borrowerAccountId) 
          : borrowerAccountId;
  
        const memo = `MamaCredit loan repayment: ${loanId}`;
        
        const transaction = new TransferTransaction()
          .addHbarTransfer(borrowerId, Hbar.fromTinybars(-repaymentAmount))
          .addHbarTransfer(this.treasuryId, Hbar.fromTinybars(repaymentAmount))
          .setTransactionMemo(memo);
  
        const response = await transaction.execute(this.client);
        const receipt = await response.getRecei