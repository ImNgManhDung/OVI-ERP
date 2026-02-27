import { useState } from 'react';
import { CheckCircle, FileText, AlertTriangle, Calendar, Plus, ChevronDown, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { FilterPanel } from './FilterPanel';
import { StatsCard } from './StatsCard';

interface CashPaymentListProps {
  onCreateClick: () => void;
}

// Mock data
const cashPayments = [
  {
    paymentNumber: 'CP001',
    paymentDate: '15-12-2025',
    transactionType: 'Tiền mặt',
    payDescription: 'Chi trả tiền mua hàng',
    supplier: 'NHÀ CUNG CẤP A',
    internalCashAccount: '111',
    currency: 'VND',
    amount: 20000000,
    accountedAmount: 20000000,
    payReceiver: 'NGUYỄN VĂN A',
    reconcileStatus: 'Completed',
    erpTransferStatus: 'Success',
    status: 'paid'
  },
  {
    paymentNumber: 'CP002',
    paymentDate: '20-12-2025',
    transactionType: 'Chuyển khoản',
    payDescription: 'Chi phí dịch vụ',
    supplier: 'NHÀ CUNG CẤP B',
    internalCashAccount: '112',
    currency: 'VND',
    amount: 15000000,
    accountedAmount: 15000000,
    payReceiver: 'TRẦN THỊ B',
    reconcileStatus: 'Pending',
    erpTransferStatus: 'Processing',
    status: 'unpaid'
  },
  {
    paymentNumber: 'CP003',
    paymentDate: '04-01-2026',
    transactionType: 'Tiền mặt',
    payDescription: 'Thanh toán hợp đồng',
    supplier: 'NHÀ CUNG CẤP C',
    internalCashAccount: '111',
    currency: 'USD',
    amount: 30000000,
    accountedAmount: 30000000,
    payReceiver: 'LÊ VĂN C',
    reconcileStatus: 'Pending',
    erpTransferStatus: 'Pending',
    status: 'unpaid'
  },
  {
    paymentNumber: 'CP004',
    paymentDate: '01-11-2025',
    transactionType: 'Chuyển khoản',
    payDescription: 'Chi trả quá hạn',
    supplier: 'NHÀ CUNG CẤP D',
    internalCashAccount: '112',
    currency: 'VND',
    amount: 10000000,
    accountedAmount: 10000000,
    payReceiver: 'PHẠM THỊ D',
    reconcileStatus: 'Overdue',
    erpTransferStatus: 'Failed',
    status: 'overdue'
  }
];

// Helper: parse dd-MM-yyyy to Date
function parseDate(dateStr: string): Date {
  const [dd, mm, yyyy] = dateStr.split('-');
  return new Date(`${yyyy}-${mm}-${dd}`);
}

export default function CashPaymentList({ onCreateClick }: CashPaymentListProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [paymentNumberFilter, setPaymentNumberFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedCurr, setSelectedCurr] = useState('all');

  // Filter data
  const filteredPayments = cashPayments.filter(payment => {
    const matchesSearch = searchText === '' || Object.values(payment).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchesPaymentNumber = paymentNumberFilter === '' || payment.paymentNumber.toLowerCase().includes(paymentNumberFilter.toLowerCase());
    const matchesCurr = selectedCurr === 'all' || payment.currency === selectedCurr;

    let matchesDate = true;
    if (fromDate || toDate) {
      const paymentDate = parseDate(payment.paymentDate);
      if (fromDate) matchesDate = matchesDate && paymentDate >= new Date(fromDate);
      if (toDate) matchesDate = matchesDate && paymentDate <= new Date(toDate);
    }

    return matchesSearch && matchesStatus && matchesPaymentNumber && matchesCurr && matchesDate;
  });

  // Calculate KPI values
  const paidCount = cashPayments.filter(payment => payment.status === 'paid').length;
  const unpaidCount = cashPayments.filter(payment => payment.status === 'unpaid').length;
  const overdueCount = cashPayments.filter(payment => payment.status === 'overdue').length;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const notDueYetCount = cashPayments.filter(payment => {
    const paymentDate = parseDate(payment.paymentDate);
    return payment.status !== 'overdue' && paymentDate >= sevenDaysAgo;
  }).length;

  const customFilters = (
    <>
      {/* Payment Number Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Payment Number</label>
        <input
          type="text"
          value={paymentNumberFilter}
          onChange={(e) => setPaymentNumberFilter(e.target.value)}
          placeholder="Search payment number..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* From Date */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
      </div>

      {/* To Date */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
      </div>

      {/* Currency Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Currency</label>
        <select
          value={selectedCurr}
          onChange={(e) => setSelectedCurr(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Currencies</option>
          <option value="VND">VND</option>
          <option value="USD">USD</option>
        </select>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left: Filter Panel */}
      <FilterPanel
        searchValue={searchText}
        onSearchChange={setSearchText}
        showStatus={true}
        statusOptions={[
          { value: 'all', label: 'All Status' },
          { value: 'paid', label: 'Paid' },
          { value: 'unpaid', label: 'Unpaid' },
          { value: 'overdue', label: 'Overdue' },
        ]}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        showType={false}
        customFilters={customFilters}
      />

      {/* Right: Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Cash Payment</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Cash Management</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Cash Payment</span>
          </nav>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatsCard title="PAID" value={paidCount} icon={CheckCircle} bgColor="text-green-600" iconBgColor="bg-green-50" />
            <StatsCard title="UNPAID" value={unpaidCount} icon={FileText} bgColor="text-orange-600" iconBgColor="bg-orange-50" />
            <StatsCard title="OVERDUE" value={overdueCount} icon={AlertTriangle} bgColor="text-red-600" iconBgColor="bg-red-50" />
            <StatsCard title="NOT DUE YET" value={notDueYetCount} icon={Calendar} bgColor="text-blue-600" iconBgColor="bg-blue-50" />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={onCreateClick}>
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
          </div>

          {/* Search and Actions Bar */}
          <div className="bg-white border rounded-t-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Search All Text Columns"
                className="w-64 h-8"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button variant="outline" size="sm">Go</Button>
              <Button variant="outline" size="sm">
                Actions <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="outline" size="sm">Reset</Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Payment Number</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Payment Date</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Transaction Type</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Pay Description</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Supplier</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Internal Cash Account</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Currency</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Amount</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Accounted Amount</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Pay Receiver</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Reconcile Status</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Erp Transfer Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-12 h-12 opacity-10" />
                          <span>No cash payments found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((payment, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.paymentNumber}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.paymentDate}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.transactionType}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.payDescription}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.supplier}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.internalCashAccount}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.currency}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.amount.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.accountedAmount.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.payReceiver}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.reconcileStatus}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{payment.erpTransferStatus}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-2 border-t bg-gray-50 text-sm text-right text-gray-600">
              Showing {filteredPayments.length} of {cashPayments.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}