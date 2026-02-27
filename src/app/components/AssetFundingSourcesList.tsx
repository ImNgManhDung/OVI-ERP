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
import { useLanguage } from '../i18n/LanguageContext';

interface AssetFundingSourceRow {
  id: number;
  afsId: string;
  sourceCode: string;
  sourceName: string;
  sourceType: 'EQUITY' | 'DEBT' | 'GRANT' | 'PROJECT' | '';
  creditAcc: string;
  description: string;
  isActive: 'Y' | 'N';
}

const SOURCE_TYPES = [
  { value: 'EQUITY', label: 'EQUITY (Vốn)' },
  { value: 'DEBT', label: 'DEBT (Nợ)' },
  { value: 'GRANT', label: 'GRANT (Tài trợ)' },
  { value: 'PROJECT', label: 'PROJECT (Dự án)' },
];

export default function AssetFundingSourcesList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { t } = useLanguage();
  
  const [data, setData] = useState<AssetFundingSourceRow[]>([
    {
      id: 1,
      afsId: 'AFS-001',
      sourceCode: 'EQUITY-01',
      sourceName: 'Vốn chủ sở hữu',
      sourceType: 'EQUITY',
      creditAcc: '411',
      description: 'Nguồn vốn góp từ chủ sở hữu công ty',
      isActive: 'Y'
    },
    {
      id: 2,
      afsId: 'AFS-002',
      sourceCode: 'DEBT-01',
      sourceName: 'Vay ngân hàng BIDV',
      sourceType: 'DEBT',
      creditAcc: '341',
      description: 'Khoản vay dài hạn từ ngân hàng BIDV, lãi suất 8%/năm',
      isActive: 'Y'
    },
    {
      id: 3,
      afsId: 'AFS-003',
      sourceCode: 'GRANT-01',
      sourceName: 'Quỹ phát triển khoa học công nghệ',
      sourceType: 'GRANT',
      creditAcc: '414',
      description: 'Tài trợ từ quỹ phát triển khoa học công nghệ',
      isActive: 'Y'
    },
    {
      id: 4,
      afsId: 'AFS-004',
      sourceCode: 'PROJECT-01',
      sourceName: 'Dự án mở rộng nhà máy 2024',
      sourceType: 'PROJECT',
      creditAcc: '411',
      description: 'Nguồn vốn từ dự án mở rộng sản xuất năm 2024',
      isActive: 'N'
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

  const generateSourceCode = (sourceType: string, existingCodes: string[]) => {
    if (!sourceType) return '';
    const prefix = sourceType;
    const typeCodes = existingCodes.filter(code => code.startsWith(prefix));
    const numbers = typeCodes.map(code => {
      const match = code.match(/-(\d+)$/);
      return match ? parseInt(match[1]) : 0;
    });
    const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0;
    return `${prefix}-${String(maxNum + 1).padStart(2, '0')}`;
  };

  const handleAddRow = () => {
    const newId = getNextId();
    const newRow: AssetFundingSourceRow = {
      id: newId,
      afsId: `AFS-${String(newId).padStart(3, '0')}`,
      sourceCode: '',
      sourceName: '',
      sourceType: '',
      creditAcc: '',
      description: '',
      isActive: 'Y'
    };
    setData([...data, newRow]);
    toast.success("Added new funding source");
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    toast.error("Deleted selected records");
  };

  const handleSave = () => {
    toast.success("Asset funding sources saved successfully");
  };

  const updateRow = (id: number, field: keyof AssetFundingSourceRow, value: any) => {
    setData(data.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        // Auto-generate SOURCE_CODE when SOURCE_TYPE changes
        if (field === 'sourceType' && value) {
          const existingCodes = data.map(r => r.sourceCode).filter(Boolean);
          updatedRow.sourceCode = generateSourceCode(value, existingCodes);
        }
        return updatedRow;
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

  return (
    <div className="erp-page">
      <div className="erp-page-header">
        <div>
          <h1>{t.assets.assetFundingSources}</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">{t.common.home}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">{t.nav.fixedAssets}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">{t.nav.assetFundingSources}</span>
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
                <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-12 z-20">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                </th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40 bg-[#f0f7ff] sticky left-[100px] z-20">AFS ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Source Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Source Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Source Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Credit Acc</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-96">Description</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-32">Is Active</th>
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
                    {row.afsId}
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.sourceCode}
                      onChange={(e) => updateRow(row.id, 'sourceCode', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-mono"
                      placeholder="AUTO"
                      readOnly
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.sourceName}
                      onChange={(e) => updateRow(row.id, 'sourceName', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-medium"
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Select
                      value={row.sourceType}
                      onValueChange={(val) => updateRow(row.id, 'sourceType', val)}
                    >
                      <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {SOURCE_TYPES.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.creditAcc}
                      onChange={(e) => updateRow(row.id, 'creditAcc', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-mono"
                      placeholder="411, 341, 414..."
                    />
                  </td>
                  <td className="px-3 py-2 border-r">
                    <Input
                      value={row.description}
                      onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                      className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                    />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center justify-center">
                      <Switch
                        checked={row.isActive === 'Y'}
                        onCheckedChange={(checked) => updateRow(row.id, 'isActive', checked ? 'Y' : 'N')}
                      />
                    </div>
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