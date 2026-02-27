import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../i18n/LanguageContext';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterPanelProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusOptions?: FilterOption[];
  selectedStatus?: string;
  onStatusChange?: (value: string) => void;
  typeOptions?: FilterOption[];
  selectedType?: string;
  onTypeChange?: (value: string) => void;
  showStatus?: boolean;
  showType?: boolean;
  customFilters?: React.ReactNode;
}

export function FilterPanel({
  searchValue,
  onSearchChange,
  statusOptions = [],
  selectedStatus = '',
  onStatusChange,
  typeOptions = [],
  selectedType = '',
  onTypeChange,
  showStatus = true,
  showType = false,
  customFilters,
}: FilterPanelProps) {
  const { t } = useLanguage();

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-4">
      {/* Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-500">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Bộ lọc
        </div>
        <div className="text-xs text-gray-500">Search</div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Code, Name, Address..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Status Filter */}
      {showStatus && statusOptions.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange?.(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Type Filter */}
      {showType && typeOptions.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Type</label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange?.(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Custom Filters */}
      {customFilters}
    </div>
  );
}
