import { useState } from 'react';
import { X, Search, ChevronDown } from 'lucide-react';
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

interface ContractInvoiceMatchPopupProps {
  onClose: () => void;
}

interface ContractRow {
  id: number;
  contractNumber: string;
  contractDate: string;
  supplier: string;
  contractAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentTermType: string;
}

export default function ContractInvoiceMatchPopup({ onClose }: ContractInvoiceMatchPopupProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Dữ liệu hợp đồng có payment term details đặt cọc
  const contractData: ContractRow[] = [
    {
      id: 1,
      contractNumber: 'HĐ-2026-001',
      contractDate: '2026-01-10',
      supplier: 'CÔNG TY TNHH XYZ',
      contractAmount: 500000000,
      paidAmount: 150000000,
      remainingAmount: 350000000,
      paymentTermType: 'Đặt cọc 30%'
    },
    {
      id: 2,
      contractNumber: 'HĐ-2026-005',
      contractDate: '2026-01-12',
      supplier: 'CÔNG TY CỔ PHẦN ABC',
      contractAmount: 800000000,
      paidAmount: 240000000,
      remainingAmount: 560000000,
      paymentTermType: 'Đặt cọc 30%'
    },
    {
      id: 3,
      contractNumber: 'HĐ-2025-098',
      contractDate: '2025-12-15',
      supplier: 'CÔNG TY TNHH DEF',
      contractAmount: 350000000,
      paidAmount: 87500000,
      remainingAmount: 262500000,
      paymentTermType: 'Đặt cọc 25%'
    },
    {
      id: 4,
      contractNumber: 'HĐ-2026-012',
      contractDate: '2026-01-18',
      supplier: 'CÔNG TY CP GHI',
      contractAmount: 1200000000,
      paidAmount: 360000000,
      remainingAmount: 840000000,
      paymentTermType: 'Đặt cọc 30%'
    }
  ];

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredData = contractData.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleApply = () => {
    // TODO: Apply selected contracts to payment request
    console.log('Selected contracts:', selectedRows);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl" style={{ width: '1400px', maxHeight: '90vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">ĐỐI CHIẾU HỢP ĐỒNG - PAYMENT TERM ĐẶT CỌC</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6" style={{ maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
          {/* Search Bar */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo số hợp đồng, nhà cung cấp..."
                className="pl-10 h-10"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>

          {/* Info Note */}
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              <strong>Lưu ý:</strong> Danh sách này chỉ hiển thị các hợp đồng có Payment Term Details loại "Đặt cọc" và còn số dư chưa thanh toán.
            </p>
          </div>

          {/* Table */}
          <div className="border rounded overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50 border-b">
                  <th className="px-3 py-2 text-left" style={{ width: '40px' }}>
                    <Checkbox 
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRows(filteredData.map(r => r.id));
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-3 py-2 text-left">
                    <button className="flex items-center gap-1 text-blue-700 font-medium">
                      <span>Số Hợp Đồng</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-3 py-2 text-left text-blue-700 font-medium">Ngày Hợp Đồng</th>
                  <th className="px-3 py-2 text-left text-blue-700 font-medium">Nhà Cung Cấp</th>
                  <th className="px-3 py-2 text-left text-blue-700 font-medium">Loại Payment Term</th>
                  <th className="px-3 py-2 text-right text-blue-700 font-medium">Giá Trị Hợp Đồng</th>
                  <th className="px-3 py-2 text-right text-blue-700 font-medium">Đã Thanh Toán</th>
                  <th className="px-3 py-2 text-right text-blue-700 font-medium">Còn Lại</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(row => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <a href="#" className="text-blue-600 hover:underline font-medium">
                        {row.contractNumber}
                      </a>
                    </td>
                    <td className="px-3 py-2 text-gray-600">{row.contractDate}</td>
                    <td className="px-3 py-2 font-medium">{row.supplier}</td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-700">
                        {row.paymentTermType}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right font-medium">
                      {row.contractAmount.toLocaleString('vi-VN')}
                    </td>
                    <td className="px-3 py-2 text-right text-green-600">
                      {row.paidAmount.toLocaleString('vi-VN')}
                    </td>
                    <td className="px-3 py-2 text-right text-blue-600 font-medium">
                      {row.remainingAmount.toLocaleString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Đã chọn: {selectedRows.length} hợp đồng
            </div>
            <div className="text-sm text-gray-600">
              Tổng: {filteredData.length} hợp đồng
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button 
            variant="default" 
            onClick={handleApply}
            disabled={selectedRows.length === 0}
          >
            Áp dụng ({selectedRows.length})
          </Button>
        </div>
      </div>
    </div>
  );
}
