import { useState } from 'react';
import { X, Search, Trash2, Plus, Paperclip } from 'lucide-react';
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
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';

interface CreateTravelExpenditureRequisitionProps {
  onClose: () => void;
  onNavigateToPaymentRequest?: (data: any) => void;
}

interface TeamMemberRow {
  id: number;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  task: string;
  hasAn: boolean;
  hasMac: boolean;
  hasO: boolean;
  hasDiLai: boolean;
}

interface ExpenseDetailRow {
  id: number;
  employeeName: string;
  expType: string;
  expCode: string;
  expClass: string;
  expCategory: string;
  description: string;
  positions: string;
  locationDomestic: boolean;
  locationInternational: boolean;
  locationRegion: string;
  minValue: string;
  maxValue: string;
  uom: string;
  startDate: string;
  endDate: string;
  status: string;
  policyMinValue: string;
  policyMaxValue: string;
  currencyCode: string;
  assignedMembers: string[];
}

// LOV Options
const expTypeOptions = ['Ăn', 'Mặc', 'Ở', 'Đi lại'];

const expClassOptions: { [key: string]: string[] } = {
  'Ăn': ['Ăn sáng', 'Ăn trưa', 'Ăn tối', 'Tiếp khách'],
  'Mặc': ['Đồng phục', 'Trang phục làm việc', 'Giày dép'],
  'Ở': ['Khách sạn', 'Nhà nghỉ', 'Căn hộ dịch vụ'],
  'Đi lại': ['Vé máy bay', 'Tàu hỏa', 'Xe bus', 'Taxi', 'Xăng xe'],
};

const expCategoryOptions: { [key: string]: string[] } = {
  'Vé máy bay': ['Economy', 'Premium Economy', 'Business', 'First Class'],
  'Tàu hỏa': ['Ghế cứng', 'Ghế mềm', 'Giường nằm 4', 'Giường nằm 6'],
  'Khách sạn': ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
  'Xe bus': ['Ghế ngồi', 'Giường nằm', 'Limousine'],
  'Ăn sáng': ['Tiêu chuẩn', 'Nâng cao'],
  'Ăn trưa': ['Tiêu chuẩn', 'Nâng cao'],
  'Ăn tối': ['Tiêu chuẩn', 'Nâng cao'],
  'Tiếp khách': ['Cơ bản', 'Trang trọng', 'VIP'],
};

const positionOptions = ['Nhân viên', 'Trưởng phòng', 'Phó giám đốc', 'Giám đốc', 'Tổng giám đốc', 'CEO'];

const domesticProvinces = [
  'Hà Nội', 'Hải Phòng', 'Quảng Ninh', 'Bắc Ninh', 'Hải Dương', 'Hưng Yên', 'Thái Bình', 'Nam Định',
  'Ninh Bình', 'Hà Nam', 'Vĩnh Phúc', 'Phú Thọ', 'Thái Nguyên', 'Bắc Giang', 'Lạng Sơn', 'Cao Bằng',
  'Lào Cai', 'Yên Bái', 'Điện Biên', 'Sơn La', 'Hòa Bình', 'Thanh Hóa', 'Nghệ An', 'Hà Tĩnh',
  'Quảng Bình', 'Quảng Trị', 'Thừa Thiên Huế', 'Đà Nẵng', 'Quảng Nam', 'Quảng Ngãi', 'Bình Định',
  'Phú Yên', 'Khánh Hòa', 'Ninh Thuận', 'Bình Thuận', 'Kon Tum', 'Gia Lai', 'Đắk Lắk', 'Đắk Nông',
  'Lâm Đồng', 'TP Hồ Chí Minh', 'Bình Phước', 'Bình Dương', 'Đồng Nai', 'Bà Rịa - Vũng Tàu',
  'Tây Ninh', 'Long An', 'Tiền Giang', 'Bến Tre', 'Trà Vinh', 'Vĩnh Long', 'Đồng Tháp', 'An Giang',
  'Kiên Giang', 'Cần Thơ', 'Hậu Giang', 'Sóc Trăng', 'Bạc Liêu', 'Cà Mau',
];

const internationalRegionOptions = ['Mỹ', 'Châu Âu', 'Châu Á'];

const uomOptions = ['KM', 'Giờ', 'Ngày', 'Tháng', 'Lần', '%'];

const currencyOptions = ['VND', 'USD', 'EUR', 'JPY', 'SGD'];

export default function CreateTravelExpenditureRequisition({ 
  onClose, 
  onNavigateToPaymentRequest 
}: CreateTravelExpenditureRequisitionProps) {
  const [activeMainTab, setActiveMainTab] = useState('main-info');
  const [activeDetailTab, setActiveDetailTab] = useState('my-team');
  const [searchText, setSearchText] = useState('');
  const [complete, setComplete] = useState(false);
  const [showAssignmentPopup, setShowAssignmentPopup] = useState(false);
  const [currentExpenseForAssignment, setCurrentExpenseForAssignment] = useState<number | null>(null);
  
  const [teamMembers, setTeamMembers] = useState<TeamMemberRow[]>([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Nguyễn Văn A',
      department: 'Sales',
      position: 'Nhân viên',
      task: 'Tham gia hội nghị khách hàng',
      hasAn: false,
      hasMac: false,
      hasO: false,
      hasDiLai: false,
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Trần Thị B',
      department: 'Marketing',
      position: 'Trưởng phòng',
      task: 'Thuyết trình sản phẩm mới',
      hasAn: false,
      hasMac: false,
      hasO: false,
      hasDiLai: false,
    },
  ]);

  const [expenseDetails, setExpenseDetails] = useState<ExpenseDetailRow[]>([
    {
      id: 1,
      employeeName: 'Nguyễn Văn A',
      expType: 'Đi lại',
      expCode: 'DL-001',
      expClass: 'Vé máy bay',
      expCategory: 'Business',
      description: 'Đi lại - Vé máy bay - Business',
      positions: 'Giám đốc',
      locationDomestic: true,
      locationInternational: false,
      locationRegion: 'Hà Nội',
      minValue: '500',
      maxValue: '1000',
      uom: 'KM',
      startDate: '2026-01-21',
      endDate: '2026-12-31',
      status: 'Y',
      policyMinValue: '5000000',
      policyMaxValue: '15000000',
      currencyCode: 'VND',
      assignedMembers: [],
    },
  ]);

  const [selectedTeamMembers, setSelectedTeamMembers] = useState<number[]>([]);
  const [selectedExpenseDetails, setSelectedExpenseDetails] = useState<number[]>([]);
  const [tempAssignedMembers, setTempAssignedMembers] = useState<string[]>([]);

  const getStatus = () => {
    if (complete) return 'Complete';
    return 'Draft';
  };

  const handleAddTeamMember = () => {
    const newRow: TeamMemberRow = {
      id: Date.now(),
      employeeId: '',
      employeeName: '',
      department: '',
      position: '',
      task: '',
      hasAn: false,
      hasMac: false,
      hasO: false,
      hasDiLai: false,
    };
    setTeamMembers([...teamMembers, newRow]);
  };

  const handleDeleteTeamMembers = () => {
    setTeamMembers(teamMembers.filter(row => !selectedTeamMembers.includes(row.id)));
    setSelectedTeamMembers([]);
  };

  const handleAddExpenseRow = () => {
    const newRow: ExpenseDetailRow = {
      id: Date.now(),
      employeeName: '',
      expType: '',
      expCode: '',
      expClass: '',
      expCategory: '',
      description: '',
      positions: '',
      locationDomestic: false,
      locationInternational: false,
      locationRegion: '',
      minValue: '',
      maxValue: '',
      uom: '',
      startDate: '',
      endDate: '',
      status: 'Y',
      policyMinValue: '',
      policyMaxValue: '',
      currencyCode: 'VND',
      assignedMembers: [],
    };
    setExpenseDetails([...expenseDetails, newRow]);
  };

  const handleDeleteExpenseRows = () => {
    setExpenseDetails(expenseDetails.filter(row => !selectedExpenseDetails.includes(row.id)));
    setSelectedExpenseDetails([]);
  };

  const toggleTeamSelection = (id: number) => {
    setSelectedTeamMembers(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleExpenseSelection = (id: number) => {
    setSelectedExpenseDetails(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const openAssignmentPopup = (expenseId: number) => {
    const expense = expenseDetails.find(e => e.id === expenseId);
    if (expense) {
      setCurrentExpenseForAssignment(expenseId);
      setTempAssignedMembers([...expense.assignedMembers]);
      setShowAssignmentPopup(true);
    }
  };

  const toggleMemberAssignment = (employeeId: string) => {
    setTempAssignedMembers(prev =>
      prev.includes(employeeId) ? prev.filter(id => id !== employeeId) : [...prev, employeeId]
    );
  };

  const saveAssignment = () => {
    if (currentExpenseForAssignment !== null) {
      setExpenseDetails(expenseDetails.map(exp =>
        exp.id === currentExpenseForAssignment
          ? { ...exp, assignedMembers: [...tempAssignedMembers] }
          : exp
      ));
    }
    setShowAssignmentPopup(false);
    setCurrentExpenseForAssignment(null);
  };

  const toggleExpenseCheckbox = (memberId: number, expenseType: 'An' | 'Mac' | 'O' | 'DiLai', checked: boolean) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (!member) return;

    // Update checkbox state
    setTeamMembers(teamMembers.map(m => {
      if (m.id === memberId) {
        if (expenseType === 'An') return { ...m, hasAn: checked };
        if (expenseType === 'Mac') return { ...m, hasMac: checked };
        if (expenseType === 'O') return { ...m, hasO: checked };
        if (expenseType === 'DiLai') return { ...m, hasDiLai: checked };
      }
      return m;
    }));

    // Auto-generate or remove expense
    const expTypeMap = {
      'An': 'Ăn',
      'Mac': 'Mặc',
      'O': 'Ở',
      'DiLai': 'Đi lại'
    };
    const expType = expTypeMap[expenseType];

    if (checked) {
      // Tạo expense mới
      const newExpense: ExpenseDetailRow = {
        id: Date.now(),
        employeeName: member.employeeName,
        expType: expType,
        expCode: `${expenseType.toUpperCase()}-${Date.now()}`,
        expClass: '',
        expCategory: '',
        description: '',
        positions: member.position || '',
        locationDomestic: false,
        locationInternational: false,
        locationRegion: '',
        minValue: '',
        maxValue: '',
        uom: '',
        startDate: '',
        endDate: '',
        status: 'Y',
        policyMinValue: '',
        policyMaxValue: '',
        currencyCode: 'VND',
        assignedMembers: [member.employeeId],
      };
      setExpenseDetails([...expenseDetails, newExpense]);
    } else {
      // Xóa expense có expType tương ứng và assigned cho member này
      setExpenseDetails(expenseDetails.filter(exp => 
        !(exp.expType === expType && exp.assignedMembers.includes(member.employeeId))
      ));
    }
  };

  const handleNavigateToPaymentRequest = () => {
    if (onNavigateToPaymentRequest) {
      // Aggregate expenses by employee
      const employeeExpenses = new Map<string, any>();
      
      expenseDetails.forEach(expense => {
        if (expense.employeeName) {
          if (!employeeExpenses.has(expense.employeeName)) {
            employeeExpenses.set(expense.employeeName, {
              employeeName: expense.employeeName,
              expenses: [],
              totalAmount: 0
            });
          }
          
          const empData = employeeExpenses.get(expense.employeeName)!;
          const amount = parseFloat(expense.policyMaxValue) || 0;
          empData.expenses.push(expense);
          empData.totalAmount += amount;
        }
      });
      
      // Convert map to array
      const aggregatedData = Array.from(employeeExpenses.values());
      
      onNavigateToPaymentRequest({
        expenseDetails,
        aggregatedByEmployee: aggregatedData,
        teamMembers
      });
    }
  };

  const filteredTeamMembers = teamMembers.filter(row =>
    searchText === '' || 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const filteredExpenseDetails = expenseDetails.filter(row =>
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
          <h2 className="text-lg">Create Travel/Expenses Request</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MAIN TABS - TOP LEVEL */}
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
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

          {/* MAIN INFO TAB */}
          <TabsContent value="main-info" className="p-6">
            {/* 3 BLOCKS TĨNH */}
            <div className="flex gap-6" style={{ width: '1552px' }}>
              
              {/* BLOCK 1 - REQUISITION INFO - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Request Information</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Doc Type
                    </Label>
                    <Select defaultValue="TER">
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TER">Travel</SelectItem>
                        <SelectItem value="TER02">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Trans Type
                    </Label>
                    <Select defaultValue="01">
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="01"></SelectItem>
                        <SelectItem value="02"></SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Request Number
                    </Label>
                    <Input className="bg-pink-50 h-10" placeholder="Auto-generated" disabled />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Request Date
                    </Label>
                    <Input type="date" className="bg-pink-50 h-10" defaultValue="2026-01-21" />
                  </div>

                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">Description</Label>
                    <Input className="h-10" placeholder="Enter description..." />
                  </div>
                </div>
              </div>

              {/* BLOCK 2 - REQUESTER INFO - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Requester Information</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Employee ID
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="EMP001" />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Employee Name
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="Nguyễn Văn A" />
                  </div>

                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Department</Label>
                    <Input className="h-10" defaultValue="Sales" />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">Position</Label>
                    <Input className="h-10" defaultValue="Manager" />
                  </div>
                </div>
              </div>

              {/* BLOCK 3 - STATUS & SETTINGS - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Status & Settings</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Hàng 1: Start Date, End Date, Location */}
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Start Date</Label>
                    <Input type="date" className="h-10" />
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">End Date</Label>
                    <Input type="date" className="h-10" />
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Location</Label>
                    <Input className="h-10" placeholder="Location..." />
                  </div>

                  {/* Hàng 2: Projects (độ dài bằng 3 cột) */}
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">Projects</Label>
                    <Input className="h-10" placeholder="Select project..." />
                  </div>

                  {/* Hàng 3: Complete và Status */}
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Complete</Label>
                    <div className="flex items-center h-10">
                      <Switch checked={complete} onCheckedChange={setComplete} />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> STATUS
                    </Label>
                    <Input 
                      className="h-10 bg-gray-100" 
                      value={getStatus()} 
                      disabled 
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* APPROVAL INFO TAB */}
          <TabsContent value="approval-info" className="p-6">
            {/* Approval Workflow Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Approval Workflow</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Approval Workflow
                    </Label>
                    <Select defaultValue="WF01">
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
                      value="Level 1: Line Manager → Level 2: Department Head → Level 3: Finance Director"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Thông tin phê duyệt đa cấp</h3>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50 border-b">
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold">Sip</th>
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold">Approver</th>
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold">Position</th>
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold">Approval Date</th>
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold">Comments</th>
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">1</td>
                      <td className="px-4 py-3">Trần Văn B</td>
                      <td className="px-4 py-3">Line Manager</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Select>
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
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">2</td>
                      <td className="px-4 py-3">Lê Thị C</td>
                      <td className="px-4 py-3">Department Head</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                          Not Started
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Select disabled>
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
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">3</td>
                      <td className="px-4 py-3">Phạm Văn D</td>
                      <td className="px-4 py-3">Finance Director</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                          Not Started
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Select disabled>
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
                  </tbody>
                </table>
              </div>
            </div>

            {/* History Log */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Lịch sử thao tác</h3>
              <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Tạo Phiếu Đề Nghị Công Tác</p>
                    <p className="text-xs text-gray-500">Nguyễn Văn A - 2026-01-21 09:30</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Gửi phê duyệt Level 1</p>
                    <p className="text-xs text-gray-500">Nguyễn Văn A - 2026-01-21 10:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Chờ phê duyệt Level 1</p>
                    <p className="text-xs text-gray-500">Đang chờ xử lý</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* DETAILS SECTION - SUB TABS */}
        <div className="border-t">
          <Tabs value={activeDetailTab} onValueChange={setActiveDetailTab} className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
              <TabsTrigger 
                value="my-team" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
              >
                My Team
              </TabsTrigger>
              <TabsTrigger 
                value="expenses" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
              >
                Expenses
              </TabsTrigger>
            </TabsList>

            {/* MY TEAM TAB */}
            <TabsContent value="my-team" className="p-6">
              {/* Search and Actions */}
              <div className="flex items-center gap-2 mb-3">
                <Input
                  placeholder="Search All Text Columns"
                  className="w-64 h-8"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="outline" size="sm">Go</Button>
                <Button variant="outline" size="sm">Actions</Button>
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" onClick={handleAddTeamMember}>
                  Add Row
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDeleteTeamMembers}
                  disabled={selectedTeamMembers.length === 0}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Table */}
              <div className="border rounded overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50 border-b">
                      <th className="px-3 py-2 text-left">
                        <Checkbox />
                      </th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Sip</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Employee ID</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Employee Name</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Department</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Position</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Task (Mục đích công tác)</th>
                      <th className="px-3 py-2 text-center text-blue-700 font-semibold">Ăn</th>
                      <th className="px-3 py-2 text-center text-blue-700 font-semibold">Mặc</th>
                      <th className="px-3 py-2 text-center text-blue-700 font-semibold">Ở</th>
                      <th className="px-3 py-2 text-center text-blue-700 font-semibold">Đi lại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeamMembers.map((row, index) => (
                      <tr key={row.id} className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <Checkbox
                            checked={selectedTeamMembers.includes(row.id)}
                            onCheckedChange={() => toggleTeamSelection(row.id)}
                          />
                        </td>
                        <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                        <td className="px-3 py-2">
                          <Input
                            value={row.employeeId}
                            onChange={(e) => {
                              setTeamMembers(teamMembers.map(m => 
                                m.id === row.id ? { ...m, employeeId: e.target.value } : m
                              ));
                            }}
                            className="h-8 w-32"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={row.employeeName}
                            onChange={(e) => {
                              setTeamMembers(teamMembers.map(m => 
                                m.id === row.id ? { ...m, employeeName: e.target.value } : m
                              ));
                            }}
                            className="h-8 w-40"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={row.department}
                            onChange={(e) => {
                              setTeamMembers(teamMembers.map(m => 
                                m.id === row.id ? { ...m, department: e.target.value } : m
                              ));
                            }}
                            className="h-8 w-32"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={row.position}
                            onValueChange={(value) => {
                              setTeamMembers(teamMembers.map(m => 
                                m.id === row.id ? { ...m, position: value } : m
                              ));
                            }}
                          >
                            <SelectTrigger className="h-8 w-36">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {positionOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={row.task}
                            onChange={(e) => {
                              setTeamMembers(teamMembers.map(m => 
                                m.id === row.id ? { ...m, task: e.target.value } : m
                              ));
                            }}
                            className="h-8 w-80"
                            placeholder="Nhập mục đích công tác..."
                          />
                        </td>
                        <td className="px-3 py-2 text-center">
                          <Checkbox
                            checked={row.hasAn}
                            onCheckedChange={(checked) => toggleExpenseCheckbox(row.id, 'An', !!checked)}
                          />
                        </td>
                        <td className="px-3 py-2 text-center">
                          <Checkbox
                            checked={row.hasMac}
                            onCheckedChange={(checked) => toggleExpenseCheckbox(row.id, 'Mac', !!checked)}
                          />
                        </td>
                        <td className="px-3 py-2 text-center">
                          <Checkbox
                            checked={row.hasO}
                            onCheckedChange={(checked) => toggleExpenseCheckbox(row.id, 'O', !!checked)}
                          />
                        </td>
                        <td className="px-3 py-2 text-center">
                          <Checkbox
                            checked={row.hasDiLai}
                            onCheckedChange={(checked) => toggleExpenseCheckbox(row.id, 'DiLai', !!checked)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* EXPENSES TAB */}
            <TabsContent value="expenses" className="p-6">
              {/* Search and Actions */}
              <div className="flex items-center gap-2 mb-3">
                <Input
                  placeholder="Search All Text Columns"
                  className="w-64 h-8"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="outline" size="sm">Go</Button>
                <Button variant="outline" size="sm">Actions</Button>
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" onClick={handleAddExpenseRow}>
                  Add Row
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDeleteExpenseRows}
                  disabled={selectedExpenseDetails.length === 0}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Table - Y CHANG TỪ TRAVEL POLICY */}
              <div className="border rounded overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50 border-b">
                      <th className="px-3 py-2 text-left"><Checkbox /></th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">Sip</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">EMPLOYEE NAME</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">EXP TYPE</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">EXP CODE</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">EXP CLASS</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">EXP CATEGORY</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">DESCRIPTION</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">POSITIONS</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">LOC - TN</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">LOC - NN</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">REGION</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">MIN VALUE</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">MAX VALUE</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">UOM</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">START DATE</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">END DATE</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">STATUS</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">POLICY MIN</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">POLICY MAX</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">CURRENCY</th>
                      <th className="px-3 py-2 text-left text-blue-700 font-semibold">ASSIGNED TO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenseDetails.map((row, index) => (
                      <tr key={row.id} className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <Checkbox
                            checked={selectedExpenseDetails.includes(row.id)}
                            onCheckedChange={() => toggleExpenseSelection(row.id)}
                          />
                        </td>
                        <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                        <td className="px-3 py-2">
                          <Input
                            value={row.employeeName}
                            disabled
                            className="h-8 w-40 bg-gray-50"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={row.expType}
                            onValueChange={(value) => {
                              setExpenseDetails(expenseDetails.map(e =>
                                e.id === row.id ? { ...e, expType: value, expClass: '', expCategory: '', description: '' } : e
                              ));
                            }}
                          >
                            <SelectTrigger className="h-8 w-28">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {expTypeOptions.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={row.expCode}
                            onChange={(e) => {
                              setExpenseDetails(expenseDetails.map(exp =>
                                exp.id === row.id ? { ...exp, expCode: e.target.value } : exp
                              ));
                            }}
                            className="h-8 w-28"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={row.expClass}
                            onValueChange={(value) => {
                              setExpenseDetails(expenseDetails.map(e =>
                                e.id === row.id ? { ...e, expClass: value, expCategory: '', description: '' } : e
                              ));
                            }}
                            disabled={!row.expType}
                          >
                            <SelectTrigger className="h-8 w-36">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {(expClassOptions[row.expType] || []).map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={row.expCategory}
                            onValueChange={(value) => {
                              const desc = `${row.expType} - ${row.expClass} - ${value}`;
                              setExpenseDetails(expenseDetails.map(e =>
                                e.id === row.id ? { ...e, expCategory: value, description: desc } : e
                              ));
                            }}
                            disabled={!row.expClass}
                          >
                            <SelectTrigger className="h-8 w-36">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {(expCategoryOptions[row.expClass] || []).map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Input value={row.description} disabled className="h-8 w-56 bg-gray-50" />
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={row.positions}
                            onValueChange={(value) => {
                              setExpenseDetails(expenseDetails.map(e =>
                                e.id === row.id ? { ...e, positions: value } : e
                              ));
                            }}
                          >
                            <SelectTrigger className="h-8 w-36">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {positionOptions.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Checkbox
                            checked={row.locationDomestic}
                            onCheckedChange={(checked) => {
                              setExpenseDetails(expenseDetails.map(e =>
                                e.id === row.id ? { ...e, locationDomestic: !!checked, locationRegion: '' } : e
                              ));
                            }}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Checkbox
                            checked={row.locationInternational}
                            onCheckedChange={(checked) => {
                              setExpenseDetails(expenseDetails.map(e =>
                                e.id === row.id ? { ...e, locationInternational: !!checked, locationRegion: '' } : e
                              ));
                            }}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={row.locationRegion}
                            onValueChange={(value) => {
                              setExpenseDetails(expenseDetails.map(e =>
                                e.id === row.id ? { ...e, locationRegion: value } : e
                              ));
                            }}
                            disabled={!row.locationDomestic && !row.locationInternational}
                          >
                            <SelectTrigger className="h-8 w-36">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {row.locationDomestic && domesticProvinces.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                              {row.locationInternational && internationalRegionOptions.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={row.minValue}
                            onChange={(e) => {
                              setExpenseDetails(expenseDetails.map(exp =>
                                exp.id === row.id ? { ...exp, minValue: e.target.value } : exp
                              ));
                            }}
                            className="h-8 w-24"
                            type="number"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={row.maxValue}
                            onChange={(e) => {
                              setExpenseDetails(expenseDetails.map(exp =>
                                exp.id === row.id ? { ...exp, maxValue: e.target.value } : exp
                              ));
                            }}
                            className="h-8 w-24"
                            type="number"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={row.uom}
                            onValueChange={(value) => {
                              setExpenseDetails(expenseDetails.map(e =>
                                e.id === row.id ? { ...e, uom: value } : e
                              ));
                            }}
                          >
                            <SelectTrigger className="h-8 w-24">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {uomOptions.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="date"
                            value={row.startDate}
                            onChange={(e) => {
                              setExpenseDetails(expenseDetails.map(exp =>
                                exp.id === row.id ? { ...exp, startDate: e.target.value } : exp
                              ));
                            }}
                            className="h-8 w-36"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="date"
                            value={row.endDate}
                            onChange={(e) => {
                              setExpenseDetails(expenseDetails.map(exp =>
                                exp.id === row.id ? { ...exp, endDate: e.target.value } : exp
                              ));
                            }}
                            className="h-8 w-36"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={row.status}
                            onValueChange={(value) => {
                              setExpenseDetails(expenseDetails.map(e =>
                                e.id === row.id ? { ...e, status: value } : e
                              ));
                            }}
                          >
                            <SelectTrigger className="h-8 w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Y">Y</SelectItem>
                              <SelectItem value="N">N</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={row.policyMinValue}
                            onChange={(e) => {
                              setExpenseDetails(expenseDetails.map(exp =>
                                exp.id === row.id ? { ...exp, policyMinValue: e.target.value } : exp
                              ));
                            }}
                            className="h-8 w-32"
                            type="number"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={row.policyMaxValue}
                            onChange={(e) => {
                              setExpenseDetails(expenseDetails.map(exp =>
                                exp.id === row.id ? { ...exp, policyMaxValue: e.target.value } : exp
                              ));
                            }}
                            className="h-8 w-32"
                            type="number"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={row.currencyCode}
                            onValueChange={(value) => {
                              setExpenseDetails(expenseDetails.map(e =>
                                e.id === row.id ? { ...e, currencyCode: value } : e
                              ));
                            }}
                          >
                            <SelectTrigger className="h-8 w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {currencyOptions.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openAssignmentPopup(row.id)}
                            className="h-8"
                          >
                            Assign ({row.assignedMembers.length})
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="default" onClick={handleNavigateToPaymentRequest}>
            Create Payment Request
          </Button>
          <Button variant="default">Save</Button>
        </div>
      </div>

      {/* Assignment Popup */}
      {showAssignmentPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAssignmentPopup(false)} />
          
          <div className="relative bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h2 className="text-base font-semibold">Assign Expense to Team Members</h2>
              <button
                onClick={() => setShowAssignmentPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => toggleMemberAssignment(member.employeeId)}
                  >
                    <Checkbox
                      checked={tempAssignedMembers.includes(member.employeeId)}
                      onCheckedChange={() => toggleMemberAssignment(member.employeeId)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{member.employeeName}</div>
                      <div className="text-xs text-gray-500">
                        {member.employeeId} • {member.department} • {member.position}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t px-4 py-3 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAssignmentPopup(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={saveAssignment}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}