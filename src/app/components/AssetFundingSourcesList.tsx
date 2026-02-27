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
import { useLanguage } from '../i18n/LanguageContext';

interface AssetFundingSourcesListProps {
  onCreateClick: () => void;
}

interface AssetFundingSourceRow {
  id: number;
  afsId: string;
  sourceCode: string;
  sourceName: string;
  sourceType: 'EQUITY' | 'DEBT' | 'GRANT' | 'PROJECT';
  creditAcc: string;
  description: string;
  isActive: 'Y' | 'N';
  totalBudget: number;
  allocatedAmount: number;
}

const mockData: AssetFundingSourceRow[] = [
  {
    id: 1,
    afsId: 'AFS-001',
    sourceCode: 'EQUITY-01',
    sourceName: 'Vốn chủ sở hữu',
    sourceType: 'EQUITY',
    creditAcc: '411',
    description: 'Nguồn vốn góp từ chủ sở hữu công ty',
    isActive: 'Y',
    totalBudget: 5000000000,
    allocatedAmount: 3200000000
  },
  {
    id: 2,
    afsId: 'AFS-002',
    sourceCode: 'DEBT-01',
    sourceName: 'Vay ngân hàng BIDV',
    sourceType: 'DEBT',
    creditAcc: '341',
    description: 'Khoản vay dài hạn từ ngân hàng BIDV, lãi suất 8%/năm',
    isActive: 'Y',
    totalBudget: 10000000000,
    allocatedAmount: 8500000000
  },
  {
    id: 3,
    afsId: 'AFS-003',
    sourceCode: 'GRANT-01',
    sourceName: 'Quỹ phát triển khoa học công nghệ',
    sourceType: 'GRANT',
    creditAcc: '414',
    description: 'Tài trợ từ quỹ phát triển khoa học công nghệ',
    isActive: 'Y',
    totalBudget: 2000000000,
    allocatedAmount: 1500000000
  },
  {
    id: 4,
    afsId: 'AFS-004',
    sourceCode: 'PROJECT-01',
    sourceName: 'Dự án mở rộng nhà máy 2024',
    sourceType: 'PROJECT',
    creditAcc: '411',
    description: 'Nguồn vốn từ dự án mở rộng sản xuất năm 2024',
    isActive: 'N',
    totalBudget: 15000000000,
    allocatedAmount: 0
  }
];

export default function AssetFundingSourcesList({ onCreateClick }: AssetFundingSourcesListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const { t } = useLanguage();

  // Filter data
  const filteredData = mockData.filter(item => {
    const matchesSearch = searchText === '' || Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' && item.isActive === 'Y') ||
      (selectedStatus === 'inactive' && item.isActive === 'N');
    const matchesType = selectedType === 'all' || item.sourceType === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate stats
  const activeCount = mockData.filter(item => item.isActive === 'Y').length;
  const inactiveCount = mockData.filter(item => item.isActive === 'N').length;
  const equityCount = mockData.filter(item => item.sourceType === 'EQUITY').length;
  const debtCount = mockData.filter(item => item.sourceType === 'DEBT').length;

  const customFilters = (
    <>
      {/* Source Type Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Source Type</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Types</option>
          <option value="EQUITY">EQUITY (Vốn)</option>
          <option value="DEBT">DEBT (Nợ)</option>
          <option value="GRANT">GRANT (Tài trợ)</option>
          <option value="PROJECT">PROJECT (Dự án)</option>
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
          <h1 className="text-xl font-semibold text-gray-800">{t.assets.assetFundingSources}</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">{t.common.home}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">{t.nav.fixedAssets}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">{t.nav.assetFundingSources}</span>
          </nav>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatsCard title="ACTIVE" value={activeCount} icon={CheckCircle} bgColor="text-green-600" iconBgColor="bg-green-50" />
            <StatsCard title="INACTIVE" value={inactiveCount} icon={FileText} bgColor="text-orange-600" iconBgColor="bg-orange-50" />
            <StatsCard title="EQUITY" value={equityCount} icon={AlertTriangle} bgColor="text-blue-600" iconBgColor="bg-blue-50" />
            <StatsCard title="DEBT" value={debtCount} icon={Calendar} bgColor="text-red-600" iconBgColor="bg-red-50" />
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
              <span>Show Fully Allocated</span>
            </label>
          </div>

          {/* Table */}
          <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-4 py-2 text-left text-sm text-blue-700">AFS ID</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Source Code</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Source Name</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Source Type</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Credit Acc</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Total Budget</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Allocated Amount</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Description</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Is Active</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-12 h-12 opacity-10" />
                          <span>No funding sources found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-2 text-sm font-bold text-blue-600">{item.afsId}</td>
                        <td className="px-4 py-2 text-sm font-mono">{item.sourceCode}</td>
                        <td className="px-4 py-2 text-sm font-medium">{item.sourceName}</td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.sourceType === 'EQUITY' ? 'bg-blue-100 text-blue-700' :
                            item.sourceType === 'DEBT' ? 'bg-red-100 text-red-700' :
                            item.sourceType === 'GRANT' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {item.sourceType}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm font-mono">{item.creditAcc}</td>
                        <td className="px-4 py-2 text-sm text-right">{item.totalBudget.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-right">{item.allocatedAmount.toLocaleString()}</td>
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
