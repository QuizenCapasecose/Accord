/**
 * ACCORD MAIN APPLICATION
 * Complete 5-Stage Development Application Management System
 * 
 * Navigation Architecture:
 * - Dashboard (Hub)
 * - Stage 1: Pre-Lodgement & Feasibility
 * - Stage 2: Application Assembly (Lodgement)
 * - Stage 3: Assessment & RFI Management
 * - Stage 4: Determination & Post-Approval
 * - Stage 5: Kaizen & Project Archive
 */

import { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  CheckCircle2, 
  FileText, 
  Menu,
  X,
  Bell,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import accordLogo from 'figma:asset/66630b8571d65846da7ed0e28cfd06d2e8d92810.png';
import { ACCORDDashboard } from './ACCORDDashboard';
import { Stage1PreLodgement } from './Stage1PreLodgement';
import { Stage2ApplicationAssembly } from './Stage2ApplicationAssembly';
import { Stage3Assessment } from './Stage3Assessment';
import { Stage4Determination } from './Stage4Determination';
import { Stage5Kaizen } from './Stage5Kaizen';
import { ProjectSetup } from './ProjectSetup';
import { useProject } from '../../context/ProjectContext'; // <--- Import Hook

interface ACCORDMainAppProps {
  onBack: () => void;
  returnToPage?: string;
}

type View = 
  | 'dashboard'
  | 'stage-1'
  | 'stage-2'
  | 'stage-3'
  | 'stage-4'
  | 'stage-5';

export function ACCORDMainApp({ onBack, returnToPage }: ACCORDMainAppProps) {
  const { currentProject } = useProject(); // <--- READ FROM CONTEXT
  
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  // If no project is loaded, force the Setup view
  if (!currentProject) {
    return <ProjectSetup onProjectCreated={() => setCurrentView('dashboard')} />;
  }

  const getPageDisplayName = (page?: string): string => {
    const pageNames: Record<string, string> = {
      'home': 'Main Menu',
      'projects': 'Projects',
      'process': 'Process',
      'stages': 'Stages',
      'documents': 'Documents',
      'quality': 'Quality',
      'compliance': 'Compliance',
      'feedback': 'Feedback',
      'validation': 'Validation',
    };
    return pageNames[page || 'home'] || 'Main Menu';
  };

  const stageStatus = {
    stage1: { complete: true, percentage: 100 },
    stage2: { complete: true, percentage: 100 },
    stage3: { complete: true, percentage: 100 },
    stage4: { complete: true, percentage: 100 },
    stage5: { complete: true, percentage: 100 },
  };

  const notifications = [
    {
      id: '1',
      type: 'warning' as const,
      title: 'BASIX Certificate Expiring',
      message: 'Certificate expires in 45 days',
      date: '2024-12-27',
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'Compliance Gap Identified',
      message: 'Arborist report recommended for faster approval',
      date: '2024-12-26',
    },
  ];

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const getBreadcrumb = (): string => {
    const breadcrumbs: Record<View, string> = {
      'dashboard': 'Dashboard',
      'stage-1': 'Dashboard > Stage 1: Pre-Lodgement',
      'stage-2': 'Dashboard > Stage 2: Application Assembly',
      'stage-3': 'Dashboard > Stage 3: Assessment & RFI',
      'stage-4': 'Dashboard > Stage 4: Determination',
      'stage-5': 'Dashboard > Stage 5: Kaizen & Archive',
    };
    return breadcrumbs[currentView];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-lg border-b-4 border-[#2D5F7F] sticky top-0 z-50">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>📊 REFERENCE DEMO PROJECT - Fully Completed DA Workflow (Zero RFIs • 98% Compliance • 74 Days)</span>
          </div>
        </div>
        
        <div className="max-w-full mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors text-[#2D5F7F] group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:block text-sm font-semibold">{getPageDisplayName(returnToPage)}</span>
              </button>
              
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden text-[#2D5F7F]"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="flex items-center gap-3">
                <img src={accordLogo} alt="ACCORD" className="h-10 sm:h-12 w-auto object-contain" />
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-[#2D5F7F]">
                    ACCORD by MetroBuild Group
                  </h1>
                  <p className="text-xs text-slate-600 hidden sm:block">Development Application Management System</p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
              <Home className="w-4 h-4 text-[#2D5F7F]" />
              <span>{getBreadcrumb()}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors text-[#2D5F7F]"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#C9A961] rounded-full"></span>
                )}
              </button>

              <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#2D5F7F] hover:bg-[#1e4158] text-white rounded-lg transition-colors text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </button>
            </div>
          </div>

          <div className="md:hidden mt-2 text-xs text-slate-600 flex items-center gap-2">
            <Home className="w-3 h-3 text-[#2D5F7F]" />
            <span>{getBreadcrumb()}</span>
          </div>
        </div>

        {showNotifications && (
          <div className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-2xl border border-slate-200 z-50">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    {notif.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />}
                    {notif.type === 'info' && <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">{notif.title}</p>
                      <p className="text-xs text-slate-600 mt-1">{notif.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{notif.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="flex">
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:static lg:translate-x-0 top-[88px] lg:top-0 left-0 h-[calc(100vh-88px)] lg:h-[calc(100vh-80px)] w-64 bg-white border-r-4 border-[#2D5F7F] shadow-xl transition-transform duration-300 z-40 overflow-y-auto`}>
          <div className="p-4 border-b-2 border-[#C9A961] bg-gradient-to-br from-[#2D5F7F]/10 to-slate-50">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2D5F7F] to-[#1e4158] rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-sm truncate">{currentProject?.name}</h3>
                <p className="text-xs text-slate-600 truncate">{currentProject?.address}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-semibold text-slate-600">ID: {currentProject?.id}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600">Compliance Score</p>
                <p className="text-2xl font-bold text-[#C9A961]">{currentProject?.complianceScore}%</p>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                  <circle
                    cx="32" cy="32" r="28" stroke="#C9A961" strokeWidth="6" fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - (currentProject?.complianceScore || 0) / 100)}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#C9A961]" />
                </div>
              </div>
            </div>
          </div>

          <nav className="p-4">
            <h4 className="text-xs font-bold text-[#2D5F7F] uppercase tracking-wider mb-3">DA Workflow Stages</h4>

            <button
              onClick={() => handleNavigate('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-2 ${currentView === 'dashboard' ? 'bg-[#2D5F7F] text-white shadow-lg' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              <Home className="w-5 h-5 flex-shrink-0" />
              <span className="font-semibold text-sm">Dashboard</span>
            </button>

            {[
              { num: 1, view: 'stage-1' as View, name: 'Pre-Lodgement', color: '#2D5F7F' },
              { num: 2, view: 'stage-2' as View, name: 'Application Assembly', color: '#C9A961' },
              { num: 3, view: 'stage-3' as View, name: 'Assessment & RFI', color: '#2D5F7F' },
              { num: 4, view: 'stage-4' as View, name: 'Determination', color: '#C9A961' },
              { num: 5, view: 'stage-5' as View, name: 'Kaizen & Archive', color: '#2D5F7F' },
            ].map(({ num, view, name }) => {
              const status = stageStatus[`stage${num}` as keyof typeof stageStatus];
              return (
                <button
                  key={num}
                  onClick={() => handleNavigate(view)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-2 ${currentView === view ? 'bg-[#2D5F7F] text-white shadow-lg' : 'hover:bg-slate-100 text-slate-700'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${currentView === view ? 'bg-white text-[#2D5F7F]' : 'bg-[#2D5F7F]/10 text-[#2D5F7F]'}`}>
                    {num}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm">{name}</p>
                    <p className={`text-xs ${currentView === view ? 'text-white/80' : 'text-slate-500'}`}>
                      {status.percentage}% Complete
                    </p>
                  </div>
                  {status.complete && <CheckCircle2 className="w-4 h-4 text-[#C9A961]" />}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-h-[calc(100vh-60px)]">
          {currentView === 'dashboard' && currentProject && (
            <ACCORDDashboard project={currentProject} onNavigate={handleNavigate} />
          )}
          {currentView === 'stage-1' && currentProject && (
            <Stage1PreLodgement project={currentProject} onBack={() => handleNavigate('dashboard')} onContinue={() => handleNavigate('stage-2')} />
          )}
          {currentView === 'stage-2' && currentProject && (
            <Stage2ApplicationAssembly project={currentProject} onBack={() => handleNavigate('stage-1')} onContinue={() => handleNavigate('stage-3')} />
          )}
          {currentView === 'stage-3' && currentProject && (
            <Stage3Assessment project={currentProject} onBack={() => handleNavigate('stage-2')} onContinue={() => handleNavigate('stage-4')} />
          )}
          {currentView === 'stage-4' && currentProject && (
            <Stage4Determination project={currentProject} onBack={() => handleNavigate('stage-3')} onContinue={() => handleNavigate('stage-5')} />
          )}
          {currentView === 'stage-5' && currentProject && (
            <Stage5Kaizen project={currentProject} onBack={() => handleNavigate('stage-4')} onComplete={() => handleNavigate('dashboard')} />
          )}
        </main>
      </div>
    </div>
  );
}