import { useState } from 'react';
import { Plus, Trash2, Paperclip, ChevronDown, X } from 'lucide-react';
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
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import RefundModal from './RefundModal';
import { InvoiceSelectionDialog } from './InvoiceSelectionDialog';

interface ExpenseRow {
  id: number;
  stt: number;
  expenseDate: string;
  expenseType: string;
  description: string;
  amount: number;
  currency: string;
  costCenters: string;
  costElements: string;
  projects: string;
  profitCenter: string;
  attachment: string;
  note: string;
}

interface ExpenseDeclarationProps {
  onClose: () => void;
}

export default function ExpenseDeclaration({ onClose }: ExpenseDeclarationProps) {
  const [activeTab, setActiveTab] = useState('main-info');
  const [complete, setComplete] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchText, setSearchText] = useState('');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    requestCode: 'TER-2026-001',
    tripName: 'Công tác tại Hà Nội',
    employee: 'Nguyễn Văn A',
    employeeId: 'EMP001',
    department: 'Kế toán',
    position: 'Accountant',
    startDate: '2026-01-15',
    endDate: '2026-01-18',
    destination: 'Hà Nội',
    advanceNumber: 'TU-2026-001',
    advanceAmount: 5000000,
    approveWorkflow: 'WF01',
    approveDate: '',
    deptIssued: 'Accounting',
  });

  const [expenses, setExpenses] = useState<ExpenseRow[]>([
    {
      id: 1,
      stt: 1,
      expenseDate: '2026-01-15',
      expenseType: 'Vé máy bay',
      description: 'Vé máy bay khứ hồi HCM - HN',
      amount: 2500000,
      currency: 'VND',
      costCenters: 'CC01',
      costElements: 'CE01',
      projects: 'PRJ001',
      profitCenter: 'PC01',
      attachment: '',
      note: '',
    },
    {
      id: 2,
      stt: 2,
      expenseDate: '2026-01-16',
      expenseType: 'Lưu trú',
      description: 'Khách sạn 3 đêm',
      amount: 1800000,
      currency: 'VND',
      costCenters: 'CC01',
      costElements: 'CE02',
      projects: 'PRJ001',
      profitCenter: 'PC01',
      attachment: '',
      note: '',
    },
  ]);

  const [approvalLevels, setApprovalLevels] = useState([
    {
      id: 1,
      level: 'Level 1',
      approver: 'Trần Văn B',
      position: 'Manager',
      status: 'Approved',
      date: '2026-01-17',
      comments: 'Đồng ý',
    },
    {
      id: 2,
      level: 'Level 2',
      approver: 'Lê Thị C',
      position: 'Director',
      status: 'Pending',
      date: '',
      comments: '',
    },
  ]);

  const expenseTypeOptions = [
    'Vé máy bay',
    'Vé tàu hỏa',
    'Taxi/Grab',
    'Ăn uống',
    'Lưu trú',
    'Tiếp khách',
    'Xăng xe',
    'Phí đường bộ',
    'Khác',
  ];

  const currencyOptions = ['VND', 'USD', 'EUR'];

  // Function to calculate status based on complete and posted
  const getStatus = () => {
    if (complete) return 'Complete';
    return 'Draft';
  };

  const getStatusColor = () => {
    const status = getStatus();
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-700';
      case 'Complete':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddExpense = () => {
    const newExpense: ExpenseRow = {
      id: Date.now(),
      stt: expenses.length + 1,
      expenseDate: new Date().toISOString().split('T')[0],
      expenseType: '',
      description: '',
      amount: 0,
      currency: 'VND',
      costCenters: '',
      costElements: '',
      projects: '',
      profitCenter: '',
      attachment: '',
      note: '',
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpenses = () => {
    setExpenses(expenses.filter(exp => !selectedRows.includes(exp.id)));
    setSelectedRows([]);
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const updateExpense = (id: number, field: keyof ExpenseRow, value: any) => {
    setExpenses(expenses.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const difference = totalExpense - formData.advanceAmount;

  const filteredExpenses = expenses.filter(row =>
    searchText === '' || 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
      {/* CONTAINER TĨNH 1600px */}
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-4">
            <h1 className="text-xl">
              Expense Declaration - Khai báo chi phí công tác
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
              {getStatus()}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
            <TabsTrigger 
              value="main-info" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
            >
              Main Info
            </TabsTrigger>
            <TabsTrigger 
              value="approval-info" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
            >
              Approval Info
            </TabsTrigger>
          </TabsList>

          {/* Main Info Tab */}
          <TabsContent value="main-info" className="p-6">
            {/* MAIN INFO CONTAINER - 3 BLOCKS TĨNH CỐ ĐỊNH */}
            <div className="flex gap-6 mb-6" style={{ width: '1552px' }}>
              
              {/* BLOCK 1 - THÔNG TIN YÊU CẦU CÔNG TÁC - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4">Travel Requisition Info</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Row 1: Mã yêu cầu công tác (2 cols) + Request Date (1 col) */}
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Mã yêu cầu công tác
                    </Label>
                    <Select value={formData.requestCode} onValueChange={(value) => setFormData({ ...formData, requestCode: value })}>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TER-2026-001">TER-2026-001</SelectItem>
                        <SelectItem value="TER-2026-002">TER-2026-002</SelectItem>
                        <SelectItem value="TER-2026-003">TER-2026-003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Request Date</Label>
                    <Input 
                      type="date" 
                      className="h-10 bg-gray-50" 
                      value="2026-01-10"
                      disabled
                    />
                  </div>

                  {/* Row 2: Description (3 cols) */}
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">Description</Label>
                    <Input 
                      className="h-10" 
                      placeholder="Enter description..."
                    />
                  </div>
                </div>
              </div>

              {/* BLOCK 2 - THÔNG TIN NHÂN VIÊN - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4">Employee Info</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Row 1: Employee ID (1 col) + Employee Name (2 cols) */}
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Employee ID
                    </Label>
                    <Input 
                      className="bg-gray-50 h-10" 
                      value={formData.employeeId}
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Employee Name
                    </Label>
                    <Input 
                      className="bg-gray-50 h-10" 
                      value={formData.employee}
                      disabled
                    />
                  </div>

                  {/* Row 2: Department (1 col) + Position (2 cols) */}
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Department</Label>
                    <Input 
                      className="h-10 bg-gray-50" 
                      value={formData.department}
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">Position</Label>
                    <Input 
                      className="h-10 bg-gray-50" 
                      value={formData.position}
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* BLOCK 3 - TRAVEL INFORMATION - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4">Travel Information</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Row 1: Travel Type (1 col) + Start Date (1 col) + End Date (1 col) */}
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Travel Type
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="domestic">Domestic</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Start Date
                    </Label>
                    <Input 
                      type="date" 
                      className="bg-pink-50 h-10" 
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> End Date
                    </Label>
                    <Input 
                      type="date" 
                      className="bg-pink-50 h-10" 
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>

                  {/* Row 2: Destination (1 col) + Departure (1 col) + Distance (1 col) */}
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Destination
                    </Label>
                    <Input 
                      className="bg-pink-50 h-10" 
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    />
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Departure
                    </Label>
                    <Input 
                      className="bg-pink-50 h-10" 
                      placeholder="TP.HCM"
                    />
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Distance (km)</Label>
                    <Input 
                      type="number" 
                      className="h-10" 
                      placeholder="1500"
                    />
                  </div>

                  {/* Row 3: Complete (1 col) + Status (2 cols) */}
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Complete</Label>
                    <div className="flex items-center h-10">
                      <Switch checked={complete} onCheckedChange={setComplete} />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Status
                    </Label>
                    <Input value={getStatus()} disabled className="h-10 bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bảng chi phí phát sinh với hạch toán */}
            <div className="mb-6">
              <h3 className="text-sm mb-4">Bảng chi phí phát sinh & hạch toán</h3>
              
              {/* Search and Actions */}
              <div className="flex items-center gap-2 mb-3">
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
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" onClick={handleAddExpense}>Add Row</Button>
                <Button variant="outline" size="sm" onClick={handleDeleteExpenses} disabled={selectedRows.length === 0}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blue-50 border-b">
                        <th className="px-3 py-2 text-left">
                          <Checkbox />
                        </th>
                        <th className="px-3 py-2 text-left text-gray-700 w-12">No.</th>
                        <th className="px-3 py-2 text-left text-gray-700 w-28">Expense Date</th>
                        <th className="px-3 py-2 text-left text-gray-700 w-32">Expense Type</th>
                        <th className="px-3 py-2 text-left text-gray-700">Description</th>
                        <th className="px-3 py-2 text-left text-gray-700 w-28">Amount</th>
                        <th className="px-3 py-2 text-left text-gray-700 w-20">Currency</th>
                        <th className="px-3 py-2 text-left text-gray-700 w-20">Attachment</th>
                        <th className="px-3 py-2 text-left text-gray-700 w-32">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExpenses.map((expense, index) => (
                        <tr key={expense.id} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">
                            <Checkbox
                              checked={selectedRows.includes(expense.id)}
                              onCheckedChange={() => toggleRowSelection(expense.id)}
                            />
                          </td>
                          <td className="px-3 py-2">{expense.stt}</td>
                          <td className="px-3 py-2">
                            <Input
                              type="date"
                              className="h-8"
                              value={expense.expenseDate}
                              onChange={(e) => updateExpense(expense.id, 'expenseDate', e.target.value)}
                            />
                          </td>
                          <td className="px-3 py-2">
                            <Select
                              value={expense.expenseType}
                              onValueChange={(value) => updateExpense(expense.id, 'expenseType', value)}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {expenseTypeOptions.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-3 py-2">
                            <Input
                              className="h-8"
                              value={expense.description}
                              onChange={(e) => updateExpense(expense.id, 'description', e.target.value)}
                            />
                          </td>
                          <td className="px-3 py-2">
                            <Input
                              type="number"
                              className="h-8 text-right"
                              value={expense.amount}
                              onChange={(e) => updateExpense(expense.id, 'amount', parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="px-3 py-2">
                            <Select
                              value={expense.currency}
                              onValueChange={(value) => updateExpense(expense.id, 'currency', value)}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {currencyOptions.map((curr) => (
                                  <SelectItem key={curr} value={curr}>
                                    {curr}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setCurrentExpenseId(expense.id); setShowInvoiceDialog(true); }}>
                              <Paperclip className="w-4 h-4 text-gray-500" />
                            </Button>
                          </td>
                          <td className="px-3 py-2">
                            <Input
                              className="h-8"
                              value={expense.note}
                              onChange={(e) => updateExpense(expense.id, 'note', e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-100 font-semibold border-t-2">
                        <td colSpan={5} className="px-3 py-2 text-right">
                          Total Expense:
                        </td>
                        <td className="px-3 py-2 text-right">
                          {totalExpense.toLocaleString()}
                        </td>
                        <td className="px-3 py-2">VND</td>
                        <td colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="text-right text-sm text-gray-600 mt-2">
                Total: {filteredExpenses.length}
              </div>
            </div>
          </TabsContent>

          {/* Approval Info Tab */}
          <TabsContent value="approval-info" className="p-6">
            {/* Approval Workflow Selector */}
            <div className="mb-6">
              <h3 className="text-sm mb-4">Approval Workflow</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Approval Workflow
                    </Label>
                    <Select value={formData.approveWorkflow} onValueChange={(value) => setFormData({ ...formData, approveWorkflow: value })}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WF01">WF01 - Standard Approval</SelectItem>
                        <SelectItem value="WF02">WF02 - Express Approval</SelectItem>
                        <SelectItem value="WF03">WF03 - Department Head Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">Workflow Description</Label>
                    <Input 
                      className="h-10 bg-white" 
                      value="Level 1: Manager → Level 2: Director → Level 3: CFO"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm mb-4">Thông tin phê duyệt đa cấp</h3>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50 border-b">
                      <th className="px-4 py-3 text-left text-blue-700">Level</th>
                      <th className="px-4 py-3 text-left text-blue-700">Approver</th>
                      <th className="px-4 py-3 text-left text-blue-700">Position</th>
                      <th className="px-4 py-3 text-left text-blue-700">Approval Date</th>
                      <th className="px-4 py-3 text-left text-blue-700">Comments</th>
                      <th className="px-4 py-3 text-left text-blue-700">Status</th>
                      <th className="px-4 py-3 text-left text-blue-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalLevels.map((level) => (
                      <tr key={level.id} className="border-b">
                        <td className="px-4 py-3 font-medium">{level.level}</td>
                        <td className="px-4 py-3">{level.approver}</td>
                        <td className="px-4 py-3">{level.position}</td>
                        <td className="px-4 py-3">{level.date || '-'}</td>
                        <td className="px-4 py-3">{level.comments || '-'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            level.status === 'Approved' ? 'bg-green-100 text-green-700' :
                            level.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {level.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Select disabled={level.status !== 'Pending'}>
                            <SelectTrigger className="h-8 w-32">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="approve">Duyệt</SelectItem>
                              <SelectItem value="reject">Từ chối</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* History Log */}
            <div className="mb-6">
              <h3 className="text-sm mb-4">Lịch sử thao tác</h3>
              <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Tạo phiếu khai báo</p>
                    <p className="text-xs text-gray-500">Nguyễn Văn A - 2026-01-16 09:30</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Gửi phê duyệt Level 1</p>
                    <p className="text-xs text-gray-500">Nguyễn Văn A - 2026-01-16 10:15</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Phê duyệt Level 1 - Đồng ý</p>
                    <p className="text-xs text-gray-500">Trần Văn B - 2026-01-17 14:20</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Chờ phê duyệt Level 2</p>
                    <p className="text-xs text-gray-500">Đang chờ xử lý</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => setShowRefundModal(true)}>
            Refund
          </Button>
          <Button variant="outline">
            Save as Draft
          </Button>
          <Button variant="default">
            Submit
          </Button>
        </div>
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
        <RefundModal 
          onClose={() => setShowRefundModal(false)}
          requestorInfo={{
            id: formData.employeeId,
            name: formData.employee,
            department: formData.department,
          }}
        />
      )}

      {/* Invoice Selection Dialog */}
      <InvoiceSelectionDialog
        open={showInvoiceDialog}
        onOpenChange={setShowInvoiceDialog}
        onSelectInvoices={(invoices) => {
          console.log('Selected invoices:', invoices);
          // TODO: Handle selected invoices
        }}
      />
    </div>
  );
}