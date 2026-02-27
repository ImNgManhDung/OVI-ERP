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

interface CreateAdvanceSettlementProps {
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
  accDebit: string;
  accCredit: string;
  description: string;
}

export default function CreateAdvanceSettlement({ onClose, data }: CreateAdvanceSettlementProps) {
  const [mainTab, setMainTab] = useState('main-info');
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
      exchangeType: 'SPOT',
      originalAmount: 10000000,
      remainingAmount: 10000000,
      requestAmount: 10000000,
      requestAccAmount: 10000000,
      approvedAmount: 9500000,
      approvedAccAmount: 9500000,
      accDebit: '1388',
      accCredit: '1111',
      description: 'Hoàn ứng chi phí công tác'
    }
  ]);

  const handleSave = () => {
    toast.success('Hoàn ứng đã được lưu thành công!');
  };

  const handleSubmit = () => {
    toast.success('Hoàn ứng đã được gửi duyệt!');
    setStatus('A');
  };

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
      accDebit: '',
      accCredit: '',
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

  const DetailsSection = () => (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-blue-600">SETTLEMENT REQUEST DETAILS</h3>
      </div>

      {/* Toolbar */}
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
        <Button 
          variant="outline" 
          size="sm" 
          disabled={selectedDetails.length === 0}
          onClick={handleDeleteDetailRows}
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
              <th className="px-3 py-2 text-left text-blue-700">ACC DEBIT</th>
              <th className="px-3 py-2 text-left text-blue-700">ACC CREDIT</th>
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
                    className="h-8 w-24" 
                    defaultValue={row.accDebit}
                    placeholder="1388"
                  />
                </td>
                <td className="px-3 py-2">
                  <Input 
                    className="h-8 w-24" 
                    defaultValue={row.accCredit}
                    placeholder="1111"
                  />
                </td>
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
    </div>
  );

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; className: string } } = {
      D: { label: 'Draft', className: 'bg-gray-100 text-gray-700' },
      A: { label: 'Approved', className: 'bg-green-100 text-green-700' },
      P: { label: 'Posted', className: 'bg-blue-100 text-blue-700' },
      R: { label: 'Rejected', className: 'bg-red-100 text-red-700' }
    };
    const statusInfo = statusMap[status] || statusMap.D;
    return (
      <span className={`px-3 py-1 rounded text-sm font-medium ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
      {/* CONTAINER TĨNH 1600px */}
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">TẠO HOÀN ỨNG (CREATE ADVANCE SETTLEMENT)</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status:</span>
              {getStatusBadge(status)}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TABS */}
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="main-info" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 px-6 py-3"
              >
                Main Info
              </TabsTrigger>
              <TabsTrigger 
                value="financial-info" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 px-6 py-3"
              >
                Financial Info
              </TabsTrigger>
              <TabsTrigger 
                value="approval-info" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 px-6 py-3"
              >
                Approval Info
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: MAIN INFO */}
          <TabsContent value="main-info" className="p-6">
            <div className="flex gap-6 mb-6" style={{ width: '1552px' }}>
              
              {/* BLOCK 1 - DOCUMENT INFO - WIDTH: 520px */}
              <div style={{ width: '520px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">DOCUMENT INFO</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Row 1 - Legal Entity (3 cols) */}
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> LEGAL ENTITY (LEN)
                    </Label>
                    <Select defaultValue={data?.lenId || "len1"}>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="len1">CÔNG TY CP ABC</SelectItem>
                        <SelectItem value="len2">CHI NHÁNH HÀ NỘI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Row 2 - APE Number (2 cols) + Doc Date (1 col) */}
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">APE NUMBER</Label>
                    <Input 
                      className="h-10 bg-gray-100" 
                      defaultValue={data?.apeNumber || "EMP-0126-001"}
                      disabled
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

                  {/* Row 3 - APE Type (3 cols) */}
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> APE TYPE
                    </Label>
                    <Select defaultValue={data?.apeType || "settlement"}>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="settlement">Hoàn ứng công tác</SelectItem>
                        <SelectItem value="refund">Hoàn ứng tiếp khách</SelectItem>
                        <SelectItem value="other">Hoàn ứng khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Row 4 - Description (3 cols) */}
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">DESCRIPTION</Label>
                    <Input 
                      className="h-10"
                      placeholder="Mô tả hoàn ứng..."
                      defaultValue={data?.description}
                    />
                  </div>
                </div>
              </div>

              {/* BLOCK 2 - PARTNER INFO - WIDTH: 520px */}
              <div style={{ width: '520px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">PARTNER INFO</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Row 1 - Partner Type (3 cols) */}
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> PARTNER TYPE
                    </Label>
                    <div className="flex gap-4 h-10 items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="partnerType"
                          value="EMP"
                          checked={partnerType === 'EMP'}
                          onChange={() => setPartnerType('EMP')}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Employee (EMP)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="partnerType"
                          value="VEND"
                          checked={partnerType === 'VEND'}
                          onChange={() => setPartnerType('VEND')}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Vendor (VEND)</span>
                      </label>
                    </div>
                  </div>

                  {/* Row 2 - Partner ID (1 col) + Partner Name (2 cols) */}
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> PARTNER ID
                    </Label>
                    <div className="relative">
                      <Input 
                        className="bg-pink-50 h-10 pr-10" 
                        defaultValue={data?.partnerId || "NV001"}
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
                    <Label className="text-sm mb-1 block">PARTNER NAME</Label>
                    <Input 
                      className="h-10" 
                      defaultValue={data?.partnerName || "NGUYỄN VĂN A"}
                    />
                  </div>

                  {/* Row 3 - Expected Date (1.5 col) + Due Date (1.5 col) */}
                  <div className="col-span-3">
                    <div className="grid grid-cols-2 gap-4">
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
              </div>

              {/* BLOCK 3 - AMOUNT INFO - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm font-semibold mb-4 text-gray-700">AMOUNT INFO</h3>
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Row 1 - Currency (2 cols) */}
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> CURRENCY
                    </Label>
                    <Select defaultValue={data?.currency || "vnd"}>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">VND</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Row 2 - Req Amount & Approved Amount */}
                  <div>
                    <Label className="text-sm mb-1 block">REQ AMOUNT</Label>
                    <Input 
                      type="number"
                      className="h-10" 
                      defaultValue={data?.reqAmount || 0}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">APPROVED AMOUNT</Label>
                    <Input 
                      type="number"
                      className="h-10" 
                      defaultValue={data?.approvedAmount || 0}
                      placeholder="0"
                    />
                  </div>

                  {/* Row 3 - Paid Amount & Cleared Amount */}
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
                    <Label className="text-sm mb-1 block">CLEARED AMOUNT</Label>
                    <Input 
                      type="number"
                      className="h-10 bg-gray-100" 
                      defaultValue={data?.clearedAmount || 0}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <DetailsSection />
          </TabsContent>

          {/* TAB 2: FINANCIAL INFO */}
          <TabsContent value="financial-info" className="p-6">
            <div className="text-center text-gray-500 py-8">
              Financial Info - Coming Soon
            </div>
          </TabsContent>

          {/* TAB 3: APPROVAL INFO */}
          <TabsContent value="approval-info" className="p-6">
            <div className="text-center text-gray-500 py-8">
              Approval Info - Coming Soon
            </div>
          </TabsContent>
        </Tabs>

        {/* FOOTER */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-white">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit}>
              Submit for Approval
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
