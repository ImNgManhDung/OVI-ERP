import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import MasterDataToolbar from './MasterDataToolbar';

interface AssetCategory {
  id: number;
  acaId: string;
  categoryCode: string;
  categoryName: string;
  assetType: string;
  parentCategory: string;
  level: number | string;
  isActive: string;
  assetAcc: string;
  deprAcc: string;
  expenseAcc: string;
  description: string;
}

interface AssetCategoryListProps {
  onCreateClick: () => void;
}

export default function AssetCategoryList({ onCreateClick }: AssetCategoryListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [data, setData] = useState<AssetCategory[]>([
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
      categoryCode: 'TS-NHA',
      categoryName: 'Nhà cửa, vật kiến trúc',
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
      categoryCode: 'TS-PHANMEM',
      categoryName: 'Phần mềm máy tính',
      assetType: 'INTANGIBLE',
      parentCategory: 'TS Vô hình',
      level: 2,
      isActive: 'Y',
      assetAcc: '213',
      deprAcc: '214',
      expenseAcc: '642',
      description: 'Phần mềm ERP, CRM'
    },
    {
      id: 4,
      acaId: 'ACA-004',
      categoryCode: 'TS-XDCB',
      categoryName: 'Xây dựng cơ bản dở dang',
      assetType: 'CIP',
      parentCategory: 'TS Cố định',
      level: 2,
      isActive: 'Y',
      assetAcc: '241',
      deprAcc: '214',
      expenseAcc: '641',
      description: 'Dự án đang thi công'
    },
    {
      id: 5,
      acaId: 'ACA-005',
      categoryCode: 'TS-TRATRUOC',
      categoryName: 'Chi phí trả trước dài hạn',
      assetType: 'PREPAID',
      parentCategory: 'TS Cố định',
      level: 2,
      isActive: 'Y',
      assetAcc: '242',
      deprAcc: '242',
      expenseAcc: '642',
      description: 'Chi phí thuê đất dài hạn'
    }
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newId = Math.max(...data.map(r => r.id), 0) + 1;
    const newRow: AssetCategory = {
      id: newId,
      acaId: `ACA-${String(newId).padStart(3, '0')}`,
      categoryCode: '',
      categoryName: '',
      assetType: 'TANGIBLE',
      parentCategory: '',
      level: '',
      isActive: 'Y',
      assetAcc: '',
      deprAcc: '',
      expenseAcc: '',
      description: ''
    };
    setData([...data, newRow]);
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: keyof AssetCategory, value: any) => {
    setData(data.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const filteredData = data.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 uppercase tracking-tight">Asset Category Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Define asset categories with account mappings and depreciation rules
        </p>
      </div>

      <MasterDataToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={() => console.log('Saving Asset Categories...')}
        selectedCount={selectedRows.length}
      />

      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[2400px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#f0f7ff] border-b">
                <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-20">
                  <Checkbox 
                    checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) setSelectedRows(filteredData.map(r => r.id));
                      else setSelectedRows([]);
                    }}
                  />
                </th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">ACA ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Category Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Category Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Asset Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Parent Category</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-24">Level</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Asset Acc</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Depr Acc</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Expense Acc</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r">Description</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-32">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-3 py-12 text-center text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No asset categories found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-blue-50/50 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10">
                      <Checkbox
                        checked={selectedRows.includes(item.id)}
                        onCheckedChange={() => toggleRowSelection(item.id)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10 font-bold text-blue-600">
                      {item.acaId}
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={item.categoryCode}
                        onChange={(e) => updateRow(item.id, 'categoryCode', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-mono"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={item.categoryName}
                        onChange={(e) => updateRow(item.id, 'categoryName', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-medium"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Select
                        value={item.assetType}
                        onValueChange={(value) => updateRow(item.id, 'assetType', value)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TANGIBLE">Tangible</SelectItem>
                          <SelectItem value="INTANGIBLE">Intangible</SelectItem>
                          <SelectItem value="CIP">CIP</SelectItem>
                          <SelectItem value="PREPAID">Prepaid</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={item.parentCategory}
                        onChange={(e) => updateRow(item.id, 'parentCategory', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Input
                        type="number"
                        value={item.level}
                        onChange={(e) => updateRow(item.id, 'level', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center font-semibold"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={item.assetAcc}
                        onChange={(e) => updateRow(item.id, 'assetAcc', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-mono"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={item.deprAcc}
                        onChange={(e) => updateRow(item.id, 'deprAcc', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-mono"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={item.expenseAcc}
                        onChange={(e) => updateRow(item.id, 'expenseAcc', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-mono"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={item.description}
                        onChange={(e) => updateRow(item.id, 'description', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Select
                        value={item.isActive}
                        onValueChange={(value) => updateRow(item.id, 'isActive', value)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Y">Active</SelectItem>
                          <SelectItem value="N">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between text-xs text-gray-600">
          <div>
            Showing <span className="font-semibold">{filteredData.length}</span> of <span className="font-semibold">{data.length}</span> asset categories
          </div>
          <div className="flex items-center gap-4">
            <span>{selectedRows.length} selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}