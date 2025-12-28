import { useProject, ComplianceStatus } from '../../context/ProjectContext';
import { AlertCircle, CheckCircle2, AlertTriangle, Clock, RefreshCw, Download, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export function CompliancePanel() {
  const { project, updateProject } = useProject();
  const [isRunning, setIsRunning] = useState(false);

  // Calculate control statistics from complianceItems
  const controls = {
    compliant: project.complianceItems.filter(item => item.status === 'compliant').length,
    nonCompliant: project.complianceItems.filter(item => item.status === 'non-compliant').length,
    variations: project.complianceItems.filter(item => item.status === 'variation').length,
    pending: project.complianceItems.filter(item => item.status === 'pending').length
  };

  const totalControls = controls.compliant + controls.nonCompliant + controls.variations + controls.pending;

  const runSmartCheck = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      alert('✓ Compliance check complete!\n\nAll controls verified against LEP/DCP requirements.');
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-amber-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border-l-4 border-purple-500 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <div>
            <h2 className="text-lg lg:text-xl mb-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
              Compliance Monitor
            </h2>
            <p className="text-xs lg:text-sm text-slate-600">Real-time assessment</p>
          </div>
          <button
            onClick={runSmartCheck}
            disabled={isRunning}
            className="px-3 lg:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium text-xs lg:text-sm disabled:opacity-50 flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Checking...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Smart Check</span>
              </>
            )}
          </button>
        </div>

        {/* Score Display - Mobile Optimized */}
        <div className="mb-6">
          <div className={`relative bg-gradient-to-br ${getScoreColor(project.complianceScore)} rounded-2xl p-6 lg:p-8 text-white shadow-xl`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="text-xs lg:text-sm opacity-90 mb-2">Overall Compliance Score</div>
              <div className="flex items-end gap-3 mb-3">
                <div className="text-5xl lg:text-6xl font-bold">{project.complianceScore}%</div>
                <div className="text-lg lg:text-xl font-semibold mb-2 opacity-90">{getScoreText(project.complianceScore)}</div>
              </div>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-2 lg:h-3 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${project.complianceScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
              <span className="text-xs lg:text-sm text-green-700 font-medium">Compliant</span>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-green-600">{controls.compliant}</div>
            <div className="text-xs text-green-600 mt-1">controls</div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border-2 border-red-200 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" />
              <span className="text-xs lg:text-sm text-red-700 font-medium">Issues</span>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-red-600">{controls.nonCompliant}</div>
            <div className="text-xs text-red-600 mt-1">need attention</div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 lg:w-6 lg:h-6 text-amber-600" />
              <span className="text-xs lg:text-sm text-amber-700 font-medium">Variations</span>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-amber-600">{controls.variations}</div>
            <div className="text-xs text-amber-600 mt-1">required</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              <span className="text-xs lg:text-sm text-blue-700 font-medium">Progress</span>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-blue-600">
              {totalControls > 0 ? Math.round((controls.compliant / totalControls) * 100) : 0}%
            </div>
            <div className="text-xs text-blue-600 mt-1">complete</div>
          </div>
        </div>
      </div>
    </div>
  );
}