import { useState } from 'react';
import { GripVertical, Image as ImageIcon } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { toast } from "sonner";
import MasterDataToolbar from './MasterDataToolbar';
import { useLanguage } from '../i18n/LanguageContext';
import CreateFixedAsset from './CreateFixedAsset';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface AssetRow {
  id: number;
  assId: string;
  assCode: string;
  assName: string;
  description: string;
  acaId: string;
  parentAssetId: string;
  serialNumber: string;
  barcode: string;
  model: string;
  manufacturer: string;
  originCountry: string;
  useStartDate: string;
  locationId: string;
  cceId: string;
  empId: string;
  projectId: string;
  imageUrl: string;
  status: 'DRAFT' | 'INACTIVE' | 'ACTIVE' | 'BROKEN' | 'LIQUIDATED' | '';
}

const MOCK_ASSET_CATEGORIES = [
  { id: 'ACA-001', name: 'Máy móc thiết bị' },
  { id: 'ACA-002', name: 'Nhà xưởng' },
  { id: 'ACA-003', name: 'Phương tiện vận tải' },
  { id: 'ACA-004', name: 'Thiết bị văn phòng' },
];

const MOCK_LOCATIONS = [
  { id: 'LOC-001', name: 'Tầng 1 - Phòng IT' },
  { id: 'LOC-002', name: 'Tầng 2 - Phòng Kế toán' },
  { id: 'LOC-003', name: 'Kho A' },
];

const MOCK_COST_CENTERS = [
  { id: 'CCE-001', name: 'Phòng IT' },
  { id: 'CCE-002', name: 'Phòng Kế toán' },
  { id: 'CCE-003', name: 'Phòng Kinh doanh' },
];

const MOCK_EMPLOYEES = [
  { id: 'EMP-001', name: 'Nguyễn Văn A' },
  { id: 'EMP-002', name: 'Trần Thị B' },
  { id: 'EMP-003', name: 'Lê Văn C' },
];

const MOCK_PROJECTS = [
  { id: 'PROJ-001', name: 'Dự án A' },
  { id: 'PROJ-002', name: 'Dự án B' },
  { id: 'PROJ-003', name: 'Dự án C' },
];

const MOCK_COUNTRIES = [
  'Vietnam', 'China', 'Japan', 'USA', 'Germany', 'Korea', 'Taiwan', 'Thailand'
];

export default function AssetList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showCreateAsset, setShowCreateAsset] = useState(false);
  const { t } = useLanguage();
  
  const [data, setData] = useState<AssetRow[]>([
    {
      id: 1,
      assId: 'ASS-001',
      assCode: 'ACA001-00001',
      assName: 'Máy tính để bàn HP ProDesk 400 G6',
      description: 'Máy tính để bàn dùng cho phòng IT, cấu hình: i5-9500, RAM 8GB, SSD 256GB',
      acaId: 'ACA-004',
      parentAssetId: '',
      serialNumber: 'HP2023001234',
      barcode: 'BC-IT-001',
      model: 'HP ProDesk 400 G6',
      manufacturer: 'HP Inc.',
      originCountry: 'Vietnam',
      useStartDate: '2024-01-15',
      locationId: 'LOC-001',
      cceId: 'CCE-001',
      empId: 'EMP-001',
      projectId: '',
      imageUrl: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=200',
      status: 'ACTIVE'
    },
    {
      id: 2,
      assId: 'ASS-002',
      assCode: 'ACA001-00002',
      assName: 'Máy in Canon MF244DW',
      description: 'Máy in đa chức năng laser trắng đen, có scan, copy, fax',
      acaId: 'ACA-004',
      parentAssetId: '',
      serialNumber: 'CN2024567890',
      barcode: 'BC-IT-002',
      model: 'imageCLASS MF244DW',
      manufacturer: 'Canon',
      originCountry: 'Thailand',
      useStartDate: '2024-02-01',
      locationId: 'LOC-002',
      cceId: 'CCE-002',
      empId: 'EMP-002',
      projectId: 'PROJ-001',
      imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200',
      status: 'ACTIVE'
    },
    {
      id: 3,
      assId: 'ASS-003',
      assCode: 'ACA003-00001',
      assName: 'Xe tải Hyundai HD120SL',
      description: 'Xe tải 8 tấn dùng cho vận chuyển hàng hóa',
      acaId: 'ACA-003',
      parentAssetId: '',
      serialNumber: 'KMFWD41GBPU123456',
      barcode: 'BC-VT-001',
      model: 'HD120SL',
      manufacturer: 'Hyundai',
      originCountry: 'Korea',
      useStartDate: '2023-06-10',
      locationId: 'LOC-003',
      cceId: 'CCE-003',
      empId: 'EMP-003',
      projectId: 'PROJ-002',
      imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200',
      status: 'ACTIVE'
    },
    {
      id: 4,
      assId: 'ASS-004',
      assCode: 'ACA001-00003',
      assName: 'Máy photocopy Ricoh MP 3055',
      description: 'Máy photocopy công suất lớn, tốc độ 30 trang/phút',
      acaId: 'ACA-001',
      parentAssetId: '',
      serialNumber: 'RC2024MP3055',
      barcode: 'BC-OP-001',
      model: 'MP 3055',
      manufacturer: 'Ricoh',
      originCountry: 'Japan',
      useStartDate: '2023-12-01',
      locationId: 'LOC-002',
      cceId: 'CCE-002',
      empId: '',
      projectId: '',
      imageUrl: '',
      status: 'BROKEN'
    }
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getNextId = () => {
    return data.length > 0 ? Math.max(...data.map(r => r.id)) + 1 : 1;
  };

  const handleAddRow = () => {
    const newId = getNextId();
    const newRow: AssetRow = {
      id: newId,
      assId: `ASS-${String(newId).padStart(3, '0')}`,
      assCode: '',
      assName: '',
      description: '',
      acaId: '',
      parentAssetId: '',
      serialNumber: '',
      barcode: '',
      model: '',
      manufacturer: '',
      originCountry: 'Vietnam',
      useStartDate: '',
      locationId: '',
      cceId: '',
      empId: '',
      projectId: '',
      imageUrl: '',
      status: 'DRAFT'
    };
    setData([...data, newRow]);
    toast.success("Added new asset");
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    toast.error("Deleted selected assets");
  };

  const handleSave = () => {
    toast.success("Assets saved successfully");
  };

  const updateRow = (id: number, field: keyof AssetRow, value: any) => {
    setData(data.map(row => {
      if (row.id === id) {
        const updated = { ...row, [field]: value };
        
        // Auto-generate ASS_CODE when category is selected
        if (field === 'acaId' && value) {
          const categoryCode = value.replace('ACA-', 'ACA');
          const count = data.filter(r => r.acaId === value).length + 1;
          updated.assCode = `${categoryCode}-${String(count).padStart(5, '0')}`;
        }
        
        return updated;
      }
      return row;
    }));
  };

  const filteredData = data.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      'DRAFT': 'bg-gray-100 text-gray-700',
      'INACTIVE': 'bg-yellow-100 text-yellow-700',
      'ACTIVE': 'bg-green-100 text-green-700',
      'BROKEN': 'bg-red-100 text-red-700',
      'LIQUIDATED': 'bg-purple-100 text-purple-700'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  // Get available parent assets (exclude current and its descendants)
  const getAvailableParentAssets = (currentId: number) => {
    return data.filter(asset => asset.id !== currentId);
  };

  return (
    <div className="erp-page">
      <div className="erp-page-header">
        <div>
          <h1>{t.assets.assetList}</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">{t.common.home}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">{t.nav.fixedAssets}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">{t.nav.assets}</span>
          </nav>
        </div>
      </div>

      <MasterDataToolbar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={handleSave}
        selectedCount={selectedRows.length}
        extraActions={
          <Button 
            variant="default" 
            size="sm" 
            className="h-9 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md gap-2"
            onClick={() => setShowCreateAsset(true)}
          >
            <Plus className="w-4 h-4" /> Create Asset
          </Button>
        }
      />

      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[5500px]">
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
                <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-12 z-20">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                </th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-[100px] z-20">ASS ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Asset Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Asset Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-80">Description</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Category</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Parent Asset</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Serial Number</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Barcode</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Model</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Manufacturer</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Origin Country</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Use Start Date</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Location</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Cost Center</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Employee</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Project</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Status</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-20">Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2 border-r sticky left-0 bg-white z-10">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onCheckedChange={() => toggleRowSelection(row.id)}
                    />
                  </td>
                  <td className="px-3 py-2 border-r sticky left-12 bg-white z-10">
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                  </td>
                  <td className="px-3 py-2 border-r sticky left-[100px] bg-white z-10">
                    <Input
                      value={row.assId}
                      className="h-8 border-0 bg-transparent text-xs font-mono font-semibold text-blue-600"
                      readOnly
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.assCode}
                      className="h-8 border-0 bg-gray-50 text-xs font-mono font-semibold"
                      readOnly
                      placeholder="Auto-generated"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.assName}
                      onChange={(e) => updateRow(row.id, 'assName', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs"
                      placeholder="Enter asset name..."
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.description}
                      onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs"
                      placeholder="Enter description..."
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.acaId}
                      onValueChange={(val) => updateRow(row.id, 'acaId', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_ASSET_CATEGORIES.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.id} - {cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.parentAssetId}
                      onValueChange={(val) => updateRow(row.id, 'parentAssetId', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NONE">None</SelectItem>
                        {getAvailableParentAssets(row.id).map(asset => (
                          <SelectItem key={asset.assId} value={asset.assId}>
                            {asset.assCode} - {asset.assName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.serialNumber}
                      onChange={(e) => updateRow(row.id, 'serialNumber', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs font-mono"
                      placeholder="Serial #"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.barcode}
                      onChange={(e) => updateRow(row.id, 'barcode', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs font-mono"
                      placeholder="Barcode"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.model}
                      onChange={(e) => updateRow(row.id, 'model', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs"
                      placeholder="Model"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.manufacturer}
                      onChange={(e) => updateRow(row.id, 'manufacturer', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs"
                      placeholder="Manufacturer"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.originCountry}
                      onValueChange={(val) => updateRow(row.id, 'originCountry', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_COUNTRIES.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="date"
                      value={row.useStartDate}
                      onChange={(e) => updateRow(row.id, 'useStartDate', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.locationId}
                      onValueChange={(val) => updateRow(row.id, 'locationId', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_LOCATIONS.map(loc => (
                          <SelectItem key={loc.id} value={loc.id}>{loc.id} - {loc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.cceId}
                      onValueChange={(val) => updateRow(row.id, 'cceId', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_COST_CENTERS.map(cc => (
                          <SelectItem key={cc.id} value={cc.id}>{cc.id} - {cc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.empId}
                      onValueChange={(val) => updateRow(row.id, 'empId', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NONE">None</SelectItem>
                        {MOCK_EMPLOYEES.map(emp => (
                          <SelectItem key={emp.id} value={emp.id}>{emp.id} - {emp.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.projectId}
                      onValueChange={(val) => updateRow(row.id, 'projectId', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NONE">None</SelectItem>
                        {MOCK_PROJECTS.map(proj => (
                          <SelectItem key={proj.id} value={proj.id}>{proj.id} - {proj.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.status}
                      onValueChange={(val) => updateRow(row.id, 'status', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DRAFT">DRAFT</SelectItem>
                        <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                        <SelectItem value="BROKEN">BROKEN</SelectItem>
                        <SelectItem value="LIQUIDATED">LIQUIDATED</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center">
                      {row.imageUrl ? (
                        <img 
                          src={row.imageUrl} 
                          alt={row.assName}
                          className="w-8 h-8 rounded object-cover cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => window.open(row.imageUrl, '_blank')}
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t bg-gray-50 flex items-center justify-between text-xs text-gray-600">
          <div>
            Showing <span className="font-semibold">{filteredData.length}</span> of <span className="font-semibold">{data.length}</span> records
          </div>
          <div className="flex items-center gap-4">
            <span>Active Assets: <span className="font-bold text-green-600">{filteredData.filter(r => r.status === 'ACTIVE').length}</span></span>
            <span>Broken: <span className="font-bold text-red-600">{filteredData.filter(r => r.status === 'BROKEN').length}</span></span>
            <span>Liquidated: <span className="font-bold text-purple-600">{filteredData.filter(r => r.status === 'LIQUIDATED').length}</span></span>
          </div>
        </div>
      </div>

      {showCreateAsset && (
        <CreateFixedAsset onClose={() => setShowCreateAsset(false)} />
      )}
    </div>
  );
}