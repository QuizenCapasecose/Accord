import { useState } from 'react';
import { CheckCircle2, Clock, FileText, ChevronDown, ChevronRight, AlertCircle, DollarSign } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  status: 'complete' | 'in-progress' | 'pending';
  expandable: boolean;
}

export function EnhancedPreLodgementTimeline() {
  const [expandedEvents, setExpandedEvents] = useState<string[]>(['documents']);
  const [showDocumentList, setShowDocumentList] = useState(false);
  const [showFeeCalculator, setShowFeeCalculator] = useState(false);
  const [ecw, setEcw] = useState('385000');

  const toggleEvent = (id: string) => {
    if (expandedEvents.includes(id)) {
      setExpandedEvents(expandedEvents.filter(e => e !== id));
    } else {
      setExpandedEvents([...expandedEvents, id]);
    }
  };

  const events: TimelineEvent[] = [
    { id: 'start', title: 'Pre-lodgement Started', date: '15 Oct 2024', status: 'complete', expandable: true },
    { id: 'documents', title: 'All Documents Uploaded', date: '28 Oct 2024', status: 'complete', expandable: true },
    { id: 'compliance', title: 'Compliance Check Passed', date: '05 Nov 2024', status: 'complete', expandable: true },
    { id: 'plans', title: 'Plans Reviewed and Approved', date: '12 Nov 2024', status: 'complete', expandable: true },
    { id: 'basix', title: 'BASIX Certificate - Valid & Linked', date: '14 Nov 2024', status: 'complete', expandable: true },
    { id: 'fees', title: 'Council Fees Calculated', date: '18 Nov 2024', status: 'in-progress', expandable: true },
    { id: 'lodgement', title: 'Ready for Lodgement', date: 'Pending', status: 'pending', expandable: false }
  ];

  const documents = [
    { type: 'DA Application Form', filename: 'DA_Form_Auburn_v3.pdf', version: 'v3', status: 'Uploaded' },
    { type: 'Statement of Environmental Effects', filename: 'SEE_123_Example_St.pdf', version: 'v2', status: 'Uploaded' },
    { type: 'Architectural Plans', filename: 'Arch_Plans_A-Series.pdf', version: 'v4', status: 'Uploaded' },
    { type: 'Survey Plan', filename: 'Survey_DP1234567.pdf', version: 'v1', status: 'Uploaded' },
    { type: 'BASIX Certificate', filename: 'BASIX_1234567A.pdf', version: 'v1', status: 'Uploaded' },
    { type: 'Waste Management Plan', filename: 'WMP_v2.pdf', version: 'v2', status: 'Uploaded' },
    { type: 'Stormwater Management Plan', filename: 'Stormwater_OSD_Report.pdf', version: 'v1', status: 'Uploaded' },
    { type: 'Arborist Report', filename: 'Arborist_Report_AQ12345.pdf', version: 'v1', status: 'Uploaded' },
    { type: 'Traffic Impact Assessment', filename: 'Traffic_Assessment.pdf', version: 'v1', status: 'Pending' },
    { type: 'Heritage Impact Statement', filename: 'Heritage_Statement.pdf', version: 'v1', status: 'N/A' },
    { type: 'Geotechnical Report', filename: 'Geotech_Report_Site123.pdf', version: 'v1', status: 'Uploaded' },
    { type: 'Section 88B Instrument', filename: '88B_Restriction.pdf', version: 'v1', status: 'Uploaded' },
  ];

  const complianceCriteria = [
    { item: 'Zoning & permissibility confirmed (LEP/SEPP)', status: 'pass' },
    { item: 'Height/FSR/site coverage within limits', status: 'pass' },
    { item: 'Setbacks, POS, deep soil, parking compliant', status: 'pass' },
    { item: 'BASIX valid and matches plans', status: 'pass' },
    { item: 'Survey, 88B, reports uploaded and in date', status: 'pass' }
  ];

  const plansReview = [
    { document: 'Site Plan', version: 'v03', reviewedBy: 'J. Smith', role: 'Designer', date: '12/11/2024', status: 'Approved' },
    { document: 'Floor Plans', version: 'v02', reviewedBy: 'A. Patel', role: 'Director', date: '13/11/2024', status: 'Approved' },
    { document: 'Elevations', version: 'v02', reviewedBy: 'A. Patel', role: 'Director', date: '13/11/2024', status: 'Approved' },
    { document: 'Stormwater Plans', version: 'v01', reviewedBy: 'K. Lee', role: 'Engineer', date: '14/11/2024', status: 'Approved' }
  ];

  const basixChecklist = [
    { item: 'Address matches site', status: 'pass' },
    { item: 'Same dwelling type and number of bedrooms', status: 'pass' },
    { item: 'Certificate not superseded by later version', status: 'pass' },
    { item: 'Commitments reflected in plans (glazing, insulation, tank size, etc.)', status: 'pass' }
  ];

  const calculateFees = () => {
    const ecwValue = parseFloat(ecw) || 0;
    const daFee = ecwValue <= 100000 ? 1500 : ecwValue <= 250000 ? 2800 : 4200;
    const advertisingFee = 500;
    const planningPortalFee = 85;
    const s712Contribution = ecwValue * 0.005; // 0.5%
    return {
      daFee,
      advertisingFee,
      planningPortalFee,
      s712Contribution,
      total: daFee + advertisingFee + planningPortalFee + s712Contribution
    };
  };

  const fees = calculateFees();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Pre-Lodgement Timeline</h2>
        <p className="opacity-90">Track progress from project start to lodgement readiness</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-300 hidden sm:block"></div>

        <div className="space-y-6">
          {events.map((event, index) => {
            const isExpanded = expandedEvents.includes(event.id);
            
            return (
              <div key={event.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 w-5 h-5 rounded-full border-4 border-white hidden sm:block z-10"
                  style={{
                    backgroundColor: event.status === 'complete' ? '#22c55e' : event.status === 'in-progress' ? '#f59e0b' : '#cbd5e1'
                  }}
                ></div>

                {/* Content card */}
                <div className="sm:ml-16 bg-white rounded-xl shadow-lg overflow-hidden border-2 border-slate-200">
                  <div
                    className={`p-4 sm:p-6 ${event.expandable ? 'cursor-pointer' : ''} ${
                      event.status === 'complete' ? 'bg-gradient-to-r from-green-50 to-emerald-50' :
                      event.status === 'in-progress' ? 'bg-gradient-to-r from-amber-50 to-orange-50' :
                      'bg-slate-50'
                    }`}
                    onClick={() => event.expandable && toggleEvent(event.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {event.status === 'complete' && <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />}
                        {event.status === 'in-progress' && <Clock className="w-6 h-6 text-amber-600 flex-shrink-0" />}
                        {event.status === 'pending' && <AlertCircle className="w-6 h-6 text-slate-400 flex-shrink-0" />}
                        
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 text-base sm:text-lg">{event.title}</h3>
                          <p className="text-sm text-slate-600 mt-1">{event.date}</p>
                        </div>
                      </div>

                      {event.expandable && (
                        <div className="ml-3">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-slate-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="p-4 sm:p-6 bg-white border-t-2 border-slate-200">
                      {/* START EVENT */}
                      {event.id === 'start' && (
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>User created project in MetroBuild QMS</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Council selected: <strong>Cumberland Council</strong></span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Zoning/controls loaded: <strong>R3 Medium Density Residential</strong></span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Project type: <strong>Residential - Dual Occupancy</strong></span>
                          </div>
                        </div>
                      )}

                      {/* DOCUMENTS EVENT */}
                      {event.id === 'documents' && (
                        <div>
                          <button
                            onClick={() => setShowDocumentList(!showDocumentList)}
                            className="w-full px-4 py-3 bg-blue-100 text-blue-800 rounded-lg font-semibold hover:bg-blue-200 transition-colors flex items-center justify-between mb-4"
                          >
                            <span>View Document List</span>
                            {showDocumentList ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                          </button>

                          {showDocumentList && (
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm border-2 border-slate-300 rounded-lg">
                                <thead className="bg-slate-100">
                                  <tr>
                                    <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Document Type</th>
                                    <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Filename</th>
                                    <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Version</th>
                                    <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {documents.map((doc, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50">
                                      <td className="border border-slate-300 px-3 py-2">{doc.type}</td>
                                      <td className="border border-slate-300 px-3 py-2 font-mono text-xs">{doc.filename}</td>
                                      <td className="border border-slate-300 px-3 py-2 text-center">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold">
                                          {doc.version}
                                        </span>
                                      </td>
                                      <td className="border border-slate-300 px-3 py-2">
                                        {doc.status === 'Uploaded' && (
                                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                            ✓ {doc.status}
                                          </span>
                                        )}
                                        {doc.status === 'Pending' && (
                                          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                                            ⏱ {doc.status}
                                          </span>
                                        )}
                                        {doc.status === 'N/A' && (
                                          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                                            {doc.status}
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}

                      {/* COMPLIANCE EVENT */}
                      {event.id === 'compliance' && (
                        <div>
                          <div className="mb-4 p-3 bg-green-100 border-2 border-green-300 rounded-lg flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-700" />
                            <span className="font-bold text-green-900">Compliance Check: PASS</span>
                          </div>

                          <div className="space-y-2">
                            {complianceCriteria.map((criterion, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-700">{criterion.item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* PLANS EVENT */}
                      {event.id === 'plans' && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border-2 border-slate-300 rounded-lg">
                            <thead className="bg-blue-100">
                              <tr>
                                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-blue-900">Document</th>
                                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-blue-900">Version</th>
                                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-blue-900">Reviewed by</th>
                                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-blue-900">Role</th>
                                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-blue-900">Date Approved</th>
                                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-blue-900">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {plansReview.map((plan, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                  <td className="border border-slate-300 px-3 py-2 font-semibold">{plan.document}</td>
                                  <td className="border border-slate-300 px-3 py-2">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold text-xs">
                                      {plan.version}
                                    </span>
                                  </td>
                                  <td className="border border-slate-300 px-3 py-2">{plan.reviewedBy}</td>
                                  <td className="border border-slate-300 px-3 py-2 text-slate-600">{plan.role}</td>
                                  <td className="border border-slate-300 px-3 py-2">{plan.date}</td>
                                  <td className="border border-slate-300 px-3 py-2">
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                      ✓ {plan.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* BASIX EVENT */}
                      {event.id === 'basix' && (
                        <div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div className="p-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
                              <div className="text-xs font-semibold text-blue-800 mb-1">BASIX Number</div>
                              <div className="font-bold text-slate-900">1234567A</div>
                            </div>
                            <div className="p-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
                              <div className="text-xs font-semibold text-blue-800 mb-1">Issue Date</div>
                              <div className="font-bold text-slate-900">08 Oct 2024</div>
                            </div>
                            <div className="p-3 bg-green-50 border-2 border-green-300 rounded-lg">
                              <div className="text-xs font-semibold text-green-800 mb-1">Expiry Status</div>
                              <div className="font-bold text-green-700">VALID (177 days left)</div>
                            </div>
                          </div>

                          <div className="bg-slate-50 border-2 border-slate-300 rounded-lg p-4">
                            <h4 className="font-bold text-slate-900 mb-3">Validity Checklist:</h4>
                            <div className="space-y-2">
                              {basixChecklist.map((check, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-2 bg-white rounded border border-green-200">
                                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-slate-700">{check.item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* FEES EVENT */}
                      {event.id === 'fees' && (
                        <div>
                          <button
                            onClick={() => setShowFeeCalculator(!showFeeCalculator)}
                            className="w-full px-4 py-3 bg-amber-100 text-amber-800 rounded-lg font-semibold hover:bg-amber-200 transition-colors flex items-center justify-between mb-4"
                          >
                            <span>View Fee Calculator</span>
                            <DollarSign className="w-5 h-5" />
                          </button>

                          {showFeeCalculator && (
                            <div className="space-y-4">
                              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                                <label className="block font-semibold text-blue-900 mb-2">
                                  Estimated Cost of Works (ECW):
                                </label>
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold">$</span>
                                  <input
                                    type="number"
                                    value={ecw}
                                    onChange={(e) => setEcw(e.target.value)}
                                    className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-lg text-lg font-bold"
                                  />
                                </div>
                              </div>

                              <div className="bg-white border-2 border-slate-300 rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                  <thead className="bg-slate-100">
                                    <tr>
                                      <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Fee Type</th>
                                      <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Basis</th>
                                      <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="hover:bg-slate-50">
                                      <td className="border border-slate-300 px-4 py-3 font-semibold">DA Application Fee</td>
                                      <td className="border border-slate-300 px-4 py-3 text-slate-600">ECW band</td>
                                      <td className="border border-slate-300 px-4 py-3 text-right font-mono">${fees.daFee.toFixed(2)}</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                      <td className="border border-slate-300 px-4 py-3 font-semibold">Advertising Fee</td>
                                      <td className="border border-slate-300 px-4 py-3 text-slate-600">Flat rate / per notice</td>
                                      <td className="border border-slate-300 px-4 py-3 text-right font-mono">${fees.advertisingFee.toFixed(2)}</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                      <td className="border border-slate-300 px-4 py-3 font-semibold">Planning Portal Fee</td>
                                      <td className="border border-slate-300 px-4 py-3 text-slate-600">NSW schedule</td>
                                      <td className="border border-slate-300 px-4 py-3 text-right font-mono">${fees.planningPortalFee.toFixed(2)}</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                      <td className="border border-slate-300 px-4 py-3 font-semibold">Section 7.12 Contribution</td>
                                      <td className="border border-slate-300 px-4 py-3 text-slate-600">0.5% of ECW</td>
                                      <td className="border border-slate-300 px-4 py-3 text-right font-mono">${fees.s712Contribution.toFixed(2)}</td>
                                    </tr>
                                    <tr className="bg-gradient-to-r from-green-100 to-emerald-100">
                                      <td colSpan={2} className="border border-green-300 px-4 py-3 font-bold text-green-900 text-base">
                                        TOTAL FEES PAYABLE
                                      </td>
                                      <td className="border border-green-300 px-4 py-3 text-right font-bold text-green-900 text-lg font-mono">
                                        ${fees.total.toFixed(2)}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              <div className="bg-blue-50 border border-blue-300 rounded-lg p-3 text-sm text-blue-900">
                                <strong>Note:</strong> Calculation based on ECW band, s7.12 at 0.5% of ECW where applicable.
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
