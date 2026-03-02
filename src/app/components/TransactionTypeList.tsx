import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft } from 'lucide-react';
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

interface TransactionTypeRow {
  id: number;
  ttyCode: string;
  ttyClass: string;
  ttyName: string;
  description: string;
  postingControl: string;
  projects: boolean;
  productOrder: boolean;
  costCenter: boolean;
  stores: boolean;
  object: boolean;
  bankAccount: boolean;
  notes: string;
}

export default function TransactionTypeList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [data, setData] = useState<TransactionTypeRow[]>([
    { id: 1, ttyCode: '100', ttyClass: 'Nhập kho', ttyName: 'Nhập mua hàng', description: 'Dr: 15x (MAT), Cr: 3319', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 2, ttyCode: '101', ttyClass: 'Nhập kho', ttyName: 'Nhập thành phẩm', description: 'Dr: 621, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: true, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 3, ttyCode: '104', ttyClass: 'Nhập kho', ttyName: 'Nhập hàng ký gửi', description: '', postingControl: 'NON', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
  ]);

  const handleAddRow = () => {
    const newRow: TransactionTypeRow = {
      id: Date.now(),
      ttyCode: '',
      ttyClass: '',
      ttyName: '',
      description: '',
      postingControl: 'DUAL',
      projects: false,
      productOrder: false,
      costCenter: false,
      stores: false,
      object: false,
      bankAccount: false,
      notes: '',
    };
    setData([...data, newRow]);
  };

  const updateRow = (id: number, field: keyof TransactionTypeRow, value: any) => {
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
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-800">
      {/* Page Header */}
      <div className="bg-white border-b px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-blue-900">Transaction Type</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Quản lý loại giao dịch</span>
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
                className="h-8 text-[11px] bg-gray-50/50 border-gray-200 shadow-none"
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
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total TTY</p>
                <p className="text-2xl font-black text-blue-900">{data.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Dual Posting</p>
                <p className="text-2xl font-black text-emerald-900">{data.filter(r => r.postingControl === 'DUAL').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-purple-600/70 uppercase mb-1">Operational</p>
                <p className="text-2xl font-black text-purple-900">{data.filter(r => r.stores || r.costCenter).length}</p>
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
                  <Plus className="w-3.5 h-3.5" /> New TTY
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input placeholder="Search..." className="h-8 w-40 pl-9 text-[11px] shadow-none" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
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
                onSave={() => console.log('Saving Transaction Types...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[3000px]">
              <thead className="sticky top-0 z-10 font-bold uppercase tracking-tight text-[10px]">
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
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">TTY Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase text-center">TTY Class</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-64 font-medium uppercase">TTY Name</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-80 font-medium uppercase">Description</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase text-center">Posting Control</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-24 font-medium uppercase">Projects</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-32 font-medium uppercase">Product Order</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-32 font-medium uppercase">Cost Center</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-24 font-medium uppercase">Stores</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-24 font-medium uppercase">Object</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-32 font-medium uppercase">Bank Account</th>
                  <th className="px-3 py-3 text-left text-blue-700 w-96 font-medium uppercase">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-10">
                      <Checkbox checked={selectedRows.includes(row.id)} onCheckedChange={() => setSelectedRows(prev => prev.includes(row.id) ? prev.filter(x => x !== row.id) : [...prev, row.id])} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-10 text-[11px] font-bold text-blue-600">{row.ttyCode}</td>
                    <td className="px-3 py-2 border-r text-[11px] text-center font-bold text-purple-600"><Input value={row.ttyClass} onChange={(e) => updateRow(row.id, 'ttyClass', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] font-medium"><Input value={row.ttyName} onChange={(e) => updateRow(row.id, 'ttyName', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.description} onChange={(e) => updateRow(row.id, 'description', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] text-center">
                      <Select value={row.postingControl} onValueChange={(v) => updateRow(row.id, 'postingControl', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none text-center"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DUAL" className="text-[11px]">DUAL</SelectItem>
                          <SelectItem value="AUTO" className="text-[11px]">AUTO</SelectItem>
                          <SelectItem value="MANUAL" className="text-[11px]">MANUAL</SelectItem>
                          <SelectItem value="NON" className="text-[11px]">NON</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.projects} onCheckedChange={(c) => updateRow(row.id, 'projects', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.productOrder} onCheckedChange={(c) => updateRow(row.id, 'productOrder', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.costCenter} onCheckedChange={(c) => updateRow(row.id, 'costCenter', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.stores} onCheckedChange={(c) => updateRow(row.id, 'stores', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.object} onCheckedChange={(c) => updateRow(row.id, 'object', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.bankAccount} onCheckedChange={(c) => updateRow(row.id, 'bankAccount', !!c)} /></td>
                    <td className="px-3 py-2 text-[11px]"><Input value={row.notes} onChange={(e) => updateRow(row.id, 'notes', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                  </tr>
                ))}
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