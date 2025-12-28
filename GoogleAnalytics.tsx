/**
 * GOOGLE ANALYTICS 4 (GA4) INTEGRATION
 * MetroBuild QMS - Complete Analytics & Event Tracking
 * 
 * Features:
 * - GA4 script injection
 * - Page view tracking
 * - Custom event tracking
 * - User engagement metrics
 * - Conversion tracking
 * - E-commerce events (if applicable)
 */

import { useEffect } from 'react';

// Replace with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Declare gtag types
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    // Only run in production or when explicitly enabled
    if (typeof window === 'undefined') return;

    // Load GA4 script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });

    return () => {
      // Cleanup
      if (script1.parentNode) {
        script1.parentNode.removeChild(script1);
      }
    };
  }, []);

  return null;
}

// Analytics Event Tracking Functions
export const trackEvent = {
  // Page View
  pageView: (pageName: string, pageCategory?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageName,
        page_category: pageCategory,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  },

  // Content Views
  viewContent: (contentName: string, contentType: string, contentId?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        items: [{
          item_name: contentName,
          item_category: contentType,
          item_id: contentId,
        }]
      });
    }
  },

  // Document Downloads
  downloadDocument: (documentName: string, documentType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'file_download', {
        file_name: documentName,
        file_extension: documentType,
        link_text: documentName,
      });
    }
  },

  // Form Submissions
  submitForm: (formName: string, formType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        form_name: formName,
        form_type: formType,
      });
    }
  },

  // Search Events
  search: (searchTerm: string, searchCategory?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        search_category: searchCategory,
      });
    }
  },

  // User Engagement
  engagement: (actionName: string, actionCategory: string, actionValue?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'engagement', {
        engagement_name: actionName,
        engagement_category: actionCategory,
        value: actionValue,
      });
    }
  },

  // Custom MetroBuild Events
  metrobuild: {
    // DA Workflow Events
    viewDAStage: (stageName: string, projectId?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'view_da_stage', {
          stage_name: stageName,
          project_id: projectId,
          event_category: 'DA Workflow',
        });
      }
    },

    // Compliance Check
    checkCompliance: (controlType: string, controlName: string, result: 'pass' | 'fail' | 'warning') => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'compliance_check', {
          control_type: controlType,
          control_name: controlName,
          check_result: result,
          event_category: 'Compliance',
        });
      }
    },

    // Document Management
    uploadDocument: (documentType: string, projectId?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'document_upload', {
          document_type: documentType,
          project_id: projectId,
          event_category: 'Document Management',
        });
      }
    },

    viewDocument: (documentType: string, documentName: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'document_view', {
          document_type: documentType,
          document_name: documentName,
          event_category: 'Document Management',
        });
      }
    },

    // Project Creation
    createProject: (projectType: string, projectValue?: number) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'create_project', {
          project_type: projectType,
          project_value: projectValue,
          event_category: 'Project Management',
        });
      }
    },

    // RFI Tracking
    submitRFI: (rfiType: string, projectId?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'submit_rfi', {
          rfi_type: rfiType,
          project_id: projectId,
          event_category: 'RFI Management',
        });
      }
    },

    resolveRFI: (rfiType: string, resolutionTime?: number) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'resolve_rfi', {
          rfi_type: rfiType,
          resolution_time_hours: resolutionTime,
          event_category: 'RFI Management',
        });
      }
    },

    // Quality Gate Approvals
    approveQualityGate: (gateName: string, projectId?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'approve_quality_gate', {
          gate_name: gateName,
          project_id: projectId,
          event_category: 'Quality Management',
        });
      }
    },

    // BASIX Certificate
    viewBASIX: (certificateNumber?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'view_basix_certificate', {
          certificate_number: certificateNumber,
          event_category: 'BASIX Compliance',
        });
      }
    },

    uploadBASIX: (certificateNumber: string, projectId?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'upload_basix_certificate', {
          certificate_number: certificateNumber,
          project_id: projectId,
          event_category: 'BASIX Compliance',
        });
      }
    },

    // API Integration
    apiCall: (apiEndpoint: string, apiStatus: 'success' | 'error') => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'api_call', {
          api_endpoint: apiEndpoint,
          api_status: apiStatus,
          event_category: 'API Integration',
        });
      }
    },

    // Content Calendar
    viewContentCalendar: () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'view_content_calendar', {
          event_category: 'Content Marketing',
        });
      }
    },

    createContent: (contentType: string, contentTitle?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'create_content', {
          content_type: contentType,
          content_title: contentTitle,
          event_category: 'Content Marketing',
        });
      }
    },

    publishContent: (contentType: string, contentTitle: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'publish_content', {
          content_type: contentType,
          content_title: contentTitle,
          event_category: 'Content Marketing',
        });
      }
    },

    // SEO & Search Console
    viewSearchConsole: () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'view_search_console', {
          event_category: 'SEO',
        });
      }
    },

    fixCrawlError: (errorType: string, url: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'fix_crawl_error', {
          error_type: errorType,
          error_url: url,
          event_category: 'SEO',
        });
      }
    },
  },

  // Conversion Events
  conversion: {
    signup: (method?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'sign_up', {
          method: method,
        });
      }
    },

    login: (method?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'login', {
          method: method,
        });
      }
    },

    startTrial: (planName?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'begin_checkout', {
          items: [{
            item_name: planName || 'MetroBuild Trial',
            item_category: 'Subscription',
          }]
        });
      }
    },

    purchase: (transactionId: string, value: number, currency: string = 'AUD') => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'purchase', {
          transaction_id: transactionId,
          value: value,
          currency: currency,
          items: [{
            item_name: 'MetroBuild Subscription',
            item_category: 'Subscription',
          }]
        });
      }
    },
  },

  // User Properties (for segmentation)
  setUserProperties: (properties: {
    user_type?: string;
    organization_size?: string;
    industry?: string;
    subscription_tier?: string;
  }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', 'user_properties', properties);
    }
  },
};

// Custom Hook for Page Tracking
export function usePageTracking(pageName: string, pageCategory?: string) {
  useEffect(() => {
    trackEvent.pageView(pageName, pageCategory);
  }, [pageName, pageCategory]);
}
