import { Building2, MapPin, ArrowRight, Home } from 'lucide-react';
import { useState } from 'react';
import { useProject } from '../../context/ProjectContext'; // <--- Import Hook

interface ProjectSetupProps {
  onProjectCreated?: () => void; // Made optional as we might handle nav internally
}

export function ProjectSetup({ onProjectCreated }: ProjectSetupProps) {
  const { createNewProject, loadDemoProject } = useProject(); // <--- Use Hook
  const [formData, setFormData] = useState({
    address: '',
    applicantName: '',
    developmentType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Create Project in Context
    createNewProject({
      address: formData.address,
      name: formData.developmentType || 'New Application'
    });
    // 2. Notify Parent to Navigate
    if (onProjectCreated) onProjectCreated();
  };

  const handleDemoClick = () => {
    // 1. Load Demo Data
    loadDemoProject();
    // 2. Notify Parent to Navigate
    if (onProjectCreated) onProjectCreated();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border-t-8 border-[#2D5F7F]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#2D5F7F] to-[#C9A961] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">New Application</h1>
          <p className="text-slate-500">MetroBuild Accord Operating System</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Property Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                required
                type="text"
                placeholder="Search address..."
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-[#2D5F7F] focus:ring-0 transition-colors"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#2D5F7F] hover:bg-[#1e4158] text-white py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
          >
            Start New Project <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center"><span className="bg-white px-4 text-sm text-slate-500">OR</span></div>
        </div>

        {/* THE DEMO BUTTON */}
        <button
          onClick={handleDemoClick}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-[#C9A961] text-[#b39550] hover:bg-[#C9A961] hover:text-white rounded-xl font-bold transition-all shadow-sm hover:shadow-md group"
        >
          <Home className="w-5 h-5" />
          <span>Load "3-Lot Subdivision" Demo</span>
        </button>
      </div>
    </div>
  );
}
