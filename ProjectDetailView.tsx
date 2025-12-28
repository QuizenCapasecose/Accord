import { useState } from 'react';
import { ArrowLeft, FileText, Download, ExternalLink, Eye } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { StageTracker } from './StageTracker';
import { CompliancePanel } from './CompliancePanel';

interface ProjectDetailViewProps {
  onBack: () => void;
  onViewDocument: (documentId: string) => void;
}

export function ProjectDetailView({ onBack, onViewDocument }: ProjectDetailViewProps) {
  const { project } = useProject();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Group documents by category
  const categories = ['all', 'Application', 'Reports', 'Plans', 'Certifications'];
  
  const filteredDocuments = selectedCategory === 'all' 
    ? project.documents 
    : project.documents.filter(doc => doc.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-700';
      case 'final': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-amber-100 text-amber-700';
      case 'superseded': return 'bg-slate-100 text-slate-500';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition-all mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">{project.projectName}</h1>
              <p className="text-sm lg:text-base opacity-90 mb-2">{project.address}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                  DA: {project.daNumber}
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                  Project ID: {project.projectId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - DA Stages (Full Width on Mobile, 8 cols on Desktop) */}
          <div className="lg:col-span-8 space-y-6">
            {/* DA Stage Tracker */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">DA Process Stages</h2>
              <StageTracker />
            </div>

            {/* Documents Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-800">Project Documents</h2>
                  <span className="text-sm text-slate-600">
                    {project.documents.length} documents
                  </span>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {category}
                      {category !== 'all' && (
                        <span className="ml-2 opacity-75">
                          ({project.documents.filter(d => d.category === category).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Documents Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Document Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Version
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredDocuments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                          <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                          <p className="text-lg font-semibold mb-1">No documents in this category</p>
                          <p className="text-sm">Select a different category or upload new documents</p>
                        </td>
                      </tr>
                    ) : (
                      filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-800">{doc.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700">
                              {doc.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">v{doc.version}.0</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold uppercase ${getStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">{doc.uploadDate}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">{doc.size}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onViewDocument(doc.id)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                title="View Document"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => alert(`Downloading ${doc.name}...`)}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                title="Download Document"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => alert(`Opening ${doc.name} in new window...`)}
                                className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                                title="Open in New Window"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Showing {filteredDocuments.length} of {project.documents.length} documents</span>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
                    Upload New Document
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Compliance Monitor (4 cols on Desktop) */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <CompliancePanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
