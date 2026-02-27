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
import { Checkbox } from './ui/checkbox';
import { FilterPanel } from './FilterPanel';
import { StatsCard } from './StatsCard';

interface BankReceiptListProps {
  onCreateClick: () => void;
}

// Mock data
const bankReceipts = [
  {
    date: '28-12-2025',
    cashNumber: '002',
    cashTransaction: 'Chuyển khoản',
    paidFrom: 'KHÁCH HÀNG B',
    curr: 'VND',
    bankAccount: '112',
    customerName: 'CÔNG TY XYZ',
    amount: 25000000,
    accountedAmount: 25000000,
    description: 'Thu tiền theo hợp đồng',
    sentMail: 'Y',
    status: 'unpaid'
  },
  {
    date: '05-11-2025',
    cashNumber: '004',
    cashTransaction: 'Chuyển khoản',
    paidFrom: 'KHÁCH HÀNG D',
    curr: 'VND',
    bankAccount: '112',
    customerName: 'CÔNG TY TNHH GHI',
    amount: 12000000,
    accountedAmount: 12000000,
    description: 'Thu nợ quá hạn',
    sentMail: 'Y',
    status: 'overdue'
  }
];

// Helper: parse dd-MM-yyyy to Date
function parseDate(dateStr: string): Date {
  const [dd, mm, yyyy] = dateStr.split('-');
  return new Date(`${yyyy}-${mm}-${dd}`);
}

export default function BankReceiptList({ onCreateClick }: BankReceiptListProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [cashNumberFilter, setCashNumberFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedCurr, setSelectedCurr] = useState('all');

  // Filter data
  const filteredReceipts = bankReceipts.filter(receipt => {
    const matchesSearch = searchText === '' || Object.values(receipt).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || receipt.status === selectedStatus;
    const matchesCashNumber = cashNumberFilter === '' || receipt.cashNumber.toLowerCase().includes(cashNumberFilter.toLowerCase());
    const matchesCurr = selectedCurr === 'all' || receipt.curr === selectedCurr;

    let matchesDate = true;
    if (fromDate || toDate) {
      const receiptDate = parseDate(receipt.date);
      if (fromDate) matchesDate = matchesDate && receiptDate >= new Date(fromDate);
      if (toDate) matchesDate = matchesDate && receiptDate <= new Date(toDate);
    }

    return matchesSearch && matchesStatus && matchesCashNumber && matchesCurr && matchesDate;
  });

  // Calculate KPI values
  const paidCount = bankReceipts.filter(receipt => receipt.status === 'paid').length;
  const unpaidCount = bankReceipts.filter(receipt => receipt.status === 'unpaid').length;
  const overdueCount = bankReceipts.filter(receipt => receipt.status === 'overdue').length;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const notDueYetCount = bankReceipts.filter(receipt => {
    const receiptDate = parseDate(receipt.date);
    return receipt.status !== 'overdue' && receiptDate >= sevenDaysAgo;
  }).length;

  const customFilters = (
    <>
      {/* Cash Number Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Receipt Number</label>
        <input
          type="text"
          value={cashNumberFilter}
          onChange={(e) => setCashNumberFilter(e.target.value)}
          placeholder="Search receipt number..."
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
          <h1 className="text-xl font-semibold text-gray-800">Bank Receipt</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Cash Management</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Bank Receipt</span>
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
            </div>
          </div>

          {/* Checkboxes */}
          <div className="bg-white border border-t-0 px-4 py-2 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox />
              <span>Is Customer Unknown?</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox />
              <span>Is Description?</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox defaultChecked />
              <span>Is No Send Email?</span>
            </label>
          </div>

          {/* Table */}
          <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Date</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Receipt Number</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Transaction Type</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Paid From</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Curr</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Bank Account</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Customer name</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Amount</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Accounted Amount</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Description</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Sent Mail?</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReceipts.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-12 h-12 opacity-10" />
                          <span>No bank receipts found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredReceipts.map((receipt, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-2 text-sm">{receipt.date}</td>
                        <td className="px-4 py-2 text-sm">{receipt.cashNumber}</td>
                        <td className="px-4 py-2 text-sm">{receipt.cashTransaction}</td>
                        <td className="px-4 py-2 text-sm">{receipt.paidFrom}</td>
                        <td className="px-4 py-2 text-sm">{receipt.curr}</td>
                        <td className="px-4 py-2 text-sm">{receipt.bankAccount}</td>
                        <td className="px-4 py-2 text-sm">{receipt.customerName}</td>
                        <td className="px-4 py-2 text-sm text-right">{receipt.amount.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-right">{receipt.accountedAmount.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm">{receipt.description}</td>
                        <td className="px-4 py-2 text-sm">{receipt.sentMail}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-2 border-t bg-gray-50 text-sm text-right text-gray-600">
              Showing {filteredReceipts.length} of {bankReceipts.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}