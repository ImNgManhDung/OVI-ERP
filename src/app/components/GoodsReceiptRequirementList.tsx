import { useState } from 'react';
import { FileText, CheckCircle, AlertTriangle, Plus, Trash2, Search as SearchIcon, Pencil, Eye } from 'lucide-react';
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
import CreateGoodsReceiptRequirement from './CreateGoodsReceiptRequirement';
import { useLanguage } from '../i18n/LanguageContext';
import { FilterPanel } from './FilterPanel';
import { StatsCard } from './StatsCard';

interface GoodsReceiptRequirementListProps {
  onCreateClick: () => void;
}

interface GoodsReceiptRow {
  id: number;
  requestNumber: string;
  transactionType: string;
  requestDate: string;
  requiredDate: string;
  requestor: string;
  deptFrom: string;
  warehouse: string;
  vendorCode: string;
  reason: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Posted';
}

const MOCK_DATA: GoodsReceiptRow[] = [
  {
    id: 1,
    requestNumber: 'RR_2602_00001',
    transactionType: 'Yêu cầu nhập kho',
    requestDate: '18/02/2026',
    requiredDate: '20/02/2026',
    requestor: 'Nguyễn Thị Mai',
    deptFrom: 'Phòng Mua Hàng',
    warehouse: 'WH-01 Hà Nội',
    vendorCode: 'VND-0024',
    reason: 'Nhập nguyên vật liệu theo PO-2026-0089',
    status: 'Posted',
  },
  {
    id: 2,
    requestNumber: 'RR_2602_00002',
    transactionType: 'Yêu cầu nhập kho',
    requestDate: '21/02/2026',
    requiredDate: '24/02/2026',
    requestor: 'Trần Minh Khoa',
    deptFrom: 'Phòng Mua Hàng',
    warehouse: 'WH-02 HCM',
    vendorCode: 'VND-0051',
    reason: 'Nhập phụ tùng thay thế theo hợp đồng HĐ-2026-012',
    status: 'Approved',
  },
  {
    id: 3,
    requestNumber: 'RR_2602_00003',
    transactionType: 'Yêu cầu nhập kho',
    requestDate: '25/02/2026',
    requiredDate: '28/02/2026',
    requestor: 'Phạm Quốc Hùng',
    deptFrom: 'Phòng Mua Hàng',
    warehouse: 'WH-01 Hà Nội',
    vendorCode: 'VND-0088',
    reason: 'Nhập vật tư tiêu hao tháng 3/2026',
    status: 'Submitted',
  },
  {
    id: 4,
    requestNumber: 'RR_2602_00004',
    transactionType: 'Yêu cầu nhập kho khẩn',
    requestDate: '25/02/2026',
    requiredDate: '25/02/2026',
    requestor: 'Lê Văn Tùng',
    deptFrom: 'Phòng Sản Xuất',
    warehouse: 'WH-02 HCM',
    vendorCode: 'VND-0031',
    reason: 'Nhập khẩn dầu thủy lực cho dây chuyền SX số 2',
    status: 'Draft',
  },
  {
    id: 5,
    requestNumber: 'RR_2501_00049',
    transactionType: 'Yêu cầu nhập kho',
    requestDate: '12/01/2026',
    requiredDate: '17/01/2026',
    requestor: 'Hoàng Thị Lan',
    deptFrom: 'Phòng Mua Hàng',
    warehouse: 'WH-03 Đà Nẵng',
    vendorCode: 'VND-0017',
    reason: 'Nhập thép ống đầu năm theo kế hoạch sản xuất Q1',
    status: 'Posted',
  },
];

const StatusBadge = ({ status }: { status: GoodsReceiptRow['status'] }) => {
  const map = {
    Draft: { cls: 'erp-badge-neutral', label: 'Draft' },
    Submitted: { cls: 'erp-badge-warning', label: 'Submitted' },
    Approved: { cls: 'erp-badge-info', label: 'Approved' },
    Posted: { cls: 'erp-badge-success', label: 'Posted' },
  };
  const { cls, label } = map[status];
  return <span className={cls}>{label}</span>;
};

export default function GoodsReceiptRequirementList({ onCreateClick }: GoodsReceiptRequirementListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const { t } = useLanguage();

  const [data, setData] = useState<GoodsReceiptRow[]>(MOCK_DATA);

  // KPI counts
  const draftCount = data.filter(r => r.status === 'Draft').length;
  const submittedCount = data.filter(r => r.status === 'Submitted').length;
  const approvedCount = data.filter(r => r.status === 'Approved').length;
  const postedCount = data.filter(r => r.status === 'Posted').length;

  const handleEdit = (row: GoodsReceiptRow) => {
    setEditData(row);
    setShowCreateForm(true);
  };

  const handleDelete = () => {
    if (selectedRows.length === 0) {
      toast.warning(t.wmm.pleaseSelectAtLeastOneRow || 'Please select at least one row');
      return;
    }
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    toast.success(`${t.wmm.deleted || 'Deleted'} ${selectedRows.length} ${t.wmm.records || 'records'}`);
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

  const filteredData = data.filter(row => {
    const matchSearch = !searchText ||
      Object.values(row).some(v =>
        String(v).toLowerCase().includes(searchText.toLowerCase())
      );
    const matchStatus = statusFilter === 'all' || row.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filterOptions = [
    {
      label: t.wmm.fromDate || 'From Date',
      type: 'date' as const,
      value: '2026-01-01',
    },
    {
      label: t.wmm.toDate || 'To Date',
      type: 'date' as const,
      value: '2026-01-31',
    },
    {
      label: t.wmm.status || 'Status',
      type: 'select' as const,
      options: ['All', 'Draft', 'Submitted', 'Approved', 'Posted'],
      value: statusFilter,
    },
    {
      label: t.wmm.warehouse || 'Warehouse',
      type: 'select' as const,
      options: ['All', 'WH-001', 'WH-002', 'WH-003'],
      value: 'All',
    },
  ];

  if (showCreateForm) {
    return <CreateGoodsReceiptRequirement onClose={() => { setShowCreateForm(false); setEditData(null); }} />;
  }

  return (
    <div className="flex gap-6 p-6">
      {/* Left: Filter Panel */}
      <FilterPanel
        searchValue={searchText}
        onSearchChange={setSearchText}
        statusOptions={[
          { value: 'all', label: 'All Status' },
          { value: 'Draft', label: 'Draft' },
          { value: 'Submitted', label: 'Submitted' },
          { value: 'Approved', label: 'Approved' },
          { value: 'Posted', label: 'Posted' },
        ]}
        selectedStatus={statusFilter}
        onStatusChange={setStatusFilter}
        showStatus={true}
      />

      {/* Right: Main Content */}
      <div className="flex-1">
        {/* Page Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">{t.wmm.goodsReceiptRequirement || 'GOODS RECEIPT REQUIREMENT'}</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard
            title={t.wmm.draft || "DRAFT"}
            value={draftCount}
            icon={FileText}
            bgColor="text-gray-600"
            iconBgColor="bg-gray-50"
          />
          <StatsCard
            title={t.wmm.submitted || "SUBMITTED"}
            value={submittedCount}
            icon={AlertTriangle}
            bgColor="text-orange-600"
            iconBgColor="bg-orange-50"
          />
          <StatsCard
            title={t.wmm.approved || "APPROVED"}
            value={approvedCount}
            icon={CheckCircle}
            bgColor="text-green-600"
            iconBgColor="bg-green-50"
          />
          <StatsCard
            title={t.wmm.posted || "POSTED"}
            value={postedCount}
            icon={CheckCircle}
            bgColor="text-blue-600"
            iconBgColor="bg-blue-50"
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
            {t.wmm.delete || 'Delete'}
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="w-4 h-4 mr-1" />
            {t.wmm.create || 'Create'}
          </Button>
        </div>

        {/* Search Bar */}
        <div className="bg-white border rounded-t-lg p-3 flex items-center gap-2">
          <SearchIcon className="w-4 h-4 text-gray-500" />
          <Input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder={t.wmm.search || 'Search'}
            className="h-9"
          />
        </div>

        {/* Table */}
        <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full erp-table">
              <thead>
                <tr>
                  <th className="w-10 text-center">
                    <Checkbox
                      checked={filteredData.length > 0 && selectedRows.length === filteredData.length}
                      onCheckedChange={toggleAllRows}
                    />
                  </th>
                  <th className="text-left">{t.wmm.requestNumber}</th>
                  <th className="text-left">{t.wmm.transactionType}</th>
                  <th className="text-left">{t.wmm.requestDate}</th>
                  <th className="text-left">{t.wmm.requiredDate}</th>
                  <th className="text-left">{t.wmm.requestor}</th>
                  <th className="text-left">{t.wmm.department}</th>
                  <th className="text-left">{t.wmm.destWarehouse}</th>
                  <th className="text-left">{t.wmm.vendorCode}</th>
                  <th className="text-left">{t.wmm.reason}</th>
                  <th className="text-center">{t.wmm.statusLabel}</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center py-12 text-gray-400 text-xs">
                      {t.wmm.noRecordsFound}
                    </td>
                  </tr>
                ) : (
                  filteredData.map(row => (
                    <tr
                      key={row.id}
                      className={selectedRows.includes(row.id) ? 'selected' : ''}
                      onClick={() => toggleRowSelection(row.id)}
                    >
                      <td className="text-center" onClick={e => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() => toggleRowSelection(row.id)}
                        />
                      </td>
                      <td className="font-medium text-blue-600 hover:underline cursor-pointer">
                        {row.requestNumber}
                      </td>
                      <td className="text-gray-600">{row.transactionType}</td>
                      <td className="text-gray-600 tabular-nums">{row.requestDate}</td>
                      <td className="text-gray-600 tabular-nums">{row.requiredDate}</td>
                      <td className="text-gray-700">{row.requestor}</td>
                      <td className="text-gray-600">{row.deptFrom}</td>
                      <td className="text-gray-600">{row.warehouse}</td>
                      <td className="text-gray-500 font-mono text-xs">{row.vendorCode}</td>
                      <td className="text-gray-500 max-w-[200px] truncate">{row.reason}</td>
                      <td className="text-center">
                        <StatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-gray-50 bg-gray-50/50">
            <span className="text-xs text-gray-400">
              {filteredData.length} {t.wmm.records} {selectedRows.length > 0 && `· ${selectedRows.length} ${t.wmm.selected}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}