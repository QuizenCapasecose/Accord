import { useProject } from '../context/ProjectContext';
import { AlertCircle, Clock, CheckCircle2, FileText, Upload } from 'lucide-react';
import { useState } from 'react';

export function RFIManagement() {
  const { project, updateRFI } = useProject();
  const [selectedRFI, setSelectedRFI] = useState<string | null>(null);
  const [response, setResponse] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'responded':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'responded':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'resolved':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Environmental': 'bg-blue-100 text-blue-700',
      'Documentation': 'bg-purple-100 text-purple-700',
      'Design': 'bg-orange-100 text-orange-700',
      'Heritage': 'bg-amber-100 text-amber-700',
      'Other': 'bg-slate-100 text-slate-700'
    };
    return colors[category] || colors['Other'];
  };

  const handleSubmitResponse = (rfiId: string) => {
    if (response.trim()) {
      const confirmed = confirm('Submit this RFI response to Council?\n\nThis action cannot be undone.');
      if (confirmed) {
        updateRFI(rfiId, { status: 'responded', response });
        setResponse('');
        setSelectedRFI(null);
        alert('RFI response submitted successfully!\n\nCouncil will be notified and assessment clock will restart.');
      }
    } else {
      alert('Please provide a response before submitting.');
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.dwg';
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files) as File[];
      const fileNames = files.map((f: File) => f.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
      alert(`${files.length} file(s) uploaded successfully`);
    };
    input.click();
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f !== fileName));
  };

  const loadTemplate = () => {
    setResponse(`Dear Council Officer,

Thank you for the Request for Information dated ${new Date().toLocaleDateString()}.

Please find our response addressing each of your requirements:

1. A-weighted noise levels (dB):
   - Construction phase: [To be completed]
   - Operational phase: [To be completed]

2. Comparison with DCP requirements:
   - [To be completed]

3. Mitigation measures (if applicable):
   - [To be completed]

4. Acoustician confirmation:
   - This assessment has been prepared and certified by [Name], [Qualification]

Please find attached supporting documentation.

Kind regards,
MetroBuild Group`);
    alert('Template loaded! Please complete the highlighted sections.');
  };

  const daysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="container mx-auto p-6 max-w-[1400px]">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">RFI Management</h1>
        <p className="text-slate-600">
          Track and respond to Council Requests for Information
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Pending RFIs</span>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-3xl">{project.rfis.filter(r => r.status === 'pending').length}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Responded</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl">{project.rfis.filter(r => r.status === 'responded').length}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Resolved</span>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl">{project.rfis.filter(r => r.status === 'resolved').length}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Avg Response Time</span>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl">4.2</div>
          <div className="text-xs text-slate-500">days</div>
        </div>
      </div>

      {/* RFI List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg">Active RFIs</h2>
          
          {project.rfis.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg mb-2">No Active RFIs</h3>
              <p className="text-slate-600 text-sm">All requests have been addressed</p>
            </div>
          ) : (
            project.rfis.map(rfi => {
              const daysLeft = daysUntilDeadline(rfi.deadline);
              const isUrgent = daysLeft <= 2;

              return (
                <div
                  key={rfi.id}
                  onClick={() => setSelectedRFI(rfi.id)}
                  className={`bg-white rounded-lg shadow-sm border-2 transition-all cursor-pointer ${
                    selectedRFI === rfi.id
                      ? 'border-blue-600 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(rfi.status)}
                        <div>
                          <div className={`text-xs px-2 py-1 rounded-full inline-block ${getCategoryColor(rfi.category)}`}>
                            {rfi.category}
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(rfi.status)}`}>
                        {rfi.status.charAt(0).toUpperCase() + rfi.status.slice(1)}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm mb-1">{rfi.requirement}</div>
                      <div className="text-xs text-slate-500">
                        Issued by {rfi.officer} on {new Date(rfi.date).toLocaleDateString('en-AU')}
                      </div>
                    </div>

                    <div className={`flex items-center justify-between text-xs ${
                      isUrgent ? 'text-red-600' : 'text-slate-600'
                    }`}>
                      <span>Deadline: {new Date(rfi.deadline).toLocaleDateString('en-AU')}</span>
                      <span className={isUrgent ? 'animate-pulse' : ''}>
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                      </span>
                    </div>

                    {rfi.status === 'pending' && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              isUrgent ? 'bg-red-600' : 'bg-amber-500'
                            }`}
                            style={{ width: `${Math.max(10, (daysLeft / 7) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {rfi.response && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <div className="text-xs text-slate-600 mb-1">Response:</div>
                        <div className="text-sm text-slate-700">{rfi.response}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Response Panel */}
        <div className="sticky top-6">
          {selectedRFI ? (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg mb-4">Respond to RFI</h2>
              
              {(() => {
                const rfi = project.rfis.find(r => r.id === selectedRFI);
                if (!rfi) return null;

                return (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-sm mb-2">{rfi.requirement}</div>
                      <div className="text-xs text-slate-500">
                        Category: {rfi.category} • Deadline: {new Date(rfi.deadline).toLocaleDateString('en-AU')}
                      </div>
                    </div>

                    {rfi.status === 'pending' && (
                      <>
                        <div>
                          <label className="block text-sm text-slate-600 mb-2">
                            Response
                          </label>
                          <textarea
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                            rows={6}
                            placeholder="Describe how you are addressing this RFI..."
                          ></textarea>
                        </div>

                        <div>
                          <label className="block text-sm text-slate-600 mb-2">
                            Supporting Documents
                          </label>
                          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-600">Upload revised plans or reports</p>
                            <p className="text-xs text-slate-500 mt-1">PDF, DOC, DWG files accepted</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleSubmitResponse(rfi.id)}
                            disabled={!response.trim()}
                            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Submit Response
                          </button>
                          <button
                            onClick={() => setSelectedRFI(null)}
                            className="px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}

                    {rfi.status === 'responded' && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center gap-2 text-amber-700 mb-2">
                          <Clock className="w-5 h-5" />
                          <span className="text-sm">Awaiting Council Review</span>
                        </div>
                        <p className="text-sm text-amber-600">
                          Your response has been submitted and is under review by the assessing officer.
                        </p>
                      </div>
                    )}

                    {rfi.status === 'resolved' && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700 mb-2">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-sm">Resolved</span>
                        </div>
                        <p className="text-sm text-green-600">
                          This RFI has been successfully resolved and accepted by Council.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg text-slate-600 mb-2">Select an RFI</h3>
              <p className="text-slate-500 text-sm">
                Click on an RFI from the list to view details and respond
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RFI Prevention Insights */}
      <div className="mt-6 bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg mb-4">RFI Prevention Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-slate-600 mb-2">Most Common Category</div>
            <div className="text-xl mb-1">Environmental</div>
            <div className="text-xs text-slate-600">42% of all RFIs</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-2">Preventable RFIs</div>
            <div className="text-xl mb-1">68%</div>
            <div className="text-xs text-slate-600">could be avoided with better documentation</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-2">Recommendation</div>
            <div className="text-sm text-blue-700">
              ✓ Use enhanced SEE template
              <br />
              ✓ Include acoustic assessment for mixed-use
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
