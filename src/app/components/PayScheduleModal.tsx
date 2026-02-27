import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';

interface PayScheduleModalProps {
  onClose: () => void;
}

interface PayScheduleRow {
  id: number;
  installmentNumber: number;
  paymentType: string;
  paymentMethod: string;
  rate: number;
  amount: number;
  currency: string;
  convertedAmount: number;
  paidAmount: number;
  paidConvertedAmount: number;
  remainingAmount: number;
  remainingConvertedAmount: number;
  estimatedDate: string;
  paymentNumber: string;
  activityNumber: string;
  invoiceNumber: string;
  note: string;
}

export default function PayScheduleModal({ onClose }: PayScheduleModalProps) {
  const [rows, setRows] = useState<PayScheduleRow[]>([
    {
      id: 1,
      installmentNumber: 1,
      paymentType: 'Thanh toán',
      paymentMethod: 'Chuyển khoản',
      rate: 100,
      amount: 1100000000,
      currency: 'VND',
      convertedAmount: 1100000000,
      paidAmount: 0,
      paidConvertedAmount: 0,
      remainingAmount: 1100000000,
      remainingConvertedAmount: 1100000000,
      estimatedDate: '',
      paymentNumber: '',
      activityNumber: '',
      invoiceNumber: '',
      note: ''
    },
    {
      id: 2,
      installmentNumber: 2,
      paymentType: 'Trả trước',
      paymentMethod: 'Chuyển khoản',
      rate: 100,
      amount: 100000000,
      currency: 'VND',
      convertedAmount: 100000000,
      paidAmount: 0,
      paidConvertedAmount: 0,
      remainingAmount: 0,
      remainingConvertedAmount: 0,
      estimatedDate: '',
      paymentNumber: '',
      activityNumber: '',
      invoiceNumber: '',
      note: ''
    },
    {
      id: 3,
      installmentNumber: 3,
      paymentType: 'Thanh toán',
      paymentMethod: 'Chuyển khoản',
      rate: 30,
      amount: 300000000,
      currency: 'VND',
      convertedAmount: 300000000,
      paidAmount: 0,
      paidConvertedAmount: 0,
      remainingAmount: 0,
      remainingConvertedAmount: 0,
      estimatedDate: '',
      paymentNumber: '',
      activityNumber: '',
      invoiceNumber: '',
      note: ''
    },
    {
      id: 4,
      installmentNumber: 4,
      paymentType: 'Thanh toán',
      paymentMethod: 'Chuyển khoản',
      rate: 10,
      amount: 200000000,
      currency: 'VND',
      convertedAmount: 200000000,
      paidAmount: 0,
      paidConvertedAmount: 0,
      remainingAmount: 0,
      remainingConvertedAmount: 0,
      estimatedDate: '',
      paymentNumber: '',
      activityNumber: '',
      invoiceNumber: '',
      note: ''
    },
    {
      id: 5,
      installmentNumber: 5,
      paymentType: 'Chiết khấu',
      paymentMethod: 'Vay',
      rate: 5,
      amount: 100000000,
      currency: 'VND',
      convertedAmount: 100000000,
      paidAmount: 0,
      paidConvertedAmount: 0,
      remainingAmount: 0,
      remainingConvertedAmount: 0,
      estimatedDate: '',
      paymentNumber: '',
      activityNumber: '',
      invoiceNumber: '',
      note: ''
    },
    {
      id: 6,
      installmentNumber: 6,
      paymentType: 'Phạt',
      paymentMethod: 'Vay',
      rate: 15,
      amount: 50000000,
      currency: 'VND',
      convertedAmount: 50000000,
      paidAmount: 0,
      paidConvertedAmount: 0,
      remainingAmount: 0,
      remainingConvertedAmount: 0,
      estimatedDate: '',
      paymentNumber: '',
      activityNumber: '',
      invoiceNumber: '',
      note: ''
    },
    {
      id: 7,
      installmentNumber: 7,
      paymentType: 'Thanh toán',
      paymentMethod: 'Vay',
      rate: 8,
      amount: 160000000,
      currency: 'VND',
      convertedAmount: 160000000,
      paidAmount: 0,
      paidConvertedAmount: 0,
      remainingAmount: 0,
      remainingConvertedAmount: 0,
      estimatedDate: '',
      paymentNumber: '',
      activityNumber: '',
      invoiceNumber: '',
      note: ''
    }
  ]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Calculate dynamic totals
  const calculateTotals = () => {
    const tongTien = rows
      .filter(row => row.paymentType === 'Thanh toán')
      .reduce((sum, row) => sum + row.amount, 0);
    
    const chietKhau = rows
      .filter(row => row.paymentType === 'Chiết khấu')
      .reduce((sum, row) => sum + row.amount, 0);
    
    const phat = rows
      .filter(row => row.paymentType === 'Phạt')
      .reduce((sum, row) => sum + row.amount, 0);
    
    const tongPhaiThanhToan = tongTien - chietKhau + phat;

    return { tongTien, chietKhau, phat, tongPhaiThanhToan };
  };

  const totals = calculateTotals();

  const handleAddRow = () => {
    const newRow: PayScheduleRow = {
      id: rows.length + 1,
      installmentNumber: rows.length + 1,
      paymentType: '',
      paymentMethod: '',
      rate: 0,
      amount: 0,
      currency: 'VND',
      convertedAmount: 0,
      paidAmount: 0,
      paidConvertedAmount: 0,
      remainingAmount: 0,
      remainingConvertedAmount: 0,
      estimatedDate: '',
      paymentNumber: '',
      activityNumber: '',
      invoiceNumber: '',
      note: ''
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRows = () => {
    const newRows = rows.filter(row => !selectedRows.includes(row.id));
    // Re-number installments
    const renumberedRows = newRows.map((row, index) => ({
      ...row,
      installmentNumber: index + 1
    }));
    setRows(renumberedRows);
    setSelectedRows([]);
  };

  const handlePaymentTypeChange = (id: number, newType: string) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, paymentType: newType } : row
    ));
  };

  const handlePaymentMethodChange = (id: number, newMethod: string) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, paymentMethod: newMethod } : row
    ));
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows.map(r => r.id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl" style={{ width: '95vw', maxWidth: '1800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Pay schedule</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Summary Info */}
          <div className="grid grid-cols-12 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="col-span-2">
              <Label className="text-sm mb-1 block">Amount</Label>
              <Input value="2,000,000,000" readOnly className="bg-white" />
            </div>
            <div className="col-span-2">
              <Label className="text-sm mb-1 block">Accounted amount</Label>
              <Input value="2,000,000,000" readOnly className="bg-white" />
            </div>
            <div className="col-span-2">
              <Label className="text-sm mb-1 block">Applied amount</Label>
              <Input value="sum[]" readOnly className="bg-white" />
            </div>
            <div className="col-span-2">
              <Label className="text-sm mb-1 block">Applied accounted amount</Label>
              <Input value="sum[]" readOnly className="bg-white" />
            </div>
            <div className="col-span-2">
              <Label className="text-sm mb-1 block">Remaining amount</Label>
              <Input value="sum[]" readOnly className="bg-white" />
            </div>
            <div className="col-span-2">
              <Label className="text-sm mb-1 block">Remaining accounted amount</Label>
              <Input value="sum[]" readOnly className="bg-white" />
            </div>
          </div>

          {/* Table Toolbar */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleAddRow}>
                <Plus className="w-4 h-4 mr-1" />
                Add Row
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDeleteRows}
                disabled={selectedRows.length === 0}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>

          {/* Details Table */}
          <div className="border rounded-lg overflow-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-2 text-left border-b" style={{ width: '40px' }}>
                    <Checkbox 
                      checked={selectedRows.length === rows.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-2 text-left border-b" style={{ width: '100px' }}>Payment installment</th>
                  <th className="p-2 text-left border-b" style={{ width: '110px' }}>Payment type</th>
                  <th className="p-2 text-left border-b" style={{ width: '130px' }}>Payment method</th>
                  <th className="p-2 text-left border-b" style={{ width: '80px' }}>Rate (%)</th>
                  <th className="p-2 text-left border-b" style={{ width: '110px' }}>Amount</th>
                  <th className="p-2 text-left border-b" style={{ width: '70px' }}>Currency</th>
                  <th className="p-2 text-left border-b" style={{ width: '110px' }}>Converted amount</th>
                  <th className="p-2 text-left border-b" style={{ width: '110px' }}>Paid</th>
                  <th className="p-2 text-left border-b" style={{ width: '130px' }}>Paid converted</th>
                  <th className="p-2 text-left border-b" style={{ width: '110px' }}>Remaining</th>
                  <th className="p-2 text-left border-b" style={{ width: '130px' }}>Remaining converted</th>
                  <th className="p-2 text-left border-b" style={{ width: '110px' }}>Estimated date</th>
                  <th className="p-2 text-left border-b" style={{ width: '110px' }}>Payment number</th>
                  <th className="p-2 text-left border-b" style={{ width: '100px' }}>Activity number</th>
                  <th className="p-2 text-left border-b" style={{ width: '100px' }}>Invoice number</th>
                  <th className="p-2 text-left border-b" style={{ width: '150px' }}>Note</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="p-2 border-b">
                      <Checkbox 
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="p-2 border-b">
                      <Input value={row.installmentNumber} readOnly className="h-8 text-xs text-center bg-gray-50" />
                    </td>
                    <td className="p-2 border-b">
                      <Select value={row.paymentType} onValueChange={(value) => handlePaymentTypeChange(row.id, value)}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Trả trước">Trả trước</SelectItem>
                          <SelectItem value="Thanh toán">Thanh toán</SelectItem>
                          <SelectItem value="Giữ lại">Giữ lại</SelectItem>
                          <SelectItem value="Chiết khấu">Chiết khấu</SelectItem>
                          <SelectItem value="Phạt">Phạt</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2 border-b">
                      <Select value={row.paymentMethod} onValueChange={(value) => handlePaymentMethodChange(row.id, value)}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Chuyển khoản">Chuyển khoản</SelectItem>
                          <SelectItem value="Vay">Vay</SelectItem>
                          <SelectItem value="Tiền mặt">Tiền mặt</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2 border-b">
                      <Input type="number" value={row.rate} className="h-8 text-xs text-right" />
                    </td>
                    <td className="p-2 border-b">
                      <Input type="number" value={row.amount} className="h-8 text-xs text-right" />
                    </td>
                    <td className="p-2 border-b">
                      <Select value={row.currency}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VND">VND</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2 border-b">
                      <Input type="number" value={row.convertedAmount} readOnly className="h-8 text-xs text-right bg-gray-50" />
                    </td>
                    <td className="p-2 border-b">
                      <Input type="number" value={row.paidAmount} readOnly className="h-8 text-xs text-right bg-gray-50" />
                    </td>
                    <td className="p-2 border-b">
                      <Input type="number" value={row.paidConvertedAmount} readOnly className="h-8 text-xs text-right bg-gray-50" />
                    </td>
                    <td className="p-2 border-b">
                      <Input type="number" value={row.remainingAmount} readOnly className="h-8 text-xs text-right bg-gray-50" />
                    </td>
                    <td className="p-2 border-b">
                      <Input type="number" value={row.remainingConvertedAmount} readOnly className="h-8 text-xs text-right bg-gray-50" />
                    </td>
                    <td className="p-2 border-b">
                      <Input type="date" value={row.estimatedDate} className="h-8 text-xs" />
                    </td>
                    <td className="p-2 border-b">
                      <Input value={row.paymentNumber} className="h-8 text-xs" />
                    </td>
                    <td className="p-2 border-b">
                      <Input value={row.activityNumber} className="h-8 text-xs" />
                    </td>
                    <td className="p-2 border-b">
                      <Input value={row.invoiceNumber} className="h-8 text-xs" />
                    </td>
                    <td className="p-2 border-b">
                      <Input value={row.note} className="h-8 text-xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="mt-4">
            <table className="w-full text-xs border">
              <tbody>
                {/* Row 1: Tổng tiền */}
                <tr className="bg-gray-50">
                  <td className="p-2 border-b font-semibold" style={{ width: '200px' }}>Tổng tiền</td>
                  <td className="p-2 border-b"></td>
                  <td className="p-2 border-b"></td>
                  <td className="p-2 border-b text-right font-semibold">{totals.tongTien.toLocaleString()}</td>
                </tr>
                {/* Row 2: Chiết khấu */}
                <tr className="bg-gray-50">
                  <td className="p-2 border-b font-semibold">Chiết khấu</td>
                  <td className="p-2 border-b"></td>
                  <td className="p-2 border-b"></td>
                  <td className="p-2 border-b text-right font-semibold">{totals.chietKhau.toLocaleString()}</td>
                </tr>
                {/* Row 3: Phạt */}
                <tr className="bg-gray-50">
                  <td className="p-2 border-b font-semibold">Phạt</td>
                  <td className="p-2 border-b"></td>
                  <td className="p-2 border-b"></td>
                  <td className="p-2 border-b text-right font-semibold">{totals.phat.toLocaleString()}</td>
                </tr>
                {/* Row 4: Tổng phải thanh toán */}
                <tr className="bg-blue-50">
                  <td className="p-2 font-semibold">Tổng phải thanh toán</td>
                  <td className="p-2"></td>
                  <td className="p-2 text-right font-semibold">Tổng tiền - Chiết khấu + Phạt</td>
                  <td className="p-2 text-right font-semibold">{totals.tongPhaiThanhToan.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Đóng</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="default">Tạo hóa đơn</Button>
            <Button variant="default">Tạo dữ liệu thanh toán</Button>
            <Button variant="default">Cấn trừ thu/chi</Button>
          </div>
        </div>
      </div>
    </div>
  );
}