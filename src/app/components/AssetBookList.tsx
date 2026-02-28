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

interface AssetBookListProps {
  onCreateClick: () => void;
}

const mockData = [
  {
    id: 1,
    aboId: 'ABO-001',
    assId: 'ASS-001',
    acbId: 'ACB-001',
    lenId: 'LEN-001',
    ledger: '0L',
    currencyCode: 'VND',
    deprStartDate: '01-01-2024',
    lifeMonths: 60,
    deprMonths: 14,
    deprMethod: 'SL',
    originalCost: 150000000,
    accumDepr: 35000000,
    netBookValue: 115000000,
    isDepreciate: 'Y'
  },
  {
    id: 2,
    aboId: 'ABO-002',
    assId: 'ASS-001',
    acbId: 'ACB-002',
    lenId: 'LEN-001',
    ledger: '2L',
    currencyCode: 'VND',
    deprStartDate: '01-01-2024',
    lifeMonths: 96,
    deprMonths: 14,
    deprMethod: 'SL',
    originalCost: 150000000,
    accumDepr: 21875000,
    netBookValue: 128125000,
    isDepreciate: 'Y'
  },
  {
    id: 3,
    aboId: 'ABO-003',
    assId: 'ASS-002',
    acbId: 'ACB-001',
    lenId: 'LEN-001',
    ledger: '0L',
    currencyCode: 'VND',
    deprStartDate: '01-06-2024',
    lifeMonths: 36,
    deprMonths: 9,
    deprMethod: 'DE',
    originalCost: 85000000,
    accumDepr: 24500000,
    netBookValue: 60500000,
    isDepreciate: 'Y'
  },
  {
    id: 4,
    aboId: 'ABO-004',
    assId: 'ASS-003',
    acbId: 'ACB-003',
    lenId: 'LEN-002',
    ledger: '1L',
    currencyCode: 'USD',
    deprStartDate: '15-03-2024',
    lifeMonths: 48,
    deprMonths: 11,
    deprMethod: 'SL',
    originalCost: 25000,
    accumDepr: 5729,
    netBookValue: 19271,
    isDepreciate: 'Y'
  },
  {
    id: 5,
    aboId: 'ABO-005',
    assId: 'ASS-004',
    acbId: 'ACB-001',
    lenId: 'LEN-001',
    ledger: '0L',
    currencyCode: 'VND',
    deprStartDate: '01-01-2025',
    lifeMonths: 0,
    deprMonths: 0,
    deprMethod: 'SL',
    originalCost: 45000000,
    accumDepr: 0,
    netBookValue: 45000000,
    isDepreciate: 'N'
  }
];

export default function AssetBookList({ onCreateClick }: AssetBookListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLedger, setSelectedLedger] = useState('all');

  // Filter data
  const filteredData = mockData.filter(item => {
    const matchesSearch = searchText === '' || Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'depreciate' && item.isDepreciate === 'Y') ||
      (selectedStatus === 'no-depreciate' && item.isDepreciate === 'N');
    const matchesLedger = selectedLedger === 'all' || item.ledger === selectedLedger;

    return matchesSearch && matchesStatus && matchesLedger;
  });

  // Calculate stats
  const deprCount = mockData.filter(item => item.isDepreciate === 'Y').length;
  const noDeprCount = mockData.filter(item => item.isDepreciate === 'N').length;
  const vasCount = mockData.filter(item => item.ledger === '0L').length;
  const ifrsCount = mockData.filter(item => item.ledger === '2L').length;

  const customFilters = (
    <>
      {/* Ledger Filter */}
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
          { value: 'depreciate', label: 'Depreciate' },
          { value: 'no-depreciate', label: 'No Depreciate' },
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
          <h1 className="text-xl font-semibold text-gray-800">Asset Books</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Fixed Assets</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Asset Books</span>
          </nav>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatsCard title="DEPRECIATE" value={deprCount} icon={CheckCircle} bgColor="text-green-600" iconBgColor="bg-green-50" />
            <StatsCard title="NO DEPRECIATE" value={noDeprCount} icon={FileText} bgColor="text-orange-600" iconBgColor="bg-orange-50" />
            <StatsCard title="VAS (0L)" value={vasCount} icon={AlertTriangle} bgColor="text-blue-600" iconBgColor="bg-blue-50" />
            <StatsCard title="IFRS (2L)" value={ifrsCount} icon={Calendar} bgColor="text-purple-600" iconBgColor="bg-purple-50" />
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
              <span>Show Depreciate Only</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox />
              <span>Show VAS Only</span>
            </label>
          </div>

          {/* Table */}
          <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">ABO ID</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">ASS ID</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">ACB ID</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">LEN ID</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">Ledger</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">Currency</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">Depr Start</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">Life (Mo)</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">Depr (Mo)</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">Method</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">Original Cost</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">Accum Depr</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">NBV</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-blue-700">Is Depr</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={14} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-12 h-12 opacity-10" />
                          <span>No asset books found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="px-3 py-2.5 text-xs font-bold text-blue-600">{item.aboId}</td>
                        <td className="px-3 py-2.5 text-xs font-mono">{item.assId}</td>
                        <td className="px-3 py-2.5 text-xs font-mono">{item.acbId}</td>
                        <td className="px-3 py-2.5 text-xs font-mono">{item.lenId}</td>
                        <td className="px-3 py-2.5 text-xs">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.ledger === '0L' ? 'bg-blue-100 text-blue-700' :
                            item.ledger === '1L' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {item.ledger}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-xs">{item.currencyCode}</td>
                        <td className="px-3 py-2.5 text-xs">{item.deprStartDate}</td>
                        <td className="px-3 py-2.5 text-xs text-center">{item.lifeMonths}</td>
                        <td className="px-3 py-2.5 text-xs text-center">{item.deprMonths}</td>
                        <td className="px-3 py-2.5 text-xs font-mono">{item.deprMethod}</td>
                        <td className="px-3 py-2.5 text-xs text-right font-medium">{item.originalCost.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-xs text-right">{item.accumDepr.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-xs text-right font-bold">{item.netBookValue.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-xs">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.isDepreciate === 'Y' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {item.isDepreciate === 'Y' ? 'Yes' : 'No'}
                          </span>
                        </td>
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
