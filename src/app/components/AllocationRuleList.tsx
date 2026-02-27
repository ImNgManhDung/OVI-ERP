import { useState } from 'react';
import { Search, Eye, Pencil } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import MasterDataToolbar from './MasterDataToolbar';
import { useLanguage } from '../i18n/LanguageContext';
import { toast } from 'sonner';

interface AllocationRuleListProps {
  onCreateClick: () => void;
  onViewClick?: (ruleId: string) => void;
}

interface AllocationRuleRow {
  id: number;
  ruleId: string;
  allocationName: string;
  allocationType: string;
  effectiveDate: string;
  expiryDate: string;
  status: 'active' | 'inactive' | 'draft' | 'expired';
  createdBy: string;
  createdDate: string;
}

const MOCK_DATA: AllocationRuleRow[] = [
  { id: 1, ruleId: 'RUL-2026-001', allocationName: 'Phân bổ chi phí chung theo doanh thu',      allocationType: 'Tỷ lệ doanh thu',  effectiveDate: '01/01/2026', expiryDate: '31/12/2026', status: 'active',   createdBy: 'admin',  createdDate: '02/01/2026' },
  { id: 2, ruleId: 'RUL-2026-002', allocationName: 'Phân bổ chi phí điện nước theo diện tích',  allocationType: 'Tỷ lệ diện tích', effectiveDate: '01/01/2026', expiryDate: '31/12/2026', status: 'active',   createdBy: 'acc01', createdDate: '05/01/2026' },
  { id: 3, ruleId: 'RUL-2026-003', allocationName: 'Phân bổ lương gián tiếp theo nhân viên',    allocationType: 'Số nhân viên',    effectiveDate: '01/02/2026', expiryDate: '31/12/2026', status: 'active',   createdBy: 'acc01', createdDate: '15/01/2026' },
  { id: 4, ruleId: 'RUL-2026-004', allocationName: 'Phân bổ khấu hao thiết bị IT',              allocationType: 'Tỷ lệ cố định',   effectiveDate: '01/01/2026', expiryDate: '31/12/2026', status: 'draft',    createdBy: 'acc02', createdDate: '20/01/2026' },
  { id: 5, ruleId: 'RUL-2025-012', allocationName: 'Phân bổ chi phí đào tạo 2025',              allocationType: 'Tỷ lệ cố định',   effectiveDate: '01/01/2025', expiryDate: '31/12/2025', status: 'expired',  createdBy: 'admin',  createdDate: '03/01/2025' },
  { id: 6, ruleId: 'RUL-2026-005', allocationName: 'Phân bổ chi phí vận chuyển',                allocationType: 'Theo giờ máy',    effectiveDate: '01/03/2026', expiryDate: '31/12/2026', status: 'inactive', createdBy: 'acc02', createdDate: '22/01/2026' },
];

const STATUS_BADGE: Record<AllocationRuleRow['status'], { cls: string; label: string }> = {
  active:   { cls: 'erp-badge-success', label: 'Đang hoạt động' },
  inactive: { cls: 'erp-badge-neutral', label: 'Ngừng hoạt động' },
  draft:    { cls: 'erp-badge-warning', label: 'Nháp' },
  expired:  { cls: 'erp-badge-danger',  label: 'Hết hạn' },
};

export default function AllocationRuleList({ onCreateClick, onViewClick }: AllocationRuleListProps) {
  const { t } = useLanguage();

  const [data, setData]                   = useState<AllocationRuleRow[]>(MOCK_DATA);
  const [searchText, setSearchText]       = useState('');
  const [selectedRows, setSelectedRows]   = useState<number[]>([]);

  const filtered = data.filter(r => {
    const matchSearch = !searchText || Object.values(r).some(v =>
      String(v).toLowerCase().includes(searchText.toLowerCase())
    );
    return matchSearch;
  });

  const toggleRow = (id: number) =>
    setSelectedRows(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAll = () =>
    setSelectedRows(selectedRows.length === filtered.length ? [] : filtered.map(r => r.id));

  const handleDelete = () => {
    if (!selectedRows.length) { toast.warning('Vui lòng chọn ít nhất 1 dòng'); return; }
    setData(prev => prev.filter(r => !selectedRows.includes(r.id)));
    setSelectedRows([]);
    toast.success(`Đã xóa ${selectedRows.length} quy tắc`);
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 uppercase tracking-tight">{t.nav.allocationRule ?? 'QUẢN LÝ QUY TẮC PHÂN BỔ'}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure allocation rules for cost distribution across departments
        </p>
      </div>

      <MasterDataToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={onCreateClick}
        onDeleteRows={handleDelete}
        onSave={() => toast.success('Lưu thành công')}
        selectedCount={selectedRows.length}
        addRowLabel="+ Tạo quy tắc mới"
      />

      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[2000px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#f0f7ff] border-b">
                <th className="px-3 py-3 text-center w-12 border-r bg-[#f0f7ff] sticky left-0 z-20">
                  <Checkbox
                    checked={filtered.length > 0 && selectedRows.length === filtered.length}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40 bg-[#f0f7ff] sticky left-12 z-20">Rule ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-80">Tên phân bổ</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Loại phân bổ</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Ngày hiệu lực</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Ngày hết hạn</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-40">Trạng thái</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Người tạo</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Ngày tạo</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-3 py-12 text-center text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>Không tìm thấy dữ liệu</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(row => (
                  <tr
                    key={row.id}
                    className={`border-b hover:bg-blue-50/50 transition-colors ${selectedRows.includes(row.id) ? 'bg-blue-50' : 'bg-white'}`}
                    onClick={() => toggleRow(row.id)}
                  >
                    <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10" onClick={e => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRow(row.id)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10">
                      <span
                        className="text-blue-600 hover:underline cursor-pointer font-bold"
                        onClick={e => { e.stopPropagation(); onViewClick?.(row.ruleId); }}
                      >
                        {row.ruleId}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-r text-gray-700 font-medium">{row.allocationName}</td>
                    <td className="px-3 py-2 border-r">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">
                        {row.allocationType}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-r tabular-nums text-gray-600">{row.effectiveDate}</td>
                    <td className="px-3 py-2 border-r tabular-nums text-gray-600">{row.expiryDate}</td>
                    <td className="px-3 py-2 border-r text-center">
                      <span className={STATUS_BADGE[row.status].cls}>{STATUS_BADGE[row.status].label}</span>
                    </td>
                    <td className="px-3 py-2 border-r text-gray-500">{row.createdBy}</td>
                    <td className="px-3 py-2 border-r tabular-nums text-gray-500">{row.createdDate}</td>
                    <td className="px-3 py-2 text-center" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="text-blue-500 hover:bg-blue-50 p-1 rounded"
                          onClick={() => onViewClick?.(row.ruleId)}
                          title="Xem"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="text-gray-400 hover:bg-gray-100 p-1 rounded"
                          onClick={onCreateClick}
                          title="Sửa"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between text-xs text-gray-600">
          <div>
            Showing <span className="font-semibold">{filtered.length}</span> of <span className="font-semibold">{data.length}</span> allocation rules
          </div>
          <div className="flex items-center gap-4">
            <span>{selectedRows.length} selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}