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
    bookCode: 'BOOK-ACC',
    bookName: 'Sổ kế toán',
    bookType: 'ACCOUNTING',
    currency: 'VND',
    deprMethod: 'STRAIGHT_LINE',
    isActive: 'Y',
    description: 'Sổ theo dõi kế toán tài sản'
  },
  {
    id: 2,
    aboId: 'ABO-002',
    bookCode: 'BOOK-TAX',
    bookName: 'Sổ thuế',
    bookType: 'TAX',
    currency: 'VND',
    deprMethod: 'STRAIGHT_LINE',
    isActive: 'Y',
    description: 'Sổ theo dõi thuế tài sản'
  },
  {
    id: 3,
    aboId: 'ABO-003',
    bookCode: 'BOOK-MGMT',
    bookName: 'Sổ quản trị',
    bookType: 'MANAGEMENT',
    currency: 'VND',
    deprMethod: 'DECLINING_BALANCE',
    isActive: 'Y',
    description: 'Sổ theo dõi quản trị nội bộ'
  },
  {
    id: 4,
    aboId: 'ABO-004',
    bookCode: 'BOOK-STAT',
    bookName: 'Sổ thống kê',
    bookType: 'STATISTICAL',
    currency: 'VND',
    deprMethod: 'UNITS_OF_PRODUCTION',
    isActive: 'N',
    description: 'Sổ thống kê tài sản'
  }
];

export default function AssetBookList({ onCreateClick }: AssetBookListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Filter data
  const filteredData = mockData.filter(item => {
    const matchesSearch = searchText === '' || Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' && item.isActive === 'Y') ||
      (selectedStatus === 'inactive' && item.isActive === 'N');
    const matchesType = selectedType === 'all' || item.bookType === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate stats
  const activeCount = mockData.filter(item => item.isActive === 'Y').length;
  const inactiveCount = mockData.filter(item => item.isActive === 'N').length;
  const accountingCount = mockData.filter(item => item.bookType === 'ACCOUNTING').length;
  const taxCount = mockData.filter(item => item.bookType === 'TAX').length;

  const customFilters = (
    <>
      {/* Book Type Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Book Type</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Types</option>
          <option value="ACCOUNTING">ACCOUNTING</option>
          <option value="TAX">TAX</option>
          <option value="MANAGEMENT">MANAGEMENT</option>
          <option value="STATISTICAL">STATISTICAL</option>
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
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
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
            <StatsCard title="ACTIVE" value={activeCount} icon={CheckCircle} bgColor="text-green-600" iconBgColor="bg-green-50" />
            <StatsCard title="INACTIVE" value={inactiveCount} icon={FileText} bgColor="text-orange-600" iconBgColor="bg-orange-50" />
            <StatsCard title="ACCOUNTING" value={accountingCount} icon={AlertTriangle} bgColor="text-blue-600" iconBgColor="bg-blue-50" />
            <StatsCard title="TAX" value={taxCount} icon={Calendar} bgColor="text-red-600" iconBgColor="bg-red-50" />
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
              <span>Show Active Only</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox />
              <span>Show Primary Books</span>
            </label>
          </div>

          {/* Table */}
          <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-4 py-2 text-left text-sm text-blue-700">ABO ID</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Book Code</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Book Name</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Book Type</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Currency</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Depr Method</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Description</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Is Active</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-12 h-12 opacity-10" />
                          <span>No asset books found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-2 text-sm font-bold text-blue-600">{item.aboId}</td>
                        <td className="px-4 py-2 text-sm font-mono">{item.bookCode}</td>
                        <td className="px-4 py-2 text-sm font-medium">{item.bookName}</td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.bookType === 'ACCOUNTING' ? 'bg-blue-100 text-blue-700' :
                            item.bookType === 'TAX' ? 'bg-red-100 text-red-700' :
                            item.bookType === 'MANAGEMENT' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {item.bookType}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">{item.currency}</td>
                        <td className="px-4 py-2 text-sm">{item.deprMethod}</td>
                        <td className="px-4 py-2 text-sm">{item.description}</td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.isActive === 'Y' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {item.isActive === 'Y' ? 'Active' : 'Inactive'}
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
