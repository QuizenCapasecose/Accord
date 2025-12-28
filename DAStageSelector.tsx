import { CheckCircle2, Circle } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

type DAStage = 'pre-lodgement' | 'lodgement' | 'assessment' | 'determination' | 'post-consent';

interface DAStageSelectProps {
  selectedStage: DAStage;
  onStageSelect: (stage: DAStage) => void;
}

export function DAStageSelector({ selectedStage, onStageSelect }: DAStageSelectProps) {
  const { project } = useProject();

  const stages = [
    { 
      id: 'pre-lodgement' as const, 
      label: 'Pre-Lodgement', 
      emoji: '🔍',
      color: 'from-blue-500 to-cyan-600',
      lightColor: 'bg-blue-50 border-blue-300 text-blue-700',
    },
    { 
      id: 'lodgement' as const, 
      label: 'Lodgement', 
      emoji: '📤',
      color: 'from-purple-500 to-pink-600',
      lightColor: 'bg-purple-50 border-purple-300 text-purple-700',
    },
    { 
      id: 'assessment' as const, 
      label: 'Assessment', 
      emoji: '⚖️',
      color: 'from-amber-500 to-orange-600',
      lightColor: 'bg-amber-50 border-amber-300 text-amber-700',
    },
    { 
      id: 'determination' as const, 
      label: 'Determination', 
      emoji: '✅',
      color: 'from-green-500 to-emerald-600',
      lightColor: 'bg-green-50 border-green-300 text-green-700',
    },
    { 
      id: 'post-consent' as const, 
      label: 'Post-Consent', 
      emoji: '🏗️',
      color: 'from-indigo-500 to-blue-600',
      lightColor: 'bg-indigo-50 border-indigo-300 text-indigo-700',
    },
  ];

  const getCurrentStageIndex = () => {
    return stages.findIndex(s => s.id === project.currentStage);
  };

  const getStageStatus = (index: number) => {
    const currentIndex = getCurrentStageIndex();
    if (index < currentIndex) return 'completed';
    if (index === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6">DA Process Stages</h2>
      
      {/* Desktop View - Horizontal */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-10 left-0 right-0 h-1 bg-slate-200 z-0">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
              style={{ width: `${(getCurrentStageIndex() / (stages.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Stages */}
          <div className="relative z-10 grid grid-cols-5 gap-4">
            {stages.map((stage, index) => {
              const status = getStageStatus(index);
              const isSelected = selectedStage === stage.id;
              
              return (
                <button
                  key={stage.id}
                  onClick={() => onStageSelect(stage.id)}
                  className={`
                    flex flex-col items-center text-center transition-all
                    ${isSelected ? 'scale-105' : 'hover:scale-102'}
                  `}
                >
                  {/* Circle Icon */}
                  <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center mb-3 border-4 transition-all
                    ${status === 'completed' 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-200 shadow-lg' 
                      : status === 'current'
                      ? `bg-gradient-to-br ${stage.color} border-white shadow-xl`
                      : 'bg-white border-slate-300'
                    }
                    ${isSelected ? 'ring-4 ring-blue-300 ring-opacity-50' : ''}
                  `}>
                    {status === 'completed' ? (
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    ) : (
                      <span className={`text-3xl ${status === 'current' ? '' : 'opacity-50'}`}>
                        {stage.emoji}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <div className={`
                    font-bold text-sm mb-1 transition-colors
                    ${status === 'completed' ? 'text-green-600' : ''}
                    ${status === 'current' ? 'text-slate-800' : ''}
                    ${status === 'upcoming' ? 'text-slate-400' : ''}
                    ${isSelected ? 'text-blue-600' : ''}
                  `}>
                    {stage.label}
                  </div>

                  {/* Stage Number */}
                  <div className={`text-xs ${
                    status === 'upcoming' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Stage {index + 1} of 5
                  </div>

                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="mt-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile View - Vertical */}
      <div className="md:hidden space-y-3">
        {stages.map((stage, index) => {
          const status = getStageStatus(index);
          const isSelected = selectedStage === stage.id;
          
          return (
            <button
              key={stage.id}
              onClick={() => onStageSelect(stage.id)}
              className={`
                w-full p-4 rounded-xl border-2 transition-all text-left
                ${isSelected 
                  ? `bg-gradient-to-r ${stage.color} text-white border-transparent shadow-lg` 
                  : status === 'completed'
                  ? 'bg-green-50 border-green-300'
                  : status === 'current'
                  ? stage.lightColor + ' border-2'
                  : 'bg-slate-50 border-slate-200'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                  ${isSelected 
                    ? 'bg-white bg-opacity-20' 
                    : status === 'completed'
                    ? 'bg-green-500 text-white'
                    : 'bg-white'
                  }
                `}>
                  {status === 'completed' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <span className="text-2xl">{stage.emoji}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className={`font-bold mb-1 ${
                    isSelected ? 'text-white' : 'text-slate-800'
                  }`}>
                    {stage.label}
                  </div>
                  <div className={`text-xs ${
                    isSelected ? 'text-white text-opacity-90' : 'text-slate-600'
                  }`}>
                    Stage {index + 1} of 5
                    {status === 'completed' && ' • Completed'}
                    {status === 'current' && ' • In Progress'}
                  </div>
                </div>

                {isSelected && (
                  <div className="text-white">
                    <Circle className="w-6 h-6 fill-current" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
