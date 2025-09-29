// Lazy loading utility for images with performance optimizations
export const lazyLoadImage = (img: HTMLImageElement, src: string) => {
  // Simplified - directly set the src to avoid intersection observer conflicts
  img.src = src;
  img.classList.add('loaded');
};

// Preload critical images with priority
export const preloadImage = (src: string, priority: 'high' | 'low' = 'low'): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Set loading priority
    if (priority === 'high') {
      img.fetchPriority = 'high';
    }
    
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Optimize image loading with WebP support detection
export const optimizeImage = (src: string, _width?: number, _quality: number = 80): string => {
  // Check if browser supports WebP
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // For now, return the original src
  // In production, you would use a service like Cloudinary, ImageKit, or Next.js Image
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _supportsWebP = supportsWebP();
  // Suppress unused variable warning
  void _supportsWebP;
  return src;
};

// Batch preload images for better performance
export const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map(src => preloadImage(src, 'low')));
};

// Create responsive image sources
export const createResponsiveImage = (baseSrc: string, _sizes: number[]): string => {
  // In a real application, you would generate srcset
  return baseSrc;
};
