import { useState } from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle, FileText, DollarSign, Upload, Eye, Calendar, User, FileCheck } from 'lucide-react';

interface TimelineStage {
  id: string;
  title: string;
  status: 'complete' | 'in-progress' | 'pending';
  date?: string;
  description: string;
  expandable: boolean;
}

const timelineStages: TimelineStage[] = [
  {
    id: 'documents',
    title: 'All Documents Uploaded',
    status: 'complete',
    date: '20 Dec 2024',
    description: 'All required documents uploaded and verified',
    expandable: true
  },
  {
    id: 'compliance',
    title: 'Compliance Check Passed',
    status: 'complete',
    date: '21 Dec 2024',
    description: 'Internal compliance verification completed',
    expandable: true
  },
  {
    id: 'plans',
    title: 'Plans Reviewed & Approved',
    status: 'complete',
    date: '22 Dec 2024',
    description: 'Design review and approval by project team',
    expandable: true
  },
  {
    id: 'basix',
    title: 'BASIX Certificate Validated',
    status: 'complete',
    date: '23 Dec 2024',
    description: 'BASIX certificate verified and meets requirements',
    expandable: true
  },
  {
    id: 'fees',
    title: 'Council Fees Calculated',
    status: 'complete',
    date: '23 Dec 2024',
    description: 'Development application fees calculated',
    expandable: true
  },
  {
    id: 'lodgement',
    title: 'Lodge via NSW Planning Portal',
    status: 'in-progress',
    date: 'In Progress',
    description: 'Final submission to Cumberland Council',
    expandable: true
  }
];

const uploadedDocuments = [
  { id: 1, name: '1.1 DA Application Form', date: '20 Dec 2024', size: '1.2 MB', version: 1 },
  { id: 2, name: '1.2 Owner Consent Form', date: '18 Dec 2024', size: '0.8 MB', version: 1 },
  { id: 3, name: '2.1 Statement of Environmental Effects', date: '19 Dec 2024', size: '4.5 MB', version: 2 },
  { id: 4, name: '2.2 Waste Management Plan', date: '20 Dec 2024', size: '3.1 MB', version: 1 },
  { id: 5, name: '2.3 Survey Plan', date: '18 Dec 2024', size: '2.1 MB', version: 1 },
  { id: 6, name: '2.4 Landscape Plan', date: '19 Dec 2024', size: '3.2 MB', version: 1 },
  { id: 7, name: '3.1.1 Site Plan', date: '20 Dec 2024', size: '2.8 MB', version: 2 },
  { id: 8, name: '3.1.2 Floor Plans', date: '20 Dec 2024', size: '3.5 MB', version: 2 },
  { id: 9, name: '3.1.3 Elevations', date: '20 Dec 2024', size: '2.4 MB', version: 2 },
  { id: 10, name: '3.1.4 Sections', date: '20 Dec 2024', size: '1.9 MB', version: 1 },
  { id: 11, name: '3.2 Shadow Diagrams', date: '19 Dec 2024', size: '2.4 MB', version: 1 },
  { id: 12, name: '3.3 Materials & Finishes Schedule', date: '20 Dec 2024', size: '1.8 MB', version: 1 },
  { id: 13, name: '4.1 Heritage Impact Statement', date: '17 Dec 2024', size: '3.6 MB', version: 1 },
  { id: 14, name: '4.2 Arborist Report', date: '16 Dec 2024', size: '2.9 MB', version: 1 },
  { id: 15, name: '4.3 Traffic & Parking Assessment', date: '19 Dec 2024', size: '3.1 MB', version: 1 },
  { id: 16, name: '4.4 Stormwater & WSUD Plan', date: '20 Dec 2024', size: '4.2 MB', version: 1 },
  { id: 17, name: '5.1 BASIX Certificate', date: '20 Dec 2024', size: '0.6 MB', version: 1 }
];

const complianceCriteria = [
  { id: 1, criterion: 'All mandatory documents uploaded', met: true, notes: '17 of 17 required documents present' },
  { id: 2, criterion: 'Property address matches all documents', met: true, notes: '123 Example Street, Auburn NSW 2144 - verified' },
  { id: 3, criterion: 'Owner consent forms signed and dated', met: true, notes: 'All owners have provided written consent' },
  { id: 4, criterion: 'Plans are current and coordinated', met: true, notes: 'All architectural plans dated December 2024' },
  { id: 5, criterion: 'BASIX certificate is current (< 6 months)', met: true, notes: 'Certificate issued 20 Dec 2024, valid until 20 Jun 2025' },
  { id: 6, criterion: 'Statement of Environmental Effects complete', met: true, notes: 'SEE addresses all LEP/DCP controls' },
  { id: 7, criterion: 'Specialist reports by qualified consultants', met: true, notes: 'All reports signed by appropriately qualified professionals' },
  { id: 8, criterion: 'Survey plan by registered surveyor', met: true, notes: 'Survey by J. Smith, Registered Surveyor #12345' },
  { id: 9, criterion: 'No conflicts or inconsistencies detected', met: true, notes: 'Cross-document verification passed' },
  { id: 10, criterion: 'File sizes and formats acceptable', met: true, notes: 'All PDFs under 10MB, readable format' }
];

const planReviews = [
  {
    id: 1,
    plan: 'Site Plan',
    version: 2,
    reviewer: 'Sarah Chen',
    role: 'Project Architect',
    reviewDate: '22 Dec 2024',
    approvalDate: '22 Dec 2024',
    status: 'Approved',
    comments: 'Setbacks comply with DCP. Building footprint clear of easements.'
  },
  {
    id: 2,
    plan: 'Floor Plans',
    version: 2,
    reviewer: 'Michael Torres',
    role: 'Design Manager',
    reviewDate: '22 Dec 2024',
    approvalDate: '22 Dec 2024',
    status: 'Approved',
    comments: 'Room dimensions meet BCA. Natural light and ventilation adequate.'
  },
  {
    id: 3,
    plan: 'Elevations',
    version: 2,
    reviewer: 'Sarah Chen',
    role: 'Project Architect',
    reviewDate: '22 Dec 2024',
    approvalDate: '22 Dec 2024',
    status: 'Approved',
    comments: 'Height complies with LEP. Materials consistent with DCP character guidelines.'
  },
  {
    id: 4,
    plan: 'Statement of Environmental Effects',
    version: 2,
    reviewer: 'David Park',
    role: 'Planning Consultant',
    reviewDate: '21 Dec 2024',
    approvalDate: '21 Dec 2024',
    status: 'Approved',
    comments: 'Comprehensive assessment. All LEP/DCP controls addressed.'
  }
];

const basixCriteria = [
  { id: 1, criterion: 'Certificate number matches project', value: 'A123456', met: true },
  { id: 2, criterion: 'Issue date is recent (< 6 months)', value: '20 Dec 2024', met: true },
  { id: 3, criterion: 'Expiry date is valid', value: '20 Jun 2025 (6 months validity)', met: true },
  { id: 4, criterion: 'Property address matches DA', value: '123 Example Street, Auburn NSW 2144', met: true },
  { id: 5, criterion: 'Development type matches proposal', value: 'Alterations & Additions - Single Dwelling', met: true },
  { id: 6, criterion: 'Water target achieved', value: '40 points (Target: 40)', met: true },
  { id: 7, criterion: 'Energy target achieved', value: '50 points (Target: 50)', met: true },
  { id: 8, criterion: 'Thermal comfort pass', value: 'NatHERS 6.5 stars (Min: 6.0)', met: true },
  { id: 9, criterion: 'Commitments listed on plans', value: 'Rainwater tank, insulation, glazing specs shown', met: true },
  { id: 10, criterion: 'Digital signature present', value: 'Valid digital signature verified', met: true }
];

export function PreLodgementTimeline() {
  const [expandedStage, setExpandedStage] = useState<string | null>('lodgement');
  const [feeInputs, setFeeInputs] = useState({
    developmentCost: 350000,
    developmentType: 'alterations',
    landValue: 1200000,
    floorArea: 240
  });

  const toggleStage = (stageId: string) => {
    setExpandedStage(expandedStage === stageId ? null : stageId);
  };

  // Calculate fees based on inputs
  const calculateFees = () => {
    const { developmentCost, developmentType } = feeInputs;
    
    // Cumberland Council fee structure (example rates)
    let baseFee = 0;
    let additionalFee = 0;
    
    if (developmentType === 'alterations') {
      baseFee = 1220; // Base fee for alterations
      if (developmentCost > 100000) {
        additionalFee = (developmentCost - 100000) * 0.0052; // 0.52% of cost above $100k
      }
    } else if (developmentType === 'new-dwelling') {
      baseFee = 2440; // Base fee for new dwelling
      if (developmentCost > 100000) {
        additionalFee = (developmentCost - 100000) * 0.0062; // 0.62% of cost above $100k
      }
    }
    
    const daFee = baseFee + additionalFee;
    const longServiceLevy = developmentCost * 0.0035; // 0.35% levy
    const basixFee = 81; // BASIX certificate fee
    const advertisingFee = 520; // If advertising required
    
    return {
      daFee: Math.round(daFee),
      longServiceLevy: Math.round(longServiceLevy),
      basixFee,
      advertisingFee,
      total: Math.round(daFee + longServiceLevy + basixFee + advertisingFee)
    };
  };

  const fees = calculateFees();

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl mb-2">Pre-Lodgement & Lodgement Timeline</h1>
        <p className="text-sm sm:text-base text-slate-600">
          Complete checklist and process guide for DA submission
        </p>
      </div>

      {/* Overall Status */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl mb-1">Ready for Lodgement</h2>
            <p className="text-sm text-blue-100">All pre-lodgement requirements completed</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
            <span className="text-2xl font-bold">83%</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-xs text-blue-100 mb-1">Documents</div>
            <div className="text-xl font-bold">17/17</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-xs text-blue-100 mb-1">Compliance</div>
            <div className="text-xl font-bold">10/10</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-xs text-blue-100 mb-1">Reviews</div>
            <div className="text-xl font-bold">4/4</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-xs text-blue-100 mb-1">BASIX</div>
            <div className="text-xl font-bold">✓ Valid</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-xs text-blue-100 mb-1">Fees</div>
            <div className="text-xl font-bold">${fees.total.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {timelineStages.map((stage, index) => (
          <div key={stage.id} className="relative">
            {/* Connecting Line */}
            {index < timelineStages.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-slate-200 -mb-4" />
            )}

            {/* Stage Card */}
            <div className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
              stage.status === 'complete' ? 'border-green-300' :
              stage.status === 'in-progress' ? 'border-blue-400' :
              'border-slate-200'
            }`}>
              {/* Stage Header */}
              <button
                onClick={() => stage.expandable && toggleStage(stage.id)}
                className="w-full p-4 sm:p-6 flex items-start gap-4 text-left hover:bg-slate-50 transition-colors"
              >
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {stage.status === 'complete' ? (
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                  ) : stage.status === 'in-progress' ? (
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <Circle className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Stage Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="text-lg font-semibold text-slate-900">{stage.title}</h3>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full flex-shrink-0 ${
                      stage.status === 'complete' ? 'bg-green-100 text-green-700' :
                      stage.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {stage.date}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{stage.description}</p>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedStage === stage.id && (
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-200">
                  {stage.id === 'documents' && <DocumentsSection />}
                  {stage.id === 'compliance' && <ComplianceSection />}
                  {stage.id === 'plans' && <PlansSection />}
                  {stage.id === 'basix' && <BasixSection />}
                  {stage.id === 'fees' && <FeesSection fees={fees} inputs={feeInputs} setInputs={setFeeInputs} />}
                  {stage.id === 'lodgement' && <LodgementSection />}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsSection() {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-green-600" />
        <h4 className="font-semibold text-slate-900">All Required Documents Uploaded (17/17)</h4>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-3 font-semibold text-slate-700">Document</th>
              <th className="text-left p-3 font-semibold text-slate-700">Upload Date</th>
              <th className="text-left p-3 font-semibold text-slate-700">Size</th>
              <th className="text-left p-3 font-semibold text-slate-700">Version</th>
              <th className="text-left p-3 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {uploadedDocuments.map(doc => (
              <tr key={doc.id} className="hover:bg-slate-50">
                <td className="p-3">{doc.name}</td>
                <td className="p-3 text-slate-600">{doc.date}</td>
                <td className="p-3 text-slate-600">{doc.size}</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                    v{doc.version}
                  </span>
                </td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Uploaded
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          ✓ All 17 required documents have been uploaded and verified. Total package size: 47.8 MB
        </p>
      </div>
    </div>
  );
}

function ComplianceSection() {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-4">
        <FileCheck className="w-5 h-5 text-green-600" />
        <h4 className="font-semibold text-slate-900">Compliance Verification Criteria (10/10 Met)</h4>
      </div>

      <div className="space-y-3">
        {complianceCriteria.map(item => (
          <div key={item.id} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <div className="flex-shrink-0 mt-0.5">
              {item.met ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-900 mb-1">{item.criterion}</div>
              <div className="text-sm text-slate-600">{item.notes}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800 font-semibold mb-2">
          ✓ All compliance criteria met - Application ready for submission
        </p>
        <p className="text-sm text-slate-700">
          Verified by: David Park (Planning Consultant) on 21 Dec 2024
        </p>
      </div>
    </div>
  );
}

function PlansSection() {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-green-600" />
        <h4 className="font-semibold text-slate-900">Design Review & Approval Log</h4>
      </div>

      <div className="space-y-4">
        {planReviews.map(review => (
          <div key={review.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h5 className="font-semibold text-slate-900 mb-1">{review.plan}</h5>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                  Version {review.version}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                {review.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-slate-600">Reviewed by: </span>
                  <span className="font-medium text-slate-900">{review.reviewer}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Role: </span>
                <span className="text-slate-900">{review.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-slate-600">Review Date: </span>
                  <span className="text-slate-900">{review.reviewDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <div>
                  <span className="text-slate-600">Approved: </span>
                  <span className="text-slate-900">{review.approvalDate}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded p-3">
              <div className="text-xs font-semibold text-slate-700 mb-1">Review Comments:</div>
              <div className="text-sm text-slate-700">{review.comments}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          ✓ All key documents have been reviewed and approved by qualified team members
        </p>
      </div>
    </div>
  );
}

function BasixSection() {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-4">
        <FileCheck className="w-5 h-5 text-green-600" />
        <h4 className="font-semibold text-slate-900">BASIX Certificate Validation Criteria</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {basixCriteria.map(item => (
          <div key={item.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 mb-1">{item.criterion}</div>
              <div className="text-xs text-slate-600">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h5 className="font-semibold text-blue-900 mb-2 text-sm">BASIX Certificate Details:</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div><span className="text-blue-700">Certificate No:</span> <span className="font-mono">A123456</span></div>
          <div><span className="text-blue-700">Issue Date:</span> 20 Dec 2024</div>
          <div><span className="text-blue-700">Expiry Date:</span> 20 Jun 2025</div>
          <div><span className="text-blue-700">Valid for:</span> 176 days remaining</div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800 font-semibold mb-2">
          ✓ BASIX certificate is valid and meets all requirements
        </p>
        <p className="text-xs text-slate-700">
          Note: BASIX certificates are valid for 6 months from date of issue. Ensure all commitments are shown on architectural plans.
        </p>
      </div>
    </div>
  );
}

interface FeesSectionProps {
  fees: {
    daFee: number;
    longServiceLevy: number;
    basixFee: number;
    advertisingFee: number;
    total: number;
  };
  inputs: {
    developmentCost: number;
    developmentType: string;
    landValue: number;
    floorArea: number;
  };
  setInputs: (inputs: any) => void;
}

function FeesSection({ fees, inputs, setInputs }: FeesSectionProps) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-5 h-5 text-green-600" />
        <h4 className="font-semibold text-slate-900">Council Fees Calculator</h4>
      </div>

      {/* Fee Inputs */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
        <h5 className="font-semibold text-slate-900 mb-3 text-sm">Input Project Details:</h5>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Development Type:
            </label>
            <select
              value={inputs.developmentType}
              onChange={(e) => setInputs({ ...inputs, developmentType: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="alterations">Alterations & Additions</option>
              <option value="new-dwelling">New Dwelling</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cost of Development:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-600">$</span>
              <input
                type="number"
                value={inputs.developmentCost}
                onChange={(e) => setInputs({ ...inputs, developmentCost: parseInt(e.target.value) || 0 })}
                className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Land Value:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-600">$</span>
              <input
                type="number"
                value={inputs.landValue}
                onChange={(e) => setInputs({ ...inputs, landValue: parseInt(e.target.value) || 0 })}
                className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Total Floor Area (m²):
            </label>
            <input
              type="number"
              value={inputs.floorArea}
              onChange={(e) => setInputs({ ...inputs, floorArea: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-white border-2 border-blue-300 rounded-lg p-4 mb-4">
        <h5 className="font-semibold text-slate-900 mb-3 text-sm">Fee Calculation Breakdown:</h5>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <div>
              <div className="font-medium text-slate-900">DA Application Fee</div>
              <div className="text-xs text-slate-600">
                {inputs.developmentType === 'alterations' ? 
                  `Base: $1,220 + 0.52% of cost above $100k` :
                  `Base: $2,440 + 0.62% of cost above $100k`
                }
              </div>
            </div>
            <div className="font-semibold text-slate-900">${fees.daFee.toLocaleString()}</div>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <div>
              <div className="font-medium text-slate-900">Long Service Levy</div>
              <div className="text-xs text-slate-600">0.35% of development cost</div>
            </div>
            <div className="font-semibold text-slate-900">${fees.longServiceLevy.toLocaleString()}</div>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <div>
              <div className="font-medium text-slate-900">BASIX Certificate Fee</div>
              <div className="text-xs text-slate-600">NSW Planning Portal fee</div>
            </div>
            <div className="font-semibold text-slate-900">${fees.basixFee}</div>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <div>
              <div className="font-medium text-slate-900">Advertising Fee</div>
              <div className="text-xs text-slate-600">If public notification required</div>
            </div>
            <div className="font-semibold text-slate-900">${fees.advertisingFee}</div>
          </div>

          <div className="flex justify-between items-center pt-2 bg-blue-50 -mx-4 px-4 py-3 rounded">
            <div className="font-bold text-slate-900 text-lg">TOTAL PAYABLE</div>
            <div className="font-bold text-blue-600 text-2xl">${fees.total.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800 font-semibold mb-2">
          💡 Fee Payment Notes:
        </p>
        <ul className="text-xs text-slate-700 space-y-1">
          <li>• Fees must be paid at time of lodgement via credit card or bank transfer</li>
          <li>• Long Service Levy is payable to Building and Construction Industry Long Service Payments Corporation</li>
          <li>• If development cost changes, fee adjustment may be required</li>
          <li>• Some modifications may incur additional Section 4.55 fees</li>
        </ul>
      </div>
    </div>
  );
}

function LodgementSection() {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-4">
        <Upload className="w-5 h-5 text-blue-600" />
        <h4 className="font-semibold text-slate-900">NSW Planning Portal - Lodgement Guide</h4>
      </div>

      {/* Step-by-step process */}
      <div className="space-y-4">
        {/* Step 1 */}
        <div className="border-2 border-blue-300 rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h5 className="font-semibold text-slate-900">Access NSW Planning Portal</h5>
            </div>
          </div>
          <div className="p-4 bg-white">
            <div className="mb-3">
              <p className="text-sm text-slate-700 mb-2">Navigate to: <a href="https://www.planningportal.nsw.gov.au" className="text-blue-600 hover:underline font-mono text-xs" target="_blank" rel="noopener noreferrer">https://www.planningportal.nsw.gov.au</a></p>
            </div>
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 text-center">
              <div className="text-sm text-slate-600 mb-2">Screenshot: NSW Planning Portal Homepage</div>
              <div className="bg-white border-2 border-dashed border-slate-300 rounded h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏛️</div>
                  <div className="text-slate-500 text-sm">NSW Planning Portal</div>
                  <div className="text-xs text-slate-400 mt-1">Login or Create Account</div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-600">
              <strong>Action:</strong> Click "Log in" (top right) or "Create Account" if first time user
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="border-2 border-blue-300 rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h5 className="font-semibold text-slate-900">Start New Development Application</h5>
            </div>
          </div>
          <div className="p-4 bg-white">
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 text-center mb-3">
              <div className="text-sm text-slate-600 mb-2">Screenshot: Dashboard - Start Application</div>
              <div className="bg-white border-2 border-dashed border-slate-300 rounded h-48 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block mb-2">
                    + New Application
                  </div>
                  <div className="text-xs text-slate-400">Click to start DA lodgement process</div>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div><strong>Action:</strong> Click "+ New Application" button</div>
              <div><strong>Select:</strong> "Development Application (DA)" from application types</div>
              <div><strong>Select Council:</strong> Cumberland Council</div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border-2 border-blue-300 rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <h5 className="font-semibold text-slate-900">Enter Property Details</h5>
            </div>
          </div>
          <div className="p-4 bg-white">
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 mb-3">
              <div className="text-sm text-slate-600 mb-2">Screenshot: Property Search</div>
              <div className="bg-white rounded p-3 space-y-2">
                <div className="flex gap-2">
                  <input type="text" placeholder="123 Example Street, Auburn NSW 2144" className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm" readOnly />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Search</button>
                </div>
                <div className="text-xs text-slate-500">Or search by Lot/DP number</div>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <div>• Enter street address or Lot/DP details</div>
              <div>• Verify property location on map</div>
              <div>• Confirm land title details match your documents</div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="border-2 border-blue-300 rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <h5 className="font-semibold text-slate-900">Complete Application Form</h5>
            </div>
          </div>
          <div className="p-4 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="bg-slate-50 border border-slate-200 rounded p-3">
                <div className="font-semibold text-slate-900 text-sm mb-2">Section A: Applicant Details</div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>• Name, address, contact details</div>
                  <div>• Owner or authorized agent</div>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded p-3">
                <div className="font-semibold text-slate-900 text-sm mb-2">Section B: Development Details</div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>• Description of works</div>
                  <div>• Development cost</div>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded p-3">
                <div className="font-semibold text-slate-900 text-sm mb-2">Section C: Site Details</div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>• Lot/DP, zoning</div>
                  <div>• Existing use</div>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded p-3">
                <div className="font-semibold text-slate-900 text-sm mb-2">Section D: Declarations</div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>• Owner consent</div>
                  <div>• Accuracy statement</div>
                </div>
              </div>
            </div>
            <div className="text-sm text-slate-700">
              <strong>Tip:</strong> Use auto-fill from your prepared DA Application Form template
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="border-2 border-blue-300 rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
              <h5 className="font-semibold text-slate-900">Upload Supporting Documents</h5>
            </div>
          </div>
          <div className="p-4 bg-white">
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 mb-3">
              <div className="text-sm text-slate-600 mb-2">Screenshot: Document Upload Interface</div>
              <div className="bg-white rounded p-3 space-y-2">
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-slate-700">Drag & drop files or click to browse</div>
                  <div className="text-xs text-slate-500 mt-1">Accepted formats: PDF (max 10MB per file)</div>
                </div>
                <div className="text-xs text-slate-600 space-y-1 mt-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>DA Application Form.pdf (1.2 MB)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Statement Environmental Effects.pdf (4.5 MB)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Architectural Plans.pdf (12.6 MB)</span>
                  </div>
                  <div className="text-slate-400">+ 14 more documents...</div>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <div><strong>Required Documents:</strong> Upload all 17 documents from your Document Library</div>
              <div><strong>Format:</strong> PDF files only, max 10MB per file</div>
              <div><strong>Naming:</strong> Use clear, consistent file names (e.g., "Site_Plan_v2.pdf")</div>
              <div><strong>Total Size:</strong> Ensure combined upload doesn't exceed portal limits</div>
            </div>
          </div>
        </div>

        {/* Step 6 */}
        <div className="border-2 border-blue-300 rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
              <h5 className="font-semibold text-slate-900">Pay Application Fees</h5>
            </div>
          </div>
          <div className="p-4 bg-white">
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 mb-3">
              <div className="text-sm text-slate-600 mb-2">Screenshot: Fee Payment</div>
              <div className="bg-white rounded p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span>DA Application Fee</span>
                    <span className="font-semibold">$2,520</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Long Service Levy</span>
                    <span className="font-semibold">$1,225</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>BASIX Fee</span>
                    <span className="font-semibold">$81</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Advertising Fee</span>
                    <span className="font-semibold">$520</span>
                  </div>
                  <div className="flex justify-between pt-2 text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-blue-600">$4,346</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded text-sm">Pay by Credit Card</button>
                  <button className="flex-1 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded text-sm">Pay by BPAY</button>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <div><strong>Payment Methods:</strong> Credit/Debit card or BPAY</div>
              <div><strong>Receipt:</strong> Save payment confirmation for records</div>
              <div><strong>GST:</strong> Fees are GST-free</div>
            </div>
          </div>
        </div>

        {/* Step 7 */}
        <div className="border-2 border-green-300 rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3 border-b border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">7</div>
              <h5 className="font-semibold text-slate-900">Submit & Receive Confirmation</h5>
            </div>
          </div>
          <div className="p-4 bg-white">
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 mb-3">
              <div className="text-sm text-slate-600 mb-2">Screenshot: Lodgement Confirmation</div>
              <div className="bg-white rounded p-4 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <div className="text-lg font-bold text-green-600 mb-2">Application Submitted Successfully!</div>
                <div className="text-sm text-slate-700 mb-4">Your DA has been lodged with Cumberland Council</div>
                <div className="bg-slate-50 border border-slate-200 rounded p-3 text-left text-sm space-y-1">
                  <div><strong>Application Number:</strong> DA2024/12345</div>
                  <div><strong>Lodgement Date:</strong> 24 December 2024</div>
                  <div><strong>Reference:</strong> 123 Example Street, Auburn</div>
                  <div><strong>Assessment Period:</strong> 40 business days (standard)</div>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <div><strong>Email Confirmation:</strong> Check your inbox for lodgement receipt</div>
              <div><strong>Application Number:</strong> Use this to track your DA progress</div>
              <div><strong>Next Steps:</strong> Council will acknowledge receipt within 2-3 business days</div>
              <div><strong>Tracking:</strong> Monitor status via Planning Portal dashboard</div>
            </div>
          </div>
        </div>
      </div>

      {/* Post-Lodgement Notes */}
      <div className="mt-6 bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
        <h5 className="font-semibold text-blue-900 mb-3">📌 Post-Lodgement Actions</h5>
        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span><strong>Week 1-2:</strong> Council sends acknowledgement letter and allocates assessing officer</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span><strong>Week 2-4:</strong> Initial assessment and potential RFI (Request for Information) if issues identified</span>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span><strong>Week 4-6:</strong> Public exhibition period (if required) - neighbors notified</span>
          </div>
          <div className="flex items-start gap-2">
            <User className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <span><strong>Week 6-8:</strong> Assessment report prepared, referrals to specialists (if needed)</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span><strong>Week 8-10:</strong> Determination issued - approval, refusal, or deferred</span>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-amber-50 border border-amber-300 rounded-lg p-4">
        <h5 className="font-semibold text-amber-900 mb-2">⏱️ Assessment Timeframes</h5>
        <div className="text-sm text-slate-700 space-y-1">
          <div>• <strong>Standard DAs:</strong> 40 business days (approximately 8 weeks)</div>
          <div>• <strong>Designated Development:</strong> 90 days</div>
          <div>• <strong>Clock Stops:</strong> Timer pauses during RFI response period</div>
          <div>• <strong>Extensions:</strong> Council may request extension with your consent</div>
        </div>
      </div>
    </div>
  );
}
