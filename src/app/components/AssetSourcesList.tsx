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
import { useLanguage } from '../i18n/LanguageContext';

interface AssetSourceRow {
  id: number;
  asoId: string;
  assId: string;
  atrId: string;
  afsId: string;
  currencyCode: string;
  accAmount: number | string;
  percentage: number | string;
  offsetAccId: string;
  sourceDocType: 'INVOICE' | 'ISSUES' | 'JOURNAL' | 'MANUAL' | '';
  sourceDocId: string;
  sourceDocNumber: string;
  projectId: string;
  budgetItemId: string;
}

const MOCK_ASSETS = [
  { id: 'ASS-001', name: 'Máy tính để bàn HP ProDesk' },
  { id: 'ASS-002', name: 'Máy in Canon MF244DW' },
  { id: 'ASS-003', name: 'Xe tải Hyundai HD120SL' },
  { id: 'ASS-004', name: 'Máy photocopy Ricoh MP 3055' },
];

const MOCK_ASSET_TRANSACTIONS = [
  { id: 'ATR-001', code: 'ADD0124-0001', type: 'ADDITION' },
  { id: 'ATR-002', code: 'ADJ0224-0001', type: 'ADJUSTMENT' },
  { id: 'ATR-003', code: 'TRA0324-0001', type: 'TRANSFER' },
];

const MOCK_FUNDING_SOURCES = [
  { id: 'AFS-001', name: 'Vốn chủ sở hữu' },
  { id: 'AFS-002', name: 'Vay ngân hàng' },
  { id: 'AFS-003', name: 'Ngân sách nhà nước' },
  { id: 'AFS-004', name: 'Viện trợ quốc tế' },
  { id: 'AFS-005', name: 'Thuê tài chính' },
];

const MOCK_PROJECTS = [
  { id: 'PROJ-001', name: 'Dự án A' },
  { id: 'PROJ-002', name: 'Dự án B' },
  { id: 'PROJ-003', name: 'Dự án C' },
];

const MOCK_BUDGET_ITEMS = [
  { id: 'BUD-001', name: 'Mua sắm TSCĐ' },
  { id: 'BUD-002', name: 'Nâng cấp thiết bị' },
  { id: 'BUD-003', name: 'Đầu tư XDCB' },
];

const OFFSET_ACCOUNTS = [
  { id: '111', name: 'Tiền mặt' },
  { id: '112', name: 'Tiền gửi ngân hàng' },
  { id: '331', name: 'Phải trả người bán' },
  { id: '338', name: 'Phải trả khác' },
  { id: '241', name: 'XDCB dở dang' },
  { id: '411', name: 'Vốn đầu tư của chủ sở hữu' },
];

const SOURCE_DOC_TYPES = [
  { value: 'INVOICE', label: 'INVOICE (Hóa đơn)' },
  { value: 'ISSUES', label: 'ISSUES (Xuất kho)' },
  { value: 'JOURNAL', label: 'JOURNAL (Phiếu kế toán)' },
  { value: 'MANUAL', label: 'MANUAL (Nhập thủ công)' },
];

const CURRENCIES = [
  { code: 'VND', name: 'Việt Nam Đồng' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
];

export default function AssetSourcesList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { t } = useLanguage();
  
  const [data, setData] = useState<AssetSourceRow[]>([
    {
      id: 1,
      asoId: 'ASO-001',
      assId: 'ASS-001',
      atrId: 'ATR-001',
      afsId: 'AFS-001',
      currencyCode: 'VND',
      accAmount: 20000000,
      percentage: 80,
      offsetAccId: '331',
      sourceDocType: 'INVOICE',
      sourceDocId: 'INV-2024-001',
      sourceDocNumber: 'IV-2024-001',
      projectId: 'PROJ-001',
      budgetItemId: 'BUD-001'
    },
    {
      id: 2,
      asoId: 'ASO-002',
      assId: 'ASS-001',
      atrId: 'ATR-001',
      afsId: 'AFS-002',
      currencyCode: 'VND',
      accAmount: 5000000,
      percentage: 20,
      offsetAccId: '338',
      sourceDocType: 'MANUAL',
      sourceDocId: '',
      sourceDocNumber: 'MAN-2024-001',
      projectId: 'PROJ-001',
      budgetItemId: 'BUD-001'
    },
    {
      id: 3,
      asoId: 'ASO-003',
      assId: 'ASS-002',
      atrId: 'ATR-002',
      afsId: 'AFS-003',
      currencyCode: 'VND',
      accAmount: 8500000,
      percentage: 100,
      offsetAccId: '411',
      sourceDocType: 'JOURNAL',
      sourceDocId: 'JV-2024-045',
      sourceDocNumber: 'JV-2024-045',
      projectId: '',
      budgetItemId: 'BUD-002'
    },
    {
      id: 4,
      asoId: 'ASO-004',
      assId: 'ASS-003',
      atrId: 'ATR-003',
      afsId: 'AFS-005',
      currencyCode: 'VND',
      accAmount: 850000000,
      percentage: 100,
      offsetAccId: '338',
      sourceDocType: 'INVOICE',
      sourceDocId: 'INV-2024-125',
      sourceDocNumber: 'IV-2024-125',
      projectId: 'PROJ-002',
      budgetItemId: 'BUD-003'
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
    const newRow: AssetSourceRow = {
      id: newId,
      asoId: `ASO-${String(newId).padStart(3, '0')}`,
      assId: '',
      atrId: '',
      afsId: '',
      currencyCode: 'VND',
      accAmount: '',
      percentage: '',
      offsetAccId: '',
      sourceDocType: '',
      sourceDocId: '',
      sourceDocNumber: '',
      projectId: '',
      budgetItemId: ''
    };
    setData([...data, newRow]);
    toast.success("Added new asset source");
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    toast.error("Deleted selected sources");
  };

  const handleSave = () => {
    toast.success("Asset sources saved successfully");
  };

  const updateRow = (id: number, field: keyof AssetSourceRow, value: any) => {
    setData(data.map(row => {
      if (row.id === id) {
        const updated = { ...row, [field]: value };
        
        // Auto-calculate percentage when amount changes
        if (field === 'accAmount' && row.assId) {
          // This is simplified - in real app, would calculate based on total asset cost
          const amount = Number(value);
          if (amount > 0) {
            // Example: assuming total cost is in a parent context
            updated.percentage = 100; // Placeholder
          }
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

  const getDocTypeBadge = (type: string) => {
    const styles = {
      'INVOICE': 'bg-blue-100 text-blue-700',
      'ISSUES': 'bg-green-100 text-green-700',
      'JOURNAL': 'bg-purple-100 text-purple-700',
      'MANUAL': 'bg-gray-100 text-gray-700'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[type as keyof typeof styles] || 'bg-gray-100 text-gray-700'}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="erp-page">
      <div className="erp-page-header">
        <div>
          <h1>{t.assets.assetSources}</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">{t.common.home}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">{t.nav.fixedAssets}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">{t.nav.assetSources}</span>
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
      />

      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[3500px]">
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
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-[100px] z-20">ASO ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Asset ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Asset Transaction</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Funding Source</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Currency</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Amount</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Percentage (%)</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Offset Account</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Source Doc Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Source Doc ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Source Doc Number</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Project</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-48">Budget Item</th>
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
                    {row.asoId}
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
                    <Select
                      value={row.atrId}
                      onValueChange={(val) => updateRow(row.id, 'atrId', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select transaction..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_ASSET_TRANSACTIONS.map(atr => (
                          <SelectItem key={atr.id} value={atr.id}>
                            {atr.id} - {atr.code} ({atr.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.afsId}
                      onValueChange={(val) => updateRow(row.id, 'afsId', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select funding..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_FUNDING_SOURCES.map(fs => (
                          <SelectItem key={fs.id} value={fs.id}>{fs.id} - {fs.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.currencyCode}
                      onValueChange={(val) => updateRow(row.id, 'currencyCode', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map(curr => (
                          <SelectItem key={curr.code} value={curr.code}>{curr.code}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.accAmount}
                      onChange={(e) => updateRow(row.id, 'accAmount', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-right font-mono font-semibold text-green-700"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.percentage}
                      onChange={(e) => updateRow(row.id, 'percentage', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-right font-mono"
                      placeholder="0"
                      max="100"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.offsetAccId}
                      onValueChange={(val) => updateRow(row.id, 'offsetAccId', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {OFFSET_ACCOUNTS.map(acc => (
                          <SelectItem key={acc.id} value={acc.id}>{acc.id} - {acc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.sourceDocType}
                      onValueChange={(val) => updateRow(row.id, 'sourceDocType', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {SOURCE_DOC_TYPES.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.sourceDocId}
                      onChange={(e) => updateRow(row.id, 'sourceDocId', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-xs font-mono"
                      placeholder="Enter ID..."
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.sourceDocNumber}
                      onChange={(e) => updateRow(row.id, 'sourceDocNumber', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-xs font-semibold"
                      placeholder="Enter number..."
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.projectId}
                      onValueChange={(val) => updateRow(row.id, 'projectId', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
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
                  <td className="px-3 py-2">
                    <Select
                      value={row.budgetItemId}
                      onValueChange={(val) => updateRow(row.id, 'budgetItemId', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_BUDGET_ITEMS.map(bud => (
                          <SelectItem key={bud.id} value={bud.id}>{bud.id} - {bud.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between text-xs text-gray-600">
          <div>
            Showing <span className="font-semibold">{filteredData.length}</span> of <span className="font-semibold">{data.length}</span> records
          </div>
          <div className="flex items-center gap-6">
            <span>Total Amount: <span className="font-bold text-green-600">{formatCurrency(filteredData.reduce((sum, r) => sum + Number(r.accAmount || 0), 0))} VND</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}