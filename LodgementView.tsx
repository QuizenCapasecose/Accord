import { useState } from 'react';
import { CheckCircle2, AlertCircle, Upload, FileText, ArrowRight, Info } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export function LodgementView() {
  const { project, updateProject } = useProject();
  const [lodged, setLodged] = useState(false);

  const handleLodge = () => {
    setLodged(true);
    // Update project stage
    setTimeout(() => {
      updateProject({ 
        currentStage: 'assessment',
        daysElapsed: 0
      });
      alert('✓ Application successfully lodged!\n\nDA Number: DA-2025-0456\nYour application is now under assessment.');
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 lg:p-6 max-w-[1400px]">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 lg:p-8 mb-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xl">📤</span>
              </div>
              <span className="text-sm opacity-90">Stage 2 of 5</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">DA Lodgement</h1>
            <p className="text-sm lg:text-base opacity-90">
              Submit your application to Cumberland Council via NSW Planning Portal
            </p>
          </div>
        </div>
      </div>

      {/* Pre-Lodgement Checklist */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Pre-Lodgement Checklist</h2>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-slate-800">All required documents uploaded</div>
              <div className="text-sm text-slate-600">15/15 documents complete</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-slate-800">Compliance check passed</div>
              <div className="text-sm text-slate-600">Score: {project.complianceScore}%</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-slate-800">Plans reviewed and approved</div>
              <div className="text-sm text-slate-600">All architectural and engineering plans final</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-slate-800">BASIX Certificate valid</div>
              <div className="text-sm text-slate-600">Certificate: 1234567A_01</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-slate-800">Council fees calculated</div>
              <div className="text-sm text-slate-600">$12,450 (ready to pay online)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lodgement Process */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Lodgement Process</h2>
        
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center mb-3 font-bold">
              1
            </div>
            <h3 className="font-bold text-slate-800 mb-2">NSW Planning Portal</h3>
            <p className="text-sm text-slate-600">
              Submit via official NSW Government portal
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
            <div className="w-10 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-3 font-bold">
              2
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Upload Documents</h3>
            <p className="text-sm text-slate-600">
              System will auto-upload all documents
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
            <div className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center mb-3 font-bold">
              3
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Payment & Confirmation</h3>
            <p className="text-sm text-slate-600">
              Pay fees and receive DA number
            </p>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg mb-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <strong>Important:</strong> Once lodged, the 40-day assessment clock starts. 
              Council has up to 40 days to assess straightforward applications (can be extended to 90 days for complex projects).
            </div>
          </div>
        </div>

        {/* Lodge Button */}
        {!lodged ? (
          <button
            onClick={handleLodge}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center justify-center gap-3"
          >
            <Upload className="w-6 h-6" />
            Lodge Application to Council
            <ArrowRight className="w-6 h-6" />
          </button>
        ) : (
          <div className="p-6 bg-green-50 border-2 border-green-500 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-xl font-bold text-green-800">Application Lodged Successfully!</div>
                <div className="text-sm text-green-700">DA Number: DA-2025-0456 assigned</div>
              </div>
            </div>
            <div className="text-sm text-green-700">
              Redirecting to Assessment stage...
            </div>
          </div>
        )}
      </div>

      {/* What Happens Next */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">What Happens Next?</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📋</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Council Assessment</h3>
              <p className="text-sm text-slate-600">
                Assigned planning officer will review your application against LEP/DCP controls
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">❓</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Requests for Information (RFIs)</h3>
              <p className="text-sm text-slate-600">
                Council may request additional information or clarifications via the QMS
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">✅</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Determination</h3>
              <p className="text-sm text-slate-600">
                Application will be approved (with conditions), refused, or referred to panel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
