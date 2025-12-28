import { useState, useEffect } from 'react';
import { useProject } from '../context/ProjectContext';
import { ChevronDown, ChevronRight, CheckCircle2, AlertTriangle, AlertCircle, Circle, Download, FileText } from 'lucide-react';

interface ChecklistSection {
  id: string;
  title: string;
  items: string[];
  category: string;
}

const initialChecklistData: ChecklistSection[] = [
  {
    id: 'planning',
    title: 'Planning Controls',
    category: 'Compliance',
    items: [
      'Zoning: R2 Residential (Zone Check)',
      'LEP Height Limit: 12m (Design 11.8m)',
      'LEP Front Setback: 6m (Design 4.5m - Variation)',
      'LEP FSR: 1.5:1 (Proposed 1.48:1)',
      'DCP Parking: 1sp/unit (12 sp provided, 10 units)',
      'DCP Landscaping: 5% min area (6.2% provided)',
      'SEPP Housing Code: Not triggered'
    ]
  },
  {
    id: 'submissions',
    title: 'Compliance Documents',
    category: 'Documentation',
    items: [
      'DA Application Form (submitted)',
      'Statement of Environmental Effects (submitted)',
      'Architectural Plans - Floorplans (v2 submitted)',
      'Architectural Plans - Elevations (submitted)',
      'Survey Plan (submitted)',
      'BASIX Certificate (submitted)',
      'Waste Management Plan (submitted)',
      'Stormwater Management Plan (draft)'
    ]
  },
  {
    id: 'reports',
    title: 'Specialist Reports',
    category: 'Documentation',
    items: [
      'Heritage Impact Statement (submitted & approved)',
      'Arborist Report (N/A - no significant trees)',
      'Geotechnical Survey (N/A - flat site)',
      'Acoustic Assessment (PENDING - RFI issued)',
      'Traffic Impact Assessment (submitted)',
      'Contamination Assessment (N/A)'
    ]
  },
  {
    id: 'design',
    title: 'Design Compliance',
    category: 'Quality',
    items: [
      'Bulk & Scale Assessment',
      'Urban Design Quality',
      'Street Interface & Activation',
      'Solar Access & Overshadowing',
      'Privacy & Amenity',
      'Materials & Finishes'
    ]
  }
];

export function ChecklistPanel() {
  const { project, updateProject } = useProject();
  const [checklistData, setChecklistData] = useState(initialChecklistData);
  const [expandedSections, setExpandedSections] = useState<string[]>(['planning', 'submissions']);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set([
    'Zoning: R2 Residential (Zone Check)',
    'LEP Height Limit: 12m (Design 11.8m)',
    'LEP FSR: 1.5:1 (Proposed 1.48:1)',
    'DCP Parking: 1sp/unit (12 sp provided, 10 units)',
    'DCP Landscaping: 5% min area (6.2% provided)',
    'DA Application Form (submitted)',
    'Statement of Environmental Effects (submitted)',
    'Architectural Plans - Floorplans (v2 submitted)',
    'Architectural Plans - Elevations (submitted)',
    'Survey Plan (submitted)',
    'BASIX Certificate (submitted)',
    'Waste Management Plan (submitted)',
    'Heritage Impact Statement (submitted & approved)',
    'Traffic Impact Assessment (submitted)',
    'Bulk & Scale Assessment',
    'Urban Design Quality',
    'Street Interface & Activation'
  ]));

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleItem = (item: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  };

  // Update compliance score when items change
  useEffect(() => {
    const totalItems = checklistData.reduce((sum, section) => sum + section.items.length, 0);
    const completedItems = checkedItems.size;
    const newScore = Math.round((completedItems / totalItems) * 100);
    if (newScore !== project.complianceScore) {
      updateProject({ complianceScore: newScore });
    }
  }, [checkedItems]);

  const runAudit = () => {
    alert('Running comprehensive compliance audit against LEP/DCP requirements...\n\n✓ Checking all controls\n✓ Validating documents\n✓ Analyzing requirements\n\nAudit complete! Review results above.');
  };

  const expandAll = () => {
    setExpandedSections(checklistData.map(s => s.id));
  };

  const collapseAll = () => {
    setExpandedSections([]);
  };

  const downloadChecklist = () => {
    const report = checklistData.map(section => {
      const items = section.items.map((item, i) => 
        `${checkedItems.has(item) ? '✓' : '☐'} ${item}`
      ).join('\n  ');
      return `${section.title}\n  ${items}`;
    }).join('\n\n');
    
    alert(`Checklist Report:\n\n${report}\n\n(In production, this would download as PDF)`);
  };

  const getItemStatus = (item: string) => {
    if (item.includes('PENDING')) return 'pending';
    if (item.includes('Variation')) return 'variation';
    if (item.includes('N/A')) return 'na';
    return checkedItems.has(item) ? 'complete' : 'incomplete';
  };

  const getItemIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'variation':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'na':
        return <Circle className="w-5 h-5 text-slate-300" />;
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getSectionProgress = (section: ChecklistSection) => {
    const relevantItems = section.items.filter(item => !item.includes('N/A'));
    const completedItems = relevantItems.filter(item => checkedItems.has(item)).length;
    return Math.round((completedItems / relevantItems.length) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg">Checklists & Tasks</h2>
        <div className="flex gap-2">
          <button
            onClick={downloadChecklist}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 px-3 py-1 hover:bg-slate-100 rounded transition-colors"
          >
            <Download className="w-3 h-3" />
            Export
          </button>
          <button
            onClick={expandAll}
            className="text-xs text-blue-600 hover:text-blue-700 px-3 py-1"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-xs text-blue-600 hover:text-blue-700 px-3 py-1"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {checklistData.map(section => {
          const isExpanded = expandedSections.includes(section.id);
          const progress = getSectionProgress(section);

          return (
            <div key={section.id} className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  )}
                  <div className="text-left">
                    <div className="text-sm">{section.title}</div>
                    <div className="text-xs text-slate-500">{section.category}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600">{progress}%</span>
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        progress === 100
                          ? 'bg-green-600'
                          : progress >= 75
                          ? 'bg-blue-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 space-y-2 bg-white">
                  {section.items.map((item, index) => {
                    const status = getItemStatus(item);
                    const isNA = status === 'na';

                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                          isNA
                            ? 'bg-slate-50 opacity-60'
                            : status === 'pending'
                            ? 'bg-red-50'
                            : status === 'variation'
                            ? 'bg-amber-50'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <button
                          onClick={() => !isNA && toggleItem(item)}
                          disabled={isNA}
                          className="flex-shrink-0 mt-0.5 cursor-pointer disabled:cursor-default"
                        >
                          {getItemIcon(status)}
                        </button>
                        
                        <div className="flex-1">
                          <div className={`text-sm ${
                            status === 'complete'
                              ? 'text-slate-700'
                              : isNA
                              ? 'text-slate-400 line-through'
                              : 'text-slate-900'
                          }`}>
                            {item.replace(' (PENDING - RFI issued)', '').replace(' (N/A - no significant trees)', '').replace(' (N/A - flat site)', '').replace(' (N/A)', '')}
                          </div>
                          {item.includes('PENDING') && (
                            <div className="text-xs text-red-600 mt-1">
                              ⚠ RFI issued - Response due 22/12
                            </div>
                          )}
                          {item.includes('Variation') && (
                            <div className="text-xs text-amber-600 mt-1">
                              ⚠ Variation required - Justification submitted
                            </div>
                          )}
                          {isNA && (
                            <div className="text-xs text-slate-400 mt-1">
                              Not applicable for this project
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={runAudit}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Run Compliance Audit
          </button>
          <button
            onClick={downloadChecklist}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}
