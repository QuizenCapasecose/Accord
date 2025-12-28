import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { TopNavigation } from './TopNavigation';
import { DAStageSelector } from './DAStageSelector';
import { QualityMenu } from './QualityMenu';
import { ProjectsHome } from './ProjectsHome';
import { CompliancePanel } from './CompliancePanel';
import { KPIDashboard } from './KPIDashboard';
import { RFIManagement } from './RFIManagement';
import { ConditionsPanel } from './ConditionsPanel';
import { PreLodgementView } from './PreLodgementView';
import { LodgementView } from './LodgementView';
import { AssessmentView } from './AssessmentView';
import { DeterminationView } from './DeterminationView';
import { PostConsentView } from './PostConsentView';
import { DocumentLibrary } from './DocumentLibrary';
import { ProjectSetup } from './ProjectSetup';

type DAStage = 'pre-lodgement' | 'lodgement' | 'assessment' | 'determination' | 'post-consent';
type QualityView = 'compliance' | 'kpi' | 'rfi' | 'conditions';

export function Dashboard() {
  const { selectedProject, selectProject } = useProject();
  const [topTab, setTopTab] = useState<'projects' | 'documents' | 'quality'>('projects');
  const [selectedStage, setSelectedStage] = useState<DAStage>('pre-lodgement');
  const [qualityView, setQualityView] = useState<QualityView>('compliance');
  const [showSetup, setShowSetup] = useState(false);

  // Show project setup wizard
  if (showSetup) {
    return (
      <ProjectSetup 
        onComplete={() => {
          setShowSetup(false);
          setTopTab('projects');
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pb-6">
      {/* Top Navigation - Shows stages when project is selected, otherwise just logo */}
      <TopNavigation 
        selectedStage={selectedStage}
        onStageSelect={setSelectedStage}
        showStages={topTab === 'projects' && !!selectedProject}
      />
      
      {/* Tab Navigation - Shows when project is selected */}
      {selectedProject && (
        <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex items-center gap-1 overflow-x-auto">
              <button
                onClick={() => setTopTab('projects')}
                className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base whitespace-nowrap transition-all ${
                  topTab === 'projects'
                    ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                🏗️ Project Stages
              </button>
              <button
                onClick={() => setTopTab('documents')}
                className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base whitespace-nowrap transition-all ${
                  topTab === 'documents'
                    ? 'text-purple-600 border-b-4 border-purple-600 bg-purple-50'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                📄 Documents
              </button>
              <button
                onClick={() => setTopTab('quality')}
                className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base whitespace-nowrap transition-all ${
                  topTab === 'quality'
                    ? 'text-green-600 border-b-4 border-green-600 bg-green-50'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                ✅ Quality
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Projects Tab */}
      {topTab === 'projects' && (
        <>
          {!selectedProject ? (
            <ProjectsHome 
              onStartDAJourney={() => setShowSetup(true)}
              onNavigate={setTopTab}
            />
          ) : (
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
              {/* Back to Projects List - Mobile optimized */}
              <button
                onClick={() => selectProject(null)}
                className="mb-4 sm:mb-6 px-4 py-2.5 bg-white text-slate-700 rounded-lg hover:shadow-md transition-all flex items-center gap-2 font-semibold text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
              >
                ← Back to Projects List
              </button>

              {/* DA Stage Selector */}
              <DAStageSelector 
                selectedStage={selectedStage}
                onStageSelect={setSelectedStage}
              />

              {/* Stage Content */}
              <div>
                {selectedStage === 'pre-lodgement' && <PreLodgementView />}
                {selectedStage === 'lodgement' && <LodgementView />}
                {selectedStage === 'assessment' && <AssessmentView />}
                {selectedStage === 'determination' && <DeterminationView />}
                {selectedStage === 'post-consent' && <PostConsentView />}
              </div>
            </div>
          )}
        </>
      )}

      {/* Documents Tab */}
      {topTab === 'documents' && (
        <>
          {!selectedProject ? (
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-12 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl">📄</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">No Project Selected</h2>
                <p className="text-sm sm:text-base text-slate-600 mb-6">
                  Select a project from the Projects tab or start a new DA journey to access documents.
                </p>
                <button
                  onClick={() => setTopTab('projects')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all w-full sm:w-auto"
                >
                  Go to Projects
                </button>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
              <button
                onClick={() => selectProject(null)}
                className="mb-4 sm:mb-6 px-4 py-2.5 bg-white text-slate-700 rounded-lg hover:shadow-md transition-all flex items-center gap-2 font-semibold text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
              >
                ← Back to Projects List
              </button>
              <DocumentLibrary />
            </div>
          )}
        </>
      )}

      {/* Quality Tab */}
      {topTab === 'quality' && (
        <>
          {!selectedProject ? (
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-12 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl">⚡</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">No Project Selected</h2>
                <p className="text-sm sm:text-base text-slate-600 mb-6">
                  Select a project from the Projects tab to view quality metrics, compliance scores, KPIs, and RFI tracking.
                </p>
                <button
                  onClick={() => setTopTab('projects')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all w-full sm:w-auto"
                >
                  Go to Projects
                </button>
              </div>
            </div>
          ) : (
            <>
              <QualityMenu activeView={qualityView} onViewChange={setQualityView} />
              
              <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
                <button
                  onClick={() => selectProject(null)}
                  className="mb-4 sm:mb-6 px-4 py-2.5 bg-white text-slate-700 rounded-lg hover:shadow-md transition-all flex items-center gap-2 font-semibold text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
                >
                  ← Back to Projects List
                </button>

                {qualityView === 'compliance' && (
                  <div className="max-w-2xl mx-auto">
                    <CompliancePanel />
                  </div>
                )}
                {qualityView === 'kpi' && <KPIDashboard />}
                {qualityView === 'rfi' && <RFIManagement />}
                {qualityView === 'conditions' && <ConditionsPanel />}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}