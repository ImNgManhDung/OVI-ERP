import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import MasterDataToolbar from './MasterDataToolbar';
import { useLanguage } from '../i18n/LanguageContext';
import { toast } from 'sonner';

interface AllocationDeclarationRow {
  id: number;
  allocationCode: string;
  allocationName: string;
  expenseType: string;
  allocationMethod: string;
  allocationPeriod: string;
  defaultCostCenter: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'draft';
}

const EXPENSE_TYPES   = ['Utilities', 'Rent', 'Insurance', 'Depreciation', 'Labor', 'Transport', 'Marketing', 'Training', 'Other'];
const METHODS         = ['Tỷ lệ cố định', 'Theo doanh thu', 'Theo số nhân viên', 'Theo diện tích', 'Theo giờ máy', 'Thủ công'];
const PERIODS         = ['Hàng tháng', 'Hàng quý', 'Hàng năm', 'Một lần'];
const COST_CENTERS    = ['CCE-001 Admin', 'CCE-002 IT', 'CCE-003 Finance', 'CCE-004 Logistics', 'CCE-005 Prod', 'CCE-006 Sales'];

const MOCK_DATA: AllocationDeclarationRow[] = [
  { id: 1, allocationCode: 'ALC-001', allocationName: 'Phân bổ chi phí điện nước',    expenseType: 'Utilities',    allocationMethod: 'Theo diện tích',       allocationPeriod: 'Hàng tháng', defaultCostCenter: 'CCE-001 Admin', startDate: '01/01/2026', endDate: '31/12/2026', status: 'active' },
  { id: 2, allocationCode: 'ALC-002', allocationName: 'Phân bổ chi phí thuê VP',     expenseType: 'Rent',         allocationMethod: 'Theo số nhân viên',    allocationPeriod: 'Hàng tháng', defaultCostCenter: 'CCE-001 Admin', startDate: '01/01/2026', endDate: '31/12/2026', status: 'active' },
  { id: 3, allocationCode: 'ALC-003', allocationName: 'Phân bổ chi phí khấu hao',    expenseType: 'Depreciation', allocationMethod: 'Tỷ lệ cố định',       allocationPeriod: 'Hàng tháng', defaultCostCenter: 'CCE-002 IT',    startDate: '01/01/2026', endDate: '31/12/2026', status: 'active' },
  { id: 4, allocationCode: 'ALC-004', allocationName: 'Phân bổ lương gián tiếp',     expenseType: 'Labor',        allocationMethod: 'Theo doanh thu',       allocationPeriod: 'Hàng quý',   defaultCostCenter: 'CCE-005 Prod',  startDate: '01/01/2026', endDate: '31/12/2026', status: 'active' },
  { id: 5, allocationCode: 'ALC-005', allocationName: 'Phân bổ chi phí marketing',   expenseType: 'Marketing',    allocationMethod: 'Theo doanh thu',       allocationPeriod: 'Hàng tháng', defaultCostCenter: 'CCE-006 Sales', startDate: '01/01/2026', endDate: '31/12/2026', status: 'draft' },
  { id: 6, allocationCode: 'ALC-006', allocationName: 'Phân bổ chi phí bảo hiểm',   expenseType: 'Insurance',    allocationMethod: 'Tỷ lệ cố định',       allocationPeriod: 'Hàng năm',   defaultCostCenter: 'CCE-003 Finance',startDate: '01/01/2026', endDate: '31/12/2026', status: 'active' },
  { id: 7, allocationCode: 'ALC-007', allocationName: 'Phân bổ chi phí đào tạo',     expenseType: 'Training',     allocationMethod: 'Theo số nhân viên',    allocationPeriod: 'Một lần',    defaultCostCenter: 'CCE-001 Admin', startDate: '01/01/2026', endDate: '30/06/2026', status: 'inactive' },
];

const StatusBadge = ({ status }: { status: AllocationDeclarationRow['status'] }) => {
  const map = {
    active:   { cls: 'erp-badge-success', label: 'Đang hoạt động' },
    inactive: { cls: 'erp-badge-neutral', label: 'Ngừng hoạt động' },
    draft:    { cls: 'erp-badge-warning', label: 'Nháp' },
  };
  const { cls, label } = map[status];
  return <span className={cls}>{label}</span>;
};

export default function AllocationDeclarationList() {
  const { t } = useLanguage();
  const [searchText, setSearchText]     = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [data, setData]                 = useState<AllocationDeclarationRow[]>(MOCK_DATA);
  const [editMode, setEditMode]         = useState(false);

  const filtered = data.filter(row =>
    searchText === '' || Object.values(row).some(v => String(v).toLowerCase().includes(searchText.toLowerCase()))
  );

  const toggleRow = (id: number) => setSelectedRows(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAll = () => setSelectedRows(selectedRows.length === filtered.length ? [] : filtered.map(r => r.id));

  const handleAddRow = () => {
    const newRow: AllocationDeclarationRow = {
      id: Date.now(),
      allocationCode:    `ALC-${String(data.length + 1).padStart(3, '0')}`,
      allocationName:    '',
      expenseType:       '',
      allocationMethod:  '',
      allocationPeriod:  '',
      defaultCostCenter: '',
      startDate:         '',
      endDate:           '',
      status:            'draft',
    };
    setData(prev => [...prev, newRow]);
    setEditMode(true);
    setSelectedRows([newRow.id]);
  };

  const handleDelete = () => {
    if (selectedRows.length === 0) { toast.warning('Vui lòng chọn ít nhất 1 dòng'); return; }
    setData(prev => prev.filter(r => !selectedRows.includes(r.id)));
    setSelectedRows([]);
    toast.success(`Đã xóa ${selectedRows.length} dòng`);
  };

  const handleSave = () => {
    setEditMode(false);
    toast.success('Lưu thành công');
  };

  const updateCell = <K extends keyof AllocationDeclarationRow>(id: number, field: K, value: AllocationDeclarationRow[K]) => {
    setData(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  return (
    <div className="erp-page">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="erp-page-header mb-5">
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
            {t.nav.allocationDeclaration}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
            Kế toán tổng hợp — Khai báo quy tắc chi phí cần phân bổ
          </p>
        </div>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <MasterDataToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDelete}
        onSave={handleSave}
        selectedCount={selectedRows.length}
        addRowLabel="+ Thêm khai báo"
      />

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="erp-card rounded-t-none border-t-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full erp-table" style={{ minWidth: '1200px' }}>
            <thead>
              <tr>
                <th className="w-10 text-center">
                  <Checkbox
                    checked={filtered.length > 0 && selectedRows.length === filtered.length}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="text-left">Mã phân bổ</th>
                <th className="text-left">Tên phân bổ</th>
                <th className="text-left">Loại chi phí</th>
                <th className="text-left">Phương pháp phân bổ</th>
                <th className="text-left">Kỳ phân bổ</th>
                <th className="text-left">TTCP mặc định</th>
                <th className="text-left">Ngày bắt đầu</th>
                <th className="text-left">Ngày kết thúc</th>
                <th className="text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-gray-400 text-xs">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filtered.map(row => (
                  <tr
                    key={row.id}
                    className={selectedRows.includes(row.id) ? 'selected' : ''}
                    onClick={() => toggleRow(row.id)}
                  >
                    <td className="text-center" onClick={e => e.stopPropagation()}>
                      <Checkbox checked={selectedRows.includes(row.id)} onCheckedChange={() => toggleRow(row.id)} />
                    </td>

                    {/* Allocation Code – read-only */}
                    <td className="font-mono text-xs text-blue-600">{row.allocationCode}</td>

                    {/* Allocation Name */}
                    <td onClick={e => e.stopPropagation()}>
                      {editMode && selectedRows.includes(row.id) ? (
                        <Input className="h-7 text-xs" value={row.allocationName}
                          onChange={e => updateCell(row.id, 'allocationName', e.target.value)} />
                      ) : (
                        <span className="text-gray-700">{row.allocationName}</span>
                      )}
                    </td>

                    {/* Expense Type */}
                    <td onClick={e => e.stopPropagation()}>
                      {editMode && selectedRows.includes(row.id) ? (
                        <Select value={row.expenseType} onValueChange={v => updateCell(row.id, 'expenseType', v)}>
                          <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>{EXPENSE_TYPES.map(et => <SelectItem key={et} value={et}>{et}</SelectItem>)}</SelectContent>
                        </Select>
                      ) : (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{row.expenseType}</span>
                      )}
                    </td>

                    {/* Allocation Method */}
                    <td onClick={e => e.stopPropagation()}>
                      {editMode && selectedRows.includes(row.id) ? (
                        <Select value={row.allocationMethod} onValueChange={v => updateCell(row.id, 'allocationMethod', v)}>
                          <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>{METHODS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                        </Select>
                      ) : (
                        <span className="text-gray-600">{row.allocationMethod}</span>
                      )}
                    </td>

                    {/* Allocation Period */}
                    <td onClick={e => e.stopPropagation()}>
                      {editMode && selectedRows.includes(row.id) ? (
                        <Select value={row.allocationPeriod} onValueChange={v => updateCell(row.id, 'allocationPeriod', v)}>
                          <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>{PERIODS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                        </Select>
                      ) : (
                        <span className="text-gray-600">{row.allocationPeriod}</span>
                      )}
                    </td>

                    {/* Default Cost Center */}
                    <td onClick={e => e.stopPropagation()}>
                      {editMode && selectedRows.includes(row.id) ? (
                        <Select value={row.defaultCostCenter} onValueChange={v => updateCell(row.id, 'defaultCostCenter', v)}>
                          <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>{COST_CENTERS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                      ) : (
                        <span className="text-gray-600">{row.defaultCostCenter}</span>
                      )}
                    </td>

                    {/* Start Date */}
                    <td onClick={e => e.stopPropagation()}>
                      {editMode && selectedRows.includes(row.id) ? (
                        <Input type="date" className="h-7 text-xs w-32" value={row.startDate.split('/').reverse().join('-')}
                          onChange={e => updateCell(row.id, 'startDate', e.target.value.split('-').reverse().join('/'))} />
                      ) : (
                        <span className="text-gray-500 tabular-nums">{row.startDate}</span>
                      )}
                    </td>

                    {/* End Date */}
                    <td onClick={e => e.stopPropagation()}>
                      {editMode && selectedRows.includes(row.id) ? (
                        <Input type="date" className="h-7 text-xs w-32" value={row.endDate.split('/').reverse().join('-')}
                          onChange={e => updateCell(row.id, 'endDate', e.target.value.split('-').reverse().join('/'))} />
                      ) : (
                        <span className="text-gray-500 tabular-nums">{row.endDate}</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="text-center" onClick={e => e.stopPropagation()}>
                      {editMode && selectedRows.includes(row.id) ? (
                        <Select value={row.status} onValueChange={v => updateCell(row.id, 'status', v as any)}>
                          <SelectTrigger className="h-7 text-xs w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Đang hoạt động</SelectItem>
                            <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                            <SelectItem value="draft">Nháp</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <StatusBadge status={row.status} />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-gray-50 bg-gray-50/50">
          <span className="text-xs text-gray-400">
            {filtered.length} khai báo{selectedRows.length > 0 && ` · ${selectedRows.length} đã chọn`}
          </span>
        </div>
      </div>
    </div>
  );
}
