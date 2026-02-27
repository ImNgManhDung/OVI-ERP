import { useState } from 'react';
import { X, Search, ChevronDown, Trash2, Paperclip } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

interface CreateAdvanceRequestProps {
  onClose: () => void;
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

export default function CreateAdvanceRequest({ onClose, data }: CreateAdvanceRequestProps) {
  const [mainTab, setMainTab] = useState('main-info');
  const [detailsTab, setDetailsTab] = useState('advance-details');
  const [partnerType, setPartnerType] = useState<'EMP' | 'VEND'>(data?.partnerType || 'EMP');
  const [status, setStatus] = useState(data?.status || 'D');
  const [searchText, setSearchText] = useState('');
  const [selectedDetails, setSelectedDetails] = useState<number[]>([]);

  const [detailRows, setDetailRows] = useState<DetailRow[]>([
    {
      id: 1,
      sip: 1,
      currencyCode: 'VND',
      exchangeRate: 1,
      exchangeDate: new Date().toISOString().split('T')[0],
      exchangeType: 'spot',
      originalAmount: 20000000,
      remainingAmount: 20000000,
      requestAmount: 20000000,
      requestAccAmount: 20000000,
      approvedAmount: 0,
      approvedAccAmount: 0,
      description: 'Đề nghị thanh toán hóa đơn mua #001'
    }
  ]);

  const handleSave = () => {
    toast.success('Đề nghị tạm ứng đã được lưu thành công!');
  };

  const handleSubmit = () => {
    toast.success('Đề nghị tạm ứng đã được gửi duyệt!');
    setStatus('A');
  };

  const handleAddDetailRow = () => {
    const newRow: DetailRow = {
      id: detailRows.length + 1,
      sip: detailRows.length + 1,
      currencyCode: 'VND',
      exchangeRate: 1,
      exchangeDate: new Date().toISOString().split('T')[0],
      exchangeType: 'spot',
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

  const toggleDetailSelection = (id: number) => {
    setSelectedDetails(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredDetails = detailRows.filter(row =>
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
          <h2 className="text-lg font-semibold">{data ? 'EDIT ADVANCE REQUEST' : 'CREATE ADVANCE REQUEST'}</h2>
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
              
              {/* BLOCK 1 - DOCUMENT INFO - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">DOCUMENT INFORMATION</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Row 1 - ARE ID (1 col) + APE Number (1 col) + Doc Date (1 col) */}
                  <div>
                    <Label className="text-sm mb-1 block">ARE ID</Label>
                    <Input 
                      className="h-10 bg-gray-100" 
                      value={data?.areId || 'Auto generate'} 
                      disabled 
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> APE NUMBER
                    </Label>
                    <Input 
                      className="bg-pink-50 h-10" 
                      placeholder="Auto: TYPE-MMYY-AAA"
                      defaultValue={data?.apeNumber}
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> DOC DATE
                    </Label>
                    <Input 
                      type="date" 
                      className="bg-pink-50 h-10" 
                      defaultValue={data?.docDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Row 2 - APE Type (1 col) + Status (1 col) + Legal Entity (1 col) */}
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> APE TYPE
                    </Label>
                    <Select defaultValue={data?.apeType || "travel"}>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contract">Tạm ứng hợp đồng</SelectItem>
                        <SelectItem value="travel">Tạm ứng công tác</SelectItem>
                        <SelectItem value="guest">Tạm ứng tiếp khách</SelectItem>
                        <SelectItem value="other">Tạm ứng khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">STATUS</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="D">Draft</SelectItem>
                        <SelectItem value="A">Approved</SelectItem>
                        <SelectItem value="R">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> LEGAL ENTITY
                    </Label>
                    <Select defaultValue={data?.legalEntity || "len1"}>
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

                  {/* Row 3 - Description (3 cols full width) */}
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">DESCRIPTION</Label>
                    <Input 
                      className="h-10"
                      placeholder="TRAVEL, PURCHASE, CONTRACT..."
                      defaultValue={data?.description}
                    />
                  </div>
                </div>
              </div>

              {/* BLOCK 2 - PARTNER INFO - WIDTH: 520px */}
              <div style={{ width: '520px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">PARTNER INFORMATION</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Row 1 - Partner Type (1 col) + Partner Name (2 cols) */}
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> PARTNER TYPE
                    </Label>
                    <Select value={partnerType} onValueChange={(val: 'EMP' | 'VEND') => setPartnerType(val)}>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMP">Employee (Nhân viên)</SelectItem>
                        <SelectItem value="VEND">Vendor (Nhà cung cấp)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> PARTNER NAME
                    </Label>
                    <Input 
                      className="bg-pink-50 h-10" 
                      defaultValue={data?.partnerName}
                      placeholder={partnerType === 'EMP' ? 'Nguyễn Văn A' : 'Công ty XYZ'}
                    />
                  </div>

                  {/* Row 2 - Partner ID (1 col) + TER ID/PO ID (1 col) + Internal Req/Contract ID (1 col) */}
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> PARTNER ID
                    </Label>
                    <Input 
                      className="bg-pink-50 h-10" 
                      defaultValue={data?.partnerId}
                      placeholder={partnerType === 'EMP' ? 'NV001' : 'NCC001'}
                    />
                  </div>
                  {partnerType === 'EMP' ? (
                    <>
                      <div>
                        <Label className="text-sm mb-1 block">TER ID</Label>
                        <Input 
                          className="h-10" 
                          placeholder="Travel Expense Request ID"
                        />
                      </div>
                      <div>
                        <Label className="text-sm mb-1 block">INTERNAL REQ</Label>
                        <Input 
                          className="h-10" 
                          placeholder="Công văn/Email"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label className="text-sm mb-1 block">PO ID</Label>
                        <Input className="h-10" placeholder="Purchase Order ID" />
                      </div>
                      <div>
                        <Label className="text-sm mb-1 block">CONTRACT ID</Label>
                        <Input className="h-10" placeholder="Contract ID" />
                      </div>
                    </>
                  )}

                  {/* Row 3 - Advance Description (3 cols full width) */}
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">ADVANCE DESCRIPTION</Label>
                    <Input 
                      className="h-10" 
                      placeholder="TRAVEL, PURCHASE, CONTRACT..."
                      defaultValue={data?.advanceDescription}
                    />
                  </div>
                </div>
              </div>

              {/* BLOCK 3 - FINANCIAL & OTHER - WIDTH: 520px */}
              <div style={{ width: '520px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">FINANCIAL & OTHER INFORMATION</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Row 1 - Req Amount (1 col) + Advance Percent (1 col) + Approved Amount (1 col) */}
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> REQ AMOUNT
                    </Label>
                    <Input 
                      type="number"
                      className="bg-pink-50 h-10" 
                      defaultValue={data?.reqAmount}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">ADVANCE PERCENT (%)</Label>
                    <Input 
                      type="number"
                      className="h-10" 
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">APPROVED AMOUNT</Label>
                    <Input 
                      type="number"
                      className="h-10" 
                      defaultValue={data?.approvedAmount}
                      placeholder="0"
                    />
                  </div>

                  {/* Row 2 - Cost Center (1 col) + Expected Date (1 col) + Due Date (1 col) */}
                  <div>
                    <Label className="text-sm mb-1 block">COST CENTER</Label>
                    <Select defaultValue="cc1">
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cc1">CC001 - Phòng Kế Toán</SelectItem>
                        <SelectItem value="cc2">CC002 - Phòng Hành Chính</SelectItem>
                        <SelectItem value="cc3">CC003 - Phòng Kinh Doanh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">EXPECTED DATE</Label>
                    <Input 
                      type="date" 
                      className="h-10" 
                      defaultValue={data?.expectedDate}
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">DUE DATE</Label>
                    <Input 
                      type="date" 
                      className="h-10" 
                      defaultValue={data?.dueDate}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PAYMENT REQUEST DETAILS TABLE */}
            <div className="mt-6">
              <div className="border-b pb-2 mb-4">
                <h3 className="text-sm font-semibold text-blue-600">ADVANCE REQUEST DETAILS</h3>
              </div>

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
                <Button variant="outline" size="sm">
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
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSave}>
                Save Draft
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </TabsContent>

          {/* TAB 2: FINANCIAL INFO */}
          <TabsContent value="financial-info" className="p-6">
            <div className="flex gap-6" style={{ width: '1552px' }}>
              
              {/* BLOCK 1 - CURRENCY & EXCHANGE */}
              <div style={{ width: '520px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">CURRENCY & EXCHANGE</h3>
                <div className="grid grid-cols-2 gap-4">
                  
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> CURRENCY CODE
                    </Label>
                    <Select defaultValue="VND">
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

                  <div>
                    <Label className="text-sm mb-1 block">EXCHANGE RATE</Label>
                    <Input 
                      type="number"
                      className="h-10" 
                      defaultValue="1"
                      step="0.0001"
                    />
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">EXCHANGE DATE</Label>
                    <Input 
                      type="date" 
                      className="h-10" 
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">EXCHANGE TYPE</Label>
                    <Select defaultValue="spot">
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spot">Spot</SelectItem>
                        <SelectItem value="forward">Forward</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* BLOCK 2 - PAYMENT TRACKING */}
              <div style={{ width: '520px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">PAYMENT TRACKING</h3>
                <div className="grid grid-cols-2 gap-4">
                  
                  <div>
                    <Label className="text-sm mb-1 block">PAID AMOUNT</Label>
                    <Input 
                      type="number"
                      className="h-10 bg-gray-100" 
                      defaultValue={data?.paidAmount || 0}
                      disabled
                    />
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">IS FULL PAID</Label>
                    <Select defaultValue="N">
                      <SelectTrigger className="h-10 bg-gray-100" disabled>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Y">Yes</SelectItem>
                        <SelectItem value="N">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">CLEARED AMOUNT</Label>
                    <Input 
                      type="number"
                      className="h-10 bg-gray-100" 
                      defaultValue={data?.clearedAmount || 0}
                      disabled
                    />
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">IS FULL CLEARED</Label>
                    <Select defaultValue="N">
                      <SelectTrigger className="h-10 bg-gray-100" disabled>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Y">Yes</SelectItem>
                        <SelectItem value="N">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs text-gray-600 mb-2">
                      <strong>Note:</strong> Các trường PAID AMOUNT, IS FULL PAID, CLEARED AMOUNT, IS FULL CLEARED 
                      sẽ được hệ thống tự động cập nhật từ các giao dịch thanh toán và quyết toán.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSave}>
                Save Draft
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit}>
                Submit
              </Button>
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
                    <p className="text-sm font-medium">Tạo đề nghị tạm ứng</p>
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

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSave}>
                Save Draft
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}