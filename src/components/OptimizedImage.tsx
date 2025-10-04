import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { lazyLoadImage } from '../utils/lazyLoad';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  fill?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  sizes,
  quality = 80,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  fill
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!priority && imgRef.current) {
      lazyLoadImage(imgRef.current, src);
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Simplified - always show images to prevent scroll conflicts
  useEffect(() => {
    if (!priority) {
      setIsInView(true);
    }
  }, [priority]);

  // Generate responsive srcset for different screen sizes
  const generateSrcSet = (baseSrc: string) => {
    if (!width) return undefined;
    
    const sizes = [width * 0.5, width, width * 1.5, width * 2];
    return sizes
      .map((w) => `${baseSrc}?w=${Math.round(w)}&q=${quality}&f=auto ${Math.round(w)}w`)
      .join(', ');
  };

  // Generate sizes attribute for responsive images
  const generateSizes = () => {
    if (!sizes) return undefined;
    return sizes;
  };

  const imageStyle = {
    width: fill ? '100%' : (width ? `${width}px` : '100%'),
    height: fill ? '100%' : (height ? `${height}px` : 'auto'),
    objectFit: 'cover' as const,
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0
  };

  if (hasError) {
    return (
      <div 
        className={`optimized-image-error ${className}`}
        style={{ 
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '200px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666'
        }}
      >
        <span>Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`optimized-image-container ${className}`} style={{ position: 'relative' }}>
      {/* Blur placeholder */}
      {placeholder === 'blur' && blurDataURL && !isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
            transform: 'scale(1.1)'
          }}
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div
          className="optimized-image-skeleton"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite'
          }}
        />
      )}

      {/* Actual image */}
      {isInView && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={priority ? 'high' : 'low'}
          decoding={priority ? 'sync' : 'async'}
          sizes={generateSizes()}
          srcSet={generateSrcSet(src)}
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
