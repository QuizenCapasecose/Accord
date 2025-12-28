# ACCORD System - Professional Architecture Restructure Roadmap

## 🎯 Target Structure

```
/src
  /components
    /accord          ← ACCORD Main App & Workflow Stages
    /marketing       ← Sales, SEO, Content Marketing Pages
    /quaizen         ← Compliance Engines, Validators, Tools
    /shared          ← Reusable UI Components
    /templates       ← Document Templates (30+ forms)
    /ui              ← Shadcn Base Components
  /context
    ProjectContext.tsx  ✅ DONE
  /services
    api-service.ts
    api-types.ts
  /styles
    index.css
    theme.css
    tailwind.css
  App.tsx           ✅ DONE (wrapped with ProjectProvider)
  main.tsx
```

---

## 📦 File Migration Plan

### 1️⃣ **ACCORD Workflow** → `/components/accord/`

**Core Application:**
- ✅ `ACCORDMainApp.tsx` (DONE - created in new location)
- `ACCORDDashboard.tsx` (move from /quaizen/accord/)
- `ProjectSetup.tsx` (move from /quaizen/accord/)

**Workflow Stages:**
- `Stage1PreLodgement.tsx` (move from /quaizen/accord/)
- `Stage2ApplicationAssembly.tsx` (move from /quaizen/accord/)
- `Stage3Assessment.tsx` (move from /quaizen/accord/)
- `Stage4Determination.tsx` (move from /quaizen/accord/)
- `Stage5Kaizen.tsx` (move from /quaizen/accord/)

**Import Updates:**
```typescript
// OLD:
import { ACCORDDashboard } from './accord/ACCORDDashboard';

// NEW:
import { ACCORDDashboard } from '../accord/ACCORDDashboard';
```

---

### 2️⃣ **Marketing & Sales** → `/components/marketing/`

**Sales Hub:**
- `SalesMarketingHubPage.tsx` (move from /quaizen/)
- `ContentCalendarDashboard.tsx` (move from /quaizen/)
- `GoogleSearchConsoleDashboard.tsx` (move from /quaizen/)
- `SEOImplementationChecklist.tsx` (move from /quaizen/)

**SEO Pillar Pages:**
- `AvoidDADelaysPage.tsx` (move from /quaizen/)
- `BASIXResidentialPage.tsx` (move from /quaizen/)
- `DADelaysPillarPage.tsx` (move from /quaizen/)
- `NSWDAAssessmentPage.tsx` (move from /quaizen/)
- `RFIConstructionPage.tsx` (move from /quaizen/)

**Showcase Pages (Component Demos):**
- `SEOContentHubShowcase.tsx` (move from /quaizen/)
- `SolutionPageShowcase.tsx` (move from /quaizen/)
- `AuthorityLinkShowcase.tsx` (move from /quaizen/)
- `TopicClusterShowcase.tsx` (move from /quaizen/)

---

### 3️⃣ **Compliance & Validation** → `/components/quaizen/` (KEEP HERE)

**Core Workflow Pages:**
- `HomePage.tsx`
- `ProjectsPage.tsx`
- `ProcessPage.tsx`
- `StagesPage.tsx`
- `CompliancePage.tsx`
- `FeedbackPage.tsx`
- `WorkflowsPage.tsx`

**Compliance Tools:**
- `CompleteDemoProject.tsx`
- `ControlsMatrix.tsx`
- `AssessmentClockVisualizer.tsx`
- `LegislativeReferenceLibrary.tsx`
- `ModificationPathwaySelector.tsx`

**Validation & Quality:**
- `ValidationDashboard.tsx`
- `DocumentVerificationDashboard.tsx`
- `DocumentVerificationFlowchart.tsx`
- `QualityGateApprovalSystem.tsx`
- `QualityUXPage.tsx`
- `StatusMonitoring.tsx`

**Document Management:**
- `DocumentLibraryPage.tsx`
- `DocumentLibrary.tsx`
- `DocumentVerification.tsx`

**RFI Management:**
- `RFIManagementDashboard.tsx`

**Wizards & Guides:**
- `ProjectSetupWizard.tsx`
- `PreLodgementGateway.tsx`
- `PreLodgementGuide.tsx`
- `PreLodgementChecklist.tsx`
- `PreLodgementValidation.tsx`
- `LodgementGuide.tsx`
- `LodgementChecklist.tsx`

**Specialized Tools:**
- `AIIntegrationDashboard.tsx`
- `AIAnalysisSuitePage.tsx`
- `EnhancedSpatialViewer.tsx`
- `PerformanceBenchmarkingDashboard.tsx`
- `EducationalResourcesModule.tsx`
- `IntegrationConnectionPage.tsx`
- `AccordArchitecturePage.tsx`

**Workflows:**
- `APIWorkflowDemo.tsx`
- `NSWPortalSubmission.tsx`
- `NSWPortalPrePopulation.tsx`
- `SiteDataCollection.tsx`
- `FeasibilityDetermination.tsx`
- `RiskIdentification.tsx`
- `AutomatedZoningAnalysis.tsx`

**Assessment & Reporting:**
- `AssessmentTimeline.tsx`
- `ProjectDashboard.tsx`
- `ProjectReports.tsx`

**Menus:**
- `FeaturesMenu.tsx`
- `SpecializedToolsMenu.tsx`

**Other Layouts:**
- `FullApplicationLayout.tsx`
- `StageGateNavigationDashboard.tsx`
- `StagesPage.tsx`
- `StageDetailPage.tsx`

---

### 4️⃣ **Shared Components** → `/components/shared/` (✅ ALREADY ORGANIZED)

**Already in correct location:**
- `InfoPanel.tsx`
- `MetricCard.tsx`
- `ComplianceRule.tsx`
- `GlossaryDrawer.tsx`
- `DataTable.tsx`
- `WorkflowStage.tsx`
- `TopicCluster.tsx`
- `AuthorityLink.tsx`
- `SolutionPage.tsx`
- `SEOContentHub.tsx`
- `ValueProposition.tsx`
- `PerformanceMonitor.tsx`

**Showcase Pages to Move HERE:**
Create `/components/shared/showcases/` subfolder:
- `InfoPanelShowcase.tsx` (move from /quaizen/)
- `MetricCardShowcase.tsx` (move from /quaizen/)
- `ComplianceRuleShowcase.tsx` (move from /quaizen/)
- `GlossaryDrawerShowcase.tsx` (move from /quaizen/)
- `DataTableShowcase.tsx` (move from /quaizen/)
- `WorkflowStageShowcase.tsx` (move from /quaizen/)

---

### 5️⃣ **Document Templates** → `/components/templates/` (✅ ALREADY ORGANIZED)

**Already in correct location (25 templates):**
- `AcousticAssessment.tsx`
- `ArboristReport.tsx`
- `ArchitecturalElevations.tsx`
- `ArchitecturalFloorPlan.tsx`
- `ArchitecturalSections.tsx`
- `ArchitecturalSitePlan.tsx`
- `BasixCertificate.tsx`
- `ConstructionCertificate.tsx`
- `DAApplicationForm.tsx`
- `ErosionSedimentControlPlan.tsx`
- `GeotechnicalReport.tsx`
- `HeritageImpactStatement.tsx`
- `HoardingSiteFencingPlan.tsx`
- `LandscapePlan.tsx`
- `LongServiceLevyForm.tsx`
- `MaterialsFinishesSchedule.tsx`
- `NoticeOfDetermination.tsx`
- `OwnerConsentForm.tsx`
- `Section88B.tsx`
- `ShadowDiagrams.tsx`
- `StatementEnvironmentalEffects.tsx`
- `StormwaterPlan.tsx`
- `SurveyPlan.tsx`
- `TrafficAssessment.tsx`
- `WasteManagementPlan.tsx`

**Templates Still in Wrong Location (move TO /templates/):**
From `/components/quaizen/`:
- `ArchitecturalElevations.tsx` (duplicate?)
- `ArchitecturalFloorPlan.tsx` (duplicate?)
- `ArchitecturalShadowDiagrams.tsx`
- `ArchitecturalSitePlan.tsx` (duplicate?)
- `BASIXCertificate.tsx` (duplicate?)
- `DAApplicationForm.tsx` (duplicate?)
- `DevelopmentConsent.tsx`
- `LandscapePlan.tsx` (duplicate?)
- `MaterialsFinishesSchedule.tsx` (duplicate?)
- `OwnerConsentForm.tsx` (duplicate?)
- `StatementEnvironmentalEffects.tsx` (duplicate?)
- `SurveyPlanRequirements.tsx`
- `WasteManagementPlan.tsx` (duplicate?)

---

### 6️⃣ **UI Components** → `/components/ui/` (✅ ALREADY PERFECT)

**Shadcn Components (56 files) - No changes needed:**
All base UI components are correctly organized.

---

## 🔧 Required Import Updates

### **QuaizenDeseco.tsx** (Main Router)

```typescript
// ACCORD imports
import { ACCORDMainApp } from '../accord/ACCORDMainApp';

// Marketing imports
import { SalesMarketingHubPage } from '../marketing/SalesMarketingHubPage';
import { ContentCalendarDashboard } from '../marketing/ContentCalendarDashboard';
import { GoogleSearchConsoleDashboard } from '../marketing/GoogleSearchConsoleDashboard';
import { SEOImplementationChecklist } from '../marketing/SEOImplementationChecklist';
import { AvoidDADelaysPage } from '../marketing/AvoidDADelaysPage';
// ... etc

// Quaizen (Compliance) imports - NO CHANGE
import { HomePage } from './quaizen/HomePage';
import { ProjectsPage } from './quaizen/ProjectsPage';
// ... etc

// Shared component showcases
import { InfoPanelShowcase } from '../shared/showcases/InfoPanelShowcase';
import { MetricCardShowcase } from '../shared/showcases/MetricCardShowcase';
// ... etc
```

### **ProjectsPage.tsx**

```typescript
// OLD:
import { CompleteDemoProject } from './CompleteDemoProject';

// NEW:
import { CompleteDemoProject } from './CompleteDemoProject'; // stays in quaizen
```

---

## 🎯 Priority Order

### **Phase 1: ACCORD (Critical)** ✅ IN PROGRESS
1. ✅ Created `/components/accord/ACCORDMainApp.tsx`
2. Move ACCORD stage files from `/quaizen/accord/` → `/components/accord/`
3. Update all ACCORD imports in `QuaizenDeseco.tsx`

### **Phase 2: Marketing (High)**
1. Create `/components/marketing/` folder
2. Move all sales/SEO pages
3. Update imports

### **Phase 3: Showcases (Medium)**
1. Create `/components/shared/showcases/` folder
2. Move all showcase components
3. Update imports

### **Phase 4: Templates Cleanup (Low)**
1. Remove duplicate templates from `/quaizen/`
2. Consolidate everything in `/templates/`

### **Phase 5: Testing**
1. Verify all pages load
2. Check all navigation works
3. Test ProjectContext integration
4. Verify imports are correct

---

## 📝 Notes

- **Context**: ✅ Already moved to `/context/ProjectContext.tsx`
- **App.tsx**: ✅ Already wrapped with `<ProjectProvider>`
- **Services**: Still need to be created (`/services/api-service.ts`)
- **Styles**: Already properly organized

---

## 🚀 Next Steps

1. Complete ACCORD folder migration
2. Create marketing folder and migrate sales pages
3. Update all import statements in router
4. Test entire application flow
5. Document final architecture

---

**Status**: 🟡 IN PROGRESS (Phase 1: ACCORD - 15% Complete)
**Last Updated**: December 28, 2024
