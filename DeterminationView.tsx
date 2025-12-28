import { useState } from 'react';
import { CheckCircle2, FileText, ArrowRight, Download, AlertCircle, Eye, ChevronDown, ChevronRight } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { NoticeOfDetermination } from './templates/NoticeOfDetermination';
import { PreConstructionChecklist } from './PreConstructionChecklist';
import { ConstructionCertificate } from './templates/ConstructionCertificate';
import { ErosionSedimentControlPlan } from './templates/ErosionSedimentControlPlan';
import { HoardingSiteFencingPlan } from './templates/HoardingSiteFencingPlan';
import { LongServiceLevyForm } from './templates/LongServiceLevyForm';
import { PreLodgementTimeline } from './PreLodgementTimeline';
import { ComprehensiveConditionsView } from './ComprehensiveConditionsView';
import { EnhancedPreLodgementTimeline } from './EnhancedPreLodgementTimeline';
import { LodgementProcessGuide } from './LodgementProcessGuide';

type DocumentType = 'determination' | 'checklist' | 'cc' | 'erosion' | 'hoarding' | 'levy' | 'timeline' | null;

// All 18 Conditions with full details
const allConditions = [
  // Pre-Construction (6)
  {
    id: 'A1',
    category: 'Pre-Construction',
    title: 'Construction Certificate Required',
    description: 'A Construction Certificate must be obtained from the Principal Certifier and a copy provided to Council before any building work commences.',
    compliance: 'Before any works',
    responsibility: 'Applicant/Builder',
    notes: 'CC application requires satisfaction of all pre-CC conditions'
  },
  {
    id: 'A2',
    category: 'Pre-Construction',
    title: 'Erosion & Sediment Control',
    description: 'Erosion and sediment control measures must be installed prior to commencement of works in accordance with the approved ESCP.',
    compliance: 'Before earthworks',
    responsibility: 'Builder',
    notes: 'See approved Erosion & Sediment Control Plan'
  },
  {
    id: 'A3',
    category: 'Pre-Construction',
    title: 'Hoarding & Site Fencing',
    description: 'Site hoarding and fencing must be erected before any works commence. Front boundary: solid hoarding min 1.8m height. Side/rear: chain mesh fencing.',
    compliance: 'Before any works',
    responsibility: 'Builder',
    notes: 'Photo evidence to Principal Certifier required'
  },
  {
    id: 'A4',
    category: 'Pre-Construction',
    title: 'Long Service Levy Payment',
    description: 'Evidence of payment of the Long Service Levy to iCare NSW must be submitted to the Principal Certifier before commencement.',
    compliance: 'Before any works',
    responsibility: 'Applicant',
    notes: 'Levy: 0.35% of building cost. Payment receipt required.'
  },
  {
    id: 'A5',
    category: 'Pre-Construction',
    title: 'Dilapidation Report',
    description: 'A dilapidation report of adjoining properties at 121 and 125 Example Street must be prepared by a qualified structural engineer and provided to affected owners.',
    compliance: 'Before excavation',
    responsibility: 'Applicant',
    notes: 'Required due to excavation depth >1m within 6m of boundary'
  },
  {
    id: 'A6',
    category: 'Pre-Construction',
    title: 'Section 7.12 Contributions',
    description: 'Development contributions of $12,450 must be paid to Cumberland Council before issue of Construction Certificate.',
    compliance: 'Before CC issue',
    responsibility: 'Applicant',
    notes: 'Based on cost of development. Council receipt required.'
  },

  // During Construction (8)
  {
    id: 'B1',
    category: 'During Construction',
    title: 'Approved Plans Compliance',
    description: 'All building work must be carried out in strict accordance with Development Consent DA-2024/12345 and Construction Certificate plans.',
    compliance: 'Ongoing',
    responsibility: 'Builder/Principal Certifier',
    notes: 'Any variations require modification application'
  },
  {
    id: 'B2',
    category: 'During Construction',
    title: 'Mandatory Inspections',
    description: 'Principal Certifier must be notified 48 hours before: foundation excavation, slab reinforcement, frame, waterproofing, and final inspection.',
    compliance: 'Ongoing',
    responsibility: 'Builder/Principal Certifier',
    notes: 'No work to proceed until inspection passed'
  },
  {
    id: 'B3',
    category: 'During Construction',
    title: 'Construction Hours',
    description: 'Work must only be carried out Monday-Friday 7am-6pm, Saturday 8am-1pm. No work Sundays or public holidays.',
    compliance: 'Ongoing',
    responsibility: 'Builder',
    notes: 'Out of hours work requires Council approval'
  },
  {
    id: 'B4',
    category: 'During Construction',
    title: 'Waste Management',
    description: 'All waste must be managed in accordance with the approved Waste Management Plan. Recycling targets: 70% of construction waste.',
    compliance: 'Ongoing',
    responsibility: 'Builder',
    notes: 'Waste dockets to be provided to Principal Certifier'
  },
  {
    id: 'B5',
    category: 'During Construction',
    title: 'Tree Protection',
    description: 'Tree protection fencing for retained trees T1 and T2 must be installed and maintained. No storage or access within TPZ.',
    compliance: 'Ongoing',
    responsibility: 'Builder',
    notes: 'As per approved Arborist Report recommendations'
  },
  {
    id: 'B6',
    category: 'During Construction',
    title: 'Stormwater Quality',
    description: 'Sediment-laden water must not leave the site. ESCP measures to be maintained and inspected weekly.',
    compliance: 'Ongoing',
    responsibility: 'Builder',
    notes: 'Immediate stop work if sediment discharge occurs'
  },
  {
    id: 'B7',
    category: 'During Construction',
    title: 'Noise & Vibration Limits',
    description: 'Construction noise must comply with EPA guidelines. Vibration monitoring if required by dilapidation engineer.',
    compliance: 'Ongoing',
    responsibility: 'Builder',
    notes: 'Respond to complaints within 24 hours'
  },
  {
    id: 'B8',
    category: 'During Construction',
    title: 'Site Notice - DA Details',
    description: 'A site notice displaying DA number, CC number, Principal Certifier details and builder licence must be displayed at front boundary.',
    compliance: 'Ongoing',
    responsibility: 'Builder',
    notes: 'Minimum A4 size, weatherproof, clearly visible'
  },

  // Post-Construction / Pre-Occupation (4)
  {
    id: 'C1',
    category: 'Post-Construction',
    title: 'Occupation Certificate Required',
    description: 'An Occupation Certificate must be issued by the Principal Certifier before the building can be occupied or used.',
    compliance: 'Before occupation',
    responsibility: 'Principal Certifier',
    notes: 'Final inspection required. All conditions satisfied.'
  },
  {
    id: 'C2',
    category: 'Post-Construction',
    title: 'BASIX Compliance Certificate',
    description: 'Evidence that all BASIX commitments (rainwater tank, insulation, glazing, lighting) have been installed must be provided to Principal Certifier.',
    compliance: 'Before OC',
    responsibility: 'Builder/Certifier',
    notes: 'Certifier inspection and photographic evidence required'
  },
  {
    id: 'C3',
    category: 'Post-Construction',
    title: 'Stormwater Drainage Completion',
    description: 'On-site detention system (5000L tank) and all stormwater works must be installed and certified by a qualified engineer.',
    compliance: 'Before OC',
    responsibility: 'Civil Engineer/Certifier',
    notes: 'Works-as-executed plan and engineer certification'
  },
  {
    id: 'C4',
    category: 'Post-Construction',
    title: 'Landscaping Completion',
    description: 'All landscaping works including 4x canopy trees, raingarden, and turf must be completed in accordance with approved Landscape Plan.',
    compliance: 'Before OC or within 6 months',
    responsibility: 'Applicant',
    notes: 'Photographic evidence to Council. Maintenance period 12 months.'
  }
];

export function DeterminationView() {
  const { project, updateProject } = useProject();
  const [accepted, setAccepted] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<DocumentType>(null);
  const [expandedConditions, setExpandedConditions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'conditions' | 'timeline'>('overview');

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      updateProject({ currentStage: 'post-consent' });
    }, 1500);
  };

  const toggleCondition = (id: string) => {
    if (expandedConditions.includes(id)) {
      setExpandedConditions(expandedConditions.filter(c => c !== id));
    } else {
      setExpandedConditions([...expandedConditions, id]);
    }
  };

  const preConstruction = allConditions.filter(c => c.category === 'Pre-Construction');
  const duringConstruction = allConditions.filter(c => c.category === 'During Construction');
  const postConstruction = allConditions.filter(c => c.category === 'Post-Construction');

  return (
    <div className="container mx-auto p-4 lg:p-6 max-w-[1400px]">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 lg:p-8 mb-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
              <span className="text-sm opacity-90">Stage 4 of 5</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Development Consent Granted</h1>
            <p className="text-sm lg:text-base opacity-90">
              Review conditions and prepare for construction
            </p>
          </div>
        </div>

        {/* Approval Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-[rgb(59,23,112)]">DA-2025-0456</div>
            <div className="text-sm opacity-90">Consent Number</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-[rgb(118,20,100)]">45 Days</div>
            <div className="text-sm opacity-90">Assessment Time</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-[rgb(38,40,153)]">18</div>
            <div className="text-sm opacity-90">Conditions</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-[rgb(15,36,30)]">5 Years</div>
            <div className="text-sm opacity-90">Validity</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap mb-6">
        {[
          { id: 'overview', label: '📄 Documents & Overview' },
          { id: 'conditions', label: '📋 All 18 Conditions' },
          { id: 'timeline', label: '📅 Pre-Lodgement Timeline' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50 shadow border-2 border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <>
          {/* Consent Documents */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Consent Documents</h2>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:shadow-md transition-shadow gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-bold text-slate-800">Notice of Determination</div>
                    <div className="text-sm text-slate-600">Approval granted with conditions</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => setViewingDocument('determination')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 hover:shadow-md transition-shadow gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-bold text-slate-800">Pre-Construction Conditions Checklist</div>
                    <div className="text-sm text-slate-600">Detailed checklist of all critical conditions</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => setViewingDocument('checklist')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:shadow-md transition-shadow gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                  <div>
                    <div className="font-bold text-slate-800">Construction Certificate (Example)</div>
                    <div className="text-sm text-slate-600">Sample CC for reference</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => setViewingDocument('cc')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 hover:shadow-md transition-shadow gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-orange-600" />
                  <div>
                    <div className="font-bold text-slate-800">Erosion & Sediment Control Plan</div>
                    <div className="text-sm text-slate-600">Site-specific ESCP template</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => setViewingDocument('erosion')}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border-2 border-indigo-200 hover:shadow-md transition-shadow gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <div>
                    <div className="font-bold text-slate-800">Hoarding & Site Fencing Plan</div>
                    <div className="text-sm text-slate-600">Safety and security measures</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => setViewingDocument('hoarding')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-2 border-teal-200 hover:shadow-md transition-shadow gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-teal-600" />
                  <div>
                    <div className="font-bold text-slate-800">Long Service Levy Payment Form</div>
                    <div className="text-sm text-slate-600">iCare NSW levy form and calculator</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => setViewingDocument('levy')}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Conditions Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Conditions Summary</h2>
            
            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-slate-800">Pre-Construction</h3>
                </div>
                <div className="text-3xl font-bold text-red-600 mb-1">6</div>
                <p className="text-sm text-slate-600">Must complete before starting work</p>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-slate-800">During Construction</h3>
                </div>
                <div className="text-3xl font-bold text-amber-600 mb-1">8</div>
                <p className="text-sm text-slate-600">Ongoing compliance required</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-800">Post-Construction</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">4</div>
                <p className="text-sm text-slate-600">Complete before occupation</p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                💡 <strong>Tip:</strong> Switch to the "All 18 Conditions" tab to view comprehensive details of every condition including compliance requirements, responsibility, and notes.
              </p>
            </div>
          </div>
        </>
      )}

      {/* CONDITIONS TAB */}
      {activeTab === 'conditions' && (
        <div className="space-y-6">
          {/* Pre-Construction Conditions */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Pre-Construction Conditions (6)</h2>
                  <p className="text-sm opacity-90">Must be satisfied before any works commence</p>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-slate-200">
              {preConstruction.map(condition => (
                <div key={condition.id} className="border-b border-slate-200">
                  <button
                    onClick={() => toggleCondition(condition.id)}
                    className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-red-700">{condition.id}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900">{condition.title}</div>
                        <div className="text-sm text-slate-600 mt-1">{condition.description}</div>
                      </div>
                    </div>
                    {expandedConditions.includes(condition.id) ? (
                      <ChevronDown className="w-5 h-5 text-red-600 flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />
                    )}
                  </button>

                  {expandedConditions.includes(condition.id) && (
                    <div className="px-4 sm:px-6 pb-4 bg-red-50">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white border border-red-200 rounded-lg p-3">
                          <div className="text-xs font-semibold text-red-800 mb-1">COMPLIANCE TIMING</div>
                          <div className="text-sm font-bold text-slate-900">{condition.compliance}</div>
                        </div>
                        <div className="bg-white border border-red-200 rounded-lg p-3">
                          <div className="text-xs font-semibold text-red-800 mb-1">RESPONSIBILITY</div>
                          <div className="text-sm font-bold text-slate-900">{condition.responsibility}</div>
                        </div>
                        <div className="bg-white border border-red-200 rounded-lg p-3">
                          <div className="text-xs font-semibold text-red-800 mb-1">ADDITIONAL NOTES</div>
                          <div className="text-sm text-slate-700">{condition.notes}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* During Construction Conditions */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">During Construction Conditions (8)</h2>
                  <p className="text-sm opacity-90">Ongoing compliance required throughout works</p>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-slate-200">
              {duringConstruction.map(condition => (
                <div key={condition.id} className="border-b border-slate-200">
                  <button
                    onClick={() => toggleCondition(condition.id)}
                    className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-amber-700">{condition.id}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900">{condition.title}</div>
                        <div className="text-sm text-slate-600 mt-1">{condition.description}</div>
                      </div>
                    </div>
                    {expandedConditions.includes(condition.id) ? (
                      <ChevronDown className="w-5 h-5 text-amber-600 flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />
                    )}
                  </button>

                  {expandedConditions.includes(condition.id) && (
                    <div className="px-4 sm:px-6 pb-4 bg-amber-50">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white border border-amber-200 rounded-lg p-3">
                          <div className="text-xs font-semibold text-amber-800 mb-1">COMPLIANCE TIMING</div>
                          <div className="text-sm font-bold text-slate-900">{condition.compliance}</div>
                        </div>
                        <div className="bg-white border border-amber-200 rounded-lg p-3">
                          <div className="text-xs font-semibold text-amber-800 mb-1">RESPONSIBILITY</div>
                          <div className="text-sm font-bold text-slate-900">{condition.responsibility}</div>
                        </div>
                        <div className="bg-white border border-amber-200 rounded-lg p-3">
                          <div className="text-xs font-semibold text-amber-800 mb-1">ADDITIONAL NOTES</div>
                          <div className="text-sm text-slate-700">{condition.notes}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Post-Construction Conditions */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Post-Construction Conditions (4)</h2>
                  <p className="text-sm opacity-90">Must be satisfied before Occupation Certificate</p>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-slate-200">
              {postConstruction.map(condition => (
                <div key={condition.id} className="border-b border-slate-200">
                  <button
                    onClick={() => toggleCondition(condition.id)}
                    className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-700">{condition.id}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900">{condition.title}</div>
                        <div className="text-sm text-slate-600 mt-1">{condition.description}</div>
                      </div>
                    </div>
                    {expandedConditions.includes(condition.id) ? (
                      <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />
                    )}
                  </button>

                  {expandedConditions.includes(condition.id) && (
                    <div className="px-4 sm:px-6 pb-4 bg-blue-50">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white border border-blue-200 rounded-lg p-3">
                          <div className="text-xs font-semibold text-blue-800 mb-1">COMPLIANCE TIMING</div>
                          <div className="text-sm font-bold text-slate-900">{condition.compliance}</div>
                        </div>
                        <div className="bg-white border border-blue-200 rounded-lg p-3">
                          <div className="text-xs font-semibold text-blue-800 mb-1">RESPONSIBILITY</div>
                          <div className="text-sm font-bold text-slate-900">{condition.responsibility}</div>
                        </div>
                        <div className="bg-white border border-blue-200 rounded-lg p-3">
                          <div className="text-xs font-semibold text-blue-800 mb-1">ADDITIONAL NOTES</div>
                          <div className="text-sm text-slate-700">{condition.notes}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TIMELINE TAB */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <EnhancedPreLodgementTimeline />
        </div>
      )}

      {/* Accept and Proceed */}
      {!accepted ? (
        <button
          onClick={handleAccept}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center justify-center gap-3 mt-6"
        >
          <CheckCircle2 className="w-6 h-6" />
          Accept Conditions & Proceed to Post-Consent
          <ArrowRight className="w-6 h-6" />
        </button>
      ) : (
        <div className="p-6 bg-green-50 border-2 border-green-500 rounded-xl mt-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-xl font-bold text-green-800">Conditions Accepted</div>
              <div className="text-sm text-green-700">Moving to Post-Consent phase...</div>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-8">
            <div className="sticky top-0 bg-white border-b-2 border-slate-200 p-4 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  {viewingDocument === 'determination' && 'Notice of Determination'}
                  {viewingDocument === 'checklist' && 'Pre-Construction Conditions Checklist'}
                  {viewingDocument === 'cc' && 'Construction Certificate (Example)'}
                  {viewingDocument === 'erosion' && 'Erosion & Sediment Control Plan'}
                  {viewingDocument === 'hoarding' && 'Hoarding & Site Fencing Plan'}
                  {viewingDocument === 'levy' && 'Long Service Levy Payment Form'}
                  {viewingDocument === 'timeline' && 'Pre-Lodgement Timeline'}
                </h2>
                <button
                  onClick={() => setViewingDocument(null)}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {viewingDocument === 'determination' && <NoticeOfDetermination />}
              {viewingDocument === 'checklist' && <PreConstructionChecklist />}
              {viewingDocument === 'cc' && <ConstructionCertificate />}
              {viewingDocument === 'erosion' && <ErosionSedimentControlPlan />}
              {viewingDocument === 'hoarding' && <HoardingSiteFencingPlan />}
              {viewingDocument === 'levy' && <LongServiceLevyForm />}
              {viewingDocument === 'timeline' && <EnhancedPreLodgementTimeline />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}