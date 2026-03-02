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

interface CostElementRow {
  id: number;
  celId: string;
  coaId: string;
  lenId: string;
  celCode: string;
  celName: string;
  celDescription: string;
  parentCelId: string;
  level: number | string;
  celType: string;
  celClass: string;
  status: string;
  createdBy: string;
  createDate: string;
}

export default function CostElementList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [data, setData] = useState<CostElementRow[]>([
    { id: 1, celId: 'CEL-001', coaId: 'COA-001', lenId: 'LEN-001', celCode: 'CEL-LABOR-DIR', celName: 'Direct Labor', celDescription: 'Direct salaries and wages for production staff', parentCelId: '', level: 1, celType: 'Detail', celClass: 'Operating', status: 'Y', createdBy: 'admin', createDate: '2024-01-15' },
    { id: 2, celId: 'CEL-002', coaId: 'COA-001', lenId: 'LEN-001', celCode: 'CEL-LABOR-PROD', celName: 'Production Labor', celDescription: 'Labor costs for production department', parentCelId: 'CEL-001', level: 2, celType: 'Summary', celClass: 'Operating', status: 'Y', createdBy: 'admin', createDate: '2024-01-16' },
  ]);

  const handleAddRow = () => {
    const newRow: CostElementRow = {
      id: Date.now(),
      celId: '',
      coaId: '',
      lenId: '',
      celCode: '',
      celName: '',
      celDescription: '',
      parentCelId: '',
      level: '',
      celType: 'Detail',
      celClass: '',
      status: 'Y',
      createdBy: '',
      createDate: ''
    };
    setData([...data, newRow]);
  };

  const updateRow = (id: number, field: keyof CostElementRow, value: any) => {
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
          <h1 className="text-sm font-bold text-blue-900 uppercase">Cost Element</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Quản lý yếu tố chi phí</span>
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
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Elements</p>
                <p className="text-2xl font-black text-blue-900 leading-none">{data.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Active</p>
                <p className="text-2xl font-black text-emerald-900 leading-none">{data.filter(r => r.status === 'Y').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-purple-600/70 uppercase mb-1">Classes</p>
                <p className="text-2xl font-black text-purple-900 leading-none">{new Set(data.map(r => r.celClass)).size}</p>
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
                  <Plus className="w-3.5 h-3.5" /> New Cost Element
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
                onSave={() => console.log('Saving Cost Elements...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[2400px]">
              <thead className="sticky top-0 z-30 font-bold uppercase tracking-tight text-[10px]">
                <tr className="bg-[#f0f7ff] border-b">
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-40">
                    <Checkbox
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedRows(filteredData.map(r => r.id));
                        else setSelectedRows([]);
                      }}
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-12 z-40 uppercase">Cost Element ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Chart of Account ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Legal Entity ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Cost Element Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-64 font-medium uppercase">Cost Element Name</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-80 font-medium uppercase">Description</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Parent Element ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">Level</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Class</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">Status</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">Created By</th>
                  <th className="px-3 py-3 text-left text-blue-700 w-32 font-medium uppercase text-center">Create Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-20">
                      <Checkbox checked={selectedRows.includes(row.id)} onCheckedChange={() => setSelectedRows(prev => prev.includes(row.id) ? prev.filter(x => x !== row.id) : [...prev, row.id])} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-20 text-[11px] font-bold text-blue-600">{row.celId}</td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.coaId} onChange={(e) => updateRow(row.id, 'coaId', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.lenId} onChange={(e) => updateRow(row.id, 'lenId', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] font-bold"><Input value={row.celCode} onChange={(e) => updateRow(row.id, 'celCode', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] font-medium"><Input value={row.celName} onChange={(e) => updateRow(row.id, 'celName', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.celDescription} onChange={(e) => updateRow(row.id, 'celDescription', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.parentCelId} onChange={(e) => updateRow(row.id, 'parentCelId', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] text-center font-bold text-gray-500"><Input value={row.level} onChange={(e) => updateRow(row.id, 'level', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] font-bold text-purple-600">
                      <Select value={row.celType} onValueChange={(v) => updateRow(row.id, 'celType', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Detail" className="text-[11px]">Detail</SelectItem>
                          <SelectItem value="Summary" className="text-[11px]">Summary</SelectItem>
                          <SelectItem value="Heading" className="text-[11px]">Heading</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.celClass} onValueChange={(v) => updateRow(row.id, 'celClass', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Operating" className="text-[11px]">Operating</SelectItem>
                          <SelectItem value="Overhead" className="text-[11px]">Overhead</SelectItem>
                          <SelectItem value="Administrative" className="text-[11px]">Administrative</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px] text-center">
                      <Select value={row.status} onValueChange={(v) => updateRow(row.id, 'status', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none text-center"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Y" className="text-[11px]">Active</SelectItem>
                          <SelectItem value="N" className="text-[11px]">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[10px] text-gray-400 italic text-center">{row.createdBy}</td>
                    <td className="px-3 py-2 text-[10px] text-gray-400 italic text-center">{row.createDate}</td>
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