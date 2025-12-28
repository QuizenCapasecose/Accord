#!/bin/bash

# ACCORD System - Professional Architecture Migration Script
# Run this script from your project root directory

echo "🏗️  Starting ACCORD System Restructure..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ============================================
# PHASE 1: CREATE NEW FOLDER STRUCTURE
# ============================================

echo "${BLUE}Phase 1: Creating new folder structure...${NC}"

mkdir -p src/components/accord
mkdir -p src/components/marketing
mkdir -p src/components/shared/showcases
mkdir -p src/services

echo "${GREEN}✅ Folder structure created${NC}"
echo ""

# ============================================
# PHASE 2: MOVE ACCORD FILES
# ============================================

echo "${BLUE}Phase 2: Moving ACCORD files...${NC}"

# Move ACCORD core files
mv src/app/components/quaizen/ACCORDMainApp.tsx src/components/accord/ 2>/dev/null || echo "ACCORDMainApp.tsx already moved"

# Move ACCORD stage files
mv src/app/components/quaizen/accord/ACCORDDashboard.tsx src/components/accord/ 2>/dev/null
mv src/app/components/quaizen/accord/ProjectSetup.tsx src/components/accord/ 2>/dev/null
mv src/app/components/quaizen/accord/Stage1PreLodgement.tsx src/components/accord/ 2>/dev/null
mv src/app/components/quaizen/accord/Stage2ApplicationAssembly.tsx src/components/accord/ 2>/dev/null
mv src/app/components/quaizen/accord/Stage3Assessment.tsx src/components/accord/ 2>/dev/null
mv src/app/components/quaizen/accord/Stage4Determination.tsx src/components/accord/ 2>/dev/null
mv src/app/components/quaizen/accord/Stage5Kaizen.tsx src/components/accord/ 2>/dev/null

echo "${GREEN}✅ ACCORD files moved${NC}"
echo ""

# ============================================
# PHASE 3: MOVE MARKETING FILES
# ============================================

echo "${BLUE}Phase 3: Moving Marketing & Sales files...${NC}"

mv src/app/components/quaizen/SalesMarketingHubPage.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/ContentCalendarDashboard.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/GoogleSearchConsoleDashboard.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/SEOImplementationChecklist.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/SEOContentHubShowcase.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/SolutionPageShowcase.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/AuthorityLinkShowcase.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/TopicClusterShowcase.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/AvoidDADelaysPage.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/BASIXResidentialPage.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/DADelaysPillarPage.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/NSWDAAssessmentPage.tsx src/components/marketing/ 2>/dev/null
mv src/app/components/quaizen/RFIConstructionPage.tsx src/components/marketing/ 2>/dev/null

echo "${GREEN}✅ Marketing files moved${NC}"
echo ""

# ============================================
# PHASE 4: MOVE SHOWCASE FILES
# ============================================

echo "${BLUE}Phase 4: Moving Showcase files...${NC}"

mv src/app/components/quaizen/InfoPanelShowcase.tsx src/components/shared/showcases/ 2>/dev/null
mv src/app/components/quaizen/MetricCardShowcase.tsx src/components/shared/showcases/ 2>/dev/null
mv src/app/components/quaizen/ComplianceRuleShowcase.tsx src/components/shared/showcases/ 2>/dev/null
mv src/app/components/quaizen/GlossaryDrawerShowcase.tsx src/components/shared/showcases/ 2>/dev/null
mv src/app/components/quaizen/DataTableShowcase.tsx src/components/shared/showcases/ 2>/dev/null
mv src/app/components/quaizen/WorkflowStageShowcase.tsx src/components/shared/showcases/ 2>/dev/null

echo "${GREEN}✅ Showcase files moved${NC}"
echo ""

# ============================================
# PHASE 5: MOVE CONTEXT (if not already moved)
# ============================================

echo "${BLUE}Phase 5: Organizing Context files...${NC}"

mkdir -p src/context
mv src/app/context/ProjectContext.tsx src/context/ 2>/dev/null || echo "ProjectContext.tsx already in place"

echo "${GREEN}✅ Context files organized${NC}"
echo ""

# ============================================
# PHASE 6: UPDATE IMPORTS IN KEY FILES
# ============================================

echo "${BLUE}Phase 6: Updating imports...${NC}"
echo "${YELLOW}⚠️  Import updates need to be done manually or with find-replace:${NC}"
echo ""
echo "In QuaizenDeseco.tsx, update:"
echo "  - import { ACCORDMainApp } from './quaizen/ACCORDMainApp';"
echo "  → import { ACCORDMainApp } from '../../accord/ACCORDMainApp';"
echo ""
echo "  - import { SalesMarketingHubPage } from './quaizen/SalesMarketingHubPage';"
echo "  → import { SalesMarketingHubPage } from '../../marketing/SalesMarketingHubPage';"
echo ""
echo "In ACCORD files, update:"
echo "  - import { useProject } from '../../context/ProjectContext';"
echo "  → import { useProject } from '../../../context/ProjectContext';"
echo ""

# ============================================
# PHASE 7: CLEANUP
# ============================================

echo "${BLUE}Phase 7: Cleanup...${NC}"

# Remove empty accord folder
rmdir src/app/components/quaizen/accord 2>/dev/null || echo "Accord folder not empty or already removed"

echo "${GREEN}✅ Cleanup complete${NC}"
echo ""

# ============================================
# SUMMARY
# ============================================

echo ""
echo "${GREEN}🎉 Restructure Complete!${NC}"
echo ""
echo "New Structure:"
echo "├── src/"
echo "│   ├── components/"
echo "│   │   ├── accord/          ← ACCORD Main App & Stages"
echo "│   │   ├── marketing/       ← Sales & SEO Pages"
echo "│   │   ├── quaizen/         ← Compliance Tools"
echo "│   │   ├── shared/          ← Reusable Components"
echo "│   │   │   └── showcases/   ← Component Demos"
echo "│   │   ├── templates/       ← Document Templates"
echo "│   │   └── ui/              ← Shadcn Components"
echo "│   ├── context/"
echo "│   │   └── ProjectContext.tsx"
echo "│   └── services/            ← (Create API services here)"
echo ""
echo "${YELLOW}⚠️  NEXT STEPS:${NC}"
echo "1. Update import statements in QuaizenDeseco.tsx"
echo "2. Update import statements in ACCORD component files"
echo "3. Test the application: npm run dev"
echo "4. Fix any remaining import errors"
echo ""
echo "See RESTRUCTURE_ROADMAP.md for detailed migration guide"
echo ""
