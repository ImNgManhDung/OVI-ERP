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

interface PaymentRequestListProps {
  onCreateClick: () => void;
}

// Mock data
const paymentRequests = [
  {
    requestNumber: 'PR001',
    requestDate: '15-12-2025',
    transactionType: 'Tiền mặt',
    description: 'Đề nghị chi trả tiền mua hàng',
    supplier: 'NHÀ CUNG CẤP A',
    currency: 'VND',
    amountSubmit: 20000000,
    accountedAmountSubmit: 20000000,
    approvedAmount: 20000000,
    submitStatus: 'Submitted',
    approveStatus: 'Approved',
    status: 'approved'
  },
  {
    requestNumber: 'PR002',
    requestDate: '20-12-2025',
    transactionType: 'Chuyển khoản',
    description: 'Đề nghị chi phí dịch vụ',
    supplier: 'NHÀ CUNG CẤP B',
    currency: 'VND',
    amountSubmit: 15000000,
    accountedAmountSubmit: 15000000,
    approvedAmount: 0,
    submitStatus: 'Submitted',
    approveStatus: 'Pending',
    status: 'pending'
  },
  {
    requestNumber: 'PR003',
    requestDate: '04-01-2026',
    transactionType: 'Tiền mặt',
    description: 'Đề nghị thanh toán hợp đồng',
    supplier: 'NHÀ CUNG CẤP C',
    currency: 'USD',
    amountSubmit: 30000000,
    accountedAmountSubmit: 30000000,
    approvedAmount: 0,
    submitStatus: 'Draft',
    approveStatus: 'Not Submitted',
    status: 'draft'
  },
  {
    requestNumber: 'PR004',
    requestDate: '01-11-2025',
    transactionType: 'Chuyển khoản',
    description: 'Đề nghị chi thanh toán',
    supplier: 'NHÀ CUNG CẤP D',
    currency: 'VND',
    amountSubmit: 10000000,
    accountedAmountSubmit: 10000000,
    approvedAmount: 0,
    submitStatus: 'Submitted',
    approveStatus: 'Rejected',
    status: 'rejected'
  }
];

// Helper: parse dd-MM-yyyy to Date
function parseDate(dateStr: string): Date {
  const [dd, mm, yyyy] = dateStr.split('-');
  return new Date(`${yyyy}-${mm}-${dd}`);
}

export default function PaymentRequestList({ onCreateClick }: PaymentRequestListProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [requestNumberFilter, setRequestNumberFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedCurr, setSelectedCurr] = useState('all');

  // Filter data
  const filteredRequests = paymentRequests.filter(req => {
    const matchesSearch = searchText === '' || Object.values(req).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
    const matchesRequestNumber = requestNumberFilter === '' || req.requestNumber.toLowerCase().includes(requestNumberFilter.toLowerCase());
    const matchesCurr = selectedCurr === 'all' || req.currency === selectedCurr;

    let matchesDate = true;
    if (fromDate || toDate) {
      const reqDate = parseDate(req.requestDate);
      if (fromDate) matchesDate = matchesDate && reqDate >= new Date(fromDate);
      if (toDate) matchesDate = matchesDate && reqDate <= new Date(toDate);
    }

    return matchesSearch && matchesStatus && matchesRequestNumber && matchesCurr && matchesDate;
  });

  // Calculate KPI values
  const approvedCount = paymentRequests.filter(req => req.status === 'approved').length;
  const pendingCount = paymentRequests.filter(req => req.status === 'pending').length;
  const draftCount = paymentRequests.filter(req => req.status === 'draft').length;
  const rejectedCount = paymentRequests.filter(req => req.status === 'rejected').length;

  const customFilters = (
    <>
      {/* Request Number Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Request Number</label>
        <input
          type="text"
          value={requestNumberFilter}
          onChange={(e) => setRequestNumberFilter(e.target.value)}
          placeholder="Search request number..."
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
          { value: 'approved', label: 'Approved' },
          { value: 'pending', label: 'Pending' },
          { value: 'draft', label: 'Draft' },
          { value: 'rejected', label: 'Rejected' },
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
          <h1 className="text-xl font-semibold text-gray-800">Payment Request</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Cash Management</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Payment Request</span>
          </nav>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatsCard title="APPROVED" value={approvedCount} icon={CheckCircle} bgColor="text-green-600" iconBgColor="bg-green-50" />
            <StatsCard title="PENDING" value={pendingCount} icon={FileText} bgColor="text-orange-600" iconBgColor="bg-orange-50" />
            <StatsCard title="DRAFT" value={draftCount} icon={Calendar} bgColor="text-blue-600" iconBgColor="bg-blue-50" />
            <StatsCard title="REJECTED" value={rejectedCount} icon={AlertTriangle} bgColor="text-red-600" iconBgColor="bg-red-50" />
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
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Request Number</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Request Date</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Transaction Type</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Description</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Supplier</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Currency</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Amount Submit</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Accounted Amount</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Approved Amount</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Submit Status</th>
                    <th className="px-4 py-2 text-left text-sm text-blue-700">Approve Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-12 h-12 opacity-10" />
                          <span>No payment requests found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((request, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-2 text-sm text-gray-500">{request.requestNumber}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{request.requestDate}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{request.transactionType}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{request.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{request.supplier}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{request.currency}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{request.amountSubmit.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{request.accountedAmountSubmit.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {request.approvedAmount > 0 ? request.approvedAmount.toLocaleString() : '-'}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${request.submitStatus === 'Submitted' ? 'bg-green-100 text-green-700' :
                              request.submitStatus === 'Draft' ? 'bg-gray-100 text-gray-700' :
                                'bg-blue-100 text-blue-700'
                            }`}>
                            {request.submitStatus}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${request.approveStatus === 'Approved' ? 'bg-green-100 text-green-700' :
                              request.approveStatus === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                request.approveStatus === 'Rejected' ? 'bg-red-100 text-red-700' :
                                  'bg-gray-100 text-gray-700'
                            }`}>
                            {request.approveStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-2 border-t bg-gray-50 text-sm text-right text-gray-600">
              Showing {filteredRequests.length} of {paymentRequests.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}