import { useState, useMemo } from 'react';
import { Search, PlusCircle, GripVertical } from 'lucide-react';
import { Input } from './ui/input';
import { FilterPanel } from './FilterPanel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import MasterDataToolbar from './MasterDataToolbar';
import { toast } from "sonner";

interface AccountDeterminationRuleRow {
  id: number;
  parentId?: number; // For hierarchy
  isExpanded?: boolean; // For hierarchy
  lenId: string;
  coaId: string;
  mapId: number;
  transModifier: string;
  matType: string;
  lineType: string;
  taxCode: string;
  drCrIndicator: 'DR' | 'CR';
  accountSource: string;
  glAccountId: string;
  priority: number;
  description: string;
  isActive: 'Y' | 'N';
}

const ACCOUNT_SOURCES = [
  'FIXED',
  'MATERIAL',
  'STORE',
  'OBJECT',
  'OBJECT_DP',
  'ASSET',
  'ASSET_DEPRES',
  'ASSET_COST',
  'BANK_ACCOUNT'
];

export default function AccountDeterminationRuleList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Initial data with simple IDs
  const [data, setData] = useState<AccountDeterminationRuleRow[]>([
    {
      id: 1,
      lenId: 'VN01',
      coaId: 'VN',
      mapId: 100,
      transModifier: '*',
      matType: 'RAW',
      lineType: 'ITEM',
      taxCode: '*',
      drCrIndicator: 'DR',
      accountSource: 'MATERIAL',
      glAccountId: '',
      priority: 10,
      description: 'Hạch toán nợ kho nguyên vật liệu',
      isActive: 'Y',
      isExpanded: true
    },
    {
      id: 2,
      parentId: 1,
      lenId: 'VN01',
      coaId: 'VN',
      mapId: 100,
      transModifier: '*',
      matType: '*',
      lineType: 'TAX',
      taxCode: 'V10',
      drCrIndicator: 'DR',
      accountSource: 'FIXED',
      glAccountId: '1331',
      priority: 20,
      description: 'Thuế GTGT đầu vào 10%',
      isActive: 'Y',
      isExpanded: true
    },
    {
      id: 3,
      parentId: 2,
      lenId: 'VN01',
      coaId: 'VN',
      mapId: 100,
      transModifier: '*',
      matType: '*',
      lineType: 'PAYABLE',
      taxCode: '*',
      drCrIndicator: 'CR',
      accountSource: 'OBJECT',
      glAccountId: '',
      priority: 30,
      description: 'Phải trả nhà cung cấp',
      isActive: 'Y'
    },
    {
      id: 4,
      lenId: 'VN01',
      coaId: 'VN',
      mapId: 200,
      transModifier: '*',
      matType: 'FIN',
      lineType: 'COGS',
      taxCode: '*',
      drCrIndicator: 'DR',
      accountSource: 'FIXED',
      glAccountId: '632',
      priority: 10,
      description: 'Giá vốn hàng bán',
      isActive: 'Y'
    },
    {
      id: 5,
      lenId: 'VN01',
      coaId: 'VN',
      mapId: 301,
      transModifier: '*',
      matType: '*',
      lineType: 'CASH',
      taxCode: '*',
      drCrIndicator: 'DR',
      accountSource: 'BANK_ACCOUNT',
      glAccountId: '',
      priority: 10,
      description: 'Thu tiền ngân hàng',
      isActive: 'Y'
    }
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: number) => {
    setData(prev => prev.map(row =>
      row.id === id ? { ...row, isExpanded: !row.isExpanded } : row
    ));
  };

  const getNextId = () => {
    return data.length > 0 ? Math.max(...data.map(r => r.id)) + 1 : 1;
  };

  const handleAddRow = () => {
    const newId = getNextId();
    const newRow: AccountDeterminationRuleRow = {
      id: newId,
      lenId: 'VN01',
      coaId: 'VN',
      mapId: 0,
      transModifier: '*',
      matType: '*',
      lineType: '*',
      taxCode: '*',
      drCrIndicator: 'DR',
      accountSource: 'FIXED',
      glAccountId: '',
      priority: 99,
      description: '',
      isActive: 'Y',
    };
    setData([...data, newRow]);
    toast.success(`Added new root rule (ID: ${newId})`);
  };

  const handleAddChild = () => {
    if (selectedRows.length !== 1) return;
    const parentId = selectedRows[0];
    const newId = getNextId();
    const newRow: AccountDeterminationRuleRow = {
      id: newId,
      parentId: parentId,
      lenId: 'VN01',
      coaId: 'VN',
      mapId: 0,
      transModifier: '*',
      matType: '*',
      lineType: '*',
      taxCode: '*',
      drCrIndicator: 'DR',
      accountSource: 'FIXED',
      glAccountId: '',
      priority: 99,
      description: '',
      isActive: 'Y',
    };
    setData(prev => {
      const newData = prev.map(r => r.id === parentId ? { ...r, isExpanded: true } : r);
      return [...newData, newRow];
    });
    setSelectedRows([newId]);
    toast.success(`Added child rule (ID: ${newId}) to parent ${parentId}`);
  };

  const handleAddSibling = () => {
    if (selectedRows.length !== 1) return;
    const siblingId = selectedRows[0];
    const sibling = data.find(r => r.id === siblingId);
    if (!sibling) return;

    const newId = getNextId();
    const newRow: AccountDeterminationRuleRow = {
      id: newId,
      parentId: sibling.parentId,
      lenId: 'VN01',
      coaId: 'VN',
      mapId: 0,
      transModifier: '*',
      matType: '*',
      lineType: '*',
      taxCode: '*',
      drCrIndicator: 'DR',
      accountSource: 'FIXED',
      glAccountId: '',
      priority: 99,
      description: '',
      isActive: 'Y',
    };
    setData([...data, newRow]);
    setSelectedRows([newId]);
    toast.success(`Added sibling rule (ID: ${newId})`);
  };

  const handleDeleteRows = () => {
    const count = selectedRows.length;
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    toast.error(`Deleted ${count} rule(s)`);
  };

  const handleSave = () => {
    toast.success("All changes saved successfully to database!");
  };

  const updateRow = (id: number, field: keyof AccountDeterminationRuleRow, value: any) => {
    setData(data.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  // Helper to get visible rows with hierarchical path/sequence
  const visibleRows = useMemo(() => {
    const results: (AccountDeterminationRuleRow & { level: number; seq: string })[] = [];

    const addChildren = (parentId: number | undefined, level: number, parentSeq: string) => {
      const children = data.filter(r => r.parentId === parentId);
      children.forEach((child, index) => {
        const currentSeq = parentSeq === '' ? `${index + 1}` : `${parentSeq}.${index + 1}`;
        results.push({ ...child, level, seq: currentSeq });
        if (child.isExpanded) {
          addChildren(child.id, level + 1, currentSeq);
        }
      });
    };

    addChildren(undefined, 0, '');
    return results;
  }, [data]);

  const filteredData = visibleRows.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Filter Panel */}
      <FilterPanel
        searchValue={searchText}
        onSearchChange={setSearchText}
        showStatus={true}
        statusOptions={[
          { value: 'all', label: 'All Status' },
          { value: 'Y', label: 'Active' },
          { value: 'N', label: 'Inactive' },
        ]}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        showType={false}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Account Determination Rules</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Master Data</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Account Determination Rules</span>
          </nav>
        </div>

        <MasterDataToolbar
          searchText={searchText}
          onSearchChange={setSearchText}
          onAddRow={handleAddRow}
          onDeleteRows={handleDeleteRows}
          onSave={handleSave}
          selectedCount={selectedRows.length}
          extraActions={
            <>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 gap-2 font-medium border-gray-200"
                onClick={handleAddChild}
                disabled={selectedRows.length !== 1}
              >
                <PlusCircle className="w-4 h-4" /> Add Child
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 gap-2 font-medium border-gray-200"
                onClick={handleAddSibling}
                disabled={selectedRows.length !== 1}
              >
                <PlusCircle className="w-4 h-4" /> Add Sibling
              </Button>
            </>
          }
        />

        <div className="flex-1 overflow-hidden bg-white mx-6 mb-6 border rounded-lg shadow-sm">
          <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
            <table className="w-full text-sm min-w-[3400px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#f0f7ff] border-b">
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-20">
                    <Checkbox
                      checked={selectedRows.length === visibleRows.length && visibleRows.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedRows(visibleRows.map(r => r.id));
                        else setSelectedRows([]);
                      }}
                    />
                  </th>
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-12 z-20">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-[400px] bg-[#f0f7ff] sticky left-[100px] z-20">
                    MAP ID
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">ADR ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">LEN ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">COA ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Modifier</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Mat Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Line Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Tax Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-24">DR/CR</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-56">Account Source</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">GL Account</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-24">Priority</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-80">Description</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-24">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={16} className="px-3 py-12 text-center text-gray-500 bg-white">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-12 h-12 opacity-10" />
                        <span>No rules found</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row) => {
                    const hasChildren = data.some(r => r.parentId === row.id);

                    return (
                      <tr key={row.id} className={`border-b hover:bg-blue-50/50 transition-colors ${row.level > 0 ? 'bg-gray-50/30' : 'bg-white'}`}>
                        <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10">
                          <Checkbox
                            checked={selectedRows.includes(row.id)}
                            onCheckedChange={() => toggleRowSelection(row.id)}
                          />
                        </td>
                        <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10">
                          <GripVertical className="w-4 h-4 text-gray-300" />
                        </td>
                        <td
                          className="px-3 py-2 border-r bg-inherit sticky left-[100px] z-10 font-medium"
                          style={{ paddingLeft: `${row.level * 24 + 12}px` }}
                        >
                          <div className="flex items-center gap-2">
                            {hasChildren ? (
                              <button
                                onClick={() => toggleExpand(row.id)}
                                className="w-[15px] h-[15px] bg-black rounded-[2px] flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                              >
                                {row.isExpanded ? (
                                  <div className="w-[8px] h-[1.5px] bg-white rounded-full" />
                                ) : (
                                  <div className="relative w-[8px] h-[8px] flex items-center justify-center">
                                    <div className="absolute w-[8px] h-[1.5px] bg-white rounded-full" />
                                    <div className="absolute w-[1.5px] h-[8px] bg-white rounded-full" />
                                  </div>
                                )}
                              </button>
                            ) : (
                              <div className="w-[15px] h-[15px]" />
                            )}
                            <span className="text-gray-900 font-bold">
                              {row.level === 0 ? `MAP-${row.mapId}` : `Sub-${row.seq}`}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2 border-r font-medium text-[#0066cc]">
                          {row.id}
                        </td>
                        <td className="px-3 py-2 border-r">
                          <Input
                            value={row.lenId}
                            onChange={(e) => updateRow(row.id, 'lenId', e.target.value)}
                            className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                          />
                        </td>
                        <td className="px-3 py-2 border-r">
                          <Input
                            value={row.coaId}
                            onChange={(e) => updateRow(row.id, 'coaId', e.target.value)}
                            className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                          />
                        </td>
                        <td className="px-3 py-2 border-r">
                          <Input
                            type="number"
                            value={row.mapId}
                            onChange={(e) => updateRow(row.id, 'mapId', parseInt(e.target.value) || 0)}
                            className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                          />
                        </td>
                        <td className="px-3 py-2 border-r">
                          <Input
                            value={row.transModifier}
                            onChange={(e) => updateRow(row.id, 'transModifier', e.target.value)}
                            className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                          />
                        </td>
                        <td className="px-3 py-2 border-r">
                          <Input
                            value={row.matType}
                            onChange={(e) => updateRow(row.id, 'matType', e.target.value)}
                            className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                          />
                        </td>
                        <td className="px-3 py-2 border-r">
                          <Input
                            value={row.lineType}
                            onChange={(e) => updateRow(row.id, 'lineType', e.target.value)}
                            className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                          />
                        </td>
                        <td className="px-3 py-2 border-r">
                          <Input
                            value={row.taxCode}
                            onChange={(e) => updateRow(row.id, 'taxCode', e.target.value)}
                            className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                          />
                        </td>
                        <td className="px-3 py-2 border-r">
                          <Select
                            value={row.drCrIndicator}
                            onValueChange={(val) => updateRow(row.id, 'drCrIndicator', val)}
                          >
                            <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="DR">DR</SelectItem>
                              <SelectItem value="CR">CR</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2 border-r">
                          <Select
                            value={row.accountSource}
                            onValueChange={(val) => updateRow(row.id, 'accountSource', val)}
                          >
                            <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-medium text-blue-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ACCOUNT_SOURCES.map(source => (
                                <SelectItem key={source} value={source}>{source}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2 border-r">
                          <Input
                            value={row.glAccountId}
                            onChange={(e) => updateRow(row.id, 'glAccountId', e.target.value)}
                            disabled={row.accountSource !== 'FIXED'}
                            className={`h-8 border-transparent hover:border-gray-200 focus:border-blue-500 transition-all font-bold ${row.accountSource === 'FIXED' ? 'bg-transparent text-blue-600' : 'bg-gray-50 text-gray-400'}`}
                          />
                        </td>
                        <td className="px-3 py-2 border-r">
                          <Input
                            type="number"
                            value={row.priority}
                            onChange={(e) => updateRow(row.id, 'priority', parseInt(e.target.value) || 0)}
                            className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center"
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
                          <Checkbox
                            checked={row.isActive === 'Y'}
                            onCheckedChange={(checked) => updateRow(row.id, 'isActive', checked ? 'Y' : 'N')}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white border-t px-6 py-3 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredData.length}</span> records
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}