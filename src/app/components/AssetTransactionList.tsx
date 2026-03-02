import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft, CheckCircle, FileText, AlertTriangle, Calendar, ArrowRightLeft } from 'lucide-react';
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

interface AssetTransactionListProps {
  onCreateClick: () => void;
}

const mockData = [
  {
    id: 1,
    atrId: 'ATR-001',
    assId: 'ASS-001',
    atrCode: 'ADD0124-0001',
    atrType: 'ADD',
    newCost: 150000000,
    amountChange: 150000000,
    description: 'Mua mới thiết bị IT từ nhà cung cấp ABC',
    status: 'P',
    postingDate: '15-01-2024'
  },
  {
    id: 2,
    atrId: 'ATR-002',
    assId: 'ASS-001',
    atrCode: 'ADJ0224-0001',
    atrType: 'ADJ',
    newCost: 150500000,
    amountChange: 500000,
    description: 'Điều chỉnh giá trị do lắp thêm phụ kiện',
    status: 'P',
    postingDate: '05-02-2024'
  },
  {
    id: 3,
    atrId: 'ATR-003',
    assId: 'ASS-002',
    atrCode: 'TRA0324-0001',
    atrType: 'TRA',
    newCost: 85000000,
    amountChange: 0,
    description: 'Luân chuyển xe từ HN về HCM',
    status: 'C',
    postingDate: null
  }
];

export default function AssetTransactionList({ onCreateClick }: AssetTransactionListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filteredData = mockData.filter(item => {
    const matchesSearch = searchText === '' || Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesType = selectedType === 'all' || item.atrType === selectedType;
    return matchesSearch && matchesType;
  });

  const postedCount = mockData.filter(r => r.status === 'P').length;
  const addCount = mockData.filter(r => r.atrType === 'ADD').length;

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-800">
      {/* Page Header */}
      <div className="bg-white border-b px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-blue-900 uppercase">Asset Transactions</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Nghiệp vụ phát sinh tài sản</span>
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
                placeholder="ID or Code..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="h-8 text-[11px] bg-gray-50/50 border-gray-200 shadow-none font-medium"
              />
            </div>
            <div>
              <label className="block text-[10px] mb-1.5 ml-0.5">Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="h-8 text-[11px] bg-gray-50/50 border-gray-200 font-bold uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-[11px]">All Types</SelectItem>
                  <SelectItem value="ADD" className="text-[11px]">ADD (Addition)</SelectItem>
                  <SelectItem value="ADJ" className="text-[11px]">ADJ (Adjustment)</SelectItem>
                  <SelectItem value="TRA" className="text-[11px]">TRA (Transfer)</SelectItem>
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
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Transactions</p>
                <p className="text-2xl font-black text-blue-900 leading-none">{mockData.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <ArrowRightLeft className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Posted</p>
                <p className="text-2xl font-black text-emerald-900 leading-none">{postedCount}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-purple-600/70 uppercase mb-1">Additions</p>
                <p className="text-2xl font-black text-purple-900 leading-none">{addCount}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100/30 flex items-center justify-center border border-purple-100">
                <FileText className="w-5 h-5 text-purple-500" />
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
                <Button size="sm" onClick={onCreateClick} className="bg-blue-600 hover:bg-blue-700 text-[11px] font-bold h-8 px-4 shadow-sm gap-2 whitespace-nowrap">
                  <Plus className="w-3.5 h-3.5" /> New Transaction
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
                onAddRow={onCreateClick}
                onDeleteRows={() => setSelectedRows([])}
                onSave={() => console.log('Saving transactions...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[1600px]">
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
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-12 z-40 uppercase">ATR ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">ASS ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase text-center">ATR Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">Type</th>
                  <th className="px-3 py-3 text-right text-blue-700 border-r w-40 font-medium uppercase px-4 text-emerald-600 font-black">Cost</th>
                  <th className="px-3 py-3 text-right text-blue-700 border-r w-40 font-bold uppercase px-4 italic">Change</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r font-medium uppercase">Description</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-32 font-medium uppercase">Status</th>
                  <th className="px-3 py-3 text-center text-blue-700 w-32 font-medium uppercase">Posting Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-20">
                      <Checkbox checked={selectedRows.includes(item.id)} onCheckedChange={() => setSelectedRows(prev => prev.includes(item.id) ? prev.filter(x => x !== item.id) : [...prev, item.id])} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-20 text-[11px] font-bold text-blue-600 group cursor-pointer hover:underline flex items-center gap-1.5" onClick={onCreateClick}>
                      <FileText className="w-3 h-3 text-blue-400 group-hover:text-blue-600" />
                      {item.atrId}
                    </td>
                    <td className="px-3 py-2 border-r text-[11px] text-center font-mono text-gray-500">{item.assId}</td>
                    <td className="px-3 py-2 border-r text-[11px] text-center font-bold text-gray-800 italic">{item.atrCode}</td>
                    <td className="px-3 py-2 border-r text-[11px] text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.atrType === 'ADD' ? 'bg-emerald-100 text-emerald-700' :
                          item.atrType === 'ADJ' ? 'bg-blue-100 text-blue-700' :
                            item.atrType === 'TRA' ? 'bg-purple-100 text-purple-700' :
                              'bg-gray-100 text-gray-700'
                        }`}>
                        {item.atrType}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px] text-right font-black text-emerald-600 px-4">{item.newCost.toLocaleString()}</td>
                    <td className="px-3 py-2 border-r text-[11px] text-right px-4 font-bold text-blue-600 group-hover:translate-x-1 transition-transform">{item.amountChange > 0 ? `+${item.amountChange.toLocaleString()}` : item.amountChange.toLocaleString()}</td>
                    <td className="px-3 py-2 border-r text-[11px] text-gray-500 italic truncate max-w-[400px]">{item.description}</td>
                    <td className="px-3 py-2 border-r text-center">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-wider ${item.status === 'P' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                          'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}>
                        {item.status === 'P' ? 'Posted' : 'Confirmed'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[10px] text-center text-gray-400 italic font-medium">{item.postingDate || <span className="text-gray-200">unposted</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-white border-t px-6 py-2 flex items-center justify-between shrink-0 font-bold text-[10px] text-gray-500 uppercase tracking-widest text-center">
            <div>Showing <span className="text-blue-600">{filteredData.length}</span> of {mockData.length} records</div>
          </div>
        </div>
      </div>
    </div>
  );
}
