import { useState } from 'react';
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import MasterDataToolbar from './MasterDataToolbar';

interface PaymentTermRow {
  id: number;
  payTermCode: string;
  payTermName: string;
  description: string;
  appliedUnit: string;
  purchaseContract: boolean;
  saleContract: boolean;
  purchaseInvoice: boolean;
  saleInvoice: boolean;
  status: string;
  createdDate: string;
}

export default function PaymentTermList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [paymentTerms, setPaymentTerms] = useState<PaymentTermRow[]>([
    {
      id: 1,
      payTermCode: '1000',
      payTermName: 'Thanh toán trước 100%',
      description: 'Thanh toán toàn bộ trước khi giao hàng',
      appliedUnit: 'Tất cả',
      purchaseContract: true,
      saleContract: true,
      purchaseInvoice: true,
      saleInvoice: true,
      status: 'Hiệu lực',
      createdDate: '01/12/2025',
    },
    {
      id: 2,
      payTermCode: '1001',
      payTermName: 'Thanh toán ngay sau giao hàng',
      description: 'Thanh toán 100% sau khi nhận hàng',
      appliedUnit: 'Chi nhánh Hà Nội',
      purchaseContract: false,
      saleContract: true,
      purchaseInvoice: false,
      saleInvoice: true,
      status: 'Hiệu lực',
      createdDate: '05/12/2025',
    },
    {
      id: 3,
      payTermCode: '1002',
      payTermName: 'Thanh toán 70%-30%',
      description: 'Trả trước 30%, còn lại sau 7 ngày',
      appliedUnit: 'Tất cả',
      purchaseContract: true,
      saleContract: false,
      purchaseInvoice: true,
      saleInvoice: false,
      status: 'Hiệu lực',
      createdDate: '10/12/2025',
    }
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addNewRow = () => {
    const newId = Math.max(...paymentTerms.map(r => r.id), 0) + 1;
    setPaymentTerms([...paymentTerms, {
      id: newId,
      payTermCode: `${1000 + newId}`,
      payTermName: '',
      description: '',
      appliedUnit: 'Tất cả',
      purchaseContract: false,
      saleContract: false,
      purchaseInvoice: false,
      saleInvoice: false,
      status: 'Hiệu lực',
      createdDate: new Date().toLocaleDateString('vi-VN'),
    }]);
  };

  const deleteSelectedRows = () => {
    setPaymentTerms(paymentTerms.filter(r => !selectedRows.includes(r.id)));
    setSelectedRows([]);
  };

  const updateCell = (id: number, field: keyof PaymentTermRow, value: any) => {
    setPaymentTerms(paymentTerms.map(term =>
      term.id === id ? { ...term, [field]: value } : term
    ));
  };

  const filteredTerms = paymentTerms.filter(term => {
    const matchesSearch = searchText === '' ||
      Object.values(term).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      );
    const matchesStatus = selectedStatus === 'all' || term.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-800">
      {/* Page Header */}
      <div className="bg-white border-b px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-blue-900">Payment Terms</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Quản lý điều khoản thanh toán</span>
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
                <p className="text-[9px] font-bold text-blue-600/70 uppercase mb-1">Total Terms</p>
                <p className="text-2xl font-black text-blue-900">{paymentTerms.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase mb-1">Contracts</p>
                <p className="text-2xl font-black text-emerald-900">{paymentTerms.filter(r => r.purchaseContract || r.saleContract).length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center h-20">
              <div>
                <p className="text-[9px] font-bold text-purple-600/70 uppercase mb-1">Invoices</p>
                <p className="text-2xl font-black text-purple-900">{paymentTerms.filter(r => r.purchaseInvoice || r.saleInvoice).length}</p>
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
                <Button size="sm" onClick={addNewRow} className="bg-blue-600 hover:bg-blue-700 text-[11px] font-bold h-8 px-4 shadow-sm gap-2 whitespace-nowrap">
                  <Plus className="w-3.5 h-3.5" /> New Payment Term
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
                onAddRow={addNewRow}
                onDeleteRows={deleteSelectedRows}
                onSave={() => console.log('Saving Payment Terms...')}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[2000px]">
              <thead className="sticky top-0 z-10 font-bold uppercase tracking-tight text-[10px]">
                <tr className="bg-[#f0f7ff] border-b">
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-20">
                    <Checkbox
                      checked={selectedRows.length === paymentTerms.length && paymentTerms.length > 0}
                      onCheckedChange={() => {
                        if (selectedRows.length === paymentTerms.length) setSelectedRows([]);
                        else setSelectedRows(paymentTerms.map(r => r.id));
                      }}
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 bg-[#f0f7ff] sticky left-12 z-20">Pay Term Code</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-64">Pay Term Name</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-96 font-medium">Diễn giải</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase text-center">Đơn vị áp dụng</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-32 font-medium uppercase">Hợp đồng mua</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-32 font-medium uppercase">Hợp đồng bán</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-32 font-medium uppercase">Hóa đơn mua</th>
                  <th className="px-3 py-3 text-center text-blue-700 border-r w-32 font-medium uppercase">Hóa đơn bán</th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase">Trạng thái</th>
                  <th className="px-3 py-3 text-left text-blue-700 w-32 font-medium uppercase text-center">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {filteredTerms.map((term) => (
                  <tr key={term.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-10">
                      <Checkbox checked={selectedRows.includes(term.id)} onCheckedChange={() => toggleRowSelection(term.id)} />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-10 text-[11px] font-bold text-blue-600">{term.payTermCode}</td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={term.payTermName} onChange={(e) => updateCell(term.id, 'payTermName', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={term.description} onChange={(e) => updateCell(term.id, 'description', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={term.appliedUnit} onChange={(e) => updateCell(term.id, 'appliedUnit', e.target.value)} className="h-7 border-transparent text-center shadow-none" /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={term.purchaseContract} onCheckedChange={(c) => updateCell(term.id, 'purchaseContract', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={term.saleContract} onCheckedChange={(c) => updateCell(term.id, 'saleContract', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={term.purchaseInvoice} onCheckedChange={(c) => updateCell(term.id, 'purchaseInvoice', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-center"><Checkbox checked={term.saleInvoice} onCheckedChange={(c) => updateCell(term.id, 'saleInvoice', !!c)} /></td>
                    <td className="px-3 py-2 border-r text-[11px]"><Input value={term.status} onChange={(e) => updateCell(term.id, 'status', e.target.value)} className="h-7 border-transparent shadow-none" /></td>
                    <td className="px-3 py-2 text-[10px] text-gray-400 italic text-center">{term.createdDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-white border-t px-6 py-2 flex items-center justify-between shrink-0 font-bold text-[10px] text-gray-500 uppercase tracking-widest text-center">
            <div>Showing <span className="text-blue-600">{filteredTerms.length}</span> of {paymentTerms.length} records</div>
          </div>
        </div>
      </div>
    </div>
  );
}