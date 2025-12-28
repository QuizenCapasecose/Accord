# Core Web Vitals Performance Checklist

## Quick Reference for MetroBuild QMS

```
Target Metrics:
─────────────────────────────────────
✅ LCP (Largest Contentful Paint):  ≤2.5s
✅ FID/INP (First Input Delay):     ≤100ms
✅ CLS (Cumulative Layout Shift):   ≤0.1
```

---

## 🚀 Pre-Deployment Checklist

### **LCP Optimization (≤2.5s)**
- [ ] All images have explicit `width` and `height` attributes
- [ ] Hero images preloaded: `<link rel="preload" href="hero.webp" as="image" />`
- [ ] Images use WebP/AVIF format with fallbacks
- [ ] System fonts used (no external font loading), OR custom fonts use `font-display: swap`
- [ ] Above-fold images NOT lazy loaded
- [ ] Below-fold images lazy loaded: `loading="lazy"`
- [ ] Critical CSS inlined (automatic with Vite)
- [ ] Large components code-split with React.lazy()

**Test Command:**
```bash
# Open Chrome DevTools → Lighthouse → Performance
# Check "LCP" metric in report
# Target: Green (≤2.5s)
```

---

### **FID/INP Optimization (≤100ms)**
- [ ] Event handlers debounced (search, scroll, resize)
- [ ] No inline functions in JSX render (use `useCallback`)
- [ ] Heavy computations memoized with `useMemo`
- [ ] Components memoized with `React.memo` where appropriate
- [ ] No blocking third-party scripts
- [ ] JavaScript bundle size <300KB (check with `npm run build`)
- [ ] Code splitting implemented for routes/pages

**Test Command:**
```bash
# 1. Open page in Chrome
# 2. Open DevTools → Performance tab
# 3. Click "Record" → Interact with page → Stop
# 4. Look for "Long Tasks" (red bars >50ms)
# Target: No tasks >100ms
```

---

### **CLS Optimization (≤0.1)**
- [ ] ALL images have `width` and `height` attributes
- [ ] Loading skeletons for async content
- [ ] `min-height` set for dynamic content containers
- [ ] Font loading: `font-display: swap` (or system fonts)
- [ ] No content inserted above existing content
- [ ] CSS Grid/Flexbox for stable layouts
- [ ] Ads/embeds have reserved space
- [ ] No animations that trigger layout shifts

**Test Command:**
```bash
# Open Chrome DevTools → Lighthouse → Performance
# Check "CLS" metric in report
# Target: Green (≤0.1)
```

---

## 📊 Testing Workflow

### **1. Local Development Testing**
```bash
# A. Install web-vitals (if not already)
npm install web-vitals

# B. Add PerformanceMonitor to App.tsx
import { PerformanceMonitor } from './components/shared/PerformanceMonitor';

// In render:
{import.meta.env.DEV && <PerformanceMonitor />}

# C. Run dev server and interact with app
npm run dev

# D. Check metrics in floating panel (bottom-right corner)
```

### **2. Production Build Testing**
```bash
# A. Build production bundle
npm run build

# B. Preview production build locally
npm run preview

# C. Open http://localhost:4173 in Chrome
# D. Run Lighthouse audit:
#    DevTools → Lighthouse → Performance (Mobile)
# E. Verify all Core Web Vitals are GREEN
```

### **3. Real URL Testing (After Deployment)**
```bash
# A. Visit https://pagespeed.web.dev/
# B. Enter your production URL
# C. Run test for Mobile AND Desktop
# D. Check Core Web Vitals scores:
#    - LCP: Green (≤2.5s)
#    - FID/INP: Green (≤100ms)
#    - CLS: Green (≤0.1)
```

---

## 🛠️ Common Fixes

### **If LCP > 2.5s:**
```tsx
// 1. Optimize images
<img 
  src="image.webp"  // Use WebP/AVIF
  width={800}       // Explicit dimensions
  height={600}
  loading="eager"   // For above-fold
/>

// 2. Preload hero image
// Add to index.html <head>:
<link rel="preload" href="/hero.webp" as="image" />

// 3. Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 4. Use system fonts
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### **If FID/INP > 100ms:**
```tsx
// 1. Debounce event handlers
import { debounce } from '@/utils/performance';

const handleSearch = debounce((query: string) => {
  // Search logic
}, 300);

// 2. Use useCallback for event handlers
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// 3. Memoize expensive computations
const expensiveValue = useMemo(() => 
  computeExpensiveValue(data),
  [data]
);

// 4. Code split large dependencies
const Chart = lazy(() => import('recharts'));
```

### **If CLS > 0.1:**
```tsx
// 1. ALWAYS set image dimensions
<img width={800} height={600} src="..." alt="..." />

// 2. Use aspect-ratio for responsive images
<img className="w-full aspect-[16/9]" src="..." alt="..." />

// 3. Reserve space for dynamic content
<div className="min-h-[400px]">
  {dynamicContent}
</div>

// 4. Show skeleton while loading
{isLoading ? (
  <div className="animate-pulse">
    <div className="h-48 bg-slate-200 rounded"></div>
  </div>
) : (
  <ActualContent />
)}
```

---

## 📈 Performance Budget

### **Bundle Sizes**
```
Homepage:       <200 KB (gzipped)
Each SEO page:  <150 KB (gzipped)
Total CSS:      <50 KB (gzipped)
Total fonts:    0 KB (using system fonts)
```

**Check bundle size:**
```bash
npm run build
# Look for output:
# dist/assets/index-abc123.js  180.23 kB │ gzip: 65.45 kB
```

### **Network Metrics**
```
First Contentful Paint (FCP):  ≤1.8s
Time to Interactive (TTI):     ≤3.8s
Speed Index:                   ≤3.4s
Total Blocking Time (TBT):     ≤200ms
```

### **Resource Counts**
```
HTTP requests (initial load):  <50
Images per page:               <20
JavaScript files:              <10
CSS files:                     1 (bundled)
```

---

## 🔍 Monitoring Commands

### **Analyze Bundle Size**
```bash
# Generate bundle analysis
npm run build -- --analyze

# Opens visualization showing:
# - Largest dependencies
# - Duplicate packages
# - Optimization opportunities
```

### **Check Dependencies**
```bash
# List all dependencies with sizes
npx vite-bundle-visualizer

# Find unused dependencies
npx depcheck

# Update dependencies
npm outdated
npm update
```

### **Lighthouse CI (Automated Testing)**
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=http://localhost:4173

# Add to CI/CD pipeline
# Fails build if Core Web Vitals < target
```

---

## ✅ Quick Wins (30 Minutes)

1. **Add image dimensions** (10 min)
   - Find: `<img src=`
   - Add: `width={800} height={600}`

2. **Optimize Unsplash URLs** (5 min)
   ```tsx
   import { optimizeUnsplashUrl } from '@/utils/performance';
   const url = optimizeUnsplashUrl(originalUrl, { width: 800, quality: 80 });
   ```

3. **Lazy load below-fold images** (5 min)
   ```tsx
   <img src="..." loading="lazy" />
   ```

4. **Add loading skeletons** (10 min)
   ```tsx
   {isLoading ? <Skeleton /> : <Content />}
   ```

---

## 📚 Resources

- **Web Vitals Library:** `npm install web-vitals`
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Chrome DevTools Guide:** https://developer.chrome.com/docs/devtools/
- **Official Web Vitals:** https://web.dev/vitals/
- **Lighthouse Documentation:** https://developer.chrome.com/docs/lighthouse/

---

## 🎯 Success Criteria

**Before launch, ALL pages should score:**

```
PageSpeed Insights (Mobile):
─────────────────────────────
Performance:     90-100 ✅
Accessibility:   90-100 ✅
Best Practices:  90-100 ✅
SEO:             90-100 ✅

Core Web Vitals:
─────────────────
LCP:  ≤2.5s   ✅
FID:  ≤100ms  ✅
CLS:  ≤0.1    ✅
```

**Test these URLs:**
- [ ] Homepage: `/`
- [ ] BASIX Certificate: `/#basix-residential`
- [ ] DA Assessment: `/#da-assessment`
- [ ] RFI Prevention: `/#rfi-construction`
- [ ] Avoid DA Delays: `/#avoid-delays`

---

## 🚨 Red Flags

**Immediately investigate if:**
- LCP > 4.0s (poor)
- FID/INP > 300ms (poor)
- CLS > 0.25 (poor)
- Bundle size > 500KB (uncompressed)
- PageSpeed score < 70
- Time to Interactive > 6s

**Common causes:**
1. Unoptimized images (>500KB)
2. Missing width/height attributes
3. Blocking JavaScript
4. Large dependencies (check bundle analysis)
5. External font loading
6. Layout shifts from dynamic content

---

## 📝 Monthly Maintenance

**Every month:**
1. [ ] Run PageSpeed Insights on all pages
2. [ ] Check bundle size: `npm run build`
3. [ ] Update dependencies: `npm update`
4. [ ] Remove unused dependencies: `npx depcheck`
5. [ ] Review new images added (optimize if needed)
6. [ ] Check Core Web Vitals trend (improving or degrading?)

---

**Last Updated:** December 27, 2024  
**Next Review:** January 27, 2025
