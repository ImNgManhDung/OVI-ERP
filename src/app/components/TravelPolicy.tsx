import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft, FileText } from 'lucide-react';
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

interface ExpensePolicyRow {
  id: number;
  expType: string;
  expCode: string;
  expClass: string;
  expCategory: string;
  description: string;
  positions: string;
  locationDomestic: boolean;
  locationInternational: boolean;
  locationRegion: string;
  minValue: string;
  maxValue: string;
  uom: string;
  startDate: string;
  endDate: string;
  status: string;
  policyMinValue: string;
  policyMaxValue: string;
  currencyCode: string;
}

const expTypeOptions = ['Ăn', 'Mặc', 'Ở', 'Đi lại'];
const positionOptions = ['Nhân viên', 'Trưởng phòng', 'Phó giám đốc', 'Giám đốc', 'Tổng giám đốc', 'CEO'];
const internationalRegionOptions = ['Mỹ', 'Châu Âu', 'Châu Á'];
const uomOptions = ['KM', 'Giờ', 'Ngày', 'Tháng', 'Lần', '%'];
const currencyOptions = ['VND', 'USD', 'EUR', 'JPY', 'SGD'];

export default function TravelPolicy() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [policies, setPolicies] = useState<ExpensePolicyRow[]>([
    {
      id: 1,
      expType: 'Đi lại',
      expCode: 'DL-001',
      expClass: 'Vé máy bay',
      expCategory: 'Business',
      description: 'Đi lại - Vé máy bay - Business',
      positions: 'Giám đốc',
      locationDomestic: true,
      locationInternational: false,
      locationRegion: '',
      minValue: '500',
      maxValue: '1000',
      uom: 'KM',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'Y',
      policyMinValue: '5000000',
      policyMaxValue: '15000000',
      currencyCode: 'VND',
    },
    {
      id: 2,
      expType: 'Ở',
      expCode: 'O-001',
      expClass: 'Khách sạn',
      expCategory: '4 sao',
      description: 'Ở - Khách sạn - 4 sao',
      positions: 'Phó giám đốc',
      locationDomestic: false,
      locationInternational: true,
      locationRegion: 'Châu Á',
      minValue: '1',
      maxValue: '10',
      uom: 'Ngày',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'Y',
      policyMinValue: '2000000',
      policyMaxValue: '5000000',
      currencyCode: 'VND',
    },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow: ExpensePolicyRow = {
      id: Date.now(),
      expType: '',
      expCode: '',
      expClass: '',
      expCategory: '',
      description: '',
      positions: '',
      locationDomestic: false,
      locationInternational: false,
      locationRegion: '',
      minValue: '',
      maxValue: '',
      uom: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'Y',
      policyMinValue: '',
      policyMaxValue: '',
      currencyCode: 'VND',
    };
    setPolicies([...policies, newRow]);
  };

  const updateRow = (id: number, field: keyof ExpensePolicyRow, value: any) => {
    setPolicies(policies.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const filteredPolicies = policies.filter(row => {
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
          <h1 className="text-sm font-bold text-blue-900 uppercase">Expense Policy</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Quản lý định mức chi phí</span>
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
                placeholder="Code, name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="h-8 text-[11px] bg-gray-50/50 border-gray-200 shadow-none font-medium"
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
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Policies</p>
                <p className="text-2xl font-black text-blue-900 leading-none">{policies.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Active</p>
                <p className="text-2xl font-black text-emerald-900 leading-none">{policies.filter(p => p.status === 'Y').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-purple-600/70 uppercase mb-1">Domestic</p>
                <p className="text-2xl font-black text-purple-900 leading-none">{policies.filter(p => p.locationDomestic).length}</p>
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
                  <Plus className="w-3.5 h-3.5" /> New Policy
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
                onDeleteRows={() => setPolicies(policies.filter(r => !selectedRows.includes(r.id)))}
                onSave={() => console.log('Saving policies...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[3000px]">
              <thead className="sticky top-0 z-30 font-bold uppercase tracking-tight text-[10px]">
                <tr className="bg-[#f0f7ff] border-b">
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-40">
                    <Checkbox
                      checked={selectedRows.length === filteredPolicies.length && filteredPolicies.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedRows(filteredPolicies.map(r => r.id));
                        else setSelectedRows([]);
                      }}
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-12 z-40 uppercase">Exp Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 uppercase">Exp Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 uppercase">Exp Class</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 uppercase">Category</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-64 uppercase">Description</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 uppercase">Positions</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-24 uppercase">Trong nước</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-24 uppercase">Ngoài nước</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 uppercase">Khu vực</th>
                  <th className="px-3 py-3 text-right text-blue-700 border-r w-32 px-4 uppercase">Min Value</th>
                  <th className="px-3 py-3 text-right text-blue-700 border-r w-32 px-4 uppercase">Max Value</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-24 uppercase">UOM</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 uppercase text-center">Start Date</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 uppercase text-center">End Date</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-20 uppercase">Status</th>
                  <th className="px-3 py-3 text-right text-blue-700 border-r w-40 px-4 uppercase">Pol. Min</th>
                  <th className="px-3 py-3 text-right text-blue-700 border-r w-40 px-4 uppercase">Pol. Max</th>
                  <th className="px-3 py-3 text-center text-blue-700 w-24 uppercase">Curr</th>
                </tr>
              </thead>
              <tbody>
                {filteredPolicies.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-20">
                      <Checkbox checked={selectedRows.includes(row.id)} onCheckedChange={() => toggleRowSelection(row.id)} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-20 text-[11px] font-bold text-blue-600">{row.expCode}</td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.expType} onValueChange={(v) => updateRow(row.id, 'expType', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>{expTypeOptions.map(opt => <SelectItem key={opt} value={opt} className="text-[11px]">{opt}</SelectItem>)}</SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.expClass} onChange={(e) => updateRow(row.id, 'expClass', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.expCategory} onChange={(e) => updateRow(row.id, 'expCategory', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.description} onChange={(e) => updateRow(row.id, 'description', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.positions} onValueChange={(v) => updateRow(row.id, 'positions', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>{positionOptions.map(opt => <SelectItem key={opt} value={opt} className="text-[11px]">{opt}</SelectItem>)}</SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.locationDomestic} onCheckedChange={(c) => updateRow(row.id, 'locationDomestic', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={row.locationInternational} onCheckedChange={(c) => updateRow(row.id, 'locationInternational', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={row.locationRegion} onChange={(e) => updateRow(row.id, 'locationRegion', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px] font-bold"><Input value={row.minValue} onChange={(e) => updateRow(row.id, 'minValue', e.target.value)} className="h-7 border-transparent text-right shadow-none px-2" type="number" /></td>
                    <td className="px-3 py-2 border-r text-[11px] font-bold"><Input value={row.maxValue} onChange={(e) => updateRow(row.id, 'maxValue', e.target.value)} className="h-7 border-transparent text-right shadow-none px-2" type="number" /></td>
                    <td className="px-3 py-2 border-r text-[11px]">
                      <Select value={row.uom} onValueChange={(v) => updateRow(row.id, 'uom', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none"><SelectValue /></SelectTrigger>
                        <SelectContent>{uomOptions.map(opt => <SelectItem key={opt} value={opt} className="text-[11px]">{opt}</SelectItem>)}</SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px] italic text-gray-400 text-center"><Input value={row.startDate} onChange={(e) => updateRow(row.id, 'startDate', e.target.value)} className="h-7 border-transparent shadow-none text-center" type="date" /></td>
                    <td className="px-3 py-2 border-r text-[11px] italic text-gray-400 text-center"><Input value={row.endDate} onChange={(e) => updateRow(row.id, 'endDate', e.target.value)} className="h-7 border-transparent shadow-none text-center" type="date" /></td>
                    <td className="px-3 py-2 border-r text-center">
                      <Select value={row.status} onValueChange={(v) => updateRow(row.id, 'status', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none text-center"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Y" className="text-[11px]">Y</SelectItem>
                          <SelectItem value="N" className="text-[11px]">N</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-[11px] font-black text-emerald-600 px-4"><Input value={row.policyMinValue} onChange={(e) => updateRow(row.id, 'policyMinValue', e.target.value)} className="h-7 border-transparent text-right shadow-none" type="number" /></td>
                    <td className="px-3 py-2 border-r text-[11px] font-black text-rose-600 px-4"><Input value={row.policyMaxValue} onChange={(e) => updateRow(row.id, 'policyMaxValue', e.target.value)} className="h-7 border-transparent text-right shadow-none" type="number" /></td>
                    <td className="px-3 py-2 text-[11px]">
                      <Select value={row.currencyCode} onValueChange={(v) => updateRow(row.id, 'currencyCode', v)}>
                        <SelectTrigger className="h-7 border-transparent shadow-none font-bold text-gray-400 text-center uppercase"><SelectValue /></SelectTrigger>
                        <SelectContent>{currencyOptions.map(opt => <SelectItem key={opt} value={opt} className="text-[11px]">{opt}</SelectItem>)}</SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-white border-t px-6 py-2 flex items-center justify-between shrink-0 font-bold text-[10px] text-gray-500 uppercase tracking-widest text-center">
            <div>Showing <span className="text-blue-600">{filteredPolicies.length}</span> of {policies.length} records</div>
          </div>
        </div>
      </div>
    </div>
  );
}