import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

/**
 * Main Entry Point for MetroBuild QMS Application
 * 
 * Performance Optimizations:
 * - Uses React 18's createRoot for concurrent rendering
 * - Lazy loads heavy components via React.lazy() in App.tsx
 * - Monitors Core Web Vitals in development (see PerformanceMonitor component)
 */

// Optional: Report Core Web Vitals in production
// Uncomment to enable production monitoring
/*
if (import.meta.env.PROD) {
  import('web-vitals').then(({ onCLS, onFID, onLCP, onFCP, onTTFB, onINP }) => {
    const reportWebVitals = (metric: any) => {
      // Send to analytics endpoint
      console.log(metric);
      // Example: Send to Google Analytics
      // if (window.gtag) {
      //   window.gtag('event', metric.name, {
      //     event_category: 'Web Vitals',
      //     value: Math.round(metric.value),
      //     event_label: metric.id,
      //     non_interaction: true,
      //   });
      // }
    };
    
    onCLS(reportWebVitals);  // Cumulative Layout Shift (target: ≤0.1)
    onFID(reportWebVitals);  // First Input Delay (target: ≤100ms)
    onINP(reportWebVitals);  // Interaction to Next Paint (target: ≤200ms)
    onLCP(reportWebVitals);  // Largest Contentful Paint (target: ≤2.5s)
    onFCP(reportWebVitals);  // First Contentful Paint (target: ≤1.8s)
    onTTFB(reportWebVitals); // Time to First Byte (target: ≤800ms)
  });
}
*/

// Create root and render app
const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
