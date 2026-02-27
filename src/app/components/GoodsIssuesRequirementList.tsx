import { useState } from 'react';
import { FileText, CheckCircle, AlertTriangle, XCircle, Plus, Trash2, Search as SearchIcon, Pencil, Eye } from 'lucide-react';
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
import CreateGoodsIssuesRequirement from './CreateGoodsIssuesRequirement';
import { useLanguage } from '../i18n/LanguageContext';
import { FilterPanel } from './FilterPanel';
import { StatsCard } from './StatsCard';

interface GoodsIssuesRequirementListProps {
  onCreateClick: () => void;
}

interface GoodsIssueRow {
  id: number;
  requestNumber: string;
  transactionType: string;
  requestDate: string;
  requiredDate: string;
  requestor: string;
  deptFrom: string;
  deptTo: string;
  reason: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Issued';
}

const MOCK_DATA: GoodsIssueRow[] = [
  {
    id: 1,
    requestNumber: 'IR_2602_00001',
    transactionType: 'Yêu cầu xuất kho',
    requestDate: '20/02/2026',
    requiredDate: '22/02/2026',
    requestor: 'Nguyễn Văn An',
    deptFrom: 'Văn Phòng',
    deptTo: 'Sản Xuất',
    reason: 'Xuất nguyên vật liệu cho sản xuất Q1',
    status: 'Approved',
  },
  {
    id: 2,
    requestNumber: 'IR_2602_00002',
    transactionType: 'Yêu cầu xuất kho',
    requestDate: '22/02/2026',
    requiredDate: '24/02/2026',
    requestor: 'Trần Thị Bình',
    deptFrom: 'Kỹ Thuật',
    deptTo: 'Bảo Trì',
    reason: 'Xuất phụ tùng thay thế máy CNC-01',
    status: 'Pending',
  },
  {
    id: 3,
    requestNumber: 'IR_2602_00003',
    transactionType: 'Yêu cầu xuất kho',
    requestDate: '25/02/2026',
    requiredDate: '25/02/2026',
    requestor: 'Lê Quang Cường',
    deptFrom: 'Văn Phòng',
    deptTo: 'Văn Phòng',
    reason: 'Xuất vật tư văn phòng phẩm tháng 2',
    status: 'Draft',
  },
  {
    id: 4,
    requestNumber: 'IR_2501_00045',
    transactionType: 'Yêu cầu xuất kho khẩn',
    requestDate: '15/01/2026',
    requiredDate: '15/01/2026',
    requestor: 'Phạm Thu Hà',
    deptFrom: 'Sản Xuất',
    deptTo: 'Sản Xuất',
    reason: 'Xuất khẩn nguyên liệu cho đơn hàng gấp',
    status: 'Issued',
  },
  {
    id: 5,
    requestNumber: 'IR_2501_00039',
    transactionType: 'Yêu cầu xuất kho',
    requestDate: '10/01/2026',
    requiredDate: '14/01/2026',
    requestor: 'Hoàng Minh Đức',
    deptFrom: 'Kỹ Thuật',
    deptTo: 'Bảo Trì',
    reason: 'Xuất dầu bôi trơn định kỳ',
    status: 'Pending',
  },
];

const StatusBadge = ({ status }: { status: GoodsIssueRow['status'] }) => {
  const map = {
    Draft:     { cls: 'erp-badge-neutral', label: 'Draft' },
    Pending:   { cls: 'erp-badge-warning', label: 'Pending' },
    Approved:  { cls: 'erp-badge-info',    label: 'Approved' },
    Issued:    { cls: 'erp-badge-success', label: 'Issued' },
  };
  const { cls, label } = map[status];
  return <span className={cls}>{label}</span>;
};

export default function GoodsIssuesRequirementList({ onCreateClick }: GoodsIssuesRequirementListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const { t } = useLanguage();

  const [data, setData] = useState<GoodsIssueRow[]>(MOCK_DATA);

  // KPI counts
  const draftCount = data.filter(r => r.status === 'Draft').length;
  const pendingCount = data.filter(r => r.status === 'Pending').length;
  const approvedCount = data.filter(r => r.status === 'Approved').length;
  const issuedCount = data.filter(r => r.status === 'Issued').length;

  const handleEdit = (row: GoodsIssueRow) => {
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

  const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN');
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
      options: ['All', 'Draft', 'Pending', 'Approved', 'Issued'],
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
    return <CreateGoodsIssuesRequirement onClose={() => { setShowCreateForm(false); setEditData(null); }} />;
  }

  return (
    <div className="flex gap-6 p-6">
      {/* Left: Filter Panel */}
      <FilterPanel
        title={t.wmm.filterOptions || "Filter Options"}
        filters={filterOptions}
        onClearAll={() => {
          setStatusFilter('all');
        }}
      />

      {/* Right: Main Content */}
      <div className="flex-1">
        {/* Page Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">{t.wmm.goodsIssuesRequirement || 'GOODS ISSUES REQUIREMENT'}</h1>
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
            title={t.wmm.pending || "PENDING"}
            value={pendingCount}
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
            title={t.wmm.issued || "ISSUED"}
            value={issuedCount}
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
                  <th className="text-left">{t.wmm.deptFrom}</th>
                  <th className="text-left">{t.wmm.deptTo}</th>
                  <th className="text-left">{t.wmm.reason}</th>
                  <th className="text-center">{t.wmm.statusLabel}</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-12 text-gray-400 text-xs">
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
                      <td className="text-gray-600">{row.deptTo}</td>
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
          <div className="px-4 py-2.5 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {filteredData.length} {t.wmm.records} {selectedRows.length > 0 && `· ${selectedRows.length} ${t.wmm.selected}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}