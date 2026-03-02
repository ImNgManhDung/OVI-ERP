import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft, CheckCircle, FileText, AlertTriangle, Calendar, Layers } from 'lucide-react';
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
    description: 'Máy móc thiết bị sản xuất',
    isActive: 'Y'
  },
  {
    id: 2,
    acaId: 'ACA-002',
    categoryCode: 'TS-NVGP',
    categoryName: 'Nhà và vật kiến trúc',
    assetType: 'TANGIBLE',
    description: 'Nhà xưởng, văn phòng',
    isActive: 'Y'
  },
  {
    id: 3,
    acaId: 'ACA-003',
    categoryCode: 'TS-PTVT',
    categoryName: 'Phương tiện vận tải',
    assetType: 'TANGIBLE',
    description: 'Xe ô tô, xe tải',
    isActive: 'Y'
  },
  {
    id: 4,
    acaId: 'ACA-004',
    categoryCode: 'TS-CNTT',
    categoryName: 'Công nghệ thông tin',
    assetType: 'INTANGIBLE',
    description: 'Phần mềm, bản quyền',
    isActive: 'N'
  }
];

export default function AssetCategoryList({ onCreateClick }: AssetCategoryListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filteredData = mockData.filter(item => {
    const matchesSearch = searchText === '' || Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' ||
      (selectedStatus === 'active' && item.isActive === 'Y') ||
      (selectedStatus === 'inactive' && item.isActive === 'N');
    return matchesSearch && matchesStatus;
  });

  const activeCount = mockData.filter(r => r.isActive === 'Y').length;
  const tangibleCount = mockData.filter(r => r.assetType === 'TANGIBLE').length;

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-800">
      {/* Page Header */}
      <div className="bg-white border-b px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-blue-900 uppercase">Asset Category</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Danh mục loại tài sản</span>
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
              <label className="block text-[10px] mb-1.5 ml-0.5">Search</label>
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
                <SelectTrigger className="h-8 text-[11px] bg-gray-50/50 border-gray-200 font-bold uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-[11px]">All Status</SelectItem>
                  <SelectItem value="active" className="text-[11px]">Active</SelectItem>
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
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Categories</p>
                <p className="text-2xl font-black text-blue-900 leading-none">{mockData.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <Layers className="w-5 h-5 text-blue-500" />
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

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-purple-600/70 uppercase mb-1">Tangible</p>
                <p className="text-2xl font-black text-purple-900 leading-none">{tangibleCount}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100/30 flex items-center justify-center border border-purple-100">
                <AlertTriangle className="w-5 h-5 text-purple-500" />
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
                  <Plus className="w-3.5 h-3.5" /> New Category
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
                onSave={() => console.log('Saving categories...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[1200px]">
              <thead className="sticky top-0 z-30 font-bold uppercase tracking-tight text-[10px]">
                <tr className="bg-[#f0f7ff] border-b">
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-40">
                    <Checkbox
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedRows(filteredData.map(r => r.id));
                        else setSelectedRows([]);
                      }}
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-12 z-40 uppercase">ACA ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Category Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-64 font-medium uppercase">Category Name</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r font-medium uppercase">Description</th>
                  <th className="px-3 py-3 text-center text-blue-700 w-32 font-medium uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-20">
                      <Checkbox checked={selectedRows.includes(item.id)} onCheckedChange={() => setSelectedRows(prev => prev.includes(item.id) ? prev.filter(x => x !== item.id) : [...prev, item.id])} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-20 text-[11px] font-bold text-blue-600 uppercase italic cursor-pointer group hover:underline flex items-center gap-1.5" onClick={onCreateClick}>
                      <FileText className="w-3 h-3 text-blue-400 group-hover:text-blue-600" />
                      {item.acaId}
                    </td>
                    <td className="px-3 py-2 border-r text-[11px] font-mono text-gray-500">{item.categoryCode}</td>
                    <td className="px-3 py-2 border-r text-[11px] font-bold text-gray-800">{item.categoryName}</td>
                    <td className="px-3 py-2 border-r text-[11px] text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.assetType === 'TANGIBLE' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                        {item.assetType}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px] text-gray-500">{item.description}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-wider ${item.isActive === 'Y' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}>
                        {item.isActive === 'Y' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-white border-t px-6 py-2 flex items-center justify-between shrink-0 font-bold text-[10px] text-gray-500 uppercase tracking-widest text-center">
            <div>Showing <span className="text-blue-600">{filteredData.length}</span> of {mockData.length} records</div>
          </div>
        </div>
      </div>
    </div>
  );
}
