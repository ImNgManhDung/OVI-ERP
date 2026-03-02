import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft, Banknote } from 'lucide-react';
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

interface CashFlowRow {
  id: number;
  cflId: string;
  cfCode: string;
  cfType: string;
  cfClass: string;
  cfCategory: string;
  cfName: string;
  isParent: boolean;
  parentId: string;
  level: string;
}

const cfTypeOptions = [
  'Hoạt động kinh doanh',
  'Hoạt động đầu tư',
  'Hoạt động tài chính',
];

const cfClassOptions = [
  '1. Tiền chi để mua sắm, xây dựng TSCĐ và các tài sản dài hạn khác',
  '2. Tiền thu từ thanh lý, nhượng bán TSCĐ và các tài sản dài hạn khác',
  '3. Tiền chi cho vay, mua các công cụ nợ của đơn vị khác',
  '4. Tiền thu hồi cho vay, bán lại các công cụ nợ của đơn vị khác',
  '5. Tiền chi đầu tư góp vốn vào đơn vị khác',
  '6. Tiền thu hồi đầu tư góp vốn vào đơn vị khác',
  '7. Tiền thu lãi cho vay, cổ tức và lợi nhuận được chia',
  '8. Tiền thu từ phát hành cổ phiếu, nhận vốn góp của chủ sở hữu',
  '9. Tiền trả lại vốn góp cho các chủ sở hữu, mua lại cổ phiếu của doanh nghiệp đã phát hành',
  '10. Tiền thu từ đi vay',
  '11. Tiền trả nợ gốc vay',
  '12. Tiền trả nợ gốc thuê tài chính',
  '13. Cổ tức, lợi nhuận đã trả cho chủ sở hữu',
];

const cfCategoryOptions = [
  'Xây dựng',
  'Tư vấn xây dựng',
  'Tư vấn khác',
  'Trang thiết bị',
  'Văn phòng',
  'Bất động sản',
  'Dịch vụ khác',
  'Tiếp khách',
];

export default function CashFlow() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [cashFlows, setCashFlows] = useState<CashFlowRow[]>([
    { id: 1, cflId: '1', cfCode: 'HĐKD0101', cfType: 'Hoạt động kinh doanh', cfClass: '1. Tiền chi để mua sắm, xây dựng TSCĐ và các tài sản dài hạn khác', cfCategory: 'Xây dựng', cfName: 'Chi phí xây dựng cơ bản', isParent: true, parentId: '', level: '1' },
    { id: 2, cflId: '2', cfCode: 'HĐKD0102', cfType: 'Hoạt động kinh doanh', cfClass: '1. Tiền chi để mua sắm, xây dựng TSCĐ và các tài sản dài hạn khác', cfCategory: 'Trang thiết bị', cfName: 'Mua sắm thiết bị văn phòng', isParent: false, parentId: '1', level: '2' },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow: CashFlowRow = {
      id: Date.now(),
      cflId: (cashFlows.length + 1).toString(),
      cfCode: '',
      cfType: '',
      cfClass: '',
      cfCategory: '',
      cfName: '',
      isParent: false,
      parentId: '',
      level: '1',
    };
    setCashFlows([...cashFlows, newRow]);
  };

  const updateRow = (id: number, field: keyof CashFlowRow, value: any) => {
    setCashFlows(cashFlows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const filteredCashFlows = cashFlows.filter(row =>
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
          <h1 className="text-sm font-bold text-blue-900 uppercase">Cash Flow</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Danh mục lưu chuyển tiền tệ</span>
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
                placeholder="Search name, code..."
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
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Categories</p>
                <p className="text-2xl font-black text-blue-900 leading-none">{cashFlows.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <Banknote className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Parent Items</p>
                <p className="text-2xl font-black text-emerald-900 leading-none">{cashFlows.filter(r => r.isParent).length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-purple-600/70 uppercase mb-1">Business Ops</p>
                <p className="text-2xl font-black text-purple-900 leading-none">{cashFlows.filter(r => r.cfType === 'Hoạt động kinh doanh').length}</p>
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
                  <Plus className="w-3.5 h-3.5" /> New Item
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
                onDeleteRows={() => setCashFlows(cashFlows.filter(r => !selectedRows.includes(r.id)))}
                onSave={() => console.log('Saving Cash Flow...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[2000px]">
              <thead className="sticky top-0 z-30 font-bold uppercase tracking-tight text-[10px]">
                <tr className="bg-[#f0f7ff] border-b">
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-40">
                    <Checkbox
                      checked={selectedRows.length === filteredCashFlows.length && filteredCashFlows.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedRows(filteredCashFlows.map(r => r.id));
                        else setSelectedRows([]);
                      }}
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-24 bg-[#f0f7ff] sticky left-12 z-40 uppercase">CFL_ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-36 z-40 uppercase">CF Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-96 font-medium uppercase">Class</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">Category</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-72 font-medium uppercase">Name</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-24 font-medium uppercase">Is Parent</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-24 font-medium uppercase">Parent ID</th>
                  <th className="px-3 py-3 text-center text-blue-700 w-24 font-medium uppercase">Level</th>
                </tr>
              </thead>
              <tbody>
                {filteredCashFlows.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-20">
                      <Checkbox checked={selectedRows.includes(row.id)} onCheckedChange={() => toggleRowSelection(row.id)} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-20 text-[11px] font-bold text-gray-500 text-center">{row.cflId}</td>
                    <td className="px-3 py-2 border-r bg-white sticky left-36 z-20 text-[11px] font-bold text-blue-600 text-center">{row.cfCode}</td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.cfType} onValueChange={(v) => updateRow(row.id, 'cfType', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>{cfTypeOptions.map(opt => <SelectItem key={opt} value={opt} className="text-[11px]">{opt}</SelectItem>)}</SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.cfClass} onValueChange={(v) => updateRow(row.id, 'cfClass', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>{cfClassOptions.map(opt => <SelectItem key={opt} value={opt} className="text-[11px]">{opt}</SelectItem>)}</SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.cfCategory} onValueChange={(v) => updateRow(row.id, 'cfCategory', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>{cfCategoryOptions.map(opt => <SelectItem key={opt} value={opt} className="text-[11px]">{opt}</SelectItem>)}</SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px] font-medium"><Input value={row.cfName} onChange={(e) => updateRow(row.id, 'cfName', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.isParent} onCheckedChange={(c) => updateRow(row.id, 'isParent', !!c)} className="scale-90" /></td>
                    <td className="px-3 py-2 border-r text-center font-bold text-gray-400 text-[11px]"><Input value={row.parentId} onChange={(e) => updateRow(row.id, 'parentId', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 text-center font-bold text-gray-400 text-[11px]"><Input value={row.level} onChange={(e) => updateRow(row.id, 'level', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-white border-t px-6 py-2 flex items-center justify-between shrink-0 font-bold text-[10px] text-gray-500 uppercase tracking-widest text-center">
            <div>Showing <span className="text-blue-600">{filteredCashFlows.length}</span> of {cashFlows.length} records</div>
          </div>
        </div>
      </div>
    </div>
  );
}