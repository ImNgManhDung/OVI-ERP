import {
  CheckCircle, FileText, AlertTriangle, TrendingUp,
  Clock, ChevronRight, BarChart2,
  ArrowDownToLine, ArrowUpFromLine, Boxes,
  Warehouse, AlertCircle, RefreshCw
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Line
} from 'recharts';
import { useLanguage } from '../i18n/LanguageContext';

// ── Mock Data ─────────────────────────────────────────────────────────────────

const monthlyMovementData = [
  { month: 'Aug', receipts: 320, issues: 280, adjustments: 14 },
  { month: 'Sep', receipts: 410, issues: 365, adjustments: 18 },
  { month: 'Oct', receipts: 375, issues: 340, adjustments: 11 },
  { month: 'Nov', receipts: 520, issues: 472, adjustments: 22 },
  { month: 'Dec', receipts: 680, issues: 590, adjustments: 31 },
  { month: 'Jan', receipts: 490, issues: 445, adjustments: 16 },
  { month: 'Feb', receipts: 610, issues: 548, adjustments: 24 },
];

const stockCategoryData = [
  { name: 'Raw Materials',    value: 42, color: '#059669' },
  { name: 'Finished Goods',   value: 28, color: '#0891b2' },
  { name: 'Spare Parts',      value: 18, color: '#d97706' },
  { name: 'Consumables',      value: 12, color: '#7c3aed' },
];

const warehouseStockData = [
  { warehouse: 'WH-01 Hà Nội',  capacity: 95,  used: 78,  value: 8400 },
  { warehouse: 'WH-02 HCM',     capacity: 120, used: 103, value: 5200 },
  { warehouse: 'WH-03 Đà Nẵng', capacity: 60,  used: 41,  value: 2800 },
  { warehouse: 'WH-04 Cần Thơ', capacity: 45,  used: 29,  value: 1900 },
];

const topMaterialsData = [
  { code: 'MAT-0024', name: 'Steel Pipe 50mm',   category: 'Raw',       qty: 4800, unit: 'pcs', value: '2.4B', status: 'normal' },
  { code: 'MAT-0156', name: 'Hydraulic Oil 46',  category: 'Consumable',qty: 320,  unit: 'L',   value: '480M', status: 'low' },
  { code: 'MAT-0089', name: 'Bearing SKF 6205',  category: 'Spare',     qty: 1240, unit: 'pcs', value: '1.1B', status: 'normal' },
  { code: 'MAT-0031', name: 'PVC Pipe 32mm',     category: 'Raw',       qty: 6200, unit: 'm',   value: '930M', status: 'normal' },
  { code: 'MAT-0203', name: 'Filter Element',    category: 'Spare',     qty: 88,   unit: 'pcs', value: '220M', status: 'critical' },
];

const pendingApprovals = [
  { id: 'GR-2025-0189', desc: 'Goods Receipt – Steel Pipe 50mm × 500 pcs', amount: '250,000,000', dept: 'Warehouse WH-01', daysWaiting: 1, type: 'receipt' },
  { id: 'GI-2025-0097', desc: 'Good Issue – Hydraulic Oil to Production',  amount: '48,000,000',  dept: 'Production Dept', daysWaiting: 2, type: 'issue' },
  { id: 'GRA-2025-0011',desc: 'Goods Receipt Adjust – PO-2025-0432',       amount: '15,000,000',  dept: 'Procurement',    daysWaiting: 3, type: 'adjust' },
  { id: 'GR-2025-0191', desc: 'Goods Receipt – Bearing SKF × 200 pcs',     amount: '180,000,000', dept: 'Warehouse WH-02', daysWaiting: 1, type: 'receipt' },
];

const recentDocuments = [
  { ref: 'GR-2025-0192',  type: 'Goods Receipt',        material: 'Steel Pipe 50mm',    warehouse: 'WH-01 Hà Nội',  qty: '500 pcs', date: '25/02/2026', status: 'approved' },
  { ref: 'GI-2025-0098',  type: 'Good Issue',           material: 'Hydraulic Oil 46',   warehouse: 'WH-02 HCM',     qty: '80 L',    date: '25/02/2026', status: 'pending' },
  { ref: 'MRQ-2025-0054', type: 'Goods Receipt Req.',   material: 'Filter Element',     warehouse: 'WH-01 Hà Nội',  qty: '50 pcs',  date: '24/02/2026', status: 'approved' },
  { ref: 'GRA-2025-0012', type: 'Goods Receipt Adjust', material: 'PVC Pipe 32mm',      warehouse: 'WH-03 Đà Nẵng', qty: '+30 m',   date: '24/02/2026', status: 'draft' },
  { ref: 'GI-2025-0096',  type: 'Good Issue',           material: 'Bearing SKF 6205',   warehouse: 'WH-02 HCM',     qty: '40 pcs',  date: '23/02/2026', status: 'issued' },
  { ref: 'GIA-2025-0008', type: 'Goods Issues Adjust',  material: 'Steel Pipe 50mm',    warehouse: 'WH-01 Hà Nội',  qty: '-20 pcs', date: '23/02/2026', status: 'approved' },
];

const lowStockItems = [
  { code: 'MAT-0156', name: 'Hydraulic Oil 46', qty: 320, minQty: 500, unit: 'L',   pct: 64 },
  { code: 'MAT-0203', name: 'Filter Element',   qty: 88,  minQty: 200, unit: 'pcs', pct: 44 },
  { code: 'MAT-0078', name: 'O-Ring Kit 48mm',  qty: 145, minQty: 300, unit: 'set', pct: 48 },
  { code: 'MAT-0319', name: 'Grease Cartridge', qty: 62,  minQty: 100, unit: 'pcs', pct: 62 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmtM = (v: number) => `${v}M`;

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { cls: string; label: string }> = {
    approved: { cls: 'erp-badge-success', label: 'Approved' },
    pending:  { cls: 'erp-badge-warning', label: 'Pending' },
    issued:   { cls: 'erp-badge-info',    label: 'Issued' },
    draft:    { cls: 'erp-badge-neutral', label: 'Draft' },
    rejected: { cls: 'erp-badge-danger',  label: 'Rejected' },
    posted:   { cls: 'erp-badge-success', label: 'Posted' },
  };
  const { cls, label } = map[status] ?? { cls: 'erp-badge-neutral', label: status };
  return <span className={cls}>{label}</span>;
};

const DocTypeBadge = ({ type }: { type: string }) => {
  const map: Record<string, { bg: string; color: string }> = {
    receipt: { bg: '#f0fdf4', color: '#059669' },
    issue:   { bg: '#eff6ff', color: '#1d4ed8' },
    adjust:  { bg: '#fffbeb', color: '#d97706' },
  };
  const { bg, color } = map[type] ?? { bg: '#f1f5f9', color: '#64748b' };
  return (
    <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: bg, color }}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
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

export default function WMMDashboard() {
  const { t } = useLanguage();
  const totalStockValue  = 18_450_000_000;
  const monthlyReceipts  = 610;
  const lowStockCount    = 23;
  const pendingCount     = pendingApprovals.length;

  const receiptKPIs = { draft: 12, submitted: 28, approved: 97, posted: 473 };
  const issueKPIs   = { draft: 8, pending: 19, approved: 84, issued: 389 };

  return (
    <div className="erp-page">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="erp-page-header mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-0.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#dcfce7' }}>
              <Warehouse className="w-4 h-4" style={{ color: '#059669' }} />
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              {t.wmm.wmmDashboard}
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: '#dcfce7', color: '#059669' }}>
              {t.wmm.wmmSubtitle}
            </span>
          </div>
          <p className="text-xs" style={{ color: '#64748b' }}>
            {t.wmm.asOf} Wednesday, 25 February 2026 — {t.wmm.fiscalPeriod}: Q1 2026
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 hover:bg-white rounded border border-gray-200 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          {t.wmm.refresh}
        </button>
      </div>

      {/* ── Row 1: Financial Summary KPIs ───────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4 mb-5">

        {/* Total Stock Value */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">{t.wmm.totalStockValue}</p>
            <p className="text-xl font-bold text-gray-800">
              {(totalStockValue / 1_000_000_000).toFixed(2)}B
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 font-medium">+4.8%</span>
              <span className="text-xs text-gray-400">{t.wmm.vsLastMonth}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#dcfce7' }}>
            <Boxes className="w-5 h-5" style={{ color: '#059669' }} />
          </div>
        </div>

        {/* Monthly Goods Receipts */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">{t.wmm.goodsReceiptsMonth}</p>
            <p className="text-xl font-bold text-gray-800">{monthlyReceipts}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-cyan-500" />
              <span className="text-xs text-cyan-600 font-medium">+24.5%</span>
              <span className="text-xs text-gray-400">{t.wmm.vsLastMonth}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0f9ff' }}>
            <ArrowDownToLine className="w-5 h-5" style={{ color: '#0891b2' }} />
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">{t.wmm.lowStockItems}</p>
            <p className="text-xl font-bold text-gray-800">{lowStockCount}</p>
            <div className="flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 text-amber-500" />
              <span className="text-xs text-amber-600 font-medium">4 {t.wmm.critical}</span>
              <span className="text-xs text-gray-400">{t.wmm.belowMinLevel}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fffbeb' }}>
            <AlertTriangle className="w-5 h-5" style={{ color: '#d97706' }} />
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">{t.wmm.pendingApprovals}</p>
            <p className="text-xl font-bold text-gray-800">{pendingCount}</p>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-red-400" />
              <span className="text-xs text-red-500 font-medium">{t.wmm.overdue3Days}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fef2f2' }}>
            <Clock className="w-5 h-5" style={{ color: '#dc2626' }} />
          </div>
        </div>
      </div>

      {/* ── Row 2: Document Status Summary ──────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 mb-5">

        {/* Goods Receipts Status */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.wmm.goodsReceiptsStatus}</h2>
            <span className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5">
              {t.wmm.viewAll} <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: t.wmm.draft,     value: receiptKPIs.draft,     color: '#64748b', bg: '#f8fafc', icon: FileText },
              { label: t.wmm.submitted, value: receiptKPIs.submitted, color: '#0891b2', bg: '#f0f9ff', icon: ArrowDownToLine },
              { label: t.wmm.approved,  value: receiptKPIs.approved,  color: '#d97706', bg: '#fffbeb', icon: CheckCircle },
              { label: t.wmm.posted,    value: receiptKPIs.posted,    color: '#059669', bg: '#f0fdf4', icon: CheckCircle },
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

        {/* Goods Issues Status */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.wmm.goodsIssuesStatus}</h2>
            <span className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5">
              {t.wmm.viewAll} <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: t.wmm.draft,    value: issueKPIs.draft,    color: '#64748b', bg: '#f8fafc', icon: FileText },
              { label: t.wmm.pending,  value: issueKPIs.pending,  color: '#d97706', bg: '#fffbeb', icon: Clock },
              { label: t.wmm.approved, value: issueKPIs.approved, color: '#0891b2', bg: '#f0f9ff', icon: CheckCircle },
              { label: t.wmm.issued,   value: issueKPIs.issued,   color: '#059669', bg: '#f0fdf4', icon: ArrowUpFromLine },
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

      {/* ── Row 3: Stock Movement Trend + Category Pie ───────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-5">

        {/* Stock Movement Trend (2 cols) */}
        <div className="erp-card p-4 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">{t.wmm.stockMovementTrend}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{t.wmm.last7Months}</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#059669' }} />
                <span className="text-gray-500">{t.wmm.receipts}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#0891b2' }} />
                <span className="text-gray-500">{t.wmm.issues}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#d97706' }} />
                <span className="text-gray-500">{t.wmm.adjustments}</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyMovementData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReceipts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#059669" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0891b2" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="receipts"    stroke="#059669" strokeWidth={2} fill="url(#colorReceipts)" dot={false} name={t.wmm.receipts} />
              <Area type="monotone" dataKey="issues"      stroke="#0891b2" strokeWidth={2} fill="url(#colorIssues)"   dot={false} name={t.wmm.issues} />
              <Line  type="monotone" dataKey="adjustments" stroke="#d97706" strokeWidth={2} dot={false} name={t.wmm.adjustments} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stock by Category */}
        <div className="erp-card p-4">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.wmm.stockByCategory}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{t.wmm.valueDistribution}</p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={stockCategoryData}
                cx="50%" cy="50%"
                innerRadius={40} outerRadius={65}
                paddingAngle={3}
                dataKey="value"
              >
                {stockCategoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => [`${v}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {stockCategoryData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-gray-500 flex-1 truncate">{d.name}</span>
                <span className="text-xs font-semibold" style={{ color: d.color }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 4: Warehouse Capacity + Pending Approvals + Low Stock ───── */}
      <div className="grid grid-cols-3 gap-4 mb-5">

        {/* Warehouse Capacity Chart */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">{t.wmm.warehouseUtilization}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{t.wmm.usedVsCapacity}</p>
            </div>
            <BarChart2 className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-3">
            {warehouseStockData.map((wh, i) => {
              const pct = Math.round((wh.used / wh.capacity) * 100);
              const barColor = pct > 90 ? '#dc2626' : pct > 75 ? '#d97706' : '#059669';
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 truncate flex-1">{wh.warehouse}</span>
                    <span className="text-xs font-semibold ml-2" style={{ color: barColor }}>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: barColor }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{wh.used}/{wh.capacity} tons · {wh.value}M VND</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.wmm.pendingApprovals}</h2>
            <span className="erp-badge-warning">{pendingApprovals.length} {t.wmm.items}</span>
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
                    <p className="text-xs text-gray-400">→ {item.dept}</p>
                    <DocTypeBadge type={item.type} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.wmm.lowStockAlerts}</h2>
            <span className="erp-badge-danger">{lowStockCount} {t.wmm.items}</span>
          </div>
          {/* Summary */}
          <div className="flex items-center gap-2 p-2 rounded-lg mb-3"
            style={{ backgroundColor: '#fef2f2' }}>
            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-xs text-red-600">4 {t.wmm.materialsAtCritical}</p>
          </div>
          <div className="space-y-2.5">
            {lowStockItems.map((item, i) => {
              const barColor = item.pct < 50 ? '#dc2626' : item.pct < 70 ? '#d97706' : '#059669';
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-gray-700 truncate max-w-[110px]">{item.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{item.qty}/{item.minQty} {item.unit}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full transition-all"
                      style={{ width: `${item.pct}%`, backgroundColor: barColor }} />
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: barColor }}>{item.pct}{t.wmm.ofMinStock}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Row 5: Top Materials + Recent Documents ───────────────────── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Top Materials */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.wmm.topMaterials}</h2>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left pb-2 text-gray-400 font-medium">Code</th>
                <th className="text-left pb-2 text-gray-400 font-medium">{t.wmm.material}</th>
                <th className="text-left pb-2 text-gray-400 font-medium">Cat.</th>
                <th className="text-right pb-2 text-gray-400 font-medium">{t.wmm.qty}</th>
                <th className="text-right pb-2 text-gray-400 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {topMaterialsData.map((m, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-1.5 font-mono text-gray-500">{m.code}</td>
                  <td className="py-1.5 text-gray-700">{m.name}</td>
                  <td className="py-1.5 text-gray-500">{m.category}</td>
                  <td className="py-1.5 text-right tabular-nums">{m.qty.toLocaleString()} {m.unit}</td>
                  <td className="py-1.5 text-right font-semibold text-gray-700">{m.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Documents */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">{t.wmm.recentDocuments}</h2>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left pb-2 text-gray-400 font-medium">Ref</th>
                <th className="text-left pb-2 text-gray-400 font-medium">Type</th>
                <th className="text-left pb-2 text-gray-400 font-medium">{t.wmm.material}</th>
                <th className="text-left pb-2 text-gray-400 font-medium">{t.wmm.warehouse}</th>
                <th className="text-right pb-2 text-gray-400 font-medium">{t.wmm.qty}</th>
                <th className="text-center pb-2 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentDocuments.map((doc, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-1.5 font-medium text-blue-600">{doc.ref}</td>
                  <td className="py-1.5 text-gray-500">{doc.type}</td>
                  <td className="py-1.5 text-gray-700">{doc.material}</td>
                  <td className="py-1.5 text-gray-500">{doc.warehouse}</td>
                  <td className="py-1.5 text-right tabular-nums text-gray-600">{doc.qty}</td>
                  <td className="py-1.5 text-center"><StatusBadge status={doc.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
