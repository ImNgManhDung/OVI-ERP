import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import MasterDataToolbar from './MasterDataToolbar';

interface DocTypeRow {
  id: number;
  docType: string;
  name: string;
  nameEn: string;
  rvDocType: string;
  docCategory: string;
  range: string;
  docDesc: string;
  notes: string;
  ca: boolean;
  ba: boolean;
  ob: boolean;
  aa: boolean;
  ma: boolean;
  gl: boolean;
}

export default function DocTypeList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [data, setData] = useState<DocTypeRow[]>([
    { id: 1, docType: 'CR', name: 'Thu tiền mặt', nameEn: 'Cash receipt', rvDocType: 'RV', docCategory: 'CA', range: '11', docDesc: 'Tiền mặt', notes: 'Áp dụng màn hình thu tiền mặt', ca: true, ba: false, ob: false, aa: false, ma: false, gl: false },
    { id: 2, docType: 'CP', name: 'Chi tiền mặt', nameEn: 'Cash payment', rvDocType: 'RV', docCategory: 'CA', range: '12', docDesc: 'Tiền mặt', notes: 'Áp dụng màn hình chi tiền mặt', ca: true, ba: false, ob: false, aa: false, ma: false, gl: false },
    { id: 3, docType: 'CO', name: 'Khấu trừ công nợ', nameEn: 'Debt clearing', rvDocType: 'RV', docCategory: 'CA', range: '13', docDesc: 'Tiền mặt', notes: 'Áp dụng màn hình chi tiền mặt', ca: true, ba: false, ob: false, aa: false, ma: false, gl: false },
    { id: 4, docType: 'BR', name: 'Thu ngân hàng', nameEn: 'Credit note', rvDocType: 'RV', docCategory: 'BA', range: '20', docDesc: 'Ngân hàng', notes: 'Áp dụng màn hình thu ngân hàng', ca: false, ba: true, ob: false, aa: false, ma: false, gl: false },
  ]);

  const handleAddRow = () => {
    const newRow: DocTypeRow = {
      id: Date.now(),
      docType: '',
      name: '',
      nameEn: '',
      rvDocType: '',
      docCategory: '',
      range: '',
      docDesc: '',
      notes: '',
      ca: false,
      ba: false,
      ob: false,
      aa: false,
      ma: false,
      gl: false,
    };
    setData([...data, newRow]);
  };

  const updateRow = (id: number, field: keyof DocTypeRow, value: any) => {
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
          <h1 className="text-sm font-bold text-blue-900">Document Type</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Quản lý loại chứng từ</span>
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
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Types</p>
                <p className="text-2xl font-black text-blue-900">{data.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Financial</p>
                <p className="text-2xl font-black text-emerald-900">{data.filter(r => r.ca || r.ba).length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-purple-600/70 uppercase mb-1">Operational</p>
                <p className="text-2xl font-black text-purple-900">{data.filter(r => r.ob || r.ma).length}</p>
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
                  <Plus className="w-3.5 h-3.5" /> New Doc Type
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
                onSave={() => console.log('Saving Doc Types...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[2800px]">
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
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">Doc Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-56 font-medium uppercase">Name</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-56 font-medium uppercase">Name (EN)</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase">RV Doc Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase">Doc Category</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">Range</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-56 font-medium uppercase">Doc Desc</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-96 font-medium uppercase">Notes</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-16 font-medium uppercase">CA</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-16 font-medium uppercase">BA</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-16 font-medium uppercase">OB</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-16 font-medium uppercase">AA</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-16 font-medium uppercase">MA</th>
                  <th className="px-3 py-3 text-center text-blue-700 w-16 font-medium uppercase">GL</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-10">
                      <Checkbox checked={selectedRows.includes(row.id)} onCheckedChange={() => setSelectedRows(prev => prev.includes(row.id) ? prev.filter(x => x !== row.id) : [...prev, row.id])} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-10 text-[11px] font-bold text-blue-600">{row.docType}</td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.name} onChange={(e) => updateRow(row.id, 'name', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] italic text-gray-400 font-medium"><Input value={row.nameEn} onChange={(e) => updateRow(row.id, 'nameEn', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] text-center"><Input value={row.rvDocType} onChange={(e) => updateRow(row.id, 'rvDocType', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] text-center font-bold text-purple-600"><Input value={row.docCategory} onChange={(e) => updateRow(row.id, 'docCategory', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] text-center font-mono"><Input value={row.range} onChange={(e) => updateRow(row.id, 'range', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.docDesc} onChange={(e) => updateRow(row.id, 'docDesc', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.notes} onChange={(e) => updateRow(row.id, 'notes', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.ca} onCheckedChange={(c) => updateRow(row.id, 'ca', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.ba} onCheckedChange={(c) => updateRow(row.id, 'ba', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.ob} onCheckedChange={(c) => updateRow(row.id, 'ob', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.aa} onCheckedChange={(c) => updateRow(row.id, 'aa', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.ma} onCheckedChange={(c) => updateRow(row.id, 'ma', !!c)} /></td>
                    <td className="px-3 py-2 text-center"><Checkbox checked={row.gl} onCheckedChange={(c) => updateRow(row.id, 'gl', !!c)} /></td>
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