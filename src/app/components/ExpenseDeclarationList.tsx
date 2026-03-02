import { useState } from 'react';
import { Plus, Search, Download, List, Grid3x3, RefreshCw, MoreVertical, Save } from 'lucide-react';
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
import ExpenseDeclaration from './ExpenseDeclaration';
import RefundModal from './RefundModal';
import { useLanguage } from '../i18n/LanguageContext';
import { FilterPanel } from './FilterPanel';
import { StatsCard } from './StatsCard';

interface ExpenseDeclarationRow {
  id: number;
  transactionType: string;
  sip: string;
  employee: string;
  department: string;
  policyDate: string;
  policyType: string;
  description: string;
  total: number;
  status: string;
}

export default function ExpenseDeclarationList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [policyTypeFilter, setPolicyTypeFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const { t } = useLanguage();

  const [declarations, setDeclarations] = useState<ExpenseDeclarationRow[]>([
    {
      id: 1,
      sip: 'SIP-2026-001',
      transactionType: 'Vé máy bay',
      employee: 'Nguyễn Văn A',
      department: 'Kế toán',
      policyDate: '2026-01-16',
      policyType: 'Domestic',
      description: 'Công tác Hà Nội',
      total: 5000000,
      status: 'Pending',
    },
    {
      id: 2,
      sip: 'SIP-2026-002',
      transactionType: 'Khách sạn',
      employee: 'Trần Thị B',
      department: 'Nhân sự',
      policyDate: '2026-01-15',
      policyType: 'International',
      description: 'Khách sạn Singapore',
      total: 12000000,
      status: 'Approved',
    },
    {
      id: 3,
      sip: 'SIP-2026-003',
      transactionType: 'Vé máy bay',
      employee: 'Lê Văn C',
      department: 'Marketing',
      policyDate: '2026-01-14',
      policyType: 'Domestic',
      description: 'Công tác TP.HCM',
      total: 3500000,
      status: 'Draft',
    },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredDeclarations.length && filteredDeclarations.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredDeclarations.map(row => row.id));
    }
  };

  const filteredDeclarations = declarations.filter(row => {
    const matchSearch = searchText === '' ||
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      );
    const matchStatus = statusFilter === 'all' || row.status === statusFilter;
    const matchPolicyType = policyTypeFilter === 'all' || row.policyType === policyTypeFilter;
    return matchSearch && matchStatus && matchPolicyType;
  });

  const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN').format(amount);

  // KPI counts
  const pendingCount = declarations.filter(r => r.status === 'Pending').length;
  const approvedCount = declarations.filter(r => r.status === 'Approved').length;
  const draftCount = declarations.filter(r => r.status === 'Draft').length;
  const rejectedCount = declarations.filter(r => r.status === 'Rejected').length;

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Domestic', label: 'Domestic' },
    { value: 'International', label: 'International' },
  ];

  if (showCreateForm) {
    return <ExpenseDeclaration onClose={() => setShowCreateForm(false)} />;
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
        selectedType={policyTypeFilter}
        onTypeChange={setPolicyTypeFilter}
        showStatus={true}
        showType={true}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">{t.tem.expenseDeclarationListTitle || 'Khai báo Chi phí Công tác'}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {t.tem.expenseDeclarationSubtitle || 'Quản lý khai báo chi phí công tác'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center gap-12">
            <StatsCard label="PENDING" value={pendingCount} color="orange" />
            <StatsCard label="APPROVED" value={approvedCount} color="green" />
            <StatsCard label="DRAFT" value={draftCount} color="gray" />
            <StatsCard label="REJECTED" value={rejectedCount} color="red" />
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
              Create Declaration
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowRefundModal(true)}
              disabled={selectedRows.length === 0}
            >
              Refund Selected
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
          <table className="w-full text-sm min-w-[1400px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-50 border-b">
                <th className="px-3 py-3 text-left w-12 border-r bg-gray-50 sticky left-0 z-20">
                  <Checkbox
                    checked={selectedRows.length === filteredDeclarations.length && filteredDeclarations.length > 0}
                    onCheckedChange={toggleAllRows}
                  />
                </th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-36 bg-gray-50 sticky left-12 z-20">SIP</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-36">Loại giao dịch</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-40">Nhân viên</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-32">Phòng ban</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-32">Ngày chính sách</th>
                <th className="px-3 py-3 text-center text-gray-700 font-semibold border-r w-32">Loại chính sách</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-64">Mô tả</th>
                <th className="px-3 py-3 text-right text-gray-700 font-semibold border-r w-36">Tổng cộng</th>
                <th className="px-3 py-3 text-center text-gray-700 font-semibold border-r w-28">Trạng thái</th>
                <th className="px-3 py-3 text-center text-gray-700 font-semibold w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeclarations.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No declarations found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDeclarations.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10 font-semibold text-blue-600">
                      {row.sip}
                    </td>
                    <td className="px-3 py-2 border-r text-gray-900">{row.transactionType}</td>
                    <td className="px-3 py-2 border-r text-gray-900">{row.employee}</td>
                    <td className="px-3 py-2 border-r text-gray-600">{row.department}</td>
                    <td className="px-3 py-2 border-r text-gray-600 tabular-nums">{row.policyDate}</td>
                    <td className="px-3 py-2 border-r text-center">
                      <span className={
                        row.policyType === 'International'
                          ? 'erp-badge-info'
                          : 'erp-badge-success'
                      }>
                        {row.policyType}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-r text-gray-600">{row.description}</td>
                    <td className="px-3 py-2 border-r text-right tabular-nums font-semibold text-orange-600">{formatCurrency(row.total)}</td>
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
            Showing <span className="font-semibold">{filteredDeclarations.length}</span> of <span className="font-semibold">{declarations.length}</span> declarations
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Total: <span className="font-semibold text-gray-800">
                {formatCurrency(filteredDeclarations.reduce((s, r) => s + r.total, 0))} VND
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

      {/* Refund Modal */}
      {showRefundModal && (
        <RefundModal
          onClose={() => setShowRefundModal(false)}
          selectedDeclarations={declarations.filter(d => selectedRows.includes(d.id))}
        />
      )}
    </div>
  );
}