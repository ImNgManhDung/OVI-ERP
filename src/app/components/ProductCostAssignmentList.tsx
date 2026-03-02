import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft, Layers } from 'lucide-react';
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

interface ProductCostAssignmentRow {
  id: number;
  pcaId: string;
  pcaCode: string;
  pcaName: string;
  pcaType: string;
  pcaClass: string;
  coaId: string;
  lenId: string;
  parentPcaId: string;
  level: number | string;
  matId: string;
  porId: string;
  referenceName: string;
  status: string;
  effectiveDateFrom: string;
  effectiveDateTo: string;
  createdBy: string;
  createDate: string;
}

export default function ProductCostAssignmentList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [data, setData] = useState<ProductCostAssignmentRow[]>([
    { id: 1, pcaId: 'PCA-001', pcaCode: 'PO-001', pcaName: 'Laptop Assembly Line A', pcaType: 'Production Order', pcaClass: 'Labor', coaId: 'COA-001', lenId: 'LEN-001', parentPcaId: '', level: 1, matId: 'MAT-001', porId: 'POR-001', referenceName: 'Laptop Model X Production', status: 'Y', effectiveDateFrom: '2024-01-01', effectiveDateTo: '2025-12-31', createdBy: 'admin', createDate: '2024-01-15' },
    { id: 2, pcaId: 'PCA-002', pcaCode: 'FG-001', pcaName: 'Laptop Model X - Finished Goods', pcaType: 'Finished Product', pcaClass: 'Material', coaId: 'COA-001', lenId: 'LEN-001', parentPcaId: 'PCA-001', level: 2, matId: 'MAT-002', porId: 'POR-001', referenceName: 'Completed laptop units ready for sale', status: 'Y', effectiveDateFrom: '2024-02-01', effectiveDateTo: '2025-12-31', createdBy: 'admin', createDate: '2024-01-16' },
    { id: 3, pcaId: 'PCA-003', pcaCode: 'SF-001', pcaName: 'Laptop Motherboard Assembly', pcaType: 'Semi-Finished', pcaClass: 'Equipment', coaId: 'COA-002', lenId: 'LEN-002', parentPcaId: '', level: 1, matId: 'MAT-003', porId: 'POR-002', referenceName: 'Semi-finished motherboard component', status: 'Y', effectiveDateFrom: '2024-03-01', effectiveDateTo: '2026-03-31', createdBy: 'admin', createDate: '2024-02-01' }
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow: ProductCostAssignmentRow = {
      id: Date.now(),
      pcaId: '',
      pcaCode: '',
      pcaName: '',
      pcaType: 'Production Order',
      pcaClass: '',
      coaId: '',
      lenId: '',
      parentPcaId: '',
      level: '',
      matId: '',
      porId: '',
      referenceName: '',
      status: 'Y',
      effectiveDateFrom: '',
      effectiveDateTo: '',
      createdBy: '',
      createDate: ''
    };
    setData([...data, newRow]);
  };

  const updateRow = (id: number, field: keyof ProductCostAssignmentRow, value: any) => {
    setData(data.map(row => row.id === id ? { ...row, [field]: value } : row));
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
          <h1 className="text-sm font-bold text-blue-900 uppercase">Product Cost Assignments</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Phân bổ chi phí sản phẩm</span>
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
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Assignments</p>
                <p className="text-2xl font-black text-blue-900 leading-none">{data.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <Layers className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Active (PO)</p>
                <p className="text-2xl font-black text-emerald-900 leading-none">{data.filter(r => r.pcaType === 'Production Order').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-purple-600/70 uppercase mb-1">Finished Goods</p>
                <p className="text-2xl font-black text-purple-900 leading-none">{data.filter(r => r.pcaType === 'Finished Product').length}</p>
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
                  <Plus className="w-3.5 h-3.5" /> New Assignment
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
                onSave={() => console.log('Saving Product Cost Assignments...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[3200px]">
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
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-12 z-40 uppercase">Assignment ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase text-center">Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-64 font-medium uppercase text-center">Name</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase text-center">Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase text-center">Class</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase text-center">COA ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase text-center">LEN ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase text-center">Parent ID</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-32 font-medium uppercase">Level</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase text-center">Mat ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase text-center">Order ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-80 font-medium uppercase">Reference</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">Status</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase text-center">From Date</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase text-center">To Date</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">Created By</th>
                  <th className="px-3 py-3 text-left text-blue-700 w-32 font-medium uppercase text-center">Create Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-20">
                      <Checkbox checked={selectedRows.includes(row.id)} onCheckedChange={() => toggleRowSelection(row.id)} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-20 text-[11px] font-bold text-blue-600 uppercase">{row.pcaId}</td>
                    <td className="px-3 py-2 border-r text-[11px] font-bold"><Input value={row.pcaCode} onChange={(e) => updateRow(row.id, 'pcaCode', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] font-medium"><Input value={row.pcaName} onChange={(e) => updateRow(row.id, 'pcaName', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.pcaType} onValueChange={(v) => updateRow(row.id, 'pcaType', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Production Order" className="text-[11px]">Production Order</SelectItem>
                          <SelectItem value="Finished Product" className="text-[11px]">Finished Product</SelectItem>
                          <SelectItem value="Semi-Finished" className="text-[11px]">Semi-Finished</SelectItem>
                          <SelectItem value="WIP" className="text-[11px]">WIP</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.pcaClass} onValueChange={(v) => updateRow(row.id, 'pcaClass', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Labor" className="text-[11px]">Labor</SelectItem>
                          <SelectItem value="Material" className="text-[11px]">Material</SelectItem>
                          <SelectItem value="Equipment" className="text-[11px]">Equipment</SelectItem>
                          <SelectItem value="Machinery" className="text-[11px]">Machinery</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[10px] text-center font-bold text-gray-400"><Input value={row.coaId} onChange={(e) => updateRow(row.id, 'coaId', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[10px] text-center font-bold text-gray-400"><Input value={row.lenId} onChange={(e) => updateRow(row.id, 'lenId', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[10px] text-center font-bold text-gray-400"><Input value={row.parentPcaId} onChange={(e) => updateRow(row.id, 'parentPcaId', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] text-center font-bold text-gray-500"><Input type="number" value={row.level} onChange={(e) => updateRow(row.id, 'level', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[10px] text-center font-bold text-gray-400"><Input value={row.matId} onChange={(e) => updateRow(row.id, 'matId', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[10px] text-center font-bold text-gray-400"><Input value={row.porId} onChange={(e) => updateRow(row.id, 'porId', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] italic text-gray-400"><Input value={row.referenceName} onChange={(e) => updateRow(row.id, 'referenceName', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-center">
                      <Select value={row.status} onValueChange={(v) => updateRow(row.id, 'status', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none text-center"><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="Y" className="text-[11px]">Active</SelectItem><SelectItem value="N" className="text-[11px]">Inactive</SelectItem></SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[10px] text-center font-medium"><Input type="date" value={row.effectiveDateFrom} onChange={(e) => updateRow(row.id, 'effectiveDateFrom', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[10px] text-center font-medium"><Input type="date" value={row.effectiveDateTo} onChange={(e) => updateRow(row.id, 'effectiveDateTo', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
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
