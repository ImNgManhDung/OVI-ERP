import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft, Building2, CheckCircle, AlertTriangle, Calendar, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import MasterDataToolbar from './MasterDataToolbar';

interface FixedAssetListProps {
  onCreateClick: () => void;
}

interface FixedAsset {
  date: string;
  assetCode: string;
  assetName: string;
  category: string;
  serialNumber: string;
  location: string;
  employee: string;
  totalValue: number;
  status: string;
  useStartDate: string;
}

const fixedAssetsData: FixedAsset[] = [
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
    category: 'Thiết thiết bị văn phòng',
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
  }
];

export default function FixedAssetList({ onCreateClick }: FixedAssetListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredAssets = fixedAssetsData.filter(asset => {
    const matchesSearch = searchText === '' ||
      Object.values(asset).some(val => String(val).toLowerCase().includes(searchText.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || asset.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const activeCount = fixedAssetsData.filter(a => a.status === 'active').length;
  const brokenCount = fixedAssetsData.filter(a => a.status === 'broken').length;

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-800">
      {/* Page Header */}
      <div className="bg-white border-b px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-blue-900 uppercase">Fixed Assets</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Danh sách tài sản cố định</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Filter Panel - Left Sidebar */}
        <div className="w-[240px] bg-white border-r flex flex-col shrink-0 p-4 shadow-sm z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-800 mb-4 uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-blue-600" />
            Filters
          </div>

          <div className="space-y-4 overflow-y-auto flex-1 pr-1 custom-scrollbar text-xs font-bold uppercase tracking-wider text-gray-500">
            <div>
              <label className="block text-[10px] mb-1.5 ml-0.5">Search Asset</label>
              <Input
                placeholder="Name or Code..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="h-8 text-[11px] bg-gray-50/50 border-gray-200 shadow-none font-medium"
              />
            </div>
            <div>
              <label className="block text-[10px] mb-1.5 ml-0.5">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="h-8 text-[11px] bg-gray-50/50 border-gray-200 uppercase font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-[11px]">All Status</SelectItem>
                  <SelectItem value="active" className="text-[11px]">Active</SelectItem>
                  <SelectItem value="broken" className="text-[11px]">Broken</SelectItem>
                  <SelectItem value="inactive" className="text-[11px]">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Statistics Cards */}
          <div className="px-6 py-4 grid grid-cols-3 gap-4">
            <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Assets</p>
                <p className="text-2xl font-black text-blue-900 leading-none">{fixedAssetsData.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <Building2 className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Active</p>
                <p className="text-2xl font-black text-emerald-900 leading-none">{activeCount}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            </div>

            <div className="bg-rose-50/40 border border-rose-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-rose-600/70 uppercase mb-1">Broken</p>
                <p className="text-2xl font-black text-rose-900 leading-none">{brokenCount}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-rose-100/30 flex items-center justify-center border border-rose-100">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
            </div>
          </div>

          {/* Grouping Bar and Toolbar */}
          <div className="px-6 pb-2">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-gray-100/50 border border-dashed border-gray-200 rounded-lg px-4 py-2 text-[11px] text-gray-400 italic flex-1 mr-6 flex items-center gap-2">
                <LayoutPanelLeft className="w-3.5 h-3.5" />
                Kéo tiêu đề một cột vào đây để nhóm một cột đó
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={onCreateClick} className="bg-blue-600 hover:bg-blue-700 text-[11px] font-bold h-8 px-4 shadow-sm gap-2 whitespace-nowrap">
                  <Plus className="w-3.5 h-3.5" /> New Asset
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input placeholder="Search..." className="h-8 w-40 pl-9 text-[11px] shadow-none font-medium" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>
                <div className="flex items-center gap-1 h-8 bg-white border border-gray-200 rounded-md px-1 ml-1 divide-x divide-gray-100 text-gray-400">
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-sm scale-90"><LayoutPanelLeft className="w-3 h-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-sm scale-90"><RotateCcw className="w-3 h-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-sm scale-90"><Settings2 className="w-3 h-3" /></Button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          {selectedRows.length > 0 && (
            <div className="mx-6 mb-2">
              <MasterDataToolbar
                searchText={searchText}
                onSearchChange={setSearchText}
                onAddRow={onCreateClick}
                onDeleteRows={() => setSelectedRows([])}
                onSave={() => console.log('Saving assets...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[2000px]">
              <thead className="sticky top-0 z-30 font-bold uppercase tracking-tight text-[10px]">
                <tr className="bg-[#f0f7ff] border-b">
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-40">
                    <Checkbox
                      checked={selectedRows.length === filteredAssets.length && filteredAssets.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedRows(filteredAssets.map(r => r.assetCode));
                        else setSelectedRows([]);
                      }}
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 bg-[#f0f7ff] sticky left-12 z-40 uppercase">Asset Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-72 font-medium uppercase">Asset Name</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Category</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Serial Number</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Location</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Employee</th>
                  <th className="px-3 py-3 text-right text-blue-700 border-r w-40 font-medium uppercase px-4">Total Value</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">Use Start Date</th>
                  <th className="px-3 py-3 text-center text-blue-700 w-32 font-medium uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-20">
                      <Checkbox checked={selectedRows.includes(asset.assetCode)} onCheckedChange={() => setSelectedRows(prev => prev.includes(asset.assetCode) ? prev.filter(x => x !== asset.assetCode) : [...prev, asset.assetCode])} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-20 text-[11px] font-bold text-blue-600 uppercase italic cursor-pointer group hover:underline flex items-center gap-1.5" onClick={onCreateClick}>
                      <FileText className="w-3 h-3 text-blue-400 group-hover:text-blue-600" />
                      {asset.assetCode}
                    </td>
                    <td className="px-3 py-2 border-r text-[11px] font-bold text-gray-800">{asset.assetName}</td>
                    <td className="px-3 py-2 border-r text-[11px]"><span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600">{asset.category}</span></td>
                    <td className="px-3 py-2 border-r text-[11px] font-mono text-gray-500 uppercase">{asset.serialNumber}</td>
                    <td className="px-3 py-2 border-r text-[11px]">{asset.location}</td>
                    <td className="px-3 py-2 border-r text-[11px] font-medium text-gray-600">{asset.employee || <span className="text-gray-300 italic">unassigned</span>}</td>
                    <td className="px-3 py-2 border-r text-[11px] font-black text-right px-4 text-emerald-600">{asset.totalValue.toLocaleString()} <span className="text-[9px] text-emerald-400">VND</span></td>
                    <td className="px-3 py-2 border-r text-[10px] text-center text-gray-400 italic">{asset.useStartDate}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-wider ${asset.status === 'active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                          asset.status === 'broken' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                            'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}>
                        {asset.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-white border-t px-6 py-2 flex items-center justify-between shrink-0 font-bold text-[10px] text-gray-500 uppercase tracking-widest text-center">
            <div>Showing <span className="text-blue-600">{filteredAssets.length}</span> of {fixedAssetsData.length} records</div>
            <div className="flex gap-4">
              <span className="text-emerald-600">Active: {activeCount}</span>
              <span className="text-rose-600">Broken: {brokenCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}