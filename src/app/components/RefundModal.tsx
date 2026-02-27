import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface RefundModalProps {
  onClose: () => void;
  requestorInfo?: {
    id: string;
    name: string;
    department: string;
  };
}

interface RefundRow {
  id: number;
  sip: string;
  credit: string;
  debit: string;
  currency: string;
  amount: number;
  accAmount: number;
  applied: number;
  remainingAmount: number;
  apply: number;
  description: string;
  voucherType: string; // "Advance" or "Expense"
  objId: string;
  objName: string;
  isDebitIncrease: boolean; // true = xanh (dương), false = đỏ (âm)
}

export default function RefundModal({ onClose, requestorInfo }: RefundModalProps) {
  const [showAdvance, setShowAdvance] = useState(true);
  const [showExpense, setShowExpense] = useState(true);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Default requestor info if not provided
  const requestor = requestorInfo || {
    id: 'EMP001',
    name: 'Nguyễn Văn A',
    department: 'Kế toán'
  };

  // Mock data with Advance and Expense voucher types
  const [refundData, setRefundData] = useState<RefundRow[]>([
    {
      id: 1,
      sip: 'ADV-2026-001',
      credit: '141',
      debit: '111',
      currency: 'VND',
      amount: 10000000,
      accAmount: 10000000,
      applied: 0,
      remainingAmount: 10000000,
      apply: 10000000,
      description: 'Tạm ứng công tác Hà Nội',
      voucherType: 'Advance',
      objId: requestor.id,
      objName: requestor.name,
      isDebitIncrease: true,
    },
    {
      id: 2,
      sip: 'ADV-2026-002',
      credit: '141',
      debit: '111',
      currency: 'VND',
      amount: 5000000,
      accAmount: 5000000,
      applied: 2000000,
      remainingAmount: 3000000,
      apply: 3000000,
      description: 'Tạm ứng mua văn phòng phẩm',
      voucherType: 'Advance',
      objId: requestor.id,
      objName: requestor.name,
      isDebitIncrease: true,
    },
    {
      id: 3,
      sip: 'EXP-2026-001',
      credit: '642',
      debit: '111',
      currency: 'VND',
      amount: 8000000,
      accAmount: 8000000,
      applied: 0,
      remainingAmount: 8000000,
      apply: 8000000,
      description: 'Chi phí đi lại công tác',
      voucherType: 'Expense',
      objId: requestor.id,
      objName: requestor.name,
      isDebitIncrease: false,
    },
    {
      id: 4,
      sip: 'EXP-2026-002',
      credit: '642',
      debit: '111',
      currency: 'VND',
      amount: 3500000,
      accAmount: 3500000,
      applied: 1000000,
      remainingAmount: 2500000,
      apply: 2500000,
      description: 'Chi phí khách sạn',
      voucherType: 'Expense',
      objId: requestor.id,
      objName: requestor.name,
      isDebitIncrease: false,
    },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const updateApplyAmount = (id: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setRefundData(prev =>
      prev.map(row =>
        row.id === id ? { ...row, apply: numValue } : row
      )
    );
  };

  // Filter data based on checkboxes
  const filteredData = refundData.filter(row => {
    if (row.voucherType === 'Advance' && !showAdvance) return false;
    if (row.voucherType === 'Expense' && !showExpense) return false;
    return true;
  });

  // Calculate total balance với cộng trừ dựa trên isDebitIncrease
  const totalBalance = filteredData
    .filter(row => selectedRows.includes(row.id))
    .reduce((sum, row) => {
      // Nếu isDebitIncrease = true (xanh) → apply là dương
      // Nếu isDebitIncrease = false (đỏ) → apply là âm
      const signedValue = row.isDebitIncrease ? row.apply : -row.apply;
      return sum + signedValue;
    }, 0);

  const handleRefund = () => {
    console.log('Refund:', { 
      requestor, 
      selectedRows,
      refundData: refundData.filter(row => selectedRows.includes(row.id))
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg shadow-lg" style={{ width: '1600px', maxHeight: '90vh', overflow: 'auto' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">REFUND</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Single Requestor Information */}
          <div className="mb-4 p-4 bg-blue-50 rounded border border-blue-200">
            <h3 className="text-sm font-semibold mb-2 text-blue-900">Requestor Information</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-gray-600">Requestor ID:</span>
                <div className="text-sm font-medium text-gray-900">{requestor.id}</div>
              </div>
              <div>
                <span className="text-xs text-gray-600">Name:</span>
                <div className="text-sm font-medium text-gray-900">{requestor.name}</div>
              </div>
              <div>
                <span className="text-xs text-gray-600">Department:</span>
                <div className="text-sm font-medium text-gray-900">{requestor.department}</div>
              </div>
            </div>
          </div>

          {/* Checkboxes Row - Only Advance and Expense */}
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={showAdvance}
                onCheckedChange={(checked) => setShowAdvance(checked as boolean)}
              />
              <label className="text-sm">Advance</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={showExpense}
                onCheckedChange={(checked) => setShowExpense(checked as boolean)}
              />
              <label className="text-sm">Expense</label>
            </div>
          </div>

          {/* Balance Display */}
          <div className="flex items-center justify-end mb-4 p-4 bg-gray-50 rounded border">
            <div className="text-right">
              <div className="text-sm text-gray-600">Balance</div>
              <div className="text-lg font-bold text-blue-600">
                {totalBalance.toLocaleString()} VND
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50 border-b">
                  <th className="px-2 py-2 text-left">
                    <Checkbox />
                  </th>
                  <th className="px-2 py-2 text-left text-gray-900">SIP</th>
                  <th className="px-2 py-2 text-left text-gray-900">Loại phiếu</th>
                  <th className="px-2 py-2 text-left text-gray-900">Obj ID</th>
                  <th className="px-2 py-2 text-left text-gray-900">Obj Name</th>
                  <th className="px-2 py-2 text-left text-gray-900">Credit</th>
                  <th className="px-2 py-2 text-left text-gray-900">Debit</th>
                  <th className="px-2 py-2 text-left text-gray-900">Currency</th>
                  <th className="px-2 py-2 text-right text-gray-900">Amount</th>
                  <th className="px-2 py-2 text-right text-gray-900">Acc Amount</th>
                  <th className="px-2 py-2 text-right text-gray-900">Applied</th>
                  <th className="px-2 py-2 text-right text-gray-900">Remaining</th>
                  <th className="px-2 py-2 text-left text-gray-900">Description</th>
                  <th className="px-2 py-2 text-right text-gray-900">Apply</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="px-3 py-8 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row) => (
                    <tr 
                      key={row.id} 
                      className={`border-b hover:opacity-80 ${
                        row.isDebitIncrease ? 'bg-green-50' : 'bg-red-50'
                      }`}
                    >
                      <td className="px-2 py-2">
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() => toggleRowSelection(row.id)}
                        />
                      </td>
                      <td className="px-2 py-2 text-gray-900">{row.sip}</td>
                      <td className="px-2 py-2 text-gray-900">{row.voucherType}</td>
                      <td className="px-2 py-2 text-gray-900">{row.objId}</td>
                      <td className="px-2 py-2 text-gray-900">{row.objName}</td>
                      <td className="px-2 py-2 text-gray-900">{row.credit}</td>
                      <td className="px-2 py-2 text-gray-900">{row.debit}</td>
                      <td className="px-2 py-2 text-gray-900">{row.currency}</td>
                      <td className="px-2 py-2 text-right text-gray-900">{row.amount.toLocaleString()}</td>
                      <td className="px-2 py-2 text-right text-gray-900">{row.accAmount.toLocaleString()}</td>
                      <td className="px-2 py-2 text-right text-gray-900">{row.applied.toLocaleString()}</td>
                      <td className="px-2 py-2 text-right text-gray-900">{row.remainingAmount.toLocaleString()}</td>
                      <td className="px-2 py-2 text-gray-900">{row.description}</td>
                      <td className="px-2 py-2">
                        <Input
                          type="number"
                          value={row.apply}
                          onChange={(e) => updateApplyAmount(row.id, e.target.value)}
                          className="w-28 h-8 text-right"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t sticky bottom-0 bg-white">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            variant="default"
            onClick={handleRefund}
            disabled={selectedRows.length === 0}
          >
            Refund
          </Button>
        </div>
      </div>
    </div>
  );
}