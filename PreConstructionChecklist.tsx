import { useState } from 'react';
import { CheckCircle2, Circle, AlertTriangle, FileText, Calendar, User } from 'lucide-react';

interface ConditionItem {
  id: string;
  conditionNo: string;
  category: string;
  description: string;
  responsibility: string;
  deadline: string;
  status: 'complete' | 'in-progress' | 'not-started' | 'overdue';
  priority: 'critical' | 'high' | 'medium';
  notes: string;
  evidence: string;
}

const preCCConditions: ConditionItem[] = [
  {
    id: '1',
    conditionNo: 'A1',
    category: 'Design Modifications',
    description: 'Amended plans addressing RFI responses to be submitted showing compliance with DCP setback controls',
    responsibility: 'Architect',
    deadline: 'Before CC application',
    status: 'complete',
    priority: 'critical',
    notes: 'Revised plans v3 submitted 10 Dec 2024',
    evidence: 'Architectural Plans Rev 3.pdf'
  },
  {
    id: '2',
    conditionNo: 'A2',
    category: 'Drainage & WSUD',
    description: 'Detailed stormwater drainage design by qualified engineer, including OSD calculations and WSUD measures',
    responsibility: 'Civil Engineer',
    deadline: 'Before CC application',
    status: 'complete',
    priority: 'critical',
    notes: 'OSD design by ABC Engineering, 5000L tank specified',
    evidence: 'Stormwater Design Report.pdf'
  },
  {
    id: '3',
    conditionNo: 'A3',
    category: 'Landscaping',
    description: 'Landscape plan prepared by qualified landscape architect/designer showing minimum 3 canopy trees',
    responsibility: 'Landscape Architect',
    deadline: 'Before CC application',
    status: 'complete',
    priority: 'high',
    notes: 'Landscape plan shows 4x canopy trees + raingardens',
    evidence: 'Landscape Plan L01.pdf'
  },
  {
    id: '4',
    conditionNo: 'A4',
    category: 'BASIX',
    description: 'BASIX Certificate to be current (< 6 months) and all commitments shown on plans',
    responsibility: 'Architect / BASIX Assessor',
    deadline: 'Before CC application',
    status: 'complete',
    priority: 'critical',
    notes: 'BASIX A123456 valid until 20 Jun 2025, commitments noted on plans',
    evidence: 'BASIX Certificate A123456.pdf'
  },
  {
    id: '5',
    conditionNo: 'A5',
    category: 'Section 7.12 Contributions',
    description: 'Payment of development contributions ($12,450) or provision of written undertaking',
    responsibility: 'Applicant',
    deadline: 'Before CC application',
    status: 'in-progress',
    priority: 'critical',
    notes: 'Payment to be made with CC application',
    evidence: 'Pending - will be receipt from Council'
  },
  {
    id: '6',
    conditionNo: 'A6',
    category: 'Building Code Compliance',
    description: 'Detailed Construction Certificate plans demonstrating compliance with NCC/BCA',
    responsibility: 'Building Designer / Certifier',
    deadline: 'Before CC application',
    status: 'in-progress',
    priority: 'critical',
    notes: 'CC plans in preparation by certifier',
    evidence: 'In progress'
  },
  {
    id: '7',
    conditionNo: 'A7',
    category: 'Long Service Levy',
    description: 'Evidence of payment of Long Service Levy to iCare NSW',
    responsibility: 'Applicant / Builder',
    deadline: 'Before CC application',
    status: 'not-started',
    priority: 'critical',
    notes: 'To be paid online via iCare portal',
    evidence: 'Not yet paid'
  },
  {
    id: '8',
    conditionNo: 'A8',
    category: 'Sydney Water',
    description: 'Section 73 Compliance Certificate from Sydney Water (if connection/alteration required)',
    responsibility: 'Hydraulic Consultant',
    deadline: 'Before CC application',
    status: 'in-progress',
    priority: 'high',
    notes: 'Application submitted to Sydney Water 15 Dec 2024',
    evidence: 'Sydney Water application ref SW987654'
  },
  {
    id: '9',
    conditionNo: 'A9',
    category: 'Dilapidation Report',
    description: 'Dilapidation report for adjoining properties (if excavation > 1m depth within 6m of boundary)',
    responsibility: 'Structural Engineer',
    deadline: 'Before CC application',
    status: 'not-started',
    priority: 'medium',
    notes: 'Required for eastern neighbor at 121 Example St',
    evidence: 'To be commissioned'
  },
  {
    id: '10',
    conditionNo: 'A10',
    category: 'Geotechnical',
    description: 'Detailed foundation design by structural engineer based on geotechnical report recommendations',
    responsibility: 'Structural Engineer',
    deadline: 'Before CC application',
    status: 'complete',
    priority: 'critical',
    notes: 'Waffle raft slab design by XYZ Structural Engineers',
    evidence: 'Structural Engineering Plans S01-S05.pdf'
  },
  {
    id: '11',
    conditionNo: 'A11',
    category: 'Acoustics',
    description: 'Acoustic treatments as recommended in Acoustic Assessment to be shown on CC plans',
    responsibility: 'Architect / Acoustic Consultant',
    deadline: 'Before CC application',
    status: 'complete',
    priority: 'high',
    notes: 'Laminated glazing specs and seals shown on plans',
    evidence: 'Reflected in CC plans'
  },
  {
    id: '12',
    conditionNo: 'A12',
    category: 'Tree Protection',
    description: 'Tree Protection Plan showing TPZ fencing and protection measures for retained trees T1, T2',
    responsibility: 'Arborist',
    deadline: 'Before CC application',
    status: 'complete',
    priority: 'high',
    notes: 'TPZ fencing locations shown on site plan',
    evidence: 'Arborist Report + Site Plan notation'
  },
  {
    id: '13',
    conditionNo: 'A13',
    category: 'Waste Management',
    description: 'Waste Management Plan showing bin storage area dimensions and collection arrangements',
    responsibility: 'Architect',
    deadline: 'Before CC application',
    status: 'complete',
    priority: 'medium',
    notes: '3-bin storage area in garage, 2.4m width shown',
    evidence: 'Site Plan + Waste Management Plan'
  },
  {
    id: '14',
    conditionNo: 'A14',
    category: 'Driveway & Access',
    description: 'Engineering details for driveway crossover and vehicular access complying with AS 2890.1',
    responsibility: 'Civil Engineer',
    deadline: 'Before CC application',
    status: 'complete',
    priority: 'high',
    notes: 'Driveway gradient 1:6, 3.5m width, complies with AS 2890.1',
    evidence: 'Civil Engineering Plans C01.pdf'
  },
  {
    id: '15',
    conditionNo: 'A15',
    category: 'Erosion & Sediment Control',
    description: 'Erosion and sediment control plan showing measures during construction',
    responsibility: 'Civil Engineer / Builder',
    deadline: 'Before CC application',
    status: 'in-progress',
    priority: 'high',
    notes: 'ESCP being prepared by civil engineer',
    evidence: 'In progress'
  }
];

export function PreConstructionChecklist() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredConditions = preCCConditions.filter(item => {
    const statusMatch = filterStatus === 'all' || item.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || item.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const stats = {
    total: preCCConditions.length,
    complete: preCCConditions.filter(c => c.status === 'complete').length,
    inProgress: preCCConditions.filter(c => c.status === 'in-progress').length,
    notStarted: preCCConditions.filter(c => c.status === 'not-started').length,
    critical: preCCConditions.filter(c => c.priority === 'critical').length
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl mb-2">Pre-Construction Certificate Conditions Checklist</h1>
        <p className="text-sm sm:text-base text-slate-600">
          Critical conditions that must be satisfied before Construction Certificate can be issued
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-lg p-4 text-center">
          <div className="text-sm text-slate-600 mb-1">Total Conditions</div>
          <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 text-center">
          <div className="text-sm text-slate-600 mb-1">Complete</div>
          <div className="text-3xl font-bold text-green-600">{stats.complete}</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 text-center">
          <div className="text-sm text-slate-600 mb-1">In Progress</div>
          <div className="text-3xl font-bold text-blue-600">{stats.inProgress}</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 text-center">
          <div className="text-sm text-slate-600 mb-1">Not Started</div>
          <div className="text-3xl font-bold text-slate-400">{stats.notStarted}</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 text-center">
          <div className="text-sm text-slate-600 mb-1">Critical Items</div>
          <div className="text-3xl font-bold text-red-600">{stats.critical}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-slate-900">Overall Progress</span>
          <span className="text-2xl font-bold text-blue-600">
            {Math.round((stats.complete / stats.total) * 100)}%
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-4">
          <div 
            className="h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all"
            style={{ width: `${(stats.complete / stats.total) * 100}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-slate-600">
          {stats.complete} of {stats.total} conditions satisfied
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="complete">Complete</option>
              <option value="in-progress">In Progress</option>
              <option value="not-started">Not Started</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Filter by Priority:</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>
        </div>
      </div>

      {/* Conditions Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Cond. No.</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Description</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Responsibility</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Deadline</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredConditions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">
                    <span className="font-mono font-bold text-blue-600">{item.conditionNo}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-semibold text-slate-800">{item.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-slate-700 max-w-md">
                      {item.description}
                      {item.notes && (
                        <div className="mt-1 text-xs text-slate-500 italic">
                          Note: {item.notes}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{item.responsibility}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{item.deadline}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {item.priority === 'critical' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                        <AlertTriangle className="w-3 h-3" />
                        CRITICAL
                      </span>
                    )}
                    {item.priority === 'high' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                        HIGH
                      </span>
                    )}
                    {item.priority === 'medium' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                        MEDIUM
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {item.status === 'complete' && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Complete
                      </span>
                    )}
                    {item.status === 'in-progress' && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-semibold">
                        <Circle className="w-4 h-4" />
                        In Progress
                      </span>
                    )}
                    {item.status === 'not-started' && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                        <Circle className="w-4 h-4" />
                        Not Started
                      </span>
                    )}
                    {item.status === 'overdue' && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-semibold">
                        <AlertTriangle className="w-4 h-4" />
                        Overdue
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-slate-600">{item.evidence}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical Warnings */}
      <div className="mt-6 bg-red-50 border-2 border-red-300 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-red-900 mb-2">⚠️ Critical Reminders</h3>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• <strong>ALL conditions</strong> marked as Critical must be satisfied before CC can be issued</li>
              <li>• <strong>Section 7.12 contributions</strong> must be paid in full before CC</li>
              <li>• <strong>Long Service Levy</strong> evidence required at CC application</li>
              <li>• <strong>BASIX Certificate</strong> must be current (&lt; 6 months old) at time of CC application</li>
              <li>• <strong>Sydney Water S73</strong> required if any connection or alteration to water/sewer</li>
              <li>• Failure to satisfy conditions may delay CC or require amended DA</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-6 bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
        <h3 className="font-bold text-blue-900 mb-3">📋 Next Steps to Apply for Construction Certificate:</h3>
        <ol className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="font-bold flex-shrink-0">1.</span>
            <span>Complete all outstanding conditions (currently {stats.inProgress + stats.notStarted} remaining)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold flex-shrink-0">2.</span>
            <span>Engage a Private Certifier or apply to Council for CC</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold flex-shrink-0">3.</span>
            <span>Prepare detailed CC plans showing full compliance with NCC/BCA</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold flex-shrink-0">4.</span>
            <span>Submit CC application with all supporting documentation and fees</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold flex-shrink-0">5.</span>
            <span>Await CC approval (typically 2-4 weeks for compliant applications)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}