import { useState } from 'react';
import { CheckCircle, FileText, AlertTriangle, Calendar, Plus, Search, ChevronDown } from 'lucide-react';
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

interface FixedAssetListProps {
  onCreateClick: () => void;
}

// Mock data
const fixedAssets = [
  {
    date: '15-01-2024',
    assetCode: 'ACA001-00001',
    assetName: 'Máy tính để bàn HP ProDesk 400 G6',
    category: 'Thiết bị văn phòng',
    serialNumber: 'HP2023001234',
    location: 'Tầng 1 - Phòng IT',
    employee: 'Nguyễn Văn A',
    totalValue: 15300000,
    status: 'active',
    useStartDate: '15-01-2024'
  },
  {
    date: '01-02-2024',
    assetCode: 'ACA001-00002',
    assetName: 'Máy in Canon MF244DW',
    category: 'Thiết bị văn phòng',
    serialNumber: 'CN2024567890',
    location: 'Tầng 2 - Phòng Kế toán',
    employee: 'Trần Thị B',
    totalValue: 8500000,
    status: 'active',
    useStartDate: '01-02-2024'
  },
  {
    date: '10-06-2023',
    assetCode: 'ACA003-00001',
    assetName: 'Xe tải Hyundai HD120SL',
    category: 'Phương tiện vận tải',
    serialNumber: 'KMFWD41GBPU123456',
    location: 'Kho A',
    employee: 'Lê Văn C',
    totalValue: 850000000,
    status: 'active',
    useStartDate: '10-06-2023'
  },
  {
    date: '01-12-2023',
    assetCode: 'ACA001-00003',
    assetName: 'Máy photocopy Ricoh MP 3055',
    category: 'Máy móc thiết bị',
    serialNumber: 'RC2024MP3055',
    location: 'Tầng 2 - Phòng Kế toán',
    employee: '',
    totalValue: 45000000,
    status: 'broken',
    useStartDate: '01-12-2023'
  },
  {
    date: '05-03-2024',
    assetCode: 'ACA004-00001',
    assetName: 'Điều hòa Daikin 2HP',
    category: 'Thiết bị văn phòng',
    serialNumber: 'DK2024-001',
    location: 'Tầng 1 - Phòng IT',
    employee: '',
    totalValue: 12000000,
    status: 'inactive',
    useStartDate: '05-03-2024'
  },
  {
    date: '20-08-2022',
    assetCode: 'ACA002-00001',
    assetName: 'Nhà kho B - Khu công nghiệp',
    category: 'Nhà xưởng',
    serialNumber: 'NXB-2022-001',
    location: 'Khu công nghiệp',
    employee: '',
    totalValue: 5000000000,
    status: 'active',
    useStartDate: '20-08-2022'
  }
];

export default function FixedAssetList({ onCreateClick }: FixedAssetListProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Calculate KPI values
  const activeCount = fixedAssets.filter(asset => asset.status === 'active').length;
  const inactiveCount = fixedAssets.filter(asset => asset.status === 'inactive').length;
  const brokenCount = fixedAssets.filter(asset => asset.status === 'broken').length;
  const disposedCount = fixedAssets.filter(asset => asset.status === 'disposed').length;

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: <span className="erp-badge-success">Active</span>,
      inactive: <span className="erp-badge-warning">Inactive</span>,
      broken: <span className="erp-badge-danger">Broken</span>,
      disposed: <span className="erp-badge-neutral">Disposed</span>,
    };
    return statusMap[status as keyof typeof statusMap] || <span className="erp-badge-neutral">{status}</span>;
  };

  const filterOptions = [
    {
      label: 'From Date',
      type: 'date' as const,
      value: '2025-01-01',
    },
    {
      label: 'To Date',
      type: 'date' as const,
      value: '2025-12-31',
    },
    {
      label: 'Status',
      type: 'select' as const,
      options: ['All', 'Active', 'Inactive', 'Disposed'],
      value: 'All',
    },
    {
      label: 'Category',
      type: 'select' as const,
      options: ['All', 'Building', 'Equipment', 'Vehicle', 'IT Equipment'],
      value: 'All',
    },
  ];

  return (
    <div className="flex gap-6 p-6">
      {/* Left: Filter Panel */}
      <FilterPanel
        title="Filter Options"
        filters={filterOptions}
        onClearAll={() => console.log('Clear all filters')}
      />

      {/* Right: Main Content */}
      <div className="flex-1">
        {/* Page Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">FIXED ASSETS</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="ACTIVE"
            value={activeCount}
            icon={CheckCircle}
            bgColor="text-green-600"
            iconBgColor="bg-green-50"
          />
          <StatsCard
            title="INACTIVE"
            value={inactiveCount}
            icon={FileText}
            bgColor="text-orange-600"
            iconBgColor="bg-orange-50"
          />
          <StatsCard
            title="BROKEN"
            value={brokenCount}
            icon={AlertTriangle}
            bgColor="text-red-600"
            iconBgColor="bg-red-50"
          />
          <StatsCard
            title="DISPOSED"
            value={disposedCount}
            icon={Calendar}
            bgColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />
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
            <span>Show Only Depreciating Assets</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox />
            <span>Show Assets Without Components</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked />
            <span>Show Assigned Assets Only</span>
          </label>
        </div>

        {/* Table */}
        <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 border-b">
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Date ↑↓1</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Asset Code ↑↓2</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Asset Name</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Category</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Serial Number</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Location</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Employee</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Total Value</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Use Start Date</th>
                  <th className="px-4 py-2 text-left text-sm text-blue-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {fixedAssets.map((asset, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                    <td className="px-4 py-2 text-sm">{asset.date}</td>
                    <td className="px-4 py-2 text-sm font-semibold text-blue-600">{asset.assetCode}</td>
                    <td className="px-4 py-2 text-sm">{asset.assetName}</td>
                    <td className="px-4 py-2 text-sm">{asset.category}</td>
                    <td className="px-4 py-2 text-sm font-mono text-gray-600">{asset.serialNumber}</td>
                    <td className="px-4 py-2 text-sm">{asset.location}</td>
                    <td className="px-4 py-2 text-sm">{asset.employee || '-'}</td>
                    <td className="px-4 py-2 text-sm text-right font-semibold">{asset.totalValue.toLocaleString()} VND</td>
                    <td className="px-4 py-2 text-sm">{asset.useStartDate}</td>
                    <td className="px-4 py-2 text-sm">{getStatusBadge(asset.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Summary */}
          <div className="border-t bg-gray-50 px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex gap-6">
                <span className="text-gray-600">
                  Total Assets: <span className="font-semibold text-gray-800">{fixedAssets.length}</span>
                </span>
                <span className="text-gray-600">
                  Total Value: <span className="font-semibold text-gray-800">
                    {fixedAssets.reduce((sum, asset) => sum + asset.totalValue, 0).toLocaleString()} VND
                  </span>
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-green-600">
                  Active: <span className="font-bold">{activeCount}</span>
                </span>
                <span className="text-yellow-600">
                  Inactive: <span className="font-bold">{inactiveCount}</span>
                </span>
                <span className="text-red-600">
                  Broken: <span className="font-bold">{brokenCount}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}