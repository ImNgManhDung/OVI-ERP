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

interface AssetCategoryListProps {
  onCreateClick: () => void;
}

const mockData = [
  {
    id: 1,
    acaId: 'ACA-001',
    categoryCode: 'TS-MMTB',
    categoryName: 'Máy móc thiết bị',
    assetType: 'TANGIBLE',
    parentCategory: 'TS Hữu hình',
    level: 2,
    isActive: 'Y',
    assetAcc: '211',
    deprAcc: '214',
    expenseAcc: '641',
    description: 'Máy móc thiết bị sản xuất'
  },
  {
    id: 2,
    acaId: 'ACA-002',
    categoryCode: 'TS-NVGP',
    categoryName: 'Nhà và vật kiến trúc',
    assetType: 'TANGIBLE',
    parentCategory: 'TS Hữu hình',
    level: 2,
    isActive: 'Y',
    assetAcc: '211',
    deprAcc: '214',
    expenseAcc: '641',
    description: 'Nhà xưởng, văn phòng'
  },
  {
    id: 3,
    acaId: 'ACA-003',
    categoryCode: 'TS-PTVT',
    categoryName: 'Phương tiện vận tải',
    assetType: 'TANGIBLE',
    parentCategory: 'TS Hữu hình',
    level: 2,
    isActive: 'Y',
    assetAcc: '211',
    deprAcc: '214',
    expenseAcc: '641',
    description: 'Xe ô tô, xe tải'
  },
  {
    id: 4,
    acaId: 'ACA-004',
    categoryCode: 'TS-CNTT',
    categoryName: 'Công nghệ thông tin',
    assetType: 'INTANGIBLE',
    parentCategory: 'TS Vô hình',
    level: 2,
    isActive: 'N',
    assetAcc: '213',
    deprAcc: '214',
    expenseAcc: '641',
    description: 'Phần mềm, bản quyền'
  }
];

export default function AssetCategoryList({ onCreateClick }: AssetCategoryListProps) {
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
    const matchesType = selectedType === 'all' || item.assetType === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate stats
  const activeCount = mockData.filter(item => item.isActive === 'Y').length;
  const inactiveCount = mockData.filter(item => item.isActive === 'N').length;
  const tangibleCount = mockData.filter(item => item.assetType === 'TANGIBLE').length;
  const intangibleCount = mockData.filter(item => item.assetType === 'INTANGIBLE').length;

  const customFilters = (
    <>
      {/* Asset Type Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Asset Type</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Types</option>
          <option value="TANGIBLE">TANGIBLE (Hữu hình)</option>
          <option value="INTANGIBLE">INTANGIBLE (Vô hình)</option>
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
          <h1 className="text-xl font-semibold text-gray-800">Asset Category</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Fixed Assets</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Asset Category</span>
          </nav>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatsCard title="ACTIVE" value={activeCount} icon={CheckCircle} bgColor="text-green-600" iconBgColor="bg-green-50" />
            <StatsCard title="INACTIVE" value={inactiveCount} icon={FileText} bgColor="text-orange-600" iconBgColor="bg-orange-50" />
            <StatsCard title="TANGIBLE" value={tangibleCount} icon={AlertTriangle} bgColor="text-blue-600" iconBgColor="bg-blue-50" />
            <StatsCard title="INTANGIBLE" value={intangibleCount} icon={Calendar} bgColor="text-purple-600" iconBgColor="bg-purple-50" />
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
              <span>Show Parent Categories</span>
            </label>
          </div>

          {/* Table */}
          <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-4 py-2 text-left text-sm text-blue-700">ACA ID</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Category Code</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Category Name</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Asset Type</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Parent Category</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Level</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Asset Acc</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Depr Acc</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Expense Acc</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Description</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Is Active</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-12 h-12 opacity-10" />
                          <span>No asset categories found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-2 text-sm font-bold text-blue-600">{item.acaId}</td>
                        <td className="px-4 py-2 text-sm font-mono">{item.categoryCode}</td>
                        <td className="px-4 py-2 text-sm font-medium">{item.categoryName}</td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.assetType === 'TANGIBLE' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {item.assetType}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">{item.parentCategory}</td>
                        <td className="px-4 py-2 text-sm text-center">{item.level}</td>
                        <td className="px-4 py-2 text-sm font-mono">{item.assetAcc}</td>
                        <td className="px-4 py-2 text-sm font-mono">{item.deprAcc}</td>
                        <td className="px-4 py-2 text-sm font-mono">{item.expenseAcc}</td>
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
