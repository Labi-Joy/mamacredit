// src/lib/hedera/consensus.ts
// Hedera Consensus Service (HCS) for state management

import { 
    TopicCreateTransaction, 
    TopicMessageSubmitTransaction,
    TopicInfoQuery,
    TopicId
  } from "@hashgraph/sdk";
  import { hederaClient } from "./client";
  
  // ===== MESSAGE TYPES =====
  export const MESSAGE_TYPES = {
    // User Management
    USER_REGISTRATION: "USER_REGISTRATION",
    SISTER_GUARANTEE: "SISTER_GUARANTEE", 
    USER_VERIFICATION: "USER_VERIFICATION",
    
    // Circle Management
    CIRCLE_CREATION: "CIRCLE_CREATION",
    MEMBER_JOIN: "MEMBER_JOIN",
    CIRCLE_UPDATE: "CIRCLE_UPDATE",
    
    // Financial Operations
    CONTRIBUTION: "CONTRIBUTION",
    PAYOUT_DISTRIBUTION: "PAYOUT_DISTRIBUTION", 
    
    // Emergency Loans
    EMERGENCY_LOAN_REQUEST: "EMERGENCY_LOAN_REQUEST",
    EMERGENCY_LOAN_VOTE: "EMERGENCY_LOAN_VOTE",
    EMERGENCY_LOAN_APPROVAL: "EMERGENCY_LOAN_APPROVAL",
    EMERGENCY_LOAN_REPAYMENT: "EMERGENCY_LOAN_REPAYMENT",
    
    // Marketplace
    PRODUCT_LISTING: "PRODUCT_LISTING",
    PURCHASE: "PURCHASE"
  } as const;
  
  export type MessageType = typeof MESSAGE_TYPES[keyof typeof MESSAGE_TYPES];
  
  // ===== MESSAGE INTERFACES =====
  export interface BaseMessage {
    type: MessageType;
    timestamp: number;
    version: string;
    data: any;
  }
  
  export interface UserRegistrationMessage extends BaseMessage {
    type: typeof MESSAGE_TYPES.USER_REGISTRATION;
    data: {
      accountId: string;
      name: string;
      phoneNumber: string;
      guarantor1?: string;
      guarantor2?: string;
    };
  }
  
  export interface CircleCreationMessage extends BaseMessage {
    type: typeof MESSAGE_TYPES.CIRCLE_CREATION;
    data: {
      circleId: string;
      name: string;
      creator: string;
      monthlyContribution: number;
      maxMembers: number;
      description?: string;
    };
  }
  
  export interface ContributionMessage extends BaseMessage {
    type: typeof MESSAGE_TYPES.CONTRIBUTION;
    data: {
      circleId: string;
      memberAccountId: string;
      amount: number;
      round: number;
      transactionId: string;
    };
  }
  
  export interface EmergencyLoanRequestMessage extends BaseMessage {
    type: typeof MESSAGE_TYPES.EMERGENCY_LOAN_REQUEST;
    data: {
      loanId: string;
      circleId: string;
      borrowerAccountId: string;
      amount: number;
      reason: string;
      urgencyLevel: "low" | "medium" | "high";
    };
  }
  
  // ===== CONSENSUS SERVICE CLASS =====
  export class ConsensusService {
    private client = hederaClient.getClient();
    private operatorKey = hederaClient.getOperatorKey();
  
    /**
     * Create a new HCS topic for MamaCredit platform
     */
    async createPlatformTopic(): Promise<TopicId> {
      try {
        const transaction = new TopicCreateTransaction()
          .setTopicMemo("MamaCredit - Women's Savings Circles Platform")
          .setAdminKey(this.operatorKey)
          .setSubmitKey(this.operatorKey)
          .setAutoRenewAccountId(hederaClient.getOperatorId())
          .setAutoRenewPeriod(7776000); // 90 days
  
        const response = await transaction.execute(this.client);
        const receipt = await response.getReceipt(this.client);
        
        if (!receipt.topicId) {
          throw new Error("Failed to create topic");
        }
  
        console.log(`Platform topic created: ${receipt.topicId.toString()}`);
        return receipt.topicId;
      } catch (error) {
        console.error("Failed to create platform topic:", error);
        throw error;
      }
    }
  
    /**
     * Submit a message to the platform topic
     */
    async submitMessage(message: BaseMessage): Promise<string> {
      try {
        const topicId = hederaClient.getTopicId();
        if (!topicId) {
          throw new Error("Platform topic not initialized");
        }
  
        // Add version and ensure timestamp
        const messageWithMeta: BaseMessage = {
          ...message,
          version: "1.0.0",
          timestamp: message.timestamp || Date.now()
        };
  
        const transaction = new TopicMessageSubmitTransaction()
          .setTopicId(topicId)
          .setMessage(JSON.stringify(messageWithMeta));
  
        const response = await transaction.execute(this.client);
        const receipt = await response.getReceipt(this.client);
        
        const transactionId = response.transactionId.toString();
        console.log(`Message submitted: ${transactionId}`);
        console.log(`Message type: ${message.type}`);
        
        return transactionId;
      } catch (error) {
        console.error("Failed to submit message:", error);
        throw error;
      }
    }
  
    /**
     * Get topic information
     */
    async getTopicInfo(topicId: TopicId) {
      try {
        const query = new TopicInfoQuery()
          .setTopicId(topicId);
  
        const info = await query.execute(this.client);
        return info;
      } catch (error) {
        console.error("Failed to get topic info:", error);
        throw error;
      }
    }
  
    /**
     * Submit user registration message
     */
    async submitUserRegistration(data: UserRegistrationMessage['data']): Promise<string> {
      const message: UserRegistrationMessage = {
        type: MESSAGE_TYPES.USER_REGISTRATION,
        timestamp: Date.now(),
        version: "1.0.0",
        data
      };
  
      return await this.submitMessage(message);
    }
  
    /**
     * Submit sister guarantee message
     */
    async submitSisterGuarantee(data: {
      newMember: string;
      guarantor1: string;
      guarantor2: string;
    }): Promise<string> {
      const message: BaseMessage = {
        type: MESSAGE_TYPES.SISTER_GUARANTEE,
        timestamp: Date.now(),
        version: "1.0.0",
        data: {
          ...data,
          verificationStatus: "pending"
        }
      };
  
      return await this.submitMessage(message);
    }
  
    /**
     * Submit user verification message
     */
    async submitUserVerification(accountId: string): Promise<string> {
      const message: BaseMessage = {
        type: MESSAGE_TYPES.USER_VERIFICATION,
        timestamp: Date.now(),
        version: "1.0.0",
        data: {
          accountId,
          isVerified: true,
          verifiedBy: hederaClient.getOperatorId().toString()
        }
      };
  
      return await this.submitMessage(message);
    }
  
    /**
     * Submit circle creation message
     */
    async submitCircleCreation(data: CircleCreationMessage['data']): Promise<string> {
      const message: CircleCreationMessage = {
        type: MESSAGE_TYPES.CIRCLE_CREATION,
        timestamp: Date.now(),
        version: "1.0.0",
        data
      };
  
      return await this.submitMessage(message);
    }
  
    /**
     * Submit member join message
     */
    async submitMemberJoin(data: {
      circleId: string;
      memberAccountId: string;
      memberName: string;
    }): Promise<string> {
      const message: BaseMessage = {
        type: MESSAGE_TYPES.MEMBER_JOIN,
        timestamp: Date.now(),
        version: "1.0.0",
        data
      };
  
      return await this.submitMessage(message);
    }
  
    /**
     * Submit contribution message
     */
    async submitContribution(data: ContributionMessage['data']): Promise<string> {
      const message: ContributionMessage = {
        type: MESSAGE_TYPES.CONTRIBUTION,
        timestamp: Date.now(),
        version: "1.0.0",
        data
      };
  
      return await this.submitMessage(message);
    }
  
    /**
     * Submit emergency loan request
     */
    async submitEmergencyLoanRequest(data: EmergencyLoanRequestMessage['data']): Promise<string> {
      const message: EmergencyLoanRequestMessage = {
        type: MESSAGE_TYPES.EMERGENCY_LOAN_REQUEST,
        timestamp: Date.now(),
        version: "1.0.0",
        data
      };
  
      return await this.submitMessage(message);
    }
  
    /**
     * Submit emergency loan vote
     */
    async submitEmergencyLoanVote(data: {
      loanId: string;
      voterAccountId: string;
      vote: boolean;
      voterName: string;
    }): Promise<string> {
      const message: BaseMessage = {
        type: MESSAGE_TYPES.EMERGENCY_LOAN_VOTE,
        timestamp: Date.now(),
        version: "1.0.0",
        data
      };
  
      return await this.submitMessage(message);
    }
  }
  
  // Export singleton instance
  export const consensusService = new ConsensusService();