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

interface AssetDepreciationListProps {
  onCreateClick: () => void;
}

const mockData = [
  {
    id: 1,
    adeId: 'ADE-001',
    assId: 'ASS-001',
    lenId: 'LEN-001',
    ledger: '0L',
    fiscalYear: 2026,
    accPeriod: '02-2026',
    documentDate: '28-02-2026',
    cceId: 'CCE-001',
    projId: null,
    expenseAccId: '641',
    deprAccId: '214',
    currencyCode: 'VND',
    originalCost: 150000000,
    deprAmount: 2500000,
    adjustAmount: 0,
    netBookValue: 115000000,
    remainingLifeMonths: 46,
    deprMethod: 'SL',
    isRetired: 'N',
    status: 'P',
    uleId: 'ULE-2026-02-0125',
    postingDate: '28-02-2026',
    createdBy: 'system',
    createdDate: '28-02-2026'
  },
  {
    id: 2,
    adeId: 'ADE-002',
    assId: 'ASS-001',
    lenId: 'LEN-001',
    ledger: '2L',
    fiscalYear: 2026,
    accPeriod: '02-2026',
    documentDate: '28-02-2026',
    cceId: 'CCE-001',
    projId: null,
    expenseAccId: '641',
    deprAccId: '214',
    currencyCode: 'VND',
    originalCost: 150000000,
    deprAmount: 1562500,
    adjustAmount: 0,
    netBookValue: 128125000,
    remainingLifeMonths: 82,
    deprMethod: 'SL',
    isRetired: 'N',
    status: 'P',
    uleId: 'ULE-2026-02-0126',
    postingDate: '28-02-2026',
    createdBy: 'system',
    createdDate: '28-02-2026'
  },
  {
    id: 3,
    adeId: 'ADE-003',
    assId: 'ASS-002',
    lenId: 'LEN-001',
    ledger: '0L',
    fiscalYear: 2026,
    accPeriod: '02-2026',
    documentDate: '28-02-2026',
    cceId: 'CCE-002',
    projId: 'PROJ-001',
    expenseAccId: '642',
    deprAccId: '214',
    currencyCode: 'VND',
    originalCost: 85000000,
    deprAmount: 2750000,
    adjustAmount: 0,
    netBookValue: 60500000,
    remainingLifeMonths: 27,
    deprMethod: 'DE',
    isRetired: 'N',
    status: 'C',
    uleId: null,
    postingDate: null,
    createdBy: 'system',
    createdDate: '28-02-2026'
  },
  {
    id: 4,
    adeId: 'ADE-004',
    assId: 'ASS-003',
    lenId: 'LEN-002',
    ledger: '1L',
    fiscalYear: 2026,
    accPeriod: '02-2026',
    documentDate: '28-02-2026',
    cceId: 'CCE-003',
    projId: null,
    expenseAccId: '627',
    deprAccId: '214',
    currencyCode: 'USD',
    originalCost: 25000,
    deprAmount: 520.83,
    adjustAmount: 0,
    netBookValue: 19271,
    remainingLifeMonths: 37,
    deprMethod: 'SL',
    isRetired: 'N',
    status: 'D',
    uleId: null,
    postingDate: null,
    createdBy: 'user1',
    createdDate: '27-02-2026'
  }
];

export default function AssetDepreciationList({ onCreateClick }: AssetDepreciationListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLedger, setSelectedLedger] = useState('all');

  // Filter data
  const filteredData = mockData.filter(item => {
    const matchesSearch = searchText === '' || Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesLedger = selectedLedger === 'all' || item.ledger === selectedLedger;

    return matchesSearch && matchesStatus && matchesLedger;
  });

  // Calculate stats
  const postedCount = mockData.filter(item => item.status === 'P').length;
  const confirmedCount = mockData.filter(item => item.status === 'C').length;
  const draftCount = mockData.filter(item => item.status === 'D').length;
  const totalAmount = mockData.reduce((sum, item) => sum + item.deprAmount, 0);

  const customFilters = (
    <>
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Ledger</label>
        <select
          value={selectedLedger}
          onChange={(e) => setSelectedLedger(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Ledgers</option>
          <option value="0L">0L (VAS)</option>
          <option value="1L">1L (INTERNAL)</option>
          <option value="2L">2L (IFRS)</option>
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
          <h1 className="text-xl font-semibold text-gray-800">Asset Depreciations</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Fixed Assets</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Asset Depreciations</span>
          </nav>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatsCard title="POSTED" value={postedCount} icon={CheckCircle} bgColor="text-green-600" iconBgColor="bg-green-50" />
            <StatsCard title="CONFIRMED" value={confirmedCount} icon={FileText} bgColor="text-blue-600" iconBgColor="bg-blue-50" />
            <StatsCard title="DRAFT" value={draftCount} icon={AlertTriangle} bgColor="text-orange-600" iconBgColor="bg-orange-50" />
            <StatsCard title="TOTAL" value={`${(totalAmount / 1000000).toFixed(1)}M`} icon={Calendar} bgColor="text-purple-600" iconBgColor="bg-purple-50" />
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
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">ADE ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">ASS ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">LEN ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Ledger</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Fiscal Year</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Period</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Doc Date</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">CCE ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">PROJ ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Exp Acc</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Depr Acc</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Currency</th>
                    <th className="px-2 py-2 text-right font-semibold text-blue-700">Orig Cost</th>
                    <th className="px-2 py-2 text-right font-semibold text-blue-700">Depr Amount</th>
                    <th className="px-2 py-2 text-right font-semibold text-blue-700">Adjust</th>
                    <th className="px-2 py-2 text-right font-semibold text-blue-700">NBV</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-700">Remain</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Method</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">Status</th>
                    <th className="px-2 py-2 text-left font-semibold text-blue-700">ULE ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={20} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-12 h-12 opacity-10" />
                          <span>No depreciations found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="px-2 py-2 font-bold text-blue-600">{item.adeId}</td>
                        <td className="px-2 py-2 font-mono">{item.assId}</td>
                        <td className="px-2 py-2 font-mono">{item.lenId}</td>
                        <td className="px-2 py-2">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                            item.ledger === '0L' ? 'bg-blue-100 text-blue-700' :
                            item.ledger === '1L' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {item.ledger}
                          </span>
                        </td>
                        <td className="px-2 py-2">{item.fiscalYear}</td>
                        <td className="px-2 py-2">{item.accPeriod}</td>
                        <td className="px-2 py-2">{item.documentDate}</td>
                        <td className="px-2 py-2 font-mono">{item.cceId}</td>
                        <td className="px-2 py-2 font-mono text-gray-500">{item.projId || '-'}</td>
                        <td className="px-2 py-2 font-mono">{item.expenseAccId}</td>
                        <td className="px-2 py-2 font-mono">{item.deprAccId}</td>
                        <td className="px-2 py-2">{item.currencyCode}</td>
                        <td className="px-2 py-2 text-right">{item.originalCost.toLocaleString()}</td>
                        <td className="px-2 py-2 text-right font-medium">{item.deprAmount.toLocaleString()}</td>
                        <td className="px-2 py-2 text-right">{item.adjustAmount.toLocaleString()}</td>
                        <td className="px-2 py-2 text-right font-bold">{item.netBookValue.toLocaleString()}</td>
                        <td className="px-2 py-2 text-center">{item.remainingLifeMonths}m</td>
                        <td className="px-2 py-2 font-mono">{item.deprMethod}</td>
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
