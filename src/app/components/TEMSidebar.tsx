import { useState } from 'react';
import { Search, LayoutDashboard, FileText, DollarSign, Plane, Globe, ChevronDown, ChevronLeft, Package, Calculator, Users, Layers, Building2, TrendingUp, FileSpreadsheet } from 'lucide-react';
import { Input } from './ui/input';
import { useLanguage } from '../i18n/LanguageContext';

interface TEMSidebarProps {
  isOpen: boolean;
  onNavigate: (view: string) => void;
  currentView: string;
  onModuleChange?: (moduleId: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  iconColor?: string;
}

export default function TEMSidebar({ isOpen, onNavigate, currentView, onModuleChange }: TEMSidebarProps) {
  const [searchText, setSearchText] = useState('');
  const [showModuleSelector, setShowModuleSelector] = useState(false);
  const { t, lang, setLang } = useLanguage();

  const handleModuleClick = (moduleId: string) => {
    setShowModuleSelector(false);
    if (onModuleChange) {
      onModuleChange(moduleId);
    }
  };

  const menuGroups = [
    {
      groupLabel: t.tem.groupOverview,
      items: [
        { id: 'tem-dashboard', label: t.tem.dashboard, icon: LayoutDashboard, iconColor: '#0064d9' },
      ]
    },
    {
      groupLabel: t.tem.groupAdvances,
      items: [
        { id: 'advance-request',      label: t.tem.advanceRequest,      icon: DollarSign, iconColor: '#16a34a' },
        { id: 'advance-settlement',   label: t.tem.advanceSettlement,   icon: DollarSign, iconColor: '#0891b2' },
        { id: 'advance-registration', label: t.tem.advanceRegistration, icon: FileText,   iconColor: '#7c3aed' },
      ]
    },
    {
      groupLabel: t.tem.groupTravelExpenses,
      items: [
        { id: 'travel-expenditure-requisition', label: t.tem.travelExpensesRequest, icon: Plane,     iconColor: '#d97706' },
        { id: 'expense-declaration',            label: t.tem.expenseDeclaration,    icon: DollarSign, iconColor: '#dc2626' },
      ]
    },
  ];

  if (!isOpen) return null;

  const allItems = menuGroups.flatMap(g => g.items);
  const filteredItems = searchText
    ? allItems.filter(i => i.label.toLowerCase().includes(searchText.toLowerCase()))
    : null;

  return (
    <div
      className="fixed top-12 left-0 h-[calc(100vh-48px)] z-40 flex flex-col"
      style={{
        width: '280px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Module badge */}
      <div className="flex-shrink-0 px-4 py-2.5 border-b border-gray-100"
        style={{ backgroundColor: '#f0f9ff' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center"
            style={{ backgroundColor: '#0891b2' }}>
            <Plane className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: '#0891b2' }}>TEM</p>
            <p className="text-xs text-gray-400" style={{ fontSize: '10px' }}>{t.tem.sidebarSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 p-3 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <Input
            placeholder={t.tem.searchMenu}
            className="pl-8 h-8 text-xs bg-gray-50 border-gray-200"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-2">
        {filteredItems ? (
          <div>
            {filteredItems.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-gray-400">{t.tem.noRecordsFound}</div>
            ) : (
              filteredItems.map(item => {
                const Icon = item.icon;
                const isActive = item.id === currentView;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-xs transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => { onNavigate(item.id); setSearchText(''); }}
                  >
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    {item.label}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          menuGroups.map((group, gi) => (
            <div key={gi} className="mb-2">
              <div className="px-4 py-1.5 mt-1">
                <span className="text-xs font-semibold tracking-widest" style={{ color: '#94a3b8', fontSize: '10px' }}>
                  {group.groupLabel}
                </span>
              </div>
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = item.id === currentView;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-2.5 cursor-pointer transition-all duration-100 ${
                      isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{
                      paddingLeft: '16px',
                      paddingRight: '12px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      borderLeft: isActive ? '3px solid #1d4ed8' : '3px solid transparent',
                    }}
                    onClick={() => onNavigate(item.id)}
                  >
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" style={{ color: isActive ? '#1d4ed8' : (item.iconColor || '#64748b') }} />
                    </div>
                    <span className={`text-xs ${isActive ? 'font-semibold text-blue-700' : 'font-medium text-gray-700'}`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-200">
        {/* Language Selector */}
        <div className="px-3 py-2 border-b border-gray-200">
          <button 
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className="w-full flex items-center justify-between px-3 py-2 bg-teal-50 hover:bg-teal-100 rounded border border-teal-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">
                {lang === 'vi' ? 'Tiếng Việt' : 'English'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-teal-600" />
          </button>
        </div>

        {/* Bottom Footer */}
        <div className="px-3 py-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">v1</span>
          <div className="relative">
            <button 
              onClick={() => setShowModuleSelector(!showModuleSelector)}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
            >
              <div className="w-5 h-5 rounded flex items-center justify-center bg-emerald-500 text-white text-xs font-bold">
                T
              </div>
              <span className="text-sm font-semibold text-blue-700">TEM</span>
            </button>

            {/* Module Selector Dropdown */}
            {showModuleSelector && (
              <>
                <div className="fixed inset-0 z-[100]" onClick={() => setShowModuleSelector(false)} />
                <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-[101] max-h-96 overflow-y-auto">
                  <div className="px-3 py-2 border-b border-gray-200">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Select Module</span>
                  </div>
                  
                  {/* Module List */}
                  <div className="py-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-gray-400 text-white text-xs">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Administration</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-purple-500 text-white text-xs">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Centralized Cash</div>
                        <div className="text-xs text-gray-400">Management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-500 text-white text-xs">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Customer Relationship</div>
                        <div className="text-xs text-gray-400">Management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-amber-500 text-white text-xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Document management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors" onClick={() => handleModuleClick('finance-costing')}>
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-teal-500 text-white text-xs font-bold">
                        F
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Finance & Costing</div>
                        <div className="text-xs text-gray-400">Management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-green-500 text-white text-xs">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Human Capital</div>
                        <div className="text-xs text-gray-400">Management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-indigo-500 text-white text-xs">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Project Management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-orange-500 text-white text-xs">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Prevent & Maintenance</div>
                        <div className="text-xs text-gray-400">Management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-pink-500 text-white text-xs">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Procurement</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-red-500 text-white text-xs">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Real Estate Management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-cyan-500 text-white text-xs">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Sales & Distribution</div>
                        <div className="text-xs text-gray-400">Management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-slate-500 text-white text-xs">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Task code management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 border-l-3 border-blue-600 text-left">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-emerald-500 text-white text-xs font-bold">
                        T
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-blue-700">Travel & Expense</div>
                        <div className="text-xs text-blue-600">Management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors" onClick={() => handleModuleClick('warehouse-material')}>
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-lime-600 text-white text-xs">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Warehouse & Material</div>
                        <div className="text-xs text-gray-400">Management</div>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <button 
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}