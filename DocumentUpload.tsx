import { useState } from 'react';
import { Upload, FileText, Eye, Download, Check, X, AlertCircle } from 'lucide-react';

interface DocumentUploadProps {
  documentType: string;
  documentTitle: string;
  description: string;
  required: boolean;
  templateUrl?: string;
  bestPracticeGuide?: string;
  assessmentCriteria?: string[];
  onUpload: (file: File) => void;
  uploadedFile?: {
    name: string;
    size: string;
    uploadDate: string;
    status: 'pending' | 'approved' | 'rejected';
    reviewNotes?: string;
  };
}

export function DocumentUpload({
  documentType,
  documentTitle,
  description,
  required,
  templateUrl,
  bestPracticeGuide,
  assessmentCriteria,
  onUpload,
  uploadedFile
}: DocumentUploadProps) {
  const [showGuide, setShowGuide] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                required 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {documentType}
              </span>
              {required && (
                <span className="px-2 py-1 bg-red-500 text-white rounded text-xs font-bold">
                  REQUIRED
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-800">{documentTitle}</h3>
            <p className="text-sm text-slate-600 mt-1">{description}</p>
          </div>
          
          {uploadedFile && (
            <div className="ml-4">
              {uploadedFile.status === 'approved' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                  <Check className="w-5 h-5" />
                  <span className="font-semibold">Approved</span>
                </div>
              )}
              {uploadedFile.status === 'rejected' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg">
                  <X className="w-5 h-5" />
                  <span className="font-semibold">Rejected</span>
                </div>
              )}
              {uploadedFile.status === 'pending' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold">Under Review</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upload Area */}
          <div>
            {!uploadedFile ? (
              <>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                  }`}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <h4 className="font-semibold text-slate-800 mb-2">Upload Document</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Drag and drop your file here, or click to browse
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.dwg"
                    />
                    <span className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:shadow-lg transition-all inline-block">
                      Choose File
                    </span>
                  </label>
                  <p className="text-xs text-slate-500 mt-4">
                    Accepted: PDF, DOC, DOCX, DWG (Max 50MB)
                  </p>
                </div>

                {templateUrl && (
                  <div className="mt-4">
                    <a
                      href={templateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-semibold"
                    >
                      <Download className="w-4 h-4" />
                      Download Template
                    </a>
                  </div>
                )}
              </>
            ) : (
              <div className="border-2 border-slate-200 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 mb-1">{uploadedFile.name}</h4>
                    <p className="text-sm text-slate-600">
                      {uploadedFile.size} • Uploaded {uploadedFile.uploadDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Document
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>

                {uploadedFile.reviewNotes && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    uploadedFile.status === 'rejected' 
                      ? 'bg-red-50 border border-red-200' 
                      : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <h5 className="font-semibold text-sm mb-2">Review Notes:</h5>
                    <p className="text-sm text-slate-700">{uploadedFile.reviewNotes}</p>
                  </div>
                )}

                <button
                  onClick={() => {/* Re-upload handler */}}
                  className="w-full mt-4 px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                >
                  Replace Document
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Guidance & Criteria */}
          <div className="space-y-4">
            {/* Best Practice Guide */}
            {bestPracticeGuide && (
              <div className="border-2 border-blue-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-blue-900">📚 Best Practice Guide</span>
                  <span className="text-blue-600">{showGuide ? '▼' : '▶'}</span>
                </button>
                {showGuide && (
                  <div className="p-4 bg-white">
                    <div className="prose prose-sm max-w-none text-slate-700">
                      {bestPracticeGuide}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Assessment Criteria */}
            {assessmentCriteria && assessmentCriteria.length > 0 && (
              <div className="border-2 border-green-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-green-50">
                  <h4 className="font-semibold text-green-900">✓ Assessment Criteria</h4>
                  <p className="text-xs text-green-700 mt-1">Your document will be assessed against:</p>
                </div>
                <div className="p-4 bg-white">
                  <ul className="space-y-2">
                    {assessmentCriteria.map((criterion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                          {index + 1}
                        </span>
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Quick Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Quick Tips
              </h4>
              <ul className="space-y-1 text-sm text-amber-800">
                <li>• Ensure all pages are clearly legible</li>
                <li>• Include professional stamp/signature where required</li>
                <li>• Check file size is under 50MB</li>
                <li>• Use PDF format for final submissions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
