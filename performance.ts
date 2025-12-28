/**
 * Performance Utilities for Core Web Vitals Optimization
 * 
 * This file contains helper functions to optimize:
 * - LCP (Largest Contentful Paint) ≤2.5s
 * - FID/INP (First Input Delay / Interaction to Next Paint) ≤100ms
 * - CLS (Cumulative Layout Shift) ≤0.1
 */

/**
 * Debounce function to optimize event handlers (improves FID/INP)
 * Delays function execution until after wait milliseconds have elapsed
 * since the last time it was invoked.
 * 
 * @example
 * const handleSearch = debounce((query: string) => {
 *   console.log('Searching:', query);
 * }, 300);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit execution rate (improves FID/INP)
 * Ensures function is only called once per specified time period.
 * 
 * @example
 * const handleScroll = throttle(() => {
 *   console.log('Scroll position:', window.scrollY);
 * }, 100);
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Optimize Unsplash image URLs for better LCP
 * Adds performance parameters: width, height, quality, format
 * 
 * @example
 * const optimized = optimizeUnsplashUrl(
 *   'https://images.unsplash.com/photo-123',
 *   { width: 800, height: 600, quality: 80 }
 * );
 */
export function optimizeUnsplashUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'jpg' | 'webp' | 'avif';
    fit?: 'crop' | 'scale' | 'fill';
  } = {}
): string {
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'webp',
    fit = 'crop'
  } = options;

  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    q: quality.toString(),
    fm: format,
    fit: fit
  });

  return `${url}?${params.toString()}`;
}

/**
 * Lazy load images on intersection (improves LCP by prioritizing visible content)
 * 
 * @example
 * const observer = createLazyLoadObserver((entries) => {
 *   entries.forEach(entry => {
 *     if (entry.isIntersecting) {
 *       const img = entry.target as HTMLImageElement;
 *       img.src = img.dataset.src!;
 *     }
 *   });
 * });
 * 
 * observer.observe(document.querySelector('img[data-src]'));
 */
export function createLazyLoadObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px', // Load 50px before entering viewport
    threshold: 0.01,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Preload critical resources (improves LCP)
 * 
 * @example
 * preloadImage('/hero-image.webp');
 * preloadFont('/fonts/CustomFont.woff2');
 */
export function preloadImage(src: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}

export function preloadFont(src: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.type = 'font/woff2';
  link.href = src;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

/**
 * Get image dimensions from URL (helps prevent CLS)
 * Useful for dynamically loaded images
 * 
 * @example
 * const { width, height } = await getImageDimensions(imgUrl);
 * <img src={imgUrl} width={width} height={height} />
 */
export function getImageDimensions(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Monitor Core Web Vitals in production
 * Logs LCP, FID/INP, CLS to console (or send to analytics)
 * 
 * @example
 * // In App.tsx
 * useEffect(() => {
 *   monitorWebVitals((metric) => {
 *     console.log(metric);
 *     // Or send to analytics:
 *     // sendToAnalytics(metric);
 *   });
 * }, []);
 */
export async function monitorWebVitals(
  callback: (metric: any) => void
): Promise<void> {
  try {
    // Dynamically import web-vitals library
    const { onCLS, onFID, onLCP, onFCP, onTTFB } = await import('web-vitals');
    
    onCLS(callback);  // Target: ≤0.1
    onFID(callback);  // Target: ≤100ms
    onLCP(callback);  // Target: ≤2.5s
    onFCP(callback);  // First Contentful Paint
    onTTFB(callback); // Time to First Byte
  } catch (error) {
    console.warn('web-vitals library not installed. Run: npm install web-vitals');
  }
}

/**
 * Calculate aspect ratio for responsive images (prevents CLS)
 * 
 * @example
 * const ratio = getAspectRatio(1920, 1080); // "16/9"
 * <div className={`aspect-[${ratio}]`}>
 *   <img src={imgSrc} className="w-full h-full object-cover" />
 * </div>
 */
export function getAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}

/**
 * Defer non-critical JavaScript (improves FID/INP)
 * Executes callback when browser is idle
 * 
 * @example
 * deferExecution(() => {
 *   // Non-critical code (analytics, etc.)
 *   console.log('Deferred task executed');
 * });
 */
export function deferExecution(callback: () => void, timeout = 2000): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(callback, 1);
  }
}

/**
 * Check if element is in viewport (for lazy loading)
 * 
 * @example
 * if (isInViewport(element)) {
 *   loadContent();
 * }
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Prefetch page on link hover (improves perceived performance)
 * 
 * @example
 * <a 
 *   href="/page" 
 *   onMouseEnter={() => prefetchPage('/page')}
 * >
 *   Link
 * </a>
 */
export function prefetchPage(url: string): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Get current connection speed (useful for adaptive loading)
 * 
 * @example
 * const speed = getConnectionSpeed();
 * if (speed === 'slow') {
 *   // Load low-quality images
 * }
 */
export function getConnectionSpeed(): 'fast' | 'medium' | 'slow' {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType || '4g';
    
    if (effectiveType === '4g') return 'fast';
    if (effectiveType === '3g') return 'medium';
    return 'slow';
  }
  
  return 'medium'; // Default assumption
}

/**
 * Optimize image format based on browser support
 * 
 * @example
 * const format = getOptimalImageFormat(); // 'avif' | 'webp' | 'jpg'
 * const url = `${baseUrl}?fm=${format}`;
 */
export function getOptimalImageFormat(): 'avif' | 'webp' | 'jpg' {
  // Check AVIF support
  const canvas = document.createElement('canvas');
  if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
    return 'avif';
  }
  
  // Check WebP support
  if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
    return 'webp';
  }
  
  return 'jpg';
}

/**
 * Measure function execution time (for performance debugging)
 * 
 * @example
 * const result = measurePerformance('expensiveOperation', () => {
 *   return computeExpensiveValue();
 * });
 * console.log(`Result: ${result.value}, Time: ${result.duration}ms`);
 */
export function measurePerformance<T>(
  label: string,
  fn: () => T
): { value: T; duration: number } {
  const start = performance.now();
  const value = fn();
  const duration = performance.now() - start;
  
  console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
  
  return { value, duration };
}

/**
 * Report long tasks (tasks >50ms that block main thread)
 * 
 * @example
 * reportLongTasks((entries) => {
 *   entries.forEach(entry => {
 *     console.warn('Long task detected:', entry.duration);
 *   });
 * });
 */
export function reportLongTasks(callback: (entries: PerformanceEntry[]) => void): void {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task observation not supported
      console.warn('Long task observation not supported');
    }
  }
}
