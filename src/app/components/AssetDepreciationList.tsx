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

interface AssetDepreciationRow {
  id: number;
  adeId: string;
  assId: string;
  lenId: string;
  ledger: '0L' | '2L' | '1L' | '';
  fiscalYear: number | string;
  accPeriod: string;
  documentDate: string;
  cceId: string;
  projId: string;
  expenseAccId: string;
  deprAccId: string;
  currencyCode: string;
  originalCost: number | string;
  deprAmount: number | string;
  adjustAmount: number | string;
  netBookValue: number | string;
  remainingLifeMonths: number | string;
  deprMethod: 'SL' | 'DE' | '';
  isRetired: 'Y' | 'N';
  status: 'D' | 'C' | 'P' | 'R' | '';
  uleId: string;
  postingDate: string;
  createdBy: string;
  createdDate: string;
}

const MOCK_ASSETS = [
  { id: 'ASS-001', name: 'Máy tính để bàn HP ProDesk' },
  { id: 'ASS-002', name: 'Máy in Canon MF244DW' },
  { id: 'ASS-003', name: 'Điều hòa Daikin 2HP' },
];

const MOCK_LEGAL_ENTITIES = [
  { id: 'LE-001', name: 'Công ty ABC', currency: 'VND' },
  { id: 'LE-002', name: 'Chi nhánh HN', currency: 'VND' },
  { id: 'LE-003', name: 'Chi nhánh HCM', currency: 'VND' },
];

const MOCK_COST_CENTERS = [
  { id: 'CCE-001', name: 'Phòng IT' },
  { id: 'CCE-002', name: 'Phòng Kế toán' },
  { id: 'CCE-003', name: 'Phòng Kinh doanh' },
];

const MOCK_PROJECTS = [
  { id: 'PROJ-001', name: 'Dự án A' },
  { id: 'PROJ-002', name: 'Dự án B' },
  { id: 'PROJ-003', name: 'Dự án C' },
];

const MOCK_ACCOUNTS = [
  { id: '641', name: 'Chi phí sản xuất chung' },
  { id: '642', name: 'Chi phí quản lý doanh nghiệp' },
  { id: '627', name: 'Chi phí sản xuất chung' },
  { id: '214', name: 'Hao mòn TSCĐ' },
];

export default function AssetDepreciationList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const [data, setData] = useState<AssetDepreciationRow[]>([
    {
      id: 1,
      adeId: 'ADE-001',
      assId: 'ASS-001',
      lenId: 'LE-001',
      ledger: '0L',
      fiscalYear: 2024,
      accPeriod: '02-2024',
      documentDate: '2024-02-29',
      cceId: 'CCE-001',
      projId: '',
      expenseAccId: '642',
      deprAccId: '214',
      currencyCode: 'VND',
      originalCost: 25000000,
      deprAmount: 416667,
      adjustAmount: 0,
      netBookValue: 20000000,
      remainingLifeMonths: 48,
      deprMethod: 'SL',
      isRetired: 'N',
      status: 'P',
      uleId: 'ULE-2024-002-123',
      postingDate: '2024-02-29',
      createdBy: 'admin',
      createdDate: '2024-02-29'
    },
    {
      id: 2,
      adeId: 'ADE-002',
      assId: 'ASS-001',
      lenId: 'LE-001',
      ledger: '2L',
      fiscalYear: 2024,
      accPeriod: '02-2024',
      documentDate: '2024-02-29',
      cceId: 'CCE-001',
      projId: '',
      expenseAccId: '642',
      deprAccId: '214',
      currencyCode: 'VND',
      originalCost: 25000000,
      deprAmount: 260417,
      adjustAmount: 0,
      netBookValue: 21875000,
      remainingLifeMonths: 84,
      deprMethod: 'SL',
      isRetired: 'N',
      status: 'P',
      uleId: 'ULE-2024-002-124',
      postingDate: '2024-02-29',
      createdBy: 'admin',
      createdDate: '2024-02-29'
    },
    {
      id: 3,
      adeId: 'ADE-003',
      assId: 'ASS-002',
      lenId: 'LE-002',
      ledger: '0L',
      fiscalYear: 2024,
      accPeriod: '02-2024',
      documentDate: '2024-02-29',
      cceId: 'CCE-002',
      projId: 'PROJ-001',
      expenseAccId: '627',
      deprAccId: '214',
      currencyCode: 'VND',
      originalCost: 8500000,
      deprAmount: 236111,
      adjustAmount: 0,
      netBookValue: 7083333,
      remainingLifeMonths: 30,
      deprMethod: 'SL',
      isRetired: 'N',
      status: 'C',
      uleId: '',
      postingDate: '',
      createdBy: 'khanh.nguyen',
      createdDate: '2024-02-28'
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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    
    const newRow: AssetDepreciationRow = {
      id: newId,
      adeId: `ADE-${String(newId).padStart(3, '0')}`,
      assId: '',
      lenId: '',
      ledger: '',
      fiscalYear: currentYear,
      accPeriod: `${currentMonth}-${currentYear}`,
      documentDate: '',
      cceId: '',
      projId: '',
      expenseAccId: '',
      deprAccId: '214',
      currencyCode: 'VND',
      originalCost: '',
      deprAmount: '',
      adjustAmount: 0,
      netBookValue: '',
      remainingLifeMonths: '',
      deprMethod: 'SL',
      isRetired: 'N',
      status: 'D',
      uleId: '',
      postingDate: '',
      createdBy: 'admin',
      createdDate: currentDate.toISOString().split('T')[0]
    };
    setData([...data, newRow]);
    toast.success("Added new depreciation record");
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    toast.error("Deleted selected records");
  };

  const handleSave = () => {
    toast.success("Asset depreciations saved successfully");
  };

  const updateRow = (id: number, field: keyof AssetDepreciationRow, value: any) => {
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
        if (field === 'originalCost' || field === 'deprAmount' || field === 'adjustAmount') {
          const original = field === 'originalCost' ? Number(value) : Number(updated.originalCost);
          const depr = field === 'deprAmount' ? Number(value) : Number(updated.deprAmount);
          const adjust = field === 'adjustAmount' ? Number(value) : Number(updated.adjustAmount);
          // This is simplified - in real scenario, NBV would be calculated based on accumulated depreciation
          updated.netBookValue = original - depr - adjust;
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

  const getStatusBadge = (status: string) => {
    const styles = {
      'D': 'bg-gray-100 text-gray-700',
      'C': 'bg-yellow-100 text-yellow-700',
      'P': 'bg-green-100 text-green-700',
      'R': 'bg-red-100 text-red-700'
    };
    const labels = {
      'D': 'Draft',
      'C': 'Calculated',
      'P': 'Posted',
      'R': 'Reversed'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 uppercase tracking-tight">Asset Depreciations</h1>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý bảng phân bổ khấu hao tài sản theo từng kỳ kế toán
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
          <table className="w-full text-sm min-w-[5800px]">
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
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40 bg-[#f0f7ff] sticky left-[100px] z-20">ADE ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">ASS ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Legal Entity</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Ledger</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Fiscal Year</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Period</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Document Date</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Cost Center</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Project</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Expense Account</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Depr Account</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Currency</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Original Cost</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Depr Amount</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Adjust Amount</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Net Book Value</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Remaining Months</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Depr Method</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Is Retired</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Status</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">ULE ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Posting Date</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Created By</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-40">Created Date</th>
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
                      value={row.adeId}
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
                      type="number"
                      value={row.fiscalYear}
                      onChange={(e) => updateRow(row.id, 'fiscalYear', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs text-center"
                      placeholder="2024"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.accPeriod}
                      onChange={(e) => updateRow(row.id, 'accPeriod', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs text-center"
                      placeholder="MM-YYYY"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="date"
                      value={row.documentDate}
                      onChange={(e) => updateRow(row.id, 'documentDate', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs"
                    />
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
                      value={row.projId}
                      onValueChange={(val) => updateRow(row.id, 'projId', val)}
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
                      value={row.expenseAccId}
                      onValueChange={(val) => updateRow(row.id, 'expenseAccId', val)}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_ACCOUNTS.filter(a => a.id !== '214').map(acc => (
                          <SelectItem key={acc.id} value={acc.id}>{acc.id} - {acc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.deprAccId}
                      className="h-8 border-0 bg-gray-50 text-xs text-center font-mono"
                      readOnly
                    />
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
                      value={row.deprAmount}
                      onChange={(e) => updateRow(row.id, 'deprAmount', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs text-right font-mono"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.adjustAmount}
                      onChange={(e) => updateRow(row.id, 'adjustAmount', e.target.value)}
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
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.remainingLifeMonths}
                      onChange={(e) => updateRow(row.id, 'remainingLifeMonths', e.target.value)}
                      className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs text-right"
                      placeholder="0"
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
                    <div className="flex items-center justify-center">
                      <Switch
                        checked={row.isRetired === 'Y'}
                        onCheckedChange={(checked) => updateRow(row.id, 'isRetired', checked ? 'Y' : 'N')}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <div className="flex justify-center">
                      {getStatusBadge(row.status)}
                    </div>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.uleId}
                      className="h-8 border-0 bg-gray-50 text-xs font-mono text-blue-600"
                      readOnly
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.postingDate}
                      className="h-8 border-0 bg-gray-50 text-xs text-center"
                      readOnly
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.createdBy}
                      className="h-8 border-0 bg-gray-50 text-xs"
                      readOnly
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      value={row.createdDate}
                      className="h-8 border-0 bg-gray-50 text-xs text-center"
                      readOnly
                    />
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
            <span>Total Depreciation Amount:</span>
            <span className="font-bold text-red-700">
              {formatCurrency(filteredData.reduce((sum, row) => sum + Number(row.deprAmount || 0), 0))} VND
            </span>
            <span className="ml-4">Total Net Book Value:</span>
            <span className="font-bold text-blue-700">
              {formatCurrency(filteredData.reduce((sum, row) => sum + Number(row.netBookValue || 0), 0))} VND
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}