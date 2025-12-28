import { useState } from 'react';
import { HomePage } from './quaizen/HomePage';
import { ProjectsPage } from './quaizen/ProjectsPage';
import { ProcessPage } from './quaizen/ProcessPage';
import { StagesPage } from './quaizen/StagesPage';
import { DocumentLibraryPage } from './quaizen/DocumentLibraryPage';
import { QualityUXPage } from './quaizen/QualityUXPage';
import { CompliancePage } from './quaizen/CompliancePage';
import { FeedbackPage } from './quaizen/FeedbackPage';
import { ValidationDashboard } from './quaizen/ValidationDashboard';
import { DocumentVerificationFlowchart } from './quaizen/DocumentVerificationFlowchart';
import { DocumentVerificationDashboard } from './quaizen/DocumentVerificationDashboard';
import { QualityGateApprovalSystem } from './quaizen/QualityGateApprovalSystem';
import { StatusMonitoring } from './quaizen/StatusMonitoring';
import { APIWorkflowDemo } from './quaizen/APIWorkflowDemo';
import { ProjectSetupWizard } from './quaizen/ProjectSetupWizard';
import { ControlsMatrix } from './quaizen/ControlsMatrix';
import { AssessmentClockVisualizer } from './quaizen/AssessmentClockVisualizer';
import { ModificationPathwaySelector } from './quaizen/ModificationPathwaySelector';
import { LegislativeReferenceLibrary } from './quaizen/LegislativeReferenceLibrary';
import { AIIntegrationDashboard } from './quaizen/AIIntegrationDashboard';
import { EnhancedSpatialViewer } from './quaizen/EnhancedSpatialViewer';
import { PerformanceBenchmarkingDashboard } from './quaizen/PerformanceBenchmarkingDashboard';
import { EducationalResourcesModule } from './quaizen/EducationalResourcesModule';
import { RFIManagementDashboard } from './quaizen/RFIManagementDashboard';
import { BASIXCertificate } from './quaizen/BASIXCertificate';
import { InfoPanelShowcase } from './quaizen/InfoPanelShowcase';
import { MetricCardShowcase } from './quaizen/MetricCardShowcase';
import { ComplianceRuleShowcase } from './quaizen/ComplianceRuleShowcase';
import { GlossaryDrawerShowcase } from './quaizen/GlossaryDrawerShowcase';
import { DataTableShowcase } from './quaizen/DataTableShowcase';
import { WorkflowStageShowcase } from './quaizen/WorkflowStageShowcase';
import { TopicClusterShowcase } from './quaizen/TopicClusterShowcase';
import { AuthorityLinkShowcase } from './quaizen/AuthorityLinkShowcase';
import { SolutionPageShowcase } from './quaizen/SolutionPageShowcase';
import { SEOContentHubShowcase } from './quaizen/SEOContentHubShowcase';
import { ContentCalendarDashboard } from './quaizen/ContentCalendarDashboard';
import { GoogleSearchConsoleDashboard } from './quaizen/GoogleSearchConsoleDashboard';
import { SEOImplementationChecklist } from './quaizen/SEOImplementationChecklist';
import { StageGateNavigationDashboard } from './quaizen/StageGateNavigationDashboard';
import { FullApplicationLayout } from './quaizen/FullApplicationLayout';
import { PreLodgementGateway } from './quaizen/PreLodgementGateway';
import { ACCORDMainApp } from './quaizen/ACCORDMainApp';
import { WorkflowsPage } from './quaizen/WorkflowsPage';
import { AIAnalysisSuitePage } from './quaizen/AIAnalysisSuitePage';
import { SalesMarketingHubPage } from './quaizen/SalesMarketingHubPage';
import { IntegrationConnectionPage } from './quaizen/IntegrationConnectionPage';
import { AccordArchitecturePage } from './quaizen/AccordArchitecturePage';
import { GitHubIssueTracker } from './github/GitHubIssueTracker';

type Page = 'home' | 'projects' | 'process' | 'stages' | 'documents' | 'quality' | 'compliance' | 'feedback' | 'validation' | 'verification-flowchart' | 'verification-dashboard' | 'quality-gates' | 'status-monitoring' | 'api-demo' | 'project-setup-wizard' | 'controls-matrix' | 'assessment-clock' | 'modification-selector' | 'legislative-library' | 'ai-dashboard' | 'spatial-viewer' | 'performance-dashboard' | 'educational-resources' | 'rfi-dashboard' | 'basix-certificate' | 'info-panel-showcase' | 'metric-card-showcase' | 'compliance-rule-showcase' | 'glossary-drawer-showcase' | 'data-table-showcase' | 'workflow-stage-showcase' | 'topic-cluster-showcase' | 'authority-link-showcase' | 'solution-page-showcase' | 'seo-content-hub-showcase' | 'content-calendar' | 'google-search-console' | 'seo-checklist' | 'stage-gate-navigation' | 'full-app-layout' | 'pre-lodgement-gateway' | 'accord-main' | 'accord-main-demo' | 'workflows' | 'ai-analysis-suite' | 'sales-marketing' | 'integration-connection' | 'accord-architecture' | 'github-tracker';

export function QuaizenDeseco() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* HOME PAGE */}
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      
      {/* ACCORD MAIN APP - Direct Navigation */}
      {currentPage === 'accord-main' && (
        <ACCORDMainApp onBack={() => setCurrentPage('home')} returnToPage="home" initialView="dashboard" />
      )}
      
      {/* ACCORD MAIN APP - 6 Menu Items with Smart Demo Loading */}
      {/* HomePage calls handleMenuClick which auto-loads demo if needed */}
      
      {/* MENU ITEM 1: PROJECTS - Project Metadata & Dashboard */}
      {currentPage === 'projects' && (
        <ACCORDMainApp onBack={() => setCurrentPage('home')} returnToPage="home" initialView="projects" />
      )}
      
      {/* MENU ITEM 2: WORKFLOWS - 5-Stage Process Tracker */}
      {currentPage === 'workflows' && (
        <ACCORDMainApp onBack={() => setCurrentPage('home')} returnToPage="home" initialView="workflows" />
      )}
      
      {/* MENU ITEM 3: DOCUMENTS - Document Registry */}
      {currentPage === 'documents' && (
        <ACCORDMainApp onBack={() => setCurrentPage('home')} returnToPage="home" initialView="documents" />
      )}
      
      {/* MENU ITEM 4: COMPLIANCE - LEP/DCP Checking */}
      {currentPage === 'compliance' && (
        <ACCORDMainApp onBack={() => setCurrentPage('home')} returnToPage="home" initialView="compliance" />
      )}
      
      {/* MENU ITEM 5: QUALITY - ISO 9001 Quality Gates */}
      {currentPage === 'quality' && (
        <ACCORDMainApp onBack={() => setCurrentPage('home')} returnToPage="home" initialView="quality" />
      )}
      
      {/* MENU ITEM 6: FEEDBACK - Kaizen Feedback Loop */}
      {currentPage === 'feedback' && (
        <ACCORDMainApp onBack={() => setCurrentPage('home')} returnToPage="home" initialView="feedback" />
      )}
      
      {/* Legacy Demo Route */}
      {currentPage === 'accord-main-demo' && (
        <ACCORDMainApp onBack={() => setCurrentPage('home')} returnToPage="home" initialView="dashboard" />
      )}
      
      {/* STANDALONE PAGES (Legacy/Reference) */}
      {currentPage === 'process' && <ProcessPage onNavigate={setCurrentPage} />}
      {currentPage === 'stages' && <StagesPage onNavigate={setCurrentPage} />}
      {currentPage === 'validation' && <ValidationDashboard onNavigate={setCurrentPage} />}
      
      {/* VERIFICATION & QUALITY TOOLS */}
      {currentPage === 'verification-flowchart' && <DocumentVerificationFlowchart onBack={() => setCurrentPage('home')} />}
      {currentPage === 'verification-dashboard' && <DocumentVerificationDashboard onBack={() => setCurrentPage('home')} />}
      {currentPage === 'quality-gates' && <QualityGateApprovalSystem onBack={() => setCurrentPage('home')} />}
      {currentPage === 'status-monitoring' && <StatusMonitoring onBack={() => setCurrentPage('home')} />}
      
      {/* PROJECT TOOLS */}
      {currentPage === 'api-demo' && <APIWorkflowDemo onBack={() => setCurrentPage('home')} />}
      {currentPage === 'project-setup-wizard' && <ProjectSetupWizard onBack={() => setCurrentPage('home')} onComplete={() => setCurrentPage('home')} />}
      {currentPage === 'controls-matrix' && <ControlsMatrix onBack={() => setCurrentPage('home')} />}
      {currentPage === 'assessment-clock' && <AssessmentClockVisualizer onBack={() => setCurrentPage('home')} />}
      {currentPage === 'modification-selector' && <ModificationPathwaySelector onBack={() => setCurrentPage('home')} />}
      {currentPage === 'legislative-library' && <LegislativeReferenceLibrary onBack={() => setCurrentPage('home')} />}
      
      {/* AI & ANALYTICS */}
      {currentPage === 'ai-dashboard' && <AIIntegrationDashboard onBack={() => setCurrentPage('home')} />}
      {currentPage === 'ai-analysis-suite' && (
        <AIAnalysisSuitePage onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />
      )}
      
      {/* SPATIAL & PERFORMANCE */}
      {currentPage === 'spatial-viewer' && <EnhancedSpatialViewer onBack={() => setCurrentPage('home')} />}
      {currentPage === 'performance-dashboard' && <PerformanceBenchmarkingDashboard onBack={() => setCurrentPage('home')} />}
      
      {/* RESOURCES */}
      {currentPage === 'educational-resources' && <EducationalResourcesModule onBack={() => setCurrentPage('home')} />}
      {currentPage === 'rfi-dashboard' && <RFIManagementDashboard onBack={() => setCurrentPage('feedback')} />}
      {currentPage === 'basix-certificate' && <BASIXCertificate onBack={() => setCurrentPage('home')} />}
      
      {/* SHOWCASES */}
      {currentPage === 'info-panel-showcase' && <InfoPanelShowcase onBack={() => setCurrentPage('home')} />}
      {currentPage === 'metric-card-showcase' && <MetricCardShowcase onBack={() => setCurrentPage('home')} />}
      {currentPage === 'compliance-rule-showcase' && <ComplianceRuleShowcase onBack={() => setCurrentPage('home')} />}
      {currentPage === 'glossary-drawer-showcase' && <GlossaryDrawerShowcase onBack={() => setCurrentPage('home')} />}
      {currentPage === 'data-table-showcase' && <DataTableShowcase onBack={() => setCurrentPage('home')} />}
      {currentPage === 'workflow-stage-showcase' && <WorkflowStageShowcase onBack={() => setCurrentPage('home')} />}
      {currentPage === 'topic-cluster-showcase' && <TopicClusterShowcase onBack={() => setCurrentPage('home')} />}
      {currentPage === 'authority-link-showcase' && <AuthorityLinkShowcase onBack={() => setCurrentPage('home')} />}
      {currentPage === 'solution-page-showcase' && <SolutionPageShowcase onBack={() => setCurrentPage('home')} />}
      {currentPage === 'seo-content-hub-showcase' && <SEOContentHubShowcase onBack={() => setCurrentPage('home')} />}
      
      {/* MARKETING & SEO */}
      {currentPage === 'sales-marketing' && (
        <SalesMarketingHubPage onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />
      )}
      {currentPage === 'content-calendar' && (
        <ContentCalendarDashboard onBack={() => setCurrentPage('sales-marketing')} />
      )}
      {currentPage === 'google-search-console' && (
        <GoogleSearchConsoleDashboard onBack={() => setCurrentPage('sales-marketing')} />
      )}
      {currentPage === 'seo-checklist' && (
        <SEOImplementationChecklist onBack={() => setCurrentPage('sales-marketing')} />
      )}
      
      {/* NAVIGATION & LAYOUT */}
      {currentPage === 'stage-gate-navigation' && (
        <StageGateNavigationDashboard onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'full-app-layout' && (
        <FullApplicationLayout onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'pre-lodgement-gateway' && (
        <PreLodgementGateway onBack={() => setCurrentPage('home')} />
      )}
      
      {/* INTEGRATIONS */}
      {currentPage === 'integration-connection' && (
        <IntegrationConnectionPage 
          onBack={() => setCurrentPage('home')}
          onNavigate={setCurrentPage}
        />
      )}
      
      {/* ARCHITECTURE & SYSTEM */}
      {currentPage === 'accord-architecture' && (
        <AccordArchitecturePage onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />
      )}
      
      {/* DEVELOPMENT TOOLS */}
      {currentPage === 'github-tracker' && (
        <GitHubIssueTracker onBack={() => setCurrentPage('home')} />
      )}
    </div>
  );
}