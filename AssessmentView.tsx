import { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { 
  Calendar, Clock, CheckCircle2, AlertCircle, FileText, 
  Upload, User, MessageSquare, MapPin, TrendingUp 
} from 'lucide-react';

export function AssessmentView() {
  const { project, updateRFI } = useProject();
  const [selectedRFI, setSelectedRFI] = useState<string | null>(null);
  const [rfiResponse, setRFIResponse] = useState('');

  const assessmentPhases = [
    {
      id: 1,
      title: 'Lodgement & Completeness Check',
      date: '14 Dec',
      description: 'Application accepted, DA-2025-0456 assigned, completeness verified.',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Triage & Notification',
      date: '14–16 Dec',
      description: 'Application triaged as "Standard DA", public notification issued (14-day period ends 30 Dec).',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Assessment Proper',
      date: '17 Dec – est. 3 Jan',
      description: 'Current phase: Officer review, site visit (scheduled 23 Dec), specialist referrals, RFI handling.',
      status: 'active'
    },
    {
      id: 4,
      title: 'Determination',
      date: 'est. 3–22 Jan',
      description: 'Council decision, conditions finalized, determination letter issued.',
      status: 'pending'
    }
  ];

  const specialistReferrals = [
    { name: 'Heritage', status: 'approved', date: '15 Dec', color: 'green' },
    { name: 'Traffic', status: 'approved', date: '16 Dec', color: 'green' },
    { name: 'Stormwater', status: 'in-review', date: 'Due 22 Dec', color: 'amber' },
    { name: 'Arborist', status: 'approved', date: '17 Dec', color: 'green' }
  ];

  const communications = [
    {
      id: 1,
      date: '20 Dec',
      type: 'email',
      title: 'Email from J. Smith',
      message: 'Site visit scheduled for 23 Dec at 10 AM. Please ensure site access.',
      color: 'blue'
    },
    {
      id: 2,
      date: '18 Dec',
      type: 'rfi',
      title: 'RFI #1 Issued',
      message: 'Acoustic assessment details requested (see RFI log above).',
      color: 'red'
    },
    {
      id: 3,
      date: '17 Dec',
      type: 'resolved',
      title: 'RFI #0 Resolved',
      message: 'Parking space dimensions confirmed compliant.',
      color: 'green'
    },
    {
      id: 4,
      date: '14 Dec',
      type: 'milestone',
      title: 'DA Accepted',
      message: 'DA-2025-0456 assigned. Completeness verified. Assessment phase begins.',
      color: 'blue'
    }
  ];

  const publicSubmissions = [
    {
      id: 1,
      address: '121 Main Street (adjacent)',
      date: '20 Dec 2025',
      issue: 'Traffic generation, parking concerns (site has only 12 spaces for 6 units + communal area). Requests traffic management plan details.',
      note: 'Traffic Assessment submitted and approved by council. Applicant has right of reply (optional).'
    },
    {
      id: 2,
      address: '125 Main Street (opposite side)',
      date: '19 Dec 2025',
      issue: 'Over-shadowing concern during winter months. Requests shadow analysis for 21 June (winter solstice).',
      note: 'Shadow diagrams were submitted as part of design compliance. Council will assess against DCP overshadowing limits.'
    }
  ];

  const stopClockDays = 3;
  const daysRemaining = project.targetDays - project.daysElapsed;
  const assessmentProgress = (project.daysElapsed / project.targetDays) * 100;

  return (
    <div className="container mx-auto p-6 max-w-[1600px]">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-600 mb-4">
        Dashboard → <span className="text-slate-900">Assessment Stage</span>
      </div>

      {/* Alert Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <div className="text-blue-900 mb-1">
              📊 Stage 3: Assessment
            </div>
            <div className="text-sm text-blue-700">
              Council evaluates against planning controls. RFI tracking, timeline monitoring, public notification management.
            </div>
          </div>
        </div>
      </div>

      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-sm border-l-4 border-blue-600 p-6 mb-6">
        <h1 className="text-xl mb-3">
          {project.projectName} (Assessment Phase)
        </h1>
        <div className="flex flex-wrap gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <strong>DA Number:</strong> {project.daNumber}
          </div>
          <div className="flex items-center gap-2">
            <strong>Days Elapsed:</strong> {project.daysElapsed} of {project.targetDays} days
          </div>
          <div className="flex items-center gap-2">
            <strong>Assessing Officer:</strong> Jane Smith (Cumberland)
          </div>
          <div className="flex items-center gap-2">
            <strong>Status:</strong>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
              Assessment Proper
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: TIMELINE */}
      <h2 className="text-xl border-b-2 border-slate-200 pb-3 mb-6">
        1. Assessment Timeline & RFI Tracking
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Assessment Phases */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-5 border-b border-slate-200">
            <h3 className="">Assessment Phases</h3>
          </div>
          <div className="p-5">
            {assessmentPhases.map((phase, index) => (
              <div key={phase.id} className="relative">
                <div className={`flex gap-4 ${index < assessmentPhases.length - 1 ? 'pb-6' : ''}`}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        phase.status === 'completed'
                          ? 'bg-green-100'
                          : phase.status === 'active'
                          ? 'bg-blue-100 ring-4 ring-blue-50'
                          : 'bg-slate-100'
                      }`}
                    >
                      {phase.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : phase.status === 'active' ? (
                        <Clock className="w-5 h-5 text-blue-600" />
                      ) : (
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                      )}
                    </div>
                    {index < assessmentPhases.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-2 ${
                        phase.status === 'completed' ? 'bg-green-200' : 'bg-slate-200'
                      }`} style={{ minHeight: '40px' }}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm mb-1 ${phase.status === 'active' ? '' : ''}`}>
                      {phase.status === 'completed' && '✓ '}
                      {phase.status === 'active' && '→ '}
                      {phase.status === 'pending' && '⏳ '}
                      {phase.title} ({phase.date})
                    </div>
                    <div className="text-sm text-slate-600">
                      {phase.status === 'active' && <strong>Current phase: </strong>}
                      {phase.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Benchmark */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-5 border-b border-slate-200">
            <h3 className="">Statutory Benchmark</h3>
          </div>
          <div className="p-5">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3"><strong>Lodgement</strong></td>
                  <td className="py-3">14 Dec 2025</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3"><strong>40-Day Target</strong></td>
                  <td className="py-3">23 Jan 2026</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3"><strong>Days Remaining</strong></td>
                  <td className="py-3 text-blue-600">{daysRemaining} days</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3"><strong>Stop-the-Clock Days</strong></td>
                  <td className="py-3">{stopClockDays} days (RFI: 18 Dec – 21 Dec)</td>
                </tr>
                <tr>
                  <td className="py-3"><strong>Status</strong></td>
                  <td className="py-3">
                    <span className="flex items-center gap-2 text-green-600">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      On track
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 2: RFI LOG */}
      <h2 className="text-xl border-b-2 border-slate-200 pb-3 mb-6">
        2. Request for Information (RFI) Log
      </h2>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-8">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h3 className="">RFI Tracking (1 RFI issued, 1 pending response)</h3>
          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs uppercase">
            ACTIVE RFI
          </span>
        </div>

        <div className="p-6">
          {/* Active RFI */}
          <div className="mb-6">
            <div className="p-4 bg-slate-50 rounded-lg mb-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="mb-1">RFI #1: Acoustic Assessment Details</div>
                  <div className="text-xs text-slate-500">
                    Issued 18 Dec 2025 (4 days ago) • Officer: J. Smith • <strong>Due: 22 Dec 2025 (2 days)</strong>
                  </div>
                </div>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs uppercase flex-shrink-0">
                  PENDING
                </span>
              </div>

              <div className="p-4 bg-white border-l-4 border-amber-500 rounded mb-4">
                <div className="text-sm text-amber-900 mb-2">
                  <strong>Council Request:</strong>
                </div>
                <div className="text-sm text-slate-700">
                  "The Acoustic Assessment (submitted 19 Dec) does not include detailed sound impact analysis for eastern boundary (neighbouring residential property). Please provide:<br/>
                  (1) A-weighted noise levels (dB) for construction and operational phases at boundary;<br/>
                  (2) Comparison with DCP requirements (NSW Noise Policy);<br/>
                  (3) If exceeds limits, mitigation measures (e.g., acoustic fencing, plantings);<br/>
                  (4) Confirmation from acoustician signature."
                </div>
              </div>

              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
                <div className="text-sm text-green-900 mb-2">
                  <strong>Smart System Suggestion:</strong>
                </div>
                <div className="text-sm text-green-700">
                  System detects this as common RFI type (#3 in past 6 months). Auto-generates template: "Acoustic RFI Response Checklist" with sections for noise levels, DCP comparison, and mitigation.{' '}
                  <button className="text-blue-600 hover:text-blue-700 underline">
                    Load Template
                  </button>
                </div>
              </div>
            </div>

            {/* RFI Response Upload */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center mb-4">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <div className="mb-2">Upload RFI Response Documents</div>
              <div className="text-sm text-slate-500 mb-4">
                Drag files here or click to browse
              </div>
              <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm">
                Choose Files
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg mb-4">
              <div className="text-sm mb-2">Uploaded (0 files)</div>
              <div className="text-xs text-slate-500">No files uploaded yet.</div>
            </div>

            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Submit RFI Response to Portal
            </button>
          </div>

          {/* Resolved RFI */}
          <div className="pt-6 border-t border-slate-200">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-green-700 mb-1">
                    ✓ RFI #0 (RESOLVED)
                  </div>
                  <div className="text-xs text-slate-500">
                    Issued 16 Dec 2025 • Resolved 17 Dec 2025 (1 day response)
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs uppercase flex-shrink-0">
                  RESOLVED
                </span>
              </div>
              <div className="text-sm text-slate-700">
                <strong>Request:</strong> "Please confirm dimensions of parking spaces comply with DCP (min. 2.4 m × 5.4 m)."<br/>
                <strong>Response:</strong> Revised plan uploaded showing 12 spaces at 2.5 m × 5.5 m. Compliance confirmed.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: COMMUNICATION */}
      <h2 className="text-xl border-b-2 border-slate-200 pb-3 mb-6">
        3. Council Communication & Referrals
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Communication Log */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-5 border-b border-slate-200">
            <h3 className="">Communication Log</h3>
          </div>
          <div className="p-5">
            {communications.map((comm, index) => (
              <div key={comm.id} className="relative">
                <div className={`flex gap-4 ${index < communications.length - 1 ? 'pb-6' : ''}`}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        comm.color === 'blue'
                          ? 'bg-blue-100'
                          : comm.color === 'red'
                          ? 'bg-red-100'
                          : 'bg-green-100'
                      }`}
                    >
                      {comm.color === 'blue' && <MessageSquare className="w-5 h-5 text-blue-600" />}
                      {comm.color === 'red' && <AlertCircle className="w-5 h-5 text-red-600" />}
                      {comm.color === 'green' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    </div>
                    {index < communications.length - 1 && (
                      <div className="w-0.5 flex-1 mt-2 bg-slate-200" style={{ minHeight: '20px' }}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1">{comm.date} – {comm.title}</div>
                    <div className="text-sm text-slate-600">{comm.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialist Referral Status */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-5 border-b border-slate-200">
            <h3 className="">Specialist Referral Status</h3>
          </div>
          <div className="p-5">
            <table className="w-full text-sm">
              <tbody>
                {specialistReferrals.map((referral, index) => (
                  <tr key={index} className={`${index < specialistReferrals.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <td className="py-3">
                      <strong>{referral.name}</strong>
                    </td>
                    <td className="py-3">
                      <span className={`flex items-center gap-2 ${
                        referral.color === 'green' ? 'text-green-600' : 'text-amber-600'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          referral.color === 'green' ? 'bg-green-600' : 'bg-amber-600'
                        }`}></span>
                        {referral.status === 'approved' ? 'Approved' : 'In Review'}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-500 text-xs">
                      {referral.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 4: PUBLIC NOTIFICATION */}
      <h2 className="text-xl border-b-2 border-slate-200 pb-3 mb-6">
        4. Public Notification & Submissions
      </h2>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-8">
        <div className="p-5 border-b border-slate-200">
          <h3 className="">Public Notification Period</h3>
        </div>
        <div className="p-5">
          <table className="w-full text-sm mb-6">
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3"><strong>Notification Date</strong></td>
                <td className="py-3">14 Dec 2025</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3"><strong>Method</strong></td>
                <td className="py-3">Neighbour letters + site signage</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3"><strong>Notification Period</strong></td>
                <td className="py-3">14 days (ends 28 Dec 2025)</td>
              </tr>
              <tr>
                <td className="py-3"><strong>Submissions Received</strong></td>
                <td className="py-3 text-amber-600">
                  <strong>2</strong> (from neighbouring properties)
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className="text-sm text-slate-700 mb-4">📬 Submissions Summary</h4>
          
          <div className="space-y-3 mb-6">
            {publicSubmissions.map(submission => (
              <div key={submission.id} className="p-4 bg-slate-50 rounded-lg">
                <div className="mb-2">
                  Submission #{submission.id}: {submission.address}
                </div>
                <div className="text-xs text-slate-500 mb-3">
                  Received {submission.date}
                </div>
                <div className="text-sm text-slate-700 mb-2">
                  <strong>Issue:</strong> {submission.issue}
                </div>
                <div className="text-sm text-slate-600">
                  <strong>System Note:</strong> {submission.note}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 border-l-4 border-blue-600 rounded-lg">
            <div className="text-sm text-blue-700 mb-2">
              📌 Applicant Right of Reply
            </div>
            <div className="text-sm text-slate-700 mb-3">
              You may optionally provide a written response to submissions (typically 150–300 words per submission). This is not mandatory but recommended for complex objections.
            </div>
            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm">
              Prepare Right of Reply
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 5: PROGRESS & RISKS */}
      <h2 className="text-xl border-b-2 border-slate-200 pb-3 mb-6">
        5. Assessment Progress & Risk Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <div className="text-xs text-slate-600 uppercase tracking-wide mb-2">
            Assessment Days Used
          </div>
          <div className="text-4xl my-3">
            {project.daysElapsed} <span className="text-lg text-slate-400">of {project.targetDays}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-blue-600"
              style={{ width: `${assessmentProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <div className="text-xs text-slate-600 uppercase tracking-wide mb-2">
            RFI Risk Level
          </div>
          <div className="text-2xl text-amber-600 my-3">MEDIUM</div>
          <div className="text-sm text-slate-600">1 RFI issued, 1 pending response</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <div className="text-xs text-slate-600 uppercase tracking-wide mb-2">
            Predicted Determination
          </div>
          <div className="text-xl my-3">3 Jan 2026</div>
          <div className="text-sm text-slate-600">Est. within target (40 days)</div>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-8">
        <div className="p-5 border-b border-slate-200">
          <h3 className="">Smart System Recommendations</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm mb-1">
                <strong>RFI Response Due: 22 Dec (2 days)</strong>
              </div>
              <div className="text-sm text-amber-700">
                The acoustic assessment RFI has a tight deadline. Immediate action required to meet council deadline and avoid assessment pause. System provides: template response, council contact details, upload interface.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-50 border-l-4 border-green-600 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm mb-1">
                <strong>On Track for Timeline</strong>
              </div>
              <div className="text-sm text-green-700">
                {project.daysElapsed} of {project.targetDays} days used. With RFI resolved by 22 Dec, determination predicted 3 Jan 2026 (well within statutory target). No escalation needed.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors">
          ← Back to Dashboard
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Resume RFI Response
        </button>
        <button className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors">
          View Communication Log
        </button>
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-6 border-t border-slate-200 text-xs text-slate-600">
        <strong>Note:</strong> Assessment stage progresses through council's internal review, specialist referrals, RFI handling, and (if required) public notification. Applicants remain informed of RFI requests and can monitor timeline progress. Determination typically issued within 40 calendar days (with stop-the-clock pauses for RFI periods).
      </div>
    </div>
  );
}
