import { useState } from 'react';
import { Plus, Search, Download } from 'lucide-react';
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
import CreateTravelExpenditureRequisition from './CreateTravelExpenditureRequisition';
import CreateAdvanceRequest from './CreateAdvanceRequest';
import { Label } from './ui/label';
import { useLanguage } from '../i18n/LanguageContext';

interface RequisitionRow {
  id: number;
  requestId: string;
  employee: string;
  department: string;
  type: string;
  destination: string;
  amount: string;
  status: string;
  date: string;
}

export default function TravelExpenditureRequisition() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPaymentRequest, setShowPaymentRequest] = useState(false);
  const [paymentRequestData, setPaymentRequestData] = useState<any>(null);
  const { t } = useLanguage();

  const [requisitions, setRequisitions] = useState<RequisitionRow[]>([
    {
      id: 1,
      requestId: 'TER-2025-001',
      employee: 'Nguyễn Văn A',
      department: 'Kế toán',
      type: 'Công tác',
      destination: 'Hà Nội',
      amount: '5,000,000',
      status: 'Pending',
      date: '2025-01-15',
    },
    {
      id: 2,
      requestId: 'TER-2025-002',
      employee: 'Trần Thị B',
      department: 'Nhân sự',
      type: 'Đi công tác nước ngoài',
      destination: 'Singapore',
      amount: '15,000,000',
      status: 'Approved',
      date: '2025-01-14',
    },
    {
      id: 3,
      requestId: 'TER-2025-003',
      employee: 'Lê Văn C',
      department: 'Marketing',
      type: 'Công tác',
      destination: 'TP. Hồ Chí Minh',
      amount: '3,500,000',
      status: 'Rejected',
      date: '2025-01-13',
    },
    {
      id: 4,
      requestId: 'TER-2025-004',
      employee: 'Phạm Thị D',
      department: 'IT',
      type: 'Đi công tác trong nước',
      destination: 'Đà Nẵng',
      amount: '4,200,000',
      status: 'Pending',
      date: '2025-01-12',
    },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredRequisitions = requisitions.filter(row => {
    const matchSearch = searchText === '' ||
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      );
    const matchStatus = statusFilter === 'all' || row.status === statusFilter;
    const matchType = typeFilter === 'all' || row.type === typeFilter;
    const matchDepartment = departmentFilter === 'all' || row.department === departmentFilter;
    
    return matchSearch && matchStatus && matchType && matchDepartment;
  });

  if (showCreateForm) {
    return (
      <CreateTravelExpenditureRequisition 
        onClose={() => setShowCreateForm(false)} 
        onNavigateToPaymentRequest={(data) => {
          setPaymentRequestData(data);
          setShowCreateForm(false);
          setShowPaymentRequest(true);
        }}
      />
    );
  }

  if (showPaymentRequest) {
    return (
      <CreateAdvanceRequest 
        onClose={() => setShowPaymentRequest(false)} 
        data={paymentRequestData}
      />
    );
  }

  return (
    <div className="p-6 max-w-[1600px]">
      {/* Page Header - Enterprise Style */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 uppercase tracking-tight mb-1">
          {t.tem.travelRequisitionList}
        </h1>
        <p className="text-sm text-gray-600">
          {t.tem.travelRequisitionSubtitle}
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Filters Section */}
        <div className="p-4 border-b bg-gray-50">
          <div className="grid grid-cols-12 gap-3">
            {/* Search - 4 columns */}
            <div className="col-span-4">
              <Label className="text-xs font-medium text-gray-700 mb-1.5 block">{t.tem.search}</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="ID, employee, destination..."
                  className="pl-9 h-9 text-sm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter - 2 columns */}
            <div className="col-span-2">
              <Label className="text-xs font-medium text-gray-700 mb-1.5 block">{t.tem.status}</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.tem.allStatus}</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter - 3 columns */}
            <div className="col-span-3">
              <Label className="text-xs font-medium text-gray-700 mb-1.5 block">{t.tem.typeLabel}</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Công tác">Công tác</SelectItem>
                  <SelectItem value="Đi công tác trong nước">Đi công tác trong nước</SelectItem>
                  <SelectItem value="Đi công tác nước ngoài">Đi công tác nước ngoài</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter - 3 columns */}
            <div className="col-span-3">
              <Label className="text-xs font-medium text-gray-700 mb-1.5 block">{t.tem.departmentLabel}</Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Kế toán">Kế toán</SelectItem>
                  <SelectItem value="Nhân sự">Nhân sự</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="h-9 px-4 text-sm gap-1.5 bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={() => setShowCreateForm(true)}
            >
              <Plus className="w-4 h-4" /> {t.tem.createTravelReq}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowPaymentRequest(true)}
              className="h-9 px-4 font-medium border-gray-300"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Payment Request
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-9 px-4 font-medium border-gray-300"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export
            </Button>
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {filteredRequisitions.length} of {requisitions.length} requests
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[#f8fafc] border-b">
              <tr>
                <th className="px-4 py-3 text-left w-12">
                  <Checkbox />
                </th>
                <th className="text-left px-4 py-3">{t.tem.requestId}</th>
                <th className="text-left px-4 py-3">{t.tem.employeeLabel}</th>
                <th className="text-left px-4 py-3">{t.tem.departmentLabel}</th>
                <th className="text-left px-4 py-3">{t.tem.typeLabel}</th>
                <th className="text-left px-4 py-3">{t.tem.destinationLabel}</th>
                <th className="text-right px-4 py-3">{t.tem.amountLabel}</th>
                <th className="text-left px-4 py-3">{t.tem.status}</th>
                <th className="text-left px-4 py-3">{t.tem.dateLabel}</th>
                <th className="text-right px-4 py-3">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequisitions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400">
                    {t.tem.noRecordsFound}
                  </td>
                </tr>
              ) : (
                filteredRequisitions.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-600">
                      {row.requestId}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{row.employee}</td>
                    <td className="px-4 py-3 text-gray-600">{row.department}</td>
                    <td className="px-4 py-3 text-gray-600">{row.type}</td>
                    <td className="px-4 py-3 text-gray-900">{row.destination}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900 tabular-nums">
                      {row.amount}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.status === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : row.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 tabular-nums">{row.date}</td>
                    <td className="px-4 py-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-xs text-gray-600">
            Showing {filteredRequisitions.length} results
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}