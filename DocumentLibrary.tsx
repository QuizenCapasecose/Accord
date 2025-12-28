import { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { FileText, Download, Eye, Upload, CheckCircle2, Clock, AlertCircle, X } from 'lucide-react';
import { BasixCertificate } from './templates/BasixCertificate';
import { HeritageImpactStatement } from './templates/HeritageImpactStatement';
import { DAApplicationForm } from './templates/DAApplicationForm';
import { OwnerConsentForm } from './templates/OwnerConsentForm';
import { StatementEnvironmentalEffects } from './templates/StatementEnvironmentalEffects';
import { WasteManagementPlan } from './templates/WasteManagementPlan';
import { SurveyPlan } from './templates/SurveyPlan';
import { LandscapePlan } from './templates/LandscapePlan';
import { ArchitecturalSitePlan } from './templates/ArchitecturalSitePlan';
import { ArchitecturalFloorPlan } from './templates/ArchitecturalFloorPlan';
import { ArchitecturalElevations } from './templates/ArchitecturalElevations';
import { ArchitecturalSections } from './templates/ArchitecturalSections';
import { ShadowDiagrams } from './templates/ShadowDiagrams';
import { MaterialsFinishesSchedule } from './templates/MaterialsFinishesSchedule';
import { ArboristReport as ArboristReportTemplate } from './templates/ArboristReport';
import { TrafficAssessment as TrafficAssessmentTemplate } from './templates/TrafficAssessment';
import { StormwaterPlan as StormwaterPlanTemplate } from './templates/StormwaterPlan';
import { AcousticAssessment } from './templates/AcousticAssessment';
import { GeotechnicalReport as GeotechnicalReportTemplate } from './templates/GeotechnicalReport';
import { Section88B as Section88BTemplate } from './templates/Section88B';

interface Document {
  id: string;
  name: string;
  category: string;
  required: boolean;
  uploaded: boolean;
  hasTemplate: boolean;
  description: string;
  uploadDate?: string;
  size?: string;
  version?: number;
}

const documentCategories = [
  {
    id: 'application',
    name: '1. Application Forms',
    description: 'Mandatory application and consent forms'
  },
  {
    id: 'statements',
    name: '2. Statements and Plans',
    description: 'Core planning documents and statements'
  },
  {
    id: 'architectural',
    name: '3. Architectural Documentation',
    description: 'Design drawings and specifications'
  },
  {
    id: 'specialist',
    name: '4. Specialist Reports',
    description: 'Technical assessments and consultant reports'
  },
  {
    id: 'certifications',
    name: '5. Certifications & Compliance',
    description: 'Statutory certificates and compliance documents'
  }
];

const allDocuments: Document[] = [
  // 1. Application Forms
  {
    id: 'da-form',
    name: '1.1 DA Application Form',
    category: 'application',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Standard Development Application form as per NSW Planning Portal',
    uploadDate: '20 Dec 2025',
    size: '1.2 MB',
    version: 1
  },
  {
    id: 'owner-consent',
    name: '1.2 Owner Consent Form',
    category: 'application',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Written consent from all property owners',
    uploadDate: '18 Dec 2025',
    size: '0.8 MB',
    version: 1
  },

  // 2. Statements and Plans
  {
    id: 'see',
    name: '2.1 Statement of Environmental Effects (SEE)',
    category: 'statements',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Comprehensive environmental impact assessment addressing LEP/DCP controls',
    uploadDate: '19 Dec 2025',
    size: '4.5 MB',
    version: 2
  },
  {
    id: 'waste-plan',
    name: '2.2 Waste Management Plan',
    category: 'statements',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Construction and operational waste management strategy per DCP Part B',
    uploadDate: '20 Dec 2025',
    size: '3.1 MB',
    version: 1
  },
  {
    id: 'survey-plan',
    name: '2.3 Survey Plan',
    category: 'statements',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Registered surveyor plan showing site boundaries and dimensions',
    uploadDate: '18 Dec 2025',
    size: '2.1 MB',
    version: 1
  },
  {
    id: 'landscape-plan',
    name: '2.4 Landscape Plan',
    category: 'statements',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Detailed landscaping design with species schedule and planting plan',
    uploadDate: '19 Dec 2025',
    size: '3.2 MB',
    version: 1
  },

  // 3. Architectural Documentation
  {
    id: 'site-plan',
    name: '3.1.1 Site Plan',
    category: 'architectural',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Site plan at 1:100 or 1:200 scale showing existing and proposed site layout',
    uploadDate: '20 Dec 2025',
    size: '2.8 MB',
    version: 2
  },
  {
    id: 'floor-plans',
    name: '3.1.2 Floor Plans',
    category: 'architectural',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'All floor levels showing room layouts, dimensions at 1:100 scale',
    uploadDate: '20 Dec 2025',
    size: '3.5 MB',
    version: 2
  },
  {
    id: 'elevations',
    name: '3.1.3 Elevations',
    category: 'architectural',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'All building elevations with materials and colors at 1:100 scale',
    uploadDate: '20 Dec 2025',
    size: '2.4 MB',
    version: 2
  },
  {
    id: 'sections',
    name: '3.1.4 Sections',
    category: 'architectural',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Building cross-sections showing levels and heights at 1:100 scale',
    uploadDate: '20 Dec 2025',
    size: '1.9 MB',
    version: 1
  },
  {
    id: 'shadow-diagrams',
    name: '3.2 Shadow Diagrams',
    category: 'architectural',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Overshadowing analysis for 21 June (winter solstice) - 9am, 12pm, 3pm',
    uploadDate: '19 Dec 2025',
    size: '2.4 MB',
    version: 1
  },
  {
    id: 'materials-schedule',
    name: '3.3 Materials & Finishes Schedule',
    category: 'architectural',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Detailed schedule of external materials, colors, and finishes',
    uploadDate: '20 Dec 2025',
    size: '1.8 MB',
    version: 1
  },

  // 4. Specialist Reports
  {
    id: 'heritage-statement',
    name: '4.1 Heritage Impact Statement',
    category: 'specialist',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Assessment of impact on heritage conservation area by qualified heritage consultant',
    uploadDate: '17 Dec 2025',
    size: '3.6 MB',
    version: 1
  },
  {
    id: 'arborist-report',
    name: '4.2 Arborist Report & Tree Protection Plan',
    category: 'specialist',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'AQF Level 5 arborist assessment of existing trees and retention strategy',
    uploadDate: '16 Dec 2025',
    size: '2.9 MB',
    version: 1
  },
  {
    id: 'traffic-assessment',
    name: '4.3 Traffic & Parking Assessment',
    category: 'specialist',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Traffic generation, parking provision, and access assessment',
    uploadDate: '19 Dec 2025',
    size: '3.1 MB',
    version: 1
  },
  {
    id: 'stormwater-plan',
    name: '4.4 Stormwater & WSUD Management Plan',
    category: 'specialist',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'Drainage design, detention/retention systems, and water sensitive urban design',
    uploadDate: '20 Dec 2025',
    size: '4.2 MB',
    version: 1
  },
  {
    id: 'acoustic-assessment',
    name: '4.5 Acoustic Assessment',
    category: 'specialist',
    required: false,
    uploaded: false,
    hasTemplate: true,
    description: 'Noise impact assessment for construction and operation (if required)'
  },
  {
    id: 'geotechnical',
    name: '4.6 Geotechnical Report',
    category: 'specialist',
    required: false,
    uploaded: false,
    hasTemplate: true,
    description: 'Soil investigation and foundation recommendations (if required)'
  },

  // 5. Certifications & Compliance
  {
    id: 'basix',
    name: '5.1 BASIX Certificate',
    category: 'certifications',
    required: true,
    uploaded: true,
    hasTemplate: true,
    description: 'NSW Building Sustainability Index certification (thermal comfort, water, energy)',
    uploadDate: '20 Dec 2025',
    size: '0.6 MB',
    version: 1
  },
  {
    id: 'section-88b',
    name: '5.2 Section 88B Instrument',
    category: 'certifications',
    required: false,
    uploaded: false,
    hasTemplate: true,
    description: 'Restriction on use of land or positive covenant (if subdivision/strata)'
  }
];

export function DocumentLibrary() {
  const { project } = useProject();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = allDocuments.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUpload = (docId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.dwg';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        alert(`File "${file.name}" uploaded successfully!\n\nSize: ${(file.size / 1024 / 1024).toFixed(2)} MB\nDate: ${new Date().toLocaleDateString()}`);
        // In production, would update document status
      }
    };
    input.click();
  };

  const handleView = (doc: Document) => {
    setViewingDocument(doc);
  };

  const handleDownload = (docName: string) => {
    alert(`Downloading template: ${docName}\n\nIn production, this would download a pre-filled template.`);
  };

  const stats = {
    total: allDocuments.filter(d => d.required).length,
    uploaded: allDocuments.filter(d => d.required && d.uploaded).length,
    pending: allDocuments.filter(d => d.required && !d.uploaded).length
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl mb-2">Document Library</h1>
        <p className="text-sm sm:text-base text-slate-600">
          Complete document repository for {project.projectName}
        </p>
      </div>

      {/* Stats Bar - Mobile optimized grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3 sm:p-4">
          <div className="text-xs sm:text-sm text-slate-600 mb-1">Total Required</div>
          <div className="text-2xl sm:text-3xl text-slate-900">{stats.total}</div>
        </div>
        <div className="bg-green-50 rounded-lg shadow-sm border border-green-200 p-3 sm:p-4">
          <div className="text-xs sm:text-sm text-green-700 mb-1">Uploaded</div>
          <div className="text-2xl sm:text-3xl text-green-600">{stats.uploaded}</div>
        </div>
        <div className="bg-amber-50 rounded-lg shadow-sm border border-amber-200 p-3 sm:p-4">
          <div className="text-xs sm:text-sm text-amber-700 mb-1">Pending</div>
          <div className="text-2xl sm:text-3xl text-amber-600">{stats.pending}</div>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-3 sm:p-4">
          <div className="text-xs sm:text-sm text-blue-700 mb-1">Completion</div>
          <div className="text-2xl sm:text-3xl text-blue-600">
            {Math.round((stats.uploaded / stats.total) * 100)}%
          </div>
        </div>
      </div>

      {/* Search and Filter - Mobile optimized */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {documentCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-4 sm:space-y-6">
        {documentCategories.map(category => {
          const categoryDocs = filteredDocuments.filter(d => d.category === category.id);
          if (categoryDocs.length === 0 && selectedCategory !== 'all') return null;

          return (
            <div key={category.id} className="bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="p-4 sm:p-5 border-b border-slate-200">
                <h3 className="text-base sm:text-lg mb-1">{category.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600">{category.description}</p>
              </div>
              <div className="p-3 sm:p-5">
                <div className="space-y-3">
                  {categoryDocs.map(doc => (
                    <div
                      key={doc.id}
                      className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      {/* Status Icon */}
                      <div className="flex-shrink-0 self-start sm:mt-1">
                        {doc.uploaded ? (
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        ) : doc.required ? (
                          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                        ) : (
                          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
                        )}
                      </div>

                      {/* Document Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h4 className="font-medium text-slate-900 mb-1">
                              {doc.name}
                              {doc.required && (
                                <span className="ml-2 text-xs text-red-600">* Required</span>
                              )}
                            </h4>
                            <p className="text-sm text-slate-600">{doc.description}</p>
                          </div>
                        </div>

                        {doc.uploaded && (
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                            <span>Version {doc.version}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>Uploaded {doc.uploadDate}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleView(doc)}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>

                        {!doc.uploaded && doc.required && (
                          <button
                            onClick={() => handleUpload(doc.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            <Upload className="w-4 h-4" />
                            Upload
                          </button>
                        )}

                        {doc.hasTemplate && (
                          <button
                            onClick={() => handleDownload(doc.name)}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Template
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <DocumentViewer
          document={viewingDocument}
          onClose={() => setViewingDocument(null)}
        />
      )}
    </div>
  );
}

interface DocumentViewerProps {
  document: Document;
  onClose: () => void;
}

function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header - Mobile optimized */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-base sm:text-lg mb-1 truncate">{document.name}</h3>
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{document.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Content - Mobile optimized scrolling */}
        <div className="flex-1 overflow-auto p-3 sm:p-6">
          <DocumentContent document={document} />
        </div>

        {/* Footer - Mobile optimized buttons */}
        <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm sm:text-base"
          >
            Close
          </button>
          <button
            onClick={() => alert(`Downloading ${document.name}...`)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

interface DocumentContentProps {
  document: Document;
}

function DocumentContent({ document }: DocumentContentProps) {
  // Import document templates
  switch (document.id) {
    case 'basix':
      return <BasixCertificate />;
    case 'heritage-statement':
      return <HeritageImpactStatement />;
    case 'see':
      return <StatementEnvironmentalEffects />;
    case 'arch-plans':
      return <ArchitecturalPlans />;
    case 'traffic-assessment':
      return <TrafficAssessmentTemplate />;
    case 'arborist-report':
      return <ArboristReportTemplate />;
    case 'stormwater-plan':
      return <StormwaterPlanTemplate />;
    case 'waste-plan':
      return <WasteManagementPlan />;
    case 'da-form':
      return <DAApplicationForm />;
    case 'owner-consent':
      return <OwnerConsentForm />;
    case 'survey-plan':
      return <SurveyPlan />;
    case 'landscape-plan':
      return <LandscapePlan />;
    case 'site-plan':
      return <ArchitecturalSitePlan />;
    case 'floor-plans':
      return <ArchitecturalFloorPlan />;
    case 'elevations':
      return <ArchitecturalElevations />;
    case 'sections':
      return <ArchitecturalSections />;
    case 'shadow-diagrams':
      return <ShadowDiagrams />;
    case 'materials-schedule':
      return <MaterialsFinishesSchedule />;
    case 'acoustic-assessment':
      return <AcousticAssessment />;
    case 'geotechnical':
      return <GeotechnicalReportTemplate />;
    case 'section-88b':
      return <Section88BTemplate />;
    default:
      return <GenericTemplate document={document} />;
  }
}

// Individual document templates will be in separate files
function GenericTemplate({ document }: { document: Document }) {
  return (
    <div className="prose max-w-none">
      <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
        <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg text-slate-700 mb-2">{document.name}</h3>
        <p className="text-slate-600 mb-4">{document.description}</p>
        {document.uploaded ? (
          <p className="text-sm text-green-600">
            ✓ Document uploaded: {document.uploadDate}
          </p>
        ) : (
          <p className="text-sm text-amber-600">
            Template available - Upload your completed version
          </p>
        )}
      </div>
    </div>
  );
}

// Template components (placeholders for documents not yet implemented)
function ArchitecturalPlans() {
  return (
    <div className="bg-white">
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-2 bg-purple-600 text-white rounded mb-4">
          Architectural Plans Preview
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        This is a preview. Actual architectural plans will be loaded here.
      </p>
    </div>
  );
}