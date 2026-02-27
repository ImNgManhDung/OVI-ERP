import { CheckCircle, FileText, AlertTriangle, Calendar, TrendingUp, TrendingDown, DollarSign, Clock, ArrowRight, RefreshCw, ChevronRight, Activity, BarChart2, CreditCard, Building2 } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';

const monthlyData = [
  { month: 'Aug', sales: 4200, purchase: 3100, payment: 2800 },
  { month: 'Sep', sales: 5800, purchase: 4200, payment: 3900 },
  { month: 'Oct', sales: 4900, purchase: 3800, payment: 4200 },
  { month: 'Nov', sales: 6700, purchase: 5100, payment: 5500 },
  { month: 'Dec', sales: 8200, purchase: 6400, payment: 7100 },
  { month: 'Jan', sales: 7100, purchase: 5200, payment: 6300 },
  { month: 'Feb', sales: 9400, purchase: 7800, payment: 8200 },
];

const cashFlowData = [
  { day: 'Mon', inflow: 1200, outflow: 800 },
  { day: 'Tue', inflow: 1900, outflow: 1100 },
  { day: 'Wed', inflow: 800, outflow: 1400 },
  { day: 'Thu', inflow: 2100, outflow: 900 },
  { day: 'Fri', inflow: 1700, outflow: 1200 },
  { day: 'Sat', inflow: 600, outflow: 400 },
  { day: 'Sun', inflow: 300, outflow: 200 },
];

const statusDistribution = [
  { name: 'Paid', value: 145, color: '#16a34a' },
  { name: 'Unpaid', value: 23, color: '#d97706' },
  { name: 'Overdue', value: 8, color: '#dc2626' },
  { name: 'Pending', value: 15, color: '#0284c7' },
];

const recentDocuments = [
  { ref: 'SI-2025-0089', type: 'Sales Invoice', partner: 'Cty TNHH ABC', amount: '15,750,000', date: '25/02/2026', status: 'paid' },
  { ref: 'PI-2025-0234', type: 'Purchase Invoice', partner: 'Nhà cung cấp XYZ', amount: '8,200,000', date: '24/02/2026', status: 'unpaid' },
  { ref: 'CR-2025-0156', type: 'Cash Receipt', partner: 'Cty CP DEF', amount: '3,500,000', date: '24/02/2026', status: 'paid' },
  { ref: 'PI-2025-0235', type: 'Purchase Invoice', partner: 'Nhà cung cấp MNO', amount: '12,000,000', date: '23/02/2026', status: 'overdue' },
  { ref: 'CP-2025-0089', type: 'Cash Payment', partner: 'Văn phòng phẩm GHI', amount: '2,100,000', date: '23/02/2026', status: 'paid' },
  { ref: 'PR-2025-0041', type: 'Payment Request', partner: 'Nội bộ', amount: '5,000,000', date: '22/02/2026', status: 'pending' },
];

const pendingApprovals = [
  { id: 'PR-2025-0041', desc: 'Payment Request - Marketing Q1', amount: '5,000,000', user: 'Phòng KT', daysWaiting: 2 },
  { id: 'PI-2025-0235', desc: 'Purchase Invoice overdue 5 days', amount: '12,000,000', user: 'Kế toán trưởng', daysWaiting: 5 },
  { id: 'GL-2025-0012', desc: 'GL Journal - Month-end closing', amount: '0', user: 'Ban Giám đốc', daysWaiting: 1 },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    paid: 'erp-badge-success',
    unpaid: 'erp-badge-warning',
    overdue: 'erp-badge-danger',
    pending: 'erp-badge-info',
    draft: 'erp-badge-neutral',
  };
  const labels: Record<string, string> = {
    paid: 'Paid', unpaid: 'Unpaid', overdue: 'Overdue', pending: 'Pending', draft: 'Draft'
  };
  return <span className={styles[status] || 'erp-badge-neutral'}>{labels[status] || status}</span>;
};

const formatCurrency = (v: number) => `${(v / 1000).toFixed(0)}K`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-gray-500">{p.name}:</span>
            <span className="font-medium text-gray-700">{(p.value).toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const salesKPIs = { paid: 145, unpaid: 23, overdue: 8, notDueYet: 15 };
  const purchaseKPIs = { paid: 98, unpaid: 17, overdue: 5, notDueYet: 12 };
  const totalAR = 2_850_000_000;
  const totalAP = 1_640_000_000;
  const cashBalance = 4_210_000_000;
  const pendingPayments = 680_000_000;

  return (
    <div className="erp-page">
      {/* Page Header */}
      <div className="erp-page-header mb-6">
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#1e293b', marginBottom: '2px' }}>Dashboard</h1>
          <p className="text-xs" style={{ color: '#64748b' }}>
            Finance & Costing Management — As of Wednesday, 25 February 2026
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 hover:bg-white rounded border border-gray-200 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* ── Row 1: Financial Summary KPIs ── */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {/* Total AR */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">Total Accounts Receivable</p>
            <p className="text-xl font-bold text-gray-800">
              {(totalAR / 1_000_000).toFixed(0)}M
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 font-medium">+12.4%</span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#eff6ff' }}>
            <CreditCard className="w-5 h-5" style={{ color: '#1d4ed8' }} />
          </div>
        </div>

        {/* Total AP */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">Total Accounts Payable</p>
            <p className="text-xl font-bold text-gray-800">
              {(totalAP / 1_000_000).toFixed(0)}M
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-red-400" />
              <span className="text-xs text-red-500 font-medium">+5.2%</span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fdf4ff' }}>
            <FileText className="w-5 h-5" style={{ color: '#7c3aed' }} />
          </div>
        </div>

        {/* Cash Balance */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">Cash & Bank Balance</p>
            <p className="text-xl font-bold text-gray-800">
              {(cashBalance / 1_000_000).toFixed(0)}M
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 font-medium">+8.7%</span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0fdf4' }}>
            <DollarSign className="w-5 h-5" style={{ color: '#16a34a' }} />
          </div>
        </div>

        {/* Pending Payments */}
        <div className="erp-card p-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">Pending Payments</p>
            <p className="text-xl font-bold text-gray-800">
              {(pendingPayments / 1_000_000).toFixed(0)}M
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-amber-500" />
              <span className="text-xs text-amber-600 font-medium">13 documents</span>
              <span className="text-xs text-gray-400">awaiting</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fffbeb' }}>
            <Clock className="w-5 h-5" style={{ color: '#d97706' }} />
          </div>
        </div>
      </div>

      {/* ── Row 2: Invoice Status Summary ── */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {/* Sales Invoice KPIs */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">Sales Invoices</h2>
            <span className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5">
              View all <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Paid', value: salesKPIs.paid, color: '#16a34a', bg: '#f0fdf4', icon: CheckCircle },
              { label: 'Unpaid', value: salesKPIs.unpaid, color: '#d97706', bg: '#fffbeb', icon: FileText },
              { label: 'Overdue', value: salesKPIs.overdue, color: '#dc2626', bg: '#fef2f2', icon: AlertTriangle },
              { label: 'Upcoming', value: salesKPIs.notDueYet, color: '#0284c7', bg: '#f0f9ff', icon: Calendar },
            ].map(k => (
              <div key={k.label} className="rounded-lg p-3 text-center cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: k.bg }}>
                <k.icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: k.color }} />
                <p className="text-xl font-bold" style={{ color: k.color }}>{k.value}</p>
                <p className="text-xs mt-0.5 font-medium" style={{ color: k.color, opacity: 0.8 }}>{k.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Invoice KPIs */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">Purchase Invoices</h2>
            <span className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5">
              View all <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Paid', value: purchaseKPIs.paid, color: '#16a34a', bg: '#f0fdf4', icon: CheckCircle },
              { label: 'Unpaid', value: purchaseKPIs.unpaid, color: '#d97706', bg: '#fffbeb', icon: FileText },
              { label: 'Overdue', value: purchaseKPIs.overdue, color: '#dc2626', bg: '#fef2f2', icon: AlertTriangle },
              { label: 'Upcoming', value: purchaseKPIs.notDueYet, color: '#0284c7', bg: '#f0f9ff', icon: Calendar },
            ].map(k => (
              <div key={k.label} className="rounded-lg p-3 text-center cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: k.bg }}>
                <k.icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: k.color }} />
                <p className="text-xl font-bold" style={{ color: k.color }}>{k.value}</p>
                <p className="text-xs mt-0.5 font-medium" style={{ color: k.color, opacity: 0.8 }}>{k.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Charts ── */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {/* Revenue Trend (spans 2 cols) */}
        <div className="erp-card p-4 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">Revenue & Expense Trend</h2>
              <p className="text-xs text-gray-400 mt-0.5">Last 7 months (unit: million VND)</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#1d4ed8' }} />
                <span className="text-gray-500">Sales</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#7c3aed' }} />
                <span className="text-gray-500">Purchase</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#16a34a' }} />
                <span className="text-gray-500">Payment</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPurchase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="sales" stroke="#1d4ed8" strokeWidth={2} fill="url(#colorSales)" dot={false} name="Sales" />
              <Area type="monotone" dataKey="purchase" stroke="#7c3aed" strokeWidth={2} fill="url(#colorPurchase)" dot={false} name="Purchase" />
              <Line type="monotone" dataKey="payment" stroke="#16a34a" strokeWidth={2} dot={false} name="Payment" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="erp-card p-4">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-700">Invoice Status</h2>
            <p className="text-xs text-gray-400 mt-0.5">All invoice types combined</p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => [v, 'Documents']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {statusDistribution.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-gray-500">{d.name}</span>
                <span className="text-xs font-semibold ml-auto" style={{ color: d.color }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 4: Cash Flow Chart + Pending Approvals ── */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {/* Cash Flow - weekly */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">Cash Flow</h2>
              <p className="text-xs text-gray-400 mt-0.5">This week (million VND)</p>
            </div>
            <Activity className="w-4 h-4 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={cashFlowData} barGap={2} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="inflow" name="Inflow" fill="#16a34a" radius={[2, 2, 0, 0]} maxBarSize={12} />
              <Bar dataKey="outflow" name="Outflow" fill="#dc2626" radius={[2, 2, 0, 0]} maxBarSize={12} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs"><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-gray-400">Inflow</span></div>
            <div className="flex items-center gap-1.5 text-xs"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-gray-400">Outflow</span></div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">Pending Approvals</h2>
            <span className="erp-badge-warning">{pendingApprovals.length} items</span>
          </div>
          <div className="space-y-2">
            {pendingApprovals.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-amber-100 bg-amber-50/50 cursor-pointer hover:bg-amber-50 transition-colors">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">{item.id}</span>
                    <span className="text-xs text-red-500 font-medium">{item.daysWaiting}d</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{item.desc}</p>
                  <p className="text-xs text-gray-400 mt-0.5">→ {item.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Summary */}
        <div className="erp-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">Asset Overview</h2>
            <Building2 className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-3">
            {[
              { label: 'Total Fixed Assets', value: '247 items', sub: 'Net book value: 45.2B', color: '#1d4ed8' },
              { label: 'Depreciated This Month', value: '850M VND', sub: 'Across 124 assets', color: '#dc2626' },
              { label: 'Under Construction', value: '3 projects', sub: 'Value: 12.4B VND', color: '#d97706' },
              { label: 'Fully Depreciated', value: '18 items', sub: 'Pending disposal review', color: '#64748b' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: a.color }} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">{a.label}</p>
                  <p className="text-sm font-semibold text-gray-700 mt-0.5">{a.value}</p>
                </div>
                <p className="text-xs text-gray-400 text-right">{a.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 5: Recent Documents ── */}
      <div className="erp-card">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Recent Documents</h2>
          <span className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5">
            View all documents <ArrowRight className="w-3 h-3" />
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full erp-table">
            <thead>
              <tr>
                <th className="text-left">Reference</th>
                <th className="text-left">Type</th>
                <th className="text-left">Partner</th>
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
                  <td className="text-gray-700">{doc.partner}</td>
                  <td className="text-right font-medium tabular-nums">{doc.amount}</td>
                  <td className="text-gray-500">{doc.date}</td>
                  <td className="text-center"><StatusBadge status={doc.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-gray-50 bg-gray-50/50">
          <span className="text-xs text-gray-400">Showing {recentDocuments.length} most recent documents</span>
        </div>
      </div>
    </div>
  );
}
