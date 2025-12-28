import React, { createContext, useContext, useState, ReactNode } from 'react';

// --- COMPREHENSIVE PROJECT INTERFACE (All 6 Menu Items) ---
export interface ProjectDocument {
  id: string;
  name: string;
  category: 'core' | 'architectural' | 'reports' | 'engineering' | 'environmental' | 'statutory';
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  version?: string;
  uploadDate?: string;
  size?: string;
}

export interface ComplianceData {
  lepFailures: number;
  dcpVariations: number;
  score: number; // Dynamic Metric (0-100)
  lastChecked?: string;
  issues?: Array<{
    id: string;
    control: string;
    status: 'fail' | 'variation' | 'compliant';
    notes: string;
  }>;
}

export interface QualityData {
  gatesPassed: number;
  totalGates: number;
  riskScore: 'low' | 'medium' | 'high';
  rfiProbability: string; // e.g., "Low (<5%)"
  lastAudit?: string;
  kpis?: {
    firstPassRate: number;
    avgTurnaroundDays: number;
  };
}

export interface FeedbackItem {
  id: string;
  date: string;
  type: 'issue' | 'suggestion' | 'improvement' | 'risk';
  message: string;
  status: 'open' | 'resolved' | 'in-progress';
  author?: string;
  resolution?: string;
}

export interface RFI {
  id: string;
  date: string;
  officer: string;
  requirement: string;
  category: string;
  deadline: string;
  status: 'pending' | 'responded' | 'resolved';
  response?: string;
}

export interface Project {
  // CORE METADATA
  id: string;
  name: string;
  description: string;
  createdDate: string;
  lastUpdated: string;
  
  // MENU ITEM 1: PROJECTS (Location & Council Data)
  address: string;
  council: string;
  lot?: string;
  dp?: string;
  zone?: string;
  
  // MENU ITEM 2: WORKFLOWS (Stage Progression)
  stage: 1 | 2 | 3 | 4 | 5; // 1=Pre-Lodge, 2=Assembly, 3=Assessment, 4=Determination, 5=Kaizen
  status: 'pre-lodgement' | 'lodged' | 'in-assessment' | 'determined' | 'archived';
  stageProgress: number; // 0-100 (calculated metric)
  daysElapsed?: number;
  targetDays?: number;
  
  // MENU ITEM 3: DOCUMENTS (The Registry)
  documents: ProjectDocument[];
  
  // MENU ITEM 4: COMPLIANCE (LEP/DCP Rules)
  compliance: ComplianceData;
  complianceScore: number; // Legacy field for backward compatibility
  
  // MENU ITEM 5: QUALITY (ISO 9001 / Kaizen Gates)
  quality: QualityData;
  
  // MENU ITEM 6: FEEDBACK (Continuous Improvement Log)
  feedbackLog: FeedbackItem[];
  
  // ADDITIONAL DATA
  rfis: RFI[];
  applicantName?: string;
  developmentType?: string;
  estimatedCost?: string;
}

// --- DYNAMIC METRIC CALCULATION ---
// This ensures New Projects automatically get calculated scores
const calculateMetrics = (project: Partial<Project>): Partial<Project> => {
  const docs = project.documents || [];
  const verifiedDocs = docs.filter(d => d.status === 'verified').length;
  const totalDocs = docs.length;
  const docScore = totalDocs > 0 ? Math.round((verifiedDocs / totalDocs) * 100) : 0;
  
  // Calculate compliance score based on failures and variations
  const compliance = project.compliance || { lepFailures: 0, dcpVariations: 0, score: 0 };
  const complianceScore = Math.max(0, 100 - (compliance.lepFailures * 20) - (compliance.dcpVariations * 5));
  
  // Calculate stage progress (weighted average of documents and compliance)
  const stageProgress = Math.round((docScore * 0.6) + (complianceScore * 0.4));
  
  // Calculate RFI probability based on compliance and quality
  const quality = project.quality || { gatesPassed: 0, totalGates: 5, riskScore: 'medium', rfiProbability: 'Medium' };
  let rfiProbability = 'Medium (10-20%)';
  if (complianceScore >= 90 && quality.riskScore === 'low') {
    rfiProbability = 'Low (<5%)';
  } else if (complianceScore < 70 || quality.riskScore === 'high') {
    rfiProbability = 'High (>30%)';
  }
  
  // Return calculated/derived state
  return {
    ...project,
    stageProgress,
    complianceScore,
    compliance: {
      ...compliance,
      score: complianceScore
    },
    quality: {
      ...quality,
      rfiProbability
    }
  };
};

// --- COMPREHENSIVE DEMO PROJECT DATA (All 6 Sections) ---
const DEMO_PROJECT: Project = {
  // CORE METADATA
  id: 'DA-2024-0156',
  name: 'Greystanes 3-Lot Subdivision',
  description: 'Torrens title subdivision of existing lot into 3 residential lots including demolition of existing structures and construction of 3 x two-storey dwellings.',
  createdDate: '2024-02-25',
  lastUpdated: new Date().toISOString(),
  
  // MENU ITEM 1: PROJECTS (Location & Council)
  address: '19 Gardenia Parade, Greystanes NSW 2145',
  council: 'Cumberland City Council',
  lot: 'Lot 45',
  dp: 'DP 752314',
  zone: 'R2 Low Density Residential',
  
  // MENU ITEM 2: WORKFLOWS (Stage Progression)
  stage: 2, // Application Assembly stage
  status: 'pre-lodgement',
  stageProgress: 65, // Will be recalculated
  daysElapsed: 28,
  targetDays: 90,
  
  // MENU ITEM 3: DOCUMENTS (43 Documents in full demo)
  documents: [
    // Core Application Documents
    { id: 'doc1', name: 'Statement of Environmental Effects', category: 'core', status: 'verified', version: '2.1', uploadDate: '2024-03-15', size: '2.4 MB' },
    { id: 'doc2', name: 'Development Application Form', category: 'core', status: 'verified', version: '1.0', uploadDate: '2024-03-10', size: '450 KB' },
    { id: 'doc3', name: 'Owners Consent', category: 'core', status: 'verified', version: '1.0', uploadDate: '2024-03-10', size: '125 KB' },
    
    // Architectural Documents
    { id: 'doc4', name: 'Survey Plan', category: 'architectural', status: 'verified', version: '1.0', uploadDate: '2024-03-12', size: '3.1 MB' },
    { id: 'doc5', name: 'Site Analysis Plan', category: 'architectural', status: 'verified', version: '1.1', uploadDate: '2024-03-14', size: '1.8 MB' },
    { id: 'doc6', name: 'Proposed Subdivision Plan', category: 'architectural', status: 'verified', version: '2.0', uploadDate: '2024-03-18', size: '2.6 MB' },
    { id: 'doc7', name: 'Dwelling Plans - Lot 1', category: 'architectural', status: 'uploaded', version: '1.5', uploadDate: '2024-03-20', size: '4.2 MB' },
    { id: 'doc8', name: 'Dwelling Plans - Lot 2', category: 'architectural', status: 'uploaded', version: '1.5', uploadDate: '2024-03-20', size: '4.0 MB' },
    { id: 'doc9', name: 'Dwelling Plans - Lot 3', category: 'architectural', status: 'pending', version: '0.9', size: '3.8 MB' },
    
    // Reports
    { id: 'doc10', name: 'BASIX Certificate - Lot 1', category: 'reports', status: 'verified', version: '1.0', uploadDate: '2024-03-16', size: '890 KB' },
    { id: 'doc11', name: 'BASIX Certificate - Lot 2', category: 'reports', status: 'verified', version: '1.0', uploadDate: '2024-03-16', size: '875 KB' },
    { id: 'doc12', name: 'BASIX Certificate - Lot 3', category: 'reports', status: 'uploaded', version: '1.0', uploadDate: '2024-03-21', size: '920 KB' },
    { id: 'doc13', name: 'Geotechnical Report', category: 'reports', status: 'verified', version: '1.0', uploadDate: '2024-03-11', size: '5.2 MB' },
    { id: 'doc14', name: 'Arborist Report', category: 'environmental', status: 'verified', version: '1.1', uploadDate: '2024-03-13', size: '3.4 MB' },
    { id: 'doc15', name: 'Stormwater Management Plan', category: 'engineering', status: 'verified', version: '1.0', uploadDate: '2024-03-17', size: '2.1 MB' },
  ],
  
  // MENU ITEM 4: COMPLIANCE (LEP/DCP Rules)
  compliance: {
    lepFailures: 0, // Perfect LEP compliance
    dcpVariations: 1, // One minor DCP variation (front setback 5.8m vs 6m required)
    score: 92, // Will be recalculated
    lastChecked: '2024-03-22',
    issues: [
      {
        id: 'comp1',
        control: 'DCP 2021 - 3.2.1 Front Setback',
        status: 'variation',
        notes: 'Lot 2 front setback 5.8m (required 6m). Variation justified by site constraints and consistent streetscape.'
      },
      {
        id: 'comp2',
        control: 'LEP 2021 - 4.3 Height of Buildings',
        status: 'compliant',
        notes: 'All dwellings 8.2m (max 9m). Fully compliant.'
      },
      {
        id: 'comp3',
        control: 'DCP 2021 - 3.3.1 Landscaping',
        status: 'compliant',
        notes: '38% landscaped area (min 30% required). Exceeds requirements.'
      }
    ]
  },
  complianceScore: 92, // Legacy field
  
  // MENU ITEM 5: QUALITY (ISO 9001 / Kaizen Gates)
  quality: {
    gatesPassed: 3,
    totalGates: 5,
    riskScore: 'low',
    rfiProbability: 'Low (<5%)',
    lastAudit: '2024-03-20',
    kpis: {
      firstPassRate: 95, // 95% of submissions accepted first time
      avgTurnaroundDays: 12 // Average response time
    }
  },
  
  // MENU ITEM 6: FEEDBACK (Kaizen Continuous Improvement)
  feedbackLog: [
    {
      id: 'fb1',
      date: '2024-03-20',
      type: 'issue',
      message: 'Height plane check needed for Lot 2 northern boundary to ensure compliance with solar access requirements',
      status: 'in-progress',
      author: 'Planning Officer - J. Smith'
    },
    {
      id: 'fb2',
      date: '2024-03-18',
      type: 'suggestion',
      message: 'Consider adding landscape buffer along eastern boundary for improved visual privacy',
      status: 'resolved',
      author: 'Urban Design Review',
      resolution: 'Added 2m landscape buffer with screening plants as per landscape plan v1.1'
    },
    {
      id: 'fb3',
      date: '2024-03-15',
      type: 'improvement',
      message: 'BASIX ratings exceed minimum requirements - excellent passive design principles applied',
      status: 'resolved',
      author: 'Sustainability Team'
    },
    {
      id: 'fb4',
      date: '2024-03-12',
      type: 'risk',
      message: 'Stormwater discharge capacity requires peer review to confirm adequacy for 1-in-100 year event',
      status: 'resolved',
      author: 'Hydraulic Engineer',
      resolution: 'Independent review completed - design confirmed adequate with safety factor'
    }
  ],
  
  // ADDITIONAL DATA
  rfis: [], // Zero RFIs (perfect submission)
  applicantName: 'MetroBuild Group Pty Ltd',
  developmentType: 'Residential Subdivision - 3 Lots',
  estimatedCost: '$450,000'
};

// Apply dynamic calculations to demo project
const calculatedDemo = calculateMetrics(DEMO_PROJECT) as Project;

// --- CONTEXT SETUP ---
interface ProjectContextType {
  currentProject: Project | null;
  createNewProject: (data: Partial<Project>) => void;
  loadDemoProject: () => void;
  updateProjectStage: (stage: 1 | 2 | 3 | 4 | 5) => void;
  updateProject: (updates: Partial<Project>) => void;
  addDocument: (doc: Omit<ProjectDocument, 'id'>) => void;
  addFeedback: (feedback: Omit<FeedbackItem, 'id'>) => void;
  clearProject: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const createNewProject = (data: Partial<Project>) => {
    const baseProject: Project = {
      id: `DA-${Date.now()}`,
      name: data.name || 'New Project',
      address: data.address || '',
      description: data.description || '',
      council: data.council || 'Cumberland City Council',
      stage: 1,
      status: 'pre-lodgement',
      stageProgress: 0,
      complianceScore: 0,
      documents: [],
      compliance: {
        lepFailures: 0,
        dcpVariations: 0,
        score: 0
      },
      quality: {
        gatesPassed: 0,
        totalGates: 5,
        riskScore: 'medium',
        rfiProbability: 'Medium (10-20%)'
      },
      feedbackLog: [],
      rfis: [],
      createdDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      ...data
    };
    
    // Apply dynamic calculations
    const calculatedProject = calculateMetrics(baseProject) as Project;
    setCurrentProject(calculatedProject);
  };

  const loadDemoProject = () => {
    setCurrentProject(calculatedDemo);
  };

  const updateProjectStage = (stage: 1 | 2 | 3 | 4 | 5) => {
    if (currentProject) {
      const updated = { ...currentProject, stage, lastUpdated: new Date().toISOString() };
      const recalculated = calculateMetrics(updated) as Project;
      setCurrentProject(recalculated);
    }
  };

  const updateProject = (updates: Partial<Project>) => {
    if (currentProject) {
      const updated = { ...currentProject, ...updates, lastUpdated: new Date().toISOString() };
      const recalculated = calculateMetrics(updated) as Project;
      setCurrentProject(recalculated);
    }
  };

  const addDocument = (doc: Omit<ProjectDocument, 'id'>) => {
    if (currentProject) {
      const newDoc: ProjectDocument = {
        ...doc,
        id: `doc-${Date.now()}`,
        uploadDate: new Date().toISOString()
      };
      const updated = {
        ...currentProject,
        documents: [...currentProject.documents, newDoc],
        lastUpdated: new Date().toISOString()
      };
      const recalculated = calculateMetrics(updated) as Project;
      setCurrentProject(recalculated);
    }
  };

  const addFeedback = (feedback: Omit<FeedbackItem, 'id'>) => {
    if (currentProject) {
      const newFeedback: FeedbackItem = {
        ...feedback,
        id: `fb-${Date.now()}`,
        date: new Date().toISOString()
      };
      const updated = {
        ...currentProject,
        feedbackLog: [...currentProject.feedbackLog, newFeedback],
        lastUpdated: new Date().toISOString()
      };
      setCurrentProject(updated);
    }
  };

  const clearProject = () => {
    setCurrentProject(null);
  };

  return (
    <ProjectContext.Provider value={{ 
      currentProject, 
      createNewProject, 
      loadDemoProject, 
      updateProjectStage,
      updateProject,
      addDocument,
      addFeedback,
      clearProject 
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProject must be used within ProjectProvider');
  return context;
};
