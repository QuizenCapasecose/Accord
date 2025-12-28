import { useProject, Condition } from '../context/ProjectContext';
import { CheckCircle2, Circle, Clock, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function ConditionsPanel() {
  const { project, updateCondition, addCondition } = useProject();
  const [expandedCategory, setExpandedCategory] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Sample conditions data (would come from determination letter)
  const sampleConditions: Condition[] = project.conditions.length === 0 ? [
    {
      id: 'cond1',
      number: '1',
      category: 'Pre-Construction',
      requirement: 'Detailed design plans prepared by registered architect to be submitted to Principal Certifier',
      trigger: 'Before Construction Certificate',
      responsible: 'MetroBuild',
      status: 'not-started'
    },
    {
      id: 'cond2',
      number: '2',
      category: 'Pre-Construction',
      requirement: 'Acoustic treatments as per approved Acoustic Assessment Report to be installed',
      trigger: 'Before Construction Certificate',
      responsible: 'MetroBuild',
      status: 'not-started'
    },
    {
      id: 'cond3',
      number: '3',
      category: 'Pre-Construction',
      requirement: 'Stormwater and WSUD system design certification by hydraulic engineer',
      trigger: 'Before Construction Certificate',
      responsible: 'MetroBuild',
      status: 'not-started'
    },
    {
      id: 'cond4',
      number: '4',
      category: 'During Construction',
      requirement: 'Erosion and sediment control measures to be maintained throughout construction',
      trigger: 'Throughout construction',
      responsible: 'Site Manager',
      status: 'not-started'
    },
    {
      id: 'cond5',
      number: '5',
      category: 'During Construction',
      requirement: 'Tree protection fencing to be erected prior to commencement and maintained',
      trigger: 'Before work commences',
      responsible: 'Site Manager',
      status: 'not-started'
    },
    {
      id: 'cond6',
      number: '6',
      category: 'During Construction',
      requirement: 'Construction hours: Monday-Friday 7am-6pm, Saturday 8am-1pm, no work Sundays/Public Holidays',
      trigger: 'Throughout construction',
      responsible: 'Site Manager',
      status: 'not-started'
    },
    {
      id: 'cond7',
      number: '7',
      category: 'Pre-Occupation',
      requirement: 'Waste Management Plan implementation report to be submitted to Council',
      trigger: 'Before Occupation Certificate',
      responsible: 'MetroBuild',
      status: 'not-started'
    },
    {
      id: 'cond8',
      number: '8',
      category: 'Pre-Occupation',
      requirement: 'As-built stormwater drainage plans certified by hydraulic engineer',
      trigger: 'Before Occupation Certificate',
      responsible: 'Certifier',
      status: 'not-started'
    },
    {
      id: 'cond9',
      number: '9',
      category: 'Ongoing',
      requirement: 'Stormwater system to be maintained in accordance with approved maintenance schedule',
      trigger: 'Perpetual',
      responsible: 'Owner',
      status: 'not-started'
    },
    {
      id: 'cond10',
      number: '10',
      category: 'Ongoing',
      requirement: 'Annual fire safety statement to be submitted to Council',
      trigger: 'Annually',
      responsible: 'Owner',
      status: 'not-started'
    }
  ] : project.conditions;

  // Initialize conditions if empty
  if (project.conditions.length === 0) {
    sampleConditions.forEach(cond => {
      addCondition(cond);
    });
  }

  const conditions = project.conditions.length > 0 ? project.conditions : sampleConditions;

  const categories = Array.from(new Set(conditions.map(c => c.category)));

  const getStatusIcon = (status: Condition['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'verified':
        return <CheckCircle2 className="w-5 h-5 text-green-700" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: Condition['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'verified':
        return 'bg-green-200 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getCategoryProgress = (category: string) => {
    const categoryConditions = conditions.filter(c => c.category === category);
    const completed = categoryConditions.filter(c => c.status === 'completed' || c.status === 'verified').length;
    return Math.round((completed / categoryConditions.length) * 100);
  };

  return (
    <div className="container mx-auto p-6 max-w-[1400px]">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Conditions of Consent</h1>
        <p className="text-slate-600">
          Track and manage all development approval conditions
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Total Conditions</span>
            <AlertCircle className="w-5 h-5 text-slate-600" />
          </div>
          <div className="text-3xl">{conditions.length}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Not Started</span>
            <Circle className="w-5 h-5 text-slate-400" />
          </div>
          <div className="text-3xl">{conditions.filter(c => c.status === 'not-started').length}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">In Progress</span>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl">{conditions.filter(c => c.status === 'in-progress').length}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Completed</span>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl">{conditions.filter(c => c.status === 'completed').length}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Verified</span>
            <CheckCircle2 className="w-5 h-5 text-green-700" />
          </div>
          <div className="text-3xl">{conditions.filter(c => c.status === 'verified').length}</div>
        </div>
      </div>

      {/* Conditions by Category */}
      <div className="space-y-4">
        {categories.map(category => {
          const categoryConditions = conditions.filter(c => c.category === category);
          const progress = getCategoryProgress(category);
          const isExpanded = expandedCategory === category;

          return (
            <div key={category} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? '' : category)}
                className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  )}
                  <div className="text-left">
                    <div className="text-lg">{category}</div>
                    <div className="text-sm text-slate-500">{categoryConditions.length} conditions</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-sm text-slate-600">{progress}% complete</div>
                  <div className="w-32 bg-slate-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        progress === 100
                          ? 'bg-green-600'
                          : progress > 0
                          ? 'bg-blue-600'
                          : 'bg-slate-400'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 space-y-3 bg-white">
                  {categoryConditions.map(condition => (
                    <div
                      key={condition.id}
                      className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-sm">
                          #{condition.number}
                        </div>

                        <div className="flex-1">
                          <div className="text-sm mb-2">{condition.requirement}</div>
                          
                          <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                            <div>
                              <span className="text-slate-500">Trigger:</span> {condition.trigger}
                            </div>
                            <div>
                              <span className="text-slate-500">Responsible:</span> {condition.responsible}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <select
                            value={condition.status}
                            onChange={(e) => updateCondition(condition.id, { status: e.target.value as Condition['status'] })}
                            className={`px-3 py-2 rounded-lg border text-xs cursor-pointer ${getStatusColor(condition.status)}`}
                          >
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="verified">Verified</option>
                          </select>
                          
                          {getStatusIcon(condition.status)}
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

      {/* Critical Pre-Construction Conditions Alert */}
      <div className="mt-6 bg-amber-50 rounded-lg border border-amber-200 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg text-amber-900 mb-2">Pre-Construction Conditions Alert</h3>
            <p className="text-sm text-amber-700 mb-3">
              {conditions.filter(c => c.category === 'Pre-Construction' && c.status === 'not-started').length} conditions
              must be satisfied before Construction Certificate can be issued.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm">
                View Pre-Construction Checklist
              </button>
              <button className="px-4 py-2 border border-amber-600 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors text-sm">
                Generate Action Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
