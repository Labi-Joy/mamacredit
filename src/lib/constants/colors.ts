// src/lib/constants/colors.ts
// MamaCredit brand colors inspired by African heritage and warmth

export const COLORS = {
    // Primary Brand Colors
    primary: {
      burgundy: "#8B1538",      // Deep strength, dignity
      gold: "#F4A261",          // Prosperity, harvest
      terracotta: "#E76F51",    // Earth, community
      sage: "#2A9D8F",          // Growth, stability
    },
    
    // Supporting Colors
    secondary: {
      cream: "#FAF9F6",         // Purity, new beginnings
      brown: "#6F4E37",         // Grounding, reliability
      coral: "#FF9F8E",         // Sisterhood, care
      amber: "#FFBF69",         // Warmth, harvest
    },
    
    // Neutral Colors
    neutral: {
      white: "#FFFFFF",
      offWhite: "#FEFEFE",
      lightGray: "#F7F7F7",
      gray: "#E5E5E5",
      darkGray: "#8E8E93",
      charcoal: "#2C2C2E",
      black: "#1C1C1E",
    },
    
    // Status Colors
    status: {
      success: "#34C759",       // Green for completed actions
      warning: "#FF9500",       // Orange for pending items
      error: "#FF3B30",         // Red for errors
      info: "#007AFF",          // Blue for information
    },
    
    // Gradient Combinations
    gradients: {
      sunset: "linear-gradient(135deg, #F4A261 0%, #E76F51 100%)",
      earth: "linear-gradient(135deg, #8B1538 0%, #6F4E37 100%)",
      harvest: "linear-gradient(135deg, #FFBF69 0%, #F4A261 100%)",
      growth: "linear-gradient(135deg, #2A9D8F 0%, #34C759 100%)",
      sister: "linear-gradient(135deg, #FF9F8E 0%, #E76F51 100%)",
    },
    
    // African Pattern Colors
    patterns: {
      kente: ["#8B1538", "#F4A261", "#2A9D8F", "#E76F51"],
      mudcloth: ["#6F4E37", "#FAF9F6", "#8B1538"],
      ankara: ["#E76F51", "#F4A261", "#2A9D8F", "#FF9F8E"],
    }
  } as const;
  
  // CSS Custom Properties for easy usage
  export const CSS_VARIABLES = `
    :root {
      /* Primary Colors */
      --color-primary-burgundy: ${COLORS.primary.burgundy};
      --color-primary-gold: ${COLORS.primary.gold};
      --color-primary-terracotta: ${COLORS.primary.terracotta};
      --color-primary-sage: ${COLORS.primary.sage};
      
      /* Secondary Colors */
      --color-secondary-cream: ${COLORS.secondary.cream};
      --color-secondary-brown: ${COLORS.secondary.brown};
      --color-secondary-coral: ${COLORS.secondary.coral};
      --color-secondary-amber: ${COLORS.secondary.amber};
      
      /* Neutral Colors */
      --color-neutral-white: ${COLORS.neutral.white};
      --color-neutral-light-gray: ${COLORS.neutral.lightGray};
      --color-neutral-gray: ${COLORS.neutral.gray};
      --color-neutral-dark-gray: ${COLORS.neutral.darkGray};
      --color-neutral-charcoal: ${COLORS.neutral.charcoal};
      --color-neutral-black: ${COLORS.neutral.black};
      
      /* Status Colors */
      --color-status-success: ${COLORS.status.success};
      --color-status-warning: ${COLORS.status.warning};
      --color-status-error: ${COLORS.status.error};
      --color-status-info: ${COLORS.status.info};
      
      /* Gradients */
      --gradient-sunset: ${COLORS.gradients.sunset};
      --gradient-earth: ${COLORS.gradients.earth};
      --gradient-harvest: ${COLORS.gradients.harvest};
      --gradient-growth: ${COLORS.gradients.growth};
      --gradient-sister: ${COLORS.gradients.sister};
    }
  `;
  
  // Utility functions for color manipulation
  export const colorUtils = {
    /**
     * Add transparency to a hex color
     */
    withOpacity: (color: string, opacity: number): string => {
      return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    },
    
    /**
     * Get contrasting text color for a background
     */
    getContrastText: (backgroundColor: string): string => {
      // Simple contrast check - in production, use a proper color contrast library
      const darkColors: string[] = [
        COLORS.primary.burgundy,
        COLORS.secondary.brown,
        COLORS.neutral.charcoal,
        COLORS.neutral.black
      ];

      return darkColors.includes(backgroundColor) ? COLORS.neutral.white : COLORS.neutral.charcoal;
    },
    
    /**
     * Get semantic color for different states
     */
    getSemanticColor: (type: 'success' | 'warning' | 'error' | 'info' | 'primary'): string => {
      switch (type) {
        case 'success': return COLORS.status.success;
        case 'warning': return COLORS.status.warning;
        case 'error': return COLORS.status.error;
        case 'info': return COLORS.status.info;
        case 'primary': return COLORS.primary.burgundy;
        default: return COLORS.primary.burgundy;
      }
    }
  };
  
  export default COLORS;