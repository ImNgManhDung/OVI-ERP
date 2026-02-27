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
import DeptClearingPopup from './DeptClearingPopup';
import ApplyDocPopup from './ApplyDocPopup';

interface CreateBankReceiptProps {
  onClose: () => void;
}

interface DetailRow {
  id: number;
  sip: number;
  docType: string;
  docNumber: string;
  docDate: string;
  description: string;
  amount: number;
  accountedAmount: number;
  remainingAmount: number;
  currency: string;
}

interface AccountingRow {
  id: number;
  sip: number;
  credit: string;
  debit: string;
  amount: number;
  accountedAmount: number;
  currency: string;
  description: string;
  costCenters: string;
  costElements: string;
  products: string;
  profitCenter: string;
  extensionAnalysis: string;
  projects: string;
}

export default function CreateBankReceipt({ onClose }: CreateBankReceiptProps) {
  const [mainTab, setMainTab] = useState('main-info');
  const [detailsTab, setDetailsTab] = useState('bank-receipt-details');
  const [searchText, setSearchText] = useState('');
  const [showDeptClearingPopup, setShowDeptClearingPopup] = useState(false);
  const [showApplyDocPopup, setShowApplyDocPopup] = useState(false);
  
  const [detailRows, setDetailRows] = useState<DetailRow[]>([
    {
      id: 1,
      sip: 1,
      docType: 'Ngân hàng',
      docNumber: 'BANK001',
      docDate: '2025-12-30',
      description: 'Thu tiền khách hàng qua ngân hàng',
      amount: 20000000,
      accountedAmount: 20000000,
      remainingAmount: 0,
      currency: 'VND'
    }
  ]);

  const [accountingData, setAccountingData] = useState<AccountingRow[]>([
    {
      id: 1,
      sip: 1,
      credit: '112',
      debit: '',
      amount: 20000000,
      accountedAmount: 20000000,
      currency: 'VND',
      description: 'Tiền gửi ngân hàng',
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
      credit: '',
      debit: '131',
      amount: 20000000,
      accountedAmount: 20000000,
      currency: 'VND',
      description: 'Phải thu khách hàng',
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
      description: '',
      amount: 0,
      accountedAmount: 0,
      remainingAmount: 0,
      currency: 'VND'
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
      credit: '',
      debit: '',
      amount: 0,
      accountedAmount: 0,
      currency: 'VND',
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
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg">CREATE BANK RECEIPT</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

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

          {/* Main Info Tab */}
          <TabsContent value="main-info" className="p-0">
            {/* 3 DATA BLOCKS */}
            <div className="flex gap-6 mb-6 px-6 mt-6" style={{ width: '1600px' }}>
              
              {/* BLOCK 1 - RECEIPT INFORMATION - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">RECEIPT INFORMATION</h3>
                  <div className="grid grid-cols-3 gap-4">
                    
                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> TRANSACTION TYPE
                      </Label>
                      <Select defaultValue="bank">
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
                      <Select defaultValue="receipt">
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="receipt">Phiếu thu</SelectItem>
                          <SelectItem value="advance">Tạm ứng</SelectItem>
                          <SelectItem value="refund">Hoàn ứng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> RECEIPT NUMBER
                      </Label>
                      <Input className="bg-pink-50 h-10" placeholder="Auto generate" />
                    </div>

                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> RECEIPT DATE
                      </Label>
                      <Input type="date" className="bg-pink-50 h-10" defaultValue="2025-12-30" />
                    </div>

                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> POSTING DATE
                      </Label>
                      <Input type="date" className="bg-pink-50 h-10" defaultValue="2025-12-07" />
                    </div>

                    <div className="col-span-3">
                      <Label className="text-sm mb-1 block">DESCRIPTION</Label>
                      <Input className="h-10" placeholder="Mô tả phiếu thu ngân hàng" />
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOCK 2 - PAYMENT INFORMATION - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">PAYMENT INFORMATION</h3>
                  <div className="grid grid-cols-3 gap-4">
                    
                    <div>
                      <Label className="text-sm mb-1 block">RECEIVED OBJ ID</Label>
                      <Input className="h-10" defaultValue="0123456789" />
                    </div>
                    
                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> RECEIVED OBJ NAME
                      </Label>
                      <Input className="bg-pink-50 h-10" defaultValue="CÔNG TY TNHH XYZ" />
                    </div>

                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> PAID FROM
                      </Label>
                      <Select defaultValue="112">
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="111">BIDV</SelectItem>
                          <SelectItem value="112">ACB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> PAID TO
                      </Label>
                      <Select defaultValue="331">
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="331">BIDV</SelectItem>
                          <SelectItem value="338">ACB</SelectItem>
                          <SelectItem value="131">VIETTINBANK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm mb-1 block">ACCOUNT ID</Label>
                      <Input className="h-10 bg-gray-100" defaultValue="112" disabled />
                    </div>

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
                      <Input className="h-10 bg-gray-100" type="number" defaultValue="0" disabled />
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOCK 3 - OBJECT INFO - WIDTH: 440px */}
              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">OBJECT INFO</h3>
                  <div className="grid grid-cols-3 gap-4">
                    
                    <div>
                      <Label className="text-sm mb-1 block">OBJ ID</Label>
                      <Input className="h-10" defaultValue="OBJ002" />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block">OBJ NAME</Label>
                      <Input className="h-10" defaultValue="CÔNG TY XYZ" />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block">ADDRESS</Label>
                      <Input className="h-10" defaultValue="456 Lê Văn B, Q3, TP.HCM" />
                    </div>

                    <div>
                      <Label className="text-sm mb-1 block">BATCH</Label>
                      <Input className="h-10 bg-gray-100" disabled />
                    </div>

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

            {/* Details Section with 2 Tabs */}
            <div className="mt-6">
              <Tabs value={detailsTab} onValueChange={setDetailsTab} className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
                  <TabsTrigger 
                    value="bank-receipt-details"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                    style={{ width: '440px' }}
                  >
                    BANK RECEIPT DETAILS
                  </TabsTrigger>
                  <TabsTrigger 
                    value="accounting"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 ml-6"
                    style={{ width: '440px' }}
                  >
                    ACCOUNTING
                  </TabsTrigger>
                </TabsList>

                {/* Bank Receipt Details Tab */}
                <TabsContent value="bank-receipt-details" className="mt-4">
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
                    <Button variant="default" size="sm">Save</Button>
                  </div>

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

                {/* Accounting Tab */}
                <TabsContent value="accounting" className="mt-4">
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
                          <th className="px-3 py-2 text-left text-blue-700">Currency</th>
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
                          <tr key={row.id} className="border-b hover:bg-gray-50">
                            <td className="px-3 py-2">
                              <Checkbox 
                                checked={selectedAccounting.includes(row.id)}
                                onCheckedChange={() => toggleAccountingSelection(row.id)}
                              />
                            </td>
                            <td className="px-3 py-2 text-blue-600">{row.sip}</td>
                            <td className="px-3 py-2">
                              <Input className="h-8 w-24" defaultValue={row.credit} />
                            </td>
                            <td className="px-3 py-2">
                              <Input className="h-8 w-24" defaultValue={row.debit} />
                            </td>
                            <td className="px-3 py-2 text-right">{row.amount.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right">{row.accountedAmount.toLocaleString()}</td>
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
                              <Input className="h-8 w-48" defaultValue={row.description} />
                            </td>
                            <td className="px-3 py-2">
                              <Input className="h-8 w-24" defaultValue={row.costCenters} />
                            </td>
                            <td className="px-3 py-2">
                              <Input className="h-8 w-24" defaultValue={row.costElements} />
                            </td>
                            <td className="px-3 py-2">
                              <Input className="h-8 w-24" defaultValue={row.products} />
                            </td>
                            <td className="px-3 py-2">
                              <Input className="h-8 w-24" defaultValue={row.profitCenter} />
                            </td>
                            <td className="px-3 py-2">
                              <Input className="h-8 w-32" defaultValue={row.extensionAnalysis} />
                            </td>
                            <td className="px-3 py-2">
                              <Input className="h-8 w-24" defaultValue={row.projects} />
                            </td>
                          </tr>
                        ))}
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
            <div className="flex gap-6 mb-6" style={{ width: '1552px' }}>
              
              {/* BLOCK 1 - FINANCIAL INFO & EXCHANGE RATE */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4">FINANCIAL INFO & EXCHANGE RATE</h3>
                <div className="grid grid-cols-3 gap-4">
                  
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> FISCAL YEAR
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="2025" />
                  </div>

                  <div>
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

                  <div>
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

                  <div>
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

                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> EXCHANGE DATE
                    </Label>
                    <Input type="date" className="bg-pink-50 h-10" defaultValue="2025-12-07" />
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> EXCHANGE RATE
                    </Label>
                    <Input defaultValue="1.00" className="bg-pink-50 h-10" />
                  </div>
                </div>
              </div>

              {/* BLOCK 2 - REFERENCES */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4">REFERENCES</h3>
                <div className="grid grid-cols-1 gap-4">
                  
                  <div>
                    <Label className="text-sm mb-1 block">REFERENCE 1</Label>
                    <Input className="h-10" placeholder="Enter reference 1" />
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">REFERENCE 2</Label>
                    <Input className="h-10" placeholder="Enter reference 2" />
                  </div>
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
                    <p className="text-sm font-medium">Tạo phiếu thu</p>
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
            <Button variant="default" onClick={() => setShowApplyDocPopup(true)}>APPLY DOC</Button>
            <Button variant="default" onClick={() => setShowDeptClearingPopup(true)}>DEPT CLEARING</Button>
            <Button variant="default">CREATE</Button>
          </div>
        </div>
      </div>

      {showDeptClearingPopup && (
        <DeptClearingPopup 
          type="receipt" 
          onClose={() => setShowDeptClearingPopup(false)} 
        />
      )}

      {showApplyDocPopup && (
        <ApplyDocPopup 
          onClose={() => setShowApplyDocPopup(false)} 
        />
      )}
    </div>
  );
}