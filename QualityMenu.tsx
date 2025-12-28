import { TrendingUp, BarChart3, MessageSquare, CheckSquare } from 'lucide-react';

type QualityView = 'compliance' | 'kpi' | 'rfi' | 'conditions';

interface QualityMenuProps {
  activeView: QualityView;
  onViewChange: (view: QualityView) => void;
}

export function QualityMenu({ activeView, onViewChange }: QualityMenuProps) {
  const menuItems = [
    { id: 'compliance' as const, label: 'Compliance Monitor', icon: TrendingUp, color: 'from-blue-500 to-cyan-600' },
    { id: 'kpi' as const, label: 'KPIs', icon: BarChart3, color: 'from-purple-500 to-pink-600' },
    { id: 'rfi' as const, label: 'RFIs', icon: MessageSquare, color: 'from-amber-500 to-orange-600' },
    { id: 'conditions' as const, label: 'Conditions', icon: CheckSquare, color: 'from-green-500 to-emerald-600' },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-6 py-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Quality Management</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`
                  p-6 rounded-xl transition-all text-center
                  ${isActive 
                    ? `bg-gradient-to-br ${item.color} text-white shadow-xl scale-105` 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:shadow-md'
                  }
                `}
              >
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3
                  ${isActive ? 'bg-white bg-opacity-20' : 'bg-white'}
                `}>
                  <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                </div>
                <div className={`font-bold text-lg ${isActive ? 'text-white' : 'text-slate-800'}`}>
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
