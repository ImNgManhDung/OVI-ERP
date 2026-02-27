import { useState } from 'react';
import { Bell, Menu, ChevronDown, User, LogOut, Briefcase, Star, History, Settings, HelpCircle, Search } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
  currentResponsibility: string;
  onResponsibilityClick: () => void;
  onToggleSidebar: () => void;
}

export default function Header({ currentResponsibility, onResponsibilityClick, onToggleSidebar }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const getResponsibilityLabel = () => {
    if (currentResponsibility === 'FCM') return 'FCM';
    if (currentResponsibility === 'TEM') return 'TEM';
    if (currentResponsibility === 'WMM') return 'WMM';
    return 'FCM';
  };

  const getResponsibilityFull = () => {
    if (currentResponsibility === 'FCM') return 'Finance & Costing Management';
    if (currentResponsibility === 'TEM') return 'Travel & Expenses Management';
    if (currentResponsibility === 'WMM') return 'Warehouse & Material Management';
    return 'Finance & Costing Management';
  };

  const getResponsibilityColor = () => {
    if (currentResponsibility === 'TEM') return '#0891b2';
    if (currentResponsibility === 'WMM') return '#059669';
    return '#0064d9'; // FCM default
  };

  const notifications = [
    { id: 1, type: 'warning', message: '3 invoice(s) overdue and require attention', time: '5m ago' },
    { id: 2, type: 'info', message: 'Payment Run #PR-2025-089 has been approved', time: '1h ago' },
    { id: 3, type: 'success', message: 'Month-end closing completed successfully', time: '2h ago' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm">

      {/* Left: Logo + App Name */}
      <div className="flex items-center h-full gap-4 px-4">
        {/* Sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="flex items-center justify-center hover:bg-gray-100 transition-colors rounded p-2"
          title="Toggle Sidebar"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-base bg-blue-600">
            O
          </div>
          <span className="text-gray-800 font-semibold text-base">OAP Meta</span>
        </div>
      </div>

      {/* Right: User Info + Actions */}
      <div className="flex items-center h-full gap-2 px-4">
        
        {/* Search Icon */}
        <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Search">
          <Search className="w-5 h-5 text-gray-500" />
        </button>

        {/* Settings */}
        <button className="p-2 hover:bg-gray-100 rounded transition-colors" title={t.header.settings}>
          <Settings className="w-5 h-5 text-gray-500" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
            className="p-2 hover:bg-gray-100 rounded transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                <div className="px-4 py-3 border-b flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800">Notifications</span>
                  <span className="text-xs text-blue-600 cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="px-4 py-3 border-b last:border-0 hover:bg-gray-50 cursor-pointer flex gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        n.type === 'warning' ? 'bg-amber-400' :
                        n.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-700 leading-relaxed">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t text-center">
                  <span className="text-xs text-blue-600 cursor-pointer hover:underline">View all notifications</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Account */}
        <div className="relative">
          <button
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
            className="flex items-center gap-2 hover:bg-gray-100 transition-colors rounded px-2 py-1.5"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold bg-blue-600">
              HC
            </div>
            <div className="flex flex-col items-start">
              <span className="text-gray-800 text-sm font-medium leading-tight">Huong Giang Cao</span>
              <span className="text-gray-500 text-xs leading-tight">giang@gmail.com</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                {/* User info header */}
                <div className="px-4 py-3 border-b bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold bg-blue-600">
                      HC
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Huong Giang Cao</p>
                      <p className="text-xs text-gray-500">giang@gmail.com</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors">
                    <User className="w-4 h-4 text-gray-500" />
                    {t.header.userProfile}
                  </button>
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors"
                    onClick={() => { onResponsibilityClick(); setShowUserMenu(false); }}
                  >
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    {t.header.switchResponsibility}
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors">
                    <Settings className="w-4 h-4 text-gray-500" />
                    {t.header.preferences}
                  </button>
                </div>

                <div className="border-t" />
                
                {/* Language selector */}
                <div className="px-4 py-2">
                  <label className="text-xs text-gray-500 mb-1 block">Ngôn ngữ</label>
                  <button
                    onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                  >
                    <span className="text-gray-700">{lang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇺🇸 English'}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Workspace selector */}
                <div className="px-4 py-2 border-t">
                  <label className="text-xs text-gray-500 mb-1 block">Chuyển Workspace</label>
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded transition-colors border border-blue-200">
                    <span className="text-blue-700 font-medium">API Product</span>
                  </button>
                </div>

                {/* Additional options */}
                <div className="px-4 py-2 space-y-1">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors">
                    Chuyển môn quản lý
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors">
                    Báo lỗi hệ thống
                  </button>
                </div>

                <div className="border-t" />
                
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left transition-colors">
                  <LogOut className="w-4 h-4" />
                  {t.header.signOut}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}