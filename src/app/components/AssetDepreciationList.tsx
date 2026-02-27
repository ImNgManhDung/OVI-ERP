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
    periodDate: '31-01-2026',
    assetCode: 'ACA001-00001',
    assetName: 'Máy tính để bàn HP ProDesk',
    bookCode: 'BOOK-ACC',
    deprMethod: 'STRAIGHT_LINE',
    deprAmount: 1275000,
    accDeprAmount: 15300000,
    netBookValue: 138250000,
    status: 'POSTED'
  },
  {
    id: 2,
    adeId: 'ADE-002',
    periodDate: '31-01-2026',
    assetCode: 'ACA001-00002',
    assetName: 'Máy in Canon MF244DW',
    bookCode: 'BOOK-ACC',
    deprMethod: 'STRAIGHT_LINE',
    deprAmount: 708333,
    accDeprAmount: 8500000,
    netBookValue: 76500000,
    status: 'POSTED'
  },
  {
    id: 3,
    adeId: 'ADE-003',
    periodDate: '31-01-2026',
    assetCode: 'ACA003-00001',
    assetName: 'Xe tải Hyundai HD120SL',
    bookCode: 'BOOK-ACC',
    deprMethod: 'DECLINING_BALANCE',
    deprAmount: 14166667,
    accDeprAmount: 170000000,
    netBookValue: 680000000,
    status: 'POSTED'
  },
  {
    id: 4,
    adeId: 'ADE-004',
    periodDate: '28-02-2026',
    assetCode: 'ACA001-00003',
    assetName: 'Máy photocopy Ricoh MP 3055',
    bookCode: 'BOOK-TAX',
    deprMethod: 'STRAIGHT_LINE',
    deprAmount: 750000,
    accDeprAmount: 4500000,
    netBookValue: 40500000,
    status: 'DRAFT'
  }
];

export default function AssetDepreciationList({ onCreateClick }: AssetDepreciationListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBook, setSelectedBook] = useState('all');

  // Filter data
  const filteredData = mockData.filter(item => {
    const matchesSearch = searchText === '' || Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesBook = selectedBook === 'all' || item.bookCode === selectedBook;

    return matchesSearch && matchesStatus && matchesBook;
  });

  // Calculate stats
  const postedCount = mockData.filter(item => item.status === 'POSTED').length;
  const draftCount = mockData.filter(item => item.status === 'DRAFT').length;
  const totalAmount = mockData.reduce((sum, item) => sum + item.deprAmount, 0);

  const customFilters = (
    <>
      {/* Book Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Book</label>
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Books</option>
          <option value="BOOK-ACC">BOOK-ACC</option>
          <option value="BOOK-TAX">BOOK-TAX</option>
          <option value="BOOK-MGMT">BOOK-MGMT</option>
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
          { value: 'POSTED', label: 'Posted' },
          { value: 'DRAFT', label: 'Draft' },
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
            <StatsCard title="DRAFT" value={draftCount} icon={FileText} bgColor="text-orange-600" iconBgColor="bg-orange-50" />
            <StatsCard title="TOTAL AMOUNT" value={`${(totalAmount / 1000000).toFixed(1)}M`} icon={AlertTriangle} bgColor="text-blue-600" iconBgColor="bg-blue-50" />
            <StatsCard title="RECORDS" value={mockData.length} icon={Calendar} bgColor="text-purple-600" iconBgColor="bg-purple-50" />
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
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-4 py-2 text-left text-sm text-blue-700">ADE ID</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Period Date</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Asset Code</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Asset Name</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Book Code</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Depr Method</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Depr Amount</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Acc Depr Amount</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Net Book Value</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-12 h-12 opacity-10" />
                          <span>No depreciations found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-2 text-sm font-bold text-blue-600">{item.adeId}</td>
                        <td className="px-4 py-2 text-sm">{item.periodDate}</td>
                        <td className="px-4 py-2 text-sm font-mono">{item.assetCode}</td>
                        <td className="px-4 py-2 text-sm font-medium">{item.assetName}</td>
                        <td className="px-4 py-2 text-sm font-mono">{item.bookCode}</td>
                        <td className="px-4 py-2 text-sm">{item.deprMethod}</td>
                        <td className="px-4 py-2 text-sm text-right">{item.deprAmount.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-right">{item.accDeprAmount.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-right font-medium">{item.netBookValue.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.status === 'POSTED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.status}
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
