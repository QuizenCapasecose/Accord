import { useState } from 'react';
import { Building2, Clock, TrendingUp, CheckCircle, AlertCircle, ChevronRight, FileText, Award } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import metrobuildLogo from 'figma:asset/f8aebd494fed2b240b18d96fa58580082a3044ab.png';

interface ProjectsHomeProps {
  onStartDAJourney: () => void;
  onNavigate?: (tab: 'projects' | 'documents' | 'quality') => void;
}

export function ProjectsHome({ onStartDAJourney, onNavigate }: ProjectsHomeProps) {
  const { projects, selectProject } = useProject();
  const [selectedStageInfo, setSelectedStageInfo] = useState<string | null>(null);
  const [showProjectsList, setShowProjectsList] = useState(false);

  const getStageDisplay = (stage: string) => {
    const stages = {
      'pre-lodgement': { name: 'Pre-Lodgement', emoji: '🔍', color: 'bg-blue-500' },
      'lodgement': { name: 'Lodgement', emoji: '📤', color: 'bg-purple-500' },
      'assessment': { name: 'Assessment', emoji: '⚖️', color: 'bg-amber-500' },
      'determination': { name: 'Determination', emoji: '✅', color: 'bg-green-500' },
      'post-consent': { name: 'Post-Consent', emoji: '🏗️', color: 'bg-indigo-500' }
    };
    return stages[stage as keyof typeof stages] || stages['pre-lodgement'];
  };

  const getTimelineStatus = (daysElapsed: number, targetDays: number) => {
    const percentage = (daysElapsed / targetDays) * 100;
    if (percentage < 50) return { status: 'On Track', color: 'text-green-600', icon: CheckCircle };
    if (percentage < 80) return { status: 'Monitor', color: 'text-amber-600', icon: Clock };
    return { status: 'At Risk', color: 'text-red-600', icon: AlertCircle };
  };

  // Calculate KPIs
  const totalProjects = projects.length;
  const avgComplianceScore = projects.length > 0 
    ? Math.round(projects.reduce((sum, p) => sum + p.complianceScore, 0) / projects.length)
    : 0;
  const avgCompletionPercent = projects.length > 0
    ? Math.round(projects.reduce((sum, p) => sum + p.completionPercent, 0) / projects.length)
    : 0;
  const onTrackProjects = projects.filter(p => {
    const percentage = (p.daysElapsed / p.targetDays) * 100;
    return percentage < 50;
  }).length;

  const stages = [
    {
      id: 'pre-lodgement',
      name: 'Pre-Lodgement',
      emoji: '🔍',
      description: 'Initial planning, compliance checking, and document preparation phase',
      keyActivities: [
        'Review Cumberland LEP 2021 and DCP 2021 controls',
        'Complete compliance assessment against planning controls',
        'Prepare Statement of Environmental Effects',
        'Engage consultants for specialist reports',
        'Complete DA Application Form sections'
      ]
    },
    {
      id: 'lodgement',
      name: 'Lodgement',
      emoji: '📤',
      description: 'Final review and submission of Development Application to Council',
      keyActivities: [
        'Final quality check of all documents',
        'Ensure all required plans and reports are included',
        'Submit via Council portal or in-person',
        'Pay lodgement fees',
        'Receive DA reference number'
      ]
    },
    {
      id: 'assessment',
      name: 'Assessment',
      emoji: '⚖️',
      description: 'Council reviews application and may request additional information',
      keyActivities: [
        'Monitor assessment progress via Council portal',
        'Respond promptly to any RFIs (Requests for Information)',
        'Provide additional documentation if requested',
        'Address any compliance concerns raised',
        'Maintain communication with case officer'
      ]
    },
    {
      id: 'determination',
      name: 'Determination',
      emoji: '✅',
      description: 'Council makes final decision on the Development Application',
      keyActivities: [
        'Review consent conditions carefully',
        'Understand all requirements before construction',
        'Note any deferred commencement conditions',
        'Review expiry dates and timeframes',
        'Plan for Post-Consent stage requirements'
      ]
    },
    {
      id: 'post-consent',
      name: 'Post-Consent',
      emoji: '🏗️',
      description: 'Satisfy conditions of consent before and during construction',
      keyActivities: [
        'Submit Construction Certificate application',
        'Satisfy all pre-construction conditions',
        'Appoint Principal Certifier',
        'Lodge required bonds and insurances',
        'Track ongoing conditions during construction'
      ]
    }
  ];

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="max-w-6xl">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={metrobuildLogo} 
                alt="MetroBuild Group Logo" 
                className="w-20 h-20 object-contain bg-white rounded-2xl p-2"
              />
              <div>
                <h1 className="text-4xl font-bold">MetroBuild Group - DA QMS</h1>
                <p className="text-sm opacity-90">Development Application Quality Management System</p>
              </div>
            </div>
            <p className="text-xl opacity-95 font-[Abhaya_Libre_ExtraBold]">
              Enhanced Submission Quality / Fewer Delays / Increased Stakeholder Engagement
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* MetroBuild Projects Section - MOVED TO TOP */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-800">Your Projects</h2>
            <button
              onClick={onStartDAJourney}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Building2 className="w-5 h-5" />
              Start New DA Journey
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Projects Yet</h3>
              <p className="text-slate-600 mb-6">
                Get started by creating your first Development Application project.
              </p>
              <button
                onClick={onStartDAJourney}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <Building2 className="w-5 h-5" />
                Start New DA Journey
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => {
                const stageInfo = getStageDisplay(project.currentStage);
                const timelineInfo = getTimelineStatus(project.daysElapsed, project.targetDays);
                const TimelineIcon = timelineInfo.icon;
                
                return (
                  <div
                    key={project.projectId}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
                  >
                    <div className="p-6">
                      {/* Project Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
                            {project.projectName}
                          </h3>
                          <p className="text-sm text-slate-600">{project.address}</p>
                        </div>
                      </div>

                      {/* Current Stage Badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${stageInfo.color} text-white rounded-full text-sm font-semibold mb-3`}>
                        <span>{stageInfo.emoji}</span>
                        <span>{stageInfo.name}</span>
                      </div>

                      {/* Progress and Metrics */}
                      <div className="space-y-3 mb-4">
                        {/* Completion Progress */}
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-semibold text-slate-800">{project.completionPercent}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                              style={{ width: `${project.completionPercent}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Compliance Score */}
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Compliance</span>
                            <span className={`font-semibold ${project.complianceScore >= 90 ? 'text-green-600' : project.complianceScore >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                              {project.complianceScore}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${project.complianceScore >= 90 ? 'bg-green-500' : project.complianceScore >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${project.complianceScore}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Timeline Status */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                          <div className="flex items-center gap-2">
                            <TimelineIcon className={`w-5 h-5 ${timelineInfo.color}`} />
                            <span className={`text-sm font-semibold ${timelineInfo.color}`}>
                              {timelineInfo.status}
                            </span>
                          </div>
                          <span className="text-sm text-slate-600">
                            Day {project.daysElapsed} of {project.targetDays}
                          </span>
                        </div>
                      </div>

                      {/* Open Project Button */}
                      <button 
                        onClick={() => {
                          console.log('Opening project:', project.projectName, 'ID:', project.projectId);
                          selectProject(project.projectId);
                        }}
                        className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        Open Project
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mb-8 border-t-4 border-slate-200"></div>

        {/* Three Navigation Buttons - Now Below Projects */}
        {onNavigate && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  console.log('Navigating to Documents tab');
                  onNavigate('documents');
                }}
                className="bg-white border-4 border-purple-500 rounded-2xl p-6 hover:shadow-xl transition-all group active:scale-95"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Documents</h3>
                </div>
                <p className="text-slate-600 text-sm">
                  Access 22+ templates and document library
                </p>
              </button>

              <button
                onClick={() => {
                  console.log('Navigating to Quality tab');
                  onNavigate('quality');
                }}
                className="bg-white border-4 border-green-500 rounded-2xl p-6 hover:shadow-xl transition-all group active:scale-95"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Quality</h3>
                </div>
                <p className="text-slate-600 text-sm">
                  View compliance, KPIs, RFIs, and conditions
                </p>
              </button>

              <button
                onClick={onStartDAJourney}
                className="bg-white border-4 border-blue-500 rounded-2xl p-6 hover:shadow-xl transition-all group active:scale-95"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">New Project</h3>
                </div>
                <p className="text-slate-600 text-sm">
                  Start a new DA journey with guided setup
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mb-8 border-t-4 border-slate-200"></div>

        {/* NSW Government AI Investment Context */}
        <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Why Assessment-Ready DAs Matter</h3>
              <div className="mt-4 p-4 bg-white border-2 border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  This app helps NSW builders lodge <strong>"assessment-ready" DAs and CDCs</strong> that move faster, with fewer surprises. 
                  By enforcing council-specific checklists and automatic LEP/DCP/SEPP checks, it cuts RFIs and costly rework. 
                  Smart pre-lodgement workflows shorten overall approval times and reduce holding costs, while built-in quality management 
                  and continuous improvement features lower the risk of refusals or withdrawals on future projects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 border-t-4 border-slate-200"></div>

        {/* KPI Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-600">Total Projects</div>
                <Building2 className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-slate-800">{totalProjects}</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-600">Avg Compliance</div>
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-600">{avgComplianceScore}%</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-600">Avg Completion</div>
                <CheckCircle className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-purple-600">{avgCompletionPercent}%</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-600">On Track</div>
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div className="text-3xl font-bold text-amber-600">{onTrackProjects}/{totalProjects}</div>
            </div>
          </div>
        </div>

        {/* DA Process Stages Section */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">DA Process Stages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedStageInfo(selectedStageInfo === stage.id ? null : stage.id)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{stage.emoji}</span>
                    <h3 className="font-bold text-lg text-slate-800">{stage.name}</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{stage.description}</p>
                  
                  {selectedStageInfo === stage.id && (
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <h4 className="font-semibold text-sm text-slate-700 mb-2">Key Activities:</h4>
                      <ul className="space-y-2">
                        {stage.keyActivities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                    {selectedStageInfo === stage.id ? 'Show Less' : 'Learn More'}
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedStageInfo === stage.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}