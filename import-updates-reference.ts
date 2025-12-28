/**
 * IMPORT PATH UPDATE REFERENCE
 * Use this file to update all import statements after restructuring
 */

// ============================================
// FILE: src/app/components/QuaizenDeseco.tsx
// ============================================

// === BEFORE ===
import { ACCORDMainApp } from './quaizen/ACCORDMainApp';
import { SalesMarketingHubPage } from './quaizen/SalesMarketingHubPage';
import { ContentCalendarDashboard } from './quaizen/ContentCalendarDashboard';
import { GoogleSearchConsoleDashboard } from './quaizen/GoogleSearchConsoleDashboard';
import { SEOImplementationChecklist } from './quaizen/SEOImplementationChecklist';
import { SEOContentHubShowcase } from './quaizen/SEOContentHubShowcase';
import { SolutionPageShowcase } from './quaizen/SolutionPageShowcase';
import { AuthorityLinkShowcase } from './quaizen/AuthorityLinkShowcase';
import { TopicClusterShowcase } from './quaizen/TopicClusterShowcase';
import { InfoPanelShowcase } from './quaizen/InfoPanelShowcase';
import { MetricCardShowcase } from './quaizen/MetricCardShowcase';
import { ComplianceRuleShowcase } from './quaizen/ComplianceRuleShowcase';
import { GlossaryDrawerShowcase } from './quaizen/GlossaryDrawerShowcase';
import { DataTableShowcase } from './quaizen/DataTableShowcase';
import { WorkflowStageShowcase } from './quaizen/WorkflowStageShowcase';

// === AFTER ===
import { ACCORDMainApp } from '../../accord/ACCORDMainApp';
import { SalesMarketingHubPage } from '../../marketing/SalesMarketingHubPage';
import { ContentCalendarDashboard } from '../../marketing/ContentCalendarDashboard';
import { GoogleSearchConsoleDashboard } from '../../marketing/GoogleSearchConsoleDashboard';
import { SEOImplementationChecklist } from '../../marketing/SEOImplementationChecklist';
import { SEOContentHubShowcase } from '../../marketing/SEOContentHubShowcase';
import { SolutionPageShowcase } from '../../marketing/SolutionPageShowcase';
import { AuthorityLinkShowcase } from '../../marketing/AuthorityLinkShowcase';
import { TopicClusterShowcase } from '../../marketing/TopicClusterShowcase';
import { InfoPanelShowcase } from '../../shared/showcases/InfoPanelShowcase';
import { MetricCardShowcase } from '../../shared/showcases/MetricCardShowcase';
import { ComplianceRuleShowcase } from '../../shared/showcases/ComplianceRuleShowcase';
import { GlossaryDrawerShowcase } from '../../shared/showcases/GlossaryDrawerShowcase';
import { DataTableShowcase } from '../../shared/showcases/DataTableShowcase';
import { WorkflowStageShowcase } from '../../shared/showcases/WorkflowStageShowcase';

// ============================================
// FILE: src/components/accord/ACCORDMainApp.tsx
// ============================================

// === BEFORE ===
import { useProject } from '../../context/ProjectContext';
import { ACCORDDashboard } from './accord/ACCORDDashboard';
import { Stage1PreLodgement } from './accord/Stage1PreLodgement';
// ... etc

// === AFTER ===
import { useProject } from '../../../context/ProjectContext';
import { ACCORDDashboard } from './ACCORDDashboard';
import { Stage1PreLodgement } from './Stage1PreLodgement';
import { Stage2ApplicationAssembly } from './Stage2ApplicationAssembly';
import { Stage3Assessment } from './Stage3Assessment';
import { Stage4Determination } from './Stage4Determination';
import { Stage5Kaizen } from './Stage5Kaizen';
import { ProjectSetup } from './ProjectSetup';

// ============================================
// FILE: src/components/accord/ACCORDDashboard.tsx
// FILE: src/components/accord/Stage1PreLodgement.tsx
// FILE: src/components/accord/Stage2ApplicationAssembly.tsx
// FILE: src/components/accord/Stage3Assessment.tsx
// FILE: src/components/accord/Stage4Determination.tsx
// FILE: src/components/accord/Stage5Kaizen.tsx
// FILE: src/components/accord/ProjectSetup.tsx
// ============================================

// No changes needed if they only import from:
// - lucide-react
// - figma:asset/...
// - shared components (which stay in same relative location)

// If they import ProjectContext:
// === BEFORE ===
import { useProject } from '../../../context/ProjectContext';

// === AFTER ===
import { useProject } from '../../../context/ProjectContext'; // SAME

// ============================================
// FILE: src/app/App.tsx
// ============================================

// === BEFORE ===
import { ProjectProvider } from './context/ProjectContext';

// === AFTER ===
import { ProjectProvider } from '../context/ProjectContext';

// ============================================
// FILE: src/app/components/quaizen/ProjectsPage.tsx
// ============================================

// === BEFORE ===
import { useProject } from '../../context/ProjectContext';

// === AFTER ===
import { useProject } from '../../../context/ProjectContext';

// ============================================
// FIND & REPLACE PATTERNS
// ============================================

/**
 * Use these find-replace patterns in your IDE:
 * 
 * 1. Update ACCORD imports in QuaizenDeseco.tsx:
 *    FIND: from './quaizen/ACCORDMainApp'
 *    REPLACE: from '../../accord/ACCORDMainApp'
 * 
 * 2. Update Marketing imports in QuaizenDeseco.tsx:
 *    FIND: from './quaizen/SalesMarketingHubPage'
 *    REPLACE: from '../../marketing/SalesMarketingHubPage'
 *    
 *    FIND: from './quaizen/ContentCalendarDashboard'
 *    REPLACE: from '../../marketing/ContentCalendarDashboard'
 *    
 *    (repeat for all marketing files)
 * 
 * 3. Update Showcase imports in QuaizenDeseco.tsx:
 *    FIND: from './quaizen/InfoPanelShowcase'
 *    REPLACE: from '../../shared/showcases/InfoPanelShowcase'
 *    
 *    (repeat for all showcase files)
 * 
 * 4. Update Context imports in ACCORD files:
 *    FIND: from '../../context/ProjectContext'
 *    REPLACE: from '../../../context/ProjectContext'
 *    (ONLY in /accord/ folder files)
 * 
 * 5. Update ACCORD stage imports in ACCORDMainApp:
 *    FIND: from './accord/
 *    REPLACE: from './
 */

// ============================================
// VERIFICATION CHECKLIST
// ============================================

/**
 * After completing the migration, verify:
 * 
 * ✅ All files are in their new locations
 * ✅ QuaizenDeseco.tsx compiles without errors
 * ✅ ACCORDMainApp.tsx compiles without errors
 * ✅ ProjectContext can be imported from all files
 * ✅ Navigation works (click through all pages)
 * ✅ ACCORD workflow loads correctly
 * ✅ Demo project loads when clicking "Open in ACCORD Dashboard"
 * ✅ All marketing pages load
 * ✅ All showcase pages load
 * ✅ No console errors
 * 
 * Test Commands:
 * - npm run build (should complete without errors)
 * - npm run dev (should start without errors)
 */
