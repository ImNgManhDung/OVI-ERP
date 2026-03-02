import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft } from 'lucide-react';
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
import MasterDataToolbar from './MasterDataToolbar';

interface ProfitCenterRow {
  id: number;
  prcId: string;
  coaId: string;
  lenId: string;
  depOunId: string;
  prcCode: string;
  prcName: string;
  prcDescription: string;
  prcType: string;
  prcClass: string;
  status: string;
  effectiveDateFrom: string;
  effectiveDateTo: string;
  createdBy: string;
  createDate: string;
}

export default function ProfitCenterList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [data, setData] = useState<ProfitCenterRow[]>([
    {
      id: 1,
      prcId: 'PRC-001',
      coaId: 'COA-001',
      lenId: 'LEN-001',
      depOunId: 'OUN-001',
      prcCode: 'PC-SALES-VNM',
      prcName: 'Vietnam Sales Center',
      prcDescription: 'Domestic sales revenue and costs for Vietnam region',
      prcType: 'Detail',
      prcClass: 'Revenue',
      status: 'Y',
      effectiveDateFrom: '2025-01-01',
      effectiveDateTo: '2026-12-31',
      createdBy: 'admin',
      createDate: '2024-01-15'
    },
    {
      id: 2,
      prcId: 'PRC-002',
      coaId: 'COA-001',
      lenId: 'LEN-001',
      depOunId: 'OUN-002',
      prcCode: 'PC-RETAIL-GLOBAL',
      prcName: 'Global Retail Center',
      prcDescription: 'Income and expenses for global retail operations',
      prcType: 'Summary',
      prcClass: 'Operations',
      status: 'Y',
      effectiveDateFrom: '2025-01-01',
      effectiveDateTo: '2027-12-31',
      createdBy: 'admin',
      createDate: '2024-01-16'
    }
  ]);

  const handleAddRow = () => {
    const newRow: ProfitCenterRow = {
      id: Date.now(),
      prcId: `PRC-${String(data.length + 1).padStart(3, '0')}`,
      coaId: '',
      lenId: '',
      depOunId: '',
      prcCode: '',
      prcName: '',
      prcDescription: '',
      prcType: 'Detail',
      prcClass: '',
      status: 'Y',
      effectiveDateFrom: '',
      effectiveDateTo: '',
      createdBy: 'admin',
      createDate: new Date().toISOString().split('T')[0]
    };
    setData([...data, newRow]);
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: keyof ProfitCenterRow, value: any) => {
    setData(data.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const filteredData = data.filter(row => {
    const matchesSearch = searchText === '' ||
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      );
    const matchesStatus = selectedStatus === 'all' || row.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-800">
      {/* Page Header */}
      <div className="bg-white border-b px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-blue-900">Profit Center</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Quản lý trung tâm lợi nhuận</span>
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
            <div>
              <label className="block text-[10px] mb-1.5 ml-0.5">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="h-8 text-[11px] bg-gray-50/50 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-[11px]">All Status</SelectItem>
                  <SelectItem value="Y" className="text-[11px]">Active</SelectItem>
                  <SelectItem value="N" className="text-[11px]">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Statistics Cards */}
          <div className="px-6 py-4 grid grid-cols-3 gap-4">
            <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Profit Centers</p>
                <p className="text-2xl font-black text-blue-900">{data.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </div>
            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Active</p>
                <p className="text-2xl font-black text-emerald-900">{data.filter(r => r.status === 'Y').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-purple-600/70 uppercase mb-1">Types</p>
                <p className="text-2xl font-black text-purple-900">{new Set(data.map(r => r.prcType)).size}</p>
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
                  <Plus className="w-3.5 h-3.5" /> New Profit Center
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
                onDeleteRows={handleDeleteRows}
                onSave={() => console.log('Saving Profit Centers...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[2600px]">
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
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">Profit Center ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium">Chart of Account ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium">Legal Entity ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium">Dept Unit ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium">Profit Center Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-64 font-medium">Profit Center Name</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-80 font-medium">Description</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium">Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium">Class</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium">Status</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium">From Date</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium">To Date</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium">Created By</th>
                  <th className="px-3 py-3 text-left text-blue-700 w-32 font-medium text-center">Create Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-10">
                      <Checkbox checked={selectedRows.includes(row.id)} onCheckedChange={() => setSelectedRows(prev => prev.includes(row.id) ? prev.filter(x => x !== row.id) : [...prev, row.id])} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-10 text-[11px] font-bold text-blue-600">{row.prcId}</td>
                    <td className="px-3 py-2 border-r"><Input value={row.coaId} onChange={(e) => updateRow(row.id, 'coaId', e.target.value)} className="h-7 border-transparent hover:border-gray-200 shadow-none text-[11px]" /></td>
                    <td className="px-3 py-2 border-r"><Input value={row.lenId} onChange={(e) => updateRow(row.id, 'lenId', e.target.value)} className="h-7 border-transparent hover:border-gray-200 shadow-none text-[11px]" /></td>
                    <td className="px-3 py-2 border-r"><Input value={row.depOunId} onChange={(e) => updateRow(row.id, 'depOunId', e.target.value)} className="h-7 border-transparent hover:border-gray-200 shadow-none text-[11px]" /></td>
                    <td className="px-3 py-2 border-r font-bold text-[11px]"><Input value={row.prcCode} onChange={(e) => updateRow(row.id, 'prcCode', e.target.value)} className="h-7 border-transparent hover:border-gray-200 shadow-none text-[11px]" /></td>
                    <td className="px-3 py-2 border-r font-medium text-[11px]"><Input value={row.prcName} onChange={(e) => updateRow(row.id, 'prcName', e.target.value)} className="h-7 border-transparent hover:border-gray-200 shadow-none text-[11px]" /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.prcDescription} onChange={(e) => updateRow(row.id, 'prcDescription', e.target.value)} className="h-7 border-transparent hover:border-gray-200 shadow-none text-[11px]" /></td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.prcType} onValueChange={(v) => updateRow(row.id, 'prcType', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Detail" className="text-[11px]">Detail</SelectItem>
                          <SelectItem value="Summary" className="text-[11px]">Summary</SelectItem>
                          <SelectItem value="Heading" className="text-[11px]">Heading</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.prcClass} onValueChange={(v) => updateRow(row.id, 'prcClass', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue placeholder="Select class" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Revenue" className="text-[11px]">Revenue</SelectItem>
                          <SelectItem value="Operations" className="text-[11px]">Operations</SelectItem>
                          <SelectItem value="Investment" className="text-[11px]">Investment</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.status} onValueChange={(v) => updateRow(row.id, 'status', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Y" className="text-[11px]">Active</SelectItem>
                          <SelectItem value="N" className="text-[11px]">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r"><Input type="date" value={row.effectiveDateFrom} onChange={(e) => updateRow(row.id, 'effectiveDateFrom', e.target.value)} className="h-7 border-transparent shadow-none text-[11px]" /></td>
                    <td className="px-3 py-2 border-r"><Input type="date" value={row.effectiveDateTo} onChange={(e) => updateRow(row.id, 'effectiveDateTo', e.target.value)} className="h-7 border-transparent shadow-none text-[11px]" /></td>
                    <td className="px-3 py-2 border-r text-[10px] text-gray-400 italic">{row.createdBy}</td>
                    <td className="px-3 py-2 text-[10px] text-gray-400 italic">{row.createDate}</td>
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