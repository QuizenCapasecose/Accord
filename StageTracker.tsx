import { useProject, Stage } from '../../context/ProjectContext';

export function StageTracker() {
  const { project, updateProject } = useProject();

  const stages = [
    { id: 'pre-lodgement' as Stage, name: 'Pre-Lodgement', icon: '🔍', color: 'from-blue-500 to-cyan-500' },
    { id: 'lodgement' as Stage, name: 'Lodgement', icon: '📤', color: 'from-purple-500 to-pink-500' },
    { id: 'assessment' as Stage, name: 'Assessment', icon: '⚖️', color: 'from-orange-500 to-amber-500' },
    { id: 'determination' as Stage, name: 'Determination', icon: '✅', color: 'from-green-500 to-emerald-500' },
    { id: 'post-consent' as Stage, name: 'Post-Consent', icon: '🏗️', color: 'from-indigo-500 to-blue-500' }
  ];

  const currentIndex = stages.findIndex(s => s.id === project.currentStage);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 lg:p-6 text-white">
        <h2 className="text-base lg:text-lg font-bold mb-1">DA Stages</h2>
        <p className="text-xs opacity-90">Track your progress</p>
      </div>
      
      <div className="p-4 lg:p-6">
        {/* Mobile: Horizontal Scroll / Desktop: Vertical Stack */}
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x lg:snap-none">
          {stages.map((stage, index) => {
            const isActive = stage.id === project.currentStage;
            const isCompleted = index < currentIndex;
            const isPending = index > currentIndex;

            return (
              <button
                key={stage.id}
                onClick={() => updateProject({ currentStage: stage.id })}
                className={`
                  flex-shrink-0 w-40 lg:w-full snap-center
                  relative rounded-xl p-4 transition-all duration-300
                  ${isActive 
                    ? `bg-gradient-to-br ${stage.color} text-white shadow-lg scale-105 lg:scale-100` 
                    : isCompleted
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 hover:scale-105'
                    : 'bg-slate-50 border-2 border-slate-200 hover:bg-slate-100 hover:scale-105'
                  }
                `}
              >
                {/* Stage Number Badge */}
                <div className={`
                  absolute -top-2 -right-2 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold shadow-md
                  ${isActive 
                    ? 'bg-white text-blue-600' 
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-300 text-slate-600'
                  }
                `}>
                  {isCompleted ? '✓' : index + 1}
                </div>

                {/* Icon */}
                <div className="text-3xl lg:text-4xl mb-2">{stage.icon}</div>

                {/* Stage Name */}
                <div className={`text-sm lg:text-base font-bold mb-1 ${!isActive && !isCompleted && 'text-slate-700'} ${isCompleted && 'text-green-700'}`}>
                  {stage.name}
                </div>

                {/* Status Text */}
                <div className={`text-xs ${isActive ? 'opacity-90' : isCompleted ? 'text-green-600' : 'text-slate-500'}`}>
                  {isActive && 'In Progress'}
                  {isCompleted && 'Completed'}
                  {isPending && 'Upcoming'}
                </div>

                {/* Progress Indicator */}
                {isActive && (
                  <div className="mt-3 w-full bg-white bg-opacity-30 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-white rounded-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Timeline Progress Section */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs lg:text-sm font-medium text-slate-700">Timeline Progress</span>
            <span className="text-xs lg:text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {project.daysElapsed}/{project.targetDays} days
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 lg:h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                project.daysElapsed / project.targetDays > 0.9
                  ? 'bg-gradient-to-r from-red-500 to-rose-600'
                  : project.daysElapsed / project.targetDays > 0.75
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}
              style={{ width: `${Math.min((project.daysElapsed / project.targetDays) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-slate-500 mt-2 text-center">
            {project.targetDays - project.daysElapsed} days remaining
          </div>
        </div>
      </div>
    </div>
  );
}