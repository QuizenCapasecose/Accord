import { useState } from 'react';
import { DocumentUpload } from './DocumentUpload';
import { documentTemplates } from '../data/cumberland-controls';
import { getDocumentGuidance } from '../data/document-guidance';
import { CheckCircle2, Circle, AlertCircle, FileEdit } from 'lucide-react';
import { DAFormFillable } from './DAFormFillable';

export function DocumentSubmissionWorkflow() {
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, any>>({});
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [showDAForm, setShowDAForm] = useState(false);

  const requiredDocs = documentTemplates.filter(doc => doc.required);
  const currentDoc = requiredDocs[currentDocIndex];
  const guidance = getDocumentGuidance(currentDoc.title);

  const handleUpload = (file: File) => {
    // Simulate file upload
    const uploadedFile = {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadDate: new Date().toLocaleDateString(),
      status: 'pending' as const,
      reviewNotes: 'Document is queued for automated compliance check. This typically takes 2-5 minutes.'
    };

    setUploadedDocs({
      ...uploadedDocs,
      [currentDoc.title]: uploadedFile
    });

    // Auto-advance to next document
    if (currentDocIndex < requiredDocs.length - 1) {
      setTimeout(() => {
        setCurrentDocIndex(currentDocIndex + 1);
      }, 1500);
    }
  };

  const completedCount = Object.keys(uploadedDocs).length;
  const totalCount = requiredDocs.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Check if current document is the DA Form
  const isDAForm = currentDoc.title === 'DA Application Form';

  // Show DA Form interface instead of upload
  if (isDAForm && showDAForm) {
    return (
      <div className="space-y-6">
        {/* Back button */}
        <button
          onClick={() => setShowDAForm(false)}
          className="px-4 py-2 bg-white border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all"
        >
          ← Back to Document List
        </button>
        
        <DAFormFillable />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Document Submission Progress</h2>
            <p className="text-slate-600 mt-1">
              Complete all required documents to proceed to lodgement
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-blue-600">{completedCount}/{totalCount}</div>
            <div className="text-sm text-slate-600">Documents</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Overall Progress</span>
            <span className="font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-4">
            <div
              className="h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Document Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {requiredDocs.map((doc, index) => {
            const isCompleted = uploadedDocs[doc.title];
            const isCurrent = index === currentDocIndex;
            
            return (
              <button
                key={doc.title}
                onClick={() => setCurrentDocIndex(index)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50'
                    : isCompleted
                    ? 'border-green-300 bg-green-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : isCurrent ? (
                      <Circle className="w-5 h-5 text-blue-600 fill-current" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold mb-1 ${
                      isCurrent ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-slate-700'
                    }`}>
                      {doc.title}
                    </div>
                    <div className="text-xs text-slate-600 truncate">
                      {doc.type}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold text-blue-600">
            {currentDocIndex + 1}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">
              Step {currentDocIndex + 1} of {totalCount}: {currentDoc.title}
            </h3>
            <p className="opacity-90 mb-4">{currentDoc.description}</p>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">📋 What You'll Need:</h4>
              <ul className="space-y-1 text-sm opacity-95">
                <li>• Review the best practice guide below</li>
                <li>• Download the template (if available)</li>
                <li>• Prepare your document following assessment criteria</li>
                <li>• Upload as PDF format for review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Current Document Upload */}
      {isDAForm ? (
        <button
          onClick={() => setShowDAForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <FileEdit className="w-5 h-5 mr-2" />
          Fill DA Application Form
        </button>
      ) : (
        <DocumentUpload
          documentType={currentDoc.type}
          documentTitle={currentDoc.title}
          description={currentDoc.description}
          required={currentDoc.required}
          templateUrl={currentDoc.templateUrl}
          bestPracticeGuide={guidance.bestPracticeGuide}
          assessmentCriteria={guidance.assessmentCriteria}
          onUpload={handleUpload}
          uploadedFile={uploadedDocs[currentDoc.title]}
        />
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => setCurrentDocIndex(Math.max(0, currentDocIndex - 1))}
          disabled={currentDocIndex === 0}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            currentDocIndex === 0
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          ← Previous Document
        </button>

        <div className="text-center">
          <div className="text-sm text-slate-600 mb-1">Document Progress</div>
          <div className="text-2xl font-bold text-slate-800">
            {currentDocIndex + 1} / {totalCount}
          </div>
        </div>

        {currentDocIndex < totalCount - 1 ? (
          <button
            onClick={() => setCurrentDocIndex(currentDocIndex + 1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Next Document →
          </button>
        ) : (
          <button
            disabled={completedCount < totalCount}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              completedCount >= totalCount
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Complete & Review All →
          </button>
        )}
      </div>

      {/* Helpful Tips Panel */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-amber-900 mb-2">💡 Pro Tips for First-Pass Approval</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span><strong>Read the assessment criteria</strong> - Each document is assessed against specific criteria. Meeting all criteria dramatically increases approval chances.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span><strong>Use the templates</strong> - Council-provided templates ensure you don't miss required information.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span><strong>Professional presentation</strong> - Clear formatting, proper signatures, and complete information reduce RFI risk.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span><strong>Cross-reference</strong> - Ensure your documents are consistent (e.g., BASIX certificate matches floor plans).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span><strong>Get expert help</strong> - Complex documents (structural, hydraulic, acoustic) should be prepared by qualified consultants.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}