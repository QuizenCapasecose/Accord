// Reusable functional components for the QMS system
import { useState, ReactNode } from 'react';
import { ChevronDown, ChevronRight, Upload, Download, X } from 'lucide-react';

// Collapsible Section Component
interface CollapsibleProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  progress?: number;
}

export function Collapsible({ title, children, defaultOpen = false, badge, progress }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-slate-600" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-600" />
          )}
          <span className="text-sm">{title}</span>
          {badge && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
              {badge}
            </span>
          )}
        </div>

        {progress !== undefined && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">{progress}%</span>
            <div className="w-24 bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  progress === 100 ? 'bg-green-600' : 'bg-blue-600'
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

// File Upload Component
interface FileUploadProps {
  onUpload: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
}

export function FileUpload({ onUpload, accept = '.pdf,.doc,.docx,.dwg', multiple = true, label = 'Upload Files' }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.multiple = multiple;
    input.onchange = (e: any) => {
      if (e.target.files.length > 0) {
        onUpload(e.target.files);
      }
    };
    input.click();
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-slate-300 hover:bg-slate-50'
      }`}
    >
      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
      <div className="mb-2">{label}</div>
      <div className="text-sm text-slate-500">
        Drag files here or click to browse
      </div>
      <div className="text-xs text-slate-400 mt-1">
        Accepted formats: PDF, DOC, DOCX, DWG
      </div>
    </div>
  );
}

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl ${maxWidth} w-full max-h-[90vh] overflow-auto`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
          <h3 className="text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Checkbox List Item
interface ChecklistItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  note?: string;
  disabled?: boolean;
}

export function ChecklistItem({ label, checked, onChange, note, disabled = false }: ChecklistItemProps) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors ${
        disabled
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:bg-slate-50 cursor-pointer'
      }`}
    >
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
          checked
            ? 'bg-green-600 border-green-600'
            : 'border-slate-300'
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <div className="flex-1 text-left">
        <div className={`text-sm ${disabled ? 'line-through text-slate-400' : ''}`}>
          {label}
        </div>
        {note && (
          <div className="text-xs text-slate-500 mt-1">{note}</div>
        )}
      </div>
    </button>
  );
}

// Progress Card
interface ProgressCardProps {
  title: string;
  value: number;
  total?: number;
  suffix?: string;
  color?: 'blue' | 'green' | 'amber' | 'red';
}

export function ProgressCard({ title, value, total, suffix = '%', color = 'blue' }: ProgressCardProps) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-600',
    green: 'text-green-600 bg-green-600',
    amber: 'text-amber-600 bg-amber-600',
    red: 'text-red-600 bg-red-600'
  };

  const percentage = total ? (value / total) * 100 : value;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="text-xs text-slate-600 uppercase tracking-wide mb-2">
        {title}
      </div>
      <div className={`text-4xl my-3 ${colorClasses[color]}`}>
        {value}{suffix}
        {total && <span className="text-lg text-slate-400"> / {total}</span>}
      </div>
      {total && (
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${colorClasses[color]}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

// Alert Banner
interface AlertProps {
  type: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
}

export function Alert({ type, title, children, onDismiss }: AlertProps) {
  const config = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-600',
      text: 'text-green-900',
      icon: '✓'
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-500',
      text: 'text-amber-900',
      icon: '⚠'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-600',
      text: 'text-red-900',
      icon: '✗'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-600',
      text: 'text-blue-900',
      icon: 'ℹ'
    }
  };

  const styles = config[type];

  return (
    <div className={`flex items-start gap-3 p-4 ${styles.bg} border-l-4 ${styles.border} rounded-lg`}>
      <div className={`text-lg flex-shrink-0 ${styles.text}`}>
        {styles.icon}
      </div>
      <div className={`flex-1 ${styles.text}`}>
        {title && <div className="mb-1"><strong>{title}</strong></div>}
        <div className="text-sm">{children}</div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors ${styles.text}`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Tab Navigation
interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-2 border-b border-slate-200 mb-6 flex-wrap">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-3 border-b-2 transition-colors ${
            activeTab === tab.id
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// Status Badge
interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children: ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const styles = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    neutral: 'bg-slate-100 text-slate-700'
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs uppercase tracking-wide ${styles[status]}`}>
      {children}
    </span>
  );
}

// Loading Spinner
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizes[size]} border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin`}></div>
  );
}

// Button with loading state
interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  type?: 'button' | 'submit';
}

export function Button({ onClick, children, variant = 'primary', loading = false, disabled = false, icon, type = 'button' }: ButtonProps) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-200 text-slate-700 hover:bg-slate-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
    >
      {loading ? (
        <LoadingSpinner size="sm" />
      ) : icon}
      {children}
    </button>
  );
}
