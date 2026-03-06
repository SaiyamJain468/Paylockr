// Image Optimization Utility
export const optimizeImage = (src: string, width?: number): string => {
  if (!src) return '';
  
  // For external images, return as-is
  if (src.startsWith('http')) return src;
  
  // For local images, add optimization params
  return width ? `${src}?w=${width}&q=75` : src;
};

export const lazyLoadImage = (img: HTMLImageElement) => {
  const src = img.dataset.src;
  if (!src) return;
  
  img.src = src;
  img.classList.add('loaded');
};

// Intersection Observer for lazy loading
export const createImageObserver = () => {
  if (!('IntersectionObserver' in window)) return null;
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        lazyLoadImage(img);
      }
    });
  }, {
    rootMargin: '50px'
  });
};
