import { useState } from 'react';
import { CheckCircle2, Clock, FileText, AlertCircle, CheckSquare } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export function PostConsentView() {
  const { project } = useProject();
  const [conditions, setConditions] = useState([
    { id: 1, code: 'A1', title: 'Construction Certificate', status: 'in-progress', progress: 75 },
    { id: 2, code: 'A2', title: 'Erosion & Sediment Control Plan', status: 'completed', progress: 100 },
    { id: 3, code: 'A3', title: 'Hoarding & Site Fencing', status: 'completed', progress: 100 },
    { id: 4, code: 'A4', title: 'Long Service Levy', status: 'completed', progress: 100 },
    { id: 5, code: 'A5', title: 'Dilapidation Report', status: 'in-progress', progress: 50 },
    { id: 6, code: 'A6', title: 'Waste Management Plan', status: 'not-started', progress: 0 },
  ]);

  const completedCount = conditions.filter(c => c.status === 'completed').length;
  const totalCount = conditions.length;
  const overallProgress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="container mx-auto p-4 lg:p-6 max-w-[1400px]">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-6 lg:p-8 mb-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xl">🏗️</span>
              </div>
              <span className="text-sm opacity-90">Stage 5 of 5</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Post-Consent Phase</h1>
            <p className="text-sm lg:text-base opacity-90">
              Complete pre-construction conditions and obtain Construction Certificate
            </p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Pre-Construction Conditions Progress</span>
            <span className="font-bold">{completedCount}/{totalCount} Complete</span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Progress Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h3 className="font-bold text-slate-800">Completed</h3>
          </div>
          <div className="text-3xl font-bold text-green-600">{completedCount}</div>
          <p className="text-sm text-slate-600">conditions satisfied</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-amber-600" />
            <h3 className="font-bold text-slate-800">In Progress</h3>
          </div>
          <div className="text-3xl font-bold text-amber-600">
            {conditions.filter(c => c.status === 'in-progress').length}
          </div>
          <p className="text-sm text-slate-600">actively working on</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-slate-800">Not Started</h3>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {conditions.filter(c => c.status === 'not-started').length}
          </div>
          <p className="text-sm text-slate-600">pending action</p>
        </div>
      </div>

      {/* Conditions Tracker */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Pre-Construction Conditions Tracker</h2>
        
        <div className="space-y-4">
          {conditions.map((condition) => (
            <div
              key={condition.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                condition.status === 'completed'
                  ? 'bg-green-50 border-green-200'
                  : condition.status === 'in-progress'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  condition.status === 'completed'
                    ? 'bg-green-500 text-white'
                    : condition.status === 'in-progress'
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-300 text-slate-600'
                }`}>
                  {condition.status === 'completed' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : condition.status === 'in-progress' ? (
                    <Clock className="w-6 h-6" />
                  ) : (
                    <AlertCircle className="w-6 h-6" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          condition.status === 'completed'
                            ? 'bg-green-600 text-white'
                            : condition.status === 'in-progress'
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-600 text-white'
                        }`}>
                          {condition.code}
                        </span>
                        <span className="font-bold text-slate-800">{condition.title}</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        {condition.status === 'completed' && 'Documentation submitted and approved'}
                        {condition.status === 'in-progress' && 'Currently preparing required documentation'}
                        {condition.status === 'not-started' && 'Awaiting action - review requirements'}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`text-2xl font-bold ${
                        condition.status === 'completed'
                          ? 'text-green-600'
                          : condition.status === 'in-progress'
                          ? 'text-amber-600'
                          : 'text-slate-400'
                      }`}>
                        {condition.progress}%
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        condition.status === 'completed'
                          ? 'bg-green-500'
                          : condition.status === 'in-progress'
                          ? 'bg-amber-500'
                          : 'bg-slate-400'
                      }`}
                      style={{ width: `${condition.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Construction Certificate Status */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-purple-500">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Construction Certificate Application</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">Certifier Engaged</h3>
              <p className="text-sm text-slate-600">BuildCert Pty Ltd - Principal Certifying Authority</p>
            </div>
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>

          <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-white">
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">CC Documentation in Progress</h3>
              <p className="text-sm text-slate-600">Structural calculations and compliance reports being prepared</p>
            </div>
            <div className="text-amber-600 font-bold">75%</div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="w-12 h-12 bg-slate-400 rounded-lg flex items-center justify-center text-white">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">CC Lodgement</h3>
              <p className="text-sm text-slate-600">Expected submission: Within 2 weeks</p>
            </div>
            <div className="text-slate-400 font-bold">Pending</div>
          </div>
        </div>
      </div>

      {/* Next Milestones */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">🎯 Upcoming Milestones</h2>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-slate-700">
            <CheckSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span>Complete remaining pre-construction conditions (A5, A6)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <CheckSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span>Submit Construction Certificate application</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <CheckSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span>Obtain CC approval from certifier</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <CheckSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span>Schedule Pre-Construction meeting with Council</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <CheckSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span>Commence construction works 🎉</span>
          </div>
        </div>
      </div>
    </div>
  );
}
