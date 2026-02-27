import { useState } from 'react';
import { X, Search, ChevronDown, Trash2 } from 'lucide-react';
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

interface CreateCashPaymentProps {
  onClose: () => void;
}

interface DetailRow {
  id: number;
  sip: number;
  docType: string;
  docNumber: string;
  docDate: string;
  itemCode: string;
  materialName: string;
  description: string;
  uomCode: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  accountedAmount: number;
  remainingAmount: number;
  currency: string;
  taxType: string;
  tax: number;
  fixedAsset: boolean;
  convertUom: string;
  convertQty: number;
  status: string;
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

export default function CreateCashPayment({ onClose }: CreateCashPaymentProps) {
  const [mainTab, setMainTab] = useState('main-info');
  const [searchText, setSearchText] = useState('');
  
  const [detailRows, setDetailRows] = useState<DetailRow[]>([
    {
      id: 1,
      sip: 1,
      docType: 'Tiền mặt',
      docNumber: 'DOC001',
      docDate: '2025-12-30',
      itemCode: 'IC001',
      materialName: 'Chi tiền mua hàng',
      description: 'Thanh toán hóa đơn mua #001',
      uomCode: '',
      unitPrice: 0,
      quantity: 1,
      amount: 20000000,
      accountedAmount: 20000000,
      remainingAmount: 0,
      currency: 'VND',
      taxType: '',
      tax: 0,
      fixedAsset: false,
      convertUom: '',
      convertQty: 0,
      status: 'active'
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
      docType: '',
      docNumber: '',
      docDate: '',
      itemCode: '',
      materialName: '',
      description: '',
      uomCode: '',
      unitPrice: 0,
      quantity: 0,
      amount: 0,
      accountedAmount: 0,
      remainingAmount: 0,
      currency: 'VND',
      taxType: '',
      tax: 0,
      fixedAsset: false,
      convertUom: '',
      convertQty: 0,
      status: 'active'
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
      {/* CONTAINER TĨNH 1600px */}
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg">CREATE CASH PAYMENT</h2>
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

          {/* MAIN INFO TAB */}
          <TabsContent value="main-info" className="p-0">
            {/* 3 DATA BLOCKS */}
            <div className="flex gap-6 mb-6 px-6 mt-6" style={{ width: '1600px' }}>
              
              {/* BLOCK 1 - PAYMENT INFO - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">PAYMENT INFORMATION</h3>
                  <div className="grid grid-cols-3 gap-4">
                    
                    {/* Row 1 - Transaction Type (1.5 cols) & Cash Flow ID (1.5 cols) */}
                    <div className="col-span-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm mb-1 block">
                            <span className="text-red-500">*</span> TRANSACTION TYPE
                          </Label>
                          <Select defaultValue="cash">
                            <SelectTrigger className="bg-pink-50 h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash">Tiền mặt</SelectItem>
                              <SelectItem value="bank">Ngân hàng</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm mb-1 block">
                            <span className="text-red-500">*</span> CASH FLOW ID
                          </Label>
                          <Select defaultValue="payment">
                            <SelectTrigger className="bg-pink-50 h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="payment">Phiếu chi</SelectItem>
                              <SelectItem value="advance">Tạm ứng</SelectItem>
                              <SelectItem value="refund">Hoàn ứng</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Row 2 - Payment Number, Payment Date & GL Date */}
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> PAYMENT NUMBER
                      </Label>
                      <Input className="bg-pink-50 h-10" placeholder="Auto generate" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> PAYMENT DATE
                      </Label>
                      <Input type="date" className="bg-pink-50 h-10" defaultValue="2025-12-30" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> GL DATE
                      </Label>
                      <Input type="date" className="bg-pink-50 h-10" defaultValue="2025-12-07" />
                    </div>

                    {/* Row 3 - Description */}
                    <div className="col-span-3">
                      <Label className="text-sm mb-1 block">DESCRIPTION</Label>
                      <Input className="h-10" placeholder="Mô tả phiếu chi" />
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOCK 2 - PAYEE INFO - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">PAYEE INFORMATION</h3>
                  <div className="grid grid-cols-3 gap-4">
                    
                    {/* Row 1 - Tax ID & Tax Name */}
                    <div>
                      <Label className="text-sm mb-1 block">
                          <span className="text-red-500">*</span> RECEIVED OBJ ID
                      </Label>
                      <Input className="bg-pink-50 h-10" placeholder="Enter Tax ID" defaultValue="0987654321" />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> RECEIVED OBJ NAME
                      </Label>
                      <Input className="bg-pink-50 h-10" placeholder="Enter Tax Name" defaultValue="NHÀ CUNG CẤP ABC" />
                    </div>

                    {/* Row 2 - Cash Account & Account ID */}
                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> CASH ACCOUNT
                      </Label>
                      <Select defaultValue="111">
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">ACCOUNT ID</Label>
                      <Input className="h-10" defaultValue="111" disabled />
                    </div>

                    {/* Row 3 - Amount, Accounted Amount & Remaining Amount */}
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> AMOUNT
                      </Label>
                      <Input className="bg-pink-50 h-10" type="number" defaultValue="20000000" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> ACC AMOUNT
                      </Label>
                      <Input className="bg-pink-50 h-10" type="number" defaultValue="20000000" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">REM AMOUNT</Label>
                      <Input className="h-10" type="number" defaultValue="0" disabled />
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOCK 3 - OBJECT INFO - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">OBJECT INFO</h3>
                  <div className="grid grid-cols-3 gap-4">
                    
                    {/* Row 1 - Obj ID & Obj Name (2 cols) */}
                    <div>
                      <Label className="text-sm mb-1 block">OBJ ID</Label>
                      <Input className="h-10" defaultValue="OBJ001" />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block">OBJ NAME</Label>
                      <Input className="h-10" defaultValue="NHÀ CUNG CẤP ABC" />
                    </div>

                    {/* Row 2 - Address (2 cols) & Batch */}
                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block">ADDRESS</Label>
                      <Input className="h-10" defaultValue="456 Trần Hưng Đạo, Q1, TP.HCM" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">BATCH</Label>
                      <Input className="h-10 bg-gray-100" disabled />
                    </div>

                    {/* Row 3 - Complete, Post & Status (3 cols) */}
                    <div>
                      <Label className="text-sm mb-1 block">COMPLETE</Label>
                      <div className="flex items-center h-10">
                        <Switch />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">POST</Label>
                      <div className="flex items-center h-10">
                        <Switch />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">STATUS</Label>
                      <Select defaultValue="draft">
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="complete">Complete</SelectItem>
                          <SelectItem value="posted">Posted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section with Sub-Tabs */}
            <div className="mt-6">
              <Tabs defaultValue="payment-details" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
                  <TabsTrigger 
                    value="payment-details"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                    style={{ width: '440px' }}
                  >
                    PAYMENT DETAILS
                  </TabsTrigger>
                  <TabsTrigger 
                    value="accounting"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 ml-6"
                    style={{ width: '440px' }}
                  >
                    ACCOUNTING
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="payment-details" className="mt-4">
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
                  </div>

                  {/* Table */}
                  <div className="border rounded overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50 border-b">
                          <th className="px-3 py-2 text-left">
                            <Checkbox />
                          </th>
                          <th className="px-3 py-2 text-left text-blue-700">SIP</th>
                          <th className="px-3 py-2 text-right text-blue-700">AMOUNT</th>
                          <th className="px-3 py-2 text-right text-blue-700">ACCOUNTED AMOUNT</th>
                          <th className="px-3 py-2 text-right text-blue-700">REMAINING AMOUNT</th>
                          <th className="px-3 py-2 text-left text-blue-700">CURRENCY</th>
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
                            <td className="px-3 py-2 text-right">{row.amount.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right">{row.accountedAmount.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right">{row.remainingAmount.toLocaleString()}</td>
                            <td className="px-3 py-2">
                              <Select defaultValue={row.currency}>
                                <SelectTrigger className="h-8 w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="VND">VND</SelectItem>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-3 py-2">
                              <Input className="h-8 w-64" defaultValue={row.description} />
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

                <TabsContent value="accounting">
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
                    <Button variant="outline" size="sm" onClick={handleAddAccountingRow}>Add Row</Button>
                    <Button variant="outline" size="sm" onClick={handleDeleteAccountingRows} disabled={selectedAccounting.length === 0}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="default" size="sm">Save</Button>
                  </div>

                  {/* Table */}
                  <div className="border rounded overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50 border-b">
                          <th className="px-3 py-2 text-left">
                            <Checkbox />
                          </th>
                          <th className="px-3 py-2 text-left text-blue-700">SIP</th>
                          <th className="px-3 py-2 text-left text-blue-700">CREDIT</th>
                          <th className="px-3 py-2 text-left text-blue-700">DEBIT</th>
                          <th className="px-3 py-2 text-left text-blue-700">AMOUNT</th>
                          <th className="px-3 py-2 text-left text-blue-700">ACCOUNTED AMOUNT</th>
                          <th className="px-3 py-2 text-left text-blue-700">CURRENCY CODE</th>
                          <th className="px-3 py-2 text-left text-blue-700">DESCRIPTION</th>
                          <th className="px-3 py-2 text-left text-blue-700">COST CENTERS</th>
                          <th className="px-3 py-2 text-left text-blue-700">COST ELEMENTS</th>
                          <th className="px-3 py-2 text-left text-blue-700">PRODUCTS</th>
                          <th className="px-3 py-2 text-left text-blue-700">PROFIT CENTER</th>
                          <th className="px-3 py-2 text-left text-blue-700">EXTENSION ANALYSIS</th>
                          <th className="px-3 py-2 text-left text-blue-700">PROJECTS</th>
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
                            <td className="px-3 py-2 text-right">{row.amount.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right">{row.accountedAmount.toLocaleString()}</td>
                            <td className="px-3 py-2">
                              <Select defaultValue={row.currencyCode}>
                                <SelectTrigger className="h-8 w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="VND">VND</SelectItem>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-3 py-2">{row.description}</td>
                            <td className="px-3 py-2">{row.costCenters}</td>
                            <td className="px-3 py-2">{row.costElements}</td>
                            <td className="px-3 py-2">{row.products}</td>
                            <td className="px-3 py-2">{row.profitCenter}</td>
                            <td className="px-3 py-2">{row.extensionAnalysis}</td>
                            <td className="px-3 py-2">{row.projects}</td>
                          </tr>
                        ))}
                        {/* Total Row */}
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
              </Tabs>
            </div>
          </TabsContent>

          {/* FINANCIAL INFO TAB */}
          <TabsContent value="financial-info" className="p-6">
            <div style={{ width: '1552px' }}>
              <h3 className="text-sm mb-4">FINANCIAL INFO & EXCHANGE RATE</h3>
              <div className="grid grid-cols-6 gap-4">
                
                {/* Row 1 */}
                <div className="col-span-2">
                  <Label className="text-sm mb-1 block">
                    <span className="text-red-500">*</span> FISCAL YEAR
                  </Label>
                  <Input className="bg-pink-50 h-10" defaultValue="2025" />
                </div>
                <div className="col-span-2">
                  <Label className="text-sm mb-1 block">
                    <span className="text-red-500">*</span> APE ID
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
                <div className="col-span-2">
                  <Label className="text-sm mb-1 block">
                    <span className="text-red-500">*</span> CURRENCY CODE
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

                {/* Row 2 */}
                <div className="col-span-2">
                  <Label className="text-sm mb-1 block">
                    <span className="text-red-500">*</span> EXC RATE TYPE
                  </Label>
                  <Select defaultValue="daily">
                    <SelectTrigger className="bg-pink-50 h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm mb-1 block">
                    <span className="text-red-500">*</span> EXCHANGE DATE
                  </Label>
                  <Input type="date" className="bg-pink-50 h-10" defaultValue="2025-12-07" />
                </div>
                <div className="col-span-2">
                  <Label className="text-sm mb-1 block">
                    <span className="text-red-500">*</span> EXCHANGE RATE
                  </Label>
                  <Input defaultValue="1.00" className="bg-pink-50 h-10" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* APPROVAL INFO TAB */}
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
                    <p className="text-sm font-medium">Tạo phiếu chi</p>
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
          <div className="flex gap-2">
            <Button variant="default">CREATE</Button>
          </div>
        </div>
      </div>
    </div>
  );
}