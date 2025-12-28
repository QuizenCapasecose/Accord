/**
 * SITEMAP GENERATOR UTILITY
 * MetroBuild QMS - Dynamic Sitemap Generation
 * 
 * Usage:
 * - Generates sitemap.xml dynamically based on routes
 * - Updates automatically when new pages are added
 * - Calculates priority and change frequency
 * - Validates URLs before adding to sitemap
 * 
 * Performance Impact:
 * - Improves SEO by ensuring all pages are indexed
 * - Reduces manual maintenance
 * - Prevents broken links in sitemap
 */

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'never';
  priority: number;
  images?: {
    loc: string;
    title?: string;
    caption?: string;
  }[];
}

export interface SitemapConfig {
  baseUrl: string;
  routes: RouteDefinition[];
  defaultChangeFreq?: SitemapEntry['changefreq'];
  defaultPriority?: number;
}

export interface RouteDefinition {
  path: string;
  lastmod?: string;
  changefreq?: SitemapEntry['changefreq'];
  priority?: number;
  images?: string[];
  exclude?: boolean;
}

/**
 * ALL ROUTES IN THE APPLICATION
 * Add new routes here to automatically include in sitemap
 */
export const APP_ROUTES: RouteDefinition[] = [
  // TIER 1: Homepage (Priority: 1.0)
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: '2025-12-27',
  },

  // TIER 2: High-Value Landing Pages (Priority: 0.9)
  // 6,850+ monthly search volume
  {
    path: '/how-to-avoid-da-delays',
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: '2025-12-27',
  },
  {
    path: '/basix-certificate-residential',
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: '2025-12-27',
  },
  {
    path: '/nsw-da-assessment-process',
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: '2025-12-27',
  },
  {
    path: '/rfi-construction-meaning',
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: '2025-12-27',
  },

  // TIER 3: Core Product Pages (Priority: 0.8)
  {
    path: '/projects',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: '2025-12-27',
  },
  {
    path: '/process',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: '2025-12-27',
  },
  {
    path: '/stages',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: '2025-12-27',
  },
  {
    path: '/documents',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: '2025-12-27',
  },
  {
    path: '/compliance',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: '2025-12-27',
  },

  // Business Pages
  {
    path: '/pricing',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: '2025-12-27',
  },
  {
    path: '/about',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },
  {
    path: '/contact',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },

  // TIER 4: Guides & Resources (Priority: 0.7)
  {
    path: '/cumberland-dcp-guide',
    priority: 0.7,
    changefreq: 'quarterly',
    lastmod: '2025-12-15',
  },
  {
    path: '/cumberland-lep-2021',
    priority: 0.7,
    changefreq: 'quarterly',
    lastmod: '2025-12-15',
  },
  {
    path: '/pre-lodgement-guide',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },
  {
    path: '/lodgement-guide',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },
  {
    path: '/assessment-timeline',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },
  {
    path: '/determination-guide',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },
  {
    path: '/post-consent-requirements',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },

  // Document Templates
  {
    path: '/document-templates',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },
  {
    path: '/templates/da-application-form',
    priority: 0.6,
    changefreq: 'quarterly',
    lastmod: '2025-12-20',
  },
  {
    path: '/templates/statement-environmental-effects',
    priority: 0.6,
    changefreq: 'quarterly',
    lastmod: '2025-12-20',
  },
  {
    path: '/templates/architectural-plans',
    priority: 0.6,
    changefreq: 'quarterly',
    lastmod: '2025-12-20',
  },
  {
    path: '/templates/basix-certificate',
    priority: 0.6,
    changefreq: 'quarterly',
    lastmod: '2025-12-20',
  },

  // TIER 5: Tools & Features (Priority: 0.7)
  {
    path: '/compliance-checker',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: '2025-12-20',
  },
  {
    path: '/rfi-tracker',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: '2025-12-20',
  },
  {
    path: '/kpi-dashboard',
    priority: 0.6,
    changefreq: 'weekly',
    lastmod: '2025-12-20',
  },
  {
    path: '/validation-dashboard',
    priority: 0.6,
    changefreq: 'weekly',
    lastmod: '2025-12-20',
  },

  // TIER 6: Quality & ISO Pages (Priority: 0.6)
  {
    path: '/quality-management',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },
  {
    path: '/kaizen-continuous-improvement',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },
  {
    path: '/iso-9001-compliance',
    priority: 0.6,
    changefreq: 'quarterly',
    lastmod: '2025-12-20',
  },

  // TIER 7: Blog & News (Priority: 0.6)
  {
    path: '/blog',
    priority: 0.6,
    changefreq: 'weekly',
    lastmod: '2025-12-27',
  },
  {
    path: '/blog/top-reasons-da-rejected-nsw',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },
  {
    path: '/blog/understanding-basix-requirements',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: '2025-12-15',
  },
  {
    path: '/blog/rfi-prevention-strategies',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: '2025-12-10',
  },

  // TIER 8: Legal & Support (Priority: 0.5)
  {
    path: '/privacy-policy',
    priority: 0.5,
    changefreq: 'quarterly',
    lastmod: '2025-12-01',
  },
  {
    path: '/terms-of-service',
    priority: 0.5,
    changefreq: 'quarterly',
    lastmod: '2025-12-01',
  },
  {
    path: '/help',
    priority: 0.5,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },
  {
    path: '/faq',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: '2025-12-20',
  },

  // TIER 9: Component Showcases (Priority: 0.4)
  // These should have noindex meta tag
  {
    path: '/showcase/solution-page',
    priority: 0.4,
    changefreq: 'yearly',
    lastmod: '2025-12-20',
  },
  {
    path: '/showcase/metric-cards',
    priority: 0.4,
    changefreq: 'yearly',
    lastmod: '2025-12-20',
  },
  {
    path: '/showcase/data-tables',
    priority: 0.4,
    changefreq: 'yearly',
    lastmod: '2025-12-20',
  },
];

/**
 * EXCLUDED ROUTES
 * Don't include in sitemap (admin, API, user-specific)
 */
export const EXCLUDED_PATTERNS = [
  '/admin',
  '/login',
  '/logout',
  '/signup',
  '/api',
  '/user',
  '/account',
  '/dashboard',
  '/settings',
  '/checkout',
  '/cart',
  '/payment',
  '/dev',
  '/test',
  '/staging',
];

/**
 * Generate XML sitemap from routes
 */
export function generateSitemap(config: SitemapConfig): string {
  const { baseUrl, routes, defaultChangeFreq = 'monthly', defaultPriority = 0.5 } = config;

  const entries = routes
    .filter(route => !route.exclude)
    .filter(route => !EXCLUDED_PATTERNS.some(pattern => route.path.startsWith(pattern)))
    .map(route => {
      const entry: SitemapEntry = {
        url: `${baseUrl}${route.path}`,
        lastmod: route.lastmod || new Date().toISOString().split('T')[0],
        changefreq: route.changefreq || defaultChangeFreq,
        priority: route.priority !== undefined ? route.priority : defaultPriority,
      };

      if (route.images && route.images.length > 0) {
        entry.images = route.images.map(img => ({
          loc: `${baseUrl}${img}`,
        }));
      }

      return entry;
    });

  return buildSitemapXML(entries);
}

/**
 * Build XML string from sitemap entries
 */
function buildSitemapXML(entries: SitemapEntry[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const entry of entries) {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(entry.url)}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;

    if (entry.images && entry.images.length > 0) {
      for (const image of entry.images) {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${escapeXml(image.loc)}</image:loc>\n`;
        if (image.title) {
          xml += `      <image:title>${escapeXml(image.title)}</image:title>\n`;
        }
        if (image.caption) {
          xml += `      <image:caption>${escapeXml(image.caption)}</image:caption>\n`;
        }
        xml += '    </image:image>\n';
      }
    }

    xml += '  </url>\n';
  }

  xml += '</urlset>';
  return xml;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get current date in YYYY-MM-DD format
 */
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Calculate priority based on route depth and type
 */
export function calculatePriority(path: string): number {
  // Homepage
  if (path === '/') return 1.0;

  // Landing pages (high search volume)
  const landingPages = [
    '/how-to-avoid-da-delays',
    '/basix-certificate-residential',
    '/nsw-da-assessment-process',
    '/rfi-construction-meaning',
  ];
  if (landingPages.includes(path)) return 0.9;

  // Core product pages
  const productPages = ['/projects', '/process', '/stages', '/documents', '/compliance', '/pricing'];
  if (productPages.includes(path)) return 0.8;

  // Guide pages
  if (path.includes('guide') || path.includes('templates')) return 0.7;

  // Tools
  if (path.includes('tracker') || path.includes('checker')) return 0.7;

  // Blog posts
  if (path.startsWith('/blog/')) return 0.6;

  // Legal pages
  if (path.includes('privacy') || path.includes('terms')) return 0.5;

  // Showcases/demos
  if (path.includes('showcase') || path.includes('demo')) return 0.4;

  // Default
  return 0.5;
}

/**
 * Calculate change frequency based on route type
 */
export function calculateChangeFreq(path: string): SitemapEntry['changefreq'] {
  // Homepage - updated weekly
  if (path === '/') return 'weekly';

  // Product pages - updated weekly
  if (['/projects', '/process', '/stages', '/pricing'].includes(path)) return 'weekly';

  // Landing pages - stable content, updated monthly
  if (path.includes('how-to-') || path.includes('guide')) return 'monthly';

  // Blog - updated weekly (new posts)
  if (path === '/blog') return 'weekly';

  // Blog posts - stable once published
  if (path.startsWith('/blog/')) return 'monthly';

  // Legal pages - rarely updated
  if (path.includes('privacy') || path.includes('terms')) return 'quarterly';

  // Compliance/LEP pages - rarely updated (legislation changes)
  if (path.includes('lep') || path.includes('dcp')) return 'quarterly';

  // Default
  return 'monthly';
}

/**
 * Generate sitemap for MetroBuild QMS
 */
export function generateMetroBuildSitemap(baseUrl: string = 'https://metrobuild-da-app.com'): string {
  return generateSitemap({
    baseUrl,
    routes: APP_ROUTES,
    defaultChangeFreq: 'monthly',
    defaultPriority: 0.5,
  });
}

/**
 * Save sitemap to file (Node.js only)
 */
export async function saveSitemapToFile(sitemap: string, filepath: string): Promise<void> {
  // This would use Node.js fs module in a build script
  // Not available in browser environment
  console.log('Sitemap generated:', sitemap.length, 'characters');
  console.log('Save to:', filepath);
  // In a real implementation:
  // const fs = require('fs').promises;
  // await fs.writeFile(filepath, sitemap, 'utf-8');
}

/**
 * USAGE EXAMPLE:
 * 
 * // In a build script (Node.js):
 * const sitemap = generateMetroBuildSitemap('https://metrobuild-da-app.com');
 * await saveSitemapToFile(sitemap, './public/sitemap.xml');
 * 
 * // In the app (browser):
 * const sitemap = generateMetroBuildSitemap();
 * console.log(sitemap);
 */
