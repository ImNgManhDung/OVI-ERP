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
import { Switch } from './ui/switch';
import { toast } from "sonner";
import MasterDataToolbar from './MasterDataToolbar';

interface AssetBookRow {
  id: number;
  aboId: string;
  assId: string;
  acbId: string;
  lenId: string;
  ledger: '0L' | '2L' | '1L' | '';
  currencyCode: string;
  deprStartDate: string;
  lifeMonths: number | string;
  deprMonths: number | string;
  deprMethod: 'SL' | 'DE' | '';
  originalCost: number | string;
  accumDepr: number | string;
  netBookValue: number | string;
  isDepreciate: 'Y' | 'N';
}

const MOCK_ASSETS = [
  { id: 'ASS-001', name: 'Máy tính để bàn HP ProDesk' },
  { id: 'ASS-002', name: 'Máy in Canon MF244DW' },
  { id: 'ASS-003', name: 'Điều hòa Daikin 2HP' },
];

const MOCK_ACB = [
  { id: 'ACB-001', name: 'VAS - Máy móc thiết bị' },
  { id: 'ACB-002', name: 'IFRS - Máy móc thiết bị' },
  { id: 'ACB-003', name: 'INTERNAL - Máy móc thiết bị' },
];

const MOCK_LEGAL_ENTITIES = [
  { id: 'LE-001', name: 'Công ty ABC', currency: 'VND' },
  { id: 'LE-002', name: 'Chi nhánh HN', currency: 'VND' },
  { id: 'LE-003', name: 'Chi nhánh HCM', currency: 'VND' },
];

export default function AssetBookList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const [data, setData] = useState<AssetBookRow[]>([
    {
      id: 1,
      aboId: 'ABO-001',
      assId: 'ASS-001',
      acbId: 'ACB-001',
      lenId: 'LE-001',
      ledger: '0L',
      currencyCode: 'VND',
      deprStartDate: '2024-01-01',
      lifeMonths: 60,
      deprMonths: 12,
      deprMethod: 'SL',
      originalCost: 25000000,
      accumDepr: 5000000,
      netBookValue: 20000000,
      isDepreciate: 'Y'
    },
    {
      id: 2,
      aboId: 'ABO-002',
      assId: 'ASS-001',
      acbId: 'ACB-002',
      lenId: 'LE-001',
      ledger: '2L',
      currencyCode: 'VND',
      deprStartDate: '2024-01-01',
      lifeMonths: 96,
      deprMonths: 12,
      deprMethod: 'SL',
      originalCost: 25000000,
      accumDepr: 3125000,
      netBookValue: 21875000,
      isDepreciate: 'Y'
    },
    {
      id: 3,
      aboId: 'ABO-003',
      assId: 'ASS-002',
      acbId: 'ACB-001',
      lenId: 'LE-002',
      ledger: '0L',
      currencyCode: 'VND',
      deprStartDate: '2024-06-01',
      lifeMonths: 36,
      deprMonths: 6,
      deprMethod: 'SL',
      originalCost: 8500000,
      accumDepr: 1416667,
      netBookValue: 7083333,
      isDepreciate: 'Y'
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
    const newRow: AssetBookRow = {
      id: newId,
      aboId: `ABO-${String(newId).padStart(3, '0')}`,
      assId: '',
      acbId: '',
      lenId: '',
      ledger: '',
      currencyCode: 'VND',
      deprStartDate: '',
      lifeMonths: '',
      deprMonths: '',
      deprMethod: 'SL',
      originalCost: '',
      accumDepr: '',
      netBookValue: '',
      isDepreciate: 'Y'
    };
    setData([...data, newRow]);
    toast.success("Added new asset book");
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    toast.error("Deleted selected records");
  };

  const handleSave = () => {
    toast.success("Asset books saved successfully");
  };

  const updateRow = (id: number, field: keyof AssetBookRow, value: any) => {
    setData(data.map(row => {
      if (row.id === id) {
        const updated = { ...row, [field]: value };
        
        // Auto update currency when legal entity changes
        if (field === 'lenId') {
          const entity = MOCK_LEGAL_ENTITIES.find(e => e.id === value);
          if (entity) {
            updated.currencyCode = entity.currency;
          }
        }
        
        // Auto calculate net book value
        if (field === 'originalCost' || field === 'accumDepr') {
          const original = field === 'originalCost' ? Number(value) : Number(updated.originalCost);
          const accum = field === 'accumDepr' ? Number(value) : Number(updated.accumDepr);
          updated.netBookValue = original - accum;
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

  const formatCurrency = (value: number | string) => {
    if (!value) return '0';
    return Number(value).toLocaleString('vi-VN');
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 uppercase tracking-tight">Asset Books</h1>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý sổ khấu hao tài sản theo từng sổ kế toán (VAS/IFRS/INTERNAL)
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
          <table className="w-full text-sm min-w-[3600px]">
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
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40 bg-[#f0f7ff] sticky left-[100px] z-20">ABO ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">ASS ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">ACB ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Legal Entity</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Ledger</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Currency</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Depr Start Date</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Life Months</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Depr Months</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Depr Method</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Original Cost</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Accum Depr</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Net Book Value</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-32">Is Depreciate</th>
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
                      value={row.aboId}
                      className="h-8 border-0 bg-transparent text-xs font-mono font-semibold text-blue-600"
                      readOnly
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.assId}
                      onValueChange={(val) => updateRow(row.id, 'assId', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_ASSETS.map(asset => (
                          <SelectItem key={asset.id} value={asset.id}>{asset.id} - {asset.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.acbId}
                      onValueChange={(val) => updateRow(row.id, 'acbId', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_ACB.map(acb => (
                          <SelectItem key={acb.id} value={acb.id}>{acb.id} - {acb.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.lenId}
                      onValueChange={(val) => updateRow(row.id, 'lenId', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_LEGAL_ENTITIES.map(entity => (
                          <SelectItem key={entity.id} value={entity.id}>{entity.id} - {entity.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.ledger}
                      onValueChange={(val) => updateRow(row.id, 'ledger', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0L">0L - VAS</SelectItem>
                        <SelectItem value="2L">2L - IFRS</SelectItem>
                        <SelectItem value="1L">1L - INTERNAL</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.currencyCode}
                      className="h-8 border-0 bg-gray-50 text-xs font-mono text-center"
                      readOnly
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="date"
                      value={row.deprStartDate}
                      onChange={(e) => updateRow(row.id, 'deprStartDate', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.lifeMonths}
                      onChange={(e) => updateRow(row.id, 'lifeMonths', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs text-right"
                      placeholder="60"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.deprMonths}
                      onChange={(e) => updateRow(row.id, 'deprMonths', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs text-right"
                      placeholder="12"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.deprMethod}
                      onValueChange={(val) => updateRow(row.id, 'deprMethod', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SL">SL - Straight Line</SelectItem>
                        <SelectItem value="DE">DE - Declining Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.originalCost}
                      onChange={(e) => updateRow(row.id, 'originalCost', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs text-right font-mono"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.accumDepr}
                      onChange={(e) => updateRow(row.id, 'accumDepr', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs text-right font-mono"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={formatCurrency(row.netBookValue)}
                      className="h-8 border-0 bg-blue-50 text-xs text-right font-mono font-semibold text-blue-700"
                      readOnly
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center">
                      <Switch
                        checked={row.isDepreciate === 'Y'}
                        onCheckedChange={(checked) => updateRow(row.id, 'isDepreciate', checked ? 'Y' : 'N')}
                      />
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
          <div className="flex items-center gap-2">
            <span>Total Net Book Value:</span>
            <span className="font-bold text-blue-700">
              {formatCurrency(filteredData.reduce((sum, row) => sum + Number(row.netBookValue || 0), 0))} VND
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}