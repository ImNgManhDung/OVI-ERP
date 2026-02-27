import { CheckCircle, XCircle, Clock, RefreshCw, Eye } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useLanguage } from '../i18n/LanguageContext';
import { toast } from 'sonner';
import StatsCard from './StatsCard';
import MasterDataToolbar from './MasterDataToolbar';

interface AllocationHistoryRow {
  id: number;
  batchId: string;
  allocationPeriod: string;
  company: string;
  allocationType: string;
  totalAmount: number;
  recordsCount: number;
  status: 'completed' | 'failed' | 'in_progress' | 'reversed' | 'simulation';
  createdDate: string;
  createdBy: string;
  runType: string;
}

const MOCK_DATA: AllocationHistoryRow[] = [
  { id: 1,  batchId: 'ALB-2026-0011', allocationPeriod: 'Jan 2026', company: 'CÔNG TY CP ABC', allocationType: 'Monthly Full',    totalAmount: 415_200_000, recordsCount: 24, status: 'completed',   createdDate: '31/01/2026 23:50', createdBy: 'sys',   runType: 'Monthly' },
  { id: 2,  batchId: 'ALB-2026-0010', allocationPeriod: 'Jan 2026', company: 'CÔNG TY CP ABC', allocationType: 'Simulation',      totalAmount: 415_200_000, recordsCount: 24, status: 'simulation',  createdDate: '30/01/2026 14:22', createdBy: 'acc01', runType: 'Manual' },
  { id: 3,  batchId: 'ALB-2026-0009', allocationPeriod: 'Dec 2025', company: 'CÔNG TY CP ABC', allocationType: 'Monthly Full',    totalAmount: 502_800_000, recordsCount: 28, status: 'completed',   createdDate: '31/12/2025 23:55', createdBy: 'sys',   runType: 'Monthly' },
  { id: 4,  batchId: 'ALB-2026-0008', allocationPeriod: 'Dec 2025', company: 'CÔNG TY CP ABC', allocationType: 'Manual Adj.',     totalAmount: 18_500_000,  recordsCount: 3,  status: 'reversed',    createdDate: '28/12/2025 10:15', createdBy: 'acc01', runType: 'Manual' },
  { id: 5,  batchId: 'ALB-2026-0007', allocationPeriod: 'Nov 2025', company: 'CÔNG TY CP ABC', allocationType: 'Monthly Full',    totalAmount: 488_000_000, recordsCount: 26, status: 'completed',   createdDate: '30/11/2025 23:50', createdBy: 'sys',   runType: 'Monthly' },
  { id: 6,  batchId: 'ALB-2026-0006', allocationPeriod: 'Feb 2026', company: 'CÔNG TY CP ABC', allocationType: 'Interim Run',     totalAmount: 95_000_000,  recordsCount: 6,  status: 'failed',      createdDate: '15/02/2026 09:30', createdBy: 'acc02', runType: 'Manual' },
  { id: 7,  batchId: 'ALB-2026-0005', allocationPeriod: 'Feb 2026', company: 'CÔNG TY CP ABC', allocationType: 'Simulation',      totalAmount: 375_200_000, recordsCount: 21, status: 'simulation',  createdDate: '20/02/2026 11:45', createdBy: 'admin', runType: 'Manual' },
  { id: 8,  batchId: 'ALB-2026-0004', allocationPeriod: 'Oct 2025', company: 'CÔNG TY CP ABC', allocationType: 'Monthly Full',    totalAmount: 460_500_000, recordsCount: 25, status: 'completed',   createdDate: '31/10/2025 23:52', createdBy: 'sys',   runType: 'Monthly' },
  { id: 9,  batchId: 'ALB-2026-0003', allocationPeriod: 'Q4 2025',  company: 'CÔNG TY CP ABC', allocationType: 'Quarterly',       totalAmount: 1_451_300_000,recordsCount: 79, status: 'completed',  createdDate: '31/12/2025 01:00', createdBy: 'sys',   runType: 'Quarterly' },
  { id: 10, batchId: 'ALB-2026-0002', allocationPeriod: 'Sep 2025', company: 'CÔNG TY CP ABC', allocationType: 'Monthly Full',    totalAmount: 423_000_000, recordsCount: 22, status: 'in_progress', createdDate: '30/09/2025 23:50', createdBy: 'sys',   runType: 'Monthly' },
];

const statusMap: Record<string, { cls: string; label: string; icon: any }> = {
  completed:   { cls: 'erp-badge-success', label: 'Hoàn thành',    icon: CheckCircle },
  failed:      { cls: 'erp-badge-danger',  label: 'Thất bại',      icon: XCircle },
  in_progress: { cls: 'erp-badge-warning', label: 'Đang chạy',     icon: Clock },
  reversed:    { cls: 'erp-badge-neutral', label: 'Đã reverse',    icon: RefreshCw },
  simulation:  { cls: 'erp-badge-info',    label: 'Mô phỏng',      icon: Eye },
};

const fmtCurrency = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

export default function AllocationHistoryList() {
  const { t } = useLanguage();
  const [searchText, setSearchText]     = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [data]                          = useState<AllocationHistoryRow[]>(MOCK_DATA);
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [filterFrom, setFilterFrom]     = useState('');
  const [filterTo, setFilterTo]         = useState('');

  const filtered = data.filter(r => {
    const matchSearch = searchText === '' || Object.values(r).some(v => String(v).toLowerCase().includes(searchText.toLowerCase()));
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchPeriod = periodFilter === 'all' || r.allocationPeriod.includes(periodFilter);
    return matchSearch && matchStatus && matchPeriod;
  });

  const toggleRow = (id: number) => setSelectedRows(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAll = () => setSelectedRows(selectedRows.length === filtered.length ? [] : filtered.map(r => r.id));

  const completedCount   = data.filter(r => r.status === 'completed').length;
  const failedCount      = data.filter(r => r.status === 'failed').length;
  const simulationCount  = data.filter(r => r.status === 'simulation').length;
  const inProgressCount  = data.filter(r => r.status === 'in_progress').length;

  const handleDelete = () => {
    if (selectedRows.length === 0) {
      toast.warning('Vui lòng chọn ít nhất 1 dòng');
      return;
    }
    toast.success(`Đã xóa ${selectedRows.length} bản ghi`);
    setSelectedRows([]);
  };

  const handleClearFilter = () => {
    setStatusFilter('all');
    setPeriodFilter('all');
    setFilterFrom('');
    setFilterTo('');
    setSearchText('');
  };

  return (
    <div className="p-6">
      {/* ── Page Title ─────────────────────────────────────────────── */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">{t.nav.allocationHistory}</h1>
        <p className="text-sm text-gray-600 mt-1">Kế toán tổng hợp — Lịch sử các đợt phân bổ chi phí</p>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatsCard title="Hoàn thành" value={completedCount} icon={CheckCircle} bgColor="text-green-500" iconBgColor="bg-green-50" />
        <StatsCard title="Thất bại" value={failedCount} icon={XCircle} bgColor="text-red-500" iconBgColor="bg-red-50" />
        <StatsCard title="Mô phỏng" value={simulationCount} icon={Eye} bgColor="text-blue-500" iconBgColor="bg-blue-50" />
        <StatsCard title="Đang chạy" value={inProgressCount} icon={Clock} bgColor="text-orange-500" iconBgColor="bg-orange-50" />
      </div>

      {/* ── Filter Section ─────────────────────────────────────────── */}
      <div className="bg-white border rounded-lg mb-4 p-4">
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-3">
            <label className="block text-sm mb-1">Từ ngày chạy</label>
            <Input
              type="date"
              value={filterFrom}
              onChange={e => setFilterFrom(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm mb-1">Đến ngày chạy</label>
            <Input
              type="date"
              value={filterTo}
              onChange={e => setFilterTo(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm mb-1">Trạng thái</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Tất cả" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="failed">Thất bại</SelectItem>
                <SelectItem value="simulation">Mô phỏng</SelectItem>
                <SelectItem value="in_progress">Đang chạy</SelectItem>
                <SelectItem value="reversed">Đã reverse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-3">
            <label className="block text-sm mb-1">Kỳ phân bổ</label>
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Tất cả" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả kỳ</SelectItem>
                <SelectItem value="2026">Năm 2026</SelectItem>
                <SelectItem value="2025">Năm 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClearFilter}>Clear All Filter</Button>
        </div>
      </div>

      {/* ── Toolbar ────────────────────────────────────────────────── */}
      <MasterDataToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={() => toast.info('Tạo allocation mới')}
        onDeleteRows={handleDelete}
        onSave={() => toast.success('Lưu thành công')}
        selectedCount={selectedRows.length}
        addRowLabel="+ Thêm dòng"
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
                <th className="px-4 py-2 text-left text-sm text-blue-700">BATCH ID ↑↓</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">KỲ PHÂN BỔ</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">CÔNG TY</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">LOẠI PHÂN BỔ</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">RUN TYPE</th>
                <th className="px-4 py-2 text-right text-sm text-blue-700">TỔNG SỐ TIỀN (VND)</th>
                <th className="px-4 py-2 text-right text-sm text-blue-700">SỐ DÒNG</th>
                <th className="px-4 py-2 text-center text-sm text-blue-700">TRẠNG THÁI</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">NGÀY CHẠY</th>
                <th className="px-4 py-2 text-left text-sm text-blue-700">NGƯỜI CHẠY</th>
                <th className="px-4 py-2 text-center text-sm text-blue-700">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center py-12 text-gray-400 text-sm">
                    Không tìm thấy dữ liệu
                  </td>
                </tr>
              ) : (
                filtered.map(row => {
                  const st = statusMap[row.status];
                  return (
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
                        {row.batchId}
                      </td>
                      <td className="px-4 py-2.5 text-sm">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                          {row.allocationPeriod}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-sm text-gray-600">{row.company}</td>
                      <td className="px-4 py-2.5 text-sm text-gray-700">{row.allocationType}</td>
                      <td className="px-4 py-2.5 text-sm">
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
                          {row.runType}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-sm text-right font-medium tabular-nums text-gray-700 whitespace-nowrap">
                        {fmtCurrency(row.totalAmount)}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-right tabular-nums text-gray-600 whitespace-nowrap">
                        {row.recordsCount}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={st.cls}>{st.label}</span>
                      </td>
                      <td className="px-4 py-2.5 text-sm text-gray-500 tabular-nums whitespace-nowrap">
                        {row.createdDate}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-gray-400">
                        {row.createdBy}
                      </td>
                      <td className="px-4 py-2.5 text-center" onClick={e => e.stopPropagation()}>
                        <button
                          className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Xem chi tiết"
                          onClick={() => toast.info(`Xem: ${row.batchId}`)}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
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
            Tổng phân bổ (hoàn thành):{' '}
            <span className="font-semibold text-green-600">
              {fmtCurrency(data.filter(r => r.status === 'completed').reduce((a, b) => a + b.totalAmount, 0))} VND
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}