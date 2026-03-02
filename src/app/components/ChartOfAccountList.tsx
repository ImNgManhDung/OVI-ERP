import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import MasterDataToolbar from './MasterDataToolbar';

interface CoaRow {
  id: number;
  coaCode: string;
  coaName: string;
  segmentSeparate: string;
  description: string;
  status: string;
}

export default function ChartOfAccountList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [coaData, setCoaData] = useState<CoaRow[]>([
    {
      id: 1,
      coaCode: 'DEFAULT_COA',
      coaName: 'DEFAULT_COA',
      segmentSeparate: '-',
      description: 'COA Default dùn cho các tác các COA khác',
      status: 'Yes'
    },
    {
      id: 2,
      coaCode: 'COA-01',
      coaName: 'COA-01',
      segmentSeparate: '-',
      description: '',
      status: 'Yes'
    },
    {
      id: 3,
      coaCode: 'COA-04',
      coaName: 'COA-04',
      segmentSeparate: '-',
      description: '',
      status: 'Yes'
    },
    {
      id: 4,
      coaCode: 'COA-02',
      coaName: 'COA-02',
      segmentSeparate: '',
      description: '',
      status: 'No'
    },
    {
      id: 5,
      coaCode: 'COA-03',
      coaName: 'COA-03',
      segmentSeparate: '-',
      description: '',
      status: 'No'
    }
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addNewRow = () => {
    const newId = Math.max(...coaData.map(r => r.id), 0) + 1;
    setCoaData([...coaData, {
      id: newId,
      coaCode: `COA-${String(newId).padStart(2, '0')}`,
      coaName: '',
      segmentSeparate: '-',
      description: '',
      status: 'Yes'
    }]);
  };

  const deleteSelectedRows = () => {
    setCoaData(coaData.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: keyof CoaRow, value: any) => {
    setCoaData(coaData.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const filteredData = coaData.filter(row => {
    const matchesSearch = searchText === '' ||
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      );
    const matchesStatus = selectedStatus === 'all' || (selectedStatus === 'Y' ? row.status === 'Yes' : row.status === 'No');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-800">
      {/* Page Header */}
      <div className="bg-white border-b px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-blue-900">Chart Of Account</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Danh mục hệ thống tài khoản</span>
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
            {/* Search Input */}
            <div>
              <label className="block text-[10px] mb-1.5 ml-0.5">
                Search
              </label>
              <Input
                placeholder="Search code, name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="h-8 text-[11px] bg-gray-50/50 border-gray-200 focus:bg-white transition-all shadow-none"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-[10px] mb-1.5 ml-0.5">
                Status
              </label>
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="h-8 text-[11px] bg-gray-50/50 border-gray-200 shadow-none font-medium">
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
            <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-3 flex justify-between items-center relative overflow-hidden group hover:shadow-sm transition-all h-20">
              <div className="relative z-10">
                <p className="text-[9px] font-bold text-blue-600/70 uppercase tracking-widest mb-1">Total COA</p>
                <p className="text-2xl font-black text-blue-900 leading-none">{coaData.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center relative z-10 border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center relative overflow-hidden group hover:shadow-sm transition-all h-20">
              <div className="relative z-10">
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase tracking-widest mb-1">Active</p>
                <p className="text-2xl font-black text-emerald-900 leading-none">{coaData.filter(r => r.status === 'Yes').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center relative z-10 border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center relative overflow-hidden group hover:shadow-sm transition-all h-20">
              <div className="relative z-10">
                <p className="text-[9px] font-bold text-purple-600/70 uppercase tracking-widest mb-1">Separators</p>
                <p className="text-2xl font-black text-purple-900 leading-none">{new Set(coaData.map(r => r.segmentSeparate).filter(Boolean)).size}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100/30 flex items-center justify-center relative z-10 border border-purple-100">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
              </div>
            </div>
          </div>

          {/* Grouping Bar and Toolbar */}
          <div className="px-6 pb-2">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-gray-100/50 border border-dashed border-gray-200 rounded-lg px-4 py-2 text-[11px] text-gray-400 italic flex items-center gap-2 flex-1 mr-6">
                <LayoutPanelLeft className="w-3.5 h-3.5" />
                Kéo tiêu đề một cột vào đây để nhóm một cột đó
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  onClick={addNewRow}
                  className="bg-blue-600 hover:bg-blue-700 text-[11px] font-bold px-4 h-8 rounded-md shadow-sm gap-2 whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" /> New COA
                </Button>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="h-8 w-40 pl-9 text-[11px] bg-white border-gray-200 rounded-md shadow-none focus:border-blue-500 transition-all font-medium"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-1 h-8 bg-white border border-gray-200 rounded-md px-1 ml-1 divide-x divide-gray-100">
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-blue-600 rounded-sm scale-90"><LayoutPanelLeft className="w-3 h-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-blue-600 rounded-sm scale-90"><RotateCcw className="w-3 h-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-blue-600 rounded-sm scale-90"><Settings2 className="w-3 h-3" /></Button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Toolbar (Selected Rows) */}
          {selectedRows.length > 0 && (
            <div className="mx-6 mb-2">
              <MasterDataToolbar
                searchText={searchText}
                onSearchChange={setSearchText}
                onAddRow={addNewRow}
                onDeleteRows={deleteSelectedRows}
                onSave={() => console.log('Saving COA...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm">
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
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 bg-[#f0f7ff] sticky left-12 z-40">COA Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-64">COA Name</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40">Segment Separate</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r">Description</th>
                  <th className="px-3 py-3 text-left text-blue-700 w-32">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-12 text-center text-gray-500 bg-white">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-12 h-12 opacity-10" />
                        <span className="text-xs font-medium uppercase tracking-widest text-gray-300">No records found</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map(row => (
                    <tr key={row.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                      <td className="px-3 py-2 border-r bg-white sticky left-0 z-20">
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() => toggleRowSelection(row.id)}
                        />
                      </td>
                      <td className="px-3 py-2 border-r bg-white sticky left-12 z-20 font-bold text-blue-600 text-[11px]">
                        <Input
                          value={row.coaCode}
                          onChange={(e) => updateRow(row.id, 'coaCode', e.target.value)}
                          className="h-7 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all shadow-none"
                        />
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        <Input
                          value={row.coaName}
                          onChange={(e) => updateRow(row.id, 'coaName', e.target.value)}
                          className="h-7 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-medium shadow-none"
                        />
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        <Input
                          value={row.segmentSeparate}
                          onChange={(e) => updateRow(row.id, 'segmentSeparate', e.target.value)}
                          className="h-7 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center shadow-none"
                        />
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        <Input
                          value={row.description}
                          onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                          className="h-7 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all shadow-none"
                        />
                      </td>
                      <td className="px-3 py-2 text-[11px]">
                        <Select
                          value={row.status}
                          onValueChange={(value) => updateRow(row.id, 'status', value)}
                        >
                          <SelectTrigger className="h-7 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all shadow-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yes" className="text-[11px]">Active</SelectItem>
                            <SelectItem value="No" className="text-[11px]">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-white border-t px-6 py-2 flex items-center justify-between shrink-0">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Showing <span className="text-blue-600">{filteredData.length}</span> of <span>{coaData.length}</span> records
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}