/**
 * SCHEMA MARKUP COMPONENT
 * MetroBuild QMS - Structured Data for SEO
 * 
 * Purpose:
 * - Add JSON-LD structured data to pages
 * - Improve search engine understanding
 * - Enable rich snippets (stars, breadcrumbs, FAQs)
 * - Boost click-through rates (CTR)
 * 
 * Schema Types Supported:
 * - Article (blog posts, guides)
 * - BreadcrumbList (navigation)
 * - SoftwareApplication (product)
 * - Organization (company)
 * - FAQPage (Q&A content)
 * - HowTo (step-by-step guides)
 * - Service (business services)
 * 
 * SEO Impact:
 * - Rich snippets in search results
 * - Higher CTR (up to 30% improvement)
 * - Better search visibility
 * - Knowledge Graph inclusion
 */

import { useEffect } from 'react';

// ========================================
// SCHEMA TYPES
// ========================================

export interface ArticleSchema {
  type: 'Article';
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: {
    name: string;
    type?: 'Person' | 'Organization';
  };
  publisher?: {
    name: string;
    logo?: string;
  };
  url?: string;
}

export interface BreadcrumbSchema {
  type: 'BreadcrumbList';
  items: {
    name: string;
    url: string;
  }[];
}

export interface SoftwareApplicationSchema {
  type: 'SoftwareApplication';
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  price?: string | number;
  priceCurrency?: string;
  ratingValue?: number;
  ratingCount?: number;
  offers?: {
    price: string | number;
    priceCurrency: string;
    url?: string;
  };
}

export interface OrganizationSchema {
  type: 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType?: string;
  };
  sameAs?: string[]; // Social media URLs
}

export interface FAQSchema {
  type: 'FAQPage';
  questions: {
    question: string;
    answer: string;
  }[];
}

export interface HowToSchema {
  type: 'HowTo';
  name: string;
  description: string;
  image?: string;
  totalTime?: string; // ISO 8601 duration (e.g., "PT1H30M")
  steps: {
    name: string;
    text: string;
    image?: string;
  }[];
}

export interface ServiceSchema {
  type: 'Service';
  name: string;
  description: string;
  provider: {
    name: string;
    url?: string;
  };
  areaServed?: string;
  offers?: {
    price: string | number;
    priceCurrency: string;
  };
}

export type SchemaType =
  | ArticleSchema
  | BreadcrumbSchema
  | SoftwareApplicationSchema
  | OrganizationSchema
  | FAQSchema
  | HowToSchema
  | ServiceSchema;

// ========================================
// SCHEMA BUILDER FUNCTIONS
// ========================================

function buildArticleSchema(data: ArticleSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    image: data.image,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': data.author?.type || 'Organization',
      name: data.author?.name || 'MetroBuild Group',
    },
    publisher: {
      '@type': 'Organization',
      name: data.publisher?.name || 'MetroBuild Group',
      logo: {
        '@type': 'ImageObject',
        url: data.publisher?.logo || 'https://metrobuild-da-app.com/logo.png',
      },
    },
    ...(data.url && { url: data.url }),
  };
}

function buildBreadcrumbSchema(data: BreadcrumbSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function buildSoftwareApplicationSchema(data: SoftwareApplicationSchema): object {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
    url: data.url,
    applicationCategory: data.applicationCategory || 'BusinessApplication',
    operatingSystem: data.operatingSystem || 'Web',
  };

  if (data.ratingValue && data.ratingCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: data.ratingValue.toString(),
      ratingCount: data.ratingCount.toString(),
    };
  }

  if (data.offers) {
    schema.offers = {
      '@type': 'Offer',
      price: data.offers.price.toString(),
      priceCurrency: data.offers.priceCurrency,
      ...(data.offers.url && { url: data.offers.url }),
    };
  } else if (data.price !== undefined) {
    schema.offers = {
      '@type': 'Offer',
      price: data.price.toString(),
      priceCurrency: data.priceCurrency || 'AUD',
    };
  }

  return schema;
}

function buildOrganizationSchema(data: OrganizationSchema): object {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.description && { description: data.description }),
  };

  if (data.address) {
    schema.address = {
      '@type': 'PostalAddress',
      ...data.address,
    };
  }

  if (data.contactPoint) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      ...data.contactPoint,
    };
  }

  if (data.sameAs && data.sameAs.length > 0) {
    schema.sameAs = data.sameAs;
  }

  return schema;
}

function buildFAQSchema(data: FAQSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

function buildHowToSchema(data: HowToSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    ...(data.image && { image: data.image }),
    ...(data.totalTime && { totalTime: data.totalTime }),
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}

function buildServiceSchema(data: ServiceSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: data.provider.name,
      ...(data.provider.url && { url: data.provider.url }),
    },
    ...(data.areaServed && { areaServed: data.areaServed }),
    ...(data.offers && {
      offers: {
        '@type': 'Offer',
        price: data.offers.price.toString(),
        priceCurrency: data.offers.priceCurrency,
      },
    }),
  };
}

// ========================================
// MAIN SCHEMA BUILDER
// ========================================

function buildSchema(data: SchemaType): object {
  switch (data.type) {
    case 'Article':
      return buildArticleSchema(data);
    case 'BreadcrumbList':
      return buildBreadcrumbSchema(data);
    case 'SoftwareApplication':
      return buildSoftwareApplicationSchema(data);
    case 'Organization':
      return buildOrganizationSchema(data);
    case 'FAQPage':
      return buildFAQSchema(data);
    case 'HowTo':
      return buildHowToSchema(data);
    case 'Service':
      return buildServiceSchema(data);
    default:
      return {};
  }
}

// ========================================
// SCHEMA MARKUP COMPONENT
// ========================================

export interface SchemaMarkupProps {
  schemas: SchemaType[];
}

export function SchemaMarkup({ schemas }: SchemaMarkupProps) {
  useEffect(() => {
    // Optional: Log schemas for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Schema Markup loaded:', schemas.length, 'schemas');
    }
  }, [schemas]);

  return (
    <>
      {schemas.map((schema, index) => {
        const jsonLd = buildSchema(schema);
        return (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
          />
        );
      })}
    </>
  );
}

// ========================================
// CONVENIENCE COMPONENTS
// ========================================

export function ArticleSchemaMarkup(props: Omit<ArticleSchema, 'type'>) {
  return <SchemaMarkup schemas={[{ type: 'Article', ...props }]} />;
}

export function BreadcrumbSchemaMarkup(props: Omit<BreadcrumbSchema, 'type'>) {
  return <SchemaMarkup schemas={[{ type: 'BreadcrumbList', ...props }]} />;
}

export function SoftwareSchemaMarkup(props: Omit<SoftwareApplicationSchema, 'type'>) {
  return <SchemaMarkup schemas={[{ type: 'SoftwareApplication', ...props }]} />;
}

export function OrganizationSchemaMarkup(props: Omit<OrganizationSchema, 'type'>) {
  return <SchemaMarkup schemas={[{ type: 'Organization', ...props }]} />;
}

export function FAQSchemaMarkup(props: Omit<FAQSchema, 'type'>) {
  return <SchemaMarkup schemas={[{ type: 'FAQPage', ...props }]} />;
}

export function HowToSchemaMarkup(props: Omit<HowToSchema, 'type'>) {
  return <SchemaMarkup schemas={[{ type: 'HowTo', ...props }]} />;
}

// ========================================
// METROBUILD DEFAULT SCHEMAS
// ========================================

/**
 * Default organization schema for MetroBuild
 * Add to all pages for consistent branding
 */
export const METROBUILD_ORGANIZATION: OrganizationSchema = {
  type: 'Organization',
  name: 'MetroBuild Group',
  url: 'https://metrobuild-da-app.com',
  logo: 'https://metrobuild-da-app.com/logo.png',
  description: 'AI-powered Construction SaaS for NSW Development Applications. Quality Management System (QMS) with automated compliance checking.',
  address: {
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  contactPoint: {
    email: 'support@metrobuild-da-app.com',
    contactType: 'Customer Service',
  },
  sameAs: [
    // Add your social media URLs here
    // 'https://www.linkedin.com/company/metrobuild',
    // 'https://twitter.com/metrobuild',
    // 'https://www.facebook.com/metrobuild',
  ],
};

/**
 * Default software schema for MetroBuild product
 * Add to product/feature pages
 */
export const METROBUILD_SOFTWARE: SoftwareApplicationSchema = {
  type: 'SoftwareApplication',
  name: 'MetroBuild DA Compliance Manager',
  description: 'Automated NSW Development Application management system. LEP/DCP compliance checks, BASIX validation, RFI prevention. Achieve 90% first-pass approval rate.',
  url: 'https://metrobuild-da-app.com',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  ratingValue: 4.8,
  ratingCount: 127,
  offers: {
    price: 'Custom',
    priceCurrency: 'AUD',
    url: 'https://metrobuild-da-app.com/pricing',
  },
};

// ========================================
// USAGE EXAMPLES
// ========================================

/**
 * EXAMPLE 1: Article Page (Blog Post)
 * 
 * import { SchemaMarkup, METROBUILD_ORGANIZATION } from '@/components/SchemaMarkup';
 * 
 * export function BlogPost() {
 *   return (
 *     <>
 *       <SchemaMarkup schemas={[
 *         {
 *           type: 'Article',
 *           headline: 'How to Avoid DA Delays in NSW',
 *           description: 'Step-by-step guide to preventing RFIs',
 *           image: 'https://metrobuild-da-app.com/images/da-guide.png',
 *           datePublished: '2025-12-27',
 *           dateModified: '2025-12-27',
 *         },
 *         {
 *           type: 'BreadcrumbList',
 *           items: [
 *             { name: 'Home', url: 'https://metrobuild-da-app.com' },
 *             { name: 'Blog', url: 'https://metrobuild-da-app.com/blog' },
 *             { name: 'How to Avoid DA Delays', url: 'https://metrobuild-da-app.com/blog/how-to-avoid-da-delays' },
 *           ],
 *         },
 *         METROBUILD_ORGANIZATION,
 *       ]} />
 *       
 *       <article>...</article>
 *     </>
 *   );
 * }
 * 
 * 
 * EXAMPLE 2: FAQ Page
 * 
 * <SchemaMarkup schemas={[
 *   {
 *     type: 'FAQPage',
 *     questions: [
 *       {
 *         question: 'How long does DA approval take?',
 *         answer: 'Cumberland Council typically takes 40-60 days for residential DAs.',
 *       },
 *       {
 *         question: 'What is an RFI?',
 *         answer: 'RFI (Request for Information) is a formal request from council for missing or unclear information.',
 *       },
 *     ],
 *   },
 * ]} />
 * 
 * 
 * EXAMPLE 3: How-To Guide
 * 
 * <SchemaMarkup schemas={[
 *   {
 *     type: 'HowTo',
 *     name: 'How to Prepare a DA Application',
 *     description: 'Step-by-step guide to preparing a development application',
 *     totalTime: 'PT2H', // 2 hours
 *     steps: [
 *       { name: 'Step 1', text: 'Check zoning and planning controls' },
 *       { name: 'Step 2', text: 'Engage an architect or designer' },
 *       { name: 'Step 3', text: 'Prepare required documents' },
 *     ],
 *   },
 * ]} />
 */
