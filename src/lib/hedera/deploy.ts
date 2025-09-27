// src/lib/hedera/deploy.ts
// Deployment script for initializing MamaCredit platform

import { consensusService } from "./consensus";
import { tokenService } from "./tokens";
import { hederaClient } from "./client";

// ===== DEPLOYMENT CONFIGURATION =====
export interface DeploymentConfig {
  platformName: string;
  tokenName: string;
  tokenSymbol: string;
  initialAdminAccounts: string[];
  maxCircleSize: number;
  minCircleSize: number;
}

export const DEFAULT_CONFIG: DeploymentConfig = {
  platformName: "MamaCredit - Women's Savings Circles",
  tokenName: "MamaCredit Savings",
  tokenSymbol: "MAMA",
  initialAdminAccounts: [], // Will be populated with operator account
  maxCircleSize: 12,
  minCircleSize: 3
};

// ===== DEPLOYMENT RESULT =====
export interface DeploymentResult {
  success: boolean;
  topicId?: string;
  tokenId?: string;
  treasuryAccountId?: string;
  error?: string;
  deploymentTime: Date;
  networkUsed: string;
}

// ===== DEPLOYMENT SERVICE =====
export class DeploymentService {
  private config: DeploymentConfig;

  constructor(config: DeploymentConfig = DEFAULT_CONFIG) {
    this.config = {
      ...config,
      initialAdminAccounts: [hederaClient.getOperatorId().toString()]
    };
  }

  /**
   * Deploy the complete MamaCredit platform
   */
  async deployPlatform(): Promise<DeploymentResult> {
    console.log("🚀 Starting MamaCredit platform deployment...");
    const startTime = new Date();

    try {
      // Step 1: Create HCS Topic for consensus
      console.log("📝 Creating consensus topic...");
      const topicId = await consensusService.createPlatformTopic();
      
      // Step 2: Create MAMA savings token
      console.log("🪙 Creating MAMA savings token...");
      const tokenId = await tokenService.createSavingsToken();
      
      // Step 3: Submit initial platform configuration
      console.log("⚙️ Setting up platform configuration...");
      await this.submitInitialConfiguration(topicId.toString(), tokenId.toString());
      
      // Step 4: Create initial admin accounts if needed
      console.log("👥 Setting up admin accounts...");
      await this.setupAdminAccounts();

      const result: DeploymentResult = {
        success: true,
        topicId: topicId.toString(),
        tokenId: tokenId.toString(),
        treasuryAccountId: hederaClient.getOperatorId().toString(),
        deploymentTime: startTime,
        networkUsed: process.env.NEXT_PUBLIC_HEDERA_NETWORK || "testnet"
      };

      console.log("✅ MamaCredit platform deployed successfully!");
      console.log(`📍 Topic ID: ${result.topicId}`);
      console.log(`🪙 Token ID: ${result.tokenId}`);
      console.log(`🏦 Treasury: ${result.treasuryAccountId}`);
      
      // Save deployment info to environment variables format
      this.generateEnvConfig(result);
      
      return result;
    } catch (error) {
      console.error("❌ Platform deployment failed:", error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown deployment error",
        deploymentTime: startTime,
        networkUsed: process.env.NEXT_PUBLIC_HEDERA_NETWORK || "testnet"
      };
    }
  }

  /**
   * Submit initial platform configuration to HCS
   */
  private async submitInitialConfiguration(topicId: string, tokenId: string): Promise<void> {
    const configMessage = {
      type: "PLATFORM_INITIALIZATION",
      timestamp: Date.now(),
      version: "1.0.0",
      data: {
        platformName: this.config.platformName,
        topicId: topicId,
        tokenId: tokenId,
        treasuryAccountId: hederaClient.getOperatorId().toString(),
        maxCircleSize: this.config.maxCircleSize,
        minCircleSize: this.config.minCircleSize,
        adminAccounts: this.config.initialAdminAccounts,
        deploymentTimestamp: Date.now(),
        networkType: process.env.NEXT_PUBLIC_HEDERA_NETWORK || "testnet"
      }
    };

    await consensusService.submitMessage(configMessage);
  }

  /**
   * Setup initial admin accounts
   */
  private async setupAdminAccounts(): Promise<void> {
    for (const adminAccountId of this.config.initialAdminAccounts) {
      try {
        // Associate MAMA token with admin account
        await tokenService.associateTokenWithAccount(adminAccountId);
        
        // Submit admin registration
        await consensusService.submitUserRegistration({
          accountId: adminAccountId,
          name: "Platform Administrator",
          phoneNumber: "+1234567890" // Placeholder
        });
        
        // Auto-verify admin
        await consensusService.submitUserVerification(adminAccountId);
        
        console.log(`✅ Admin account setup: ${adminAccountId}`);
      } catch (error) {
        console.warn(`⚠️ Failed to setup admin account ${adminAccountId}:`, error);
      }
    }
  }

  /**
   * Generate environment configuration for .env.local
   */
  private generateEnvConfig(deployment: DeploymentResult): void {
    const envConfig = `
# MamaCredit Platform Configuration
# Generated on: ${deployment.deploymentTime.toISOString()}
# Network: ${deployment.networkUsed}

# Platform IDs
NEXT_PUBLIC_TOPIC_ID=${deployment.topicId}
NEXT_PUBLIC_SAVINGS_TOKEN_ID=${deployment.tokenId}
NEXT_PUBLIC_TREASURY_ACCOUNT_ID=${deployment.treasuryAccountId}

# Platform Settings
NEXT_PUBLIC_MAX_CIRCLE_SIZE=${this.config.maxCircleSize}
NEXT_PUBLIC_MIN_CIRCLE_SIZE=${this.config.minCircleSize}
NEXT_PUBLIC_PLATFORM_VERSION=1.0.0
`;

    console.log("\n📋 Add these to your .env.local file:");
    console.log(envConfig);
  }

  /**
   * Verify deployment by checking all components
   */
  async verifyDeployment(deployment: DeploymentResult): Promise<boolean> {
    try {
      console.log("🔍 Verifying deployment...");
      
      if (!deployment.topicId || !deployment.tokenId) {
        return false;
      }

      // Verify topic exists
      const topicInfo = await consensusService.getTopicInfo(
        hederaClient.getTopicId()!
      );
      console.log("✅ Topic verified");

      // Verify token exists
      const tokenInfo = await tokenService.getTokenInfo();
      console.log("✅ Token verified");

      // Verify treasury balance
      const treasuryBalance = await tokenService.getTokenBalance(
        deployment.treasuryAccountId!
      );
      console.log("✅ Treasury verified");

      console.log("🎉 Deployment verification successful!");
      return true;
    } catch (error) {
      console.error("❌ Deployment verification failed:", error);
      return false;
    }
  }

  /**
   * Create test data for demo purposes
   */
  async createTestData(): Promise<void> {
    console.log("🧪 Creating test data...");
    
    try {
      // Create test women users
      const testUsers = [
        { name: "Amina Ibrahim", phone: "+2348012345678" },
        { name: "Fatima Adeola", phone: "+2348012345679" },
        { name: "Grace Okafor", phone: "+2348012345680" },
        { name: "Zainab Mohammed", phone: "+2348012345681" },
        { name: "Blessing Eze", phone: "+2348012345682" }
      ];

      const operatorId = hederaClient.getOperatorId().toString();
      
      for (const user of testUsers) {
        // Register test user
        await consensusService.submitUserRegistration({
          accountId: operatorId, // Using operator for demo
          name: user.name,
          phoneNumber: user.phone
        });
        
        // Auto-verify for demo
        await consensusService.submitUserVerification(operatorId);
      }

      // Create test circle
      const testCircleId = `circle_${Date.now()}`;
      await consensusService.submitCircleCreation({
        circleId: testCircleId,
        name: "Lagos Mama Circle #1",
        creator: operatorId,
        monthlyContribution: 10000, // 10,000 tinybars
        maxMembers: 5,
        description: "A supportive savings circle for women in Lagos"
      });

      console.log("✅ Test data created successfully!");
    } catch (error) {
      console.warn("⚠️ Failed to create test data:", error);
    }
  }
}

// ===== DEPLOYMENT FUNCTIONS =====

/**
 * Main deployment function
 */
export async function deployMamaCredit(
  config?: Partial<DeploymentConfig>
): Promise<DeploymentResult> {
  const deploymentService = new DeploymentService({
    ...DEFAULT_CONFIG,
    ...config
  });

  return await deploymentService.deployPlatform();
}

/**
 * Quick deployment for development
 */
export async function quickDeploy(): Promise<DeploymentResult> {
  console.log("🚀 Quick deployment starting...");
  
  const deployment = await deployMamaCredit();
  
  if (deployment.success) {
    const deploymentService = new DeploymentService();
    
    // Verify deployment
    await deploymentService.verifyDeployment(deployment);
    
    // Create test data
    await deploymentService.createTestData();
  }
  
  return deployment;
}

// Export deployment service
export const deploymentService = new DeploymentService();