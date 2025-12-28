import { useState } from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Book, ChevronDown, ChevronRight, Search, ArrowRight } from 'lucide-react';
import { lepControls, dcpControls, documentTemplates } from '../data/cumberland-controls';
import { useProject } from '../context/ProjectContext';
import { DocumentSubmissionWorkflow } from './DocumentSubmissionWorkflow';
import { PreLodgementTimeline } from './PreLodgementTimeline';

export function PreLodgementView() {
  const { project, updateProject } = useProject();
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'compliance' | 'controls' | 'timeline'>('overview');
  const [expandedLEPCategory, setExpandedLEPCategory] = useState<string | null>('Land Use Zoning');
  const [expandedDCPCategory, setExpandedDCPCategory] = useState<string | null>('Part 3 - Residential Development');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocType, setSelectedDocType] = useState<string>('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-2xl">🔍</span>
          </div>
          <span className="text-sm opacity-90">Stage 1 of 5</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Pre-Lodgement Preparation</h1>
        <p className="opacity-90">Complete all requirements before submitting your DA</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'overview', label: '📋 Overview' },
          { id: 'documents', label: '✓ Document Checklist' },
          { id: 'compliance', label: '⚖️ Compliance Assessment' },
          { id: 'controls', label: '📖 LEP & DCP Controls' },
          { id: 'timeline', label: '📅 Timeline' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50 shadow'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-sm text-slate-600 mb-2">Documents Complete</div>
              <div className="text-4xl font-bold text-blue-600 mb-2">8/25</div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-sm text-slate-600 mb-2">Compliance Score</div>
              <div className="text-4xl font-bold text-amber-600 mb-2">88%</div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="h-2 bg-amber-600 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-sm text-slate-600 mb-2">Issues to Resolve</div>
              <div className="text-4xl font-bold text-red-600 mb-2">1</div>
              <div className="text-sm text-slate-600">Front Setback Variation</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-6 shadow-md">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Next Steps</h3>
                <ul className="space-y-1 text-sm text-amber-800">
                  <li>• Upload 17 remaining required documents</li>
                  <li>• Prepare variation justification for front setback</li>
                  <li>• Complete acoustic assessment (RFI likely)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENTS TAB */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <DocumentSubmissionWorkflow />
        </div>
      )}

      {/* COMPLIANCE TAB */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-sm text-slate-600 mb-2">Overall Compliance</div>
              <div className="text-5xl font-bold text-amber-600 mb-3">88%</div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div className="h-3 bg-amber-600 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-sm text-slate-600 mb-2">Non-Compliant Items</div>
              <div className="text-5xl font-bold text-red-600 mb-3">1</div>
              <div className="text-sm text-slate-600">Requires variation</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-sm text-slate-600 mb-2">Predicted RFIs</div>
              <div className="text-5xl font-bold text-amber-600 mb-3">1-2</div>
              <div className="text-sm text-slate-600">Risk assessment</div>
            </div>
          </div>

          {/* Control-by-Control Assessment Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold">Control-by-Control Assessment</h2>
              <p className="text-sm text-slate-600 mt-1">Systematic review of all planning controls</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Control</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Requirement</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Proposal</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {project.complianceItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-slate-700">{item.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-slate-800">{item.control}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{item.requirement}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-800">{item.proposal}</span>
                      </td>
                      <td className="px-6 py-4">
                        {item.status === 'compliant' && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            COMPLIANT
                          </span>
                        )}
                        {item.status === 'variation' && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-semibold">
                            <AlertTriangle className="w-4 h-4" />
                            VARIATION
                          </span>
                        )}
                        {item.status === 'non-compliant' && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-semibold">
                            <AlertCircle className="w-4 h-4" />
                            NON-COMPLIANT
                          </span>
                        )}
                        {item.status === 'pending' && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-semibold">
                            <AlertCircle className="w-4 h-4" />
                            PENDING
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-600">{item.notes || '-'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CONTROLS TAB - Exhaustive LEP & DCP */}
      {activeTab === 'controls' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search controls by clause, name, or requirement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* LEP 2021 Controls */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <div className="flex items-center gap-3">
                <Book className="w-6 h-6" />
                <h2 className="text-xl font-bold">Cumberland LEP 2021 Controls</h2>
              </div>
              <p className="text-sm opacity-90 mt-1">Comprehensive local environmental planning controls</p>
            </div>

            <div className="divide-y divide-slate-200">
              {lepControls.map((category) => (
                <div key={category.category} className="border-b border-slate-200">
                  <button
                    onClick={() => setExpandedLEPCategory(
                      expandedLEPCategory === category.category ? null : category.category
                    )}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedLEPCategory === category.category ? (
                        <ChevronDown className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      )}
                      <span className="font-bold text-slate-800">{category.category}</span>
                    </div>
                    <span className="text-sm text-slate-600">{category.controls.length} controls</span>
                  </button>

                  {expandedLEPCategory === category.category && (
                    <div className="px-6 pb-4">
                      <table className="w-full">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Clause</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Control Name</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Requirement</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Check Required</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {category.controls.map((control, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-4 py-3">
                                <span className="font-mono text-sm font-semibold text-blue-600">{control.clause}</span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="font-semibold text-sm text-slate-800">{control.name}</div>
                                {control.typical && (
                                  <div className="text-xs text-slate-500 mt-1">Typical: {control.typical}</div>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <div className="text-sm text-slate-700">{control.requirement}</div>
                                {control.variation && (
                                  <div className="text-xs text-amber-600 mt-1">⚠️ {control.variation}</div>
                                )}
                                {control.triggers && (
                                  <div className="text-xs text-slate-500 mt-1">Triggers: {control.triggers}</div>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                {control.checkRequired ? (
                                  <span className="inline-flex px-2 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-bold">
                                    REQUIRED
                                  </span>
                                ) : (
                                  <span className="inline-flex px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs">
                                    If applicable
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
              ))}
            </div>
          </div>

          {/* DCP 2021 Controls */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <div className="flex items-center gap-3">
                <Book className="w-6 h-6" />
                <h2 className="text-xl font-bold">Cumberland DCP 2021 Controls</h2>
              </div>
              <p className="text-sm opacity-90 mt-1">Detailed development control plan requirements</p>
            </div>

            <div className="divide-y divide-slate-200">
              {dcpControls.map((part) => (
                <div key={part.category} className="border-b border-slate-200">
                  <button
                    onClick={() => setExpandedDCPCategory(
                      expandedDCPCategory === part.category ? null : part.category
                    )}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedDCPCategory === part.category ? (
                        <ChevronDown className="w-5 h-5 text-green-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      )}
                      <span className="font-bold text-slate-800">{part.category}</span>
                    </div>
                    <span className="text-sm text-slate-600">{part.sections.length} sections</span>
                  </button>

                  {expandedDCPCategory === part.category && (
                    <div className="px-6 pb-4 space-y-6">
                      {part.sections.map((section) => (
                        <div key={section.section} className="bg-slate-50 rounded-lg p-4">
                          <div className="font-semibold text-slate-800 mb-3">
                            Section {section.section}: {section.name}
                          </div>
                          <table className="w-full">
                            <thead className="bg-white">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-bold text-slate-600 uppercase">Control</th>
                                <th className="px-4 py-2 text-left text-xs font-bold text-slate-600 uppercase">Requirement</th>
                                <th className="px-4 py-2 text-left text-xs font-bold text-slate-600 uppercase">Mandatory</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                              {section.controls.map((control, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                  <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                                    {control.control}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-slate-700">
                                    {control.requirement}
                                    {control.typical && (
                                      <span className="ml-2 text-xs text-slate-500">({control.typical})</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3">
                                    {control.mandatory ? (
                                      <span className="inline-flex px-2 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-bold">
                                        YES
                                      </span>
                                    ) : (
                                      <span className="inline-flex px-2 py-1 rounded-lg bg-blue-100 text-blue-600 text-xs">
                                        No
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
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
        <div className="space-y-6">
          <PreLodgementTimeline />
        </div>
      )}

      {/* Footer Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800 mb-1">Ready to proceed?</h3>
            <p className="text-sm text-slate-600">
              Ensure all documents are uploaded and compliance score ≥90%
            </p>
          </div>
          <button
            onClick={() => {
              if (project.complianceScore >= 90) {
                updateProject({ currentStage: 'lodgement' });
              } else {
                alert('⚠️ Compliance score must be ≥90% to proceed.');
              }
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
          >
            Proceed to Lodgement
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}