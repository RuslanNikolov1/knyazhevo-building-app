import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'
// Performance optimizations temporarily disabled to fix flickering
// import { initializePerformanceOptimizations } from './utils/performance'
// import { setupIntelligentPrefetching } from './utils/prefetching'

// Initialize performance optimizations
// initializePerformanceOptimizations();
// setupIntelligentPrefetching();

// Service worker temporarily disabled to fix flickering
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration);
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }

createRoot(document.getElementById('root')!).render(
  <App />
)
