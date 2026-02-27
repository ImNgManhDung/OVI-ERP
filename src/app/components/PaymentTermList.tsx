import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import MasterDataToolbar from './MasterDataToolbar';
import { Search } from 'lucide-react';

interface PaymentTermListProps {
  onCreateClick: () => void;
}

// Mock data
const initialPaymentTerms = [
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
  },
  {
    id: 4,
    payTermCode: '1003',
    payTermName: 'Thanh toán chuyển khoản + Vay',
    description: 'Chuyển khoản 50% + Vay 50%',
    appliedUnit: 'Chi nhánh TP.HCM',
    purchaseContract: true,
    saleContract: true,
    purchaseInvoice: false,
    saleInvoice: false,
    status: 'Hiệu lực',
    createdDate: '15/12/2025',
  },
];

export default function PaymentTermList({ onCreateClick }: PaymentTermListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [paymentTerms, setPaymentTerms] = useState(initialPaymentTerms);

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

  const updateCell = (id: number, field: string, value: any) => {
    setPaymentTerms(paymentTerms.map(term =>
      term.id === id ? { ...term, [field]: value } : term
    ));
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === paymentTerms.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paymentTerms.map(r => r.id));
    }
  };

  const filteredTerms = paymentTerms.filter(term =>
    searchText === '' ||
    Object.values(term).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="erp-page">
      {/* Header */}
      <div className="erp-page-header">
        <div>
          <h1>Payment Terms Management</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Master Data</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Payment Terms</span>
          </nav>
        </div>
      </div>

      {/* Toolbar */}
      <MasterDataToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={addNewRow}
        onDeleteRows={deleteSelectedRows}
        onSave={() => console.log('Saving Payment Terms...')}
        selectedCount={selectedRows.length}
      />

      {/* Table */}
      <div className="bg-white rounded-b-lg border border-t-0 overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[1800px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#f0f7ff] border-b">
                <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-20">
                  <Checkbox 
                    checked={selectedRows.length === paymentTerms.length && paymentTerms.length > 0}
                    onCheckedChange={toggleAllRows}
                  />
                </th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40 bg-[#f0f7ff] sticky left-12 z-20">Pay Term Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Pay Term Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-96">Diễn giải</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Đơn vị áp dụng</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-32">Hợp đồng mua</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-32">Hợp đồng bán</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-32">Hóa đơn mua</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-32">Hóa đơn bán</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Trạng thái</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-32">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {filteredTerms.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-3 py-12 text-center text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No payment terms found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTerms.map((term) => (
                  <tr key={term.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-10">
                      <Checkbox
                        checked={selectedRows.includes(term.id)}
                        onCheckedChange={() => toggleRowSelection(term.id)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-10 font-bold text-blue-600">
                      <Input
                        value={term.payTermCode}
                        onChange={(e) => updateCell(term.id, 'payTermCode', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-bold text-blue-600"
                      />
                    </td>
                    <td className="px-3 py-2 border-r font-medium text-gray-800">
                      <Input
                        value={term.payTermName}
                        onChange={(e) => updateCell(term.id, 'payTermName', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={term.description}
                        onChange={(e) => updateCell(term.id, 'description', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-gray-600"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={term.appliedUnit}
                        onChange={(e) => updateCell(term.id, 'appliedUnit', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={term.purchaseContract}
                        onCheckedChange={(checked) => updateCell(term.id, 'purchaseContract', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={term.saleContract}
                        onCheckedChange={(checked) => updateCell(term.id, 'saleContract', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={term.purchaseInvoice}
                        onCheckedChange={(checked) => updateCell(term.id, 'purchaseInvoice', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={term.saleInvoice}
                        onCheckedChange={(checked) => updateCell(term.id, 'saleInvoice', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={term.status}
                        onChange={(e) => updateCell(term.id, 'status', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-600">{term.createdDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t bg-gray-50 text-xs text-right text-gray-500 font-medium">
          TOTAL RECORDS: {filteredTerms.length}
        </div>
      </div>
    </div>
  );
}