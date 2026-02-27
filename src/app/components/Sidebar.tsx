import { useState } from 'react';
import { ChevronRight, ChevronDown, Search, FileText, DollarSign, CreditCard, Receipt, Package, TrendingUp, Calculator, Building2, FileSpreadsheet, LayoutDashboard, Users, Layers, BookOpen, Bell, CheckSquare, MessageSquare, ChevronLeft, Globe } from 'lucide-react';
import { Input } from './ui/input';
import { useLanguage } from '../i18n/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
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

export default function Sidebar({ isOpen, onToggle, onNavigate, currentView, onModuleChange }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['ke-toan-phai-tra', 'ke-toan-tong-hop']);
  const [searchText, setSearchText] = useState('');
  const [showModuleSelector, setShowModuleSelector] = useState(false);
  const { t, lang, setLang } = useLanguage();

  const menuGroups: MenuGroup[] = [
    {
      groupLabel: t.nav.overview,
      items: [
        { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard, iconColor: '#0064d9' },
      ]
    },
    {
      groupLabel: t.nav.transactions,
      items: [
        {
          id: 'tien-mat-ngan-hang',
          label: t.nav.cashAndBank,
          icon: DollarSign,
          iconColor: '#16a34a',
          children: [
            { id: 'phieu-thu-tien-mat', label: t.nav.cashReceipt, icon: Receipt },
            { id: 'phieu-thu-ngan-hang', label: t.nav.bankReceipt, icon: Receipt },
            { id: 'phieu-chi-tien-mat', label: t.nav.cashPayment, icon: Receipt },
            { id: 'phieu-de-nghi-chi', label: t.nav.paymentRequest, icon: FileText },
          ]
        },
        {
          id: 'ke-toan-phai-thu',
          label: t.nav.accountsReceivable,
          icon: CreditCard,
          iconColor: '#0891b2',
          children: [
            { id: 'hoa-don-ban-hang', label: t.nav.salesInvoice, icon: Receipt },
            { id: 'dept-clearing-phai-thu', label: t.nav.deptClearing, icon: FileSpreadsheet },
            { id: 'so-chi-tiet-phai-tra', label: t.nav.arLedger, icon: FileText },
          ]
        },
        {
          id: 'ke-toan-phai-tra',
          label: t.nav.accountsPayable,
          icon: FileText,
          iconColor: '#7c3aed',
          children: [
            { id: 'hoa-don-mua-hang', label: t.nav.purchaseInvoice, icon: Receipt },
            { id: 'dept-clearing-phai-tra', label: t.nav.deptClearing, icon: FileSpreadsheet },
          ]
        },
      ]
    },
    {
      groupLabel: t.nav.accounting,
      items: [
        {
          id: 'ke-toan-tai-san',
          label: t.nav.fixedAssets,
          icon: Building2,
          iconColor: '#dc2626',
          children: [
            { id: 'list-fixed-assets', label: 'Fixed Assets', icon: FileText },
            { id: 'asset-funding-sources', label: t.nav.assetFundingSources, icon: FileText },
            { id: 'list-asset-category', label: t.nav.assetCategory, icon: FileText },
            { id: 'asset-books', label: t.nav.assetBooks, icon: FileText },
            { id: 'asset-depreciations', label: t.nav.assetDepreciations, icon: FileText },
            { id: 'asset-transactions', label: t.nav.assetTransactions, icon: FileText },
          ]
        },
        { id: 'ke-toan-vat-tu', label: t.nav.inventoryAccounting, icon: Package, iconColor: '#059669' },
        { id: 'ke-toan-thue', label: t.nav.taxAccounting, icon: Calculator, iconColor: '#0284c7' },
        { id: 'ke-toan-gia-thanh', label: t.nav.costAccounting, icon: TrendingUp, iconColor: '#7c3aed' },
        {
          id: 'ke-toan-tong-hop',
          label: t.nav.generalLedger,
          icon: FileSpreadsheet,
          iconColor: '#0064d9',
          children: [
            { id: 'universal-ledger',          label: t.nav.universalLedgers,     icon: BookOpen },
            { id: 'gl-journal',                 label: t.nav.glJournal,            icon: FileText },
            { id: 'phan-quyen-so-chi-tiet',     label: t.nav.ledgerPermissions,   icon: FileText },
            { id: 'pending-allocation',         label: t.nav.pendingAllocation,     icon: FileText },
            { id: 'allocation-declaration',     label: t.nav.allocationDeclaration, icon: FileText },
            { id: 'allocation-rules',           label: t.nav.allocationRule,        icon: FileText },
            { id: 'allocation-history',         label: t.nav.allocationHistory,     icon: FileText },
            { id: 'reverse-allocation',         label: t.nav.reverseAllocation,     icon: FileText },
          ]
        },
      ]
    },
    {
      groupLabel: t.nav.masterData,
      items: [
        {
          id: 'danh-muc-so-hieu',
          label: t.nav.sharedMasterData,
          icon: Layers,
          iconColor: '#64748b',
          children: [
            { id: 'chart-of-account', label: t.nav.chartOfAccount, icon: FileText },
            { id: 'ledger-entity', label: t.nav.legalEntity, icon: FileText },
            { id: 'payment-term', label: t.nav.paymentTerm, icon: FileText },
            { id: 'doc-type', label: t.nav.docType, icon: FileText },
            { id: 'transaction-type', label: t.nav.transactionType, icon: FileText },
            { id: 'docs-trans-mapping', label: t.nav.docsTransMapping, icon: FileText },
            { id: 'cost-center', label: t.nav.costCenter, icon: FileText },
            { id: 'cost-element', label: t.nav.costElement, icon: FileText },
            { id: 'profit-center', label: t.nav.profitCenter, icon: FileText },
            { id: 'extension-analysis', label: t.nav.extensionAnalysis, icon: FileText },
            { id: 'cash-flow', label: t.nav.cashFlow, icon: FileText },
            { id: 'acc-det-rule', label: t.nav.accountDetermRule, icon: FileText },
            { id: 'project-assignments', label: t.nav.projectAssignments, icon: FileText },
            { id: 'product-cost-assignments', label: t.nav.productCostAssignments, icon: FileText },
            { id: 'account-accounting-setup', label: t.nav.accountSetup, icon: FileText },
            { id: 'approval-workflow', label: t.nav.approvalWorkflow, icon: FileText },
            { id: 'travel-policy', label: t.nav.expensePolicy, icon: FileText },
          ]
        },
      ]
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleMenuClick = (id: string) => {
    const navMap: Record<string, string> = {
      'dashboard': 'dashboard',
      'hoa-don-ban-hang': 'list-sales',
      'hoa-don-mua-hang': 'list-purchase',
      'phieu-thu-tien-mat': 'list-cash-receipt',
      'phieu-thu-ngan-hang': 'list-bank-receipt',
      'phieu-chi-tien-mat': 'list-cash-payment',
      'phieu-de-nghi-chi': 'list-payment-request',
      'dept-clearing-phai-thu': 'dept-clearing',
      'dept-clearing-phai-tra': 'dept-clearing',
      'universal-ledger': 'list-universal-ledger',
      'gl-journal': 'list-gl-journal',
      'phan-quyen-so-chi-tiet': 'account-permission',
      'so-chi-tiet-phai-tra': 'account-ledger',
      'account-accounting-setup': 'account-accounting-setup',
      'doc-type': 'doc-type',
      'transaction-type': 'transaction-type',
      'docs-trans-mapping': 'docs-trans-mapping',
      'acc-det-rule': 'acc-det-rule',
      'chart-of-account': 'chart-of-account',
      'ledger-entity': 'ledger-entity',
      'payment-term': 'list-payment-term',
      'approval-workflow': 'list-approval-workflow',
      'travel-policy': 'expense-policy',
      'cost-center': 'cost-center',
      'cost-element': 'cost-element',
      'profit-center': 'profit-center',
      'project-assignments': 'project-assignments',
      'product-cost-assignments': 'product-cost-assignments',
      'extension-analysis': 'extension-analysis',
      'cash-flow': 'cash-flow',
      'list-fixed-assets': 'list-fixed-assets',
      'asset-transactions': 'asset-transactions',
      'asset-funding-sources': 'asset-funding-sources',
      'asset-category': 'list-asset-category',
      'asset-books': 'asset-books',
      'asset-depreciations': 'asset-depreciations',
      // Cost Allocation
      'pending-allocation':     'pending-allocation',
      'allocation-declaration': 'allocation-declaration',
      'allocation-rules':       'allocation-rules',
      'allocation-history':     'allocation-history',
      'reverse-allocation':     'reverse-allocation',
    };
    if (navMap[id]) onNavigate(navMap[id]);
  };

  const isActiveItem = (id: string): boolean => {
    const activeMap: Record<string, string[]> = {
      'dashboard': ['dashboard'],
      'hoa-don-ban-hang': ['list-sales', 'create-sales'],
      'hoa-don-mua-hang': ['list-purchase', 'create-purchase'],
      'phieu-thu-tien-mat': ['list-cash-receipt', 'create-cash-receipt'],
      'phieu-thu-ngan-hang': ['list-bank-receipt', 'create-bank-receipt'],
      'phieu-chi-tien-mat': ['list-cash-payment', 'create-cash-payment'],
      'phieu-de-nghi-chi': ['list-payment-request', 'create-payment-request'],
      'dept-clearing-phai-thu': ['dept-clearing'],
      'dept-clearing-phai-tra': ['dept-clearing'],
      'universal-ledger': ['list-universal-ledger', 'create-universal-ledger'],
      'gl-journal': ['list-gl-journal', 'create-gl-journal'],
      'phan-quyen-so-chi-tiet': ['account-permission'],
      'so-chi-tiet-phai-tra': ['account-ledger'],
      'account-accounting-setup': ['account-accounting-setup'],
      'doc-type': ['doc-type'],
      'transaction-type': ['transaction-type'],
      'docs-trans-mapping': ['docs-trans-mapping'],
      'acc-det-rule': ['acc-det-rule'],
      'chart-of-account': ['chart-of-account'],
      'ledger-entity': ['ledger-entity'],
      'payment-term': ['list-payment-term', 'create-payment-term'],
      'approval-workflow': ['list-approval-workflow', 'create-approval-workflow'],
      'travel-policy': ['expense-policy'],
      'cost-center': ['cost-center'],
      'cost-element': ['cost-element'],
      'profit-center': ['profit-center'],
      'project-assignments': ['project-assignments'],
      'product-cost-assignments': ['product-cost-assignments'],
      'extension-analysis': ['extension-analysis'],
      'cash-flow': ['cash-flow'],
      'list-fixed-assets': ['list-fixed-assets', 'create-fixed-asset'],
      'asset-transactions': ['asset-transactions'],
      'asset-funding-sources': ['asset-funding-sources'],
      'asset-category': ['list-asset-category', 'create-asset-category'],
      'asset-books': ['asset-books'],
      'asset-depreciations': ['asset-depreciations'],
      // Cost Allocation
      'pending-allocation':     ['pending-allocation'],
      'allocation-declaration': ['allocation-declaration'],
      'allocation-rules':       ['allocation-rules', 'create-allocation-rule'],
      'allocation-history':     ['allocation-history'],
      'reverse-allocation':     ['reverse-allocation', 'create-reverse-allocation'],
    };
    return (activeMap[id] || []).includes(currentView);
  };

  const isParentActive = (item: MenuItem): boolean => {
    if (!item.children) return false;
    return item.children.some(child => isActiveItem(child.id) || isParentActive(child));
  };

  // Flatten all items for search
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

  const handleModuleClick = (moduleId: string) => {
    setShowModuleSelector(false);
    if (onModuleChange) {
      onModuleChange(moduleId);
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const Icon = item.icon;
    const isActive = isActiveItem(item.id);
    const isParent = isParentActive(item);

    return (
      <div key={item.id}>
        <div
          className={`flex items-center justify-between cursor-pointer transition-all duration-100 group relative ${
            isActive
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
            <span className={`text-xs leading-snug truncate ${
              isActive ? 'font-semibold text-blue-700' :
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
              className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${
                isExpanded ? '' : '-rotate-90'
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
      className={`fixed top-14 left-0 h-[calc(100vh-56px)] transition-transform duration-300 z-40 flex flex-col bg-white border-r border-gray-200`}
      style={{
        width: '260px',
        transform: isOpen ? 'translateX(0)' : 'translateX(-260px)',
      }}
    >
      {/* Logo Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-red-500 text-white text-xs font-bold">
            O
          </div>
          <span className="text-sm font-semibold text-gray-800">OAP Meta</span>
        </div>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 px-3 pt-3 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm menu..."
            className="pl-9 h-9 text-sm bg-white border-gray-300 focus:border-blue-400"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex-shrink-0 px-3 pb-3 flex items-center gap-2">
        <button className="flex-1 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">
          <CheckSquare className="w-4 h-4 text-blue-600" />
        </button>
        <button className="flex-1 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors relative">
          <Bell className="w-4 h-4 text-purple-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
            2
          </span>
        </button>
        <button className="flex-1 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">
          <MessageSquare className="w-4 h-4 text-green-600" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        {filteredItems ? (
          /* Search results */
          <div>
            {filteredItems.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-gray-400">No results found</div>
            ) : (
              filteredItems.map(item => (
                <div
                  key={item.id}
                  className={`flex items-center gap-2 px-4 py-2 mx-2 rounded cursor-pointer text-sm transition-colors ${
                    isActiveItem(item.id) ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => { handleMenuClick(item.id); setSearchText(''); }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  {item.label}
                </div>
              ))
            )}
          </div>
        ) : (
          /* Normal grouped menu */
          <div>
            {menuGroups.map((group, gi) => (
              <div key={gi} className="mb-1">
                {group.items.map(item => renderMenuItem(item, 0))}
              </div>
            ))}
          </div>
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
              <div className="w-5 h-5 rounded flex items-center justify-center bg-teal-500 text-white text-xs font-bold">
                F
              </div>
              <span className="text-sm font-semibold text-blue-700">FCM</span>
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

                    <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 border-l-3 border-blue-600 text-left" onClick={() => handleModuleClick('finance-costing')}>
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-teal-500 text-white text-xs font-bold">
                        F
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-blue-700">Finance & Costing</div>
                        <div className="text-xs text-blue-600">Management</div>
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
            onClick={onToggle}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}