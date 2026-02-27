import { useState } from 'react';
import { X, RotateCcw, CheckCircle, AlertTriangle, Shield, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useLanguage } from '../i18n/LanguageContext';
import { toast } from 'sonner';

interface AllocationReverseScreenProps {
  batchId?: string;
  onClose?: () => void;
}

const FieldLabel = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-xs font-medium text-gray-500 mb-1">
    {required && <span className="text-red-500 mr-0.5">*</span>}
    {children}
  </label>
);

const FormBlock = ({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) => (
  <div className="border border-gray-200 rounded-md p-4 bg-white">
    <h3 className="text-xs font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
      {accent && <div className="w-1 h-3 rounded-full" style={{ backgroundColor: accent }} />}
      {title}
    </h3>
    {children}
  </div>
);

export default function AllocationReverseScreen({ batchId = 'ALB-2026-0011', onClose }: AllocationReverseScreenProps) {
  const { t } = useLanguage();
  const [mainTab, setMainTab] = useState('main-info');
  const [allowReallocation, setAllowReallocation] = useState(false);
  const [autoReRun, setAutoReRun]       = useState(false);
  const [lockSource, setLockSource]     = useState(true);
  const [auditRequired, setAuditRequired] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed]       = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDetailRows, setSelectedDetailRows] = useState<number[]>([]);

  const fmtCurrency = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

  // Mock data cho 24 dòng phân bổ
  const allocationDetails = [
    { id: 1,  source: 'Chi phí điện nước tháng 1', sourceCost: 'CCE-001 Admin', receiver: 'CCE-002 IT',      percentage: 35, amount: 15_750_000 },
    { id: 2,  source: 'Chi phí điện nước tháng 1', sourceCost: 'CCE-001 Admin', receiver: 'CCE-003 Finance', percentage: 25, amount: 11_250_000 },
    { id: 3,  source: 'Chi phí điện nước tháng 1', sourceCost: 'CCE-001 Admin', receiver: 'CCE-005 Prod',    percentage: 40, amount: 18_000_000 },
    { id: 4,  source: 'Chi phí thuê văn phòng Q1',  sourceCost: 'CCE-001 Admin', receiver: 'CCE-002 IT',      percentage: 30, amount: 36_000_000 },
    { id: 5,  source: 'Chi phí thuê văn phòng Q1',  sourceCost: 'CCE-001 Admin', receiver: 'CCE-006 Sales',   percentage: 40, amount: 48_000_000 },
    { id: 6,  source: 'Chi phí thuê văn phòng Q1',  sourceCost: 'CCE-001 Admin', receiver: 'CCE-005 Prod',    percentage: 30, amount: 36_000_000 },
    { id: 7,  source: 'Chi phí nhân công gián tiếp', sourceCost: 'CCE-005 Prod', receiver: 'CCE-005 Prod',    percentage: 100, amount: 210_000_000 },
    { id: 8,  source: 'Chi phí vật tư văn phòng',    sourceCost: 'CCE-001 Admin', receiver: 'CCE-002 IT',      percentage: 20, amount: 5_200_000 },
    { id: 9,  source: 'Chi phí vật tư văn phòng',    sourceCost: 'CCE-001 Admin', receiver: 'CCE-003 Finance', percentage: 30, amount: 7_800_000 },
    { id: 10, source: 'Chi phí vật tư văn phòng',    sourceCost: 'CCE-001 Admin', receiver: 'CCE-006 Sales',   percentage: 50, amount: 13_000_000 },
    { id: 11, source: 'Chi phí bảo trì máy móc',     sourceCost: 'CCE-005 Prod',  receiver: 'CCE-005 Prod',    percentage: 100, amount: 8_200_000 },
    { id: 12, source: 'Chi phí bảo hiểm tài sản',    sourceCost: 'CCE-001 Admin', receiver: 'CCE-002 IT',      percentage: 25, amount: 3_000_000 },
    { id: 13, source: 'Chi phí bảo hiểm tài sản',    sourceCost: 'CCE-001 Admin', receiver: 'CCE-005 Prod',    percentage: 50, amount: 6_000_000 },
    { id: 14, source: 'Chi phí bảo hiểm tài sản',    sourceCost: 'CCE-001 Admin', receiver: 'CCE-006 Sales',   percentage: 25, amount: 3_000_000 },
    { id: 15, source: 'Chi phí khấu hao TSCĐ',       sourceCost: 'CCE-003 Finance', receiver: 'CCE-002 IT',    percentage: 30, amount: 12_000_000 },
    { id: 16, source: 'Chi phí khấu hao TSCĐ',       sourceCost: 'CCE-003 Finance', receiver: 'CCE-005 Prod',  percentage: 50, amount: 20_000_000 },
    { id: 17, source: 'Chi phí khấu hao TSCĐ',       sourceCost: 'CCE-003 Finance', receiver: 'CCE-006 Sales', percentage: 20, amount: 8_000_000 },
    { id: 18, source: 'Chi phí đào tạo',             sourceCost: 'CCE-001 Admin', receiver: 'CCE-002 IT',      percentage: 40, amount: 6_000_000 },
    { id: 19, source: 'Chi phí đào tạo',             sourceCost: 'CCE-001 Admin', receiver: 'CCE-006 Sales',   percentage: 60, amount: 9_000_000 },
    { id: 20, source: 'Chi phí bảo trì hệ thống IT', sourceCost: 'CCE-002 IT',    receiver: 'CCE-001 Admin',   percentage: 30, amount: 4_500_000 },
    { id: 21, source: 'Chi phí bảo trì hệ thống IT', sourceCost: 'CCE-002 IT',    receiver: 'CCE-003 Finance', percentage: 30, amount: 4_500_000 },
    { id: 22, source: 'Chi phí bảo trì hệ thống IT', sourceCost: 'CCE-002 IT',    receiver: 'CCE-005 Prod',    percentage: 40, amount: 6_000_000 },
    { id: 23, source: 'Chi phí marketing',           sourceCost: 'CCE-006 Sales', receiver: 'CCE-001 Admin',   percentage: 20, amount: 2_000_000 },
    { id: 24, source: 'Chi phí marketing',           sourceCost: 'CCE-006 Sales', receiver: 'CCE-005 Prod',    percentage: 80, amount: 8_000_000 },
  ];

  const toggleDetailRow = (id: number) => {
    setSelectedDetailRows(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  };

  const toggleAllDetails = () => {
    setSelectedDetailRows(selectedDetailRows.length === allocationDetails.length ? [] : allocationDetails.map(r => r.id));
  };

  const handleSubmit = () => {
    if (!confirmed) {
      toast.warning('Vui lòng xác nhận trước khi thực hiện Reverse');
      return;
    }
    setIsSubmitting(true);
    toast.promise(
      new Promise(res => setTimeout(res, 2000)),
      {
        loading: 'Đang thực hiện reverse phân bổ...',
        success: `Reverse phân bổ ${batchId} thành công!`,
        error: 'Có lỗi xảy ra khi reverse.',
      }
    );
    setTimeout(() => {
      setIsSubmitting(false);
      if (onClose) onClose();
    }, 2200);
  };

  return (
    <div className="min-h-screen overflow-x-auto" style={{ backgroundColor: '#f1f5f9', padding: '24px' }}>
      <div className="bg-white rounded-lg shadow-sm" style={{ minWidth: '1400px' }}>

        {/* ── Document Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fef2f2' }}>
              <RotateCcw className="w-4 h-4" style={{ color: '#dc2626' }} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-800">{t.nav.reverseAllocation}</h2>
              <p className="text-xs text-gray-400">Kế toán tổng hợp — Đảo ngược phân bổ chi phí</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onClose && (
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ── Warning Banner ─────────────────────────────────────────── */}
        <div className="px-6 py-2.5 flex items-center gap-3" style={{ backgroundColor: '#fef2f2', borderBottom: '1px solid #fecaca' }}>
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-700">
            <span className="font-semibold">Cảnh báo:</span> Thao tác này sẽ đảo ngược toàn bộ bút toán phân bổ của batch{' '}
            <span className="font-semibold">{batchId}</span>. Hành động này không thể hoàn tác trực tiếp.
          </p>
          <div className="ml-auto flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-gray-300 accent-red-600"
                checked={confirmed}
                onChange={e => setConfirmed(e.target.checked)}
              />
              <span className="text-xs text-red-700 font-medium">Tôi xác nhận thực hiện Reverse</span>
            </label>
            <Button
              size="sm"
              className="h-7 text-xs px-3 gap-1.5 text-white"
              style={{ backgroundColor: '#dc2626' }}
              onClick={handleSubmit}
              disabled={isSubmitting || !confirmed}
            >
              <RotateCcw className="w-3 h-3" />
              {isSubmitting ? 'Đang xử lý...' : 'Thực hiện Reverse'}
            </Button>
          </div>
        </div>

        {/* ── Main Tabs ─────────────────────────────────────────────── */}
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
            {[
              { value: 'main-info', label: 'Main Info' },
              { value: 'control',   label: 'Control & Audit' },
            ].map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent data-[state=active]:text-red-600 text-xs px-4 py-2.5"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── MAIN INFO TAB ──────────────────────────────────────── */}
          <TabsContent value="main-info" className="p-5">
            <div className="grid grid-cols-3 gap-4 mb-4">

              {/* Block 1: Reverse Information */}
              <FormBlock title="Reverse Information" accent="#dc2626">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Reverse ID</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="REV-2026-0005" readOnly />
                  </div>
                  <div>
                    <FieldLabel required>Batch ID (gốc)</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 font-medium" defaultValue={batchId} readOnly />
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
                    <FieldLabel required>Posting Date</FieldLabel>
                    <Input type="date" className="h-8 text-xs bg-red-50 border-red-200" defaultValue="2026-02-28" />
                  </div>
                  <div>
                    <FieldLabel required>Reason</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue placeholder="Chọn lý do..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wrong-rule">Áp dụng sai quy tắc</SelectItem>
                        <SelectItem value="wrong-period">Sai kỳ phân bổ</SelectItem>
                        <SelectItem value="wrong-amount">Sai số tiền</SelectItem>
                        <SelectItem value="wrong-cc">Sai trung tâm chi phí</SelectItem>
                        <SelectItem value="other">Lý do khác</SelectItem>
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
                    <FieldLabel>Approved By</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Người duyệt..." />
                  </div>
                  <div>
                    <FieldLabel>Description</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Mô tả lý do reverse..." />
                  </div>
                </div>
              </FormBlock>

              {/* Block 2: Original Batch Info */}
              <FormBlock title="Original Batch Details" accent="#d97706">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Original Batch</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 text-blue-600 font-medium" defaultValue={batchId} readOnly />
                  </div>
                  <div>
                    <FieldLabel>Allocation Period</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="Jan 2026" readOnly />
                  </div>
                  <div>
                    <FieldLabel>Amount (VND)</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 text-right tabular-nums" defaultValue="415,200,000" readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel required>Reverse Type</FieldLabel>
                    <Select defaultValue="full">
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Reverse</SelectItem>
                        <SelectItem value="partial">Partial Reverse</SelectItem>
                        <SelectItem value="selective">Selective Reverse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Currency</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="VND" readOnly />
                  </div>
                  <div>
                    <FieldLabel>Exchange Rate</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 text-right tabular-nums" defaultValue="1.00" readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <FieldLabel>Fiscal Year</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="2026" readOnly />
                  </div>
                  <div>
                    <FieldLabel>Period</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="01" readOnly />
                  </div>
                  <div>
                    <FieldLabel>Ledger</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="Sổ chính" readOnly />
                  </div>
                </div>
              </FormBlock>

              {/* Block 3: Re-allocation Options */}
              <FormBlock title="Re-allocation Options" accent="#059669">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Allow Reallocation</FieldLabel>
                    <div className="flex items-center h-8 gap-2">
                      <Switch checked={allowReallocation} onCheckedChange={setAllowReallocation} />
                      <span className="text-xs text-gray-500">{allowReallocation ? 'Có' : 'Không'}</span>
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Auto Re-run</FieldLabel>
                    <div className="flex items-center h-8 gap-2">
                      <Switch checked={autoReRun} onCheckedChange={setAutoReRun} />
                      <span className="text-xs text-gray-500">{autoReRun ? 'Có' : 'Không'}</span>
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Lock Source</FieldLabel>
                    <div className="flex items-center h-8 gap-2">
                      <Switch checked={lockSource} onCheckedChange={setLockSource} />
                      <span className="text-xs text-gray-500">{lockSource ? 'Có' : 'Không'}</span>
                    </div>
                  </div>
                </div>
              </FormBlock>
            </div>

            {/* Thông tin Batch gốc - Bảng với expand/collapse */}
            <div className="border border-gray-200 rounded-md overflow-hidden mt-5">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5">
                <h3 className="text-xs font-semibold text-gray-700">Thông tin Batch gốc</h3>
              </div>

              {/* Main batch table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-blue-50 border-b">
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Số chứng từ ↑↓</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Tên chi phí</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Loại chi phí</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Module gốc</th>
                      <th className="px-3 py-2 text-right text-blue-700 font-semibold">Số tiền (VND)</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Trung tâm chi phí</th>
                      <th className="px-3 py-2 text-center text-blue-700 font-semibold">Trạng thái</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Ngày hạch toán</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Người tạo</th>
                      <th className="px-3 py-2 text-center text-blue-700 font-semibold">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 - expandable */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2.5">
                        <button
                          className="text-blue-600 hover:underline font-medium flex items-center gap-1"
                          onClick={() => setShowDetailsModal(true)}
                        >
                          {batchId}
                        </button>
                      </td>
                      <td className="px-3 py-2.5 text-gray-700">Chi phí điện nước tháng 1</td>
                      <td className="px-3 py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-600 border border-blue-100">
                          Utilities
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-600">GL</td>
                      <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-gray-800">45,000,000</td>
                      <td className="px-3 py-2.5 text-gray-600">CCE-001 Admin</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded text-xs bg-green-50 text-green-600 font-medium border border-green-100">
                          Chờ phân bổ
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-500 tabular-nums">28/02/2026</td>
                      <td className="px-3 py-2.5 text-gray-400">admin</td>
                      <td className="px-3 py-2.5 text-center">
                        <button
                          className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600"
                          onClick={() => toast.info('Xem chi tiết')}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2.5 text-blue-600 font-medium">EXP-2026-00119</td>
                      <td className="px-3 py-2.5 text-gray-700">Chi phí thuê văn phòng Q1</td>
                      <td className="px-3 py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-purple-50 text-purple-600 border border-purple-100">
                          Rent
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-600">AP</td>
                      <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-gray-800">120,000,000</td>
                      <td className="px-3 py-2.5 text-gray-600">CCE-001 Admin</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded text-xs bg-green-50 text-green-600 font-medium border border-green-100">
                          Chờ phân bổ
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-500 tabular-nums">25/02/2026</td>
                      <td className="px-3 py-2.5 text-gray-400">admin</td>
                      <td className="px-3 py-2.5 text-center">
                        <button
                          className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600"
                          onClick={() => toast.info('Xem chi tiết')}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2.5 text-blue-600 font-medium">EXP-2026-00102</td>
                      <td className="px-3 py-2.5 text-gray-700">Chi phí nhân công gián tiếp</td>
                      <td className="px-3 py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-orange-50 text-orange-600 border border-orange-100">
                          Labor
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-600">HR</td>
                      <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-gray-800">210,000,000</td>
                      <td className="px-3 py-2.5 text-gray-600">CCE-005 Prod</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded text-xs bg-green-50 text-green-600 font-medium border border-green-100">
                          Chờ phân bổ
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-500 tabular-nums">20/02/2026</td>
                      <td className="px-3 py-2.5 text-gray-400">admin</td>
                      <td className="px-3 py-2.5 text-center">
                        <button
                          className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600"
                          onClick={() => toast.info('Xem chi tiết')}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 border-t-2 border-gray-200">
                      <td colSpan={4} className="px-3 py-2 text-xs font-semibold text-gray-700 text-right">
                        Tổng cộng:
                      </td>
                      <td className="px-3 py-2 text-right text-xs font-bold tabular-nums text-gray-900">
                        375,000,000
                      </td>
                      <td colSpan={5}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ── CONTROL & AUDIT TAB ─────────────────────────────────── */}
          <TabsContent value="control" className="p-5">
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
                        <SelectItem value="WF01">WF01 - Standard Reverse Approval</SelectItem>
                        <SelectItem value="WF02">WF02 - Express Reverse Approval</SelectItem>
                        <SelectItem value="WF03">WF03 - CFO Only</SelectItem>
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
                    <p className="text-sm font-medium">Tạo phiếu Reverse</p>
                    <p className="text-xs text-gray-500">admin - 2026-02-25 14:30</p>
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

            {/* Risk Assessment */}
            <div className="mb-6">
              <h3 className="text-sm mb-4">Risk Assessment</h3>
              <div className="border rounded-lg p-4 bg-white">
                <div className="space-y-2.5">
                  {[
                    { risk: 'Ảnh hưởng P&L',          level: 'Cao',    color: '#dc2626', bg: '#fef2f2' },
                    { risk: 'Số kỳ đã đóng',           level: 'Trung bình', color: '#d97706', bg: '#fffbeb' },
                    { risk: 'Báo cáo đã phát hành',    level: 'Thấp',   color: '#059669', bg: '#f0fdf4' },
                    { risk: 'Ảnh hưởng tài khoản thuế',level: 'Trung bình', color: '#d97706', bg: '#fffbeb' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded"
                      style={{ backgroundColor: r.bg }}>
                      <span className="text-xs text-gray-600">{r.risk}</span>
                      <span className="text-xs font-semibold" style={{ color: r.color }}>{r.level}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 p-2.5 rounded-md flex items-center gap-2"
                  style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}>
                  <Shield className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    Reverse sẽ tạo bút toán đối nghịch. Kiểm tra báo cáo trước khi confirm.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Details Modal ───────────────────────────────────────────── */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-[1200px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-gray-800">
              Chi tiết phân bổ — {batchId}
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              Chi phí điện nước tháng 1 · 45,000,000 VND · 24 dòng phân bổ
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedDetailRows.length === allocationDetails.length}
                  onCheckedChange={toggleAllDetails}
                />
                <span className="text-xs text-gray-600 font-medium">
                  Chọn tất cả ({selectedDetailRows.length}/{allocationDetails.length})
                </span>
              </div>
              {selectedDetailRows.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-3"
                  onClick={() => toast.info(`Xử lý ${selectedDetailRows.length} dòng`)}
                >
                  Xử lý {selectedDetailRows.length} dòng
                </Button>
              )}
            </div>

            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-3 py-2 text-center w-10">
                      <Checkbox
                        checked={selectedDetailRows.length === allocationDetails.length}
                        onCheckedChange={toggleAllDetails}
                      />
                    </th>
                    <th className="px-3 py-2 text-left text-blue-700 font-semibold">#</th>
                    <th className="px-3 py-2 text-left text-blue-700 font-semibold">Chi phí nguồn</th>
                    <th className="px-3 py-2 text-left text-blue-700 font-semibold">Trung tâm nguồn</th>
                    <th className="px-3 py-2 text-left text-blue-700 font-semibold">Trung tâm nhận</th>
                    <th className="px-3 py-2 text-right text-blue-700 font-semibold">Tỷ lệ (%)</th>
                    <th className="px-3 py-2 text-right text-blue-700 font-semibold">Số tiền (VND)</th>
                  </tr>
                </thead>
                <tbody>
                  {allocationDetails.map(row => (
                    <tr 
                      key={row.id} 
                      className={`border-b hover:bg-blue-50/50 cursor-pointer transition-colors ${
                        selectedDetailRows.includes(row.id) ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => toggleDetailRow(row.id)}
                    >
                      <td className="px-3 py-2 text-center" onClick={e => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedDetailRows.includes(row.id)}
                          onCheckedChange={() => toggleDetailRow(row.id)}
                        />
                      </td>
                      <td className="px-3 py-2 font-medium text-gray-700">{row.id}</td>
                      <td className="px-3 py-2 text-gray-700">{row.source}</td>
                      <td className="px-3 py-2 text-gray-600">{row.sourceCost}</td>
                      <td className="px-3 py-2 text-gray-600">{row.receiver}</td>
                      <td className="px-3 py-2 text-right tabular-nums font-medium text-gray-700">{row.percentage}%</td>
                      <td className="px-3 py-2 text-right tabular-nums font-semibold text-gray-800">
                        {fmtCurrency(row.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <td colSpan={6} className="px-3 py-2 text-right text-xs font-semibold text-gray-700">
                      Tổng cộng:
                    </td>
                    <td className="px-3 py-2 text-right text-xs font-bold tabular-nums text-gray-900">
                      {fmtCurrency(allocationDetails.reduce((sum, r) => sum + r.amount, 0))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Đóng
            </Button>
            {selectedDetailRows.length > 0 && (
              <Button onClick={() => toast.success(`Đã xử lý ${selectedDetailRows.length} dòng`)}>
                Xác nhận ({selectedDetailRows.length})
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}