import { useState } from 'react';
import { ProjectProvider } from '../context/ProjectContext';
import { ACCORDMainApp } from './components/quaizen/ACCORDMainApp';
import { HomePage } from './components/quaizen/HomePage';
import '../styles/index.css';

// Valid views that ACCORDMainApp accepts
type AccordView = 'project-setup' | 'dashboard' | 'stage-1' | 'stage-2' | 'stage-3' | 'stage-4' | 'stage-5' | 'projects' | 'workflows' | 'documents' | 'compliance' | 'quality' | 'feedback';

function App() {
  const [appMode, setAppMode] = useState<'home' | 'accord'>('home');
  const [accordView, setAccordView] = useState<AccordView>('dashboard');

  // Map HomePage menu items to ACCORDMainApp views
  const handleNavigate = (view: string) => {
    console.log("HomePage clicked:", view);
    
    // Mapping table: HomePage menu items → ACCORDMainApp views
    const viewMapping: Record<string, AccordView> = {
      // Main navigation
      'accord-main': 'dashboard',
      'dashboard': 'dashboard',
      
      // 6 Menu Items - Now map directly to their dedicated pages
      'projects': 'projects',      // Projects Page
      'workflows': 'workflows',    // Workflows Page
      'documents': 'documents',    // Document Library Page
      'compliance': 'compliance',  // Compliance Page
      'quality': 'quality',        // Quality Gate Approval System
      'feedback': 'feedback',      // Feedback Page
      
      // Legacy pages - route to dashboard
      'stages': 'dashboard',
      'process': 'dashboard',
    };

    // Get mapped view or default to dashboard
    const mappedView = viewMapping[view] || 'dashboard';
    
    console.log("Mapped to ACCORDMainApp view:", mappedView);
    
    setAccordView(mappedView);
    setAppMode('accord');
  };

  return (
    <ProjectProvider>
      <div className="app-container">
        {appMode === 'home' && (
          <HomePage 
            onNavigate={handleNavigate}
          />
        )}

        {appMode === 'accord' && (
          <ACCORDMainApp 
            initialView={accordView}
            onBack={() => setAppMode('home')} 
          />
        )}
      </div>
    </ProjectProvider>
  );
}

export default App;