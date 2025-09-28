// src/lib/constants/config.ts
// MamaCredit application configuration constants

export const APP_CONFIG = {
    // App Information
    name: 'MamaCredit',
    version: '1.0.0',
    description: 'Women\'s Savings Circles - Empowering African Women Through Sisterhood',
    tagline: 'Your Sisterhood Savings Circle',
    
    // Contact & Support
    support: {
      email: 'support@mamacredit.app',
      whatsapp: '+234-800-MAMACREDIT',
      website: 'https://mamacredit.app'
    },
    
    // Social Media
    social: {
      twitter: '@mamacredit',
      instagram: '@mamacredit_official',
      facebook: 'MamaCreditAfrica',
      linkedin: 'mamacredit',
      youtube: 'MamaCreditTV'
    }
  } as const;
  
  export const PLATFORM_LIMITS = {
    // Circle Configuration
    circle: {
      minMembers: 3,
      maxMembers: 12,
      minContribution: 5000, // ₦5,000 minimum monthly contribution
      maxContribution: 1000000, // ₦1M maximum monthly contribution
      maxCirclesPerUser: 5
    },
    
    // Emergency Loans
    emergencyLoan: {
      minAmount: 5000, // ₦5,000 minimum
      maxPercentageOfFunds: 75, // 75% of circle funds maximum
      defaultPercentageLimit: 50, // 50% default limit
      votingPeriodHours: 24, // 24 hours voting period
      repaymentPeriodDays: 60, // Maximum 60 days to repay
      maxActiveLoansPerUser: 2
    },
    
    // File Uploads
    fileUpload: {
      maxFileSize: 5 * 1024 * 1024, // 5MB
      maxFilesPerRequest: 5,
      allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
      allowedExtensions: ['.jpg', '.jpeg', '.png', '.pdf']
    },
    
    // User Verification
    verification: {
      minGuarantors: 2,
      maxGuarantors: 3,
      verificationTimeoutDays: 7
    }
  } as const;
  
  export const MAMA_TOKEN_CONFIG = {
    // Token Information
    name: 'MamaCredit Savings Token',
    symbol: 'MAMA',
    decimals: 2,
    
    // Reward System
    rewards: {
      monthlyContribution: 100, // 100 MAMA tokens per ₦1000 contributed
      emergencySupport: 50, // 50 MAMA tokens for supporting emergency loans
      circleCompletion: 500, // 500 MAMA tokens for completing a full circle cycle
      referralBonus: 200, // 200 MAMA tokens for referring new members
      perfectAttendance: 300 // 300 MAMA tokens for perfect meeting attendance
    },
    
    // Exchange Rates (for display purposes)
    exchangeRate: {
      nairaToMama: 0.1, // 1 Naira = 0.1 MAMA
      mamaToNaira: 10 // 1 MAMA = 10 Naira (for redemption)
    }
  } as const;
  
  export const CIRCLE_CATEGORIES = [
    {
      id: 'market_women',
      name: 'Market Women',
      description: 'Traders and market sellers',
      icon: '🏪',
      averageContribution: 50000,
      popularLocations: ['Lagos Island', 'Onitsha Main Market', 'Kano Central']
    },
    {
      id: 'young_professionals',
      name: 'Young Professionals',
      description: 'Career women aged 23-35',
      icon: '💼',
      averageContribution: 75000,
      popularLocations: ['Victoria Island', 'Ikoyi', 'Lekki']
    },
    {
      id: 'entrepreneurs',
      name: 'Entrepreneurs',
      description: 'Business owners and founders',
      icon: '🚀',
      averageContribution: 100000,
      popularLocations: ['Computer Village', 'Aba Commercial', 'Ketu Market']
    },
    {
      id: 'civil_servants',
      name: 'Civil Servants',
      description: 'Government workers',
      icon: '🏛️',
      averageContribution: 40000,
      popularLocations: ['Abuja Central', 'Secretariat', 'Government Quarters']
    },
    {
      id: 'teachers',
      name: 'Educators',
      description: 'Teachers and education workers',
      icon: '📚',
      averageContribution: 30000,
      popularLocations: ['University Areas', 'School Districts', 'Education Zones']
    },
    {
      id: 'mothers',
      name: 'Mothers Circle',
      description: 'Mothers focusing on children\'s future',
      icon: '👶',
      averageContribution: 35000,
      popularLocations: ['Residential Areas', 'Family Estates', 'School Communities']
    }
  ] as const;
  
  export const EMERGENCY_CATEGORIES = [
    {
      id: 'medical',
      name: 'Medical Emergency',
      icon: '🏥',
      urgencyLevel: 'high',
      averageAmount: 75000,
      examples: ['Surgery costs', 'Emergency treatment', 'Medication expenses', 'Hospital bills']
    },
    {
      id: 'education',
      name: 'Children\'s Education',
      icon: '🎓',
      urgencyLevel: 'medium',
      averageAmount: 45000,
      examples: ['School fees', 'Exam fees', 'Uniforms and books', 'Educational materials']
    },
    {
      id: 'housing',
      name: 'Housing Crisis',
      icon: '🏠',
      urgencyLevel: 'high',
      averageAmount: 80000,
      examples: ['Rent payment', 'Emergency repairs', 'Utility bills', 'Housing deposits']
    },
    {
      id: 'business',
      name: 'Business Emergency',
      icon: '💼',
      urgencyLevel: 'medium',
      averageAmount: 60000,
      examples: ['Restock inventory', 'Equipment repair', 'License renewal', 'Business expenses']
    },
    {
      id: 'family',
      name: 'Family Emergency',
      icon: '👨‍👩‍👧‍👦',
      urgencyLevel: 'high',
      averageAmount: 50000,
      examples: ['Childcare costs', 'Family support', 'Emergency travel', 'Family obligations']
    },
    {
      id: 'transport',
      name: 'Transportation',
      icon: '🚗',
      urgencyLevel: 'low',
      averageAmount: 35000,
      examples: ['Vehicle repair', 'Transport costs', 'Emergency travel', 'Commute expenses']
    }
  ] as const;
  
  export const ACHIEVEMENT_BADGES = [
    {
      id: 'faithful_gardener',
      name: 'Faithful Gardener',
      description: 'Made contributions for 6 consecutive months',
      icon: '🌱',
      rarity: 'common',
      mamaTokenReward: 300
    },
    {
      id: 'sister_supporter',
      name: 'Sister Supporter',
      description: 'Voted to support 10 emergency loan requests',
      icon: '🤝',
      rarity: 'common',
      mamaTokenReward: 200
    },
    {
      id: 'circle_leader',
      name: 'Circle Leader',
      description: 'Created and successfully led a savings circle',
      icon: '👑',
      rarity: 'rare',
      mamaTokenReward: 500
    },
    {
      id: 'community_builder',
      name: 'Community Builder',
      description: 'Referred 5 new verified sisters',
      icon: '🏗️',
      rarity: 'uncommon',
      mamaTokenReward: 400
    },
    {
      id: 'caring_heart',
      name: 'Caring Heart',
      description: 'Helped sisters during 3 emergency situations',
      icon: '❤️',
      rarity: 'uncommon',
      mamaTokenReward: 350
    },
    {
      id: 'wise_elder',
      name: 'Wise Elder',
      description: 'Mentored new circle members for 1 year',
      icon: '🦉',
      rarity: 'rare',
      mamaTokenReward: 600
    },
    {
      id: 'queen_mother',
      name: 'Queen Mother',
      description: 'Led multiple successful circles with 100% success rate',
      icon: '👸',
      rarity: 'legendary',
      mamaTokenReward: 1000
    },
    {
      id: 'tech_pioneer',
      name: 'Tech Pioneer',
      description: 'One of the first 100 users on MamaCredit',
      icon: '🚀',
      rarity: 'legendary',
      mamaTokenReward: 800
    }
  ] as const;
  
  export const MEETING_SCHEDULES = [
    '1st Monday of the month',
    '2nd Tuesday of the month',
    '3rd Wednesday of the month',
    'Last Friday of the month',
    '15th of every month',
    'Every two weeks',
    'Monthly (flexible)',
    'Custom schedule'
  ] as const;
  
  export const REPAYMENT_PERIODS = [
    { value: '15_days', label: '15 Days', description: 'Quick repayment for smaller amounts' },
    { value: '30_days', label: '30 Days', description: 'Standard repayment period' },
    { value: '45_days', label: '45 Days', description: 'Extended period for larger amounts' },
    { value: '60_days', label: '60 Days', description: 'Maximum repayment period' }
  ] as const;
  
  export const NIGERIAN_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ] as const;
  
  export const POPULAR_CITIES = [
    'Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City', 'Kaduna',
    'Onitsha', 'Warri', 'Aba', 'Jos', 'Ilorin', 'Enugu', 'Abeokuta', 'Sokoto',
    'Akure', 'Bauchi', 'Maiduguri', 'Zaria', 'Owerri'
  ] as const;
  
  export const NOTIFICATION_TYPES = {
    CIRCLE_INVITATION: 'circle_invitation',
    CONTRIBUTION_REMINDER: 'contribution_reminder',
    PAYOUT_READY: 'payout_ready',
    EMERGENCY_REQUEST: 'emergency_request',
    EMERGENCY_APPROVED: 'emergency_approved',
    EMERGENCY_VOTING: 'emergency_voting',
    NEW_MEMBER_JOINED: 'new_member_joined',
    MEETING_REMINDER: 'meeting_reminder',
    PAYMENT_RECEIVED: 'payment_received',
    BADGE_EARNED: 'badge_earned',
    MAMA_TOKENS_EARNED: 'mama_tokens_earned'
  } as const;
  
  export const API_ENDPOINTS = {
    // Development
    development: {
      hedera: 'https://testnet.mirrornode.hedera.com',
      api: 'http://localhost:3000/api'
    },
    
    // Production
    production: {
      hedera: 'https://mainnet.mirrornode.hedera.com',
      api: 'https://api.mamacredit.app'
    }
  } as const;
  
  export const WHATSAPP_INTEGRATION = {
    businessNumber: '+234-800-MAMACREDIT',
    supportGroups: {
      general: 'https://chat.whatsapp.com/mamacredit-support',
      technical: 'https://chat.whatsapp.com/mamacredit-tech',
      circles: 'https://chat.whatsapp.com/mamacredit-circles'
    },
    messageTemplates: {
      welcome: 'Welcome to MamaCredit, sister! 👑 Your journey to financial freedom starts here.',
      contributionReminder: 'Gentle reminder: Your monthly contribution is due in 3 days. Your sisters are counting on you! 💜',
      emergencyAlert: 'Emergency support needed! A sister in your circle needs help. Please vote within 24 hours.',
      payoutNotification: 'Congratulations! Your payout of {amount} is ready. Check your MamaCredit wallet! 🎉'
    }
  } as const;
  
  // Export everything as default for easy importing
  export default {
    APP_CONFIG,
    PLATFORM_LIMITS,
    MAMA_TOKEN_CONFIG,
    CIRCLE_CATEGORIES,
    EMERGENCY_CATEGORIES,
    ACHIEVEMENT_BADGES,
    MEETING_SCHEDULES,
    REPAYMENT_PERIODS,
    NIGERIAN_STATES,
    POPULAR_CITIES,
    NOTIFICATION_TYPES,
    API_ENDPOINTS,
    WHATSAPP_INTEGRATION
  };