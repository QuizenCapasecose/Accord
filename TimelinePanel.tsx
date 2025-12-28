import { useProject } from '../context/ProjectContext';
import { Calendar, FileText, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export function TimelinePanel() {
  const { project } = useProject();

  const timelineEvents = [
    {
      id: '1',
      date: '2024-12-18',
      type: 'rfi',
      title: 'Council RFI Issued',
      description: 'Acoustic Assessment required',
      status: 'pending'
    },
    {
      id: '2',
      date: '2024-12-15',
      type: 'update',
      title: 'Heritage Report Approved',
      description: 'Heritage impact assessment received and approved by Heritage Officer',
      status: 'complete'
    },
    {
      id: '3',
      date: '2024-12-14',
      type: 'milestone',
      title: 'Application Lodged',
      description: 'DA-2025-0456 assigned • Assessment period commenced',
      status: 'complete'
    },
    {
      id: '4',
      date: '2024-12-13',
      type: 'update',
      title: 'Documents Finalized',
      description: 'SEE v2 and floorplans v2 completed',
      status: 'complete'
    },
    {
      id: '5',
      date: '2024-12-10',
      type: 'milestone',
      title: 'Pre-Lodgement Complete',
      description: 'Compliance score 88% • Ready for submission',
      status: 'complete'
    }
  ];

  const getEventIcon = (type: string, status: string) => {
    if (status === 'pending') {
      return <Clock className="w-5 h-5 text-amber-500" />;
    }

    switch (type) {
      case 'rfi':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'milestone':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'update':
        return <FileText className="w-5 h-5 text-blue-600" />;
      default:
        return <Calendar className="w-5 h-5 text-slate-600" />;
    }
  };

  const getEventColor = (type: string, status: string) => {
    if (status === 'pending') {
      return 'border-amber-200 bg-amber-50';
    }

    switch (type) {
      case 'rfi':
        return 'border-red-200 bg-red-50';
      case 'milestone':
        return 'border-green-200 bg-green-50';
      case 'update':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-slate-200 bg-slate-50';
    }
  };

  // Calculate progress through assessment period
  const assessmentProgress = (project.daysElapsed / project.targetDays) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg mb-4">Timeline & Communications</h2>

      {/* Gantt-style Timeline */}
      <div className="mb-6 p-4 bg-slate-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-slate-600">Assessment Period</div>
          <div className="text-sm">
            Day {project.daysElapsed} of {project.targetDays}
          </div>
        </div>
        
        <div className="relative">
          {/* Background track */}
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            {/* Progress bar */}
            <div
              className={`h-3 rounded-full transition-all ${
                assessmentProgress > 90
                  ? 'bg-red-600'
                  : assessmentProgress > 75
                  ? 'bg-amber-500'
                  : 'bg-blue-600'
              }`}
              style={{ width: `${Math.min(assessmentProgress, 100)}%` }}
            ></div>
          </div>

          {/* Milestone markers */}
          <div className="absolute top-0 left-0 w-full h-3 flex justify-between px-1">
            <div className="w-0.5 h-5 bg-slate-400 -mt-1" title="Lodgement"></div>
            <div className="w-0.5 h-5 bg-slate-400 -mt-1" title="Assessment Start"></div>
            <div className="w-0.5 h-5 bg-slate-400 -mt-1" title="Mid-point"></div>
            <div className="w-0.5 h-5 bg-slate-400 -mt-1" title="Target"></div>
          </div>
        </div>

        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>Lodgement<br/>14/12</span>
          <span className="text-center">Assessment<br/>6-30 days</span>
          <span className="text-right">Target Determination<br/>~22/01</span>
        </div>

        {project.rfis.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-300">
            <div className="flex items-center gap-2 text-xs text-amber-700">
              <Clock className="w-4 h-4" />
              <span>Clock stopped: RFI issued 18/12 • Response due 22/12</span>
            </div>
          </div>
        )}
      </div>

      {/* Recent Updates */}
      <div>
        <h3 className="text-sm text-slate-600 mb-3">Recent Updates</h3>
        <div className="space-y-3">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="flex gap-3">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  event.status === 'pending'
                    ? 'bg-amber-100'
                    : event.type === 'rfi'
                    ? 'bg-red-100'
                    : event.type === 'milestone'
                    ? 'bg-green-100'
                    : 'bg-blue-100'
                }`}>
                  {getEventIcon(event.type, event.status)}
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="w-0.5 flex-1 bg-slate-200 my-1 min-h-[20px]"></div>
                )}
              </div>

              {/* Event content */}
              <div className={`flex-1 p-3 rounded-lg border ${getEventColor(event.type, event.status)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm">{event.title}</div>
                    <div className="text-xs text-slate-600 mt-1">
                      {event.description}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 whitespace-nowrap ml-3">
                    {new Date(event.date).toLocaleDateString('en-AU', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl text-blue-600">{project.daysElapsed}</div>
          <div className="text-xs text-slate-500">Days Elapsed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl text-amber-600">{project.rfis.filter(r => r.status === 'pending').length}</div>
          <div className="text-xs text-slate-500">Active RFIs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl text-green-600">{project.targetDays - project.daysElapsed}</div>
          <div className="text-xs text-slate-500">Days Remaining</div>
        </div>
      </div>
    </div>
  );
}
