// Intelligent prefetching utilities for better performance

interface PrefetchOptions {
  priority?: 'high' | 'low';
  timeout?: number;
}

// Prefetch resources based on user behavior
export class IntelligentPrefetcher {
  private prefetchedResources = new Set<string>();

  // Prefetch on hover with debouncing
  prefetchOnHover(element: HTMLElement, resources: string[], options: PrefetchOptions = {}) {
    let timeoutId: number;
    
    const handleMouseEnter = () => {
      timeoutId = setTimeout(() => {
        this.prefetchResources(resources, options);
      }, 150); // 150ms delay to avoid unnecessary prefetching
    };

    const handleMouseLeave = () => {
      clearTimeout(timeoutId);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }

  // Prefetch on intersection (when element comes into view)
  prefetchOnIntersection(element: HTMLElement, resources: string[], options: PrefetchOptions = {}) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.prefetchResources(resources, options);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px' } // Start prefetching 100px before element is visible
    );

    observer.observe(element);
    return () => observer.disconnect();
  }

  // Prefetch resources with priority
  async prefetchResources(resources: string[], options: PrefetchOptions = {}) {
    const { priority = 'low', timeout = 5000 } = options;
    
    const prefetchPromises = resources
      .filter(url => !this.prefetchedResources.has(url))
      .map(url => this.prefetchSingleResource(url, priority, timeout));

    await Promise.allSettled(prefetchPromises);
  }

  private async prefetchSingleResource(url: string, priority: 'high' | 'low', timeout: number): Promise<void> {
    if (this.prefetchedResources.has(url)) return;

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Prefetch timeout for ${url}`));
      }, timeout);

      // Determine resource type and prefetch accordingly
      if (url.endsWith('.js')) {
        this.prefetchScript(url, priority).then(() => {
          clearTimeout(timeoutId);
          this.prefetchedResources.add(url);
          resolve();
        }).catch(reject);
      } else if (url.endsWith('.css')) {
        this.prefetchStylesheet(url, priority).then(() => {
          clearTimeout(timeoutId);
          this.prefetchedResources.add(url);
          resolve();
        }).catch(reject);
      } else if (url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
        this.prefetchImage(url, priority).then(() => {
          clearTimeout(timeoutId);
          this.prefetchedResources.add(url);
          resolve();
        }).catch(reject);
      } else {
        // Generic prefetch
        fetch(url, { 
          method: 'GET',
          priority: priority === 'high' ? 'high' : 'low'
        }).then(() => {
          clearTimeout(timeoutId);
          this.prefetchedResources.add(url);
          resolve();
        }).catch(reject);
      }
    });
  }

  private prefetchScript(url: string, priority: 'high' | 'low'): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'script';
      link.href = url;
      if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high');
      }
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to prefetch script: ${url}`));
      
      document.head.appendChild(link);
    });
  }

  private prefetchStylesheet(url: string, priority: 'high' | 'low'): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'style';
      link.href = url;
      if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high');
      }
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to prefetch stylesheet: ${url}`));
      
      document.head.appendChild(link);
    });
  }

  private prefetchImage(url: string, priority: 'high' | 'low'): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      if (priority === 'high') {
        img.fetchPriority = 'high';
      }
      
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to prefetch image: ${url}`));
      img.src = url;
    });
  }

  // Prefetch next page resources based on current page
  prefetchNextPageResources(currentPath: string) {
    const nextPageResources: Record<string, string[]> = {
      '/': ['/apartments', '/amenities', '/contact'],
      '/apartments': ['/amenities', '/contact'],
      '/amenities': ['/contact', '/apartments'],
      '/contact': ['/apartments', '/amenities']
    };

    const resources = nextPageResources[currentPath] || [];
    if (resources.length > 0) {
      this.prefetchResources(resources, { priority: 'low' });
    }
  }
}

// Create global instance
export const prefetcher = new IntelligentPrefetcher();

// Prefetch based on user interactions
export const setupIntelligentPrefetching = () => {
  // Prefetch on scroll (for images and components)
  let scrollTimeout: number;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Prefetch images that are about to come into view
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) {
          const src = img.getAttribute('data-src');
          if (src) {
            prefetcher.prefetchResources([src], { priority: 'low' });
          }
        }
      });
    }, 100);
  });

  // Prefetch on mouse movement (for likely next interactions)
  let mouseTimeout: number;
  window.addEventListener('mousemove', () => {
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
      // Prefetch resources for likely next interactions
      const currentPath = window.location.pathname;
      prefetcher.prefetchNextPageResources(currentPath);
    }, 2000); // Wait 2 seconds after mouse stops moving
  });
};
