import { useEffect } from 'react';

export function SEOMetadata() {
  useEffect(() => {
    // Create or update JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "MetroBuild Group - AI powered Construction SaaS",
      "url": "https://metrobuild-da-app.com",
      "description": "Comprehensive NSW Development Application management system for builders. Eliminates costly delays through Kaizen-based compliance checklists, BASIX integration, Cumberland Council alignment.",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "[pricing]",
        "priceCurrency": "AUD",
        "url": "https://metrobuild-da-app.com/pricing"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "127"
      },
      "softwareVersion": "2.1",
      "featureList": [
        "LEP/DCP compliance checking",
        "BASIX certificate integration",
        "Site inspection planning",
        "Council request management",
        "Post-consent certification workflow",
        "RFI tracking and analytics",
        "NSW Planning Portal integration",
        "Cumberland Council LEP 2021 compliance",
        "Cumberland Council DCP 2021 compliance",
        "Automated zoning analysis",
        "Document version management",
        "Quality management system (ISO 9001)",
        "Kaizen continuous improvement",
        "5-stage DA workflow tracker",
        "Real-time compliance scoring"
      ],
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "softwareHelp": {
        "@type": "CreativeWork",
        "url": "https://metrobuild-da-app.com/help"
      },
      "applicationSubCategory": "Construction Management, Planning & Compliance Software",
      "screenshot": "https://metrobuild-da-app.com/screenshots/dashboard.png",
      "provider": {
        "@type": "Organization",
        "name": "MetroBuild Group",
        "url": "https://metrobuild.com.au"
      }
    };

    // Check if script already exists
    let script = document.querySelector('script[type="application/ld+json"][data-seo="metrobuild"]');
    
    if (!script) {
      // Create new script element
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'metrobuild');
      document.head.appendChild(script);
    }

    // Set content
    script.textContent = JSON.stringify(structuredData, null, 2);

    // Add FAQ Schema
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the fastest way to prepare a Development Application for Cumberland Council?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Metrobuild DA Compliance Manager reduces typical DA preparation time by 40% through automated LEP/DCP compliance checks, integrated BASIX certificates, and pre-lodgement feasibility assessments. The system guides builders through all Cumberland Council checklist requirements in a single dashboard."
          }
        },
        {
          "@type": "Question",
          "name": "How do I avoid Council RFIs and costly delays on my Development Application?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Incomplete documentation is the #1 cause of RFIs. The Metrobuild system eliminates this with:\n• Automated compliance gap analysis\n• Pre-lodgement consultation with council checklist items\n• BASIX certificate validation\n• Document completeness verification before submission\nBuilders using the system report 85% fewer RFIs."
          }
        },
        {
          "@type": "Question",
          "name": "What documents must be included in a NSW Development Application lodgement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Per NSW Planning Portal and Cumberland Council requirements:\n1. DA Application Form (owner's consent, land title, estimated cost)\n2. Statement of Environmental Effects (SEE)\n3. Scaled architectural plans (floorplans, elevations, site layout)\n4. Survey plan (registered surveyor, boundaries, contours)\n5. BASIX Certificate (mandatory for residential)\n6. Waste Management Plan\n7. Stormwater/WSUD reports\n8. Specialized reports (arborist, heritage, acoustic, geotechnical, traffic, contamination—as applicable)\nThe Metrobuild system includes templates and checklists for each."
          }
        },
        {
          "@type": "Question",
          "name": "How is a Development Application assessed by Council?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "NSW council DA assessment follows a 5-stage process:\n1. Pre-lodgement Feasibility: LEP/DCP/SEPP compliance check\n2. Lodgement: NSW Planning Portal submission and council completeness review\n3. Assessment: Council evaluation against planning controls (statutory period ≤40 days for simple DAs)\n4. Determination: Approval or refusal with conditions\n5. Post-Consent: Construction Certificate, building, and Occupation Certificate\nThe Metrobuild system maps your DA through all 5 stages with checklist completion tracking."
          }
        },
        {
          "@type": "Question",
          "name": "Does the system integrate with the NSW Planning Portal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the Metrobuild DA Compliance Manager is designed to streamline NSW Planning Portal submissions. The system pre-populates portal fields, validates file naming conventions, checks document completeness, and ensures compliance with portal requirements before lodgement to prevent Return to Applicant (RTA) rejections."
          }
        },
        {
          "@type": "Question",
          "name": "What is Cumberland Council LEP 2021 and DCP 2021 compliance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cumberland Local Environmental Plan (LEP) 2021 sets statutory planning controls for zoning, building heights, floor space ratios, and development standards. Cumberland Development Control Plan (DCP) 2021 provides detailed design guidelines for setbacks, landscaping, parking, and building design. The Metrobuild system automatically checks your DA against all relevant LEP and DCP controls with real-time compliance scoring."
          }
        },
        {
          "@type": "Question",
          "name": "How does the BASIX certificate integration work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BASIX (Building Sustainability Index) certificates are mandatory for NSW residential development. The Metrobuild system validates BASIX certificate numbers, checks expiry dates (valid for 2 years), verifies target compliance, and ensures architectural plans align with BASIX commitments. Invalid or expired certificates are flagged before lodgement."
          }
        },
        {
          "@type": "Question",
          "name": "Can I track multiple Development Applications simultaneously?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the Metrobuild project dashboard supports unlimited concurrent DAs. Each project has independent tracking for stage progress, document status, RFI management, compliance scoring, and conditions of consent. The KPI dashboard provides portfolio-wide metrics including approval rates, average assessment times, and RFI frequency."
          }
        }
      ]
    };

    // Check if FAQ script already exists
    let faqScript = document.querySelector('script[type="application/ld+json"][data-seo="metrobuild-faq"]');
    
    if (!faqScript) {
      // Create new FAQ script element
      faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.setAttribute('data-seo', 'metrobuild-faq');
      document.head.appendChild(faqScript);
    }

    // Set FAQ content
    faqScript.textContent = JSON.stringify(faqStructuredData, null, 2);

    // Add HowTo Schema
    const howToStructuredData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Lodge a Development Application with First-Time Approval for NSW Council",
      "description": "5-step process using Metrobuild DA Manager to achieve council approval without costly delays, RFIs, or amendments.",
      "totalTime": "PT40D",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "AUD",
        "value": "Variable based on project scope"
      },
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Metrobuild DA Compliance Manager"
        },
        {
          "@type": "HowToTool",
          "name": "NSW Planning Portal Account"
        }
      ],
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "BASIX Certificate"
        },
        {
          "@type": "HowToSupply",
          "name": "Architectural Plans"
        },
        {
          "@type": "HowToSupply",
          "name": "Survey Plan"
        },
        {
          "@type": "HowToSupply",
          "name": "Statement of Environmental Effects"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Pre-Lodgement Feasibility Assessment",
          "text": "Use the app to check zoning, LEP controls, DCP requirements, and SEPP. Identify compliance gaps and consult with town planner on high-risk items. The system auto-flags non-compliant elements and suggests remediation.",
          "url": "https://metrobuild-da-app.com/stages/stage-1",
          "image": "https://metrobuild-da-app.com/images/step1-feasibility.png"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Prepare Complete Documentation",
          "text": "Use Metrobuild templates for DA form, SEE, plans, BASIX, and specialized reports. The system verifies each document against council checklists before you generate the submission package.",
          "url": "https://metrobuild-da-app.com/stages/stage-1/checklist",
          "image": "https://metrobuild-da-app.com/images/step2-docs.png"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Lodge via NSW Planning Portal",
          "text": "Submit your complete DA to the NSW Planning Portal. Metrobuild tracks lodgement confirmation and feeds updates back into the app for ongoing assessment monitoring.",
          "url": "https://metrobuild-da-app.com/stages/stage-2",
          "image": "https://metrobuild-da-app.com/images/step3-lodge.png"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Manage Council Assessment & RFIs",
          "text": "Council will assess your DA (typically 40 days for simple proposals). If council issues RFIs, the Metrobuild system logs them, tracks deadlines, and records your response in a centralized audit trail.",
          "url": "https://metrobuild-da-app.com/stages/stage-3",
          "image": "https://metrobuild-da-app.com/images/step4-assessment.png"
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Obtain Approval & Move to Construction Certificate",
          "text": "Upon approval, the system transfers consent conditions to your CC workflow. The BASIX compliance checklist and DA conditions flow automatically to the principal certifier and builder.",
          "url": "https://metrobuild-da-app.com/stages/stage-5",
          "image": "https://metrobuild-da-app.com/images/step5-cc.png"
        }
      ]
    };

    // Check if HowTo script already exists
    let howToScript = document.querySelector('script[type="application/ld+json"][data-seo="metrobuild-howto"]');
    
    if (!howToScript) {
      // Create new HowTo script element
      howToScript = document.createElement('script');
      howToScript.type = 'application/ld+json';
      howToScript.setAttribute('data-seo', 'metrobuild-howto');
      document.head.appendChild(howToScript);
    }

    // Set HowTo content
    howToScript.textContent = JSON.stringify(howToStructuredData, null, 2);

    // Update meta tags
    updateMetaTag('description', 'Comprehensive Quality Management System (QMS) for NSW Development Applications. Eliminate costly delays and RFIs with AI-powered compliance checking, Cumberland Council LEP/DCP integration, and ISO 9001 stage-gate methodology.');
    updateMetaTag('keywords', 'development application, NSW planning, Cumberland Council, BASIX, construction management, compliance software, DA tracker, RFI management, ISO 9001, quality management');
    
    // Open Graph tags
    updateMetaProperty('og:title', 'MetroBuild Group - AI powered Construction SaaS');
    updateMetaProperty('og:description', 'Comprehensive NSW DA management system eliminating costly delays through Kaizen-based compliance and Cumberland Council alignment.');
    updateMetaProperty('og:type', 'website');
    updateMetaProperty('og:url', 'https://metrobuild-da-app.com');
    updateMetaProperty('og:site_name', 'MetroBuild DA Compliance Manager');
    
    // Twitter Card tags
    updateMetaProperty('twitter:card', 'summary_large_image');
    updateMetaProperty('twitter:title', 'MetroBuild Group - AI powered Construction SaaS');
    updateMetaProperty('twitter:description', 'Comprehensive NSW DA management system eliminating costly delays');

    // Set document title
    document.title = 'MetroBuild Group - AI powered Construction SaaS | NSW DA Compliance Manager';

    // Cleanup function
    return () => {
      // Optional: Remove script on unmount if needed
      // script?.remove();
    };
  }, []);

  // Helper function to update or create meta tags
  const updateMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // Helper function to update or create meta property tags
  const updateMetaProperty = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // This component doesn't render anything
  return null;
}