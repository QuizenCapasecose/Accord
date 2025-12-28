import { useState } from 'react';
import { Plus, Search, Building2, Clock, TrendingUp } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

interface ProjectsListProps {
  onProjectSelect: (projectId: string) => void;
  onAddProject: () => void;
}

export function ProjectsList({ onProjectSelect, onAddProject }: ProjectsListProps) {
  const { projects } = useProject();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.daNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageDisplay = (stage: string) => {
    const stages = {
      'pre-lodgement': { name: 'Pre-Lodgement', emoji: '🔍', color: 'bg-blue-100 text-blue-700' },
      'lodgement': { name: 'Lodgement', emoji: '📤', color: 'bg-purple-100 text-purple-700' },
      'assessment': { name: 'Assessment', emoji: '⚖️', color: 'bg-amber-100 text-amber-700' },
      'determination': { name: 'Determination', emoji: '✅', color: 'bg-green-100 text-green-700' },
      'post-consent': { name: 'Post-Consent', emoji: '🏗️', color: 'bg-indigo-100 text-indigo-700' }
    };
    return stages[stage as keyof typeof stages] || stages['pre-lodgement'];
  };

  const getTimelineStatus = (daysElapsed: number, targetDays: number) => {
    const percentage = (daysElapsed / targetDays) * 100;
    if (percentage < 50) return { status: 'On Track', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage < 80) return { status: 'Monitor', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { status: 'At Risk', color: 'text-red-600', bg: 'bg-red-50' };
  };

  return (
    <div className="container mx-auto p-4 lg:p-6 max-w-[1800px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 lg:p-8 mb-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Projects Dashboard</h1>
            <p className="text-sm lg:text-base opacity-90">
              Manage all development applications in one place
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{projects.length}</div>
              <div className="text-sm opacity-90">Active Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by project name, address, or DA number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  DA Number
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Current Phase
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  % Complete
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Compliance
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <Building2 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="text-lg font-semibold mb-1">No projects found</p>
                    <p className="text-sm">Try adjusting your search or add a new project</p>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const stage = getStageDisplay(project.currentStage);
                  const timeline = getTimelineStatus(project.daysElapsed, project.targetDays);
                  
                  return (
                    <tr 
                      key={project.projectId} 
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => onProjectSelect(project.projectId)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{project.projectName}</div>
                            <div className="text-sm text-slate-500">{project.address}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-slate-700">{project.daNumber}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold ${stage.color}`}>
                          <span>{stage.emoji}</span>
                          {stage.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                                style={{ width: `${project.completionPercent}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-slate-700 w-12 text-right">
                            {project.completionPercent}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${timeline.bg}`}>
                          <Clock className={`w-4 h-4 ${timeline.color}`} />
                          <div className="text-sm">
                            <div className={`font-semibold ${timeline.color}`}>{timeline.status}</div>
                            <div className="text-xs text-slate-600">
                              {project.daysElapsed}/{project.targetDays} days
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className={`w-4 h-4 ${
                            project.complianceScore >= 90 ? 'text-green-600' : 
                            project.complianceScore >= 70 ? 'text-amber-600' : 
                            'text-red-600'
                          }`} />
                          <span className={`font-semibold ${
                            project.complianceScore >= 90 ? 'text-green-600' : 
                            project.complianceScore >= 70 ? 'text-amber-600' : 
                            'text-red-600'
                          }`}>
                            {project.complianceScore}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onProjectSelect(project.projectId);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Project Button */}
      <div className="flex justify-center">
        <button
          onClick={onAddProject}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center gap-3"
        >
          <Plus className="w-6 h-6" />
          Add New Project
        </button>
      </div>
    </div>
  );
}