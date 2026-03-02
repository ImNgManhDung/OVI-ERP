import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft, CheckCircle, FileText, AlertTriangle, Calendar, BookCopy } from 'lucide-react';
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

interface GLJournalListProps {
  onCreateClick: () => void;
}

const glJournals = [
  {
    journalId: 'GLJ001',
    journalNumber: 'GJ-01-022600001',
    batchNumber: 'B001',
    lenId: 'FPT-SOFT',
    description: 'Điều chỉnh chi phí lương tháng 01/2026',
    docType: 'GENERAL',
    docDate: '01/02/2026',
    postingDate: '01/02/2026',
    currency: 'VND',
    amount: 125000000,
    status: 'posted'
  },
  {
    journalId: 'GLJ002',
    journalNumber: 'GJ-02-022600002',
    batchNumber: 'B002',
    lenId: 'FPT-RETAIL',
    description: 'Hạch toán phân bổ chi phí trả trước',
    docType: 'ADJUSTMENT',
    docDate: '02/02/2026',
    postingDate: '02/02/2026',
    currency: 'VND',
    amount: 45000000,
    status: 'unposted'
  }
];

export default function GLJournalList({ onCreateClick }: GLJournalListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredData = glJournals.filter(item => {
    const matchesSearch = searchText === '' || Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-800">
      {/* Page Header */}
      <div className="bg-white border-b px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-blue-900 uppercase">GL Journals</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Danh sách chứng từ ghi sổ cái</span>
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
                placeholder="Number or Desc..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="h-8 text-[11px] bg-gray-50/50 border-gray-200 shadow-none font-medium"
              />
            </div>
            <div>
              <label className="block text-[10px] mb-1.5 ml-0.5">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="h-8 text-[11px] bg-gray-50/50 border-gray-200 font-bold uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-[11px]">All Status</SelectItem>
                  <SelectItem value="posted" className="text-[11px]">Posted</SelectItem>
                  <SelectItem value="unposted" className="text-[11px]">Unposted</SelectItem>
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
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Journals</p>
                <p className="text-2xl font-black text-blue-900 leading-none">{glJournals.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <BookCopy className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Posted</p>
                <p className="text-2xl font-black text-emerald-900 leading-none">{glJournals.filter(r => r.status === 'posted').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            </div>

            <div className="bg-amber-50/40 border border-amber-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-amber-600/70 uppercase mb-1">Unposted</p>
                <p className="text-2xl font-black text-amber-900 leading-none">{glJournals.filter(r => r.status === 'unposted').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-100/30 flex items-center justify-center border border-amber-100">
                <FileText className="w-5 h-5 text-amber-500" />
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
                  <Plus className="w-3.5 h-3.5" /> New Journal
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
                onSave={() => console.log('Saving journals...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[1400px]">
              <thead className="sticky top-0 z-30 font-bold uppercase tracking-tight text-[10px]">
                <tr className="bg-[#f0f7ff] border-b">
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-40">
                    <Checkbox
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedRows(filteredData.map(r => r.journalId));
                        else setSelectedRows([]);
                      }}
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-12 z-40 uppercase">Journal ID</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase text-center">Batch Number</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">Posting Date</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase text-center">Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r font-medium uppercase px-4">Description</th>
                  <th className="px-3 py-3 text-right text-blue-700 border-r w-40 font-medium uppercase px-4 text-emerald-600">Amount</th>
                  <th className="px-3 py-3 text-center text-blue-700 w-32 font-medium uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.journalId} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-20">
                      <Checkbox checked={selectedRows.includes(item.journalId)} onCheckedChange={() => setSelectedRows(prev => prev.includes(item.journalId) ? prev.filter(x => x !== item.journalId) : [...prev, item.journalId])} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-20 text-[11px] font-bold text-blue-600 group cursor-pointer hover:underline flex items-center gap-1.5" onClick={onCreateClick}>
                      <FileText className="w-3 h-3 text-blue-400 group-hover:text-blue-600" />
                      {item.journalId}
                    </td>
                    <td className="px-3 py-2 border-r text-[11px] text-center font-mono text-gray-500 italic">{item.batchNumber}</td>
                    <td className="px-3 py-2 border-r text-[11px] text-center text-blue-600 font-medium">{item.postingDate}</td>
                    <td className="px-3 py-2 border-r text-[11px] text-center"><span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 text-[10px] font-bold">{item.docType}</span></td>
                    <td className="px-3 py-2 border-r text-[11px] text-gray-700 font-medium italic">{item.description}</td>
                    <td className="px-3 py-2 border-r text-[11px] text-right font-black text-emerald-600 px-4">{item.amount.toLocaleString()}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-wider ${item.status === 'posted' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                          'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-white border-t px-6 py-2 flex items-center justify-between shrink-0 font-bold text-[10px] text-gray-500 uppercase tracking-widest text-center">
            <div>Showing <span className="text-blue-600">{filteredData.length}</span> of {glJournals.length} records</div>
          </div>
        </div>
      </div>
    </div>
  );
}