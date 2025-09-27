// src/lib/hedera/tokens.ts
// Hedera Token Service (HTS) for MAMA savings tokens

import { 
    TokenCreateTransaction,
    TokenMintTransaction,
    TokenAssociateTransaction,
    TransferTransaction,
    TokenId,
    AccountId,
    TokenType,
    TokenSupplyType,
    AccountBalanceQuery,
    TokenInfoQuery
  } from "@hashgraph/sdk";
  import { hederaClient } from "./client";
  
  // ===== TOKEN CONFIGURATION =====
  export const TOKEN_CONFIG = {
    MAMA_TOKEN: {
      name: "MamaCredit Savings",
      symbol: "MAMA",
      decimals: 2, // Support cents (kobo)
      initialSupply: 0, // Mint as needed
      maxSupply: 1000000000 // 10 million MAMA tokens max
    }
  };
  
  // ===== TOKEN SERVICE CLASS =====
  export class TokenService {
    private client = hederaClient.getClient();
    private operatorId = hederaClient.getOperatorId();
    private operatorKey = hederaClient.getOperatorKey();
  
    /**
     * Create the MAMA savings token
     */
    async createSavingsToken(): Promise<TokenId> {
      try {
        const transaction = new TokenCreateTransaction()
          .setTokenName(TOKEN_CONFIG.MAMA_TOKEN.name)
          .setTokenSymbol(TOKEN_CONFIG.MAMA_TOKEN.symbol)
          .setTokenType(TokenType.FungibleCommon)
          .setDecimals(TOKEN_CONFIG.MAMA_TOKEN.decimals)
          .setInitialSupply(TOKEN_CONFIG.MAMA_TOKEN.initialSupply)
          .setMaxSupply(TOKEN_CONFIG.MAMA_TOKEN.maxSupply)
          .setSupplyType(TokenSupplyType.Finite)
          .setTreasuryAccountId(this.operatorId)
          .setAdminKey(this.operatorKey)
          .setSupplyKey(this.operatorKey)
          .setWipeKey(this.operatorKey)
          .setFeeScheduleKey(this.operatorKey)
          .setFreezeDefault(false)
          .setTokenMemo("MamaCredit savings tracking token for African women's circles");
  
        const response = await transaction.execute(this.client);
        const receipt = await response.getReceipt(this.client);
        
        if (!receipt.tokenId) {
          throw new Error("Failed to create MAMA token");
        }
  
        console.log(`MAMA token created: ${receipt.tokenId.toString()}`);
        return receipt.tokenId;
      } catch (error) {
        console.error("Failed to create MAMA token:", error);
        throw error;
      }
    }
  
    /**
     * Associate MAMA token with user account
     */
    async associateTokenWithAccount(accountId: AccountId | string): Promise<void> {
      try {
        const tokenId = hederaClient.getSavingsTokenId();
        if (!tokenId) {
          throw new Error("MAMA token not initialized");
        }
  
        const accountIdObj = typeof accountId === "string" 
          ? AccountId.fromString(accountId) 
          : accountId;
  
        const transaction = new TokenAssociateTransaction()
          .setAccountId(accountIdObj)
          .setTokenIds([tokenId]);
  
        const response = await transaction.execute(this.client);
        const receipt = await response.getReceipt(this.client);
        
        console.log(`MAMA token associated with account: ${accountIdObj.toString()}`);
      } catch (error) {
        console.error("Failed to associate MAMA token:", error);
        throw error;
      }
    }
  
    /**
     * Mint MAMA tokens to treasury
     */
    async mintTokensToTreasury(amount: number): Promise<void> {
      try {
        const tokenId = hederaClient.getSavingsTokenId();
        if (!tokenId) {
          throw new Error("MAMA token not initialized");
        }
  
        const transaction = new TokenMintTransaction()
          .setTokenId(tokenId)
          .setAmount(amount);
  
        const response = await transaction.execute(this.client);
        const receipt = await response.getReceipt(this.client);
        
        console.log(`Minted ${amount} MAMA tokens to treasury`);
      } catch (error) {
        console.error("Failed to mint MAMA tokens:", error);
        throw error;
      }
    }
  
    /**
     * Transfer MAMA tokens to user (reward for contributions)
     */
    async transferTokensToUser(
      recipientAccountId: AccountId | string, 
      amount: number
    ): Promise<string> {
      try {
        const tokenId = hederaClient.getSavingsTokenId();
        if (!tokenId) {
          throw new Error("MAMA token not initialized");
        }
  
        const recipientId = typeof recipientAccountId === "string" 
          ? AccountId.fromString(recipientAccountId) 
          : recipientAccountId;
  
        // First ensure recipient has enough tokens to mint
        await this.mintTokensToTreasury(amount);
  
        // Transfer tokens from treasury to user
        const transaction = new TransferTransaction()
          .addTokenTransfer(tokenId, this.operatorId, -amount)
          .addTokenTransfer(tokenId, recipientId, amount);
  
        const response = await transaction.execute(this.client);
        const receipt = await response.getReceipt(this.client);
        
        const transactionId = response.transactionId.toString();
        console.log(`Transferred ${amount} MAMA tokens to ${recipientId.toString()}`);
        
        return transactionId;
      } catch (error) {
        console.error("Failed to transfer MAMA tokens:", error);
        throw error;
      }
    }
  
    /**
     * Get MAMA token balance for account
     */
    async getTokenBalance(accountId: AccountId | string): Promise<number> {
      try {
        const accountIdObj = typeof accountId === "string" 
          ? AccountId.fromString(accountId) 
          : accountId;
  
        const query = new AccountBalanceQuery()
          .setAccountId(accountIdObj);
  
        const balance = await query.execute(this.client);
        
        const tokenId = hederaClient.getSavingsTokenId();
        if (!tokenId) {
          return 0;
        }
  
        const tokenBalance = balance.tokens?.get(tokenId) || 0;
        return Number(tokenBalance);
      } catch (error) {
        console.error("Failed to get token balance:", error);
        return 0;
      }
    }
  
    /**
     * Get MAMA token information
     */
    async getTokenInfo(): Promise<any> {
      try {
        const tokenId = hederaClient.getSavingsTokenId();
        if (!tokenId) {
          throw new Error("MAMA token not initialized");
        }
  
        const query = new TokenInfoQuery()
          .setTokenId(tokenId);
  
        const info = await query.execute(this.client);
        return {
          tokenId: info.tokenId?.toString(),
          name: info.name,
          symbol: info.symbol,
          decimals: info.decimals,
          totalSupply: info.totalSupply?.toString(),
          maxSupply: info.maxSupply?.toString(),
          treasury: info.treasuryAccountId?.toString(),
          adminKey: info.adminKey?.toString(),
          supplyKey: info.supplyKey?.toString()
        };
      } catch (error) {
        console.error("Failed to get token info:", error);
        throw error;
      }
    }
  
    /**
     * Convert HBAR amount to MAMA token equivalent (1 HBAR = 100 MAMA for simplicity)
     */
    hbarToMamaTokens(hbarAmount: number): number {
      return hbarAmount * 100; // 1 HBAR = 100 MAMA tokens
    }
  
    /**
     * Convert MAMA tokens to HBAR equivalent
     */
    mamaTokensToHbar(tokenAmount: number): number {
      return tokenAmount / 100; // 100 MAMA = 1 HBAR
    }
  
    /**
     * Format MAMA token amount for display (with decimals)
     */
    formatTokenAmount(amount: number): string {
      return (amount / 100).toFixed(2); // Convert to decimal format
    }
  
    /**
     * Parse MAMA token amount from user input
     */
    parseTokenAmount(amountString: string): number {
      const parsed = parseFloat(amountString);
      return Math.round(parsed * 100); // Convert to token units (no decimals)
    }
  }
  
  // Export singleton instance
  export const tokenService = new TokenService();