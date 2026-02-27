import {
  CheckCircle, FileText, AlertTriangle, Calendar, TrendingUp, TrendingDown,
  Clock, ArrowRight, RefreshCw, ChevronRight, Activity, BarChart2,
  Plane, DollarSign, Users, MapPin, Wallet, ReceiptText, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { useLanguage } from '../i18n/LanguageContext';

// ── Mock Data ────────────────────────────────────────────────────────────────

const monthlyTrendData = [
  { month: 'Aug', advances: 120, settled: 95, expenses: 88 },
  { month: 'Sep', advances: 185, settled: 142, expenses: 130 },
  { month: 'Oct', advances: 160, settled: 138, expenses: 125 },
  { month: 'Nov', advances: 230, settled: 195, expenses: 178 },
  { month: 'Dec', advances: 310, settled: 270, expenses: 251 },
  { month: 'Jan', advances: 260, settled: 228, expenses: 215 },
  { month: 'Feb', advances: 340, settled: 290, expenses: 274 },
];

const expenseCategoryData = [
  { name: 'Transportation', value: 38, color: '#1d4ed8' },
  { name: 'Accommodation', value: 27, color: '#0891b2' },
  { name: 'Meals & Entertainment', value: 18, color: '#16a34a' },
  { name: 'Conference & Training', value: 11, color: '#d97706' },
  { name: 'Other', value: 6, color: '#7c3aed' },
];

const departmentExpenseData = [
  { dept: 'Sales', budget: 180, actual: 154, trips: 24 },
  { dept: 'Engineering', budget: 120, actual: 98, trips: 16 },
  { dept: 'Operations', budget: 90, actual: 87, trips: 12 },
  { dept: 'Finance', budget: 60, actual: 42, trips: 8 },
  { dept: 'HR', budget: 45, actual: 38, trips: 6 },
  { dept: 'Marketing', budget: 75, actual: 71, trips: 10 },
];

const pendingApprovals = [
  { id: 'TAM-2025-0089', desc: 'Advance Request – Business Trip HCM', amount: '8,500,000', user: 'Trưởng phòng KD', daysWaiting: 1, type: 'advance' },
  { id: 'CTF-2025-0156', desc: 'Travel Requisition – Đà Nẵng Conference', amount: '15,200,000', user: 'Kế toán trưởng', daysWaiting: 3, type: 'travel' },
  { id: 'TTU-2025-0045', desc: 'Hoàn ứng – Training Hà Nội Q1', amount: '6,750,000', user: 'Ban Giám đốc', daysWaiting: 2, type: 'settlement' },
  { id: 'CTF-2025-0158', desc: 'Expense Declaration – Client Visit HCM', amount: '4,300,000', user: 'Trưởng phòng KD', daysWaiting: 1, type: 'expense' },
];

const recentDocuments = [
  { ref: 'TAM-2025-0092', type: 'Advance Request', employee: 'Nguyễn Văn An', destination: 'Hồ Chí Minh', amount: '10,000,000', date: '25/02/2026', status: 'approved' },
  { ref: 'CTF-2025-0162', type: 'Travel Requisition', employee: 'Trần Thị Bình', destination: 'Đà Nẵng', amount: '18,500,000', date: '25/02/2026', status: 'pending' },
  { ref: 'TTU-2025-0048', type: 'Hoàn ứng', employee: 'Lê Quang Cường', destination: 'Hà Nội', amount: '7,200,000', date: '24/02/2026', status: 'settled' },
  { ref: 'KBC-2025-0031', type: 'Expense Declaration', employee: 'Phạm Thu Hà', destination: 'Hồ Chí Minh', amount: '3,850,000', date: '24/02/2026', status: 'paid' },
  { ref: 'TAM-2025-0091', type: 'Advance Request', employee: 'Hoàng Minh Đức', destination: 'Cần Thơ', amount: '6,000,000', date: '23/02/2026', status: 'draft' },
  { ref: 'CTF-2025-0160', type: 'Travel Requisition', employee: 'Vũ Thanh Lan', destination: 'Singapore', amount: '45,000,000', date: '23/02/2026', status: 'overdue' },
];

const topDestinations = [
  { city: 'Hồ Chí Minh', trips: 48, amount: '186M' },
  { city: 'Hà Nội', trips: 32, amount: '124M' },
  { city: 'Đà Nẵng', trips: 19, amount: '78M' },
  { city: 'Singapore', trips: 7, amount: '215M' },
  { city: 'Cần Thơ', trips: 14, amount: '52M' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const formatM = (v: number) => `${v}M`;

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { cls: string; label: string }> = {
    approved: { cls: 'erp-badge-success', label: 'Approved' },
    pending:  { cls: 'erp-badge-warning', label: 'Pending' },
    settled:  { cls: 'erp-badge-info',    label: 'Settled' },
    paid:     { cls: 'erp-badge-success', label: 'Paid' },
    draft:    { cls: 'erp-badge-neutral', label: 'Draft' },
    overdue:  { cls: 'erp-badge-danger',  label: 'Overdue' },
    rejected: { cls: 'erp-badge-danger',  label: 'Rejected' },
  };
  const { cls, label } = map[status] ?? { cls: 'erp-badge-neutral', label: status };
  return <span className={cls}>{label}</span>;
};

const TypeBadge = ({ type }: { type: string }) => {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    advance:    { bg: '#eff6ff', color: '#1d4ed8', label: 'Advance' },
    travel:     { bg: '#ecfdf5', color: '#0891b2', label: 'Travel Req' },
    settlement: { bg: '#f0fdf4', color: '#16a34a', label: 'Hoàn ứng' },
    expense:    { bg: '#fffbeb', color: '#d97706', label: 'Expense' },
  };
  const { bg, color, label } = map[type] ?? { bg: '#f1f5f9', color: '#64748b', label: type };
  return (
    <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: bg, color }}>
      {label}
    </span>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-gray-500">{p.name}:</span>
            <span className="font-medium text-gray-700">{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ── Main Component ────────────────────────────────────────────────────────────

export default function TEMDashboard() {
  const { t } = useLanguage();
  // KPI values
  const outstandingAdvances = 1_240_000_000;
  const monthlyExpenses    = 274_000_000;
  const settlementRate     = 85.3;
  const pendingCount       = pendingApprovals.length;

  const advanceKPIs = { pending: 18, approved: 32, settled: 145, rejected: 5 };
  const expenseKPIs = { draft: 7, submitted: 24, approved: 61, paid: 138 };

  return (
    <div className="erp-page">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="erp-page-header mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-0.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#e0f2fe' }}>
              <Plane className="w-4 h-4" style={{ color: '#0891b2' }} />
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              {t.tem.temDashboard}
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: '#e0f2fe', color: '#0891b2' }}>
              {t.tem.temSubtitle}
            </span>
          </div>
          <p className="text-xs" style={{ color: '#64748b' }}>
            {t.tem.asOf} Wednesday, 25 February 2026 — Fiscal Period: Q1 2026
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 hover:bg-white rounded border border-gray-200 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          {t.tem.refresh}
        </button>
      </div>

      {/* ── Row 1: Financial Summary KPIs ───────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4 mb-5">

        {/* Outstanding Advances */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">{t.tem.outstandingAdvances}</p>
            <p className="text-xl font-bold text-gray-800">
              {(outstandingAdvances / 1_000_000).toFixed(0)}M
            </p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3 text-amber-500" />
              <span className="text-xs text-amber-600 font-medium">+9.2%</span>
              <span className="text-xs text-gray-400">{t.tem.vsLastMonth}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fffbeb' }}>
            <Wallet className="w-5 h-5" style={{ color: '#d97706' }} />
          </div>
        </div>

        {/* Monthly Trip Expenses */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">{t.tem.tripExpenses}</p>
            <p className="text-xl font-bold text-gray-800">
              {(monthlyExpenses / 1_000_000).toFixed(0)}M
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-cyan-500" />
              <span className="text-xs text-cyan-600 font-medium">+7.3%</span>
              <span className="text-xs text-gray-400">{t.tem.vsLastMonth}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e0f2fe' }}>
            <ReceiptText className="w-5 h-5" style={{ color: '#0891b2' }} />
          </div>
        </div>

        {/* Settlement Rate */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">{t.tem.settlementRate}</p>
            <p className="text-xl font-bold text-gray-800">{settlementRate}%</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 font-medium">+3.1%</span>
              <span className="text-xs text-gray-400">{t.tem.vsLastMonth}</span>
            </div>
          </div>
          {/* progress bar */}
          <div className="flex flex-col items-end gap-1.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0fdf4' }}>
              <CheckCircle className="w-5 h-5" style={{ color: '#16a34a' }} />
            </div>
            <div className="w-20 h-1.5 rounded-full bg-gray-100">
              <div className="h-1.5 rounded-full" style={{ width: `${settlementRate}%`, backgroundColor: '#16a34a' }} />
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">{t.tem.pendingApprovals}</p>
            <p className="text-xl font-bold text-gray-800">{pendingCount}</p>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-red-400" />
              <span className="text-xs text-red-500 font-medium">{t.tem.overdue3Days}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fef2f2' }}>
            <Clock className="w-5 h-5" style={{ color: '#dc2626' }} />
          </div>
        </div>
      </div>

      {/* ── Row 2: Document Status Summary ─────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 mb-5">

        {/* Advance Requests */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.tem.advanceRequests}</h2>
            <span className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5">
              {t.tem.viewAll} <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: t.tem.pending,  value: advanceKPIs.pending,  color: '#d97706', bg: '#fffbeb', icon: Clock },
              { label: t.tem.approved, value: advanceKPIs.approved, color: '#0891b2', bg: '#e0f2fe', icon: CheckCircle },
              { label: t.tem.settled,  value: advanceKPIs.settled,  color: '#16a34a', bg: '#f0fdf4', icon: CheckCircle },
              { label: t.tem.rejected, value: advanceKPIs.rejected, color: '#dc2626', bg: '#fef2f2', icon: AlertTriangle },
            ].map(k => (
              <div key={k.label}
                className="rounded-lg p-3 text-center cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: k.bg }}>
                <k.icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: k.color }} />
                <p className="text-xl font-bold" style={{ color: k.color }}>{k.value}</p>
                <p className="text-xs mt-0.5 font-medium" style={{ color: k.color, opacity: 0.8 }}>{k.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Declarations */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.tem.expenseDeclarations}</h2>
            <span className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5">
              {t.tem.viewAll} <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: t.tem.draft,     value: expenseKPIs.draft,     color: '#64748b', bg: '#f8fafc', icon: FileText },
              { label: t.tem.submitted, value: expenseKPIs.submitted, color: '#0891b2', bg: '#e0f2fe', icon: FileText },
              { label: t.tem.approved,  value: expenseKPIs.approved,  color: '#d97706', bg: '#fffbeb', icon: CheckCircle },
              { label: t.tem.paid,      value: expenseKPIs.paid,      color: '#16a34a', bg: '#f0fdf4', icon: CheckCircle },
            ].map(k => (
              <div key={k.label}
                className="rounded-lg p-3 text-center cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: k.bg }}>
                <k.icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: k.color }} />
                <p className="text-xl font-bold" style={{ color: k.color }}>{k.value}</p>
                <p className="text-xs mt-0.5 font-medium" style={{ color: k.color, opacity: 0.8 }}>{k.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Monthly Trend + Expense Category ─────────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-5">

        {/* Monthly Travel Expense Trend (2 cols) */}
        <div className="erp-card p-4 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">{t.tem.travelExpenseTrend}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{t.tem.last7Months}</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#0891b2' }} />
                <span className="text-gray-500">{t.tem.advances}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#16a34a' }} />
                <span className="text-gray-500">{t.tem.settledLabel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#d97706' }} />
                <span className="text-gray-500">{t.tem.actualExpenses}</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyTrendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAdvances" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSettled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={formatM} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="advances" stroke="#0891b2" strokeWidth={2} fill="url(#colorAdvances)" dot={false} name={t.tem.advances} />
              <Area type="monotone" dataKey="settled"  stroke="#16a34a" strokeWidth={2} fill="url(#colorSettled)"  dot={false} name={t.tem.settledLabel} />
              <Line  type="monotone" dataKey="expenses" stroke="#d97706" strokeWidth={2} dot={false} name={t.tem.actualExpenses} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense by Category PieChart (1 col) */}
        <div className="erp-card p-4">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.tem.expensesByCategory}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{t.tem.ytdAllDepts}</p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={expenseCategoryData}
                cx="50%" cy="50%"
                innerRadius={40} outerRadius={65}
                paddingAngle={3}
                dataKey="value"
              >
                {expenseCategoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => [`${v}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {expenseCategoryData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-gray-500 flex-1 truncate">{d.name}</span>
                <span className="text-xs font-semibold" style={{ color: d.color }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 4: Dept Budget vs Actual + Pending Approvals + Top Destinations ── */}
      <div className="grid grid-cols-3 gap-4 mb-5">

        {/* Department Budget vs Actual */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">{t.tem.budgetVsActual}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{t.tem.byDepartment}</p>
            </div>
            <BarChart2 className="w-4 h-4 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={155}>
            <BarChart data={departmentExpenseData} barGap={3} layout="vertical"
              margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={formatM} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={60} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="budget" name={t.tem.budget} fill="#e0f2fe" radius={[0, 2, 2, 0]} maxBarSize={8} />
              <Bar dataKey="actual" name={t.tem.actual} fill="#0891b2" radius={[0, 2, 2, 0]} maxBarSize={8} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#e0f2fe', border: '1px solid #0891b2' }} />
              <span className="text-gray-400">{t.tem.budget}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0891b2' }} />
              <span className="text-gray-400">{t.tem.actual}</span>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.tem.pendingApprovals}</h2>
            <span className="erp-badge-warning">{pendingApprovals.length} {t.tem.items}</span>
          </div>
          <div className="space-y-2">
            {pendingApprovals.map((item, i) => (
              <div key={i}
                className="flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-colors hover:bg-amber-50"
                style={{ borderColor: '#fde68a', backgroundColor: 'rgba(255,251,235,0.5)' }}>
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-gray-700">{item.id}</span>
                    <span className={`text-xs font-medium ${item.daysWaiting >= 3 ? 'text-red-500' : 'text-amber-500'}`}>
                      {item.daysWaiting}d
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{item.desc}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-xs text-gray-400">→ {item.user}</p>
                    <TypeBadge type={item.type} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.tem.topDestinations}</h2>
            <MapPin className="w-4 h-4 text-gray-400" />
          </div>
          {/* Summary bar */}
          <div className="flex items-center gap-3 p-2.5 rounded-lg mb-3"
            style={{ backgroundColor: '#f0f9ff' }}>
            <div className="text-center flex-1 border-r border-blue-100">
              <p className="text-xs text-gray-400">{t.tem.totalTrips}</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">120</p>
            </div>
            <div className="text-center flex-1 border-r border-blue-100">
              <p className="text-xs text-gray-400">{t.tem.destinations}</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">18</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-xs text-gray-400">{t.tem.avgCost}</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">5.4M</p>
            </div>
          </div>
          <div className="space-y-2">
            {topDestinations.map((dest, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: i === 0 ? '#0891b2' : i === 1 ? '#0e7490' : '#e0f2fe', color: i < 2 ? 'white' : '#0891b2' }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-medium text-gray-700">{dest.city}</span>
                    <span className="text-xs text-gray-400">{dest.trips} {t.tem.trips} · {dest.amount}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full transition-all"
                      style={{ width: `${(dest.trips / 48) * 100}%`, backgroundColor: '#0891b2' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 5: Recent TEM Documents ─────────────────────────────────── */}
      <div className="erp-card">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-700">{t.tem.recentDocuments}</h2>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#e0f2fe', color: '#0891b2' }}>
              {recentDocuments.length} docs
            </span>
          </div>
          <span className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5">
            {t.tem.viewAll} <ArrowRight className="w-3 h-3" />
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full erp-table">
            <thead>
              <tr>
                <th className="text-left">Reference</th>
                <th className="text-left">Type</th>
                <th className="text-left">{t.tem.employee}</th>
                <th className="text-left">{t.tem.destination}</th>
                <th className="text-right">Amount (VND)</th>
                <th className="text-left">Date</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentDocuments.map((doc, i) => (
                <tr key={i} className="cursor-pointer">
                  <td className="font-medium text-blue-600 hover:underline">{doc.ref}</td>
                  <td className="text-gray-500">{doc.type}</td>
                  <td className="text-gray-700">{doc.employee}</td>
                  <td>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      {doc.destination}
                    </div>
                  </td>
                  <td className="text-right font-medium tabular-nums">{doc.amount}</td>
                  <td className="text-gray-500">{doc.date}</td>
                  <td className="text-center"><StatusBadge status={doc.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-gray-50 bg-gray-50/50">
          <span className="text-xs text-gray-400">{t.tem.recentDocuments}: {recentDocuments.length}</span>
        </div>
      </div>

    </div>
  );
}