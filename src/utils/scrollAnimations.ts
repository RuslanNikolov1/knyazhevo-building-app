// Check for reduced motion preference
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimized animation variants with reduced motion support
export const fadeInUp = {
  initial: { opacity: 0, y: prefersReducedMotion() ? 0 : 30 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: prefersReducedMotion() ? 0.1 : 0.6, 
    ease: 'easeOut' 
  }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: prefersReducedMotion() ? 0 : -30 },
  animate: { opacity: 1, x: 0 },
  transition: { 
    duration: prefersReducedMotion() ? 0.1 : 0.6, 
    ease: 'easeOut' 
  }
};

export const fadeInRight = {
  initial: { opacity: 0, x: prefersReducedMotion() ? 0 : 30 },
  animate: { opacity: 1, x: 0 },
  transition: { 
    duration: prefersReducedMotion() ? 0.1 : 0.6, 
    ease: 'easeOut' 
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: prefersReducedMotion() ? 1 : 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: prefersReducedMotion() ? 0.1 : 0.5, 
    ease: 'easeOut' 
  }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: prefersReducedMotion() ? 0 : 20 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: prefersReducedMotion() ? 0.1 : 0.5, 
    ease: 'easeOut' 
  }
};

// Hover animations with reduced motion support
export const hoverLift = {
  whileHover: prefersReducedMotion() ? {} : { 
    y: -5,
    transition: { duration: 0.2 }
  }
};

export const hoverScale = {
  whileHover: prefersReducedMotion() ? {} : { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

export const hoverGlow = {
  whileHover: prefersReducedMotion() ? {} : {
    boxShadow: '0 8px 30px rgba(243, 156, 18, 0.3)',
    transition: { duration: 0.3 }
  }
};
