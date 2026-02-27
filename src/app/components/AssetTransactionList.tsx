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
import { Button } from './ui/button';
import { toast } from "sonner";
import MasterDataToolbar from './MasterDataToolbar';
import { useLanguage } from '../i18n/LanguageContext';

interface AssetTransactionRow {
  id: number;
  atrId: string;
  assId: string;
  atrCode: string;
  atrType: 'ADD' | 'ADJ' | 'RAV' | 'TRA' | 'RET' | '';
  cceId: string;
  projId: string;
  assetAccId: string;
  offsetAccId: string;
  oldCost: number | string;
  newCost: number | string;
  amountChange: number | string;
  fromCceId: string;
  toCceId: string;
  fromLocId: string;
  toLocId: string;
  fromProjId: string;
  toProjId: string;
  fromEmpId: string;
  toEmpId: string;
  description: string;
  status: 'D' | 'C' | 'P' | 'R' | '';
  uleId: string;
  postingDate: string;
}

const MOCK_ASSETS = [
  { id: 'ASS-001', name: 'Máy tính để bàn HP ProDesk' },
  { id: 'ASS-002', name: 'Máy in Canon MF244DW' },
  { id: 'ASS-003', name: 'Xe tải Hyundai HD120SL' },
  { id: 'ASS-004', name: 'Máy photocopy Ricoh MP 3055' },
];

const MOCK_COST_CENTERS = [
  { id: 'CCE-001', name: 'Phòng IT' },
  { id: 'CCE-002', name: 'Phòng Kế toán' },
  { id: 'CCE-003', name: 'Phòng Kinh doanh' },
  { id: 'CCE-004', name: 'Phòng Nhân sự' },
];

const MOCK_PROJECTS = [
  { id: 'PROJ-001', name: 'Dự án A' },
  { id: 'PROJ-002', name: 'Dự án B' },
  { id: 'PROJ-003', name: 'Dự án C' },
];

const MOCK_LOCATIONS = [
  { id: 'LOC-001', name: 'Tầng 1 - Phòng IT' },
  { id: 'LOC-002', name: 'Tầng 2 - Phòng Kế toán' },
  { id: 'LOC-003', name: 'Kho A' },
  { id: 'LOC-004', name: 'Tầng 3 - Phòng Giám đốc' },
];

const MOCK_EMPLOYEES = [
  { id: 'EMP-001', name: 'Nguyễn Văn A' },
  { id: 'EMP-002', name: 'Trần Thị B' },
  { id: 'EMP-003', name: 'Lê Văn C' },
  { id: 'EMP-004', name: 'Phạm Thị D' },
];

const ASSET_ACCOUNTS = [
  { id: '211', name: 'Tài sản cố định hữu hình' },
  { id: '213', name: 'Tài sản cố định vô hình' },
  { id: '241', name: 'XDCB dở dang' },
];

const OFFSET_ACCOUNTS = [
  { id: '111', name: 'Tiền mặt' },
  { id: '112', name: 'Tiền gửi ngân hàng' },
  { id: '331', name: 'Phải trả người bán' },
  { id: '338', name: 'Phải trả khác' },
  { id: '2119', name: 'Hao mòn TSCĐ hữu hình' },
  { id: '214', name: 'Hao mòn TSCĐ' },
];

const TRANSACTION_TYPES = [
  { value: 'ADD', label: 'ADDITION (Ghi tăng)' },
  { value: 'ADJ', label: 'ADJUSTMENT (Điều chỉnh giá)' },
  { value: 'RAV', label: 'REVALUATION (Đánh giá lại)' },
  { value: 'TRA', label: 'TRANSFER (Luân chuyển)' },
  { value: 'RET', label: 'RETIREMENT (Thanh lý)' },
];

export default function AssetTransactionList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { t } = useLanguage();
  
  const [data, setData] = useState<AssetTransactionRow[]>([
    {
      id: 1,
      atrId: 'ATR-001',
      assId: 'ASS-001',
      atrCode: 'ADD0124-0001',
      atrType: 'ADD',
      cceId: 'CCE-001',
      projId: '',
      assetAccId: '211',
      offsetAccId: '331',
      oldCost: 0,
      newCost: 25000000,
      amountChange: 25000000,
      fromCceId: '',
      toCceId: '',
      fromLocId: '',
      toLocId: '',
      fromProjId: '',
      toProjId: '',
      fromEmpId: '',
      toEmpId: '',
      description: 'Mua máy tính mới từ FPT Shop theo HĐ MUA-2024-001',
      status: 'P',
      uleId: 'ULE-2024-001-456',
      postingDate: '2024-01-15'
    },
    {
      id: 2,
      atrId: 'ATR-002',
      assId: 'ASS-001',
      atrCode: 'ADJ0224-0001',
      atrType: 'ADJ',
      cceId: 'CCE-001',
      projId: '',
      assetAccId: '211',
      offsetAccId: '338',
      oldCost: 25000000,
      newCost: 26500000,
      amountChange: 1500000,
      fromCceId: '',
      toCceId: '',
      fromLocId: '',
      toLocId: '',
      fromProjId: '',
      toProjId: '',
      fromEmpId: '',
      toEmpId: '',
      description: 'Điều chỉnh tăng giá trị do nâng cấp RAM và SSD',
      status: 'P',
      uleId: 'ULE-2024-002-789',
      postingDate: '2024-02-20'
    },
    {
      id: 3,
      atrId: 'ATR-003',
      assId: 'ASS-001',
      atrCode: 'TRA0324-0001',
      atrType: 'TRA',
      cceId: 'CCE-002',
      projId: '',
      assetAccId: '211',
      offsetAccId: '',
      oldCost: 26500000,
      newCost: 26500000,
      amountChange: 0,
      fromCceId: 'CCE-001',
      toCceId: 'CCE-002',
      fromLocId: 'LOC-001',
      toLocId: 'LOC-002',
      fromProjId: '',
      toProjId: '',
      fromEmpId: 'EMP-001',
      toEmpId: 'EMP-002',
      description: 'Luân chuyển từ Phòng IT sang Phòng Kế toán',
      status: 'P',
      uleId: '',
      postingDate: '2024-03-10'
    },
    {
      id: 4,
      atrId: 'ATR-004',
      assId: 'ASS-002',
      atrCode: 'RET0424-0001',
      atrType: 'RET',
      cceId: 'CCE-002',
      projId: 'PROJ-001',
      assetAccId: '211',
      offsetAccId: '2119',
      oldCost: 8500000,
      newCost: 0,
      amountChange: -8500000,
      fromCceId: '',
      toCceId: '',
      fromLocId: '',
      toLocId: '',
      fromProjId: '',
      toProjId: '',
      fromEmpId: '',
      toEmpId: '',
      description: 'Thanh lý máy in Canon do hỏng không sửa được',
      status: 'C',
      uleId: '',
      postingDate: ''
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

  const generateAtrCode = (atrType: string) => {
    if (!atrType) return '';
    
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const prefix = `${atrType}${month}${year}`;
    
    // Count existing codes with same prefix
    const existingCodes = data.filter(r => r.atrCode.startsWith(prefix));
    const nextNum = String(existingCodes.length + 1).padStart(4, '0');
    
    return `${prefix}-${nextNum}`;
  };

  const handleAddRow = () => {
    const newId = getNextId();
    const newRow: AssetTransactionRow = {
      id: newId,
      atrId: `ATR-${String(newId).padStart(3, '0')}`,
      assId: '',
      atrCode: '',
      atrType: '',
      cceId: '',
      projId: '',
      assetAccId: '211',
      offsetAccId: '',
      oldCost: '',
      newCost: '',
      amountChange: '',
      fromCceId: '',
      toCceId: '',
      fromLocId: '',
      toLocId: '',
      fromProjId: '',
      toProjId: '',
      fromEmpId: '',
      toEmpId: '',
      description: '',
      status: 'D',
      uleId: '',
      postingDate: ''
    };
    setData([...data, newRow]);
    toast.success("Added new asset transaction");
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    toast.error("Deleted selected transactions");
  };

  const handleSave = () => {
    toast.success("Asset transactions saved successfully");
  };

  const updateRow = (id: number, field: keyof AssetTransactionRow, value: any) => {
    setData(data.map(row => {
      if (row.id === id) {
        const updated = { ...row, [field]: value };
        
        // Auto-generate ATR_CODE when ATR_TYPE changes
        if (field === 'atrType' && value) {
          updated.atrCode = generateAtrCode(value);
        }
        
        // Auto-calculate AMOUNT_CHANGE when OLD_COST or NEW_COST changes
        if (field === 'oldCost' || field === 'newCost') {
          const oldCost = field === 'oldCost' ? Number(value) : Number(updated.oldCost);
          const newCost = field === 'newCost' ? Number(value) : Number(updated.newCost);
          updated.amountChange = newCost - oldCost;
        }
        
        // If type is TRANSFER, hide offset account
        if (field === 'atrType' && value === 'TRA') {
          updated.offsetAccId = '';
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
      'C': 'Confirmed',
      'P': 'Posted',
      'R': 'Reversed'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const getTypeLabel = (type: string) => {
    const typeObj = TRANSACTION_TYPES.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  const getAmountColor = (amount: number | string) => {
    const num = Number(amount);
    if (num > 0) return 'text-green-700 font-semibold';
    if (num < 0) return 'text-red-700 font-semibold';
    return 'text-gray-700';
  };

  return (
    <div className="erp-page">
      <div className="erp-page-header">
        <div>
          <h1>{t.assets.assetTransactions}</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">{t.common.home}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">{t.nav.fixedAssets}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">{t.nav.assetTransactions}</span>
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
          <Button variant="outline" size="sm" className="h-9 px-4 font-medium border-gray-200 text-purple-600 hover:text-purple-700 hover:bg-purple-50">
            Post to GL
          </Button>
        }
      />

      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[6500px]">
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
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-[100px] z-20">ATR ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Asset ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">ATR Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Transaction Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Cost Center</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Project</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Asset Account</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Offset Account</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Old Cost</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">New Cost</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Amount Change</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">From Cost Center</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">To Cost Center</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">From Location</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">To Location</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">From Project</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">To Project</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">From Employee</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">To Employee</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-96">Description</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Status</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">ULE ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-40">Posting Date</th>
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
                    {row.atrId}
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
                      value={row.atrCode}
                      className="h-8 border-0 bg-gray-50 text-xs font-mono font-semibold"
                      readOnly
                      placeholder="Auto-generated"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.atrType}
                      onValueChange={(val) => updateRow(row.id, 'atrType', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {TRANSACTION_TYPES.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.cceId}
                      onValueChange={(val) => updateRow(row.id, 'cceId', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
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
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.assetAccId}
                      onValueChange={(val) => updateRow(row.id, 'assetAccId', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {ASSET_ACCOUNTS.map(acc => (
                          <SelectItem key={acc.id} value={acc.id}>{acc.id} - {acc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    {row.atrType !== 'TRA' && (
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
                    )}
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.oldCost}
                      onChange={(e) => updateRow(row.id, 'oldCost', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-right font-mono"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      type="number"
                      value={row.newCost}
                      onChange={(e) => updateRow(row.id, 'newCost', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-right font-mono"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <div className={`text-right text-xs font-mono px-2 py-1 ${getAmountColor(row.amountChange)}`}>
                      {formatCurrency(row.amountChange)}
                    </div>
                  </td>
                  <td className="px-3 py-2 border-r">
                    {row.atrType === 'TRA' && (
                      <Select
                        value={row.fromCceId}
                        onValueChange={(val) => updateRow(row.id, 'fromCceId', val)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_COST_CENTERS.map(cc => (
                            <SelectItem key={cc.id} value={cc.id}>{cc.id} - {cc.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </td>
                  <td className="px-3 py-2 border-r">
                    {row.atrType === 'TRA' && (
                      <Select
                        value={row.toCceId}
                        onValueChange={(val) => updateRow(row.id, 'toCceId', val)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_COST_CENTERS.map(cc => (
                            <SelectItem key={cc.id} value={cc.id}>{cc.id} - {cc.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </td>
                  <td className="px-3 py-2 border-r">
                    {row.atrType === 'TRA' && (
                      <Select
                        value={row.fromLocId}
                        onValueChange={(val) => updateRow(row.id, 'fromLocId', val)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_LOCATIONS.map(loc => (
                            <SelectItem key={loc.id} value={loc.id}>{loc.id} - {loc.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </td>
                  <td className="px-3 py-2 border-r">
                    {row.atrType === 'TRA' && (
                      <Select
                        value={row.toLocId}
                        onValueChange={(val) => updateRow(row.id, 'toLocId', val)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_LOCATIONS.map(loc => (
                            <SelectItem key={loc.id} value={loc.id}>{loc.id} - {loc.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </td>
                  <td className="px-3 py-2 border-r">
                    {row.atrType === 'TRA' && (
                      <Select
                        value={row.fromProjId}
                        onValueChange={(val) => updateRow(row.id, 'fromProjId', val)}
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
                    )}
                  </td>
                  <td className="px-3 py-2 border-r">
                    {row.atrType === 'TRA' && (
                      <Select
                        value={row.toProjId}
                        onValueChange={(val) => updateRow(row.id, 'toProjId', val)}
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
                    )}
                  </td>
                  <td className="px-3 py-2 border-r">
                    {row.atrType === 'TRA' && (
                      <Select
                        value={row.fromEmpId}
                        onValueChange={(val) => updateRow(row.id, 'fromEmpId', val)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_EMPLOYEES.map(emp => (
                            <SelectItem key={emp.id} value={emp.id}>{emp.id} - {emp.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </td>
                  <td className="px-3 py-2 border-r">
                    {row.atrType === 'TRA' && (
                      <Select
                        value={row.toEmpId}
                        onValueChange={(val) => updateRow(row.id, 'toEmpId', val)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_EMPLOYEES.map(emp => (
                            <SelectItem key={emp.id} value={emp.id}>{emp.id} - {emp.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.description}
                      onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      placeholder="Enter description..."
                    />
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
                  <td className="px-3 py-2">
                    <Input
                      value={row.postingDate}
                      className="h-8 border-0 bg-gray-50 text-xs text-center"
                      readOnly
                    />
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
            <span>Posted: <span className="font-bold text-green-600">{filteredData.filter(r => r.status === 'P').length}</span></span>
            <span>Confirmed: <span className="font-bold text-yellow-600">{filteredData.filter(r => r.status === 'C').length}</span></span>
            <span>Draft: <span className="font-bold text-gray-600">{filteredData.filter(r => r.status === 'D').length}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}