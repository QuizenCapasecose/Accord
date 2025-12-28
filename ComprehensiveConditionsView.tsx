import { useState } from 'react';
import { FileText, ChevronDown, ChevronRight, Eye, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Condition {
  code: string;
  title: string;
  description: string;
  templateName: string;
  status: 'not-started' | 'in-progress' | 'complete';
}

interface Phase {
  id: string;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  conditions: Condition[];
}

const allPhases: Phase[] = [
  {
    id: 'A',
    title: 'A. Prior to Construction Certificate',
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    conditions: [
      {
        code: 'A1',
        title: 'Construction Certificate',
        description: 'CC must reflect DA consent, approved plans, and NCC/BCA.',
        templateName: 'CC Checklist Template',
        status: 'in-progress'
      },
      {
        code: 'A2',
        title: 'Erosion & Sediment Control Plan',
        description: 'ESC plan to be prepared, approved and installed before works.',
        templateName: 'ESC Plan Template',
        status: 'complete'
      },
      {
        code: 'A3',
        title: 'Stormwater and OSD Approval',
        description: 'Stormwater/OSD design certified and consistent with council policy.',
        templateName: 'Stormwater & WSUD Template',
        status: 'in-progress'
      },
      {
        code: 'A4',
        title: 'BASIX & Energy Compliance',
        description: 'All BASIX commitments integrated into construction drawings.',
        templateName: 'BASIX Summary Template',
        status: 'not-started'
      },
      {
        code: 'A5',
        title: 'Section 7.11 / 7.12 Contributions & Fees',
        description: 'Developer contributions and any required council fees paid.',
        templateName: 'Contributions & Fee Summary Template',
        status: 'not-started'
      }
    ]
  },
  {
    id: 'B',
    title: 'B. Prior to Commencement of Works',
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    conditions: [
      {
        code: 'B1',
        title: 'Appointment of Principal Certifier',
        description: 'PC engaged and notified to council.',
        templateName: 'PC Appointment Template',
        status: 'not-started'
      },
      {
        code: 'B2',
        title: 'Notice of Commencement',
        description: 'Statutory notice given via Planning Portal before work starts.',
        templateName: 'Commencement Notification Steps',
        status: 'not-started'
      },
      {
        code: 'B3',
        title: 'Erosion, Sediment & Tree Protection Installed',
        description: 'ESC controls and tree protection fencing installed on site (photo proof).',
        templateName: 'On-Site Setup Checklist',
        status: 'not-started'
      },
      {
        code: 'B4',
        title: 'Hoarding & Site Fencing Plan',
        description: 'Hoarding/fencing compliant with council and Work Health & Safety.',
        templateName: 'Hoarding & Fencing Template',
        status: 'complete'
      }
    ]
  },
  {
    id: 'C',
    title: 'C. During Construction',
    color: 'amber',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    conditions: [
      {
        code: 'C1',
        title: 'Compliance with Approved Plans',
        description: 'Works to match stamped plans and conditions; variations recorded.',
        templateName: 'Plan Change / Amendment Log',
        status: 'not-started'
      },
      {
        code: 'C2',
        title: 'Waste Management Plan Implementation',
        description: 'Construction waste separated, recycling targets met, dockets kept.',
        templateName: 'Waste Management Template',
        status: 'not-started'
      },
      {
        code: 'C3',
        title: 'Working Hours & Nuisance Control',
        description: 'Work hours, noise, dust, access in line with conditions and legislation.',
        templateName: 'Site Behaviour Checklist',
        status: 'not-started'
      },
      {
        code: 'C4',
        title: 'Unforeseen Issues (Heritage/Contamination)',
        description: 'Stop-work and notify if unexpected finds occur.',
        templateName: 'Unexpected Finds Procedure',
        status: 'not-started'
      }
    ]
  },
  {
    id: 'D',
    title: 'D. Prior to Occupation Certificate',
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    conditions: [
      {
        code: 'D1',
        title: 'As-built Stormwater/OSD & Certifications',
        description: 'As-built plans and engineer sign-off; systems operational.',
        templateName: 'As-Built Certification Template',
        status: 'not-started'
      },
      {
        code: 'D2',
        title: 'Landscaping & Tree Planting Complete',
        description: 'Landscaping, deep soil, canopy trees installed and alive.',
        templateName: 'Landscape Completion Checklist',
        status: 'not-started'
      },
      {
        code: 'D3',
        title: 'Driveway, Access & Parking Complete',
        description: 'Crossovers and parking built to council standard.',
        templateName: 'Driveway & Parking Sign-off Template',
        status: 'not-started'
      },
      {
        code: 'D4',
        title: 'Essential Services & Certificates',
        description: 'All compliance certificates (electrical, plumbing, fire, BASIX).',
        templateName: 'OC Documentation Checklist',
        status: 'not-started'
      }
    ]
  },
  {
    id: 'E',
    title: 'E. Ongoing / Operational',
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    conditions: [
      {
        code: 'E1',
        title: 'Ongoing Use & Maintenance',
        description: 'Premises used in accordance with consent; WSUD, landscaping and waste managed.',
        templateName: 'Ongoing Obligations Summary',
        status: 'not-started'
      }
    ]
  }
];

interface ComprehensiveConditionsViewProps {
  onViewTemplate: (templateName: string) => void;
}

export function ComprehensiveConditionsView({ onViewTemplate }: ComprehensiveConditionsViewProps) {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['A']);

  const togglePhase = (phaseId: string) => {
    if (expandedPhases.includes(phaseId)) {
      setExpandedPhases(expandedPhases.filter(id => id !== phaseId));
    } else {
      setExpandedPhases([...expandedPhases, phaseId]);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-amber-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">COMPLETE</span>;
      case 'in-progress':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">IN PROGRESS</span>;
      default:
        return <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">NOT STARTED</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">All 18 Conditions of Consent</h2>
        <p className="text-slate-600">3-Level Structure: Phase → Condition Code → Template Link</p>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <div className="text-sm text-slate-600 mb-1">Complete</div>
          <div className="text-3xl font-bold text-green-600">2</div>
          <div className="text-xs text-slate-500 mt-1">conditions satisfied</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-amber-500">
          <div className="text-sm text-slate-600 mb-1">In Progress</div>
          <div className="text-3xl font-bold text-amber-600">2</div>
          <div className="text-xs text-slate-500 mt-1">currently working on</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-slate-300">
          <div className="text-sm text-slate-600 mb-1">Not Started</div>
          <div className="text-3xl font-bold text-slate-600">14</div>
          <div className="text-xs text-slate-500 mt-1">upcoming conditions</div>
        </div>
      </div>

      {/* Phases */}
      {allPhases.map((phase) => {
        const isExpanded = expandedPhases.includes(phase.id);
        const completedCount = phase.conditions.filter(c => c.status === 'complete').length;
        const inProgressCount = phase.conditions.filter(c => c.status === 'in-progress').length;
        const totalCount = phase.conditions.length;

        return (
          <div key={phase.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-slate-200">
            {/* Phase Header */}
            <button
              onClick={() => togglePhase(phase.id)}
              className={`w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors ${phase.bgColor} border-l-8 ${phase.borderColor}`}
            >
              <div className="flex items-center gap-4 flex-1">
                {isExpanded ? (
                  <ChevronDown className={`w-6 h-6 text-${phase.color}-600 flex-shrink-0`} />
                ) : (
                  <ChevronRight className="w-6 h-6 text-slate-400 flex-shrink-0" />
                )}
                <div className="text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{phase.title}</h3>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-sm text-slate-600">
                      {totalCount} {totalCount === 1 ? 'condition' : 'conditions'}
                    </span>
                    {completedCount > 0 && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        ✓ {completedCount} Complete
                      </span>
                    )}
                    {inProgressCount > 0 && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                        ⏱ {inProgressCount} In Progress
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="hidden sm:block ml-4">
                <div className="w-32 bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 bg-${phase.color}-600 rounded-full transition-all`}
                    style={{ width: `${(completedCount / totalCount) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-600 mt-1 text-center">
                  {completedCount}/{totalCount}
                </div>
              </div>
            </button>

            {/* Conditions List */}
            {isExpanded && (
              <div className="divide-y divide-slate-200">
                {phase.conditions.map((condition) => (
                  <div
                    key={condition.code}
                    className="px-6 py-5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Status Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(condition.status)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <span className="px-3 py-1 bg-slate-800 text-white text-sm font-bold rounded-lg">
                                {condition.code}
                              </span>
                              <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                                {condition.title}
                              </h4>
                            </div>
                            <p className="text-sm text-slate-700 mb-3">
                              {condition.description}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            {getStatusBadge(condition.status)}
                          </div>
                        </div>

                        {/* Template Button */}
                        <button
                          onClick={() => onViewTemplate(condition.templateName)}
                          className={`px-4 py-2 bg-gradient-to-r from-${phase.color}-500 to-${phase.color}-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm font-semibold`}
                        >
                          <Eye className="w-4 h-4" />
                          View {condition.templateName}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
