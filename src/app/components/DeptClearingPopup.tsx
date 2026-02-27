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

interface DeptClearingPopupProps {
  onClose: () => void;
  type: 'receipt' | 'invoice';
}

interface ClearingRow {
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
  docType: string;
  transactionType: string; // New field
  object: string; // 'A' or 'B'
  objId: string;
  objName: string;
  isDebitIncrease: boolean; // true = xanh (dương), false = đỏ (âm)
}

export default function DeptClearingPopup({ onClose, type }: DeptClearingPopupProps) {
  const [objectA, setObjectA] = useState('Company A');
  const [deptCurrency, setDeptCurrency] = useState('VND');
  const [showReceipt, setShowReceipt] = useState(true);
  const [showPayment, setShowPayment] = useState(true);
  const [showSalesInvoice, setShowSalesInvoice] = useState(true);
  const [showPurchaseInvoice, setShowPurchaseInvoice] = useState(true);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Mock data
  const [clearingData, setClearingData] = useState<ClearingRow[]>([
    {
      id: 1,
      sip: 'SI-2026-001',
      credit: '111',
      debit: '131',
      currency: 'VND',
      amount: 15000000,
      accAmount: 15000000,
      applied: 0,
      remainingAmount: 15000000,
      apply: 15000000,
      description: 'Bán hàng cho khách hàng A',
      docType: 'Sales Invoice',
      transactionType: 'Sales', 
      object: 'A',
      objId: 'CUST001',
      objName: 'Company A',
      isDebitIncrease: true,
    },
    {
      id: 2,
      sip: 'SI-2026-002',
      credit: '511',
      debit: '131',
      currency: 'VND',
      amount: 15000000,
      accAmount: 15000000,
      applied: 5000000,
      remainingAmount: 15000000,
      apply: 15000000,
      description: 'Hóa đơn #001 - KHÁCH HÀNG A',
      docType: 'Sales Invoice',
      transactionType: 'Sales', 
      object: 'B',
      objId: 'CUST002',
      objName: 'Company B',
      isDebitIncrease: true,
    },
    {
      id: 3,
      sip: 'RC-2026-001',
      credit: '111',
      debit: '112',
      currency: 'VND',
      amount: 8000000,
      accAmount: 8000000,
      applied: 2000000,
      remainingAmount: 8000000,
      apply: 8000000,
      description: 'Thu tiền khách hàng B',
      docType: 'Receipt',
      transactionType: 'Receipt', 
      object: 'A',
      objId: 'CUST001',
      objName: 'Company A',
      isDebitIncrease: true,
    },
    {
      id: 4,
      sip: 'PY-2026-001',
      credit: '331',
      debit: '111',
      currency: 'VND',
      amount: 12000000,
      accAmount: 12000000,
      applied: 0,
      remainingAmount: 12000000,
      apply: 12000000,
      description: 'Chi tiền mua hàng',
      docType: 'Payment',
      transactionType: 'Payment', 
      object: 'B',
      objId: 'CUST002',
      objName: 'Company B',
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
    setClearingData(prev =>
      prev.map(row =>
        row.id === id ? { ...row, apply: numValue } : row
      )
    );
  };

  // Filter data based on checkboxes
  const filteredData = clearingData.filter(row => {
    const isVoucher = row.docType.includes('Receipt') || row.docType.includes('Payment');
    const isInvoice = row.docType.includes('Invoice');
    
    if (isVoucher && !showReceipt && !showPayment) return false;
    if (isInvoice && !showSalesInvoice && !showPurchaseInvoice) return false;
    
    return true;
  });

  // Calculate status based on selected documents
  const getStatus = () => {
    const selectedData = clearingData.filter(row => selectedRows.includes(row.id));
    const hasObjectA = selectedData.some(row => row.object === 'A');
    const hasObjectB = selectedData.some(row => row.object === 'B');
    
    if (hasObjectA && hasObjectB) return 'both';
    if (hasObjectA) return 'a';
    if (hasObjectB) return 'b';
    return 'none';
  };

  const status = getStatus();

  // Calculate total balance với cộng trừ dựa trên isDebitIncrease
  const totalBalance = filteredData
    .filter(row => selectedRows.includes(row.id))
    .reduce((sum, row) => {
      const signedValue = row.isDebitIncrease ? row.apply : -row.apply;
      return sum + signedValue;
    }, 0);

  const handleDeptClearing = () => {
    console.log('Dept Clearing:', { 
      objectA, 
      deptCurrency, 
      selectedRows,
      clearingData: clearingData.filter(row => selectedRows.includes(row.id))
    });
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full min-h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50/50">
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">DEPT CLEARING</h2>
      </div>

      {/* Content */}
      <div className="p-8">
          {/* Object Selection Row */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-2 uppercase">Object A</label>
              <Select value={objectA} onValueChange={setObjectA}>
                <SelectTrigger className="w-full bg-gray-50/50 border-gray-200 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Company A">Company A</SelectItem>
                  <SelectItem value="Company B">Company B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-2 uppercase">Currency</label>
              <Select value={deptCurrency} onValueChange={setDeptCurrency}>
                <SelectTrigger className="w-full bg-gray-50/50 border-gray-200 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VND">VND</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Checkboxes Row */}
          <div className="flex items-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={showReceipt}
                onCheckedChange={(checked) => setShowReceipt(checked as boolean)}
                id="cb-receipt"
              />
              <label htmlFor="cb-receipt" className="text-sm font-bold text-gray-700">Receipt Voucher</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={showPayment}
                onCheckedChange={(checked) => setShowPayment(checked as boolean)}
                id="cb-payment"
              />
              <label htmlFor="cb-payment" className="text-sm font-bold text-gray-700">Payment Voucher</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={showSalesInvoice}
                onCheckedChange={(checked) => setShowSalesInvoice(checked as boolean)}
                id="cb-sales"
              />
              <label htmlFor="cb-sales" className="text-sm font-bold text-gray-700">Sales Invoice</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={showPurchaseInvoice}
                onCheckedChange={(checked) => setShowPurchaseInvoice(checked as boolean)}
                id="cb-purchase"
              />
              <label htmlFor="cb-purchase" className="text-sm font-bold text-gray-700">Purchase Invoice</label>
            </div>
          </div>

          {/* Status Indicators & Balance */}
          <div className="flex items-center justify-between mb-4 p-4 bg-white rounded border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 uppercase">Status:</span>
              <div className="w-8 h-8 rounded border border-gray-200 bg-white" />
              <div className="w-8 h-8 rounded border border-gray-200 bg-white" />
              <div className="w-8 h-8 rounded border border-gray-200 bg-white" />
            </div>
            
            <div className="text-right">
              <div className="text-[11px] text-gray-500 font-bold uppercase">Balance</div>
              <div className="text-xl font-bold text-blue-600">
                {totalBalance.toLocaleString()} VND
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f0f7ff] border-b border-gray-200">
                  <th className="px-3 py-3 text-left w-10">
                    <Checkbox />
                  </th>
                  <th className="px-2 py-3 text-left text-[11px] font-bold text-gray-700 uppercase">SIP</th>
                  <th className="px-2 py-3 text-left text-[11px] font-bold text-gray-700 uppercase">DocType</th>
                  <th className="px-2 py-3 text-left text-[11px] font-bold text-gray-700 uppercase">Transaction Type</th>
                  <th className="px-2 py-3 text-left text-[11px] font-bold text-gray-700 uppercase">Obj ID</th>
                  <th className="px-2 py-3 text-left text-[11px] font-bold text-gray-700 uppercase">Obj Name</th>
                  <th className="px-2 py-3 text-left text-[11px] font-bold text-gray-700 uppercase">Credit</th>
                  <th className="px-2 py-3 text-left text-[11px] font-bold text-gray-700 uppercase">Debit</th>
                  <th className="px-2 py-3 text-left text-[11px] font-bold text-gray-700 uppercase">Currency</th>
                  <th className="px-2 py-3 text-right text-[11px] font-bold text-gray-700 uppercase">Amount</th>
                  <th className="px-2 py-3 text-right text-[11px] font-bold text-gray-700 uppercase">Acc Amount</th>
                  <th className="px-2 py-3 text-right text-[11px] font-bold text-gray-700 uppercase">Applied</th>
                  <th className="px-2 py-3 text-right text-[11px] font-bold text-gray-700 uppercase">Remaining</th>
                  <th className="px-2 py-3 text-left text-[11px] font-bold text-gray-700 uppercase">Description</th>
                  <th className="px-2 py-3 text-right text-[11px] font-bold text-gray-700 uppercase">Apply</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={15} className="px-3 py-8 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row) => {
                    let rowColor = '';
                    if (row.docType === 'Receipt') rowColor = 'bg-green-50';
                    else if (row.docType === 'Payment') rowColor = 'bg-red-50';
                    else rowColor = 'bg-white';

                    return (
                      <tr 
                        key={row.id} 
                        className={`border-b hover:opacity-80 ${rowColor}`}
                      >
                      <td className="px-2 py-2">
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() => toggleRowSelection(row.id)}
                        />
                      </td>
                      <td className="px-2 py-2 text-gray-900">{row.sip}</td>
                      <td className="px-2 py-2 text-gray-900">{row.docType}</td>
                      <td className="px-2 py-2 text-gray-900">{row.transactionType}</td>
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
                          className="w-28 h-8 text-right bg-gray-50 border-none font-medium"
                        />
                      </td>
                    </tr>
                  );
                })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t sticky bottom-0 bg-white">
          <Button variant="outline" className="h-10 px-6 font-medium text-sm border-gray-300" onClick={onClose}>Cancel</Button>
          <Button
            className="h-10 px-6 bg-gray-600 hover:bg-gray-700 text-white font-bold text-sm rounded shadow-none"
            onClick={handleDeptClearing}
            disabled={selectedRows.length === 0}
          >
            Dept Clearing
          </Button>
        </div>
      </div>
  );
}