# 🏗️ ACCORD System - Professional Architecture Migration Guide

## 📋 Overview

This guide will help you restructure the ACCORD codebase from a monolithic `/quaizen/` folder structure to a professional, modular architecture organized by function.

---

## 🎯 Why This Restructure?

**Current Problem:**
- 80+ files in `/app/components/quaizen/` folder
- Difficult to find files
- No clear separation of concerns
- Templates, tools, and pages all mixed together

**Solution:**
```
/src
  /components
    /accord       ← ACCORD App (7 files)
    /marketing    ← Sales & SEO (13 files)
    /quaizen      ← Compliance Tools (50+ files)
    /shared       ← Reusable Components (12 files)
    /templates    ← Document Forms (25+ files)
    /ui           ← Shadcn Components (56 files)
```

---

## 🚀 Quick Start

### Option 1: Automated Script (Recommended)

```bash
# Make the script executable
chmod +x migrate-structure.sh

# Run the migration
./migrate-structure.sh

# The script will:
# ✅ Create new folder structure
# ✅ Move ACCORD files to /components/accord/
# ✅ Move marketing files to /components/marketing/
# ✅ Move showcase files to /components/shared/showcases/
# ✅ Move context to /context/
```

### Option 2: Manual Migration

Follow the detailed steps in `RESTRUCTURE_ROADMAP.md`

---

## 📦 What Gets Moved

### 1. ACCORD Files → `/components/accord/`

| Current Location | New Location |
|---|---|
| `/quaizen/ACCORDMainApp.tsx` | `/accord/ACCORDMainApp.tsx` |
| `/quaizen/accord/ACCORDDashboard.tsx` | `/accord/ACCORDDashboard.tsx` |
| `/quaizen/accord/ProjectSetup.tsx` | `/accord/ProjectSetup.tsx` |
| `/quaizen/accord/Stage1PreLodgement.tsx` | `/accord/Stage1PreLodgement.tsx` |
| `/quaizen/accord/Stage2ApplicationAssembly.tsx` | `/accord/Stage2ApplicationAssembly.tsx` |
| `/quaizen/accord/Stage3Assessment.tsx` | `/accord/Stage3Assessment.tsx` |
| `/quaizen/accord/Stage4Determination.tsx` | `/accord/Stage4Determination.tsx` |
| `/quaizen/accord/Stage5Kaizen.tsx` | `/accord/Stage5Kaizen.tsx` |

**Total: 8 files**

---

### 2. Marketing Files → `/components/marketing/`

| Current Location | New Location |
|---|---|
| `/quaizen/SalesMarketingHubPage.tsx` | `/marketing/SalesMarketingHubPage.tsx` |
| `/quaizen/ContentCalendarDashboard.tsx` | `/marketing/ContentCalendarDashboard.tsx` |
| `/quaizen/GoogleSearchConsoleDashboard.tsx` | `/marketing/GoogleSearchConsoleDashboard.tsx` |
| `/quaizen/SEOImplementationChecklist.tsx` | `/marketing/SEOImplementationChecklist.tsx` |
| `/quaizen/AvoidDADelaysPage.tsx` | `/marketing/AvoidDADelaysPage.tsx` |
| `/quaizen/BASIXResidentialPage.tsx` | `/marketing/BASIXResidentialPage.tsx` |
| `/quaizen/DADelaysPillarPage.tsx` | `/marketing/DADelaysPillarPage.tsx` |
| `/quaizen/NSWDAAssessmentPage.tsx` | `/marketing/NSWDAAssessmentPage.tsx` |
| `/quaizen/RFIConstructionPage.tsx` | `/marketing/RFIConstructionPage.tsx` |
| `/quaizen/SEOContentHubShowcase.tsx` | `/marketing/SEOContentHubShowcase.tsx` |
| `/quaizen/SolutionPageShowcase.tsx` | `/marketing/SolutionPageShowcase.tsx` |
| `/quaizen/AuthorityLinkShowcase.tsx` | `/marketing/AuthorityLinkShowcase.tsx` |
| `/quaizen/TopicClusterShowcase.tsx` | `/marketing/TopicClusterShowcase.tsx` |

**Total: 13 files**

---

### 3. Showcase Files → `/components/shared/showcases/`

| Current Location | New Location |
|---|---|
| `/quaizen/InfoPanelShowcase.tsx` | `/shared/showcases/InfoPanelShowcase.tsx` |
| `/quaizen/MetricCardShowcase.tsx` | `/shared/showcases/MetricCardShowcase.tsx` |
| `/quaizen/ComplianceRuleShowcase.tsx` | `/shared/showcases/ComplianceRuleShowcase.tsx` |
| `/quaizen/GlossaryDrawerShowcase.tsx` | `/shared/showcases/GlossaryDrawerShowcase.tsx` |
| `/quaizen/DataTableShowcase.tsx` | `/shared/showcases/DataTableShowcase.tsx` |
| `/quaizen/WorkflowStageShowcase.tsx` | `/shared/showcases/WorkflowStageShowcase.tsx` |

**Total: 6 files**

---

### 4. Files That Stay in `/components/quaizen/`

**Core Pages:**
- `HomePage.tsx`
- `ProjectsPage.tsx`
- `ProcessPage.tsx`
- `StagesPage.tsx`
- `CompliancePage.tsx`
- `FeedbackPage.tsx`
- `WorkflowsPage.tsx`

**Compliance & Validation Tools:** (keep all in quaizen)
- `CompleteDemoProject.tsx`
- `ControlsMatrix.tsx`
- `AssessmentClockVisualizer.tsx`
- `ValidationDashboard.tsx`
- `DocumentVerificationDashboard.tsx`
- `QualityGateApprovalSystem.tsx`
- `RFIManagementDashboard.tsx`
- All other compliance, validation, and workflow tools

**Total: ~50+ files remain**

---

## 🔧 Import Path Updates

After moving files, you **MUST** update import statements.

### Key Updates in `QuaizenDeseco.tsx`:

```typescript
// === ACCORD ===
// OLD: import { ACCORDMainApp } from './quaizen/ACCORDMainApp';
// NEW: 
import { ACCORDMainApp } from '../../accord/ACCORDMainApp';

// === MARKETING ===
// OLD: import { SalesMarketingHubPage } from './quaizen/SalesMarketingHubPage';
// NEW:
import { SalesMarketingHubPage } from '../../marketing/SalesMarketingHubPage';
import { ContentCalendarDashboard } from '../../marketing/ContentCalendarDashboard';
import { GoogleSearchConsoleDashboard } from '../../marketing/GoogleSearchConsoleDashboard';
// ... (repeat for all 13 marketing files)

// === SHOWCASES ===
// OLD: import { InfoPanelShowcase } from './quaizen/InfoPanelShowcase';
// NEW:
import { InfoPanelShowcase } from '../../shared/showcases/InfoPanelShowcase';
import { MetricCardShowcase } from '../../shared/showcases/MetricCardShowcase';
// ... (repeat for all 6 showcase files)

// === QUAIZEN (NO CHANGE) ===
import { HomePage } from './quaizen/HomePage';
import { ProjectsPage } from './quaizen/ProjectsPage';
// ... (these stay the same)
```

### Updates in `ACCORDMainApp.tsx`:

```typescript
// Context import
// OLD: import { useProject } from '../../context/ProjectContext';
// NEW:
import { useProject } from '../../../context/ProjectContext';

// Stage imports
// OLD: import { ACCORDDashboard } from './accord/ACCORDDashboard';
// NEW:
import { ACCORDDashboard } from './ACCORDDashboard';
import { Stage1PreLodgement } from './Stage1PreLodgement';
import { Stage2ApplicationAssembly } from './Stage2ApplicationAssembly';
// etc...
```

### Updates in `App.tsx`:

```typescript
// Context import
// OLD: import { ProjectProvider } from './context/ProjectContext';
// NEW:
import { ProjectProvider } from '../context/ProjectContext';
```

---

## ✅ Verification Steps

After migration, test everything:

### 1. Build Test
```bash
npm run build
```
Should complete with **0 errors**.

### 2. Dev Server Test
```bash
npm run dev
```
Should start without errors.

### 3. Navigation Test
Click through every page:
- ✅ Home page loads
- ✅ Projects page loads
- ✅ ACCORD Main App opens
- ✅ Demo project loads correctly
- ✅ All 5 stages navigate properly
- ✅ Sales & Marketing Hub opens
- ✅ All showcases work

### 4. Context Test
- ✅ "Open in ACCORD Dashboard" button works
- ✅ Demo project data loads (30 documents, 98% compliance)
- ✅ Project persists across stage navigation

### 5. Console Check
- ✅ No import errors in browser console
- ✅ No "module not found" errors
- ✅ No React errors

---

## 📁 Final Structure

```
/src
  /components
    /accord
      ACCORDMainApp.tsx
      ACCORDDashboard.tsx
      ProjectSetup.tsx
      Stage1PreLodgement.tsx
      Stage2ApplicationAssembly.tsx
      Stage3Assessment.tsx
      Stage4Determination.tsx
      Stage5Kaizen.tsx
    /marketing
      SalesMarketingHubPage.tsx
      ContentCalendarDashboard.tsx
      GoogleSearchConsoleDashboard.tsx
      SEOImplementationChecklist.tsx
      (+ 9 more marketing files)
    /quaizen
      HomePage.tsx
      ProjectsPage.tsx
      CompliancePage.tsx
      ValidationDashboard.tsx
      (+ 50 more compliance/tool files)
    /shared
      /showcases
        InfoPanelShowcase.tsx
        MetricCardShowcase.tsx
        (+ 4 more showcases)
      InfoPanel.tsx
      MetricCard.tsx
      (+ 10 more shared components)
    /templates
      (25+ document template files)
    /ui
      (56 Shadcn components)
  /context
    ProjectContext.tsx
  /services
    (future API service files)
  /styles
    index.css
    theme.css
    tailwind.css
  App.tsx
  main.tsx
```

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot find module"
**Fix:** Check import paths match new structure. Use relative paths correctly (`../` vs `../../`)

### Issue: Context not working
**Fix:** Ensure `ProjectProvider` wraps app in `App.tsx` and imports from `/context/ProjectContext`

### Issue: ACCORD stages not loading
**Fix:** Verify all stage files are in `/components/accord/` and imported in `ACCORDMainApp.tsx`

### Issue: Navigation broken
**Fix:** Update all route navigation in `QuaizenDeseco.tsx` to use correct imports

---

## 📝 Reference Files

- `RESTRUCTURE_ROADMAP.md` - Detailed migration roadmap
- `migrate-structure.sh` - Automated migration script
- `import-updates-reference.ts` - All import changes needed

---

## 🎯 Success Criteria

✅ All files in correct folders
✅ No build errors
✅ No console errors
✅ All pages navigate correctly
✅ ACCORD workflow functions properly
✅ Demo project loads and works
✅ ProjectContext integrates seamlessly

---

## 📞 Support

If you encounter issues during migration:
1. Check the `import-updates-reference.ts` file
2. Review error messages carefully (usually import path issues)
3. Use VS Code's "Find in Files" to locate where imports need updating
4. Test incrementally after each major change

---

**Migration Time Estimate:** 15-30 minutes
**Difficulty:** Medium (mostly moving files + updating imports)
**Impact:** High (much cleaner, professional architecture)

---

**Ready to begin? Run `./migrate-structure.sh` to start!** 🚀
