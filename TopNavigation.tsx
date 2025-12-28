import { Building2 } from 'lucide-react';

type DAStage = 'pre-lodgement' | 'lodgement' | 'assessment' | 'determination' | 'post-consent';

interface TopNavigationProps {
  selectedStage?: DAStage;
  onStageSelect?: (stage: DAStage) => void;
  showStages?: boolean;
}

export function TopNavigation({ selectedStage, onStageSelect, showStages = false }: TopNavigationProps) {
  const stages = [
    { id: 'pre-lodgement' as const, label: 'Pre-Lodgement', emoji: '🔍', number: 1 },
    { id: 'lodgement' as const, label: 'Lodgement', emoji: '📤', number: 2 },
    { id: 'assessment' as const, label: 'Assessment', emoji: '⚖️', number: 3 },
    { id: 'determination' as const, label: 'Determination', emoji: '✅', number: 4 },
    { id: 'post-consent' as const, label: 'Post-Consent', emoji: '🏗️', number: 5 },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-2">
          {/* Logo/Title - Optimized for mobile */}
          <div className="flex items-center gap-2 sm:gap-3 py-3 sm:py-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="text-white">
              <div className="font-bold text-sm sm:text-base lg:text-lg whitespace-nowrap">MetroBuild DA QMS</div>
            </div>
          </div>

          {/* 5 Stage Navigation - Only show when project is selected */}
          {showStages && onStageSelect && (
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
              {stages.map((stage) => {
                const isActive = selectedStage === stage.id;
                
                return (
                  <button
                    key={stage.id}
                    onClick={() => onStageSelect(stage.id)}
                    className={`
                      flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 
                      px-2 sm:px-3 lg:px-4 py-2 sm:py-3 
                      font-semibold transition-all relative min-w-[70px] sm:min-w-0 rounded-lg
                      ${isActive 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : 'text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10'
                      }
                    `}
                  >
                    <span className="text-base sm:text-lg">{stage.emoji}</span>
                    <span className="text-[10px] sm:text-xs lg:text-sm hidden sm:block">{stage.label}</span>
                    <span className="text-[10px] sm:hidden">{stage.number}</span>
                    
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
