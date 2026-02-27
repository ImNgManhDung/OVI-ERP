import { useState } from 'react';
import { X, ChevronDown, Trash2, Paperclip } from 'lucide-react';
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

interface CreateUniversalLedgerProps {
  onClose: () => void;
}

interface UniversalLedgerDetailRow {
  id: number;
  sip: number;
  objectId: string;
  objectType: string;
  assId: string;
  matId: string;
  prodId: string;
  stoId: string;
  sarId: string;
  cceId: string;
  pceId: string;
  celId: string;
  enaId: string;
  projId: string;
  quantity: number;
  uomId: string;
  icFlag: string;
  icLenId: string;
  offsetAccId: string;
  sourceType: string;
  refDocId: string;
  refDocNo: string;
  refContractNo: string;
  reversedId: string;
  status: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifyDate: string;
}

export default function CreateUniversalLedger({ onClose }: CreateUniversalLedgerProps) {
  const [activeTab, setActiveTab] = useState('main-info');
  const [searchText, setSearchText] = useState('');
  const [posted, setPosted] = useState(false);
  
  const [details, setDetails] = useState<UniversalLedgerDetailRow[]>([
    {
      id: 1,
      sip: 1,
      objectId: '10001',
      objectType: 'C',
      assId: '',
      matId: '',
      prodId: 'PROD01',
      stoId: '',
      sarId: '',
      cceId: 'CCE01',
      pceId: 'PCE01',
      celId: 'CEL01',
      enaId: 'ENA01',
      projId: 'PROJ01',
      quantity: 10,
      uomId: 'PCS',
      icFlag: 'N',
      icLenId: '',
      offsetAccId: '131',
      sourceType: 'INV',
      refDocId: 'INV20260202001',
      refDocNo: 'INV/2026/001',
      refContractNo: 'CON-001',
      reversedId: '',
      status: 'D',
      createdBy: 'NGUYENVANA',
      createDate: '2026-02-02',
      modifiedBy: '',
      modifyDate: ''
    }
  ]);

  const [selectedDetails, setSelectedDetails] = useState<number[]>([]);

  const handleAddRow = () => {
    const newRow: UniversalLedgerDetailRow = {
      id: details.length + 1,
      sip: details.length + 1,
      objectId: '',
      objectType: '',
      assId: '',
      matId: '',
      prodId: '',
      stoId: '',
      sarId: '',
      cceId: '',
      pceId: '',
      celId: '',
      enaId: '',
      projId: '',
      quantity: 0,
      uomId: '',
      icFlag: 'N',
      icLenId: '',
      offsetAccId: '',
      sourceType: 'ULI',
      refDocId: '',
      refDocNo: '',
      refContractNo: '',
      reversedId: '',
      status: 'D',
      createdBy: 'NGUYENVANA',
      createDate: '2026-02-02',
      modifiedBy: '',
      modifyDate: ''
    };
    setDetails([...details, newRow]);
  };

  const handleDeleteRows = () => {
    setDetails(details.filter(row => !selectedDetails.includes(row.id)));
    setSelectedDetails([]);
  };

  const toggleSelection = (id: number) => {
    setSelectedDetails(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg">Create Universal Ledger</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
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
            <div className="flex gap-6 mb-6" style={{ width: '1552px' }}>
              
              {/* BLOCK 1 - KHOA CHINH & QUAN TRI */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4 text-gray-800 font-semibold uppercase tracking-wider">Khoá chính & Quản trị</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> ULE ID
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="1000001" readOnly />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> LEN ID
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="101" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Ledger
                    </Label>
                    <Select defaultValue="0L">
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0L">0L (VAS)</SelectItem>
                        <SelectItem value="2L">2L (IFRS)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Document Number
                    </Label>
                    <Input className="bg-pink-50 h-10 font-mono" defaultValue="UL2026-00001" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Fiscal Year
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="2026" />
                  </div>
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Document Item
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="1" />
                  </div>
                </div>
              </div>

              {/* BLOCK 2 - THONG TIN CHUNG TU & TAI KHOAN */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4 text-gray-800 font-semibold uppercase tracking-wider">Thông tin chứng từ & Tài khoản</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Document Type
                    </Label>
                    <Select defaultValue="UL">
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UL">UL</SelectItem>
                        <SelectItem value="SA">SA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Transaction Type
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="1001" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Account ID
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="1111" />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Posting Date
                    </Label>
                    <Input type="date" className="bg-pink-50 h-10" defaultValue="2026-02-02" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Document Date
                    </Label>
                    <Input type="date" className="bg-pink-50 h-10" defaultValue="2026-02-02" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> DR CR Indicator
                    </Label>
                    <Select defaultValue="D">
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="D">D (Nợ)</SelectItem>
                        <SelectItem value="C">C (Có)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Post Document</Label>
                    <div className="flex items-center h-10">
                      <Switch checked={posted} onCheckedChange={setPosted} />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">Status</Label>
                    <Input className="bg-pink-50 h-10" defaultValue="D" readOnly />
                  </div>
                </div>
              </div>

              {/* BLOCK 3 - TIEN TE & SO TIEN */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4 text-gray-800 font-semibold uppercase tracking-wider">Tiền tệ & Số tiền</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Exchange Rate
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="1.00" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Exchange Date
                    </Label>
                    <Input type="date" className="bg-pink-50 h-10" defaultValue="2026-02-02" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Exchange Type
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="M" />
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">Group Amount</Label>
                    <Input className="h-10 text-right font-mono" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">Group Currency</Label>
                    <Input className="h-10" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Currency
                    </Label>
                    <Select defaultValue="VND">
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VND">VND</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Amount
                    </Label>
                    <Input className="bg-pink-50 h-10 text-right font-mono" defaultValue="1000000.00" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Accounted Amount
                    </Label>
                    <Input className="bg-pink-50 h-10 text-right font-mono" defaultValue="1000000.00" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Acc Currency
                    </Label>
                    <Input className="bg-pink-50 h-10" defaultValue="VND" readOnly />
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-8 border rounded-lg">
              <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                <h3 className="text-sm font-semibold text-blue-800 uppercase">Chi tiết phân hệ & Kế toán quản trị</h3>
              </div>
              
              <div className="p-4">
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
                    placeholder="Search Details..."
                    className="w-64 h-8"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button variant="outline" size="sm">Go</Button>
                  <Button variant="outline" size="sm">
                    Actions <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" onClick={handleAddRow}>Add Row</Button>
                  <Button variant="outline" size="sm" onClick={handleDeleteRows} disabled={selectedDetails.length === 0}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="border rounded overflow-x-auto overflow-y-auto max-h-[500px]">
                  <table className="w-full text-sm min-w-[4800px]">
                    <thead className="sticky top-0 z-10">
                      <tr className="bg-blue-50 border-b">
                        <th className="px-3 py-2 text-left w-12 border-r">
                          <Checkbox />
                        </th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-16 text-center">Sip</th>
                        
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Object ID</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Object Type</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-40 uppercase">Offset Account</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Source Type</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-48 uppercase">Reference Doc ID</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-48 uppercase">Reference Doc No</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-48 uppercase">Reference Contract No</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-40 uppercase">Reversed ID</th>
                        
                        
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Material ID</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Product</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Store</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Storage Area</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Cost Center</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Profit Center</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Cost Element</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-40 uppercase">Extension Analysis </th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Project</th>
                        <th className="px-3 py-2 text-right text-blue-700 border-r w-32 uppercase">Quantity</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">UOM</th>
                        <th className="px-3 py-2 text-center text-blue-700 border-r w-24 uppercase">IC Flag</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-40 uppercase">IC Legal Entity</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Fixed Asset</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-24 uppercase">Status</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Created By</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-40 uppercase">Create Date</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-32 uppercase">Modified By</th>
                        <th className="px-3 py-2 text-left text-blue-700 border-r w-40 uppercase">Modify Date</th>

                        <th className="px-3 py-2 text-center text-blue-700 border-r w-24 uppercase">ATTACH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.map(row => (
                        <tr key={row.id} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2 border-r">
                            <Checkbox 
                              checked={selectedDetails.includes(row.id)}
                              onCheckedChange={() => toggleSelection(row.id)}
                            />
                          </td>
                          <td className="px-3 py-2 border-r text-center">{row.sip}</td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.objectId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.objectType} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.assId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.matId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.prodId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.stoId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.sarId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.cceId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.pceId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.celId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.enaId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.projId} /></td>
                          <td className="px-3 py-2 border-r text-right font-mono"><Input className="h-8 text-sm text-right" defaultValue={row.quantity} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.uomId} /></td>
                          <td className="px-3 py-2 border-r text-center">
                            <Checkbox checked={row.icFlag === 'Y'} />
                          </td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.icLenId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.offsetAccId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.sourceType} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.refDocId} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.refDocNo} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.refContractNo} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.reversedId} /></td>
                          <td className="px-3 py-2 border-r text-center"><Input className="h-8 text-sm text-center" defaultValue={row.status} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm bg-gray-50" defaultValue={row.createdBy} readOnly /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm bg-gray-50" defaultValue={row.createDate} readOnly /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.modifiedBy} /></td>
                          <td className="px-3 py-2 border-r"><Input className="h-8 text-sm" defaultValue={row.modifyDate} /></td>
                          <td className="px-3 py-2 border-r text-center">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Paperclip className="w-4 h-4 text-blue-600" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="text-right text-sm text-gray-600 mt-2">
                  Total Records: {details.length}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="approval-info" className="p-6">
            <div className="mb-6">
              <h3 className="text-sm mb-4 font-semibold uppercase tracking-wider">Approval Workflow</h3>
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
              <h3 className="text-sm mb-4 font-semibold uppercase tracking-wider">Thông tin phê duyệt đa cấp</h3>
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
                      <td className="px-4 py-3">2026-02-02</td>
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
                        </Select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="default">Save</Button>
          </div>
           <div className="flex gap-2">
             <Button variant="default">Tính thuế</Button>
            <Button variant="default">Ghi sổ (Post)</Button>
            <Button variant="default">Create</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
