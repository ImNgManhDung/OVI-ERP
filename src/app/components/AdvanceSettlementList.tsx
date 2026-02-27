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
import CreateAdvanceSettlement from './CreateAdvanceSettlement';
import { useLanguage } from '../i18n/LanguageContext';
import { FilterPanel } from './FilterPanel';
import { StatsCard } from './StatsCard';

interface AdvanceSettlementRow {
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
  accDebit: string;
  accCredit: string;
  status: string;
  description: string;
}

export default function AdvanceSettlementList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [partnerFilter, setPartnerFilter] = useState('all');
  const { t } = useLanguage();

  const [data, setData] = useState<AdvanceSettlementRow[]>([
    {
      id: 1,
      areId: 'ASL001',
      apeNumber: 'EMP-0126-001',
      docDate: '2026-01-25',
      legalEntity: 'CÔNG TY CP ABC',
      apeType: 'Hoàn ứng công tác',
      partnerType: 'EMP',
      partnerId: 'NV001',
      partnerName: 'NGUYỄN VĂN A',
      reqAmount: 10000000,
      approvedAmount: 10000000,
      paidAmount: 10000000,
      clearedAmount: 9500000,
      currency: 'VND',
      accDebit: '1111',
      accCredit: '1112',
      status: 'Approved',
      description: 'Hoàn ứng công tác Hà Nội'
    },
    {
      id: 2,
      areId: 'ASL002',
      apeNumber: 'EMP-0126-002',
      docDate: '2026-01-26',
      legalEntity: 'CÔNG TY CP ABC',
      apeType: 'Hoàn ứng tiếp khách',
      partnerType: 'EMP',
      partnerId: 'NV002',
      partnerName: 'TRẦN THỊ B',
      reqAmount: 5000000,
      approvedAmount: 5000000,
      paidAmount: 5000000,
      clearedAmount: 4800000,
      currency: 'VND',
      accDebit: '1111',
      accCredit: '1112',
      status: 'Draft',
      description: 'Hoàn ứng chi phí tiếp khách'
    }
  ]);

  // KPI counts
  const draftCount = data.filter(r => r.status === 'Draft').length;
  const approvedCount = data.filter(r => r.status === 'Approved').length;
  const pendingCount = data.filter(r => r.status === 'Pending').length;
  const settledCount = data.filter(r => r.status === 'Settled').length;

  const handleEdit = (row: AdvanceSettlementRow) => {
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
      label: t.tem.status || 'Status',
      type: 'select' as const,
      options: ['All', 'Draft', 'Pending', 'Approved', 'Settled'],
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
    return <CreateAdvanceSettlement onClose={() => { setShowCreateForm(false); setEditData(null); }} data={editData} />;
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
        }}
      />

      {/* Right: Main Content */}
      <div className="flex-1">
        {/* Page Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">{t.tem.advanceSettlement || 'ADVANCE SETTLEMENT'}</h1>
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
            title={t.tem.settled || "SETTLED"}
            value={settledCount}
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
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[#f8fafc] border-b">
              <tr>
                <th className="px-4 py-3 text-left w-12">
                  <Checkbox 
                    checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                    onCheckedChange={toggleAllRows}
                  />
                </th>
                <th className="text-left px-3 py-2.5">{t.tem.areId}</th>
                <th className="text-left px-3 py-2.5">{t.tem.apeNumber}</th>
                <th className="text-left px-3 py-2.5">{t.tem.docDate}</th>
                <th className="text-left px-3 py-2.5">{t.tem.legalEntity}</th>
                <th className="text-left px-3 py-2.5">{t.tem.apeType}</th>
                <th className="text-left px-3 py-2.5">{t.tem.partnerType}</th>
                <th className="text-left px-3 py-2.5">{t.tem.partnerId}</th>
                <th className="text-left px-3 py-2.5">{t.tem.partnerName}</th>
                <th className="text-right px-3 py-2.5">{t.tem.reqAmount}</th>
                <th className="text-right px-3 py-2.5">{t.tem.approvedAmount}</th>
                <th className="text-right px-3 py-2.5">{t.tem.paidAmount}</th>
                <th className="text-right px-3 py-2.5">{t.tem.clearedAmount}</th>
                <th className="text-left px-3 py-2.5">{t.tem.accDebit}</th>
                <th className="text-left px-3 py-2.5">{t.tem.accCredit}</th>
                <th className="text-left px-3 py-2.5">{t.tem.currency}</th>
                <th className="text-left px-3 py-2.5">{t.tem.status}</th>
                <th className="text-left px-3 py-2.5">{t.tem.description}</th>
                <th className="text-left px-3 py-2.5">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={18} className="text-center py-12 text-gray-400">
                    {t.tem.noRecordsFound}
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-600">
                      {row.areId}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-mono text-xs">
                      {row.apeNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-600 tabular-nums">
                      {row.docDate}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{row.apeType}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-medium">{row.partnerName}</span>
                        <span className="text-xs text-gray-500">{row.partnerId}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900 tabular-nums">
                      {formatCurrency(row.reqAmount)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-green-700 tabular-nums">
                      {formatCurrency(row.paidAmount)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-blue-700 tabular-nums">
                      {formatCurrency(row.clearedAmount)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-orange-700 tabular-nums">
                      {formatCurrency(row.paidAmount - row.clearedAmount)}
                    </td>
                    <td className="px-4 py-3">
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
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => handleEdit(row)}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-xs text-gray-600">
            Showing {filteredData.length} results
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}