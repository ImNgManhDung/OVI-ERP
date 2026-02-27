import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Clock, CheckCircle2, AlertCircle, XCircle, Eye, GitMerge, Play } from 'lucide-react';
import StatsCard from './StatsCard';
import MasterDataToolbar from './MasterDataToolbar';
import { useLanguage } from '../i18n/LanguageContext';
import { toast } from 'sonner';

interface PendingAllocationListProps {
  onRunAllocation?: () => void;
}

interface PendingAllocationRow {
  id: number;
  documentNo: string;
  expenseName: string;
  expenseType: string;
  sourceModule: string;
  amount: number;
  costCenter: string;
  company: string;
  allocationStatus: 'pending' | 'allocated' | 'partial' | 'failed';
  postingDate: string;
  createdBy: string;
}

const MOCK_DATA: PendingAllocationRow[] = [
  { id: 1, documentNo: 'EXP-2026-00128', expenseName: 'Chi phí điện nước tháng 2',    expenseType: 'Utilities',    sourceModule: 'GL',  amount: 45_000_000,  costCenter: 'CCE-001 Admin',     company: 'CÔNG TY CP ABC', allocationStatus: 'pending',   postingDate: '28/02/2026', createdBy: 'admin' },
  { id: 2, documentNo: 'EXP-2026-00119', expenseName: 'Chi phí thuê văn phòng Q1',    expenseType: 'Rent',         sourceModule: 'AP',  amount: 120_000_000, costCenter: 'CCE-001 Admin',     company: 'CÔNG TY CP ABC', allocationStatus: 'pending',   postingDate: '25/02/2026', createdBy: 'admin' },
  { id: 3, documentNo: 'EXP-2026-00104', expenseName: 'Chi phí bảo hiểm tài sản',     expenseType: 'Insurance',    sourceModule: 'AP',  amount: 18_500_000,  costCenter: 'CCE-003 Finance',   company: 'CÔNG TY CP ABC', allocationStatus: 'partial',   postingDate: '20/02/2026', createdBy: 'acc01' },
  { id: 4, documentNo: 'EXP-2026-00098', expenseName: 'Chi phí khấu hao thiết bị',    expenseType: 'Depreciation', sourceModule: 'FCM', amount: 32_000_000,  costCenter: 'CCE-002 IT',        company: 'CÔNG TY CP ABC', allocationStatus: 'allocated', postingDate: '15/02/2026', createdBy: 'sys' },
  { id: 5, documentNo: 'EXP-2026-00087', expenseName: 'Chi phí nhân công gián tiếp',  expenseType: 'Labor',        sourceModule: 'HR',  amount: 210_000_000, costCenter: 'CCE-005 Prod',      company: 'CÔNG TY CP ABC', allocationStatus: 'pending',   postingDate: '10/02/2026', createdBy: 'acc02' },
  { id: 6, documentNo: 'EXP-2026-00076', expenseName: 'Chi phí vận chuyển nội bộ',    expenseType: 'Transport',    sourceModule: 'WMM', amount: 8_200_000,   costCenter: 'CCE-004 Logistics', company: 'CÔNG TY CP ABC', allocationStatus: 'failed',    postingDate: '05/02/2026', createdBy: 'acc01' },
  { id: 7, documentNo: 'EXP-2026-00063', expenseName: 'Chi phí marketing tháng 1',    expenseType: 'Marketing',    sourceModule: 'GL',  amount: 55_000_000,  costCenter: 'CCE-006 Sales',     company: 'CÔNG TY CP ABC', allocationStatus: 'allocated', postingDate: '31/01/2026', createdBy: 'admin' },
  { id: 8, documentNo: 'EXP-2026-00051', expenseName: 'Chi phí đào tạo nhân viên',    expenseType: 'Training',     sourceModule: 'HR',  amount: 22_000_000,  costCenter: 'CCE-001 Admin',     company: 'CÔNG TY CP ABC', allocationStatus: 'pending',   postingDate: '28/01/2026', createdBy: 'acc02' },
];

const STATUS_BADGE: Record<PendingAllocationRow['allocationStatus'], { cls: string; label: string }> = {
  pending:   { cls: 'erp-badge-warning', label: 'Chờ phân bổ' },
  allocated: { cls: 'erp-badge-success', label: 'Đã phân bổ' },
  partial:   { cls: 'erp-badge-info',    label: 'Phân bổ một phần' },
  failed:    { cls: 'erp-badge-danger',  label: 'Lỗi' },
};

const fmtCurrency = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

export default function PendingAllocationList({ onRunAllocation }: PendingAllocationListProps) {
  const { t } = useLanguage();

  const [data, setData]                 = useState<PendingAllocationRow[]>(MOCK_DATA);
  const [searchText, setSearchText]     = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterModule, setFilterModule] = useState('all');
  const [filterFrom, setFilterFrom]     = useState('');
  const [filterTo, setFilterTo]         = useState('');

  // KPI counts
  const pendingCount   = data.filter(r => r.allocationStatus === 'pending').length;
  const allocatedCount = data.filter(r => r.allocationStatus === 'allocated').length;
  const partialCount   = data.filter(r => r.allocationStatus === 'partial').length;
  const failedCount    = data.filter(r => r.allocationStatus === 'failed').length;

  const filtered = data.filter(r => {
    const matchSearch = !searchText || Object.values(r).some(v =>
      String(v).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchStatus = filterStatus === 'all' || r.allocationStatus === filterStatus;
    const matchModule = filterModule === 'all' || r.sourceModule      === filterModule;
    return matchSearch && matchStatus && matchModule;
  });

  const toggleRow = (id: number) =>
    setSelectedRows(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAll = () =>
    setSelectedRows(selectedRows.length === filtered.length ? [] : filtered.map(r => r.id));

  const handleDelete = () => {
    if (!selectedRows.length) { toast.warning('Vui lòng chọn ít nhất 1 dòng'); return; }
    setData(prev => prev.filter(r => !selectedRows.includes(r.id)));
    setSelectedRows([]);
    toast.success(`Đã xóa ${selectedRows.length} bản ghi`);
  };

  const handleClearFilter = () => {
    setFilterStatus('all');
    setFilterModule('all');
    setFilterFrom('');
    setFilterTo('');
    setSearchText('');
  };

  return (
    <div className="p-6">
      {/* ── Page Title ─────────────────────────────────────────────── */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">{t.nav.pendingAllocation}</h1>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatsCard title="Chờ phân bổ"       value={pendingCount}   icon={Clock}         bgColor="text-orange-500" iconBgColor="bg-orange-50" />
        <StatsCard title="Đã phân bổ"        value={allocatedCount} icon={CheckCircle2}  bgColor="text-green-500"  iconBgColor="bg-green-50" />
        <StatsCard title="Phân bổ một phần"  value={partialCount}   icon={AlertCircle}   bgColor="text-blue-500"   iconBgColor="bg-blue-50" />
        <StatsCard title="Lỗi phân bổ"       value={failedCount}    icon={XCircle}       bgColor="text-red-500"    iconBgColor="bg-red-50" />
      </div>

      {/* ── Filter Section ─────────────────────────────────────────── */}
      <div className="bg-white border rounded-lg mb-4 p-4">
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-3">
            <label className="block text-sm mb-1">Từ ngày hạch toán</label>
            <Input
              type="date"
              value={filterFrom}
              onChange={e => setFilterFrom(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm mb-1">Đến ngày hạch toán</label>
            <Input
              type="date"
              value={filterTo}
              onChange={e => setFilterTo(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm mb-1">Module gốc</label>
            <Select value={filterModule} onValueChange={setFilterModule}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Tất cả" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="GL">GL</SelectItem>
                <SelectItem value="AP">AP</SelectItem>
                <SelectItem value="FCM">FCM</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="WMM">WMM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-3">
            <label className="block text-sm mb-1">Trạng thái</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Tất cả trạng thái" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ phân bổ</SelectItem>
                <SelectItem value="allocated">Đã phân bổ</SelectItem>
                <SelectItem value="partial">Phân bổ một phần</SelectItem>
                <SelectItem value="failed">Lỗi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClearFilter}>Clear All Filter</Button>
          <Button
            style={{ backgroundColor: '#0064d9', color: '#fff' }}
            onClick={() => onRunAllocation?.()}
          >
            <Play className="w-3.5 h-3.5 mr-1.5" /> Chạy phân bổ
          </Button>
        </div>
      </div>

      {/* ── Toolbar ────────────────────────────────────────────────── */}
      <MasterDataToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={() => onRunAllocation?.()}
        onDeleteRows={handleDelete}
        onSave={() => toast.success('Lưu thành công')}
        selectedCount={selectedRows.length}
        addRowLabel="+ Chạy phân bổ mới"
      />

      {/* ── Table ──────────────────────────────────────────────────── */}
      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-50 border-b">
                <th className="px-3 py-2 text-center w-10">
                  <Checkbox
                    checked={filtered.length > 0 && selectedRows.length === filtered.length}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">Số chứng từ ↑↓</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">Tên chi phí</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">Loại chi phí</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">Module gốc</th>
                <th className="px-4 py-2 text-right text-sm text-blue-700">Số tiền (VND)</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">Trung tâm chi phí</th>
                <th className="px-4 py-2 text-center text-sm text-blue-700">Trạng thái</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">Ngày hạch toán</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">Người tạo</th>
                <th className="px-4 py-2 text-center text-sm text-blue-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-12 text-gray-400 text-sm">
                    Không tìm thấy dữ liệu
                  </td>
                </tr>
              ) : (
                filtered.map(row => (
                  <tr
                    key={row.id}
                    className={`border-b hover:bg-gray-50 cursor-pointer ${selectedRows.includes(row.id) ? 'bg-blue-50' : ''}`}
                    onClick={() => toggleRow(row.id)}
                  >
                    <td className="px-3 py-2.5 text-center" onClick={e => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRow(row.id)}
                      />
                    </td>
                    <td className="px-4 py-2.5 text-sm font-medium text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                      {row.documentNo}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-700 max-w-[220px] truncate">
                      {row.expenseName}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-blue-600">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                        {row.expenseType}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-sm">
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
                        {row.sourceModule}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-sm text-right font-medium tabular-nums text-gray-700 whitespace-nowrap">
                      {fmtCurrency(row.amount)}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-600 whitespace-nowrap">
                      {row.costCenter}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={STATUS_BADGE[row.allocationStatus].cls}>
                        {STATUS_BADGE[row.allocationStatus].label}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-500 tabular-nums whitespace-nowrap">
                      {row.postingDate}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-400">
                      {row.createdBy}
                    </td>
                    <td className="px-4 py-2.5 text-center" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Xem chi tiết"
                          onClick={() => toast.info(`Xem: ${row.documentNo}`)}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {row.allocationStatus !== 'allocated' && (
                          <button
                            className="p-1 rounded hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors"
                            title="Chạy phân bổ"
                            onClick={() => onRunAllocation?.()}
                          >
                            <GitMerge className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-2.5 border-t bg-gray-50/50 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {filtered.length} bản ghi{selectedRows.length > 0 && ` · ${selectedRows.length} đã chọn`}
          </span>
          <span className="text-xs text-gray-500">
            Tổng chờ phân bổ:{' '}
            <span className="font-semibold text-amber-600">
              {fmtCurrency(
                filtered
                  .filter(r => r.allocationStatus === 'pending')
                  .reduce((a, b) => a + b.amount, 0)
              )} VND
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}