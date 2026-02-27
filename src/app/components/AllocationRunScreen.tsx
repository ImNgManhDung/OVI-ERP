import { useState } from 'react';
import { Play, Eye, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import { useLanguage } from '../i18n/LanguageContext';
import { toast } from 'sonner';

interface PreviewRow {
  id: number;
  sourceCost: string;
  receiver: string;
  percentage: number;
  allocationAmount: number;
  status: 'ready' | 'error' | 'warning';
}

const FieldLabel = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-xs font-medium text-gray-500 mb-1">{required && <span className="text-red-500 mr-0.5">*</span>}{children}</label>
);

const FormBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border border-gray-200 rounded-md p-4 bg-white">
    <h3 className="text-xs font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">{title}</h3>
    {children}
  </div>
);

const PREVIEW_MOCK: PreviewRow[] = [
  { id: 1, sourceCost: 'Chi phí điện nước tháng 2 — CCE-001 Admin',   receiver: 'CCE-002 IT',      percentage: 35,  allocationAmount: 15_750_000, status: 'ready' },
  { id: 2, sourceCost: 'Chi phí điện nước tháng 2 — CCE-001 Admin',   receiver: 'CCE-003 Finance', percentage: 25,  allocationAmount: 11_250_000, status: 'ready' },
  { id: 3, sourceCost: 'Chi phí điện nước tháng 2 — CCE-001 Admin',   receiver: 'CCE-005 Prod',    percentage: 40,  allocationAmount: 18_000_000, status: 'ready' },
  { id: 4, sourceCost: 'Chi phí thuê văn phòng Q1 — CCE-001 Admin',   receiver: 'CCE-002 IT',      percentage: 30,  allocationAmount: 36_000_000, status: 'ready' },
  { id: 5, sourceCost: 'Chi phí thuê văn phòng Q1 — CCE-001 Admin',   receiver: 'CCE-006 Sales',   percentage: 40,  allocationAmount: 48_000_000, status: 'warning' },
  { id: 6, sourceCost: 'Chi phí thuê văn phòng Q1 — CCE-001 Admin',   receiver: 'CCE-005 Prod',    percentage: 30,  allocationAmount: 36_000_000, status: 'ready' },
  { id: 7, sourceCost: 'Chi phí nhân công gián tiếp — CCE-005 Prod',  receiver: 'CCE-005 Prod',    percentage: 100, allocationAmount: 210_000_000, status: 'error' },
];

const fmtCurrency = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

export default function AllocationRunScreen() {
  const { t } = useLanguage();
  const [mainTab, setMainTab]             = useState('main-info');
  const [simulationMode, setSimulationMode] = useState(true);
  const [autoPost, setAutoPost]           = useState(false);
  const [allowAdjustment, setAllowAdjustment] = useState(true);
  const [autoReverse, setAutoReverse]     = useState(false);
  const [scheduleRun, setScheduleRun]     = useState(false);
  const [showPreview, setShowPreview]     = useState(false);
  const [selectedRows, setSelectedRows]   = useState<number[]>([]);
  const [isRunning, setIsRunning]         = useState(false);

  const toggleRow = (id: number) => setSelectedRows(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAll = () => setSelectedRows(selectedRows.length === PREVIEW_MOCK.length ? [] : PREVIEW_MOCK.map(r => r.id));

  const totalSource    = PREVIEW_MOCK.reduce((a, r) => a + r.allocationAmount, 0);
  const totalAllocated = PREVIEW_MOCK.filter(r => r.status !== 'error').reduce((a, r) => a + r.allocationAmount, 0);
  const remaining      = totalSource - totalAllocated;

  const handlePreview = () => {
    setShowPreview(true);
    toast.info('Đang mô phỏng phân bổ...');
  };

  const handleRun = () => {
    setIsRunning(true);
    toast.promise(
      new Promise(res => setTimeout(res, 2000)),
      {
        loading: simulationMode ? 'Đang chạy mô phỏng phân bổ...' : 'Đang chạy phân bổ chi phí...',
        success: simulationMode ? 'Mô phỏng hoàn thành. Xem kết quả ở Lịch sử phân bổ.' : 'Phân bổ chi phí thành công!',
        error: 'Có lỗi xảy ra khi phân bổ.',
      }
    );
    setTimeout(() => setIsRunning(false), 2200);
  };

  const statusBadge = (s: PreviewRow['status']) => {
    const map = {
      ready:   { cls: 'erp-badge-success', label: 'Sẵn sàng' },
      warning: { cls: 'erp-badge-warning', label: 'Cảnh báo' },
      error:   { cls: 'erp-badge-danger',  label: 'Lỗi' },
    };
    const { cls, label } = map[s];
    return <span className={cls}>{label}</span>;
  };

  return (
    <div className="min-h-screen overflow-x-auto" style={{ backgroundColor: '#f1f5f9', padding: '24px' }}>
      <div className="bg-white rounded-lg shadow-sm" style={{ minWidth: '1400px' }}>

        {/* ── Document Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#eff6ff' }}>
              <Play className="w-4 h-4" style={{ color: '#0064d9' }} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-800">{t.nav.runAllocation}</h2>
              <p className="text-xs text-gray-400">Kế toán tổng hợp — Phân bổ chi phí</p>
            </div>
          </div>
        </div>

        {/* ── Status banner (Simulation Mode) */}
        {simulationMode && (
          <div className="px-6 py-2 flex items-center gap-2" style={{ backgroundColor: '#fffbeb', borderBottom: '1px solid #fde68a' }}>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="text-xs text-amber-700">
              <span className="font-semibold">Chế độ mô phỏng đang bật.</span> Dữ liệu sẽ không được ghi nhận vào sổ kế toán. Tắt Simulation Mode để chạy thực tế.
            </span>
          </div>
        )}

        {/* ── Main Tabs ──────────────────────────────────────────────── */}
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
            {[
              { value: 'main-info',      label: 'Main Info' },
              { value: 'financial-info', label: 'Financial Info' },
              { value: 'approval-info',  label: 'Approval Info' },
            ].map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 text-xs px-4 py-2.5"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── MAIN INFO TAB ──────────────────────────────────────────── */}
          <TabsContent value="main-info" className="p-5">
            <div className="grid grid-cols-3 gap-4">

              {/* Block 1: Batch Info */}
              <FormBlock title="Batch Information">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Allocation Batch ID</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="ALB-2026-0012" readOnly />
                  </div>
                  <div>
                    <FieldLabel required>Allocation Period</FieldLabel>
                    <Select defaultValue="2026-02">
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2026-02">Feb 2026</SelectItem>
                        <SelectItem value="2026-01">Jan 2026</SelectItem>
                        <SelectItem value="2025-12">Dec 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel required>Company</FieldLabel>
                    <Select defaultValue="abc">
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abc">CÔNG TY CP ABC</SelectItem>
                        <SelectItem value="xyz">CÔNG TY TNHH XYZ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Posting Date</FieldLabel>
                    <Input type="date" className="h-8 text-xs" defaultValue="2026-02-28" />
                  </div>
                  <div>
                    <FieldLabel required>Run Type</FieldLabel>
                    <Select defaultValue="monthly">
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Status</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="Draft" readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <FieldLabel>Created By</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="admin" readOnly />
                  </div>
                  <div>
                    <FieldLabel>Created Date</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="2026-02-25" readOnly />
                  </div>
                  <div>
                    <FieldLabel>Description</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Mô tả đợt phân bổ..." />
                  </div>
                </div>
              </FormBlock>

              {/* Block 2: Allocation Scope */}
              <FormBlock title="Allocation Scope">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Allocation Type</FieldLabel>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả loại</SelectItem>
                        <SelectItem value="fixed">Tỷ lệ cố định</SelectItem>
                        <SelectItem value="revenue">Số lượng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Cost Element</FieldLabel>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả loại</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="labor">Labor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Cost Center</FieldLabel>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="cce-001">CCE-001 Admin</SelectItem>
                        <SelectItem value="cce-002">CCE-002 IT</SelectItem>
                        <SelectItem value="cce-005">CCE-005 Prod</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Profit Center</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Tất cả" />
                  </div>
                  <div>
                    <FieldLabel>Project</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Tất cả" />
                  </div>
                  <div>
                    <FieldLabel>Product</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Tất cả" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <FieldLabel>Extension Analysis</FieldLabel>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="gl">GL</SelectItem>
                        <SelectItem value="ap">AP</SelectItem>
                        <SelectItem value="fcm">FCM</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Currency</FieldLabel>
                    <Select defaultValue="vnd">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">VND</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Accounting Period</FieldLabel>
                    <Input className="h-8 text-xs" defaultValue="Feb 2026" readOnly />
                  </div>
                </div>
              </FormBlock>

              {/* Block 3: Control */}
              <FormBlock title="Control Parameters">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Simulation Mode</FieldLabel>
                    <div className="flex items-center h-8 gap-2">
                      <Switch checked={simulationMode} onCheckedChange={setSimulationMode} />
                      <span className="text-xs text-gray-500">{simulationMode ? 'On' : 'Off'}</span>
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Auto Post</FieldLabel>
                    <div className="flex items-center h-8 gap-2">
                      <Switch checked={autoPost} onCheckedChange={setAutoPost} />
                      <span className="text-xs text-gray-500">{autoPost ? 'On' : 'Off'}</span>
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Allow Adjustment</FieldLabel>
                    <div className="flex items-center h-8 gap-2">
                      <Switch checked={allowAdjustment} onCheckedChange={setAllowAdjustment} />
                      <span className="text-xs text-gray-500">{allowAdjustment ? 'On' : 'Off'}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Auto Reverse</FieldLabel>
                    <div className="flex items-center h-8 gap-2">
                      <Switch checked={autoReverse} onCheckedChange={setAutoReverse} />
                      <span className="text-xs text-gray-500">{autoReverse ? 'On' : 'Off'}</span>
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Schedule Run</FieldLabel>
                    <div className="flex items-center h-8 gap-2">
                      <Switch checked={scheduleRun} onCheckedChange={setScheduleRun} />
                      <span className="text-xs text-gray-500">{scheduleRun ? 'On' : 'Off'}</span>
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Run Priority</FieldLabel>
                    <Select defaultValue="normal">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <FieldLabel>Batch Group</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="BG-001" />
                  </div>
                  <div>
                    <FieldLabel>Processing Type</FieldLabel>
                    <Select defaultValue="sequential">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sequential">Sequential</SelectItem>
                        <SelectItem value="parallel">Parallel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Version</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="v1.0" readOnly />
                  </div>
                </div>
              </FormBlock>
            </div>

            {/* Preview — Allocation Lines (in Main Info tab) */}
            <div className="border border-gray-200 rounded-md overflow-hidden mt-5">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-0 flex items-center justify-between">
                <button className="text-xs font-semibold px-3 py-2.5 border-b-2 border-blue-600 text-blue-600 bg-white">
                  Preview — Allocation Lines
                </button>
                <div className="flex items-center gap-2 py-1.5">
                  <Button variant="outline" size="sm" className="h-7 text-xs px-2.5 gap-1" onClick={handlePreview}>
                    <RefreshCw className="w-3 h-3" /> Refresh Preview
                  </Button>
                </div>
              </div>

              {!showPreview ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-500">Nhấn Preview để tải dữ liệu mô phỏng phân bổ</p>
                  <Button
                    size="sm"
                    className="h-8 text-xs px-4 gap-1.5"
                    style={{ backgroundColor: '#0064d9', color: '#fff' }}
                    onClick={handlePreview}
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full erp-table">
                    <thead>
                      <tr>
                        <th className="w-10 text-center">
                          <Checkbox
                            checked={selectedRows.length === PREVIEW_MOCK.length}
                            onCheckedChange={toggleAll}
                          />
                        </th>
                        <th className="text-left">Source Cost</th>
                        <th className="text-left">Receiver</th>
                        <th className="text-right">Tỷ lệ (%)</th>
                        <th className="text-right">Allocation Amount (VND)</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PREVIEW_MOCK.map(row => (
                        <tr
                          key={row.id}
                          className={selectedRows.includes(row.id) ? 'selected' : ''}
                          onClick={() => toggleRow(row.id)}
                        >
                          <td className="text-center" onClick={e => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedRows.includes(row.id)}
                              onCheckedChange={() => toggleRow(row.id)}
                            />
                          </td>
                          <td className="text-gray-700 text-xs max-w-[280px] truncate">{row.sourceCost}</td>
                          <td className="text-gray-600">{row.receiver}</td>
                          <td className="text-right tabular-nums font-medium">{row.percentage}%</td>
                          <td className="text-right tabular-nums font-semibold text-gray-800">
                            {fmtCurrency(row.allocationAmount)}
                          </td>
                          <td className="text-center">{statusBadge(row.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td colSpan={4} className="px-3 py-2 text-xs font-semibold text-gray-600 text-right">
                          Tổng cộng:
                        </td>
                        <td className="px-3 py-2 text-right text-xs font-bold tabular-nums text-gray-800">
                          {fmtCurrency(totalSource)}
                        </td>
                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── FINANCIAL INFO TAB ─────────────────────────────────────── */}
          <TabsContent value="financial-info" className="p-5">
            <div className="grid grid-cols-3 gap-4 mb-5">
              {/* Allocation Amounts */}
              <FormBlock title="Allocation Amounts">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Total Source Amount</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 text-right tabular-nums"
                      value={fmtCurrency(totalSource)} readOnly />
                  </div>
                  <div>
                    <FieldLabel>Total Allocated</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 text-right tabular-nums"
                      value={fmtCurrency(totalAllocated)} readOnly />
                  </div>
                  <div>
                    <FieldLabel>Remaining Amount</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 text-right tabular-nums"
                      value={fmtCurrency(remaining)}
                      style={{ color: remaining > 0 ? '#dc2626' : '#059669' }}
                      readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <FieldLabel>Debit Account</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="TK Nợ" />
                  </div>
                  <div>
                    <FieldLabel>Credit Account</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="TK Có" />
                  </div>
                  <div>
                    <FieldLabel>Currency</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="VND" readOnly />
                  </div>
                </div>
              </FormBlock>

              {/* Exchange & Ledger */}
              <FormBlock title="Exchange & Ledger">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Exchange Rate</FieldLabel>
                    <Input className="h-8 text-xs text-right tabular-nums" defaultValue="1.00" />
                  </div>
                  <div>
                    <FieldLabel>Amount Local</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 text-right tabular-nums"
                      value={fmtCurrency(totalAllocated)} readOnly />
                  </div>
                  <div>
                    <FieldLabel>Amount Group</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 text-right tabular-nums"
                      value={fmtCurrency(totalAllocated)} readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <FieldLabel>Ledger</FieldLabel>
                    <Select defaultValue="main">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Sổ chính</SelectItem>
                        <SelectItem value="tax">Sổ thuế</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Fiscal Year</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="2026" readOnly />
                  </div>
                  <div>
                    <FieldLabel>Period</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="02" readOnly />
                  </div>
                </div>
              </FormBlock>

              {/* Summary KPIs */}
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Source Records',    value: PREVIEW_MOCK.length,                                            color: '#0064d9' },
                  { label: 'Sẵn sàng phân bổ', value: PREVIEW_MOCK.filter(r => r.status === 'ready').length,          color: '#059669' },
                  { label: 'Cần kiểm tra',      value: PREVIEW_MOCK.filter(r => r.status === 'warning').length,        color: '#d97706' },
                  { label: 'Lỗi',               value: PREVIEW_MOCK.filter(r => r.status === 'error').length,          color: '#dc2626' },
                ].map(k => (
                  <div key={k.label} className="erp-card p-3 flex items-center justify-between">
                    <p className="text-xs text-gray-500 font-medium">{k.label}</p>
                    <p className="text-sm font-bold" style={{ color: k.color }}>{k.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview — Allocation Lines (only in Financial Info tab) */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-0 flex items-center justify-between">
                <button className="text-xs font-semibold px-3 py-2.5 border-b-2 border-blue-600 text-blue-600 bg-white">
                  Preview — Allocation Lines
                </button>
                <div className="flex items-center gap-2 py-1.5">
                  <Button variant="outline" size="sm" className="h-7 text-xs px-2.5 gap-1" onClick={handlePreview}>
                    <RefreshCw className="w-3 h-3" /> Refresh Preview
                  </Button>
                </div>
              </div>

              {!showPreview ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-500">Nhấn Preview để tải dữ liệu mô phỏng phân bổ</p>
                  <Button
                    size="sm"
                    className="h-8 text-xs px-4 gap-1.5"
                    style={{ backgroundColor: '#0064d9', color: '#fff' }}
                    onClick={handlePreview}
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full erp-table">
                    <thead>
                      <tr>
                        <th className="w-10 text-center">
                          <Checkbox
                            checked={selectedRows.length === PREVIEW_MOCK.length}
                            onCheckedChange={toggleAll}
                          />
                        </th>
                        <th className="text-left">Source Cost</th>
                        <th className="text-left">Receiver</th>
                        <th className="text-right">Tỷ lệ (%)</th>
                        <th className="text-right">Allocation Amount (VND)</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PREVIEW_MOCK.map(row => (
                        <tr
                          key={row.id}
                          className={selectedRows.includes(row.id) ? 'selected' : ''}
                          onClick={() => toggleRow(row.id)}
                        >
                          <td className="text-center" onClick={e => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedRows.includes(row.id)}
                              onCheckedChange={() => toggleRow(row.id)}
                            />
                          </td>
                          <td className="text-gray-700 text-xs max-w-[280px] truncate">{row.sourceCost}</td>
                          <td className="text-gray-600">{row.receiver}</td>
                          <td className="text-right tabular-nums font-medium">{row.percentage}%</td>
                          <td className="text-right tabular-nums font-semibold text-gray-800">
                            {fmtCurrency(row.allocationAmount)}
                          </td>
                          <td className="text-center">{statusBadge(row.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td colSpan={4} className="px-3 py-2 text-xs font-semibold text-gray-600 text-right">
                          Tổng cộng:
                        </td>
                        <td className="px-3 py-2 text-right text-xs font-bold tabular-nums text-gray-800">
                          {fmtCurrency(totalSource)}
                        </td>
                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── APPROVAL INFO TAB ─────────────────────────────────────── */}
          <TabsContent value="approval-info" className="p-5">
            {/* Approval Workflow Selector */}
            <div className="mb-6">
              <h3 className="text-sm mb-4">Approval Workflow</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      <span className="text-red-500 mr-0.5">*</span> Approval Workflow
                    </label>
                    <Select defaultValue="WF01">
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WF01">WF01 - Standard Approval</SelectItem>
                        <SelectItem value="WF02">WF02 - Express Approval</SelectItem>
                        <SelectItem value="WF03">WF03 - Department Head Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Workflow Description</label>
                    <Input 
                      className="h-10 bg-white" 
                      value="Level 1: Kế toán trưởng → Level 2: CFO"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm mb-4">Thông tin phê duyệt đa cấp</h3>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50 border-b">
                      <th className="px-4 py-3 text-left text-blue-700">Level</th>
                      <th className="px-4 py-3 text-left text-blue-700">Approver</th>
                      <th className="px-4 py-3 text-left text-blue-700">Position</th>
                      <th className="px-4 py-3 text-left text-blue-700">Approval Date</th>
                      <th className="px-4 py-3 text-left text-blue-700">Comments</th>
                      <th className="px-4 py-3 text-left text-blue-700">Status</th>
                      <th className="px-4 py-3 text-left text-blue-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Level 1</td>
                      <td className="px-4 py-3">Nguyễn Văn D</td>
                      <td className="px-4 py-3">Kế toán trưởng</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Select>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue placeholder="Chọn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approve">Duyệt</SelectItem>
                            <SelectItem value="reject">Từ chối</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Level 2</td>
                      <td className="px-4 py-3">Phạm Thị E</td>
                      <td className="px-4 py-3">CFO</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          Waiting
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Select disabled>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue placeholder="Chọn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approve">Duyệt</SelectItem>
                            <SelectItem value="reject">Từ chối</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* History Log */}
            <div className="mb-6">
              <h3 className="text-sm mb-4">Lịch sử thao tác</h3>
              <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Khởi tạo đợt phân bổ</p>
                    <p className="text-xs text-gray-500">admin - 2026-02-25 09:15</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Chờ phê duyệt Level 1</p>
                    <p className="text-xs text-gray-500">Đang chờ xử lý</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Bottom Navigation Bar ────────────────────────────────────── */}
        <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-gray-200 bg-gray-50/50">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs px-3 gap-1.5"
            onClick={handlePreview}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs px-4 gap-1.5 text-white"
            style={{ backgroundColor: '#0064d9' }}
            onClick={handleRun}
            disabled={isRunning}
          >
            <Play className="w-3.5 h-3.5" />
            {isRunning ? 'Đang chạy...' : simulationMode ? 'Chạy mô phỏng' : 'Chạy phân bổ'}
          </Button>
        </div>
      </div>
    </div>
  );
}