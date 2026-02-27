import { useState } from 'react';
import { GripVertical } from 'lucide-react';
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

interface AssetComponentRow {
  id: number;
  acoId: string;
  assId: string;
  parentId: string;
  level: number;
  componentName: string;
  quantity: number;
  costPrice: number;
  serialNumber: string;
  barcode: string;
  warrantyExpire: string;
  warrantyObjId: string;
  calibStartDate: string;
  calibEndDate: string;
  calibObjId: string;
  alertDate: number;
  imageUrl: string;
}

const MOCK_ASSETS = [
  { id: 'ASS-001', name: 'Máy tính để bàn HP ProDesk' },
  { id: 'ASS-002', name: 'Máy in Canon MF244DW' },
  { id: 'ASS-003', name: 'Điều hòa Daikin 2HP' },
];

const MOCK_SUPPLIERS = [
  { id: 'SUP-001', name: 'FPT Shop' },
  { id: 'SUP-002', name: 'Thế Giới Di Động' },
  { id: 'SUP-003', name: 'Nguyễn Kim' },
];

export default function AssetComponentsList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const [data, setData] = useState<AssetComponentRow[]>([
    {
      id: 1,
      acoId: 'ACO-001',
      assId: 'ASS-001',
      parentId: '',
      level: 1,
      componentName: 'Mainboard ASUS ROG',
      quantity: 1,
      costPrice: 5500000,
      serialNumber: 'MB-2024-001',
      barcode: '8934567890123',
      warrantyExpire: '2026-12-31',
      warrantyObjId: 'SUP-001',
      calibStartDate: '2024-01-15',
      calibEndDate: '2025-01-15',
      calibObjId: 'SUP-001',
      alertDate: 30,
      imageUrl: 'https://example.com/images/mainboard.jpg'
    },
    {
      id: 2,
      acoId: 'ACO-002',
      assId: 'ASS-001',
      parentId: 'ACO-001',
      level: 2,
      componentName: 'CPU Intel Core i7-13700K',
      quantity: 1,
      costPrice: 9800000,
      serialNumber: 'CPU-2024-045',
      barcode: '8934567890456',
      warrantyExpire: '2027-06-30',
      warrantyObjId: 'SUP-002',
      calibStartDate: '',
      calibEndDate: '',
      calibObjId: '',
      alertDate: 60,
      imageUrl: ''
    },
    {
      id: 3,
      acoId: 'ACO-003',
      assId: 'ASS-002',
      parentId: '',
      level: 1,
      componentName: 'Drum Unit Canon',
      quantity: 1,
      costPrice: 1200000,
      serialNumber: 'DRM-2024-089',
      barcode: '8934567890789',
      warrantyExpire: '2025-03-31',
      warrantyObjId: 'SUP-003',
      calibStartDate: '2024-02-01',
      calibEndDate: '2024-08-01',
      calibObjId: 'SUP-003',
      alertDate: 15,
      imageUrl: 'https://example.com/images/drum.jpg'
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
    const newRow: AssetComponentRow = {
      id: newId,
      acoId: `ACO-${String(newId).padStart(3, '0')}`,
      assId: '',
      parentId: '',
      level: 1,
      componentName: '',
      quantity: 1,
      costPrice: 0,
      serialNumber: '',
      barcode: '',
      warrantyExpire: '',
      warrantyObjId: '',
      calibStartDate: '',
      calibEndDate: '',
      calibObjId: '',
      alertDate: 30,
      imageUrl: ''
    };
    setData([...data, newRow]);
    toast.success("Added new asset component");
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    toast.error("Deleted selected records");
  };

  const handleSave = () => {
    toast.success("Asset components saved successfully");
  };

  const updateRow = (id: number, field: keyof AssetComponentRow, value: any) => {
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
        <h1 className="text-2xl font-semibold text-gray-800 uppercase tracking-tight">Asset Components</h1>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý linh kiện, phụ tùng của tài sản cố định
        </p>
      </div>

      {/* Toolbar */}
      <MasterDataToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={handleSave}
        selectedCount={selectedRows.length}
      />

      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[4200px]">
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
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40 bg-[#f0f7ff] sticky left-[100px] z-20">ACO ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">ASS ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Parent ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-24">Level</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Component Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Quantity</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Cost Price</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Serial Number</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Barcode</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Warranty Expire</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Warranty Obj ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Calib Start Date</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Calib End Date</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Calib Obj ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Alert Date</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-80">Image URL</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="border-b hover:bg-blue-50/50 transition-colors bg-white">
                  <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onCheckedChange={() => toggleRowSelection(row.id)}
                    />
                  </td>
                  <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10">
                    <GripVertical className="w-4 h-4 text-gray-300" />
                  </td>
                  <td className="px-3 py-2 border-r bg-inherit sticky left-[100px] z-10 font-bold text-blue-600">
                    {row.acoId}
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.assId}
                      onValueChange={(val) => updateRow(row.id, 'assId', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select asset..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_ASSETS.map(a => (
                          <SelectItem key={a.id} value={a.id}>{a.id} - {a.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.parentId}
                      onChange={(e) => updateRow(row.id, 'parentId', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      placeholder="ACO-XXX"
                    />
                  </td>
                  <td className="px-3 py-2 border-r text-center">
                    <Input
                      type="number"
                      value={row.level}
                      onChange={(e) => updateRow(row.id, 'level', parseInt(e.target.value) || 1)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.componentName}
                      onChange={(e) => updateRow(row.id, 'componentName', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-medium"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.quantity}
                      onChange={(e) => updateRow(row.id, 'quantity', parseInt(e.target.value) || 1)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-right"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.costPrice}
                      onChange={(e) => updateRow(row.id, 'costPrice', parseFloat(e.target.value) || 0)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-right font-mono"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.serialNumber}
                      onChange={(e) => updateRow(row.id, 'serialNumber', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-mono"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.barcode}
                      onChange={(e) => updateRow(row.id, 'barcode', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-mono"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="date"
                      value={row.warrantyExpire}
                      onChange={(e) => updateRow(row.id, 'warrantyExpire', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.warrantyObjId}
                      onValueChange={(val) => updateRow(row.id, 'warrantyObjId', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select supplier..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_SUPPLIERS.map(s => (
                          <SelectItem key={s.id} value={s.id}>{s.id} - {s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="date"
                      value={row.calibStartDate}
                      onChange={(e) => updateRow(row.id, 'calibStartDate', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="date"
                      value={row.calibEndDate}
                      onChange={(e) => updateRow(row.id, 'calibEndDate', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.calibObjId}
                      onValueChange={(val) => updateRow(row.id, 'calibObjId', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select supplier..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_SUPPLIERS.map(s => (
                          <SelectItem key={s.id} value={s.id}>{s.id} - {s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.alertDate}
                      onChange={(e) => updateRow(row.id, 'alertDate', parseInt(e.target.value) || 0)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-right"
                      placeholder="Days"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      value={row.imageUrl}
                      onChange={(e) => updateRow(row.id, 'imageUrl', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-xs"
                      placeholder="https://..."
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 border-t bg-gray-50 text-xs text-right text-gray-500 font-medium">
          TOTAL RECORDS: {filteredData.length}
        </div>
      </div>
    </div>
  );
}