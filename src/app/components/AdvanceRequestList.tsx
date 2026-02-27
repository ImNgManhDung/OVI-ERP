import { useState } from 'react';
import { CheckCircle, FileText, AlertTriangle, XCircle, Plus, Edit2, Trash2, Search as SearchIcon, Pencil, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import CreateAdvanceRequest from './CreateAdvanceRequest';
import { useLanguage } from '../i18n/LanguageContext';
import { FilterPanel } from './FilterPanel';
import { StatsCard } from './StatsCard';

interface AdvanceRequestRow {
  id: number;
  areId: string;
  apeNumber: string;
  docDate: string;
  legalEntity: string;
  apeType: string;
  partnerType: string;
  partnerId: string;
  partnerName: string;
  reqAmount: number;
  approvedAmount: number;
  paidAmount: number;
  clearedAmount: number;
  currency: string;
  status: string;
  description: string;
  expectedDate: string;
  dueDate: string;
  createdBy: string;
  createdDate: string;
}

export default function AdvanceRequestList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [partnerFilter, setPartnerFilter] = useState('all');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const { t } = useLanguage();

  const [data, setData] = useState<AdvanceRequestRow[]>([
    {
      id: 1,
      areId: 'ARE001',
      apeNumber: 'EMP-0126-001',
      docDate: '2026-01-15',
      legalEntity: 'CÔNG TY CP ABC',
      apeType: 'Tạm ứng công tác',
      partnerType: 'EMP',
      partnerId: 'NV001',
      partnerName: 'NGUYỄN VĂN A',
      reqAmount: 10000000,
      approvedAmount: 10000000,
      paidAmount: 10000000,
      clearedAmount: 9500000,
      currency: 'VND',
      status: 'Approved',
      description: 'Tạm ứng công tác Hà Nội',
      expectedDate: '2026-01-20',
      dueDate: '2026-02-15',
      createdBy: 'admin',
      createdDate: '2026-01-15'
    },
    {
      id: 2,
      areId: 'ARE002',
      apeNumber: 'VEND-0126-001',
      docDate: '2026-01-18',
      legalEntity: 'CÔNG TY CP ABC',
      apeType: 'Tạm ứng hợp đồng',
      partnerType: 'VEND',
      partnerId: 'NCC001',
      partnerName: 'CÔNG TY XYZ',
      reqAmount: 50000000,
      approvedAmount: 45000000,
      paidAmount: 45000000,
      clearedAmount: 0,
      currency: 'VND',
      status: 'Approved',
      description: 'Tạm ứng 30% hợp đồng mua nguyên vật liệu',
      expectedDate: '2026-01-25',
      dueDate: '2026-03-25',
      createdBy: 'admin',
      createdDate: '2026-01-18'
    },
    {
      id: 3,
      areId: 'ARE003',
      apeNumber: 'EMP-0126-002',
      docDate: '2026-01-20',
      legalEntity: 'CÔNG TY CP ABC',
      apeType: 'Tạm ứng tiếp khách',
      partnerType: 'EMP',
      partnerId: 'NV002',
      partnerName: 'TRẦN THỊ B',
      reqAmount: 5000000,
      approvedAmount: 5000000,
      paidAmount: 0,
      clearedAmount: 0,
      currency: 'VND',
      status: 'Draft',
      description: 'Tiếp khách đối tác chiến lược',
      expectedDate: '2026-01-22',
      dueDate: '2026-02-22',
      createdBy: 'admin',
      createdDate: '2026-01-20'
    }
  ]);

  // KPI counts
  const draftCount = data.filter(r => r.status === 'Draft').length;
  const approvedCount = data.filter(r => r.status === 'Approved').length;
  const pendingCount = data.filter(r => r.status === 'Pending').length;
  const rejectedCount = data.filter(r => r.status === 'Rejected').length;

  const handleEdit = (row: AdvanceRequestRow) => {
    setEditData(row);
    setShowCreateForm(true);
  };

  const handleDelete = () => {
    if (selectedRows.length === 0) {
      toast.warning('Vui lòng chọn ít nhất 1 dòng');
      return;
    }
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    toast.success(`Đã xóa ${selectedRows.length} bản ghi`);
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredData.length && filteredData.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(r => r.id));
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN');
  };

  const filteredData = data.filter(row => {
    const matchSearch = !searchText || 
      Object.values(row).some(v => 
        String(v).toLowerCase().includes(searchText.toLowerCase())
      );
    const matchStatus = statusFilter === 'all' || row.status === statusFilter;
    const matchType = typeFilter === 'all' || row.apeType === typeFilter;
    const matchPartner = partnerFilter === 'all' || row.partnerType === partnerFilter;
    return matchSearch && matchStatus && matchType && matchPartner;
  });

  const filterOptions = [
    {
      label: t.tem.fromDate || 'From Date',
      type: 'date' as const,
      value: filterFrom,
    },
    {
      label: t.tem.toDate || 'To Date',
      type: 'date' as const,
      value: filterTo,
    },
    {
      label: t.tem.status || 'Status',
      type: 'select' as const,
      options: ['All', 'Draft', 'Pending', 'Approved', 'Rejected'],
      value: statusFilter,
    },
    {
      label: t.tem.apeType || 'Type',
      type: 'select' as const,
      options: ['All', 'Tạm ứng công tác', 'Tạm ứng hợp đồng', 'Tạm ứng tiếp khách'],
      value: typeFilter,
    },
    {
      label: t.tem.partnerType || 'Partner Type',
      type: 'select' as const,
      options: ['All', 'EMP', 'VEND'],
      value: partnerFilter,
    },
  ];

  if (showCreateForm) {
    return <CreateAdvanceRequest onClose={() => { setShowCreateForm(false); setEditData(null); }} data={editData} />;
  }

  return (
    <div className="flex gap-6 p-6">
      {/* Left: Filter Panel */}
      <FilterPanel
        title={t.tem.filterOptions || "Filter Options"}
        filters={filterOptions}
        onClearAll={() => {
          setStatusFilter('all');
          setTypeFilter('all');
          setPartnerFilter('all');
          setFilterFrom('');
          setFilterTo('');
        }}
      />

      {/* Right: Main Content */}
      <div className="flex-1">
        {/* Page Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">{t.tem.advanceRequest || 'ADVANCE REQUEST'}</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard
            title={t.tem.draft || "DRAFT"}
            value={draftCount}
            icon={FileText}
            bgColor="text-gray-600"
            iconBgColor="bg-gray-50"
          />
          <StatsCard
            title={t.tem.pending || "PENDING"}
            value={pendingCount}
            icon={AlertTriangle}
            bgColor="text-orange-600"
            iconBgColor="bg-orange-50"
          />
          <StatsCard
            title={t.tem.approved || "APPROVED"}
            value={approvedCount}
            icon={CheckCircle}
            bgColor="text-green-600"
            iconBgColor="bg-green-50"
          />
          <StatsCard
            title={t.tem.rejected || "REJECTED"}
            value={rejectedCount}
            icon={XCircle}
            bgColor="text-red-600"
            iconBgColor="bg-red-50"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
            disabled={selectedRows.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {t.tem.delete || 'Delete'}
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="w-4 h-4 mr-1" />
            {t.tem.create || 'Create'}
          </Button>
        </div>

        {/* Search Bar */}
        <div className="bg-white border rounded-t-lg p-3 flex items-center gap-2">
          <SearchIcon className="w-4 h-4 text-gray-500" />
          <Input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder={t.tem.search || 'Search'}
            className="h-9"
          />
        </div>

        {/* Table */}
        <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 border-b">
                  <th className="px-3 py-2 text-center w-10">
                    <Checkbox
                      checked={filteredData.length > 0 && selectedRows.length === filteredData.length}
                      onCheckedChange={toggleAllRows}
                    />
                  </th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">ARE ID ↑↓</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">APE Number</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Ngày chứng từ</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Loại tạm ứng</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Đối tác</th>
                  <th className="px-4 py-2 text-right text-sm text-blue-700">Số tiền yêu cầu</th>
                  <th className="px-4 py-2 text-right text-sm text-blue-700">Số tiền đã duyệt</th>
                  <th className="px-4 py-2 text-right text-sm text-blue-700">Đã thanh toán</th>
                  <th className="px-4 py-2 text-right text-sm text-blue-700">Đã quyết toán</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Tiền tệ</th>
                  <th className="px-4 py-2 text-center text-sm text-blue-700">Trạng thái</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Mô tả</th>
                  <th className="px-4 py-2 text-center text-sm text-blue-700">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="text-center py-12 text-gray-400 text-sm">
                      {t.tem.noRecordsFound}
                    </td>
                  </tr>
                ) : (
                  filteredData.map(row => (
                    <tr
                      key={row.id}
                      className={`border-b hover:bg-gray-50 cursor-pointer ${selectedRows.includes(row.id) ? 'bg-blue-50' : ''}`}
                      onClick={() => toggleRowSelection(row.id)}
                    >
                      <td className="px-3 py-2.5 text-center" onClick={e => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() => toggleRowSelection(row.id)}
                        />
                      </td>
                      <td className="px-4 py-2.5 text-sm font-medium text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                        {row.areId}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-gray-900 font-mono whitespace-nowrap">
                        {row.apeNumber}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-gray-500 tabular-nums whitespace-nowrap">
                        {row.docDate}
                      </td>
                      <td className="px-4 py-2.5 text-sm">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                          {row.apeType}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-sm">
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-medium">{row.partnerName}</span>
                          <span className="text-xs text-gray-500">{row.partnerType} · {row.partnerId}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-sm text-right font-medium tabular-nums text-gray-700 whitespace-nowrap">
                        {formatCurrency(row.reqAmount)}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-right font-medium tabular-nums text-gray-700 whitespace-nowrap">
                        {formatCurrency(row.approvedAmount)}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-right font-medium tabular-nums text-green-600 whitespace-nowrap">
                        {formatCurrency(row.paidAmount)}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-right font-medium tabular-nums text-blue-600 whitespace-nowrap">
                        {formatCurrency(row.clearedAmount)}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-gray-600">
                        {row.currency}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : row.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : row.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-sm text-gray-600 max-w-[200px] truncate">
                        {row.description}
                      </td>
                      <td className="px-4 py-2.5 text-center" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Chỉnh sửa"
                            onClick={() => handleEdit(row)}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Xem chi tiết"
                            onClick={() => toast.info(`Xem: ${row.areId}`)}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
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
              {filteredData.length} bản ghi{selectedRows.length > 0 && ` · ${selectedRows.length} đã chọn`}
            </span>
            <span className="text-xs text-gray-500">
              Tổng yêu cầu:{' '}
              <span className="font-semibold text-blue-600">
                {formatCurrency(
                  filteredData.reduce((a, b) => a + b.reqAmount, 0)
                )} VND
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}