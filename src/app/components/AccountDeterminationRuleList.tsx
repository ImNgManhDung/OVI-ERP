import { useState, useMemo } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft, PlusCircle, GripVertical } from 'lucide-react';
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
import { toast } from "sonner";

interface AccountDeterminationRuleRow {
  id: number;
  parentId?: number;
  isExpanded?: boolean;
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

  const [data, setData] = useState<AccountDeterminationRuleRow[]>([
    { id: 1, lenId: 'VN01', coaId: 'VN', mapId: 100, transModifier: '*', matType: 'RAW', lineType: 'ITEM', taxCode: '*', drCrIndicator: 'DR', accountSource: 'MATERIAL', glAccountId: '', priority: 10, description: 'Hạch toán nợ kho nguyên vật liệu', isActive: 'Y', isExpanded: true },
    { id: 2, parentId: 1, lenId: 'VN01', coaId: 'VN', mapId: 100, transModifier: '*', matType: '*', lineType: 'TAX', taxCode: 'V10', drCrIndicator: 'DR', accountSource: 'FIXED', glAccountId: '1331', priority: 20, description: 'Thuế GTGT đầu vào 10%', isActive: 'Y', isExpanded: true },
    { id: 3, parentId: 2, lenId: 'VN01', coaId: 'VN', mapId: 100, transModifier: '*', matType: '*', lineType: 'PAYABLE', taxCode: '*', drCrIndicator: 'CR', accountSource: 'OBJECT', glAccountId: '', priority: 30, description: 'Phải trả nhà cung cấp', isActive: 'Y' },
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

  const handleSave = () => {
    toast.success("All changes saved successfully!");
  };

  const updateRow = (id: number, field: keyof AccountDeterminationRuleRow, value: any) => {
    setData(data.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

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
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-800">
      {/* Page Header */}
      <div className="bg-white border-b px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-blue-900 uppercase">Account Determination</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Quy tắc xác định tài khoản</span>
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
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="h-8 text-[11px] bg-gray-50/50 border-gray-200 shadow-none font-medium"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Statistics Cards */}
          <div className="px-6 py-4 grid grid-cols-3 gap-4">
            <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Rules</p>
                <p className="text-2xl font-black text-blue-900 leading-none">{data.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <PlusCircle className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Fixed Accounts</p>
                <p className="text-2xl font-black text-emerald-900 leading-none">{data.filter(r => r.accountSource === 'FIXED').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-purple-600/70 uppercase mb-1">Active Rules</p>
                <p className="text-2xl font-black text-purple-900 leading-none">{data.filter(r => r.isActive === 'Y').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100/30 flex items-center justify-center border border-purple-100">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
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
                <Button size="sm" onClick={handleAddRow} className="bg-blue-600 hover:bg-blue-700 text-[11px] font-bold h-8 px-4 shadow-sm gap-2 whitespace-nowrap">
                  <Plus className="w-3.5 h-3.5" /> New Rule
                </Button>
                <Button size="sm" variant="outline" onClick={handleAddChild} disabled={selectedRows.length !== 1} className="text-[11px] font-bold h-8 px-4 shadow-sm gap-2 whitespace-nowrap border-gray-200">
                  <PlusCircle className="w-3.5 h-3.5" /> Add Child
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
                onAddRow={handleAddRow}
                onDeleteRows={() => setData(data.filter(r => !selectedRows.includes(r.id)))}
                onSave={handleSave}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[3400px]">
              <thead className="sticky top-0 z-30 font-bold uppercase tracking-tight text-[10px]">
                <tr className="bg-[#f0f7ff] border-b">
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-40">
                    <Checkbox
                      checked={selectedRows.length === visibleRows.length && visibleRows.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedRows(visibleRows.map(r => r.id));
                        else setSelectedRows([]);
                      }}
                    />
                  </th>
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-12 z-40">
                    <GripVertical className="w-4 h-4 text-gray-300" />
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-[400px] bg-[#f0f7ff] sticky left-[100px] z-40 uppercase">Mapping / Structure</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">ADR ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">LEN ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">COA ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase">Modifier</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase">Mat Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase">Line Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase">Tax Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-24 font-medium uppercase text-center">DR/CR</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-56 font-medium uppercase">Account Source</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase text-center">GL Account</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-24 font-medium uppercase text-center">Priority</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-80 font-medium uppercase">Description</th>
                  <th className="px-3 py-3 text-left text-blue-700 w-24 font-medium uppercase text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => {
                  const hasChildren = data.some(r => r.parentId === row.id);
                  return (
                    <tr key={row.id} className={`border-b hover:bg-blue-50/30 transition-colors ${row.level > 0 ? 'bg-gray-50/20' : 'bg-white'}`}>
                      <td className="px-3 py-2 border-r bg-white sticky left-0 z-20">
                        <Checkbox checked={selectedRows.includes(row.id)} onCheckedChange={() => toggleRowSelection(row.id)} />
                      </td>
                      <td className="px-3 py-2 border-r bg-white sticky left-12 z-20">
                        <GripVertical className="w-3.5 h-3.5 text-gray-300" />
                      </td>
                      <td className="px-3 py-2 border-r bg-white sticky left-[100px] z-20 font-medium" style={{ paddingLeft: `${row.level * 24 + 12}px` }}>
                        <div className="flex items-center gap-2">
                          {hasChildren ? (
                            <button onClick={() => toggleExpand(row.id)} className="w-[14px] h-[14px] bg-blue-900 rounded-[2px] flex items-center justify-center cursor-pointer hover:bg-blue-800 transition-colors shrink-0 shadow-sm">
                              {row.isExpanded ? <div className="w-[7px] h-[1.2px] bg-white rounded-full" /> : <div className="relative w-[7px] h-[7px] flex items-center justify-center"><div className="absolute w-[7px] h-[1.2px] bg-white rounded-full" /><div className="absolute w-[1.2px] h-[7px] bg-white rounded-full" /></div>}
                            </button>
                          ) : <div className="w-[14px] h-[14px]" />}
                          <span className="text-[11px] font-bold text-gray-800">{row.level === 0 ? `RULE-${row.mapId}` : `SUB-${row.seq}`}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 border-r text-[10px] text-center font-bold text-blue-600">{row.id}</td>
                      <td className="px-3 py-2 border-r text-[10px] text-center"><Input value={row.lenId} onChange={(e) => updateRow(row.id, 'lenId', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                      <td className="px-3 py-2 border-r text-[10px] text-center"><Input value={row.coaId} onChange={(e) => updateRow(row.id, 'coaId', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                      <td className="px-3 py-2 border-r text-[11px]"><Input value={row.transModifier} onChange={(e) => updateRow(row.id, 'transModifier', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                      <td className="px-3 py-2 border-r text-[11px] font-bold text-purple-600"><Input value={row.matType} onChange={(e) => updateRow(row.id, 'matType', e.target.value)} className="h-7 border-transparent shadow-none px-0" /></td>
                      <td className="px-3 py-2 border-r text-[11px]"><Input value={row.lineType} onChange={(e) => updateRow(row.id, 'lineType', e.target.value)} className="h-7 border-transparent shadow-none px-0" /></td>
                      <td className="px-3 py-2 border-r text-[11px] font-bold text-amber-600"><Input value={row.taxCode} onChange={(e) => updateRow(row.id, 'taxCode', e.target.value)} className="h-7 border-transparent shadow-none px-0" /></td>
                      <td className="px-3 py-2 border-r text-[11px] text-center">
                        <Select value={row.drCrIndicator} onValueChange={(v) => updateRow(row.id, 'drCrIndicator', v)}>
                          <SelectTrigger className={`h-7 border-transparent shadow-none text-center font-black ${row.drCrIndicator === 'DR' ? 'text-emerald-600' : 'text-rose-600'}`}><SelectValue /></SelectTrigger>
                          <SelectContent><SelectItem value="DR" className="text-[11px]">DR</SelectItem><SelectItem value="CR" className="text-[11px]">CR</SelectItem></SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        <Select value={row.accountSource} onValueChange={(v) => updateRow(row.id, 'accountSource', v)}>
                          <SelectTrigger className="h-7 border-transparent shadow-none font-bold text-blue-700"><SelectValue /></SelectTrigger>
                          <SelectContent>{ACCOUNT_SOURCES.map(source => <SelectItem key={source} value={source} className="text-[11px]">{source}</SelectItem>)}</SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2 border-r text-[11px] font-bold text-center">
                        <Input value={row.glAccountId} onChange={(e) => updateRow(row.id, 'glAccountId', e.target.value)} disabled={row.accountSource !== 'FIXED'} className={`h-7 border-transparent text-center shadow-none ${row.accountSource === 'FIXED' ? 'text-blue-600' : 'text-gray-300'}`} />
                      </td>
                      <td className="px-3 py-2 border-r text-[11px] text-center font-medium"><Input type="number" value={row.priority} onChange={(e) => updateRow(row.id, 'priority', parseInt(e.target.value) || 0)} className="h-7 border-transparent text-center shadow-none" /></td>
                      <td className="px-3 py-2 border-r text-[11px] italic text-gray-500"><Input value={row.description} onChange={(e) => updateRow(row.id, 'description', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                      <td className="px-3 py-2 text-center"><Checkbox checked={row.isActive === 'Y'} onCheckedChange={(c) => updateRow(row.id, 'isActive', c ? 'Y' : 'N')} className="scale-90" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-white border-t px-6 py-2 flex items-center justify-between shrink-0 font-bold text-[10px] text-gray-500 uppercase tracking-widest text-center">
            <div>Showing <span className="text-blue-600">{filteredData.length}</span> of {data.length} records</div>
          </div>
        </div>
      </div>
    </div>
  );
}