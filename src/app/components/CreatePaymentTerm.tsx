import { useState } from 'react';
import { X, Search, Plus, Trash2, AlertCircle } from 'lucide-react';
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

interface CreatePaymentTermProps {
  onClose: () => void;
}

interface DetailRow {
  id: number;
  state: number;
  payType: string;
  payMethod: string;
  payRate: number;
  payAmount: number;
  currency: string;
  depositeApplied: string;
  baselinesDate: number;
  baselinesType: string;
  dueDate: string;
  note: string;
}

const PAY_TYPES = ['Trả trước', 'Thanh toán', 'Giữ lại', 'Chiết khấu'];
const PAY_METHODS = ['Chuyển khoản', 'Tiền mặt', 'Vay'];
const CURRENCIES = ['VND', 'USD', 'EUR', 'JPY'];
const BASELINES_TYPES = ['Ngày đặt hàng', 'Ngày hóa đơn', 'Ngày nghiệm thu', 'Ngày cuối tháng', 'Ngày cố định'];

export default function CreatePaymentTerm({ onClose }: CreatePaymentTermProps) {
  const [payTermCode, setPayTermCode] = useState('1004');
  const [payTermName, setPayTermName] = useState('');
  const [description, setDescription] = useState('');
  const [appliedUnit, setAppliedUnit] = useState('');
  
  const [purchaseContract, setPurchaseContract] = useState(false);
  const [saleContract, setSaleContract] = useState(false);
  const [purchaseInvoice, setPurchaseInvoice] = useState(false);
  const [saleInvoice, setSaleInvoice] = useState(false);

  const [detailRows, setDetailRows] = useState<DetailRow[]>([
    {
      id: 1,
      state: 1,
      payType: 'Trả trước',
      payMethod: 'Chuyển khoản',
      payRate: 30,
      payAmount: 0,
      currency: 'VND',
      depositeApplied: '100%',
      baselinesDate: 0,
      baselinesType: 'Ngày đặt hàng',
      dueDate: '',
      note: '',
    },
    {
      id: 2,
      state: 2,
      payType: 'Thanh toán',
      payMethod: 'Chuyển khoản',
      payRate: 20,
      payAmount: 0,
      currency: 'VND',
      depositeApplied: '',
      baselinesDate: 7,
      baselinesType: 'Ngày đặt hàng',
      dueDate: '30/06/2026',
      note: '',
    },
    {
      id: 3,
      state: 3,
      payType: 'Thanh toán',
      payMethod: 'Vay',
      payRate: 25,
      payAmount: 0,
      currency: 'VND',
      depositeApplied: '',
      baselinesDate: 0,
      baselinesType: 'Ngày hóa đơn',
      dueDate: '31/08/2026',
      note: '',
    },
    {
      id: 4,
      state: 4,
      payType: 'Thanh toán',
      payMethod: 'Chuyển khoản',
      payRate: 10,
      payAmount: 0,
      currency: 'VND',
      depositeApplied: '',
      baselinesDate: 0,
      baselinesType: 'Ngày nghiệm thu',
      dueDate: '30/09/2026',
      note: '',
    },
    {
      id: 5,
      state: 5,
      payType: 'Thanh toán',
      payMethod: 'Chuyển khoản',
      payRate: 25,
      payAmount: 0,
      currency: 'VND',
      depositeApplied: '',
      baselinesDate: 0,
      baselinesType: 'Ngày cuối tháng',
      dueDate: '31/10/2026',
      note: '',
    },
    {
      id: 6,
      state: 6,
      payType: 'Thanh toán',
      payMethod: 'Vay',
      payRate: 15,
      payAmount: 0,
      currency: 'VND',
      depositeApplied: '',
      baselinesDate: 0,
      baselinesType: 'Ngày cố định',
      dueDate: '31/12/2026',
      note: '',
    },
    {
      id: 7,
      state: 7,
      payType: 'Thanh toán',
      payMethod: 'Vay',
      payRate: 5,
      payAmount: 0,
      currency: 'VND',
      depositeApplied: '',
      baselinesDate: 7,
      baselinesType: 'Ngày nghiệm thu',
      dueDate: '10/3/2027',
      note: '',
    },
  ]);

  const [selectedDetails, setSelectedDetails] = useState<number[]>([]);

  const handleAddDetailRow = () => {
    const newRow: DetailRow = {
      id: detailRows.length + 1,
      state: detailRows.length + 1,
      payType: '',
      payMethod: '',
      payRate: 0,
      payAmount: 0,
      currency: 'VND',
      depositeApplied: '',
      baselinesDate: 0,
      baselinesType: '',
      dueDate: '',
      note: '',
    };
    setDetailRows([...detailRows, newRow]);
  };

  const handleDeleteRows = () => {
    setDetailRows(detailRows.filter(row => !selectedDetails.includes(row.id)));
    setSelectedDetails([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDetails(detailRows.map(row => row.id));
    } else {
      setSelectedDetails([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedDetails([...selectedDetails, id]);
    } else {
      setSelectedDetails(selectedDetails.filter(rowId => rowId !== id));
    }
  };

  const updateDetailRow = (id: number, field: keyof DetailRow, value: any) => {
    setDetailRows(detailRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  // Calculate sums
  const calculateSums = () => {
    const paymentRows = detailRows.filter(row => row.payType === 'Thanh toán');
    const advanceRows = detailRows.filter(row => row.payType === 'Trả trước');

    const paymentSumRate = paymentRows.reduce((sum, row) => sum + (row.payRate || 0), 0);
    const advanceSumRate = advanceRows.reduce((sum, row) => sum + (row.payRate || 0), 0);

    const paymentSumAmount = paymentRows.reduce((sum, row) => sum + (row.payAmount || 0), 0);
    const advanceSumAmount = advanceRows.reduce((sum, row) => sum + (row.payAmount || 0), 0);

    return { paymentSumRate, advanceSumRate, paymentSumAmount, advanceSumAmount };
  };

  const { paymentSumRate, advanceSumRate, paymentSumAmount, advanceSumAmount } = calculateSums();

  // Check if sum is valid (should be 100%)
  const totalRate = paymentSumRate + advanceSumRate;
  const isRateValid = totalRate === 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl" style={{ width: '1550px', maxHeight: '90vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Tạo mới Payment Term</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          <div className="p-6">
            {/* Main Info Section */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b">
                Payment terms
              </h3>
              
              <div className="grid grid-cols-12 gap-4 mb-4">
                {/* Row 1 */}
                <div className="col-span-3">
                  <Label className="text-sm text-gray-700">Pay term code</Label>
                  <Input 
                    value={payTermCode} 
                    readOnly
                    className="mt-1 bg-gray-50"
                  />
                </div>
                <div className="col-span-9">
                  <Label className="text-sm text-gray-700">Pay term name</Label>
                  <Input 
                    value={payTermName}
                    onChange={(e) => setPayTermName(e.target.value)}
                    className="mt-1"
                    placeholder="Nhập tên điều khoản thanh toán"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mb-4">
                {/* Row 2 */}
                <div className="col-span-6">
                  <Label className="text-sm text-gray-700">Diễn giải</Label>
                  <Input 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1"
                    placeholder="Nhập diễn giải"
                  />
                </div>
                <div className="col-span-6">
                  <Label className="text-sm text-gray-700">Đơn vị áp dụng</Label>
                  <Input 
                    value={appliedUnit}
                    onChange={(e) => setAppliedUnit(e.target.value)}
                    className="mt-1"
                    placeholder="Nhập đơn vị áp dụng"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                {/* Row 3 - Checkboxes */}
                <div className="col-span-12">
                  <Label className="text-sm text-gray-700 mb-2 block">Áp dụng</Label>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="purchase-contract"
                        checked={purchaseContract}
                        onCheckedChange={(checked) => setPurchaseContract(checked as boolean)}
                      />
                      <label htmlFor="purchase-contract" className="text-sm text-gray-700 cursor-pointer">
                        Hợp đồng mua vào
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="sale-contract"
                        checked={saleContract}
                        onCheckedChange={(checked) => setSaleContract(checked as boolean)}
                      />
                      <label htmlFor="sale-contract" className="text-sm text-gray-700 cursor-pointer">
                        Hợp đồng bán ra
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="purchase-invoice"
                        checked={purchaseInvoice}
                        onCheckedChange={(checked) => setPurchaseInvoice(checked as boolean)}
                      />
                      <label htmlFor="purchase-invoice" className="text-sm text-gray-700 cursor-pointer">
                        Hóa đơn mua vào
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="sale-invoice"
                        checked={saleInvoice}
                        onCheckedChange={(checked) => setSaleInvoice(checked as boolean)}
                      />
                      <label htmlFor="sale-invoice" className="text-sm text-gray-700 cursor-pointer">
                        Hóa đơn bán ra
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <h3 className="text-base font-semibold text-gray-800">
                  Payment details
                </h3>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddDetailRow}
                    size="sm"
                    variant="outline"
                    className="h-8"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Line
                  </Button>
                  <Button 
                    onClick={handleDeleteRows}
                    size="sm"
                    variant="outline"
                    className="h-8 text-red-600 hover:text-red-700"
                    disabled={selectedDetails.length === 0}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>

              {/* Validation Warning */}
              {!isRateValid && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <strong>Cảnh báo:</strong> Tổng Pay Rate phải đủ 100%. Hiện tại: {totalRate}%
                  </div>
                </div>
              )}

              <div className="overflow-x-auto border rounded">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-2 py-2 text-left w-10">
                        <Checkbox 
                          checked={selectedDetails.length === detailRows.length && detailRows.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="px-2 py-2 text-left font-medium text-gray-700">State</th>
                      <th className="px-2 py-2 text-left font-medium text-gray-700">Pay Type</th>
                      <th className="px-2 py-2 text-left font-medium text-gray-700">Pay Method</th>
                      <th className="px-2 py-2 text-right font-medium text-gray-700">Pay Rate (%)</th>
                      <th className="px-2 py-2 text-right font-medium text-gray-700">Pay Amount</th>
                      <th className="px-2 py-2 text-left font-medium text-gray-700">Currency</th>
                      <th className="px-2 py-2 text-left font-medium text-gray-700">Deposite Applied</th>
                      <th className="px-2 py-2 text-center font-medium text-gray-700">Baselines Date (days)</th>
                      <th className="px-2 py-2 text-left font-medium text-gray-700">Baselines Type</th>
                      <th className="px-2 py-2 text-left font-medium text-gray-700">Due Date</th>
                      <th className="px-2 py-2 text-left font-medium text-gray-700">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailRows.map((row) => (
                      <tr key={row.id} className="border-b hover:bg-gray-50">
                        <td className="px-2 py-2">
                          <Checkbox 
                            checked={selectedDetails.includes(row.id)}
                            onCheckedChange={(checked) => handleSelectRow(row.id, checked as boolean)}
                          />
                        </td>
                        <td className="px-2 py-2 text-center">{row.state}</td>
                        <td className="px-2 py-2">
                          <Select 
                            value={row.payType}
                            onValueChange={(value) => updateDetailRow(row.id, 'payType', value)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {PAY_TYPES.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-2 py-2">
                          <Select 
                            value={row.payMethod}
                            onValueChange={(value) => updateDetailRow(row.id, 'payMethod', value)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {PAY_METHODS.map(method => (
                                <SelectItem key={method} value={method}>{method}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-2 py-2">
                          <Input 
                            type="number"
                            value={row.payRate || ''}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              updateDetailRow(row.id, 'payRate', value);
                              // Clear payAmount if payRate is filled
                              if (value > 0) {
                                updateDetailRow(row.id, 'payAmount', 0);
                              }
                            }}
                            className="h-8 text-xs text-right"
                            disabled={row.payAmount > 0}
                          />
                        </td>
                        <td className="px-2 py-2">
                          <Input 
                            type="number"
                            value={row.payAmount || ''}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              updateDetailRow(row.id, 'payAmount', value);
                              // Clear payRate if payAmount is filled
                              if (value > 0) {
                                updateDetailRow(row.id, 'payRate', 0);
                              }
                            }}
                            className="h-8 text-xs text-right"
                            disabled={row.payRate > 0}
                          />
                        </td>
                        <td className="px-2 py-2">
                          <Select 
                            value={row.currency}
                            onValueChange={(value) => updateDetailRow(row.id, 'currency', value)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CURRENCIES.map(currency => (
                                <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-2 py-2">
                          <Input 
                            value={row.depositeApplied}
                            onChange={(e) => updateDetailRow(row.id, 'depositeApplied', e.target.value)}
                            className="h-8 text-xs"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <Input 
                            type="number"
                            value={row.baselinesDate || ''}
                            onChange={(e) => updateDetailRow(row.id, 'baselinesDate', parseInt(e.target.value) || 0)}
                            className="h-8 text-xs text-center"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <Select 
                            value={row.baselinesType}
                            onValueChange={(value) => updateDetailRow(row.id, 'baselinesType', value)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {BASELINES_TYPES.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-2 py-2">
                          <Input 
                            value={row.dueDate}
                            onChange={(e) => updateDetailRow(row.id, 'dueDate', e.target.value)}
                            className="h-8 text-xs"
                            placeholder="DD/MM/YYYY"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <Input 
                            value={row.note}
                            onChange={(e) => updateDetailRow(row.id, 'note', e.target.value)}
                            className="h-8 text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Rows */}
              <div className="mt-4 space-y-2">
                <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                  <span className="font-medium text-sm text-gray-800">
                    Sum (Thanh toán + Vay) = {paymentSumRate}%
                  </span>
                  <span className="font-medium text-sm text-gray-800">
                    {paymentSumRate}%
                  </span>
                </div>
                <div className="bg-green-50 p-3 rounded flex justify-between items-center">
                  <span className="font-medium text-sm text-gray-800">
                    Sum trừ tiền trả trước = {advanceSumRate}%
                  </span>
                  <span className="font-medium text-sm text-gray-800">
                    {advanceSumRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!isRateValid}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}