// src/lib/constants/proverbs.ts
// African proverbs and motherhood metaphors for MamaCredit UI

export const PROVERBS = {
    // Savings & Community
    savings: [
      {
        text: "Many hands make light work",
        meaning: "Together we achieve more than alone",
        context: "circle_power"
      },
      {
        text: "A single bracelet does not jingle",
        meaning: "Unity creates strength and beauty",
        context: "community_strength"
      },
      {
        text: "The child who is carried by the community walks the furthest",
        meaning: "Collective support leads to greater success",
        context: "mutual_support"
      },
      {
        text: "When spider webs unite, they can tie up a lion",
        meaning: "Small individual efforts become powerful together",
        context: "small_contributions"
      }
    ],
    
    // Motherhood & Nurturing
    motherhood: [
      {
        text: "It takes a village to raise a child",
        meaning: "Community support is essential for growth",
        context: "sisterhood"
      },
      {
        text: "A mother's love is the first school",
        meaning: "Maternal wisdom guides and teaches",
        context: "mentorship"
      },
      {
        text: "The hen gathers her chicks under her wings",
        meaning: "Protection and care in times of need",
        context: "emergency_support"
      },
      {
        text: "A wise mother teaches her children to fish",
        meaning: "Empowerment through knowledge and skills",
        context: "financial_education"
      }
    ],
    
    // Growth & Prosperity
    growth: [
      {
        text: "Little by little, a bird builds its nest",
        meaning: "Small, consistent efforts lead to big results",
        context: "monthly_savings"
      },
      {
        text: "The seed that is planted today feeds the family tomorrow",
        meaning: "Investment in the present secures the future",
        context: "future_planning"
      },
      {
        text: "Rain does not fall on one roof alone",
        meaning: "Abundance is meant to be shared",
        context: "payout_distribution"
      },
      {
        text: "A tree is known by its fruits",
        meaning: "True value is shown through results",
        context: "proven_success"
      }
    ],
    
    // Wisdom & Learning
    wisdom: [
      {
        text: "When the roots of a tree begin to decay, it spreads death to the branches",
        meaning: "Strong foundations are essential for growth",
        context: "financial_foundation"
      },
      {
        text: "The moon does not heed the barking of dogs",
        meaning: "Stay focused on your goals despite distractions",
        context: "persistence"
      },
      {
        text: "A wise woman builds her house with her own hands",
        meaning: "Self-reliance and personal empowerment",
        context: "independence"
      },
      {
        text: "The best time to plant a tree was 20 years ago. The second best time is now",
        meaning: "It's never too late to start building your future",
        context: "getting_started"
      }
    ]
  };
  
  // UI Metaphors and Terminology
  export const UI_METAPHORS = {
    // Circle-related terms
    circle: {
      create: "Plant a New Circle",
      join: "Join the Sisterhood",
      members: "Circle Sisters",
      contribution: "Monthly Seed",
      payout: "Harvest Time",
      balance: "Garden Growth"
    },
    
    // Financial terms
    financial: {
      savings: "Seed Money",
      wallet: "Money Pot",
      transaction: "Blessing Exchange",
      balance: "Treasure Chest",
      contribution: "Monthly Offering",
      payout: "Sister's Blessing"
    },
    
    // Emergency terms
    emergency: {
      request: "Call for Help",
      vote: "Sister's Voice",
      approval: "Community Blessing",
      support: "Umbrella in the Rain",
      repayment: "Returning the Favor"
    },
    
    // Achievement terms
    achievements: {
      consistent_saver: "Faithful Gardener",
      circle_leader: "Queen Mother",
      helpful_sister: "Village Builder",
      first_contribution: "First Seed Planted",
      emergency_helper: "Caring Heart",
      mentor: "Wise Elder"
    }
  };
  
  // Contextual Messages
  export const CONTEXTUAL_MESSAGES = {
    welcome: [
      "Welcome to your sisterhood, Queen!",
      "Your journey to financial freedom starts here",
      "Together, we grow stronger 🌱"
    ],
    
    first_contribution: [
      "Your first seed is planted! 🌱",
      "Every great harvest begins with a single seed",
      "Your sisters are proud of this first step"
    ],
    
    circle_complete: [
      "Your circle is complete! Time to grow together 🌸",
      "When sisters unite, mountains move",
      "The sisterhood is strong with this one"
    ],
    
    emergency_approved: [
      "Your sisters have your back! 💪",
      "In times of need, the village responds",
      "This is what sisterhood looks like"
    ],
    
    payout_received: [
      "Harvest time! Your patience has borne fruit 🍯",
      "The circle has blessed you today",
      "Your faithful saving has been rewarded"
    ],
    
    milestone_reached: [
      "Look how far you've come, Queen! 👑",
      "Your financial garden is blooming",
      "The village is proud of your growth"
    ]
  };
  
  // Seasonal/Cultural Greetings
  export const CULTURAL_GREETINGS = {
    morning: [
      "Good morning, beautiful sister! ☀️",
      "May your day be blessed with abundance",
      "Rise and shine, Queen Mother!"
    ],
    
    evening: [
      "Good evening, wise woman 🌙",
      "May your night be peaceful and restorative",
      "Rest well, circle sister"
    ],
    
    achievement: [
      "Ayeee! Look at you thriving! 🎉",
      "The ancestors are smiling down on you",
      "Your light shines bright, sister!"
    ],
    
    encouragement: [
      "Every step forward is a victory 💪",
      "Your strength inspires the whole circle",
      "Keep planting those seeds, Queen!"
    ]
  };
  
  // Helper function to get random proverb by context
  export const getRandomProverb = (context?: string) => {
    const allProverbs = Object.values(PROVERBS).flat();
    const filteredProverbs = context 
      ? allProverbs.filter(p => p.context === context)
      : allProverbs;
    
    return filteredProverbs[Math.floor(Math.random() * filteredProverbs.length)];
  };
  
  // Helper function to get contextual message
  export const getContextualMessage = (type: keyof typeof CONTEXTUAL_MESSAGES) => {
    const messages = CONTEXTUAL_MESSAGES[type];
    return messages[Math.floor(Math.random() * messages.length)];
  };
  
  export default PROVERBS;