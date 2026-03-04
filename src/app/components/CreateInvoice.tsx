import { useState } from 'react';
import { X, Search, ChevronDown, Trash2, Save, FileText, Send, Copy } from 'lucide-react';
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
import DeptClearingPopup from './DeptClearingPopup';
import PayScheduleModal from './PayScheduleModal';
import ApplyDocPopup from './ApplyDocPopup';
import OffsetModal from './OffsetModal';

interface CreateInvoiceProps {
  onClose: () => void;
}

interface InvoiceDetailRow {
  id: number;
  sip: number;
  itemCode: string;
  materialName: string;
  description: string;
  uomCode: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  discount: number;
  discountAmount: number;
  taxType: string;
  tax: number;
  accountedAmount: number;
  remainingAmount: number;
  status: string;
  convertUom: string;
  convertQty: number;
  fixedAsset: boolean;
}

interface AccountingRow {
  id: number;
  sip: number;
  credit: string;
  debit: string;
  amount: number;
  accountedAmount: number;
  description: string;
  costCenters: string;
  costElements: string;
  products: string;
  profitCenter: string;
  extensionAnalysis: string;
  projects: string;
}

interface PaymentRunCalendarRow {
  id: number;
  sip: string;
  currencyCode: string;
  description: string;
  total: number;
  paymentRate: number;
  amount: number;
  accountedAmount: number;
  remainingAmount: number;
  dueDate: string;
  penaltyInterest: number;
  status: string;
  notification: string;
}

export default function CreateInvoice({ onClose }: CreateInvoiceProps) {
  const [activeTab, setActiveTab] = useState('main-info');
  const [searchText, setSearchText] = useState('');
  const [complete, setComplete] = useState(false);
  const [posted, setPosted] = useState(false);
  const [paymentRunCalendarEnabled, setPaymentRunCalendarEnabled] = useState(false);
  const [showDeptClearingPopup, setShowDeptClearingPopup] = useState(false);
  const [showPayScheduleModal, setShowPayScheduleModal] = useState(false);
  const [showApplyDocPopup, setShowApplyDocPopup] = useState(false);
  const [showOffsetModal, setShowOffsetModal] = useState(false);
  
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetailRow[]>([
    {
      id: 1,
      sip: 1,
      itemCode: 'LAP001',
      materialName: 'Laptop Dell Inspiron',
      description: 'Laptop cho văn phòng',
      uomCode: 'Cái',
      unitPrice: 15000000,
      quantity: 1,
      amount: 15000000,
      discount: 0,
      discountAmount: 0,
      taxType: 'VAT 10%',
      tax: 1500000,
      accountedAmount: 16500000,
      remainingAmount: 16500000,
      status: 'Active',
      convertUom: 'Cái',
      convertQty: 1,
      fixedAsset: false,
    },
    {
      id: 2,
      sip: 2,
      itemCode: 'SV001',
      materialName: 'Dịch vụ tư vấn',
      description: 'Tư vấn hệ thống',
      uomCode: 'Giờ',
      unitPrice: 500000,
      quantity: 10,
      amount: 5000000,
      discount: 5,
      discountAmount: 250000,
      taxType: 'VAT 10%',
      tax: 500000,
      accountedAmount: 5250000,
      remainingAmount: 5250000,
      status: 'Active',
      convertUom: 'Giờ',
      convertQty: 10,
      fixedAsset: false,
    }
  ]);

  const [accountingData, setAccountingData] = useState<AccountingRow[]>([
    {
      id: 1,
      sip: 1,
      credit: '131',
      debit: '',
      amount: 15000000,
      accountedAmount: 15000000,
      description: 'Phải thu khách hàng',
      costCenters: 'CC01',
      costElements: 'CE01',
      products: 'LAPTOP',
      profitCenter: 'PC01',
      extensionAnalysis: 'EA01',
      projects: 'PRJ001'
    },
    {
      id: 2,
      sip: 2,
      credit: '',
      debit: '511',
      amount: 15000000,
      accountedAmount: 15000000,
      description: 'Doanh thu bán hàng',
      costCenters: 'CC02',
      costElements: 'CE02',
      products: 'SERVICE',
      profitCenter: 'PC02',
      extensionAnalysis: 'EA02',
      projects: 'PRJ002'
    }
  ]);

  const [selectedInvoiceDetails, setSelectedInvoiceDetails] = useState<number[]>([]);
  const [selectedAccounting, setSelectedAccounting] = useState<number[]>([]);
  const [paymentRunCalendarData, setPaymentRunCalendarData] = useState<PaymentRunCalendarRow[]>([
    {
      id: 1,
      sip: 'PP001',
      currencyCode: 'VND',
      description: 'Thanh toán đợt 1',
      total: 0,
      paymentRate:0,
      amount:0,
      accountedAmount:0,
      remainingAmount:0 ,
      dueDate: '2026-02-15',
      penaltyInterest:0 ,
      status: 'Scheduled',
      notification: 'Gửi thông báo trước 7 ngày'
    }
  ]);
  const [selectedPaymentRun, setSelectedPaymentRun] = useState<number[]>([]);

  const getStatus = () => {
    if (posted) return 'Posted';
    if (complete) return 'Complete';
    return 'Draft';
  };

  const handleAddInvoiceRow = () => {
    const newRow: InvoiceDetailRow = {
      id: invoiceDetails.length + 1,
      sip: invoiceDetails.length + 1,
      itemCode: '',
      materialName: '',
      description: '',
      uomCode: '',
      unitPrice: 0,
      quantity: 0,
      amount: 0,
      discount: 0,
      discountAmount: 0,
      taxType: '',
      tax: 0,
      accountedAmount: 0,
      remainingAmount: 0,
      status: getStatus(),
      convertUom: '',
      convertQty: 0,
      fixedAsset: false,
    };
    setInvoiceDetails([...invoiceDetails, newRow]);
  };

  const handleDeleteInvoiceRows = () => {
    setInvoiceDetails(invoiceDetails.filter(row => !selectedInvoiceDetails.includes(row.id)));
    setSelectedInvoiceDetails([]);
  };

  const handleAddAccountingRow = () => {
    const newRow: AccountingRow = {
      id: accountingData.length + 1,
      sip: accountingData.length + 1,
      credit: '',
      debit: '',
      amount: 0,
      accountedAmount: 0,
      description: '',
      costCenters: '',
      costElements: '',
      products: '',
      profitCenter: '',
      extensionAnalysis: '',
      projects: ''
    };
    setAccountingData([...accountingData, newRow]);
  };

  const handleDeleteAccountingRows = () => {
    setAccountingData(accountingData.filter(row => !selectedAccounting.includes(row.id)));
    setSelectedAccounting([]);
  };

  const toggleInvoiceSelection = (id: number) => {
    setSelectedInvoiceDetails(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAccountingSelection = (id: number) => {
    setSelectedAccounting(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddPaymentRunRow = () => {
    if (!paymentRunCalendarEnabled) return;
    const newRow: PaymentRunCalendarRow = {
      id: paymentRunCalendarData.length + 1,
      sip: `PP${(paymentRunCalendarData.length + 1).toString().padStart(3, '0')}`,
      currencyCode: 'VND',
      description: '',
      total: 0,
      paymentRate: 0,
      amount: 0,
      accountedAmount: 0,
      remainingAmount: 0,
      dueDate: '',
      penaltyInterest: 0,
      status: 'Draft',
      notification: ''
    };
    setPaymentRunCalendarData([...paymentRunCalendarData, newRow]);
  };

  const handleDeletePaymentRunRows = () => {
    if (!paymentRunCalendarEnabled) return;
    setPaymentRunCalendarData(paymentRunCalendarData.filter(row => !selectedPaymentRun.includes(row.id)));
    setSelectedPaymentRun([]);
  };

  const togglePaymentRunSelection = (id: number) => {
    setSelectedPaymentRun(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredInvoiceDetails = invoiceDetails.filter(row =>
    searchText === '' || 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const filteredAccountingData = accountingData.filter(row =>
    searchText === '' || 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Create Sales Invoice</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Action Buttons - New Design */}
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white" onClick={() => setShowOffsetModal(true)}>
              <Search className="w-4 h-4 mr-1" />
              Offset
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Tính thuế
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowApplyDocPopup(true)}>
              Apply Doc
            </Button>
            
            
            
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 ml-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
            <TabsTrigger 
              value="main-info" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
              style={{ width: '440px' }}
            >
              Main Info
            </TabsTrigger>
            <TabsTrigger 
              value="financial-info"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 ml-6"
              style={{ width: '440px' }}
            >
              Financial Info
            </TabsTrigger>
            <TabsTrigger 
              value="approval-info"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 ml-6"
              style={{ width: '440px' }}
            >
              Approval Info
            </TabsTrigger>
          </TabsList>

          {/* Main Info Tab */}
          <TabsContent value="main-info" className="p-0">
            {/* 3 BLOCKS */}
            <div className="flex gap-6 mb-6 px-6 mt-6" style={{ width: '1600px' }}>
              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">CUSTOMER / TAX INFO</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Tax Id
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tax1">0123456789</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Customer Name
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer1">CÔNG TY TRÁCH NHIỆM HỮU HẠN MỘT THÀNH VIÊN</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Label className="text-sm mb-1 block">Address</Label>
                      <Input className="h-10" />
                    </div>
                    <div className="col-span-3">
                      <Label className="text-sm mb-1 block">Description</Label>
                      <Input className="h-10" />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">INVOICE GENERAL INFORMATION</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Transaction Type
                      </Label>
                      <Select defaultValue="12">
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                     <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Invoice Type
                      </Label>
                      <Select defaultValue="sale">
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">Hóa đơn bán hàng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Payment Term
                      </Label>
                      <Input className="bg-pink-50 h-10" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">Invoice Form</Label>
                      <Input className="h-10" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Invoice Number
                      </Label>
                      <Input className="bg-pink-50 h-10" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">Invoice Date</Label>
                      <Input type="date" className="h-10" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">Complete</Label>
                      <div className="flex items-center h-10">
                        <Switch checked={complete} onCheckedChange={setComplete} />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">Post</Label>
                      <div className="flex items-center h-10">
                        <Switch checked={posted} onCheckedChange={setPosted} />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">Payment Method</Label>
                      <Input value="Tiền mặt" className="h-10" />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">STATUS & DATE</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Status
                      </Label>
                      <Select defaultValue="open">
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">Posting Date</Label>
                      <Input type="date" className="h-10" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">Due Date</Label>
                      <Input type="date" className="h-10" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Amount
                      </Label>
                      <Input className="bg-pink-50 h-10" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Amount Tax
                      </Label>
                      <Input className="bg-pink-50 h-10" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Total Amount
                      </Label>
                      <Input className="bg-pink-50 h-10" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Remaining Amount
                      </Label>
                      <Input className="bg-pink-50 h-10" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Acc Rem Amount
                      </Label>
                      <Input className="bg-pink-50 h-10" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> Total Acc Amount
                      </Label>
                      <Input className="bg-pink-50 h-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Details Section */}
            <div className="mt-6">
              <Tabs defaultValue="invoice-details" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
                  <TabsTrigger 
                    value="invoice-details"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                    style={{ width: '440px' }}
                  >
                    Invoice Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="accounting"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 ml-6"
                    style={{ width: '440px' }}
                  >
                    Accounting
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pay-schedule"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 ml-6"
                    style={{ width: '440px' }}
                  >
                    Pay Schedule
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="invoice-details" className="mt-4">
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
                    <Button variant="outline" size="sm" onClick={handleAddInvoiceRow}>Add Row</Button>
                    <Button variant="outline" size="sm" onClick={handleDeleteInvoiceRows} disabled={selectedInvoiceDetails.length === 0}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="border rounded overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50 border-b">
                          <th className="px-3 py-2 text-left">
                            <Checkbox />
                          </th>
                          <th className="px-3 py-2 text-left text-blue-700">Sip</th>
                          <th className="px-3 py-2 text-left text-blue-700">Item Code</th>
                          <th className="px-3 py-2 text-left text-blue-700">Material Name</th>
                          <th className="px-3 py-2 text-left text-blue-700">Description</th>
                          <th className="px-3 py-2 text-left text-blue-700">UOM Code</th>
                          <th className="px-3 py-2 text-left text-blue-700">Quantity</th>
                          <th className="px-3 py-2 text-left text-blue-700">Unit Price</th>
                          <th className="px-3 py-2 text-left text-blue-700">Amount</th>
                          <th className="px-3 py-2 text-left text-blue-700">Tax Type</th>
                          <th className="px-3 py-2 text-left text-blue-700">Tax</th>
                          <th className="px-3 py-2 text-left text-blue-700">Discount (%)</th>
                          <th className="px-3 py-2 text-left text-blue-700">Discount Amount</th>
                          <th className="px-3 py-2 text-left text-blue-700">Accounted Amount</th>
                          <th className="px-3 py-2 text-left text-blue-700">Remaining Amount</th>
                          <th className="px-3 py-2 text-left text-blue-700">Status</th>
                          <th className="px-3 py-2 text-left text-blue-700">Convert UOM</th>
                          <th className="px-3 py-2 text-left text-blue-700">Convert Qty</th>
                          <th className="px-3 py-2 text-left text-blue-700">Fixed Asset</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvoiceDetails.map(row => (
                          <tr key={row.id} className="border-b">
                            <td className="px-3 py-2">
                              <Checkbox 
                                checked={selectedInvoiceDetails.includes(row.id)}
                                onCheckedChange={() => toggleInvoiceSelection(row.id)}
                              />
                            </td>
                            <td className="px-3 py-2">{row.sip}</td>
                            <td className="px-3 py-2">{row.itemCode}</td>
                            <td className="px-3 py-2">{row.materialName}</td>
                            <td className="px-3 py-2">{row.description}</td>
                            <td className="px-3 py-2">{row.uomCode}</td>
                            <td className="px-3 py-2">{row.quantity}</td>
                            <td className="px-3 py-2">{row.unitPrice.toLocaleString()}</td>
                            <td className="px-3 py-2">{row.amount.toLocaleString()}</td>
                            <td className="px-3 py-2">{row.taxType}</td>
                            <td className="px-3 py-2">{row.tax.toLocaleString()}</td>
                            <td className="px-3 py-2">{row.discount}%</td>
                            <td className="px-3 py-2">{row.discountAmount.toLocaleString()}</td>
                            <td className="px-3 py-2">{row.accountedAmount.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right">{row.remainingAmount.toLocaleString()}</td>
                            <td className="px-3 py-2">
                              <Input value={getStatus()} disabled className="h-8 bg-gray-100" />
                            </td>
                            <td className="px-3 py-2">{row.convertUom}</td>
                            <td className="px-3 py-2">{row.convertQty}</td>
                            <td className="px-3 py-2">
                              <Checkbox 
                                checked={row.fixedAsset}
                                onCheckedChange={() => {
                                  const updatedRow = { ...row, fixedAsset: !row.fixedAsset };
                                  setInvoiceDetails(prev => prev.map(r => r.id === row.id ? updatedRow : r));
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="text-right text-sm text-gray-600 mt-2">
                    Total: {filteredInvoiceDetails.length}
                  </div>
                </TabsContent>

                <TabsContent value="accounting">
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
                    <Button variant="outline" size="sm" onClick={handleAddAccountingRow}>Add Row</Button>
                    <Button variant="outline" size="sm" onClick={handleDeleteAccountingRows} disabled={selectedAccounting.length === 0}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="default" size="sm">Save</Button>
                  </div>

                  <div className="border rounded overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50 border-b">
                          <th className="px-3 py-2 text-left">
                            <Checkbox />
                          </th>
                          <th className="px-3 py-2 text-left text-blue-700">Sip</th>
                          <th className="px-3 py-2 text-left text-blue-700">Credit</th>
                          <th className="px-3 py-2 text-left text-blue-700">Debit</th>
                          <th className="px-3 py-2 text-left text-blue-700">Amount</th>
                          <th className="px-3 py-2 text-left text-blue-700">Accounted Amount</th>
                          <th className="px-3 py-2 text-left text-blue-700">Description</th>
                          <th className="px-3 py-2 text-left text-blue-700">Cost Centers</th>
                          <th className="px-3 py-2 text-left text-blue-700">Cost Elements</th>
                          <th className="px-3 py-2 text-left text-blue-700">Products</th>
                          <th className="px-3 py-2 text-left text-blue-700">Profit Center</th>
                          <th className="px-3 py-2 text-left text-blue-700">Extension Analysis</th>
                          <th className="px-3 py-2 text-left text-blue-700">Projects</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAccountingData.map(row => (
                          <tr key={row.id} className="border-b">
                            <td className="px-3 py-2">
                              <Checkbox 
                                checked={selectedAccounting.includes(row.id)}
                                onCheckedChange={() => toggleAccountingSelection(row.id)}
                              />
                            </td>
                            <td className="px-3 py-2">{row.sip}</td>
                            <td className="px-3 py-2">{row.credit}</td>
                            <td className="px-3 py-2">{row.debit}</td>
                            <td className="px-3 py-2">{row.amount.toLocaleString()}</td>
                            <td className="px-3 py-2">{row.accountedAmount.toLocaleString()}</td>
                            <td className="px-3 py-2">{row.description}</td>
                            <td className="px-3 py-2">{row.costCenters}</td>
                            <td className="px-3 py-2">{row.costElements}</td>
                            <td className="px-3 py-2">{row.products}</td>
                            <td className="px-3 py-2">{row.profitCenter}</td>
                            <td className="px-3 py-2">{row.extensionAnalysis}</td>
                            <td className="px-3 py-2">{row.projects}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 font-semibold border-t-2">
                          <td className="px-3 py-2">TOTAL</td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2 text-right">
                            {filteredAccountingData.reduce((sum, row) => sum + row.amount, 0).toLocaleString()}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {filteredAccountingData.reduce((sum, row) => sum + row.accountedAmount, 0).toLocaleString()}
                          </td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-right text-sm text-gray-600 mt-2">
                    Total: {filteredAccountingData.length}
                  </div>
                </TabsContent>

                <TabsContent value="pay-schedule" className="mt-4">
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
                    <Button variant="outline" size="sm">Add Row</Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowPayScheduleModal(true)}>
                      Pay Schedule
                    </Button>
                  </div>

                  <div className="border rounded overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50 border-b">
                          <th className="px-3 py-2 text-left">
                            <Checkbox />
                          </th>
                          <th className="px-3 py-2 text-left text-blue-700">SIP</th>
                          <th className="px-3 py-2 text-left text-blue-700">Currency Code</th>
                          <th className="px-3 py-2 text-left text-blue-700">Description</th>
                          <th className="px-3 py-2 text-right text-blue-700">Total</th>
                          <th className="px-3 py-2 text-right text-blue-700">Payment Rate %</th>
                          <th className="px-3 py-2 text-right text-blue-700">Amount</th>
                          <th className="px-3 py-2 text-right text-blue-700">Accounted Amount</th>
                          <th className="px-3 py-2 text-right text-blue-700">Remaining Amount</th>
                          <th className="px-3 py-2 text-left text-blue-700">Due Date</th>
                          <th className="px-3 py-2 text-right text-blue-700">Penalty Interest</th>
                          <th className="px-3 py-2 text-left text-blue-700">Status</th>
                          <th className="px-3 py-2 text-left text-blue-700">Notification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentRunCalendarData.map(row => (
                          <tr key={row.id} className="border-b">
                            <td className="px-3 py-2">
                              <Checkbox 
                                checked={selectedPaymentRun.includes(row.id)}
                                onCheckedChange={() => togglePaymentRunSelection(row.id)}
                              />
                            </td>
                            <td className="px-3 py-2">{row.sip}</td>
                            <td className="px-3 py-2">{row.currencyCode}</td>
                            <td className="px-3 py-2">{row.description}</td>
                            <td className="px-3 py-2 text-right">{row.total.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right">{row.paymentRate}%</td>
                            <td className="px-3 py-2 text-right">{row.amount.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right">{row.accountedAmount.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right">{row.remainingAmount.toLocaleString()}</td>
                            <td className="px-3 py-2">{row.dueDate}</td>
                            <td className="px-3 py-2 text-right">{row.penaltyInterest}</td>
                            <td className="px-3 py-2">{row.status}</td>
                            <td className="px-3 py-2">{row.notification}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-right text-sm text-gray-600 mt-2">
                    Total: {paymentRunCalendarData.length}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* Financial Info Tab */}
          <TabsContent value="financial-info" className="p-6">
            <div className="flex gap-6 mb-6" style={{ width: '1552px' }}>
              <div style={{ width: '880px' }}>
                <h3 className="text-sm mb-4">Tax Info & Shipping To Info</h3>
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Object Id Tax</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tax001">TAX001</SelectItem>
                        <SelectItem value="tax002">TAX002</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">Object Name Tax</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select tax object" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tax1">TỔNG CỤC THUẾ</SelectItem>
                        <SelectItem value="tax2">CỤC THUẾ TP.HCM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Obj Id Shipping</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ship001">SHIP001</SelectItem>
                        <SelectItem value="ship002">SHIP002</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">Object Name Shipping To</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select shipping destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ship1">CHI NHÁNH HÀ NỘI</SelectItem>
                        <SelectItem value="ship2">CHI NHÁNH TP.HCM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">Object Address Tax</Label>
                    <Input placeholder="Địa chỉ cơ quan thuế" className="h-10" />
                  </div>
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">Object Address Shipping To</Label>
                    <Input placeholder="Địa chỉ giao hàng" className="h-10" />
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">For e invoice</Label>
                    <div className="flex items-center h-10">
                      <Switch />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">For Report</Label>
                    <div className="flex items-center h-10">
                      <Switch />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Payment Schedule</Label>
                    <div className="flex items-center h-10">
                      <Switch 
                        checked={paymentRunCalendarEnabled} 
                        onCheckedChange={setPaymentRunCalendarEnabled} 
                      />
                    </div>
                  </div>
                  <div className="col-span-3"></div>
                </div>
              </div>

              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4">Financial Info & Exchange Rate</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Fiscal Year
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="2025" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Ape Id
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue placeholder="Select APE" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ape1">APE001</SelectItem>
                        <SelectItem value="ape2">APE002</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Currency Code
                    </Label>
                    <Select defaultValue="vnd">
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">VND</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Exc Rate Type
                    </Label>
                    <Select defaultValue="type1">
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="type1">Daily</SelectItem>
                        <SelectItem value="type2">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Exchange Date
                    </Label>
                    <Input type="date" className="bg-pink-50 h-10" defaultValue="2025-12-07" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Exchange Rate
                    </Label>
                    <Input defaultValue="1.00" className="bg-pink-50 h-10" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Gl Date
                    </Label>
                    <Input type="date" className="bg-pink-50 h-10" defaultValue="2025-12-07" />
                  </div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Tabs defaultValue="invoice-details" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
                  <TabsTrigger 
                    value="invoice-details"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                    style={{ width: '440px' }}
                  >
                    Invoice Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="accounting"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 ml-6"
                    style={{ width: '440px' }}
                  >
                    Accounting
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="invoice-details" className="mt-4">
                  <div className="text-center text-gray-500 py-8">
                    Invoice Details (Same as Main Info tab)
                  </div>
                </TabsContent>
                <TabsContent value="accounting">
                  <div className="text-center text-gray-500 py-8">
                    Accounting Details (Same as Main Info tab)
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* Approval Info Tab */}
          <TabsContent value="approval-info" className="p-6">
            <div className="mb-6">
              <h3 className="text-sm mb-4">Approval Workflow</h3>
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
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Level 1</td>
                      <td className="px-4 py-3">Trần Văn B</td>
                      <td className="px-4 py-3">Manager</td>
                      <td className="px-4 py-3">2026-01-17</td>
                      <td className="px-4 py-3">Đồng ý</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                          Approved
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
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Level 2</td>
                      <td className="px-4 py-3">Lê Thị C</td>
                      <td className="px-4 py-3">Director</td>
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
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm mb-4">Lịch sử thao tác</h3>
              <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Tạo hóa đơn bán hàng</p>
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
                    <p className="text-sm font-medium">Chờ phê duyt Level 2</p>
                    <p className="text-xs text-gray-500">Đang chờ xử lý</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        
      </div>

      {showDeptClearingPopup && (
        <DeptClearingPopup 
          type="invoice" 
          onClose={() => setShowDeptClearingPopup(false)} 
        />
      )}

      {showPayScheduleModal && (
        <PayScheduleModal 
          onClose={() => setShowPayScheduleModal(false)} 
        />
      )}

      {showApplyDocPopup && (
        <ApplyDocPopup 
          onClose={() => setShowApplyDocPopup(false)} 
        />
      )}
      <OffsetModal 
        isOpen={showOffsetModal} 
        onClose={() => setShowOffsetModal(false)} 
        type="sales" 
      />
    </div>
  );
}