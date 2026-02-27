import { useState } from 'react';
import { CheckCircle, FileText, AlertTriangle, Calendar, Plus, Filter, RotateCcw, List, Grid3x3, RefreshCw, MoreVertical, Trash2, Save, Search as SearchIcon } from 'lucide-react';
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

interface InvoiceListProps {
  onCreateClick: () => void;
  type: 'sales' | 'purchase';
}

const invoices = [
  {
    invoiceNumber: '00001',
    objectName: 'CÔNG TY TRÁCH NHIỆM HỮU HẠN MỘT THÀNH VIÊN',
    curCode: 'VND',
    description: 'Hóa đơn tháng 12',
    amount: 1575000.00,
    amountTax: 75000,
    accountedAmount: 1575000,
    remainingAmount: 0,
    invoiceDate: '07/12/2025',
    termDate: '07/01/2026',
    glDate: '07/12/2025',
    approved: 'Y',
    posting: 'P',
    status: 'paid',
    dueDate: '07/01/2026'
  },
  {
    invoiceNumber: '00002',
    objectName: 'CÔNG TY CỔ PHẦN ABC',
    curCode: 'VND',
    description: 'Thanh toán dịch vụ',
    amount: 2500000.00,
    amountTax: 250000,
    accountedAmount: 2500000,
    remainingAmount: 2500000,
    invoiceDate: '15/12/2025',
    termDate: '15/01/2026',
    glDate: '15/12/2025',
    approved: 'N',
    posting: 'N',
    status: 'unpaid',
    dueDate: '15/01/2026'
  },
  {
    invoiceNumber: '00003',
    objectName: 'DOANH NGHIỆP TƯ NHÂN XYZ',
    curCode: 'VND',
    description: 'Cung cấp hàng hóa',
    amount: 5000000.00,
    amountTax: 500000,
    accountedAmount: 5000000,
    remainingAmount: 5000000,
    invoiceDate: '10/11/2025',
    termDate: '10/12/2025',
    glDate: '10/11/2025',
    approved: 'Y',
    posting: 'P',
    status: 'overdue',
    dueDate: '10/12/2025'
  },
  {
    invoiceNumber: '00004',
    objectName: 'CÔNG TY TNHH DEF',
    curCode: 'VND',
    description: 'Đơn hàng Q4',
    amount: 3200000.00,
    amountTax: 320000,
    accountedAmount: 3200000,
    remainingAmount: 3200000,
    invoiceDate: '03/01/2026',
    termDate: '03/02/2026',
    glDate: '03/01/2026',
    approved: 'N',
    posting: 'N',
    status: 'unpaid',
    dueDate: '03/02/2026'
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const cfg: Record<string, { label: string; cls: string }> = {
    paid:    { label: 'Paid',    cls: 'erp-badge-success' },
    unpaid:  { label: 'Unpaid',  cls: 'erp-badge-warning' },
    overdue: { label: 'Overdue', cls: 'erp-badge-danger' },
    draft:   { label: 'Draft',   cls: 'erp-badge-neutral' },
  };
  const c = cfg[status] || { label: status, cls: 'erp-badge-neutral' };
  return <span className={c.cls}>{c.label}</span>;
};

const ApprovedBadge = ({ val }: { val: string }) =>
  val === 'Y'
    ? <span className="erp-badge-success">Yes</span>
    : <span className="erp-badge-neutral">No</span>;

const PostingBadge = ({ val }: { val: string }) =>
  val === 'P'
    ? <span className="erp-badge-info">Posted</span>
    : <span className="erp-badge-neutral">Draft</span>;

export default function InvoiceList({ onCreateClick, type }: InvoiceListProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState('all');

  const title = type === 'sales' ? 'Sales Invoice' : 'Purchase Invoice';
  const customerLabel = type === 'sales' ? 'Customer' : 'Supplier';

  const paidCount = invoices.filter(inv => inv.status === 'paid').length;
  const unpaidCount = invoices.filter(inv => inv.status === 'unpaid').length;
  const overdueCount = invoices.filter(inv => inv.status === 'overdue').length;
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const notDueYetCount = invoices.filter(inv => {
    const d = new Date(inv.invoiceDate.split('/').reverse().join('-'));
    return inv.status !== 'overdue' && d >= sevenDaysAgo;
  }).length;

  const toggleRow = (num: string) =>
    setSelectedRows(prev => prev.includes(num) ? prev.filter(x => x !== num) : [...prev, num]);
  const toggleAll = () =>
    setSelectedRows(selectedRows.length === invoices.length ? [] : invoices.map(i => i.invoiceNumber));

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'draft', label: 'Draft' },
  ];

  const customerOptions = [
    { value: 'all', label: `All ${customerLabel}s` },
    { value: 'customer1', label: 'CÔNG TY TRÁCH NHIỆM HỮU HẠN MỘT THÀNH VIÊN' },
    { value: 'customer2', label: 'CÔNG TY CỔ PHẦN ABC' },
    { value: 'customer3', label: 'DOANH NGHIỆP TƯ NHÂN XYZ' },
    { value: 'customer4', label: 'CÔNG TY TNHH DEF' },
  ];

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = searchText === '' || Object.values(inv).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || inv.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Filter Panel - Left Sidebar */}
      <FilterPanel
        searchValue={searchText}
        onSearchChange={setSearchText}
        statusOptions={statusOptions}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        typeOptions={customerOptions}
        selectedType={selectedCustomer}
        onTypeChange={setSelectedCustomer}
        showStatus={true}
        showType={true}
        typeLabel={customerLabel}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý hóa đơn {type === 'sales' ? 'bán hàng' : 'mua vào'} - theo dõi công nợ và thanh toán
          </p>
        </div>

        {/* Stats Cards */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center gap-12">
            <StatsCard label="PAID" value={paidCount} color="green" />
            <StatsCard label="UNPAID" value={unpaidCount} color="orange" />
            <StatsCard label="OVERDUE" value={overdueCount} color="red" />
            <StatsCard label="NOT DUE YET (7D)" value={notDueYetCount} color="blue" />
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              onClick={onCreateClick}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create {type === 'sales' ? 'Sales' : 'Purchase'} Invoice
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <List className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
          <table className="w-full text-sm min-w-[1800px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-50 border-b">
                <th className="px-3 py-3 text-left w-12 border-r bg-gray-50 sticky left-0 z-20">
                  <Checkbox
                    checked={selectedRows.length === invoices.length && invoices.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-32 bg-gray-50 sticky left-12 z-20">Invoice Number</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-96">Object Name</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-24">Currency</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-64">Description</th>
                <th className="px-3 py-3 text-right text-gray-700 font-semibold border-r w-32">Amount</th>
                <th className="px-3 py-3 text-right text-gray-700 font-semibold border-r w-32">Amount Tax</th>
                <th className="px-3 py-3 text-right text-gray-700 font-semibold border-r w-32">Accounted Amount</th>
                <th className="px-3 py-3 text-right text-gray-700 font-semibold border-r w-32">Remaining Amount</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-32">Invoice Date</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-32">Term Date</th>
                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-32">GL Date</th>
                <th className="px-3 py-3 text-center text-gray-700 font-semibold border-r w-24">Approved</th>
                <th className="px-3 py-3 text-center text-gray-700 font-semibold border-r w-24">Posting</th>
                <th className="px-3 py-3 text-center text-gray-700 font-semibold w-24">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors bg-white">
                  <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10">
                    <Checkbox
                      checked={selectedRows.includes(invoice.invoiceNumber)}
                      onCheckedChange={() => toggleRow(invoice.invoiceNumber)}
                    />
                  </td>
                  <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10 font-semibold text-blue-600">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-3 py-2 border-r" title={invoice.objectName}>{invoice.objectName}</td>
                  <td className="px-3 py-2 border-r text-gray-500">{invoice.curCode}</td>
                  <td className="px-3 py-2 border-r text-gray-600">{invoice.description}</td>
                  <td className="px-3 py-2 border-r text-right tabular-nums font-semibold">{invoice.amount.toLocaleString()}</td>
                  <td className="px-3 py-2 border-r text-right tabular-nums text-orange-600">{invoice.amountTax.toLocaleString()}</td>
                  <td className="px-3 py-2 border-r text-right tabular-nums font-semibold">{invoice.accountedAmount.toLocaleString()}</td>
                  <td className="px-3 py-2 border-r text-right tabular-nums text-red-600 font-semibold">{invoice.remainingAmount.toLocaleString()}</td>
                  <td className="px-3 py-2 border-r text-gray-600">{invoice.invoiceDate}</td>
                  <td className="px-3 py-2 border-r text-gray-600">{invoice.termDate}</td>
                  <td className="px-3 py-2 border-r text-gray-600">{invoice.glDate}</td>
                  <td className="px-3 py-2 border-r text-center"><ApprovedBadge val={invoice.approved} /></td>
                  <td className="px-3 py-2 border-r text-center"><PostingBadge val={invoice.posting} /></td>
                  <td className="px-3 py-2 text-center"><StatusBadge status={invoice.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-white border-t px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredInvoices.length}</span> of <span className="font-semibold">{invoices.length}</span> invoices
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Total Amount: <span className="font-semibold text-gray-800">
                {invoices.reduce((s, i) => s + i.amount, 0).toLocaleString()} VND
              </span>
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}