// Lazy loading utility for images
export const lazyLoadImage = (img: HTMLImageElement, src: string) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          image.src = src;
          image.classList.remove('lazy');
          observer.unobserve(image);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(img);
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Optimize image loading
export const optimizeImage = (src: string, width?: number, quality: number = 80): string => {
  // In a real application, you would use a service like Cloudinary or ImageKit
  // For now, we'll return the original src
  return src;
};
