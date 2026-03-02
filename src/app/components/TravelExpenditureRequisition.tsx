import { useState } from 'react';
import { Plus, Search, Download, List, Grid3x3, RefreshCw, MoreVertical, Save, CheckCircle, FileText, AlertTriangle, XCircle } from 'lucide-react';
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
import CreateTravelExpenditureRequisition from './CreateTravelExpenditureRequisition';
import CreateAdvanceRequest from './CreateAdvanceRequest';
import { useLanguage } from '../i18n/LanguageContext';
import { FilterPanel } from './FilterPanel';
import { StatsCard } from './StatsCard';

interface RequisitionRow {
  id: number;
  requestId: string;
  employee: string;
  department: string;
  type: string;
  destination: string;
  amount: number;
  status: string;
  date: string;
}

export default function TravelExpenditureRequisition() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPaymentRequest, setShowPaymentRequest] = useState(false);
  const [paymentRequestData, setPaymentRequestData] = useState<any>(null);
  const { t } = useLanguage();

  const [requisitions, setRequisitions] = useState<RequisitionRow[]>([
    {
      id: 1,
      requestId: 'TER-2025-001',
      employee: 'Nguyễn Văn A',
      department: 'Kế toán',
      type: 'Công tác',
      destination: 'Hà Nội',
      amount: 5000000,
      status: 'Pending',
      date: '2025-01-15',
    },
    {
      id: 2,
      requestId: 'TER-2025-002',
      employee: 'Trần Thị B',
      department: 'Nhân sự',
      type: 'Đi công tác nước ngoài',
      destination: 'Singapore',
      amount: 15000000,
      status: 'Approved',
      date: '2025-01-14',
    },
    {
      id: 3,
      requestId: 'TER-2025-003',
      employee: 'Lê Văn C',
      department: 'Marketing',
      type: 'Công tác',
      destination: 'TP. Hồ Chí Minh',
      amount: 3500000,
      status: 'Rejected',
      date: '2025-01-13',
    },
    {
      id: 4,
      requestId: 'TER-2025-004',
      employee: 'Phạm Thị D',
      department: 'IT',
      type: 'Đi công tác trong nước',
      destination: 'Đà Nẵng',
      amount: 4200000,
      status: 'Pending',
      date: '2025-01-12',
    },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredRequisitions.length && filteredRequisitions.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredRequisitions.map(r => r.id));
    }
  };

  const filteredRequisitions = requisitions.filter(row => {
    const matchSearch = searchText === '' ||
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      );
    const matchStatus = statusFilter === 'all' || row.status === statusFilter;
    const matchType = typeFilter === 'all' || row.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const formatCurrency = (value: number) => value.toLocaleString('vi-VN');

  // KPI counts
  const pendingCount = requisitions.filter(r => r.status === 'Pending').length;
  const approvedCount = requisitions.filter(r => r.status === 'Approved').length;
  const rejectedCount = requisitions.filter(r => r.status === 'Rejected').length;
  const draftCount = requisitions.filter(r => r.status === 'Draft').length;

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Draft', label: 'Draft' },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Công tác', label: 'Công tác' },
    { value: 'Đi công tác trong nước', label: 'Đi công tác trong nước' },
    { value: 'Đi công tác nước ngoài', label: 'Đi công tác nước ngoài' },
  ];

  if (showCreateForm) {
    return (
      <CreateTravelExpenditureRequisition
        onClose={() => setShowCreateForm(false)}
        onNavigateToPaymentRequest={(data) => {
          setPaymentRequestData(data);
          setShowCreateForm(false);
          setShowPaymentRequest(true);
        }}
      />
    );
  }

  if (showPaymentRequest) {
    return (
      <CreateAdvanceRequest
        onClose={() => setShowPaymentRequest(false)}
        data={paymentRequestData}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Filter Panel - Left Sidebar (same as Invoice FCM) */}
      <FilterPanel
        searchValue={searchText}
        onSearchChange={setSearchText}
        statusOptions={statusOptions}
        selectedStatus={statusFilter}
        onStatusChange={setStatusFilter}
        typeOptions={typeOptions}
        selectedType={typeFilter}
        onTypeChange={setTypeFilter}
        showStatus={true}
        showType={true}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">{t.tem.travelRequisitionList || 'Yêu cầu Công tác'}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {t.tem.travelRequisitionSubtitle || 'Quản lý yêu cầu công tác và tạm ứng'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center gap-12">
            <StatsCard label="PENDING" value={pendingCount} color="orange" />
            <StatsCard label="APPROVED" value={approvedCount} color="green" />
            <StatsCard label="REJECTED" value={rejectedCount} color="red" />
            <StatsCard label="DRAFT" value={draftCount} color="gray" />
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              {t.tem.createTravelReq || '+ Tạo yêu cầu công tác'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPaymentRequest(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Payment Request
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><List className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm"><Grid3x3 className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm"><RefreshCw className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
          <table className="w-full text-sm min-w-[1200px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-50 border-b">
                <th className="px-3 py-3 text-left w-12 border-r bg-gray-50 sticky left-0 z-20">
                  <Checkbox
                    checked={selectedRows.length === filteredRequisitions.length && filteredRequisitions.length > 0}
                    onCheckedChange={toggleAllRows}
                  />
                </th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-40 bg-gray-50 sticky left-12 z-20">Mã yêu cầu</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-48">Nhân viên</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-32">Phòng ban</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-56">Loại</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-48">Điểm đến</th>
                <th className="px-3 py-3 text-right text-gray-700 font-semibold border-r w-36">Số tiền</th>
                <th className="px-3 py-3 text-center text-gray-700 font-semibold border-r w-28">Trạng thái</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-32">Ngày</th>
                <th className="px-3 py-3 text-center text-gray-700 font-semibold w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequisitions.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>{t.tem.noRecordsFound || 'No records found'}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRequisitions.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10 font-semibold text-blue-600">
                      {row.requestId}
                    </td>
                    <td className="px-3 py-2 border-r text-gray-900">{row.employee}</td>
                    <td className="px-3 py-2 border-r text-gray-600">{row.department}</td>
                    <td className="px-3 py-2 border-r text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 border-r text-gray-900">{row.destination}</td>
                    <td className="px-3 py-2 border-r text-right tabular-nums font-semibold">{formatCurrency(row.amount)}</td>
                    <td className="px-3 py-2 border-r text-center">
                      <span className={
                        row.status === 'Approved' ? 'erp-badge-success' :
                          row.status === 'Pending' ? 'erp-badge-warning' :
                            row.status === 'Rejected' ? 'erp-badge-danger' :
                              'erp-badge-neutral'
                      }>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-r text-gray-600 tabular-nums">{row.date}</td>
                    <td className="px-3 py-2 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium text-xs"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-white border-t px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredRequisitions.length}</span> of <span className="font-semibold">{requisitions.length}</span> requests
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Total: <span className="font-semibold text-gray-800">
                {formatCurrency(filteredRequisitions.reduce((s, r) => s + r.amount, 0))} VND
              </span>
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}