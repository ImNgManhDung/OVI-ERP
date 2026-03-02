import { useState } from 'react';
import {
  ChevronDown, Search, LayoutDashboard, Package, FileText,
  ArrowDownToLine, ArrowUpFromLine, RotateCcw, CheckSquare, Layers, Settings,
  Globe, ChevronLeft, DollarSign, Users, Building2, TrendingUp, FileSpreadsheet, Calculator
} from 'lucide-react';
import { Input } from './ui/input';
import { useLanguage } from '../i18n/LanguageContext';

interface WMMSidebarProps {
  isOpen: boolean;
  onToggle?: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
  onModuleChange?: (moduleId: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  iconColor?: string;
  children?: MenuItem[];
  badge?: string;
  badgeColor?: string;
}

interface MenuGroup {
  groupLabel: string;
  items: MenuItem[];
}

export default function WMMSidebar({ isOpen, onToggle, onNavigate, currentView, onModuleChange }: WMMSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['material-req-mgmt', 'store-transaction-mgmt']);
  const [searchText, setSearchText] = useState('');
  const [showModuleSelector, setShowModuleSelector] = useState(false);
  const { t, lang, setLang } = useLanguage();

  const handleModuleClick = (moduleId: string) => {
    setShowModuleSelector(false);
    if (onModuleChange) {
      onModuleChange(moduleId);
    }
  };

  const menuGroups: MenuGroup[] = [
    {
      groupLabel: t.wmm.groupOverview,
      items: [
        { id: 'wmm-dashboard', label: t.wmm.dashboard, icon: LayoutDashboard, iconColor: '#059669' },
      ]
    },
    {
      groupLabel: t.wmm.groupMaterialMgmt,
      items: [
        {
          id: 'wmm-material-master',
          label: t.wmm.materialMasterData,
          icon: Package,
          iconColor: '#059669',
          children: [
            { id: 'wmm-material-list', label: t.wmm.materialList, icon: FileText },
            { id: 'wmm-material-category', label: t.wmm.materialCategory, icon: Layers },
            { id: 'wmm-unit-of-measure', label: t.wmm.unitOfMeasure, icon: Settings },
            { id: 'wmm-warehouse-location', label: t.wmm.warehouseLocation, icon: Layers },
          ]
        },
        {
          id: 'material-req-mgmt',
          label: t.wmm.materialReqMgmt,
          icon: FileText,
          iconColor: '#0891b2',
          children: [
            { id: 'wmm-goods-receipt-req', label: t.wmm.goodsReceiptReq, icon: ArrowDownToLine },
            { id: 'wmm-goods-issues-req', label: t.wmm.goodsIssuesReq, icon: ArrowUpFromLine },
            { id: 'wmm-material-req-processing', label: t.wmm.materialReqProcessing, icon: FileText },
          ]
        },
      ]
    },
    {
      groupLabel: t.wmm.groupStoreTransactions,
      items: [
        {
          id: 'store-transaction-mgmt',
          label: t.wmm.storeTransactionMgmt,
          icon: Layers,
          iconColor: '#7c3aed',
          children: [
            { id: 'wmm-goods-receipt', label: t.wmm.goodsReceipt, icon: ArrowDownToLine },
            { id: 'wmm-good-issue', label: t.wmm.goodsIssue, icon: ArrowUpFromLine },
            { id: 'wmm-goods-receipt-adjust', label: t.wmm.goodsReceiptAdjust, icon: RotateCcw },
            { id: 'wmm-goods-issues-adjust', label: t.wmm.goodsIssuesAdjust, icon: RotateCcw },
            { id: 'wmm-goods-receipt-approval', label: t.wmm.goodsReceiptApproval, icon: CheckSquare },
            { id: 'wmm-good-issue-approval', label: t.wmm.goodsIssueApproval, icon: CheckSquare },
          ]
        },
      ]
    },
  ];

  // ── Navigation map ──────────────────────────────────────────────────────────
  const handleMenuClick = (id: string) => {
    const navMap: Record<string, string> = {
      'wmm-dashboard': 'wmm-dashboard',
      'wmm-material-list': 'wmm-material-list',
      'wmm-material-category': 'wmm-material-category',
      'wmm-unit-of-measure': 'wmm-unit-of-measure',
      'wmm-warehouse-location': 'wmm-warehouse-location',
      'wmm-goods-receipt-req': 'wmm-goods-receipt-req',
      'wmm-goods-issues-req': 'wmm-goods-issues-req',
      'wmm-material-req-processing': 'wmm-material-req-processing',
      'wmm-goods-receipt': 'wmm-goods-receipt',
      'wmm-good-issue': 'wmm-good-issue',
      'wmm-goods-receipt-adjust': 'wmm-goods-receipt-adjust',
      'wmm-goods-issues-adjust': 'wmm-goods-issues-adjust',
      'wmm-goods-receipt-approval': 'wmm-goods-receipt-approval',
      'wmm-good-issue-approval': 'wmm-good-issue-approval',
    };
    if (navMap[id]) onNavigate(navMap[id]);
  };

  const isActiveItem = (id: string): boolean => {
    const activeMap: Record<string, string[]> = {
      'wmm-dashboard': ['wmm-dashboard'],
      'wmm-material-list': ['wmm-material-list'],
      'wmm-material-category': ['wmm-material-category'],
      'wmm-unit-of-measure': ['wmm-unit-of-measure'],
      'wmm-warehouse-location': ['wmm-warehouse-location'],
      'wmm-goods-receipt-req': ['wmm-goods-receipt-req'],
      'wmm-goods-issues-req': ['wmm-goods-issues-req'],
      'wmm-material-req-processing': ['wmm-material-req-processing'],
      'wmm-goods-receipt': ['wmm-goods-receipt', 'wmm-create-good-receipt'],
      'wmm-good-issue': ['wmm-good-issue', 'wmm-create-good-issue'],
      'wmm-goods-receipt-adjust': ['wmm-goods-receipt-adjust'],
      'wmm-goods-issues-adjust': ['wmm-goods-issues-adjust'],
      'wmm-goods-receipt-approval': ['wmm-goods-receipt-approval'],
      'wmm-good-issue-approval': ['wmm-good-issue-approval'],
    };
    return (activeMap[id] || []).includes(currentView);
  };

  const isParentActive = (item: MenuItem): boolean => {
    if (!item.children) return false;
    return item.children.some(child => isActiveItem(child.id) || isParentActive(child));
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Flatten for search
  const flattenItems = (items: MenuItem[]): MenuItem[] => {
    const result: MenuItem[] = [];
    for (const item of items) {
      if (!item.children) result.push(item);
      if (item.children) result.push(...flattenItems(item.children));
    }
    return result;
  };

  const allLeafItems = menuGroups.flatMap(g => flattenItems(g.items));
  const filteredItems = searchText
    ? allLeafItems.filter(i => i.label.toLowerCase().includes(searchText.toLowerCase()))
    : null;

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const Icon = item.icon;
    const isActive = isActiveItem(item.id);
    const isParent = isParentActive(item);

    return (
      <div key={item.id}>
        <div
          className={`flex items-center justify-between cursor-pointer transition-all duration-100 group relative ${isActive
            ? 'bg-blue-50 text-blue-700'
            : level === 0
              ? 'text-gray-700 hover:bg-gray-50'
              : 'text-gray-600 hover:bg-gray-50/80'
            }`}
          style={{
            paddingLeft: `${level === 0 ? 16 : 12 + level * 16}px`,
            paddingRight: '12px',
            paddingTop: level === 0 ? '8px' : '6px',
            paddingBottom: level === 0 ? '8px' : '6px',
            borderLeft: isActive ? '3px solid #1d4ed8' : '3px solid transparent',
          }}
          onClick={() => {
            if (hasChildren) toggleExpand(item.id);
            else handleMenuClick(item.id);
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {Icon && level === 0 && (
              <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <Icon className="w-4 h-4" style={{ color: isActive ? '#1d4ed8' : (item.iconColor || '#64748b') }} />
              </div>
            )}
            {level > 0 && (
              <div className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: isActive ? '#1d4ed8' : '#cbd5e1' }} />
            )}
            <span className={`text-xs leading-snug truncate ${isActive ? 'font-semibold text-blue-700' :
              level === 0 ? 'font-medium text-gray-700' : 'text-gray-600'
              } ${isParent && !isActive ? 'text-gray-800' : ''}`}>
              {item.label}
            </span>
          </div>

          {item.badge && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full mr-1.5 font-semibold ${item.badgeColor || 'bg-blue-100 text-blue-600'}`}>
              {item.badge}
            </span>
          )}

          {hasChildren && (
            <ChevronDown
              className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'
                } ${isActive || isParent ? 'text-blue-500' : 'text-gray-400'}`}
            />
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="bg-gray-50/50">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed top-12 left-0 h-[calc(100vh-48px)] transition-transform duration-300 z-40 flex flex-col"
      style={{
        width: '280px',
        transform: isOpen ? 'translateX(0)' : 'translateX(-280px)',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Module badge */}
      <div className="flex-shrink-0 px-4 py-2.5 border-b border-gray-100"
        style={{ backgroundColor: '#f0fdf4' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center"
            style={{ backgroundColor: '#059669' }}>
            <Package className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: '#059669' }}>WMM</p>
            <p className="text-xs text-gray-400" style={{ fontSize: '10px' }}>{t.wmm.sidebarSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 p-3 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <Input
            placeholder={t.wmm.searchMenu}
            className="pl-8 h-8 text-xs bg-gray-50 border-gray-200"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-2">
        {filteredItems ? (
          <div>
            {filteredItems.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-gray-400">{t.wmm.noRecordsFound}</div>
            ) : (
              filteredItems.map(item => (
                <div
                  key={item.id}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-xs transition-colors ${isActiveItem(item.id) ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  onClick={() => { handleMenuClick(item.id); setSearchText(''); }}
                >
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  {item.label}
                </div>
              ))
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
              {group.items.map(item => renderMenuItem(item, 0))}
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
              <div className="w-5 h-5 rounded flex items-center justify-center bg-lime-600 text-white text-xs font-bold">
                W
              </div>
              <span className="text-sm font-semibold text-blue-700">WMM</span>
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

                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left transition-colors" onClick={() => handleModuleClick('travel-expense')}>
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-emerald-500 text-white text-xs">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700">Travel & Expense</div>
                        <div className="text-xs text-gray-400">Management</div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 border-l-3 border-blue-600 text-left">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-lime-600 text-white text-xs font-bold">
                        W
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-blue-700">Warehouse & Material</div>
                        <div className="text-xs text-blue-600">Management</div>
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