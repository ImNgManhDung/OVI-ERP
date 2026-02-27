import { useState } from 'react';
import { Plus, Search, Download } from 'lucide-react';
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
import ExpenseDeclaration from './ExpenseDeclaration';
import RefundModal from './RefundModal';
import { useLanguage } from '../i18n/LanguageContext';

interface ExpenseDeclarationRow {
  id: number;
  transactionType: string;
  sip: string;
  employee: string;
  department: string;
  policyDate: string;
  policyType: string;
  description: string;
  total: number;
  status: string;
}

export default function ExpenseDeclarationList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [policyTypeFilter, setPolicyTypeFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const { t } = useLanguage();

  const [declarations, setDeclarations] = useState<ExpenseDeclarationRow[]>([
    {
      id: 1,
      sip: 'SIP-2026-001',
      transactionType: 'Vé máy bay',
      employee: 'Nguyễn Văn A',
      department: 'Kế toán',
      policyDate: '2026-01-16',
      policyType: 'Domestic',
      description: 'Công tác Hà Nội',
      total: 5000000,
      status: 'Pending',
    },
    {
      id: 2,
      sip: 'SIP-2026-002',
      transactionType: 'Khách sạn',
      employee: 'Trần Thị B',
      department: 'Nhân sự',
      policyDate: '2026-01-15',
      policyType: 'International',
      description: 'Khách sạn Singapore',
      total: 12000000,
      status: 'Approved',
    },
    {
      id: 3,
      sip: 'SIP-2026-003',
      transactionType: 'Vé máy bay',
      employee: 'Lê Văn C',
      department: 'Marketing',
      policyDate: '2026-01-14',
      policyType: 'Domestic',
      description: 'Công tác TP.HCM',
      total: 3500000,
      status: 'Draft',
    },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredDeclarations.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredDeclarations.map(row => row.id));
    }
  };

  const filteredDeclarations = declarations.filter(row => {
    const matchSearch = searchText === '' ||
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      );
    const matchStatus = statusFilter === 'all' || row.status === statusFilter;
    const matchDepartment = departmentFilter === 'all' || row.department === departmentFilter;
    const matchPolicyType = policyTypeFilter === 'all' || row.policyType === policyTypeFilter;
    
    return matchSearch && matchStatus && matchDepartment && matchPolicyType;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  if (showCreateForm) {
    return <ExpenseDeclaration onClose={() => setShowCreateForm(false)} />;
  }

  return (
    <div className="p-6 max-w-[1600px]">
      {/* Page Header - Enterprise Style */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 uppercase tracking-tight mb-1">
          {t.tem.expenseDeclarationListTitle}
        </h1>
        <p className="text-sm text-gray-600">
          {t.tem.expenseDeclarationSubtitle}
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
                  placeholder="SIP, employee, description..."
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
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Policy Type Filter - 2 columns */}
            <div className="col-span-2">
              <Label className="text-xs font-medium text-gray-700 mb-1.5 block">{t.tem.policyType}</Label>
              <Select value={policyTypeFilter} onValueChange={setPolicyTypeFilter}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.tem.allTypes}</SelectItem>
                  <SelectItem value="Domestic">Domestic</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter - 2 columns */}
            <div className="col-span-2">
              <Label className="text-xs font-medium text-gray-700 mb-1.5 block">{t.tem.departmentLabel}</Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.tem.allDepartments}</SelectItem>
                  <SelectItem value="Kế toán">Kế toán</SelectItem>
                  <SelectItem value="Nhân sự">Nhân sự</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Empty space - 2 columns */}
            <div className="col-span-2"></div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
          <div className="flex gap-2">
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => setShowCreateForm(true)}
              className="h-9 px-4 bg-blue-600 hover:bg-blue-700 font-medium"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Create Declaration
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-9 px-4 font-medium border-gray-300"
              onClick={() => setShowRefundModal(true)}
              disabled={selectedRows.length === 0}
            >
              Refund Selected
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
            {filteredDeclarations.length} of {declarations.length} declarations
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[#f8fafc] border-b">
              <tr>
                <th className="px-4 py-3 text-left w-12">
                  <Checkbox 
                    checked={selectedRows.length === filteredDeclarations.length && filteredDeclarations.length > 0}
                    onCheckedChange={toggleAllRows}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.tem.sip}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.tem.transactionType}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.tem.employeeLabel}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.tem.departmentLabel}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.tem.policyDate}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.tem.policyType}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.common.description}</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.tem.total}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.tem.status}</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeclarations.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center text-sm text-gray-500">
                    No declarations found
                  </td>
                </tr>
              ) : (
                filteredDeclarations.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-600">
                      {row.sip}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{row.transactionType}</td>
                    <td className="px-4 py-3 text-gray-900">{row.employee}</td>
                    <td className="px-4 py-3 text-gray-600">{row.department}</td>
                    <td className="px-4 py-3 text-gray-600 tabular-nums">{row.policyDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        row.policyType === 'International' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {row.policyType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{row.description}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900 tabular-nums">
                      {formatCurrency(row.total)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.status === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : row.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : row.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
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
            Showing {filteredDeclarations.length} results
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

      {/* Refund Modal */}
      {showRefundModal && (
        <RefundModal 
          onClose={() => setShowRefundModal(false)}
          selectedDeclarations={declarations.filter(d => selectedRows.includes(d.id))}
        />
      )}
    </div>
  );
}