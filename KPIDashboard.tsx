import { TrendingUp, TrendingDown, Target, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface KPIMetric {
  id: string;
  name: string;
  target: string;
  current: string;
  status: 'on-track' | 'exceeding' | 'at-risk';
  trend: 'up' | 'down' | 'stable';
  change?: string;
}

const kpiMetrics: KPIMetric[] = [
  {
    id: 'compliance-score',
    name: 'Pre-Lodgement Compliance Score',
    target: '≥90%',
    current: '92%',
    status: 'on-track',
    trend: 'up',
    change: '+4%'
  },
  {
    id: 'rfi-count',
    name: 'RFI Count per Application',
    target: '≤2',
    current: '1.8',
    status: 'exceeding',
    trend: 'down',
    change: '-0.6'
  },
  {
    id: 'rfi-response',
    name: 'RFI Response Turnaround',
    target: '≤5 days',
    current: '4.2 days',
    status: 'exceeding',
    trend: 'down',
    change: '-1.2 days'
  },
  {
    id: 'determination',
    name: 'Determination Within 40 Days',
    target: '≥95%',
    current: '96%',
    status: 'on-track',
    trend: 'up',
    change: '+3%'
  },
  {
    id: 'rfi-free',
    name: 'RFI-Free Determinations',
    target: '≥40%',
    current: '45%',
    status: 'exceeding',
    trend: 'up',
    change: '+8%'
  },
  {
    id: 'pre-construction',
    name: 'Pre-Construction Conditions Completion',
    target: '≤10 days',
    current: '8 days',
    status: 'on-track',
    trend: 'stable'
  },
  {
    id: 'cc-turnaround',
    name: 'Construction Certificate Turnaround',
    target: '≤5 days',
    current: '3 days',
    status: 'exceeding',
    trend: 'down',
    change: '-1.5 days'
  },
  {
    id: 'acceptance',
    name: 'First-Pass Acceptance Rate',
    target: '≥95%',
    current: '97%',
    status: 'exceeding',
    trend: 'up',
    change: '+5%'
  }
];

export function KPIDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeding':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'on-track':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'at-risk':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exceeding':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'on-track':
        return <Target className="w-5 h-5 text-blue-600" />;
      case 'at-risk':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-slate-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-[1800px]">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Key Performance Indicators</h1>
        <p className="text-slate-600">
          Continuous improvement metrics aligned with Kaizen principles and ISO 9001 standards
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Exceeding Targets</span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-3xl mb-1">
            {kpiMetrics.filter(m => m.status === 'exceeding').length}
          </div>
          <div className="text-xs opacity-90">of {kpiMetrics.length} KPIs</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">On Track</span>
            <Target className="w-5 h-5" />
          </div>
          <div className="text-3xl mb-1">
            {kpiMetrics.filter(m => m.status === 'on-track').length}
          </div>
          <div className="text-xs opacity-90">of {kpiMetrics.length} KPIs</div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Projects Active</span>
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-3xl mb-1">12</div>
          <div className="text-xs opacity-90">in assessment</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Avg. Compliance</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl mb-1">92%</div>
          <div className="text-xs opacity-90">+4% vs. target</div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {kpiMetrics.map(metric => (
          <div key={metric.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-sm text-slate-600 mb-1">{metric.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl">{metric.current}</span>
                  {metric.change && (
                    <span className={`text-sm flex items-center gap-1 ${
                      metric.trend === 'up'
                        ? 'text-green-600'
                        : metric.trend === 'down'
                        ? metric.name.includes('RFI') || metric.name.includes('Turnaround')
                          ? 'text-green-600' // Down is good for RFI and turnaround times
                          : 'text-red-600'
                        : 'text-slate-600'
                    }`}>
                      {getTrendIcon(metric.trend)}
                      {metric.change}
                    </span>
                  )}
                </div>
              </div>
              {getStatusIcon(metric.status)}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Target: <span className="">{metric.target}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(metric.status)}`}>
                {metric.status === 'exceeding' ? '✓ Exceeding' : 
                 metric.status === 'on-track' ? '✓ On Track' : 
                 '⚠ At Risk'}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  metric.status === 'exceeding'
                    ? 'bg-green-600'
                    : metric.status === 'on-track'
                    ? 'bg-blue-600'
                    : 'bg-red-600'
                }`}
                style={{ width: metric.status === 'at-risk' ? '60%' : '95%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg mb-4">RFI Trend Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-end justify-between h-48 gap-2">
              {[3.2, 2.8, 2.4, 2.1, 1.9, 1.8].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-blue-100 rounded-t" style={{ height: `${(value / 3.2) * 100}%` }}>
                    <div className="w-full bg-blue-600 rounded-t" style={{ height: '100%' }}></div>
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                  </div>
                  <div className="text-xs text-slate-500">{value}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="text-sm text-slate-600">Average RFIs per Application</div>
              <div className="flex items-center gap-2 text-green-600">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm">-44% vs. Jan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg mb-4">Compliance Score Distribution</h3>
          <div className="space-y-3">
            {[
              { range: '90-100%', count: 18, color: 'bg-green-600' },
              { range: '80-89%', count: 12, color: 'bg-blue-600' },
              { range: '70-79%', count: 5, color: 'bg-amber-500' },
              { range: '60-69%', count: 2, color: 'bg-red-600' },
              { range: '<60%', count: 1, color: 'bg-red-700' }
            ].map(item => (
              <div key={item.range}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-600">{item.range}</span>
                  <span className="text-sm">{item.count} projects</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${item.color}`}
                    style={{ width: `${(item.count / 18) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">Average Score</div>
              <div className="text-xl">92%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Continuous Improvement Section */}
      <div className="mt-6 bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg mb-4">Kaizen Continuous Improvement</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-slate-600 mb-2">Process Improvements (This Quarter)</div>
            <div className="text-3xl text-blue-600 mb-1">8</div>
            <div className="text-xs text-slate-600">initiatives implemented</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-2">Time Savings</div>
            <div className="text-3xl text-green-600 mb-1">32%</div>
            <div className="text-xs text-slate-600">reduction in assessment time</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-2">Cost Savings</div>
            <div className="text-3xl text-green-600 mb-1">$45k</div>
            <div className="text-xs text-slate-600">reduced RFI handling costs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
