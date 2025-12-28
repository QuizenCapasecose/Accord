import { Bell, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeView: 'main' | 'kpi' | 'rfi' | 'conditions' | 'pre-lodgement' | 'lodgement' | 'assessment' | 'determination' | 'post-consent' | 'documents';
  onViewChange: (view: 'main' | 'kpi' | 'rfi' | 'conditions' | 'pre-lodgement' | 'lodgement' | 'assessment' | 'determination' | 'post-consent' | 'documents') => void;
}

export function Header({ activeView, onViewChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'main' as const, label: 'Dashboard' },
    { id: 'documents' as const, label: 'Documents' },
    { id: 'kpi' as const, label: 'KPIs' },
    { id: 'rfi' as const, label: 'RFIs' },
    { id: 'conditions' as const, label: 'Conditions' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-blue-500">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo/Title - Always on Left */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl lg:text-2xl">📋</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-base lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                MetroBuild DA QMS
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Quality Management System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Notifications */}
            <button className="relative p-2 lg:p-2.5 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-slate-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Profile */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="hidden lg:block text-sm font-medium text-slate-700">Admin</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 slide-in-up">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg font-medium text-left transition-all ${
                    activeView === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}