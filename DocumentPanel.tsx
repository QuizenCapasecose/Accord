import { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Upload, File, FileText, CheckCircle2, Clock, AlertCircle, FolderOpen, Download, Trash2, Eye } from 'lucide-react';

export function DocumentPanel() {
  const { project, addDocument } = useProject();
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(project.documents.map(d => d.category)))];

  const filteredDocuments = selectedCategory === 'all'
    ? project.documents
    : project.documents.filter(d => d.category === selectedCategory);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'final':
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
      case 'draft':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'superseded':
        return <AlertCircle className="w-4 h-4 text-slate-400" />;
      default:
        return <File className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // Simulate file upload
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file, index) => {
      setTimeout(() => {
        addDocument({
          name: file.name,
          version: 1,
          status: 'draft',
          category: 'Plans',
          uploadDate: new Date().toISOString().split('T')[0],
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
        });
      }, index * 200);
    });
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.dwg,.png,.jpg';
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files) as File[];
      files.forEach((file, index) => {
        setTimeout(() => {
          addDocument({
            name: file.name,
            version: 1,
            status: 'draft',
            category: 'Plans',
            uploadDate: new Date().toISOString().split('T')[0],
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
          });
        }, index * 200);
      });
    };
    input.click();
  };

  const deleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      updateDocument(id, { status: 'superseded' });
      // In production, would actually delete
    }
  };

  const downloadDocument = (name: string) => {
    alert(`Downloading ${name}...`);
    // In production, would trigger actual download
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-slate-600">Documents</h3>
        <span className="text-xs text-slate-500">{project.documents.length} files</span>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`mb-4 border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
        }`}
      >
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">
          Drag & drop files here
        </p>
        <p className="text-xs text-slate-500 mt-1">or click to browse</p>
      </div>

      {/* Category Filter */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Document List */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <FolderOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No documents in this category</p>
          </div>
        ) : (
          filteredDocuments.map(doc => (
            <div
              key={doc.id}
              className="group flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(doc.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{doc.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500">v{doc.version}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    doc.status === 'submitted'
                      ? 'bg-green-100 text-green-700'
                      : doc.status === 'final'
                      ? 'bg-blue-100 text-blue-700'
                      : doc.status === 'draft'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {doc.size} • {doc.uploadDate}
                </div>
              </div>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => downloadDocument(doc.name)}
                  className="p-1.5 hover:bg-slate-200 rounded transition-colors"
                  title="Download"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                </button>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="p-1.5 hover:bg-red-100 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Document Templates */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <h4 className="text-xs text-slate-600 mb-2">Quick Templates</h4>
        <div className="space-y-1">
          {['DA Application Form', 'SEE Template', 'Waste Management Plan'].map(template => (
            <button
              key={template}
              className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 rounded transition-colors"
            >
              <FileText className="w-3 h-3 inline mr-2" />
              {template}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
