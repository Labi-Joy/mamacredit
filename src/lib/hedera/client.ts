// src/lib/hedera/client.ts
// Hedera client configuration and initialization

import { 
    Client, 
    PrivateKey, 
    AccountId,
    TopicId,
    TokenId
  } from "@hashgraph/sdk";
  
  // ===== ENVIRONMENT CONFIGURATION =====
  const HEDERA_NETWORK = process.env.NEXT_PUBLIC_HEDERA_NETWORK || "testnet";
  const OPERATOR_ID = process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID;
  const OPERATOR_KEY = process.env.HEDERA_PRIVATE_KEY;
  
  // Platform-specific IDs (will be set after deployment)
  export const PLATFORM_CONFIG = {
    TOPIC_ID: process.env.NEXT_PUBLIC_TOPIC_ID,
    SAVINGS_TOKEN_ID: process.env.NEXT_PUBLIC_SAVINGS_TOKEN_ID,
    TREASURY_ACCOUNT_ID: process.env.NEXT_PUBLIC_TREASURY_ACCOUNT_ID || OPERATOR_ID
  };
  
  // ===== CLIENT INITIALIZATION =====
  export class HederaClient {
    private static instance: HederaClient;
    public client: Client;
    public operatorId: AccountId;
    public operatorKey: PrivateKey;
  
    private constructor() {
      if (!OPERATOR_ID || !OPERATOR_KEY) {
        throw new Error("Missing Hedera credentials in environment variables");
      }
  
      // Initialize client based on network
      if (HEDERA_NETWORK === "mainnet") {
        this.client = Client.forMainnet();
      } else {
        this.client = Client.forTestnet();
      }
  
      this.operatorId = AccountId.fromString(OPERATOR_ID);
      this.operatorKey = PrivateKey.fromString(OPERATOR_KEY);
      
      // Set operator
      this.client.setOperator(this.operatorId, this.operatorKey);
      
      console.log(`Hedera client initialized for ${HEDERA_NETWORK}`);
      console.log(`Operator Account: ${this.operatorId.toString()}`);
    }
  
    /**
     * Get singleton instance of HederaClient
     */
    public static getInstance(): HederaClient {
      if (!HederaClient.instance) {
        HederaClient.instance = new HederaClient();
      }
      return HederaClient.instance;
    }
  
    /**
     * Get the Hedera client
     */
    public getClient(): Client {
      return this.client;
    }
  
    /**
     * Get operator account ID
     */
    public getOperatorId(): AccountId {
      return this.operatorId;
    }
  
    /**
     * Get operator private key
     */
    public getOperatorKey(): PrivateKey {
      return this.operatorKey;
    }
  
    /**
     * Get platform topic ID
     */
    public getTopicId(): TopicId | null {
      if (!PLATFORM_CONFIG.TOPIC_ID) return null;
      return TopicId.fromString(PLATFORM_CONFIG.TOPIC_ID);
    }
  
    /**
     * Get savings token ID
     */
    public getSavingsTokenId(): TokenId | null {
      if (!PLATFORM_CONFIG.SAVINGS_TOKEN_ID) return null;
      return TokenId.fromString(PLATFORM_CONFIG.SAVINGS_TOKEN_ID);
    }
  
    /**
     * Get treasury account ID
     */
    public getTreasuryAccountId(): AccountId {
      return AccountId.fromString(PLATFORM_CONFIG.TREASURY_ACCOUNT_ID || OPERATOR_ID);
    }
  
    /**
     * Close the client connection
     */
    public close(): void {
      this.client.close();
    }
  }
  
  // Export singleton instance
  export const hederaClient = HederaClient.getInstance();