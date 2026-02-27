import { useState } from 'react';
import { X, Search, ChevronDown, ChevronRight, Trash2, Paperclip, FileCheck } from 'lucide-react';
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
import ContractInvoiceMatchPopup from './ContractInvoiceMatchPopup';

interface CreatePaymentRequestProps {
  onClose: () => void;
  initialTransactionType?: string;
  data?: any;
}

interface DetailRow {
  id: number;
  sip: number;
  currencyCode: string;
  exchangeRate: number;
  exchangeDate: string;
  exchangeType: string;
  originalAmount: number;
  remainingAmount: number;
  requestAmount: number;
  requestAccAmount: number;
  approvedAmount: number;
  approvedAccAmount: number;
  description: string;
}

interface AccountingRow {
  id: number;
  sip: number;
  objectId: string;
  objectName: string;
  address: string;
  credit: string;
  debit: string;
  currencyCode: string;
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

export default function CreatePaymentRequest({ onClose, initialTransactionType, data }: CreatePaymentRequestProps) {
  const [mainTab, setMainTab] = useState('main-info');
  const [detailsTab, setDetailsTab] = useState('payment-request-details');
  const [searchText, setSearchText] = useState('');
  const [showContractMatchPopup, setShowContractMatchPopup] = useState(false);
  const [expandedPurpose, setExpandedPurpose] = useState<string | null>(null);
  const [showMatchColumns, setShowMatchColumns] = useState<{
    contract: boolean;
    invoice: boolean;
    receiptPayment: boolean;
  }>({
    contract: false,
    invoice: false,
    receiptPayment: false
  });
  
  const [detailRows, setDetailRows] = useState<DetailRow[]>([
    {
      id: 1,
      sip: 1,
      currencyCode: 'VND',
      exchangeRate: 1,
      exchangeDate: new Date().toISOString().split('T')[0],
      exchangeType: 'SPOT',
      originalAmount: 20000000,
      remainingAmount: 20000000,
      requestAmount: 20000000,
      requestAccAmount: 20000000,
      approvedAmount: 0,
      approvedAccAmount: 0,
      description: 'Đề nghị thanh toán hóa đơn mua #001'
    }
  ]);

  const [accountingData, setAccountingData] = useState<AccountingRow[]>([
    {
      id: 1,
      sip: 1,
      objectId: 'OBJ001',
      objectName: 'NHÀ CUNG CẤP ABC',
      address: '456 Trần Hưng Đạo, Q1, TP.HCM',
      credit: '111',
      debit: '',
      currencyCode: 'VND',
      amount: 20000000,
      accountedAmount: 20000000,
      description: 'Tiền mặt',
      costCenters: 'CC01',
      costElements: 'CE01',
      products: '',
      profitCenter: 'PC01',
      extensionAnalysis: 'EA01',
      projects: 'PRJ001'
    },
    {
      id: 2,
      sip: 2,
      objectId: 'OBJ001',
      objectName: 'NHÀ CUNG CẤP ABC',
      address: '456 Trần Hưng Đạo, Q1, TP.HCM',
      credit: '',
      debit: '331',
      currencyCode: 'VND',
      amount: 0,
      accountedAmount: 20000000,
      description: 'Phải trả người bán',
      costCenters: 'CC02',
      costElements: 'CE02',
      products: '',
      profitCenter: 'PC02',
      extensionAnalysis: 'EA02',
      projects: 'PRJ002'
    }
  ]);

  const [selectedDetails, setSelectedDetails] = useState<number[]>([]);
  const [selectedAccounting, setSelectedAccounting] = useState<number[]>([]);

  const handleAddDetailRow = () => {
    const newRow: DetailRow = {
      id: detailRows.length + 1,
      sip: detailRows.length + 1,
      currencyCode: 'VND',
      exchangeRate: 1,
      exchangeDate: new Date().toISOString().split('T')[0],
      exchangeType: 'SPOT',
      originalAmount: 0,
      remainingAmount: 0,
      requestAmount: 0,
      requestAccAmount: 0,
      approvedAmount: 0,
      approvedAccAmount: 0,
      description: ''
    };
    setDetailRows([...detailRows, newRow]);
  };

  const handleDeleteDetailRows = () => {
    setDetailRows(detailRows.filter(row => !selectedDetails.includes(row.id)));
    setSelectedDetails([]);
  };

  const handleAddAccountingRow = () => {
    const newRow: AccountingRow = {
      id: accountingData.length + 1,
      sip: accountingData.length + 1,
      objectId: '',
      objectName: '',
      address: '',
      credit: '',
      debit: '',
      currencyCode: 'VND',
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

  const toggleDetailSelection = (id: number) => {
    setSelectedDetails(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAccountingSelection = (id: number) => {
    setSelectedAccounting(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredDetails = detailRows.filter(row =>
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

  // Details Section Component (reusable)
  const DetailsSection = () => (
    <div className="mt-6">
      <Tabs value={detailsTab} onValueChange={setDetailsTab} className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
          <TabsTrigger 
            value="payment-request-details"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
          >
            PAYMENT REQUEST DETAILS
          </TabsTrigger>
        </TabsList>

        {/* SUB-TAB 1: PAYMENT REQUEST DETAILS */}
        <TabsContent value="payment-request-details" className="mt-4">
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
            <Button variant="outline" size="sm" onClick={handleAddDetailRow}>Add Row</Button>
            <Button variant="outline" size="sm" onClick={handleDeleteDetailRows} disabled={selectedDetails.length === 0}>
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowContractMatchPopup(true)}>
              <FileCheck className="w-4 h-4 mr-1" />
              Đối chiếu hợp đồng invoice
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
                  <th className="px-3 py-2 text-left text-blue-700">S/P</th>
                  <th className="px-3 py-2 text-left text-blue-700">CURRENCY CODE</th>
                  <th className="px-3 py-2 text-left text-blue-700">EXCHANGE RATE</th>
                  <th className="px-3 py-2 text-left text-blue-700">EXCHANGE DATE</th>
                  <th className="px-3 py-2 text-left text-blue-700">EXCHANGE TYPE</th>
                  <th className="px-3 py-2 text-left text-blue-700">ORIGINAL AMOUNT</th>
                  <th className="px-3 py-2 text-left text-blue-700">REMAINING AMOUNT</th>
                  <th className="px-3 py-2 text-left text-blue-700">REQUEST AMOUNT</th>
                  <th className="px-3 py-2 text-left text-blue-700">REQUEST ACC AMOUNT</th>
                  <th className="px-3 py-2 text-left text-blue-700">APPROVED AMOUNT</th>
                  <th className="px-3 py-2 text-left text-blue-700">APPROVED ACC AMOUNT</th>
                  <th className="px-3 py-2 text-left text-blue-700">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredDetails.map(row => (
                  <tr key={row.id} className="border-b">
                    <td className="px-3 py-2">
                      <Checkbox 
                        checked={selectedDetails.includes(row.id)}
                        onCheckedChange={() => toggleDetailSelection(row.id)}
                      />
                    </td>
                    <td className="px-3 py-2">{row.sip}</td>
                    <td className="px-3 py-2">
                      <Select defaultValue={row.currencyCode}>
                        <SelectTrigger className="h-8 w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VND">VND</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="JPY">JPY</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2">
                      <Input 
                        type="number" 
                        className="h-8 w-24" 
                        defaultValue={row.exchangeRate}
                        step="0.0001"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Input 
                        type="date" 
                        className="h-8 w-32" 
                        defaultValue={row.exchangeDate}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Select defaultValue={row.exchangeType}>
                        <SelectTrigger className="h-8 w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SPOT">Spot</SelectItem>
                          <SelectItem value="FORWARD">Forward</SelectItem>
                          <SelectItem value="FIXED">Fixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 text-right">{row.originalAmount.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right">{row.remainingAmount.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right">
                      <Input 
                        type="number" 
                        className="h-8 w-32 text-right" 
                        defaultValue={row.requestAmount}
                      />
                    </td>
                    <td className="px-3 py-2 text-right">{row.requestAccAmount.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right">
                      <Input 
                        type="number" 
                        className="h-8 w-32 text-right" 
                        defaultValue={row.approvedAmount}
                      />
                    </td>
                    <td className="px-3 py-2 text-right">{row.approvedAccAmount.toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <Input 
                        className="h-8 w-48" 
                        defaultValue={row.description}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-right text-sm text-gray-600 mt-2">
            Total: {filteredDetails.length}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
      {/* CONTAINER TĨNH 1600px */}
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg">CREATE PAYMENT REQUEST</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TOP LEVEL TABS */}
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
            <TabsTrigger 
              value="main-info"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
            >
              Main Info
            </TabsTrigger>
            <TabsTrigger 
              value="financial-info"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
            >
              Financial Info
            </TabsTrigger>
            <TabsTrigger 
              value="document-checklist"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
            >
              Document Checklist
            </TabsTrigger>
            <TabsTrigger 
              value="approval-info"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
            >
              Approval Info
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: MAIN INFO */}
          <TabsContent value="main-info" className="p-6">
            {/* 3 BLOCKS TĨNH CỐ ĐỊNH */}
            <div className="flex gap-6 mb-6" style={{ width: '1552px' }}>
              
              {/* BLOCK 1 - DOCUMENT INFORMATION - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">DOCUMENT INFORMATION</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Row 1 - PRE ID (1 col) + PRE Number (1 col) + PRE Date (1 col) */}
                  <div>
                    <Label className="text-sm mb-1 block">PRE ID</Label>
                    <Input 
                      className="h-10 bg-gray-100" 
                      value={data?.preId || 'Auto generate'} 
                      disabled 
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> PRE NUMBER
                    </Label>
                    <Input 
                      className="bg-pink-50 h-10" 
                      placeholder="Auto: TYPE-MMYY-AAA"
                      defaultValue={data?.preNumber}
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> PRE DATE
                    </Label>
                    <Input 
                      type="date" 
                      className="bg-pink-50 h-10" 
                      defaultValue={data?.preDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Row 2 - PRE Type (1 col) + Priority (1 col) + Legal Entity (1 col) */}
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> PRE TYPE
                    </Label>
                    <Select defaultValue={data?.preType || "PAYMENT"}>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PAYMENT">Thanh toán</SelectItem>
                        <SelectItem value="PARTY">Thanh toán hộ</SelectItem>
                        <SelectItem value="OTHER">Thanh toán khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">PRIORITY</Label>
                    <Select defaultValue={data?.priority || "NORMAL"}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                        <SelectItem value="NORMAL">Normal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> LEGAL ENTITY
                    </Label>
                    <Select defaultValue={data?.lenId || "len1"}>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="len1">CÔNG TY CP ABC</SelectItem>
                        <SelectItem value="len2">CHI NHÁNH HÀ NỘI</SelectItem>
                        <SelectItem value="len3">CHI NHÁNH ĐÀ NẴNG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Row 3 - Status (1 col) + Description (2 cols) */}
                  <div>
                    <Label className="text-sm mb-1 block">STATUS</Label>
                    <Select defaultValue={data?.status || "D"}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="D">Draft</SelectItem>
                        <SelectItem value="A">Approved</SelectItem>
                        <SelectItem value="P">Partial</SelectItem>
                        <SelectItem value="F">Finish</SelectItem>
                        <SelectItem value="R">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">DESCRIPTION</Label>
                    <Input 
                      className="h-10"
                      placeholder="Thanh toán công nợ tháng 10 NCC ABC..."
                      defaultValue={data?.description}
                    />
                  </div>
                </div>
              </div>

              {/* BLOCK 2 - REQUESTER INFORMATION - WIDTH: 520px */}
              <div style={{ width: '520px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">REQUESTER INFORMATION</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Row 1 - Requester ID (1 col) + Requester Name (2 cols) */}
                  <div>
                    <Label className="text-sm mb-1 block">REQUESTER ID</Label>
                    <Input 
                      className="h-10" 
                      defaultValue={data?.requesterId || "U001"}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">REQUESTER NAME</Label>
                    <Input 
                      className="h-10" 
                      defaultValue={data?.requesterName || "Nguyễn Văn A"}
                    />
                  </div>

                  {/* Row 2 - Department (3 cols full width) */}
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">DEPARTMENT (CCE)</Label>
                    <Select defaultValue={data?.cceId || "dept1"}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dept1">Ban Phòng Chế</SelectItem>
                        <SelectItem value="dept2">Phòng Kế Toán</SelectItem>
                        <SelectItem value="dept3">Phòng Tài Chính</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* BLOCK 3 - DEBT OBJECT & PAYEE INFORMATION - WIDTH: 520px */}
              <div style={{ width: '520px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">DEBT OBJECT & PAYEE INFORMATION</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Row 1 - Debt Object ID (1 col) + Debt Object Name (2 cols) */}
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> OBJ ID (Debt)
                    </Label>
                    <div className="relative">
                      <Input 
                        className="bg-pink-50 h-10 pr-10" 
                        defaultValue={data?.objId || "ICH-001"}
                      />
                      <button 
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        type="button"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">OBJ NAME (Debt)</Label>
                    <Input 
                      className="h-10" 
                      defaultValue={data?.objName || "Công ty TNHH ABC"}
                    />
                  </div>

                  {/* Row 2 - Payee Object ID (1 col) + Payee Name (2 cols) */}
                  <div>
                    <Label className="text-sm mb-1 block">PAYEE OBJ ID</Label>
                    <div className="relative">
                      <Input 
                        className="h-10 pr-10" 
                        defaultValue={data?.payeeObjId || data?.objId || "ICH-001"}
                      />
                      <button 
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        type="button"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">PAYEE NAME</Label>
                    <Input 
                      className="h-10" 
                      defaultValue={data?.payeeName || data?.objName || "Công ty TNHH ABC"}
                    />
                  </div>

                  {/* Row 3 - Beneficiary Bank Account (3 cols full width) */}
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">BENEFICIARY BANK ACCOUNT</Label>
                    <Select defaultValue={data?.beneficiaryBacId || "bac1"}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bac1">Vietcombank - 0123456789</SelectItem>
                        <SelectItem value="bac2">BIDV - 9876543210</SelectItem>
                        <SelectItem value="bac3">Techcombank - 1122334455</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Row 4 - Note (3 cols full width) */}
                  <div className="col-span-3">
                    <p className="text-xs text-gray-500 italic">
                      Note: PAYEE có thể trùng hoặc khác với DEBT OBJECT (VD: Thanh toán hộ)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <DetailsSection />
          </TabsContent>

          {/* TAB 2: FINANCIAL INFO */}
          <TabsContent value="financial-info" className="p-6">
            <div className="flex gap-6 mb-6" style={{ width: '1552px' }}>
              
              {/* BLOCK 1 - PAYMENT METHOD & CURRENCY - WIDTH: 520px */}
              <div style={{ width: '520px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">PAYMENT METHOD & CURRENCY</h3>
                <div className="grid grid-cols-2 gap-4">
                  
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> PAYMENT METHOD
                    </Label>
                    <Select defaultValue={data?.paymentMethod || "TRANSFER"}>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CASH">Cash (Tiền mặt)</SelectItem>
                        <SelectItem value="TRANSFER">Transfer (Chuyển khoản)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> CURRENCY CODE
                    </Label>
                    <Select defaultValue={data?.currencyCode || "VND"}>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VND">VND</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">DUE DATE</Label>
                    <Input 
                      type="date" 
                      className="h-10" 
                      defaultValue={data?.dueDate}
                    />
                  </div>
                </div>
              </div>

              {/* BLOCK 2 - AMOUNT INFORMATION - WIDTH: 520px */}
              <div style={{ width: '520px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">AMOUNT INFORMATION</h3>
                <div className="grid grid-cols-2 gap-4">
                  
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> TOTAL AMOUNT REQUEST
                    </Label>
                    <Input 
                      type="number"
                      className="bg-pink-50 h-10" 
                      defaultValue={data?.totalAmountRequest || 0}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">TOTAL AMOUNT APPROVAL</Label>
                    <Input 
                      type="number"
                      className="h-10" 
                      defaultValue={data?.totalAmountApproval || 0}
                      placeholder="0"
                    />
                  </div>

                  <div className="col-span-2 p-3 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-xs text-gray-700">
                      <strong>Note:</strong> Total Amount Approval không được lớn hơn Total Amount Request
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="outline">
                Save Draft
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Submit
              </Button>
            </div>
          </TabsContent>

          {/* TAB 2: DOCUMENT CHECKLIST */}
          <TabsContent value="document-checklist" className="p-6">
            <div className="space-y-4">
              {/* Purpose 1: Tạm ứng nhà cung cấp */}
              <div className="border rounded-lg overflow-hidden bg-white">
                <button
                  className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-50 text-left font-medium"
                  onClick={() => setExpandedPurpose(expandedPurpose === 'supplier-advance' ? null : 'supplier-advance')}
                >
                  {expandedPurpose === 'supplier-advance' ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="text-sm">Chi tạm ứng nhà cung cấp</span>
                </button>
                
                {expandedPurpose === 'supplier-advance' && (
                  <div className="border-t p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50 border-b">
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '60px' }}>STT</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '30%' }}>Name</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '40%' }}>Description</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '120px' }}>Status</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '100px' }}>Attach</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">1</td>
                          <td className="px-3 py-2">Hợp đồng tạm ứng</td>
                          <td className="px-3 py-2 text-gray-600">Hợp đồng hoặc thỏa thuận tạm ứng với nhà cung cấp</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                              Đã nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">2</td>
                          <td className="px-3 py-2">Giấy đề nghị tạm ứng</td>
                          <td className="px-3 py-2 text-gray-600">Giấy đề nghị tạm ứng từ nhà cung cấp</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                              Chưa nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-3 py-2">3</td>
                          <td className="px-3 py-2">Thông tin tài khoản nhận</td>
                          <td className="px-3 py-2 text-gray-600">Thông tin tài khoản ngân hàng nhà cung cấp</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                              Đã nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Purpose 2: Chi trực tiếp */}
              <div className="border rounded-lg overflow-hidden bg-white">
                <button
                  className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-50 text-left font-medium"
                  onClick={() => setExpandedPurpose(expandedPurpose === 'direct-payment' ? null : 'direct-payment')}
                >
                  {expandedPurpose === 'direct-payment' ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="text-sm">Chi trực tiếp</span>
                </button>
                
                {expandedPurpose === 'direct-payment' && (
                  <div className="border-t p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50 border-b">
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '60px' }}>STT</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '30%' }}>Name</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '40%' }}>Description</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '120px' }}>Status</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '100px' }}>Attach</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">1</td>
                          <td className="px-3 py-2">Biên bản thanh lý hợp đồng</td>
                          <td className="px-3 py-2 text-gray-600">Biên bản thanh lý hoặc xác nhận hoàn thành công việc</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                              Đã nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">2</td>
                          <td className="px-3 py-2">Hóa đơn VAT</td>
                          <td className="px-3 py-2 text-gray-600">Hóa đơn VAT bản gốc</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                              Đã nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-3 py-2">3</td>
                          <td className="px-3 py-2">Chứng từ thanh toán</td>
                          <td className="px-3 py-2 text-gray-600">Phiếu xuất kho, biên lai...</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                              Chưa nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Purpose 3: Chi tạm ứng nhân viên */}
              <div className="border rounded-lg overflow-hidden bg-white">
                <button
                  className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-50 text-left font-medium"
                  onClick={() => setExpandedPurpose(expandedPurpose === 'employee-advance' ? null : 'employee-advance')}
                >
                  {expandedPurpose === 'employee-advance' ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="text-sm">Chi tạm ứng nhân viên</span>
                </button>
                
                {expandedPurpose === 'employee-advance' && (
                  <div className="border-t p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50 border-b">
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '60px' }}>STT</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '30%' }}>Name</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '40%' }}>Description</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '120px' }}>Status</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '100px' }}>Attach</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">1</td>
                          <td className="px-3 py-2">Đơn xin tạm ứng</td>
                          <td className="px-3 py-2 text-gray-600">Đơn xin tạm ứng công tác phí từ nhân viên</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                              Đã nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">2</td>
                          <td className="px-3 py-2">Kế hoạch công tác</td>
                          <td className="px-3 py-2 text-gray-600">Kế hoạch công tác chi tiết (thời gian, địa điểm, mục đích)</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                              Đã nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-3 py-2">3</td>
                          <td className="px-3 py-2">Dự trù chi phí</td>
                          <td className="px-3 py-2 text-gray-600">Bảng dự trù chi phí chi tiết</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                              Chưa nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Purpose 4: Chi hóa đơn */}
              <div className="border rounded-lg overflow-hidden bg-white">
                <button
                  className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-50 text-left font-medium"
                  onClick={() => setExpandedPurpose(expandedPurpose === 'invoice-payment' ? null : 'invoice-payment')}
                >
                  {expandedPurpose === 'invoice-payment' ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="text-sm">Chi hóa đơn</span>
                </button>
                
                {expandedPurpose === 'invoice-payment' && (
                  <div className="border-t p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50 border-b">
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '60px' }}>STT</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '30%' }}>Name</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '40%' }}>Description</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '120px' }}>Status</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '100px' }}>Attach</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">1</td>
                          <td className="px-3 py-2">Hóa đơn VAT</td>
                          <td className="px-3 py-2 text-gray-600">Hóa đơn VAT bản gốc hoặc bản sao công chứng</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                              Đã nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">2</td>
                          <td className="px-3 py-2">Phiếu xuất kho</td>
                          <td className="px-3 py-2 text-gray-600">Phiếu xuất kho hoặc biên bản nghiệm thu</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                              Đã nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">3</td>
                          <td className="px-3 py-2">Hợp đồng mua hàng</td>
                          <td className="px-3 py-2 text-gray-600">Hợp đồng hoặc đơn hàng mua</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                              Chưa nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-3 py-2">4</td>
                          <td className="px-3 py-2">Giấy đề nghị thanh toán</td>
                          <td className="px-3 py-2 text-gray-600">Giấy đề nghị thanh toán từ nhà cung cấp</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                              Đã nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Purpose 5: Chi hợp đồng */}
              <div className="border rounded-lg overflow-hidden bg-white">
                <button
                  className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-50 text-left font-medium"
                  onClick={() => setExpandedPurpose(expandedPurpose === 'contract-payment' ? null : 'contract-payment')}
                >
                  {expandedPurpose === 'contract-payment' ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="text-sm">Chi hợp đồng</span>
                </button>
                
                {expandedPurpose === 'contract-payment' && (
                  <div className="border-t p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50 border-b">
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '60px' }}>STT</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '30%' }}>Name</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '40%' }}>Description</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '120px' }}>Status</th>
                          <th className="px-3 py-2 text-left text-blue-700" style={{ width: '100px' }}>Attach</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">1</td>
                          <td className="px-3 py-2">Hợp đồng gốc</td>
                          <td className="px-3 py-2 text-gray-600">Hợp đồng đã ký kết (bản gốc hoặc bản sao công chứng)</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                              Đã nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">2</td>
                          <td className="px-3 py-2">Biên bản nghiệm thu</td>
                          <td className="px-3 py-2 text-gray-600">Biên bản nghiệm thu công việc theo hợp đồng</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                              Chưa nộp
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-3 py-2">3</td>
                          <td className="px-3 py-2">Phụ lục hợp đồng</td>
                          <td className="px-3 py-2 text-gray-600">Phụ lục điều chỉnh (nếu có)</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                              N/A
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: APPROVAL INFO */}
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

            {/* History Log */}
            <div className="mb-6">
              <h3 className="text-sm mb-4">Lịch sử thao tác</h3>
              <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Tạo phiếu đề nghị chi</p>
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

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>CANCEL</Button>
            <Button variant="default">SAVE</Button>
          </div>
          <Button variant="default">CREATE</Button>
        </div>
      </div>

      {/* Contract Match Popup */}
      {showContractMatchPopup && (
        <ContractInvoiceMatchPopup onClose={() => setShowContractMatchPopup(false)} />
      )}
    </div>
  );
}