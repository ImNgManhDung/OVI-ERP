import { useState } from 'react';
import { CheckCircle, FileText, AlertTriangle, Calendar, Plus, ChevronDown, Search } from 'lucide-react';
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
import { FilterPanel } from './FilterPanel';
import { StatsCard } from './StatsCard';

interface AssetTransactionListProps {
  onCreateClick: () => void;
}

const mockData = [
  {
    id: 1,
    atrId: 'ATR-001',
    assId: 'ASS-001',
    atrCode: 'ADD0124-0001',
    atrType: 'ADD',
    cceId: 'CCE-001',
    projId: null,
    assetAccId: '211',
    offsetAccId: '331',
    oldCost: 0,
    newCost: 150000000,
    amountChange: 150000000,
    fromCceId: null,
    toCceId: null,
    fromLocId: null,
    toLocId: null,
    fromProjId: null,
    toProjId: null,
    fromEmpId: null,
    toEmpId: null,
    description: 'Mua mới thiết bị IT từ nhà cung cấp ABC',
    status: 'P',
    uleId: 'ULE-2024-01-0045',
    postingDate: '15-01-2024'
  },
  {
    id: 2,
    atrId: 'ATR-002',
    assId: 'ASS-001',
    atrCode: 'ADJ0224-0001',
    atrType: 'ADJ',
    cceId: 'CCE-001',
    projId: null,
    assetAccId: '211',
    offsetAccId: '338',
    oldCost: 150000000,
    newCost: 150500000,
    amountChange: 500000,
    fromCceId: null,
    toCceId: null,
    fromLocId: null,
    toLocId: null,
    fromProjId: null,
    toProjId: null,
    fromEmpId: null,
    toEmpId: null,
    description: 'Điều chỉnh giá trị do lắp thêm phụ kiện',
    status: 'P',
    uleId: 'ULE-2024-02-0078',
    postingDate: '05-02-2024'
  },
  {
    id: 3,
    atrId: 'ATR-003',
    assId: 'ASS-002',
    atrCode: 'TRA0324-0001',
    atrType: 'TRA',
    cceId: 'CCE-003',
    projId: null,
    assetAccId: '211',
    offsetAccId: '211',
    oldCost: 85000000,
    newCost: 85000000,
    amountChange: 0,
    fromCceId: 'CCE-002',
    toCceId: 'CCE-003',
    fromLocId: 'LOC-HN',
    toLocId: 'LOC-HCM',
    fromProjId: null,
    toProjId: null,
    fromEmpId: 'EMP-001',
    toEmpId: 'EMP-025',
    description: 'Luân chuyển xe từ HN về HCM',
    status: 'C',
    uleId: null,
    postingDate: null
  },
  {
    id: 4,
    atrId: 'ATR-004',
    assId: 'ASS-003',
    atrCode: 'RET0426-0001',
    atrType: 'RET',
    cceId: 'CCE-003',
    projId: null,
    assetAccId: '211',
    offsetAccId: '811',
    oldCost: 45000000,
    newCost: 0,
    amountChange: -45000000,
    fromCceId: null,
    toCceId: null,
    fromLocId: null,
    toLocId: null,
    fromProjId: null,
    toProjId: null,
    fromEmpId: null,
    toEmpId: null,
    description: 'Thanh lý tài sản hết khấu hao',
    status: 'D',
    uleId: null,
    postingDate: null
  },
  {
    id: 5,
    atrId: 'ATR-005',
    assId: 'ASS-001',
    atrCode: 'RAV0526-0001',
    atrType: 'RAV',
    cceId: 'CCE-001',
    projId: null,
    assetAccId: '211',
    offsetAccId: '412',
    oldCost: 150500000,
    newCost: 155000000,
    amountChange: 4500000,
    fromCceId: null,
    toCceId: null,
    fromLocId: null,
    toLocId: null,
    fromProjId: null,
    toProjId: null,
    fromEmpId: null,
    toEmpId: null,
    description: 'Đánh giá lại giá trị theo IFRS',
    status: 'D',
    uleId: null,
    postingDate: null
  },
  {
    id: 6,
    atrId: 'ATR-006',
    assId: 'ASS-004',
    atrCode: 'ADD0626-0001',
    atrType: 'ADD',
    cceId: 'CCE-004',
    projId: 'PROJ-001',
    assetAccId: '211',
    offsetAccId: '241',
    oldCost: 0,
    newCost: 250000000,
    amountChange: 250000000,
    fromCceId: null,
    toCceId: null,
    fromLocId: null,
    toLocId: null,
    fromProjId: null,
    toProjId: null,
    fromEmpId: null,
    toEmpId: null,
    description: 'Tăng từ XDCB hoàn thành',
    status: 'P',
    uleId: 'ULE-2026-06-0234',
    postingDate: '15-06-2026'
  }
];

export default function AssetTransactionList({ onCreateClick }: AssetTransactionListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Filter data
  const filteredData = mockData.filter(item => {
    const matchesSearch = searchText === '' || Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesType = selectedType === 'all' || item.atrType === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate stats
  const postedCount = mockData.filter(item => item.status === 'P').length;
  const draftCount = mockData.filter(item => item.status === 'D').length;
  const addCount = mockData.filter(item => item.atrType === 'ADD').length;
  const retCount = mockData.filter(item => item.atrType === 'RET').length;

  const customFilters = (
    <>
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Transaction Type</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Types</option>
          <option value="ADD">ADD (Addition)</option>
          <option value="ADJ">ADJ (Adjustment)</option>
          <option value="RAV">RAV (Revaluation)</option>
          <option value="TRA">TRA (Transfer)</option>
          <option value="RET">RET (Retirement)</option>
        </select>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left: Filter Panel */}
      <FilterPanel
        searchValue={searchText}
        onSearchChange={setSearchText}
        showStatus={true}
        statusOptions={[
          { value: 'all', label: 'All Status' },
          { value: 'D', label: 'Draft' },
          { value: 'C', label: 'Confirmed' },
          { value: 'P', label: 'Posted' },
          { value: 'R', label: 'Reversed' },
        ]}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        showType={false}
        customFilters={customFilters}
      />

      {/* Right: Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Asset Transactions</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Fixed Assets</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Asset Transactions</span>
          </nav>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatsCard title="POSTED" value={postedCount} icon={CheckCircle} bgColor="text-green-600" iconBgColor="bg-green-50" />
            <StatsCard title="DRAFT" value={draftCount} icon={FileText} bgColor="text-orange-600" iconBgColor="bg-orange-50" />
            <StatsCard title="ADDITION" value={addCount} icon={AlertTriangle} bgColor="text-blue-600" iconBgColor="bg-blue-50" />
            <StatsCard title="RETIREMENT" value={retCount} icon={Calendar} bgColor="text-red-600" iconBgColor="bg-red-50" />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={onCreateClick}>
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
          </div>

          {/* Search and Actions Bar */}
          <div className="bg-white border rounded-t-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Search All Text Columns"
                className="w-64 h-8"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button variant="outline" size="sm">Go</Button>
              <Button variant="outline" size="sm">
                Actions <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="bg-white border border-t-0 px-4 py-2 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox />
              <span>Show Posted Only</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox />
              <span>Current Period Only</span>
            </label>
          </div>

          {/* Table */}
          <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">ATR ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">ASS ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">ATR Code</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Type</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">CCE ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">PROJ ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Asset Acc</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Offset Acc</th>
                    <th className="px-2 py-2 text-right font-semibold text-blue-700">Old Cost</th>
                    <th className="px-2 py-2 text-right font-semibold text-blue-700">New Cost</th>
                    <th className="px-2 py-2 text-right font-semibold text-blue-700">Change</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">From CCE</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">To CCE</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Description</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Status</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">ULE ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Posting Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={17} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-12 h-12 opacity-10" />
                          <span>No transactions found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="px-2 py-2 font-bold text-blue-600">{item.atrId}</td>
                        <td className="px-2 py-2 font-mono">{item.assId}</td>
                        <td className="px-2 py-2 font-mono">{item.atrCode}</td>
                        <td className="px-2 py-2">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                            item.atrType === 'ADD' ? 'bg-green-100 text-green-700' :
                            item.atrType === 'ADJ' ? 'bg-blue-100 text-blue-700' :
                            item.atrType === 'RAV' ? 'bg-purple-100 text-purple-700' :
                            item.atrType === 'TRA' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {item.atrType}
                          </span>
                        </td>
                        <td className="px-2 py-2 font-mono">{item.cceId}</td>
                        <td className="px-2 py-2 font-mono text-gray-500">{item.projId || '-'}</td>
                        <td className="px-2 py-2 font-mono">{item.assetAccId}</td>
                        <td className="px-2 py-2 font-mono">{item.offsetAccId}</td>
                        <td className="px-2 py-2 text-right">{item.oldCost.toLocaleString()}</td>
                        <td className="px-2 py-2 text-right font-medium">{item.newCost.toLocaleString()}</td>
                        <td className="px-2 py-2 text-right font-bold">{item.amountChange.toLocaleString()}</td>
                        <td className="px-2 py-2 font-mono text-gray-500">{item.fromCceId || '-'}</td>
                        <td className="px-2 py-2 font-mono text-gray-500">{item.toCceId || '-'}</td>
                        <td className="px-2 py-2 max-w-xs truncate" title={item.description}>{item.description}</td>
                        <td className="px-2 py-2">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                            item.status === 'P' ? 'bg-green-100 text-green-700' :
                            item.status === 'C' ? 'bg-blue-100 text-blue-700' :
                            item.status === 'R' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-2 py-2 font-mono text-blue-600">{item.uleId || '-'}</td>
                        <td className="px-2 py-2">{item.postingDate || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-2 border-t bg-gray-50 text-sm text-right text-gray-600">
              Showing {filteredData.length} of {mockData.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
