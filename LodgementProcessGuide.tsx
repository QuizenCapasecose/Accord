import { useState } from 'react';
import { FileText, Eye, CheckCircle2, Upload, Download, AlertCircle } from 'lucide-react';

export function LodgementProcessGuide() {
  const [viewingScreenshot, setViewingScreenshot] = useState<number | null>(null);
  const [escStatus, setEscStatus] = useState<'not-started' | 'prepared' | 'approved'>('approved');
  const [hoardingStatus, setHoardingStatus] = useState<'not-started' | 'planned' | 'approved'>('approved');
  const [levyStatus, setLevyStatus] = useState<'not-started' | 'calculated' | 'paid' | 'receipt-uploaded'>('calculated');

  const portalSteps = [
    {
      number: 1,
      title: 'Login to NSW Planning Portal',
      description: 'Access the NSW Planning Portal at planningportal.nsw.gov.au and log in with your Service NSW account.',
      screenshot: '/portal-login.png'
    },
    {
      number: 2,
      title: 'Select "New Development Application"',
      description: 'From the dashboard, click on "Lodge a Development Application" button.',
      screenshot: '/portal-new-da.png'
    },
    {
      number: 3,
      title: 'Enter Site Details',
      description: 'Enter the property address, select Cumberland Council, and describe your proposal.',
      screenshot: '/portal-site-details.png'
    },
    {
      number: 4,
      title: 'Upload Documents from MetroBuild',
      description: 'Upload all required documents. MetroBuild provides a one-click export function to package all documents.',
      screenshot: '/portal-upload.png'
    },
    {
      number: 5,
      title: 'Review Fee Summary',
      description: 'Review the calculated fees, confirm all details are correct, and proceed to payment.',
      screenshot: '/portal-fees.png'
    },
    {
      number: 6,
      title: 'Submit and Receive Reference',
      description: 'Complete payment, submit the application, and receive your portal reference number. Upload this reference back into MetroBuild for tracking.',
      screenshot: '/portal-submit.png'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Lodgement Process Guide</h2>
        <p className="opacity-90">Step-by-step guide to lodging your DA via NSW Planning Portal</p>
      </div>

      {/* How to Lodge - NSW Planning Portal */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-purple-300">
        <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-b-2 border-purple-300">
          <h3 className="text-xl font-bold text-purple-900 mb-2">How to Lodge via NSW Planning Portal</h3>
          <p className="text-purple-800">Complete walkthrough with visual guides</p>
        </div>

        <div className="p-6 space-y-4">
          {portalSteps.map((step) => (
            <div
              key={step.number}
              className="border-2 border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.number}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h4>
                  <p className="text-slate-700 text-sm mb-3">{step.description}</p>
                  
                  <button
                    onClick={() => setViewingScreenshot(step.number)}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2 text-sm font-semibold border-2 border-purple-300"
                  >
                    <Eye className="w-4 h-4" />
                    View Screenshot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-blue-50 border-t-2 border-blue-300">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="text-sm text-blue-900">
              <strong>MetroBuild Integration:</strong> Use the "Export for Portal" button in MetroBuild to automatically 
              package all documents with correct naming conventions ready for upload to the Planning Portal.
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Erosion & Sediment Control Plan */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-orange-300">
          <div className="p-4 bg-gradient-to-r from-orange-100 to-amber-100">
            <h4 className="font-bold text-orange-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Erosion & Sediment Control
            </h4>
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-700 mb-3">
              Site-specific ESC plan with 6 control measures, maintenance schedule, and emergency procedures.
            </p>
            
            <div className="mb-4">
              <div className="text-xs font-semibold text-slate-600 mb-2">STATUS</div>
              <select
                value={escStatus}
                onChange={(e) => setEscStatus(e.target.value as any)}
                className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg text-sm"
              >
                <option value="not-started">Not Started</option>
                <option value="prepared">Prepared</option>
                <option value="approved">Approved</option>
              </select>
            </div>

            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                <Eye className="w-4 h-4" />
                View ESC Plan
              </button>
              <button className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                <Download className="w-4 h-4" />
                Download Template
              </button>
            </div>
          </div>
        </div>

        {/* Hoarding & Site Fencing Plan */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-indigo-300">
          <div className="p-4 bg-gradient-to-r from-indigo-100 to-blue-100">
            <h4 className="font-bold text-indigo-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Hoarding & Site Fencing
            </h4>
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-700 mb-3">
              Detailed fencing specifications, signage requirements, and safety compliance checklist.
            </p>
            
            <div className="mb-4">
              <div className="text-xs font-semibold text-slate-600 mb-2">STATUS</div>
              <select
                value={hoardingStatus}
                onChange={(e) => setHoardingStatus(e.target.value as any)}
                className="w-full px-3 py-2 border-2 border-indigo-300 rounded-lg text-sm"
              >
                <option value="not-started">Not Started</option>
                <option value="planned">Plan Prepared</option>
                <option value="approved">Approved</option>
              </select>
            </div>

            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                <Eye className="w-4 h-4" />
                View Hoarding Plan
              </button>
              <button className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                <Download className="w-4 h-4" />
                Download Template
              </button>
            </div>

            <div className="mt-4 p-3 bg-indigo-50 border border-indigo-300 rounded-lg">
              <div className="text-xs font-semibold text-indigo-900 mb-1">REFERENCE</div>
              <div className="text-xs text-indigo-800">WorkCover / Council standards compliant</div>
            </div>
          </div>
        </div>

        {/* Long Service Levy */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-teal-300">
          <div className="p-4 bg-gradient-to-r from-teal-100 to-cyan-100">
            <h4 className="font-bold text-teal-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Long Service Levy
            </h4>
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-700 mb-3">
              iCare NSW levy payment form with automatic calculator (0.35% of ECW).
            </p>
            
            <div className="mb-4">
              <div className="text-xs font-semibold text-slate-600 mb-2">STATUS</div>
              <select
                value={levyStatus}
                onChange={(e) => setLevyStatus(e.target.value as any)}
                className="w-full px-3 py-2 border-2 border-teal-300 rounded-lg text-sm"
              >
                <option value="not-started">Not Started</option>
                <option value="calculated">Calculated</option>
                <option value="paid">Paid</option>
                <option value="receipt-uploaded">Receipt Uploaded</option>
              </select>
            </div>

            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                <Eye className="w-4 h-4" />
                View Levy Form
              </button>
              <button className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                <Download className="w-4 h-4" />
                Download Form
              </button>
            </div>

            <div className="mt-4 p-3 bg-teal-50 border border-teal-300 rounded-lg">
              <div className="text-xs font-semibold text-teal-900 mb-1">CALCULATED AMOUNT</div>
              <div className="text-lg font-bold text-teal-700">$1,348.00</div>
              <div className="text-xs text-teal-700 mt-1">ECW: $385,000 × 0.35%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Package */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
            <Upload className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-900 mb-2">Ready to Lodge?</h3>
            <p className="text-green-800 mb-4">
              All documents prepared and compliance checks passed. Use the export function to package everything 
              for the Planning Portal.
            </p>
            <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Document Package for Portal
            </button>
          </div>
        </div>
      </div>

      {/* Screenshot Modal */}
      {viewingScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
            <div className="p-6 border-b-2 border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">
                  Step {viewingScreenshot}: {portalSteps.find(s => s.number === viewingScreenshot)?.title}
                </h3>
                <button
                  onClick={() => setViewingScreenshot(null)}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Screenshot Placeholder */}
              <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
                <div className="text-6xl mb-4">📸</div>
                <h4 className="text-xl font-bold text-slate-700 mb-2">Screenshot Placeholder</h4>
                <p className="text-slate-600 max-w-md mx-auto">
                  {portalSteps.find(s => s.number === viewingScreenshot)?.description}
                </p>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-lg inline-block">
                  <p className="text-sm text-blue-900">
                    <strong>To add actual screenshot:</strong><br />
                    Replace this placeholder with the real NSW Planning Portal screenshot at:<br />
                    <code className="bg-blue-100 px-2 py-1 rounded text-xs font-mono">
                      {portalSteps.find(s => s.number === viewingScreenshot)?.screenshot}
                    </code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
